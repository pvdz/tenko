import fs from 'fs';

import {testTenko} from './parse_tenko.mjs';

const USE_BUILD = process.argv.includes('--build') || process.argv.includes('-b');
const USE_DEVTOOLS = process.argv.includes('--devtools');
const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/build_w_ast.mjs';

const BOLD = '\x1b[;1;1m';
const BOLD_GREEN = '\x1b[1;32m';
const DIM = '\x1b[30;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

(async function(){
  let file = USE_BUILD ? TENKO_PROD_FILE : TENKO_DEV_FILE;
  console.log('Running test on', BOLD + file + RESET);
  let Tenko = (await import(file)).default;

  let parse = (code, testVariant) => testTenko(Tenko, code, testVariant, true);

  async function read(obj) {
    obj.code = await fs.promises.readFile(obj.path, 'utf8');
    return obj;
  }

  // Note: the baselines are lowest times for my machine ... ymmv. But it helps to approximate deviation by system load
  let files = [
    // Sanity test and quick overhead baseline check. Basically this file in an earlier iteration.
    // await read({path: 'ignore/perf/es6.tiny.js', mode: 'module'}),

    // // A million corner cases
    // await read({path: 'ignore/perf/es5.js1k.js', mode: 'web'}),
    //
    // // Large js file rom fb (es3, minified build output, 3+ y/o)
    // await read({path: 'ignore/perf/es3.fb.newsfeed.min.js', mode: 'web'}),
    //
    // // From babel repo
    await read({path: 'ignore/perf/es6.material-ui-core.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es6.angular-compiler.js', mode: 'module'}),
    //
    // // Random
    // await read({path: 'ignore/perf/es5.moment-with-locales.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es6.mljs.js', mode: 'module'}),
    //
    // // old... 20mb
    // await read({path: 'ignore/perf/es5.webkit.npm.1.0.0.js', mode: 'web'}),
  ].filter(Boolean);

  files.forEach(({path, code, mode}) => {
    console.group('File:', code.length, 'bytes:', path);
    console.time('Parse time');
    try {
      if (USE_DEVTOOLS) console.profile();
      parse(code, mode);
      if (USE_DEVTOOLS) console.profileEnd();
    } catch (e) {
      console.log('Failed! ->', path, '::', e.message);
    }
    console.timeEnd('Parse time');
    console.groupEnd();
  });

  // setTimeout(() => {
  //   console.log('End of hf.mjs, exiting hard now');
  //   process.exit();
  // }, 2000); // 1s should be enough to triger the hf flush
})();
