// Continuation from https://github.com/pvdz/uglyfuzzer

import {
  errorify,
  pick,
  rng,
} from '../fuzzutils.mjs';

function createLhs() {
  return pick(
    () => createId(),
    () => '[]',
    () => '{}',
    () => 'super.foo',
    () => 'super()',
  );
}

function createWrapperClass(expr) {
  return pick(
    () => 'class x { ' + createId() + '() { a, ' + expr + ' } }',
    () => 'class x { constructor() { a, ' + expr + ' } }',
    () => 'class x extends y { ' + createId() + '() { a, ' + expr + ' } }',
    () => 'class x extends y { constructor() { a, ' + expr + ' } }',
  );
}

function createWrapperFunc(expr) {
  return pick(
    () => `() => ${expr}`,
    () => `async () => ${expr}`,
    () => 'function ' + createId() + '(){ a, ' + expr + ' }',
    () => 'function *' + createId() + '(){ a, ' + expr + ' }',
    () => 'async function ' + createId() + '(){ a, ' + expr + ' }',
    () => 'async function *' + createId() + '(){ a, ' + expr + ' }',
  );
}

function createWrapper(expr) {
  return pick(
    () => `let ${createId()} = ${expr}`,
    () => `${createId()}(${expr})`,
    () => `(${expr})`,
    () => createId() + ' ' + expr + ' ' + createId(),
    () => createWrapperFunc(expr),
    () => createWrapperClass(expr),
  );
}

function createId() {
  let s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_6';
  return s[rng(s.length)];
}

function createNumber() {
  return pick(
    () => '1',
    () => '.2',
    () => '3.',
    () => '4e5',
  );
}
function createString() {
  return pick(
    () => '"x"',
    () => "'y'",
  );
}
function createStringish() {
  return pick(
    () => '"x"',
    () => "'y'",
    () => '`z`',
  );
}

function createExpression() {
  return pick(
    () => createId(),
    () => createStringish(),
    () => createNumber(),
    () => createLhs(),
  );
}

function createMethodKey(r) {
  if (rng(25) === 0) {
    return pick(
      () => 'constructor',
      () => '"constructor"',
      () => '__proto__',
      () => '"__proto__"',
    );
  }
  return pick(
    () => 'async',
    () => 'get',
    () => 'set',
    () => `[${createExpression()}]`,
    () => createId(),
    () => createNumber(),
    () => createString(),
  );
}

function createMethodHeader(args = 0) {
  if (args) return '(' + createId() + ')';
  return '()';
}

function createMethodBody() {
  return '{}';
}

function createMethod(r) {
  if (--r < 0) return createMethodKey(r) + createMethodHeader() + createMethodBody();
  return pick(
    () => pick(() => 'async', () => '*', () => 'get', () => 'set') + ' ' + createMethod(r),
    () => 'async ' + createMethodKey(r) + createMethodHeader() + createMethodBody(),
    () => 'async *' + createMethodKey(r) + createMethodHeader() + createMethodBody(),
    () => 'get ' + createMethodKey(r) + createMethodHeader() + createMethodBody(),
    () => 'set ' + createMethodKey(r) + createMethodHeader(1) + createMethodBody(),
  );
}

function createBodyPart(r) {
  return pick(
    () => ';',
    () => createMethod(r),
  );
}

function createBodyParts(r) {
  let list = [];
  for (let i=0, l=rng(r)+2; i<l; ++i) {
    list.push(createBodyPart(r));
  }
  return list;
}

function createBody(r) {
  return '{' + createBodyParts(r).join('') + '}';
}

function createClassExpr(r) {
  --r;
  return pick(
    () => createWrapper(`class ${createBody(r)}`),
    () => createWrapper(`class ${createId()} ${createBody(r)}`),
    () => createWrapper(`class extends ${createLhs(r)} ${createBody(r)}`),
    () => createWrapper(`class ${createId()} extends ${createLhs(r)} ${createBody(r)}`),
  )

}
function createClassDecl(r) {
  --r;
  return pick(
    () => `class ${createId()} ${createBody(r)}`,
    () => `class ${createId()} extends ${createLhs(r)} ${createBody(r)}`,
  );
}

function create(r) {
  return pick(
    () => createClassDecl(r),
    () => createClassExpr(r),
  );
}


export default (r=5) => {
  let s = create(r);
  return errorify(s);
}
