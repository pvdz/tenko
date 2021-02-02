// All constants in this file will be extrapolated and unconditionally inlined in a build without scope tracking
// (Make sure to only make primitives `const`, use `let` for anything else. Even if it's a constant value otherwise.)

import {ASSERT} from "./utils.mjs";

let __$flag_lf = 0; // This name is hardcoded in the build script...
const LF_NO_FLAGS = 0;
const LF_CAN_NEW_DOT_TARGET = 1 << ++__$flag_lf; // current scope is inside at least one regular (non-arrow) function
const LF_FOR_REGEX = 1 << ++__$flag_lf;
const LF_IN_ASYNC = 1 << ++__$flag_lf;
const LF_IN_CONSTRUCTOR = 1 << ++__$flag_lf; // inside a class constructor (not a regular function) that is not static
const LF_IN_FOR_LHS = 1 << ++__$flag_lf; // inside the initial part of a for-header, prevents `in` being parsed as an operator, hint for checks when destructuring pattern as lhs
const LF_IN_FUNC_ARGS = 1 << ++__$flag_lf; // throws for await expression
const LF_IN_GENERATOR = 1 << ++__$flag_lf;
const LF_IN_GLOBAL = 1 << ++__$flag_lf; // unset whenever you go into any kind of function (for return)
const LF_IN_ITERATION = 1 << ++__$flag_lf; // inside a loop (tells you whether break/continue is valid)
const LF_IN_SWITCH = 1 << ++__$flag_lf; // inside a switch (tells you whether break is valid)
const LF_IN_TEMPLATE = 1 << ++__$flag_lf;
const LF_NO_ASI = 1 << ++__$flag_lf; // can you asi if you must? used for async. LF_IN_TEMPLATE also implies this flag!
const LF_STRICT_MODE = 1 << ++__$flag_lf;
const LF_SUPER_CALL = 1 << ++__$flag_lf; // can call `super()`
const LF_SUPER_PROP = 1 << ++__$flag_lf; // can read `super.foo` (there are cases where you can doo this but not `super()`)
const LF_NOT_KEYWORD = 1 << ++__$flag_lf; // skip keyword check for next ident parse (like member expression property)
const LF_CHAINING = 1 << ++__$flag_lf; // Currently in an optional chain. If we encounter `?.` do not add another `ChainExpression` node.
ASSERT(__$flag_lf < 32, 'cannot use more than 32 flags');
// start of the first statement without knowing strict mode status:
// - div means regular expression
// - closing curly means closing curly (not template body/tail)
// - sloppy mode until proven otherwise
const INITIAL_LEXER_FLAGS = LF_FOR_REGEX | LF_IN_GLOBAL; // not sure about global, that may change depending on options{$?

function L(flags) {
  let bak = flags;
  let s = [];
  if (!flags) {
    s.push('LF_NO_FLAGS');
  }
  if (flags & LF_STRICT_MODE) {
    flags ^= LF_STRICT_MODE;
    s.push('LF_STRICT_MODE');
  }
  if (flags & LF_FOR_REGEX) {
    flags ^= LF_FOR_REGEX;
    s.push('LF_FOR_REGEX');
  }
  if (flags & LF_IN_TEMPLATE) {
    flags ^= LF_IN_TEMPLATE;
    s.push('LF_IN_TEMPLATE');
  }
  if (flags & LF_IN_ASYNC) {
    flags ^= LF_IN_ASYNC;
    s.push('LF_IN_ASYNC');
  }
  if (flags & LF_IN_GENERATOR) {
    flags ^= LF_IN_GENERATOR;
    s.push('LF_IN_GENERATOR');
  }
  if (flags & LF_IN_CONSTRUCTOR) {
    flags ^= LF_IN_CONSTRUCTOR;
    s.push('LF_IN_CONSTRUCTOR');
  }
  if (flags & LF_IN_FUNC_ARGS) {
    flags ^= LF_IN_FUNC_ARGS;
    s.push('LF_IN_FUNC_ARGS');
  }
  if (flags & LF_IN_GLOBAL) {
    flags ^= LF_IN_GLOBAL;
    s.push('LF_IN_GLOBAL');
  }
  if (flags & LF_IN_ITERATION) {
    flags ^= LF_IN_ITERATION;
    s.push('LF_IN_ITERATION');
  }
  if (flags & LF_IN_SWITCH) {
    flags ^= LF_IN_SWITCH;
    s.push('LF_IN_SWITCH');
  }
  if (flags & LF_CAN_NEW_DOT_TARGET) {
    flags ^= LF_CAN_NEW_DOT_TARGET;
    s.push('LF_CAN_NEW_DOT_TARGET');
  }
  if (flags & LF_IN_FOR_LHS) {
    flags ^= LF_IN_FOR_LHS;
    s.push('LF_IN_FOR_LHS');
  }
  if (flags & LF_NO_ASI) {
    flags ^= LF_NO_ASI;
    s.push('LF_NO_ASI');
  }
  if (flags & LF_SUPER_CALL) {
    flags ^= LF_SUPER_CALL;
    s.push('LF_SUPER_CALL');
  }
  if (flags & LF_SUPER_PROP) {
    flags ^= LF_SUPER_PROP;
    s.push('LF_SUPER_PROP');
  }
  if (flags & LF_NOT_KEYWORD) {
    flags ^= LF_NOT_KEYWORD;
    s.push('LF_NOT_KEYWORD');
  }
  if (flags & LF_CHAINING) {
    flags ^= LF_CHAINING;
    s.push('LF_CHAIING');
  }
  if (flags) {
    throw new Error('UNKNOWN_FLAGS: ' + flags.toString(2) + ' (was: ' + bak.toString(2) + '), so far: [' + s.join('|') + ']');
  }
  return 'L:' + s.join('|');
}

export {
  INITIAL_LEXER_FLAGS,

  LF_NO_FLAGS,
  LF_CAN_NEW_DOT_TARGET,
  LF_FOR_REGEX,
  LF_IN_ASYNC,
  LF_IN_CONSTRUCTOR,
  LF_IN_FOR_LHS,
  LF_IN_FUNC_ARGS,
  LF_IN_GENERATOR,
  LF_IN_GLOBAL,
  LF_IN_ITERATION,
  LF_IN_SWITCH,
  LF_IN_TEMPLATE,
  LF_NO_ASI,
  LF_STRICT_MODE,
  LF_SUPER_CALL,
  LF_SUPER_PROP,
  LF_NOT_KEYWORD,
  LF_CHAINING,

  L,
};
