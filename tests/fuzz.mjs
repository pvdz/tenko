// ./t fuzz

console.log('\n---------------\n');

import {performance} from 'perf_hooks';

import {
  dumpFuzzOutput,
  warnOsd,
} from './fuzz/fuzzutils.mjs';
import {generateEslumpCode} from './fuzz/fuzzers/eslump.mjs';
import {
  generateZefuzzCode_classMethods,
  generateZefuzzCode_arrows,
  generateZefuzzCode_bindingPatterns,
} from './fuzz/fuzzers/zefuzz.mjs';

import {testPrinter} from "./run_printer.mjs";
import {fuzzAgainstNode} from "./fuzz/fuzz_against_node.mjs";

// Lazy loaded
let COLLECT_TOKENS_NONE;
let WEB_COMPAT_ON;

console.log('Tenko fuzzing tool');

let VERBOSE = true;
const USE_BUILD = process.argv.includes('-b');
if (USE_BUILD) console.log('-- Using prod build of Tenko');
const NO_PRINTER = USE_BUILD || process.argv.includes('--no-printer');
if (NO_PRINTER) console.log('-- Not testing Printer');
const TEST_NODE = process.argv.includes('--node');
if (TEST_NODE) console.log('-- Comparing pass/fail to node by compiling a function');
const PREFIX = process.argv.includes('--prefix') && process.argv[process.argv.indexOf('--prefix') + 1];
const SUFFIX = process.argv.includes('--suffix') && process.argv[process.argv.indexOf('--suffix') + 1];
console.log('');

const BOLD = '\x1b[;1;1m';
const DIM = '\x1b[30;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/tenko.prod.mjs';

const FUZZERS = [
  // These functions should be callable without args and return randomly generated source code to test
  generateEslumpCode,
  generateZefuzzCode_classMethods,
  generateZefuzzCode_arrows,
  generateZefuzzCode_bindingPatterns,
];
const INJECTS = [
  // Newline checks for ASI
  '\n',
  // Newline-forward-slash does regex vs division assertion checks
  '\n/',
  // Newline-regex does regex vs division assertion checks
  '\n/x/',
  // Newline-regex-flag does regex vs division assertion checks
  '\n/x/g',
  // Forward slash also does regex assertion checks
  '/',
  // Equals does assignability / destructuring assertion checks
  '=',
  // Whitespace does general weirdness checks
  ' ',
  // // An odd duck being right-associative but a regular op otherwise (unlike `yield`)
  // '**',
];

let startTick = performance.now();
let lastCounter = 0;
let lastTick = performance.now();
let lastSpeed = 0;
let lastTotalSpeed = 0;
let dynamicInterval = 88;

// Placeholders...
let Tenko = function(){ throw new Error('not yet loaded through import...'); };
let GOAL_SCRIPT = undefined;
let GOAL_MODULE = undefined;

let buffer = [];
let p = (input, trimming) => {
  ++counts.tenkoParsed;
  let z = Tenko(input, {
    goalMode: GOAL_SCRIPT,
    collectTokens: COLLECT_TOKENS_NONE,
    strictMode: false,
    webCompat: WEB_COMPAT_ON,
    templateNewlineNormalization: false, // Fine for fuzzing. This way we can re-use the AST for a printer test

    errorCodeFrame: false,
    truncCodeFrame: false,

    // Collect output but don't print it in case the retry fails
    $log: (...args) => trimming || buffer.push(args), // shhh
    $warn: (...args) => trimming || buffer.push(args), // shhh
    $error: (...args) => trimming || buffer.push(args), // shhh
  });

  return z;
};

const vlog = console.log;
const log = VERBOSE ? console.log : (...args) => VERBOSE && vlog(...args);
if (VERBOSE) console.log = console.warn = console.error = (...args) => VERBOSE && vlog(...args);

let counts = {
  fuzzedTests: 0, // How many fuzzed inputs were fuzzed?
  fuzzedBytes: 0, // How many input bytes were fuzzed?
  injectedTests: 0, // How many inputs were generated in total (includes derivatives / partials)
  injectionMode: 0, // How often did injection mode run? (should be 1%)
  tenkoParsed: 0, // How often has Tenko parsed input? (How often has the `p` function been called)
  bytesParsed: 0, // How many bytes has Tenko parsed?
  tenkoPassedFuzz: 0,
  nodePassedFuzz: 0,
  reduced: 0, // How many cases did we reduce (but not fatal)? This is an expensive step so we need to keep this low
};

let injectionMode = false; // Global: currently parsing input that was deliberately broken? (Only affects stats)
(async function(){
  ({
    Tenko,
    GOAL_MODULE,
    GOAL_SCRIPT,
    COLLECT_TOKENS_NONE,
    WEB_COMPAT_ON,
  } = (await import(USE_BUILD ? TENKO_PROD_FILE : TENKO_DEV_FILE)));

  while (true) {
    let from = Math.floor(Math.random() * 3);
    let input = FUZZERS[from]();
    if (PREFIX) input = PREFIX + input;
    if (SUFFIX) input = input + SUFFIX;
    ++counts.fuzzedTests;
    counts.fuzzedBytes += input.length; // sure, "characters", call off the dogs.

    if (cycle(input)) return;

    // In 1% of inputs do brute force breakage tests with chars that are likely to trip the parser (like `/`)
    if (Math.random() < 0.005) {
      injectionMode = true;
      ++counts.injectionMode;
      ++counts.injectedTests;
      for (let i=0; i<input.length; ++i) {
        ++counts.injectedTests;
        let chr = INJECTS[Math.floor(Math.random() * INJECTS.length)];
        let brokenInput = input.slice(0, i) + chr + input.slice(i);
        if (cycle(brokenInput)) return;
      }
      injectionMode = false;
    }
  }
})();
warnOsd('end of fuzzer');
console.log('Test failed. End of fuzzer.');

