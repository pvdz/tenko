import fs from 'fs';
import execSync from 'child_process';

let chars = ['/', '\n/', '[', ']', '(', ')', '{', '}', ';', ',', '.', '\n', '=', '|='].map(s => ()=>s);

const BOLD = '\x1b[;1;1m';
const DIM = '\x1b[30;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

function errorify(s, r=5) {
  for (let i=0; i<3; ++i) {
    // Inject characters at random positions which very likely to trip up the parser
    if (Math.random() < 0.01) {
      let i = rng(s.length);
      s = s.slice(0, i) + pick(...chars) + s.slice(i);
    }
  }

  return s;
}

function rng(max) {
  return Math.floor(max * Math.random());
}
function oi(n, m = 1) {
  return (Math.random() * n) < m;
}
function maybe() {
  return Math.random() < 0.5;
}

function pick() {
  let s = arguments[rng(arguments.length)];
  if (typeof s !== 'string') return s();
  return s;
}

function pickMaybe(...args) {
  let a = args.filter(a => !!a);
  let s = a[rng(a.length)];
  if (typeof s !== 'string') return s();
  return s;
}

function repeat(times, func, joiner = ',') {
  let s = func();
  for (let i=0; i<times; ++i) {
    s += joiner + func();
  }
  return s;
}
function rngpeat(upto, func, joiner = ',') {
  return repeat(rng(upto), func, joiner);
}


function dumpFuzzOutput(min, full, errorMessage, desc) {
  console.log('');
  console.log('dumpFuzzOutput:', desc);

  let outFileBase = 'tests/testcases/todo/_fuzz';
  let outFile = outFileBase + '.md';
  let n = 0;
  while (fs.existsSync(outFile)) {
    outFile = outFileBase + '.' + (++n) + '.md';
  }

  fs.writeFileSync(
    outFile,
    '@By fuzzer, '+desc+'\nError: '+errorMessage+'\n\n'+(full!==min?'Original input:\n\n```\n'+full+'\n```\n\n':'')+'###\n'+min+'\n'
  );

  console.log('');
  console.log('Written to ' + BOLD + outFile + RESET);
  console.group('Error:')
  console.log(errorMessage);
  console.groupEnd();
  console.group('Repro:');
  console.log(BOLD + './t i "' + min + '"' + RESET);
  console.groupEnd();
}

function warnOsd(where) {
  try { execSync('notify-send "fuzzer found error in '+where+'"'); } catch {} // OS specific. Works for me :)
}

export {
  maybe,
  oi,
  pick,
  pickMaybe,
  repeat,
  rng,
  rngpeat,
  errorify,

  dumpFuzzOutput,
  warnOsd,
};
