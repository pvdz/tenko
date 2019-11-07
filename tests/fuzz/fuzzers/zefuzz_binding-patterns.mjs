// Continuation from https://github.com/pvdz/uglyfuzzer

import {
  errorify,
  maybe,
  oi,
  pick,
  pickMaybe,
  repeat,
  rngpeat,
  rng,
} from '../fuzzutils.mjs';

const MODE_ARG_PATTERN = true;
const ALLOW_PATTERN_SPREAD = true;
const ALLOW_BAD_PATTERN = false;
const ALLOW_BAD_REST_ORDER_OVERALL = ALLOW_BAD_PATTERN && true;
let ALLOW_BAD_REST_ORDER = ALLOW_BAD_REST_ORDER_OVERALL;

function createFunctionDecls(n, recurmax) {
  if (--recurmax < 0) return ';';

  return repeat(n, () => createFunctionDecl(recurmax), '\n');
}

let funcs = 0;
function createFunctionDecl(recurmax) {
  if (--recurmax < 0) return ';';

  let func = funcs++;
  return pickMaybe(
    ALLOW_BAD_PATTERN && (() => 'function f' + func + '(' + createArgs(recurmax) + ') {' + (MODE_ARG_PATTERN || createStatements(3, recurmax)) + '}\nf' + func + '();'),
    () => 'let f' + func + ' = (' + createArgs(recurmax) + ') => {' + (MODE_ARG_PATTERN || createStatements(3, recurmax)) + '}\nf' + func + '();',
    () => 'function f' + func + '(' + createBindingPatterns(recurmax) + ') { "use strict"; ' + (MODE_ARG_PATTERN || createStatements(3, recurmax)) + '}\nf' + func + '();',
  );
}

function createArgs(recurmax) {
  return rngpeat(10, () => createArg(recurmax));
}

function createArg(recurmax) {
  if (MODE_ARG_PATTERN || maybe()) {
    return createBindingPattern(recurmax);
  } else {
    return pick('x', 'y', 'z');
  }
}

let pcount = 0;
function createBindingPatterns(recurmax) {
  if (--recurmax <= 0) return 'x' + (++pcount);

  return rngpeat(10, () => createBindingPattern(--recurmax));
}
function createBindingPattern(recurmax) {
  if (--recurmax <= 0) return 'x' + (++pcount);

  // 0.05% probable error rate (because it might still be valid)
  if (ALLOW_BAD_PATTERN && oi(200)) return createExpression(recurmax);

  return pick(
    () => 'x' + (++pcount),
    () => createArrayPattern(recurmax),
    () => createObjectPattern(recurmax),
  );
}

function createArrayPattern(recurmax) {
  if (--recurmax <= 0) return 'x' + (++pcount);

  if (oi(20)) return '[]';

  let lastWasRest = false;
  let s = createArrayPatternPart(recurmax);
  let skip = s[0] !== '.' || ALLOW_BAD_REST_ORDER;
  if (skip) {
    for (let i=0, l=rng(5); i<l; ++i) {
      lastWasRest = false;
      let r = createArrayPatternPart(recurmax);
      s += ',' + r;
      if (r[0] === '.') {
        lastWasRest = true;
        if (!ALLOW_BAD_REST_ORDER || oi(100, 95)) break; // 5% to intentionally allow bad rests...?
      }
    }

    if ((!lastWasRest || ALLOW_BAD_REST_ORDER) && maybe()) s += ','; // trailing comma
  }

  s = '[' + s + ']';

  if (!skip && oi(20)) {
    // 5% for init
    s += ' = ' + createExpression(recurmax, true);
  }

  return s;
}
function createArrayPatternPart(recurmax) {
  let s = '';
  // 10% to create a rest
  if (!ALLOW_PATTERN_SPREAD || oi(10)) {
    s = createBindingPattern(recurmax);
  } else {
    // Keep this last for ALLOW_PATTERN_SPREAD
    s = '...x' + (++pcount); // rest arg must be plain ident
  }

  if (oi(20)) {
    // 5% for init
    if (s[0] !== '.' || ALLOW_BAD_PATTERN) s += ' = ' + createExpression(recurmax, true);
  }

  return s;
}

