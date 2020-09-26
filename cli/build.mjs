import fs from 'fs';
import path from 'path';

import Tenko, {COLLECT_TOKENS_NONE, GOAL_MODULE, WEB_COMPAT_OFF} from '../src/index.mjs';
import {scrub} from './scrub.mjs';
import {transform} from './transform.mjs';
import Terser from 'terser';

console.time('Finished build script (');

// node does not expose __dirname under module mode, but we can use import.meta to get it
let filePath = import.meta.url.replace(/^file:\/\//,'');
let dirname = path.dirname(filePath);

const SCRUB_OTHERS = process.argv.includes('--no-compat'); // force all occurrences of compatAcorn and compatBabel to false
const NATIVE_SYMBOLS = process.argv.includes('--native-symbols'); // Replace `PERF_$` with `%`?
const MIN = NATIVE_SYMBOLS || process.argv.includes('--min'); // skip minifier (cant use minifier with native symbols regardless)
const NO_MANGLE = NATIVE_SYMBOLS || process.argv.includes('--no-mangle'); // tell Terser not to mangle the names. Usually used combined with Prettier to clearly see minifier output.
const NO_AST = process.argv.includes('--no-ast'); // drop ast related code from the parser (`AST_*`)

if (NATIVE_SYMBOLS) console.log('Will convert `PERF_$` prefixed functions into `%` prefixed native functions...!');

const BOLD = '\x1b[;1;1m';
const OVER = '\x1b[32;53m';
const DIM = '\x1b[30;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

// The list of sources should form an ordered acyclic dependency graph
// All constants that get inlined should be lexicographically declared before usage. This build script assumes it.
let sources = [
  {name: 'perf',       recordConstants: true,  path: '../src/tools/perf.mjs'},
  {name: 'charcodes',  recordConstants: true,  path: '../src/charcodes.mjs'},
  {name: 'utils',      recordConstants: false, path: '../src/utils.mjs'}, // Things in here should be droppable ... should probably just not process it here at all
  {name: 'tokentype',  recordConstants: true,  path: '../src/tokentype.mjs'},
  {name: 'lexerflags', recordConstants: true,  path: '../src/lexerflags.mjs'},
  {name: 'enum_lexer', recordConstants: true,  path: '../src/enum_lexer.mjs'},
  {name: 'enum_parser',recordConstants: true,  path: '../src/enum_parser.mjs'},
  // Constants in these files should not be unconditionally inlined (not necessarily primitives)
  {name: 'lexer',      recordConstants: false, path: '../src/lexer.mjs'},
  {name: 'parser',     recordConstants: false, path: '../src/parser.mjs'},
];

if (NATIVE_SYMBOLS) {
  sources = sources.filter(obj => obj.name !== 'perf');
}

function processSource(source, constMap, recordConstants, keepAsserts) {
  source = source
  .toString('utf-8')
  .replace(/\/\/ <SCRUB DEV>([\s\S]*?)\/\/ <\/SCRUB DEV>/g, '// scrubbed dev\n')
  ;
  if (!keepAsserts) {
    source = source
    .replace(/\/\/ <SCRUB ASSERTS>([\s\S]*?)\/\/ <\/SCRUB ASSERTS>/g, '"003 assert scrubbed"')
    .replace(/\/\/ <SCRUB ASSERTS TO COMMENT>([\s\S]*?)\/\/ <\/SCRUB ASSERTS TO COMMENT>/g, '/* 004 assert scrubbed */')
    ;
  }
  if (NO_AST) {
    source = source
    .replace(/\/\/ <SCRUB AST>([\s\S]*?)\/\/ <\/SCRUB AST>/g, '/* 005 ast scrubbed */')
    ;
  }

  let t = Tenko(source, {
    goalMode: GOAL_MODULE,
    collectTokens: COLLECT_TOKENS_NONE,
    webCompat: WEB_COMPAT_OFF, // Probably...
    // errorCodeFrame: true,
    // truncCodeFrame: true,
    exposeScopes: true, // constant inlining

    $log: () => {},
    $warn: () => {},
    $error: () => {},
  });

  console.log('Transforming AST');
  transform(t.ast, constMap, recordConstants);
  console.log('Scrubbing and printing AST');
  source = scrub(t.ast, constMap, recordConstants);

  return source;
}

function prepare(builds, keepAsserts) {
  console.group('Preparing builds by reading all src files and transforming them...');
  const constMap = new Map;

  // Read all (targeted) src files from disk
  sources.forEach(obj => {
    console.log(' - Processing', obj.path);
    obj.code = fs.readFileSync(path.join(dirname, obj.path), 'utf8');
    builds[obj.name] = processSource(obj.code, constMap, obj.recordConstants, keepAsserts);
  });

  console.groupEnd();
}

function generate(builds, filename) {
  const forEsm = !filename.endsWith('.js');
  console.group('Generating', BOLD + filename + RESET, '(ESM?', forEsm, ')');

  let build = `

${NATIVE_SYMBOLS ? `
const allFuncs = [];
` : ''}

${Object.getOwnPropertyNames(builds).map(name => {
  return '// <' + name + '>\n' + builds[name] + '\n// </' + name + '>\n';
}).join('\n')}

let Tenko = Parser;

${forEsm?
`
export default Tenko; // Does dual export make sense? Default and as member. To each their own, eh
export {
`
  :
    // I'd rather not do the default exports in cjs tbh but want to maintain compat so *shrug*
`
module.exports = Tenko; // Does dual export make sense? Default and as member. To each their own, eh
Object.assign(Tenko, {
  default: Tenko,
`}
  Tenko,
  Lexer,

  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,
  COLLECT_TOKENS_TYPES,

  GOAL_MODULE,
  GOAL_SCRIPT,

  BINDING_TYPE_NONE,
  BINDING_TYPE_ARG,
  BINDING_TYPE_VAR,
  BINDING_TYPE_LET,
  BINDING_TYPE_CONST,
  BINDING_TYPE_CLASS,
  BINDING_TYPE_FUNC_VAR,
  BINDING_TYPE_FUNC_LEX,
  BINDING_TYPE_FUNC_STMT,
  BINDING_TYPE_CATCH_IDENT,
  BINDING_TYPE_CATCH_OTHER,
  HAS_NO_BINDINGS,
  SCOPE_LAYER_GLOBAL,
  SCOPE_LAYER_FOR_HEADER,
  SCOPE_LAYER_BLOCK,
  SCOPE_LAYER_FUNC_PARAMS,
  SCOPE_LAYER_CATCH_HEAD,
  SCOPE_LAYER_CATCH_BODY,
  SCOPE_LAYER_FINALLY,
  SCOPE_LAYER_SWITCH,
  SCOPE_LAYER_FUNC_ROOT,
  SCOPE_LAYER_FUNC_BODY,
  SCOPE_LAYER_ARROW_PARAMS,
  SCOPE_LAYER_FAKE_BLOCK,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,

  VERSION_EXPONENTIATION,
  VERSION_WHATEVER,

  isWhiteToken,
  isNewlineToken,
  isCommentToken,
  isIdentToken,
  isNumberToken,
  isBigintToken,
  isStringToken,
  isPunctuatorToken,
  isRegexToken,
  isTickToken,
  isBadTickToken,
  isNumberStringToken,
  isNumberStringRegex,

  toktypeToString,
${NATIVE_SYMBOLS?`
  PERF_OptimizeFunctionOnNextCall,
  PERF_getStatus,
  PERF_HasFastProperties,
  PERF_HaveSameMap,
  PERF_hasFastSmiElements,
  PERF_hasFastObjectElements,
  PERF_hasFastDoubleElements,
  PERF_hasDictionaryElements,
  PERF_hasFastHoleyElements,
  PERF_haveSameMap,
  PERF_isValidSmi,
  PERF_isSmi,
  PERF_hasFastSmiOrObjectElements,
  PERF_hasSloppyArgumentsElements,
  PERF_CollectGarbage,
  PERF_DebugPrint,
  allFuncs,
`:''}
${forEsm ? '};' : '});'}
  `;

  // Sanity check, won't work with native symbols (obviously)
  if (!NATIVE_SYMBOLS) {
    Tenko(build, {
      goalMode: GOAL_MODULE,
      collectTokens: COLLECT_TOKENS_NONE,
      webCompat: false, // Probably...

      // errorCodeFrame: true,
      // truncCodeFrame: true,

      // $log: () => {},
      // $warn: () => {},
      // $error: () => {},
    });
  }

  let sizeBefore = build.length;
  if (MIN) {
    console.time('Terser time');
    console.log('Minification through Terser...');
    let t = Terser.minify(build, {
      mangle: !NO_MANGLE && {
        module: true,
      },
      compress: {
        inline: 0, // do not inline functions. this just kills perf :/
        keep_infinity: true, // keep `Infinity` instead of `1/0`
        module: true,
      },
      module: true,
      // sourceMap: {
      //   url: 'inline',
      // },
    });
    if (t.error) console.log('Terser threw an error:'),console.log(t.error);
    build = t.code;
    console.timeEnd('Terser time');
  }

  let outDir = path.join(dirname, '../build/');
  if (!fs.existsSync(outDir)) fs.promises.mkdir(outDir);
  let outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, build);

  console.log('Wrote', outPath, '(' + sizeBefore + ' -> ' + build.length + ' bytes)');
  console.groupEnd();
}

let builds = {};
prepare(builds, false);
generate(builds, 'tenko.prod.mjs'); // ESM
generate(builds, 'tenko.prod.js'); // CJS

console.timeEnd('Finished build script (');
