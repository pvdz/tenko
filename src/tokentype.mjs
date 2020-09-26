// All constants in this file will be extrapolated and unconditionally inlined in a build without scope tracking
// (Make sure to only make primitives `const`, use `let` for anything else. Even if it's a constant value otherwise.)

import {
  ASSERT,
} from './utils.mjs';
import {
  $$F_66,
} from "./charcodes.mjs"

// First LEAF_BITS bits are not flags (!), they are "leaf" token types (decimal number, template tail).
// Other bits are flags, used to augment for super groups (string, number, template)
// (If the number of leafs exceeds LEAF_BITS bits then it'll reduce the number of available bitwise flags)

const LEAF_BITS = 8;
let __$flag_leaf = 0; // This name is hardcoded in the build script...
let __$flag_group = LEAF_BITS - 1; // offset 0, this name is hardcoded in the build script... keep value in sync

// Groups get their own bit. This makes it easier to quickly check for a set of token types (string, string | number)
// Additionally, modifiers get their own bit. Like bigint suffix or bad escapes. Generally these should apply to more
// than one token, otherwise it can just go below as their own leaf type.

const $G_WHITE = (1 << ++__$flag_group);
const $G_NEWLINE = (1 << ++__$flag_group);
const $G_COMMENT = (1 << ++__$flag_group);
const $G_IDENT = (1 << ++__$flag_group);
const $G_NUMBER = (1 << ++__$flag_group);
const $G_NUMBER_BIG_INT = (1 << ++__$flag_group); // modifies certain number types, they end with `n`; https://tc39.es/proposal-bigint/#sec-grammar-change
const $G_PUNCTUATOR = (1 << ++__$flag_group);
const $G_BINOP_ASSIGN = (1 << ++__$flag_group);
const $G_BINOP_NONASSIGN = (1 << ++__$flag_group);
const $G_STRING = (1 << ++__$flag_group);
const $G_REGEX = (1 << ++__$flag_group);
const $G_TICK = (1 << ++__$flag_group);
const $G_TICK_BAD_ESCAPE = (1 << ++__$flag_group);
const $G_OTHER = (1 << ++__$flag_group);
let ALL_GEES;
ASSERT(ALL_GEES = [$G_WHITE, $G_NEWLINE, $G_COMMENT, $G_IDENT, $G_NUMBER, $G_NUMBER_BIG_INT, $G_PUNCTUATOR, $G_BINOP_ASSIGN, $G_BINOP_NONASSIGN, $G_STRING, $G_REGEX, $G_TICK, $G_TICK_BAD_ESCAPE]);
ASSERT(__$flag_group < 32, 'cannot use more than 32 flags but have ' + __$flag_group);

// Token types that are mutually exclusive can be encoded as as a unique id within a few bits of sequential space
// You can still have group bits to complement these but it's far more space efficient this way
// I don't think you should ever need the $L constants outside of defining the concrete token type constants below...
// Note: leaf 0 is reserved for $IDENT
const $L_SPACE = ++__$flag_leaf;
const $L_TAB = ++__$flag_leaf;
const $L_NL_SINGLE = ++__$flag_leaf;
const $L_NL_CRLF = ++__$flag_leaf;
const $L_COMMENT_SINGLE = ++__$flag_leaf;
const $L_COMMENT_MULTI = ++__$flag_leaf;
const $L_COMMENT_HTML = ++__$flag_leaf;
const $L_IDENT = 0; // This is a hack which causes the leaf bits to be clear. This way (value | $IDENT) yields, at least, $IDENT without destroying an $ID_foo special keyword
const $L_NUMBER_HEX = ++__$flag_leaf;
const $L_NUMBER_DEC = ++__$flag_leaf;
const $L_NUMBER_BIN = ++__$flag_leaf;
const $L_NUMBER_OCT = ++__$flag_leaf;
const $L_NUMBER_OLD = ++__$flag_leaf;
const $L_REGEXN = ++__$flag_leaf;
const $L_REGEXU = ++__$flag_leaf;
const $L_STRING_SINGLE = ++__$flag_leaf;
const $L_STRING_DOUBLE = ++__$flag_leaf;
const $L_TICK_HEAD = ++__$flag_leaf;
const $L_TICK_BODY = ++__$flag_leaf;
const $L_TICK_TAIL = ++__$flag_leaf;
const $L_TICK_PURE = ++__$flag_leaf;
const $L_EOF = ++__$flag_leaf;
const $L_ASI = ++__$flag_leaf;
const $L_ERROR = ++__$flag_leaf;

// Important Idents

const $L_ID_arguments = ++__$flag_leaf;
const $L_ID_as = ++__$flag_leaf;
const $L_ID_async = ++__$flag_leaf;
const $L_ID_await = ++__$flag_leaf;
const $L_ID_break = ++__$flag_leaf;
const $L_ID_case = ++__$flag_leaf;
const $L_ID_catch = ++__$flag_leaf;
const $L_ID_class = ++__$flag_leaf;
const $L_ID_const = ++__$flag_leaf;
const $L_ID_continue = ++__$flag_leaf;
const $L_ID_debugger = ++__$flag_leaf;
const $L_ID_default = ++__$flag_leaf;
const $L_ID_delete = ++__$flag_leaf;
const $L_ID_do = ++__$flag_leaf;
const $L_ID_else = ++__$flag_leaf;
const $L_ID_enum = ++__$flag_leaf;
const $L_ID_eval = ++__$flag_leaf;
const $L_ID_export = ++__$flag_leaf;
const $L_ID_extends = ++__$flag_leaf;
const $L_ID_false = ++__$flag_leaf;
const $L_ID_finally = ++__$flag_leaf;
const $L_ID_for = ++__$flag_leaf;
const $L_ID_from = ++__$flag_leaf;
const $L_ID_function = ++__$flag_leaf;
const $L_ID_get = ++__$flag_leaf;
const $L_ID_if = ++__$flag_leaf;
const $L_ID_implements = ++__$flag_leaf;
const $L_ID_import = ++__$flag_leaf;
const $L_ID_in = ++__$flag_leaf;
const $L_ID_instanceof = ++__$flag_leaf;
const $L_ID_interface = ++__$flag_leaf;
const $L_ID_let = ++__$flag_leaf;
const $L_ID_new = ++__$flag_leaf;
const $L_ID_null = ++__$flag_leaf;
const $L_ID_of = ++__$flag_leaf;
const $L_ID_package = ++__$flag_leaf;
const $L_ID_private = ++__$flag_leaf;
const $L_ID_protected = ++__$flag_leaf;
const $L_ID_public = ++__$flag_leaf;
const $L_ID_return = ++__$flag_leaf;
const $L_ID_set = ++__$flag_leaf;
const $L_ID_static = ++__$flag_leaf;
const $L_ID_super = ++__$flag_leaf;
const $L_ID_switch = ++__$flag_leaf;
const $L_ID_target = ++__$flag_leaf;
const $L_ID_this = ++__$flag_leaf;
const $L_ID_throw = ++__$flag_leaf;
const $L_ID_true = ++__$flag_leaf;
const $L_ID_try = ++__$flag_leaf;
const $L_ID_typeof = ++__$flag_leaf;
const $L_ID_var = ++__$flag_leaf;
const $L_ID_void = ++__$flag_leaf;
const $L_ID_while = ++__$flag_leaf;
const $L_ID_with = ++__$flag_leaf;
const $L_ID_yield = ++__$flag_leaf;

// Punctuators

const $L_EXCL =  ++__$flag_leaf;
const $L_EXCL_EQ =  ++__$flag_leaf;
const $L_EXCL_EQ_EQ =  ++__$flag_leaf;
const $L_PERCENT =  ++__$flag_leaf;
const $L_PERCENT_EQ =  ++__$flag_leaf;
const $L_AND =  ++__$flag_leaf;
const $L_AND_AND =  ++__$flag_leaf;
const $L_AND_EQ =  ++__$flag_leaf;
const $L_PAREN_OPEN =  ++__$flag_leaf;
const $L_PAREN_CLOSE =  ++__$flag_leaf;
const $L_STAR =  ++__$flag_leaf;
const $L_STAR_STAR =  ++__$flag_leaf;
const $L_STAR_EQ =  ++__$flag_leaf;
const $L_STAR_STAR_EQ =  ++__$flag_leaf;
const $L_PLUS =  ++__$flag_leaf;
const $L_PLUS_PLUS =  ++__$flag_leaf;
const $L_PLUS_EQ =  ++__$flag_leaf;
const $L_COMMA =  ++__$flag_leaf;
const $L_MIN =  ++__$flag_leaf;
const $L_MIN_MIN =  ++__$flag_leaf;
const $L_MIN_EQ =  ++__$flag_leaf;
const $L_MIN_MIN_GT =  ++__$flag_leaf;
const $L_DOT =  ++__$flag_leaf;
const $L_DOT_DOT_DOT =  ++__$flag_leaf;
const $L_DIV =  ++__$flag_leaf;
const $L_DIV_EQ =  ++__$flag_leaf;
const $L_COLON =  ++__$flag_leaf;
const $L_SEMI =  ++__$flag_leaf;
const $L_LT =  ++__$flag_leaf;
const $L_LT_LT =  ++__$flag_leaf;
const $L_LT_EQ =  ++__$flag_leaf;
const $L_LT_LT_EQ =  ++__$flag_leaf;
const $L_LT_EXCL_MIN_MIN =  ++__$flag_leaf;
const $L_EQ =  ++__$flag_leaf;
const $L_EQ_EQ =  ++__$flag_leaf;
const $L_EQ_EQ_EQ =  ++__$flag_leaf;
const $L_EQ_GT =  ++__$flag_leaf;
const $L_GT =  ++__$flag_leaf;
const $L_GT_GT =  ++__$flag_leaf;
const $L_GT_GT_GT =  ++__$flag_leaf;
const $L_GT_EQ =  ++__$flag_leaf;
const $L_GT_GT_EQ =  ++__$flag_leaf;
const $L_GT_GT_GT_EQ =  ++__$flag_leaf;
const $L_QMARK =  ++__$flag_leaf;
const $L_QMARK_DOT =  ++__$flag_leaf;
const $L_QMARK_QMARK =  ++__$flag_leaf;
const $L_BRACKET_OPEN =  ++__$flag_leaf;
const $L_BRACKET_CLOSE =  ++__$flag_leaf;
const $L_CARET =  ++__$flag_leaf;
const $L_CARET_EQ =  ++__$flag_leaf;
const $L_CURLY_OPEN =  ++__$flag_leaf;
const $L_OR =  ++__$flag_leaf;
const $L_OR_OR =  ++__$flag_leaf;
const $L_OR_EQ =  ++__$flag_leaf;
const $L_CURLY_CLOSE =  ++__$flag_leaf;
const $L_TILDE =  ++__$flag_leaf;

ASSERT(__$flag_leaf < (1<<LEAF_BITS), 'cannot use more than LEAF_BITS (' + LEAF_BITS + ') bits of space (' + (1<<LEAF_BITS) + ') but am requesting ' + __$flag_leaf);

// These are the token types and you should be able to do strict comparison against specific token types with
// `curtok` or `token.type`. Every constant maps to a single number which is a combination of a bitwise field and
// a range of numbers, all within a 32bit space (which is a hard limitation due to bitwise ops in JS being 32bit)
// TODO: A future expansion, space permitting, would mark certain tokens as a particular string, like `in` or `=>`.
// TODO: For this we can reserve more flags as continuous space. How much depends on how many groups we really need.
// TODO: These token value constants would need their own continuous space to still be able to treat them generically.
const $UNTYPED = 0;
const $SPACE = $L_SPACE | $G_WHITE;
const $TAB = $L_TAB | $G_WHITE;
const $NL_SOLO = $L_NL_SINGLE | $G_WHITE | $G_NEWLINE; // Any specced line terminator that is not the combination of crlf
const $NL_CRLF = $L_NL_CRLF | $G_WHITE | $G_NEWLINE;
const $COMMENT_SINGLE = $L_COMMENT_SINGLE | $G_COMMENT | $G_WHITE;
const $COMMENT_MULTI = $L_COMMENT_MULTI | $G_COMMENT | $G_WHITE;
const $COMMENT_HTML = $L_COMMENT_HTML | $G_COMMENT | $G_WHITE;
const $IDENT = $L_IDENT | $G_IDENT;
const $ID_arguments = $L_ID_arguments | $G_IDENT;
const $ID_as = $L_ID_as | $G_IDENT;
const $ID_async = $L_ID_async | $G_IDENT;
const $ID_await = $L_ID_await | $G_IDENT;
const $ID_break = $L_ID_break | $G_IDENT;
const $ID_case = $L_ID_case | $G_IDENT;
const $ID_catch = $L_ID_catch | $G_IDENT;
const $ID_class = $L_ID_class | $G_IDENT;
const $ID_const = $L_ID_const | $G_IDENT;
const $ID_continue = $L_ID_continue | $G_IDENT;
const $ID_debugger = $L_ID_debugger | $G_IDENT;
const $ID_default = $L_ID_default | $G_IDENT;
const $ID_delete = $L_ID_delete | $G_IDENT;
const $ID_do = $L_ID_do | $G_IDENT;
const $ID_else = $L_ID_else | $G_IDENT;
const $ID_enum = $L_ID_enum | $G_IDENT;
const $ID_eval = $L_ID_eval | $G_IDENT;
const $ID_export = $L_ID_export | $G_IDENT;
const $ID_extends = $L_ID_extends | $G_IDENT;
const $ID_false = $L_ID_false | $G_IDENT;
const $ID_finally = $L_ID_finally | $G_IDENT;
const $ID_for = $L_ID_for | $G_IDENT;
const $ID_from = $L_ID_from | $G_IDENT;
const $ID_function = $L_ID_function | $G_IDENT;
const $ID_get = $L_ID_get | $G_IDENT;
const $ID_if = $L_ID_if | $G_IDENT;
const $ID_implements = $L_ID_implements | $G_IDENT;
const $ID_import = $L_ID_import | $G_IDENT;
const $ID_in = $L_ID_in | $G_BINOP_NONASSIGN | $G_IDENT;
const $ID_instanceof = $L_ID_instanceof | $G_BINOP_NONASSIGN | $G_IDENT;
const $ID_interface = $L_ID_interface | $G_IDENT;
const $ID_let = $L_ID_let | $G_IDENT;
const $ID_new = $L_ID_new | $G_IDENT;
const $ID_null = $L_ID_null | $G_IDENT;
const $ID_of = $L_ID_of | $G_IDENT;
const $ID_package = $L_ID_package | $G_IDENT;
const $ID_private = $L_ID_private | $G_IDENT;
const $ID_protected = $L_ID_protected | $G_IDENT;
const $ID_public = $L_ID_public | $G_IDENT;
const $ID_return = $L_ID_return | $G_IDENT;
const $ID_set = $L_ID_set | $G_IDENT;
const $ID_static = $L_ID_static | $G_IDENT;
const $ID_super = $L_ID_super | $G_IDENT;
const $ID_switch = $L_ID_switch | $G_IDENT;
const $ID_target = $L_ID_target | $G_IDENT;
const $ID_this = $L_ID_this | $G_IDENT;
const $ID_throw = $L_ID_throw | $G_IDENT;
const $ID_true = $L_ID_true | $G_IDENT;
const $ID_try = $L_ID_try | $G_IDENT;
const $ID_typeof = $L_ID_typeof | $G_IDENT;
const $ID_var = $L_ID_var | $G_IDENT;
const $ID_void = $L_ID_void | $G_IDENT;
const $ID_while = $L_ID_while | $G_IDENT;
const $ID_with = $L_ID_with | $G_IDENT;
const $ID_yield = $L_ID_yield | $G_IDENT;
const $NUMBER_HEX = $L_NUMBER_HEX | $G_NUMBER;
const $NUMBER_DEC = $L_NUMBER_DEC | $G_NUMBER;
const $NUMBER_BIN = $L_NUMBER_BIN | $G_NUMBER;
const $NUMBER_OCT = $L_NUMBER_OCT | $G_NUMBER;
const $NUMBER_OLD = $L_NUMBER_OLD | $G_NUMBER;
const $NUMBER_BIG_HEX = $L_NUMBER_HEX | $G_NUMBER | $G_NUMBER_BIG_INT;
const $NUMBER_BIG_DEC = $L_NUMBER_DEC | $G_NUMBER | $G_NUMBER_BIG_INT;
const $NUMBER_BIG_BIN = $L_NUMBER_BIN | $G_NUMBER | $G_NUMBER_BIG_INT;
const $NUMBER_BIG_OCT = $L_NUMBER_OCT | $G_NUMBER | $G_NUMBER_BIG_INT;
const $PUNC_EXCL = $L_EXCL | $G_PUNCTUATOR;
const $PUNC_EXCL_EQ = $L_EXCL_EQ | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_EXCL_EQ_EQ = $L_EXCL_EQ_EQ | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_PERCENT = $L_PERCENT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_PERCENT_EQ = $L_PERCENT_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_AND = $L_AND | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_AND_AND = $L_AND_AND | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_AND_EQ = $L_AND_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_PAREN_OPEN = $L_PAREN_OPEN | $G_PUNCTUATOR;
const $PUNC_PAREN_CLOSE = $L_PAREN_CLOSE | $G_PUNCTUATOR;
const $PUNC_STAR = $L_STAR | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_STAR_STAR = $L_STAR_STAR | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_STAR_EQ = $L_STAR_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_STAR_STAR_EQ = $L_STAR_STAR_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_PLUS = $L_PLUS | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_PLUS_PLUS = $L_PLUS_PLUS | $G_PUNCTUATOR;
const $PUNC_PLUS_EQ = $L_PLUS_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_COMMA = $L_COMMA | $G_PUNCTUATOR;
const $PUNC_MIN = $L_MIN | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_MIN_MIN = $L_MIN_MIN | $G_PUNCTUATOR;
const $PUNC_MIN_EQ = $L_MIN_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_MIN_MIN_GT = $L_MIN_MIN_GT | $G_PUNCTUATOR;
const $PUNC_DOT = $L_DOT | $G_PUNCTUATOR;
const $PUNC_DOT_DOT_DOT = $L_DOT_DOT_DOT | $G_PUNCTUATOR;
const $PUNC_DIV = $L_DIV | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_DIV_EQ = $L_DIV_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_COLON = $L_COLON | $G_PUNCTUATOR;
const $PUNC_SEMI = $L_SEMI | $G_PUNCTUATOR;
const $PUNC_LT = $L_LT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_LT_LT = $L_LT_LT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_LT_EQ = $L_LT_EQ | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_LT_LT_EQ = $L_LT_LT_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_LT_EXCL_MIN_MIN = $L_LT_EXCL_MIN_MIN | $G_PUNCTUATOR;
const $PUNC_EQ = $L_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_EQ_EQ = $L_EQ_EQ | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_EQ_EQ_EQ = $L_EQ_EQ_EQ | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_EQ_GT = $L_EQ_GT | $G_PUNCTUATOR;
const $PUNC_GT = $L_GT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_GT_GT = $L_GT_GT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_GT_GT_GT = $L_GT_GT_GT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_GT_EQ = $L_GT_EQ | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_GT_GT_EQ = $L_GT_GT_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_GT_GT_GT_EQ = $L_GT_GT_GT_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_QMARK = $L_QMARK | $G_PUNCTUATOR;
const $PUNC_QMARK_DOT = $L_QMARK_DOT | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_QMARK_QMARK = $L_QMARK_QMARK | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_BRACKET_OPEN = $L_BRACKET_OPEN | $G_PUNCTUATOR;
const $PUNC_BRACKET_CLOSE = $L_BRACKET_CLOSE | $G_PUNCTUATOR;
const $PUNC_CARET = $L_CARET | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_CARET_EQ = $L_CARET_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_CURLY_OPEN = $L_CURLY_OPEN | $G_PUNCTUATOR;
const $PUNC_OR = $L_OR | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_OR_OR = $L_OR_OR | $G_BINOP_NONASSIGN | $G_PUNCTUATOR;
const $PUNC_OR_EQ = $L_OR_EQ | $G_BINOP_ASSIGN | $G_PUNCTUATOR;
const $PUNC_CURLY_CLOSE = $L_CURLY_CLOSE | $G_PUNCTUATOR;
const $PUNC_TILDE = $L_TILDE | $G_PUNCTUATOR;
const $REGEXN = $L_REGEXN | $G_REGEX; // No u-flag
const $REGEXU = $L_REGEXU | $G_REGEX; // With u-flag ("strict mode" for regular expressions)
const $STRING_SINGLE = $L_STRING_SINGLE | $G_STRING;
const $STRING_DOUBLE = $L_STRING_DOUBLE | $G_STRING;
const $TICK_HEAD = $L_TICK_HEAD | $G_TICK;
const $TICK_BODY = $L_TICK_BODY | $G_TICK;
const $TICK_TAIL = $L_TICK_TAIL | $G_TICK;
const $TICK_PURE = $L_TICK_PURE | $G_TICK;
const $TICK_BAD_HEAD = $L_TICK_HEAD | $G_TICK | $G_TICK_BAD_ESCAPE;
const $TICK_BAD_BODY = $L_TICK_BODY | $G_TICK | $G_TICK_BAD_ESCAPE;
const $TICK_BAD_TAIL = $L_TICK_TAIL | $G_TICK | $G_TICK_BAD_ESCAPE;
const $TICK_BAD_PURE = $L_TICK_PURE | $G_TICK | $G_TICK_BAD_ESCAPE;
const $EOF = $L_EOF | $G_OTHER;
const $ASI = $L_ASI | $G_OTHER;
const $ERROR = $L_ERROR | $G_OTHER;

