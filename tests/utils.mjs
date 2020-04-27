let PASS = true;
let FAIL = false;

import util from 'util';
import fs from 'fs';
import readline from 'readline';
import path from 'path';

// node does not expose __dirname under module mode, but we can use import.meta to get it
let filePath = import.meta.url.replace(/^file:\/\//,'');
let dirname = path.dirname(filePath);

const BOLD = '\x1b[;1;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const INPUT_HEADER = '\n## Input\n';
const OUTPUT_HEADER = '\n## Output\n';
const OUTPUT_HEADER_SLOPPY = '\n### Sloppy mode\n';
const OUTPUT_HEADER_SLOPPY_ANNEXB = '\n### Sloppy mode with AnnexB\n';
const OUTPUT_HEADER_STRICT = '\n### Strict mode\n';
// const OUTPUT_HEADER_STRICT_ANNEXB = '\n### Strict mode with AnnexB\n';
const OUTPUT_HEADER_MODULE = '\n### Module goal\n';
const OUTPUT_HEADER_MODULE_ANNEXB = '\n### Module goal with AnnexB\n';
const OUTPUT_QUINTICK = '\n`````\n';
const OUTPUT_QUINTICKJS = '\n`````js\n';

ASSERT(dirname.endsWith('/tests'), 'update root detection if this changes');
let PROJECT_ROOT_DIR = path.resolve(path.join(dirname, '..'));

let prefixLogOrigin = false; // this slows things down considerably so just used for debugging
const _LOG = console.log; // global hijack :(
console.log = (...args) => {
  if (prefixLogOrigin && (args.length > 1 || (args.length === 1 && (typeof args[0] !== 'string' || args[0].trim() !== '')))) {
    // This is probably v8 specific but allows me to more easily locate console.logs :)
    // Assumes this console.log is always one step away from the actual call site
    let origin = new Error().stack.split(' at ')[2].split('/').slice(-1)[0].trim()
    let parts = origin.split(':').slice(0, 2);
    parts[1] = parseInt(parts[1], 10).toString().padStart(4, '_');
    origin = parts.join(':');
    origin = '\x1b[;2m' + origin + ':' + RESET;
    args.unshift(origin);
  }
  _LOG(...args);
};

function LOG(...args) {
  let pre = args[0].slice(0, 4);
  if (pre !== 'PASS' && pre !== 'SKIP') {
    _LOG.apply(console, args);
  }
}

function THROW(str, ...rest) {
  _LOG('error args:', rest.length ? util.inspect(rest, false, null) : '<none>');
  throw new Error(`Test env error! ${str} ${rest.length ? util.inspect(rest, false, null) : ''}`);
}
function ASSERT(b, ...args) {
  if (!b) {
    console.trace();
    THROW('test env ASSERT error: ' + args.join(' :: '));
  }
}

function toPrint(s) {
  ASSERT(typeof s === 'string', 'nonstring', s);
  s = s
    .replace(/[^\u0000-\u00ff\u2028]/g, function(s) {
      return (
        '\\u' +
        s
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()
      );
    })
    .replace(/[\xa0\x0b\x0c]/g, function(s) {
      return (
        '\\x' +
        s
          .charCodeAt(0)
          .toString(16)
          .toUpperCase()
      );
    })
    .replace(/\t/g, '\\t')
    .replace(/\u2028/g, '\u21a9')
    .replace(/\u000a/g, '\u21b5')
    .replace(/\u000d/g, '\\r');
  if (s.length > 100) return s.slice(0, 100) + '... <TRUNCED>';
  return s;
}

export class Tob {
  constructor(file, data) {
    ASSERT(!data || data.indexOf('\n##'));

    this.file = file;
    this.fileShort = file.startsWith('tests/') ? file : file.slice(file.indexOf('tenko') + 'tenko/'.length);
    this.oldData = data;
    this.newData = data;

    this.aboveTheFold = '';

    this.inputHead = '';
    this.inputOptions = {}; // Passed on to Parser, es version, etc
    this.inputCode = '';

    this.parserRawOutput = {sloppy: {}, strict: {}, module: {}, web: {}}; // {r, e, tok, stdout}
    this.compareSkippedExplicitVersion = false; // When comparing, tests with specific version are skipped because Babel does not support that (and they're usually just version guard checks)
    this.compareWhiteListed = false; // Do we know why a test isn't matching Tenko's output? In that case ignore the error.
    this.compareHadMatchFailure = false; // At least one test that ran had a mis-match with Tenko

    this.oldOutputSloppy = false;
    this.oldOutputSloppyAnnexB = false;
    this.newOutputSloppy = false;
    this.newOutputSloppyAnnexB = false;
    this.oldOutputStrict = false;
    this.oldOutputStrictAnnexB = false;
    this.newOutputStrict = false;
    this.newOutputStrictAnnexB = false;
    this.oldOutputModule = false;
    this.oldOutputModuleAnnexB = false;
    this.newOutputModule = false;
    this.newOutputModuleAnnexB = false;
  }
}

function getTestFiles(path, file, files, silent, dirsToo) {
  let combo = path + file;
  if (!fs.statSync(combo).isFile()) {
    if (!silent) LOG('getTestFiles dir:', path + file);
    fs.readdirSync(combo + '/').forEach(s => getTestFiles(combo + '/', s, files, silent, dirsToo));
    if (dirsToo) files.push(combo);
  } else {
    if (combo.slice(-3) === '.md' && combo.slice(-'README.md'.length) !== 'README.md') {
      if (!silent) LOG('getTestFiles file:', path + file);
      files.push(combo);
    }
  }
}

function parseTestFile(tob) {

  // Note: a "quintick" is a line that only consists of five backticks. They are used to safely fence of actual
  // arbitrary content while using the markdown system for a code block. Five backticks should not appear in actual JS
  // code so they should not be ambiguous with realistic inputs that test a JS parser.

  // Each test file should have
  // - An arbitrary file header, which runs up to
  // - A line `\n## Input\n`
  //   - optionally followed by a list of options for this test case (``\n - `option = value`\n``)
  //   - optionally followed by arbitrary comments about the test case
  //   - Followed by the test case, wrapped in quinticks
  //   - Remainder of block is ignored
  // - Then optionally the output block;
  //   - A line `\n## Output\n`
  //     - Should have four blocks, each block starting with `\n### <type>\n`
  //     - There will be some generic description that we (this library) adds for clarity
  //     - The actual output, wrapped in quinticks
  //     - Remainder of block is ignored

  // The bits we want to parse are the file header, input options, the input code, and the outputs for sloppy, strict,
  // module, and web compat mode. The rest is procedurally generated by this test runner.

  let {file, oldData} = tob;
  if (!oldData) return;

  ASSERT(oldData.includes(INPUT_HEADER), 'missing input header in ' + tob.file + ' (did you mean to use `./t F` instead of `./t f`?)');
  tob.aboveTheFold = oldData.slice(0, oldData.indexOf(INPUT_HEADER));
  tob.shouldPass = tob.aboveTheFold.toLowerCase().includes('\n## pass\n');
  tob.shouldFail = tob.aboveTheFold.toLowerCase().includes('\n## fail\n');

  let inputHeaderOffset = oldData.indexOf(INPUT_HEADER) + INPUT_HEADER.length;
  ASSERT(oldData.includes(OUTPUT_QUINTICK, inputHeaderOffset), 'old file should contain quinticks', file);
  tob.inputHead = oldData.slice(inputHeaderOffset, oldData.indexOf(OUTPUT_QUINTICKJS, inputHeaderOffset));

  let inputCodeOffset = oldData.indexOf(OUTPUT_QUINTICKJS, inputHeaderOffset) + OUTPUT_QUINTICKJS.length;
  ASSERT(oldData.includes(OUTPUT_QUINTICK, inputCodeOffset), 'old file should contain quinticks', file);
  tob.inputCode = oldData.slice(inputCodeOffset, oldData.indexOf(OUTPUT_QUINTICK, inputCodeOffset));

  if (oldData.includes(OUTPUT_HEADER, inputCodeOffset)) {
    let outputOffset = oldData.indexOf(OUTPUT_HEADER, inputCodeOffset);

    ASSERT(oldData.includes(OUTPUT_HEADER_SLOPPY, outputOffset), 'missing sloppy header', file);
    // ASSERT(oldData.includes(OUTPUT_HEADER_SLOPPY_ANNEXB, outputOffset), 'missing sloppy annexb header', file);
    ASSERT(oldData.includes(OUTPUT_HEADER_STRICT, outputOffset), 'missing strict header', file);
    ASSERT(oldData.includes(OUTPUT_HEADER_MODULE, outputOffset), 'missing module header', file);
    // ASSERT(oldData.includes(OUTPUT_HEADER_MODULE_ANNEXB, outputOffset), 'missing module annexb header', file);

    let outputSloppyHeaderOffset = oldData.indexOf(OUTPUT_HEADER_SLOPPY, outputOffset);
    ASSERT(outputSloppyHeaderOffset >= 0, 'should have output sloppy header');
    let outputSloppyOffset = oldData.indexOf(OUTPUT_QUINTICK, outputSloppyHeaderOffset);
    ASSERT(outputSloppyOffset >= 0, 'every test has at least a sloppy output', file);
    outputSloppyOffset += OUTPUT_QUINTICK.length;
    ASSERT(oldData.includes(OUTPUT_QUINTICK, outputSloppyOffset));
    tob.oldOutputSloppy = oldData.slice(outputSloppyOffset, oldData.indexOf(OUTPUT_QUINTICK, outputSloppyOffset));

    let outputSloppyAnnexbHeaderOffset = oldData.indexOf(OUTPUT_HEADER_SLOPPY_ANNEXB, outputOffset);
    // ASSERT(outputSloppyAnnexbHeaderOffset >= 0, 'should have output annexB sloppy header');
    let outputSloppyAnnexbOffset = oldData.indexOf(OUTPUT_QUINTICK, outputSloppyAnnexbHeaderOffset);
    if (outputSloppyAnnexbHeaderOffset > 0 && outputSloppyAnnexbOffset > 0) {
      outputSloppyAnnexbOffset += OUTPUT_QUINTICK.length;
      ASSERT(oldData.includes(OUTPUT_QUINTICK, outputSloppyAnnexbOffset + OUTPUT_QUINTICK.length), 'output should contain strict output quintick');
      tob.oldOutputSloppyAnnexB = oldData.slice(outputSloppyAnnexbOffset, oldData.indexOf(OUTPUT_QUINTICK, outputSloppyAnnexbOffset));
    } else {
      tob.oldOutputSloppyAnnexB = tob.oldOutputSloppy;
    }

    let outputStrictHeaderOffset = oldData.indexOf(OUTPUT_HEADER_STRICT, outputOffset);
    ASSERT(outputStrictHeaderOffset >= 0, 'should have output strict header');
    let outputStrictOffset = oldData.indexOf(OUTPUT_QUINTICK, outputStrictHeaderOffset);
    if (outputStrictHeaderOffset > 0 && outputStrictOffset >= 0) {
      outputStrictOffset += OUTPUT_QUINTICK.length;
      ASSERT(oldData.includes(OUTPUT_QUINTICK, outputStrictOffset + OUTPUT_QUINTICK.length), 'output should contain strict output quintick');
      tob.oldOutputStrict = oldData.slice(outputStrictOffset, oldData.indexOf(OUTPUT_QUINTICK, outputStrictOffset));
    } else {
      tob.oldOutputStrict = tob.oldOutputSloppy;
    }

    // let outputStrictAnnexbHeaderOffset = oldData.indexOf(OUTPUT_HEADER_STRICT_ANNEXB, outputSloppyAnnexbHeaderOffset);
    // ASSERT(outputStrictAnnexbHeaderOffset >= 0, 'should have output strict header');
    // let outputStrictAnnexBOffset = oldData.indexOf(OUTPUT_QUINTICK, outputStrictAnnexbHeaderOffset);
    // if (outputStrictAnnexBOffset >= 0) {
    //   outputStrictAnnexBOffset += OUTPUT_QUINTICK.length;
    //   ASSERT(oldData.includes(OUTPUT_QUINTICK, outputStrictAnnexBOffset + OUTPUT_QUINTICK.length), 'output should contain strict output quintick');
    //   tob.oldOutputStrict = oldData.slice(outputStrictAnnexBOffset, oldData.indexOf(OUTPUT_QUINTICK, outputStrictAnnexBOffset));
    // } else {
    //   tob.oldOutputStrict = tob.oldOutputStrict || tob.oldOutputSloppy || tob.oldOutputSloppyAnnexB;
    // }

    let outputModuleHeaderOffset = oldData.indexOf(OUTPUT_HEADER_MODULE, outputOffset);
    ASSERT(outputModuleHeaderOffset >= 0, 'should have output module header');
    let outputModuleOffset = oldData.indexOf(OUTPUT_QUINTICK, outputModuleHeaderOffset);
    if (outputModuleOffset >= 0) {
      outputModuleOffset += OUTPUT_QUINTICK.length;
      ASSERT(oldData.includes(OUTPUT_QUINTICK, outputModuleOffset));
      tob.oldOutputModule = oldData.slice(outputModuleOffset, oldData.indexOf(OUTPUT_QUINTICK, outputModuleOffset));
    } else {
      tob.oldOutputModule = tob.oldOutputStrict || tob.oldOutputSloppy;
    }

    let outputModuleAnnexbHeaderOffset = oldData.indexOf(OUTPUT_HEADER_MODULE_ANNEXB, outputOffset);
    // ASSERT(outputModuleAnnexbHeaderOffset >= 0, 'should have output module header');
    let outputModuleAnnexbOffset = oldData.indexOf(OUTPUT_QUINTICK, outputModuleAnnexbHeaderOffset);
    if (outputModuleAnnexbOffset >= 0) {
      outputModuleAnnexbOffset += OUTPUT_QUINTICK.length;
      ASSERT(oldData.includes(OUTPUT_QUINTICK, outputModuleAnnexbOffset));
      tob.oldOutputModuleAnnexB = oldData.slice(outputModuleAnnexbOffset, oldData.indexOf(OUTPUT_QUINTICK, outputModuleAnnexbOffset));
    } else {
      tob.oldOutputModuleAnnexB = tob.oldOutputModule || tob.oldOutputStrict || tob.oldOutputSloppy;
    }
  }

  // Parse the parameters between input header and START
  tob.inputOptions = tob.inputHead
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.slice(0, 3) === '- `' && s.slice(-1) === '`')
    .reduce((obj, s) => {
      // Each line should be ``- `name = value` ``
      let [k, is, ...v] = s.slice(3, -1).split(' ');
      ASSERT(is === '=', 'separate the key and value of input options with a `=` and surrounding spaces', ' ' + file + ' ', s);

      let value = v.join(' ');
      if (String(parseFloat(value)) === value) value = parseFloat(v);
      else if (value === 'true') value = true;
      else if (value === 'false') value = false;
      else if (value === 'undefined') value = undefined;
      else if (value === 'null') value = null;

      obj[k] = value;

      return obj;
    }, {});

  const {es, astUids, ...unsupported} = tob.inputOptions

  ASSERT(JSON.stringify(unsupported) === '{}', 'options have hardcoded support in the test suite so if a new option needs support, make sure to connect it first, then update this assert. Unhandled options: ' + JSON.stringify(unsupported) + ', file: ' + tob.fileShort);
}

