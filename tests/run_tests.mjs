#!/usr/bin/env node --experimental-modules

// Shorthand test runner api from project root through:
//
//     ./t --help
//

if (!(process.version.slice(1, 3) >= 10)) throw new Error('Requires node 10+, did you forget `nvm use 10`?');

Error.stackTraceLimit = Infinity; // TODO: cut off at node boundary...

import fs from 'fs';
import path from 'path';
import {execSync} from 'child_process';

import {
  ASSERT as _ASSERT,
  astToString,
  decodeUnicode,
  encodeUnicode,
  getTestFiles,
  parseTestFile,
  PROJECT_ROOT_DIR,
  promiseToWriteFile,
  readFiles,
  Tob,
  toPrint,
  _LOG,
  yn,

  INPUT_HEADER,
  OUTPUT_HEADER,
  OUTPUT_HEADER_SLOPPY,
  OUTPUT_HEADER_SLOPPY_ANNEXB,
  OUTPUT_HEADER_STRICT,
  // OUTPUT_HEADER_STRICT_ANNEXB,
  OUTPUT_HEADER_MODULE,
  OUTPUT_HEADER_MODULE_ANNEXB,
  OUTPUT_QUINTICK,
  OUTPUT_QUINTICKJS,
} from './utils.mjs';
import {
  generateTestFile,
} from './generate_test_file.mjs';
import {
  reduceAndExit,
} from './test_case_reducer.mjs';
import {walker} from "../src/tools/walker.mjs";
import {testPrinter} from "./run_printer.mjs";

let LOG = _LOG; // I want to be able to override this and imports are constants
let ASSERT = (...args) => {
  if (NO_FATALS) try { _ASSERT(...args); } catch (e) { console.error('Assertion error (squashed by NO_FATALS):', e.stack); }
  else _ASSERT(...args);
};


console.log('Start of Tenko test suite');

const INPUT_OVERRIDE = decodeUnicode(process.argv.includes('-F') ? fs.readFileSync(process.argv[process.argv.indexOf('-F') + 1], 'utf8') : process.argv.includes('-i') ? process.argv[process.argv.indexOf('-i') + 1] : '');
const TARGET_FILE = process.argv.includes('-f') ? process.argv[process.argv.indexOf('-f') + 1] : '';
const SEARCH = process.argv.includes('-s');
const TEST262 = process.argv.includes('-t');
const SKIP_TO = TEST262 ? 0 : 0; // skips the first n tests (saves me time)
const STOP_AFTER_TEST_FAIL = process.argv.includes('-q');
const STOP_AFTER_FILE_FAIL = process.argv.includes('-Q');
const TRUNC_STACK_TRACE = !process.argv.includes('-S');
const AUTO_UPDATE = process.argv.includes('-u') || process.argv.includes('-U');
const CONFIRMED_UPDATE = process.argv.includes('-U');
const AUTO_GENERATE = process.argv.includes('-g');
const AUTO_GENERATE_CONSERVATIVE = process.argv.includes('-G');
const REDUCING = process.argv.includes('--min');
const REDUCING_PRINTER = process.argv.includes('--min-printer');
const ALL_VARIANTS = process.argv.includes('--all');
let [a,b,c] = [process.argv.includes('--sloppy'), process.argv.includes('--strict'), process.argv.includes('--module')];
const DISABLE_VARIANTS_UNLESS_OVERRIDE = SEARCH || INPUT_OVERRIDE || REDUCING;
const RUN_SLOPPY = ALL_VARIANTS || (a || (!b && !c));
const RUN_STRICT = ALL_VARIANTS || b || (!DISABLE_VARIANTS_UNLESS_OVERRIDE && !a && !c);
const RUN_MODULE = ALL_VARIANTS || c || (!DISABLE_VARIANTS_UNLESS_OVERRIDE && !a && !b);
const ENABLE_ANNEXB = process.argv.includes('--annexb');
const TARGET_ES6 = process.argv.includes('--es6');
const TARGET_ES7 = process.argv.includes('--es7');
const TARGET_ES8 = process.argv.includes('--es8');
const TARGET_ES9 = process.argv.includes('--es9');
const TARGET_ES10 = process.argv.includes('--es10');
const TARGET_ES11 = process.argv.includes('--es11');
const TARGET_ES12 = process.argv.includes('--es12');
const TESTS_ONLY = process.argv.includes('-n'); // skip constructing updated test files, dont write anything. Used for code coverage
const RUN_VERBOSE_IN_SERIAL = process.argv.includes('--serial') || (!SEARCH && !TESTS_ONLY && (INPUT_OVERRIDE || TARGET_FILE || STOP_AFTER_TEST_FAIL || STOP_AFTER_FILE_FAIL));
const FORCE_WRITE = process.argv.includes('--force-write');
const ACORN_COMPAT = process.argv.includes('--acorn');
const BABEL_COMPAT = process.argv.includes('--babel');
const COMPARE_ACORN = process.argv.includes('--test-acorn');
const COMPARE_BABEL = process.argv.includes('--test-babel');
const COMPARE_NODE = process.argv.includes('--test-node');
const TEST_ACORN = COMPARE_ACORN && (!AUTO_UPDATE || CONFIRMED_UPDATE); // ignore this flag with -u, we dont want to record acorn deltas into test files
const TEST_BABEL = COMPARE_BABEL && (!AUTO_UPDATE || CONFIRMED_UPDATE); // ignore this flag with -u, we dont want to record babel deltas into test files
const NO_FATALS = process.argv.includes('--no-fatals'); // asserts should not stop a full auto run (dev tool, rely on git etc for recovery...)
const CONCISE = process.argv.includes('--concise');
const USE_BUILD = process.argv.includes('-b') || process.argv.includes('--build');
const SKIP_PRINTER = process.argv.includes('--no-printer'); // || USE_BUILD;
const EXPOSE_SCOPE = process.argv.includes('--expose-scope');

const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/tenko.prod.mjs';

if (TEST_BABEL && TEST_ACORN) throw new Error('Cannot test Babel and Acorn at the same time. Pick one.');
if (TEST_ACORN) console.log('Running in Acorn compat mode and comparing to actual Acorn Parser output');
if (TEST_BABEL) console.log('Running in Babel compat mode and comparing to actual Babel Parser output');

if (process.argv.includes('-?') || process.argv.includes('--help')) {
  console.log(`
  Tenko Test Runner

  You probably want to use ./t for easy api access... But in case you really want details on this script, here you go :)

  Usage:
    \`tests/run_tests.mjs\` [options]
  But for the time being:
    \`node --experimental-modules tests/run_tests.mjs\`
  And suggested if also testing builds:
    \`node --experimental-modules cli/build.mjs; node --experimental-modules tests/run_tests.mjs\` [options]

  Options:
    -b  --build   Use prod build instead of dev source for Tenko in this call (assumes built in \`/build/...\`; \`./t z\`)
    -f "path"     Only test this file / dir
    -F "path"     Use file contents as input
    -i "input"    Test input only (sloppy, strict, module), implies --sloppy unless at least one mode explicitly given
    -g            Regenerate computed test case blocks (process all autogen.md files)
    -G            Same as -g except it skips existing files
    -Q            Stop after first fail, but test all four modes (sloppy/strict/module/web) regardless
    -q            Stop after first fail
    -s            Use HIT() in code and only print tests that execute at least one HIT(), implies -q
    -t            Run test262 suite
    -u            Unconditionally auto-update tests with the results (tests silently updated inline, use source control to diff)
    -U            Auto-update but confirm before each test case is updated inline (use with -q for controlled updating)
    --sloppy      Only run tests in sloppy mode (can be combined with other modes like --strict)
    --strict      Only run tests in strict mode (can be combined with other modes like --module)
    --module      Only run tests with module goal (can be combined with other modes like --strict)
    --annexb      Enable web compatibility extensions listed in Annex B in the specification
    --acorn       Run in Acorn compat mode (\`acornCompat=true\`)
    --babel       Run in Babel compat mode (\`babelCompat=true\`)
    --test-acorn  Also show diff with Acorn AST / pass/fail with test cases (not the same as --acorn !)
    --test-babel  Also show diff with Babel AST / pass/fail with test cases (not the same as --babel !)
    --all         Force to run all four modes (on input)
    --esX         Where X is one of 6 through 10, like --es6. For -i only, forces the code to run in that version
    --serial      Test all targeted files in serial, verbosely, instead of using parallel phases (which is faster)
                  (Note: -q, -i, and -f implicitly enable --serial)
    --no-printer  Skip running Printer on input
    --min         Brute-force simplify a test case that throws an error while maintaining the same error message, only with -f, implies --sloppy
      -- write    For reducer only; write result to new file
    --min-printer Minimize a Printer-failing input case
    --force-write Always write the test cases to disk, even when no change was detected
    --no-fatals   Do not treat (test) assertion errors as fatals (dev tools only, rely on git etc for recovery)
    --concise     Do not dump AST and printer output to stdout. Parse and stop. Only works with -i or -f or -F
    --expose-scope Add generated scope objects as \`.$scope\` property for nodes that generate a scope. Good luck that that that...
`);
  process.exit();
}