let KEYWORD_TRIE_OBJLIT = {
  0: {
    17: { 6: { 20: { 12: { 4: { 13: { 19: { 18: { hit: $ID_arguments, canon: 'arguments' } } } } } } } },
    18: {
      24: { 13: { 2: { hit: $ID_async, canon: 'async' } } },
      hit: $ID_as, canon: 'as'
    },
    22: { 0: { 8: { 19: { hit: $ID_await, canon: 'await' } } } }
  },
  1: { 17: { 4: { 0: { 10: { hit: $ID_break, canon: 'break' } } } } },
  2: {
    0: {
      18: { 4: { hit: $ID_case, canon: 'case' } },
      19: { 2: { 7: { hit: $ID_catch, canon: 'catch' } } }
    },
    11: { 0: { 18: { 18: { hit: $ID_class, canon: 'class' } } } },
    14: {
      13: { 18: { 19: { hit: $ID_const, canon: 'const' } },
      19: { 8: { 13: { 20: { 4: { hit: $ID_continue, canon: 'continue' } } } } } }
    }
  },
  3: {
    4: {
      1: { 20: { 6: { 6: { 4: { 17: { hit: $ID_debugger, canon: 'debugger' } } } } } },
      5: { 0: { 20: { 11: { 19: { hit: $ID_default, canon: 'default' } } } } },
      11: { 4: { 19: { 4: { hit: $ID_delete, canon: 'delete' } } } }
    },
    14: { hit: $ID_do, canon: 'do' }
  },
  4: {
    11: { 18: { 4: { hit: $ID_else, canon: 'else' } } },
    13: { 20: { 12: { hit: $ID_enum, canon: 'enum' } } },
    21: { 0: { 11: { hit: $ID_eval, canon: 'eval' } } },
    23: {
      15: { 14: { 17: { 19: { hit: $ID_export, canon: 'export' } } } },
      19: { 4: { 13: { 3: { 18: { hit: $ID_extends, canon: 'extends' } } } } }
    }
  },
  5: {
    0: { 11: { 18: { 4: { hit: $ID_false, canon: 'false' } } } },
    8: { 13: { 0: { 11: { 11: { 24: { hit: $ID_finally, canon: 'finally' } } } } } },
    14: { 17: { hit: $ID_for, canon: 'for' } },
    17: { 14: { 12: { hit: $ID_from, canon: 'from' } } },
    20: { 13: { 2: { 19: { 8: { 14: { 13: { hit: $ID_function, canon: 'function' } } } } } } }
  },
  6: { 4: { 19: { hit: $ID_get, canon: 'get' } } },
  8: {
    5: { hit: $ID_if, canon: 'if' },
    12: { 15: { 11: {
      4: { 12: { 4: { 13: { 19: { 18: { hit: $ID_implements, canon: 'implements' } } } } } } },
      14: { 17: { 19: { hit: $ID_import, canon: 'import' } } } }
    },
    13: {
      18: { 19: { 0: { 13: { 2: { 4: { 14: { 5: { hit: $ID_instanceof, canon: 'instanceof' } } } } } } } },
      19: { 4: { 17: { 5: { 0: { 2: { 4: { hit: $ID_interface, canon: 'interface' } } } } } } },
      hit: $ID_in, canon: 'in'
    },
  },
  11: { 4: { 19: { hit: $ID_let, canon: 'let' } } },
  13: {
    4: { 22: { hit: $ID_new, canon: 'new' } },
    20: { 11: { 11: { hit: $ID_null, canon: 'null' } } }
  },
  14: { 5: { hit: $ID_of, canon: 'of' } },
  15: {
    0: { 2: { 10: { 0: { 6: { 4: { hit: $ID_package, canon: 'package' } } } } } },
    17: {
      8: { 21: { 0: { 19: { 4: { hit: $ID_private, canon: 'private' } } } } },
      14: { 19: { 4: { 2: { 19: { 4: { 3: { hit: $ID_protected, canon: 'protected' } } } } } } }
    },
    20: { 1: { 11: { 8: { 2: { hit: $ID_public, canon: 'public' } } } } }
  },
  17: { 4: { 19: { 20: { 17: { 13: { hit: $ID_return, canon: 'return' } } } } } },
  18: {
    4: { 19: { hit: $ID_set, canon: 'set' } },
    19: { 0: { 19: { 8: { 2: { hit: $ID_static, canon: 'static' } } } } },
    20: { 15: { 4: { 17: { hit: $ID_super, canon: 'super' } } } },
    22: { 8: { 19: { 2: { 7: { hit: $ID_switch, canon: 'switch' } } } } }
  },
  19: {
    0: { 17: { 6: { 4: { 19: { hit: $ID_target, canon: 'target' } } } } },
    7: {
      8: { 18: { hit: $ID_this, canon: 'this' } },
      17: { 14: { 22: { hit: $ID_throw, canon: 'throw' } } }
    },
    17: {
      20: { 4: { hit: $ID_true, canon: 'true' } },
      24: { hit: $ID_try, canon: 'try' }
    },
    24: { 15: { 4: { 14: { 5: { hit: $ID_typeof, canon: 'typeof' } } } } }
  },
  21: {
    0: { 17: { hit: $ID_var, canon: 'var' } },
    14: { 8: { 3: { hit: $ID_void, canon: 'void' } } }
  },
  22: {
    7: { 8: { 11: { 4: { hit: $ID_while, canon: 'while' } } } },
    8: { 19: { 7: { hit: $ID_with, canon: 'with' } } }
  },
  24: { 8: { 4: { 11: { 3: { hit: $ID_yield, canon: 'yield' } } } } }
};

