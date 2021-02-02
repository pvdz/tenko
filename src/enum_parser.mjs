// All constants of the parser itself (parser.mjs) that can be inlined should go in here
// At dev time many of these constants are distinguishable object references.
// In a prod build these are all scrubbed to generic booleans or numbers.
// This file is used as a way to decide which constants to inline. As such be careful to only make primitives `const`
// because the inlining is unconditional beyond being a const in this file.

import {ASSERT} from "./utils.mjs";

const VERSION_EXPONENTIATION = 7; // ES2016
const VERSION_ASYNC = 8; // ES2017
const VERSION_TRAILING_FUNC_COMMAS = 8; // ES2017
const VERSION_ASYNC_GEN = 9; // ES2018
const VERSION_OBJECTSPREAD = 9; // ES2018
const VERSION_TAGGED_TEMPLATE_BAD_ESCAPES = 9; // ES2018
const VERSION_OPTIONAL_CATCH = 10; // ES2019
const VERSION_DYNAMIC_IMPORT = 11; // ES2020
const VERSION_EXPORT_STAR_AS = 11; // ES2020
const VERSION_WHATEVER = Infinity;
const IS_ASYNC = DEVONLY() ? {IS_ASYNC: 1} : true;
const NOT_ASYNC = DEVONLY() ? {_ASYNC: 1} : false;
const IS_ASYNC_PREFIXED = DEVONLY() ? {IS_ASYNC_PREFIXED: 1} : true;
const NOT_ASYNC_PREFIXED = DEVONLY() ? {NOT_ASYNC_PREFIXED: 1} : false;
const UNDEF_STATIC = DEVONLY() ? {UNDEF_STATIC: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_ASYNC = DEVONLY() ? {UNDEF_ASYNC: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_STAR = DEVONLY() ? {UNDEF_STAR: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_GET = DEVONLY() ? {UNDEF_GET: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_SET = DEVONLY() ? {UNDEF_SET: 1, get str(){ASSERT(false)}} : undefined;
const IS_FUNC_DECL = DEVONLY() ? {IS_FUNC_DECL: 1} : true;
const NOT_FUNC_DECL = DEVONLY() ? {NOT_FUNC_DECL: 1} : false;
const IS_FUNC_EXPR = DEVONLY() ? {IS_FUNC_EXPR: 1} : true;
const NOT_FUNC_EXPR = DEVONLY() ? {NOT_FUNC_EXPR: 1} : false;
const IDENT_OPTIONAL = DEVONLY() ? {IDENT_OPTIONAL: 1} : true;
const IDENT_REQUIRED = DEVONLY() ? {IDENT_REQUIRED: 1} : false;
const PARSE_VALUE_MAYBE = DEVONLY() ? {PARSE_VALUE_MAYBE: 1} : true;
const PARSE_VALUE_MUST = DEVONLY() ? {PARSE_VALUE_MUST: 1} : false;
const YIELD_WITHOUT_VALUE = DEVONLY() ? {YIELD_WITHOUT_VALUE: 1} : 0;
const WITH_ASSIGNABLE = DEVONLY() ? {WITH_ASSIGNABLE: 1} : 1;
const WITH_NON_ASSIGNABLE = DEVONLY() ? {WITH_NON_ASSIGNABLE: 1} : 2;
const IS_ARROW = DEVONLY() ? {IS_ARROW: 1} : true;
const NOT_ARROW = DEVONLY() ? {NOT_ARROW: 1} : false;
const FROM_STATEMENT_START = DEVONLY() ? {FROM_STATEMENT_START: 1} : 1;
const FROM_FOR_HEADER = DEVONLY() ? {FROM_FOR_HEADER: 1} : 2;
const FROM_EXPORT_DECL = DEVONLY() ? {FROM_EXPORT_DECL: 1} : 3;
const FROM_CATCH = DEVONLY() ? {FROM_CATCH: 1} : 4;
const FROM_ASYNC_ARG = DEVONLY() ? {FROM_ASYNC_ARG: 1} : 5;
const FROM_OTHER_FUNC_ARG = DEVONLY() ? {FROM_OTHER_FUNC_ARG: 1} : 6;
const COAL_SEEN_NEITHER = 0;
const COAL_SEEN_NULLISH = 1;
const COAL_SEEN_LOGICAL = 2;
const ASSIGNMENT_IS_INIT = DEVONLY() ? {ASSIGNMENT_IS_INIT: 1} : true; // var foo = bar;  (not to be parsed by parseBinding
const ASSIGNMENT_IS_DEFAULT = DEVONLY() ? {ASSIGNMENT_IS_DEFAULT: 1} : false; // (foo = bar) => foo  (parsed by parseBinding)
const IS_EXPRESSION = DEVONLY() ? {IS_EXPRESSION: 1} : 1;
const IS_STATEMENT = DEVONLY() ? {IS_STATEMENT: 1} : 2;
const IS_NEW_ARG = DEVONLY() ? {IS_NEW_ARG: 1} : 3;
const NOT_NEW_ARG = DEVONLY() ? {NOT_NEW_ARG: 1} : 4;
const IS_OPTIONAL = DEVONLY() ? {IS_OPTIONAL: 1} : 1;
const NOT_OPTIONAL = DEVONLY() ? {NOT_OPTIONAL: 1} : 2;
const MIGHT_DESTRUCT = 0; // any kind of destructuring or lack thereof is okay
const CANT_DESTRUCT = 1 << 0; // it is impossible to destructure this
const DESTRUCT_ASSIGN_ONLY = 1 << 1; // the only way this can destruct is by assignment
const MUST_DESTRUCT = 1 << 2; // something that is an error if it doesnt lead to destructurig like `({a=b})`
const ASSIGNABLE_UNDETERMINED = 1 << 3;
const NOT_ASSIGNABLE = 1 << 4;
const IS_ASSIGNABLE = 1 << 5;
const PIGGY_BACK_SAW_AWAIT = 1 << 6; // parsed an expression containing `await` as varname or keyword
const PIGGY_BACK_SAW_YIELD = 1 << 7; // parsed an expression containing `yield` as varname or keyword
const PIGGY_BACK_WAS_CONSTRUCTOR = 1 << 8; // signal having found a constructor (special case)
const PIGGY_BACK_WAS_PROTO = 1 << 9; // signal that a `__proto__: x` was parsed (do detect double occurrence)
const PIGGY_BACK_WAS_ARROW = 1 << 10; // signal that double proto was found on object; error in web compat outside of arrow headers
const NO_SPREAD = DEVONLY() ? {NO_SPREAD: 1} : 0;
const LAST_SPREAD = DEVONLY() ? {LAST_SPREAD: 1} : 1;
const MID_SPREAD = DEVONLY() ? {MID_SPREAD: 1} : 2;
const PARSE_INIT = DEVONLY() ? {PARSE_INIT: 1} : true;
const SKIP_INIT = DEVONLY() ? {SKIP_INIT: 1} : false;
const IS_EXPORT = DEVONLY() ? {IS_EXPORT: 1} : true;
const NOT_EXPORT = DEVONLY() ? {NOT_EXPORT: 1} : false;
const IS_QUASI_TAIL = DEVONLY() ? {IS_QUASI_TAIL: 1} : true;
const NOT_QUASI_TAIL = DEVONLY() ? {NOT_QUASI_TAIL: 1} : false;
const PARAM_UNDETERMINED = DEVONLY() ? {PARAM_UNDETERMINED: 1} : 0;
const PARAM_WAS_SIMPLE = DEVONLY() ? {PARAM_WAS_SIMPLE: 1} : 1;
const PARAM_WAS_NON_STRICT_SIMPLE = DEVONLY() ? {PARAM_WAS_NON_STRICT_SIMPLE: 1} : 2; // like a future reserved word, `(package) => {"use strict"}`
const PARAM_WAS_COMPLEX = DEVONLY() ? {PARAM_WAS_COMPLEX: 1} : 3;
const PARAM_WAS_COMPLEX_HAD_INIT = DEVONLY() ? {PARAM_WAS_COMPLEX_HAD_INIT: 1} : 4;
const PARAMS_ALL_SIMPLE = DEVONLY() ? {PARAMS_ALL_SIMPLE: 1} : 1;
const PARAMS_SOME_NONSTRICT = DEVONLY() ? {PARAMS_SOME_NONSTRICT: 1} : 2;
const PARAMS_SOME_COMPLEX = DEVONLY() ? {PARAMS_SOME_COMPLEX: 1} : 3;
const IS_CONSTRUCTOR = DEVONLY() ? {IS_CONSTRUCTOR: 1} : true;
const NOT_CONSTRUCTOR = DEVONLY() ? {NOT_CONSTRUCTOR: 1} : false;
const IS_METHOD = DEVONLY() ? {IS_METHOD: 1} : true;
const NOT_METHOD = DEVONLY() ? {NOT_METHOD: 1} : false;
const ASSIGN_EXPR_IS_OK = DEVONLY() ? {ASSIGN_EXPR_IS_OK: 1} : true; // fine to parse assignments, arrows, yield, ternary
const ASSIGN_EXPR_IS_ERROR = DEVONLY() ? {ASSIGN_EXPR_IS_ERROR: 1} : false; // throw on actual assignments, but also arrows, yield, await, ternary
const NO_ID_TO_VERIFY = DEVONLY() ? {NO_ID_TO_VERIFY: 1} : undefined;
const NO_DUPE_PARAMS = DEVONLY() ? {NO_DUPE_PARAMS: 1} : 0;
const DO_NOT_BIND = DEVONLY() ? {DO_NOT_BIND: 1} : null;
const UNDEF_EXPORTS = DEVONLY() ? {UNDEF_EXPORTS: 1} : undefined;
const FDS_ILLEGAL = DEVONLY() ? {FDS_ILLEGAL: 1} : 1; // function declaration not allowed, period
const FDS_IFELSE = DEVONLY() ? {FDS_IFELSE: 2} : 2;  // if-else specific webcompat exception would apply to a function declaration
const FDS_LEX = DEVONLY() ? {FDS_LEX: 3} : 3;      // a function declaration would be a lexical binding
const FDS_VAR = DEVONLY() ? {FDS_VAR: 4} : 4;      // a function declaration would be a var binding
const IS_GLOBAL_TOPLEVEL = DEVONLY() ? {IS_GLOBAL_TOPLEVEL: 1} : true;
const NOT_GLOBAL_TOPLEVEL = DEVONLY() ? {NOT_GLOBAL_TOPLEVEL: 1} : false;
const IS_LABELLED = DEVONLY() ? {IS_LABELLED: 1} : true;
const NOT_LABELLED = DEVONLY() ? {NOT_LABELLED: 1} : false;
const NOT_LHSE = DEVONLY() ? {NOT_LHSE: 1} : false; // not requiring a "LeftHandExpression". This is currently only used for class `extends`.
const ONLY_LHSE = DEVONLY() ? {ONLY_LHSE: 1} : true; // restrict value to conform to a "LeftHandExpression" production.
const PARENT_NOT_LABEL = null; // when the parent statement was not a label statement
const EMPTY_LABEL_SET = null;

// The scope constants are exported so make them `let` so they don't get scrubbed entirely
// TODO: also means they won't be inlined so this may require a slightly more granular system
let BINDING_TYPE_NONE = DEVONLY() ? {BINDING_TYPE_NONE: 1} : 0;
let BINDING_TYPE_ARG = DEVONLY() ? {BINDING_TYPE_ARG: 1} : 1;
let BINDING_TYPE_VAR = DEVONLY() ? {BINDING_TYPE_VAR: 1} : 2;
let BINDING_TYPE_FUNC_VAR = DEVONLY() ? {BINDING_TYPE_FUNC_VAR: 1} : 3;
let BINDING_TYPE_FUNC_STMT = DEVONLY() ? {BINDING_TYPE_FUNC_STMT: 1} : 4; // A func decl inside a block or switch (for webcompat mode)
let BINDING_TYPE_FUNC_LEX = DEVONLY() ? {BINDING_TYPE_FUNC_LEX: 1} : 5;
let BINDING_TYPE_LET = DEVONLY() ? {BINDING_TYPE_LET: 1} : 6;
let BINDING_TYPE_CONST = DEVONLY() ? {BINDING_TYPE_CONST: 1} : 7;
let BINDING_TYPE_CLASS = DEVONLY() ? {BINDING_TYPE_CLASS: 1} : 8;
let BINDING_TYPE_CATCH_IDENT = DEVONLY() ? {BINDING_TYPE_CATCH_IDENT: 1} : 9;
let BINDING_TYPE_CATCH_OTHER = DEVONLY() ? {BINDING_TYPE_CATCH_OTHER: 1} : 10;
let HAS_NO_BINDINGS = DEVONLY() ? {HAS_NO_BINDINGS: 1} : null;
let SCOPE_LAYER_GLOBAL = DEVONLY() ? {SCOPE_LAYER_GLOBAL: 1} : 0;
let SCOPE_LAYER_FOR_HEADER = DEVONLY() ? {SCOPE_LAYER_FOR_HEADER: 1} : 1;
let SCOPE_LAYER_BLOCK = DEVONLY() ? {SCOPE_LAYER_BLOCK: 1} : 2;
let SCOPE_LAYER_FUNC_PARAMS = DEVONLY() ? {SCOPE_LAYER_FUNC_PARAMS: 1} : 3;
let SCOPE_LAYER_CATCH_HEAD = DEVONLY() ? {SCOPE_LAYER_CATCH_HEAD: 1} : 5;
let SCOPE_LAYER_CATCH_BODY = DEVONLY() ? {SCOPE_LAYER_CATCH_BODY: 1} : 6;
let SCOPE_LAYER_FINALLY = DEVONLY() ? {SCOPE_LAYER_FINALLY: 1} : 7;
let SCOPE_LAYER_SWITCH = DEVONLY() ? {SCOPE_LAYER_SWITCH: 1} : 8;
let SCOPE_LAYER_FUNC_ROOT = DEVONLY() ? {SCOPE_LAYER_FUNC_ROOT: 1} : 9;
let SCOPE_LAYER_FUNC_BODY = DEVONLY() ? {SCOPE_LAYER_FUNC_BODY: 1} : 10;
let SCOPE_LAYER_ARROW_PARAMS = DEVONLY() ? {SCOPE_LAYER_ARROW_PARAMS: 1} : 11;
let SCOPE_LAYER_FAKE_BLOCK = DEVONLY() ? {SCOPE_LAYER_FAKE_BLOCK: 1} : 12;

// This `DEVONLY` function is only used to set objects for enum in a dev build. In a prod build these are stripped entirely
// The "dsl" for this function is assuming usage in a ternary (`DEVONLY() ? devstuff : prodstuff`). Any other use is at the mercy of the DCE of the minifier.
function DEVONLY() {
  let dev = false;
  // A build will eliminate this ASSERT call. A minifier will inline the `true` and then eliminate it. Hopefully.
  ASSERT(dev = true);
  return dev;
}

const PIGGIES = (0
  | PIGGY_BACK_SAW_AWAIT
  | PIGGY_BACK_SAW_YIELD
  | PIGGY_BACK_WAS_CONSTRUCTOR
  | PIGGY_BACK_WAS_PROTO
  | PIGGY_BACK_WAS_ARROW
);
function copyPiggies(output, input) {
  return output | (input & PIGGIES);
}

function P(f, arr) {
  if (f & PIGGY_BACK_WAS_CONSTRUCTOR) {
    arr.push('PIGGY_BACK_WAS_CONSTRUCTOR');
    f ^= PIGGY_BACK_WAS_CONSTRUCTOR;
  }
  if (f & PIGGY_BACK_WAS_PROTO) {
    arr.push('PIGGY_BACK_WAS_PROTO');
    f ^= PIGGY_BACK_WAS_PROTO;
  }
  if (f & PIGGY_BACK_SAW_AWAIT) {
    arr.push('PIGGY_BACK_SAW_AWAIT');
    f ^= PIGGY_BACK_SAW_AWAIT;
  }
  if (f & PIGGY_BACK_SAW_YIELD) {
    arr.push('PIGGY_BACK_SAW_YIELD');
    f ^= PIGGY_BACK_SAW_YIELD;
  }
  if (f & PIGGY_BACK_WAS_ARROW) {
    arr.push('PIGGY_BACK_WAS_ARROW');
    f ^= PIGGY_BACK_WAS_ARROW;
  }
  return f;
}

export {
  VERSION_EXPONENTIATION,
  VERSION_ASYNC,
  VERSION_TRAILING_FUNC_COMMAS,
  VERSION_ASYNC_GEN,
  VERSION_OBJECTSPREAD,
  VERSION_TAGGED_TEMPLATE_BAD_ESCAPES,
  VERSION_OPTIONAL_CATCH,
  VERSION_DYNAMIC_IMPORT,
  VERSION_EXPORT_STAR_AS,
  VERSION_WHATEVER,
  IS_ASYNC,
  NOT_ASYNC,
  IS_ASYNC_PREFIXED,
  NOT_ASYNC_PREFIXED,
  UNDEF_STATIC,
  UNDEF_ASYNC,
  UNDEF_STAR,
  UNDEF_GET,
  UNDEF_SET,
  IS_FUNC_DECL,
  NOT_FUNC_DECL,
  IS_FUNC_EXPR,
  NOT_FUNC_EXPR,
  IDENT_OPTIONAL,
  IDENT_REQUIRED,
  PARSE_VALUE_MAYBE,
  PARSE_VALUE_MUST,
  YIELD_WITHOUT_VALUE,
  WITH_ASSIGNABLE,
  WITH_NON_ASSIGNABLE,
  IS_ARROW,
  NOT_ARROW,
  FROM_STATEMENT_START,
  FROM_FOR_HEADER,
  FROM_EXPORT_DECL,
  FROM_CATCH,
  FROM_ASYNC_ARG,
  FROM_OTHER_FUNC_ARG,
  COAL_SEEN_NEITHER,
  COAL_SEEN_NULLISH,
  COAL_SEEN_LOGICAL,
  BINDING_TYPE_NONE,
  BINDING_TYPE_ARG,
  BINDING_TYPE_VAR,
  BINDING_TYPE_LET,
  BINDING_TYPE_CONST,
  BINDING_TYPE_CLASS,
  BINDING_TYPE_FUNC_VAR,
  BINDING_TYPE_FUNC_LEX,
  BINDING_TYPE_FUNC_STMT,
  BINDING_TYPE_CATCH_IDENT,
  BINDING_TYPE_CATCH_OTHER,
  HAS_NO_BINDINGS,
  ASSIGNMENT_IS_INIT,
  ASSIGNMENT_IS_DEFAULT,
  IS_EXPRESSION,
  IS_STATEMENT,
  IS_NEW_ARG,
  NOT_NEW_ARG,
  IS_OPTIONAL,
  NOT_OPTIONAL,
  MIGHT_DESTRUCT,
  CANT_DESTRUCT,
  DESTRUCT_ASSIGN_ONLY,
  MUST_DESTRUCT,
  ASSIGNABLE_UNDETERMINED,
  NOT_ASSIGNABLE,
  IS_ASSIGNABLE,
  PIGGY_BACK_SAW_AWAIT,
  PIGGY_BACK_SAW_YIELD,
  PIGGY_BACK_WAS_CONSTRUCTOR,
  PIGGY_BACK_WAS_PROTO,
  PIGGY_BACK_WAS_ARROW,
  NO_SPREAD,
  LAST_SPREAD,
  MID_SPREAD,
  PARSE_INIT,
  SKIP_INIT,
  IS_EXPORT,
  NOT_EXPORT,
  IS_QUASI_TAIL,
  NOT_QUASI_TAIL,
  PARAM_UNDETERMINED,
  PARAM_WAS_SIMPLE,
  PARAM_WAS_NON_STRICT_SIMPLE,
  PARAM_WAS_COMPLEX,
  PARAM_WAS_COMPLEX_HAD_INIT,
  PARAMS_ALL_SIMPLE,
  PARAMS_SOME_NONSTRICT,
  PARAMS_SOME_COMPLEX,
  IS_CONSTRUCTOR,
  NOT_CONSTRUCTOR,
  IS_METHOD,
  NOT_METHOD,
  ASSIGN_EXPR_IS_OK,
  ASSIGN_EXPR_IS_ERROR,
  NO_ID_TO_VERIFY,
  NO_DUPE_PARAMS,
  SCOPE_LAYER_GLOBAL,
  SCOPE_LAYER_FOR_HEADER,
  SCOPE_LAYER_BLOCK,
  SCOPE_LAYER_FUNC_PARAMS,
  SCOPE_LAYER_CATCH_HEAD,
  SCOPE_LAYER_CATCH_BODY,
  SCOPE_LAYER_FINALLY,
  SCOPE_LAYER_SWITCH,
  SCOPE_LAYER_FUNC_ROOT,
  SCOPE_LAYER_FUNC_BODY,
  SCOPE_LAYER_ARROW_PARAMS,
  SCOPE_LAYER_FAKE_BLOCK,
  DO_NOT_BIND,
  UNDEF_EXPORTS,
  FDS_ILLEGAL,
  FDS_IFELSE,
  FDS_LEX,
  FDS_VAR,
  IS_GLOBAL_TOPLEVEL,
  NOT_GLOBAL_TOPLEVEL,
  IS_LABELLED,
  NOT_LABELLED,
  NOT_LHSE,
  ONLY_LHSE,
  PARENT_NOT_LABEL,
  EMPTY_LABEL_SET,

  copyPiggies,
  P,
};