function parseTenko(input, counts, trimming) {
  let tfailed = false;
  let terror;
  let z;
  try {
    counts.bytesParsed += input.length;
    z = p(input, false);
    if (!injectionMode) ++counts.tenkoPassedFuzz;
  } catch (e) {
    terror = e;
    tfailed = e.message;
  }

  let tenkoAsserted = tfailed && tfailed.toLowerCase().includes('assert');
  let tenkoCrashed = !tenkoAsserted && tfailed && !(tfailed.includes('Parser error!') || tfailed.includes('Lexer error!'));

  if (tenkoAsserted) {
    dumpFuzzOutput(input, input, tfailed, 'tenko assertion failed');
    warnOsd('tenko assertion');
    console.log(BOLD + BLINK + 'ASSERTION FAIL' + RESET);
    console.log(terror.stack);
    process.exit();
  } else if (tenkoCrashed) {
    dumpFuzzOutput(input, input, tfailed, 'tenko had non-graceful exit');
    warnOsd('tenko assertion');
    console.log(BOLD + BLINK + 'Tenko CRASHED HARD' + RESET);
    console.log(terror.stack);
    process.exit();
  }

  return {z, e: tfailed};
}

function cycle(input) {
  input = input
  // https://tc39.github.io/ecma262/#prod-WhiteSpace Normalize whitespace to regular spaces for printing
  .replace(/[\x09\x0b\x0c\xa0\uFEFF]/g, ' ')
  // https://www.compart.com/en/unicode/category/Zs
  .replace(/[\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
  // replace other unicode gunk to an x for printing (we can do separate unicode runs later)
  .replace(/([^\x20-\x7f\n\r])/ug, 'x');

  if (TEST_NODE) {
    // Scrub some known errors prematurely
    input = input
    .replace(/\b0\d+[eE]?\d*(?:\.\d+)?/g, '901')
    .replace(/async\s+\n/g, 'async ') // classes with async newline
  }


  buffer = [];

  let {z, e: zefailed} = parseTenko(input, counts, false);

  if (TEST_NODE) {
    fuzzAgainstNode(input, zefailed, counts, injectionMode, parseTenko, `./t --module --annexb`);
  }

  if (z && !NO_PRINTER) {
    // Note: this is a very slow test. Easily cuts down efficiency to a third.
    try {
      testPrinter(input, 'sloppy', true, z.ast, false, false, false, false);
    } catch (e) {
      dumpFuzzOutput(input, input, zefailed, 'printer failed;\n' + e.stack);
      warnOsd('tenko assertion');
      process.exit();
    }
  }

  let n = counts.fuzzedTests - lastCounter;
  if (--dynamicInterval <= 0) {
    let t = performance.now();
    let d = t - lastTick;
    if (d >= 1000) {
      lastSpeed = Math.round(n / (d/1000));
      lastTotalSpeed = Math.round(counts.fuzzedTests / ((t - startTick) / 1000));
      lastCounter = counts.fuzzedTests;
      lastTick = t;
      // Auto-tune the print freq to about 3x a second
    }
    dynamicInterval = Math.round(counts.fuzzedTests / ((t - startTick) / 1000) / 4);

    let totalTime = Math.round((t-startTick)/1000);

    let stats = `
      time: ${totalTime},
      fuzz: ${dotted(counts.fuzzedTests)} being ${dotted(counts.fuzzedBytes)} bytes (${dotted(Math.round(counts.fuzzedBytes/totalTime))} b/s),
      ${dotted(counts.tenkoPassedFuzz)} passed,
      passrate: ${(counts.tenkoPassedFuzz/counts.fuzzedTests*100).toPrecision(2)}%,
      inj-mode: ${dotted(counts.injectionMode)},
      injected: ${dotted(counts.injectedTests)},
      total bytes parsed: ${dotted(counts.bytesParsed)} (${dotted(Math.round(counts.bytesParsed/totalTime))} b/s),
      current: ${lastSpeed} tests/s,
      total: ${lastTotalSpeed} tests/s,
      reduced ${counts.reduced}, int ${dynamicInterval}
    `.replace(/[\n ]+/g, ' ');

    process.stdout.write('\x1b[0G' + stats);
  }

  return false;
}
function dotted(ns) {
  ns = ''+ns;
  let o = '';
  for (let i = ns.length - 1, j = 0; i>=0; --i) {
    o = ns[i] + o;
    if (i && ++j === 3) {
      o = '.' + o;
      j = 0;
    }
  }
  return o;
}
