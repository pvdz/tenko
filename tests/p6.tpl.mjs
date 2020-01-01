// This is `tenko/tests/p6.tpl.mjs` and will be generated into `tenko/ignore/p6.generated.mjs` by `./t p6`

// This is a template. When running `./t p6` it will generate `p6.mjs` with the source and parser filled in
// This works around the problem where I want to be able to test a parser through param names, without having to
// use async, but having no access to a sync require (due to ESM), and ESM only exposing an async `import()`.
// `fs.readFileSync('p6.tpl.mjs', 'utf8').replace(/\/\* TPL PARSER_PATH .*?</TPL> \*\/, './run_babel.mjs')`

// If you have a better way I'm open to suggestions!

import fs from 'fs';
import {performance} from 'perf_hooks';

import {parse} from /* <TPL PARSER_PATH> */ './run_tenko_build.mjs' /* </TPL> */;

// We don't need to template-encode the file since we'll need to fs.readFile that anyways and we can do that sync
const TARGET_FILE = process.argv.includes('--target-file') ? process.argv[process.argv.indexOf('--target-file') + 1] : 'ignore/perf/es5.5mb.node-unicode-data-regexes.js';
const TARGET_MODE = process.argv.includes('--target-mode') ? process.argv[process.argv.indexOf('--target-mode') + 1] : 'web';

const code = fs.readFileSync(TARGET_FILE, 'utf8')

// // Yield the thread for a second
// let r, p = new Promise(resolve => r = resolve);
// setTimeout(r, 1000);
// await p;

let start = 0;
let parseTime = 0;
try {
  start = performance.now();
  parse(code, TARGET_MODE);
  parseTime = performance.now() - start;
  console.log(parseTime);
  process.exit(0);
} catch (e) {
  console.log('Failed! ->', TARGET_FILE, '::', e.message);
  process.exit(1);
}
