import fs from 'fs';
import {performance} from 'perf_hooks';

import {testTenko} from './parse_tenko.mjs';

const USE_BUILD = process.argv.includes('--build') || process.argv.includes('-b') || process.argv.includes('--nb');
const USE_DEVTOOLS = process.argv.includes('--devtools');
const ONLY_TIME = process.argv.includes('--only-time');
const RESET_TRACK = process.argv.includes('--reset');
const TRACK_TIME = process.argv.includes('--track');
const TENKO_DEV_FILE = '../src/index.mjs';
const TENKO_PROD_FILE = '../build/tenko.prod.mjs';
const TENKO_PATH = USE_BUILD ? TENKO_PROD_FILE : TENKO_DEV_FILE;
const TARGET_PARSER = process.argv.includes('--parser') ? process.argv[process.argv.indexOf('--parser') + 1]: 'tenko';

const BOLD = '\x1b[;1;1m';
const BOLD_GREEN = '\x1b[1;32m';
const DIM = '\x1b[30;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

if (TARGET_PARSER !== 'tenko' && !ONLY_TIME) console.log('Target parser is ' + BOLD + TARGET_PARSER + RESET);

const trackFile = '/tmp/tenko.bench.track.txt';

let lowest = Infinity; // lowest tracked parse time since last reset
let highest = 0; // highest tracked parse time since last reset
let count = 0; // test runs tracked since last reset, ignore first n for avg
let total = 0; // sum of parse time since last reset
let avg50sum = 0; // sum of parse times that were under the average (at the time of generating it)
let avg50cnt = -5; // number of parse times summed in avg50sum, ignore the first 5 parse times to stabilize the avg
let lastsrc = '';
let empty = [lowest, highest, count, total, avg50sum, avg50cnt, lastsrc];
if (TRACK_TIME && fs.existsSync(trackFile)) {
  if (RESET_TRACK) {
    if (fs.existsSync(trackFile)) fs.writeFileSync(trackFile, JSON.stringify(empty));
  }
  else {
    [lowest, highest, count, total, avg50sum, avg50cnt, lastsrc] = JSON.parse(fs.readFileSync(trackFile, 'utf8'));
  }
}

