// Run this suite by `./t t` in the Tenko project root
// Requires a clone of https://github.com/tc39/test262.git into tenko/ignore/test262

import fs from 'fs';
import path from 'path';
import {
  isCommentToken,
} from '../src/tokentype.mjs';
import {
  ASSERT,
  astToString,
} from "./utils.mjs";
import {
  compareAcorn,
  ignoreTest262Acorn,
  processAcornResult,
} from './parse_acorn.mjs';
import {
  compareBabel,
  ignoreTest262Babel,
  processBabelResult,
} from './parse_babel.mjs';
import {testPrinter} from "./run_printer.mjs";

// Lazy loaded
let GOAL_MODULE;
let GOAL_SCRIPT;
let COLLECT_TOKENS_ALL;
let COLLECT_TOKENS_SOLID;
let COLLECT_TOKENS_NONE;

// node does not expose __dirname under module mode, but we can use import.meta to get it
let filePath = import.meta.url.replace(/^file:\/\//, '');
let dirname = path.dirname(filePath);

const USE_BUILD = process.argv.includes('-b');
if (USE_BUILD) console.log('-- Using prod build of Tenko');
const ACORN_AST = process.argv.includes('--acorn'); // run Tenko with babelCompat=true?
const COMPARE_ACORN = process.argv.includes('--test-acorn'); // compare Tenko output for each test with Acorn output?
const BABEL_AST = process.argv.includes('--babel'); // run Tenko with babelCompat=true?
const COMPARE_BABEL = process.argv.includes('--test-babel'); // compare Tenko output for each test with Babel output?

const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/tenko.prod.mjs';

const BOLD = '\x1b[;1;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

// Placeholder...
let Tenko = function(){ throw new Error('not yet loaded through import...'); };

// cd tenko/ignore
// git clone https://github.com/tc39/test262.git
const PATH262 = path.join(dirname, './../ignore/test262/test');

let stdout = [];
function parse(input, strict, module, web) {
  stdout = [];
  return Tenko(
    input,
    {
      goalMode: module ? GOAL_MODULE : GOAL_SCRIPT,
      collectTokens: COLLECT_TOKENS_ALL,
      strictMode: strict,
      webCompat: !!web,
      acornCompat: ACORN_AST,
      babelCompat: BABEL_AST,
      fullErrorContext: true,

      // Collect output but don't print it in case the retry fails
      $log: (...a) => stdout.push(a),
      $warn: (...a) => stdout.push(a),
      $error: (...a) => stdout.push(a),
    }
  );
}

function read(path, file, onContent) {
  let combo = path + file;
  if (fs.statSync(combo).isFile()) {
    if (file.slice(-3) === '.js') {
      onContent(combo, fs.readFileSync(combo, 'utf8'));
    }
  } else {
    fs.readdirSync(combo).forEach(s => read(combo + '/', s, onContent));
  }
}
let counter = 0;
function onRead(file, content) {
  ++counter;
  // if (counter < 22000) return;

  let displayFile = file.slice(path.resolve(dirname, '../ignore').length + 1);
  if (displayFile.includes('FIXTURE')) return;
  console.log(BOLD, counter, RESET, 'Testing', BOLD, displayFile, RESET)

  switch (displayFile) {
    case 'test262/test/annexB/language/expressions/object/__proto__-duplicate.js':
      // - Claims it should fail due to double __proto__ but the spec has an exception
      // - > In addition, it is not applied when initially parsing a CoverParenthesizedExpressionAndArrowParameterList or a CoverCallExpressionAndAsyncArrowHead.
      // - And `({` is most definitely initially parsing a CoverParenthesizedExpressionAndArrowParameterList

    // case 'test262/test/language/statements/break/S12.8_A1_T2.js':
      // TODO: report incorrect reason for failure of test  (fails because the label does not appear in the labelSet,
      //       since a break with label _can_ be valid)

    // case 'test262/test/annexB/built-ins/RegExp/named-groups/non-unicode-malformed.js':
      // TODO: discuss updating the spec on this wording. Currently the grammar would never allow the parser to parse a
      //       `GroupName` in ~N mode, so the condition would never trigger for the parser to restart in `+N` mode.
      //       Additionally, this test case implies that the missing name static semantics can be skipped, even though
      //       either we parse the whole thing as an AtomEscape, in which case the semantics seem to apply (because
      //       annexB doesn't update this rule), or it doesn't parse and the GroupName is invalid, but I don't think so.

      console.log(BOLD, 'SKIP', RESET, '(see test runner code for reasoning)');
      return;
  }

  ASSERT(content.includes('/*---') && content.includes('---*/'), 'missing test262 header', file);
  let header = content.slice(content.indexOf('/*---'), content.indexOf('---*/') + 5);
  // The header is yaml... ... Whatever, split all the things :)
  let flags = header.match(/\n\s*flags: \[(.*?)\]/);
  let features = header.match(/\n\s*features: \[(.*?)\]/);
  features = features ? features[1].split(', ') : [];
  flags = flags ? flags[1].split(/\s*,\s*/g) : [];
  let negative = /\n\s*negative:/.test(header) && !/\n\s*phase:\s*runtime/.test(header) && !header.includes('phase: resolution');
  let webcompat = file.includes('annexB');

  if (features.includes('class-fields-public')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage ?: class-fields-public)');
  } else if (features.includes('class-fields-private')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage ?: class-fields-private)');
  } else if (features.includes('class-static-fields-public')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage ?: class-static-fields-public)');
  } else if (features.includes('class-static-fields-private')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage ?: class-static-fields-private)');
  } else if (features.includes('class-methods-private')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3: class-methods-private)');
  } else if (features.includes('class-static-methods-private')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3?: class-static-methods-private)');
  } else if (features.includes('hashbang')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3: hashbang)');
  } else if (features.includes('import.meta')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3: import.meta)');
  } else if (features.includes('numeric-separator-literal')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3: numeric-separator-literal)');
  } else if (features.includes('optional-chaining')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3: optional-chaining)');
  } else if (features.includes('top-level-await')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 3: top-level-await)');
  }

  let printedOnce = false;
  let webstr = webcompat ? 'web' : 'sloppy';
  if (!flags.includes('onlyStrict') && !flags.includes('module')) {
    // This is the sloppy or web run

    let failed = false;
    let z;
    try {
      z = parse(content, false, false, webcompat);
      console.log(GREEN, 'PASS', RESET, webstr, webcompat);
    } catch (e) {
      console.log(GREEN, 'FAIL', RESET, webstr, webcompat);
      failed = e;
    }

    if (failed && failed.toString().toLowerCase().includes('assertion fail')) {
      console.log('\nUnrolling output;\n');
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + BLINK + ' threw assertion error' + RESET + ' in ' + BOLD + webstr + RESET);
    }
    if (failed && !(failed.toString().toLowerCase().includes('parser error!') || failed.toString().toLowerCase().includes('lexer error!'))) {
      console.log('\nUnrolling output;\n');
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + BLINK + ' threw an unexpected error' + RESET + ' in ' + BOLD + webstr + RESET);
    }
    if (!failed && !printedOnce) {
      testPrinter(content, 'web', true, z.ast, false, false, false, false);
      printedOnce = true;
    }
    if (!!failed !== negative) {
      console.log('\nUnrolling output;\n');
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed, negative);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + ' did not meet expectations in '+BOLD+webstr+RESET+', expecting ' + (negative?'fail':'pass') + ' but got '  + (failed?'fail':'pass'));
    }

    // #######################
    // ###  OTHER PARSERS  ###
    // #######################

    if (COMPARE_ACORN && !ignoreTest262Acorn(file)) {
      // Parse and hope for the best. AnnexB is applied by default, no opt-out
      // Acorn doesn't spam comments so we don't have to scrub the input

      let [acornOk, acornFail, zasa] = compareAcorn(content, !failed, 'web', true, file);
      let outputAcorn = processAcornResult(acornOk, acornFail, failed, zasa, false);
      if (outputAcorn) {
        console.log('##### "web" content that was tested in Acorn:');
        console.log(content);
        console.log('#####');
        console.log(zasa ? astToString(zasa.ast) : '<no zasa>');
        console.log(outputAcorn);
        console.log('File:', file);
        console.error('Exit now.');
        process.exit(1);
      }
    }

    if (COMPARE_BABEL && !ignoreTest262Babel(file)) {
      // Parse and hope for the best. AnnexB is applied by default, no opt-out
      let noCommentContent = content;
      if (z) {
        // Strip comment nodes because that's the only expected difference between the two ASTs
        noCommentContent = z.tokens.map(token => !isCommentToken(token.type) ? token.str : token.str.includes('\n') ? '\n' : '').join('');
      }

      let [babelOk, babelFail, zasb] = compareBabel(noCommentContent, !failed, 'web', true, file);
      let outputBabel = processBabelResult(babelOk, babelFail, failed, zasb, false);
      if (outputBabel) {
        console.log('##### no comment "web" content that was tested in Babel:');
        console.log(noCommentContent);
        console.log('#####');
        console.log(zasb ? astToString(zasb.ast) : '<no zasb>');
        console.log(outputBabel);
        console.log('File:', file);
        console.error('Exit now.');
        process.exit(1);
      }
    }
  }

  let modstr = flags.includes('module') ? 'module' : 'strict';
  if (!webcompat && !flags.includes('noStrict')) {
    // This is the module run

    let failed = false;
    let z;
    try {
      z = parse(content, true, flags.includes('module'), false);
      console.log(GREEN, 'PASS', RESET, modstr);
    } catch (e) {
      console.log(GREEN, 'FAIL', RESET, modstr);
      failed = e;
    }

    if (failed && failed.toString().toLowerCase().includes('assertion fail')) {
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + BLINK + ' threw assertion error' + RESET + ' in ' + BOLD + modstr + RESET);
    }
    if (failed && !(failed.toString().toLowerCase().includes('parser error!') || failed.toString().toLowerCase().includes('lexer error!'))) {
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + BLINK + ' threw an unexpected error' + RESET + ' in ' + BOLD + modstr + RESET);
    }
    if (!failed && !printedOnce) {
      testPrinter(content, 'module', false, z.ast, false, false, false, false);
      printedOnce = true;
    }
    if (!!failed !== negative) {
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + ' did not meet expectations in '+BOLD+modstr+RESET+', expecting ' + (failed?'fail':'pass') + ' but got '  + (!failed?'fail':'pass'));
    }

    // #######################
    // ###  OTHER PARSERS  ###
    // #######################

    if (COMPARE_ACORN && flags.includes('module') && !ignoreTest262Acorn(file)) {
      // Parse and hope for the best. AnnexB is applied by default, no opt-out
      // Acorn doesn't spam comments so we don't have to scrub the input

      let [acornOk, acornFail, zasa] = compareAcorn(content, !failed, 'module', true, file);
      let outputAcorn = processAcornResult(acornOk, acornFail, failed, zasa, false);
      if (outputAcorn) {
        console.log('##### "module" content that was tested in Acorn:');
        console.log(content);
        console.log('#####');
        console.log(zasa ? astToString(zasa.ast) : '<no zasa>');
        console.log(outputAcorn);
        console.log('File:', file);
        console.error('Exit now.');
        process.exit(1);
      }
    }

    if (COMPARE_BABEL && flags.includes('module') && !ignoreTest262Babel(file)) {
      // Parse and hope for the best. AnnexB is applied by default, no opt-out
      let noCommentContent = content;
      if (z) {
        // Strip comment nodes because that's the only expected difference between the two ASTs
        noCommentContent = z.tokens.map(token => isCommentToken(token.type) ? token.str : token.str.includes('\n') ? '\n' : '').join('');
      }

      let [babelOk, babelFail, zasb] = compareBabel(noCommentContent, !failed, 'module', true, file);
      let outputBabel = processBabelResult(babelOk, babelFail, failed, zasb, false);
      if (outputBabel) {
        console.log('##### no comment "module" content that was tested in Babel:');
        console.log(noCommentContent);
        console.log('#####');
        console.log(zasb ? astToString(zasb.ast) : '<no zasb>');
        console.log(outputBabel);
        console.log('File:', file);
        console.error('Exit now.');
        process.exit(1);
      }
    }
  }
}

(async function(){
  ({
    Tenko,
    GOAL_MODULE,
    GOAL_SCRIPT,
    COLLECT_TOKENS_ALL,
    COLLECT_TOKENS_SOLID,
    COLLECT_TOKENS_NONE,
  } = (await import(USE_BUILD ? TENKO_PROD_FILE : TENKO_DEV_FILE)));

  read(PATH262, '', onRead);

  console.log('The end...? Wow really?');
})();
