import fs from 'fs';

import {testTenko} from './parse_tenko.mjs';

const USE_BUILD = process.argv.includes('--build') || process.argv.includes('-b') || process.argv.includes('--nb');
const USE_DEVTOOLS = process.argv.includes('--devtools');
const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/tenko.prod.mjs';

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
  // All tests run with annexb=true
  let files = [
    // Sanity test and quick overhead baseline check. Basically this file in an earlier iteration.
    // await read({path: 'ignore/perf/es6.tiny.js', mode: 'module'}),

    // // A million corner cases
    // await read({path: 'ignore/perf/es5.js1k.js', mode: 'sloppy'}),
    //
    // // Large js file rom fb (es3, minified build output, 3+ y/o)
    // await read({path: 'ignore/perf/es3.fb.newsfeed.min.js', mode: 'sloppy'}),
    //
    // // From babel repo
    // await read({path: 'ignore/perf/es6.material-ui-core.js', mode: 'sloppy'}),
    // await read({path: 'ignore/perf/es6.angular-compiler.js', mode: 'module'}),
    //
    // // Random
    // await read({path: 'ignore/perf/es5.moment-with-locales.js', mode: 'sloppy'}),
    // await read({path: 'ignore/perf/es6.mljs.js', mode: 'module'}),
    //
    // // Specific regex test case
    // await read({path: 'ignore/perf/es5.5mb.node-unicode-data-regexes.js', mode: 'module'}),
    // await read({path: 'ignore/perf/es5.5mb.node-unicode-data-regexes-noclass.js', mode: 'module'}), // (same except all `[` are removed which promotes all escapes to atoms)
    // await read({path: 'ignore/perf/es6.5mb.node-unicode-data-regexes.js', mode: 'module'}), // (same except replaced unicode quad with unicode variables)
    // await read({path: 'ignore/perf/es5.5mb.node-unicode-data-regexes-as-strings.js', mode: 'sloppy'}), // (same except regexes replaced with strings)
    // await read({path: 'ignore/perf/es6.5mb.node-unicode-data-regexes-as-templates.js', mode: 'sloppy'}), // (same except regexes replaced with templates)
    //
    // old... 20mb
    // await read({path: 'ignore/perf/es5.8mb-bench.js', mode: 'sloppy'}),
    await read({path: 'ignore/perf/es5.16mb-bench.js', mode: 'sloppy'}),
    // await read({path: 'ignore/perf/es5.webkit.npm.1.0.0.js', mode: 'sloppy'}),
    // await read({path: 'ignore/perf/es5.35mb-kate.js.jo.js', mode: 'sloppy'}),
  ].filter(Boolean);

  files.forEach(({path, code, mode}) => {
    console.group('File:', code.length, 'bytes:', path);
    console.time('Parse time');
    try {
      if (USE_DEVTOOLS) console.profile('hf');
      parse(code, mode);
      if (USE_DEVTOOLS) console.profileEnd('hf');
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
