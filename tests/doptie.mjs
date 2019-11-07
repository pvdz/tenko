// Run this through `./t d`

import {Tenko, COLLECT_TOKENS_SOLID, COLLECT_TOKENS_NONE , GOAL_MODULE, GOAL_SCRIPT, WEB_COMPAT_ON, WEB_COMPAT_OFF} from '../build/build_w_ast.mjs';
import fs from 'fs';

// let input = fs.readFileSync('ignore/perf/es5.moment-with-locales.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es5.webkit.npm.1.0.0.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es3.fb.newsfeed.min.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es5.js1k.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es6.angular-compiler.js', 'utf8'); // module!
let input = fs.readFileSync('ignore/perf/es6.material-ui-core.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es6.mljs.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es6.tiny.js', 'utf8');


function testTenko(tenko, code, testVariant, enableAnnexb) {
  return tenko(
    code,
    testVariant === 'module' ? GOAL_MODULE : GOAL_SCRIPT,
    COLLECT_TOKENS_NONE,
    {
      strictMode: testVariant === 'strict',
      webCompat: enableAnnexb || testVariant === 'web',
      // targetEsVersion: tob.inputOptions.es,
      babelCompat: false,
      acornCompat: false,

      $log: () => {},
      $warn: () => {},
      $error: () => {},
    },
  );
}

console.time('Parse time');
testTenko(Tenko, input, 'sloppy', WEB_COMPAT_ON);
console.timeEnd('Parse time');