// Some chars are added by the test script or parser that we don't expect to find in test input so don't encode them :)
function encodeUnicode(str) {
  return str.replace(/[^\u0020-\u007e\u000A\u2550\u2551\u2554\u255a\u2566\u2569]/ug, m => '@{x'+m.codePointAt(0).toString(16)+'}@');
}
function decodeUnicode(str) {
  // console.log('decoding', str)
  // Do not use `\n` because it subsumes `\n\r`
  return str.replace(/@\{x?([0-9a-z]+)\}@/gi, (_, g) => String.fromCodePoint(parseInt(g, 16)));
}

async function readFiles(files) {
  return await Promise.all(files.map(promiseToReadFile)).catch(e => { throw new Error(e); });
}
function promiseToReadFile(file) {
  if (!fs.existsSync(file)) console.error(BLINK + 'File does not exist:' + RESET + ' ' + file);
  let res,rej,p = new Promise((resolve, reject) => (res = resolve, rej = reject));
  fs.readFile(file, 'utf8', (err, data) => err ? rej(err) :
    // Convert `@{abc}@` to a character matching the codepoint `\u{abc}`
    res(new Tob(file, decodeUnicode(data)))
  );
  return p;
}

function promiseToWriteFile(file, data) {
  let res,rej,p = new Promise((resolve, reject) => (res = resolve, rej = reject));
  data = encodeUnicode(data);
  fs.writeFile(file, data, 'utf8', err => err ? rej(err) : res());
  return p;
}