// let KEYWORD_TRIE_OC = Object.create(null, {
//   0: {
//     value: Object.create(null, {
//       17: {
//         value: Object.create(null, {
//           6: {
//             value: Object.create(null, {
//               20: {
//                 value: Object.create(null, {
//                   12: {
//                     value: Object.create(null, {
//                       4: {
//                         value: Object.create(null, {
//                           13: {
//                             value: Object.create(null, {
//                               19: {
//                                 value: Object.create(null, {
//                                   18: {
//                                     value: Object.create(null, {
//                                       hit: {value: $ID_arguments},
//                                       canon: {value: 'arguments'}
//                                     })
//                                   }
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       18: {
//         value: Object.create(null, {
//           24: {
//             value: Object.create(null, {
//               13: {
//                 value: Object.create(null, {
//                   2: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_async},
//                       canon: {value: 'async'}
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           hit: {value: $ID_as},
//           canon: {value: 'as'}
//         }),
//       },
//       22: {
//         value: Object.create(null, {
//           0: {
//             value: Object.create(null, {
//               8: {
//                 value: Object.create(null, {
//                   19: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_await},
//                       canon: {value: 'await'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   1: {
//     value: Object.create(null, {
//       17: {
//         value: Object.create(null, {
//           4: {
//             value: Object.create(null, {
//               0: {
//                 value: Object.create(null, {
//                   10: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_break},
//                       canon: {value: 'break'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   2: {
//     value: Object.create(null, {
//       0: {
//         value: Object.create(null, {
//           18: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_case},
//                   canon: {value: 'case'}
//                 })
//               }
//             })
//           },
//           19: {
//             value: Object.create(null, {
//               2: {
//                 value: Object.create(null, {
//                   7: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_catch},
//                       canon: {value: 'catch'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       11: {
//         value: Object.create(null, {
//           0: {
//             value: Object.create(null, {
//               18: {
//                 value: Object.create(null, {
//                   18: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_class},
//                       canon: {value: 'class'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       14: {
//         value: Object.create(null, {
//           13: {
//             value: Object.create(null, {
//               18: {
//                 value: Object.create(null, {
//                   19: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_const},
//                       canon: {value: 'const'}
//                     })
//                   }
//                 })
//               },
//               19: {
//                 value: Object.create(null, {
//                   8: {
//                     value: Object.create(null, {
//                       13: {
//                         value: Object.create(null, {
//                           20: {
//                             value: Object.create(null, {
//                               4: {
//                                 value: Object.create(null, {
//                                   hit: {value: $ID_continue},
//                                   canon: {value: 'continue'}
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   3: {
//     value: Object.create(null, {
//       4: {
//         value: Object.create(null, {
//           1: {
//             value: Object.create(null, {
//               20: {
//                 value: Object.create(null, {
//                   6: {
//                     value: Object.create(null, {
//                       6: {
//                         value: Object.create(null, {
//                           4: {
//                             value: Object.create(null, {
//                               17: {
//                                 value: Object.create(null, {
//                                   hit: {value: $ID_debugger},
//                                   canon: {value: 'debugger'}
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           5: {
//             value: Object.create(null, {
//               0: {
//                 value: Object.create(null, {
//                   20: {
//                     value: Object.create(null, {
//                       11: {
//                         value: Object.create(null, {
//                           19: {
//                             value: Object.create(null, {
//                               hit: {value: $ID_default},
//                               canon: {value: 'default'}
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           11: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   19: {
//                     value: Object.create(null, {
//                       4: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_delete},
//                           canon: {value: 'delete'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       14: {value: Object.create(null, {hit: {value: $ID_do}, canon: {value: 'do'}})}
//     })
//   },
//   4: {
//     value: Object.create(null, {
//       11: {
//         value: Object.create(null, {
//           18: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_else},
//                   canon: {value: 'else'}
//                 })
//               }
//             })
//           }
//         })
//       },
//       13: {
//         value: Object.create(null, {
//           20: {
//             value: Object.create(null, {
//               12: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_enum},
//                   canon: {value: 'enum'}
//                 })
//               }
//             })
//           }
//         })
//       },
//       21: {
//         value: Object.create(null, {
//           0: {
//             value: Object.create(null, {
//               11: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_eval},
//                   canon: {value: 'eval'}
//                 })
//               }
//             })
//           }
//         })
//       },
//       23: {
//         value: Object.create(null, {
//           15: {
//             value: Object.create(null, {
//               14: {
//                 value: Object.create(null, {
//                   17: {
//                     value: Object.create(null, {
//                       19: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_export},
//                           canon: {value: 'export'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           19: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   13: {
//                     value: Object.create(null, {
//                       3: {
//                         value: Object.create(null, {
//                           18: {
//                             value: Object.create(null, {
//                               hit: {value: $ID_extends},
//                               canon: {value: 'extends'}
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   5: {
//     value: Object.create(null, {
//       0: {
//         value: Object.create(null, {
//           11: {
//             value: Object.create(null, {
//               18: {
//                 value: Object.create(null, {
//                   4: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_false},
//                       canon: {value: 'false'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       8: {
//         value: Object.create(null, {
//           13: {
//             value: Object.create(null, {
//               0: {
//                 value: Object.create(null, {
//                   11: {
//                     value: Object.create(null, {
//                       11: {
//                         value: Object.create(null, {
//                           24: {
//                             value: Object.create(null, {
//                               hit: {value: $ID_finally},
//                               canon: {value: 'finally'}
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       14: {
//         value: Object.create(null, {
//           17: {
//             value: Object.create(null, {
//               hit: {value: $ID_for},
//               canon: {value: 'for'}
//             })
//           }
//         })
//       },
//       17: {
//         value: Object.create(null, {
//           14: {
//             value: Object.create(null, {
//               12: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_from},
//                   canon: {value: 'from'}
//                 })
//               }
//             })
//           }
//         })
//       },
//       20: {
//         value: Object.create(null, {
//           13: {
//             value: Object.create(null, {
//               2: {
//                 value: Object.create(null, {
//                   19: {
//                     value: Object.create(null, {
//                       8: {
//                         value: Object.create(null, {
//                           14: {
//                             value: Object.create(null, {
//                               13: {
//                                 value: Object.create(null, {
//                                   hit: {value: $ID_function},
//                                   canon: {value: 'function'}
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   6: {
//     value: Object.create(null, {
//       4: {
//         value: Object.create(null, {
//           19: {
//             value: Object.create(null, {
//               hit: {value: $ID_get},
//               canon: {value: 'get'}
//             })
//           }
//         })
//       }
//     })
//   },
//   8: {
//     value: Object.create(null, {
//       5: {value: Object.create(null, {hit: {value: $ID_if}, canon: {value: 'if'}})},
//       12: {
//         value: Object.create(null, {
//           15: {
//             value: Object.create(null, {
//               11: {
//                 value: Object.create(null, {
//                   4: {
//                     value: Object.create(null, {
//                       12: {
//                         value: Object.create(null, {
//                           4: {
//                             value: Object.create(null, {
//                               13: {
//                                 value: Object.create(null, {
//                                   19: {
//                                     value: Object.create(null, {
//                                       18: {
//                                         value: Object.create(null, {
//                                           hit: {value: $ID_implements},
//                                           canon: {value: 'implements'}
//                                         })
//                                       }
//                                     })
//                                   }
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               },
//               14: {
//                 value: Object.create(null, {
//                   17: {
//                     value: Object.create(null, {
//                       19: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_import},
//                           canon: {value: 'import'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       13: {
//         value: Object.create(null, {
//           18: {
//             value: Object.create(null, {
//               19: {
//                 value: Object.create(null, {
//                   0: {
//                     value: Object.create(null, {
//                       13: {
//                         value: Object.create(null, {
//                           2: {
//                             value: Object.create(null, {
//                               4: {
//                                 value: Object.create(null, {
//                                   14: {
//                                     value: Object.create(null, {
//                                       5: {
//                                         value: Object.create(null, {
//                                           hit: {value: $ID_instanceof},
//                                           canon: {value: 'instanceof'}
//                                         })
//                                       }
//                                     })
//                                   }
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           19: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   17: {
//                     value: Object.create(null, {
//                       5: {
//                         value: Object.create(null, {
//                           0: {
//                             value: Object.create(null, {
//                               2: {
//                                 value: Object.create(null, {
//                                   4: {
//                                     value: Object.create(null, {
//                                       hit: {value: $ID_interface},
//                                       canon: {value: 'interface'}
//                                     })
//                                   }
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           hit: {value: $ID_in},
//           canon: {value: 'in'},
//         })
//       },
//     })
//   },
//   11: {
//     value: Object.create(null, {
//       4: {
//         value: Object.create(null, {
//           19: {
//             value: Object.create(null, {
//               hit: {value: $ID_let},
//               canon: {value: 'let'}
//             })
//           }
//         })
//       }
//     })
//   },
//   13: {
//     value: Object.create(null, {
//       4: {
//         value: Object.create(null, {
//           22: {
//             value: Object.create(null, {
//               hit: {value: $ID_new},
//               canon: {value: 'new'}
//             })
//           }
//         })
//       },
//       20: {
//         value: Object.create(null, {
//           11: {
//             value: Object.create(null, {
//               11: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_null},
//                   canon: {value: 'null'}
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   14: {value: Object.create(null, {5: {value: Object.create(null, {hit: {value: $ID_of}, canon: {value: 'of'}})}})},
//   15: {
//     value: Object.create(null, {
//       0: {
//         value: Object.create(null, {
//           2: {
//             value: Object.create(null, {
//               10: {
//                 value: Object.create(null, {
//                   0: {
//                     value: Object.create(null, {
//                       6: {
//                         value: Object.create(null, {
//                           4: {
//                             value: Object.create(null, {
//                               hit: {value: $ID_package},
//                               canon: {value: 'package'}
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       17: {
//         value: Object.create(null, {
//           8: {
//             value: Object.create(null, {
//               21: {
//                 value: Object.create(null, {
//                   0: {
//                     value: Object.create(null, {
//                       19: {
//                         value: Object.create(null, {
//                           4: {
//                             value: Object.create(null, {
//                               hit: {value: $ID_private},
//                               canon: {value: 'private'}
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           },
//           14: {
//             value: Object.create(null, {
//               19: {
//                 value: Object.create(null, {
//                   4: {
//                     value: Object.create(null, {
//                       2: {
//                         value: Object.create(null, {
//                           19: {
//                             value: Object.create(null, {
//                               4: {
//                                 value: Object.create(null, {
//                                   3: {
//                                     value: Object.create(null, {
//                                       hit: {value: $ID_protected},
//                                       canon: {value: 'protected'}
//                                     })
//                                   }
//                                 })
//                               }
//                             })
//                           }
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       20: {
//         value: Object.create(null, {
//           1: {
//             value: Object.create(null, {
//               11: {
//                 value: Object.create(null, {
//                   8: {
//                     value: Object.create(null, {
//                       2: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_public},
//                           canon: {value: 'public'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   17: {
//     value: Object.create(null, {
//       4: {
//         value: Object.create(null, {
//           19: {
//             value: Object.create(null, {
//               20: {
//                 value: Object.create(null, {
//                   17: {
//                     value: Object.create(null, {
//                       13: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_return},
//                           canon: {value: 'return'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   18: {
//     value: Object.create(null, {
//       4: {
//         value: Object.create(null, {
//           19: {
//             value: Object.create(null, {
//               hit: {value: $ID_set},
//               canon: {value: 'set'}
//             })
//           }
//         })
//       },
//       19: {
//         value: Object.create(null, {
//           0: {
//             value: Object.create(null, {
//               19: {
//                 value: Object.create(null, {
//                   8: {
//                     value: Object.create(null, {
//                       2: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_static},
//                           canon: {value: 'static'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       20: {
//         value: Object.create(null, {
//           15: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   17: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_super},
//                       canon: {value: 'super'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       22: {
//         value: Object.create(null, {
//           8: {
//             value: Object.create(null, {
//               19: {
//                 value: Object.create(null, {
//                   2: {
//                     value: Object.create(null, {
//                       7: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_switch},
//                           canon: {value: 'switch'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   19: {
//     value: Object.create(null, {
//       0: {
//         value: Object.create(null, {
//           17: {
//             value: Object.create(null, {
//               6: {
//                 value: Object.create(null, {
//                   4: {
//                     value: Object.create(null, {
//                       19: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_target},
//                           canon: {value: 'target'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       7: {
//         value: Object.create(null, {
//           8: {
//             value: Object.create(null, {
//               18: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_this},
//                   canon: {value: 'this'}
//                 })
//               }
//             })
//           },
//           17: {
//             value: Object.create(null, {
//               14: {
//                 value: Object.create(null, {
//                   22: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_throw},
//                       canon: {value: 'throw'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       17: {
//         value: Object.create(null, {
//           20: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_true},
//                   canon: {value: 'true'}
//                 })
//               }
//             })
//           },
//           24: {value: Object.create(null, {hit: {value: $ID_try}, canon: {value: 'try'}})}
//         })
//       },
//       24: {
//         value: Object.create(null, {
//           15: {
//             value: Object.create(null, {
//               4: {
//                 value: Object.create(null, {
//                   14: {
//                     value: Object.create(null, {
//                       5: {
//                         value: Object.create(null, {
//                           hit: {value: $ID_typeof},
//                           canon: {value: 'typeof'}
//                         })
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   21: {
//     value: Object.create(null, {
//       0: {
//         value: Object.create(null, {
//           17: {
//             value: Object.create(null, {
//               hit: {value: $ID_var},
//               canon: {value: 'var'}
//             })
//           }
//         })
//       },
//       14: {
//         value: Object.create(null, {
//           8: {
//             value: Object.create(null, {
//               3: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_void},
//                   canon: {value: 'void'}
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   22: {
//     value: Object.create(null, {
//       7: {
//         value: Object.create(null, {
//           8: {
//             value: Object.create(null, {
//               11: {
//                 value: Object.create(null, {
//                   4: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_while},
//                       canon: {value: 'while'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       },
//       8: {
//         value: Object.create(null, {
//           19: {
//             value: Object.create(null, {
//               7: {
//                 value: Object.create(null, {
//                   hit: {value: $ID_with},
//                   canon: {value: 'with'}
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   },
//   24: {
//     value: Object.create(null, {
//       8: {
//         value: Object.create(null, {
//           4: {
//             value: Object.create(null, {
//               11: {
//                 value: Object.create(null, {
//                   3: {
//                     value: Object.create(null, {
//                       hit: {value: $ID_yield},
//                       canon: {value: 'yield'}
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })
//       }
//     })
//   }
// });

// let KEYWORD_TRIE_MAP = new Map([
//   [0, new Map([
//     [17, new Map([[6, new Map([[20, new Map([[12, new Map([[4, new Map([[13, new Map([[19, new Map([[18, new Map([['hit', $ID_arguments], ['canon', 'arguments']])]])]])]])]])]])]])]])],
//     [18, new Map([
//       [24, new Map([[13, new Map([[2, new Map([['hit', $ID_async], ['canon', 'async']])]])]])],
//       ['hit', $ID_as], ['canon', 'as'],
//     ])],
//     [22, new Map([[0, new Map([[8, new Map([[19, new Map([['hit', $ID_await], ['canon', 'await']])]])]])]])],
//   ])],
//   [1, new Map([[17, new Map([[4, new Map([[0, new Map([[10, new Map([['hit', $ID_break], ['canon', 'break']])]])]])]])]])],
//   [2, new Map([
//     [0,  new Map([
//       [18,  new Map([[4, new Map([['hit', $ID_case], ['canon', 'case']])]])],
//       [19,  new Map([[2, new Map([[7, new Map([['hit', $ID_catch], ['canon', 'catch']])]])]])]
//     ])],
//     [11,  new Map([[0, new Map([[18, new Map([[18, new Map([['hit', $ID_class], ['canon', 'class']])]])]])]])],
//     [14,  new Map([[13,  new Map([
//       [18,  new Map([[19, new Map([['hit', $ID_const], ['canon', 'const']])]])],
//       [19,  new Map([[8, new Map([[13, new Map([[20, new Map([[4, new Map([['hit', $ID_continue], ['canon', 'continue']])]])]])]])]])]
//     ])]])]
//   ])],
//   [3,  new Map([
//     [4,  new Map([
//       [1,  new Map([[20, new Map([[6, new Map([[6, new Map([[4, new Map([[17, new Map([['hit', $ID_debugger], ['canon', 'debugger']])]])]])]])]])]])],
//       [5,  new Map([[0, new Map([[20, new Map([[11, new Map([[19, new Map([['hit', $ID_default], ['canon', 'default']])]])]])]])]])],
//       [11,  new Map([[4, new Map([[19, new Map([[4, new Map([['hit', $ID_delete], ['canon', 'delete']])]])]])]])]
//     ])],
//     [14,  new Map([['hit', $ID_do], ['canon', 'do']])]
//   ])],
//   [4,  new Map([
//     [11,  new Map([[18, new Map([[4, new Map([['hit', $ID_else], ['canon', 'else']])]])]])],
//     [13,  new Map([[20, new Map([[12, new Map([['hit', $ID_enum], ['canon', 'enum']])]])]])],
//     [21,  new Map([[0, new Map([[11, new Map([['hit', $ID_eval], ['canon', 'eval']])]])]])],
//     [23,  new Map([
//       [15,  new Map([[14, new Map([[17, new Map([[19, new Map([['hit', $ID_export], ['canon', 'export']])]])]])]])],
//       [19,  new Map([[4, new Map([[13, new Map([[3, new Map([[18, new Map([['hit', $ID_extends], ['canon', 'extends']])]])]])]])]])]
//     ])],
//   ])],
//   [5,  new Map([
//     [0,  new Map([[11, new Map([[18, new Map([[4, new Map([['hit', $ID_false], ['canon', 'false']])]])]])]])],
//     [8,  new Map([[13, new Map([[0, new Map([[11, new Map([[11, new Map([[24, new Map([['hit', $ID_finally], ['canon', 'finally']])]])]])]])]])]])],
//     [14,  new Map([[17, new Map([['hit', $ID_for], ['canon', 'for']])]])],
//     [17,  new Map([[14, new Map([[12, new Map([['hit', $ID_from], ['canon', 'from']])]])]])],
//     [20,  new Map([[13, new Map([[2, new Map([[19, new Map([[8, new Map([[14, new Map([[13, new Map([['hit', $ID_function], ['canon', 'function']])]])]])]])]])]])]])]
//   ])],
//   [6,  new Map([[4, new Map([[19, new Map([['hit', $ID_get], ['canon', 'get']])]])]])],
//   [8,  new Map([
//     [5,  new Map([['hit', $ID_if], ['canon', 'if']])],
//     [12,  new Map([[15,  new Map([
//       [11,  new Map([[4, new Map([[12, new Map([[4, new Map([[13, new Map([[19, new Map([[18, new Map([['hit', $ID_implements], ['canon', 'implements']])]])]])]])]])]])]])],
//       [14,  new Map([[17, new Map([[19, new Map([['hit', $ID_import], ['canon', 'import']])]])]])],
//     ])]])],
//     [13,  new Map([
//       [18,  new Map([[19, new Map([[0, new Map([[13, new Map([[2, new Map([[4, new Map([[14, new Map([[5, new Map([['hit', $ID_instanceof], ['canon', 'instanceof']])]])]])]])]])]])]])]])],
//       [19,  new Map([[4, new Map([[17, new Map([[5, new Map([[0, new Map([[2, new Map([[4, new Map([['hit', $ID_interface], ['canon', 'interface']])]])]])]])]])]])]])],
//       ['hit', $ID_in], ['canon', 'in'],
//     ])],
//   ])],
//   [11,  new Map([[4, new Map([[19, new Map([['hit', $ID_let], ['canon', 'let']])]])]])],
//   [13,  new Map([
//     [4,  new Map([[22, new Map([['hit', $ID_new], ['canon', 'new']])]])],
//     [20,  new Map([[11, new Map([[11, new Map([['hit', $ID_null], ['canon', 'null']])]])]])]
//   ])],
//   [14,  new Map([[5, new Map([['hit', $ID_of], ['canon', 'of']])]])],
//   [15,  new Map([
//     [0,  new Map([[2, new Map([[10, new Map([[0, new Map([[6, new Map([[4, new Map([['hit', $ID_package], ['canon', 'package']])]])]])]])]])]])],
//     [17,  new Map([
//       [8,  new Map([[21, new Map([[0, new Map([[19, new Map([[4, new Map([['hit', $ID_private], ['canon', 'private']])]])]])]])]])],
//       [14,  new Map([[19, new Map([[4, new Map([[2, new Map([[19, new Map([[4, new Map([[3, new Map([['hit', $ID_protected], ['canon', 'protected']])]])]])]])]])]])]])]
//     ])],
//     [20,  new Map([[1, new Map([[11, new Map([[8, new Map([[2, new Map([['hit', $ID_public], ['canon', 'public']])]])]])]])]])]
//   ])],
//   [17,  new Map([[4, new Map([[19, new Map([[20, new Map([[17, new Map([[13, new Map([['hit', $ID_return], ['canon', 'return']])]])]])]])]])]])],
//   [18,  new Map([
//     [4,  new Map([[19, new Map([['hit', $ID_set], ['canon', 'set']])]])],
//     [19,  new Map([[0, new Map([[19, new Map([[8, new Map([[2, new Map([['hit', $ID_static], ['canon', 'static']])]])]])]])]])],
//     [20,  new Map([[15, new Map([[4, new Map([[17, new Map([['hit', $ID_super], ['canon', 'super']])]])]])]])],
//     [22,  new Map([[8, new Map([[19, new Map([[2, new Map([[7, new Map([['hit', $ID_switch], ['canon', 'switch']])]])]])]])]])]
//   ])],
//   [19,  new Map([
//     [0,  new Map([[17, new Map([[6, new Map([[4, new Map([[19, new Map([['hit', $ID_target], ['canon', 'target']])]])]])]])]])],
//     [7,  new Map([
//       [8,  new Map([[18, new Map([['hit', $ID_this], ['canon', 'this']])]])],
//       [17,  new Map([[14, new Map([[22, new Map([['hit', $ID_throw], ['canon', 'throw']])]])]])]
//     ])],
//     [17,  new Map([
//       [20,  new Map([[4, new Map([['hit', $ID_true], ['canon', 'true']])]])],
//       [24,  new Map([['hit', $ID_try], ['canon', 'try']])]
//     ])],
//     [24,  new Map([[15, new Map([[4, new Map([[14, new Map([[5, new Map([['hit', $ID_typeof], ['canon', 'typeof']])]])]])]])]])]
//   ])],
//   [21,  new Map([
//     [0,  new Map([[17, new Map([['hit', $ID_var], ['canon', 'var']])]])],
//     [14,  new Map([[8, new Map([[3, new Map([['hit', $ID_void], ['canon', 'void']])]])]])]
//   ])],
//   [22,  new Map([
//     [7,  new Map([[8, new Map([[11, new Map([[4, new Map([['hit', $ID_while], ['canon', 'while']])]])]])]])],
//     [8,  new Map([[19, new Map([[7, new Map([['hit', $ID_with], ['canon', 'with']])]])]])]
//   ])],
//   [24,  new Map([[8, new Map([[4, new Map([[11, new Map([[3, new Map([['hit', $ID_yield], ['canon', 'yield']])]])]])]])]])]
// ]);

function isWhiteToken(type) {
  return (type & $G_WHITE) === $G_WHITE;
}
function isNewlineToken(type) {
  return (type & $G_NEWLINE) === $G_NEWLINE;
}
function isCommentToken(type) {
  return (type & $G_COMMENT) === $G_COMMENT;
}
function isIdentToken(type) {
  return (type & $G_IDENT) === $G_IDENT;
}
function isNumberToken(type) {
  return (type & $G_NUMBER) === $G_NUMBER;
}
function isBigintToken(type) {
  return (type & $G_NUMBER_BIG_INT) === $G_NUMBER_BIG_INT;
}
function isStringToken(type) {
  return (type & $G_STRING) === $G_STRING;
}
function isPunctuatorToken(type) {
  return (type & $G_PUNCTUATOR) === $G_PUNCTUATOR;
}
function isRegexToken(type) {
  return (type & $G_REGEX) === $G_REGEX;
}
function isTickToken(type) {
  return (type & $G_TICK) === $G_TICK;
}
function isBadTickToken(type) {
  return (type & $G_TICK_BAD_ESCAPE) === $G_TICK_BAD_ESCAPE;
}
function isNumberStringToken(type) {
  return (type & ($G_NUMBER | $G_STRING)) !== 0;
}
function isNumberStringRegex(type) {
  return (type & ($G_NUMBER | $G_STRING | $G_REGEX)) !== 0;
}

function toktypeToString(type) {
  ASSERT(ALL_TOKEN_TYPES.includes(typeof type === 'object' ? type.type : type), 'should be known type', 'type=', typeof type === 'object' ? type.type : type, 'ALL_TOKEN_TYPES=', ALL_TOKEN_TYPES);

  switch (typeof type === 'object' ? type.type : type) {
    case $UNTYPED: return 'UNTYPED';
    case $SPACE: return 'SPACE';
    case $TAB: return 'TAB';
    case $NL_SOLO: return 'NL_SOLO';
    case $NL_CRLF: return 'NL_CRLF';
    case $COMMENT_SINGLE: return 'COMMENT_SINGLE';
    case $COMMENT_MULTI: return 'COMMENT_MULTI';
    case $COMMENT_HTML: return 'COMMENT_HTML';
    case $IDENT: return 'IDENT';
    case $ID_arguments: return 'ID_arguments';
    case $ID_as: return 'ID_as';
    case $ID_async: return 'ID_async';
    case $ID_await: return 'ID_await';
    case $ID_break: return 'ID_break';
    case $ID_case: return 'ID_case';
    case $ID_catch: return 'ID_catch';
    case $ID_class: return 'ID_class';
    case $ID_const: return 'ID_const';
    case $ID_continue: return 'ID_continue';
    case $ID_debugger: return 'ID_debugger';
    case $ID_default: return 'ID_default';
    case $ID_delete: return 'ID_delete';
    case $ID_do: return 'ID_do';
    case $ID_else: return 'ID_else';
    case $ID_enum: return 'ID_enum';
    case $ID_eval: return 'ID_eval';
    case $ID_export: return 'ID_export';
    case $ID_extends: return 'ID_extends';
    case $ID_false: return 'ID_false';
    case $ID_finally: return 'ID_finally';
    case $ID_for: return 'ID_for';
    case $ID_from: return 'ID_from';
    case $ID_function: return 'ID_function';
    case $ID_get: return 'ID_get';
    case $ID_if: return 'ID_if';
    case $ID_implements: return 'ID_implements';
    case $ID_import: return 'ID_import';
    case $ID_in: return 'ID_in';
    case $ID_instanceof: return 'ID_instanceof';
    case $ID_interface: return 'ID_interface';
    case $ID_let: return 'ID_let';
    case $ID_new: return 'ID_new';
    case $ID_null: return 'ID_null';
    case $ID_of: return 'ID_of';
    case $ID_package: return 'ID_package';
    case $ID_private: return 'ID_private';
    case $ID_protected: return 'ID_protected';
    case $ID_public: return 'ID_public';
    case $ID_return: return 'ID_return';
    case $ID_set: return 'ID_set';
    case $ID_static: return 'ID_static';
    case $ID_super: return 'ID_super';
    case $ID_switch: return 'ID_switch';
    case $ID_target: return 'ID_target';
    case $ID_this: return 'ID_this';
    case $ID_throw: return 'ID_throw';
    case $ID_true: return 'ID_true';
    case $ID_try: return 'ID_try';
    case $ID_typeof: return 'ID_typeof';
    case $ID_var: return 'ID_var';
    case $ID_void: return 'ID_void';
    case $ID_while: return 'ID_while';
    case $ID_with: return 'ID_with';
    case $ID_yield: return 'ID_yield';
    case $NUMBER_HEX: return 'NUMBER_HEX';
    case $NUMBER_DEC: return 'NUMBER_DEC';
    case $NUMBER_BIN: return 'NUMBER_BIN';
    case $NUMBER_OCT: return 'NUMBER_OCT';
    case $NUMBER_OLD: return 'NUMBER_OLD';
    case $NUMBER_BIG_HEX: return 'NUMBER_BIG_HEX';
    case $NUMBER_BIG_DEC: return 'NUMBER_BIG_DEC';
    case $NUMBER_BIG_BIN: return 'NUMBER_BIG_BIN';
    case $NUMBER_BIG_OCT: return 'NUMBER_BIG_OCT';
    case $PUNC_EXCL: return 'PUNC_EXCL';
    case $PUNC_EXCL_EQ: return 'PUNC_EXCL_EQ';
    case $PUNC_EXCL_EQ_EQ: return 'PUNC_EXCL_EQ_EQ';
    case $PUNC_PERCENT: return 'PUNC_PERCENT';
    case $PUNC_PERCENT_EQ: return 'PUNC_PERCENT_EQ';
    case $PUNC_AND: return 'PUNC_AND';
    case $PUNC_AND_AND: return 'PUNC_AND_AND';
    case $PUNC_AND_EQ: return 'PUNC_AND_EQ';
    case $PUNC_PAREN_OPEN: return 'PUNC_PAREN_OPEN';
    case $PUNC_PAREN_CLOSE: return 'PUNC_PAREN_CLOSE';
    case $PUNC_STAR: return 'PUNC_STAR';
    case $PUNC_STAR_STAR: return 'PUNC_STAR_STAR';
    case $PUNC_STAR_EQ: return 'PUNC_STAR_EQ';
    case $PUNC_STAR_STAR_EQ: return 'PUNC_STAR_STAR_EQ';
    case $PUNC_PLUS: return 'PUNC_PLUS';
    case $PUNC_PLUS_PLUS: return 'PUNC_PLUS_PLUS';
    case $PUNC_PLUS_EQ: return 'PUNC_PLUS_EQ';
    case $PUNC_COMMA: return 'PUNC_COMMA';
    case $PUNC_MIN: return 'PUNC_MIN';
    case $PUNC_MIN_MIN: return 'PUNC_MIN_MIN';
    case $PUNC_MIN_EQ: return 'PUNC_MIN_EQ';
    case $PUNC_MIN_MIN_GT: return 'PUNC_MIN_MIN_GT';
    case $PUNC_DOT: return 'PUNC_DOT';
    case $PUNC_DOT_DOT_DOT: return 'PUNC_DOT_DOT_DOT';
    case $PUNC_DIV: return 'PUNC_DIV';
    case $PUNC_DIV_EQ: return 'PUNC_DIV_EQ';
    case $PUNC_COLON: return 'PUNC_COLON';
    case $PUNC_SEMI: return 'PUNC_SEMI';
    case $PUNC_LT: return 'PUNC_LT';
    case $PUNC_LT_LT: return 'PUNC_LT_LT';
    case $PUNC_LT_EQ: return 'PUNC_LT_EQ';
    case $PUNC_LT_LT_EQ: return 'PUNC_LT_LT_EQ';
    case $PUNC_LT_EXCL_MIN_MIN: return 'PUNC_LT_EXCL_MIN_MIN';
    case $PUNC_EQ: return 'PUNC_EQ';
    case $PUNC_EQ_EQ: return 'PUNC_EQ_EQ';
    case $PUNC_EQ_EQ_EQ: return 'PUNC_EQ_EQ_EQ';
    case $PUNC_EQ_GT: return 'PUNC_EQ_GT';
    case $PUNC_GT: return 'PUNC_GT';
    case $PUNC_GT_GT: return 'PUNC_GT_GT';
    case $PUNC_GT_GT_GT: return 'PUNC_GT_GT_GT';
    case $PUNC_GT_EQ: return 'PUNC_GT_EQ';
    case $PUNC_GT_GT_EQ: return 'PUNC_GT_GT_EQ';
    case $PUNC_GT_GT_GT_EQ: return 'PUNC_GT_GT_GT_EQ';
    case $PUNC_QMARK: return 'PUNC_QMARK';
    case $PUNC_QMARK_DOT: return 'QMARK_DOT';
    case $PUNC_QMARK_QMARK: return 'QMARK_QMARK';
    case $PUNC_BRACKET_OPEN: return 'PUNC_BRACKET_OPEN';
    case $PUNC_BRACKET_CLOSE: return 'PUNC_BRACKET_CLOSE';
    case $PUNC_CARET: return 'PUNC_CARET';
    case $PUNC_CARET_EQ: return 'PUNC_CARET_EQ';
    case $PUNC_CURLY_OPEN: return 'PUNC_CURLY_OPEN';
    case $PUNC_OR: return 'PUNC_OR';
    case $PUNC_OR_OR: return 'PUNC_OR_OR';
    case $PUNC_OR_EQ: return 'PUNC_OR_EQ';
    case $PUNC_CURLY_CLOSE: return 'PUNC_CURLY_CLOSE';
    case $PUNC_TILDE: return 'PUNC_TILDE';
    case $REGEXN: return 'REGEXN';
    case $REGEXU: return 'REGEXU';
    case $STRING_SINGLE: return 'STRING_SINGLE';
    case $STRING_DOUBLE: return 'STRING_DOUBLE';
    case $TICK_HEAD: return 'TICK_HEAD';
    case $TICK_BODY: return 'TICK_BODY';
    case $TICK_TAIL: return 'TICK_TAIL';
    case $TICK_PURE: return 'TICK_PURE';
    case $TICK_BAD_HEAD: return 'TICK_BAD_HEAD';
    case $TICK_BAD_BODY: return 'TICK_BAD_BODY';
    case $TICK_BAD_TAIL: return 'TICK_BAD_TAIL';
    case $TICK_BAD_PURE: return 'TICK_BAD_PURE';
    case $EOF: return 'EOF';
    case $ASI: return 'ASI';
    case $ERROR: return 'ERROR';
  }

  throw new Error('toktypeToString: UNKNOWN[' + JSON.stringify(type) + ']')
}

// <SCRUB ASSERTS TO COMMENT>
// At runtime, any value of token.type / curtype should be in this set
let ALL_TOKEN_GROUPS;
ASSERT(ALL_TOKEN_GROUPS = [
  $G_WHITE,
  $G_NEWLINE,
  $G_COMMENT,
  $G_IDENT,
  $G_NUMBER,
  $G_NUMBER_BIG_INT,
  $G_BINOP_ASSIGN,
  $G_BINOP_NONASSIGN,
  $G_PUNCTUATOR,
  $G_STRING,
  $G_REGEX,
  $G_TICK,
  $G_TICK_BAD_ESCAPE,
]);
let ALL_TOKEN_TYPES;
ASSERT(ALL_TOKEN_TYPES = [
  // $UNTYPED,
  $SPACE,
  $TAB,
  $NL_SOLO,
  $NL_CRLF,
  $COMMENT_SINGLE,
  $COMMENT_MULTI,
  $COMMENT_HTML,
  $IDENT,
  $ID_arguments,
  $ID_as,
  $ID_async,
  $ID_await,
  $ID_break,
  $ID_case,
  $ID_catch,
  $ID_class,
  $ID_const,
  $ID_continue,
  $ID_debugger,
  $ID_default,
  $ID_delete,
  $ID_do,
  $ID_else,
  $ID_enum,
  $ID_eval,
  $ID_export,
  $ID_extends,
  $ID_false,
  $ID_finally,
  $ID_for,
  $ID_from,
  $ID_function,
  $ID_get,
  $ID_if,
  $ID_implements,
  $ID_import,
  $ID_in,
  $ID_instanceof,
  $ID_interface,
  $ID_let,
  $ID_new,
  $ID_null,
  $ID_of,
  $ID_package,
  $ID_private,
  $ID_protected,
  $ID_public,
  $ID_return,
  $ID_set,
  $ID_static,
  $ID_super,
  $ID_switch,
  $ID_target,
  $ID_this,
  $ID_throw,
  $ID_true,
  $ID_try,
  $ID_typeof,
  $ID_var,
  $ID_void,
  $ID_while,
  $ID_with,
  $ID_yield,
  $NUMBER_HEX,
  $NUMBER_DEC,
  $NUMBER_BIN,
  $NUMBER_OCT,
  $NUMBER_OLD,
  $NUMBER_BIG_HEX,
  $NUMBER_BIG_DEC,
  $NUMBER_BIG_BIN,
  $NUMBER_BIG_OCT,
  $PUNC_EXCL,
  $PUNC_EXCL_EQ,
  $PUNC_EXCL_EQ_EQ,
  $PUNC_PERCENT,
  $PUNC_PERCENT_EQ,
  $PUNC_AND,
  $PUNC_AND_AND,
  $PUNC_AND_EQ,
  $PUNC_PAREN_OPEN,
  $PUNC_PAREN_CLOSE,
  $PUNC_STAR,
  $PUNC_STAR_STAR,
  $PUNC_STAR_EQ,
  $PUNC_STAR_STAR_EQ,
  $PUNC_PLUS,
  $PUNC_PLUS_PLUS,
  $PUNC_PLUS_EQ,
  $PUNC_COMMA,
  $PUNC_MIN,
  $PUNC_MIN_MIN,
  $PUNC_MIN_EQ,
  $PUNC_MIN_MIN_GT,
  $PUNC_DOT,
  $PUNC_DOT_DOT_DOT,
  $PUNC_DIV,
  $PUNC_DIV_EQ,
  $PUNC_COLON,
  $PUNC_SEMI,
  $PUNC_LT,
  $PUNC_LT_LT,
  $PUNC_LT_EQ,
  $PUNC_LT_LT_EQ,
  $PUNC_LT_EXCL_MIN_MIN,
  $PUNC_EQ,
  $PUNC_EQ_EQ,
  $PUNC_EQ_EQ_EQ,
  $PUNC_EQ_GT,
  $PUNC_GT,
  $PUNC_GT_GT,
  $PUNC_GT_GT_GT,
  $PUNC_GT_EQ,
  $PUNC_GT_GT_EQ,
  $PUNC_GT_GT_GT_EQ,
  $PUNC_QMARK,
  $PUNC_QMARK_DOT,
  $PUNC_QMARK_QMARK,
  $PUNC_BRACKET_OPEN,
  $PUNC_BRACKET_CLOSE,
  $PUNC_CARET,
  $PUNC_CARET_EQ,
  $PUNC_CURLY_OPEN,
  $PUNC_OR,
  $PUNC_OR_OR,
  $PUNC_OR_EQ,
  $PUNC_CURLY_CLOSE,
  $PUNC_TILDE,
  $REGEXN,
  $REGEXU,
  $STRING_SINGLE,
  $STRING_DOUBLE,
  $TICK_HEAD,
  $TICK_BODY,
  $TICK_TAIL,
  $TICK_PURE,
  $TICK_BAD_HEAD,
  $TICK_BAD_BODY,
  $TICK_BAD_TAIL,
  $TICK_BAD_PURE,
  $EOF,
  $ASI,
  $ERROR,
]);
// </SCRUB ASSERTS TO COMMENT>

let MAX_START_VALUE = 26; // For quick check difference START or token type
let __$flag_start = 0; // This name is hardcoded in the build script...
const START_SPACE = __$flag_start++;
const START_ID = __$flag_start++;
const START_KEY = __$flag_start++; // Any lower case (even the ones that can't start a keyword). Used to scan for keywords.
const START_NL_SOLO = __$flag_start++;
const START_CR = __$flag_start++;
const START_STRING = __$flag_start++;
const START_DECIMAL = __$flag_start++;
const START_DOT = __$flag_start++;
const START_CURLY_CLOSE = __$flag_start++;
const START_EQ = __$flag_start++;
const START_DIV = __$flag_start++;
const START_PLUS = __$flag_start++;
const START_MIN = __$flag_start++;
const START_ZERO = __$flag_start++;
const START_TEMPLATE = __$flag_start++;
const START_EXCL = __$flag_start++;
const START_PERCENT = __$flag_start++;
const START_AND = __$flag_start++;
const START_STAR = __$flag_start++;
const START_CARET = __$flag_start++;
const START_LT = __$flag_start++;
const START_GT = __$flag_start++;
const START_OR = __$flag_start++;
const START_BSLASH = __$flag_start++;
const START_QMARK = __$flag_start++;
const START_ERROR = __$flag_start++;
// <SCRUB ASSERTS TO COMMENT>
ASSERT(__$flag_start === MAX_START_VALUE, 'keep in sync (update if START symbols were added/removed)');
ASSERT(ALL_GEES.every(type => type > __$flag_start), 'the G start at bit 7 or whatever so should all be larger because this is how we distinct a single-char-token hit from a start-needs-refinement result');
ASSERT(ALL_TOKEN_TYPES.every(type => type > __$flag_start), 'all tokens must be higher than the start numbers because they are all combinations with at least one G. this is important so we can distinguish them when reading the token start');
// </SCRUB ASSERTS TO COMMENT>

const STRING_PART = 0;
const STRING_QUOTE = 1;
const STRING_BS = 2;
const STRING_UNICODE = 3;
const STRING_NL = 4;

const IDENT_PART = 0;
const IDENT_END = 1;
const IDENT_BS = 2;
const IDENT_UNICODE = 3;

const REGATOM_ESC_OK = 0; // Chars without special processing that are always allowed to be escaped
const REGATOM_ESC_u = 2;
const REGATOM_ESC_x = 3;
const REGATOM_ESC_NONU = 1; // Non-special characters are only allowed to be escaped without u-flag
const REGATOM_ESC_UNICODE = 4;
const REGATOM_ESC_c = 5;
const REGATOM_ESC_pP = 6;
const REGATOM_ESC_0 = 7;
const REGATOM_ESC_123456789 = 8;
const REGATOM_ESC_k = 9;
const REGATOM_ESC_NL = 10;
const REGATOM_ESC_WC = 11; // Letters which are not special to escape can only be escaped in webcompat mode

const REGCLS_ESC_NSC = 0;
const REGCLS_ESC_UNICODE = 1;
const REGCLS_ESC_u = 2;
const REGCLS_ESC_x = 3;
const REGCLS_ESC_c = 4;
const REGCLS_ESC_k = 5;
const REGCLS_ESC_b = 6;
const REGCLS_ESC_B = 7;
const REGCLS_ESC_f = 8;
const REGCLS_ESC_n = 9;
const REGCLS_ESC_r = 10;
const REGCLS_ESC_t = 11;
const REGCLS_ESC_v = 12;
const REGCLS_ESC_ERR = 13;
const REGCLS_ESC_pP = 14;
const REGCLS_ESC_0 = 15;
const REGCLS_ESC_1234567 = 16;
const REGCLS_ESC_89 = 17;
const REGCLS_ESC_SYNTAX = 18;
const REGCLS_ESC_DASH = 19;
const REGCLS_ESC_NL = 20;

const REGEX_ATOM_OTHER = 0;
const REGEX_ATOM_DOT = 1;
const REGEX_ATOM_QUANT = 2;
const REGEX_ATOM_PARENL = 3;
const REGEX_ATOM_PARENR = 4;
const REGEX_ATOM_SQUAREL = 5;
const REGEX_ATOM_SQUARER = 6;
const REGEX_ATOM_BSLASH = 7;
const REGEX_ATOM_FSLASH = 8;
const REGEX_ATOM_XOR = 9;
const REGEX_ATOM_DOLLAR = 10;
const REGEX_ATOM_UNICODE = 11;
const REGEX_ATOM_CURLYL = 12;
const REGEX_ATOM_CURLYR = 13;
const REGEX_ATOM_OR = 14;
const REGEX_ATOM_NL = 15;

const STRING_ESC_OK = 0;
const STRING_ESC_N = 1;
const STRING_ESC_SQ = 2;
const STRING_ESC_DQ = 3;
const STRING_ESC_U = 4;
const STRING_ESC_X = 5;
const STRING_ESC_UNICODE = 6;
const STRING_ESC_T = 7;
const STRING_ESC_R = 8;
const STRING_ESC_CR = 9;
const STRING_ESC_LF = 10;
const STRING_ESC_0 = 11;
const STRING_ESC_123456789 = 12;
const STRING_ESC_B = 13;
const STRING_ESC_F = 14;
const STRING_ESC_V = 15;

const HEX_OOB = 16;

// Inspired by https://twitter.com/Ghost1240145716/status/1186595972232564736 / https://gist.github.com/KFlash/c53a2f0adb25e88ab7cdc3d77d295635
let tokenStartJumpTable = [
  // val                     hex    end   desc
  START_ERROR,            // 0x00   yes   NUL
  START_ERROR,            // 0x01   yes   SOH
  START_ERROR,            // 0x02   yes   STX
  START_ERROR,            // 0x03   yes   ETX
  START_ERROR,            // 0x04   yes   EOT
  START_ERROR,            // 0x05   yes   ENQ
  START_ERROR,            // 0x06   yes   ACK
  START_ERROR,            // 0x07   yes   BEL
  START_ERROR,            // 0x08   yes   BS
  START_SPACE,            // 0x09   yes   HT
  START_NL_SOLO,          // 0x0A   yes   LF
  START_SPACE,            // 0x0B   yes   VT
  START_SPACE,            // 0x0C   yes   FF
  START_CR,               // 0x0D   no2   CR :: CR CRLF
  START_ERROR,            // 0x0E   yes   SO
  START_ERROR,            // 0x0F   yes   SI
  START_ERROR,            // 0x10   yes   DLE
  START_ERROR,            // 0x11   yes   DC1
  START_ERROR,            // 0x12   yes   DC2
  START_ERROR,            // 0x13   yes   DC3
  START_ERROR,            // 0x14   yes   DC4
  START_ERROR,            // 0x15   yes   NAK
  START_ERROR,            // 0x16   yes   SYN
  START_ERROR,            // 0x17   yes   ETB
  START_ERROR,            // 0x18   yes   CAN
  START_ERROR,            // 0x19   yes   EM
  START_ERROR,            // 0x1A   yes   SUB
  START_ERROR,            // 0x1B   yes   ESC
  START_ERROR,            // 0x1C   yes   FS
  START_ERROR,            // 0x1D   yes   GS
  START_ERROR,            // 0x1E   yes   RS
  START_ERROR,            // 0x1F   yes   US
  START_SPACE,            // 0x20   yes   space
  START_EXCL,             // 0x21   no3   ! :: ! != !==
  START_STRING,           // 0x22   no*   "
  START_ERROR,            // 0x23   yes   #
  START_ID,               // 0x24   no*   $
  START_PERCENT,          // 0x25   no2   % :: % %=
  START_AND,              // 0x26   no3   & :: & && &=
  START_STRING,           // 0x27   no*   '
  $PUNC_PAREN_OPEN,       // 0x28   yes   (
  $PUNC_PAREN_CLOSE,      // 0x29   yes   )
  START_STAR,             // 0x2A   no4   * :: * ** *= **=
  START_PLUS,             // 0x2B   no3   + :: + ++ +=
  $PUNC_COMMA,            // 0x2C   yes   ,
  START_MIN,              // 0x2D   no4   - :: - -- -= -->
  START_DOT,              // 0x2E   no3   . :: . ... number
  START_DIV,              // 0x2F   no*   / :: / regex
  START_ZERO,             // 0x30   no*   0
  START_DECIMAL,          // 0x31   no*   1
  START_DECIMAL,          // 0x32   no*   2
  START_DECIMAL,          // 0x33   no*   3
  START_DECIMAL,          // 0x34   no*   4
  START_DECIMAL,          // 0x35   no*   5
  START_DECIMAL,          // 0x36   no*   6
  START_DECIMAL,          // 0x37   no*   7
  START_DECIMAL,          // 0x38   no*   8
  START_DECIMAL,          // 0x39   no*   9
  $PUNC_COLON,            // 0x3A   yes   :
  $PUNC_SEMI,             // 0x3B   yes   ;
  START_LT,               // 0x3C   no4   < :: < << <= <<= <!--
  START_EQ,               // 0x3D   no4   = :: = == === =>
  START_GT,               // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  START_QMARK,            // 0x3F   yes   ?
  START_ERROR,            // 0x40   yes   @
  START_ID,               // 0x41   no*   A
  START_ID,               // 0x42   no*   B
  START_ID,               // 0x43   no*   C
  START_ID,               // 0x44   no*   D
  START_ID,               // 0x45   no*   E
  START_ID,               // 0x46   no*   F
  START_ID,               // 0x47   no*   G
  START_ID,               // 0x48   no*   H
  START_ID,               // 0x49   no*   I
  START_ID,               // 0x4A   no*   J
  START_ID,               // 0x4B   no*   K
  START_ID,               // 0x4C   no*   L
  START_ID,               // 0x4D   no*   M
  START_ID,               // 0x4E   no*   N
  START_ID,               // 0x4F   no*   O
  START_ID,               // 0x50   no*   P
  START_ID,               // 0x51   no*   Q
  START_ID,               // 0x52   no*   R
  START_ID,               // 0x53   no*   S
  START_ID,               // 0x54   no*   T
  START_ID,               // 0x55   no*   U
  START_ID,               // 0x56   no*   V
  START_ID,               // 0x57   no*   W
  START_ID,               // 0x58   no*   X
  START_ID,               // 0x59   no*   Y
  START_ID,               // 0x5A   no*   Z
  $PUNC_BRACKET_OPEN,     // 0x5B   yes   [
  START_BSLASH,           // 0x5C   no2   \ :: \uHHHH \u{H*}
  $PUNC_BRACKET_CLOSE,    // 0x5D   yes   ]
  START_CARET,            // 0x5E   no2   ^ :: ^ ^=
  START_ID,               // 0x5F   no*   _ (lodash)
  START_TEMPLATE,         // 0x60   no*   ` :: `...${ `...`
  START_KEY,               // 0x61   no*   a
  START_KEY,               // 0x62   no*   b
  START_KEY,               // 0x63   no*   c
  START_KEY,               // 0x64   no*   d
  START_KEY,               // 0x65   no*   e
  START_KEY,               // 0x66   no*   f
  START_KEY,               // 0x67   no*   g
  START_ID,               // 0x68   no*   h
  START_KEY,               // 0x69   no*   i
  START_ID,               // 0x6A   no*   j
  START_ID,               // 0x6B   no*   k
  START_KEY,               // 0x6C   no*   l
  START_ID,               // 0x6D   no*   m
  START_KEY,               // 0x6E   no*   n
  START_KEY,               // 0x6F   no*   o
  START_KEY,               // 0x70   no*   p
  START_ID,               // 0x71   no*   q
  START_KEY,               // 0x72   no*   r
  START_KEY,               // 0x73   no*   s
  START_KEY,               // 0x74   no*   t
  START_ID,               // 0x75   no*   u
  START_KEY,               // 0x76   no*   v
  START_KEY,               // 0x77   no*   w
  START_ID,               // 0x78   no*   x
  START_KEY,               // 0x79   no*   y
  START_ID,               // 0x7A   no*   z
  $PUNC_CURLY_OPEN,       // 0x7B   yes   {
  START_OR,               // 0x7C   no3   | :: | || |=
  START_CURLY_CLOSE,      // 0x7D   no3   } :: } }...` }...${
  $PUNC_TILDE,            // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
  // START_ERROR,            // 0x7F   yes   DEL
];
let stringScanTable = [
  // val                     hex    end   desc
  STRING_PART,            // 0x00   yes   NUL
  STRING_PART,            // 0x01   yes   SOH
  STRING_PART,            // 0x02   yes   STX
  STRING_PART,            // 0x03   yes   ETX
  STRING_PART,            // 0x04   yes   EOT
  STRING_PART,            // 0x05   yes   ENQ
  STRING_PART,            // 0x06   yes   ACK
  STRING_PART,            // 0x07   yes   BEL
  STRING_PART,            // 0x08   yes   BS
  STRING_PART,            // 0x09   yes   HT
  STRING_NL,              // 0x0A   yes   LF
  STRING_PART,            // 0x0B   yes   VT
  STRING_PART,            // 0x0C   yes   FF
  STRING_NL,              // 0x0D   no2   CR :: CR CRLF
  STRING_PART,            // 0x0E   yes   SO
  STRING_PART,            // 0x0F   yes   SI
  STRING_PART,            // 0x10   yes   DLE
  STRING_PART,            // 0x11   yes   DC1
  STRING_PART,            // 0x12   yes   DC2
  STRING_PART,            // 0x13   yes   DC3
  STRING_PART,            // 0x14   yes   DC4
  STRING_PART,            // 0x15   yes   NAK
  STRING_PART,            // 0x16   yes   SYN
  STRING_PART,            // 0x17   yes   ETB
  STRING_PART,            // 0x18   yes   CAN
  STRING_PART,            // 0x19   yes   EM
  STRING_PART,            // 0x1A   yes   SUB
  STRING_PART,            // 0x1B   yes   ESC
  STRING_PART,            // 0x1C   yes   FS
  STRING_PART,            // 0x1D   yes   GS
  STRING_PART,            // 0x1E   yes   RS
  STRING_PART,            // 0x1F   yes   US
  STRING_PART,            // 0x20   yes   space
  STRING_PART,            // 0x21   no3   ! :: ! != !==
  STRING_QUOTE,           // 0x22   no*   "
  STRING_PART,            // 0x23   yes   #
  STRING_PART,            // 0x24   no*   $
  STRING_PART,            // 0x25   no2   % :: % %=
  STRING_PART,            // 0x26   no3   & :: & && &=
  STRING_QUOTE,           // 0x27   no*   '
  STRING_PART,            // 0x28   yes   (
  STRING_PART,            // 0x29   yes   )
  STRING_PART,            // 0x2A   no4   * :: * ** *= **=
  STRING_PART,            // 0x2B   no3   + :: + ++ +=
  STRING_PART,            // 0x2C   yes   ,
  STRING_PART,            // 0x2D   no4   - :: - -- -= -->
  STRING_PART,            // 0x2E   no3   . :: . ... number
  STRING_PART,            // 0x2F   no*   / :: / regex
  STRING_PART,            // 0x30   no*   0
  STRING_PART,            // 0x31   no*   1
  STRING_PART,            // 0x32   no*   2
  STRING_PART,            // 0x33   no*   3
  STRING_PART,            // 0x34   no*   4
  STRING_PART,            // 0x35   no*   5
  STRING_PART,            // 0x36   no*   6
  STRING_PART,            // 0x37   no*   7
  STRING_PART,            // 0x38   no*   8
  STRING_PART,            // 0x39   no*   9
  STRING_PART,            // 0x3A   yes   :
  STRING_PART,            // 0x3B   yes   ;
  STRING_PART,            // 0x3C   no4   < :: < << <= <<= <!--
  STRING_PART,            // 0x3D   no4   = :: = == === =>
  STRING_PART,            // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  STRING_PART,            // 0x3F   yes   ?
  STRING_PART,            // 0x40   yes   @
  STRING_PART,            // 0x41   no*   A
  STRING_PART,            // 0x42   no*   B
  STRING_PART,            // 0x43   no*   C
  STRING_PART,            // 0x44   no*   D
  STRING_PART,            // 0x45   no*   E
  STRING_PART,            // 0x46   no*   F
  STRING_PART,            // 0x47   no*   G
  STRING_PART,            // 0x48   no*   H
  STRING_PART,            // 0x49   no*   I
  STRING_PART,            // 0x4A   no*   J
  STRING_PART,            // 0x4B   no*   K
  STRING_PART,            // 0x4C   no*   L
  STRING_PART,            // 0x4D   no*   M
  STRING_PART,            // 0x4E   no*   N
  STRING_PART,            // 0x4F   no*   O
  STRING_PART,            // 0x50   no*   P
  STRING_PART,            // 0x51   no*   Q
  STRING_PART,            // 0x52   no*   R
  STRING_PART,            // 0x53   no*   S
  STRING_PART,            // 0x54   no*   T
  STRING_PART,            // 0x55   no*   U
  STRING_PART,            // 0x56   no*   V
  STRING_PART,            // 0x57   no*   W
  STRING_PART,            // 0x58   no*   X
  STRING_PART,            // 0x59   no*   Y
  STRING_PART,            // 0x5A   no*   Z
  STRING_PART,            // 0x5B   yes   [
  STRING_BS,              // 0x5C   no2   \ :: \uHHHH \u{H*}
  STRING_PART,            // 0x5D   yes   ]
  STRING_PART,            // 0x5E   no2   ^ :: ^ ^=
  STRING_PART,            // 0x5F   no*   _ (lodash)
  STRING_PART,            // 0x60   no*   ` :: `...${ `...`
  STRING_PART,            // 0x61   no*   a
  STRING_PART,            // 0x62   no*   b
  STRING_PART,            // 0x63   no*   c
  STRING_PART,            // 0x64   no*   d
  STRING_PART,            // 0x65   no*   e
  STRING_PART,            // 0x66   no*   f
  STRING_PART,            // 0x67   no*   g
  STRING_PART,            // 0x68   no*   h
  STRING_PART,            // 0x69   no*   i
  STRING_PART,            // 0x6A   no*   j
  STRING_PART,            // 0x6B   no*   k
  STRING_PART,            // 0x6C   no*   l
  STRING_PART,            // 0x6D   no*   m
  STRING_PART,            // 0x6E   no*   n
  STRING_PART,            // 0x6F   no*   o
  STRING_PART,            // 0x70   no*   p
  STRING_PART,            // 0x71   no*   q
  STRING_PART,            // 0x72   no*   r
  STRING_PART,            // 0x73   no*   s
  STRING_PART,            // 0x74   no*   t
  STRING_PART,            // 0x75   no*   u
  STRING_PART,            // 0x76   no*   v
  STRING_PART,            // 0x77   no*   w
  STRING_PART,            // 0x78   no*   x
  STRING_PART,            // 0x79   no*   y
  STRING_PART,            // 0x7A   no*   z
  STRING_PART,            // 0x7B   yes   {
  STRING_PART,            // 0x7C   no3   | :: | || |=
  STRING_PART,            // 0x7D   no3   } :: } }...` }...${
  STRING_PART,            // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
  // START_ERROR,            // 0x7F   yes   DEL
];
let identScanTable = [
  // val                     hex    end   desc
  IDENT_END,              // 0x00   yes   NUL
  IDENT_END,              // 0x01   yes   SOH
  IDENT_END,              // 0x02   yes   STX
  IDENT_END,              // 0x03   yes   ETX
  IDENT_END,              // 0x04   yes   EOT
  IDENT_END,              // 0x05   yes   ENQ
  IDENT_END,              // 0x06   yes   ACK
  IDENT_END,              // 0x07   yes   BEL
  IDENT_END,              // 0x08   yes   BS
  IDENT_END,              // 0x09   yes   HT
  IDENT_END,              // 0x0A   yes   LF
  IDENT_END,              // 0x0B   yes   VT
  IDENT_END,              // 0x0C   yes   FF
  IDENT_END,              // 0x0D   no2   CR :: CR CRLF
  IDENT_END,              // 0x0E   yes   SO
  IDENT_END,              // 0x0F   yes   SI
  IDENT_END,              // 0x10   yes   DLE
  IDENT_END,              // 0x11   yes   DC1
  IDENT_END,              // 0x12   yes   DC2
  IDENT_END,              // 0x13   yes   DC3
  IDENT_END,              // 0x14   yes   DC4
  IDENT_END,              // 0x15   yes   NAK
  IDENT_END,              // 0x16   yes   SYN
  IDENT_END,              // 0x17   yes   ETB
  IDENT_END,              // 0x18   yes   CAN
  IDENT_END,              // 0x19   yes   EM
  IDENT_END,              // 0x1A   yes   SUB
  IDENT_END,              // 0x1B   yes   ESC
  IDENT_END,              // 0x1C   yes   FS
  IDENT_END,              // 0x1D   yes   GS
  IDENT_END,              // 0x1E   yes   RS
  IDENT_END,              // 0x1F   yes   US
  IDENT_END,              // 0x20   yes   space
  IDENT_END,              // 0x21   no3   ! :: ! != !==
  IDENT_END,              // 0x22   no*   "
  IDENT_END,              // 0x23   yes   #
  IDENT_PART,             // 0x24   no*   $
  IDENT_END,              // 0x25   no2   % :: % %=
  IDENT_END,              // 0x26   no3   & :: & && &=
  IDENT_END,              // 0x27   no*   '
  IDENT_END,              // 0x28   yes   (
  IDENT_END,              // 0x29   yes   )
  IDENT_END,              // 0x2A   no4   * :: * ** *= **=
  IDENT_END,              // 0x2B   no3   + :: + ++ +=
  IDENT_END,              // 0x2C   yes   ,
  IDENT_END,              // 0x2D   no4   - :: - -- -= -->
  IDENT_END,              // 0x2E   no3   . :: . ... number
  IDENT_END,              // 0x2F   no*   / :: / regex
  IDENT_PART,             // 0x30   no*   0
  IDENT_PART,             // 0x31   no*   1
  IDENT_PART,             // 0x32   no*   2
  IDENT_PART,             // 0x33   no*   3
  IDENT_PART,             // 0x34   no*   4
  IDENT_PART,             // 0x35   no*   5
  IDENT_PART,             // 0x36   no*   6
  IDENT_PART,             // 0x37   no*   7
  IDENT_PART,             // 0x38   no*   8
  IDENT_PART,             // 0x39   no*   9
  IDENT_END,              // 0x3A   yes   :
  IDENT_END,              // 0x3B   yes   ;
  IDENT_END,              // 0x3C   no4   < :: < << <= <<= <!--
  IDENT_END,              // 0x3D   no4   = :: = == === =>
  IDENT_END,              // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  IDENT_END,              // 0x3F   yes   ?
  IDENT_END,              // 0x40   yes   @
  IDENT_PART,             // 0x41   no*   A
  IDENT_PART,             // 0x42   no*   B
  IDENT_PART,             // 0x43   no*   C
  IDENT_PART,             // 0x44   no*   D
  IDENT_PART,             // 0x45   no*   E
  IDENT_PART,             // 0x46   no*   F
  IDENT_PART,             // 0x47   no*   G
  IDENT_PART,             // 0x48   no*   H
  IDENT_PART,             // 0x49   no*   I
  IDENT_PART,             // 0x4A   no*   J
  IDENT_PART,             // 0x4B   no*   K
  IDENT_PART,             // 0x4C   no*   L
  IDENT_PART,             // 0x4D   no*   M
  IDENT_PART,             // 0x4E   no*   N
  IDENT_PART,             // 0x4F   no*   O
  IDENT_PART,             // 0x50   no*   P
  IDENT_PART,             // 0x51   no*   Q
  IDENT_PART,             // 0x52   no*   R
  IDENT_PART,             // 0x53   no*   S
  IDENT_PART,             // 0x54   no*   T
  IDENT_PART,             // 0x55   no*   U
  IDENT_PART,             // 0x56   no*   V
  IDENT_PART,             // 0x57   no*   W
  IDENT_PART,             // 0x58   no*   X
  IDENT_PART,             // 0x59   no*   Y
  IDENT_PART,             // 0x5A   no*   Z
  IDENT_END,              // 0x5B   yes   [
  IDENT_BS,               // 0x5C   no2   \ :: \uHHHH \u{H*}
  IDENT_END,              // 0x5D   yes   ]
  IDENT_END,              // 0x5E   no2   ^ :: ^ ^=
  IDENT_PART,             // 0x5F   no*   _ (lodash)
  IDENT_END,              // 0x60   no*   ` :: `...${ `...`
  IDENT_PART,             // 0x61   no*   a
  IDENT_PART,             // 0x62   no*   b
  IDENT_PART,             // 0x63   no*   c
  IDENT_PART,             // 0x64   no*   d
  IDENT_PART,             // 0x65   no*   e
  IDENT_PART,             // 0x66   no*   f
  IDENT_PART,             // 0x67   no*   g
  IDENT_PART,             // 0x68   no*   h
  IDENT_PART,             // 0x69   no*   i
  IDENT_PART,             // 0x6A   no*   j
  IDENT_PART,             // 0x6B   no*   k
  IDENT_PART,             // 0x6C   no*   l
  IDENT_PART,             // 0x6D   no*   m
  IDENT_PART,             // 0x6E   no*   n
  IDENT_PART,             // 0x6F   no*   o
  IDENT_PART,             // 0x70   no*   p
  IDENT_PART,             // 0x71   no*   q
  IDENT_PART,             // 0x72   no*   r
  IDENT_PART,             // 0x73   no*   s
  IDENT_PART,             // 0x74   no*   t
  IDENT_PART,             // 0x75   no*   u
  IDENT_PART,             // 0x76   no*   v
  IDENT_PART,             // 0x77   no*   w
  IDENT_PART,             // 0x78   no*   x
  IDENT_PART,             // 0x79   no*   y
  IDENT_PART,             // 0x7A   no*   z
  IDENT_END,              // 0x7B   yes   {
  IDENT_END,              // 0x7C   no3   | :: | || |=
  IDENT_END,              // 0x7D   no3   } :: } }...` }...${
  IDENT_END,              // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
  // START_ERROR,            // 0x7F   yes   DEL
];
let regexAtomEscapeStartJumpTable = [
  // val                      hex    end   desc
  REGATOM_ESC_NONU,        // 0x00   yes   NUL
  REGATOM_ESC_NONU,        // 0x01   yes   SOH
  REGATOM_ESC_NONU,        // 0x02   yes   STX
  REGATOM_ESC_NONU,        // 0x03   yes   ETX
  REGATOM_ESC_NONU,        // 0x04   yes   EOT
  REGATOM_ESC_NONU,        // 0x05   yes   ENQ
  REGATOM_ESC_NONU,        // 0x06   yes   ACK
  REGATOM_ESC_NONU,        // 0x07   yes   BEL
  REGATOM_ESC_NONU,        // 0x08   yes   BS
  REGATOM_ESC_NONU,        // 0x09   yes   HT
  REGATOM_ESC_NL,          // 0x0A   yes   LF
  REGATOM_ESC_NONU,        // 0x0B   yes   VT
  REGATOM_ESC_NONU,        // 0x0C   yes   FF
  REGATOM_ESC_NL,          // 0x0D   no2   CR :: CR CRLF
  REGATOM_ESC_NONU,        // 0x0E   yes   SO
  REGATOM_ESC_NONU,        // 0x0F   yes   SI
  REGATOM_ESC_NONU,        // 0x10   yes   DLE
  REGATOM_ESC_NONU,        // 0x11   yes   DC1
  REGATOM_ESC_NONU,        // 0x12   yes   DC2
  REGATOM_ESC_NONU,        // 0x13   yes   DC3
  REGATOM_ESC_NONU,        // 0x14   yes   DC4
  REGATOM_ESC_NONU,        // 0x15   yes   NAK
  REGATOM_ESC_NONU,        // 0x16   yes   SYN
  REGATOM_ESC_NONU,        // 0x17   yes   ETB
  REGATOM_ESC_NONU,        // 0x18   yes   CAN
  REGATOM_ESC_NONU,        // 0x19   yes   EM
  REGATOM_ESC_NONU,        // 0x1A   yes   SUB
  REGATOM_ESC_NONU,        // 0x1B   yes   ESC
  REGATOM_ESC_NONU,        // 0x1C   yes   FS
  REGATOM_ESC_NONU,        // 0x1D   yes   GS
  REGATOM_ESC_NONU,        // 0x1E   yes   RS
  REGATOM_ESC_NONU,        // 0x1F   yes   US
  REGATOM_ESC_NONU,        // 0x20   yes   space
  REGATOM_ESC_NONU,        // 0x21   no3   ! :: ! != !==
  REGATOM_ESC_NONU,        // 0x22   no*   "
  REGATOM_ESC_NONU,        // 0x23   yes   #
  REGATOM_ESC_OK,          // 0x24   no*   $
  REGATOM_ESC_NONU,        // 0x25   no2   % :: % %=
  REGATOM_ESC_NONU,        // 0x26   no3   & :: & && &=
  REGATOM_ESC_NONU,        // 0x27   no*   '
  REGATOM_ESC_OK,          // 0x28   yes   (
  REGATOM_ESC_OK,          // 0x29   yes   )
  REGATOM_ESC_OK,          // 0x2A   no4   * :: * ** *= **=
  REGATOM_ESC_OK,          // 0x2B   no3   + :: + ++ +=
  REGATOM_ESC_NONU,        // 0x2C   yes   ,
  REGATOM_ESC_NONU,        // 0x2D   no4   - :: - -- -= -->
  REGATOM_ESC_OK,          // 0x2E   no3   . :: . ... number
  REGATOM_ESC_OK,          // 0x2F   no*   / Note: the fwd slash is explicitly allowed to escape as atom
  REGATOM_ESC_0,           // 0x30   no*   0
  REGATOM_ESC_123456789,   // 0x31   no*   1
  REGATOM_ESC_123456789,   // 0x32   no*   2
  REGATOM_ESC_123456789,   // 0x33   no*   3
  REGATOM_ESC_123456789,   // 0x34   no*   4
  REGATOM_ESC_123456789,   // 0x35   no*   5
  REGATOM_ESC_123456789,   // 0x36   no*   6
  REGATOM_ESC_123456789,   // 0x37   no*   7
  REGATOM_ESC_123456789,   // 0x38   no*   8
  REGATOM_ESC_123456789,   // 0x39   no*   9
  REGATOM_ESC_NONU,        // 0x3A   yes   :
  REGATOM_ESC_NONU,        // 0x3B   yes   ;
  REGATOM_ESC_NONU,        // 0x3C   no4   < :: < << <= <<= <!--
  REGATOM_ESC_NONU,        // 0x3D   no4   = :: = == === =>
  REGATOM_ESC_NONU,        // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  REGATOM_ESC_OK,          // 0x3F   yes   ?
  REGATOM_ESC_NONU,        // 0x40   yes   @
  REGATOM_ESC_WC,          // 0x41   no*   A
  REGATOM_ESC_WC,          // 0x42   no*   B
  REGATOM_ESC_WC,          // 0x43   no*   C
  REGATOM_ESC_OK,          // 0x44   no*   D
  REGATOM_ESC_WC,          // 0x45   no*   E
  REGATOM_ESC_WC,          // 0x46   no*   F
  REGATOM_ESC_WC,          // 0x47   no*   G
  REGATOM_ESC_WC,          // 0x48   no*   H
  REGATOM_ESC_WC,          // 0x49   no*   I
  REGATOM_ESC_WC,          // 0x4A   no*   J
  REGATOM_ESC_WC,          // 0x4B   no*   K
  REGATOM_ESC_WC,          // 0x4C   no*   L
  REGATOM_ESC_WC,          // 0x4D   no*   M
  REGATOM_ESC_WC,          // 0x4E   no*   N
  REGATOM_ESC_WC,          // 0x4F   no*   O
  REGATOM_ESC_pP,          // 0x50   no*   P
  REGATOM_ESC_WC,          // 0x51   no*   Q
  REGATOM_ESC_WC,          // 0x52   no*   R
  REGATOM_ESC_OK,          // 0x53   no*   S
  REGATOM_ESC_WC,          // 0x54   no*   T
  REGATOM_ESC_WC,          // 0x55   no*   U
  REGATOM_ESC_WC,          // 0x56   no*   V
  REGATOM_ESC_OK,          // 0x57   no*   W
  REGATOM_ESC_WC,          // 0x58   no*   X
  REGATOM_ESC_WC,          // 0x59   no*   Y
  REGATOM_ESC_WC,          // 0x5A   no*   Z
  REGATOM_ESC_OK,          // 0x5B   yes   [
  REGATOM_ESC_OK,          // 0x5C   no2   \ :: \uHHHH \u{H*}
  REGATOM_ESC_OK,          // 0x5D   yes   ]
  REGATOM_ESC_OK,          // 0x5E   no2   ^ :: ^ ^=
  REGATOM_ESC_WC,          // 0x5F   no*   _ (lodash) Note: this is an ID_CONTINUE https://codepoints.net/U+005F
  REGATOM_ESC_NONU,        // 0x60   no*   ` :: `...${ `...`
  REGATOM_ESC_WC,          // 0x61   no*   a
  REGATOM_ESC_WC,          // 0x62   no*   b
  REGATOM_ESC_c,           // 0x63   no*   c
  REGATOM_ESC_OK,          // 0x64   no*   d
  REGATOM_ESC_WC,          // 0x65   no*   e
  REGATOM_ESC_OK,          // 0x66   no*   f
  REGATOM_ESC_WC,          // 0x67   no*   g
  REGATOM_ESC_WC,          // 0x68   no*   h
  REGATOM_ESC_WC,          // 0x69   no*   i
  REGATOM_ESC_WC,          // 0x6A   no*   j
  REGATOM_ESC_k,           // 0x6B   no*   k
  REGATOM_ESC_WC,          // 0x6C   no*   l
  REGATOM_ESC_WC,          // 0x6D   no*   m
  REGATOM_ESC_OK,          // 0x6E   no*   n
  REGATOM_ESC_WC,          // 0x6F   no*   o
  REGATOM_ESC_pP,          // 0x70   no*   p
  REGATOM_ESC_WC,          // 0x71   no*   q
  REGATOM_ESC_OK,          // 0x72   no*   r
  REGATOM_ESC_OK,          // 0x73   no*   s
  REGATOM_ESC_OK,          // 0x74   no*   t
  REGATOM_ESC_u,           // 0x75   no*   u
  REGATOM_ESC_OK,          // 0x76   no*   v
  REGATOM_ESC_OK,          // 0x77   no*   w
  REGATOM_ESC_x,           // 0x78   no*   x
  REGATOM_ESC_WC,          // 0x79   no*   y
  REGATOM_ESC_WC,          // 0x7A   no*   z
  REGATOM_ESC_OK,          // 0x7B   yes   {
  REGATOM_ESC_OK,          // 0x7C   no3   | :: | || |=
  REGATOM_ESC_OK,          // 0x7D   no3   } :: } }...` }...${
  REGATOM_ESC_NONU,        // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
];
let regexClassEscapeStartJumpTable = [
  // val                     hex    end   desc
  REGCLS_ESC_NSC,              // 0x00   yes   NUL
  REGCLS_ESC_NSC,              // 0x01   yes   SOH
  REGCLS_ESC_NSC,              // 0x02   yes   STX
  REGCLS_ESC_NSC,              // 0x03   yes   ETX
  REGCLS_ESC_NSC,              // 0x04   yes   EOT
  REGCLS_ESC_NSC,              // 0x05   yes   ENQ
  REGCLS_ESC_NSC,              // 0x06   yes   ACK
  REGCLS_ESC_NSC,              // 0x07   yes   BEL
  REGCLS_ESC_NSC,              // 0x08   yes   BS
  REGCLS_ESC_NSC,              // 0x09   yes   HT
  REGCLS_ESC_NL,               // 0x0A   yes   LF
  REGCLS_ESC_NSC,              // 0x0B   yes   VT
  REGCLS_ESC_NSC,              // 0x0C   yes   FF
  REGCLS_ESC_NL,               // 0x0D   no2   CR :: CR CRLF
  REGCLS_ESC_NSC,              // 0x0E   yes   SO
  REGCLS_ESC_NSC,              // 0x0F   yes   SI
  REGCLS_ESC_NSC,              // 0x10   yes   DLE
  REGCLS_ESC_NSC,              // 0x11   yes   DC1
  REGCLS_ESC_NSC,              // 0x12   yes   DC2
  REGCLS_ESC_NSC,              // 0x13   yes   DC3
  REGCLS_ESC_NSC,              // 0x14   yes   DC4
  REGCLS_ESC_NSC,              // 0x15   yes   NAK
  REGCLS_ESC_NSC,              // 0x16   yes   SYN
  REGCLS_ESC_NSC,              // 0x17   yes   ETB
  REGCLS_ESC_NSC,              // 0x18   yes   CAN
  REGCLS_ESC_NSC,              // 0x19   yes   EM
  REGCLS_ESC_NSC,              // 0x1A   yes   SUB
  REGCLS_ESC_NSC,              // 0x1B   yes   ESC
  REGCLS_ESC_NSC,              // 0x1C   yes   FS
  REGCLS_ESC_NSC,              // 0x1D   yes   GS
  REGCLS_ESC_NSC,              // 0x1E   yes   RS
  REGCLS_ESC_NSC,              // 0x1F   yes   US
  REGCLS_ESC_NSC,              // 0x20   yes   space
  REGCLS_ESC_NSC,              // 0x21   no3   ! :: ! != !==
  REGCLS_ESC_NSC,              // 0x22   no*   "
  REGCLS_ESC_NSC,              // 0x23   yes   #
  REGCLS_ESC_SYNTAX,           // 0x24   no*   $
  REGCLS_ESC_NSC,              // 0x25   no2   % :: % %=
  REGCLS_ESC_NSC,              // 0x26   no3   & :: & && &=
  REGCLS_ESC_NSC,              // 0x27   no*   '
  REGCLS_ESC_SYNTAX,           // 0x28   yes   (
  REGCLS_ESC_SYNTAX,           // 0x29   yes   )
  REGCLS_ESC_SYNTAX,           // 0x2A   no4   * :: * ** *= **=
  REGCLS_ESC_SYNTAX,           // 0x2B   no3   + :: + ++ +=
  REGCLS_ESC_NSC,              // 0x2C   yes   ,
  REGCLS_ESC_DASH,             // 0x2D   no4   - :: - -- -= -->
  REGCLS_ESC_SYNTAX,           // 0x2E   no3   . :: . ... number
  REGCLS_ESC_SYNTAX,           // 0x2F   no*   / Note: the fwd slash is explicitly allowed to escape in a regex class
  REGCLS_ESC_0,                // 0x30   no*   0
  REGCLS_ESC_1234567,          // 0x31   no*   1
  REGCLS_ESC_1234567,          // 0x32   no*   2
  REGCLS_ESC_1234567,          // 0x33   no*   3
  REGCLS_ESC_1234567,          // 0x34   no*   4
  REGCLS_ESC_1234567,          // 0x35   no*   5
  REGCLS_ESC_1234567,          // 0x36   no*   6
  REGCLS_ESC_1234567,          // 0x37   no*   7
  REGCLS_ESC_89,               // 0x38   no*   8
  REGCLS_ESC_89,               // 0x39   no*   9
  REGCLS_ESC_NSC,              // 0x3A   yes   :
  REGCLS_ESC_NSC,              // 0x3B   yes   ;
  REGCLS_ESC_NSC,              // 0x3C   no4   < :: < << <= <<= <!--
  REGCLS_ESC_NSC,              // 0x3D   no4   = :: = == === =>
  REGCLS_ESC_NSC,              // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  REGCLS_ESC_SYNTAX,           // 0x3F   yes   ?
  REGCLS_ESC_NSC,              // 0x40   yes   @
  REGCLS_ESC_NSC,              // 0x41   no*   A
  REGCLS_ESC_B,                // 0x42   no*   B
  REGCLS_ESC_NSC,              // 0x43   no*   C
  REGCLS_ESC_ERR,              // 0x44   no*   D
  REGCLS_ESC_NSC,              // 0x45   no*   E
  REGCLS_ESC_NSC,              // 0x46   no*   F
  REGCLS_ESC_NSC,              // 0x47   no*   G
  REGCLS_ESC_NSC,              // 0x48   no*   H
  REGCLS_ESC_NSC,              // 0x49   no*   I
  REGCLS_ESC_NSC,              // 0x4A   no*   J
  REGCLS_ESC_NSC,              // 0x4B   no*   K
  REGCLS_ESC_NSC,              // 0x4C   no*   L
  REGCLS_ESC_NSC,              // 0x4D   no*   M
  REGCLS_ESC_NSC,              // 0x4E   no*   N
  REGCLS_ESC_NSC,              // 0x4F   no*   O
  REGCLS_ESC_pP,               // 0x50   no*   P
  REGCLS_ESC_NSC,              // 0x51   no*   Q
  REGCLS_ESC_NSC,              // 0x52   no*   R
  REGCLS_ESC_ERR,              // 0x53   no*   S
  REGCLS_ESC_NSC,              // 0x54   no*   T
  REGCLS_ESC_NSC,              // 0x55   no*   U
  REGCLS_ESC_NSC,              // 0x56   no*   V
  REGCLS_ESC_ERR,              // 0x57   no*   W
  REGCLS_ESC_NSC,              // 0x58   no*   X
  REGCLS_ESC_NSC,              // 0x59   no*   Y
  REGCLS_ESC_NSC,              // 0x5A   no*   Z
  REGCLS_ESC_SYNTAX,           // 0x5B   yes   [
  REGCLS_ESC_SYNTAX,           // 0x5C   no2   \ :: \uHHHH \u{H*}
  REGCLS_ESC_SYNTAX,           // 0x5D   yes   ]
  REGCLS_ESC_SYNTAX,           // 0x5E   no2   ^ :: ^ ^=
  REGCLS_ESC_NSC,              // 0x5F   no*   _ (lodash)
  REGCLS_ESC_NSC,              // 0x60   no*   ` :: `...${ `...`
  REGCLS_ESC_NSC,              // 0x61   no*   a
  REGCLS_ESC_b,                // 0x62   no*   b
  REGCLS_ESC_c,                // 0x63   no*   c
  REGCLS_ESC_ERR,              // 0x64   no*   d
  REGCLS_ESC_NSC,              // 0x65   no*   e
  REGCLS_ESC_f,                // 0x66   no*   f
  REGCLS_ESC_NSC,              // 0x67   no*   g
  REGCLS_ESC_NSC,              // 0x68   no*   h
  REGCLS_ESC_NSC,              // 0x69   no*   i
  REGCLS_ESC_NSC,              // 0x6A   no*   j
  REGCLS_ESC_k,                // 0x6B   no*   k
  REGCLS_ESC_NSC,              // 0x6C   no*   l
  REGCLS_ESC_NSC,              // 0x6D   no*   m
  REGCLS_ESC_n,                // 0x6E   no*   n
  REGCLS_ESC_NSC,              // 0x6F   no*   o
  REGCLS_ESC_pP,               // 0x70   no*   p
  REGCLS_ESC_NSC,              // 0x71   no*   q
  REGCLS_ESC_r,                // 0x72   no*   r
  REGCLS_ESC_ERR,              // 0x73   no*   s
  REGCLS_ESC_t,                // 0x74   no*   t
  REGCLS_ESC_u,                // 0x75   no*   u
  REGCLS_ESC_v,                // 0x76   no*   v
  REGCLS_ESC_ERR,              // 0x77   no*   w
  REGCLS_ESC_x,                // 0x78   no*   x
  REGCLS_ESC_NSC,              // 0x79   no*   y
  REGCLS_ESC_NSC,              // 0x7A   no*   z
  REGCLS_ESC_SYNTAX,           // 0x7B   yes   {
  REGCLS_ESC_SYNTAX,           // 0x7C   no3   | :: | || |=
  REGCLS_ESC_SYNTAX,           // 0x7D   no3   } :: } }...` }...${
  REGCLS_ESC_NSC,              // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
];
let hexValueJumpTable = [
  // val                     hex    end   desc
  HEX_OOB,                // 0x00   yes   NUL
  HEX_OOB,                // 0x01   yes   SOH
  HEX_OOB,                // 0x02   yes   STX
  HEX_OOB,                // 0x03   yes   ETX
  HEX_OOB,                // 0x04   yes   EOT
  HEX_OOB,                // 0x05   yes   ENQ
  HEX_OOB,                // 0x06   yes   ACK
  HEX_OOB,                // 0x07   yes   BEL
  HEX_OOB,                // 0x08   yes   BS
  HEX_OOB,                // 0x09   yes   HT
  HEX_OOB,                // 0x0A   yes   LF
  HEX_OOB,                // 0x0B   yes   VT
  HEX_OOB,                // 0x0C   yes   FF
  HEX_OOB,                // 0x0D   no2   CR :: CR CRLF
  HEX_OOB,                // 0x0E   yes   SO
  HEX_OOB,                // 0x0F   yes   SI
  HEX_OOB,                // 0x10   yes   DLE
  HEX_OOB,                // 0x11   yes   DC1
  HEX_OOB,                // 0x12   yes   DC2
  HEX_OOB,                // 0x13   yes   DC3
  HEX_OOB,                // 0x14   yes   DC4
  HEX_OOB,                // 0x15   yes   NAK
  HEX_OOB,                // 0x16   yes   SYN
  HEX_OOB,                // 0x17   yes   ETB
  HEX_OOB,                // 0x18   yes   CAN
  HEX_OOB,                // 0x19   yes   EM
  HEX_OOB,                // 0x1A   yes   SUB
  HEX_OOB,                // 0x1B   yes   ESC
  HEX_OOB,                // 0x1C   yes   FS
  HEX_OOB,                // 0x1D   yes   GS
  HEX_OOB,                // 0x1E   yes   RS
  HEX_OOB,                // 0x1F   yes   US
  HEX_OOB,                // 0x20   yes   space
  HEX_OOB,                // 0x21   no3   ! :: ! != !==
  HEX_OOB,                // 0x22   no*   "
  HEX_OOB,                // 0x23   yes   #
  HEX_OOB,                // 0x24   no*   $
  HEX_OOB,                // 0x25   no2   % :: % %=
  HEX_OOB,                // 0x26   no3   & :: & && &=
  HEX_OOB,                // 0x27   no*   '
  HEX_OOB,                // 0x28   yes   (
  HEX_OOB,                // 0x29   yes   )
  HEX_OOB,                // 0x2A   no4   * :: * ** *= **=
  HEX_OOB,                // 0x2B   no3   + :: + ++ +=
  HEX_OOB,                // 0x2C   yes   ,
  HEX_OOB,                // 0x2D   no4   - :: - -- -= -->
  HEX_OOB,                // 0x2E   no3   . :: . ... number
  HEX_OOB,                // 0x2F   no*   / Note: the fwd slash is explicitly allowed to escape in a regex class
  0,                      // 0x30   no*   0
  1,                      // 0x31   no*   1
  2,                      // 0x32   no*   2
  3,                      // 0x33   no*   3
  4,                      // 0x34   no*   4
  5,                      // 0x35   no*   5
  6,                      // 0x36   no*   6
  7,                      // 0x37   no*   7
  8,                      // 0x38   no*   8
  9,                      // 0x39   no*   9
  HEX_OOB,                // 0x3A   yes   :
  HEX_OOB,                // 0x3B   yes   ;
  HEX_OOB,                // 0x3C   no4   < :: < << <= <<= <!--
  HEX_OOB,                // 0x3D   no4   = :: = == === =>
  HEX_OOB,                // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  HEX_OOB,                // 0x3F   yes   ?
  HEX_OOB,                // 0x40   yes   @
  10,                     // 0x41   no*   A
  11,                     // 0x42   no*   B
  12,                     // 0x43   no*   C
  13,                     // 0x44   no*   D
  14,                     // 0x45   no*   E
  15,                     // 0x46   no*   F
  HEX_OOB,                // 0x47   no*   G
  HEX_OOB,                // 0x48   no*   H
  HEX_OOB,                // 0x49   no*   I
  HEX_OOB,                // 0x4A   no*   J
  HEX_OOB,                // 0x4B   no*   K
  HEX_OOB,                // 0x4C   no*   L
  HEX_OOB,                // 0x4D   no*   M
  HEX_OOB,                // 0x4E   no*   N
  HEX_OOB,                // 0x4F   no*   O
  HEX_OOB,                // 0x50   no*   P
  HEX_OOB,                // 0x51   no*   Q
  HEX_OOB,                // 0x52   no*   R
  HEX_OOB,                // 0x53   no*   S
  HEX_OOB,                // 0x54   no*   T
  HEX_OOB,                // 0x55   no*   U
  HEX_OOB,                // 0x56   no*   V
  HEX_OOB,                // 0x57   no*   W
  HEX_OOB,                // 0x58   no*   X
  HEX_OOB,                // 0x59   no*   Y
  HEX_OOB,                // 0x5A   no*   Z
  HEX_OOB,                // 0x5B   yes   [
  HEX_OOB,                // 0x5C   no2   \ :: \uHHHH \u{H*}
  HEX_OOB,                // 0x5D   yes   ]
  HEX_OOB,                // 0x5E   no2   ^ :: ^ ^=
  HEX_OOB,                // 0x5F   no*   _ (lodash)
  HEX_OOB,                // 0x60   no*   ` :: `...${ `...`
  10,                // 0x61   no*   a
  11,                // 0x62   no*   b
  12,                // 0x63   no*   c
  13,                // 0x64   no*   d
  14,                // 0x65   no*   e
  15,                // 0x66   no*   f
  // Duncare about th rest of the table; the code will shortcircuit that
  // HEX_OOB,                // 0x67   no*   g
  // HEX_OOB,                // 0x68   no*   h
  // HEX_OOB,                // 0x69   no*   i
  // HEX_OOB,                // 0x6A   no*   j
  // HEX_OOB,                // 0x6B   no*   k
  // HEX_OOB,                // 0x6C   no*   l
  // HEX_OOB,                // 0x6D   no*   m
  // HEX_OOB,                // 0x6E   no*   n
  // HEX_OOB,                // 0x6F   no*   o
  // HEX_OOB,                // 0x70   no*   p
  // HEX_OOB,                // 0x71   no*   q
  // HEX_OOB,                // 0x72   no*   r
  // HEX_OOB,                // 0x73   no*   s
  // HEX_OOB,                // 0x74   no*   t
  // HEX_OOB,                // 0x75   no*   u
  // HEX_OOB,                // 0x76   no*   v
  // HEX_OOB,                // 0x77   no*   w
  // HEX_OOB,                // 0x78   no*   x
  // HEX_OOB,                // 0x79   no*   y
  // HEX_OOB,                // 0x7A   no*   z
  // HEX_OOB,                // 0x7B   yes   {
  // HEX_OOB,                // 0x7C   no3   | :: | || |=
  // HEX_OOB,                // 0x7D   no3   } :: } }...` }...${
  // HEX_OOB,                // 0x7E   yes   ~
];
let regexAtomJumpTable = [
  // val                     hex    end   desc
  REGEX_ATOM_OTHER,       // 0x00   yes   NUL
  REGEX_ATOM_OTHER,       // 0x01   yes   SOH
  REGEX_ATOM_OTHER,       // 0x02   yes   STX
  REGEX_ATOM_OTHER,       // 0x03   yes   ETX
  REGEX_ATOM_OTHER,       // 0x04   yes   EOT
  REGEX_ATOM_OTHER,       // 0x05   yes   ENQ
  REGEX_ATOM_OTHER,       // 0x06   yes   ACK
  REGEX_ATOM_OTHER,       // 0x07   yes   BEL
  REGEX_ATOM_OTHER,       // 0x08   yes   BS
  REGEX_ATOM_OTHER,       // 0x09   yes   HT
  REGEX_ATOM_NL,       // 0x0A   yes   LF
  REGEX_ATOM_OTHER,       // 0x0B   yes   VT
  REGEX_ATOM_OTHER,       // 0x0C   yes   FF
  REGEX_ATOM_NL,       // 0x0D   no2   CR :: CR CRLF
  REGEX_ATOM_OTHER,       // 0x0E   yes   SO
  REGEX_ATOM_OTHER,       // 0x0F   yes   SI
  REGEX_ATOM_OTHER,       // 0x10   yes   DLE
  REGEX_ATOM_OTHER,       // 0x11   yes   DC1
  REGEX_ATOM_OTHER,       // 0x12   yes   DC2
  REGEX_ATOM_OTHER,       // 0x13   yes   DC3
  REGEX_ATOM_OTHER,       // 0x14   yes   DC4
  REGEX_ATOM_OTHER,       // 0x15   yes   NAK
  REGEX_ATOM_OTHER,       // 0x16   yes   SYN
  REGEX_ATOM_OTHER,       // 0x17   yes   ETB
  REGEX_ATOM_OTHER,       // 0x18   yes   CAN
  REGEX_ATOM_OTHER,       // 0x19   yes   EM
  REGEX_ATOM_OTHER,       // 0x1A   yes   SUB
  REGEX_ATOM_OTHER,       // 0x1B   yes   ESC
  REGEX_ATOM_OTHER,       // 0x1C   yes   FS
  REGEX_ATOM_OTHER,       // 0x1D   yes   GS
  REGEX_ATOM_OTHER,       // 0x1E   yes   RS
  REGEX_ATOM_OTHER,       // 0x1F   yes   US
  REGEX_ATOM_OTHER,       // 0x20   yes   space
  REGEX_ATOM_OTHER,       // 0x21   no3   ! :: ! != !==
  REGEX_ATOM_OTHER,       // 0x22   no*   "
  REGEX_ATOM_OTHER,       // 0x23   yes   #
  REGEX_ATOM_DOLLAR,       // 0x24   no*   $
  REGEX_ATOM_OTHER,       // 0x25   no2   % :: % %=
  REGEX_ATOM_OTHER,       // 0x26   no3   & :: & && &=
  REGEX_ATOM_OTHER,       // 0x27   no*   '
  REGEX_ATOM_PARENL,       // 0x28   yes   (
  REGEX_ATOM_PARENR,       // 0x29   yes   )
  REGEX_ATOM_QUANT,       // 0x2A   no4   * :: * ** *= **=
  REGEX_ATOM_QUANT,       // 0x2B   no3   + :: + ++ +=
  REGEX_ATOM_OTHER,       // 0x2C   yes   ,
  REGEX_ATOM_OTHER,       // 0x2D   no4   - :: - -- -= -->
  REGEX_ATOM_DOT,       // 0x2E   no3   . :: . ... number
  REGEX_ATOM_FSLASH,       // 0x2F   no*   / Note: the fwd slash is explicitly allowed to escape in a regex class
  REGEX_ATOM_OTHER,       // 0x30   no*   0
  REGEX_ATOM_OTHER,       // 0x31   no*   1
  REGEX_ATOM_OTHER,       // 0x32   no*   2
  REGEX_ATOM_OTHER,       // 0x33   no*   3
  REGEX_ATOM_OTHER,       // 0x34   no*   4
  REGEX_ATOM_OTHER,       // 0x35   no*   5
  REGEX_ATOM_OTHER,       // 0x36   no*   6
  REGEX_ATOM_OTHER,       // 0x37   no*   7
  REGEX_ATOM_OTHER,       // 0x38   no*   8
  REGEX_ATOM_OTHER,       // 0x39   no*   9
  REGEX_ATOM_OTHER,       // 0x3A   yes   :
  REGEX_ATOM_OTHER,       // 0x3B   yes   ;
  REGEX_ATOM_OTHER,       // 0x3C   no4   < :: < << <= <<= <!--
  REGEX_ATOM_OTHER,       // 0x3D   no4   = :: = == === =>
  REGEX_ATOM_OTHER,       // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  REGEX_ATOM_QUANT,       // 0x3F   yes   ?
  REGEX_ATOM_OTHER,       // 0x40   yes   @
  REGEX_ATOM_OTHER,       // 0x41   no*   A
  REGEX_ATOM_OTHER,       // 0x42   no*   B
  REGEX_ATOM_OTHER,       // 0x43   no*   C
  REGEX_ATOM_OTHER,       // 0x44   no*   D
  REGEX_ATOM_OTHER,       // 0x45   no*   E
  REGEX_ATOM_OTHER,       // 0x46   no*   F
  REGEX_ATOM_OTHER,       // 0x47   no*   G
  REGEX_ATOM_OTHER,       // 0x48   no*   H
  REGEX_ATOM_OTHER,       // 0x49   no*   I
  REGEX_ATOM_OTHER,       // 0x4A   no*   J
  REGEX_ATOM_OTHER,       // 0x4B   no*   K
  REGEX_ATOM_OTHER,       // 0x4C   no*   L
  REGEX_ATOM_OTHER,       // 0x4D   no*   M
  REGEX_ATOM_OTHER,       // 0x4E   no*   N
  REGEX_ATOM_OTHER,       // 0x4F   no*   O
  REGEX_ATOM_OTHER,       // 0x50   no*   P
  REGEX_ATOM_OTHER,       // 0x51   no*   Q
  REGEX_ATOM_OTHER,       // 0x52   no*   R
  REGEX_ATOM_OTHER,       // 0x53   no*   S
  REGEX_ATOM_OTHER,       // 0x54   no*   T
  REGEX_ATOM_OTHER,       // 0x55   no*   U
  REGEX_ATOM_OTHER,       // 0x56   no*   V
  REGEX_ATOM_OTHER,       // 0x57   no*   W
  REGEX_ATOM_OTHER,       // 0x58   no*   X
  REGEX_ATOM_OTHER,       // 0x59   no*   Y
  REGEX_ATOM_OTHER,       // 0x5A   no*   Z
  REGEX_ATOM_SQUAREL,       // 0x5B   yes   [
  REGEX_ATOM_BSLASH,       // 0x5C   no2   \ :: \uHHHH \u{H*}
  REGEX_ATOM_SQUARER,       // 0x5D   yes   ]
  REGEX_ATOM_XOR,       // 0x5E   no2   ^ :: ^ ^=
  REGEX_ATOM_OTHER,       // 0x5F   no*   _ (lodash)
  REGEX_ATOM_OTHER,       // 0x60   no*   ` :: `...${ `...`
  REGEX_ATOM_OTHER,       // 0x61   no*   a
  REGEX_ATOM_OTHER,       // 0x62   no*   b
  REGEX_ATOM_OTHER,       // 0x63   no*   c
  REGEX_ATOM_OTHER,       // 0x64   no*   d
  REGEX_ATOM_OTHER,       // 0x65   no*   e
  REGEX_ATOM_OTHER,       // 0x66   no*   f
  REGEX_ATOM_OTHER,       // 0x67   no*   g
  REGEX_ATOM_OTHER,       // 0x68   no*   h
  REGEX_ATOM_OTHER,       // 0x69   no*   i
  REGEX_ATOM_OTHER,       // 0x6A   no*   j
  REGEX_ATOM_OTHER,       // 0x6B   no*   k
  REGEX_ATOM_OTHER,       // 0x6C   no*   l
  REGEX_ATOM_OTHER,       // 0x6D   no*   m
  REGEX_ATOM_OTHER,       // 0x6E   no*   n
  REGEX_ATOM_OTHER,       // 0x6F   no*   o
  REGEX_ATOM_OTHER,       // 0x70   no*   p
  REGEX_ATOM_OTHER,       // 0x71   no*   q
  REGEX_ATOM_OTHER,       // 0x72   no*   r
  REGEX_ATOM_OTHER,       // 0x73   no*   s
  REGEX_ATOM_OTHER,       // 0x74   no*   t
  REGEX_ATOM_OTHER,       // 0x75   no*   u
  REGEX_ATOM_OTHER,       // 0x76   no*   v
  REGEX_ATOM_OTHER,       // 0x77   no*   w
  REGEX_ATOM_OTHER,       // 0x78   no*   x
  REGEX_ATOM_OTHER,       // 0x79   no*   y
  REGEX_ATOM_OTHER,       // 0x7A   no*   z
  REGEX_ATOM_CURLYL,       // 0x7B   yes   {
  REGEX_ATOM_OR,       // 0x7C   no3   | :: | || |=
  REGEX_ATOM_CURLYR,       // 0x7D   no3   } :: } }...` }...${
  REGEX_ATOM_OTHER,       // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
];
let stringEscapeStartJumpTable = [
  // val                      hex    end   desc
  STRING_ESC_OK,          // 0x00   yes   NUL
  STRING_ESC_OK,          // 0x01   yes   SOH
  STRING_ESC_OK,          // 0x02   yes   STX
  STRING_ESC_OK,          // 0x03   yes   ETX
  STRING_ESC_OK,          // 0x04   yes   EOT
  STRING_ESC_OK,          // 0x05   yes   ENQ
  STRING_ESC_OK,          // 0x06   yes   ACK
  STRING_ESC_OK,          // 0x07   yes   BEL
  STRING_ESC_OK,          // 0x08   yes   BS
  STRING_ESC_OK,          // 0x09   yes   HT
  STRING_ESC_LF,          // 0x0A   yes   LF
  STRING_ESC_OK,          // 0x0B   yes   VT
  STRING_ESC_OK,          // 0x0C   yes   FF
  STRING_ESC_CR,          // 0x0D   no2   CR :: CR CRLF
  STRING_ESC_OK,          // 0x0E   yes   SO
  STRING_ESC_OK,          // 0x0F   yes   SI
  STRING_ESC_OK,          // 0x10   yes   DLE
  STRING_ESC_OK,          // 0x11   yes   DC1
  STRING_ESC_OK,          // 0x12   yes   DC2
  STRING_ESC_OK,          // 0x13   yes   DC3
  STRING_ESC_OK,          // 0x14   yes   DC4
  STRING_ESC_OK,          // 0x15   yes   NAK
  STRING_ESC_OK,          // 0x16   yes   SYN
  STRING_ESC_OK,          // 0x17   yes   ETB
  STRING_ESC_OK,          // 0x18   yes   CAN
  STRING_ESC_OK,          // 0x19   yes   EM
  STRING_ESC_OK,          // 0x1A   yes   SUB
  STRING_ESC_OK,          // 0x1B   yes   ESC
  STRING_ESC_OK,          // 0x1C   yes   FS
  STRING_ESC_OK,          // 0x1D   yes   GS
  STRING_ESC_OK,          // 0x1E   yes   RS
  STRING_ESC_OK,          // 0x1F   yes   US
  STRING_ESC_OK,          // 0x20   yes   space
  STRING_ESC_OK,          // 0x21   no3   ! :: ! != !==
  STRING_ESC_DQ,          // 0x22   no*   "
  STRING_ESC_OK,          // 0x23   yes   #
  STRING_ESC_OK,          // 0x24   no*   $
  STRING_ESC_OK,          // 0x25   no2   % :: % %=
  STRING_ESC_OK,          // 0x26   no3   & :: & && &=
  STRING_ESC_SQ,          // 0x27   no*   '
  STRING_ESC_OK,          // 0x28   yes   (
  STRING_ESC_OK,          // 0x29   yes   )
  STRING_ESC_OK,          // 0x2A   no4   * :: * ** *= **=
  STRING_ESC_OK,          // 0x2B   no3   + :: + ++ +=
  STRING_ESC_OK,          // 0x2C   yes   ,
  STRING_ESC_OK,          // 0x2D   no4   - :: - -- -= -->
  STRING_ESC_OK,          // 0x2E   no3   . :: . ... number
  STRING_ESC_OK,          // 0x2F   no*   /
  STRING_ESC_0,           // 0x30   no*   0
  STRING_ESC_123456789,   // 0x31   no*   1
  STRING_ESC_123456789,   // 0x32   no*   2
  STRING_ESC_123456789,   // 0x33   no*   3
  STRING_ESC_123456789,   // 0x34   no*   4
  STRING_ESC_123456789,   // 0x35   no*   5
  STRING_ESC_123456789,   // 0x36   no*   6
  STRING_ESC_123456789,   // 0x37   no*   7
  STRING_ESC_123456789,   // 0x38   no*   8
  STRING_ESC_123456789,   // 0x39   no*   9
  STRING_ESC_OK,          // 0x3A   yes   :
  STRING_ESC_OK,          // 0x3B   yes   ;
  STRING_ESC_OK,          // 0x3C   no4   < :: < << <= <<= <!--
  STRING_ESC_OK,          // 0x3D   no4   = :: = == === =>
  STRING_ESC_OK,          // 0x3E   no7   > :: > >= >> >>= >>> >>>=
  STRING_ESC_OK,          // 0x3F   yes   ?
  STRING_ESC_OK,          // 0x40   yes   @
  STRING_ESC_OK,          // 0x41   no*   A
  STRING_ESC_OK,          // 0x42   no*   B
  STRING_ESC_OK,          // 0x43   no*   C
  STRING_ESC_OK,          // 0x44   no*   D
  STRING_ESC_OK,          // 0x45   no*   E
  STRING_ESC_OK,          // 0x46   no*   F
  STRING_ESC_OK,          // 0x47   no*   G
  STRING_ESC_OK,          // 0x48   no*   H
  STRING_ESC_OK,          // 0x49   no*   I
  STRING_ESC_OK,          // 0x4A   no*   J
  STRING_ESC_OK,          // 0x4B   no*   K
  STRING_ESC_OK,          // 0x4C   no*   L
  STRING_ESC_OK,          // 0x4D   no*   M
  STRING_ESC_OK,          // 0x4E   no*   N
  STRING_ESC_OK,          // 0x4F   no*   O
  STRING_ESC_OK,          // 0x50   no*   P
  STRING_ESC_OK,          // 0x51   no*   Q
  STRING_ESC_OK,          // 0x52   no*   R
  STRING_ESC_OK,          // 0x53   no*   S
  STRING_ESC_OK,          // 0x54   no*   T
  STRING_ESC_OK,          // 0x55   no*   U
  STRING_ESC_OK,          // 0x56   no*   V
  STRING_ESC_OK,          // 0x57   no*   W
  STRING_ESC_OK,          // 0x58   no*   X
  STRING_ESC_OK,          // 0x59   no*   Y
  STRING_ESC_OK,          // 0x5A   no*   Z
  STRING_ESC_OK,          // 0x5B   yes   [
  STRING_ESC_OK,          // 0x5C   no2   \ :: \uHHHH \u{H*}
  STRING_ESC_OK,          // 0x5D   yes   ]
  STRING_ESC_OK,          // 0x5E   no2   ^ :: ^ ^=
  STRING_ESC_OK,          // 0x5F   no*   _ (lodash) Note: this is an ID_CONTINUE https://codepoints.net/U+005F
  STRING_ESC_OK,          // 0x60   no*   ` :: `...${ `...`
  STRING_ESC_OK,          // 0x61   no*   a
  STRING_ESC_B,           // 0x62   no*   b
  STRING_ESC_OK,          // 0x63   no*   c
  STRING_ESC_OK,          // 0x64   no*   d
  STRING_ESC_OK,          // 0x65   no*   e
  STRING_ESC_F,           // 0x66   no*   f
  STRING_ESC_OK,          // 0x67   no*   g
  STRING_ESC_OK,          // 0x68   no*   h
  STRING_ESC_OK,          // 0x69   no*   i
  STRING_ESC_OK,          // 0x6A   no*   j
  STRING_ESC_OK,          // 0x6B   no*   k
  STRING_ESC_OK,          // 0x6C   no*   l
  STRING_ESC_OK,          // 0x6D   no*   m
  STRING_ESC_N,           // 0x6E   no*   n
  STRING_ESC_OK,          // 0x6F   no*   o
  STRING_ESC_OK,          // 0x70   no*   p
  STRING_ESC_OK,          // 0x71   no*   q
  STRING_ESC_R,           // 0x72   no*   r
  STRING_ESC_OK,          // 0x73   no*   s
  STRING_ESC_T,           // 0x74   no*   t
  STRING_ESC_U,           // 0x75   no*   u
  STRING_ESC_V,           // 0x76   no*   v
  STRING_ESC_OK,          // 0x77   no*   w
  STRING_ESC_X,           // 0x78   no*   x
  STRING_ESC_OK,          // 0x79   no*   y
  STRING_ESC_OK,          // 0x7A   no*   z
  STRING_ESC_OK,          // 0x7B   yes   {
  STRING_ESC_OK,          // 0x7C   no3   | :: | || |=
  STRING_ESC_OK,          // 0x7D   no3   } :: } }...` }...${
  STRING_ESC_OK,          // 0x7E   yes   ~
  // TODO: is it more efficient to fill the table with 0x7f to align it with a power of 2? It's unlikely to prevent a miss so that's not a reason but I recall po2 to be a reason
];

// <SCRUB ASSERTS TO COMMENT>
let ALL_START_TYPES;
ASSERT(ALL_START_TYPES = [START_SPACE, START_NL_SOLO, START_CR, START_EXCL, START_STRING, START_ZERO, START_DECIMAL, START_TEMPLATE, START_ID, START_KEY, START_PERCENT, START_AND, START_STAR, START_PLUS, START_MIN, START_DOT, START_DIV, START_CARET, START_LT, START_EQ, START_GT, START_BSLASH, START_OR, START_CURLY_CLOSE, START_QMARK, START_ERROR]);
// </SCRUB ASSERTS TO COMMENT>

function getTokenStart(c) {
  ASSERT(getTokenStart.length === arguments.length, 'arg count');
  ASSERT(typeof c === 'number' &&c >= 0, 'nothing generates negatives for chars');
  ASSERT(Number.isInteger(c), 'all numbers should be ints, and not NaN or Infinite (subsumed)');
  ASSERT(c <= 0x7e && c >= 0, 'should be checked before calling this', c);

  let s = tokenStartJumpTable[c];

  ASSERT(s <= __$flag_start ? ALL_START_TYPES.includes(s) : ALL_TOKEN_TYPES.includes(s), 'confirm the jump table is returning correct values');
  ASSERT(ALL_START_TYPES.includes(s) !== ALL_TOKEN_TYPES.includes(s), 'confirm the jump table returns either a start type or a token type (and that it cant be both nor neither)');

  return s;
}
function getStringPart(c) {
  ASSERT(getStringPart.length === arguments.length, 'arg count');
  ASSERT(typeof c === 'number' && c >= 0, 'nothing generates negatives for chars');
  ASSERT(Number.isInteger(c), 'all numbers should be ints, and not NaN or Infinite (subsumed)');

  if (c > 0x7e) return STRING_UNICODE;
  let s = stringScanTable[c];

  ASSERT(typeof s === 'number', 'should be an enum and not undefined (oob)', s);

  return s;
}
function getIdentPart(c) {
  ASSERT(getIdentPart.length === arguments.length, 'arg count');
  ASSERT(typeof c === 'number' && c >= 0, 'nothing generates negatives for chars');
  ASSERT(Number.isInteger(c), 'all numbers should be ints, and not NaN or Infinite (subsumed)');

  if (c > 0x7e) return IDENT_UNICODE;
  let s = identScanTable[c];

  ASSERT(typeof s === 'number', 'should be an enum and not undefined (oob)', s);

  return s;
}
function getHexValue(c) {
  ASSERT(getHexValue.length === arguments.length, 'arg count');
  ASSERT(typeof c === 'number' && c >= 0, 'c charcode');

  if (c > $$F_66) return HEX_OOB;
  let v = hexValueJumpTable[c];
  ASSERT(typeof v === 'number' && v >= 0 && v <= 16, 'hex value or HEX_OOB');
  return v;
}

function T(type) {
  ASSERT(typeof type === 'number', 'expecting valid type', type);
  ASSERT(type !== 0, 'token type is an enum that is not zero');

  return 'T<' + toktypeToString(type) + '>';
}

export {
  getIdentPart,
  getStringPart,
  getTokenStart,
  isWhiteToken,
  isNewlineToken,
  isCommentToken,
  isIdentToken,
  isNumberToken,
  isBigintToken,
  isStringToken,
  isPunctuatorToken,
  isRegexToken,
  isTickToken,
  isBadTickToken,
  isNumberStringToken,
  isNumberStringRegex,
  getHexValue,

  toktypeToString,
  T,

  KEYWORD_TRIE_OBJLIT,
  MAX_START_VALUE,

  $G_WHITE,
  $G_NEWLINE,
  $G_COMMENT,
  $G_IDENT,
  $G_NUMBER,
  $G_NUMBER_BIG_INT,
  $G_PUNCTUATOR,
  $G_BINOP_ASSIGN,
  $G_BINOP_NONASSIGN,
  $G_STRING,
  $G_REGEX,
  $G_TICK,
  $G_TICK_BAD_ESCAPE,
  $G_OTHER,

  $UNTYPED,
  $SPACE,
  $TAB,
  $NL_SOLO,
  $NL_CRLF,
  $COMMENT_SINGLE,
  $COMMENT_MULTI,
  $COMMENT_HTML,
  $IDENT,
  $ID_arguments,
  $ID_as,
  $ID_async,
  $ID_await,
  $ID_break,
  $ID_case,
  $ID_catch,
  $ID_class,
  $ID_const,
  $ID_continue,
  $ID_debugger,
  $ID_default,
  $ID_delete,
  $ID_do,
  $ID_else,
  $ID_enum,
  $ID_eval,
  $ID_export,
  $ID_extends,
  $ID_false,
  $ID_finally,
  $ID_for,
  $ID_from,
  $ID_function,
  $ID_get,
  $ID_if,
  $ID_implements,
  $ID_import,
  $ID_in,
  $ID_instanceof,
  $ID_interface,
  $ID_let,
  $ID_new,
  $ID_null,
  $ID_of,
  $ID_package,
  $ID_private,
  $ID_protected,
  $ID_public,
  $ID_return,
  $ID_set,
  $ID_static,
  $ID_super,
  $ID_switch,
  $ID_target,
  $ID_this,
  $ID_throw,
  $ID_true,
  $ID_try,
  $ID_typeof,
  $ID_var,
  $ID_void,
  $ID_while,
  $ID_with,
  $ID_yield,
  $NUMBER_HEX,
  $NUMBER_DEC,
  $NUMBER_BIN,
  $NUMBER_OCT,
  $NUMBER_OLD,
  $NUMBER_BIG_HEX,
  $NUMBER_BIG_DEC,
  $NUMBER_BIG_BIN,
  $NUMBER_BIG_OCT,
  $PUNC_EXCL,
  $PUNC_EXCL_EQ,
  $PUNC_EXCL_EQ_EQ,
  $PUNC_PERCENT,
  $PUNC_PERCENT_EQ,
  $PUNC_AND,
  $PUNC_AND_AND,
  $PUNC_AND_EQ,
  $PUNC_PAREN_OPEN,
  $PUNC_PAREN_CLOSE,
  $PUNC_STAR,
  $PUNC_STAR_STAR,
  $PUNC_STAR_EQ,
  $PUNC_STAR_STAR_EQ,
  $PUNC_PLUS,
  $PUNC_PLUS_PLUS,
  $PUNC_PLUS_EQ,
  $PUNC_COMMA,
  $PUNC_MIN,
  $PUNC_MIN_MIN,
  $PUNC_MIN_EQ,
  $PUNC_MIN_MIN_GT,
  $PUNC_DOT,
  $PUNC_DOT_DOT_DOT,
  $PUNC_DIV,
  $PUNC_DIV_EQ,
  $PUNC_COLON,
  $PUNC_SEMI,
  $PUNC_LT,
  $PUNC_LT_LT,
  $PUNC_LT_EQ,
  $PUNC_LT_LT_EQ,
  $PUNC_LT_EXCL_MIN_MIN,
  $PUNC_EQ,
  $PUNC_EQ_EQ,
  $PUNC_EQ_EQ_EQ,
  $PUNC_EQ_GT,
  $PUNC_GT,
  $PUNC_GT_GT,
  $PUNC_GT_GT_GT,
  $PUNC_GT_EQ,
  $PUNC_GT_GT_EQ,
  $PUNC_GT_GT_GT_EQ,
  $PUNC_QMARK,
  $PUNC_QMARK_DOT,
  $PUNC_QMARK_QMARK,
  $PUNC_BRACKET_OPEN,
  $PUNC_BRACKET_CLOSE,
  $PUNC_CARET,
  $PUNC_CARET_EQ,
  $PUNC_CURLY_OPEN,
  $PUNC_OR,
  $PUNC_OR_OR,
  $PUNC_OR_EQ,
  $PUNC_CURLY_CLOSE,
  $PUNC_TILDE,
  $REGEXN,
  $REGEXU,
  $STRING_SINGLE,
  $STRING_DOUBLE,
  $TICK_HEAD,
  $TICK_BODY,
  $TICK_TAIL,
  $TICK_PURE,
  $TICK_BAD_HEAD,
  $TICK_BAD_BODY,
  $TICK_BAD_TAIL,
  $TICK_BAD_PURE,
  $EOF,
  $ASI,
  $ERROR,

  START_SPACE,
  START_ID,
  START_KEY,
  START_NL_SOLO,
  START_CR,
  START_STRING,
  START_DECIMAL,
  START_DOT,
  START_CURLY_CLOSE,
  START_EQ,
  START_DIV,
  START_PLUS,
  START_MIN,
  START_ZERO,
  START_TEMPLATE,
  START_EXCL,
  START_PERCENT,
  START_AND,
  START_STAR,
  START_CARET,
  START_LT,
  START_GT,
  START_OR,
  START_BSLASH,
  START_QMARK,
  START_ERROR,

  STRING_PART,
  STRING_QUOTE,
  STRING_BS,
  STRING_UNICODE,
  STRING_NL,

  IDENT_PART,
  IDENT_END,
  IDENT_BS,
  IDENT_UNICODE,

  regexAtomEscapeStartJumpTable,
  REGATOM_ESC_OK,
  REGATOM_ESC_NONU,
  REGATOM_ESC_u,
  REGATOM_ESC_x,
  REGATOM_ESC_UNICODE,
  REGATOM_ESC_c,
  REGATOM_ESC_pP,
  REGATOM_ESC_0,
  REGATOM_ESC_123456789,
  REGATOM_ESC_k,
  REGATOM_ESC_NL,
  REGATOM_ESC_WC,

  regexClassEscapeStartJumpTable,
  REGCLS_ESC_NSC,
  REGCLS_ESC_UNICODE,
  REGCLS_ESC_u,
  REGCLS_ESC_x,
  REGCLS_ESC_c,
  REGCLS_ESC_k,
  REGCLS_ESC_b,
  REGCLS_ESC_B,
  REGCLS_ESC_f,
  REGCLS_ESC_n,
  REGCLS_ESC_r,
  REGCLS_ESC_t,
  REGCLS_ESC_v,
  REGCLS_ESC_ERR,
  REGCLS_ESC_pP,
  REGCLS_ESC_0,
  REGCLS_ESC_1234567,
  REGCLS_ESC_89,
  REGCLS_ESC_SYNTAX,
  REGCLS_ESC_DASH,
  REGCLS_ESC_NL,

  regexAtomJumpTable,
  REGEX_ATOM_OTHER,
  REGEX_ATOM_DOT,
  REGEX_ATOM_QUANT,
  REGEX_ATOM_PARENL,
  REGEX_ATOM_PARENR,
  REGEX_ATOM_SQUAREL,
  REGEX_ATOM_SQUARER,
  REGEX_ATOM_BSLASH,
  REGEX_ATOM_FSLASH,
  REGEX_ATOM_XOR,
  REGEX_ATOM_DOLLAR,
  REGEX_ATOM_UNICODE,
  REGEX_ATOM_CURLYL,
  REGEX_ATOM_CURLYR,
  REGEX_ATOM_OR,
  REGEX_ATOM_NL,

  stringEscapeStartJumpTable,
  STRING_ESC_OK,
  STRING_ESC_N,
  STRING_ESC_SQ,
  STRING_ESC_DQ,
  STRING_ESC_U,
  STRING_ESC_UNICODE,
  STRING_ESC_LF,
  STRING_ESC_CR,
  STRING_ESC_0,
  STRING_ESC_123456789,
  STRING_ESC_B,
  STRING_ESC_F,
  STRING_ESC_R,
  STRING_ESC_T,
  STRING_ESC_V,
  STRING_ESC_X,

  HEX_OOB,

  // <SCRUB ASSERTS TO COMMENT>
  ALL_START_TYPES,
  ALL_GEES,
  ALL_TOKEN_GROUPS,
  ALL_TOKEN_TYPES,
  // </SCRUB ASSERTS TO COMMENT>
};
