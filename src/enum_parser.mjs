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
const IS_ASYNC_PREFIXED = dev() ? {IS_ASYNC_PREFIXED: 1} : true;
const NOT_ASYNC_PREFIXED = dev() ? {NOT_ASYNC_PREFIXED: 1} : false;
const UNDEF_STATIC = dev() ? {UNDEF_STATIC: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_ASYNC = dev() ? {UNDEF_ASYNC: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_STAR = dev() ? {UNDEF_STAR: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_GET = dev() ? {UNDEF_GET: 1, get str(){ASSERT(false)}} : undefined;
const UNDEF_SET = dev() ? {UNDEF_SET: 1, get str(){ASSERT(false)}} : undefined;
const IS_FUNC_DECL = dev() ? {IS_FUNC_DECL: 1} : true;
const NOT_FUNC_DECL = dev() ? {NOT_FUNC_DECL: 1} : false;
const IS_FUNC_EXPR = dev() ? {IS_FUNC_EXPR: 1} : true;
const NOT_FUNC_EXPR = dev() ? {NOT_FUNC_EXPR: 1} : false;
const IDENT_OPTIONAL = dev() ? {IDENT_OPTIONAL: 1} : true;
const IDENT_REQUIRED = dev() ? {IDENT_REQUIRED: 1} : false;
const PARSE_VALUE_MAYBE = dev() ? {PARSE_VALUE_MAYBE: 1} : true;
const PARSE_VALUE_MUST = dev() ? {PARSE_VALUE_MUST: 1} : false;
const YIELD_WITHOUT_VALUE = dev() ? {YIELD_WITHOUT_VALUE: 1} : 0;
const WITH_ASSIGNABLE = dev() ? {WITH_ASSIGNABLE: 1} : 1;
const WITH_NON_ASSIGNABLE = dev() ? {WITH_NON_ASSIGNABLE: 1} : 2;
const IS_ARROW = dev() ? {IS_ARROW: 1} : true;
const NOT_ARROW = dev() ? {NOT_ARROW: 1} : false;
const FROM_STATEMENT_START = dev() ? {FROM_STATEMENT_START: 1} : 1;
const FROM_FOR_HEADER = dev() ? {FROM_FOR_HEADER: 1} : 2;
const FROM_EXPORT_DECL = dev() ? {FROM_EXPORT_DECL: 1} : 3;
const FROM_CATCH = dev() ? {FROM_CATCH: 1} : 4;
const FROM_ASYNC_ARG = dev() ? {FROM_ASYNC_ARG: 1} : 5;
const FROM_OTHER_FUNC_ARG = dev() ? {FROM_OTHER_FUNC_ARG: 1} : 6;
const BINDING_TYPE_NONE = dev() ? {BINDING_TYPE_NONE: 1} : 0;
const BINDING_TYPE_ARG = dev() ? {BINDING_TYPE_ARG: 1} : 1;
const BINDING_TYPE_VAR = dev() ? {BINDING_TYPE_VAR: 1} : 2;
const BINDING_TYPE_LET = dev() ? {BINDING_TYPE_LET: 1} : 3;
const BINDING_TYPE_CONST = dev() ? {BINDING_TYPE_CONST: 1} : 4;
const BINDING_TYPE_CLASS = dev() ? {BINDING_TYPE_CLASS: 1} : 5;
const BINDING_TYPE_FUNC_VAR = dev() ? {BINDING_TYPE_FUNC_VAR: 1} : 7;
const BINDING_TYPE_FUNC_LEX = dev() ? {BINDING_TYPE_FUNC_LEX: 1} : 8;
const BINDING_TYPE_FUNC_STMT = dev() ? {BINDING_TYPE_FUNC_STMT: 1} : 9; // A func decl inside a block or switch (for webcompat mode)
const BINDING_TYPE_CATCH_IDENT = dev() ? {BINDING_TYPE_CATCH_IDENT: 1} : 10;
const BINDING_TYPE_CATCH_OTHER = dev() ? {BINDING_TYPE_CATCH_OTHER: 1} : 11;
const HAS_NO_BINDINGS = dev() ? {HAS_NO_BINDINGS: 1} : null;
const ASSIGNMENT_IS_INIT = dev() ? {ASSIGNMENT_IS_INIT: 1} : true; // var foo = bar;  (not to be parsed by parseBinding
const ASSIGNMENT_IS_DEFAULT = dev() ? {ASSIGNMENT_IS_DEFAULT: 1} : false; // (foo = bar) => foo  (parsed by parseBinding)
const IS_EXPRESSION = dev() ? {IS_EXPRESSION: 1} : 1;
const IS_STATEMENT = dev() ? {IS_STATEMENT: 1} : 2;
const IS_NEW_ARG = dev() ? {IS_NEW_ARG: 1} : 3;
const NOT_NEW_ARG = dev() ? {NOT_NEW_ARG: 1} : 4;
const MIGHT_DESTRUCT = 0; // any kind of destructuring or lack thereof is okay
const CANT_DESTRUCT = 1 << 0; // it is impossible to destructure this
const DESTRUCT_ASSIGN_ONLY = 1 << 1; // the only way this can destruct is by assignment
const MUST_DESTRUCT = 1 << 2; // something that is an error if it doesnt lead to destructurig like `({a=b})`
const ASSIGNABLE_UNDETERMINED = 1 << 3;
const NOT_ASSIGNABLE = 1 << 4;
const IS_ASSIGNABLE = 1 << 5;
const IS_SINGLE_IDENT_WRAP_A = 1 << 6;   // "assignable"
const IS_SINGLE_IDENT_WRAP_NA = 1 << 7;  // "not assignable"
const NOT_SINGLE_IDENT_WRAP_A = 1 << 8;  // "assignable"
const NOT_SINGLE_IDENT_WRAP_NA = 1 << 9; // "not assignable"
const PIGGY_BACK_SAW_AWAIT_VARNAME = 1 << 10; // parsed an expression containing `await` as a regular var name
const PIGGY_BACK_SAW_AWAIT_KEYWORD = 1 << 11; // parsed an expression containing an AwaitExpression
const PIGGY_BACK_SAW_YIELD_VARNAME = 1 << 12; // parsed an expression containing `yield` as a regular var name
const PIGGY_BACK_SAW_YIELD_KEYWORD = 1 << 13  ; // parsed an expression containing a YieldExpression
const PIGGY_BACK_WAS_CONSTRUCTOR = 1 << 14; // signal having found a constructor (special case)
const PIGGY_BACK_WAS_PROTO = 1 << 15; // signal that a `__proto__: x` was parsed (do detect double occurrence)
const PIGGY_BACK_WAS_ARROW = 1 << 16; // signal that double proto was found on object; error in web compat outside of arrow headers
const NO_SPREAD = dev() ? {NO_SPREAD: 1} : 0;
const LAST_SPREAD = dev() ? {LAST_SPREAD: 1} : 1;
const MID_SPREAD = dev() ? {MID_SPREAD: 1} : 2;
const PARSE_INIT = dev() ? {PARSE_INIT: 1} : true;
const SKIP_INIT = dev() ? {SKIP_INIT: 1} : false;
const IS_EXPORT = dev() ? {IS_EXPORT: 1} : true;
const NOT_EXPORT = dev() ? {NOT_EXPORT: 1} : false;
const IS_QUASI_TAIL = dev() ? {IS_QUASI_TAIL: 1} : true;
const NOT_QUASI_TAIL = dev() ? {NOT_QUASI_TAIL: 1} : false;
const PARAM_UNDETERMINED = dev() ? {PARAM_UNDETERMINED: 1} : 0;
const PARAM_WAS_SIMPLE = dev() ? {PARAM_WAS_SIMPLE: 1} : 1;
const PARAM_WAS_NON_STRICT_SIMPLE = dev() ? {PARAM_WAS_NON_STRICT_SIMPLE: 1} : 2; // like a future reserved word, `(package) => {"use strict"}`
const PARAM_WAS_COMPLEX = dev() ? {PARAM_WAS_COMPLEX: 1} : 3;
const PARAM_WAS_COMPLEX_HAD_INIT = dev() ? {PARAM_WAS_COMPLEX_HAD_INIT: 1} : 4;
const PARAMS_ALL_SIMPLE = dev() ? {PARAMS_ALL_SIMPLE: 1} : 1;
const PARAMS_SOME_NONSTRICT = dev() ? {PARAMS_SOME_NONSTRICT: 1} : 2;
const PARAMS_SOME_COMPLEX = dev() ? {PARAMS_SOME_COMPLEX: 1} : 3;
const IS_CONSTRUCTOR = dev() ? {IS_CONSTRUCTOR: 1} : true;
const NOT_CONSTRUCTOR = dev() ? {NOT_CONSTRUCTOR: 1} : false;
const IS_METHOD = dev() ? {IS_METHOD: 1} : true;
const NOT_METHOD = dev() ? {NOT_METHOD: 1} : false;
const ASSIGN_EXPR_IS_OK = dev() ? {ASSIGN_EXPR_IS_OK: 1} : true; // fine to parse assignments, arrows, yield, ternary
const ASSIGN_EXPR_IS_ERROR = dev() ? {ASSIGN_EXPR_IS_ERROR: 1} : false; // throw on actual assignments, but also arrows, yield, await, ternary
const NO_ID_TO_VERIFY = dev() ? {NO_ID_TO_VERIFY: 1} : undefined;
const NO_DUPE_PARAMS = dev() ? {NO_DUPE_PARAMS: 1} : undefined;
const IS_DELETE_ARG = dev() ? {IS_DELETE_ARG: 1} : true;
const NOT_DELETE_ARG = dev() ? {NOT_DELETE_ARG: 1} : false;
const FROM_CONTINUE = dev() ? {FROM_CONTINUE: 1} : true;
const FROM_BREAK = dev() ? {FROM_BREAK: 1} : false;
const SCOPE_LAYER_GLOBAL = dev() ? {SCOPE_LAYER_GLOBAL: 1} : 0;
const SCOPE_LAYER_FOR_HEADER = dev() ? {SCOPE_LAYER_FOR_HEADER: 1} : 1;
const SCOPE_LAYER_BLOCK = dev() ? {SCOPE_LAYER_BLOCK: 1} : 2;
const SCOPE_LAYER_FUNC_PARAMS = dev() ? {SCOPE_LAYER_FUNC_PARAMS: 1} : 3;
const SCOPE_LAYER_TRY = dev() ? {SCOPE_LAYER_TRY: 1} : 4;
const SCOPE_LAYER_CATCH_HEAD = dev() ? {SCOPE_LAYER_CATCH_HEAD: 1} : 5;
const SCOPE_LAYER_CATCH_BODY = dev() ? {SCOPE_LAYER_CATCH_BODY: 1} : 6;
const SCOPE_LAYER_FINALLY = dev() ? {SCOPE_LAYER_FINALLY: 1} : 7;
const SCOPE_LAYER_SWITCH = dev() ? {SCOPE_LAYER_SWITCH: 1} : 8;
const SCOPE_LAYER_FUNC_ROOT = dev() ? {SCOPE_LAYER_FUNC_ROOT: 1} : 9;
const SCOPE_LAYER_FUNC_BODY = dev() ? {SCOPE_LAYER_FUNC_BODY: 1} : 10;
const SCOPE_LAYER_ARROW_PARAMS = dev() ? {SCOPE_LAYER_ARROW_PARAMS: 1} : 11;
const SCOPE_LAYER_FAKE_BLOCK = dev() ? {SCOPE_LAYER_FAKE_BLOCK: 1} : 12;
const DO_NOT_BIND = dev() ? {DO_NOT_BIND: 1} : null;
const UNDEF_EXPORTS = dev() ? {UNDEF_EXPORTS: 1} : undefined;
const FDS_ILLEGAL = dev() ? {FDS_ILLEGAL: 1} : 1; // function declaration not allowed, period
const FDS_IFELSE = dev() ? {FDS_IFELSE: 2} : 2;  // if-else specific webcompat exception would apply to a function declaration
const FDS_LEX = dev() ? {FDS_LEX: 3} : 3;      // a function declaration would be a lexical binding
const FDS_VAR = dev() ? {FDS_VAR: 4} : 4;      // a function declaration would be a var binding
const IS_GLOBAL_TOPLEVEL = dev() ? {IS_GLOBAL_TOPLEVEL: 1} : true;
const NOT_GLOBAL_TOPLEVEL = dev() ? {NOT_GLOBAL_TOPLEVEL: 1} : false;
const IS_LABELLED = dev() ? {IS_LABELLED: 1} : true;
const NOT_LABELLED = dev() ? {NOT_LABELLED: 1} : false;
const NOT_LHSE = dev() ? {NOT_LHSE: 1} : false; // not requiring a "LeftHandExpression". This is currently only used for class `extends`.
const ONLY_LHSE = dev() ? {ONLY_LHSE: 1} : true; // restrict value to conform to a "LeftHandExpression" production.
const PARENT_NOT_LABEL = null; // when the parent statement was not a label statement
const EMPTY_LABEL_SET = null;

// This `dev` function is only used to set objects for enum in a dev build. In a prod build these are stripped entirely
function dev() {
  let dev = false;
  // A build will eliminate this ASSERT call. A minifier will inline the `true` and then eliminate it. Hopefully.
  ASSERT(dev = true);
  return dev;
}

const PIGGIES = (0
  | PIGGY_BACK_SAW_AWAIT_VARNAME
  | PIGGY_BACK_SAW_AWAIT_KEYWORD
  | PIGGY_BACK_SAW_YIELD_VARNAME
  | PIGGY_BACK_SAW_YIELD_KEYWORD
  | PIGGY_BACK_WAS_CONSTRUCTOR
  | PIGGY_BACK_WAS_PROTO
  | PIGGY_BACK_WAS_ARROW
);
function copyPiggies(output, input) {
  return output | (input & PIGGIES);
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
  MIGHT_DESTRUCT,
  CANT_DESTRUCT,
  DESTRUCT_ASSIGN_ONLY,
  MUST_DESTRUCT,
  ASSIGNABLE_UNDETERMINED,
  NOT_ASSIGNABLE,
  IS_ASSIGNABLE,
  IS_SINGLE_IDENT_WRAP_A,
  IS_SINGLE_IDENT_WRAP_NA,
  NOT_SINGLE_IDENT_WRAP_A,
  NOT_SINGLE_IDENT_WRAP_NA,
  PIGGY_BACK_SAW_AWAIT_VARNAME,
  PIGGY_BACK_SAW_AWAIT_KEYWORD,
  PIGGY_BACK_SAW_YIELD_VARNAME,
  PIGGY_BACK_SAW_YIELD_KEYWORD,
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
  IS_DELETE_ARG,
  NOT_DELETE_ARG,
  FROM_CONTINUE,
  FROM_BREAK,
  SCOPE_LAYER_GLOBAL,
  SCOPE_LAYER_FOR_HEADER,
  SCOPE_LAYER_BLOCK,
  SCOPE_LAYER_FUNC_PARAMS,
  SCOPE_LAYER_TRY,
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
};