async function question(msg) {
  // Probably massive overkill :/
  let resolve, p = new Promise(ok => resolve = ok);
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question(msg + ' ', answer => resolve(answer));
  let r = await p;
  rl.close();
  return r;
}
async function yn(msg = 'Answer?') {
  // Keep asking the question in console until the user types `y`, `yes`, `n`, or `no`.
  let answer = String(await question(msg)).toLowerCase();
  answer = String(answer).toLowerCase();

  if (answer === 'n' || answer === 'no' || answer === 'q') return false;
  while (answer !== 'y' && answer !== 'yes') {
    answer = await question(msg + ': [y, n]');
    answer = String(answer).toLowerCase();

    if (answer === 'n' || answer === 'no' || answer === 'q') return false;
  }

  return true;
}

function smash(node, x) {
  // This function recursively turns objects whose __proto__ is not Object into cloned objects whose __proto__ is Object
  // (It used to be JSON.parse(JSON.stringify(node)) but that can't handle bigints gracefully :@ )
  if (node == null) return node; // null or undefined, yes
  let nnode = {};
  Object.getOwnPropertyNames(node).forEach(prop => {
    let p = node[prop];
    if (p !== null && typeof p === 'object' && !(p instanceof RegExp)) {
      if (Array.isArray(p)) {
        nnode[prop] = p.map(v => smash(v, prop));
      }
      else {
        nnode[prop] = smash(p, prop);
      }
    } else {
      nnode[prop] = p;
    }
  });
  return nnode;
}