(async function(){

  let parserParsePath;
  let Tenko;
  let parse;

  switch (TARGET_PARSER) {
    case 'tenko':
      parserParsePath = TENKO_PATH;
      Tenko = (await import(TENKO_PATH)).default;
      parse = (code, testVariant) => testTenko(Tenko, code, testVariant, true);
      break;

    case 'acorn':
      parserParsePath = './run_acorn.mjs';
      parse = (await import('./run_acorn.mjs')).runAcorn;
      break;

    case 'babel':
      parserParsePath = './run_babel.mjs';
      parse = (await import('./run_babel.mjs')).runBabel;
      break;

    case 'ghost':
      parserParsePath = './run_ghost.mjs';
      parse = (await import('./run_ghost.mjs')).runGhost;
      break;

    default:
      throw new Error('Unkown parser name; `' + TARGET_PARSER + '`; use one of `tenko`, `acorn`, `babel`, or `ghost`')
  }

  if (!ONLY_TIME) console.log('Running test on', BOLD + parserParsePath + RESET);

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
    // await read({path: 'ignore/perf/es6.material-ui-core.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es6.angular-compiler.js', mode: 'module'}),
    //
    // // Random
    // await read({path: 'ignore/perf/es5.moment-with-locales.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es6.mljs.js', mode: 'module'}),
    //
    // old... 20mb
    await read({path: 'ignore/perf/es5-8mb-bench.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es5-16mb-bench.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es5.webkit.npm.1.0.0.js', mode: 'web'}),
    // await read({path: 'ignore/perf/es5-35mb-kate.js.jo.js', mode: 'web'}),
  ].filter(Boolean);

  files.forEach(({path, code, mode}) => {
    if (lastsrc !== '' && path !== lastsrc) {
      console.log('The test source changed to', path,' (did you update the config?). Restarting.');
      fs.writeFileSync(trackFile, JSON.stringify(empty));
      process.exit();
    }
    lastsrc = path;
    let desc = 'File: ' + code.length + ' bytes: ' + path;
    if (!ONLY_TIME) console.group(desc);
    let start = 0;
    let parseTime = 0;
    try {
      if (USE_DEVTOOLS) console.profile();
      start = performance.now();
      parse(code, mode);
      parseTime = performance.now() - start;
      if (USE_DEVTOOLS) console.profileEnd();
    } catch (e) {
      console.log('Failed! ->', path, '::', e.message);
      process.exit(1);
    }

    let prevavg = Math.floor((total / count));
    ++count;
    total += parseTime;
    parseTime = Math.round(parseTime * 1000) / 1000;
    let avgnum = Math.round((total / count) * 1000) / 1000;

    if (avg50cnt >= 0) {
      if (parseTime <= avgnum) {
        avg50sum += parseTime;
        ++avg50cnt;
      }
    } else {
      // Ignore the first n runs to stabilize the avg
      ++avg50cnt;
    }

    lowest = Math.min(parseTime, lowest);
    highest = Math.max(parseTime, highest);
    if (ONLY_TIME) {
      let avg50num = avg50cnt > 2 ? Math.floor(avg50sum / avg50cnt) : 0;
      let avg50str = avg50cnt > 2 ? '' + Math.floor(avg50sum / avg50cnt) + 'ms' : 'wait';
      let mid = (avgnum - Math.round(lowest)) / (Math.round(highest) - Math.round(lowest));
      let a = Math.floor(50 * mid);
      if (a <= 0 || a >= 50) a = 25;
      let b = 50 - a;
      let graphBody = '-'.repeat(a) + '|' + '-'.repeat(b);
      let cur = ((parseTime - Math.round(lowest)) / (Math.round(highest) - Math.round(lowest))) * 50;
      if (cur <= 0 || cur >= 50) cur = 25;
      graphBody = graphBody.slice(0, cur - 1) + BOLD + graphBody.slice(cur - 1, cur) + RESET + graphBody.slice(cur);
      let graph =
        '[' + Math.floor(lowest) + (parseTime === lowest ? GREEN + '|' + RESET : '|') + graphBody + (parseTime === highest ? RED + '|' + RESET : '|') + Math.ceil(highest) + ']      ' +
        DIM + '(lo  [' + (avg50str === 'wait' ? '?' : Math.round(avg50num - lowest)) + ']  ' + Math.round(avgnum - lowest) + '  |  ' + Math.round(highest - avgnum) + '  |  hi)' + RESET;
      console.log(
        DIM + ('' + count).padStart(3) + '] ' +
        'Parse time now: ' + RESET + (parseTime === lowest ? GREEN : '') + ('' + parseTime).padStart(8, ' ') + 'ms' + RESET +
        DIM + ' (' +
        'low + ' + (''+Math.floor((parseTime - lowest)/parseTime*100)).padStart(2, ' ') + '%' +
        ', avg: ' + (''+Math.floor(avgnum)).padStart(4, ' ') + 'ms' + (prevavg < Math.floor(avgnum) ? RED + '▲' + DIM : prevavg > Math.floor(avgnum) ? GREEN + '▼' + DIM : ' ') +
        ', avg50: ' + avg50str.padStart(6, ' ') +
        ')' + RESET +
        '   ' +
        graph
      );
    } else {
      console.log('Parse time: ' + BOLD + parseTime + 'ms' + RESET);
    }

    if (TRACK_TIME) fs.writeFileSync(trackFile, JSON.stringify([lowest, highest, count, total, avg50sum, avg50cnt, lastsrc]));
    if (RESET_TRACK) console.log('Base line is', parseTime, 'ms')
    if (!ONLY_TIME) console.groupEnd();
  });

  // setTimeout(() => {
  //   console.log('End of hf.mjs, exiting hard now');
  //   process.exit();
  // }, 2000); // 1s should be enough to triger the hf flush
})();