const FORCED_ES_TARGET = TARGET_ES6 ? 6 : TARGET_ES7 ? 7 : TARGET_ES8 ? 8 : TARGET_ES9 ? 9 : TARGET_ES10 ? 10 : TARGET_ES11 ? 11 : TARGET_ES12 ? 12 : undefined;
if (FORCED_ES_TARGET) console.log('Forcing target version: ES' + FORCED_ES_TARGET);

if (AUTO_UPDATE && (AUTO_GENERATE || AUTO_GENERATE_CONSERVATIVE)) throw new Error('Cannot use auto update and auto generate together');
if (AUTO_UPDATE && (a || b || c)) throw new Error('Cannot use --sloppy (etc) together with -u');

// Lazily loaded
let COLLECT_TOKENS_NONE;
let COLLECT_TOKENS_SOLID;
let COLLECT_TOKENS_ALL;
let COLLECT_TOKENS_TYPES;
let GOAL_MODULE;
let GOAL_SCRIPT;
let WEB_COMPAT_ON;
let WEB_COMPAT_OFF;
let toktypeToString;

// node does not expose __dirname under module mode, but we can use import.meta to get it
let filePath = import.meta.url.replace(/^file:\/\//,'');
let dirname = path.dirname(filePath);

const BOLD = '\x1b[;1;1m';
const OVER = '\x1b[32;53m';
const DIM = '\x1b[30;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const TEST_SLOPPY = 'sloppy';
const TEST_STRICT = 'strict';
const TEST_MODULE = 'module';

if ((REDUCING || REDUCING_PRINTER) && !TARGET_FILE && !INPUT_OVERRIDE) throw new Error('Can only use `--min` and `--min-parser` together with `-f` or `-i`');
if (NO_FATALS) console.log(BLINK + 'NO_FATALS enabled. Do not blindly commit result!!' + RESET);
if (USE_BUILD) console.log('Using PROD build of Tenko');

let stopAsap = false;
let skippedOtherParserList = [];
let unxepctedFails = [];
let unexpectedPass = [];

// use -s and call HIT in some part of the code to log all test cases that visit that particular branch(es)
let wasHits = [];
let hitsToReport;
let foundCache = new Set; // dont print multiples
let foundTest = (x) => wasHits.length || wasHits.push(x);
let foundTests = (x) => wasHits.push(x);
let PRINT_HIT = console.log;
if (SEARCH) {
  global.HIT = foundTest; // faster to quickly search than exporting and having to uncomment the import...
  global.HITS = foundTests; // this basically becomes console.log but ok, collect _all_ hits rather than just the first
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  // console.dir = () => {}; // This is usually my workaround goto method to circumvent console blocking ;)
  LOG = () => {};
  PRINT_HIT(BLINK + 'Suppressing __all__ further output, only printing hits...' + RESET);
} else {
  global.HIT = ()=>{};
  global.HITS = ()=>{};
}

// Babel is loaded async
let compareBabel;
let ignoreTenkoTestForBabel;
let processBabelResult;
// Babel is loaded async
let compareAcorn;
let ignoreTenkoTestForAcorn;
let processAcornResult;


async function extractFiles(list) {
  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ Test file extraction time');
  let bytes = 0;
  list.forEach((tob/*: Tob */) => {
    if (tob.oldData[0] === '@') generateTestFile(tob);
    parseTestFile(tob);
    bytes += tob.inputCode.length;
  });
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ Test file extraction time');
  console.log('Total input size:', bytes, 'bytes');
}
function coreTest(tob, tenko, testVariant, annexB, enableCodeFrame = false, code = tob.inputCode, verbose = !!(INPUT_OVERRIDE || TARGET_FILE)) {
  wasHits = [];
  hitsToReport = wasHits;
  let r, e = '';
  let stdout = [];
  try {
    if (verbose) {
      console.time('Pure Tenko parse time');
      console.log('Input size:', code.length, 'bytes');
    }
    r = tenko(
      code,
      {
        goalMode: testVariant === TEST_MODULE ? GOAL_MODULE : GOAL_SCRIPT,
        collectTokens: COLLECT_TOKENS_SOLID,
        strictMode: testVariant === TEST_STRICT,
        webCompat: ENABLE_ANNEXB || annexB ? WEB_COMPAT_ON : WEB_COMPAT_OFF,
        targetEsVersion: FORCED_ES_TARGET || tob.inputOptions.es,
        babelCompat: BABEL_COMPAT,
        acornCompat: ACORN_COMPAT,
        exposeScopes: tob.inputOptions.exposeScopes || EXPOSE_SCOPE,
        ranges: tob.inputOptions.ranges || false,
        nodeRange: tob.inputOptions.nodeRange || false,
        locationTracking: tob.inputOptions.locationTracking || true,

        astUids: tob.inputOptions.astUids || false,

        errorCodeFrame: enableCodeFrame,
        truncCodeFrame: true,

        $log: verbose ? undefined : (...a) => stdout.push(a),
        $warn: verbose ? undefined : (...a) => stdout.push(a),
        $error: verbose ? undefined : (...a) => stdout.push(a),
      },
    );
    wasHits = []; // Prevent other parse calls from adding more HITS
    if (verbose) {
      console.timeEnd('Pure Tenko parse time');
      if (CONCISE) return;
    }
    if (tob.shouldFail) {
      tob.continuePrint = BLINK + 'FILE ASSERTED TO FAIL' + RESET + ', but it passed';
    }

    // Test the ast printer
    // We only really need to test it once for whatever run passes
    if (!SKIP_PRINTER && !tob.printerOutput) {
      tob.printerOutput = testPrinter(
        code,
        testVariant,
        ENABLE_ANNEXB || annexB,
        r.ast,
        !INPUT_OVERRIDE && !TARGET_FILE && (AUTO_UPDATE && !CONFIRMED_UPDATE),
        REDUCING_PRINTER,
        !REDUCING_PRINTER || BABEL_COMPAT || ACORN_COMPAT,
        verbose
      );
      if (tob.printerOutput[2] !== 'same' && tob.printerOutput[2] !== 'diff-same') {
        tob.continuePrint = 'Printer output needs attention [' + tob.printerOutput[2] + ']';
      }

      // Assert that the walker works properly. The first phase adds a new key to each node and throws an error if
      // that key already exists. The second phase "manually" walks each property of the AST and confirms that each
      // node is properly visited. If not it will leave a dirty key behind which should show up in the AST test diff.
      // Phase 1:
      walker(r.ast, (node, parent, prop, index) => {
        ASSERT(node && typeof node === 'object' && !(node instanceof RegExp), 'node should be a plain obj');
        ASSERT(node.test_walked !== true, 'should not walk the same node twice');
        if (parent !== undefined) {
          // Root node has no parent
          if (Array.isArray(parent[prop])) {
            ASSERT(typeof index === 'number', 'index should be number if parent[prop] is an array', index);
            ASSERT(parent[prop][index] === node, 'parent[prop][index] should be node', prop, index, parent);
          } else {
            ASSERT(typeof index === 'undefined', 'index should be undefined if parent[prop] is not an array', index);
            ASSERT(parent[prop] === node, 'parent prop should be node', prop, parent);
          }
        }
        node.test_walked = true;
      });
      // Phase 2:
      function repeat(node, key, parent) {
        if (key === '$scope') return; // Tenko can expose these optional, do not visit them here
        if (key === 'range') return;

        if (!Array.isArray(node)) {
          // node must be a plain object (because don't use anything else besides arrays)
          if (node.test_walked) {
            delete node.test_walked;
          } else {
            node.ASSERTION_ERROR_WALKER_DID_NOT_VISIT_THIS_NODE = true;
          }
        }

        for (let key in node) if (node.hasOwnProperty(key)
          && key !== 'loc'
          && !(node.type === 'Literal' && key === 'regex')
          && !(node.type === 'TemplateElement' && key === 'value')
        ) {
          let v = node[key];
          if (Array.isArray(v)) {
            v.forEach(e => e && repeat(e, key, node));
          } else if (typeof v === 'object' && v && !(v instanceof RegExp)) {
            repeat(v, key, node);
          }
        }
      }
      // If the walker was incomplete then the AST will be modified with keys to the unvisited objects.
      repeat(r.ast, 'root', {});
    }
  } catch (_e) {
    if (verbose) {
      console.timeEnd('Pure Tenko parse time');
    }
    e = _e;
    if (tob.shouldPass) {
      tob.continuePrint = BLINK + 'FILE ASSERTED TO PASS' + RESET + ', but it failed';
    }
  }

  if (tob.continuePrint) {
    if (!NO_FATALS && AUTO_UPDATE && tob.continuePrint && !CONFIRMED_UPDATE && !INPUT_OVERRIDE && !TARGET_FILE) {
      console.error(BOLD + 'Test Assertion fail' + RESET + ': testVariant=' + testVariant + ', annexB=' + annexB + ', test ' + BOLD + tob.file + RESET + ' was explicitly marked to pass, but it failed somehow;\n' + RED + tob.continuePrint + RESET);
      process.exit();
    } else if (verbose) {
      console.error(tob.continuePrint);
    }
  }

  let babelOk, babelFail, zasb;
  // Tests with specific versions should also have non-specific counter parts. Since Babel does not support targeting
  // specific spec versions, we should just skip those variants because they lead to false positives.
  if (TEST_BABEL && (!Number.isFinite(tob.inputOptions.es) || TARGET_FILE || INPUT_OVERRIDE)) {
    [babelOk, babelFail, zasb] = compareBabel(code, !e, testVariant, ENABLE_ANNEXB || annexB, tob.file, INPUT_OVERRIDE || TARGET_FILE);
  }
  let acornOk, acornFail, zasa;
  // Acorn does support version, but also always annexb and no strict mode option
  if (TEST_ACORN) {
    if (tob.fileShort.startsWith('tests/testcases/regexes/range_surrogate_head_end/')) {
      acornOk = false;
      acornFail = 'infinite loop';
    } else {
      [acornOk, acornFail, zasa] = compareAcorn(code, !e, testVariant, ENABLE_ANNEXB || annexB, tob.file, tob.inputOptions.es, INPUT_OVERRIDE || TARGET_FILE);
    }
  }

  let nodeFail = undefined;
  if (COMPARE_NODE) {
    if (testVariant === TEST_STRICT || testVariant === TEST_SLOPPY) {
      try {
        Function((testVariant === TEST_STRICT ? '"use strict";' : '') + code);
        nodeFail = false
      } catch (e) {
        nodeFail = e;
      }
    }
  }

  return {r, e, stdout, babelOk, babelFail, zasb, nodeFail, acornOk, acornFail, zasa};
}
async function postProcessResult(tob/*: Tob */, testVariant/*: "sloppy" | "strict" | "module" */, annexB) {
  let {parserRawOutput: {[testVariant+annexB]: {r, e, stdout, babelOk, babelFail, zasb, nodeFail, acornOk, acornFail, zasa}}, file} = tob;
  if (!r && !e) return; // no output for this variant

  let errorMessage = '';
  if (e) {
    errorMessage = e.message;
    if (errorMessage.includes('Assertion fail')) {
      stdout.forEach(a => console.log.apply(console, a));

      console.error('####\nAn ' + BLINK + 'assertion' + RESET + ' error was thrown in ' + BOLD + testVariant + RESET + ' mode with annexB=' + annexB + '\n');
      console.error(BOLD + 'Input:' + RESET + '\n\n`````\n' + tob.inputCode + '\n`````\n\n' + BOLD + 'Error message:' + RESET + '\n');
      console.error(errorMessage);
      console.error('####');
      console.error(e.stack);
      if (!NO_FATALS) {
        hardExit(tob, 'postProcessResult assertion error');
        throw new Error('Assertion error. Mode = ' + testVariant + ', annexB=' + annexB + ', file = ' + file + '; ' + errorMessage.message);
      }
    }
    else if (errorMessage.startsWith('Parser error!')) {
      errorMessage = errorMessage.slice(0, 'Parser error!'.length) + '\n  ' + errorMessage.slice('Parser error!'.length + 1);
    }
    else if (errorMessage.startsWith('Lexer error!')) {
      errorMessage = errorMessage.slice(0, 'Lexer error!'.length) + '\n    ' + errorMessage.slice('Lexer error!'.length + 1);
    }
    else {
      stdout.forEach(a => console.log.apply(console, a));

      // errorMessage = 'TEMP SKIPPED UNKNOWN ERROR';
      console.error('####\nThe following ' + BLINK + 'unexpected' + RESET + ' error was thrown in ' + BOLD + testVariant + RESET + ' mode with annexB=' + annexB + ':\n');
      console.error(errorMessage);
      console.error(e.stack);
      console.error('####');
      if (!NO_FATALS) {
        hardExit(tob, 'postProcessResult unknown error');
        throw new Error('Non-graceful error, fixme. Mode = ' + testVariant + ', annexB=' + annexB + ', file = ' + file + '; ' + errorMessage.message);
      }
    }
  }

  let outputTestString = (
    // throws: Parser error!
    // throws: Lexer error!
    (errorMessage ? 'throws: ' + errorMessage : '') +
    // (r ? 'ast: ' + JSON.stringify(r.ast) + '\n\n' + formatTokens(r.tokens) : '')
    // Using util.inspect makes the output formatting highly tightly bound to node's formatting rules
    // At the same time, the same could be said for Prettier (although we can lock that down by package version,
    // independent from node version). However, using prettier takes roughly 23 seconds, inspect half a second. Meh.
    (r ? 'ast: ' + astToString(r.ast) + '\n\n' + formatTokens(r.tokens) : '')
  );

  let babelMatchError = '';
  if (TEST_BABEL && annexB && testVariant !== 'strict') {
    // Babel does not support sloppy/strict switch and always enables annexb rules, so do not check other combos
    if (Number.isFinite(tob.inputOptions.es)) {
      tob.compareSkippedExplicitVersion = true;
    } else {
      ASSERT(!babelOk !== !babelFail, 'babel should have run, should either pass or fail, not both, not neither [file = ' + file +' ]');
      tob.compareWhiteListed = ignoreTenkoTestForBabel(tob.fileShort);
      babelMatchError = processBabelResult(babelOk, babelFail, !!e, zasb, tob, TEST_BABEL, INPUT_OVERRIDE);

      if (babelMatchError && TARGET_FILE) {
        console.log('babelMatchError:', BOLD, babelMatchError, RESET)
        // throw new Error(babelMatchError)
      }
      if (babelMatchError) tob.compareHadMatchFailure = true;
      if (!INPUT_OVERRIDE && !TARGET_FILE && tob.compareWhiteListed) {
        babelMatchError = '';
      }
    }
  }

  let acornMatchError = '';
  if (TEST_ACORN && annexB && testVariant !== 'strict') {
    ASSERT(!acornOk !== !acornFail, 'acorn should have run, should either pass or fail, not both, not neither');
    // Acorn does not support sloppy/strict switch and always enables annexb rules, so do not check other combos
    tob.compareWhiteListed = ignoreTenkoTestForAcorn(tob.fileShort);
    acornMatchError = processAcornResult(acornOk, acornFail, !!e, zasa, tob, TEST_ACORN, INPUT_OVERRIDE);
    if (acornMatchError && TARGET_FILE) {
      console.log('acornMatchError:', BOLD, acornMatchError, RESET)
      // throw new Error(babelMatchError)
    }
    if (acornMatchError) tob.compareHadMatchFailure = true;
    if (!INPUT_OVERRIDE && !TARGET_FILE && tob.compareWhiteListed) {
      acornMatchError = '';
    }
  }

  let nodeOutput = (
    nodeFail === undefined ? '' :
    testVariant === TEST_STRICT ?
      ((!nodeFail && e) ? 'Node compiled a function with a strictmode header and this input without error\n\n' : (nodeFail && !e) ? 'Node threw an error while compiling a function with a strictmode header and this input\n\n' : '')
        :
      ((!nodeFail && e) ? 'Node compiled a function with this input without error\n\n' : (nodeFail && !e) ? 'Node threw an error while compiling a function with this input:\n' + nodeFail + '\n\n' : '')
  );

  // Caching it like this takes up more memory but makes deduping other modes so-much-easier
  switch (testVariant) {
    case TEST_SLOPPY:
      if (annexB) {
        tob.newOutputSloppyAnnexB = outputTestString;
        tob.newOutputSloppyAnnexBBabel = babelMatchError;
        tob.newOutputSloppyAnnexBNode = nodeOutput;
        tob.newOutputSloppyAnnexBAcorn = acornMatchError;
      } else {
        tob.newOutputSloppy = outputTestString;
        tob.newOutputSloppyBabel = babelMatchError;
        tob.newOutputSloppyNode = nodeOutput;
        tob.newOutputSloppyAcorn = acornMatchError;
      }
      break;
    case TEST_STRICT:
      if (annexB) {
        tob.newOutputStrictAnnexB = outputTestString;
        tob.newOutputStrictAnnexBBabel = babelMatchError;
        tob.newOutputStrictAnnexBNode = nodeOutput;
        tob.newOutputStrictAnnexBAcorn = '';
      } else {
        tob.newOutputStrict = outputTestString;
        tob.newOutputStrictBabel = babelMatchError;
        tob.newOutputStrictNode = nodeOutput;
        tob.newOutputStrictAcorn = '';
      }
      break;
    case TEST_MODULE:
      if (annexB) {
        tob.newOutputModuleAnnexB = outputTestString;
        tob.newOutputModuleAnnexBBabel = babelMatchError;
        tob.newOutputModuleAnnexBAcorn = acornMatchError;
      } else {
        tob.newOutputModule = outputTestString;
        tob.newOutputModuleBabel = babelMatchError;
        tob.newOutputModuleAcorn = acornMatchError;
      }
      break;
    default: FIXME;
  }
}

async function runTest(list, tenko, testVariant/*: "sloppy" | "strict" | "module" */, annexB) {
  if (!RUN_VERBOSE_IN_SERIAL) console.log(' - Now testing', INPUT_OVERRIDE ? 'for:' : 'all cases for:', testVariant, 'annexb=', annexB);
  if (!RUN_VERBOSE_IN_SERIAL) console.time('  $$ Batch for ' + testVariant + ' (annexB='+annexB+')');

  let bytes = 0;
  let ok = 0;
  let fail = 0;
  if (!RUN_VERBOSE_IN_SERIAL) console.log('   Parsing all inputs');
  if (!RUN_VERBOSE_IN_SERIAL) console.time('   $$ Parse time for all tests');
  await Promise.all(list.map(async (tob/*: Tob */) => {
    let {inputCode, inputOptions} = tob;
    bytes += inputCode.length;
    if (REDUCING) {
      // Note: we disable code frame generation because it leads to a very noisy error message that includes the input
      // code and line numbers. The test case minifier relies purely on the output error staying the same.
      reduceAndExit(tob.inputCode, code => coreTest(tob, tenko, testVariant, annexB, false, code, false).e || false, `./t --${testVariant} ${annexB ? '--annexb' : ''} ${Number.isFinite(FORCED_ES_TARGET || tob.inputOptions.es) ? FORCED_ES_TARGET || tob.inputOptions.es : ''}`, tob.file);
    }
    // This is quite memory expensive but much easier to work with
    tob.parserRawOutput[testVariant+annexB] = coreTest(tob, tenko, testVariant, annexB, true);
    if (CONCISE) return;
    let rawOutput = tob.parserRawOutput[testVariant+annexB];
    if (SEARCH) {
      let e = rawOutput.e;
      // If you use -q -i then you just want to know whether or not some codepath hits some code
      if (INPUT_OVERRIDE) {
        PRINT_HIT('# ' + testVariant + ' (annexb = ' + annexB + ')')
        if (hitsToReport.length) {
          let box = `[${(e&&e.message.includes('TODO')?'T':e?RED+'x':GREEN+'v')+RESET}]`;
          let root = `${box} Input ${BOLD + 'WAS' + RESET} hit` + (hitsToReport.length > 1 ? ` (${hitsToReport.length}x)` : '') + '    ';
          hitsToReport.forEach((hit, i) => {
            if (i === 0) PRINT_HIT(root + '(' + hit + ')')
            else PRINT_HIT(' ' + '('.padStart(root.length - ((box.length - 3) + BOLD.length + RESET.length), ' ') + hit + ')');
          })
        } else {
          PRINT_HIT(`[${(e&&e.message.includes('TODO')?'T':e?RED+'x':GREEN+'v')+RESET}] Input ${'was ' + BOLD + 'NOT' + RESET} hit`);
        }
      } else if (hitsToReport.length) {
        if (!foundCache.has(inputCode)) {
          let box = `[${(e && e.message.includes('TODO')?'T':e?RED+'x':GREEN+'v')+RESET}]`;
          let root = `// ${box}: \`${toPrint(inputCode)}\`` + (hitsToReport.length > 1 ? ' (' + hitsToReport.length + 'x)' : '') + '     ';
          hitsToReport.forEach((hit, i) => {
            if (i === 0) PRINT_HIT(root + '(' + hit + ')')
            else PRINT_HIT(' ' + '('.padStart(root.length-(box.length - 3), ' ') + hit + ')');
          });
          foundCache.add(tob.inputCode); // dedupe tests with the same input
        }
      }
      return;
    }
    if (rawOutput.e) ++fail;
    else if (rawOutput.r) ++ok;
    else throw new Error('invariant');
  }));
  if (!RUN_VERBOSE_IN_SERIAL) console.log('   Have', list.length, 'results, totaling', bytes, 'bytes, ok = ', ok, ', fail =', fail);
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('   $$ Parse time for all tests');
  if (SEARCH) return;
  if (CONCISE) return;

  if (TESTS_ONLY) {
    if (!RUN_VERBOSE_IN_SERIAL) console.log('   Skipping post process step because -n was given');
  } else {
    if (!RUN_VERBOSE_IN_SERIAL) console.log('   Processing', list.length, 'result for all tests');
    if (!RUN_VERBOSE_IN_SERIAL) console.time('   $$ Parse result post processing time');
    await Promise.all(list.map(async (tob/*: Tob*/) => await postProcessResult(tob, testVariant, annexB)));
    if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('   $$ Parse result post processing time');
  }

  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('  $$ Batch for ' + testVariant + ' (annexB='+annexB+')');
}

function showDiff(tob) {
  console.log(
    '\n' +
    BOLD + '######' + RESET + '\n' +
    BOLD + '## ' + RESET + 'Now showing diff' + '\n' +
    BOLD + '## ' + RESET + 'File:', tob.file, '\n' +
    BOLD + '###### Input:' + RESET + '\n' +
    tob.inputCode, '\n' +
    BOLD + '######' + RESET + '\n'
  );

  // For diffing sake, dont encode the unicode stuff when doing acorn/babel runs
  let newData = TEST_ACORN || TEST_BABEL
    ? tob.newData
    : encodeUnicode(tob.newData);

  // We omit some test-boiler plate from the diff because we don't care about that in the diff
  // (This is visual to the test runner only, actual test cases will still have this stuff)
  execSync(
    // Use base64 to prevent shell interpretation of input. Final `cat` is to suppress `diff`'s exit code when diff.
    `colordiff -a -y -w -W200 <(
      cat "${tob.file}" |
      grep -v "_Note: the whole output block is auto-generated. Manual changes will be overwritten!_" |
      grep -v "Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy)." |
      grep -v "Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb" |
      grep -v "Note that the output parts are auto-generated by the test runner to reflect actual result." |
      grep -v "Parsed with script goal and as if the code did not start with strict mode header." |
      grep -v "Parsed with script goal but as if it was starting with \\\`\\"use strict\\"\\\` at the top." |
      grep -v "Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header." |
      grep -v "Parsed with script goal with AnnexB rules enabled but as if it was starting with \\\`\\"use strict\\"\\\` at the top." |
      grep -v "Parsed with the module goal." |
      grep -v "Parsed in sloppy script mode but with the web compat flag enabled." |
      sed '/^$/N;/^\\n$/D'
    ) <(
      echo '${Buffer.from(newData).toString('base64')}' | base64 -d - |
      grep -v "_Note: the whole output block is auto-generated. Manual changes will be overwritten!_" |
      grep -v "Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy)." |
      grep -v "Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb" |
      grep -v "Note that the output parts are auto-generated by the test runner to reflect actual result." |
      grep -v "Parsed with script goal and as if the code did not start with strict mode header." |
      grep -v "Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header." |
      grep -v "Parsed with script goal but as if it was starting with \\\`\\"use strict\\"\\\` at the top." |
      grep -v "Parsed with script goal with AnnexB rules enabled but as if it was starting with \\\`\\"use strict\\"\\\` at the top." |
      grep -v "Parsed with the module goal." |
      grep -v "Parsed in sloppy script mode but with the web compat flag enabled." |
      sed '/^$/N;/^\\n$/D'
    ) |
    cat`,
    {stdio: 'inherit', shell: '/bin/bash', encoding: 'utf8'}
  );
}
function hardExit(tob, msg) {
  stopAsap = true;
  if (!msg) FIXME
  if (tob) console.log(RED + 'FAIL' + RESET + ' ' + DIM + tob.fileShort + RESET);
  if (!NO_FATALS) {
    console.log('Hard exit() node now because: ' + msg);
    process.exit();
  }
}

async function runTests(list, tenko) {
  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ Total runtime');
  if (!RUN_VERBOSE_IN_SERIAL) console.log('Now actually running all', list.length, 'test cases... 4x! Single threaded! This may take some time (~20s on my machine)');
  if (RUN_SLOPPY) await runTest(list, tenko, TEST_SLOPPY, false);
  if (RUN_STRICT) await runTest(list, tenko, TEST_STRICT, false);
  if (RUN_MODULE) await runTest(list, tenko, TEST_MODULE, false);
  if (RUN_SLOPPY) await runTest(list, tenko, TEST_SLOPPY, true);
  if (RUN_MODULE) await runTest(list, tenko, TEST_MODULE, true);
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ Total runtime');
  if (SEARCH) return;

  if (RUN_VERBOSE_IN_SERIAL && !AUTO_UPDATE && !INPUT_OVERRIDE) {
    for (let i=0; i<list.length; ++i) {
      let tob = list[i];
      let oldOutput = tob.oldData;
      let newOutput = generateOutputBlock(tob);
      if (newOutput !== oldOutput) {
        console.log('\nTest output change detected!\n');
        // dump outputs
        if (RUN_SLOPPY) {
          console.log(BOLD + '### Terminal output for sloppy annexb=false run:' + RESET);
          tob.parserRawOutput.sloppyfalse.stdout.forEach((a) => console.log(...a));
          console.log(BOLD + '### Terminal output for sloppy annexb=true run:' + RESET);
          tob.parserRawOutput.sloppytrue.stdout.forEach((a) => console.log(...a));
        }
        if (RUN_STRICT) {
          console.log(BOLD + '### Terminal output for strict run:' + RESET);
          tob.parserRawOutput.strictfalse.stdout.forEach((a) => console.log(...a));
        }
        if (RUN_MODULE) {
          console.log(BOLD + '### Terminal output for module annexb=false run:' + RESET);
          tob.parserRawOutput.modulefalse.stdout.forEach((a) => console.log(...a));
          console.log(BOLD + '### Terminal output for module annexb=true run:' + RESET);
          tob.parserRawOutput.moduletrue.stdout.forEach((a) => console.log(...a));
        }

        if (!TARGET_FILE && !INPUT_OVERRIDE) {
          showDiff(tob);
        }

        console.log('\n' + DIM + tob.fileShort + RESET);
        console.log(BOLD + '\n./t f "' + tob.file + '"'+(TEST_BABEL ? ' --test-babel' : '')+(TEST_ACORN ? ' --test-acorn' : '')+'\n');

        if (!TARGET_FILE && !INPUT_OVERRIDE) {
          if (tob.continuePrint) console.error(tob.continuePrint);
          let cont = await yn('Continue?');
          if (!cont) hardExit(tob, 'Test output change detected. Aborting early.');
        }
      }
    }
  }
}

function constructNewOutput(list) {
  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ New output construction time');
  list.forEach((tob/*: Tob */) => {
    generateOutputBlock(tob);
    // TODO: create a compat table; "what do other parsers do with this input?"
  });
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ New output construction time');
}
async function writeNewOutput(list) {
  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ Write updated test files');
  let updated = 0;

  if (CONFIRMED_UPDATE) {
    // This is slower but must process files in serial...
    for (let i=0; i<list.length; ++i) {
      let tob = list[i];
      const {newData, oldData, file} = tob;
      if (newData !== oldData || FORCE_WRITE) {
        if (tob.continuePrint) console.error(tob.continuePrint);
        console.log('\n' + DIM + tob.fileShort + RESET);
        console.log(DIM + '\n./t f "' + tob.file + '"'+(TEST_BABEL ? ' --test-babel' : '')+(TEST_ACORN ? ' --test-acorn' : '')+'\n' + RESET);
        let cont = await yn('Continue to overwrite test output?');
        if (USE_BUILD) {
          // Never write build output to test files ...
          console.log('Did NOT write to file because using prod builds to test');
        } else if (cont) {
          ++updated;
          await promiseToWriteFile(file, newData);
        }
      } else {
        if (tob.continuePrint) {
          console.log('\n' + DIM + tob.fileShort + RESET);
          console.log(DIM + '\n./t f "' + tob.file + '"'+(TEST_BABEL ? ' --test-babel' : '')+(TEST_ACORN ? ' --test-acorn' : '')+'\n' + RESET);
          if (!await yn('File was not changed, invariant was broken and written anyways. Continue testing?')) process.exit();
        }
      }
    }
  } else {
    await Promise.all(list.map((tob/*: Tob */) => {
      const {newData, oldData, file} = tob;
      if (newData !== oldData || FORCE_WRITE) {
        if (AUTO_UPDATE) {
          if (STOP_AFTER_TEST_FAIL) stopAsap = true;
          ++updated;
          return promiseToWriteFile(file, newData);
        } else {
          console.log('\n' + DIM + tob.fileShort + RESET);
          console.log(DIM + '\n./t f "' + tob.file + '"'+(TEST_BABEL ? ' --test-babel' : '')+(TEST_ACORN ? ' --test-acorn' : '')+'\n' + RESET);
          console.error('Output mismatch for', file);
          return Promise.resolve();
        }
      }
    }));

    if (!NO_FATALS && updated && (STOP_AFTER_TEST_FAIL || STOP_AFTER_FILE_FAIL)) {
      stopAsap = true;
      hardExit(undefined, 'updated at least one file in writeNewOutput()');
    }
  }

  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ Write updated test files');
  if (!RUN_VERBOSE_IN_SERIAL) console.log('Updated', updated, 'files');
}

async function loadTenkoAsync() {
  let Tenko;
  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ Parser load');
  ({
    Tenko,
    COLLECT_TOKENS_SOLID,
    COLLECT_TOKENS_NONE ,
    COLLECT_TOKENS_ALL,
    COLLECT_TOKENS_TYPES,
    GOAL_MODULE,
    GOAL_SCRIPT,
    WEB_COMPAT_ON,
    WEB_COMPAT_OFF,
    toktypeToString,
  } = await import(path.join(dirname, USE_BUILD ? TENKO_PROD_FILE : TENKO_DEV_FILE)));
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ Parser load');

  return Tenko;
}
async function runAndRegenerateList(list, tenko) {
  await runTests(list, tenko);
  if (TESTS_ONLY) {
    if (!RUN_VERBOSE_IN_SERIAL) console.log('Skipping write of updated test files because -n was given');
  }
  else if (!SEARCH) {
    constructNewOutput(list);
    if (RUN_VERBOSE_IN_SERIAL && list[0].oldData !== list[0].newData) {
      try {
        showDiff(list[0]);
      } catch (e) {
        console.log('Unable to show the diff... ' + e);
      }
    }
    if (TEST_BABEL || TEST_ACORN) {
      // Not writing new test output at all
    } else {
      await writeNewOutput(list);
    }
  }
}

async function cli(tenko) {
  let tob = new Tob('<cli>', INPUT_OVERRIDE);
  tob.inputCode = INPUT_OVERRIDE;
  tob.inputOptions.es = FORCED_ES_TARGET;
  let list = [tob];
  await runTests(list, tenko);

  if (!SEARCH && !CONCISE) {
    console.log('=============================================');
    if (RUN_SLOPPY) {
      ASSERT(list[0].newOutputSloppy !== false || list[0].newOutputSloppyAnnexB !== false, 'should update');
      if (list[0].newOutputSloppy !== false) {
        console.log('### Sloppy mode, annexB = false:');
        console.log(list[0].newOutputSloppy);
        console.log('=============================================\n');
      }
      if (list[0].newOutputSloppyAnnexB !== false) {
        console.log('### Sloppy mode, annexB = true:');
        if (list[0].newOutputSloppyAnnexB === list[0].newOutputSloppy) console.log('Same as sloppy without annexB');
        else console.log(list[0].newOutputSloppyAnnexB);
        console.log('=============================================\n');
      }
    }
    if (RUN_STRICT) {
      ASSERT(list[0].newOutputStrict !== false || list[0].newOutputStrictAnnexB !== false, 'should update');
      if (list[0].newOutputStrict !== false) {
        console.log('### Strict mode, annexB = false:');
             if (RUN_SLOPPY && list[0].newOutputStrict === list[0].newOutputSloppy) console.log('Same as sloppy');
        else if (RUN_SLOPPY && list[0].newOutputStrict === list[0].newOutputSloppyAnnexB) console.log('Same as sloppy with annexB');
        else console.log(list[0].newOutputStrict);
        console.log('=============================================\n');
      }
      if (list[0].newOutputStrictAnnexB !== false) {
        console.log('### Strict mode, annexB = true:');
             if (RUN_SLOPPY && list[0].newOutputStrictAnnexB === list[0].newOutputSloppy) console.log('Same as sloppy');
        else if (RUN_SLOPPY && list[0].newOutputStrictAnnexB === list[0].newOutputSloppyAnnexB) console.log('Same as sloppy with annexB');
        else if (RUN_SLOPPY && list[0].newOutputStrictAnnexB === list[0].newOutputStrict) console.log('Same as strict without annexB');
        else console.log(list[0].newOutputStrictAnnexB);
        console.log('=============================================\n');
      }
    }
    if (RUN_MODULE) {
      ASSERT(list[0].newOutputModule !== false || list[0].newOutputModuleAnnexB !== false, 'should update');
      if (list[0].newOutputModule !== false) {
        console.log('### Module goal, annexB = false:');
             if (RUN_SLOPPY && list[0].newOutputModule === list[0].newOutputSloppy) console.log('Same as sloppy');
        else if (RUN_SLOPPY && list[0].newOutputModule === list[0].newOutputSloppyAnnexB) console.log('Same as sloppy with annexB');
        else if (RUN_STRICT && list[0].newOutputModule === list[0].newOutputStrict) console.log('Same as strict');
        else if (RUN_STRICT && list[0].newOutputModule === list[0].newOutputStrictAnnexB) console.log('Same as strict with annexB');
        else console.log(list[0].newOutputModule);
        console.log('=============================================\n');
      }
      if (list[0].newOutputModuleAnnexB !== false) {
        console.log('### Module goal, annexB = true:');
             if (RUN_SLOPPY && list[0].newOutputModuleAnnexB === list[0].newOutputSloppy) console.log('Same as sloppy');
        else if (RUN_SLOPPY && list[0].newOutputModuleAnnexB === list[0].newOutputSloppyAnnexB) console.log('Same as sloppy with annexB');
        else if (RUN_STRICT && list[0].newOutputModuleAnnexB === list[0].newOutputStrict) console.log('Same as strict');
        else if (RUN_STRICT && list[0].newOutputModuleAnnexB === list[0].newOutputStrictAnnexB) console.log('Same as strict with annexB');
        else if (RUN_SLOPPY && list[0].newOutputModuleAnnexB === list[0].newOutputModule) console.log('Same as module without annexB');
        else console.log(list[0].newOutputModuleAnnexB);
        console.log('=============================================\n');
      }
    }
    if (tob.printerOutput) console.log(tob.printerOutput[1]);
  }
}

async function main(tenko) {
  if (TARGET_FILE) {
    console.log('Using explicit file:', TARGET_FILE);
    files = [TARGET_FILE];
  } else {
    files = files.filter(f => !f.endsWith('autogen.md'));
  }
  if (ACORN_COMPAT) console.log('Forcing Acorn compat AST');
  if (BABEL_COMPAT) console.log('Forcing Babel compat AST');

  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ Test file read time');
  let list = await readFiles(files);
  if (!TARGET_FILE) list = list.filter(tob => !tob.fileShort.startsWith('tests/testcases/todo/')); // Skip todo dir unless explicitly asking for it
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ Test file read time');
  console.log('Read', list.length, 'files');

  await extractFiles(list);
  let beforeLen = list.length;
  if (!TARGET_FILE) list = list.filter(tob => !tob.aboveTheFold.toLowerCase().includes('\n## skip\n'));
  console.log('Filtered', beforeLen - list.length,'skipped tests (containing `## skip`)');

  if (RUN_VERBOSE_IN_SERIAL) {
    for (let i=0; i<list.length && !stopAsap; ++i) {
      let tob = list[i];
      await runAndRegenerateList([tob], tenko);
      let count = String(i+1).padStart(String(list.length).length, ' ') + ' / ' + list.length;
      if (tob.compareHadMatchFailure && !tob.compareWhiteListed) {
        unxepctedFails.push(tob.fileShort);
        console.log(BOLD + RED + 'BAD!' + RESET + ' ' + count + ' ' + DIM + tob.fileShort + RESET + ' (file not whitelisted to fail but it failed anyways, investigate)');
      } else if (tob.compareHadMatchFailure) {
        ASSERT(tob.compareWhiteListed, 'then it is whitelisted');
        skippedOtherParserList.push(tob.fileShort);
        console.log(BOLD + GREEN + 'SKIP' + RESET + ' ' + count + ' ' + DIM + tob.fileShort + RESET + ' (file whitelisted to fail and it failed)');
      } else if (tob.compareWhiteListed) {
        ASSERT(!tob.compareHadMatchFailure, 'then it is whitelisted but did not fail');
        unexpectedPass.push(tob.fileShort);
        console.log(BOLD + RED + 'DROP' + RESET + ' ' + count + ' ' + DIM + tob.fileShort + RESET + ' (file whitelisted to fail but did not fail, remove from list)');
      } else if (tob.compareSkippedExplicitVersion) {
        skippedOtherParserList.push(tob.fileShort);
        console.log(BOLD + GREEN + 'SKIP' + RESET + ' ' + count + ' ' + DIM + tob.fileShort + RESET + ' (file skipped because it targets a specific ES version and we dont care about those cases here)');
      } else if (tob.oldData !== tob.newData) {
        console.log(BOLD + RED + 'FAIL' + RESET + ' ' + count + ' ' + DIM + tob.fileShort + RESET);
      } else {
        console.log(BOLD + GREEN + 'PASS' + RESET + ' ' + count + ' ' + DIM + tob.fileShort + RESET);
      }
    }
    if (skippedOtherParserList.length) {
      console.log(BOLD + 'Properly ignored these files:' + RESET);
      // console.log(skippedOtherParserList.sort().join('\n'))
    }
    if (unexpectedPass.length) {
      console.log(BOLD + 'These files were whitelisted but they already match:' + RESET);
      console.log(unexpectedPass.sort().join('\n'))
    }
    if (unxepctedFails.length) {
      console.log(BOLD + 'These files did not match and were not whitelisted:' + RESET);
      console.log(unxepctedFails.sort().join('\n'))
    }
    console.log('Match status: whitelisted: ' + skippedOtherParserList.length + 'x, unexpected misses: ' + unxepctedFails.length + 'x, unexpected passes: ' + unexpectedPass.length + 'x');
    if (unxepctedFails.length || unexpectedPass.length) console.log('Use -q to stop immediately on an unexpected miss/match');
  } else {
    await runAndRegenerateList(list, tenko);
  }

  console.timeEnd('$$ Whole test run');
}

function sanitize(dir) {
  return dir
  .trim()
  .replace(/(?:\s|;|,)+/g, '_')
  .replace(/\.\.\./g, 'rest') // or spread, but bla
  .replace(/[^a-zA-Z0-9_-]/g, s => s.charCodeAt(0).toString(16));
}

async function gen(tenko) {
  const CASE_HEAD = '### Cases';
  const TPL_HEAD = '### Templates';
  const OUT_HEAD = '## Output';

  files = files.filter(f => f.endsWith('autogen.md'));
  let list = await readFiles(files);

  for (let ti=0; ti<list.length; ++ti) {
    let tob/*: Tob */ = list[ti];
    let genDir = path.join(path.dirname(tob.file), 'gen');

    if (fs.existsSync(genDir)) {
      if (!AUTO_GENERATE_CONSERVATIVE) {
        // Drop all files in this dir (this is `gen`, should be fine to fully regenerate anything in here at any time)
        let oldFiles = [];
        getTestFiles(genDir, '', oldFiles, true, true);
        // Note: the folder should only contain generated files and folders which should delete just fine
        oldFiles.forEach(file => { try { fs.unlinkSync(file); } catch (e) { fs.rmdirSync(file); } });
      }
    } else {
      fs.mkdirSync(genDir, {recursive: true});
    }

    let caseOffset = tob.oldData.indexOf(CASE_HEAD);
    let templateOffset = tob.oldData.indexOf(TPL_HEAD, CASE_HEAD);
    let outputOffset = tob.oldData.indexOf(OUT_HEAD, TPL_HEAD);
    ASSERT(caseOffset >= 0 || templateOffset >= 0 || outputOffset >= 0, 'missing required parts of autogen', tob.file);
    let cases = tob.oldData
      .slice(caseOffset + CASE_HEAD.length, templateOffset)
      .split('> `````js\n')
      .slice(1) // first element is the header
      .map(s => {
        // Note: code blocks start with > ``js and end with > `` and are (markdown) "quoted" throughout, + single space
        // So search for the quint -``js and cut up to the next quint-``, then scrub the quoting prefix `> `
        return s
          .split('\n> `````')[0] // Only get the code block, don't care about the rest
          .split('\n')
          .map(s => {
            ASSERT(s[0] === '>' && s[1] === ' ', 'cases should be md quoted entirely, with one space', tob.file, s);
            return s.slice(2);
          })
          .join('\n'); // Not likely to be multi line but why not
      })
    ;

    let params = tob.oldData
      .slice(templateOffset + TPL_HEAD.length, tob.oldData.indexOf('####', templateOffset + TPL_HEAD.length))
      .split('\n')
      .map(s => s.trim())
      .filter(s => s[0] === '-')
      .reduce((obj, s) => {
        ASSERT(s[1] === ' ' && s[2] === '`' && s[s.length - 1] === '`', 'param composition', obj.file, s);
        let [k, v] = s.slice(3, -1).split(' = ');
        if (String(parseInt(v, 10)) === v) v = parseInt(k, 10);
        else if (v === 'true') v = true;
        else if (v === 'false') v = false;
        else if (v === 'null') v = null;
        obj[k] = v;
        return obj;
      }, {});

    // Temlates have a header and also have a ``js codeblock
    let templates = tob.oldData
      .slice(templateOffset + TPL_HEAD.length, outputOffset)
      .split('\n#### ')
      .slice(1) // first element is the header
      .map(s => {
        // We split on the #### so the title should be at the start of `s` now
        let title = s.split('\n')[0].trim();
        // Get everything inside the js code block
        let code = s.split('`````js\n')[1].split('\n`````')[0];
        return {title, code};
      })
    ;

    // Now generate all cases with each # in the params and templates replaced with each case

    let wrote = 0;
    let skipped = 0;
    for (let i=0; i<templates.length; ++i) {
      let template = templates[i];
      let {title, code} = template;
      let caseDir = path.join(genDir, sanitize(String(title)));
      fs.mkdirSync(caseDir, {recursive: true});
      for (let j=0; j<cases.length; ++j) {
        let c = cases[j];
        let testFile = path.join(caseDir, sanitize(String(c)) + '.md');

        if (!AUTO_GENERATE_CONSERVATIVE || !fs.existsSync(testFile)) {
          // immediately generate a test case for it, as well
          await promiseToWriteFile(testFile, createAutoGeneratedTestFileContents(tob, caseDir, title, c, params, code));
          ++wrote;
        } else {
          ++skipped;
        }
      }
    }
    console.log(
      'Wrote', wrote, 'new test files' +
      (skipped ? ', skipped ' + skipped + ' existing files' : ''),
      'dir:', genDir.slice(path.join(dirname, '..').length+1)
    );
  }
}
function createAutoGeneratedTestFileContents(tob/*: Tob */, caseDir, title, c, params, code) {
  return `# Tenko parser autogenerated test case

- From: ${tob.fileShort}
- Path: ${caseDir.slice(caseDir.indexOf('tenko') + 10)}

> :: test: ${title.split('\n').join('\n>          ')}
>
> :: case: ${c.split('\n')    .join('\n>          ')}

## Input

${
  Object
    .getOwnPropertyNames(params)
    .map(key => '- `' + key + ' = ' + params[key].replace(/#/g, c) + '`\n')
    .join('')
  }${
    OUTPUT_QUINTICKJS
  }${
    code.replace(/#/g, c)
  }${
    OUTPUT_QUINTICK
  }`;
}

function formatTokens(tokens) {
  // console.log('tokens:', tokens)

  let s = 'tokens (' + tokens.length + 'x):\n';
  let line = tokens.length > 1 ? ' '.repeat(6) : '';

  for (let i=0, l=tokens.length-1; i<l; ++i) {
    let next = toktypeToString(tokens[i]);
    if ((line + ' ' + next).length > 70) {
      s += line + '\n';
      line = ' '.repeat(7) + next;
    } else {
      line += ' ' + next;
    }
  }
  s += line;
  return s;
}

function updateAboveTheFold(tob) {

  /*
The format is something like this:

```
# Tenko parser test case

- Path: tenko/tests/testcases/dir/dir/dir/file_name.md

> :: dir : dir : dir
>
> ::> file name
>
> Actual comments go here
  ```
  */
  let topGrep = /^\s*(# Tenko parser (?:autogenerated )?test case)\n\s*\n(- From:.*?\s*\n)*(?:- (?:Path|Added|Modified):.*?\s*\n)*(> :: .*\s*\n>\s*\n)?(> ::>? .*\s*\n)?/;

  ASSERT(/\s*^# Tenko parser (autogenerated )?test case/.test(tob.aboveTheFold), 'all test cases should include this title: ' + tob.file + ' did not');
  let fold = tob.aboveTheFold.replace(topGrep, (_, title, from) => title + `

${from||''}- Path: ${tob.fileShort}

> :: ${path.dirname(tob.fileShort).split('/').filter(s => !['tests', 'testcases', ''].includes(s)).map(s => s.replace(/_/g, ' ')).join(' : ').replace(/ +/g, ' ').trim()}
>
> ::> ${path.basename(tob.fileShort, path.extname(tob.fileShort)).replace(/_/g, ' ').replace(/ +/g, ' ').trim()}
`
  );

  return fold;
}
function generateOutputBlock(tob) {
  // Replace the whole output block with the current results. We then compare the old to the new and write if different.
  // Some may not have been generated (yet) and will default to the old value

  let sloppy = ifNotFalse(tob.newOutputSloppy, tob.oldOutputSloppy);
  let sloppyAnnexB = ifNotFalse(tob.newOutputSloppyAnnexB, tob.oldOutputSloppyAnnexB);
  let strict = ifNotFalse(tob.newOutputStrict, tob.oldOutputStrict);
  // let strictAnnexB = ifNotFalse(tob.newOutputStrictAnnexB, tob.oldOutputStrictAnnexB);
  let module = ifNotFalse(tob.newOutputModule, tob.oldOutputModule);
  let moduleAnnexB = ifNotFalse(tob.newOutputModuleAnnexB, tob.oldOutputModuleAnnexB);

  let fold = updateAboveTheFold(tob);

  return tob.newData =
    fold +
    generateInput(tob) +
    generateOutputHeader() +
    generateOutputSloppy(sloppy, false, '', tob.newOutputSloppyBabel, tob.newOutputSloppyNode, tob.newOutputSloppyAcorn) +
    generateOutputStrict(strict, false, sloppy, tob.newOutputStrictBabel, tob.newOutputStrictNode) +
    // generateOutputStrict(strictAnnexB, true, sloppy, tob.newOutputStrictAnnexBBabel, tob.newOutputStrictAnnexBNode) +
    generateOutputModule(module, false, '', '', strict, sloppy, tob.newOutputModuleBabel, tob.newOutputModuleAcorn) +
    generateOutputSloppy(sloppyAnnexB, true, sloppy, tob.newOutputSloppyAnnexBBabel, tob.newOutputSloppyAnnexBNode, tob.newOutputSloppyAnnexBAcorn) +
    generateOutputModule(moduleAnnexB, true, module, sloppyAnnexB, strict, sloppy, tob.newOutputModuleAnnexBBabel, tob.newOutputModuleAnnexBAcorn) +
    (tob.printerOutput ? tob.printerOutput[1] : '') +
  '';
}
function ifNotFalse(a, b) {
  if (a === false) return b;
  return a;
}
function generateInput(tob) {
  return INPUT_HEADER + tob.inputHead + OUTPUT_QUINTICKJS + tob.inputCode + OUTPUT_QUINTICK;
}
function generateOutputHeader() {
  return OUTPUT_HEADER + '\n' +
    '_Note: the whole output block is auto-generated. Manual changes will be overwritten!_\n\n' +
    'Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.\n\n' +
    'Note that the output parts are auto-generated by the test runner to reflect actual result.\n' +
    '';
}
function generateOutputSloppy(sloppyOutput, annexB, sloppy, babelOutput, nodeOutput, acornOutput) {
  return (annexB ? OUTPUT_HEADER_SLOPPY_ANNEXB : OUTPUT_HEADER_SLOPPY) + '\n' +
    'Parsed with script goal' + (annexB ? ' with AnnexB rules enabled' : '') + ' and as if the code did not start with strict mode header.\n' +
    (sloppyOutput === sloppy ? '\n_Output same as sloppy mode._\n' : (OUTPUT_QUINTICK + sloppyOutput + OUTPUT_QUINTICK)) +
    babelOutput +
    nodeOutput +
    acornOutput +
    '';
}
function generateOutputStrict(strictOutput, annexB, sloppyOutput, babelOutput, nodeOutput) {
  return OUTPUT_HEADER_STRICT + '\n' +
    'Parsed with script goal' + (annexB ? ' with AnnexB rules enabled' : '') + ' but as if it was starting with `"use strict"` at the top.\n' +
    (strictOutput === sloppyOutput ? '\n_Output same as sloppy mode._\n' : (OUTPUT_QUINTICK + strictOutput + OUTPUT_QUINTICK)) +
    babelOutput +
    nodeOutput +
    '';
}
function generateOutputModule(moduleOutput, annexB, module, sloppyAnnexB, strictOutput, sloppyOutput, babelOutput, acornOutput) {
  return (annexB ? OUTPUT_HEADER_MODULE_ANNEXB : OUTPUT_HEADER_MODULE) + '\n' +
    'Parsed with the module goal' + (annexB ? ' with AnnexB rules enabled' : '') + '.\n' +
    (moduleOutput === sloppyOutput ? '\n_Output same as sloppy mode._\n' : moduleOutput === strictOutput ? '\n_Output same as strict mode._\n' : moduleOutput === module ? '\n_Output same as module mode._\n' : moduleOutput === sloppyAnnexB ? '\n_Output same as sloppy mode with annexB._\n' : (OUTPUT_QUINTICK + moduleOutput + OUTPUT_QUINTICK)) +
    babelOutput +
    acornOutput +
    '';
}

async function loadParsers() {
  let tenko = await loadTenkoAsync();

  if (TEST_BABEL || COMPARE_BABEL || BABEL_COMPAT) {
    ({
      compareBabel,
      ignoreTenkoTestForBabel,
      processBabelResult,
    } = await import('./parse_babel.mjs'));
  }
  if (TEST_ACORN || COMPARE_ACORN || ACORN_COMPAT) {
    ({
      compareAcorn,
      ignoreTenkoTestForAcorn,
      processAcornResult,
    } = await import('./parse_acorn.mjs'));
  }

  return tenko;
}

console.time('$$ Whole test run');

let files = [];
if (INPUT_OVERRIDE) {
  LOG('Using override input and only testing that...');
  if (!a && !b && !c) LOG('Sloppy mode implied (override with --strict or --module)');
  if (b && !a && !c) LOG('Testing in strict mode only');
  if (c && !a && !b) LOG('Testing in module goal only');
  if (ENABLE_ANNEXB) LOG('Testing with Annex B syntax extensions enabled');
  LOG('=============================================\n');
} else {
  if (!RUN_VERBOSE_IN_SERIAL) console.time('$$ Test search discovery time');
  getTestFiles(path.join(dirname, 'testcases'), '', files, true);
  if (!RUN_VERBOSE_IN_SERIAL) console.timeEnd('$$ Test search discovery time');
  console.log('Read all test files, gathered', files.length, 'files');
}

if (AUTO_GENERATE || AUTO_GENERATE_CONSERVATIVE) {
  loadParsers().then(gen);
} else if (INPUT_OVERRIDE) {
  loadParsers().then(cli);
} else {
  loadParsers().then(main);
}