function createObjectPattern(recurmax) {
  if (--recurmax <= 0) return 'x' + (++pcount);

  if (oi(20)) return '{}';

  let lastWasRest = false;
  let s = createObjectPatternPart(recurmax);
  let skip = s[0] !== '.' || ALLOW_BAD_REST_ORDER;
  if (skip) {
    for (let i=0, l=rng(5); i<l; ++i) {
      lastWasRest = false;
      let r = createObjectPatternPart(recurmax);
      s += ',' + r;
      if (r[0] === '.') {
        lastWasRest = true;
        if (!ALLOW_BAD_REST_ORDER || oi(100, 95)) break; // 5% to intentionally allow bad rests...?
      }
    }

    if ((!lastWasRest || ALLOW_BAD_REST_ORDER) && maybe()) s += ','; // trailing comma
  }

  s = '{' + s + '}';

  if (!skip && oi(20)) {
    // 5% for init
    s += ' = ' + createExpression(recurmax, true);
  }

  return s;
}
function createObjectPatternPart(recurmax) {

  // 0.05% probable error rate per part (because it might still be valid)
  if (ALLOW_BAD_PATTERN && oi(200)) return createExpression(recurmax);

  let s = '';

  s = pickMaybe(
    ALLOW_PATTERN_SPREAD || (() => s = 'x' + (++pcount)),
    () => 'x' + (++pcount) + ':' + createBindingPattern(recurmax),
    // computed property is not a sequence expression (one expr, not multiple with comma)
    () => '[' + createExpression(recurmax, true) + ']:' + createBindingPattern(recurmax),
    // Keep this last for ALLOW_PATTERN_SPREAD
    () => '...x' + (++pcount), // rest arg must be plain ident
  );

  if (oi(20)) {
    // 5% for init
    if (s[0] !== '.' || ALLOW_BAD_PATTERN) s += ' = ' + createExpression(recurmax, true);
  }

  return s;
}

function createStatements(n, recurmax) {
  if (--recurmax < 0) return ';';
  return repeat(n, () => createStatement(recurmax), '');
}

let loops = 0;
function createStatement(recurmax) {
  let loop = ++loops;

  if (--recurmax < 0) return ';';

  return pick(
    () => '{' + createStatement(recurmax) + '}',
    () => 'if (' + createExpression(recurmax) + ')' + createStatement(recurmax),
    () => '{var brake' + loop + ' = 5; do {' + createStatement(recurmax) + '} while ((' + createExpression(recurmax) + ') && --brake' + loop + ' > 0);}',
    () => '{var brake' + loop + ' = 5; while ((' + createExpression(recurmax) + ') && --brake' + loop + ' > 0)' + createStatement(recurmax) + '}',
    () => 'for (var brake' + loop + ' = 5; (' + createExpression(recurmax) + ') && brake' + loop + ' > 0; --brake' + loop + ')' + createStatement(recurmax),
    () => ';',
    () => createExpression() + ';',
  );
}

function createExpression(recurmax, noSequence = false) {
  if (--recurmax < 0) return '0';

  return pick(
    () => '(a' + (oi(50) ? '++' : '--') + ')',
    () => '(' + createUnaryOp() + 'a)',
    () => '(b ' + createAssignment() + ' a)',
    () => 'async(...x)',
    () => createExpression(recurmax, noSequence) + createBinaryOp(noSequence) + createExpression(recurmax, noSequence),
    () => createValue(),
    () => '(' + createExpression(recurmax) + ')',
    () => createExpression(recurmax, noSequence) + '?(' + createExpression(recurmax) + '):(' + createExpression(recurmax, noSequence) + ')',
  );
}

function createValue() {
  return pick(
    'true',
    'false',
    '22',
    '0',
    '/x/',
    '/x/g',
  );
}

function createBinaryOp(noSequence) {
  return pickMaybe(
    '+',
    '-',
    '^',
    '&&',
    '||',
    noSequence ? false : ',',
  );
}

function createAssignment() {
  switch (rng(8)) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return '=';
    case 5:
      return '-=';
    case 6:
      return '^=';
    case 7:
      return '+=';
  }
}

function createUnaryOp() {
  switch (rng(4)) {
    case 0:
      return '--';
    case 1:
      return '++';
    case 2:
      return '~';
    case 3:
      return '!';
  }
}

export default () => {
  if (ALLOW_BAD_REST_ORDER_OVERALL) {
    ALLOW_BAD_REST_ORDER = false //oi(10); // 10% to allow bad pattern stuff
  }

  funcs = pcount = loops = 0;

  return `
  var a = 100, b = 10;
  ${errorify(createFunctionDecls(1, 10))}
  console.log(a, b);
`;
}