function astToString(ast) {
  return util
  .inspect(ast, false, null)

  // Flatten location tracking objects to a single line
  /*
  loc: {
    start: { line: 1, col: 0 },
    end: { line: 2, col: 2 },
    source: ''
  },
  ->
  loc:{start:{line:1,col:0},end:{line:2,col:2},source:''},
  */
  // (Test cases won't contain this as string-content so the regex should be safe)
  .replace(
    /loc:\s*\{\s*start:\s*\{\s*line:\s*\d+,\s*column:\s*\d+\s*\}\s*(?:,\s*identifierName:\s*'[^']*')?,\s*end:\s*\{\s*line:\s*\d+,\s*column?:\s*\d+\s*\}(?:,\s*range:\s*\{\s*start:\s*\d+,\s*end?:\s*\d+\s*\})?(?:,\s*source:\s*'[^']*')?(?:,\s*identifierName:\s*'[^']*')?\s*}/g,
    s => s.replace(/\s+/g, '')
  );
}

export {
  PASS,
  FAIL,

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

  ASSERT,
  astToString,
  decodeUnicode,
  encodeUnicode,
  getTestFiles,
  _LOG,
  LOG,
  parseTestFile,
  PROJECT_ROOT_DIR,
  promiseToReadFile,
  promiseToWriteFile,
  readFiles,
  smash,
  toPrint,
  THROW,
  yn,
};
