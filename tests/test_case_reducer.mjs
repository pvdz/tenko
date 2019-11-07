// Auto test case reducer
// Given some input that throws, generate the smallest input that throws the same error

import fs from 'fs';

import {
  dumpFuzzOutput,
  warnOsd,
} from './fuzz/fuzzutils.mjs'

const BOLD = '\x1b[;1;1m';
const DIM = '\x1b[30;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

function reduceAndExit(
  input/*: string*/,
  parse/*: (input: string) => {e, r, tok}*/,
  file/*?: string*/
) {
  reduceErrorInput(input, parse, file);
  console.log('exit...');
  process.exit();
}
function tokenToStringPart(str) {
  // Change `{# NUMBER_DEC : nl=N ws=N pos=11:13 loc=2:2 curc=46 `.2`#}` to `.2`
  // This prevents the location data from preventing test case reduction while avoiding false positives
  return str.replace(/\{#(.*?)#\}/g, (_, m) => m.replace(/[\s\S]*(`[\s\S]*`)[\s\S]*/, (m, g) => g));
}
function reduceErrorInput(
  input/*: string*/,
  parse/*: (input: string) => {e, r, tok}*/,
  file,/*?: string*/
  verbose/*?: boolean*/ = true,
) {
  if (verbose) console.log(BOLD + '<reduce>' + RESET);
  let org = input;
  let trimCache = new Map;
  let asserts = new Set;
  let inputError = parse(input).e;
  if (!inputError) {
    dumpFuzzOutput(input, input, 'Cannot use the test case reducer if the input does not throw. This input does not throw.', 'test case reducer');
    // console.log(parse(input))
    process.exit();
  }
  if (inputError.message) inputError = inputError.message;
  inputError = tokenToStringPart(inputError);
  if (inputError && inputError.toLowerCase().includes('assert')) asserts.add(inputError);
  let same = (code, nocache) => {
    if (!code) return false;
    if (!nocache && trimCache.has(code)) {
      let err = trimCache.get(code);
      if (verbose) console.log('CACHED!', code.replace(/\n/g, '\\n').replace(/\s/g, ' '), err === inputError, err || '<no error>');
      return err === inputError;
    }
    let err = parse(code).e;
    if (err) {
      if (err.message) err = err.message;
      err = tokenToStringPart(err);
    }
    if (err && err.toLowerCase().includes('assert')) asserts.add(err);
    if (verbose) console.log('Tested!', code.replace(/\n/g, '\\n').replace(/\s/g, ' '), err === inputError, 'the error:', [err || '<no error>']);
    trimCache.set(code, err);
    return err === inputError;
  };
  if (verbose) console.log('<test case reducer>');
  if (verbose) console.log('Input error:', BOLD + inputError + RESET);
  trimCache.set(input, inputError);
  if (verbose) console.log('Normalizing:', input.replace(/[\n\r]/g, '\\n'));
  // Normalize newlines
  if (same(input.replace(/\r/g, '\n'))) input = input.replace(/\r/g, '\n');
  // Replace newlines with semis
  if (same(input.replace(/\n/g, ';'))) input = input.replace(/\n/g, ';');
  // Trim multiple whitespaces
  if (same(input.replace(/[\t ]+/g, ' '))) input = input.replace(/[\t ]+/g, ' ');


  if (verbose) console.log('Trimming');
  let lastInput = '';
  while (lastInput !== input) {
    if (verbose) console.log('Outer repeat!');
    lastInput = input;

    // Slice out single chars
    for (let i=input.length; i>=0; --i) {
      let testingInput = input.slice(0, i) + input.slice(i + 1);
      if (same(testingInput)) {
        input = testingInput;
      }
    }

    // Slice out char pairs
    for (let i=input.length-1; i>=0; --i) {
      if (input[i] !== 'x' && input[i] !== ' ') {
        let testingInput = input.slice(0, i) + input.slice(i + 2);
        if (same(testingInput)) {
          input = testingInput;
        }
      }
    }

    // Slice out char triples
    for (let i=input.length-2; i>=0; --i) {
      if (input[i] !== 'x' && input[i] !== ' ') {
        let testingInput = input.slice(0, i) + ' x ' + input.slice(i + 2);
        if (same(testingInput)) {
          input = testingInput;
        }
      }
    }


    // Slice out char quads
    for (let i=input.length-3; i>=0; --i) {
      if (input[i] !== 'x' && input[i] !== ' ') {
        let testingInput = input.slice(0, i) + input.slice(i + 3);
        if (same(testingInput)) {
          input = testingInput;
        }
      }
    }

    // Slice out char quads and replace them with ` y `
    for (let i=input.length-3; i>=0; --i) {
      if (input[i] !== 'x' && input[i] !== ' ') {
        let testingInput = input.slice(0, i) + ' y ' + input.slice(i + 3);
        if (same(testingInput)) {
          input = testingInput;
        }
      }
    }

    // Drop simplified "dud" structures, like `class x{}` or `try{}finally{}`, which we'll often see from fuzzers
    // In some cases replace it with a semi, in others with nothing, for some cases try both
    input = trimPatten(same, input, /try\{\}(?:catch(?:\(\w\))?\{\})?(?:finally\{\})?/g, ';')
    input = trimPatten(same, input, /for\([\w\d] (?:of|in) [\w\d]\)/g, ';');
    input = trimPatten(same, input, /for\(;;\)/g, ';');
    input = trimPatten(same, input, /class(?: +[\w\d$_]*)?(?: extends [\w\d$_]*)?\s*\{\s*\}/g, ' x\n ');
    input = trimPatten(same, input, /while\([\w\d]\)/g, ';');
    input = trimPatten(same, input, /do(?:\s\w\s|;)while\([\w\d]\)/g, ';');
    input = trimPatten(same, input, /with\([\w\d]\)/g, ';');
    input = trimPatten(same, input, /if\(\w\)/g, ';');
    input = trimPatten(same, input, /else(?: \w)?/g, ';');
    input = trimPatten(same, input, /default:?/g, '');
    input = trimPatten(same, input, /case [\w\d$_]+:/g, '');
    input = trimPatten(same, input, /function(?: \w)?\(\)\{\s*\w?\s*\}/g, '');
    input = trimPatten(same, input, /function(?: \w)?\(\)\{\s*\w?\s*\}/g, ' x\n ');
    input = trimPatten(same, input, /switch\([\w\d]\)\{(?:case [\w\d]:)*\}/g, ';');
    input = trimPatten(same, input, /[\w\d]\?[\w\d]:[\w\d]/g, ' x ');
    input = trimPatten(same, input, /\w in(?:stanceof)? \w/g, ' x ');
    input = trimPatten(same, input, /\d+:[\w\d]+/g, '');
    input = trimPatten(same, input, /[\w\d$_]*\([\w\d$_]*\)\{\}[;,]?/g, '');
    input = trimPatten(same, input, /['"]use strict['"];/g, '');

    if (lastInput === input) {
      // This is a RC. Now check for wrappers, `try{x}finally{}` -> `x`

      let t = input.replace(/try\{([\s\S]+)\}(?:finally|catch(?:\(\w\))?)\{\}/, '$1');
      if (t !== input && same(t)) input = t;

      t = input.replace(/try\{\}(?:finally|catch(?:\(\w\))?)\{([\s\S]+)\}/, '$1');
      if (t !== input && same(t)) input = t;

      t = input.replace(/switch\([\w\d]\){case [\w\d]:([\s\S]+)}/, '$1');
      if (t !== input && same(t)) input = t;

      t = input.replace(/\((.*)\)/, '$1');
      if (t !== input && same(t)) input = t;

      t = input.replace(/for\((.*);;\)/, '$1;');
      if (t !== input && same(t)) input = t;

      t = input.replace(/for\(;(.*);\)/, '$1;');
      if (t !== input && same(t)) input = t;

      t = input.replace(/for\(;;(.*)\)/, '$1;');
      if (t !== input && same(t)) input = t;
    }
  }

  if (verbose) console.log('</trim>');
  if (verbose) console.log('Reduced input:');
  same(input, true);

  asserts.delete(inputError);
  if (asserts.length) {
    if (verbose) console.log(BLINK + 'THERE WERE ASSERTS' + RESET);
    if (verbose) console.log(asserts.forEach(s => ' - ' + s + '\n'));
  }

  if (process.argv.includes('--write') && file) {
    if (verbose) console.log('Writing new test case to', file + '.min');
    fs.writeFileSync(file + '.min', '@Minified from ' + file + '\n###\n' + input);
  }

  if (verbose) {
    console.log(BOLD + '</reduce>' + RESET);
    console.log('Input:');
    console.log('```');
    console.log(input);
    console.log('```');
  }

  return input;
}

function trimPatten(same, str, pattern, repl) {
  let lastOffset = -1;
  let found = true;
  let currentStr = str;
  while (found) {
    found = false;
    currentStr = currentStr.replace(pattern, (match, offset) => {
      if (offset <= lastOffset) return match;
      if (found) return match;
      found = true;
      lastOffset = offset;
      let lastEffort = currentStr.slice(0, offset) + repl + str.slice(offset + match.length);
      if (lastEffort !== currentStr && same(lastEffort)) {
        currentStr = lastEffort;
        return repl;
      }
      return match;
    });
  }
  return currentStr;
}

export {reduceAndExit, reduceErrorInput, trimPatten};
