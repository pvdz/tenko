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
let COLLECT_TOKENS_TYPES;
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
const TARGET_FILE = (process.argv.includes('-f') && process.argv[process.argv.indexOf('-f') + 1]) || '';

if (ACORN_AST) console.log('Generating an Acorn compatible AST for all tests');
if (BABEL_AST) console.log('Generating a Babel compatible AST for all tests');
if (COMPARE_ACORN) console.log('Comparing to Acorn output');
if (COMPARE_BABEL) console.log('Comparing to Babel output');

const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/tenko.prod.mjs';

const BOLD = '\x1b[;1;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

if (TARGET_FILE) {
  if (!TARGET_FILE.startsWith('test262/') && !TARGET_FILE.startsWith('/')) {
    console.error('\nThe path should be an absolute path or relative to test262 folder, so for example: `test262/test/language/white-space/string-space.js`');
    process.exit(1);
  }
  console.log('\nFiltering for ' + TARGET_FILE + '\n');
}

// Placeholder...
let Tenko = function(){ throw new Error('not yet loaded through import...'); };

// cd tenko/ignore
// git clone https://github.com/tc39/test262.git
const PATH262 = path.join(dirname, './../ignore/test262/test');

let stdout = [];
function parse(input, strict, module, annexB) {
  stdout = [];
  return Tenko(
    input,
    {
      goalMode: module ? GOAL_MODULE : GOAL_SCRIPT,
      collectTokens: COLLECT_TOKENS_ALL,
      strictMode: strict,
      webCompat: !!annexB,
      acornCompat: ACORN_AST,
      babelCompat: BABEL_AST,

      errorCodeFrame: true,
      truncCodeFrame: false,

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
let compareDrops = new Set;
let compareFails = new Set;
let compareSkips = new Set;
function onRead(file, content) {
  ++counter;
  // if (counter < 22000) return;

  let displayFile = file.slice(path.resolve(dirname, '../ignore').length + 1);
  if (displayFile.includes('FIXTURE')) return;

  if (TARGET_FILE) {
    if (displayFile !== TARGET_FILE) return;
    console.log(BOLD, counter, RESET, 'Testing', BOLD, displayFile, RESET);
    console.log('-> ' + file);
  } else {
    console.log(BOLD, counter, RESET, 'Testing', BOLD, displayFile, RESET);
    // Whitelist, currently unused
    switch (displayFile) {
      // case 'test262/test/annexB/language/expressions/object/__proto__-duplicate.js':
      //   console.log(BOLD, 'SKIP', RESET, '(see test runner code for reasoning)');
      //   return;
    }
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
  } else if (features.includes('optional-chaining')) {
    return console.log(BOLD, 'SKIP', RESET, '(Stage 4: `?.`)');
  }

  let printedOnce = false;
  if (!flags.includes('onlyStrict') && !flags.includes('module')) {
    // This is the sloppy or web run (governed by the test config!)

    let failed = false;
    let z;
    try {
      z = parse(content, false, false, webcompat);
      console.log(GREEN, 'PASS', RESET, 'sloppy, webcompat=', webcompat);
    } catch (e) {
      console.log(GREEN, 'FAIL', RESET, 'sloppy, webcompat=', webcompat);
      failed = e;
    }

    if (failed && failed.toString().toLowerCase().includes('assertion fail')) {
      console.log('\nUnrolling output;\n');
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + BLINK + ' threw assertion error' + RESET + ' in ' + BOLD + 'sloppy' + RESET);
    }
    if (failed && !(failed.toString().toLowerCase().includes('parser error!') || failed.toString().toLowerCase().includes('lexer error!'))) {
      console.log('\nUnrolling output;\n');
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + BLINK + ' threw an unexpected error' + RESET + ' in ' + BOLD + 'sloppy' + RESET);
    }
    if (!failed && !printedOnce) {
      testPrinter(content, 'sloppy', true, z.ast, false, false, false, false);
      printedOnce = true;
    }
    if (!!failed !== negative) {
      console.log('\nUnrolling output;\n');
      stdout.forEach(a => console.log.apply(console, a));
      console.log('e:', failed, negative);
      console.log('flags:', flags);
      throw new Error('File ' + BOLD + file + RESET + ' did not meet expectations in '+BOLD+'sloppy'+RESET+', expecting ' + (negative?'fail':'pass') + ' but got '  + (failed?'fail':'pass'));
    }

    // #######################
    // ###  OTHER PARSERS  ###
    // #######################


    if (COMPARE_ACORN) {
      if (ignoreTest262Acorn(displayFile)) compareDrops.add(displayFile);

      // Parse and hope for the best. AnnexB is applied by default, no opt-out
      // Acorn doesn't spam comments so we don't have to scrub the input

      let [acornOk, acornFail, zasa] = compareAcorn(content, !failed, 'sloppy', true, file);
      let matchProblems = processAcornResult(acornOk, acornFail, failed, zasa, false);
      if (matchProblems) {
        if (TARGET_FILE) {
          console.log('matchProblems for sloppy-annexb:', matchProblems);
          console.log('##### non-strict annexb content that was tested in Acorn:');
          console.log(content);
          console.log('#####');
          console.log(zasa ? astToString(zasa.ast) : '<no zasa>');
          console.log(matchProblems);
          console.log('File:', file);
          // console.error('Exit now.');
          // process.exit(1);
        }

        if (ignoreTest262Acorn(displayFile)) {
          compareSkips.add(displayFile);
          console.log(BOLD, 'SKIP', RESET, '(error whitelisted by ignoreTest262Acorn)');
        } else {
          compareFails.add(displayFile);
          console.log(RED, 'BAD!', RESET, '(output not same and file not whitelisted by ignoreTest262Acorn)');
        }
      } else if (ignoreTest262Acorn(displayFile)) {
        console.log(BOLD, 'DROP', RESET, '(error whitelisted by ignoreTest262Acorn but output is same)');
      }
    }

    if (COMPARE_BABEL) {
      if (ignoreTest262Babel(displayFile)) compareDrops.add(displayFile);

      // Parse and hope for the best. AnnexB is applied by default, no opt-out.
      // We just want to confirm Tenko does the same as Babel, not test the actual test

      let noCommentContent = scrubCommentsForBabel(content, z);

      let [babelOk, babelFail, zasb] = compareBabel(noCommentContent, !failed, 'sloppy', true, file);

      let matchProblems = processBabelResult(babelOk, babelFail, failed, zasb, false);
      if (matchProblems) {
        if (TARGET_FILE) {
          console.log('matchProblems for sloppy-annexb:', matchProblems);
          console.log('##### non-strict annexb content without comments that was tested in Babel:');
          console.log(noCommentContent);
          console.log('#####');
          console.log(zasb ? astToString(zasb.ast) : '<no zasb>');
          console.log(matchProblems);
          console.log('File:', file);
          // console.error('Exit now.');
          // process.exit(1);
        }

        if (ignoreTest262Babel(displayFile)) {
          compareSkips.add(displayFile);
          console.log(BOLD, 'SKIP', RESET, '(output not same but file whitelisted by ignoreTest262Babel)');
        } else {
          compareFails.add(displayFile);
          console.log(RED, 'BAD!', RESET, '(output not same and file not whitelisted by ignoreTest262Babel)');
        }
      } else if (ignoreTest262Babel(displayFile)) {
        console.log(BOLD, 'DROP', RESET, '(error whitelisted by ignoreTest262Babel but output is same)');
      }
    }
  }

  let modstr = flags.includes('module') ? 'module' : 'strict';
  if (!webcompat && !flags.includes('noStrict')) {
    // This is the module run

    let failed = false;
    let z;
    try {
      z = parse(content, true, flags.includes('module'), webcompat);
      console.log(GREEN, 'PASS', RESET, modstr + ', webcompat=', webcompat);
    } catch (e) {
      console.log(GREEN, 'FAIL', RESET, modstr + ', webcompat=', webcompat);
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


    if (COMPARE_ACORN && flags.includes('module')) {
      if (ignoreTest262Acorn(displayFile)) compareDrops.add(displayFile);

      // Parse and hope for the best. AnnexB is applied by default, no opt-out
      // Acorn doesn't spam comments so we don't have to scrub the input

      let [acornOk, acornFail, zasa] = compareAcorn(content, !failed, 'module', true, file);

      let matchProblems = processAcornResult(acornOk, acornFail, failed, zasa, false);
      if (matchProblems) {
        if (TARGET_FILE) {
          console.log('matchProblems for module-annexb:', matchProblems);
          console.log('##### module annexb content that was tested in Acorn:');
          console.log(content);
          console.log('#####');
          console.log(zasa ? astToString(zasa.ast) : '<no zasa>');
          console.log(matchProblems);
          console.log('File:', file);
          // console.error('Exit now.');
          // process.exit(1);
        }

        if (ignoreTest262Acorn(displayFile)) {
          compareSkips.add(displayFile);
          console.log(BOLD, 'SKIP', RESET, '(output not same but file whitelisted by ignoreTest262Acorn)');
        } else {
          compareFails.add(displayFile);
          console.log(RED, 'BAD!', RESET, '(output not same and file not whitelisted by ignoreTest262Acorn)');
        }
      } else if (ignoreTest262Acorn(displayFile)) {
        console.log(BOLD, 'DROP', RESET, '(error whitelisted by ignoreTest262Acorn but output is same)');
      }
    }


    if (COMPARE_BABEL && flags.includes('module')) {
      if (ignoreTest262Babel(displayFile)) compareDrops.add(displayFile);

      // Parse and hope for the best. AnnexB is applied by default, no opt-out.
      // We just want to confirm Tenko does the same as Babel, not test the actual test

      let noCommentContent = scrubCommentsForBabel(content, z);

      let [babelOk, babelFail, zasb] = compareBabel(noCommentContent, !failed, 'module', true, file);

      let matchProblems = processBabelResult(babelOk, babelFail, failed, zasb, false);
      if (matchProblems) {
        if (TARGET_FILE) {
          console.log('matchProblems for module-annexb:', matchProblems);
          console.log('##### module annexb content without comments that was tested in Babel:');
          console.log(noCommentContent);
          console.log('#####');
          console.log(zasb ? astToString(zasb.ast) : '<no zasb>');
          console.log(matchProblems);
          console.log('File:', file);
          // console.error('Exit now.');
          // process.exit(1);
        }

        if (ignoreTest262Babel(displayFile)) {
          compareSkips.add(displayFile);
          console.log(BOLD, 'SKIP', RESET, '(output not same but file whitelisted by ignoreTest262Babel)');
        } else {
          compareFails.add(displayFile);
          console.log(RED, 'BAD!', RESET, '(output not same and file not whitelisted by ignoreTest262Babel)');
        }
      } else if (ignoreTest262Babel(displayFile)) {
        console.log(BOLD, 'DROP', RESET, '(error whitelisted by ignoreTest262Babel but output is same)');
      }
    }
  }
}

function scrubCommentsForBabel(content, z) {
  if (!z) return content;

  // Strip comment nodes because that's the only expected difference between the two ASTs
  return z.tokens.map(token => (token.nl ? '\n' : '') + (!isCommentToken(token.type) ? content.slice(token.start, token.stop) : '')).join('') || ';';
}

(async function(){
  ({
    Tenko,
    GOAL_MODULE,
    GOAL_SCRIPT,
    COLLECT_TOKENS_ALL,
    COLLECT_TOKENS_TYPES,
    COLLECT_TOKENS_SOLID,
    COLLECT_TOKENS_NONE,
  } = (await import(USE_BUILD ? TENKO_PROD_FILE : TENKO_DEV_FILE)));

  read(PATH262, '', onRead);

  // Any file that's skipped (failed+whitelist) or failed is not droppable. Any file that's white listed is not failed.
  compareSkips.forEach(s => (compareFails.delete(s), compareDrops.delete(s)));
  compareFails.forEach(s => compareDrops.delete(s));

  if (compareDrops.size) {
    console.log(BOLD, 'These files passed the comparison but where whitelisted', RESET);
    console.log([...compareDrops].sort().join('\n'));
  }
  if (compareFails.size) {
    console.log(BOLD, 'These files failed the comparison and were not whitelisted', RESET);
    console.log([...compareFails].sort().join('\n'));
  }

  console.log('\nNatural end of this script...\n');
})();
