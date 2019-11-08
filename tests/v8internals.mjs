/*
First biuld with native symbols, then run node with native symbols:
```
./t z --no-compat --native-symbols;
node --experimental-modules --max-old-space-size=8192 --trace_opt --trace_deopt --allow-natives-syntax --debug-code tests/v8internals.mjs
```

To get the most out of `%DebugPrint` you need a debug build of nodejs;
As per https://twitter.com/JoyeeCheung/status/1190697420453228544 :
```
git clone https://github.com/nodejs/node.git
cd node
python2 ./configure --ninja --debug
$ninja -C out/Debug
# Your debug node build is can be found in Debug/node
out/Debug/node --allow-natives-syntax
```
(The ninja step takes 10 or 20 minutes or whatever get some coffee)

Then rerun the above and specify the binary you just built:

path/to/just/built/node/out/Debug/node --experimental-modules --max-old-space-size=8192 --trace_opt --trace_deopt --allow-natives-syntax --debug-code tests/v8internals.mjs

*/

// import tenko from '../src/index.mjs';
import {
  Tenko,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_NONE,
  GOAL_MODULE,
  GOAL_SCRIPT,
  WEB_COMPAT_ON,
  WEB_COMPAT_OFF,
  allFuncs,
  PERF_getStatus,
  PERF_DebugPrint,
} from '../build/tenko.prod.mjs';
import fs from 'fs';

// let input = fs.readFileSync('ignore/perf/es5.moment-with-locales.js', 'utf8');
let input = fs.readFileSync('ignore/perf/es5.webkit.npm.1.0.0.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es3.fb.newsfeed.min.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es5.js1k.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es6.angular-compiler.js', 'utf8'); // module!
// let input = fs.readFileSync('ignore/perf/es6.material-ui-core.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es6.mljs.js', 'utf8');
// let input = fs.readFileSync('ignore/perf/es6.tiny.js', 'utf8');

function testTenko(tenko, code, testVariant, enableAnnexb) {
  return tenko(
    code,
    {
      goalMode: testVariant === 'module' ? GOAL_MODULE : GOAL_SCRIPT,
      collectTokens: COLLECT_TOKENS_NONE,
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
testTenko(Tenko, input, 'sloppy', true);
console.timeEnd('Parse time');

console.log('\n\n');
console.log('allFuncs has', allFuncs.length, 'funcs');
console.log('test:', allFuncs.map(f => {
  let s = PERF_getStatus(f);
  if (s) return s + ': ' + f.name;
  return '';
}).filter(Boolean).join('\n'));
console.log('\n\n');
allFuncs.forEach(PERF_DebugPrint); // this needs node debug build to be useful, see header of this file for instructions
