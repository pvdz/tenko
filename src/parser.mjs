// Char codes aren't really used in the parser (only in the lexer), except for asserts. Inlined for builds.
import {
  $$A_61,
  $$A_UC_41,
  $$B_62,
  $$B_UC_42,
  $$C_63,
  $$C_UC_43,
  $$D_64,
  $$D_UC_44,
  $$E_65,
  $$E_UC_45,
  $$F_66,
  $$F_UC_46,
  $$G_67,
  $$G_UC_47,
  $$H_68,
  $$H_UC_48,
  $$I_69,
  $$I_UC_49,
  $$J_6A,
  $$J_UC_4A,
  $$K_6B,
  $$K_UC_4B,
  $$L_6C,
  $$L_UC_4C,
  $$M_6D,
  $$M_UC_4D,
  $$N_6E,
  $$N_UC_4E,
  $$O_6F,
  $$O_UC_4F,
  $$P_70,
  $$P_UC_50,
  $$Q_71,
  $$Q_UC_51,
  $$R_72,
  $$R_UC_52,
  $$S_73,
  $$S_UC_53,
  $$T_74,
  $$T_UC_54,
  $$U_75,
  $$U_UC_55,
  $$V_76,
  $$V_UC_56,
  $$W_77,
  $$W_UC_57,
  $$X_78,
  $$X_UC_58,
  $$Y_79,
  $$Y_UC_59,
  $$Z_7A,
  $$Z_UC_5A,
  $$0_30,
  $$1_31,
  $$2_32,
  $$3_33,
  $$4_34,
  $$5_35,
  $$6_36,
  $$7_37,
  $$8_38,
  $$9_39,

  $$NULL_00,
  $$BACKSPACE_08,
  $$TAB_09,
  $$LF_0A,
  $$VTAB_0B,
  $$FF_0C,
  $$CR_0D,
  $$SPACE_20,
  $$EXCL_21,
  $$DQUOTE_22,
  $$HASH_23,
  $$$_24,
  $$PERCENT_25,
  $$AND_26,
  $$SQUOTE_27,
  $$PAREN_L_28,
  $$PAREN_R_29,
  $$STAR_2A,
  $$PLUS_2B,
  $$COMMA_2C,
  $$DASH_2D,
  $$DOT_2E,
  $$FWDSLASH_2F,
  $$COLON_3A,
  $$SEMI_3B,
  $$LT_3C,
  $$IS_3D,
  $$GT_3E,
  $$QMARK_3F,
  $$SQUARE_L_5B,
  $$BACKSLASH_5C,
  $$SQUARE_R_5D,
  $$XOR_5E,
  $$LODASH_5F,
  $$TICK_60,
  $$CURLY_L_7B,
  $$CURLY_R_7D,
  $$TILDE_7E,
  $$OR_7C,
  $$NBSP_A0,
  $$ZWS_200B,
  $$ZWNJ_200C,
  $$ZWJ_200D,
  $$LS_2029,
  $$PS_2028,
  $$BOM_FEFF,
} from './charcodes.mjs';
// Lexerflags are used to signal state from parser to lexer. And organically grew into a wider signaling system.
import {
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

  L,
} from './lexerflags.mjs';
// Most of these aren't used, except for a few at ASSERT time. Auto-imported for convenience. Auto stripped from a build
import {
  inspect,
  ASSERT,
} from './utils.mjs';
// These define most of the token type manipulation things
import {
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

  // <SCRUB ASSERTS TO COMMENT>
  // (These are only used to assert a token type group when skipping. For all other use cases use the `isXXXtoken()` funcs
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
  // </SCRUB ASSERTS TO COMMENT>

  $UNTYPED, // 0
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

  T,

  // <SCRUB ASSERTS TO COMMENT>
  ALL_START_TYPES,
  ALL_GEES,
  ALL_TOKEN_GROUPS,
  ALL_TOKEN_TYPES,
  // </SCRUB ASSERTS TO COMMENT>
} from './tokentype.mjs';
// Flags
import {
  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,
  COLLECT_TOKENS_TYPES,

  FAIL_HARD,

  GOAL_MODULE,
  GOAL_SCRIPT,

  RETURN_ANY_TOKENS,
  RETURN_COMMENT_TOKENS,
  RETURN_SOLID_TOKENS,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,
} from './enum_lexer.mjs';
// Actual lexer
import {
  Lexer,
} from './lexer.mjs';

function ASSERT_ASSIGN_EXPR(allowAssignment) {
  ASSERT(allowAssignment === ASSIGN_EXPR_IS_OK || allowAssignment === ASSIGN_EXPR_IS_ERROR, 'allowAssignment is enum', allowAssignment);
}
function ASSERT_FDS(fdState) {
  ASSERT([FDS_ILLEGAL, FDS_IFELSE, FDS_LEX, FDS_VAR].includes(fdState), 'FDS enum', fdState);
}
function ASSERT_BINDING_TYPE(bindingType) {
  ASSERT([BINDING_TYPE_NONE,BINDING_TYPE_ARG,BINDING_TYPE_VAR,BINDING_TYPE_LET,BINDING_TYPE_CONST,BINDING_TYPE_CLASS,BINDING_TYPE_FUNC_VAR,BINDING_TYPE_FUNC_LEX,BINDING_TYPE_FUNC_STMT,BINDING_TYPE_CATCH_IDENT,BINDING_TYPE_CATCH_OTHER].includes(bindingType), 'bindingType is an enum', bindingType);
}
function ASSERT_BINDING_ORIGIN(bindingOrigin) {
  ASSERT([FROM_STATEMENT_START, FROM_FOR_HEADER, FROM_CATCH, FROM_EXPORT_DECL, FROM_ASYNC_ARG, FROM_OTHER_FUNC_ARG].includes(bindingOrigin), 'binding origin enum');
}

import {
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
} from './enum_parser.mjs';

let ASSERT_ASI_REGEX_NEXT = false; // When set, do not throw assertion error in the semi/asi parser for seeing a regex

function sansFlag(flags, flag) {
  // This function is inlined by the build script...
  ASSERT(sansFlag.length === arguments.length, 'arg count');
  ASSERT(typeof flag === 'number', 'sansFlag flag 1 should be number;', flag, flags);
  ASSERT(typeof flags === 'number', 'sansFlag flag 2 should be number;', flag, flags);
  return (flags | flag) ^ flag;
}
function hasAllFlags(flags1, flags2) {
  // This function is inlined by the build script...
  ASSERT(hasAllFlags.length === arguments.length, 'arg count');
  ASSERT(typeof flags1 === 'number', 'hasAllFlags flag 1 should be number;', flags1, flags2);
  ASSERT(typeof flags2 === 'number', 'hasAllFlags flag 2 should be number;', flags1, flags2);
  return (flags1 & flags2) === flags2;
}
function hasAnyFlag(flags1, flags2) {
  // This function is inlined by the build script...
  ASSERT(hasAnyFlag.length === arguments.length, 'arg count');
  ASSERT(typeof flags1 === 'number', 'hasAnyFlag flag 1 should be a number;', flags1, flags2);
  ASSERT(typeof flags2 === 'number', 'hasAnyFlag flag 2 should be a number;', flags1, flags2);
  return (flags1 & flags2) !== 0;
}
function hasNoFlag(flags, flag) {
  // This function is inlined by the build script...
  ASSERT(hasNoFlag.length === arguments.length, 'arg count');
  ASSERT(typeof flag === 'number', 'hasNoFlag flag 1 should be number;', flag, flags);
  ASSERT(typeof flags === 'number', 'hasNoFlag flag 2 should be number;', flag, flags);
  return (flags & flag) === 0;
}

function Parser(code, options = {}) {
  let {
    goalMode: options_goalMode = GOAL_SCRIPT, // GOAL_SCRIPT | GOAL_MODULE | "script" | "module"
    collectTokens: options_collectTokens = COLLECT_TOKENS_NONE, // COLLECT_TOKENS_NONE | COLLECT_TOKENS_SOLID | COLLECT_TOKENS_ALL | COLLECT_TOKENS_TYPES | "none" | "solid" | "all" | "types"
    webCompat: options_webCompat = WEB_COMPAT_ON,
    strictMode: options_strictMode = false,
    astRoot: options_astRoot = null,
    tokenStorage: options_tokenStorage,
    getLexer = null,
    allowGlobalReturn = false, // you may need this to parse arbitrary code or eval code for example
    targetEsVersion = VERSION_WHATEVER, // 6, 7, 8, 9, 10, 11, Infinity
    exposeScopes: options_exposeScopes = false, // put scopes in the AST under `$scope` property?
    astUids = false, // add an incremental uid to all ast nodes for debugging
    ranges: options_ranges = false, // Add `range` to each `loc` object for absolute start/stop index on input?

    templateNewlineNormalization = true, // normalize \r and \rn to \n in the `.raw` of template nodes? Estree spec says yes, but makes it hard to serialize lossless

    errorCodeFrame = true, // Print input code at error point (you'll probably want this, it helps debugging a lot)
    truncCodeFrame = true, // Print only context of error in the code frame? Or all the input regardless of size.

    // You can override the logging functions
    $log = console.log,
    $warn = console.warn,
    $error = console.error,

    sourceField = '', // This value is used to set the `source` field of the `loc` object of each AST node

    // ast compatibility stuff?
    babelCompat = false,
    babelTokenCompat = false, // Add locs to tokens
    acornCompat = false,

    // Should we parse directives as their own AST nodes? (Other parsers do not, they just use ExpressionStatement)
    // I'm super confused since I read https://github.com/estree/estree/pull/99 as that directives get their own node
    // and in https://github.com/estree/estree/issues/6 many authors indicate to have adopted this PR, yet none of the
    // parsers use Directive nodes. So I'm clearly overlooking something silly. *shrug*
    /* (This comment prevents the buildscript from detecting the ast prefix) */AST_directiveNodes = false,
  } = options;

  let goalMode = GOAL_SCRIPT;
  if (typeof options_goalMode === 'string') {
    if (options_goalMode === 'module') goalMode = GOAL_MODULE;
    else if (options_goalMode === 'script') goalMode = GOAL_SCRIPT;
    else throw new Error('Unknown goal symbol value: `' + options_goalMode + '`');
  } else {
    goalMode = options_goalMode;
  }
  let collectTokens = COLLECT_TOKENS_NONE;
  if (typeof options_collectTokens === 'string') {
    if (options_collectTokens === 'all') collectTokens = COLLECT_TOKENS_ALL;
    else if (options_collectTokens === 'solid') collectTokens = COLLECT_TOKENS_SOLID;
    else if (options_collectTokens === 'none') collectTokens = COLLECT_TOKENS_NONE;
    else if (options_collectTokens === 'types') collectTokens = COLLECT_TOKENS_TYPES;
    else throw new Error('Unknown collectTokens value: `' + options_collectTokens + '`');
  } else {
    collectTokens = options_collectTokens;
  }

  let NODE_NAME_PROPERTY = babelCompat ? 'ObjectProperty' : 'Property';
  let NODE_NAME_METHOD_OBJECT = babelCompat ? 'ObjectMethod' : 'Property';
  let NODE_NAME_METHOD_CLASS = babelCompat ? 'ClassMethod' : 'MethodDefinition';

  let tok = Lexer(code, {
    targetEsVersion,
    parsingGoal: goalMode,
    collectTokens,
    returnTokens: babelCompat ? RETURN_COMMENT_TOKENS : RETURN_SOLID_TOKENS,
    webCompat: options_webCompat,
    gracefulErrors: FAIL_HARD,
    tokenStorageExternal: options_tokenStorage,
    babelTokenCompat,

    errorCodeFrame,
    truncCodeFrame,

    $log,
    $warn,
    $error,
  });

  let tok_throw = tok.throw;
  let tok_lexError = tok.lexError;
  let tok_asi = tok.asi;
  let tok_prevEndColumn = tok.prevEndColumn;
  let tok_prevEndLine = tok.prevEndLine;
  let tok_prevEndPointer = tok.prevEndPointer;
  let tok_currColumn = tok.currColumn;
  let tok_currLine = tok.currLine;
  let tok_currPointer = tok.currPointer;
  let tok_nextToken = tok.nextToken;
  let tok_getNlwas = tok.getNlwas;
  let tok_getCanoN = tok.getCanoN;
  let tok_getType = tok.getType;
  let tok_getStart = tok.getStart;
  let tok_getStop = tok.getStop;
  let tok_getLine = tok.getLine;
  let tok_getColumn = tok.getColumn;
  let tok_sliceInput = tok.sliceInput;

  let assertExpectedFail = '';

  let $tp_assertExpected_start = tok_getStart();
  let $tp_assertExpected_stop = tok_getStop();

  function ASSERT_VALID(bool, msg) {
    // An assert that must at least hold when the parser would otherwise accept the input.
    // This assert Will only throw an assertion error if the parser tripped over this but did not throw any actual error
    // (This helps with asserting certain syntax errors that would be properly caught without the assert)
    if (!bool) {
      assertExpectedFail = msg + '\n' + (new Error().stack);
      $tp_assertExpected_start = tok_getStart();
      $tp_assertExpected_stop = tok_getStop();
    }
  }

  function ASSERT(bool, desc = '', ...rest) {
    if (!bool) {
      THROW_RANGE('Assertion fail: ' + (desc || '<no desc>') + '; ' + JSON.stringify(rest), tok_getStart(), tok_getStop(), ':', ...rest);
    }
  }

  let allowExponentiation = (targetEsVersion >= VERSION_EXPONENTIATION || targetEsVersion === VERSION_WHATEVER);
  let allowTrailingFunctionComma = targetEsVersion >= VERSION_TRAILING_FUNC_COMMAS || targetEsVersion === VERSION_WHATEVER;
  let allowAsyncFunctions = targetEsVersion >= VERSION_ASYNC || targetEsVersion === VERSION_WHATEVER;
  let allowAsyncGenerators = targetEsVersion >= VERSION_ASYNC_GEN || targetEsVersion === VERSION_WHATEVER;
  let allowBadEscapesInTaggedTemplates = targetEsVersion >= VERSION_TAGGED_TEMPLATE_BAD_ESCAPES || targetEsVersion === VERSION_WHATEVER;
  let allowOptionalCatchBinding = targetEsVersion >= VERSION_OPTIONAL_CATCH || targetEsVersion === VERSION_WHATEVER;
  let allowDynamicImport = (targetEsVersion >= VERSION_DYNAMIC_IMPORT || targetEsVersion === VERSION_WHATEVER);
  let allowExportStarAs = (targetEsVersion >= VERSION_EXPORT_STAR_AS || targetEsVersion === VERSION_WHATEVER);

  ASSERT(goalMode === GOAL_SCRIPT || goalMode === GOAL_MODULE);
  ASSERT((targetEsVersion >= 6 && targetEsVersion <= 11) || targetEsVersion === VERSION_WHATEVER, 'version should be 6 7 8 9 10 11 or infin');

  if (getLexer) getLexer(tok);

  function THROW_RANGE(desc, tokenStart, tokenStop, ...args) {
    if (arguments.length < 3) throw new Error('Expecting 3 args for THROW_RANGE, received ' + arguments.length);
    if (tokenStart > tokenStop) throw new Error('range should be >=0, was [' + tokenStart + ', ' + tokenStop + ']');

    $log('\n');
    $log('Error in parser:', desc, 'remaining throw args;', args);
    // The "at eof" suffix also helps for reducing fuzz cases
    let fullErrmsg = 'Parser error! ' + desc + (tok_getType() === $EOF ? ' (at EOF)' : '');
    tok_throw(fullErrmsg, tokenStart, tokenStop, '');
  }

  let uid_counter = 0;

  // https://github.com/estree/estree
  // https://github.com/estree/estree/blob/master/es5.md
  // https://github.com/estree/estree/blob/master/es2015.md
  // https://astexplorer.net/
  let _tree = {
    type: 'Program',
    loc: undefined,
    body: [],
  };
  if (babelCompat) {
    _tree = {
      type: 'Program',
      loc: undefined,
      body: [],
      sourceType: goalMode === GOAL_SCRIPT ? 'script' : 'module',
      interpreter: null, // https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#interpreterdirective
    };
  }
  if (acornCompat) {
    _tree = {
      type: 'Program',
      loc: undefined,
      body: [],
      sourceType: goalMode === GOAL_SCRIPT ? 'script' : 'module',
    };
  }
  let _path = [_tree];
  let _pnames;
  ASSERT(_pnames = ['ROOT'], '(dev-only verification and debugging tool)');
  if (options_astRoot) {
    options_astRoot.root = _tree;
    options_astRoot.path = _path;
    ASSERT(options_astRoot.pathNames = _pnames, '(dev-only verification and debugging tool)');
  }

  function AST_getClosedLoc($tp_first_start, $tp_first_line,  $tp_first_column) {
    ASSERT(AST_getClosedLoc.length === arguments.length, 'arg count');
    ASSERT([$tp_first_start, $tp_first_line,  $tp_first_column].every(d => typeof d === 'number' && d >= 0), 'should receive all numbers, all zero-positive');

    // Create a loc that is immediately closed

    return AST_getCloseLoc($tp_first_start, $tp_first_line,  $tp_first_column,  tok_prevEndPointer(),  tok_prevEndLine(),  tok_prevEndColumn());
  }
  function AST_getCloseLoc(startIndex, startLine, startColumn, endIndex, endLine, endColumn) {
    ASSERT(AST_getCloseLoc.length === arguments.length, 'arg count');
    ASSERT([startIndex, startLine, startColumn, endIndex, endLine, endColumn].every(d => typeof d === 'number' && d >= 0), 'should receive all numbers, all zero-positive');

    if (options_ranges) {
      // Note: return two distinct object when using ranges to prevent deopt
      return {
        start: {
          line: startLine | 0, // offset 1
          column: startColumn | 0,
        },
        end: {
          line: endLine | 0,
          column: endColumn | 0,
        },
        range: {
          start: startIndex | 0,
          end: endIndex | 0,
        },
        source: sourceField, // File containing the code being parsed. Source maps may use this.
      };
    }

    return {
      start: {
        line: startLine, // offset 1
        column: startColumn,
      },
      end: {
        line: endLine,
        column: endColumn,
      },
      source: sourceField, // File containing the code being parsed. Source maps may use this.
    };
  }

  function AST_open(prop, newNode) {
    ASSERT(arguments.length === AST_open.length, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(typeof prop === 'string' && prop !== 'undefined', 'prop should be string');

    // The column offsets at 0

    AST_setNode(prop, newNode);
    _path[_path.length] = newNode;
    ASSERT(_pnames.push(prop), '(dev-only verification and debugging tool)');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
  }
  function AST_close($tp_open_start, $tp_open_line, $tp_open_column, names_ASSERT_ONLY) {
    ASSERT(AST_close.length === arguments.length, 'arg count');
    // Note: names_ASSERT_ONLY is stripped in the build...
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(!names_ASSERT_ONLY.includes('TemplateElement'), 'use AST_closeTemplateElement instead');
    ASSERT(!names_ASSERT_ONLY.includes('CommentBlock'), 'use AST_closeComment instead');
    ASSERT(!names_ASSERT_ONLY.includes('CommentLine'), 'use AST_closeComment instead');
    ASSERT(!names_ASSERT_ONLY.includes('Identifier'), 'use AST_closeIdent instead');

    AST_set('loc', AST_getCloseLoc($tp_open_start, $tp_open_line, $tp_open_column, tok_prevEndPointer(), tok_prevEndLine(), tok_prevEndColumn()))

    // <SCRUB ASSERTS>
    let was =
    // </SCRUB ASSERTS>
      _path.pop();

    ASSERT(was.loc.start.line <= was.loc.end.line, 'end line should be same or later than start (1)', was.loc);
    ASSERT(was.loc.start.line < was.loc.end.line || was.loc.start.column <= was.loc.end.column, 'if the node does not span multiple lines then the start column should come before the end column', was.loc);
    ASSERT(was.loc.start.line >= 1, 'start line should be >= 1', was.loc);
    ASSERT(was.loc.start.column >= 0, 'start column should be >= 0', was.loc);
    ASSERT(was.loc.end.line >= 1, 'end line should be >= 1', was.loc);
    ASSERT(was.loc.end.column >= 0, 'end column should be >= 0', was.loc);

    ASSERT(!void _pnames.pop(), '(dev-only verification and debugging tool)');
    ASSERT(!names_ASSERT_ONLY || (typeof names_ASSERT_ONLY === 'string' && names_ASSERT_ONLY === was.type) || (names_ASSERT_ONLY instanceof Array && names_ASSERT_ONLY.indexOf(was.type) >= 0), 'Expecting to close a node with given name(s), expected: ' + names_ASSERT_ONLY + ' but closed: ' + was.type)
  }
  function AST_closeTemplateElement(isTemplateDouble, $tp_tick_start, $tp_tick_line, $tp_tick_column) {
    ASSERT(AST_closeTemplateElement.length === arguments.length, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');

    // The column offsets at 0
    // For template elements the backticks, `${`, and `}` characters are ignored in the location ranges... so -1
    let colEnd = tok_prevEndColumn() - 1;
    let pointerEnd = tok_prevEndPointer();
    if (isTemplateDouble) {
      // This is for TICK_HEAD and TICK_BODY which start with `${`
      --colEnd;
      --pointerEnd;
    }

    AST_set('loc', AST_getCloseLoc($tp_tick_start, $tp_tick_line, $tp_tick_column, pointerEnd, tok_prevEndLine(), colEnd))

    // <SCRUB ASSERTS>
    let was =
    // </SCRUB ASSERTS>
      _path.pop();

    ASSERT(was.loc.start.line <= was.loc.end.line, 'end line should be same or later than start (2)', was.loc);
    ASSERT(was.loc.start.line < was.loc.end.line || was.loc.start.column <= was.loc.end.column, 'if the node does not span multiple lines then the start column should come before the end column', was.loc);
    ASSERT(was.loc.start.line >= 1, 'start line should be >= 1', was.loc);
    ASSERT(was.loc.start.column >= 0, 'start column should be >= 0', was.loc);
    ASSERT(was.loc.end.line >= 1, 'end line should be >= 1', was.loc);
    ASSERT(was.loc.end.column >= 0, 'end column should be >= 0', was.loc);

    ASSERT(!void _pnames.pop(), '(dev-only verification and debugging tool)');
    ASSERT(was.type === 'TemplateElement', 'Expecting to close a TemplateElement node but closed: ' + was.type)
  }
  function AST_set(prop, value) {
    ASSERT(AST_set.length === arguments.length, 'expecting two args');
    ASSERT(typeof prop === 'string', 'prop should be string');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(prop[0] === '$' || prop === 'directives' || prop === 'extra' || _path[_path.length - 1].hasOwnProperty(prop), 'all ast node members should be predefined', prop, _path[_path.length - 1].type);

    // Set a property value and expect it to be undefined before
    ASSERT(_path[_path.length - 1][prop] === undefined, 'use AST_clobber? This func doesnt clobber, prop=' + prop + ', val=' + value);

    _path[_path.length - 1][prop] = value;
  }
  function AST_setNode(astProp, node) {
    ASSERT(AST_setNode.length === arguments.length, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(typeof node === 'object' && node && typeof node.type === 'string', 'should receive ast node to set', node);
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');

    if (astUids) node.$uid = uid_counter++;

    let parentNode = _path[_path.length - 1];

    let p = parentNode[astProp];
    if (Array.isArray(p)) {
      p[p.length] = node;
    }
    else {
      ASSERT(p === undefined, `(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array`, astProp, p && p.type);
      parentNode[astProp] = node;
    }
  }
  function AST_setNodeDangerously(astProp, node) {
    ASSERT(AST_setNode.length === arguments.length, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(typeof node === 'object' && (!node || typeof node.type === 'string'), 'should receive ast node to set or null', node);
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');

    if (astUids && node) node.$uid = uid_counter++;

    let parentNode = _path[_path.length - 1];

    let p = parentNode[astProp];
    if (Array.isArray(p)) {
      p[p.length] = node;
    }
    else {
      ASSERT(p === undefined, `(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array`);
      parentNode[astProp] = node;
    }
  }
  function AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon) {
    ASSERT(AST_setIdent.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT($tp_ident_start !== tok_getStart(), 'token should be consumed to ensure location data is correct');

    let identNode = AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
    AST_setNode(astProp, identNode);
  }
  function AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon) {
    ASSERT(AST_getIdentNode.length === arguments.length, 'arg count');
    ASSERT(typeof $tp_ident_canon === 'string');
    ASSERT($tp_ident_canon === $tp_ident_canon);

    let col = $tp_ident_column;
    let line = $tp_ident_line;
    let len = $tp_ident_stop - $tp_ident_start;
    // Idents can't contain newlines so the end. column should be start. column+len
    let colEnd = col + len;

    let identNode = {
      type: 'Identifier',
      loc: AST_getCloseLoc($tp_ident_start, line,  col,  $tp_ident_stop,  line,  colEnd),
      // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
      name: $tp_ident_canon,
    };
    if (babelCompat) identNode.loc.identifierName = $tp_ident_canon;
    ASSERT(identNode.loc.end.column - identNode.loc.start.column === ($tp_ident_stop - $tp_ident_start), 'for idents the location should only span exactly the length of the ident and cannot hold newlines');

    return identNode;
  }
  function AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon) {
    _AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon, false);
  }
  function _AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon, fromDirective) {
    ASSERT(_AST_setLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'prop is string');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(isNumberStringRegex($tp_lit_type), 'should be number or string');
    ASSERT($tp_lit_start !== tok_getStart(), 'token should be consumed to ensure location data is correct');

    if (isStringToken($tp_lit_type)) {
      AST_setStringLiteral(astProp, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon, fromDirective);
    }
    else if (isNumberToken($tp_lit_type)) {
      if (isBigintToken($tp_lit_type)) {
        AST_setBigInt(astProp, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column);
      } else {
        AST_setNumberLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column);
      }
    }
    else {
      ASSERT(isRegexToken($tp_lit_type), 'this must be regex now because this function is only called for strings, numbers, and regexes');
      ASSERT(tok_sliceInput($tp_lit_start, $tp_lit_stop).split('/').length > 2, 'a regular expression should have at least two forward slashes', tok_sliceInput($tp_lit_start, $tp_lit_stop));
      AST_setRegexLiteral(astProp, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column);
    }
  }
  function AST_getStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective) {
    ASSERT(AST_getStringNode.length === arguments.length, 'arg count');

    if (babelCompat) return AST_babelGetStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective);

    let node = {
      type: 'Literal',
      loc: AST_getCloseLoc($tp_string_start, $tp_string_line, $tp_string_column,  tok_prevEndPointer(),  tok_prevEndLine(),  tok_prevEndColumn()),
      value: $tp_string_canon,
      raw: tok_sliceInput($tp_string_start, $tp_string_stop),
    };
    return node;
  }
  function AST_setStringLiteral(astProp, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective) {
    ASSERT(AST_setStringLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT($tp_string_start !== tok_getStart(), 'token should be consumed to ensure location data is correct');

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let stringNode = AST_getStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective);
    AST_setNode(astProp, stringNode); // for ASSERTs only!
  }
  function AST_getNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
    ASSERT(AST_getNumberNode.length === arguments.length, 'arg count');

    if (isBigintToken($tp_number_type)) return AST_getBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
    if (babelCompat) return AST_babelGetNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);

    let str = tok_sliceInput($tp_number_start, $tp_number_stop);
    let value =
      $tp_number_type === $NUMBER_DEC ? parseFloat(str) : // parseFloat also deals with `e` cases
      $tp_number_type === $NUMBER_HEX ? parseInt(str.slice(2), 16) :
      $tp_number_type === $NUMBER_BIN ? parseInt(str.slice(2), 2) :
      $tp_number_type === $NUMBER_OCT ? parseInt(str.slice(2), 8) :
      (
        ASSERT($tp_number_type === $NUMBER_OLD, 'number types are enum and bigint should not reach this'),
        ASSERT(str !== '0', 'a zero should just be a decimal'),
        str.includes('8') || str.includes('9')
        ? parseFloat(str.slice(1))
        : parseInt(str.slice(1), 8)
      );

    return {
      type: 'Literal',
      loc: AST_getCloseLoc($tp_number_start, $tp_number_line,  $tp_number_column, $tp_number_stop,  $tp_number_line,  $tp_number_column + ($tp_number_stop - $tp_number_start)),
      value: value,
      raw: str,
    };
  }
  function AST_setNumberLiteral(astProp, $tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
    ASSERT(AST_setNumberLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT($tp_number_start !== tok_getStart(), 'token should be consumed to ensure location data is correct');

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let numberNode = AST_getNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
    AST_setNode(astProp, numberNode); // for ASSERTs only!
  }
  function AST_getBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column ) {
    // [v] `45n`
    // [v] `0b100n`
    // [v] `0o533n`
    // [v] `0xabcn`
    // https://github.com/estree/estree/pull/198/files

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    if (acornCompat) return AST_acornGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
    if (babelCompat) return AST_babelGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);

    return {
      type: 'BigIntLiteral',
      loc: AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)),
      value: null,
      bigint: tok_sliceInput($tp_number_start, $tp_number_stop - 1), // TODO: Normalize... https://github.com/estree/estree/issues/200
    };
  }
  function AST_setBigInt(astProp, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
    ASSERT(AST_setBigInt.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT($tp_number_start !== tok_getStart(), 'token should be consumed to ensure location data is correct');

    let bigintNode = AST_getBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
    AST_setNode(astProp, bigintNode); // for ASSERTs only!
  }
  function AST_getRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
    ASSERT(AST_getRegexNode.length === arguments.length, 'arg count');

    if (acornCompat) return AST_acornGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column);
    if (babelCompat) return AST_babelGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column);

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let str = tok_sliceInput($tp_regex_start, $tp_regex_stop);
    let pos = str.lastIndexOf('/');
    let body = str.slice(1, pos);
    let tail = str.slice(pos + 1);

    // https://github.com/estree/estree/blob/master/es5.md#regexpliteral

    return {
      type: 'Literal',
      loc: AST_getCloseLoc($tp_regex_start, $tp_regex_line, $tp_regex_column,  $tp_regex_stop,  $tp_regex_line, $tp_regex_column + ($tp_regex_stop - $tp_regex_start)),
      value: null,
      regex: {
        pattern: body,
        flags: tail,
      },
      raw: str,
    };
  }
  function AST_setRegexLiteral(astProp, $tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
    ASSERT(AST_setRegexLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT($tp_regex_start !== tok_getStart(), 'token should be consumed to ensure location data is correct');

    let regexNode = AST_getRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column);
    AST_setNode(astProp, regexNode); // for ASSERTs only!
  }
  function AST_add(prop, value) {
    ASSERT(typeof prop === 'string', 'prop should be string');
    ASSERT(arguments.length === 2, 'expecting two args');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(Array.isArray(_path[_path.length - 1][prop]), 'expecting to add to an existing array');

    let arr = _path[_path.length - 1][prop];
    arr[arr.length] = value;
  }
  function AST_popNode(prop) {
    ASSERT(AST_popNode.length === arguments.length, 'arg count');

    // Get the current "top" node and either remove it from the parent array, or mark it as `undefined` inside an ASSERT

    let parent = _path[_path.length-1];
    let p = parent[prop];
    ASSERT(p || p === null, 'the prop should exist... (and be a node, or null for the init in `for (;;);`)', prop, parent.type);
    if (Array.isArray(p)) {
      ASSERT(Array.isArray(p), 'ast nodes do not have a `length` property so this duck type check should have sufficed');
      ASSERT(p.length);
      return p.pop();
    } else {
      ASSERT(!void(parent[prop] = undefined), '(mark as undefined so that assertions dont trip over the value existing)');
      return p;
    }
  }
  function AST_wrapClosedCustom(prop, newNode, newProp) { // TODO: a build can strip the second arg ... maybe we can formalize that a little bit
    ASSERT(AST_wrapClosedCustom.length === arguments.length, 'arg count');
    ASSERT(typeof prop === 'string', 'should be string');

    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths', 'pnames='+_pnames+', path=' + _path.map(p => p.type));

    // wrap the "current" node (last of _tree) with an extra node
    // so the parent of node becomes the parent of a new node and
    // the old node becomes a child of the new node
    // a(x:b) -> a(x:c(y:b))
    // If the child is an array, replace the last element in the array but not the array itself

    let child = AST_popNode(prop);

    AST_open(prop, newNode);
    // set it as child of new node
    AST_set(newProp, child);
  }
  function AST_wrapClosedIntoArrayCustom(prop, newNode, newProp) {
    ASSERT(AST_wrapClosedIntoArrayCustom.length === arguments.length, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');

    // same as AST_wrapClosed except the node is put in an array

    let child = AST_popNode(prop);

    AST_open(prop, newNode);
    // set the node as the first child of the property as an array
    AST_set(newProp, [child]);
  }
  function AST_destruct(prop) {
    // rename object and array literal nodes to patterns to match the AST spec
    // this happens when arr/obj literal was parsed (possibly nested) and
    // then a destructuring assignment was encountered
    // this is also called for function args and any other destructuring (like catch binding)

    // recursively walk the tree from the prop in open node and visit
    // any array and object expression as well as the left side of assignments
    // for now dont bother with other nodes until we find a reason to

    // note: this function is usually called after a few nodes have closed (the literal struct).

    ASSERT(arguments.length === 1, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');

    let parent = _path[_path.length-1];
    let node = parent[prop];
    ASSERT(node, 'top[' + prop + '] should be a node');

    if (Array.isArray(node)) {
      // The destruct applies to the node just closed, so last in list
      let last = node.length - 1;
      AST__destruct(node[last], node, last);
      return;
    }

    AST__destruct(node, parent, prop);
  }
  function AST__destruct(node, parent, astProp) {
    ASSERT(AST__destruct.length === arguments.length, 'arg count');

    switch (node.type) {
      case 'ArrayExpression':
        node.type = 'ArrayPattern';
        let elements = node.elements;
        let e = elements.length;
        for (let i = 0; i < e; ++i) {
          let element = elements[i];
          // note: children can be null (elided array destruct) but not undefined
          if (element) AST__destruct(element, elements, i);
        }
        return;
      case 'ObjectExpression':
        node.type = 'ObjectPattern';
        let properties = node.properties;
        let n = properties.length;
        for (let i = 0; i < n; ++i) {
          if (properties[i].type === NODE_NAME_PROPERTY) {
            ASSERT(properties[i].value, 'each property should have a value');
          } else {
            ASSERT(properties[i].type === 'SpreadElement', 'expecting only properties, spreads, and assignments here');
            ASSERT(properties[i].argument, 'each property should have a value');
          }
          AST__destruct(properties[i], properties, i);
        }
        return;
      case 'AssignmentExpression':
        // walk the left of the assignment only
        AST__destruct(node.left, node, 'left');
        AST_destructReplaceAssignment(parent, astProp);
        return;
      case NODE_NAME_PROPERTY:
        AST__destruct(node.value, node, 'value');
        return;
      case 'SpreadElement':
        // `([...x]);` vs `([...x]) => x`
        // `({...x});` vs `({...x}) => x`
        // TODO: this seems to deopt. can also set the parent[prop] = {} new node appraoch. need to benchmark that.
        node.type = 'RestElement';
        AST__destruct(node.argument, node, 'argument');
        return;
    }
  }
  function AST_destructReplaceAssignment(parentNode, prop) {
    let oldNode = parentNode[prop];
    if (oldNode.operator !== '=') {
      return THROW_RANGE('The destructuring assignment should be a regular assignment', tok_getStart(), tok_getStop());
    }
    let newNode = {
      type: 'AssignmentPattern',
      loc: oldNode.loc,
      left: oldNode.left,
      right: oldNode.right,
    };

    parentNode[prop] = newNode;
  }
  function AST_convertArrayToPattern($tp_eq_type, astProp) {
    ASSERT(AST_convertArrayToPattern.length === arguments.length, 'arg count');

    if ($tp_eq_type === $PUNC_EQ) {
      let node = _path[_path.length - 1][astProp];
      if (Array.isArray(node)) {
        node = node[node.length - 1];
      }
      if (node.type === 'ArrayExpression' || node.type === 'ObjectExpression') {
        AST_destruct(astProp);
      }
    }
  }
  function AST_throwIfIllegalUpdateArg(astProp) {
    ASSERT(AST_throwIfIllegalUpdateArg.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');

    // Using the AST for this because in the current propagation system we can only tell whether the parsed part
    // is assignable or not, and in this reading something that can be destructured can be assigned to.

    let head = _path[_path.length - 1];
    let prev = head && head[astProp];

    // Note: the for-case is nasty because when parsing the lhs the AST is not yet populated with a `for` statement
    // because that particular node type depends on `in`, `of`, or a semi. So the AST could be an array (block body)
    if (
      !prev ||
      (
        prev instanceof Array ?
          // - `for (x--;;);`
          !prev.length || (prev[prev.length - 1].type !== 'Identifier' && prev[prev.length - 1].type !== 'MemberExpression') :
          // - `[]++`
          (prev.type !== 'Identifier' && prev.type !== 'MemberExpression')
      )
    ) {
      // - `++[]`
      // - `--f()`
      // - `++this`
      // - `[]++`
      // - `f()--`
      // - `this++`
      return THROW_RANGE('Can only increment or decrement an identifier or member expression', tok_getStart(), tok_getStop());
    }
  }
  function AST_patchAsyncCall($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, astProp) {
    ASSERT(AST_patchAsyncCall.length === arguments.length, 'arg count');

    let node = _path[_path.length - 1];
    let args = node[astProp];
    if (args instanceof Array) args = args[0];
    ASSERT(args, 'should have parsed someting v1');
    if (args.type === 'SequenceExpression') args = args.expressions;
    else args = [args];
    ASSERT(args, 'should have parsed someting v2');
    if (node[astProp] instanceof Array) node[astProp] = [];
    else node[astProp] = undefined;

    // TODO: verify the args

    ASSERT(_path[_path.length - 1][astProp]  instanceof Array || !void(_path[_path.length - 1][astProp] = undefined), '(there is an assert that confirms that the property is undefined and we expect this not to be the case here)');
    AST_setNode(astProp, {
      type: 'CallExpression',
      loc: AST_getClosedLoc($tp_async_start, $tp_async_line, $tp_async_column),
      callee: AST_getIdentNode($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon),
      arguments: args,
    });
  }
  function AST_babelDirectives() {
    // Remove Directive nodes from the body and generate them in a special directives array
    // https://babeljs.io/docs/en/babel-parser#output
    // https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#directive
    // https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#directiveliteral
    let node = _path[_path.length-1];
    let dirs = [];
    AST_set('directives', dirs);
    // We assume that Directives can only appear back2back at the start of a body
    // Move and transform a ExpressionStatement<Literal<"use strict">> node to directives Directive<DirectiveLiteral>>
    while (node.body.length && node.body[0].directive !== undefined) {
      let dir = node.body.shift();
      dirs[dirs.length] = {
        type: 'Directive',
        loc: dir.loc,
        value: dir.expression,
      };
      dir.expression.type = 'DirectiveLiteral';
    }
  }
  function AST_babelParenthesizesClosed($tp_parenOpen_start, astProp) {
    // Hack: get the node we just closed and add the extra meta data to it
    let parent = _path[_path.length-1];
    let child = parent[astProp];
    if (Array.isArray(child)) {
      ASSERT(child.length > 0, 'babel should not be able to wrap the closed child of an empty container');
      child = child[child.length - 1];
    }

    if (child.extra) {
      child.extra.parenthesized = true;
      child.extra.parenStart = $tp_parenOpen_start;
    } else {
      child.extra = {
        parenthesized: true,
        parenStart: $tp_parenOpen_start,
      };
    }
  }
  function AST_babelAddComment($tp_comment_start, $tp_comment_stop, $tp_comment_line, $tp_comment_column, $tp_comment_type) {
    // Create property if it doesn't already exist.
    // Add comment if it does.
    if (!_path[_path.length - 1].innerComments) _path[_path.length - 1].innerComments = [];

    let str = tok_sliceInput($tp_comment_start, $tp_comment_stop);

    let typeName = 'CommentLine';
    let value = '';
    if ($tp_comment_type === $COMMENT_SINGLE) {
      // typeName = 'CommentBlock'
      value = tok_sliceInput($tp_comment_start + 2, $tp_comment_stop);
    } else if ($tp_comment_type === $COMMENT_MULTI) {
      typeName = 'CommentBlock'
      value = tok_sliceInput($tp_comment_start + 2, $tp_comment_stop - 2);
    } else {
      ASSERT($tp_comment_type === $COMMENT_HTML, 'comment is enum so this must be html');
      ASSERT(str.slice(0,3) === '-->' || str.slice(0, 4) === '<!--', 'only two types of html comment');
      // Note: html comments are single line ast nodes
      // typeName = 'CommentLine'
      value = str.slice(0, 3) === '-->' ? tok_sliceInput($tp_comment_start + 3, $tp_comment_stop) : tok_sliceInput($tp_comment_start + 4, $tp_comment_stop);
    }

    let commentNode = {
      type: typeName,
      // Comment nodes are recorded immediately and should read the current position as their end...
      loc: AST_getCloseLoc($tp_comment_start, $tp_comment_line, $tp_comment_column, tok_currPointer(), tok_currLine(), tok_currColumn()),
      value: value
    };

    AST_setNode('innerComments', commentNode);

    ASSERT(commentNode.loc.start.line <= commentNode.loc.end.line, 'end line should be same or later than start (3)', commentNode.loc);
    ASSERT(commentNode.loc.start.line < commentNode.loc.end.line || commentNode.loc.start.column <= commentNode.loc.end.column, 'if the node does not span multiple lines then the start column should come before the end column', commentNode.loc);
    ASSERT(commentNode.loc.start.line >= 1, 'start line should be >= 1', commentNode.loc);
    ASSERT(commentNode.loc.start.column >= 0, 'start column should be >= 0', commentNode.loc);
    ASSERT(commentNode.loc.end.line >= 1, 'end line should be >= 1', commentNode.loc);
    ASSERT(commentNode.loc.end.column >= 0, 'end column should be >= 0', commentNode.loc);

    return commentNode; // debug/assertions only...
  }
  function AST_babelGetStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective) {
    ASSERT(AST_babelGetStringNode.length === arguments.length, 'arg count');

    let str = tok_sliceInput($tp_string_start, $tp_string_stop);
    let value = fromDirective ? str.slice(1, -1) : $tp_string_canon;

    return {
      type: 'StringLiteral',
      // Note: strings can contain 2028/2029 and line continuations, which increment the line counter. So we can't just use str.length
      loc: AST_getCloseLoc($tp_string_start, $tp_string_line, $tp_string_column,  tok_prevEndPointer(),  tok_prevEndLine(),  tok_prevEndColumn()),
      value: value,
      extra: {rawValue: value, raw: str},
    };
  }
  function AST_babelGetNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
    ASSERT(AST_babelGetNumberNode.length === arguments.length, 'arg count');

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let str = tok_sliceInput($tp_number_start, $tp_number_stop);
    let value =
      $tp_number_type === $NUMBER_DEC ? parseFloat(str) : // parseFloat also deals with `e` cases
      $tp_number_type === $NUMBER_HEX ? parseInt(str.slice(2), 16) :
      $tp_number_type === $NUMBER_BIN ? parseInt(str.slice(2), 2) :
      $tp_number_type === $NUMBER_OCT ? parseInt(str.slice(2), 8) :
      (
        ASSERT($tp_number_type === $NUMBER_OLD, 'number types are enum and bigint should not reach this'),
        ASSERT(str !== '0', 'a zero should just be a decimal'),
        str.includes('8') || str.includes('9')
        ? parseFloat(str.slice(1))
        : parseInt(str.slice(1), 8)
      );

    return {
      type: 'NumericLiteral',
      loc: AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line,  $tp_number_column + ($tp_number_stop - $tp_number_start)),
      value: value,
      extra: { rawValue: value, raw: str},
    };
  }
  function AST_babelGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
    let str = tok_sliceInput($tp_number_start, $tp_number_stop - 1);
    return {
      type: 'BigIntLiteral',
      loc: AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)),
      value: str,
      extra: {rawValue: str, raw: str + 'n'}, // This will probably change ...
    };
  }
  function AST_babelGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
    ASSERT(AST_babelGetRegexNode.length === arguments.length, 'arg count');

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let str = tok_sliceInput($tp_regex_start, $tp_regex_stop);
    let pos = str.lastIndexOf('/');
    let body = str.slice(1, pos);
    let tail = str.slice(pos + 1);

    return {
      type: 'RegExpLiteral',
      loc: AST_getCloseLoc($tp_regex_start, $tp_regex_line, $tp_regex_column,  $tp_regex_stop,  $tp_regex_line, $tp_regex_column + ($tp_regex_stop - $tp_regex_start)),
      pattern: body,
      flags: tail,
      extra: {rawValue: undefined, raw: str},
      value: undefined,
    };
  }
  function AST_acornGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
    ASSERT(AST_acornGetBigIntNode.length === arguments.length, 'arg count');

    let strn = tok_sliceInput($tp_number_start, $tp_number_stop);
    let str = strn.slice(0, -1);
    return {
      type: 'Literal',
      loc: AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column,  $tp_number_stop,  $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)),
      raw: strn,
      bigint: str,
      value: BigInt(str), // Ironically it doesn't accept bigint notation
    };
  }
  function AST_acornGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {

    let str = tok_sliceInput($tp_regex_start, $tp_regex_stop);
    let pos = str.lastIndexOf('/');
    let body = str.slice(1, pos);
    let tail = str.slice(pos + 1);

    // https://github.com/estree/estree/blob/master/es5.md#regexpliteral
    // This node for Acorn is almost identical to estree ...

    return {
      type: 'Literal',
      loc: AST_getCloseLoc($tp_regex_start, $tp_regex_line, $tp_regex_column,  $tp_regex_stop,  $tp_regex_line, $tp_regex_column + ($tp_regex_stop - $tp_regex_start)),
      value: new RegExp(body, tail), // Only difference
      regex: {
        pattern: body,
        flags: tail,
      },
      raw: str,
    };
  }

  function initLexer(lexerFlags) {
    skipToStatementStart(lexerFlags);
    ASSERT(tok_getType() !== $ERROR, 'skipToStatementStart -> skipRex -> skip -> error check that throws lexer error so type cannot be an error at this point');
  }

  function skipRex(lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a regular expression literal
    ASSERT(arguments.length === 1, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set anywhere');

    _skip(lexerFlags | LF_FOR_REGEX);

    ASSERT(tok_getType() >= 0);
  }
  function skipDiv(lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a division punctuator
    ASSERT(arguments.length === 1, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set anywhere');

    _skip(lexerFlags);

    ASSERT(tok_getType() >= 0);
  }
  function skipAny(lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a division punctuator
    ASSERT(arguments.length === 1, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set anywhere');

    _skip(lexerFlags);

    ASSERT(tok_getType() >= 0);
    ASSERT_VALID(tok_getType() !== $PUNC_DIV && !isRegexToken(tok_getType()), 'this function should not be called if the parsed token could possibly start with a forward slash (div/regex)');
  }
  function _skip(lexerFlags) {
    // This is regex agnostic and should be called from skipDiv or skipRex only ...

    tok_nextToken(lexerFlags);
    if (tok_getType() === $ERROR) {
      return tok_lexError();
    }

    if (!babelCompat) return;

    let $tp_maybeComment_type = tok_getType();
    let $tp_maybeComment_line = tok_getLine();
    let $tp_maybeComment_column = tok_getColumn();
    let $tp_maybeComment_start = tok_getStart();
    let $tp_maybeComment_stop = tok_getStop();

    while (isCommentToken($tp_maybeComment_type)) {
      tok_nextToken(lexerFlags);
      if (tok_getType() === $ERROR) {
        return tok_lexError();
      }

      AST_babelAddComment($tp_maybeComment_start, $tp_maybeComment_stop, $tp_maybeComment_line, $tp_maybeComment_column, $tp_maybeComment_type);

      $tp_maybeComment_type = tok_getType();
      $tp_maybeComment_line = tok_getLine();
      $tp_maybeComment_column = tok_getColumn();
      $tp_maybeComment_start = tok_getStart();
      $tp_maybeComment_stop = tok_getStop();
    }
  }

  function ASSERT_skipRex(what, lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a regular expression literal
    ASSERT(arguments.length === 2, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof what === 'number' || typeof what === 'string', 'what number/string');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set or propagated inside the parser');
    if (typeof what === 'string') {
      ASSERT(tok_sliceInput(tok_getStart(), tok_getStop()) === what, 'expecting to skip token with certain value');
    } else {
      if (ALL_TOKEN_GROUPS.includes(what)) {
        // Check for a group type of token
        ASSERT((tok_getType() & what) === what, 'Expected to parse a particular group type of token', what);
      } else {
        ASSERT(ALL_TOKEN_TYPES.includes(what), 'token types are a fixed set', what);
        ASSERT(hasAllFlags(tok_getType(), what), 'expecting to skip token with certain type');
      }
    }
    skipRex(lexerFlags);
  }
  function ASSERT_skipDiv(what, lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a division punctuator
    ASSERT(arguments.length === 2, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof what === 'number' || typeof what === 'string', 'what number/string');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set or propagated inside the parser');
    if (typeof what === 'string') {
      ASSERT(tok_sliceInput(tok_getStart(), tok_getStop()) === what, 'expecting to skip token with certain value');
    } else {
      if (ALL_TOKEN_GROUPS.includes(what)) {
        // Check for a group type of token
        ASSERT((tok_getType() & what) === what, 'Expected to parse a particular group type of token', what);
      } else {
        ASSERT(ALL_TOKEN_TYPES.includes(what), 'token types are a fixed set', what);
        ASSERT(hasAllFlags(tok_getType(), what), 'expecting to skip token with certain type');
      }
    }
    skipDiv(lexerFlags);
  }
  function ASSERT_skipAny(what, lexerFlags) {
    ASSERT(ASSERT_skipAny.length === arguments.length, 'arg count to ASSERT_skipAny', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof what === 'number' || typeof what === 'string', 'what number/string');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set or propagated inside the parser');
    if (typeof what === 'string') {
      ASSERT(tok_sliceInput(tok_getStart(), tok_getStop()) === what, 'expecting to skip token with certain value', 'expected:', what, 'current token:', tok_sliceInput(tok_getStart(), tok_getStop()));
    } else {
      if (ALL_TOKEN_GROUPS.includes(what)) {
        // Check for a group type of token
        ASSERT((tok_getType() & what) === what, 'Expected to parse a particular group type of token', what);
      } else {
        ASSERT(ALL_TOKEN_TYPES.includes(what), 'token types are a fixed set', what);
        ASSERT(hasAllFlags(tok_getType(), what), 'expecting to skip token with certain type');
      }
    }
    skipAny(lexerFlags);
  }

  function ASSERT_skipToParenOpenOrDie(what, lexerFlags) {
    skipToParenOpenOrDie(lexerFlags);
  }
  function skipToParenOpenOrDie(lexerFlags) {
    // The next token must be a paren
    skipAny(lexerFlags);
    if (tok_getType() !== $PUNC_PAREN_OPEN) {
      return THROW_RANGE('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToCurlyOpenOrDie(what, lexerFlags) {
    skipToCurlyOpenOrDie(lexerFlags);
  }
  function skipToCurlyOpenOrDie(lexerFlags) {
    // The next token must be a curly, possibly preceded by some whitespace
    // If it's not a curly then it falls back to the regular lexer. This function will validate the string afterwards.
    skipAny(lexerFlags);
    if (tok_getType() !== $PUNC_CURLY_OPEN) {
      return THROW_RANGE('Expected to parse an opening curly, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToFromOrDie(what, lexerFlags) {
    skipToFromOrDie(lexerFlags);
  }
  function skipToFromOrDie(lexerFlags) {
    // The next token must be the ident "from"
    skipAny(lexerFlags);

    if (tok_getType() !== $ID_from) {
      return THROW_RANGE('Next token should be the ident `from` but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToStringOrDie(what, lexerFlags) {
    skipToStringOrDie(lexerFlags);
  }
  function skipToStringOrDie(lexerFlags) {
    // The next token must be a string
    skipAny(lexerFlags);
    if (!isStringToken(tok_getType())) {
      return THROW_RANGE('Next token should be a string but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToIdentOrDie(what, lexerFlags) {
    skipToIdentOrDie(lexerFlags);
  }
  function skipToIdentOrDie(lexerFlags) {
    // The next token must be a string
    skipAny(lexerFlags);
    if (!isIdentToken(tok_getType())) {
      return THROW_RANGE('Next token should be an ident but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToArrowOrDie(what, lexerFlags) {
    skipToArrowOrDie(lexerFlags);
  }
  function skipToArrowOrDie(lexerFlags) {
    // Next token must be an arrow
    skipAny(lexerFlags);
    if (tok_getType() !== $PUNC_EQ_GT) {
      return THROW_RANGE('Next token should be `=>` but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToAsCommaCurlyClose(what, lexerFlags) {
    skipToAsCommaCurlyClose(lexerFlags);
  }
  function skipToAsCommaCurlyClose(lexerFlags) {
    // Next token must be `as`, comma, or `}`
    skipAny(lexerFlags);
    ASSERT_VALID(tok_getType() === $ID_as || tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_CURLY_CLOSE, 'limited options, wanted `as` , }');
  }
  function ASSERT_skipToAsCommaFrom(what, lexerFlags) {
    skipToAsCommaFrom(lexerFlags);
  }
  function skipToAsCommaFrom(lexerFlags) {
    // Next token must be `as`, with some whitespace
    skipAny(lexerFlags);
    ASSERT_VALID(tok_getType() === $ID_as || tok_getType() === $ID_from || tok_getType() === $PUNC_COMMA, 'limited options, expecting `as` `from` comma');
  }
  function ASSERT_skipToColonOrDie(what, lexerFlags) {
    skipToColonOrDie(lexerFlags);
  }
  function skipToColonOrDie(lexerFlags) {
    // Next token must be `:`, with possibly some whitespace
    skipAny(lexerFlags);
    if (tok_getType() !== $PUNC_COLON) {
      return THROW_RANGE('Next token should be `:` but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToTargetOrDie(what, lexerFlags) {
    skipToTargetOrDie(lexerFlags);
  }
  function skipToTargetOrDie(lexerFlags) {
    // Next token must be `target`, with unlikely some whitespace
    skipAny(lexerFlags);
    if (tok_getType() !== $ID_target) {
      return THROW_RANGE('Next token should be `target` but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
  }
  function ASSERT_skipToStatementStart(what, lexerFlags) {
    skipToStatementStart(lexerFlags);
  }
  function skipToStatementStart(lexerFlags) {
    // Next token must start a statement
    skipRex(lexerFlags);
    // No validation. Too expensive. Instead trust that the fallback scanner will still work. This is just a hint.

    // Note: this assumes the statement header is followed by a sub-statement. This is not true for `do-while`. However
    // for that case what follows is either a new statement or the end of a block. So it should still parse the same.

    // Note: this is the assertion from expressionStart + semi and closing curly
    ASSERT_VALID(
      isIdentToken(tok_getType()) ||
      isStringToken(tok_getType()) ||
      isTemplateStart(tok_getType()) ||
      isNumberToken(tok_getType()) ||
      isRegexToken(tok_getType()) ||
      tok_getType() === $PUNC_EXCL ||
      tok_getType() === $PUNC_BRACKET_OPEN ||
      tok_getType() === $PUNC_CURLY_OPEN ||
      tok_getType() === $PUNC_PAREN_OPEN ||
      tok_getType() === $PUNC_PLUS ||
      tok_getType() === $PUNC_MIN ||
      tok_getType() === $PUNC_PLUS_PLUS ||
      tok_getType() === $PUNC_MIN_MIN ||
      tok_getType() === $PUNC_TILDE ||
      tok_getType() === $PUNC_SEMI ||
      tok_getType() === $PUNC_CURLY_CLOSE ||
      tok_getType() === $EOF || // do-while at at eof. do while is not a problem otherwise... (I think)
      false, 'expecting the start of a statement, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToExpressionStart(what, lexerFlags) {
    ASSERT(typeof lexerFlags === 'number');
    skipToExpressionStart(lexerFlags);
  }
  function skipToExpressionStart(lexerFlags) {
    // Next token must start an expression
    skipRex(lexerFlags);
    // No validation. Too expensive. Instead trust that the fallback scanner will still work. This is just a hint.
    ASSERT_VALID(
      isIdentToken(tok_getType()) ||
      isStringToken(tok_getType()) ||
      isTemplateStart(tok_getType()) ||
      isNumberToken(tok_getType()) ||
      isRegexToken(tok_getType()) ||
      tok_getType() === $PUNC_EXCL ||
      tok_getType() === $PUNC_BRACKET_OPEN ||
      tok_getType() === $PUNC_CURLY_OPEN ||
      tok_getType() === $PUNC_PAREN_OPEN ||
      tok_getType() === $PUNC_PLUS ||
      tok_getType() === $PUNC_MIN ||
      tok_getType() === $PUNC_PLUS_PLUS ||
      tok_getType() === $PUNC_MIN_MIN ||
      tok_getType() === $PUNC_TILDE ||
      tok_getType() === $PUNC_DOT_DOT_DOT ||
      false, 'expecting the start of an expression, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToExpressionStartGrouped(what, lexerFlags) {
    ASSERT(typeof lexerFlags === 'number');
    skipToExpressionStartGrouped(lexerFlags);
  }
  function skipToExpressionStartGrouped(lexerFlags) {
    // Next token must start an expression or `)`
    skipRex(lexerFlags);
    // No validation. Too expensive. Instead trust that the fallback scanner will still work. This is just a hint.
    ASSERT_VALID(
      isIdentToken(tok_getType()) ||
      isStringToken(tok_getType()) ||
      isTemplateStart(tok_getType()) ||
      isNumberToken(tok_getType()) ||
      isRegexToken(tok_getType()) ||
      tok_getType() === $PUNC_EXCL ||
      tok_getType() === $PUNC_BRACKET_OPEN ||
      tok_getType() === $PUNC_CURLY_OPEN ||
      tok_getType() === $PUNC_PAREN_OPEN ||
      tok_getType() === $PUNC_PLUS ||
      tok_getType() === $PUNC_MIN ||
      tok_getType() === $PUNC_PLUS_PLUS ||
      tok_getType() === $PUNC_MIN_MIN ||
      tok_getType() === $PUNC_TILDE ||
      tok_getType() === $PUNC_DOT_DOT_DOT ||
      tok_getType() === $PUNC_PAREN_CLOSE ||
      false, 'expecting the start of an expression or `)`, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToExpressionStartSemi(what, lexerFlags) {
    ASSERT(typeof lexerFlags === 'number');
    skipToExpressionStartSemi(lexerFlags);
  }
  function skipToExpressionStartSemi(lexerFlags) {
    // Next token must start an expression or `;`
    skipRex(lexerFlags);
    // No validation. Too expensive. Instead trust that the fallback scanner will still work. This is just a hint.
    ASSERT_VALID(
      isIdentToken(tok_getType()) ||
      isStringToken(tok_getType()) ||
      isTemplateStart(tok_getType()) ||
      isNumberToken(tok_getType()) ||
      isRegexToken(tok_getType()) ||
      tok_getType() === $PUNC_EXCL ||
      tok_getType() === $PUNC_BRACKET_OPEN ||
      tok_getType() === $PUNC_CURLY_OPEN ||
      tok_getType() === $PUNC_PAREN_OPEN ||
      tok_getType() === $PUNC_PLUS ||
      tok_getType() === $PUNC_MIN ||
      tok_getType() === $PUNC_PLUS_PLUS ||
      tok_getType() === $PUNC_MIN_MIN ||
      tok_getType() === $PUNC_TILDE ||
      tok_getType() === $PUNC_DOT_DOT_DOT ||
      tok_getType() === $PUNC_SEMI ||
      false, 'expecting the start of an expression or `;`, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToExpressionStartSquareCloseComma(what, lexerFlags) {
    ASSERT(typeof lexerFlags === 'number');
    skipToExpressionStartSquareCloseComma(lexerFlags);
  }
  function skipToExpressionStartSquareCloseComma(lexerFlags) {
    // Next token must start an expression or `]` or `,`
    skipRex(lexerFlags);
    // No validation. Too expensive. Instead trust that the fallback scanner will still work. This is just a hint.
    ASSERT_VALID(
      isIdentToken(tok_getType()) ||
      isStringToken(tok_getType()) ||
      isTemplateStart(tok_getType()) ||
      isNumberToken(tok_getType()) ||
      isRegexToken(tok_getType()) ||
      tok_getType() === $PUNC_EXCL ||
      tok_getType() === $PUNC_BRACKET_OPEN ||
      tok_getType() === $PUNC_CURLY_OPEN ||
      tok_getType() === $PUNC_PAREN_OPEN ||
      tok_getType() === $PUNC_PLUS ||
      tok_getType() === $PUNC_MIN ||
      tok_getType() === $PUNC_PLUS_PLUS ||
      tok_getType() === $PUNC_MIN_MIN ||
      tok_getType() === $PUNC_TILDE ||
      tok_getType() === $PUNC_DOT_DOT_DOT ||
      tok_getType() === $PUNC_COMMA ||
      tok_getType() === $PUNC_BRACKET_CLOSE ||
      false, 'expecting the start of an expression or `,` or `]`, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToAfterNew(what, lexerFlags) {
    ASSERT(typeof lexerFlags === 'number');
    skipToAfterNew(lexerFlags);
  }
  function skipToAfterNew(lexerFlags) {
    // Next token must start an expression or `.` (for `new.target`)
    // (Note that the expressionStart lexer will check for `...` and `.` so we can just use that)
    skipRex(lexerFlags);
    // No validation. Too expensive. Instead trust that the fallback scanner will still work. This is just a hint.
    ASSERT_VALID(
      isIdentToken(tok_getType()) ||
      isStringToken(tok_getType()) ||
      isTemplateStart(tok_getType()) ||
      isNumberToken(tok_getType()) ||
      isRegexToken(tok_getType()) ||
      tok_getType() === $PUNC_EXCL ||
      tok_getType() === $PUNC_BRACKET_OPEN ||
      tok_getType() === $PUNC_CURLY_OPEN ||
      tok_getType() === $PUNC_PAREN_OPEN ||
      tok_getType() === $PUNC_PLUS ||
      tok_getType() === $PUNC_MIN ||
      tok_getType() === $PUNC_PLUS_PLUS ||
      tok_getType() === $PUNC_MIN_MIN ||
      tok_getType() === $PUNC_TILDE ||
      tok_getType() === $PUNC_DOT_DOT_DOT || // should lead to an error, but the lexer can certainly return it
      tok_getType() === $PUNC_DOT ||
      false, 'expecting the start of an expression or `.`, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToSwitchBody(what, lexerFlags) {
    skipToSwitchBody(lexerFlags);
  }
  function skipToSwitchBody(lexerFlags) {
    // Next token must be `case`, `default`, or `}`, with likely some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID(tok_getType() === $ID_case || tok_getType() === $ID_default || tok_getType() === $PUNC_CURLY_CLOSE, 'not many options, wanted case default }');
  }
  function ASSERT_skipToBindingStart(what, lexerFlags) {
    skipToBindingStart(lexerFlags);
  }
  function skipToBindingStart(lexerFlags) {
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID(isIdentToken(tok_getType()) || tok_getType() === $PUNC_BRACKET_OPEN || tok_getType() === $PUNC_CURLY_OPEN || tok_getType() === $PUNC_DOT_DOT_DOT, 'not many options, wanted ident ... [ {');
  }
  function ASSERT_skipToBindingStartGrouped(what, lexerFlags) {
    skipToBindingStartGrouped(lexerFlags);
  }
  function skipToBindingStartGrouped(lexerFlags) {
    // Same as bindingStart but it may also encounter a closing parenthesis (params)
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID(isIdentToken(tok_getType()) || tok_getType() === $PUNC_BRACKET_OPEN || tok_getType() === $PUNC_CURLY_OPEN || tok_getType() === $PUNC_DOT_DOT_DOT || tok_getType() === $PUNC_PAREN_CLOSE, 'not many options, wanted ident ... [ { )');
  }
  function ASSERT_skipToColonParenOpen(what, lexerFlags) {
    skipToColonParenOpen(lexerFlags);
  }
  function skipToColonParenOpen(lexerFlags) {
    // Next token must be `:`, or `(`, with unlikely some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( tok_getType() === $PUNC_COLON || tok_getType() === $PUNC_PAREN_OPEN, 'not many options, wanted : (');
  }
  function ASSERT_skipToIdentParenOpen(what, lexerFlags) {
    skipToIdentParenOpen(lexerFlags);
  }
  function skipToIdentParenOpen(lexerFlags) {
    // Next token must be ident, or `(`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_PAREN_OPEN, 'not many options, wanted ident (');
  }
  function ASSERT_skipToIdentStarParenOpen(what, lexerFlags) {
    skipToIdentStarParenOpen(lexerFlags);
  }
  function skipToIdentStarParenOpen(lexerFlags) {
    // Next token must be ident, `*`, or `(`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_STAR || tok_getType() === $PUNC_PAREN_OPEN, 'not many options, wanted ident * (');
  }
  function ASSERT_skipToIdentStarCurlyOpen(what, lexerFlags) {
    skipToIdentStarCurlyOpen(lexerFlags);
  }
  function skipToIdentStarCurlyOpen(lexerFlags) {
    // Next token must be ident, `*`, or `{`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_STAR || tok_getType() === $PUNC_CURLY_OPEN, 'not many options, wanted ident * {');
  }
  function ASSERT_skipToIdentCurlyOpen(what, lexerFlags) {
    skipToIdentCurlyOpen(lexerFlags);
  }
  function skipToIdentCurlyOpen(lexerFlags) {
    // Next token must be ident, or `{`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_CURLY_OPEN, 'not many options, wanted ident {');
  }
  function ASSERT_skipToIdentCurlyClose(what, lexerFlags) {
    skipToIdentCurlyClose(lexerFlags);
  }
  function skipToIdentCurlyClose(lexerFlags) {
    // Next token must be ident, or `}`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_CURLY_CLOSE, 'not many options, wanted ident }');
  }
  function ASSERT_skipToIdentStarCurlyOpenParenOpenString(what, lexerFlags) {
    skipToIdentStarCurlyOpenParenOpenString(lexerFlags);
  }
  function skipToIdentStarCurlyOpenParenOpenString(lexerFlags) {
    // Next token is whatever is valid after the `import` keyword (ident, star, curly open, string, or paren open)
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_STAR || tok_getType() === $PUNC_CURLY_OPEN || tok_getType() === $PUNC_PAREN_OPEN || isStringToken(tok_getType()), 'not many options, wanted ident string * { (');
  }
  function ASSERT_skipToAwaitParenOpen(what, lexerFlags) {
    skipToAwaitParenOpen(lexerFlags);
  }
  function skipToAwaitParenOpen(lexerFlags) {
    // Next token must be `await`, or `(`. For example, after the `for` keyword
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(tok_getType()) || tok_getType() === $PUNC_PAREN_OPEN, 'not many options, wanted ident (');
  }
  function ASSERT_skipToIdentStringNumberSquareOpen(what, lexerFlags) {
    skipToIdentStringNumberSquareOpen(lexerFlags);
  }
  function skipToIdentStringNumberSquareOpen(lexerFlags) {
    // Token after the star of an object/class method shorthand
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    // Note: big int is okay here...
    ASSERT_VALID( isIdentToken(tok_getType()) || isStringToken(tok_getType()) || isNumberToken(tok_getType()) || tok_getType() === $PUNC_BRACKET_OPEN, 'not many options, wanted ident number string [');
  }

  function skipIdentSafeSlowAndExpensive(lexerFlags, leftHandSideExpression) {
    ASSERT(skipIdentSafeSlowAndExpensive.length === arguments.length, 'arg count');
    // skip an IDENT that may be a keyword
    // this can be done efficiently but in destructuring there are too many signals and so this needs to be done before
    // processing the ident for special cases that normally determine whether the next token is a div, regex, or any
    // this check is relatively slow but there's a plan to make these enums, which would improve things

    switch (tok_getType()) {
      case $ID_delete:
      case $ID_typeof:
      case $ID_void:
        if (leftHandSideExpression === ONLY_LHSE) {
          return THROW_RANGE('A unary expression is not allowed here', tok_getStart(), tok_getStop());
        }
        // These are keywords that wrap expressions which start with regexes
        ASSERT_skipToExpressionStart($G_IDENT, lexerFlags);
        return;
      case $ID_new:
        // Wraps expressions which start with regexes
        // And `new` is also a LeftHandSide expression so no error for that
        ASSERT_skipToAfterNew($ID_new, lexerFlags);
        return;
      case $ID_await:
        if (goalMode === GOAL_MODULE || hasAnyFlag(lexerFlags, LF_IN_ASYNC)) {
          if (leftHandSideExpression === ONLY_LHSE) {
            return THROW_RANGE('An `await` expression is not allowed here', tok_getStart(), tok_getStop());
          }
          ASSERT_skipToExpressionStart($G_IDENT, lexerFlags);
          return;
        }
        ASSERT_skipDiv($ID_await, lexerFlags);
        return MIGHT_DESTRUCT;
      case $ID_yield:
        if (hasAnyFlag(lexerFlags, LF_IN_GENERATOR | LF_STRICT_MODE)) {
          if (leftHandSideExpression === ONLY_LHSE) {
            return THROW_RANGE('A `yield` expression is not allowed here', tok_getStart(), tok_getStop());
          }
          ASSERT_skipRex($G_IDENT, lexerFlags); // Next is expr start or `*` or asi-continuation
          return;
        }
        ASSERT_skipDiv($ID_yield, lexerFlags);
        return;
    }

    ASSERT_skipDiv($G_IDENT, lexerFlags);
  }

  function parseTopLevels(lexerFlags) {
    let scoop = SCOPE_createGlobal('_parseTopLevels');
    if (options_exposeScopes) AST_set('$scope', scoop);
    ASSERT(scoop._ = 'root scope'); // debug
    let exportedNames = new Set; // how other modules refer to something
    ASSERT(exportedNames._ = 'exported names');
    ASSERT(exportedNames._i = ++uid_counter);
    let exportedBindings = new Set; // which binding an exported name refers to
    ASSERT(exportedBindings._ = 'exported bindings');
    ASSERT(exportedBindings._i = ++uid_counter);
    // <SCRUB AST>
    let len;
    ASSERT(!void(len = _path.length));
    let bak ;
    ASSERT(!void(bak = _path.slice(0)));
    // </SCRUB AST>
    parseBodyPartsWithDirectives(lexerFlags, scoop, exportedNames, exportedBindings, PARAMS_ALL_SIMPLE, NO_DUPE_PARAMS, NO_DUPE_PARAMS, $UNTYPED, 0, 0, '', IS_GLOBAL_TOPLEVEL, 'body');

    // <SCRUB AST>
    ASSERT(_path.length === len, 'should close all that was opened. Open before: ' + bak.map(o=>o.type).join(' > ') + ', open after: ' + _path.map(o=>o.type).join(' > '));
    // </SCRUB AST>
    if (goalMode === GOAL_MODULE) {
      let globalNames = scoop.names;
      // assert that all exported symbols were in fact recorded
      exportedBindings.forEach(name => {
        if (name !== 'default' && (globalNames === HAS_NO_BINDINGS || !globalNames.has(name))) {
          return THROW_RANGE('Exporting a name that was not bound in global: `' + name + '`', tok_getStart(), tok_getStop());
        }
      });
    }
  }

  function SCOPE_createGlobal(desc) {
    // A map of  variable names and a value for the type of binding they were recorded
    // - var (can not shadow a lex binding)
    // - lex (--> let, const, class, import, export) (can not coexist with another lex/var binding of same name)
    // - function decl let (top-level module goal, deals with edge case)
    // - function decl var (top-level script goal, deals with edge case)
    // - catch clause (can not be shadowed in catch body)
    // - param name (can not be shadowed by lex in func toplevel body)

    // while this comment probably gets lost, the name is `scoop` for greppability since `scope` is too generic
    let scoop = {
      type: SCOPE_LAYER_GLOBAL,
      names: HAS_NO_BINDINGS, // Map (when necessary)
      dupeParamErrorStart: NO_DUPE_PARAMS, // 0 means "none", otherwise it's the linear (offset + 1) of the token, a value that is only used for reporting an error anyways
      dupeParamErrorStop: NO_DUPE_PARAMS, // (offset 0)
      parent: null,
    };

    ASSERT(scoop._type = S(SCOPE_LAYER_GLOBAL), '(debugging)');
    ASSERT(scoop.isScope = true, '(debugging)');
    ASSERT(scoop._ = desc + '_scope', '(debugging)');
    if (astUids) scoop.$uid = uid_counter++;
    return scoop;
  }
  function SCOPE_addLayer(scoop, scopeType, desc) {
    ASSERT(SCOPE_addLayer.length === arguments.length, 'arg count');
    ASSERT(typeof desc === 'string', 'desc debug is string', desc);
    ASSERT([SCOPE_LAYER_GLOBAL, SCOPE_LAYER_FOR_HEADER, SCOPE_LAYER_BLOCK, SCOPE_LAYER_FUNC_PARAMS, SCOPE_LAYER_ARROW_PARAMS, SCOPE_LAYER_CATCH_HEAD, SCOPE_LAYER_CATCH_BODY, SCOPE_LAYER_FINALLY, SCOPE_LAYER_SWITCH, SCOPE_LAYER_FUNC_ROOT, SCOPE_LAYER_FUNC_BODY, SCOPE_LAYER_FAKE_BLOCK].includes(scopeType), 'scopeType enum', scopeType);
    ASSERT(scoop === DO_NOT_BIND || scoop.isScope, 'expecting scoop', scoop);

    let scoopNew = {
      type: scopeType,
      names: HAS_NO_BINDINGS, // Map (when necessary)
      // For arrows, dupe params can only be checked when seeing the arrow. `([a,a]);` is fine.
      // For function declarations in sloppy, this can only be validated once the inner directives are parsed
      dupeParamErrorStart: NO_DUPE_PARAMS, // 0 means "none", otherwise it's the linear (offset + 1) of the token, a value that is only used for reporting an error anyways
      dupeParamErrorStop: NO_DUPE_PARAMS, // 0 means "none", otherwise it's the linear (offset + 1) of the token, a value that is only used for reporting an error anyways
      parent: scoop,
    };
    ASSERT(scoopNew._type = S(scopeType), '(debugging)');
    ASSERT(scoopNew.isScope = true, '(debugging)');
    ASSERT(scoopNew._desc = desc + '.scope', '(debugging)');
    if (astUids) scoop.$uid = uid_counter++;
    return scoopNew;
  }
  function SCOPE_addFuncDeclName(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, fdState) {
    ASSERT(SCOPE_addFuncDeclName.length === arguments.length, 'arg count');
    ASSERT([BINDING_TYPE_FUNC_VAR, BINDING_TYPE_FUNC_LEX, BINDING_TYPE_FUNC_STMT].includes(bindingType), 'either a func lex or var', bindingType);
    ASSERT(scoop === DO_NOT_BIND || scoop.isScope, 'expecting scoop', scoop);
    ASSERT(scoop === DO_NOT_BIND || scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names, it must be a Map');
    ASSERT_FDS(fdState);
    ASSERT(fdState !== FDS_ILLEGAL, 'This would be an error and should be caught elsewhere...');

    // Function decls are lexical bound, except
    // - in script-goal (!) global root, and
    // - in any-goal function scope root

    // https://tc39.github.io/ecma262/#sec-block-static-semantics-toplevellexicallydeclarednames
    // > At the top level of a function, or script, function declarations are treated like var declarations rather than like lexical declarations.
    // Note that this isn't at the top and that makes a difference

    // https://tc39.github.io/ecma262/#sec-module-semantics-static-semantics-lexicallydeclarednames
    // > At the top level of a Module, function declarations are treated like lexical declarations rather than like var declarations.
    // Note that this isn't at the top and that makes a difference

    // https://tc39.github.io/ecma262/#sec-function-definitions-static-semantics-lexicallydeclarednames
    // this shows how func decls dont end up in the lex scope (TopLevelLexicallyDeclaredNames...)

    // https://tc39.es/ecma262/#sec-scripts-static-semantics-lexicallydeclarednames
    // > At the top level of a `Script`, function declarations are treated like var declarations rather than like lexical declarations

    // The above comes down to the following; a func decl is a `var` if it's directly in a scope and if that is
    // either a function scope or the goal is script. Otherwise it is to be considered a lexical (let) binding.
    // This includes function statements, they are always lexical. Additionally, the name of a func decl in a label
    // does not propagate up in any context where it is allowed and when nested in `if` or `else` it's considered to
    // be wrapped in a block. So neither legit function propagates to the parent of the statement that encloses it.

    ASSERT((bindingType === BINDING_TYPE_FUNC_VAR) === (fdState === FDS_VAR && (hasNoFlag(lexerFlags, LF_IN_GLOBAL) || goalMode === GOAL_SCRIPT)), 'redundancy?');

    if (bindingType === BINDING_TYPE_FUNC_VAR) {
      SCOPE_addVarBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType);
    } else {
      SCOPE_addLexBinding(scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, fdState);
    }
  }
  function SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType) {
    ASSERT(SCOPE_actuallyAddBinding.length === arguments.length, 'arg count');
    ASSERT(typeof $tp_bindingIdent_canon === 'string', 'name is a string');
    ASSERT(scoop === DO_NOT_BIND || scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names, it must be a Map', scoop.names);
    ASSERT_BINDING_TYPE(bindingType);

    if (bindingType === BINDING_TYPE_VAR || bindingType === BINDING_TYPE_FUNC_VAR) {
      SCOPE_addVarBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType);
    }
    else {
      // TODO: arg?
      // TODO: is fdState ever relevant when parsing a binding here?
      SCOPE_addLexBinding(scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, FDS_ILLEGAL);
    }
  }
  function SCOPE_addVarBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType) {
    ASSERT(SCOPE_addVarBinding.length === arguments.length, 'arg count');
    ASSERT(typeof $tp_bindingIdent_canon === 'string', 'name = string', $tp_bindingIdent_canon);
    ASSERT(scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names, it must be a Map');
    ASSERT(bindingType === BINDING_TYPE_VAR || bindingType === BINDING_TYPE_FUNC_VAR, 'explicitly checked at call sites'); // TODO: apply this logic and eliminate any checks for other values than these two
    ASSERT(scoop !== DO_NOT_BIND, 'there is no path that leads here where scoop does not exist (only happens for lex)');

    // See details of specific catch var exceptions in the catch parser (they are tricky)

    // Must throw an error for
    // - a var decl on the same statement level as a lexical decl of same name
    // - a var decl that is on a deeper statement level than a lexical decl of same name, stops at func boundaries
    // - a lexical binding from a `for`-header (of any kind) which also appears as a `var` inside the statement
    // - a catch clause binding that also appears as a lexical binding directly on the block, or var anywhere inside the block
    //   - in web compat mode, this rule does not apply when the clause is a simple identifier
    //     - in web compat <es10, this exception only applies when bound through a `var` when not in a `for-of`
    // - a function param name that also appears as a lexical binding directly at the top of that function
    //
    // Lexical edge cases to take into account;
    // - function declaration
    //   - module goal global is lexical
    //   - script goal global is var
    //   - inside function scope is var
    //   - inside block is lexical
    //   - inside if is lexical, as if wrapped inside a block
    //   - inside label is lexical
    //     - in script global or function scope it does not propagate outside the label
    //     - in all other contexts it propagates to label level of lex bound names
    // - import/export bindings that are not explicitly `var` bindings, are lexical to the global

    // A lexical declaration is only allowed in a global, function, block, or switch context:
    //   https://tc39.es/ecma262/#sec-scripts-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the LexicallyDeclaredNames of ScriptBody also occurs in the VarDeclaredNames of ScriptBody.
    //   https://tc39.es/ecma262/#sec-function-definitions-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the LexicallyDeclaredNames of ModuleItemList also occurs in the VarDeclaredNames of ModuleItemList.
    //   https://tc39.es/ecma262/#sec-block-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the LexicallyDeclaredNames of FunctionStatementList also occurs in the VarDeclaredNames of FunctionStatementList.
    //   https://tc39.es/ecma262/#sec-module-semantics-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the LexicallyDeclaredNames of StatementList also occurs in the VarDeclaredNames of StatementList.
    //   https://tc39.es/ecma262/#sec-switch-statement-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the LexicallyDeclaredNames of CaseBlock also occurs in the VarDeclaredNames of CaseBlock.
    //   (Or a function statement in Annex B)

    // There are some special rules for the `for` header bindings and `catch` clause bindings:
    //   https://tc39.github.io/ecma262/#sec-for-statement-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the BoundNames of LexicalDeclaration also occurs in the VarDeclaredNames of Statement.
    //   So, `for (let x;;) { let x }` is okay while `for (let x;;) { var x }` is not
    //   TODO: in addition, the `for (let x;;) for (var x;;);` vs `for (let x;;) for (let x;;);` edge case...
    //   However,
    //   https://tc39.github.io/ecma262/#sec-try-statement-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the LexicallyDeclaredNames of Block.
    //   > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the VarDeclaredNames of Block.
    //   So in this case, `try {} catch (x) { let x }` and `try {} catch (x) { var x }` are BOTH bad
    //   But similarly, `try {} catch (x) { { let x } }` is fine while `try {} catch (x) { { var x } }` remains illegal

    // Then there are some rules regarding the function params:
    //   https://tc39.es/ecma262/#sec-function-definitions-static-semantics-early-errors
    //   https://tc39.es/ecma262/#sec-arrow-function-definitions-static-semantics-early-errors
    //   https://tc39.es/ecma262/#sec-method-definitions-static-semantics-early-errors
    //   > It is a Syntax Error if any element of the BoundNames of FormalParameters also occurs in the LexicallyDeclaredNames of <FunctionBody>.
    //   So this only applies the rule from param name to lexical bindings immediately in the function scope (not nested)
    //   `function f(x) { let x }` is an error while `function f(x) { var x }` and `function f(x) { { let x } }` are not

    // (This will be a bit annoying for arrows since for them we can't throw for this rule until we see the `=>` token)

    // But what constitutes the "LexicallyDeclaredNames"? Ah, well:
    // tldr; pretty much "what makes sense to block scoping", plus
    //   - a "labelled function statement" is itself also considered a lexical declaration of that name
    //   - slightly different rules for script and module goal globals (only affects function declarations and imports/exports)
    //
    //   https://tc39.es/ecma262/#sec-block-static-semantics-lexicallydeclarednames
    //   In a block: only the declarations directly inside it, or any names from labelled statements. But an _empty_ list for anything else...
    //   https://tc39.es/ecma262/#sec-switch-statement-static-semantics-lexicallydeclarednames
    //   In a switch body, same rules as block
    //   https://tc39.es/ecma262/#sec-labelled-statements-static-semantics-lexicallydeclarednames
    //   In a labelled statement: the name of the function statement, or empty list for any other kind of statement (!!)
    //   https://tc39.es/ecma262/#sec-function-definitions-static-semantics-lexicallydeclarednames
    //   "TopLevelLexicallyDeclaredNames of StatementList"
    //   https://tc39.es/ecma262/#sec-arrow-function-definitions-static-semantics-lexicallydeclarednames
    //   https://tc39.es/ecma262/#sec-async-arrow-function-definitions-static-semantics-LexicallyDeclaredNames
    //   Arrow: empty list
    //   https://tc39.es/ecma262/#sec-scripts-static-semantics-lexicallydeclarednames
    //   script goal global: "TopLevelLexicallyDeclaredNames of StatementList.". Basically does NOT include top level function decls names
    //   https://tc39.es/ecma262/#sec-module-semantics-static-semantics-lexicallydeclarednames
    //   In module goal global: list of all top level statements, toplevel non-var declarations (including functions!), all non-var-decl exports, and all imports

    // In turn, "TopLevelLexicallyDeclaredNames" constitutes:
    // (only used in toplevel function scope or script goal toplevel)
    //
    //   https://tc39.es/ecma262/#sec-labelled-statements-static-semantics-toplevellexicallydeclarednames
    //   Labelled statement: empty list
    //   https://tc39.es/ecma262/#sec-block-static-semantics-toplevellexicallydeclarednames
    //   Block statement: if "HoistableDeclaration" (the four func decls) then their name, otherwise empty list
    //   So TopLevelLexicallyDeclaredNames really just returns all directly descending bindings that are not function declarations and does not recurse through anything.

    // As for function declarations being var or lex bindings; that depends:
    //   https://tc39.es/ecma262/#sec-scripts-static-semantics-lexicallydeclarednames
    //   > At the top level of a Script, function declarations are treated like var declarations rather than like lexical declarations.
    //   https://tc39.es/ecma262/#sec-module-semantics-static-semantics-lexicallydeclarednames
    //   > At the top level of a Module, function declarations are treated like lexical declarations rather than like var declarations.
    //   https://tc39.es/ecma262/#sec-block-static-semantics-toplevellexicallydeclarednames
    //   > At the top level of a function, or script, function declarations are treated like var declarations rather than like lexical declarations.
    //   https://tc39.es/ecma262/#sec-block-static-semantics-toplevelvardeclarednames
    //   > At the top level of a function or script, inner function declarations are treated like var declarations.
    //   So function decls are var decls in script goal global or top level to another function for any goal. In any
    //   other case it's considered a lex binding.

    // And while we're on it, VarDeclaredNames is as follows.
    // tldr; VarDeclaredNames works pretty much how you expect it to work (same as vars did in ES5)
    //
    //   https://tc39.es/ecma262/#sec-statement-semantics-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-if-statement-static-semantics-vardeclarednames
    //     Empty list for: `;`, expression statement, `continue`, `break`, `return`, `throw`, `debugger`
    //   https://tc39.es/ecma262/#sec-block-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-variable-statement-static-semantics-vardeclarednames
    //     Block returns a list of all vars of child-statements, but decls are ignored (and `var` is a statement)
    //   https://tc39.es/ecma262/#sec-if-statement-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-do-while-statement-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-while-statement-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-for-statement-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-with-statement-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-try-statement-static-semantics-vardeclarednames
    //     returns set of any sub-statements
    //   https://tc39.es/ecma262/#sec-for-in-and-for-of-statements-static-semantics-vardeclarednames
    //     if header has `var` decl then returns header decl + statement, otherwise statement only
    //   https://tc39.es/ecma262/#sec-switch-statement-static-semantics-vardeclarednames
    //     returns set of var decls from all cases/default in the switch
    //   https://tc39.es/ecma262/#sec-labelled-statements-static-semantics-vardeclarednames
    //     return set of statement, except when it is a function decl, then it's empty
    //   https://tc39.es/ecma262/#sec-arrow-function-definitions-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-async-arrow-function-definitions-static-semantics-VarDeclaredNames
    //     arrow: empty
    //   https://tc39.es/ecma262/#sec-function-definitions-static-semantics-vardeclarednames
    //   https://tc39.es/ecma262/#sec-scripts-static-semantics-vardeclarednames
    //     returns "TopLevelVarDeclaredNames of StatementList"
    //   https://tc39.es/ecma262/#sec-module-semantics-static-semantics-vardeclarednames
    //     return names from all statements, and any exported _var_ decls. all other exports are ignored here.

    // The rules are as follows:
    //   - Any lex decl in global scope can not have a binding of same name anywhere in that scope
    //   - Any lex decl in function scope can not have binding of same name in function, but fine in any outer scope
    //   - Any lex decl in block or switch has tricky dupe rules;
    //     - Can not have binding of any kind with same name on same level
    //     - Can not have var binding of same name, recursively, in any statement/decl of that block or switch-block
    //     - _Can_ have var binding of same name in outer scopes
    //     - Unaffected by lex binding of same name anywhere else
    //   - Any lex binding from inside the `for`-header can not also have a lexical binding directly in its statement
    //   - The catch binding is lex and may not appear as a var binding anywhere in the catch block, nor as a lex binding of that block
    //   - The param names are vars but considered dupes of lexical bindings on the toplevel of the same function
    //   - Function decls may be var or lex depending on their context, see above for rules

    // So `var x; { lex x }` is okay while `lex x { var x }` is not, `switch (a){ case a: var x; case b: lex x}` neither
    // Generically speaking, this means a lexical binding must not have a var declaration on the same statement level
    // or any sub-statement there (because you can't use a lex decl anywhere else but global, function, block, or
    // switch). However, this is not the lexicographical order since this rule can still apply to vars that appear
    // before the lex in source code order: `{ var x }; lex x` is an error (in any of the four cases) because the block
    // is a statement on the same level as the `let` and as such contributes to the variable declared names of block.

    // All rules stop propagation at function boundaries. Func params only apply inward, not outside of the function.

    // Concrete cases to check for:
    // TODO: add these test cases as a group somewhere
    // - `var x; var x`
    // - `var x; let x`
    // - `let x; let x`
    // - `let x; var x`
    // - `var x; { let x }`
    // - `let x; { var x }`
    // - `{ var x; } let x`
    // - `{ let x; } var x`
    // - `for (let x;;) { var x; }`
    // - `for (var x;;) { let x; }`
    // - `for (let x;;) { { var x; } }`
    // - `for (var x;;) { { let x; } }`
    // - `try {} catch (x) { let x }`
    // - `try {} catch (x) { var x }`
    // - `try {} catch (x) { { let x } }`
    // - `try {} catch (x) { { var x } }`
    // - `function f(x) { var x }`
    // - `function f(x) { let x }`
    // - `function f(x) { { var x } }`
    // - `function f(x) { { let x } }`
    // (These are basically five cases with four variations for each, the `for` case applies to all types of `for`)
    // Additionally, these can be wrapped in a function. This doesn't change the acceptance for any of these cases.

    // Scan the lex var path and apply the rules outlined above for each level.
    // If nothing throws, mark the var on the current lexvar level and move to the parent lexvar, rinse and repeat
    let currScoop = scoop;
    do {
      if (currScoop.names === HAS_NO_BINDINGS) {
        currScoop.names = new Map;
      } else if (currScoop.names.has($tp_bindingIdent_canon)) {
        let bindingType = currScoop.names.get($tp_bindingIdent_canon);
        verifyDuplicateVarBinding(lexerFlags, bindingType, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon);
      }
      currScoop.names.set($tp_bindingIdent_canon, bindingType);
      currScoop = currScoop.parent;
    } while (currScoop && currScoop.type !== SCOPE_LAYER_FUNC_ROOT);
  }
  function verifyDuplicateVarBinding(lexerFlags, value, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon) {
    switch (value) {
      case BINDING_TYPE_NONE: // This one is unused (almost by definition), filler to make a jump table start at 0
      case BINDING_TYPE_ARG:
      case BINDING_TYPE_VAR:
      case BINDING_TYPE_FUNC_VAR:
      case BINDING_TYPE_FUNC_STMT:
        return;
      case BINDING_TYPE_FUNC_LEX:
      case BINDING_TYPE_LET:
      case BINDING_TYPE_CONST:
      case BINDING_TYPE_CLASS:
        // There already was a binding of any kind with the same name on this statement level, or a variable declaration
        // of the same name in a statement that is a descendent of the current statement parent. This is the error.
        // https://tc39.es/ecma262/#sec-block-duplicates-allowed-static-semantics
        // https://tc39.es/ecma262/#sec-switch-duplicates-allowed-static-semantics
        // In web compat mode we can ignore errors when function statements cause dupe bindings when the binding
        // is only used for function declarations otherwise (so not another func statement!).
        return THROW_RANGE('Found a var binding that is duplicate of a lexical binding on the same or lower statement level', $tp_bindingIdent_start, $tp_bindingIdent_stop);
      case BINDING_TYPE_CATCH_OTHER:
        return THROW_RANGE('Can not create a binding for `' + $tp_bindingIdent_canon + '` because was already bound as a catch clause pattern binding', $tp_bindingIdent_start, $tp_bindingIdent_stop);
      case BINDING_TYPE_CATCH_IDENT:
        if (options_webCompat === WEB_COMPAT_OFF) {
          // Note: this exception is not strict mode gated
          // https://tc39.es/ecma262/#sec-variablestatements-in-catch-blocks
          // > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the VarDeclaredNames
          // > of Block unless CatchParameter is `CatchParameter: BindingIdentifier`.
          // Shadowing catch clause vars with regular vars is okay in web compat mode...
          return THROW_RANGE('Can not create a binding for `' + $tp_bindingIdent_canon + '` because was already bound as a catch clause binding', $tp_bindingIdent_start, $tp_bindingIdent_stop);
        }
        return;
    }
  }
  function SCOPE_addLexBinding(scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, fdState) {
    ASSERT(SCOPE_addLexBinding.length === arguments.length, 'arg count');
    ASSERT(scoop === DO_NOT_BIND || scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names then it must be a Map');
    ASSERT_BINDING_TYPE(bindingType);
    ASSERT(bindingType !== BINDING_TYPE_FUNC_VAR, 'cannot be var because the only path this way that can have _func_* explicitly checks this');
    ASSERT([BINDING_TYPE_FUNC_LEX, BINDING_TYPE_FUNC_STMT, BINDING_TYPE_ARG, BINDING_TYPE_LET, BINDING_TYPE_CONST, BINDING_TYPE_NONE, BINDING_TYPE_CATCH_IDENT, BINDING_TYPE_CATCH_OTHER, BINDING_TYPE_CLASS].includes(bindingType), 'this function is only called with a handful of binding types');

    // See comments in SCOPE_addVarBinding for excessive rule overview

    if (scoop === DO_NOT_BIND) {
      // for example: toplevel array, function expression, class expression
      // [v]: `[x = true] = y`
      // [v]: `foo([a, b] = arr);`
      // [v]: `x = class A {};`
      return;
    }

    // Scan the lexical records for any `catch` header record, have to scan all the way up to scope-root (func/glob)
    // for any such lexical records, confirm the current name does not appear in it, or throw. :'(
    let value = scoop.names === HAS_NO_BINDINGS || !scoop.names.has($tp_bindingIdent_canon) ? BINDING_TYPE_NONE : scoop.names.get($tp_bindingIdent_canon);
    if (value !== BINDING_TYPE_NONE) {
      if (bindingType === BINDING_TYPE_ARG) {
        // This is an error but we can't throw yet because we may be inside the not-yet-confirmed arrow header which
        // may still end up being a plain group.
        // [x]: `((x,x)) = 5`
        // [x]: `((x,x)) => 5`
        // [x]: `((x,x) => x)`
        // [v]: `((x,x))`
        scoop.dupeParamErrorStart = $tp_bindingIdent_start + 1; // offset 1
        scoop.dupeParamErrorStop = $tp_bindingIdent_stop;
      } else if (options_webCompat !== WEB_COMPAT_ON || value !== BINDING_TYPE_FUNC_LEX || fdState !== FDS_LEX) {
        return THROW_RANGE('Attempted to create a lexical binding for `' + $tp_bindingIdent_canon + '` but another binding already existed on the same level', $tp_bindingIdent_start, $tp_bindingIdent_stop);
      } else {
        // https://tc39.es/ecma262/#sec-block-duplicates-allowed-static-semantics
        // > It is a Syntax Error if the LexicallyDeclaredNames of StatementList contains any duplicate entries, unless the
        // > source code matching this production is not strict mode code and the duplicate entries are only bound by FunctionDeclarations.
        // (so only ignore sibling function decls in blocks or switches, in sloppy mode, not in script global nor function root)
        // [v]: `{ function f() {} ; function f() {} }`
      }
    }

    if (scoop.type === SCOPE_LAYER_FUNC_BODY && scoop.parent.names !== HAS_NO_BINDINGS && scoop.parent.names.has($tp_bindingIdent_canon)) {
      return THROW_RANGE('Cannot create lexical binding for `' + $tp_bindingIdent_canon + '` because it shadows a function parameter', $tp_bindingIdent_start, $tp_bindingIdent_stop);
    }

    if (scoop.type === SCOPE_LAYER_ARROW_PARAMS && value !== BINDING_TYPE_NONE && bindingType === BINDING_TYPE_ARG) {
      // [v]: ((x,x))
      // [x]: ((x,x) = x)
      // [x]: ((x,x) => x)
      scoop.dupeParamErrorStart = $tp_bindingIdent_start + 1; // offset 1
      scoop.dupeParamErrorStop = $tp_bindingIdent_stop;
    }

    // [x]: `try {} catch ([x, x]) {}`
    // [x]: `try {} catch (x) { let x; }`
    // [v]: `try {} catch (x) { try {} catch (x) {} }`
    // [v]: `try {} catch (x) { try {} catch (y) { let x } }`
    if (scoop.type === SCOPE_LAYER_CATCH_BODY) {
      // A lexical binding (or any var) in the catch block cannot be shadowing a catch clause binding
      ASSERT(scoop.parent && scoop.parent.type === SCOPE_LAYER_CATCH_HEAD, 'scoop body must have head as parent', scoop);
      let parentValue = scoop.parent.names === HAS_NO_BINDINGS || !scoop.parent.names.has($tp_bindingIdent_canon) ? BINDING_TYPE_NONE : scoop.parent.names.get($tp_bindingIdent_canon);
      if (parentValue === BINDING_TYPE_CATCH_IDENT || parentValue === BINDING_TYPE_CATCH_OTHER) {
        return THROW_RANGE('Can not create a lexical binding for `' + $tp_bindingIdent_canon + '` because it shadows a catch clause binding', $tp_bindingIdent_start, $tp_bindingIdent_stop);
      }
    }

    if (scoop.names === HAS_NO_BINDINGS) scoop.names = new Map;
    scoop.names.set($tp_bindingIdent_canon, bindingType);
  }

  function parseDirectivePrologues(lexerFlags, astProp) {
    ASSERT(arguments.length === parseDirectivePrologues.length, 'arg count');

    let hadUseStrict = false;
    let isStrict = hasAllFlags(lexerFlags, LF_STRICT_MODE);
    let hadOctal = false; // Edge case to guard against: `"x\077";"use strict";` is an error
    // note: there may be multiple (bogus or valid) directives...
    while (isStringToken(tok_getType())) {
      // we must first parse as usual to confirm this is an isolated string and not
      // something like `''.foo` or `'' + x`. We can't easily scan forward in this
      // case since asi is only applied when the next token would cause a syntax
      // error. There many tokens to check. However this is a fairly cold path since
      // this will almost never happen outside of "use strict" so perhaps a pervasive
      // scan here is not so bad... And let's face it; trivial cases are quickly found.

      let $tp_string_type = tok_getType();
      let $tp_string_line = tok_getLine();
      let $tp_string_column = tok_getColumn();
      let $tp_string_start = tok_getStart();
      let $tp_string_stop = tok_getStop();
      let $tp_string_canon = tok_getCanoN();

      ASSERT_skipDiv($G_STRING, lexerFlags); // statement start means div
      _AST_setLiteral(astProp, $tp_string_type, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, true);

      // Remember the next token. Do a regular parse. If the next token is still the same token then there was no tail
      // and we can assume ASI will happen.

      let $tp_next_start = tok_getStart();

      // Since this must be the start of a block, we only have to care about a semi in this case
      if (tok_getType() !== $PUNC_SEMI) {
        // [v]: `"use strict" + x`   (valid, but it's not strict mode)
        // [v]: `"use strict", x`  (valid, but it's not strict mode)
        // [v]: `"use strict" \n x`  (valid and strict mode)
        parseExpressionAfterLiteral(lexerFlags, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, astProp);
        if (tok_getType() !== $PUNC_SEMI) {
          // [v]: `"use strict" + x`   (valid, but it's not strict mode)
          parseExpressionFromOp(lexerFlags, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, NOT_ASSIGNABLE, astProp);
          if (tok_getType() === $PUNC_COMMA) {
            // [v]: `"use strict", x`  (valid, but it's not strict mode)
            _parseExpressions(lexerFlags, $tp_string_start, $tp_string_line, $tp_string_column, NOT_ASSIGNABLE, astProp);
          }
        }
      }

      if (tok_getStart() === $tp_next_start) {
        // There was no tail, no op, no comma, so this was ASI, I hope. Or an error.
        // This is a directive. It may be nonsense, but it's a string in the head so it's a directive.

        let dir = tok_sliceInput($tp_string_start + 1, $tp_string_stop - 1)

        // Check all directives for octals because strict mode may be enabled by a directive later in the same block
        // and that would still cause a previous sibling directive with octal escape to be an error.
        if (!isStrict && /(^|[^\\])(\\\\)*\\(?:0\d|[1-9])/.test(dir)) {
          // We can't really validate this with a regex. And yet, here we are :'(
          // [v]: `"x\\0"`
          // [x]: `"x\\0"; "use strict";`
          // [v]: `"x\\\\0"; "use strict";`
          hadOctal = true;
        }

        if (dir === 'use strict') {
          hadUseStrict = true;
          lexerFlags = lexerFlags | LF_STRICT_MODE;

          // There is one problem now; our newfound knowledge about strict mode was not applied while parsing what is
          // the current token. We couldn't, yet, because the directive would not have been a directive if it was not
          // followed by a semi or asi.
          // This means that token that is strict mode sensitive may have been parsed without strict mode flag, even
          // though this should have been set.
          // I've identified three cases:
          // - legacy octal literals
          //    - this can be caught now by checking the tok_getType()
          // - octal escapes in string literals
          //    - the string literal can be scanned ... this is kind of dirty. ideally we'd pass a new flag but that's a
          //      can of worms I'd rather not open here.
          // - octal escapes in templates
          //    - ok this is actually not strict mode sensitive because templates never allow them
          // Since we don't have other cases (at the time of writing...), we can catch every one of these and don't have
          // to backtrack for it.

          // Note: the next two checks are not needed if we already were strict because the lexer would have done that
          if (!isStrict) {
            if (tok_getType() === $NUMBER_OLD) {
              // - `"use strict" \n 0123`
              return THROW_RANGE('Illegal legacy octal literal in strict mode', tok_getStart(), tok_getStop());
            }
            if (!hadOctal && /(^|[^\\])(\\\\)*\\(?:0\d|[1-9])/.test(tok_sliceInput(tok_getStart(), tok_getStop()))) {
              // We can't really validate this with a regex. And yet, here we are :'(
              // [x]: `function f(){ "use strict" \n "x\\01" }`
              // [v]: `function f(){ "use strict" \n "x\\\01" }`
              // [v]: `function f(){ "use strict" \n "x\\\\01" }`
              // [x]: `function f(){ "x\\0"; "use strict"; }`
              // [v]: `function f(){ "x\\\\0"; "use strict"; }`
              return THROW_RANGE('Octal in directive with strict mode directive or in strict mode is always illegal', tok_getStart(), tok_getStop());
            }
          }

          isStrict = true;
        }

        if (AST_directiveNodes && !babelCompat) {
          AST_setNodeDangerously(astProp, { // we know we will overwrite the existing string node
            type: 'Directive',
            loc: AST_getClosedLoc($tp_string_start, $tp_string_line, $tp_string_column),
            directive: dir,
          });
          parseSemiOrAsi(lexerFlags);
        }
        else {
          parseSemiOrAsi(lexerFlags);
          AST_setNodeDangerously(astProp, { // we are going to clobber a value
            type: 'ExpressionStatement',
            loc: AST_getClosedLoc($tp_string_start, $tp_string_line, $tp_string_column),
            expression: AST_popNode(astProp),
            directive: dir,
          });
        }
      } else {
        parseSemiOrAsi(lexerFlags);
        AST_setNodeDangerously(astProp, { // we are going to clobber a value
          type: 'ExpressionStatement',
          loc: AST_getClosedLoc($tp_string_start, $tp_string_line, $tp_string_column),
          expression: AST_popNode(astProp),
        });
        break; // end of directives
      }
    }

    if (hadOctal && isStrict) {
      // This throws for any directive with an octal if use strict was enabled before or by any directive
      return THROW_RANGE('Octal in directive with strict mode directive or in strict mode is always illegal', tok_getStart(), tok_getStop());
    }

    return hadUseStrict;
  }

  function parseBodyPartsWithDirectives(lexerFlags, scoop, exportedNames, exportedBindings, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isGlobalToplevel, astProp) {
    ASSERT(parseBodyPartsWithDirectives.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT([PARAMS_SOME_COMPLEX, PARAMS_SOME_NONSTRICT, PARAMS_ALL_SIMPLE].includes(paramsSimple), 'paramsSimple enum', paramsSimple);

    // (I hope not passing on isGlobalToplevel to this parse step isnt going to come bite me later...)
    // We remove the strict flag otherwise we won't know whether we parsed it, which we need to know for an edge case
    let wasStrict = hasAllFlags(lexerFlags, LF_STRICT_MODE);
    let isStrict = wasStrict;
    let hasUseStrict = parseDirectivePrologues(lexerFlags, 'body');
    if (hasUseStrict) {
      isStrict = true;
      if (paramsSimple === PARAMS_SOME_NONSTRICT || paramsSimple === PARAMS_SOME_COMPLEX) {
        // https://tc39.github.io/ecma262/#sec-function-definitions-static-semantics-early-errors
        // "It is a Syntax Error if ContainsUseStrict of FunctionBody is true and IsSimpleParameterList of FormalParameters is false."
        // and IsSimpleParameterList is only true the params are "es5" (no destructuring, no defaults, just idents)
        // TODO: ideally we'd have the loc for the arguments here. Bonus points for the (first) actually offending param
        // TODO: barring the param name, we could at least point to the strict mode directive..?
        return THROW_RANGE('Can only declare use strict if func params are "simple"', tok_getStart(), tok_getStop());
      }

      if (
        !wasStrict &&
        // Note: a little hacky but the function name can never be at the start of a program
        $tp_functionNameToVerify_start !== 0 &&
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        // Check the idents that are only keywords in strict mode. We've already checked everything else.
        isStrictOnlyKeyword($tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon)
      ) {
        // Would be nice if we could point to multiple places of input, but for now that's a bit too niche to bother
        // TODO: would we prefer to point to the strict mode header or the offending func name?
        return THROW_RANGE('Can not use reserved keyword `' + $tp_functionNameToVerify_canon + '` in strict mode as id for function that has a use strict directive', $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop);
      }

      lexerFlags |= LF_STRICT_MODE;
    }

    if (dupeParamErrorStart !== NO_DUPE_PARAMS && (paramsSimple === PARAMS_SOME_COMPLEX || isStrict)) {
      return THROW_RANGE('Function had duplicate params', dupeParamErrorStart - 1, dupeParamErrorStop);
    }

    while (tok_getType() !== $EOF && tok_getType() !== $PUNC_CURLY_CLOSE) {
      parseBodyPart(lexerFlags, scoop, EMPTY_LABEL_SET, exportedNames, exportedBindings, isGlobalToplevel, NOT_LABELLED, FDS_VAR, PARENT_NOT_LABEL, astProp);
    }

    if (babelCompat) AST_babelDirectives();
  }

  function ASSERT_LABELSET(labelSet) {
    if (labelSet === EMPTY_LABEL_SET) return;
    ASSERT(typeof labelSet === 'object');
    ASSERT(labelSet.IS_LABEL_SET === true, 'must receive a labelset', labelSet);
  }
  function wrapLabelSet(labelSet, desc) {
    ASSERT(wrapLabelSet.length === arguments.length, 'arg count');
    ASSERT(typeof desc === 'string', 'desc is a string');
    ASSERT(labelSet === EMPTY_LABEL_SET || typeof labelSet === 'object');
    ASSERT(labelSet === EMPTY_LABEL_SET || labelSet.IS_LABEL_SET === true, 'must receive a labelset', labelSet);

    // Note: we create the Set now because the whole reason this labelSet was made was because we needed it
    let set = {parentLabels: labelSet, statementLabels: new Set, iterationLabels: null};
    ASSERT(set.IS_LABEL_SET = true);
    ASSERT(set.desc = desc);
    return set;
  }

  function parseStatementHeader(lexerFlags, headProp) {
    ASSERT(typeof lexerFlags === 'number', 'lexerflags number');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_TEMPLATE), 'I think template resets itself');
    ASSERT_VALID(tok_getType() === $PUNC_PAREN_OPEN, 'all callers should have called `skipToParenOpenOrDie()` which should verify this invariant');

    let $tp_openParan_start = tok_getStart();

    ASSERT_skipToExpressionStart($PUNC_PAREN_OPEN, lexerFlags);
    parseExpressions(sansFlag(lexerFlags | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION), headProp);
    if (tok_getType() !== $PUNC_PAREN_CLOSE) {
      return THROW_RANGE('Missing closing paren of statement header, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', $tp_openParan_start, tok_getStop());
    }
    ASSERT_skipToStatementStart($PUNC_PAREN_CLOSE, lexerFlags);
  }

  function parseSemiOrAsi(lexerFlags) {
    // https://tc39.github.io/ecma262/#sec-rules-of-automatic-semicolon-insertion
    // do if:
    // - unable to parse next token and there was a newline between that and the previous token
    // - at eof and the current script is not (yet) valid
    // - when a closing } is encountered
    // - when ++ or -- is encountered and a newline preceded it
    // - when a newline (and no semi) follows a "restricted production" (continue, break, return, throw, yield
    //   (only with assignment). note that throw is always illegal in that case and continue/break may be.)
    // unless (don't if):
    // - the semi would be empty
    // - the next line starts with forward slash
    // - the semi would be part of a for-header
    // TODO: should check whether the next token would be "an error"; especially the newline case makes no such effort :(

    // "no asi if next line forward slash" is described here:
    // https://tc39.es/ecma262/#sec-ecmascript-language-lexical-grammar
    // > where the first non-whitespace, non-comment code point after a LineTerminator is U+002F (SOLIDUS) and the
    // > syntactic context allows division or division-assignment, no semicolon is inserted at the LineTerminator.

    // Make sure contexts where a token may start with a forward slash are explicit in whether that's a div or a regex
    // [v]: `x \n /foo`                // NO ASI because it can be a division (x/foo)
    // [x]: `x \n /foo/`               // NO ASI because the first slash can be a division. Misisng value after second
    // [v]: `x \n /foo/g`              // NO ASI because it can be a division (x/foo/g)
    // [v]: `debugger \n /foo/`        // ASI because it cannot be a division (regex /foo/)
    // [v]: `debugger \n /foo/g`       // ASI because it cannot be a division (regex /foo/g)
    ASSERT_VALID((!isRegexToken(tok_getType()) && tok_getType() !== $PUNC_DIV && tok_getType() !== $PUNC_DIV_EQ) || ASSERT_ASI_REGEX_NEXT || (ASSERT_ASI_REGEX_NEXT = false), 'The next token starts with a forward slash but neither a division nor a regular expression is legal here. This should be handled elsewhere.');

    if (tok_getType() === $PUNC_SEMI) {
      ASSERT_skipToStatementStart(';', lexerFlags);
      return;
    }

    ASSERT(hasNoFlag(lexerFlags, LF_NO_ASI), 'this case should have been caught sooner');

    // note: must check eof/semi as well otherwise the value would be mandatory and parser would throw
    if (tok_getType() === $PUNC_CURLY_CLOSE || tok_getNlwas() === true || tok_getType() === $EOF) {
      tok_asi();
    } else {
      $log('parse error at curent token');
      return THROW_RANGE('Unable to ASI', tok_getStart(), tok_getStop());
    }
  }

  function parseNestedBodyPart(lexerFlags, scoop, labelSet, isLabelled, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseNestedBodyPart.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    // nested statements like that of if, while, for, try, etc
    parseBodyPart(lexerFlags, scoop, labelSet, UNDEF_EXPORTS, UNDEF_EXPORTS, NOT_GLOBAL_TOPLEVEL, isLabelled, fdState, nestedLabels, astProp);
  }

  function parseBodyPart(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseBodyPart.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(tok_getType() !== $ERROR  && tok_getType() !== $ASI, 'token type should not have $error or $eof or $asi at this point');
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');
    ASSERT_LABELSET(labelSet);

    ASSERT(!void(ASSERT_ASI_REGEX_NEXT = false));

    if (isIdentToken(tok_getType())) {
      parseIdentStatement(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp);
      return;
    }

    if (isPunctuatorToken(tok_getType())) {
      parsePunctuatorStatement(lexerFlags, scoop, labelSet, astProp);
      return;
    }

    if (isNumberToken(tok_getType())) {
      parseFromNumberStatement(lexerFlags, astProp);
      return;
    }

    if (isStringToken(tok_getType())) {
      parseFromStringStatement(lexerFlags, astProp);
      return;
    }

    if (isTickToken(tok_getType())) {
      parseTickStatement(lexerFlags, astProp);
      return;
    }

    if (isRegexToken(tok_getType())) {
      parseFromRegexStatement(lexerFlags, astProp);
      return;
    }

    ASSERT(tok_getType() === $EOF, 'the only high level tokens are already caught explicitly (ident, punc, number, string, template, regex) so this must be an EOF');
    THROW_RANGE('Unexpected EOF', tok_getStart(), tok_getStop());
  }

  // ### functions

  function parseFunctionDeclaration(lexerFlags, scoop, isFuncDecl, isRealFuncExpr, $tp_async_type, $tp_astRange_start, $tp_astRange_line, $tp_astRange_column, $tp_funcHead_start, $tp_funcHead_stop, optionalIdent, isLabelled, fdState, astProp) {
    ASSERT(parseFunctionDeclaration.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerflags number');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'async token');
    ASSERT_FDS(fdState);
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');

    // Note: `$tp_first_start` may be the start of `function`, `async`, `export`

    // - `function f(){}`
    // - `function f(){ function g(){} }`
    // - `{ function f(){} }`
    // - `switch (x) { case a: function f(){} }`
    // - `switch (x) { default: function f(){} }`
    // - `if (x) function f(){}`           // web compat only, lex
    // - `x: function f(){}`               // web compat only, var
    // - `{ x: function f(){} }`           // web compat only, lex
    // - `function g(){ x: function f(){} }`           // web compat only, var
    // - `switch (x) { case a: x: function f(){} }`           // web compat only, lex
    // - `switch (x) { default: x: function f(){} }`           // web compat only, lex
    // - `if (x) y: function f(){}`        // web compat only, lex "as if in a block that is child of the `if`"
    // - `while (x) y: function f(){}`     // always fail
    // - `do x: function f(){} while (y)`  // always fail
    // - `for( ... ) function f(){}`       // always fail (any for)
    // - `for( ... ) x: function f(){}`    // always fail (any for)

    /*
     function f() {}
     x=function f() {}
     y=function() {}
     o={foo(){}}

     function* f() {}
     x=function* f() {}
     y=function*() {}
     o={*foo(){}}

     async function g(){}
     x=async function g(){}
     x=async function(){}
     o={async foo(){}}
    */
    ASSERT_skipToIdentStarParenOpen($ID_function, lexerFlags); // TODO: why is this called for an async generator expression? maybe rename this func?

    let $tp_star_type = $UNTYPED;
    if (tok_getType() === $PUNC_STAR) {
      $tp_star_type = $PUNC_STAR;
      $tp_funcHead_stop = tok_getStop();

      ASSERT_skipToIdentParenOpen('*', lexerFlags);

      if ($tp_async_type === $ID_async && !allowAsyncGenerators) {
        return THROW_RANGE('Async generators are not supported by the currently targeted language version, they were introduced in ES9/ES2018', $tp_funcHead_start, $tp_funcHead_stop);
      }
    }

    if (isLabelled === IS_LABELLED) {
      // - `foo: function f(){}`

      // A "labelled function declaration" is only valid in sloppy web compat mode
      // https://tc39.es/ecma262/#sec-labelled-statements-static-semantics-early-errors
      // > It is a Syntax Error if any source text matches this rule.
      // https://tc39.es/ecma262/#sec-labelled-function-declarations
      // > It is a Syntax Error if any strict mode source code matches this rule.
      // Additionally there's a difference in how the name propagates to the parent statement level or not;
      // https://tc39.es/ecma262/#sec-labelled-statements-static-semantics-lexicallydeclarednames
      // > LabelledItem: FunctionDeclaration -> Return BoundNames of FunctionDeclaration.
      // - in script global and function top-level, lexical bindings are not propagated
      //   - https://tc39.es/ecma262/#sec-labelled-statements-static-semantics-toplevellexicallydeclarednames
      //   - functions: https://tc39.es/ecma262/#sec-function-definitions-static-semantics-lexicallydeclarednames
      //   - script: https://tc39.es/ecma262/#sec-scripts-static-semantics-lexicallydeclarednames
      // - in module or block/switch the function is lexical and the label propagates that to the enclosing space
      //   - module: https://tc39.es/ecma262/#sec-module-semantics-static-semantics-lexicallydeclarednames
      //   - block: https://tc39.es/ecma262/#sec-block-static-semantics-lexicallydeclarednames
      //   - switch: https://tc39.es/ecma262/#sec-switch-statement-static-semantics-lexicallydeclarednames

      ASSERT(fdState !== FDS_IFELSE, 'the only place where IS_LABELLED is set will use FDS_ILLEGAL if this were the case');
      if (fdState === FDS_ILLEGAL) {
        // - `if (x) foo: function f(){}`
        // - `if (x); else foo: function f(){}`
        // - `while (x) foo: function f(){}`
        // - `for (;;) foo: function f(){}`
        // - `with (x) foo: function f(){}`
        return THROW_RANGE('A "labelled function declaration" is not allowed in this situation', $tp_funcHead_start, $tp_funcHead_stop);
      }
      if ($tp_async_type === $ID_async) {
        // - `foo: async function f(){}`
        return THROW_RANGE('A "labelled function declaration" can not be async', $tp_funcHead_start, $tp_funcHead_stop);
      }
      if ($tp_star_type === $PUNC_STAR) {
        // - `foo: function *f(){}`
        return THROW_RANGE('A "labelled function declaration" can not be a generator', $tp_funcHead_start, $tp_funcHead_stop);
      }
      // Put the generic webcompat error last to make all modes as similar as possible
      if (options_webCompat === WEB_COMPAT_OFF || hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
        return THROW_RANGE('A "labelled function declaration" is only allowed in sloppy web compat mode', $tp_funcHead_start, $tp_funcHead_stop);
      }
    }
    else if (fdState === FDS_IFELSE) {
      // NOT labelled!

      if ($tp_async_type === $ID_async) {
        // - `if (x) async function f(){}`
        return THROW_RANGE('An async function declaration in web compat mode is still not allowed as `if-else` child, only plain func decls are allowed there', $tp_funcHead_start, $tp_funcHead_stop);
      }
      if ($tp_star_type === $PUNC_STAR) {
        // - `if (x) function *f(){}`
        return THROW_RANGE('A generator function declaration in web compat mode is still not allowed as `if-else` child, only plain func decls are allowed there', $tp_funcHead_start, $tp_funcHead_stop);
      }
      // Put the generic webcompat error last to make all modes as similar as possible
      if (options_webCompat === WEB_COMPAT_OFF || hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
        // - `while (x) function f(){}`
        // - `with (x) function f(){}`
        return THROW_RANGE('A function declaration can only be the child of an `if`/`else` in sloppy web compat mode', $tp_funcHead_start, $tp_funcHead_stop);
      }

      // Labelled func decls do not leak their name into global space (but they do for a label in a block!)
      // IfStatements always consider a func decl as if wrapped in a block, so never leak its name outward
      scoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FAKE_BLOCK, 'special "fake-block" function statement for label');
      ASSERT(scoop.$funcName = tok_sliceInput(tok_getStart(), tok_getStop())); // meh. just for debugggin.

      // TLDR: labelled functions are always statements and use same binding propagation rules as non-labelled functions
      // This rule ONLY applies to plain functions. Async / generators or other types of declarations are illegal here!
    }
    else if (isFuncDecl === IS_FUNC_DECL && fdState === FDS_ILLEGAL) {
      // https://tc39.es/ecma262/#prod-LabelledItem
      // This case is a "labelled function declaration"
      return THROW_RANGE('Cannot parse a function declaration here, only expecting statements here', $tp_funcHead_start, $tp_funcHead_stop);
    }

    return parseFunctionAfterKeyword(lexerFlags, scoop, isFuncDecl, isRealFuncExpr, optionalIdent, NOT_CONSTRUCTOR, NOT_METHOD, $tp_async_type, $tp_star_type, $UNTYPED, $UNTYPED, $tp_astRange_start, $tp_astRange_line, $tp_astRange_column, fdState, astProp);
  }
  function parseFunctionExpression(lexerFlags, $tp_function_start, $tp_function_line, $tp_function_column, astProp) {
    ASSERT(parseFunctionExpression.length === arguments.length, 'arg count');

    if (tok_getType() === $PUNC_STAR) {
      return parseGeneratorFunctionExpression(lexerFlags, $tp_function_start, $tp_function_line, $tp_function_column, astProp);
    }

    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      IS_FUNC_EXPR,
      IDENT_REQUIRED,
      NOT_CONSTRUCTOR,
      NOT_METHOD,
      $UNTYPED,
      $UNTYPED,
      $UNTYPED,
      $UNTYPED,
      $tp_function_start,
      $tp_function_line,
      $tp_function_column,
      FDS_ILLEGAL, // this flag is not relevant for func exprs
      astProp
    );
  }
  function parseGeneratorFunctionExpression(lexerFlags, $tp_function_start, $tp_function_line, $tp_function_column, astProp) {
    ASSERT(parseGeneratorFunctionExpression.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_STAR, 'not yet skipped');

    ASSERT_skipToIdentParenOpen('*', lexerFlags);

    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      IS_FUNC_EXPR,
      IDENT_REQUIRED,
      NOT_CONSTRUCTOR,
      NOT_METHOD,
      $UNTYPED,
      $PUNC_STAR,
      $UNTYPED,
      $UNTYPED,
      $tp_function_start,
      $tp_function_line ,
      $tp_function_column,
      FDS_ILLEGAL, // this flag is not relevant for func exprs
      astProp
    );
  }
  function parseAsyncFunctionDecl(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, fromStmtOrExpr, scoop, isExport, exportedBindings, isLabelled, fdState, astProp) {
    ASSERT(parseAsyncFunctionDecl.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $ID_function, 'already checked, not yet consumed');

    let $tp_function_stop = tok_getStop();

    let canonName = parseFunctionDeclaration(
      lexerFlags,
      scoop,
      fromStmtOrExpr === IS_EXPRESSION ? NOT_FUNC_DECL : IS_FUNC_DECL,
      fromStmtOrExpr === IS_EXPRESSION ? IS_FUNC_EXPR : NOT_FUNC_EXPR,
      $ID_async,
      $tp_async_start, $tp_async_line, $tp_async_column,
      $tp_async_start, $tp_function_stop, // TODO: this must potentially be export ...
      (isExport === IS_EXPORT || fromStmtOrExpr === IS_EXPRESSION) ? IDENT_OPTIONAL : IDENT_REQUIRED,
      isLabelled,
      fdState,
      astProp
    );

    if (isExport === IS_EXPORT) {
      // - `export async function x(){}`
      // - `export default async function x(){}`
      // - `export default function x(){}`
      // the "default" and "*default*" cases are handled in the export parser
      // if this func has a name, record it by reference because return values are already used by something else
      addBindingToExports(exportedBindings, canonName);
    }

    return NOT_ASSIGNABLE;
  }
  function parseFunctionAfterKeyword(lexerFlags, outerScoop, isFuncDecl, isRealFuncExpr, optionalIdent, isClassConstructor, isMethod, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, $tp_astRange_start, $tp_astRange_line, $tp_astRange_column, fdState, astProp) {
    // $tt_firstToken, // for range in AST, `function` or `async` or method name/modifiers
    // fdState, // for errors and scoping

    ASSERT(arguments.length === parseFunctionAfterKeyword.length, 'arg count must match');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'async token');
    ASSERT($tp_star_type === $UNTYPED || $tp_star_type === $PUNC_STAR, 'gen token');
    ASSERT($tp_get_type === $UNTYPED || $tp_get_type === $ID_get, 'get token', $tp_get_type);
    ASSERT($tp_set_type === $UNTYPED || $tp_set_type === $ID_set, 'set token', $tp_set_type);
    ASSERT((isFuncDecl === IS_FUNC_DECL) === (outerScoop !== DO_NOT_BIND), 'outerScoop is only used for func decl ids and required there', isFuncDecl === IS_FUNC_DECL, outerScoop !== DO_NOT_BIND);
    ASSERT_FDS(fdState);

    /*
    These are the cfg productions for func decls and exprs with various modifiers and how they are inherited.

    FunctionDeclaration:                           function  BindingIdentifier[?Yield, ?Await](FormalParameters[~Yield, ~Await]){FunctionBody[~Yield, ~Await]}
    GeneratorDeclaration[Yield, Await]:            function *BindingIdentifier[?Yield, ?Await](FormalParameters[+Yield, ~Await]){FunctionBody[+Yield, ~Await]}
    AsyncFunctionDeclaration[Yield, Await]:  async function  BindingIdentifier[?Yield, ?Await](FormalParameters[~Yield, +Await]){FunctionBody[~Yield, +Await]}
    AsyncGeneratorDeclaration[Yield, Await]: async function *BindingIdentifier[?Yield, ?Await](FormalParameters[+Yield, +Await]){FunctionBody[+Yield, +Await]}
    // Names of declarations inherit from enclosing scope

    FunctionExpression:                            function  BindingIdentifier[~Yield, ~Await](FormalParameters[~Yield, ~Await]){FunctionBody[~Yield, ~Await]}
    GeneratorExpression:                           function *BindingIdentifier[+Yield, ~Await](FormalParameters[+Yield, ~Await]){FunctionBody[+Yield, ~Await]}
    AsyncFunctionExpression:                 async function  BindingIdentifier[~Yield, +Await](FormalParameters[~Yield, +Await]){FunctionBody[~Yield, +Await]}
    AsyncGeneratorExpression:                async function *BindingIdentifier[+Yield, +Await](FormalParameters[+Yield, +Await]){FunctionBody[+Yield, +Await]}
    // Names of expressions inherit from current function

    Regardless of state, yield is automatically considered a keyword in strict mode and await is automatically a keyword
    with the module goal.
    Function decls can be named await in script mode when their enclosing scope is not async. They can be called yield
    in sloppy mode when their enclosing scope is not a generator.
    For expressions the current function is checked rather than the enclosing scope.
    */

    if (babelCompat && isMethod !== NOT_METHOD) {
      // Babel extends the Function node to be an ObjectMethod /  ClassMethod, rather than .value
      AST_set('generator', $tp_star_type === $PUNC_STAR);
      AST_set('async', $tp_async_type === $ID_async);
    } else if (acornCompat) {
      if (allowAsyncFunctions) {
        AST_open(astProp, {
          type: isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression',
          loc: undefined,
          // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
          generator: $tp_star_type === $PUNC_STAR,
          async: $tp_async_type === $ID_async,
          expression: false,
          id: undefined,
          params: [],
          body: undefined,
        });
      } else {
        // Note: acorn will not add the `async` property if targeting a version that doesn't support async (nice ...)
        AST_open(astProp, {
          type: isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression',
          loc: undefined,
          // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
          generator: $tp_star_type === $PUNC_STAR,
          expression: false,
          id: undefined,
          params: [],
          body: undefined,
        });
      }
    } else {
      AST_open(astProp, {
        type: isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression',
        loc: undefined,
        // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
        generator: $tp_star_type === $PUNC_STAR,
        async: $tp_async_type === $ID_async,
        id: undefined,
        params: [],
        body: undefined,
      });
    }

    ASSERT($tp_async_type !== $ID_async || allowAsyncFunctions, 'other places that parse `async` that lead here should have verified the es version by now');
    ASSERT($tp_async_type !== $ID_async || $tp_star_type !== $PUNC_STAR || allowAsyncGenerators, 'other places that parse `async` with a generator that lead here should have verified the es version by now');

    let innerScoop = SCOPE_createGlobal('parseFunctionAfterKeyword_main_func_scope');
    ASSERT(innerScoop._ = 'func scope (NOT "global") but the top-most scope layer for this function');

    // need to track whether the name was eval/args because if the func body is strict mode then it should still throw
    // retroactively for having that name. a bit annoying.

    let $tp_functionNameToVerify_type = 0;
    let $tp_functionNameToVerify_line = 0;
    let $tp_functionNameToVerify_column = 0;
    let $tp_functionNameToVerify_start = 0;
    let $tp_functionNameToVerify_stop = 0;
    let $tp_functionNameToVerify_canon = '';

    let canonName = '';
    if (isIdentToken(tok_getType())) {

      $tp_functionNameToVerify_type = tok_getType();
      $tp_functionNameToVerify_line = tok_getLine();
      $tp_functionNameToVerify_column = tok_getColumn();
      $tp_functionNameToVerify_start = tok_getStart();
      $tp_functionNameToVerify_stop = tok_getStop();
      $tp_functionNameToVerify_canon = tok_getCanoN();

      // properly inherit the async/gen state from the outer scope (func decls) or current function (func expr)
      let bindingFlags = (
        sansFlag(lexerFlags, LF_IN_GENERATOR | LF_IN_ASYNC)
        |
        getFuncIdentAsyncGenState(isRealFuncExpr, lexerFlags, $tp_star_type, $tp_async_type)
      );

      // A function name is bound lexically, except when directly in script-goal global scope or any-goal function scope
      let nameBindingType = (
        isFuncDecl === IS_FUNC_DECL &&
        fdState === FDS_VAR &&
        (hasNoFlag(lexerFlags, LF_IN_GLOBAL) || goalMode === GOAL_SCRIPT)
      ) ? BINDING_TYPE_FUNC_VAR : BINDING_TYPE_FUNC_LEX;

      canonName = $tp_functionNameToVerify_canon;

      // Note: must verify id here and not after asserting the existence of the directive because by then the lexer flag
      // for async will have been merged and `async function await(){}` would be illegal.
      // The binding of a function could be considered lexical, but is probably the only lexical case that can be `let`
      // The id is passed forward and validated on a subset, if it turns out the func has a use strict directive.
      fatalBindingIdentCheck($tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, nameBindingType, bindingFlags);

      // declarations bind in outer scope, expressions bind in inner scope, methods bind ...  ehh?
      if (isFuncDecl === IS_FUNC_DECL) {
        // TODO: add test case for catch shadow
        SCOPE_addFuncDeclName(lexerFlags, outerScoop, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, canonName, nameBindingType, fdState);
      } else {
        // Record the func expr name in the current layer, allow it to be shadowed.
        // TODO: I believe this is read-only. I'm just adding this to unblock something else. But I guess there are tests to be created for shadowing / writing to a func expr name.
        SCOPE_actuallyAddBinding(lexerFlags, innerScoop, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, canonName, BINDING_TYPE_FUNC_VAR);
      }

      // create new lexical binding to "hide" the function name.
      // this way it wont cause problems when doing `x=function f(){ let f; }`
      innerScoop = SCOPE_addLayer(innerScoop, SCOPE_LAYER_FUNC_ROOT, 'parseFunctionAfterKeyword_hide_func_name');
      ASSERT(innerScoop._ = 'func scope');

      ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);
      AST_setIdent('id', $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_line, $tp_functionNameToVerify_column, $tp_functionNameToVerify_canon);
    } else if (isFuncDecl === IS_FUNC_DECL && optionalIdent === IDENT_REQUIRED) {
      return THROW_RANGE('Function decl missing required ident', tok_getStart(), tok_getStop()); // Pointing to `function` is probably better...?
    } else {
      AST_set('id', null);
      innerScoop = SCOPE_addLayer(innerScoop, SCOPE_LAYER_FUNC_ROOT, 'function_has_no_id_but_whatever');
    }

    // reset the async lexer flags. some don't cross function boundaries
    // make sure the LF_CAN_NEW_DOT_TARGET flag is set from here on out, this enables new.target (is allowed in arg default)
    // note: we dont reset the template lexer flag here. instead we do it at any place where we parse curly pairs
    //       this fixes the problem of parsing arrow functions where we can't tell whether the next token is part
    //       of the arrow expression until after parsing and processing that token. that needs curly pair checks.
    lexerFlags = resetLexerFlagsForFuncAndArrow(lexerFlags, $tp_star_type, $tp_async_type, NOT_ARROW);

    // super() is allowed in constructor param defaults so deal with the flag now...
    // these flags dont reset in arrows so only do it here
    if (isClassConstructor === IS_CONSTRUCTOR) {
      ASSERT($tp_async_type === $UNTYPED, 'should have thrown for async constructor when parsing the constructor key');
      ASSERT($tp_star_type === $UNTYPED, 'should have thrown for generator constructor when parsing the constructor key');
      ASSERT(isMethod === IS_METHOD, 'class constructors are methods');
      // you can use `super()` in arg defaults so set it up now
      lexerFlags |= LF_IN_CONSTRUCTOR;
    } else {
      // since methods cant nest without another class (which resets this flag) or object (which cant have this flag)
      // we should reset the flag now
      // Examples of bad case:s
      // - `class x extends y { constructor(){ ({ constructor(x=super()){} }); } }`
      // - `class x extends y { constructor(){ class z { constructor(x=super()){} }; } }`
      lexerFlags = sansFlag(lexerFlags, LF_IN_CONSTRUCTOR | LF_SUPER_CALL);
    }

    // regular functions cannot use `super` at all (and arrows are not parsed here)
    // methods can use super props as soon as their arg defaults
    if (isMethod === IS_METHOD) lexerFlags |= LF_SUPER_PROP;
    else lexerFlags = sansFlag(lexerFlags, LF_SUPER_PROP);
    ASSERT(typeof lexerFlags === 'number');

    parseFunctionFromParams(
      lexerFlags,
      innerScoop,
      $tp_async_type === $UNTYPED ? FROM_OTHER_FUNC_ARG : FROM_ASYNC_ARG,
      isFuncDecl === IS_FUNC_DECL ? IS_STATEMENT : IS_EXPRESSION,
      $tp_functionNameToVerify_type,
      $tp_functionNameToVerify_start,
      $tp_functionNameToVerify_stop,
      $tp_functionNameToVerify_canon,
      isMethod,
      $tp_get_type,
      $tp_set_type
    );

    if (!babelCompat || isMethod === NOT_METHOD) { // Babel extends the Function node to be a ClassMethod, rather than .value
      // The start is either `async` or `function` (but not `export`)
      AST_close($tp_astRange_start, $tp_astRange_line, $tp_astRange_column, isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression');
    }

    return canonName;
  }
  function getFuncIdentGeneratorState(isRealFuncExpr, enclosingScopeFlags, $tp_star_type) {
    ASSERT(getFuncIdentGeneratorState.length === arguments.length, 'arg count');
    ASSERT($tp_star_type === $UNTYPED || $tp_star_type === $PUNC_STAR, 'gen token');
    ASSERT(isRealFuncExpr === IS_FUNC_EXPR || isRealFuncExpr === NOT_FUNC_EXPR, 'isRealFuncExpr enum');

    // function idents can never be `yield` with the module goal
    if (hasAllFlags(enclosingScopeFlags, LF_STRICT_MODE)) return LF_IN_GENERATOR;

    if (isRealFuncExpr === IS_FUNC_EXPR) return $tp_star_type === $PUNC_STAR ? LF_IN_GENERATOR : LF_NO_FLAGS;
    return hasAnyFlag(enclosingScopeFlags, LF_IN_GENERATOR) ? LF_IN_GENERATOR : LF_NO_FLAGS;
  }
  function getFuncIdentAsyncState(isRealFuncExpr, enclosingScopeFlags, $tp_async_type) {
    ASSERT(getFuncIdentAsyncState.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isAsync enum');
    ASSERT(isRealFuncExpr === IS_FUNC_EXPR || isRealFuncExpr === NOT_FUNC_EXPR, 'isRealFuncExpr enum (2)');

    // function idents can never be `await` with the module goal
    if (goalMode === GOAL_MODULE) return LF_IN_ASYNC;

    if (isRealFuncExpr === IS_FUNC_EXPR) return $tp_async_type === $ID_async ? LF_IN_ASYNC : 0;
    return hasAnyFlag(enclosingScopeFlags, LF_IN_ASYNC) ? LF_IN_ASYNC : 0;
  }
  function getFuncIdentAsyncGenState(isRealFuncExpr, enclosingScopeFlags, $tp_star_type, $tp_async_type) {
    ASSERT(getFuncIdentAsyncGenState.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isAsync enum');
    ASSERT($tp_star_type === $UNTYPED || $tp_star_type === $PUNC_STAR, 'gen token');

    return getFuncIdentGeneratorState(isRealFuncExpr, enclosingScopeFlags, $tp_star_type) |
      getFuncIdentAsyncState(isRealFuncExpr, enclosingScopeFlags, $tp_async_type)
  }
  function resetLexerFlagsForFuncAndArrow(lexerFlags, $tp_star_type, $tp_async_type, funcType) {
    ASSERT(resetLexerFlagsForFuncAndArrow.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isasync enum');
    ASSERT($tp_star_type === $UNTYPED || $tp_star_type === $PUNC_STAR, 'gen token');

    // this resets lexerflags for parsing a function from the arguments onwards or for the body of an arrow
    lexerFlags =
      lexerFlags & (
      LF_STRICT_MODE
      | LF_IN_TEMPLATE // TODO: handle this differently and add tests why. Only relevant for the token _after_ the func/arrow
      | LF_SUPER_PROP
      | LF_SUPER_CALL
    );

    // the function name can inherit this state from the enclosing scope but all other parts of a function will
    // be parsed according to the state of hte currently defined function
    if ($tp_async_type === $ID_async) {
      lexerFlags |= LF_IN_ASYNC;
    }
    if ($tp_star_type === $PUNC_STAR) {
      lexerFlags |= LF_IN_GENERATOR;
    }

    // dont remove the template flag here! let curly pair structures deal with this individually (fixes arrows)
    if (funcType === NOT_ARROW) lexerFlags = lexerFlags | LF_CAN_NEW_DOT_TARGET;

    return lexerFlags;
  }
  function parseFunctionFromParams(lexerFlags, scoop, bindingFrom, expressionState, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isMethod, $tp_get_type, $tp_set_type) {
    ASSERT(parseFunctionFromParams.length === arguments.length, 'arg count should match');
    ASSERT($tp_get_type === $UNTYPED || $tp_get_type === $ID_get, 'get token');
    ASSERT($tp_set_type === $UNTYPED || $tp_set_type === $ID_set, 'set token');
    ASSERT(typeof lexerFlags === 'number');

    // - `function f(a){}`
    //              ^
    // - `x = {f(a){}}`
    //          ^

    let paramScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FUNC_PARAMS, 'parseFunctionFromParams(arg)');
    ASSERT(!void(scoop._funcName = $tp_functionNameToVerify_start === 0 ?  '<anon>' : tok_sliceInput($tp_functionNameToVerify_start, $tp_functionNameToVerify_stop)));
    // `yield` can certainly NOT be a var name if either parent or current function was a generator, so track it
    let paramsSimple = parseFuncArguments(lexerFlags | LF_NO_ASI, paramScoop, bindingFrom, $tp_get_type, $tp_set_type);
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'parseFuncArguments should have thrown if this wasnt the case');

    let dupeParamErrorStart = paramScoop.dupeParamErrorStart;
    let dupeParamErrorStop = paramScoop.dupeParamErrorStop;
    if (isMethod === IS_METHOD && dupeParamErrorStart !== NO_DUPE_PARAMS) {
      // Dupe params are never allowed in methods
      return THROW_RANGE('Method had duplicate params', dupeParamErrorStart - 1, dupeParamErrorStop);
    }

    let finalFuncScope = SCOPE_addLayer(paramScoop, SCOPE_LAYER_FUNC_BODY, 'parseFunctionFromParams(body)');
    ASSERT(!void(finalFuncScope._funcName = $tp_functionNameToVerify_start === 0 ? '<anon>' : tok_sliceInput($tp_functionNameToVerify_start, $tp_functionNameToVerify_stop)));
    if (options_exposeScopes) AST_set('$scope', finalFuncScope);
    parseFunctionBody(lexerFlags, finalFuncScope, expressionState, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, false);
  }
  function parseFuncArguments(lexerFlags, scoop, bindingFrom, $tp_get_type, $tp_set_type) {
    // parseArguments
    ASSERT(arguments.length === parseFuncArguments.length, 'arg count');
    ASSERT(scoop !== DO_NOT_BIND, 'params must get scoop');

    // - `function f(a){}`
    //              ^
    // - `x = {f(a){}}`
    //          ^

    lexerFlags = lexerFlags | LF_IN_FUNC_ARGS; // prevents await expression as default arg

    if (tok_getType() !== $PUNC_PAREN_OPEN) {
      return THROW_RANGE('Must have func arguments next but did not find `(`', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToBindingStartGrouped($PUNC_PAREN_OPEN, lexerFlags);

    // - `function f(a){}`
    //               ^
    // - `x = {f(a){}}`
    //           ^

    if (tok_getType() === $PUNC_PAREN_CLOSE) {
      // - `function f(){}`
      //               ^

      if ($tp_set_type === $ID_set) {
        // - `x = {set f(){}}`
        //               ^
        return THROW_RANGE('Setters must have exactly one parameter', tok_getStart(), tok_getStop());
      }

      ASSERT_skipToCurlyOpenOrDie($PUNC_PAREN_CLOSE, lexerFlags);

      return PARAMS_ALL_SIMPLE;
    }

    if ($tp_get_type === $ID_get) {
      // - `x = {get f(x){}}`
      //               ^
      return THROW_RANGE('Getters can not have any parameters', tok_getStart(), tok_getStop());
    }

    // - `function f([x]){}`
    //               ^
    // - `x = {f(a,b){}}`
    //           ^
    // Skip dupe checks because dupe param names are allowed in sloppy mode if the params are all "simple"
    let paramsSimple = parseBindings(lexerFlags, scoop, BINDING_TYPE_ARG, bindingFrom, ASSIGNMENT_IS_DEFAULT, $tp_set_type, UNDEF_EXPORTS, UNDEF_EXPORTS, 'params');
    AST_destruct('params');
    ASSERT(tok_getType() !== $PUNC_COMMA, 'the trailing func comma case should already be caught by now');
    if (tok_getType() !== $PUNC_PAREN_CLOSE) {
      return THROW_RANGE('Missing function param definition closing parenthesis, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToCurlyOpenOrDie($PUNC_PAREN_CLOSE, lexerFlags);

    return paramsSimple;
  }

  function parseFunctionBody(lexerFlags, scoop, blockType, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isArrow) {
    ASSERT(parseFunctionBody.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof lexerFlags === 'number');
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'block opening token should already have been confirmed, but not yet consumed');
    ASSERT([PARAMS_SOME_COMPLEX, PARAMS_SOME_NONSTRICT, PARAMS_ALL_SIMPLE].includes(paramsSimple), 'paramsSimple enum', paramsSimple);

    let lexerFlagsNoTemplate = sansFlag(lexerFlags, LF_IN_TEMPLATE | LF_NO_ASI | LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION);

    let $tp_curly_line = tok_getLine();
    let $tp_curly_column = tok_getColumn();
    let $tp_curly_start = tok_getStart();

    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlagsNoTemplate); // [v]: `(x)=>{/x/}`  TODO: next must be statement start or `}`
    AST_open('body', {
      type: 'BlockStatement',
      loc: undefined,
      body: [],
    });

    if (options_exposeScopes) AST_set('$scope', scoop);

    parseBodyPartsWithDirectives(lexerFlagsNoTemplate, scoop, UNDEF_EXPORTS, UNDEF_EXPORTS, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, NOT_GLOBAL_TOPLEVEL, 'body');

    if (tok_getType() !== $PUNC_CURLY_CLOSE) {
      // [x]: `(function(){`
      return THROW_RANGE('Missing function body closing curly, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    if (isArrow) {
      // block arrow cannot be lhs of expression, so division must be regex, on the next line
      ASSERT_skipRex($PUNC_CURLY_CLOSE, lexerFlags);
      if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
        // [v] `()=>{} \n /foo/`
        ASSERT_ASI_REGEX_NEXT = true;
      }
    } else if (blockType === IS_EXPRESSION) {
      // function expression
      ASSERT_skipDiv($PUNC_CURLY_CLOSE, lexerFlags);
    } else {
      ASSERT(blockType === IS_STATEMENT, 'either expression or not');
      // function declaration
      ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, lexerFlags);
    }
    AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column, 'BlockStatement');

    if (tok_getType() === $PUNC_EQ) {
      return THROW_RANGE('Object destructuring is not allowed at the start of statement or arrow body, must wrap the object in parenthesis for that to work', tok_getStart(), tok_getStop());
    }
  }

  // ### statements

  function parseIdentStatement(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp) {
    ASSERT(parseIdentStatement.length === arguments.length, 'arg count');
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');
    ASSERT_LABELSET(labelSet);

    // all statement starting keywords;

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    switch ($tp_ident_type) {
      case $ID_async:
        // we deal with async here because it can be a valid label in sloppy mode
        // TODO: test case to this change
        ASSERT_skipDiv($ID_async, lexerFlags); // TODO: async could be ident, so `async/b` is a division
        if (tok_getType() === $PUNC_COLON) {
          return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $ID_async, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
        }
        parseAsyncStatement(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, NOT_EXPORT, UNDEF_EXPORTS, isLabelled, fdState, astProp);
        return;

      case $ID_break:
        parseBreakStatement(lexerFlags, labelSet, astProp);
        return;

      case $ID_class:
        parseClassDeclaration(lexerFlags, scoop, IDENT_REQUIRED, isLabelled, fdState, astProp);
        return;

      case $ID_const:
        parseConstStatement(lexerFlags, scoop, isLabelled, fdState, astProp);
        return;

      case $ID_continue:
        parseContinueStatement(lexerFlags, labelSet, astProp);
        return;

      case $ID_debugger:
        parseDebuggerStatement(lexerFlags, astProp);
        return;

      case $ID_do:
        parseDoStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_export:
        parseExportStatement(lexerFlags, scoop, exportedNames, exportedBindings, isGlobalToplevel, astProp);
        return;

      case $ID_for:
        parseForStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_function:
        ASSERT(scoop, 'should have a scoop at this point');
        parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, $UNTYPED, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_start, $tp_ident_stop, IDENT_REQUIRED, isLabelled, fdState, astProp);
        return;

      case $ID_if:
        parseIfStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_import:
        parseImportDeclaration(lexerFlags, scoop, isGlobalToplevel, astProp);
        return;

      case $ID_let:
        // When parsed as declaration (so directly inside a global, function, or block scope) the parsing goal is first a
        // let declaration and in particular can not be a let variable when the next token is an identifier, array, or object.
        // However, when parsed as a sub-statement it will always parse a `let` as variable and only in the case where it is
        // followed by an array literal an ASI is forced ("restricted production").
        // Additionally, in strict mode `let` can not be the name of a variable regardless parsing a declaration or statement.
        if (isLabelled === IS_LABELLED || fdState === FDS_ILLEGAL || fdState === FDS_IFELSE) {
          // declarations not allowed
          parseLetExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp);
        } else {
          parseLetDeclaration(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, scoop, labelSet, fdState, nestedLabels, astProp);
        }
        return;

      case $ID_return:
        parseReturnStatement(lexerFlags, astProp);
        return;

      case $ID_switch:
        parseSwitchStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_throw:
        parseThrowStatement(lexerFlags, astProp);
        return;

      case $ID_try:
        parseTryStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_var:
        parseVarStatement(lexerFlags, scoop, astProp);
        return;

      case $ID_while:
        parseWhileStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_with:
        parseWithStatement(lexerFlags, scoop, labelSet, astProp);
        return;
    }

    parseIdentLabelOrExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp);
  }

  function parseFromNumberStatement(lexerFlags, astProp) {
    ASSERT(parseFromNumberStatement.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);
    ASSERT(isNumberToken(tok_getType()));

    let $tp_number_type = tok_getType();
    let $tp_number_line = tok_getLine();
    let $tp_number_column = tok_getColumn();
    let $tp_number_start = tok_getStart();
    let $tp_number_stop = tok_getStop();

    ASSERT_skipDiv($G_NUMBER, lexerFlags); // note: this can be any tail, semi, asi, etc

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: AST_getNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column),
    });
    parseExpressionAfterLiteral(lexerFlags, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column, 'expression');
    if (tok_getType() === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, $tp_number_start, $tp_number_line, $tp_number_column, NOT_ASSIGNABLE, 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_number_start, $tp_number_line, $tp_number_column, 'ExpressionStatement');
  }
  function parseFromStringStatement(lexerFlags, astProp) {
    ASSERT(parseFromStringStatement.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);
    ASSERT(isStringToken(tok_getType()));

    let $tp_string_line = tok_getLine();
    let $tp_string_column = tok_getColumn();
    let $tp_string_start = tok_getStart();
    let $tp_string_stop = tok_getStop();
    let $tp_string_canon = tok_getCanoN();

    ASSERT_skipDiv($G_STRING, lexerFlags); // note: this can be any tail, semi, asi, etc

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: AST_getStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, false),
    });
    parseExpressionAfterLiteral(lexerFlags, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, 'expression');
    if (tok_getType() === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, $tp_string_start, $tp_string_line, $tp_string_column, NOT_ASSIGNABLE, 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_string_start, $tp_string_line, $tp_string_column, 'ExpressionStatement');
  }
  function parseFromRegexStatement(lexerFlags, astProp) {
    ASSERT(parseFromRegexStatement.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);
    ASSERT(isRegexToken(tok_getType()), 'current token is regex', T(tok_getType()));

    let $tp_regex_line = tok_getLine();
    let $tp_regex_column = tok_getColumn();
    let $tp_regex_start = tok_getStart();
    let $tp_regex_stop = tok_getStop();

    ASSERT_skipDiv($G_REGEX, lexerFlags); // note: this can be any tail, semi, asi, etc

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: AST_getRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column),
    });
    parseExpressionAfterLiteral(lexerFlags, $tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column, 'expression');
    if (tok_getType() === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, $tp_regex_start, $tp_regex_line, $tp_regex_column, NOT_ASSIGNABLE, 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_regex_start, $tp_regex_line, $tp_regex_column, 'ExpressionStatement');
  }

  function parseTickStatement(lexerFlags, astProp) {
    ASSERT(parseTickStatement.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);

    let $tp_tick_line = tok_getLine();
    let $tp_tick_column = tok_getColumn();
    let $tp_tick_start = tok_getStart();
    let $tp_tick_stop = tok_getStop();

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: undefined,
    });
    parseTickExpression(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, 'expression');
    parseExpressionAfterLiteral(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, 'expression');
    if (tok_getType() === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, $tp_tick_start, $tp_tick_line, $tp_tick_column, NOT_ASSIGNABLE, 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_tick_start, $tp_tick_line, $tp_tick_column, 'ExpressionStatement');
  }

  function parseAsyncStatement(lexerFlags, scoop, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isExport, exportedBindings, isLabelled, fdState, astProp) {
    ASSERT(parseAsyncStatement.length === arguments.length, 'arg count');

    // an async statement is almost the same as an expression but it needs to know whether it was in fact
    // an expression or not so it knows how to apply the statement semi/asi.
    // at this point already verified not to be a label.
    // only the `async function ...` form does NOT require a semi as a statement. all other forms do.
    // A statement needs to pass on the scoop because the async func decl needs to record its id in that outer scope
    _parseAsync(lexerFlags, scoop, IS_STATEMENT, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, NOT_NEW_ARG, isExport, ASSIGN_EXPR_IS_OK, exportedBindings, isLabelled, fdState, NOT_LHSE, astProp);
  }
  function parseAsyncExpression(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, isExport, allowAssignment, leftHandSideExpression, astProp) {
    ASSERT(parseAsyncExpression.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // parsed the `async` keyword (-> $tp_asyncToken*)
    return _parseAsync(lexerFlags, DO_NOT_BIND, IS_EXPRESSION, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, isExport, allowAssignment, UNDEF_EXPORTS, NOT_LABELLED, FDS_ILLEGAL, leftHandSideExpression, astProp);
  }
  function _parseAsync(lexerFlags, scoop, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, isExport, allowAssignment, exportedBindings, isLabelled, fdState, leftHandSideExpression, astProp) {
    ASSERT(_parseAsync.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop = string', astProp);
    ASSERT(tok_getStart() !== $tp_async_start, 'should have consumed the async keyword');
    ASSERT(scoop === DO_NOT_BIND || scoop, 'potentially need scoop, for async func decls (only)');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    // this function will parse tail but NOT parse op and rhs.

    // consider these;
    // - `async x => x`
    // - `async x => {} * x`      (error)
    // - `async[x] * y`           (not error)
    // - `f(async x => x)`
    // - `f(async x => {} * x)`   (NOT error)
    // - `f(async[x] * y)`
    // but also
    // - `async + c`              (async + c)
    // - `async + c + d`          ((async + c) + d)
    // - `a + async + c + d`      (((a + async) + c) + d)
    // - `a + b + async + c + d`  ((((a + b) + async) + c) + d)
    // this last example shows `async` parser shouldn't just parse the op immediately but the statement that
    // is not a function should not just ASI after the async bit (that yields ((a+b)+(async+d)), so it needs more info.
    // - `new async()`
    // - `new async() => x`
    // - `new async() \n => x`
    // - `new async \n ();`

    // https://tc39.github.io/ecma262/#prod-AsyncArrowFunction
    // AsyncArrowFunction [In, Yield, Await]:
    //   async [no LineTerminator here] AsyncArrowBindingIdentifier [?Yield] [no LineTerminator here] => AsyncConciseBody [?In]
    //   CoverCallExpressionAndAsyncArrowHead [?Yield, ?Await] [no LineTerminator here] => AsyncConciseBody [?In]
    // CoverCallExpressionAndAsyncArrowHead [Yield, Await]:
    //   MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]
    //
    // Supplemental Syntax
    //   The interpretation of CoverCallExpressionAndAsyncArrowHead is refined using:
    //     AsyncArrowHead:
    //       async [no LineTerminator here] ArrowFormalParameters [~Yield, +Await]
    //
    // Early Errors:
    //   It is a Syntax Error if CoverCallExpressionAndAsyncArrowHead is not covering an AsyncArrowHead.
    //
    //
    // In human language there are two cases when parsing an async arrow; the arrow without parens and the arrow with.
    // When there is no paren, the newline immediately causes ASI and that's that. So `async \n x => y` is fine.
    // When there is a paren, the initial grammar has no newline condition. If the input matches the grammar, with or
    // without a newline after `async` (but definitely without a newline before the arrow!) then a mandatory extra
    // condition applies that there cannot be a newline after `async` and to treat it a syntax error if there is one.
    // However, note that there are contextual cases where an arrow would not be allowed in the first place, like unary
    // operators (you can't do `void () => x` or `void async () => x`). In those cases you would just parse async as a
    // call regardless. An arrow would be a syntax error by default but we can ignore the async-newline (again, either
    // way because it would be fine for the call). The tricky part is the case where an arrow is allowed but simply
    // not present. `let x = async \n (y);` is fine and not a syntax error. Only when the arrow is present we can
    // and should immediately throw an error when there was a newline after async. So this means we must parse through
    // to the arrow. At least it also means we won't have to "fix up" the AST retroactively.

    // parser decision tree based on tokens:
    // - `in`: this is `async in y` and is "okay" regardless of newlines
    // - `instanceof`: this is `async instanceof y` and is "okay" regardless of newlines
    // - eof: ASI after `async`
    // - newline
    //   - `function`: ASI after `async` (the function, if valid, will not be considered to be async)
    //   - ident: ASI after `async`
    //   - paren open, parse group
    //     - newline: this is `async(..)` and the newline is ignored
    //     - eof: this is `async(..)` and the newline is ignored
    //     - `=>`: no ASI, this is an error (see comment block above) because the cover grammar can't be applied
    //     - else: this is `async(..)` and the newline is ignored
    //   - else: `ASI after `async`
    // - `function`: must be async function
    // - ident
    //   - newline: error (because ASI must occur and `async foo;` is illegal)
    //   - eof: error (because ASI must occur and `async foo;` is illegal)
    //   - `=>`: arrow function without parenthesis
    //   - else: error (because `async foo;` is illegal)
    // - paren open, parsed group
    //   - newline: this is `async(..)`, if the arrow shows up after this group then that's an error
    //   - arrow: async arrow
    //   - else: `async(..)`
    // - else: `async` as a var name

    if (!allowAsyncFunctions) {
      if (tok_getType() === $ID_function && !tok_getNlwas()) {
        // Redundant check prevents generic "missing value" error
        return THROW_RANGE('Async functions are not supported in the currently targeted version, they are >= ES8 / ES2017', $tp_async_start, tok_getStop());
      }

      return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
    }

    let newlineAfterAsync = tok_getNlwas() === true;
    let $tp_afterAsync_type = tok_getType()

    if (isIdentToken($tp_afterAsync_type)) {
      // - `async foo ...`
      //          ^
      // - `async eval => {}`
      // - `async eval => { "use strict"; }`
      // - `async function f(){}`
      // - `async in x`
      // - `async in obj`
      // - `async \n function f(){}`
      //             ^

      let $tp_ident_stop = tok_getStop();

      if (newlineAfterAsync) {
        // This _MUST_ mean async is a regular var name so just parse an expression now.
        // - `async \n ident`
        //             ^
        // - `async \n foo;`
        // - `async \n in x`
        // - `async \n in obj`
        // - `async \n instanceof obj`
        // - `async \n function f(){}`
        return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
      }

      if ($tp_afterAsync_type === $ID_function) {
        // - `async function f(){}`
        if (leftHandSideExpression === ONLY_LHSE) {
          return THROW_RANGE('An async function expression is not allowed here', $tp_async_start, $tp_ident_stop);
        }

        return parseAsyncFunctionDecl(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, fromStmtOrExpr, scoop, isExport, exportedBindings, isLabelled, fdState, astProp);
      }

      // if (tok_getType() === $ID_of) TODO // should this be special cased?

      if ($tp_afterAsync_type === $ID_in || $tp_afterAsync_type === $ID_instanceof) {
        // - `async in x`
        // - `async instanceof x`

        return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
      }

      // - `async foo => ..`                        ok
      //          ^
      // - `async foo \n ..`                        error
      // - `async \n foo => ..`                     ok
      // - `async \n foo \n ..`                     error
      // - `export default async foo => ..`         ok (but only as default)

      if (isNewArg === IS_NEW_ARG) {
        // Note: cannot be `async function ...` because we checked for `function` above :)
        // - `new async x => x`
        //              ^
        return THROW_RANGE('Cannot apply `new` to an (async) arrow', $tp_async_start, $tp_ident_stop);
      }

      if (leftHandSideExpression === ONLY_LHSE) {
        return THROW_RANGE('An async function expression is not allowed here', $tp_async_start, $tp_ident_stop);
      }

      parseParenlessArrowAfterAsync(lexerFlags, fromStmtOrExpr, allowAssignment, $tp_async_start, $tp_async_line, $tp_async_column, astProp);
      return NOT_ASSIGNABLE;
    }

    if ($tp_afterAsync_type === $PUNC_PAREN_OPEN) {
      // - `async (y);`
      //          ^
      // - `async (x) => x`
      // - `async \n (foo);`                   --> `async(foo)`
      //             ^
      // - `async \n (foo) => foo`             --> error, cannot apply cover grammar
      // - `(async \n (foo);`                  --> `(async(foo))`
      // - `(async \n (foo) => foo)`           --> error, cannot apply cover grammar
      // - `let x = async \n (foo);`           --> `let x = async(foo);`
      // - `let x = async \n (foo) => foo`     --> error, cannot apply cover grammar

      if (isNewArg === IS_NEW_ARG) {
        // - `new async()`
        //             ^
        // - `new async();`
        // - `new async() =>x`                   --> error, arrow not allowed as new arg
        // Do not parse the paren because it belongs to the `new` op
        AST_setIdent('callee', $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon);
        return IS_ASSIGNABLE; // I mean ...
      }

      if (fromStmtOrExpr === IS_STATEMENT) {
        AST_open(astProp, {
          type: 'ExpressionStatement',
          loc: undefined,
          expression: undefined,
        });
        astProp = 'expression'
      }

      let r = parseGroupToplevels(lexerFlags, fromStmtOrExpr, allowAssignment, $ID_async, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, newlineAfterAsync ? IS_ASYNC_PREFIXED : NOT_ASYNC_PREFIXED, leftHandSideExpression, astProp);

      if (fromStmtOrExpr === IS_STATEMENT) {
        AST_close($tp_async_start, $tp_async_line, $tp_async_column, 'ExpressionStatement');
      }

      return r;
    }

    // async as a var name (if statement it may also be a label!)
    // - `async \n x => y`
    // - `async \n function f(){}`
    // - `x = async \n a => b`
    // - `x = async \n function f(){}`
    // - `async \n [x]`
    // - `(async \n [x])`
    // - `new async;`
    return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
  }

  function isAssignable(state) {
    return (state & IS_ASSIGNABLE) === IS_ASSIGNABLE;
  }
  function notAssignable(state) {
    return (state & NOT_ASSIGNABLE) === NOT_ASSIGNABLE;
  }
  function setAssignable(state) {
    // set both flags then unset the one we dont want
    return (state | IS_ASSIGNABLE | NOT_ASSIGNABLE) ^ NOT_ASSIGNABLE;
  }
  function setNotAssignable(state) {
    // set both flags then unset the one we dont want
    return (state | IS_ASSIGNABLE | NOT_ASSIGNABLE) ^ IS_ASSIGNABLE;
  }
  function mergeAssignable(override, state) {
    return override | ((state | NOT_ASSIGNABLE | IS_ASSIGNABLE) ^ (NOT_ASSIGNABLE | IS_ASSIGNABLE));
  }

  function parseAwait(lexerFlags, $tp_await_type, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_canon, isNewArg, allowAssignment, astProp) {
    ASSERT(parseAwait.length === arguments.length, 'arg count');
    ASSERT($tp_await_type === $ID_await, 'await token');
    ASSERT($tp_await_start !== tok_getStart(), 'await should have been skipped');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // in module: only if lexerFlags allow await (inside async code)
    // in script: must be considered an await-expression when inside async, must be considered a var name otherwise
    // (`await` when not a keyword _is_ assignable)

    if (hasAnyFlag(lexerFlags, LF_IN_ASYNC)) {
      return parseAwaitKeyword(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, isNewArg, astProp);
    }

    if (goalMode === GOAL_SCRIPT) {
      return parseAwaitVar(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_type, $tp_await_canon, isNewArg, allowAssignment, astProp)
    }

    return THROW_RANGE('Cannot use `await` as var when goal=module but found `await` outside an async function',tok_getStart(), tok_getStart() + 1);
  }
  function parseAwaitKeyword(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, isNewArg, astProp) {
    ASSERT(parseAwaitKeyword.length === arguments.length, 'arg count');

    if (isNewArg === IS_NEW_ARG) {
      // - `async function f(){ new await x; }`
      // - `async function f(){ [new await foo] }`
      // - `async function f(){ (new await foo) }`
      // - `function f(){ "use strict"; new await; }`
      // - `function *f(){ "use strict"; new await; }`
      // - `async function *f(){ new await; }`
      return THROW_RANGE('Cannot `await` as the arg of `new`', $tp_await_start, $tp_await_stop);
    }

    if (hasAllFlags(lexerFlags, LF_IN_FUNC_ARGS)) {
      // Illegal without arg (would already fail for that reason alone)
      // - `function f(x = await){}`
      // - `function *f(x = await){}`
      // - `async function f(x = await){}`
      // - `async function *f(x = await){}`
      // Illegal with arg
      // - `function f(x = await y){}`
      // - `function *f(x = await y){}`
      // - `async function f(x = await y){}`
      // - `async function *f(x = await y){}`
      // Illegal as arg name
      // - `function f(await){}`
      // - `function *f(await){}`
      // - `async function f(await){}`
      // - `async function *f(await){}`
      return THROW_RANGE('Await is illegal as default arg value', $tp_await_start, $tp_await_stop);
    }

    // - `async function f(){ new await; }`
    // - `async function *f(){ new await; }`

    AST_open(astProp, {
      type: 'AwaitExpression',
      loc: undefined,
      argument: undefined,
    });

    // - `await ()=>x` is an error (arrows are assignable)
    parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument'); // await expr arg is never optional

    if (tok_getType() === $PUNC_STAR_STAR) {
      return THROW_RANGE('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)', tok_getStart(), tok_getStop());
    }

    AST_close($tp_await_start, $tp_await_line, $tp_await_column, 'AwaitExpression');

    // An await-expression is not assignable and cannot appear inside;
    // - arrow function parameters
    // - async generator function/method parameters
    // - async function/method parameters
    // - async arrow parameters

    // See tests/testcases/await/function_piggy/autogen.md
    // See tests/testcases/await/arrow_piggy/autogen.md
    return NOT_ASSIGNABLE | PIGGY_BACK_SAW_AWAIT;
  }
  function parseAwaitVar(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_type, $tp_await_canon, isNewArg, allowAssignment, astProp) {
    ASSERT(parseAwaitVar.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    // Consider `await` a regular var name, not a keyword
    // Should throw an error if used as an await anyways

    // - `await;`
    // - `await.x;`
    // - `new await;`
    // - `typeof await;`

    // ok await as an arrow param is always illegal so we can probably just scan for arrow here and throw? same for yield. we can improve how we deal with the assignable and ditch most of it.
    let assignable = parseIdentOrParenlessArrow(lexerFlags, $tp_await_type, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_canon, IS_ASSIGNABLE, allowAssignment, astProp);
    assignable = parseValueTail(lexerFlags, $tp_await_start, $tp_await_line, $tp_await_column, assignable, isNewArg, NOT_LHSE, astProp);

    // For module goal see: https://tc39.github.io/ecma262/#prod-AwaitExpression
    // For script mode see: https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
    // - IdentifierReference
    // - BindingIdentifier
    // - LabelIdentifier
    // - Identifier: IdentifierName but not ReservedWord
    //   - inside something async (+Await) and canon is await: error
    //   - goal module and canon is await: error

    // See tests/testcases/await/function_piggy/autogen.md
    // See tests/testcases/await/arrow_piggy/autogen.md
    return assignable | PIGGY_BACK_SAW_AWAIT;
  }

  function parseBlockStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(parseBlockStatement.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof lexerFlags === 'number');
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'should have thrown if current wasnt a curly when calling this function');
    ASSERT_LABELSET(labelSet);

    let lexerFlagsNoTemplate = sansFlag(lexerFlags, LF_IN_TEMPLATE | LF_NO_ASI); // TODO: validate these. Are they for arrow inside a template?

    let $tp_curly_line = tok_getLine();
    let $tp_curly_column = tok_getColumn();
    let $tp_curly_start = tok_getStart();

    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlagsNoTemplate); // [v]: `(x)=>{/x/}`

    if (babelCompat) {
      // (All BlockStatements receive the `directives` property in the Babel AST... even when it can't have any directives.)
      AST_open(astProp, {
        type: 'BlockStatement',
        loc: undefined,
        directives: [],
        body: [],
      });
    } else {
      AST_open(astProp, {
        type: 'BlockStatement',
        loc: undefined,
        body: [],
      });
    }

    if (options_exposeScopes) AST_set('$scope', scoop);

    while (tok_getType() !== $PUNC_CURLY_CLOSE) {
      parseNestedBodyPart(lexerFlagsNoTemplate, scoop, labelSet, NOT_LABELLED, FDS_LEX, PARENT_NOT_LABEL,'body');
    }

    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlags);

    AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column, 'BlockStatement');

    if (tok_getType() === $PUNC_EQ) {
      return THROW_RANGE('A statement can not start with object destructuring assignment (because block)', tok_getStart(), tok_getStop());
    }
  }

  function parseBreakStatement(lexerFlags, labelSet, astProp) {
    ASSERT(arguments.length === parseBreakStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_break_line = tok_getLine();
    let $tp_break_column = tok_getColumn();
    let $tp_break_start = tok_getStart();
    let $tp_break_stop = tok_getStop();

    ASSERT_skipToStatementStart($ID_break, lexerFlags); // Note: the statement start would also parse an ident

    // A `break` may be followed by another identifier which must then be a valid label.
    // Otherwise it's just a `break` to the nearest breakable (most likely).

    // `break` without label is only valid inside an iteration or switch statement, fenced by functions
    // `break` with label is only valid if the label exists in the current statement tree

    let $tp_afterBreak_type = tok_getType();

    // Note: must check eof/semi as well otherwise the value would be mandatory and parser would throw
    if (isIdentToken($tp_afterBreak_type) && tok_getNlwas() === false) {

      let $tp_label_line = tok_getLine();
      let $tp_label_column = tok_getColumn();
      let $tp_label_start = tok_getStart();
      let $tp_label_stop = tok_getStop();
      let $tp_label_canon = tok_getCanoN();

      // Note: the assumption is that the label set only contains valid labels so we don't need to validate the label
      // here. We assume that it must be valid if it is in a label set
      findLabelForBreak(labelSet, $tp_label_start, $tp_label_stop, $tp_label_canon);

      ASSERT_skipToStatementStart($G_IDENT, lexerFlags);

      if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
        // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
        // We have already asserted to be inside a loop/switch so that's fine
        // - `label: for(;;) break label \n /foo/`
        // - `label: for(;;) break label \n /foo/x`
        tok_asi();
      } else {
        parseSemiOrAsi(lexerFlags);
      }

      AST_setNode(astProp, {
        type: 'BreakStatement',
        loc: AST_getClosedLoc($tp_break_start, $tp_break_line,  $tp_break_column),
        label: AST_getIdentNode($tp_label_start, $tp_label_stop, $tp_label_line, $tp_label_column, $tp_label_canon),
      });
    } else if (hasNoFlag(lexerFlags, LF_IN_ITERATION | LF_IN_SWITCH)) {
      // This is a `break` that is not inside a loop or switch
      // [v]: `if (x) break`
      return THROW_RANGE('Can only `break` without label inside a `switch` or loop', $tp_break_start, $tp_break_stop);
    } else {
      if (tok_getNlwas() === true && isRegexToken($tp_afterBreak_type)) {
        // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
        // We have already asserted to be inside a loop/switch so that's fine
        // - `for(;;) break \n /foo/`
        // - `for(;;) break \n /foo/x`
        tok_asi();
      } else {
        // This is a `break` inside a loop/switch
        // [v]: `for (;;) break`
        parseSemiOrAsi(lexerFlags);
      }

      AST_setNode(astProp, {
        type: 'BreakStatement',
        loc: AST_getClosedLoc($tp_break_start, $tp_break_line,  $tp_break_column),
        label: null,
      });
    }
  }
  function findLabelForBreak(inputLabelSet, $tp_label_start, $tp_label_stop, $tp_labelName_canon) {
    ASSERT(findLabelForBreak.length === arguments.length, 'arg count');
    ASSERT(!!inputLabelSet || inputLabelSet === null, 'label set that doesnt exist must be null');

    if (inputLabelSet === null) {
      return THROW_RANGE(`The label (\`${tok_sliceInput($tp_label_start, $tp_label_stop)}\`) for this \`break\` was not defined in the current label set, which is illegal`, $tp_label_start, $tp_label_stop);
    }

    let labelSet = inputLabelSet;

    // Note: the assumption is that the label set only contains valid labels so we don't need to validate the label
    // here. We assume that it must be valid if it is in a label set

    let id = $tp_labelName_canon;

    // Check parents all the way up to the label root (global or any kind of function scope)
    do {
      if (labelSet.statementLabels.has(id)) {
        return;
      }
    } while (labelSet = labelSet.parentLabels);


    THROW_RANGE('The label (`' + $tp_labelName_canon + '`) for this `break` was not defined in the current label set, which is illegal', $tp_label_start, $tp_label_stop);
  }

  function validateLabelForContinue(labelSet, $tp_label_canon, $tp_label_start, $tp_label_stop) {
    if (labelSet === null) {
      return THROW_RANGE('This `continue` had a label (`' + $tp_label_canon + '`) that was not defined in the current label set as the direct parent of a loop, which would be required', $tp_label_start, $tp_label_stop);
    }

    // Note: the assumption is that the label set only contains valid labels so we don't need to validate the label
    // here. We assume that it must be valid if it is in a label set

    // Must validate the label for a `continue`
    // The rule is very implicit but the most important clue is the ContainsUndefinedContinueTarget func and this:
    // https://tc39.es/ecma262/#sec-statement-semantics-static-semantics-containsundefinedcontinuetarget
    // in particular. The func tells you whether or not a valid `continue` label was declared or not.
    // It implicitly defines a valid label as any label that was defined as an immediate parent of an iteration
    // statement, or any immediate label parent of such parent. Visually, this means:
    // [v] `foo: for(;;) continue foo`
    // [x] `foo: bar: for(;;) continue foo`
    // [x] `foo: { for(;;) continue foo }`
    // [x] `foo: if (x) for(;;) continue foo`
    // [x] `for(;;) foo: continue foo`
    // [v] `for(;;) foo: for (;;) continue foo`
    // [v] `for(;;) { foo: for (;;) continue foo }`
    // [v] `foo: for(;;) for (;;) continue foo`
    // [v] `foo: for(;;) { for (;;) continue foo }`
    // [v] `foo: bar: for(;;) { for (;;) continue foo }`
    // [v] `foo: for(;;) { bar: for (;;) continue foo }`
    // The last examples, where the outer-for has a block child statement, shows that it's really about the
    // immediate parent node of any loop node in the current statement branch.
    // That gets a little tricky to track efficiently.

    let set = labelSet;

    // Check parents all the way up to the label root (global or any kind of function scope)
    do {
      if (set.iterationLabels && set.iterationLabels.has($tp_label_canon)) {
        return;
      }
    } while (set = set.parentLabels);

    return THROW_RANGE('This `continue` had a label (`' + $tp_label_canon + '`) that was not defined in the current label set as the direct parent of a loop, which would be required', $tp_label_start, $tp_label_stop);
  }

  function parseConstStatement(lexerFlags, scoop, isLabelled, fdState, astProp) {
    ASSERT(parseConstStatement.length === arguments.length, 'arg count');

    let $tp_const_line = tok_getLine();
    let $tp_const_column = tok_getColumn();
    let $tp_const_start = tok_getStart();
    let $tp_const_stop = tok_getStop();

    ASSERT_skipToBindingStart($ID_const, lexerFlags);

    if (isLabelled === IS_LABELLED || fdState === FDS_ILLEGAL || fdState === FDS_IFELSE) {
      return THROW_RANGE('Cannot parse a labelled const declaration, only expecting statements here', $tp_const_start, $tp_const_stop);
    }

    parseAnyVarDeclaration(lexerFlags, $tp_const_start, $tp_const_line, $tp_const_column, scoop, BINDING_TYPE_CONST, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
  }

  function parseContinueStatement(lexerFlags, labelSet, astProp) {
    ASSERT(arguments.length === parseContinueStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_continue_line = tok_getLine();
    let $tp_continue_column = tok_getColumn();
    let $tp_continue_start = tok_getStart();

    // continue is only valid inside a loop, fenced by functions
    if (hasNoFlag(lexerFlags, LF_IN_ITERATION)) {
      return THROW_RANGE('Can only `continue` inside a loop', $tp_continue_start, $tp_continue_start + 1);
    }

    ASSERT_skipToStatementStart($ID_continue, lexerFlags); // Note: statement start also includes an ident

    // a continue may be followed by another identifier which must then be a valid label.
    // otherwise it's just a continue to the nearest loop (most likely).

    // note: must check eof/semi as well otherwise the value would be mandatory and parser would throw
    if (isIdentToken(tok_getType()) && tok_getNlwas() === false) {

      let $tp_label_line = tok_getLine();
      let $tp_label_column = tok_getColumn();
      let $tp_label_start = tok_getStart();
      let $tp_label_stop = tok_getStop();
      let $tp_label_canon = tok_getCanoN();

      validateLabelForContinue(labelSet, $tp_label_canon, $tp_label_start, $tp_label_stop);

      ASSERT_skipToStatementStart($G_IDENT, lexerFlags);
      if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
        // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
        // Must be in loop, we checked this at the beginning
        // - `label: for (;;) continue label \n /foo/`
        // - `label: for (;;) continue label \n /foo/x`
        tok_asi();
      } else {
        parseSemiOrAsi(lexerFlags);
      }

      AST_setNode(astProp, {
        type: 'ContinueStatement',
        loc: AST_getClosedLoc($tp_continue_start, $tp_continue_line,  $tp_continue_column),
        label: AST_getIdentNode($tp_label_start, $tp_label_stop, $tp_label_line, $tp_label_column, $tp_label_canon),
      });
    } else {
      if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
        // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
        // Must be in loop, we checked this at the beginning
        // - `for (;;) continue \n /foo/`
        // - `for (;;) continue \n /foo/x`
        tok_asi();
      } else {
        // Must be in loop, we checked this at the beginning
        parseSemiOrAsi(lexerFlags);
      }
      AST_setNode(astProp, {
        type: 'ContinueStatement',
        loc: AST_getClosedLoc($tp_continue_start, $tp_continue_line,  $tp_continue_column),
        label: null,
      });
    }
  }

  function parseDebuggerStatement(lexerFlags, astProp) {
    let $tp_debugger_line = tok_getLine();
    let $tp_debugger_column = tok_getColumn();
    let $tp_debugger_start = tok_getStart();
    let $tp_debugger_stop = tok_getStop();

    ASSERT_skipToStatementStart($ID_debugger, lexerFlags);
    if (isRegexToken(tok_getType())) {
      if (tok_getNlwas() === false) {
        return THROW_RANGE('Missing semi-colon after debugger keyword', $tp_debugger_stop, $tp_debugger_stop);
      }
      // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
      // - `debugger \n /foo/`
      // - `debugger \n /foo/x`
      tok_asi();
    } else {
      parseSemiOrAsi(lexerFlags);
    }
    AST_setNode(astProp, {
      type: 'DebuggerStatement',
      loc: AST_getClosedLoc($tp_debugger_start, $tp_debugger_line,  $tp_debugger_column),
    });
  }

  function parseDoStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseDoStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_do_line = tok_getLine();
    let $tp_do_column = tok_getColumn();
    let $tp_do_start = tok_getStart();

    ASSERT_skipToStatementStart($ID_do, lexerFlags); // Note: most likely is a block...
    AST_open(astProp, {
      type: 'DoWhileStatement',
      loc: undefined,
      body: undefined,
      test: undefined,
    });
    // if the next part does not start with `{` then it is not a block and ASI can not happen. otherwise dont care here
    // note that functions and classes DO get ASI
    parseNestedBodyPart(lexerFlags | LF_IN_ITERATION, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    if (tok_getType() !== $ID_while) {
      return THROW_RANGE('A `do` must be followed by a `while`, but found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToParenOpenOrDie($ID_while, lexerFlags);
    parseStatementHeader(lexerFlags, 'test');
    // > 11.9.1: In ECMAScript 2015, Automatic Semicolon Insertion adds a semicolon at the end of a do-while statement if the
    // > semicolon is missing. This change aligns the specification with the actual behaviour of most existing implementations.
    // Note: no line terminator is required for this to proc. So `do;while(x)y` is valid (!)
    if (tok_getType() !== $PUNC_SEMI) {
      // Since ES6 the last semi (`;`) of a do-while is suseptible to ASI rules
      // These apply even without a newline, similar to blocks or function declarations
      // - `do ; while (x) y`
      // - `do ; while(x) \n /foo/`
      tok_asi();
    } else {
      parseSemiOrAsi(lexerFlags);
    }
    AST_close($tp_do_start, $tp_do_line, $tp_do_column, 'DoWhileStatement');
  }

  function parseExportDefaultAsync(lexerFlags, scoop, exportedBindings) {
    ASSERT(parseExportDefaultAsync.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $ID_async, 'expicitly checked at call site')

    // `export default async function f(){}`
    // `export default async function(){}`
    // `export default async () => y`
    // `export default async (x) => y`
    // `export default async x => y`
    // `export default async(x);`
    // `export default async.x;`

    let $tp_async_line = tok_getLine();
    let $tp_async_column = tok_getColumn();
    let $tp_async_start = tok_getStart();
    let $tp_async_stop = tok_getStop();
    let $tp_async_canon = tok_getCanoN();

    // Note: newlines after `async` are not an error here since you can export the variable `async`
    ASSERT_skipRex($ID_async, lexerFlags); // function, arrow, or value-tail (for it can be a legacy async)

    // note: default export doesnt care as much about function type
    if (tok_getType() === $ID_function) {
      // `export default async function f(){}`
      // `export default async function(){}`
      return parseAsyncStatement(lexerFlags, scoop, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, IS_EXPORT, exportedBindings, NOT_LABELLED, FDS_VAR, 'declaration');
      // no semi
    }

    // [v] `export default async () => y`
    // [v] `export default async (x) => y`
    // [v] `export default async x => y`
    // [v] `export default async(x);`
    // [v] `export default async.x;`

    // https://tc39.github.io/ecma262/#prod-ExportDeclaration
    // > export default [lookahead ∉ { function, async [no LineTerminator here] function, class }] AssignmentExpression [+In, ~Yield, ~Await] ;
    // > AssignmentExpression[In, Yield, Await] : AsyncArrowFunction [?In, ?Yield, ?Await]
    // so `export default async () => {};` should be fine
    parseAsyncExpression(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, NOT_NEW_ARG, IS_EXPORT, ASSIGN_EXPR_IS_OK, NOT_LHSE, 'declaration');

    // (this won't have any other name than "default")
    // bound names: "*default*"
    // exported binding: "*default*"
    // exported names: "default"
    parseSemiOrAsi(lexerFlags);
  }
  function parseExportDefault(lexerFlags, scoop, $tp_export_start, $tp_export_line, $tp_export_column, $tp_default_start, $tp_default_stop, exportedNames, exportedBindings, astProp) {
    ASSERT(parseExportDefault.length === arguments.length, 'arg count');

    AST_open(astProp, {
      type: 'ExportDefaultDeclaration',
      loc: undefined,
      declaration: undefined,
    });

    ASSERT_skipToExpressionStart($ID_default, lexerFlags); // Note: or a declaration, but that would start with ident, so is subsumed here... (footgun in 3... 2... 1...)

    // https://tc39.github.io/ecma262/#sec-exports-static-semantics-exportednames
    // https://tc39.github.io/ecma262/#sec-exports-static-semantics-exportedbindings

    // First record the `default` export name, which happens for any tail. If the tail is a declaration with
    // one or more names, those will also be recorded by sub parsers by passing on the binding objects.

    SCOPE_addLexBinding(scoop, $tp_default_start, $tp_default_stop, '*default*', BINDING_TYPE_LET, FDS_VAR); // TODO: confirm `let`
    addNameToExports(exportedNames, $tp_default_start, $tp_default_stop, 'default');
    addBindingToExports(exportedBindings, '*default*');

    if (tok_getType() === $ID_class) {
      // - `export default class {}`
      // - `export default class x{}`

      let $tp_exportedName_canon = parseClassDeclaration(lexerFlags, scoop, IDENT_OPTIONAL, NOT_LABELLED, FDS_LEX, 'declaration');

      addBindingToExports(exportedBindings, $tp_exportedName_canon);
      // no semi
    }
    else if (tok_getType() === $ID_function) {
      // - `export default function f(){}`
      // - `export default function* f(){}`
      // - `export default function(){}`
      // - `export default function* (){}`

      let $tp_function_line = tok_getLine();
      let $tp_function_column = tok_getColumn();
      let $tp_function_start = tok_getStart();
      let $tp_function_stop = tok_getStop();

      let $tp_exportedName_canon = parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, $UNTYPED, $tp_function_start, $tp_function_line, $tp_function_column, $tp_export_start, $tp_function_stop, IDENT_OPTIONAL, NOT_LABELLED, FDS_VAR, 'declaration');

      addBindingToExports(exportedBindings, $tp_exportedName_canon);
      // no semi
    }
    else if (tok_getType() === $ID_async) {
      parseExportDefaultAsync(lexerFlags, scoop, exportedBindings);
    }
    else {
      // - `export default 15`

      // any expression is exported as is (but is not a live binding)
      parseExpression(lexerFlags, 'declaration');
      parseSemiOrAsi(lexerFlags);
    }

    AST_close($tp_export_start, $tp_export_line, $tp_export_column, 'ExportDefaultDeclaration');
  }
  function parseExportStar(lexerFlags, $tp_export_start, $tp_export_line, $tp_export_column, exportedNames, astProp) {
    ASSERT(parseExportStar.length === arguments.length, 'arg count');

    // - `export * from "x"`
    //           ^
    // - `export * as y from "x"`
    //           ^

    let $tp_star_line = tok_getLine();
    let $tp_star_column = tok_getColumn();
    let $tp_star_start = tok_getStart();

    // Must skip `as` or `from`, but we'll check for those explicitly here, so just skipAny
    ASSERT_skipAny($PUNC_STAR, lexerFlags);

    if (tok_getType() === $ID_as) {
      // - `export * as y from "x"`
      //           ^

      if (!allowExportStarAs) {
        return THROW_RANGE('The `export * as x from src`, syntax was introduced in ES2020 but currently targeted version is lower', $tp_export_start, tok_getStop());
      }

      ASSERT_skipToIdentOrDie($ID_as, lexerFlags);
      // note: the exported _name_ can be any identifier, keywords included

      let $tp_exportedName_line = tok_getLine();
      let $tp_exportedName_column = tok_getColumn();
      let $tp_exportedName_start = tok_getStart();
      let $tp_exportedName_stop = tok_getStop();
      let $tp_exportedName_canon = tok_getCanoN();

      addNameToExports(exportedNames, $tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_canon);

      // Must skip to `from` but we'll check for that explicitly next, so just skipAny
      ASSERT_skipAny($G_IDENT, lexerFlags);

      // Create specifiers here because location of the specifier is the `* as x` part only (same for estree and babel)
      let specifiers = [{
        type: 'ExportNamespaceSpecifier',
        loc: AST_getClosedLoc($tp_star_start, $tp_star_line, $tp_star_column),
        exported: AST_getIdentNode($tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_line, $tp_exportedName_column, $tp_exportedName_canon),
      }];

      if (tok_getType() !== $ID_from) {
        return THROW_RANGE('Expected to find `as` or `from`, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
      }

      ASSERT_skipToStringOrDie($ID_from, lexerFlags); // Will throw if next token is not a string

      let $tp_source_line = tok_getLine();
      let $tp_source_column = tok_getColumn();
      let $tp_source_start = tok_getStart();
      let $tp_source_stop = tok_getStop();
      let $tp_source_canon = tok_getCanoN();

      ASSERT_skipToStatementStart($G_STRING, lexerFlags);

      // Source node is between `from` and semi (same between babel and estree)
      let source = AST_getStringNode($tp_source_start, $tp_source_stop, $tp_source_line, $tp_source_column, $tp_source_canon, false);

      parseSemiOrAsi(lexerFlags);

      if (babelCompat) {
        // No declarations prop
        AST_setNode(astProp, {
          type: 'ExportNamedDeclaration',
          loc: AST_getClosedLoc($tp_export_start, $tp_export_line, $tp_export_column),
          specifiers,
          source,
        });
      } else {
        AST_setNode(astProp, {
          type: 'ExportNamedDeclaration',
          loc: AST_getClosedLoc($tp_export_start, $tp_export_line, $tp_export_column),
          specifiers,
          declaration: null,
          source,
        });
      }

      return;
    }

    if (tok_getType() !== $ID_from) {
      return THROW_RANGE('Expected to find `as` or `from`, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    ASSERT_skipToStringOrDie($ID_from, lexerFlags); // Will throw if next token is not a string

    let $tp_source_line = tok_getLine();
    let $tp_source_column = tok_getColumn();
    let $tp_source_start = tok_getStart();
    let $tp_source_stop = tok_getStop();
    let $tp_source_canon = tok_getCanoN();

    ASSERT_skipToStatementStart($G_STRING, lexerFlags);

    // Source location is between `from` and semi
    let source = AST_getStringNode($tp_source_start, $tp_source_stop, $tp_source_line, $tp_source_column, $tp_source_canon, false);

    parseSemiOrAsi(lexerFlags);

    AST_setNode(astProp, {
      type: 'ExportAllDeclaration',
      loc: AST_getClosedLoc($tp_export_start, $tp_export_line,  $tp_export_column),
      source,
    });
  }
  function parseExportNamed(lexerFlags, scoop, $tp_export_start, $tp_export_stop, $tp_export_line, $tp_export_column, exportedNames, exportedBindings, astProp) {
    ASSERT(parseExportNamed.length === arguments.length, 'arg count');

    AST_open(astProp, {
      type: 'ExportNamedDeclaration',
      loc: undefined,
      specifiers: [],
      declaration: undefined,
      source: undefined,
    });

    let needsSemi = true;

    let $tp_exportValueStart_line = tok_getLine();
    let $tp_exportValueStart_column = tok_getColumn();
    let $tp_exportValueStart_start = tok_getStart();
    let $tp_exportValueStart_stop = tok_getStop();

    if (tok_getType() === $PUNC_CURLY_OPEN) {
      AST_set('declaration', null);
      // export {}
      // export {} from "x"

      // We don't know whether we need to use the names for exportBindings/exportNames until we see the token after
      // the closing curly. If that's "from" then we don't use the list, otherwise we do. So collect the names in
      // arrays :'( and act accordingly after the fact.
      let tmpExportedNames = new Set;
      ASSERT(tmpExportedNames._ = 'exported names');
      ASSERT(tmpExportedNames._i = ++uid_counter);
      let tmpExportedBindings = new Set;
      ASSERT(tmpExportedBindings._ = 'exported bindings');
      ASSERT(tmpExportedBindings._i = ++uid_counter);
      parseExportObject(lexerFlags, tmpExportedNames, tmpExportedBindings);

      if (tok_getType() === $ID_from) {
        // drop the tmp lists
        ASSERT_skipToStringOrDie($ID_from, lexerFlags);
        // TODO: what happens to dupe exported bindings or exported names here?

        let $tp_from_line = tok_getLine();
        let $tp_from_column = tok_getColumn();
        let $tp_from_start = tok_getStart();
        let $tp_from_stop = tok_getStop();
        let $tp_from_canon = tok_getCanoN();

        ASSERT_skipToStatementStart($G_STRING, lexerFlags);
        AST_setStringLiteral('source', $tp_from_start, $tp_from_stop, $tp_from_line, $tp_from_column, $tp_from_canon, false);
      } else {
        AST_set('source', null);
        // pump the names into the real sets now
        tmpExportedNames.forEach(name => addNameToExports(exportedNames, $tp_export_start, $tp_export_stop, name));
        tmpExportedBindings.forEach(name => addBindingToExports(exportedBindings, name));
      }
    }
    else if (tok_getType() === $ID_var) {
      // export var <bindings>

      let $tp_var_line = tok_getLine();
      let $tp_var_column = tok_getColumn();
      let $tp_var_start = tok_getStart();

      ASSERT_skipToBindingStart($ID_var , lexerFlags);
      parseAnyVarDeclaration(lexerFlags, $tp_var_start, $tp_var_line, $tp_var_column, scoop, BINDING_TYPE_VAR, FROM_EXPORT_DECL, exportedNames, exportedBindings, 'declaration');
      AST_set('source', null);
      needsSemi = false; // Note: If we parse the semi below then the loc will be incorrect
    }
    else if (tok_getType() === $ID_let) {
      // export let <bindings>

      let $tp_let_line = tok_getLine();
      let $tp_let_column = tok_getColumn();
      let $tp_let_start = tok_getStart();

      ASSERT_skipToBindingStart($ID_let, lexerFlags);
      parseAnyVarDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, BINDING_TYPE_LET, FROM_EXPORT_DECL, exportedNames, exportedBindings, 'declaration');
      AST_set('source', null);
      needsSemi = false; // Note: If we parse the semi below then the loc will be incorrect
    }
    else if (tok_getType() === $ID_const) {
      // export const <bindings>

      let $tp_const_line = tok_getLine();
      let $tp_const_column = tok_getColumn();
      let $tp_const_start = tok_getStart();

      ASSERT_skipToBindingStart($ID_const, lexerFlags);
      parseAnyVarDeclaration(lexerFlags, $tp_const_start, $tp_const_line, $tp_const_column, scoop, BINDING_TYPE_CONST, FROM_EXPORT_DECL, exportedNames, exportedBindings, 'declaration');
      AST_set('source', null);
      needsSemi = false; // Note: If we parse the semi below then the loc will be incorrect
    }
    else if (tok_getType() === $ID_class) {
      // export class ...
      let $tp_exportedName_canon = parseClassDeclaration(lexerFlags, scoop, IDENT_REQUIRED, NOT_LABELLED, FDS_LEX,'declaration');
      addNameToExports(exportedNames, $tp_exportValueStart_start, $tp_exportValueStart_stop, $tp_exportedName_canon);
      addBindingToExports(exportedBindings, $tp_exportedName_canon);
      needsSemi = false;
      AST_set('source', null);
    }
    else if (tok_getType() === $ID_function) {
      // - `export function f(){}`
      //           ^^^^^^^^
      // - `export function* f(){}`
      //           ^^^^^^^^
      // (anonymous should not be allowed but parsers seem to do it anyways)

      let $tp_function_stop = tok_getStop();

      let $tp_exportedName_canon = parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, $UNTYPED, $tp_exportValueStart_start, $tp_exportValueStart_line, $tp_exportValueStart_column, $tp_export_start, $tp_function_stop, IDENT_REQUIRED, NOT_LABELLED, FDS_LEX, 'declaration');

      addNameToExports(exportedNames, $tp_exportValueStart_start, $tp_exportValueStart_stop, $tp_exportedName_canon);
      addBindingToExports(exportedBindings, $tp_exportedName_canon);
      AST_set('source', null);
      needsSemi = false;
    }
    else if (tok_getType() === $ID_async) {
      // - `export async function f(){}`
      //           ^^^^^
      // - `export async function *f(){}`
      //           ^^^^^
      // (note: no arrows here because we require a name)

      let $tp_async_line = tok_getLine();
      let $tp_async_column = tok_getColumn();
      let $tp_async_start = tok_getStart();
      let $tp_async_stop = tok_getStop();

      // TODO: test case to this change
      ASSERT_skipDiv($ID_async, lexerFlags); // TODO: async could be ident, so `async/b` is a division

      if (tok_getType() !== $ID_function) {
        // - `export async \n a => b`
        return THROW_RANGE('Can only export async functions (not arrows), did not find a function', $tp_export_start, tok_getStop());
      }
      if (tok_getNlwas() === true) {
        // - `export async \n function(){}`
        return THROW_RANGE('Async can not be followed by a newline as it results in `export async;`, which is not valid (and probably not what you wanted)', $tp_export_start, $tp_async_stop);
      }

      let $tp_function_start = tok_getStart();
      let $tp_function_stop = tok_getStop();

      let $tp_exportedName_canon = parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, $ID_async, $tp_async_start, $tp_async_line, $tp_async_column, $tp_export_start, $tp_function_stop, IDENT_REQUIRED, NOT_LABELLED, FDS_LEX, 'declaration');

      addNameToExports(exportedNames, $tp_function_start, $tp_function_stop, $tp_exportedName_canon);
      addBindingToExports(exportedBindings, $tp_exportedName_canon);
      AST_set('source', null);
      needsSemi = false;
    }
    else {
      // `export foo;`
      return THROW_RANGE('Unknown export type `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` (note: you can only export individual vars through `export {foo};`)', tok_getStart(), tok_getStop());
    }

    if (needsSemi) {
      // The variable (let/const/var) decls will consume the semi for us
      if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
        ASSERT(hasNoFlag(lexerFlags, LF_NO_ASI), 'Export cases can only appear on the toplevel as a statement so ASI is always valid here');
        // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
        // `export {} \n /foo/`
        tok_asi();
      } else {
        parseSemiOrAsi(lexerFlags);
      }
    }
    AST_close($tp_export_start, $tp_export_line, $tp_export_column, 'ExportNamedDeclaration');
  }
  function parseExportStatement(lexerFlags, scoop, exportedNames, exportedBindings, isGlobalToplevel, astProp) {
    ASSERT(parseExportStatement.length === arguments.length, 'arg count');

    // export * FromClause ;
    // export ExportClause FromClause ;
    // export ExportClause ;
    // export VariableStatement ;
    // export let ;
    // export const ;
    // export class
    // export function
    // export async function
    // export generator function
    // export async generator function
    // export default class
    // export default function
    // export default async function
    // export default generator function
    // export default async generator function
    // export default assignment ;
    // ES2020 / ES11:
    // export * as bar from 'foo';

    // https://tc39.github.io/ecma262/#sec-module-semantics-static-semantics-early-errors
    // > It is a Syntax Error if the ExportedNames of ModuleItemList contains any duplicate entries.
    //   > The duplicate ExportedNames rule implies that multiple export default ExportDeclaration items within a ModuleBody is a Syntax Error.
    // > It is a Syntax Error if any element of the ExportedBindings of ModuleItemList does not also occur in either
    //   the VarDeclaredNames of ModuleItemList, or the LexicallyDeclaredNames of ModuleItemList.
    // https://tc39.github.io/ecma262/#sec-exports-static-semantics-exportednames
    // ExportedNames is a list of any symbol that's exported by name (most importantly `x` in `export {x}` since that's
    // the only export that doesn't end up in the scope). All exports must also be a global binding of some sort.

    let $tp_export_line = tok_getLine();
    let $tp_export_column = tok_getColumn();
    let $tp_export_start = tok_getStart();
    let $tp_export_stop = tok_getStop();

    // export sans default can do; var, let, const, function, async function, function *, class
    // export with default can do: function, async function, function *, class, and any assignment expression
    // regarding asi; classes and function decls dont get asi, anything else does. `default` does not change this.
    // note: the regular function, async function, and class may have no name only with `default`
    if (goalMode !== GOAL_MODULE) {
      return THROW_RANGE('The `export` keyword can only be used with the module goal', $tp_export_start, $tp_export_stop); // TODO: this should span the whole keyword
    }
    if (isGlobalToplevel === NOT_GLOBAL_TOPLEVEL) {
      return THROW_RANGE('The `export` keyword is only supported at the top level', $tp_export_start, $tp_export_stop);
    }

    ASSERT_skipToIdentStarCurlyOpen($ID_export, lexerFlags);

    if (tok_getType() === $ID_default) {

      let $tp_default_start = tok_getStart();
      let $tp_default_stop = tok_getStop();

      return parseExportDefault(lexerFlags, scoop, $tp_export_start, $tp_export_line, $tp_export_column, $tp_default_start, $tp_default_stop, exportedNames, exportedBindings, astProp);
    }

    if (tok_getType() === $PUNC_STAR) {
      return parseExportStar(lexerFlags, $tp_export_start, $tp_export_line, $tp_export_column, exportedNames, astProp);
    }

    return parseExportNamed(lexerFlags, scoop, $tp_export_start, $tp_export_stop, $tp_export_line, $tp_export_column, exportedNames, exportedBindings, astProp);
  }
  function addNameToExports(exportedNames, $tp_exportedName_start, $tp_exportedName_stop, exportedName) {
    ASSERT(exportedNames !== DO_NOT_BIND, 'use UNDEF_EXPORTS for exportedNames, not DO_NOT_BIND');
    ASSERT(exportedNames === UNDEF_EXPORTS || exportedNames._ === 'exported names', 'explicitly expecting to receive the `exportedNames` set');
    if (exportedNames !== UNDEF_EXPORTS && exportedName !== '') {
      if (exportedNames.has(exportedName)) {
        // Note: it's hard to get the range here because of how these names are gathered (arrow params, decl ids)
        return THROW_RANGE('Tried to export the name `' + exportedName + '` twice', $tp_exportedName_start, $tp_exportedName_stop);
      }
      exportedNames.add(exportedName);
    }
  }
  function addBindingToExports(exportedBindings, exportedTokenCanonName) {
    ASSERT(exportedBindings !== DO_NOT_BIND, 'use UNDEF_EXPORTS not DO_NOT_BIND');
    if (exportedBindings !== UNDEF_EXPORTS && exportedTokenCanonName !== '') {
      exportedBindings.add(exportedTokenCanonName);
    }
  }
  function parseExportObject(lexerFlags, tmpExportedNames, tmpExportedBindings) {
    ASSERT(parseExportObject.length === arguments.length, 'arg count');

    // - `export {...} from 'x'`
    ASSERT_skipToIdentCurlyClose($PUNC_CURLY_OPEN, lexerFlags);

    // A specifier must start with an ident and may have a trailing comma
    while (isIdentToken(tok_getType())) {
      parseExportSpecifier(lexerFlags, tmpExportedNames, tmpExportedBindings);

      if (tok_getType() !== $PUNC_COMMA) break; // Must mean `}` or error

      ASSERT_skipAny(',', lexerFlags);
    }

    if (tok_getType() !== $PUNC_CURLY_CLOSE) {
      if (tok_getType() === $PUNC_DOT_DOT_DOT) {
        return THROW_RANGE('Export object cannot have spread', tok_getStart(), tok_getStop());
      }
      if (tok_getType() === $PUNC_COLON) {
        return THROW_RANGE('Export object uses `as` to alias (`{a as y}`), not colon (`{a: y}`)', tok_getStart(), tok_getStop());
      }
      return THROW_RANGE('Export object can only have "shorthand" `{x}` or "as" `{x as y}', tok_getStart(), tok_getStop());
    }

    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlags);
  }
  function parseExportSpecifier(lexerFlags, tmpExportedNames, tmpExportedBindings) {
    ASSERT(parseExportSpecifier.length === arguments.length, 'arg count');

    // - `export {a} from 'x'`
    //            ^
    // - `export {a,} from 'x'`
    //            ^
    // - `export {a as b} from 'x'`
    //            ^
    // - `export {a as b,} from 'x'`
    //            ^
    // - `export {a, b} from 'x'`
    //               ^

    // Start with left of the (optional) `as`

    let $tp_name_line = tok_getLine();
    let $tp_name_column = tok_getColumn();
    let $tp_name_start = tok_getStart();
    let $tp_name_stop = tok_getStop();
    let $tp_name_canon = tok_getCanoN();

    // Exported name is either the right of the `as`, if present at all, and otherwise same as name

    let $tp_exportedName_line = tok_getLine();
    let $tp_exportedName_column = tok_getColumn();
    let $tp_exportedName_start = tok_getStart();
    let $tp_exportedName_stop = tok_getStop();
    let $tp_exportedName_canon = tok_getCanoN();

    ASSERT_skipAny($G_IDENT, lexerFlags);
    ASSERT_VALID(tok_getType() === $ID_as || tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_CURLY_CLOSE, 'limited options, wanted `as` comma or closing curly');

    // while the `$tt_nameToken` should be a valid non-keyword identifier, it also has to be bound and as such we
    // don't have to check it here since we already apply bind checks anyways and binding would apply this check
    if (tok_getType() === $ID_as) { // `export {x as y}` NOT `export {x:y}`
      ASSERT_skipToIdentOrDie($ID_as, lexerFlags);
      // note: the exported _name_ can be any identifier, keywords included

      $tp_exportedName_line = tok_getLine();
      $tp_exportedName_column = tok_getColumn();
      $tp_exportedName_start = tok_getStart();
      $tp_exportedName_stop = tok_getStop();
      $tp_exportedName_canon = tok_getCanoN();

      ASSERT_skipAny($G_IDENT, lexerFlags);
    }

    addNameToExports(tmpExportedNames, $tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_canon);
    addBindingToExports(tmpExportedBindings, $tp_name_canon);

    AST_setNode('specifiers', {
      type: 'ExportSpecifier',
      loc: AST_getClosedLoc($tp_name_start, $tp_name_line, $tp_name_column),
      local: AST_getIdentNode($tp_name_start, $tp_name_stop, $tp_name_line, $tp_name_column, $tp_name_canon),
      exported: AST_getIdentNode($tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_line, $tp_exportedName_column, $tp_exportedName_canon),
    });
  }

  function parseForStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseForStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    /*
     for(Expression ; Expression ; Expression) Statement
     for(var VariableDeclarationList [=init] ; Expression ; Expression) Statement
     for(let VariableDeclarationList [=init] ; Expression ; Expression) Statement
     for(const VariableDeclarationList [=init] ; Expression ; Expression) Statement

     for(LeftHandSideExpression in Expression) Statement
     for(var identOrPattern in Expression) Statement
     for(let identOrPattern in Expression) Statement
     for(const identOrPattern in Expression) Statement

     for(LeftHandSideExpression of AssignmentExpression) Statement
     for(var identOrPattern of Expression) Statement
     for(let identOrPattern of Expression) Statement
     for(const identOrPattern of Expression) Statement
    */
    // we won't know what the for-type is until we get past a semi or `in` or `of`
    // we need to parse for a pseudo-regular expression (without `in` operator)
    // while searching for the marker (in, for, ;) to clarify the for-type.

    // what we can expect
    // - arbitrary expression(s)
    // - var, let, const declaration, possibly multiple, possibly with initializer

    // markers;
    // - semi (-> normal for)
    // - `of` at operator time (-> for-of)
    // - `in` at operator time (-> for-in)
    // - var initializer (-> normal for)
    // - more than one var declared (-> normal for)
    // - expression that cannot be a LeftHandSideExpression (-> normal for)

    // basically, parse for a LeftHandSideExpression. then the next token should
    // either be a binary (or even unary) operator (in, of, or anything else) or
    // a semi. we can then proceed parsing down that particular path.

    let $tp_for_line = tok_getLine();
    let $tp_for_column = tok_getColumn();
    let $tp_for_start = tok_getStart();
    let $tp_for_stop = tok_getStop();

    ASSERT_skipToAwaitParenOpen($ID_for, lexerFlags);

    let awaitable = tok_getType() === $ID_await;
    if (awaitable) {
      let $tp_await_stop = tok_getStop();

      if (!allowAsyncGenerators) {
        return THROW_RANGE('`for await` is not supported by the current targeted language version, they were introduced in ES9/ES2018', $tp_for_start, $tp_await_stop);
      }

      if (hasNoFlag(lexerFlags, LF_IN_ASYNC)) {
        return THROW_RANGE('Can only use `for-await` inside an async function', $tp_for_start, $tp_await_stop);
      }

      ASSERT_skipToParenOpenOrDie($ID_await, lexerFlags);
    } else if (tok_getType() !== $PUNC_PAREN_OPEN) {
      return THROW_RANGE('Missing opening paren of the `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', $tp_for_start, $tp_for_stop);
    }

    ASSERT_skipToExpressionStartSemi($PUNC_PAREN_OPEN, lexerFlags);

    // If the next token is `var`, `let` or `const` then create a new scope layer. TODO: what about legacy `let` usage?
    // the for-header adds a special lex scope because there are special let/const/var rules in place we need to verify
    let hasOwnScope = false;
    if (tok_getType() === $ID_let || tok_getType() === $ID_const || tok_getType() === $ID_var) {
      scoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FOR_HEADER, 'parseForStatement(header)');
      ASSERT(scoop._funcName = '(for has no name)');
      hasOwnScope = true;
    }

    parseForHeader(sansFlag(lexerFlags | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION), $tp_for_start, scoop, awaitable, astProp);
    if (tok_getType() !== $PUNC_PAREN_CLOSE) {
      return THROW_RANGE('Missing closing paren of the `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToStatementStart($PUNC_PAREN_CLOSE, lexerFlags);
    parseNestedBodyPart(lexerFlags | LF_IN_ITERATION, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');

    if (hasOwnScope && options_exposeScopes) AST_set('$scope', scoop);

    AST_close($tp_for_start, $tp_for_line, $tp_for_column, ['ForStatement', 'ForInStatement', 'ForOfStatement']);
  }
  function parseForHeaderVar(lexerFlags, scoop, astProp) {
    ASSERT(parseForHeaderVar.length === arguments.length, 'arg count');

    // - `for (var x of y);`
    //         ^
    // - `for (var x;;);`

    let $tp_var_line = tok_getLine();
    let $tp_var_column = tok_getColumn();
    let $tp_var_start = tok_getStart();
    let $tp_var_stop = tok_getStop();

    ASSERT_skipToBindingStart($ID_var , lexerFlags);
    parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, $tp_var_start, $tp_var_line, $tp_var_column, scoop, BINDING_TYPE_VAR, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    // No need to dupe-check scope here

    // var decls are assignable
    return IS_ASSIGNABLE;
  }
  function parseForHeaderLet(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp) {
    ASSERT(parseForHeaderLet.length === arguments.length, 'arg count');

    // - `for (let x of y);`
    //         ^
    // - `for (let x;;);`

    let $tp_letIdent_type = tok_getType();
    let $tp_letIdent_line = tok_getLine();
    let $tp_letIdent_column = tok_getColumn();
    let $tp_letIdent_start = tok_getStart();
    let $tp_letIdent_stop = tok_getStop();
    let $tp_letIdent_canon = tok_getCanoN();

    ASSERT_skipDiv($ID_let, lexerFlags); // div; if let is varname then next token can be next line statement start and if that starts with forward slash it's a div

    let $tp_letArg_type = tok_getType();
    let $tp_letArg_stop = tok_getStop();

    // [v]: `for (let x of y);`
    //                ^
    if (isIdentToken($tp_letArg_type)) {
      // [v]: `for (let x in y);`
      //                ^
      // [v]: `for (let x of y);`
      //                ^
      // [v]: `for (let x;;);`
      //                ^
      // [v]: `for (let in y);`
      //                ^
      // [x]: `for (let of y);`
      //                ^
      if ($tp_letArg_type === $ID_in) {
        // Edge case makes `let` to be parsed as a var name in sloppy mode
        // [v]: `for (let in x)`
        //                ^^
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
          // Except in strict mode...
          // [x]: `for (let in x)`
          return THROW_RANGE('Let binding missing binding names as `let` cannot be a var name in strict mode', $tp_letIdent_start, $tp_letArg_stop);
        }
        AST_setIdent(astProp, $tp_letIdent_start, $tp_letIdent_stop, $tp_letIdent_line, $tp_letIdent_column, $tp_letIdent_canon);

        return IS_ASSIGNABLE; // the `let` variable name is assignable
      }

      if ($tp_letArg_type === $ID_of) {
        // [x]: `for (let of y);`
        //                ^^
        return THROW_RANGE('A `for (let of ...)` is always illegal', $tp_for_start, $tp_letArg_stop);
      }

      // [v]: `for (let x of y);`
      //                ^
      parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, $tp_letIdent_start, $tp_letIdent_line, $tp_letIdent_column, scoop, BINDING_TYPE_LET, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

      return IS_ASSIGNABLE; // decls are assignable
    }

    if ($tp_letArg_type === $PUNC_BRACKET_OPEN || $tp_letArg_type === $PUNC_CURLY_OPEN) {
      // [x]: `for (let [x] in y);`
      //                ^
      // [v]: `for (let {x} of y);`
      //                ^
      // [x]: `for (let [x] in y);`
      // [x]: `for (let {x} of y);`
      // [v]: `for (let [x] = x;;);`
      // [v]: `for (let {x} = x;;);`
      //                ^
      parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, $tp_letIdent_start, $tp_letIdent_line, $tp_letIdent_column, scoop, BINDING_TYPE_LET, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

      return IS_ASSIGNABLE; // decls are assignable
    }

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      // In strict mode, `let` must be a keyword, and since we did not see a valid binding token, this is an error
      // [x]: `for (let.x in y);`
      //               ^
      // [x]: `for (let() of y);`
      //               ^
      // [x]: `for (let + of y);`
      return THROW_RANGE('Let binding missing binding names in strict mode', $tp_letIdent_start, $tp_letIdent_stop);
    }

    // In sloppy mode,
    // `let` must now be a regular var name.
    // - The next token cannot be `[`, as that case has been taken care of above
    // - Cannot be `for (let of ...` since the next token is not an ident
    // [v]: `for (let.x in y);`
    //               ^
    // [x]: `for (let() of y);`
    //               ^
    // [x]: `for (let[x] in y);`
    // [x]: `for (let[x] of y);`
    // [x]: `for (let[x];;);`
    // [v]: `for (let;;);`
    // [x]: `for (let.x in y);`
    // [x]: `for (let.x of y);`
    // [v]: `for (let.x;;);`
    // [x]: `for (let + in y);`
    // [x]: `for (let + of y);`
    // [v]: `for (let + x;;);`
    // [x]: `for (let() in y);`
    // [x]: `for (let() of y);`
    // [v]: `for (let();;);`

    ASSERT($tp_letArg_type !== $PUNC_BRACKET_CLOSE, 'case handled above');
    ASSERT($tp_letArg_type !== $ID_in, 'case handled above');
    ASSERT($tp_letArg_type !== $ID_of, 'case handled above');

    if ($tp_letArg_type === $PUNC_SEMI) {
      // [v]: `for (let;;);`
      //               ^
      AST_setIdent(astProp, $tp_letIdent_start, $tp_letIdent_stop, $tp_letIdent_line, $tp_letIdent_column, $tp_letIdent_canon);
      return NOT_ASSIGNABLE;
    }

    // [v]: `for (let.foo in x);`
    //               ^
    // [x]: `for (let() in x);`
    // [v]: `for (let().foo in x);`
    // [x]: `for (let=10;;);`
    // [v]: `for (let.foo;;);`
    // [v]: `for (let();;);`
    // [x]: `for (let.foo of x);`
    // [x]: `for (let() of x);`
    // [x]: `for (let().foo of x);`
    // [x]: `for (let , x;;);`
    //                ^

    let assignable = parseValueAfterIdent(lexerFlags, $tp_letIdent_type, $tp_letIdent_start, $tp_letIdent_stop, $tp_letIdent_line, $tp_letIdent_column, $tp_letIdent_canon, BINDING_TYPE_NONE, ASSIGN_EXPR_IS_OK, astProp);

    assignable = parseExpressionFromOp(lexerFlags | LF_IN_FOR_LHS, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, assignable, astProp);

    if (tok_getType() === $ID_of) {
      // [x]: `for (let.a of x);`
      //               ^
      return THROW_RANGE('Cannot use `let` as a var name on the left side in a `for-of` header', $tp_for_start, tok_getStop());
    }

    return assignable;
  }
  function parseForHeaderConst(lexerFlags, scoop, astProp) {
    ASSERT(parseForHeaderConst.length === arguments.length, 'arg count');

    // - `for (const x of y);`
    //         ^
    // - `for (const x;;);`

    let $tp_const_line = tok_getLine();
    let $tp_const_column = tok_getColumn();
    let $tp_const_start = tok_getStart();

    ASSERT_skipToBindingStart($ID_const, lexerFlags);
    parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, $tp_const_start, $tp_const_line, $tp_const_column, scoop, BINDING_TYPE_CONST, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

    // const decl is assignable
    return IS_ASSIGNABLE;
  }
  function parseForHeaderCurly(lexerFlags, astProp) {
    ASSERT(parseForHeaderCurly.length === arguments.length, 'arg count');

    // for-in, for-of, for-await
    // - `for ({}.x in y);`
    // - `for ({}.x);`                 // bad
    // - `for ({};;);`                 // bad
    // - `for ({} in y);`
    // - `for ({} = y in y);`
    // - `for ({x} = y in z);`
    // - `for ({x} = y of z);`
    // - `for ({x} = y);`              // bad
    // - `for ({x} = y;;);`
    // - `for ({x};;);`
    // - `for ({x}.y in z);`

    let $tp_curly_line = tok_getLine();
    let $tp_curly_column = tok_getColumn();
    let $tp_curly_start = tok_getStart();
    let $tp_curly_stop = tok_getStop();

    let destructible = parseObjectOuter(lexerFlags | LF_IN_FOR_LHS, DO_NOT_BIND, BINDING_TYPE_NONE, SKIP_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

    let $tp_curlyClose_type = tok_getType();
    let $tp_curlyClose_stop = tok_getStart(); // for error only. Will also contain the whitespace but so be it

    if (hasAllFlags(destructible, MUST_DESTRUCT)) {
      if ($tp_curlyClose_type !== $PUNC_EQ && $tp_curlyClose_type !== $ID_of && $tp_curlyClose_type !== $ID_in) {
        // - `for ({a=b};;);`
        return THROW_RANGE('Cannot use lhs as regular for-loop because it must destruct', $tp_curly_start, $tp_curlyClose_stop);
      }

      // [x]: `for ({x=y} = b in x) ;`
      // [x]: `async function f(){ for await ({x=y}=x of x) ; }`
      // [x]: `for ({x=y}=x in x) ;`
      // [v]: `for ({x=y}=x ;;) ;`
      // [x]: `for ({eval = 0} in x);`   // Must destruct (due to init to shorthand) and cant (due to assignment to eval in strict)
      // [v]: `for ({eval = 0} ;;);`     // No writing to eval going on here
      destructible = sansFlag(destructible, MUST_DESTRUCT); // TODO: why do we remove this flag here?
    }

    // Note: the header may not be assignable if it was a destructuring assignment
    return parsePatternTailInForHeader(lexerFlags, $tp_curly_start, $tp_curly_stop, $tp_curly_line, $tp_curly_column, $PUNC_CURLY_CLOSE, destructible, astProp);
  }
  function parseForHeaderBracket(lexerFlags, astProp) {
    ASSERT(parseForHeaderBracket.length === arguments.length, 'arg count');

    // for-in, for-of, for-await
    // - `for ([].x in y);`
    // - `for ([].x);`                 // bad
    // - `for ([x];;);`                // bad
    // - `for ([] in y);`
    // - `for ([] = y in y);`
    // - `for ([x] = y in z);`
    // - `for ([x] = y of z);`
    // - `for ([x] = y);`              // bad
    // - `for ([x] = y;;);`
    // - `for ([x];;);`
    // - `for ([x].y in z);`

    let $tp_square_line = tok_getLine();
    let $tp_square_column = tok_getColumn();
    let $tp_square_start = tok_getStart();
    let $tp_square_stop = tok_getStop();

    let destructible = parseArrayOuter(lexerFlags | LF_IN_FOR_LHS, DO_NOT_BIND, BINDING_TYPE_NONE, SKIP_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

    let $tp_bracketClose_type = tok_getType();
    let $tp_bracketClose_stop = tok_getStart(); // for error only. Will also contain the whitespace but so be it

    if (hasAllFlags(destructible, MUST_DESTRUCT)) {
      if ($tp_bracketClose_type !== $PUNC_EQ && $tp_bracketClose_type !== $ID_of && $tp_bracketClose_type !== $ID_in) {
        // - `for ({a=b};;);`
        return THROW_RANGE('Cannot use lhs as regular for-loop because it must destruct', $tp_square_start, $tp_bracketClose_stop);
      }

      // - `for ([{x=y}]=x in x) ;`
      destructible = sansFlag(destructible, MUST_DESTRUCT); // TODO: why do we remove this flag here?
    }

    let assignable = parsePatternTailInForHeader(lexerFlags, $tp_square_start, $tp_square_stop, $tp_square_line, $tp_square_column, $PUNC_BRACKET_CLOSE, destructible, astProp);

    // Note: the header may not be assignable if it was a destructuring assignment
    return assignable;
  }
  function parseForHeaderOther(lexerFlags, astProp) {
    ASSERT(parseForHeaderOther.length === arguments.length, 'arg count');

    // If the LHS is an object or array then it must cover an AssignmentPattern. In this case it may have an
    // initializer for any of its part or the lhs as a while (so `for ([]=1 in x);` is valid). There are tests.
    // The lhs of a `for-in` or `for-of` must be an obj/array assignment pattern, or otherwise a simple assignment
    // target (meaning it must end with a property, which may be a dynamic prop). Anything ok for regular `for-loop`

    // for-in, for-of, for-await
    // - `for (1;;);`
    //         ^
    // - `for ("foo";;);`
    //         ^^^^^
    // - `for (/foo/;;);`
    //         ^^^^^
    // - `for ("foo" in y);`            // bad
    //         ^^^^^
    // - `for ("foo".x in y);`
    // - `for ("foo".x = z in y);`      // bad
    // - `for ("foo".x += z in y);`     // bad
    // - `for ("foo".x += z;;);`        // good (.. ok, "acceptable")
    // - `for (()=>x in y);`            // bad (`in` becomes part of the arrow)
    // - `for (()=>(x) in y);`          // bad
    // - `for ((()=>x) in y);`          // bad (?)

    // - `for (b↵++c;;);`
    // - `for (a=>b;;);`
    // - `for (a=>b in c);`    // error
    // - `for (a=>b in c);`    // error

    return parseValue(lexerFlags | LF_IN_FOR_LHS, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);
  }
  function parseForHeader(lexerFlags, $tp_for_start, scoop, awaitable, astProp) {
    ASSERT(arguments.length === parseForHeader.length, 'arg count');
    ASSERT(typeof awaitable === 'boolean');

    // TODO: confirm we do this;
    // > It is a Syntax Error if IsValidSimpleAssignmentTarget of LeftHandSideExpression is false.
    // And https://tc39.github.io/ecma262/#sec-assignment-operators-static-semantics-assignmenttargettype
    // clearly states the regular assignment itself is not a valid (so not a simple one either) assignment target
    // (This doesn't prevent a=b=c because assignments are right-associative)

    // first parse a simple expression and check whether it's assignable (var or prop)

    // - `for (;;);`
    //         ^
    // - `for (x in y);`
    //         ^
    // - `for (x of y);`
    //         ^

    let $tp_startOfForHeader_line = tok_getLine();
    let $tp_startOfForHeader_column = tok_getColumn();
    let $tp_startOfForHeader_start = tok_getStart();
    let $tp_startOfForHeader_stop = tok_getStop();

    let assignable = parseForHeaderLhs(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp);

    return parseForHeaderRest(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, awaitable, assignable, astProp);
  }
  function parseForHeaderLhs(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp) {
    ASSERT(parseForHeaderLhs.length === arguments.length, 'arg count');

    switch (tok_getType()) {
      case $ID_var:
        return parseForHeaderVar(lexerFlags, scoop, astProp);

      case $ID_let:
        return parseForHeaderLet(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp);

      case $ID_const:
        return parseForHeaderConst(lexerFlags, scoop, astProp);

      case $PUNC_SEMI:
        AST_setNodeDangerously(astProp, null); // Sets `init` to null
        return NOT_ASSIGNABLE;

      case $PUNC_CURLY_OPEN:
        return parseForHeaderCurly(lexerFlags, astProp);

      case $PUNC_BRACKET_OPEN:
        return parseForHeaderBracket(lexerFlags, astProp);
    }

    let assignable = parseForHeaderOther(lexerFlags, astProp);
    // we are still in the `init` part of a classic for. keep parsing _with_ LF_IN_FOR_LHS from the current expression value.
    // [v]: `for (a+b;;) c;`
    //             ^
    return parseExpressionFromOp(lexerFlags | LF_IN_FOR_LHS, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, assignable, astProp);
  }
  function parseForHeaderRest(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, awaitable, assignable, astProp) {
    ASSERT(parseForHeaderRest.length === arguments.length, 'arg count');

    // in all cases either; parse a var, let, const, or assignment expression
    // there can be multiple vars and inits
    // for-in and for-of can only have one var without inits (invalidate after)

    // - `for (x of y);`
    //           ^
    // - `for (x in y);`
    //           ^
    // - `for (x;;);`
    //          ^

    if (tok_getType() === $ID_of) {
      return parseForFromOf(lexerFlags, $tp_for_start, awaitable, assignable, astProp);
    }

    if (awaitable) {
      return THROW_RANGE('`for await` only accepts the `for-of` type', $tp_for_start, tok_getStop());
    }

    if (tok_getType() === $ID_in) {
      return parseForFromIn(lexerFlags, $tp_for_start, assignable, astProp);
    }

    AST_wrapClosedCustom(astProp, {
      type: 'ForStatement',
      loc: undefined,
      init: undefined,
      test: undefined,
      update: undefined,
      body: undefined,
    }, 'init');

    // parseExpressionFromOp(lexerFlags | LF_IN_FOR_LHS, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, assignable, 'init');

    return parseForFromSemi(lexerFlags, $tp_startOfForHeader_start, $tp_startOfForHeader_line, $tp_startOfForHeader_column);
  }
  function parseForFromOf(lexerFlags, $tp_for_start, awaitable, assignable, astProp) {
    ASSERT(parseForFromOf.length === arguments.length, 'arg count');

    if (notAssignable(assignable)) {
      // I think it's fine to include the `for` and `of` in the error pointer. Anything else will be ugly anyways.
      return THROW_RANGE('Left part of for-of must be assignable', $tp_for_start, tok_getStop());
    }

    AST_wrapClosedCustom(astProp, {
      type: 'ForOfStatement',
      loc: undefined,
      left: undefined,
      right: undefined,
      await: awaitable, // as per https://github.com/estree/estree/pull/138
      body: undefined,
    }, 'left');

    ASSERT_skipToExpressionStart($ID_of, lexerFlags);

    // `for (a of b=c) ..`
    // Note that this rhs is an AssignmentExpression, _not_ a SequenceExpression
    parseExpression(lexerFlags, 'right');
  }
  function parseForFromIn(lexerFlags, $tp_for_start, assignable, astProp) {
    ASSERT(parseForFromIn.length === arguments.length, 'arg count');

    if (notAssignable(assignable)) {
      // I think it's fine to include the `for` and `of` in the error pointer. Anything else will be ugly anyways.
      return THROW_RANGE('Left part of for-in must be assignable', $tp_for_start, tok_getStop());
    }
    AST_wrapClosedCustom(astProp, {
      type: 'ForInStatement',
      loc: undefined,
      left: undefined,
      right: undefined,
      body: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart($ID_in, lexerFlags);
    // `for (a in b=c) ..`
    parseExpressions(lexerFlags, 'right');
  }
  function parseForFromSemi(lexerFlags, $tp_startOfForHeader_start, $tp_startOfForHeader_line, $tp_startOfForHeader_column) {
    ASSERT(parseForFromSemi.length === arguments.length, 'arg count');

    let hadComma = tok_getType() === $PUNC_COMMA;
    let potentialCommaStart = tok_getStart();
    if (hadComma) {
      // - `for (a, b;;);`
      //          ^
      // - `for (a, b in c);`
      // - `for (a, b of c);`
      _parseExpressions(lexerFlags | LF_IN_FOR_LHS, $tp_startOfForHeader_start, $tp_startOfForHeader_line, $tp_startOfForHeader_column, NOT_ASSIGNABLE, 'init');
    }

    if (tok_getType() !== $PUNC_SEMI) {
      if (hadComma && (tok_getType() === $ID_of || tok_getType() === $ID_in)) {
        // note: `x in y` is valid so `for(a,x in y)` will parse up to the `)`. since `of` is not an op it stops at `of`.
        // [x]: `for (a,b of c) d;`
        return THROW_RANGE('Comma not allowed in left side of `for-in`/`for-of` header', potentialCommaStart, potentialCommaStart + 1);
      }
      return THROW_RANGE('Missing first semi in `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    return _parseForFromSemi(lexerFlags);
  }
  function _parseForFromSemi(lexerFlags) {
    ASSERT(_parseForFromSemi.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_SEMI, 'should be explicitly checked by caller');

    ASSERT_skipToExpressionStartSemi(';', lexerFlags);

    if (tok_getType() === $PUNC_SEMI) {
      AST_set('test', null);
    } else {
      parseExpressions(lexerFlags, 'test');
      if (tok_getType() !== $PUNC_SEMI) {
        // [x]: `for (;a);`
        return THROW_RANGE('Missing second semi in `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
      }
    }

    ASSERT_skipToExpressionStartGrouped(';', lexerFlags); // the second semi may immediately be followed by `)`

    if (tok_getType() === $PUNC_PAREN_CLOSE) {
      AST_set('update', null);
    } else {
      parseExpressions(lexerFlags, 'update');
    }
  }
  function parsePatternTailInForHeader(lexerFlags, $tp_patternStart_start, $tp_patternStart_stop, $tp_patternStart_line, $tp_patternStart_column, closingPuncType, destructible, astProp) {
    ASSERT(parsePatternTailInForHeader.length === arguments.length, 'arg count');

    let assignable = hasAnyFlag(destructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE;

    let $tp_patternTailStart_type = tok_getType();

    // Have to make sure this is not a compound assignment to a pattern. And have to do it before the tail (`[].x+=y`)
    // - `for ([] = x;;);`
    // - `for ([] = x in y);`
    if ($tp_patternTailStart_type !== $PUNC_EQ && isAnyAssignmentOp()) {
      // - `for ([] += x;;);`
      // - `for ([] /= x in y);`
      return THROW_RANGE('Cannot compound assign to an object or array pattern', tok_getStart(), tok_getStop());
    }

    // - `for ({}`
    //           ^
    // - `for ([]`
    //           ^
    // - `for ([].foo in`
    //           ^
    // - `for ([] in x`
    //            ^
    // Unnecessary overhead most of the time but it makes certain edge cases just easier to deal with
    assignable = parseValueTail(lexerFlags | LF_IN_FOR_LHS, $tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);

    // - `for ([].foo in x);`
    //                ^
    // - `for ([] in x);`
    //            ^
    // - `for ([] = x in x);`
    //            ^
    // - `for ([] of x);`
    // - `for ([] ;;);`

    let $tp_afteLhs_type = tok_getType();

    if ($tp_afteLhs_type === $ID_of || $tp_afteLhs_type === $ID_in) {
      // - `for ({} on y);`
      // - `for ({} = y on y);`
      // - `for ({x} = y on z);`
      // - `for ({x} = y of z);`
      // - `for await ({} on y);`
      // - `for await ({} = y on y);`
      // - `for await ({x} = y on z);`
      // - `for await ({x} = y of z);`
      // - `for ([] in y);`
      // - `for ([] = y in y);`
      // - `for ([x] = y in z);`
      // - `for ([x] = y of z);`
      // (Also all `for await` cases go here. The `for await ( ... in ... )` case is invalidated in the rest parser.)
      // - `for await ([x] = y of z);`
      // - `for await ([x] = y in z);`

      // - `for ({} in y);`
      // - `for ({} = y in y);`
      // - `for ({x} = y in z);`
      // - `for ({x} = y of z);`
      // - `for ([] in y);`
      // - `for ([] = y in y);`
      // - `for ([x] = y in z);`
      // - `for ([x] = y of z);`

      if (notAssignable(assignable)) {
        return THROW_RANGE('The for-header lhs binding pattern is not destructible', tok_getStart(), tok_getStop());
      }

      AST_destruct(astProp);

      return assignable;
    }

    if ($tp_afteLhs_type === $PUNC_SEMI) {
      // - `for ({a};;);`
      // - `for ([a];;);`

      return assignable;
    }

    if ($tp_afteLhs_type === $PUNC_EQ) {
      let $tp_eq_start = tok_getStart();
      let $tp_eq_stop = tok_getStop();

      // This can be fine if inside a regular `for-loop`. Only if we see `in` or `of` before the `;` are we in trouble.
      parseExpressionFromOp(lexerFlags| LF_IN_FOR_LHS, $tp_patternStart_start, $tp_patternStart_stop, $tp_patternStart_line, $tp_patternStart_column, assignable, astProp);

      if (tok_getType() === $PUNC_SEMI) {
        // This is fiiiine
        // - `for ([] = x ;;);`
        // - `for ({} = x ;;);`

        return NOT_ASSIGNABLE;
      }

      // Error branch

      if (tok_getType() === $ID_in || tok_getType() === $ID_of) {
        // - `for ([] = x in y);`
        // - `for ({} = x of y);`
        // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements-static-semantics-early-errors
        // > It is a Syntax Error if LeftHandSideExpression is either an ObjectLiteral or an ArrayLiteral and if LeftHandSideExpression is not covering an AssignmentPattern.
        // This means, IF the lhs is an object, THEN it must also cover a Pattern. It does not say the lhs can be any
        // Pattern. The important distinction is that if it could be any Pattern, then it could have a "top level"
        // initialiser. But as the wording stands, it may be a Pattern if and only if it would match an object or array
        // literal as a whole. And `[] = x` would be an assignment, not an obj/arr literal. So it is an error.
        return THROW_RANGE('The left side of a `for-of` and `for-in` can not be an assignment, even if it is a BindingPattern', $tp_eq_start, $tp_eq_stop);
      }

      // End of the expression before finding `in`, `of`, or a semi colon.
      // - `for ([] = x);`
      return THROW_RANGE('Unknown input followed the left side of a for loop header after assignment', tok_getStart(), tok_getStop());
    }

    // This must lead to a semi-colon, or an error

    // [v]: `for ([] + x;;);`
    //               ^
    // [v]: `for ([].w ^= s;;) x;`
    //              ^
    // [v]: `for ({}[y] &= x;;) x;`
    //              ^
    // [v]: `for ({}.u |= c;;) x;`
    // [x]: `for ({});`
    //              ^

    // Note: at this point we've parsed the value tail and checked that the next token is not `in`, `of`, or an
    // assignment, so all we have to do now is continue parsing a regular value and assert that this must be a
    // regular for-loop, so the value must be followed by a semi. Hence, we don't care about assignability here.
    // We also don't care about the yield/await piggies because we are in a for-header, never a function header.
    parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_patternStart_start, $tp_patternStart_stop, $tp_patternStart_line, $tp_patternStart_column, assignable, destructible, closingPuncType, astProp);

    // [v]: `for ([] + x;;);`
    //                  ^
    if (tok_getType() === $PUNC_COMMA) {
      // Don't care about assignable await/yield flags
      // [v]: `for ([], x;;);`
      //              ^
      _parseExpressions(lexerFlags, $tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, NOT_ASSIGNABLE, astProp);
    }

    if (tok_getType() === $PUNC_SEMI) {
      return assignable;
    }

    // [x]: `for ([]);`
    //              ^
    // [x]: `for ({});`
    //              ^
    return THROW_RANGE('Unknown input followed the left side of a for loop header', tok_getStart(), tok_getStop());
  }

  function parseIfStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseIfStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_if_line = tok_getLine();
    let $tp_if_column = tok_getColumn();
    let $tp_if_start = tok_getStart();

    ASSERT_skipToParenOpenOrDie($ID_if, lexerFlags);
    AST_open(astProp, {
      type: 'IfStatement',
      loc: undefined,
      test: undefined,
      consequent: undefined,
      alternate: undefined,
    });

    // TODO: > "It is a Syntax Error if IsLabelledFunction(Statement) is true."
    // TODO: > "It is only necessary to apply this rule if the extension specified in B.3.2 is implemented."

    // TODO: > "Each else for which the choice of associated if is ambiguous shall be associated with the
    // TODO:    nearest possible if that would otherwise have no corresponding else."

    parseStatementHeader(lexerFlags, 'test');
    parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_IFELSE, PARENT_NOT_LABEL, 'consequent');
    if (tok_getType() === $ID_else) {
      ASSERT_skipToStatementStart($ID_else, lexerFlags);
      parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_IFELSE, PARENT_NOT_LABEL, 'alternate');
    } else {
      AST_set('alternate', null);
    }
    AST_close($tp_if_start, $tp_if_line, $tp_if_column, 'IfStatement');
  }

  function parseImportDeclaration(lexerFlags, scoop, isGlobalToplevel, astProp) {
    ASSERT(parseImportDeclaration.length === arguments.length, 'arg count');
    // https://tc39.github.io/ecma262/#sec-imports
    // import 'x'
    // import * as y from 'x'
    // import x from 'x'
    // import x, * as z from 'x'
    // import {} from 'x'
    // import {a} from 'x'
    // import {a as b} from 'x'
    // import {a,b} from 'x'
    // import {a as c,b} from 'x'
    // import {a,b,} from 'x'
    // import x, {...} from 'x'
    // (cannot create a var named `yield` or `await` or `let` this way)

    let $tp_import_line = tok_getLine();
    let $tp_import_column = tok_getColumn();
    let $tp_import_start = tok_getStart();
    let $tp_import_stop = tok_getStop();

    ASSERT_skipToIdentStarCurlyOpenParenOpenString($ID_import, lexerFlags);
    if (tok_getType() === $PUNC_PAREN_OPEN) {
      // This must be dynamic `import()` or an error
      return parseDynamicImportStatement(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, astProp);
    }

    // Note: since `import()` is valid in non-global, and in non-module-goal, we have to check the token after `import` first

    if (goalMode !== GOAL_MODULE) {
      return THROW_RANGE('The `import` keyword can only be used with the module goal', $tp_import_start, $tp_import_stop);
    }
    if (isGlobalToplevel === NOT_GLOBAL_TOPLEVEL) {
      return THROW_RANGE('The `import` keyword is only supported at the top level', $tp_import_start, $tp_import_stop);
    }

    AST_open(astProp, {
      type: 'ImportDeclaration',
      loc: undefined,
      specifiers: [],
      source: undefined,
    });

    if (isIdentToken(tok_getType())) {
      // import x from 'x'
      //        ^
      // import x, * as z from 'x'
      // import x, {...} from 'x'
      parseImportDefault(lexerFlags, scoop);
      if (tok_getType() === $PUNC_COMMA) {
        // import x, * as z from 'x'
        //         ^
        // import x, {...} from 'x'
        //         ^
        ASSERT_skipToIdentStarCurlyOpen(',', lexerFlags);  // TODO: next must be `*` or `{` or ident
        if (tok_getType() === $PUNC_STAR) {
          // import x, * as z from 'x'
          parseImportNamespace(lexerFlags, scoop);
        } else if (tok_getType() === $PUNC_CURLY_OPEN) {
          // import x, {...} from 'x'
          parseImportObject(lexerFlags, scoop);
        } else {
          return THROW_RANGE('A default import can only be followed by a star or object specifier', tok_getStart(), tok_getStop());
        }
      } else if (tok_getType() === $ID_from) {
        // `import x from 'x'`
        ASSERT_skipToStringOrDie($ID_from, lexerFlags);
      } else {
        return THROW_RANGE('The default `import` should be followed by another specifier or `from`', $tp_import_start, tok_getStop());
      }
    } else if (tok_getType() === $PUNC_STAR) {
      // import * as y from 'x'
      parseImportNamespace(lexerFlags, scoop);
    } else if (tok_getType() === $PUNC_CURLY_OPEN) {
      // import {} from 'x'
      // import {a} from 'x'
      // import {a as b} from 'x'
      // import {a,b} from 'x'
      // import {a as c,b} from 'x'
      // import {a,b,} from 'x'
      parseImportObject(lexerFlags, scoop);
    } else {
      // - `import "foo"`
      //           ^^^^^
      // - `import \n / x`
      //              ^

      if (!isStringToken(tok_getType())) {
        return THROW_RANGE('Expected a valid token after the `import` keyword, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
      }
    }

    // `import 'foo'` is valid but otherwise this is an error (validated by skipToStringOrDie)
    ASSERT(isStringToken(tok_getType()), 'skipToStringOrDie should throw if the next token is not a string, all branches should have enforced it');

    let $tp_source_line = tok_getLine();
    let $tp_source_column = tok_getColumn();
    let $tp_source_start = tok_getStart();
    let $tp_source_stop = tok_getStop();
    let $tp_source_canon = tok_getCanoN();

    ASSERT_skipToStatementStart($G_STRING, lexerFlags); // semi or asi
    AST_setStringLiteral('source', $tp_source_start, $tp_source_stop, $tp_source_line, $tp_source_column, $tp_source_canon, false);
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_import_start, $tp_import_line, $tp_import_column, 'ImportDeclaration');
  }
  function parseImportDefault(lexerFlags, scoop) {
    ASSERT(parseImportDefault.length === arguments.length, 'arg count');

    // import x from 'x'
    //        ^
    // import x, * as z from 'x'
    // import x, {...} from 'x'

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_CONST, lexerFlags);
    SCOPE_addLexBinding(scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_LET, FDS_LEX); // TODO: confirm `let`
    ASSERT_skipToAsCommaFrom($G_IDENT, lexerFlags);

    AST_setNode('specifiers', {
      type: 'ImportDefaultSpecifier',
      loc: AST_getClosedLoc($tp_ident_start, $tp_ident_line, $tp_ident_column),
      local: AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon),
    });
  }
  function parseImportObject(lexerFlags, scoop) {
    ASSERT(parseImportObject.length === arguments.length, 'arg count');

    // - `import {...} from 'x'`
    //           ^
    ASSERT_skipToIdentCurlyClose($PUNC_CURLY_OPEN, lexerFlags);

    while (isIdentToken(tok_getType())) {
      parseImportSpecifier(lexerFlags, scoop);

      if (tok_getType() !== $PUNC_COMMA) break; // Must mean `}` or error

      ASSERT_skipAny(',', lexerFlags);
    }

    if (tok_getType() !== $PUNC_CURLY_CLOSE) {
      if (tok_getType() === $PUNC_DOT_DOT_DOT) {
        // - `import {...x} from 'foo'`
        //            ^^^
        return THROW_RANGE('Import object cannot have spread', tok_getStart(), tok_getStop());
      }
      if (tok_getType() === $PUNC_COLON) {
        // - `import {x as y} from 'foo'`
        //              ^^
        return THROW_RANGE('Import object uses `as` to alias (`{a as y}`), not colon (`{a: y}`)', tok_getStart(), tok_getStop());
      }

      // - `import {`
      //            ^
      return THROW_RANGE('Missing import definition closing curly, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    // - `import {...} from 'x'`
    //               ^
    ASSERT_skipToFromOrDie($PUNC_CURLY_CLOSE, lexerFlags);
    ASSERT_skipToStringOrDie($ID_from, lexerFlags);
  }
  function parseImportSpecifier(lexerFlags, scoop) {
    // Start with left of the (optional) `as`

    // - `import {a} from 'x'`
    //            ^
    // - `import {a,} from 'x'`
    //            ^
    // - `import {a as b} from 'x'`
    //            ^
    // - `import {a as b,} from 'x'`
    //            ^
    // - `import {a, b} from 'x'`
    //               ^

    let $tp_name_line = tok_getLine();
    let $tp_name_column = tok_getColumn();
    let $tp_name_start = tok_getStart();
    let $tp_name_stop = tok_getStop();
    let $tp_name_canon = tok_getCanoN();

    // Imported name will bind either to the right of the `as`, if present at all, and otherwise name

    let $tp_local_type = tok_getType();
    let $tp_local_line = tok_getLine();
    let $tp_local_column = tok_getColumn();
    let $tp_local_start = tok_getStart();
    let $tp_local_stop = tok_getStop();
    let $tp_local_canon = tok_getCanoN();

    ASSERT_skipToAsCommaCurlyClose($G_IDENT, lexerFlags);

    // https://tc39.github.io/ecma262/#sec-createimportbinding
    // The concrete Environment Record method CreateImportBinding for module Environment Records creates a new initialized
    // immutable indirect binding for the name N. A binding must not already exist in this Environment Record for N.

    if (tok_getType() === $ID_as) {
      // - `import {a as b} from 'x'`
      //              ^^

      ASSERT_skipToIdentOrDie($ID_as, lexerFlags);

      // - `import {a as b} from 'x'`
      //                 ^

      // Note: the exported _name_ can be any identifier, keywords included

      $tp_local_type = tok_getType();
      $tp_local_line = tok_getLine();
      $tp_local_column = tok_getColumn();
      $tp_local_start = tok_getStart();
      $tp_local_stop = tok_getStop();
      $tp_local_canon = tok_getCanoN();

      ASSERT_skipAny($G_IDENT, lexerFlags);
    }

    fatalBindingIdentCheck($tp_local_type, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_CONST, lexerFlags);
    SCOPE_addLexBinding(scoop, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_LET, FDS_ILLEGAL);

    AST_setNode('specifiers', {
      type: 'ImportSpecifier',
      loc: AST_getClosedLoc($tp_name_start, $tp_name_line, $tp_name_column),
      imported: AST_getIdentNode($tp_name_start, $tp_name_stop, $tp_name_line, $tp_name_column, $tp_name_canon),
      local: AST_getIdentNode($tp_local_start, $tp_local_stop, $tp_local_line, $tp_local_column, $tp_local_canon),
    });
  }
  function parseImportNamespace(lexerFlags, scoop) {
    ASSERT(parseImportNamespace.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_STAR, 'validated at call sites');

    // import * as x from 'y'
    //        ^

    let $tp_star_line = tok_getLine();
    let $tp_star_column = tok_getColumn();
    let $tp_star_start = tok_getStart();

    ASSERT_skipAny('*', lexerFlags);
    if (tok_getType() !== $ID_as) {
      return THROW_RANGE('Next token should be `as` but was `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToIdentOrDie($ID_as, lexerFlags);

    let $tp_local_type = tok_getType();
    let $tp_local_line = tok_getLine();
    let $tp_local_column = tok_getColumn();
    let $tp_local_start = tok_getStart();
    let $tp_local_stop = tok_getStop();
    let $tp_local_canon = tok_getCanoN();

    // next must be `from` (default must come first, if present, and object can not be used together with star)
    ASSERT_skipToFromOrDie($G_IDENT, lexerFlags);
    fatalBindingIdentCheck($tp_local_type, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_CONST, lexerFlags);
    SCOPE_addLexBinding(scoop, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_LET, FDS_ILLEGAL); // TODO: confirm `let`

    AST_setNode('specifiers', {
      type: 'ImportNamespaceSpecifier',
      loc: AST_getClosedLoc($tp_star_start, $tp_star_line, $tp_star_column),
      local: AST_getIdentNode($tp_local_start, $tp_local_stop, $tp_local_line, $tp_local_column, $tp_local_canon),
    });

    ASSERT(tok_getType() === $ID_from, 'already validated by skipToFromOrDie, above');
    ASSERT_skipToStringOrDie($ID_from, lexerFlags);
  }

  function parseLetDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, labelSet, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseLetDeclaration.length, 'arg count');
    ASSERT_LABELSET(labelSet);
    ASSERT(hasNoFlag(lexerFlags, LF_NO_ASI), 'This is a statement so the no_asi flag can not be set here');

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    ASSERT($tp_ident_type === $ID_let, 'should pass on the let token');

    // next token is ident, {, or [ in most cases. In sloppy mode it can also be any valid value tail, operator, and ASI-able.
    ASSERT_skipDiv($ID_let, lexerFlags); // in `let/foo/g` the `/` is always a division, so parse div

    // parsing `let` as a declaration if the next token is an ident, `[`, or `{`
    if (isIdentToken(tok_getType())) {
      // - `let x`
      // - `let x, y`
      // - `let x, [y]`
      // - `let x, {y}`
      // - `let \n x`
      // - `let \n throw x`  // !! the next token may, validly, be keywords in legacy should not throw an error
      // This is slow but if this `let` was followed by a newline then something wonky is going on anyways.
      // At any rate, if need be we can optimize this edge case by preventing the first keyword check down the line.

      // Note that `await` and `yield` are disallowed in certain contexts by static semantics, which apply after parsing
      // So they do not affect ASI decisions and as such, `let \n await` does not trigger ASI inside an async function
      // and likewise, `let \n yield` does not trigger ASI inside a generator. So `let \n await 0` and `let \n yield 0`
      // is always going to trigger a syntax error.

      let $tp_binding_type = tok_getType();
      let $tp_binding_start = tok_getStart();
      let $tp_binding_stop = tok_getStop();
      let $tp_binding_canon = tok_getCanoN();

      // This is a let with a newline following it and the next token is a reserved word.
      // This must now be a let-expression or a syntax error
      // - `let \n debugger'               (fine)
      // - `do let \n while(x)'            (totally valid)
      // However, for certain pseudo-keywords this rule will not apply because of how the spec works. These rules are
      // defined in so called "static semantics", which apply _after_ parsing, and as such do not affect when ASI does
      // or does not apply. As a result, `let \n await 0` will not apply ASI. Even in an `async` context.
      // The next logic is: if there's no error, it's fine to bind. If there is an error, then if it concerns any of
      // these pseudo keywords they will still trigger an error (because the errors are early errors) so we throw.
      // In all other cases, apply the ASI and treat the next ident as an expression.
      let identBindingErrorMsg = tok_getNlwas() === true ? nonFatalBindingIdentCheck($tp_binding_type, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, BINDING_TYPE_LET, lexerFlags) : '';
      if (identBindingErrorMsg !== '') {
        // This is now a slow error path

        if (
          // This is the case of pseudo keywords. Note that `let \n await` will never trigger ASI and
          // `let \n await 0` would ASI therefor throw a syntax error because it's parsed as a let declaration, anyways.
          // In contrast, `let \n await;` is only an error in the context where `await` must be a keyword.
          [$ID_await, $ID_yield, $ID_arguments, $ID_eval, $ID_implements, $ID_interface, $ID_let, $ID_package, $ID_private, $ID_protected, $ID_public, $ID_static].includes(tok_getType())
        ) {
          // This must be an error now. ASI was not applicable but the var was (still) not a valid binding ident, so *boom*
          // [x]: `let \n let;`
          // [x]: `async function f() { let \n await }`
          return THROW_RANGE('Attempted to create a `let` binding on special reserved keyword `' + tok_sliceInput($tp_binding_start, $tp_binding_stop) + '` but: ' + identBindingErrorMsg, $tp_binding_start, $tp_binding_stop);
        }

        // [x]: `{ let \n debugger }`
        return THROW_RANGE('`let` must be a declaration in strict mode but the next ident is a reserved keyword (`' + tok_sliceInput($tp_binding_start, $tp_binding_stop) + '`)', $tp_binding_start, $tp_binding_stop);
      }

      // This is any regular `let` declaration with an ident and no newline but the ident may cause a keyword error
      // - `let foo`
      // - `do let while(x)'               (totally invalid because do-while requires newline or semi)
      parseAnyVarDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, BINDING_TYPE_LET, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    }
    else if (tok_getType() === $PUNC_BRACKET_OPEN || tok_getType() === $PUNC_CURLY_OPEN) {
      // let declaration on (at least) a pattern
      // - `let [x]`
      // - `let [x], y`
      // - `let [x], [y]`
      // - `let \n [x]`
      // - `let {x}`
      // - `let {x}, y`
      // - `let {x}, {y}`
      // - `let \n {x}`
      parseAnyVarDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, BINDING_TYPE_LET, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    }
    else if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      return THROW_RANGE('Let declaration missing binding names and `let` cannot be a regular var or label name in strict mode', $tp_ident_start, $tp_ident_stop);
    } else {
      // let expression statement
      // TODO: add test case `let: function f(){}`
      _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
    }
  }
  function parseLetExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseLetExpressionStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    ASSERT($tp_ident_type === $ID_let, 'should pass on the let token');

    // next token is ident, {, or [ in most cases. In sloppy mode it can also be any valid value tail, operator, and ASI-able.
    ASSERT_skipDiv($ID_let, lexerFlags); // in `let/foo/g` the `/` is always a division, so parse div

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      return THROW_RANGE('`let` declaration not allowed here and `let` cannot be a regular var or label name in strict mode', $tp_ident_start, $tp_ident_stop);
    }

    if (tok_getType() === $PUNC_BRACKET_OPEN) {
      // https://tc39.es/ecma262/#prod-ExpressionStatement
      // No ASI exception here. A `let [` can simply not start an expression statement, and there's no other way to
      // validly parse it, so it's an error here.
      return THROW_RANGE('It is never valid for an expression statement to begin with `let[`, and a `let` declaration would not be valid here', $tp_ident_start, tok_getStop());
    }

    // let expression statement
    _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
  }
  function _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp) {
    ASSERT(_parseLetAsPlainVarNameExpressionStatement.length === arguments.length, 'arg count');
    ASSERT($tp_ident_type === $ID_let, 'should pass on the let token');
    ASSERT($tp_ident_start !== tok_getStart(), 'the `let` token should have been skipped');
    ASSERT(hasNoFlag(lexerFlags, LF_STRICT_MODE), 'sloppy mode should be asserted at call site');
    ASSERT_LABELSET(labelSet);
    ASSERT(tok_getType() !== $PUNC_BRACKET_OPEN, 'should invalidate expr stmt starting with `let [` before calling this func');

    if (tok_getType() === $PUNC_COLON) {
      return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
    }

    let $tp_next_type = tok_getType();

    if ($tp_next_type === $ID_in || $tp_next_type === $ID_in) {
      return THROW_RANGE('Cannot use `let` as a regular var name as the lhs of `in` or `instanceof` in a toplevel expression statement', tok_getStart(), tok_getStop()); // And why would you.
    }

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: undefined,
    });

    let assignable = parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, IS_ASSIGNABLE, ASSIGN_EXPR_IS_OK, 'expression');
    assignable = parseValueTail(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, assignable, NOT_NEW_ARG, NOT_LHSE, 'expression');
    parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, assignable, 'expression');

    if (tok_getType() === $PUNC_COMMA) {
      // Don't care about assignable await/yield flags
      _parseExpressions(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, NOT_ASSIGNABLE, 'expression');
    }

    parseSemiOrAsi(lexerFlags);
    AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column, 'ExpressionStatement');
  }

  function parseReturnStatement(lexerFlags, astProp) {
    ASSERT(parseReturnStatement.length === arguments.length, 'arg count');

    let $tp_return_line = tok_getLine();
    let $tp_return_column = tok_getColumn();
    let $tp_return_start = tok_getStart();

    if (!allowGlobalReturn && hasAllFlags(lexerFlags, LF_IN_GLOBAL)) {
      return THROW_RANGE('Not configured to parse `return` statement in global, bailing', $tp_return_start, $tp_return_start + 1);
    }

    ASSERT_skipToStatementStart($ID_return, lexerFlags); // Either an expression on the same line or a statement on the next (which includes exprs)
    AST_open(astProp, {
      type: 'ReturnStatement',
      loc: undefined,
      argument: undefined,
    });

    if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
      // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
      // - `return \n /foo/`
      // - `return \n /foo/x`
      tok_asi();
      AST_set('argument', null);
    } else {
      if (tok_getNlwas() === false && tok_getType() !== $EOF && tok_getType() !== $PUNC_SEMI && tok_getType() !== $PUNC_CURLY_CLOSE) {
        parseExpressions(lexerFlags, 'argument');
      }
      else {
        AST_set('argument', null);
      }
      parseSemiOrAsi(lexerFlags);
    }

    AST_close($tp_return_start, $tp_return_line, $tp_return_column, 'ReturnStatement');
  }

  function parseSwitchStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseSwitchStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_switch_line = tok_getLine();
    let $tp_switch_column = tok_getColumn();
    let $tp_switch_start = tok_getStart();

    ASSERT_skipToParenOpenOrDie($ID_switch, lexerFlags);
    AST_open(astProp, {
      type: 'SwitchStatement',
      loc: undefined,
      discriminant: undefined,
      cases: [],
    });

    // TODO: in what valid case is LF_IN_TEMPLATE relevant? switch cant appear directly in a template
    let lexerFlagsForSwitch = sansFlag(lexerFlags, LF_IN_TEMPLATE | LF_IN_GLOBAL | LF_NO_ASI);
    parseStatementHeader(lexerFlagsForSwitch, 'discriminant');
    if (tok_getType() !== $PUNC_CURLY_OPEN) {
      return THROW_RANGE('Missing opening curly of `switch` body, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToSwitchBody($PUNC_CURLY_OPEN, lexerFlagsForSwitch);

    let casesScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_SWITCH, 'parseSwitchStatement');
    if (options_exposeScopes) AST_set('$scope', casesScoop);
    ASSERT(casesScoop._funcName = '(switch has no name)');
    parseSwitchCases(lexerFlagsForSwitch | LF_IN_SWITCH, casesScoop, labelSet, 'cases');

    if (tok_getType() !== $PUNC_CURLY_CLOSE) {
      return THROW_RANGE('Missing the closing curly of the switch body, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, lexerFlags);
    AST_close($tp_switch_start, $tp_switch_line, $tp_switch_column, 'SwitchStatement');
  }
  function parseSwitchCases(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseSwitchCases.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let hadDefault = false;
    while (true) {
      let $tp_caseDefault_line = tok_getLine();
      let $tp_caseDefault_column = tok_getColumn();
      let $tp_caseDefault_start = tok_getStart();

      if (tok_getType() === $ID_case) {
        ASSERT_skipToExpressionStart($ID_case, lexerFlags);
        AST_open(astProp, {
          type: 'SwitchCase',
          loc: undefined,
          test: undefined,
          consequent: [],
        });
        parseExpressions(lexerFlags, 'test');
        if (tok_getType() !== $PUNC_COLON) {
          return THROW_RANGE('Missing colon after case expr', tok_getStart(), tok_getStop());
        }
      } else if (tok_getType() === $ID_default) {
        if (hadDefault) {
          return THROW_RANGE('Found second `default` in same switch', tok_getStart(), tok_getStop());
        }
        hadDefault = true;

        ASSERT_skipToColonOrDie($ID_default, lexerFlags);
        AST_open(astProp, {
          type: 'SwitchCase',
          loc: undefined,
          test: null, // yes, null
          consequent: [],
        });
      } else {
        break;
      }

      ASSERT_skipToStatementStart(':', lexerFlags);
      while (tok_getType() !== $PUNC_CURLY_CLOSE && tok_getType() !== $ID_case && tok_getType() !== $ID_default) {
        parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_LEX, PARENT_NOT_LABEL, 'consequent');
      }

      AST_close($tp_caseDefault_start, $tp_caseDefault_line, $tp_caseDefault_column, 'SwitchCase');
    }
  }

  function parseThrowStatement(lexerFlags, astProp) {
    let $tp_throw_line = tok_getLine();
    let $tp_throw_column = tok_getColumn();
    let $tp_throw_start = tok_getStart();

    ASSERT_skipToExpressionStart($ID_throw, lexerFlags); // The arg is mandatory so next token cannot start a statement
    AST_open(astProp, {
      type: 'ThrowStatement',
      loc: undefined,
      argument: undefined,
    });
    if (tok_getNlwas() === true) {
      return THROW_RANGE('Found a newline between `throw` and its argument but that is not allowed', $tp_throw_start, tok_getStart());
    }
    let tmpLexerFlags = sansFlag(lexerFlags, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION | LF_IN_FOR_LHS);
    parseExpressions(tmpLexerFlags, 'argument'); // mandatory1
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_throw_start, $tp_throw_line, $tp_throw_column, 'ThrowStatement');
  }

  function parseTryStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseTryStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_try_line = tok_getLine();
    let $tp_try_column = tok_getColumn();
    let $tp_try_start = tok_getStart();
    let $tp_try_stop = tok_getStop();

    ASSERT_skipToCurlyOpenOrDie($ID_try, lexerFlags);
    AST_open(astProp, {
      type: 'TryStatement',
      loc: undefined,
      block: undefined,
      handler: undefined,
      finalizer: undefined,
    });

    parseBlockStatement(lexerFlags, scoop, labelSet, 'block');

    let hasEither = false;
    if (tok_getType() === $ID_catch) {
      // parseCatch
      hasEither = true;

      let $tp_catch_line = tok_getLine();
      let $tp_catch_column = tok_getColumn();
      let $tp_catch_start = tok_getStart();

      ASSERT_skipAny($ID_catch, lexerFlags);
      ASSERT_VALID(tok_getType() === $PUNC_PAREN_OPEN || tok_getType() === $PUNC_CURLY_OPEN, 'limited options, expecting { (, explicitly checked later');
      AST_open('handler', {
        type: 'CatchClause',
        loc: undefined,
        param: undefined,
        body: undefined,
      });

      // TODO: can we safely move these extra scoop layers inside the conditional? (very uncommon path so not very important)

      // record the catch var in its own scope record, we'll then move the args record to be a lexical scope level (hackish)
      let catchHeadScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_CATCH_HEAD, 'parseTryStatement(catch-var)');
      ASSERT(catchHeadScoop._funcName = '(catch has no name)');

      // create a scope for the catch body. this way var decls can search for the catch scope to assert new vars
      let catchBodyScoop = SCOPE_addLayer(catchHeadScoop, SCOPE_LAYER_CATCH_BODY, 'parseTryStatement(catch-body)');
      ASSERT(catchBodyScoop._funcName = '(catch has no name)');

      if (options_exposeScopes) AST_set('$scope', catchBodyScoop);

      // Catch clause is optional since es10

      if (tok_getType() === $PUNC_CURLY_OPEN) {
        if (!allowOptionalCatchBinding) {
          return THROW_RANGE('Missing the `catch` clause. Optional catch clause is only supported since ES10  ES2019', tok_getStart(), tok_getStop());
        }

        // https://github.com/estree/estree/pull/167/files
        // [v]: `try {} catch {}`
        AST_set('param', null);
      } else if (tok_getType() === $PUNC_PAREN_OPEN) {
        // - catch clause cannot have a default
        // - catch clause can be written to, cannot already be declared, so it's like a `let` binding
        // - there's an explicit rule disallowing lexical bindings with same name as catch var so just record it as lex

        // https://tc39.es/ecma262/#sec-try-statement-static-semantics-early-errors
        // > It is a Syntax Error if BoundNames of CatchParameter contains any duplicate elements.
        // > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the LexicallyDeclaredNames of Block.
        // > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the VarDeclaredNames of Block.
        // So the catch block may not contain a var binding anywhere, nor a lex binding in the root, that matches a catch clause var

        // There is a web compat exception where this clash is disregarded if the catch binding is just an ident:
        // https://tc39.es/ecma262/#sec-variablestatements-in-catch-blocks
        // This exception used to be more explicit before es10: https://github.com/tc39/ecma262/pull/1393/files

        // > It is a Syntax Error if any element of the BoundNames of |CatchParameter| also occurs in the
        // > VarDeclaredNames of |Block| unless |CatchParameter| is CatchParameter : BindingIdentifier
        // This part was dropped:
        // > and that element is only bound by a |VariableStatement|, the |VariableDeclarationList| of a for statement, the
        // > |ForBinding| of a for-in statement, or the |BindingIdentifier| of a for-in statement.
        // So before the exception only applied when the var was created through a `var`, when not inside a `for-of` header
        // Afterwards it just applies to any binding
        //
        // > The |Block| of a |Catch| clause may contain `var` declarations that bind a name that is also bound by the
        // > |CatchParameter|. At runtime, such bindings are instantiated in the VariableDeclarationEnvironment. They
        // > do not shadow the same-named bindings introduced by the |CatchParameter| and hence the |Initializer| for
        // > such `var` declarations will assign to the corresponding catch parameter rather than the `var` binding.
        // This part was dropped:
        // > The relaxation of the normal static semantic rule does not apply to names only bound by for-of statements.

        // [v]: `try {} catch (e) {}`
        //                     ^

        ASSERT_skipToBindingStart($PUNC_PAREN_OPEN, lexerFlags); // Cannot be `)` so don't check for it
        if (tok_getType() === $PUNC_PAREN_CLOSE) {
          return THROW_RANGE('The catch clause must have a binding', tok_getStart(), tok_getStop());
        }

        let $tp_binding_line = tok_getLine();
        let $tp_binding_column = tok_getColumn();
        let $tp_binding_start = tok_getStart();

        parseBinding(lexerFlags | LF_NO_ASI, $tp_binding_start, $tp_binding_line, $tp_binding_column, catchHeadScoop, BINDING_TYPE_CATCH_OTHER, FROM_CATCH, ASSIGNMENT_IS_DEFAULT, UNDEF_EXPORTS, UNDEF_EXPORTS, 'param');

        ASSERT(tok_getType() !== $PUNC_EQ, 'the parseBinding function would throw if the binding ended with an assignment (because from_catch is passed on)')

        if (tok_getType() === $PUNC_COMMA) {
          return THROW_RANGE('Catch clause requires exactly one parameter, not more (and no trailing comma)', tok_getStart(), tok_getStop());
        }
        if (tok_getType() !== $PUNC_PAREN_CLOSE) {
          // [x]: `try {} catch (x`
          return THROW_RANGE('Missing right paren for the catch clause, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
        }
        ASSERT_skipToCurlyOpenOrDie($PUNC_PAREN_CLOSE, lexerFlags);
      } else {
        return THROW_RANGE('Missing start of catch clause (`(`) or start of catch body (`{`), found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop())
      }

      ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'should have thrown if not curly at this point');

      parseBlockStatement(lexerFlags, catchBodyScoop, labelSet, 'body');
      AST_close($tp_catch_start, $tp_catch_line, $tp_catch_column, 'CatchClause');
    } else {
      AST_set('handler', null);
    }

    if (tok_getType() === $ID_finally) {
      // parseFinally
      hasEither = true;
      ASSERT_skipToCurlyOpenOrDie($ID_finally, lexerFlags);
      let finallyScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FINALLY, 'parseTryStatement(finally)');
      ASSERT(finallyScoop._funcName = '(finally has no name)');
      parseBlockStatement(lexerFlags, finallyScoop, labelSet, 'finalizer');
    } else {
      AST_set('finalizer', null);
    }

    AST_close($tp_try_start, $tp_try_line, $tp_try_column, 'TryStatement');

    if (!hasEither) {
      // [x]: `try {};`
      return THROW_RANGE('Try must have catch or finally', $tp_try_start, $tp_try_stop);
    }
  }

  function parseVarStatement(lexerFlags, scoop, astProp) {
    let $tp_var_line = tok_getLine();
    let $tp_var_column = tok_getColumn();
    let $tp_var_start = tok_getStart();

    ASSERT_skipToBindingStart($ID_var, lexerFlags);
    parseAnyVarDeclaration(lexerFlags, $tp_var_start, $tp_var_line, $tp_var_column, scoop, BINDING_TYPE_VAR, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
  }

  function parseWhileStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseWhileStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_while_line = tok_getLine();
    let $tp_while_column = tok_getColumn();
    let $tp_while_start = tok_getStart();

    ASSERT_skipToParenOpenOrDie($ID_while, lexerFlags);
    AST_open(astProp, {
      type: 'WhileStatement',
      loc: undefined,
      test: undefined,
      body: undefined,
    });
    parseStatementHeader(lexerFlags, 'test');
    parseNestedBodyPart(lexerFlags | LF_IN_ITERATION, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    AST_close($tp_while_start, $tp_while_line, $tp_while_column, 'WhileStatement');
  }

  function parseIdentLabelOrExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp) {
    ASSERT(parseIdentLabelOrExpressionStatement.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(tok_getType()), 'should not have consumed the ident yet');
    ASSERT(typeof astProp === 'string', 'should be string');
    ASSERT_LABELSET(labelSet);

    // ok we get a statement
    // the statement starts with an identifier that is not a statement
    // the identifier could potentially be a label (even if that's a sloppy mode only thing we still need to be able to support it)
    // the actual identifier is the deciding factor in what to do when the next character is a forward slash; division or regular expression:
    //  - new: regex
    //  - await/yield: regex
    //  - delete/typeof/void: regex
    //  - class/function/async: error
    //  - true/false/null/this/super: division
    //  - idents determined to be regular var names: division
    //  - (anything else should be added to this list)
    // however, we also need to get the next token to check for the colon to determine the label path

    // note: this node may be replaced by a label node but we can't know that here without backtracking

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    // TODO: in most of the cases below where it leads to a label an error "keyword label" should be thrown immediately

    ASSERT(tok_getType() !== $ID_function, 'function ident is already checked before this func');

    // For the sake of simplicity, and because this function should not hit very frequently, we'll take the slow path
    skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE);

    if (tok_getType() === $PUNC_COLON) {
      // Ident to be verified not to be reserved in the label parser
      return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
    }

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: undefined,
    });
    parseExpressionsAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, 'expression');
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column, 'ExpressionStatement');
  }

  function parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseLabeledStatementInstead.length, 'arg count');
    ASSERT_LABELSET(labelSet);
    ASSERT(nestedLabels === PARENT_NOT_LABEL || nestedLabels instanceof Set, 'nestedLabels should be a set of names of uninterupted label parents');

    // This is an exception to the general case where eval and arguments are okay to use as label name. Thanks, spec.
    if ($tp_ident_type !== $ID_eval && $tp_ident_type !== $ID_arguments) {
      fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_NONE, lexerFlags);
    }

    let set = labelSet;
    while (set) {
      if (set.statementLabels.has($tp_ident_canon)) {
        return THROW_RANGE('Saw the same label twice which is not allowed', $tp_ident_start, $tp_ident_stop);
      }
      set = set.parentLabels;
    }

    labelSet = wrapLabelSet(labelSet, 'labelled statement');
    labelSet.statementLabels.add($tp_ident_canon);
    ASSERT_skipToStatementStart(':', lexerFlags);

    if (fdState === FDS_IFELSE) {
      // a "labelled func decl" is never allowed as if/else child
      fdState = FDS_ILLEGAL;
    }

    if (nestedLabels === PARENT_NOT_LABEL) {
      nestedLabels = new Set()
    }
    nestedLabels.add($tp_ident_canon);

    // We have already consumed the colon for the label so the next token must start the child-statement of this label
    // Scan forward to see whether we are about to parse a loop statement. If so we can mark nestedLabels for `continue`
    if (
      isIdentToken(tok_getType()) &&
      (
        tok_getType() === $ID_for ||
        tok_getType() === $ID_while ||
        tok_getType() === $ID_do
      )
    ) {
      // Either the next statement is invalid or it will be a valid iteration statement
      labelSet.iterationLabels = nestedLabels; // When scanning labels for `continue`, only visit these arrays
    }

    AST_open(astProp, {
      type: 'LabeledStatement',
      loc: undefined,
      label: AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon),
      body: undefined,
    });
    parseNestedBodyPart(lexerFlags, scoop, labelSet, IS_LABELLED, fdState, nestedLabels, 'body');
    AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column, 'LabeledStatement');
  }

  function parsePunctuatorStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parsePunctuatorStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    if (tok_getType() === $PUNC_CURLY_OPEN) {
      let blockScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_BLOCK, 'parsePunctuatorStatement.block');
      ASSERT(blockScoop._funcName = '(block has no name)');
      // TODO: does block not have its own (fresh) label set?
      parseBlockStatement(lexerFlags, blockScoop, labelSet, astProp);
      return;
    }

    if (tok_getType() === $PUNC_SEMI) {
      parseEmptyStatement(lexerFlags, astProp);
      return;
    }

    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: undefined,
    });

    // Note: an arrow would create a new scope and there is no other way to introduce a new binding from here on out
    parseExpressions(lexerFlags, 'expression');
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column, 'ExpressionStatement');
  }

  function parseEmptyStatement(lexerFlags, astProp) {

    let $tp_semi_line = tok_getLine();
    let $tp_semi_column = tok_getColumn();
    let $tp_semi_start = tok_getStart();

    ASSERT_skipToStatementStart(';', lexerFlags);
    AST_setNode(astProp, {
      type: 'EmptyStatement',
      loc: AST_getClosedLoc($tp_semi_start, $tp_semi_line, $tp_semi_column),
    });
  }

  function parseWithStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseWithStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let $tp_with_line = tok_getLine();
    let $tp_with_column = tok_getColumn();
    let $tp_with_start = tok_getStart();
    let $tp_with_stop = tok_getStop();

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      return THROW_RANGE('The `with` statement is not allowed in strict mode', $tp_with_start, $tp_with_stop); // TODO: span entire keyword
    }

    ASSERT_skipToParenOpenOrDie($ID_with, lexerFlags);
    AST_open(astProp, {
      type: 'WithStatement',
      loc: undefined,
      object: undefined,
      body: undefined,
    });
    parseStatementHeader(lexerFlags, 'object');
    parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    AST_close($tp_with_start, $tp_with_line, $tp_with_column, 'WithStatement');
  }

  function parseAnyVarDeclaration(lexerFlags, $tp_binding_start, $tp_binding_line, $tp_binding_column, scoop, bindingType, bindingOrigin, exportedNames, exportedBindings, astProp) {
    ASSERT(parseAnyVarDeclaration.length === arguments.length, 'arg count');
    ASSERT(bindingType === BINDING_TYPE_VAR || bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_CONST, 'only three kinds here');
    ASSERT_BINDING_ORIGIN(bindingOrigin);

    // - `var x = y`
    //        ^
    // - `const x = y`
    //          ^
    // - `for (let x of y);`
    //             ^

    if (!isIdentToken(tok_getType()) && tok_getType() !== $PUNC_BRACKET_OPEN && tok_getType() !== $PUNC_CURLY_OPEN) {
      return THROW_RANGE('Expected identifier, or array/object destructuring', tok_getStart(), tok_getStop());
    }
    let keyword = bindingType === BINDING_TYPE_VAR ? 'var' : bindingType === BINDING_TYPE_LET ? 'let' : 'const';

    AST_open(astProp, {
      type: 'VariableDeclaration',
      loc: undefined,
      kind: keyword,
      declarations: [],
    });

    parseBindings(lexerFlags, scoop, bindingType, bindingOrigin, ASSIGNMENT_IS_INIT, $UNTYPED, exportedNames, exportedBindings, 'declarations');
    if (bindingOrigin === FROM_STATEMENT_START || bindingOrigin === FROM_EXPORT_DECL) {
      // We need to deal with the semi/asi here because of location tracking...
      parseSemiOrAsi(lexerFlags);
    }
    AST_close($tp_binding_start, $tp_binding_line, $tp_binding_column, ['VariableDeclaration', 'ExpressionStatement']); //  expr in case of `let` in sloppy
  }

  function parseBindings(lexerFlags, scoop, bindingType, bindingOrigin, defaultOptions, $tp_set_type, exportedNames, exportedBindings, astProp) {
    ASSERT(parseBindings.length === arguments.length, 'expecting all args');
    ASSERT($tp_set_type === $UNTYPED || $tp_set_type === $ID_set, 'set token');
    ASSERT_BINDING_ORIGIN(bindingOrigin);
    ASSERT_BINDING_TYPE(bindingType);

    // - `function f([x]){}`
    //               ^
    // - `x = {f(a,b){}}`
    //           ^
    // - `var x = y`
    //        ^
    // - `const x = y`
    //          ^
    // - `for (let x of y);`
    //             ^

    // TODO: if bindingType=let then also consider it could be a var name
    let many = 0;
    let inited = false;
    let startWasObjectOrArray = tok_getType() === $PUNC_BRACKET_OPEN || tok_getType() === $PUNC_CURLY_OPEN;
    let paramsSimple = PARAMS_ALL_SIMPLE;
    do {
      ++many;
      let $tp_bindingStart_type = tok_getType();
      let $tp_bindingStart_line = tok_getLine();
      let $tp_bindingStart_column = tok_getColumn();
      let $tp_bindingStart_start = tok_getStart();

      let wasRest = $tp_bindingStart_type === $PUNC_DOT_DOT_DOT;

      // ident or destructuring of object/array or rest arg
      let paramSimple = parseBinding(lexerFlags, $tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column, scoop, bindingType, bindingOrigin, defaultOptions, exportedNames, exportedBindings, astProp);

      if (wasRest && $tp_set_type === $ID_set) {
        return THROW_RANGE('A setter can not have a rest arg (unless inside a pattern)', $tp_bindingStart_start, tok_getStart());
      }

      ASSERT([PARAM_UNDETERMINED, PARAM_WAS_SIMPLE, PARAM_WAS_NON_STRICT_SIMPLE, PARAM_WAS_COMPLEX, PARAM_WAS_COMPLEX_HAD_INIT].includes(paramSimple), 'paramSimple enum', paramSimple);
      if (paramSimple === PARAM_WAS_COMPLEX_HAD_INIT) {
        inited = true;
        paramsSimple = PARAMS_SOME_COMPLEX;
      }
      else if (paramSimple === PARAM_WAS_COMPLEX) {
        paramsSimple = PARAMS_SOME_COMPLEX;
      }
      else if (paramSimple === PARAM_WAS_NON_STRICT_SIMPLE) {
        if (paramsSimple === PARAMS_ALL_SIMPLE) {
          paramsSimple = PARAMS_SOME_NONSTRICT;
        }
      }
      if (wasRest) {
        ASSERT(tok_getType() === $PUNC_PAREN_CLOSE, 'the "rest is last and no init" check should happen elsewhere and before this point');
        break;
      }
      if (tok_getType() !== $PUNC_COMMA) break;
      ASSERT_skipToBindingStartGrouped(',', lexerFlags);
      if (tok_getType() === $PUNC_PAREN_CLOSE) {
        // `function f(a,)`
        // (arrows do not go through here)
        if (bindingType === BINDING_TYPE_ARG) {
          if (allowTrailingFunctionComma) {
            // https://tc39.github.io/ecma262/#sec-function-definitions-static-semantics-issimpleparameterlist
            // The [empty] is the case of `FormalParameters : FormalParameterList ,` which is actually the prod
            // `FormalParameters : FormalParameterList , [empty]`. So a trailing comma does not change simple state.
            return paramsSimple;
          }
          return THROW_RANGE('Targeted language version does not support trailing function arg comma', tok_getStart(), tok_getStop());
        }
        ASSERT_VALID(false, 'I dont think this is reachable in valid code?');
      }
    } while (true);
    if (many !== 1 && $tp_set_type === $ID_set) {
      return THROW_RANGE('Setters require exactly one parameter', tok_getStart(), tok_getStop());
    }
    if (bindingOrigin === FROM_FOR_HEADER && (tok_getType() === $ID_in || tok_getType() === $ID_of)) {
      if (many !== 1) {
        return THROW_RANGE('For-in and for-of can only have one binding, found ' + many, tok_getStart(), tok_getStop());
      }

      // https://tc39.github.io/ecma262/#sec-initializers-in-forin-statement-heads
      // binding inits are ONLY okay when;
      // - sloppy mode
      // - web-compat mode
      // - regular var names
      // - for-in statements
      // - `var` binding
      if (inited && (
        startWasObjectOrArray ||
        options_webCompat === WEB_COMPAT_OFF ||
        bindingType !== BINDING_TYPE_VAR ||
        tok_getType() === $ID_of ||
        hasAllFlags(lexerFlags, LF_STRICT_MODE))
      ) {
        return THROW_RANGE('For-in and for-of binding can not have an init', tok_getStart(), tok_getStop());
      }
    }
    return paramsSimple;
  }
  function parseBinding(lexerFlags, $tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column, scoop, bindingType, bindingOrigin, defaultsOption, exportedNames, exportedBindings, astProp) {
    // returns whether a binding had an init (necessary to validate for-header bindings)
    ASSERT(arguments.length === parseBinding.length, 'expecting args');
    ASSERT(defaultsOption === ASSIGNMENT_IS_INIT || defaultsOption === ASSIGNMENT_IS_DEFAULT, 'defaultsOption enum');
    ASSERT_BINDING_TYPE(bindingType);
    ASSERT_BINDING_ORIGIN(bindingOrigin);
    ASSERT($tp_bindingStart_start === tok_getStart(), 'we should be at the start of this binding');
    // note: a "binding pattern" means a var/let/const var declaration with name or destructuring pattern

    // [v]: `try {} catch (e) {}`
    //                     ^

    let mustHaveInit = false;
    let paramSimple = PARAM_UNDETERMINED; // simple if "valid in es5" (list of idents, no inits)

    if (isIdentToken(tok_getType())) {
      // - `var foo = bar;`
      //        ^^^

      let $tp_binding_type = tok_getType();
      let $tp_binding_start = tok_getStart();
      let $tp_binding_stop = tok_getStop();
      let $tp_binding_canon = tok_getCanoN();

      fatalBindingIdentCheck($tp_binding_type, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, bindingType, lexerFlags);
      if (bindingType === BINDING_TYPE_CATCH_OTHER) {
        // See details of specific catch var exceptions in the catch parser
        bindingType = BINDING_TYPE_CATCH_IDENT;
      }
      SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, bindingType);
      addNameToExports(exportedNames, $tp_binding_start, $tp_binding_stop, $tp_binding_canon);
      addBindingToExports(exportedBindings, $tp_binding_canon);

      let $tp_ident_line = tok_getLine();
      let $tp_ident_column = tok_getColumn();
      let $tp_ident_start = tok_getStart();
      let $tp_ident_stop = tok_getStop();
      let $tp_ident_canon = tok_getCanoN();

      // note: if this is the end of the var decl and there is no semi the next line can start with a regex
      ASSERT_skipRex(tok_sliceInput($tp_binding_start, $tp_binding_stop), lexerFlags); // next is `=` or `,` or `;` or asi-continuation
      AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);

      if (
        hasNoFlag(lexerFlags, LF_STRICT_MODE) &&
        nonFatalBindingIdentCheck($tp_binding_type, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, bindingType, lexerFlags | LF_STRICT_MODE) !== ''
      ) {
        // In this case we are in sloppy mode but the name would fail in strict mode. It is still possible for this
        // function to become strict mode if it turns out it has the "use strict" flag. So check for that, and throw an
        // error when we discover the function to be strict after all.

        // - `function foo(eval) { "use strict"; }`
        // - `function foo(package) { "use strict"; }`
        paramSimple = PARAM_WAS_NON_STRICT_SIMPLE; // "simple" in spec terms, but throws if body is strict mode
      } else {
        paramSimple = PARAM_WAS_SIMPLE; // could still be complex if init
      }
    }
    else if (tok_getType() === $PUNC_CURLY_OPEN) {
      ASSERT(bindingType !== BINDING_TYPE_NONE, 'must bind as something'); // TODO: why only this branch?
      // [v]: `let {a, b} = obj;`
      // [v]: `export let {a, b} = obj;`
      let destructible = parseObjectOuter(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      verifyDestructibleForBinding(destructible, bindingType);
      AST_destruct(astProp);
      paramSimple = PARAM_WAS_COMPLEX;
      // note: throw for `const {};` and `for (const {};;);` but not `for (const {} in obj);`
      if (
        (bindingOrigin !== FROM_CATCH) &&
        (bindingOrigin !== FROM_FOR_HEADER || (tok_getType() !== $ID_in && tok_getType() !== $ID_of)) &&
        (bindingType === BINDING_TYPE_CONST || bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_VAR)
      ) {
        mustHaveInit = true;
      }
    }
    else if (tok_getType() === $PUNC_BRACKET_OPEN) {
      let destructible = parseArrayOuter(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      verifyDestructibleForBinding(destructible, bindingType);
      AST_destruct(astProp);
      paramSimple = PARAM_WAS_COMPLEX;
      // note: throw for `const {};` and `for (const {};;);` but not `for (const {} in obj);`
      if (
        (bindingOrigin !== FROM_CATCH) &&
        (bindingOrigin !== FROM_FOR_HEADER || (tok_getType() !== $ID_in && tok_getType() !== $ID_of)) &&
        (bindingType === BINDING_TYPE_CONST || bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_VAR)
      ) {
        mustHaveInit = true;
      }
    }
    else if (tok_getType() === $PUNC_DOT_DOT_DOT) {
      if (bindingType !== BINDING_TYPE_ARG) {
        return THROW_RANGE('Rest is not allowed as toplevel for var/let/const declaration binding', tok_getStart(), tok_getStop());
      }
      let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_PAREN_CLOSE, bindingType, $UNTYPED, exportedNames, exportedBindings, astProp);
      verifyDestructibleForBinding(subDestruct, bindingType);
      paramSimple = PARAM_WAS_COMPLEX;
    }
    else if (tok_getType() !== $PUNC_PAREN_CLOSE) {
      return THROW_RANGE('Expected to parse a(nother) binding but none was found', tok_getStart(), tok_getStop());
    }

    if (tok_getType() === $PUNC_EQ) {
      if (bindingOrigin === FROM_CATCH) {
        return THROW_RANGE('Catch clause can not have init / default', tok_getStart(), tok_getStop());
      }

      ASSERT_skipToExpressionStart('=', lexerFlags); // x(foo=/bar/){}
      paramSimple = PARAM_WAS_COMPLEX_HAD_INIT; // if this is an arg the arg is not "simple"
      if (defaultsOption === ASSIGNMENT_IS_DEFAULT) {
        // - `try {} catch (a) {}`
        // - `try {} catch ([a]) {}`
        // - `try {} catch ([a] = b) {}`
        AST_wrapClosedCustom(astProp, {
          type: 'AssignmentPattern',
          loc: undefined,
          left: undefined,
          right: undefined,
        }, 'left');
        parseExpression(lexerFlags, 'right');
        AST_close($tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column, 'AssignmentPattern');
      } else {
        ASSERT(bindingOrigin !== FROM_CATCH, 'checked earlier in branch');
        ASSERT(defaultsOption === ASSIGNMENT_IS_INIT, 'two options');
        AST_wrapClosedCustom('declarations', {
          type: 'VariableDeclarator',
          loc: undefined,
          id: undefined,
          init: undefined,
        }, 'id');
        parseExpression(lexerFlags, 'init');
        AST_close($tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column, 'VariableDeclarator');
      }
    }
    else if (mustHaveInit) {
      return THROW_RANGE('Declaration destructuring must have init', tok_getStart(), tok_getStop());
    }
    else if (bindingType === BINDING_TYPE_CONST && (bindingOrigin !== FROM_FOR_HEADER || (tok_getType() === $PUNC_SEMI || tok_getType() === $PUNC_COMMA))) {
      // only exception is a for-header where the next token is `in` or `of` instead of `=`
      return THROW_RANGE('Constants must be initialized', tok_getStart(), tok_getStop());
    }
    else if (defaultsOption === ASSIGNMENT_IS_INIT) {
      if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
        if (bindingOrigin === FROM_FOR_HEADER) {
          // [x] `for (var x \n /foo/;;);`
          return THROW_RANGE('Illegal regex after binding declaration in `for` header', tok_getStart(), tok_getStop());
        }
        // [v] `var x \n /foo/`
        ASSERT_ASI_REGEX_NEXT = true;
      }
      AST_setNodeDangerously('declarations', { // we will clobber the current value
        type: 'VariableDeclarator',
        loc: AST_getClosedLoc($tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column),
        id: AST_popNode('declarations'),
        init: null,
      });
    } else {
      ASSERT(defaultsOption === ASSIGNMENT_IS_DEFAULT, 'two options');
      // - `async x => delete (((((foo(await x)))))).bar`
      // ?
    }

    ASSERT([PARAM_UNDETERMINED, PARAM_WAS_SIMPLE, PARAM_WAS_NON_STRICT_SIMPLE, PARAM_WAS_COMPLEX, PARAM_WAS_COMPLEX_HAD_INIT].includes(paramSimple), 'paramSimple enum', paramSimple);
    return paramSimple;
  }

  function fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags) {
    ASSERT(fatalBindingIdentCheck.length === arguments.length, 'arg count');
    ASSERT(isIdentToken($tp_ident_type), 'ident check on ident tokens ok');
    ASSERT_BINDING_TYPE(bindingType);

    let str = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
    if (str !== '') THROW_RANGE(`Cannot use this name (\`${tok_sliceInput($tp_ident_start, $tp_ident_stop)}\`) as a variable name because: ${str}`, $tp_ident_start, $tp_ident_stop);
  }
  function nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags) {
    ASSERT(nonFatalBindingIdentCheck.length === arguments.length, 'expecting all args');
    ASSERT(isIdentToken($tp_ident_type), 'ident check on ident tokens ok');
    ASSERT_BINDING_TYPE(bindingType);

    // TODO: this check can be drastically improved.

    // note that any match here is usually an error (but not always, like strict mode or context specific stuff), but usually anyways

    // If an ident has a unicode escape then its .canon must be shorter than its .str
    // If the lens are equal then the .type also applies to the .canon and we can skip slow checks for that edge case
    if (($tp_ident_stop - $tp_ident_start) === $tp_ident_canon.length) {
      if ($tp_ident_type === $IDENT) return ''; // If the type is non-special (then so is the .canon) then no error
      return nonFatalBindingIdentCheckByEnum(lexerFlags, $tp_ident_type, $tp_ident_canon, bindingType);
    }
    // This ident had an escape. This is a pretty exceptional situation so I'm okay with the slow path.
    return nonFatalBindingIdentCheckByString(lexerFlags, $tp_ident_canon, bindingType);
  }
  function nonFatalBindingIdentCheckByEnum(lexerFlags, $tp_ident_type, $tp_ident_canon, bindingType) {
    ASSERT(nonFatalBindingIdentCheckByEnum.length === arguments.length, 'arg count');

    // This doesn't get hit very often as there's a simple ==$IDENT check that takes the brink
    // of these keyword checks. Since most cases that would fall through would lead to an error, it's only
    // idents like `from` or `of` which may lead to this point. Those don't appear very frequently :)
    // TODO: This switch could be reduced through another ident type flag. Not convinced that's worth anything.

    switch ($tp_ident_type) {
      // keywords
      case $ID_break:
      case $ID_case:
      case $ID_catch:
      case $ID_class:
      case $ID_const:
      case $ID_continue:
      case $ID_debugger:
      case $ID_default:
      case $ID_delete:
      case $ID_do:
      case $ID_else:
      case $ID_export:
      case $ID_extends:
      case $ID_finally:
      case $ID_for:
      case $ID_function:
      case $ID_if:
      case $ID_import:
      case $ID_in:
      case $ID_instanceof:
      case $ID_new:
      case $ID_return:
      case $ID_super:
      case $ID_switch:
      case $ID_this:
      case $ID_throw:
      case $ID_try:
      case $ID_typeof:
      case $ID_var:
      case $ID_void:
      case $ID_while:
      case $ID_with:
      // null / boolean
      case $ID_null:
      case $ID_true:
      case $ID_false:
      // future reserved keyword:
      case $ID_enum:
        return 'Cannot never use this reserved word as a variable name';

      // strict mode keywords
      case $ID_let:
        if (bindingType === BINDING_TYPE_CLASS) return 'Can not use `let` as a class name';
        if (bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_CONST) return 'Can not use `let` when binding through `let` or `const`';
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        //   Identifier: IdentifierName but not ReservedWord
        //     It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "let" ...
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Can not use `let` as variable name in strict mode';
        return '';
      case $ID_static:
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        //   Identifier: IdentifierName but not ReservedWord
        //     It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "static" ...
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return '`static` is a reserved word in strict mode';
        return '';

      // `eval` and `arguments` edge case paths
      case $ID_eval:
      case $ID_arguments:
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot create a binding named `'+ $tp_ident_canon +'` in strict mode';
        return '';

      // strict mode only future reserved keyword:
      case $ID_implements:
      case $ID_package:
      case $ID_protected:
      case $ID_interface:
      case $ID_private:
      case $ID_public:
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot use this reserved word as a variable name in strict mode';
        return '';

      // conditional keywords (strict mode or context)
      case $ID_await:
        // await wasnt a keyword before es8, when async was introduced
        if (allowAsyncFunctions) {
          // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
          // > IdentifierReference: await
          // > BindingIdentifier: await
          // > LabelIdentifier: await
          // > It is a Syntax Error if the goal symbol of the syntactic grammar is Module.
          // (Additionally productions are restricted by the `await` parameter... parser/lexerflags should take care of that)
          if (goalMode === GOAL_MODULE) return 'Await is illegal as var name with module goal';
          // in sloppy mode you cant use it inside an async function (and inside params defaults of arrows)
          if (hasAnyFlag(lexerFlags, LF_IN_ASYNC)) return 'Await not allowed here';
        }
        return '';
      case $ID_yield:
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        // > It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "yield".
        // (Additionally productions are restricted by the `await` parameter... parser/lexerflags should take care of that)
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot use this reserved word as a variable name in strict mode';
          // in sloppy mode you cant use it inside a generator function (and inside params defaults?)
        if (hasAnyFlag(lexerFlags, LF_IN_GENERATOR)) return 'Cannot use this reserved word as a variable name inside a generator';
        return '';
    }

    // valid binding name
    return '';
  }
  function nonFatalBindingIdentCheckByString(lexerFlags, $tp_ident_canon, bindingType) {
    ASSERT(nonFatalBindingIdentCheckByString.length === arguments.length, 'arg count');

    switch ($tp_ident_canon) {
      // keywords
      case 'break':
      case 'case':
      case 'catch':
      case 'class':
      case 'const':
      case 'continue':
      case 'debugger':
      case 'default':
      case 'delete':
      case 'do':
      case 'else':
      case 'export':
      case 'extends':
      case 'finally':
      case 'for':
      case 'function':
      case 'if':
      case 'import':
      case 'in':
      case 'instanceof':
      case 'new':
      case 'return':
      case 'super':
      case 'switch':
      case 'this':
      case 'throw':
      case 'try':
      case 'typeof':
      case 'var':
      case 'void':
      case 'while':
      case 'with':
      // null / boolean
      case 'null':
      case 'true':
      case 'false':
      // future reserved keyword:
      case 'enum':
        return 'Keywords may not have escapes in their name and this resolves to `' + $tp_ident_canon + '`';

      // strict mode keywords
      case 'let':
        if (bindingType === BINDING_TYPE_CLASS) return 'Can not use `let` as a class name';
        if (bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_CONST) return 'Can not use `let` when binding through `let` or `const`';
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        //   Identifier: IdentifierName but not ReservedWord
        //     It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "let" ...
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Can not use `let` as variable name in strict mode';
        return '';
      case 'static':
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        //   Identifier: IdentifierName but not ReservedWord
        //     It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "static" ...
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Keywords may not have escapes in their name and this resolves to `' + $tp_ident_canon + '`';
        return '';

      // `eval` and `arguments` edge case paths
      case 'eval':
      case 'arguments':
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot create a binding named `'+ $tp_ident_canon +'` in strict mode';
        return '';

      // strict mode only future reserved keyword:
      case 'implements':
      case 'package':
      case 'protected':
      case 'interface':
      case 'private':
      case 'public':
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Keywords may not have escapes in their name and this resolves to `' + $tp_ident_canon + '`';
        return '';

      // conditional keywords (strict mode or context)
      case 'await':
        // await wasnt a keyword before es8, when async was introduced
        if (allowAsyncFunctions) {
          // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
          // > IdentifierReference: await
          // > BindingIdentifier: await
          // > LabelIdentifier: await
          // > It is a Syntax Error if the goal symbol of the syntactic grammar is Module.
          // (Additionally productions are restricted by the `await` parameter... parser/lexerflags should take care of that)
          if (goalMode === GOAL_MODULE) return 'Await is illegal as var name with module goal';
          // in sloppy mode you cant use it inside an async function (and inside params defaults of arrows)
          if (hasAnyFlag(lexerFlags, LF_IN_ASYNC)) return 'Await not allowed here';
        }
        return '';
      case 'yield':
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        // > It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "yield".
        // (Additionally productions are restricted by the `await` parameter... parser/lexerflags should take care of that)
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot use this reserved word as a variable name in strict mode';
        // in sloppy mode you cant use it inside a generator function (and inside params defaults?)
        if (hasAnyFlag(lexerFlags, LF_IN_GENERATOR)) return 'Cannot use this reserved word as a variable name inside a generator';
        return '';
    }

    // valid binding name
    return '';
  }


  // ### expressions (functions below should not call functions above)


  function parseExpression(lexerFlags, astProp) {
    ASSERT(parseExpression.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astProp string');

    let $tp_start_line = tok_getLine();
    let $tp_start_column = tok_getColumn();
    let $tp_start_start = tok_getStart();
    let $tp_start_stop = tok_getStop();

    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);

    return parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, assignable, astProp);
  }
  function parseExpressionAfterLiteral(lexerFlags, $tp_literal_start, $tp_literal_stop, $tp_literal_line, $tp_literal_column, astProp) {
    ASSERT(parseExpressionAfterLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);

    // assume we just parsed and skipped a literal (string/number/regex/array/object)
    let assignable = parseValueTail(lexerFlags, $tp_literal_start, $tp_literal_line, $tp_literal_column, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, astProp);
    parseExpressionFromOp(lexerFlags, $tp_literal_start, $tp_literal_stop, $tp_literal_line, $tp_literal_column, assignable, astProp);
  }
  function parseExpressionAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, astProp) {
    ASSERT(parseExpressionAfterIdent.length === arguments.length, 'arg count');
    ASSERT_BINDING_TYPE(bindingType);

    let assignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, ASSIGN_EXPR_IS_OK, astProp);
    ASSERT(typeof assignable === 'number', 'assignanum', assignable);
    assignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, assignable, astProp);
    ASSERT(typeof assignable === 'number', 'assignanum', assignable);
    return assignable;
  }
  function parseExpressionAfterAsyncAsVarName(lexerFlags, stmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp) {
    ASSERT(arguments.length === parseExpressionAfterAsyncAsVarName.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // This token named "async" has already been verified not to be a bunch of things.
    // Basically this now ends in one of two ways; Either it's a parenless arrow a plain binding.

    if (stmtOrExpr === IS_STATEMENT) {
      AST_open(astProp, {
        type: 'ExpressionStatement',
        loc: undefined,
        expression: undefined,
      });
      astProp = 'expression'
    }

    let assignable = NOT_ASSIGNABLE;
    if (tok_getType() === $PUNC_EQ_GT) {
      // Note: param name is `async` and there is nothing else so args guaranteed to be simple
      // - `async => x`
      //          ^^
      assignable = parseArrowParenlessFromPunc(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, $ID_async, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, allowAssignment, PARAMS_ALL_SIMPLE, $UNTYPED, astProp);
    } else {
      // - `async foo => x`
      //          ^^^
      assignable = parseIdentOrParenlessArrow(lexerFlags, $ID_async, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, IS_ASSIGNABLE, allowAssignment, astProp);
      assignable = parseValueTail(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, assignable, isNewArg, NOT_LHSE, astProp);
      if (stmtOrExpr === IS_STATEMENT) {
        // in expressions operator precedence is handled elsewhere. in statements this is the start,
        assignable = parseExpressionFromOp(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, assignable, astProp);
      }
    }

    ASSERT((isNewArg !== IS_NEW_ARG) || (stmtOrExpr !== IS_STATEMENT), 'this can not be a new arg if it is a statement');
    if (stmtOrExpr === IS_STATEMENT) {
      if (tok_getType() === $PUNC_COMMA) {
        // - `async => x, b`
        // - `async, b`
        _parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, NOT_ASSIGNABLE, astProp);
      }

      parseSemiOrAsi(lexerFlags);
      AST_close($tp_async_start, $tp_async_line, $tp_async_column, 'ExpressionStatement');
    }

    return assignable;
  }
  function parseParenlessArrowAfterAsync(lexerFlags, fromStmtOrExpr, allowAssignment, $tp_async_start, $tp_async_line, $tp_async_column, astProp) {
    ASSERT(parseParenlessArrowAfterAsync.length === arguments.length, 'arg count');
    ASSERT(tok_getType() !== $ID_function, '(Function and newline have already been asserted)');
    ASSERT(tok_getNlwas() === false, '(Function and newline have already been asserted)');
    ASSERT(isIdentToken(tok_getType()), 'dont have to skip the ident to assert it having to be an arrow');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // We must parse an async arrow without parens now. We still have to validate the arg name too.
    // - `async foo => foo`
    //          ^
    // - `async foo => { }`
    // - `async foo \n => foo`
    // - `async foo \n => { }`
    // - `async eval => {}`
    // - `async eval => { "use strict"; }`

    if (fromStmtOrExpr === IS_STATEMENT) {
      AST_open(astProp, {
        type: 'ExpressionStatement',
        loc: undefined,
        expression: undefined,
      });
      astProp = 'expression'
    }

    if (tok_getType() === $ID_await) {
      // - `async await => {}`
      return THROW_RANGE('Cannot use `await` as an arg name with async arrows', tok_getStart(), tok_getStop());
    }

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    let isSimple = PARAMS_ALL_SIMPLE;
    // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
    if (isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon)) {
      // - `async eval => {}`
      // - `async eval => {"use strict"}`
      // - `async package => {}`
      // - `async package => {"use strict"}`
      isSimple = PARAMS_SOME_NONSTRICT;
    }
    ASSERT_skipToArrowOrDie($G_IDENT, lexerFlags); // this was `async <currtok>` and current token is not a keyword

    parseArrowParenlessFromPunc(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, isSimple, $ID_async, astProp);

    if (fromStmtOrExpr === IS_STATEMENT) {
      if (tok_getType() === $PUNC_COMMA) {
        // - `async foo => x, b`
        _parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, NOT_ASSIGNABLE, astProp);
      }

      parseSemiOrAsi(lexerFlags); // this is not a func decl!
      AST_close($tp_async_start, $tp_async_line, $tp_async_column, 'ExpressionStatement');
    }
  }
  function isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon) {
    ASSERT(isStrictOnlyKeyword.length === arguments.length, 'arg count');

    if ($tp_ident_canon.length === ($tp_ident_stop - $tp_ident_start)) {
      return isStrictOnlyKeywordByEnum($tp_ident_type);
    }
    return isStrictOnlyKeywordByString($tp_ident_canon);
  }
  function isStrictOnlyKeywordByEnum($tp_ident_type) {
    switch ($tp_ident_type) {
      case $ID_eval:
      case $ID_arguments:
      case $ID_implements:
      case $ID_interface:
      case $ID_let:
      case $ID_package:
      case $ID_private:
      case $ID_protected:
      case $ID_public:
      case $ID_static:
      case $ID_yield:
        return true;
    }
    return false;
  }
  function isStrictOnlyKeywordByString($tp_ident_canon) {
    // Note: check canon because in strict these are keywords and they are not allowed to have escapes; so treat same
    switch ($tp_ident_canon) {
      case 'eval':
      case 'arguments':
      case 'implements':
      case 'interface':
      case 'let':
      case 'package':
      case 'private':
      case 'protected':
      case 'public':
      case 'static':
      case 'yield':
        return true;
    }
    return false
  }
  function parseExpressionFromOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_stop, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp) {
    ASSERT(parseExpressionFromOp.length === arguments.length, 'arg count');
    ASSERT(typeof assignable === 'number', 'assignable num');

    if (isAnyAssignmentOp()) {
      if (notAssignable(assignable)) {
        return THROW_RANGE('Cannot assign to lhs (starting with `' + tok_sliceInput($tp_firstExpr_start, $tp_firstExpr_stop) + '`) because it is not a valid assignment target', tok_getStart(), tok_getStop());
      }
      return parseExpressionFromAssignmentOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp);
    }

    return parseExpressionFromBinaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp)
  }
  function parseExpressionFromAssignmentOp(lexerFlags, $tp_firstAssignment_start, $tp_firstAssignment_line, $tp_firstAssignment_column, lhsAssignable, astProp) {
    ASSERT(parseExpressionFromAssignmentOp.length === arguments.length, 'arg count');

    let $tp_eq_type = tok_getType();

    AST_convertArrayToPattern($tp_eq_type, astProp)

    // Note: assignment to object/array is caught elsewhere
    AST_wrapClosedCustom(astProp, {
      type: 'AssignmentExpression',
      loc: undefined,
      left: undefined,
      operator: tok_sliceInput(tok_getStart(), tok_getStop()),
      right: undefined,
    }, 'left');
    skipToExpressionStart(lexerFlags);

    let rhsAssignable = parseExpression(lexerFlags, 'right');
    AST_close($tp_firstAssignment_start, $tp_firstAssignment_line, $tp_firstAssignment_column, 'AssignmentExpression');

    // - `a.b = x`
    // - `a = x`
    // - `a = b = x`
    // Reset assignability because further assignments should be parsed immediately and since this will now never
    // become a "simple assignment target", for all further intentions and purposes this won't be assigned to.
    ASSERT(tok_getType() !== $PUNC_EQ);
    return setNotAssignable(mergeAssignable(rhsAssignable, lhsAssignable));
  }
  function parseExpressionFromBinaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp) {
    ASSERT(parseExpressionFromBinaryOp.length === arguments.length, 'arg count');

    if (hasAllFlags(assignable, PIGGY_BACK_WAS_ARROW)) return assignable;

    let $tp_next_type = tok_getType();
    let repeat = false;
    do {
      repeat = false;
      if ($tp_next_type === $PUNC_QMARK) {
        let nowAssignable = parseExpressionFromTernaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, astProp);
        assignable = setNotAssignable(nowAssignable | assignable);
        repeat = true;
      }
      else if (isNonAssignBinOp($tp_next_type, lexerFlags)) {
        let nowAssignable = parseExpressionFromBinaryOpOnlyStronger(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, COAL_SEEN_NEITHER, astProp);
        assignable = setNotAssignable(nowAssignable | assignable);
        repeat = true;
      }
      $tp_next_type = tok_getType();
    } while (repeat);

    if (isAnyAssignmentOp()) {
      // [x]: `[]=n/f>>=v`
      return THROW_RANGE('Can not have an assignment after a non-assignment operator', tok_getStart(), tok_getStop());
    }
    return assignable;
  }
  function preventNullishWithLogic($tp_op_type, $tp_op_start, $tp_op_stop, coalSeen) {
    ASSERT(preventNullishWithLogic.length === arguments.length, 'arg count');

    // Check whether the given op is nullish (`??`), or logical (`||`, or `&&`), and that we haven't seen the other
    // type yet. If an expression is mixing nullish with logical without parenthesis then it's a syntax error.

    if ($tp_op_type === $PUNC_AND_AND || $tp_op_type === $PUNC_OR_OR) {
      if (coalSeen === COAL_SEEN_NULLISH) {
        return THROW_RANGE('Cannot use `??` and `&&`/`||` in the same expression without some grouping', $tp_op_start, $tp_op_stop);
      }
      return COAL_SEEN_LOGICAL; // Just so we know there's already a `??` in this chain, and/or itself doesn't matter
    }

    if ($tp_op_type === $PUNC_QMARK_QMARK) {
      // Cannot mix `??` with `&&` or `||`
      if (coalSeen === COAL_SEEN_LOGICAL) {
        return THROW_RANGE('Cannot use `??` and `&&`/`||` in the same expression without some grouping', $tp_op_start, $tp_op_stop);
      }
      return COAL_SEEN_NULLISH; // Just so we know there's already a `??` in this chain
    }

    return coalSeen;
  }
  function parseExpressionFromBinaryOpOnlyStronger(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, coalSeen, astProp) {
    ASSERT(parseExpressionFromBinaryOpOnlyStronger.length === arguments.length, 'arg count');
    // parseBinary
    // Now parsing the rhs (b) after an operator
    // - `a + b`
    // - `a instanceof b`
    // - `a ** b`

    let $tp_op_type = tok_getType();
    let $tp_op_start = tok_getStart();
    let $tp_op_stop = tok_getStop();

    coalSeen = preventNullishWithLogic($tp_op_type, $tp_op_start, $tp_op_stop, coalSeen);

    // Note: `??` seems to land on being a LogicalExpression, as per https://github.com/estree/estree/issues/203
    let AST_nodeName = ($tp_op_type === $PUNC_AND_AND || $tp_op_type === $PUNC_OR_OR || $tp_op_type === $PUNC_QMARK_QMARK) ? 'LogicalExpression' : 'BinaryExpression';
    AST_wrapClosedCustom(astProp, {
      type: AST_nodeName,
      loc: undefined,
      left: undefined,
      operator: tok_sliceInput($tp_op_start, $tp_op_stop),
      right: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart($tp_op_type, lexerFlags);

    let $tp_rightExprStart_line = tok_getLine();
    let $tp_rightExprStart_column = tok_getColumn();
    let $tp_rightExprStart_start = tok_getStart();

    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'right');

    // If the next op is stronger than this one go deeper now. Only the `**` non-assign binary op also does this
    // for if the previous op was also `**` (and we don't need other checks because it is the strongest binary op).
    let otherStrength = getStrength($tp_op_type, $tp_op_start, $tp_op_stop);
    while (continueParsingBinOp(lexerFlags, otherStrength)) {
      assignable |= parseExpressionFromBinaryOpOnlyStronger(lexerFlags, $tp_rightExprStart_start, $tp_rightExprStart_line, $tp_rightExprStart_column, coalSeen,'right');
    }

    // Can't parse `||` or `&&` _after_ `??` on same level so don't have to check this inside the loop
    preventNullishWithLogic(tok_getType(), tok_getStart(), tok_getStop(), coalSeen);

    AST_close($tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, AST_nodeName);

    return setNotAssignable(assignable);
  }
  function parseExpressionFromTernaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, astProp) {
    // parseTernary
    // > LogicalORExpression ? AssignmentExpression[+In] : AssignmentExpression
    // - `a ? b : c`
    //      ^
    // - `a ? await x : c`
    // - `a ? b : await c`
    // - `a ? b = d : c`
    // - `a ? b : c = d`
    // - `a ? b : yield c`
    AST_wrapClosedCustom(astProp, {
      type: 'ConditionalExpression',
      loc: undefined,
      test: undefined,
      consequent: undefined,
      alternate: undefined,
    }, 'test');
    ASSERT_skipToExpressionStart('?', lexerFlags);
    // you can have an assignment between `?` and `:` but not after `:`
    // the `in` is allowed between as well because there can be no ambiguity
    let midAssignable = parseExpression(sansFlag(lexerFlags, LF_IN_FOR_LHS) | LF_NO_ASI, 'consequent');
    if (tok_getType() !== $PUNC_COLON) {
      if (tok_getType() === $PUNC_COMMA) {
        return THROW_RANGE('Can not use comma inside ternary expressions', tok_getStart(), tok_getStop());
      }
      return THROW_RANGE('Unexpected character inside ternary', tok_getStart(), tok_getStop());
    }
    ASSERT_skipToExpressionStart(':', lexerFlags);
    let rhsAssignable = parseExpression(lexerFlags, 'alternate');
    AST_close($tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, 'ConditionalExpression');

    return setNotAssignable(midAssignable | rhsAssignable);
  }

  function parseExpressionsAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, astProp) {
    ASSERT(parseExpressionsAfterIdent.length === arguments.length, 'arg count');

    let assignableForPiggies = parseExpressionAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, BINDING_TYPE_NONE, astProp)
    if (tok_getType() === $PUNC_COMMA) {
      assignableForPiggies = _parseExpressions(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, assignableForPiggies, astProp);
    }
    return assignableForPiggies;
  }
  function parseExpressions(lexerFlags, astProp) {
    ASSERT(arguments.length === parseExpressions.length, 'arg count');

    let $tp_startOfFirstExpr_line = tok_getLine();
    let $tp_startOfFirstExpr_column = tok_getColumn();
    let $tp_startOfFirstExpr_start = tok_getStart();

    let assignableForPiggies = parseExpression(lexerFlags, astProp);
    if (tok_getType() === $PUNC_COMMA) {
      assignableForPiggies = _parseExpressions(lexerFlags, $tp_startOfFirstExpr_start, $tp_startOfFirstExpr_line, $tp_startOfFirstExpr_column, assignableForPiggies, astProp);
    }
    return assignableForPiggies;
  }
  function _parseExpressions(lexerFlags, $tp_startOfFirstExpr_start, $tp_startOfFirstExpr_line, $tp_startOfFirstExpr_colun, assignableForPiggies, astProp) {
    ASSERT(arguments.length === _parseExpressions.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_COMMA, 'confirm at callsite');
    AST_wrapClosedIntoArrayCustom(astProp, {
      type: 'SequenceExpression',
      loc: undefined,
      expressions: undefined,
    }, 'expressions');
    assignableForPiggies = __parseExpressions(lexerFlags, assignableForPiggies, 'expressions');
    AST_close($tp_startOfFirstExpr_start, $tp_startOfFirstExpr_line, $tp_startOfFirstExpr_colun, 'SequenceExpression');
    return assignableForPiggies; // since we asserted a comma, we can be certain about this
  }
  function __parseExpressions(lexerFlags, assignableForPiggies, astProp) {
    ASSERT(__parseExpressions.length === arguments.length, 'arg count');
    // current node should already be a SequenceExpression here. it wont be closed here either
    do {
      ASSERT_skipToExpressionStart(',', lexerFlags);
      let nowAssignable = parseExpression(lexerFlags, astProp);
      assignableForPiggies |= nowAssignable; // make sure to propagate the await/yield flags
    } while (tok_getType() === $PUNC_COMMA);
    return setNotAssignable(assignableForPiggies);
  }

  function isAnyAssignmentOp() {
    // isAssignmentOp
    ASSERT(isAnyAssignmentOp.length === arguments.length, 'arg count');

    // Find compound ops but ignore comparison ops

    if (!hasAllFlags(tok_getType(), $G_BINOP_ASSIGN)) return false;

    if (tok_getType() !== $PUNC_STAR_STAR_EQ) return true;

    if (!allowExponentiation) {
      return THROW_RANGE('`**` was introduced in ES7', tok_getStart(), tok_getStop());
    }

    return true;
  }
  function isNonAssignBinOp(type, lexerFlags) {
    ASSERT(isNonAssignBinOp.length === arguments.length, 'arg count');

    if (!hasAllFlags(type, $G_BINOP_NONASSIGN)) return false;

    if (type === $PUNC_STAR_STAR) {
      if (!allowExponentiation) {
        return THROW_RANGE('`**` was introduced in ES7', tok_getStart(), tok_getStop());
      }
      return true;
    }

    if (type === $ID_in) {
      return hasNoFlag(lexerFlags, LF_IN_FOR_LHS);
    }

    return true;
  }

  function getStrength(type, $tp_tokenStart, $tp_tokenStop) {
    ASSERT(getStrength.length === arguments.length, 'arg count');
    ASSERT(type !== $ID_of, 'since `of` is not a regular op it should not go through the binary expression parser');
    ASSERT(type !== $PUNC_QMARK, 'parseExpressionFromBinaryOp will consume the qmark on its own and not check this function before doing so');

    // Note: this is only called from the binary expression parser. So certain "ops" are never received here.

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    // the spec is super implicit about operator precedent. you can only discover it by tracing the grammar.
    // note: this function doesnt contain all things that have precedent. most of them are also implicitly
    // determined by parsing mechanisms. stuff here is mostly about disambiguating binary ops.
    // (note that unary ops simply don't consume further binary ops AST-wise so they dont appear in this table)

    switch (type) {
      case $PUNC_STAR_STAR: return 16;
      case $PUNC_STAR: return 15;
      case $PUNC_DIV: return 15;
      case $PUNC_PERCENT: return 15;
      case $PUNC_PLUS: return 14;
      case $PUNC_MIN: return 14;
      case $PUNC_LT_LT: return 13;
      case $PUNC_GT_GT: return 13;
      case $PUNC_GT_GT_GT: return 13;
      case $PUNC_LT: return 12;
      case $PUNC_LT_EQ: return 12;
      case $PUNC_GT: return 12;
      case $PUNC_GT_EQ: return 12;
      case $ID_in: return 12;
      case $ID_instanceof: return 12;
      // case $ID_of: return 12;
      case $PUNC_EQ_EQ: return 11;
      case $PUNC_EXCL_EQ: return 11;
      case $PUNC_EQ_EQ_EQ: return 11;
      case $PUNC_EXCL_EQ_EQ: return 11;
      case $PUNC_AND: return 10;
      case $PUNC_CARET: return 9;
      case $PUNC_OR: return 8;
      case $PUNC_QMARK_QMARK: return 7;
      case $PUNC_AND_AND: return 6;
      case $PUNC_OR_OR: return 5;
      // case $PUNC_QMARK: return 4;
    }

    THROW_RANGE('Unknown operator', $tp_tokenStart, $tp_tokenStop); // other ops should not be handled by this function. dont think this should be possible in prod (it means lexer allowed a new op)
  }

  function continueParsingBinOp(lexerFlags, otherStrength) {
    ASSERT(continueParsingBinOp.length === arguments.length, 'arg count');

    // TODO: this is check worth it?
    // if (!hasAllFlags($tp_next_type, $G_BINOP_NONASSIGN)) return false;

    // Note: this is only called from the binary expression parser. So certain "ops" are never received here.

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    // the spec is super implicit about operator precedent. you can only discover it by tracing the grammar.
    // note: this function doesnt contain all things that have precedent. most of them are also implicitly
    // determined by parsing mechanisms. stuff here is mostly about disambiguating binary ops.
    // (note that unary ops simply don't consume further binary ops AST-wise so they dont appear in this table)

    switch (tok_getType()) {
      case $PUNC_EQ_EQ: return 11 > otherStrength;
      case $PUNC_EXCL_EQ: return 11 > otherStrength;
      case $PUNC_EQ_EQ_EQ: return 11 > otherStrength;
      case $PUNC_EXCL_EQ_EQ: return 11 > otherStrength;
      case $PUNC_AND_AND: return 6 > otherStrength;
      case $PUNC_OR_OR: return 5 > otherStrength;
      case $PUNC_PLUS: return 14 > otherStrength;
      case $PUNC_MIN: return 14 > otherStrength;
      case $PUNC_LT: return 12 > otherStrength;
      case $PUNC_GT: return 12 > otherStrength;
      case $PUNC_LT_EQ: return 12 > otherStrength;
      case $PUNC_GT_EQ: return 12 > otherStrength;
      case $PUNC_STAR: return 15 > otherStrength;
      case $PUNC_DIV: return 15 > otherStrength;
      case $PUNC_PERCENT: return 15 > otherStrength;
      case $PUNC_LT_LT: return 13 > otherStrength;
      case $PUNC_GT_GT: return 13 > otherStrength;
      case $PUNC_GT_GT_GT: return 13 > otherStrength;
      case $ID_in:
        if (hasAllFlags(lexerFlags, LF_IN_FOR_LHS)) {
          return false;
        }
        return 12 > otherStrength;
      case $ID_instanceof: return 12 > otherStrength;
      // case $ID_of: return 12;
      case $PUNC_AND: return 10 > otherStrength;
      case $PUNC_CARET: return 9 > otherStrength;
      case $PUNC_OR: return 8 > otherStrength;
      // case $PUNC_QMARK: return 4 > otherStrength;
      case $PUNC_QMARK_QMARK: return 7 > otherStrength;
      case $PUNC_STAR_STAR:
        if (!allowExponentiation) {
          return THROW_RANGE('`**` was introduced in ES7', tok_getStart(), tok_getStop());
        }
        return true; // No binop beats **
      // return 15 >= otherStrength; // right assoc, so >=
    }

    return false;
  }

  function parseValue(lexerFlags, allowAssignment, isNewArg, leftHandSideExpression, astProp) {
    ASSERT(arguments.length === parseValue.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lf is bitfield');
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'enum');
    ASSERT(leftHandSideExpression === NOT_LHSE || leftHandSideExpression === ONLY_LHSE, 'enum');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT(typeof astProp === 'string', 'astProp string');

    let $tp_start_line = tok_getLine();
    let $tp_start_column = tok_getColumn();
    let $tp_start_start = tok_getStart();

    let assignable = parseValueHeadBody(lexerFlags, PARSE_VALUE_MUST, isNewArg, allowAssignment, leftHandSideExpression, astProp);

    // isNewArg is relevant for tail because call parens should be parsed by the new-parser, not call-parser
    // eg. `new foo()` should NOT be `new (foo())` / `(new foo)()` but we do allow `new foo.bar()`
    return parseValueTail(lexerFlags, $tp_start_start, $tp_start_line, $tp_start_column, assignable, isNewArg, leftHandSideExpression, astProp);
  }
  function parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, allowAssignment, astProp) {
    ASSERT(parseValueAfterIdent.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT_BINDING_TYPE(bindingType);

    // only parses head+body+tail but STOPS at ops
    let assignable = parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, NOT_NEW_ARG, allowAssignment, NOT_LHSE, astProp);
    return parseValueTail(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
  }
  function parseValueHeadBody(lexerFlags, maybe, isNewArg, allowAssignment, leftHandSideExpression, astProp) {
    ASSERT(arguments.length === parseValueHeadBody.length, 'argcount');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT(maybe === PARSE_VALUE_MAYBE || maybe === PARSE_VALUE_MUST, '`maybe` enum', maybe);
    // - ident (a var, true, false, null, super, new <value>, new.target, this, class, function, async func, generator func)
    // - literal (number, string, regex, object, array, template)
    // - arrow or group (special return flag)
    // - await expression

    // do not include the suffix (property, call, etc)

    let start_for_assert;
    ASSERT((start_for_assert = tok_getStart()) || true);

    // return whether the value is assignable (only for regular var names)
    if (isIdentToken(tok_getType())) {
      return parseValueHeadBodyIdent(lexerFlags, isNewArg, BINDING_TYPE_NONE, allowAssignment, leftHandSideExpression, astProp);
    }

    if (isNumberStringRegex(tok_getType())) {
      let $tp_lit_type = tok_getType();
      let $tp_lit_line = tok_getLine();
      let $tp_lit_column = tok_getColumn();
      let $tp_lit_start = tok_getStart();
      let $tp_lit_stop = tok_getStop();
      let $tp_lit_canon = tok_getCanoN();

      skipDiv(lexerFlags); // Next can be any binary operator, anything that closes the current context (`}`, `)`, `]`)
      AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon);
      return NOT_ASSIGNABLE;
    }

    if (isTemplateStart(tok_getType())) {
      let $tp_tick_line = tok_getLine();
      let $tp_tick_column = tok_getColumn();
      let $tp_tick_start = tok_getStart();
      let $tp_tick_stop = tok_getStop();

      parseTickExpression(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, astProp);
      return NOT_ASSIGNABLE;
    }

    if (isPunctuatorToken(tok_getType())) {
      if (tok_getType() === $PUNC_CURLY_OPEN) {
        let skipInit = allowAssignment === ASSIGN_EXPR_IS_OK && leftHandSideExpression === NOT_LHSE && isNewArg === NOT_NEW_ARG ? PARSE_INIT : SKIP_INIT;
        let wasDestruct = parseObjectOuter(lexerFlags, DO_NOT_BIND, BINDING_TYPE_NONE, skipInit, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        return _parseValueHeadBodyAfterObjArr(wasDestruct);
      }

      if (tok_getType() === $PUNC_BRACKET_OPEN) {
        let skipInit = allowAssignment === ASSIGN_EXPR_IS_OK && leftHandSideExpression === NOT_LHSE && isNewArg === NOT_NEW_ARG ? PARSE_INIT : SKIP_INIT;
        let wasDestruct = parseArrayOuter(lexerFlags, DO_NOT_BIND, BINDING_TYPE_NONE, skipInit, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        return _parseValueHeadBodyAfterObjArr(wasDestruct);
      }

      if (tok_getType() === $PUNC_PAREN_OPEN) {
        // do not parse arrow/group tail, regardless
        return parseGroupToplevels(lexerFlags, IS_STATEMENT, allowAssignment, $UNTYPED, 0, 0, 0, 0, '', NOT_ASYNC_PREFIXED, leftHandSideExpression, astProp);
      }

      if (tok_getType() === $PUNC_PLUS_PLUS) {
        return parseUpdatePrefix(lexerFlags, isNewArg, leftHandSideExpression, '++', astProp);
      }

      if (tok_getType() === $PUNC_MIN_MIN) {
        return parseUpdatePrefix(lexerFlags, isNewArg, leftHandSideExpression, '--', astProp);
      }

      if (tok_getType() === $PUNC_PLUS) {
        return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '+', astProp);
      }

      if (tok_getType() === $PUNC_MIN) {
        return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '-', astProp);
      }

      if (tok_getType() === $PUNC_EXCL) {
        return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '!', astProp);
      }

      if (tok_getType() === $PUNC_TILDE) {
        return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '~', astProp);
      }
    }

    ASSERT(start_for_assert === tok_getStart(), 'anything that consumed something should return in that branch ...');
    if (maybe === PARSE_VALUE_MUST) {
      // Slow always-error path

      // If the next token starts with a dot, certain cases should not reach this point:
      // TODO: (random but kind of relevant here): add tests that put `.5` and `...` in any place here a leading-dot-token is expected
      // - `(.2)`
      // - `new.target`
      // - `new.fail`
      // - `(.fail)`
      ASSERT(tok_getType() !== $NUMBER_DEC, 'should be checked elsewhere');

      if (tok_getType() === $PUNC_DOT_DOT_DOT) {
        // The `...` token should be confirmed at any and only points where it might be legal
        // [x]: `let x = ...y;`
        // [x]: `foo[...x];`
        // [x]: `for (...x in y){}`
        // [x]: `y, ...x => x`
        // [x]: `...x => x`
        // [x]: `import(...a);`
        return THROW_RANGE('Unexpected spread/rest dots', tok_getStart(), tok_getStart() + 1);
      }

      if (tok_getType() === $PUNC_DOT) {
        // - `foo[.bar]`    or something silly like that...?
        return THROW_RANGE('Unexpected dot', tok_getStart(), tok_getStop());
      }

      return THROW_RANGE('Expected to parse a value', tok_getStart(), tok_getStop());
    }
    // currently all callsites that have maybe=PARSE_VALUE_MAYBE will ignore the return value if nothing was consumed

    // Note: semantically meaningless but caller should track whether an arg was parsed (compare offset before/after)
    // Returning NOT_ASSIGNABLE to keep the return type consistent and prevent deopts
    return NOT_ASSIGNABLE;
  }
  function _parseValueHeadBodyAfterObjArr(wasDestruct) {
    ASSERT(_parseValueHeadBodyAfterObjArr.length === arguments.length, 'argcount');

    if (hasAllFlags(wasDestruct, MUST_DESTRUCT)) {
      // [x]: `x = {x=y};`
      // [x]: `for ({x=y} ;;) b;`
      // [x]: `[{a = b}];`
      // [x]: `[{x = y}] in z`
      return THROW_RANGE('Found a struct that must be destructured but was not', tok_getStart(), tok_getStop());
    }

    // Note: immediate tail assignments are parsed at this point and `({x})=y` is illegal
    // Note: however, this may still be the lhs inside a `for` header so we still need to propagate it...
    // To make sure we don't accidentally over accept we can check the next token to clamp down abuse

    let assignable = copyPiggies(0, wasDestruct);
    if (hasNoFlag(wasDestruct, CANT_DESTRUCT)) {
      // Prevent cases like `for (([x])=y in z);`, though they could be handled differently as well...
      // - `var {[a]: [b]} = c`  // fail
      // - `var {[a]: b} = c`    // pass
      // - `var {a: [b]} = c`    // pass
      return setAssignable(assignable);
    }
    return setNotAssignable(assignable);
  }
  function parseValueHeadBodyIdent(lexerFlags, isNewArg, bindingType, allowAssignment, leftHandSideExpression, astProp) {
    ASSERT(arguments.length === parseValueHeadBodyIdent.length, 'arg count');
    ASSERT(isIdentToken(tok_getType()), 'token should not yet have been consumed because the next token depends on its value and so you cant consume this ahead of time...');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    skipIdentSafeSlowAndExpensive(lexerFlags, leftHandSideExpression);

    return parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, isNewArg, allowAssignment, leftHandSideExpression, astProp);
  }
  function parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, isNewArg, allowAssignment, leftHandSideExpression, astProp) {
    ASSERT(parseValueHeadBodyAfterIdent.length === arguments.length, 'expecting args');
    ASSERT(isIdentToken($tp_ident_type), 'should have consumed token. make sure you checked whether the token after can be div or regex...');
    ASSERT($tp_ident_start !== tok_getStart(), 'should have consumed this');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT(isNewArg === NOT_NEW_ARG || allowAssignment === ASSIGN_EXPR_IS_ERROR, 'new arg does not allow assignments');
    ASSERT_BINDING_TYPE(bindingType);
    ASSERT([BINDING_TYPE_NONE, BINDING_TYPE_ARG, BINDING_TYPE_VAR, BINDING_TYPE_LET, BINDING_TYPE_CONST, BINDING_TYPE_CATCH_OTHER].includes(bindingType), 'Note: not all bindingTypes are received here');
    ASSERT(![BINDING_TYPE_FUNC_VAR, BINDING_TYPE_FUNC_STMT, BINDING_TYPE_FUNC_LEX, BINDING_TYPE_CLASS, BINDING_TYPE_CATCH_IDENT].includes(bindingType), 'Note: not all bindingTypes are received here');

    // for `new` only a subset is accepted;
    // - `super`
    // - metaproperty (`new.meta`)
    // - `this`
    // - non-reserved ident (inc `yield`, `await`, if possible)
    // - literals (num,str,`null`,`true`,`false`,rex,template)
    // - array / object
    // - function / arrow / async / generator
    // - class

    // for new only a subset is accepted;
    // - super
    // - metaproprety
    // - this
    // - non-reserved ident (inc yield, await, if possible)
    // - literals (num,str,null,true,false,rex,template)
    // - array / object
    // - function / arrow / async / generator
    // - class

    // note: curtok token has been skipped prior to this call.
    switch ($tp_ident_type) {
      case $ID_arguments: {
        if (tok_getType() === $PUNC_EQ_GT) {
          if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
            return THROW_RANGE('Can not use `arguments` as arg name in strict mode', $tp_ident_start, $tp_ident_stop);
          }
          return parseArrowParenlessFromPunc(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, ASSIGN_EXPR_IS_OK, PARAMS_SOME_COMPLEX, $UNTYPED, astProp);
        }
        AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
        return verifyEvalArgumentsVar(lexerFlags);
      }
      case $ID_async:
        return parseAsyncExpression(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, isNewArg, NOT_EXPORT, allowAssignment, leftHandSideExpression, astProp);
      case $ID_await:
        return parseAwait(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, isNewArg, allowAssignment, astProp);
      case $ID_class:
        // - `(class x {})`
        // - `(class x {}.foo)`
        // - `(class x {}.foo())`
        // - `(class x {}())`
        // - `async function f(){   (fail = class extends (await x) {}) => {}   }`
        return parseClassExpression(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
      case $ID_delete:
        ASSERT(leftHandSideExpression === NOT_LHSE, 'checked in skipIdentSafeSlowAndExpensive');
        return _parseUnary(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 'delete', isNewArg, astProp);
      case $ID_eval: {
        if (tok_getType() === $PUNC_EQ_GT) {
          if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
            // (Is it confusing to point to the ident? The parser already knows this must be a param now but the coder might not realize that yet)
            // (Like in `(let = "sentinal 543665")`)
            return THROW_RANGE('Can not use `eval` as arg name in strict mode', $tp_ident_start, $tp_ident_stop);
          }
          return parseArrowParenlessFromPunc(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, ASSIGN_EXPR_IS_OK, PARAMS_SOME_COMPLEX, $UNTYPED, astProp);
        }
        AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
        return verifyEvalArgumentsVar(lexerFlags);
      }
      case $ID_false:
        return parseFalseKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
      case $ID_function:
        parseFunctionExpression(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
        return NOT_ASSIGNABLE;
      case $ID_import:
        if (tok_getType() === $PUNC_PAREN_OPEN) {
          return parseDynamicImport(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, astProp);
        }
        return THROW_RANGE('Import keyword only allowed on toplevel or in a dynamic import', $tp_ident_start, $tp_ident_stop);
      case $ID_let:
        ASSERT(bindingType !== BINDING_TYPE_CLASS, 'class ident does not pass through here');
        if (bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_CONST) {
          return THROW_RANGE('Can not use `let` when binding through `let` or `const`', $tp_ident_start, $tp_ident_stop);
        }
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        //   Identifier: IdentifierName but not ReservedWord
        //     It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "let" ...
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
          return THROW_RANGE('Can not use `let` as variable name in strict mode', $tp_ident_start, $tp_ident_stop);
        }

        return parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, IS_ASSIGNABLE, allowAssignment, astProp);
      case $ID_new:
        // - `new x`
        // - `new x()`
        // - `new.target`
        // - `async function f(){   (fail = new x(await x)) => {}   }`
        // - `async function f(){   (fail = new (await x)) => {}   }`
        // - `async function f(){   (fail = new f[await x]) => {}   }`
        let newAssignable = parseNewKeyword(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, astProp);
        return setNotAssignable(newAssignable); // note: property in `new x().y` is not parsed yet. new expr is never assignable
      case $ID_null:
        return parseNullKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
      case $ID_super:
        return parseSuperKeyword(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, astProp);
      case $ID_true:
        return parseTrueKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
      case $ID_this:
        return parseThisKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
      case $ID_typeof:
        // [v]: `delete typeof true`
        // [x]: `(typeof 3 ** 2)`
        // [x]: `async function f(){   function h({x: typeof await x}) {}   }`
        // [x]: `async function f(){   function h({x: typeof await x}) { "use strict"; }   }`
        // [v]: `async function f(){   function g(x = typeof await x) {}  }`
        // [x]: `async function f(){   function g(x = typeof await x) { "use strict"; }  }`
        // [x]: `[typeof x] = x;`
        // [v]: `[typeof x]`
        // [x]: `([typeof x]) => x;`
        // [v]: `x + typeof y.x`
        ASSERT(leftHandSideExpression === NOT_LHSE, 'checked in skipIdentSafeSlowAndExpensive');
        return _parseUnary(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 'typeof', isNewArg, astProp);
      case $ID_void:
        // [x]: `[void x] = x;`
        // [v]: `[void x]`
        ASSERT(leftHandSideExpression === NOT_LHSE, 'checked in skipIdentSafeSlowAndExpensive');
        return _parseUnary(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 'void', isNewArg, astProp);
      case $ID_yield:
        // - `x + yield`
        // - `delete yield`
        // - `class x extends yield {}`
        // - `5 + yield => {}`
        // - `function *f{ (x = x + yield); }`
        // - `new yield`
        // - `function *f(){ new yield }`
        // - `x = x + yield`
        return parseYield(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, astProp);
    }

    // - `x` but not `true`
    // - `[x, y, ...z = arr]`
    fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);

    return parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, IS_ASSIGNABLE, allowAssignment, astProp);
  }

  function verifyEvalArgumentsVar(lexerFlags) {
    if (hasNoFlag(lexerFlags, LF_STRICT_MODE)) return IS_ASSIGNABLE;

    if (isAnyAssignmentOp()) {
      return THROW_RANGE('Cannot assign to `eval` and `arguments` in strict mode', tok_getStart(), tok_getStop());
    }

    if (tok_getType() === $PUNC_PLUS_PLUS || tok_getType() === $PUNC_MIN_MIN) {
      return THROW_RANGE('Cannot assign to `eval` and `arguments` in strict mode', tok_getStart(), tok_getStop());
    }

    return NOT_ASSIGNABLE;
  }

  function parseTrueKeyword($tp_true_start, $tp_true_line, $tp_true_column, astProp) {
    if (babelCompat) {
      AST_setNode(astProp, {
        type: 'BooleanLiteral',
        loc: AST_getClosedLoc($tp_true_start, $tp_true_line, $tp_true_column),
        value: true,
      });
    } else {
      AST_setNode(astProp, {
        type: 'Literal',
        loc: AST_getClosedLoc($tp_true_start, $tp_true_line, $tp_true_column),
        value: true,
        raw: 'true',
      });
    }
    return NOT_ASSIGNABLE;
  }
  function parseFalseKeyword($tp_false_start, $tp_false_line, $tp_false_column, astProp) {
    if (babelCompat) {
      AST_setNode(astProp, {
        type: 'BooleanLiteral',
        loc: AST_getClosedLoc($tp_false_start, $tp_false_line, $tp_false_column),
        value: false,
      });
    } else {
      AST_setNode(astProp, {
        type: 'Literal',
        loc: AST_getClosedLoc($tp_false_start, $tp_false_line, $tp_false_column),
        value: false,
        raw: 'false',
      });
    }
    return NOT_ASSIGNABLE;
  }
  function parseNullKeyword($tp_null_start, $tp_null_line, $tp_null_column, astProp) {
    if (babelCompat) {
      AST_setNode(astProp, {
        type: 'NullLiteral',
        loc: AST_getClosedLoc($tp_null_start, $tp_null_line, $tp_null_column),
      });
    } else {
      AST_setNode(astProp, {
        type: 'Literal',
        loc: AST_getClosedLoc($tp_null_start, $tp_null_line, $tp_null_column),
        value: null,
        raw: 'null',
      });
    }
    return NOT_ASSIGNABLE;
  }
  function parseSuperKeyword(lexerFlags, $tp_super_start, $tp_super_stop, $tp_super_line, $tp_super_column, astProp) {
    // https://tc39.github.io/ecma262/#table-17
    // > GetSuperBase()	Return the object that is the base for super property accesses bound in this Environment Record.
    // > The object is derived from this Environment Record's [[HomeObject]] field. The value undefined indicates that
    // > super property accesses will produce runtime errors.
    // This implies super() must be called before access to the base. But that's a _runtime_ error.

    // The key is in ConstructorKind. In https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation
    // this ConstructorKind is set to "derived" if extending. Otherwise this value is "base".
    // When calling GetThisBinding an error is thrown if ThisBindingStatus is "uninitialized".
    // When calling NewFunctionEnvironment it will set ThisBindingStatus to "lexical" if ThisMode is lexical. Otherwise to uninitialized.
    // FunctionInitialize will set ThisMode to "lexical" if an arrow, "strict" if strict mode, and "global" otherwise.

    // `super` can only ever appear as `super()` or member expression `super.foo`
    // super member expressions (`super.foo`) can appear in class constructors and class/object methods
    // both can appear in arrows when the arrow is nested in the required construct

    // super.foo is "simple assignment target" (so `(super.foo) = x` is fine)

    // super properties never destruct and super cant be used on its own (so super cannot appear in arrows/args/bindings/etc)
    // super.foo ok in assignment pattern except for `rest` (https://tc39.github.io/ecma262/#sec-destructuring-assignment-static-semantics-early-errors)

    // args/body of `function` keyworded functions of any type cannot contain either form of `super` (search for "Contains SuperProperty")
    // `super()` is illegal inside (search for "HasDirectSuper"):
    // - toplevels
    // - anything that is not a class constructor (except nested arrows, which inherit these rules)
    // - anything that is static, a generator, or async
    // - constructors when its class does not use `extends` (same for nested arrows)
    // this makes `super()` legal in;
    // - constructors of classes that extend anything and are not static, async, or generator
    // - any arrow (including arg init) that is inside such constructors
    // - any arrow directly nested in such arrow

    // while deleting a super property is illegal, it is a runtime error

    // there seems to be no syntactical rule to throw an error if `this` is used before `super()`, which is a runtime
    // error. not even when you could statically determine the error. So let's not because tracking this is a PITA :)
    // the absence of `super()` with and without constructor of an extended class also seems not to be a syntax error.

    AST_setNode(astProp, {
      type: 'Super',
      loc: AST_getClosedLoc($tp_super_start, $tp_super_line, $tp_super_column),
    });

    // now confirm the tail
    // TODO: should we just parse the tail now? I don't think so ... also don't think it's important to do now

    if (tok_getType() === $PUNC_PAREN_OPEN) {
      // super()
      // super(..)
      if (hasNoFlag(lexerFlags, LF_SUPER_CALL)) {
        return THROW_RANGE('Can only use `super()` in constructors of classes that extend another class', $tp_super_start, tok_getStop());
      }
      // the call expression isn't and we did not parse the tail anyways and `super` is not assignable...
      return NOT_ASSIGNABLE;
    }

    if (tok_getType() === $PUNC_BRACKET_OPEN || tok_getType() === $PUNC_DOT) {
      // super.foo
      // super[foo]
      if (hasNoFlag(lexerFlags, LF_SUPER_PROP)) {
        if (tok_getType() === $PUNC_BRACKET_OPEN)  {
          return THROW_RANGE('Can only use `super[foo]` in class or object methods or in arrows nested in those methods/arrows', $tp_super_start, tok_getStop());
        } else {
          return THROW_RANGE('Can only use `super.foo` in class or object methods or in arrows nested in those methods/arrows', $tp_super_start, tok_getStop());
        }
      }
      // the member expression might be but we did not parse the tail and `super` is not assignable...
      return NOT_ASSIGNABLE;
    }

    return THROW_RANGE('The `super` keyword can only be used as call or member expression', $tp_super_start, $tp_super_stop);
  }
  function parseNewKeyword(lexerFlags, $tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon, astProp) {
    // Just parsed the `new` keyword at the start of an expression, should already have
    // been consumed (but `new new x` is a valid expression so we can't assert it)

    // - `new foo()`
    // - `new foo;`
    // - `new.target`       (+ restrictions)
    // - `new.target[await x]`
    // - `new (foo);`
    // - `new (foo)();`
    // - `new foo()();`
    // - `new await foo;`   (illegal)
    // - `new (await foo);`
    // - `new x(await foo);`

    if (tok_getType() === $PUNC_DOT) return parseNewDotTarget(lexerFlags, $tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon, astProp);
    return parseNewExpression(lexerFlags, $tp_new_start, $tp_new_line, $tp_new_column, astProp);
  }
  function parseNewDotTarget(lexerFlags, $tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon, astProp) {
    // - `new.target`
    // - `new.foo`

    if (hasNoFlag(lexerFlags, LF_CAN_NEW_DOT_TARGET)) {
      // only valid if there is at least one scope in the scope tree that is not an arrow scope
      // - `() => new.target`
      // - TODO: `function f(x=() => new.target) {}`
      return THROW_RANGE('Must be inside/nested a regular function to use `new.target`', $tp_new_start, tok_getStop());
    }
    ASSERT_skipToTargetOrDie('.', lexerFlags); // already asserted the dot. For now, the valid followup is `target`

    let $tp_property_line = tok_getLine();
    let $tp_property_column = tok_getColumn();
    let $tp_property_start = tok_getStart();
    let $tp_property_stop = tok_getStop();
    let $tp_property_canon = tok_getCanoN();

    ASSERT_skipDiv($ID_target, lexerFlags); // new.target / foo

    AST_setNode(astProp, {
      type: 'MetaProperty',
      loc: AST_getClosedLoc($tp_new_start, $tp_new_line, $tp_new_column),
      meta: AST_getIdentNode($tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon),
      property: AST_getIdentNode($tp_property_start, $tp_property_stop, $tp_property_line, $tp_property_column, $tp_property_canon),
    });

    return NOT_ASSIGNABLE;
  }
  function parseNewExpression(lexerFlags, $tp_new_start, $tp_new_line, $tp_new_column, astProp) {
    AST_open(astProp, {
      type: 'NewExpression',
      loc: undefined,
      arguments: [],
      callee: undefined,
    });

    // new can parse a MemberExpression (https://tc39.github.io/ecma262/#prod-MemberExpression)
    // member expressions are quite limited;
    // - a.b             (where a is recursively a memberexpression)
    // - a[b]            (where a is recursively a memberexpression)
    // - a`b`            (where a is recursively a memberexpression)
    // - super.b
    // - new.target      (already checked so cannot be here)
    // - import()        (explicitly not `(new import)()` but `new (import())`)
    // - another new
    // - primary;
    //   - this
    //   - identifier ref
    //   - literal
    //   - array
    //   - object
    //   - function expr
    //   - class expr
    //   - generator
    //   - async func
    //   - regex
    //   - template
    //   - group (but not arrow as per the Supplemental Syntax)
    // the `new await` legacy cases are handled in the await-parser
    // - `new await`
    // - `new await x`
    // - `new await()`
    // - `new await()()`
    // - `new await x()`
    // - `new await x()()`
    // - `new b↵++c;`

    if (isIdentToken(tok_getType()) && tok_getType() === $ID_import) {
      return THROW_RANGE('Cannot use dynamic import as an argument to `new`, the spec simply does not allow it', $tp_new_start, tok_getStop());
    }

    // Note: the `isNewArg` state will make sure the `parseValueTail` function properly deals with the first call arg
    let assignableForPiggies = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, IS_NEW_ARG, NOT_LHSE, 'callee');
    AST_close($tp_new_start, $tp_new_line, $tp_new_column, 'NewExpression');
    // [x]: `async function f(){ (x = new x(await x)) => {} }`
    return setNotAssignable(assignableForPiggies);
  }
  function parseThisKeyword($tp_this_start, $tp_this_line, $tp_this_column, astProp) {
    AST_setNode(astProp, {
      type: 'ThisExpression',
      loc: AST_getClosedLoc($tp_this_start, $tp_this_line, $tp_this_column),
    });
    return NOT_ASSIGNABLE;
  }
  function parseUnary(lexerFlags, isNewArg, leftHandSideExpression, opName, astProp) {
    ASSERT(parseUnary.length === arguments.length, 'arg count');
    ASSERT(typeof opName === 'string', 'opname string');
    ASSERT(tok_sliceInput(tok_getStart(), tok_getStop()) === opName, 'should match', opName);
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'enum isNewArg');

    let $tp_unary_line = tok_getLine();
    let $tp_unary_column = tok_getColumn();
    let $tp_unary_start = tok_getStart();
    let $tp_unary_stop = tok_getStop();

    if (leftHandSideExpression === ONLY_LHSE) {
      return THROW_RANGE('The unary expression `' + opName + '` is not allowed here', $tp_unary_start, $tp_unary_stop);
    }

    ASSERT_skipToExpressionStart(tok_sliceInput($tp_unary_start, $tp_unary_stop), lexerFlags); // next can be regex (`+/x/.y`), though it's very unlikely

    return _parseUnary(lexerFlags, $tp_unary_start, $tp_unary_stop, $tp_unary_line, $tp_unary_column, opName, isNewArg, astProp);
  }
  function _parseUnary(lexerFlags, $tp_unary_start, $tp_unary_stop, $tp_unary_line, $tp_unary_column, opName, isNewArg, astProp) {
    ASSERT(_parseUnary.length === arguments.length, 'arg count');
    ASSERT(['+', '-', '~', '!', 'void', 'typeof', 'delete'].includes(opName), '++, --, new, yield, and await have special parsers', opName);
    ASSERT(tok_sliceInput($tp_unary_start, $tp_unary_stop) === opName, 'should match');
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'enum isNewArg');

    if (isNewArg === IS_NEW_ARG) {
      return THROW_RANGE('Cannot `' + opName + '` inside `new`', $tp_unary_start, $tp_unary_stop);
    }

    // - `!x`
    // - `~yield`                        // ok outside strict & generator
    // - `function *f(){ ~yield }`       // error
    // - `+await x`                      // ok, await state needs to propagate back down for strict mode arg check case

    AST_open(astProp, {
      type: 'UnaryExpression',
      loc: undefined,
      operator: opName,
      prefix: true,
      argument: undefined,
    });
    // dont parse just any standard expression. instead stop when you find any infix operator
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument');

    // <SCRUB AST>
    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      if (opName === 'delete' && _path[_path.length - 1].argument.type === 'Identifier') {
        return THROW_RANGE('Cannot delete an identifier without tail, in strict mode', $tp_unary_start, $tp_unary_stop);
      }
    }
    // </SCRUB AST>

    AST_close($tp_unary_start, $tp_unary_line, $tp_unary_column, 'UnaryExpression');

    if (tok_getType() === $PUNC_STAR_STAR) {
      // [x]: `~3 ** 2;`
      // [x]: `typeof 3 ** 2;`
      return THROW_RANGE('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)', tok_getStart(), tok_getStop());
    }
    return setNotAssignable(assignable);
  }
  function parseUpdatePrefix(lexerFlags, isNewArg, leftHandSideExpression, opName, astProp) {
    ASSERT(parseUpdatePrefix.length === arguments.length, 'arg count');
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'isNewArg enum');
    ASSERT(leftHandSideExpression === ONLY_LHSE || leftHandSideExpression === NOT_LHSE, 'leftHandSideExpression enum');
    ASSERT(opName === '--' || opName === '++', 'enum');
    ASSERT(opName ===tok_sliceInput(tok_getStart(), tok_getStop()), 'should sync');

    // note: this is ++/-- PREFIX. This version does NOT have newline restrictions!

    let $tp_punc_line = tok_getLine();
    let $tp_punc_column = tok_getColumn();
    let $tp_punc_start = tok_getStart();
    let $tp_punc_stop = tok_getStop();

    if (leftHandSideExpression === ONLY_LHSE) {
      return THROW_RANGE('An update expression `' + opName + '` is not allowed here', $tp_punc_start, $tp_punc_stop);
    }

    if (isNewArg === IS_NEW_ARG) {
      // [x]: `new ++x`
      // [x]: `new ++x.y`
      // [x]: `new ++x().y`
      return THROW_RANGE('Cannot `new` on a `' + opName +'` expr', $tp_punc_start, $tp_punc_stop);
    }

    ASSERT_skipToExpressionStart($G_PUNCTUATOR, lexerFlags); // next can be regex (++/x/.y), though it's very unlikely
    AST_open(astProp, {
      type: 'UpdateExpression',
      loc: undefined,
      argument: undefined,
      operator: opName,
      prefix: true,
    });
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument');

    AST_throwIfIllegalUpdateArg('argument');

    AST_close($tp_punc_start, $tp_punc_line, $tp_punc_column, 'UpdateExpression');

    if (notAssignable(assignable)) {
      return THROW_RANGE('Cannot inc/dec a non-assignable value as prefix', $tp_punc_start, $tp_punc_stop);
    }

    return setNotAssignable(assignable);
  }

  function parseYield(lexerFlags, $tp_yieldIdent_type, $tp_yieldIdent_start, $tp_yieldIdent_stop, $tp_yieldIdent_line, $tp_yieldIdent_column, $tp_yieldIdent_canon, allowAssignment, astProp) {
    ASSERT(arguments.length === parseYield.length, 'arg count');
    ASSERT($tp_yieldIdent_start !== tok_getStart(), 'should have consumed the ident already');
    ASSERT($tp_yieldIdent_type === $ID_yield, 'should receive the yield keyword token that was already consumed');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // Parse an async arrow as a plain call to `async` first, inheriting the async/generator state. Then when you
    // see the arrow apply the cover grammar which disallows yield to be parsed as a yield-expression, triggering a
    // syntax error. So that means we can parse it as whatever the state while considering a YieldExpression to be
    // not arrowable. That way if it turns out to be an arrow we don't first have to run a check for YieldExpressions
    // and correct to account for [~Yield] if we see the arrow. It just fails.

    if (hasAnyFlag(lexerFlags, LF_IN_GENERATOR)) {
      return parseYieldKeyword(lexerFlags, $tp_yieldIdent_start, $tp_yieldIdent_stop, $tp_yieldIdent_line, $tp_yieldIdent_column, allowAssignment, astProp);
    }
    return parseYieldVarname(lexerFlags, $tp_yieldIdent_type, $tp_yieldIdent_start, $tp_yieldIdent_stop, $tp_yieldIdent_line, $tp_yieldIdent_column, $tp_yieldIdent_canon, allowAssignment, astProp);
  }
  function parseYieldKeyword(lexerFlags, $tp_yield_start, $tp_yield_stop, $tp_yield_line, $tp_yield_column, allowAssignment, astProp) {
    ASSERT(parseYieldKeyword.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    if (hasAllFlags(lexerFlags, LF_IN_FUNC_ARGS)) {
      // Could still be arrow header, but we won't know that until much later. However, this causes destructible=false.
      // - `function *f(){ return function(x = yield y){}; }`
      return THROW_RANGE('The `yield` keyword in arg default must be a var name but that is not allowed inside a generator', $tp_yield_start, $tp_yield_stop);
    }

    if (allowAssignment === ASSIGN_EXPR_IS_ERROR) {
      // note: yield is a recursive AssignmentExpression (its optional argument can be an assignment or another yield)
      // Since `yield` is an AssignmentExpression it cannot appear after a non-assignment operator. (`5+yield x` fails)

      // This basically prevents the `5 + yield x` kinds of cases
      // - `function *f(){ return 5 + yield x; }`

      return THROW_RANGE('Did not expect to parse an AssignmentExpression but found `yield`', $tp_yield_start, $tp_yield_stop);
    }

    AST_open(astProp, {
      type: 'YieldExpression',
      loc: undefined,
      delegate: undefined, // TODO: init to false
      argument: undefined,
    });

    if (tok_getNlwas() === true && isRegexToken(tok_getType())) {
      // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
      // - `continue \n /foo/`
      // - `continue \n /foo/x`
      // tok.asi();
      AST_set('delegate', false);
      AST_set('argument', null);
      ASSERT(ASSERT_ASI_REGEX_NEXT = true); // This should be picked up at semi/asi parser and prevent an assertion error
    }
    else if (tok_getType() === $PUNC_STAR) {
      AST_set('delegate', true);
      parseYieldStarArgument(lexerFlags, $tp_yield_start, 'argument');
    }
    else if (tok_getType() === $PUNC_STAR_STAR) {
      return THROW_RANGE('Cannot use `yield` to the left of the `**` operator', $tp_yield_start, $tp_yield_stop);
    }
    else {
      AST_set('delegate', false);
      parseYieldArgument(lexerFlags, 'argument'); // optional, takes care of newline check
    }
    AST_close($tp_yield_start, $tp_yield_line, $tp_yield_column, 'YieldExpression');

    if (tok_getType() === $PUNC_QMARK) {
      return THROW_RANGE('Can not have a `yield` expression on the left side of a ternary', $tp_yield_start, $tp_yield_stop);
    }

    return NOT_ASSIGNABLE | PIGGY_BACK_SAW_YIELD;
  }
  function parseYieldStarArgument(lexerFlags, $tp_yield_start, astProp) {
    ASSERT(parseYieldStarArgument.length === arguments.length, 'arg count');

    // This is a "delegate". The argument is _required_ now. There is no further newline check, though.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*
    // [v] `yield * x`
    // [x] `yield \n * x`
    // [x] `yield *;`

    if (tok_getNlwas() === true) {
      // [x]: `function *f() { yield \n * x }`
      return THROW_RANGE('A newline after `yield` is illegal for `yield *`', $tp_yield_start, tok_getStart());
    }

    ASSERT_skipToExpressionStart('*', lexerFlags); // next is any value

    let $tp_valueStart_line = tok_getLine();
    let $tp_valueStart_column = tok_getColumn();
    let $tp_valueStart_start = tok_getStart();
    let $tp_valueStart_stop = tok_getStop();

    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp); // arg required, no newline restrictions
    parseExpressionFromOp(lexerFlags, $tp_valueStart_start, $tp_valueStart_stop, $tp_valueStart_line, $tp_valueStart_column, assignable, astProp);
  }
  function parseYieldVarname(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, astProp) {
    ASSERT(parseYieldVarname.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // `yield` _must_ be a treated as a regular var binding now

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      return THROW_RANGE('Cannot use `yield` outside of generator functions when in strict mode', $tp_ident_start, $tp_ident_stop);
    }

    // `yield` is a var name in sloppy mode:
    let assignableFlags = parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, IS_ASSIGNABLE, allowAssignment, astProp);
    return copyPiggies(IS_ASSIGNABLE, assignableFlags);
  }
  function parseYieldArgument(lexerFlags, astProp) {
    ASSERT(parseYieldArgument.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);

    let $tp_yieldArgStart_line = tok_getLine();
    let $tp_yieldArgStart_column = tok_getColumn();
    let $tp_yieldArgStart_start = tok_getStart();
    let $tp_yieldArgStart_stop = tok_getStop();

    // There can be no newline between keyword `yield` and its argument (restricted production)
    if (tok_getNlwas() === true) {
      AST_set(astProp, null);
      return;
    }

    let assignable = parseValueHeadBody(lexerFlags, PARSE_VALUE_MAYBE, NOT_NEW_ARG, ASSIGN_EXPR_IS_OK, NOT_LHSE, astProp);

    if (tok_getStart() === $tp_yieldArgStart_start) {
      AST_set(astProp, null);
      return;
    }

    // We do not need to propagate yield/await state since, per definition, this was a yield. We do need to know whether
    // the arg is assignable because `yield a=b` is valid and is `yield (a=b)`.
    assignable = parseValueTail(lexerFlags, $tp_yieldArgStart_start, $tp_yieldArgStart_line, $tp_yieldArgStart_column, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
    parseExpressionFromOp(lexerFlags, $tp_yieldArgStart_start, $tp_yieldArgStart_stop, $tp_yieldArgStart_line, $tp_yieldArgStart_column, assignable, astProp);
  }

  function parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, assignable, allowAssignment, astProp) {
    ASSERT(parseIdentOrParenlessArrow.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // assume an identifier has just been parsed and that it should be considered a regular var name
    // (in the case of `await`, consider it a regular var)
    if (tok_getType() === $PUNC_EQ_GT) {
      ASSERT(isAssignable(assignable), 'not sure whether an arrow can be valid if the arg is marked as non-assignable');
      return parseArrowParenlessFromPunc(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, PARAMS_ALL_SIMPLE, $UNTYPED, astProp);
    } else {
      AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
      return assignable;
    }
  }

  function parseArrowParenlessFromPunc(lexerFlags, $tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, wasSimple, $tp_async_type, astProp) {
    ASSERT(parseArrowParenlessFromPunc.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT_VALID(allowAssignment === ASSIGN_EXPR_IS_OK, 'arrows are assignment expressions so it should lead to an error if those are not allowed');
    ASSERT(tok_getType() === $PUNC_EQ_GT, 'confirmed at all callsites');
    ASSERT($tp_ident_type !== $ID_await || hasNoFlag(lexerFlags, LF_IN_ASYNC), 'if async the await ident would parse as an await expression which would not lead here');

    let $tp_arrow_start = tok_getStart();
    let $tp_arrow_stop = tok_getStop();

    if (hasAllFlags(lexerFlags, LF_IN_GENERATOR) && $tp_ident_type === $ID_yield) {
      // [x]: `function *g() { async yield => {}; }`
      return THROW_RANGE('Arrows cannot be generators and parenless `yield` param in a generator would be parsing a yield expression and fail at the arrow', $tp_arrow_start, $tp_arrow_stop);
    }

    fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_ARG, lexerFlags); // TODO: confirm this isn't a duplicate check

    // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
    if (isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon)) {
      // Throw error if body is or contains strict mode
      wasSimple = PARAMS_SOME_COMPLEX;
    }

    // - `x => x`
    //      ^
    // - `async x => x`
    //            ^
    // - `eval => x`
    // - `async eval => x`

    if (tok_getNlwas() === true) {
      // - `async x \n => x`
      return THROW_RANGE('The arrow is a restricted production and there can not be a newline before `=>` token', $tp_arrow_start, $tp_arrow_stop);
    }

    ASSERT(($tp_ident_type === $ID_eval || $tp_ident_type === $ID_arguments) ? wasSimple === PARAMS_SOME_COMPLEX : true, 'eval and arguments must pass on complex so they throw if the body contains use strict');
    ASSERT(!(($tp_ident_type === $ID_eval || $tp_ident_type === $ID_arguments) && hasAllFlags(lexerFlags, LF_STRICT_MODE)), 'caller should throw for eval/argument already in strict mode');
    ASSERT(!(hasAnyFlag(lexerFlags, LF_STRICT_MODE) && $tp_ident_type === $ID_yield), 'in strict mode this function will not be called by the parse yield function so we dont need to make an edge case for it');

    // arrow with single param
    if (babelCompat) {
      // Babel does not support `expression`: https://github.com/babel/babel/issues/6772#issuecomment-342935685
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: [AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)],
        id: null,
        generator: false,
        async: $tp_async_type === $ID_async,
        body: undefined,
      });
    } else if (acornCompat && !allowAsyncFunctions) {
      // Do not add `async` property
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: [AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)],
        id: null,
        generator: false,
        expression: undefined, // TODO: init to bool
        body: undefined,
      });
    } else {
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: [AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)],
        id: null,
        generator: false,
        async: $tp_async_type === $ID_async,
        expression: undefined, // TODO: init to bool
        body: undefined,
      });
    }

    let arrowScoop = SCOPE_createGlobal('parseArrowParenlessFromPunc');
    let paramScoop = SCOPE_addLayer(arrowScoop, SCOPE_LAYER_ARROW_PARAMS, 'parseArrowParenlessFromPunc(arg)');
    ASSERT(paramScoop._ = 'parenless arrow scope');
    ASSERT(paramScoop._funcName = '(arrow has no name)');
    SCOPE_addLexBinding(paramScoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_ARG, FDS_ILLEGAL);

    parseArrowFromPunc(lexerFlags, paramScoop, $tp_async_type, allowAssignment, wasSimple);
    AST_close($tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column, 'ArrowFunctionExpression');

    return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW;
  }

  function parseTickExpression(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, astProp) {
    // parseTemplate
    ASSERT(parseTickExpression.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_TEMPLATE) || isTemplateStart(tok_getType()), 'if in template this function can only be called by the head of a nested template');

    // basically; parse tick. if head, keep parsing body until parsing tail

    AST_open(astProp, {
      type: 'TemplateLiteral',
      loc: undefined,
      expressions: [],
      quasis: [],
    });

    let awaitYieldFlagsFromAssignable = ASSIGNABLE_UNDETERMINED;

    if (tok_getType() === $TICK_PURE) {
      parseQuasiPart(lexerFlags, IS_QUASI_TAIL, false);

      AST_close($tp_tick_start, $tp_tick_line, $tp_tick_column, 'TemplateLiteral');

      // - `x${await x}y`
      return awaitYieldFlagsFromAssignable;
    }

    if (tok_getType() === $TICK_HEAD) {
      parseQuasiPart(lexerFlags, NOT_QUASI_TAIL, false);

      let tmpLexerFlags = sansFlag(lexerFlags | LF_IN_TEMPLATE | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION | LF_IN_FOR_LHS);
      // keep parsing expression+tick until tick-tail
      let wasTail = IS_QUASI_TAIL;
      do {
        awaitYieldFlagsFromAssignable |= parseExpressions(tmpLexerFlags, 'expressions');
        wasTail = tok_getType() === $TICK_TAIL || tok_getType() === $TICK_BAD_TAIL ? IS_QUASI_TAIL : NOT_QUASI_TAIL;
        parseQuasiPart(lexerFlags, wasTail, false);
      } while (wasTail === NOT_QUASI_TAIL);

      AST_close($tp_tick_start, $tp_tick_line, $tp_tick_column, 'TemplateLiteral');

      // - `x${await x}y`
      return awaitYieldFlagsFromAssignable;
    }

    ASSERT(isBadTickToken(tok_getType()), 'this can not be a $TICK_TAIL or $TICK_BODY (only other cases of the enum) because the lexer can only emit them while parsing a template, which by definition is not at the start of an expression')
    return THROW_RANGE('Template contained bad escape, which is only valid in _tagged_ templates (and only since ES9/ES2018)', $tp_tick_start, $tp_tick_stop);
  }

  function parseQuasiPart(lexerFlags, wasTail, allowBadEscapes) {
    ASSERT(arguments.length === parseQuasiPart.length, 'arg count');
    ASSERT_VALID(isTickToken(tok_getType()), 'expect current token to be a tick pure, head, body, or tail');

    let $tp_tick_type = tok_getType();
    let $tp_tick_line = tok_getLine();
    let $tp_tick_column = tok_getColumn();
    let $tp_tick_start = tok_getStart();
    let $tp_tick_stop = tok_getStop();
    let $tp_tick_canon = tok_getCanoN();

    let hasDoubleStart = false;
    let noCooked = false;

    if (isBadTickToken(tok_getType())) {
      if (!allowBadEscapes) {
        return THROW_RANGE('Template contained an illegal escape, these are only allowed in _tagged_ templates in >=ES2018', $tp_tick_start, $tp_tick_stop);
      }
      noCooked = true;
    }
    if (tok_getType() === $TICK_PURE || tok_getType() === $TICK_TAIL || tok_getType() === $TICK_BAD_PURE || tok_getType() === $TICK_BAD_TAIL) {
      skipDiv(lexerFlags); // First token after template is division
    } else if (tok_getType() === $TICK_HEAD || tok_getType() === $TICK_BODY || tok_getType() === $TICK_BAD_HEAD || tok_getType() === $TICK_BAD_BODY) {
      ASSERT_skipToExpressionStart($G_TICK, lexerFlags); // First token in template expression can be regex
      hasDoubleStart = true; // the raw string of the token starts with the two-char delimiter `${` instead of one
    } else {
      return THROW_RANGE('The first token after the template expression should be a continuation of the template', $tp_tick_start, $tp_tick_stop);
    }

    // https://github.com/estree/estree/issues/90#issuecomment-109140678
    // The raw value should normalize newlines (\r \r\n) to \n, but not \u000a
    // The cooked value should convert escapes to literals but skip further normalization
    let closeWrapperLen = ($tp_tick_type === $TICK_HEAD || $tp_tick_type === $TICK_BODY || $tp_tick_type === $TICK_BAD_HEAD || $tp_tick_type === $TICK_BAD_BODY ? 2 : 1);
    // Note: the quasi may start with ` or } and end with ` or ${
    let quasiValue = tok_sliceInput($tp_tick_start + 1, $tp_tick_stop - closeWrapperLen);
    if (acornCompat || babelCompat || templateNewlineNormalization) {
      // This normalization is almost lossy as you can't (trivially) reconstruct the original template now
      quasiValue = quasiValue.replace(/\r\n?/g, '\n');
    }
    let cookedValue = noCooked ? null : $tp_tick_canon;

    AST_open('quasis', {
      type: 'TemplateElement',
      // Create a loc that is unclosed, to be closed by AST_close*
      // This loc is for template elements where the backticks, `${`, and `}` characters are ignored in
      // the location ranges... so +1 it
      loc: undefined,
      tail: wasTail === IS_QUASI_TAIL,
      value: {
        raw: quasiValue,
        cooked: cookedValue,
      },
    });
    AST_closeTemplateElement(hasDoubleStart, $tp_tick_start, $tp_tick_line, $tp_tick_column + 1);
  }

  function parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, leftHandSideExpression, astProp) {
    ASSERT(parseValueTail.length === arguments.length, 'arg count');
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'isNewArg enum');
    ASSERT(leftHandSideExpression === ONLY_LHSE || leftHandSideExpression === NOT_LHSE, 'leftHandSideExpression enum');
    ASSERT(typeof assignable === 'number', 'assignable num', assignable);
    ASSERT(typeof astProp === 'string', 'should be string', astProp);

    if (hasAllFlags(assignable, PIGGY_BACK_WAS_ARROW)) return assignable;

    switch (tok_getType()) {
      case $PUNC_DOT: // niet nodig
        return _parseValueTailDotProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
      case $PUNC_BRACKET_OPEN: // niet nodig
        return _parseValueTailDynamicProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
      case $PUNC_PAREN_OPEN: // niet nodig
        return _parseValueTailCall(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
      case $PUNC_QMARK_DOT:
        // [v]: `` value?.bar ``
        // [v]: `` value?.() ``
        // [v]: `` value?.[foo] ``
        // [v]: `` value?.`foo` ``
        // [x]: `` value?.bar`tag` ``
        // [x]: `` value?.()`tag` ``
        // [x]: `` value?.[foo]`tag` ``
        // [x]: `` value?.`foo``tag` ``
        // [v]: `` value?.super ``

        if (isNewArg === IS_NEW_ARG) {
          return THROW_RANGE('Cannot use `?.` in the arg of `new`', tok_getStart(), tok_getStop());
        }

        return parseOptionalValueTailOuter(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, astProp);
      case $TICK_PURE:
      case $TICK_HEAD:
      case $TICK_BAD_PURE:
      case $TICK_BAD_HEAD:
        // isTemplateStart
        return _parseValueTailTemplate(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
      case $PUNC_PLUS_PLUS:
        if (isNewArg === IS_NEW_ARG) return _parseValueTailNewArg(assignable);
        return parseValueTailUpdateExpression(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, leftHandSideExpression, '++', astProp);
      case $PUNC_MIN_MIN:
        if (isNewArg === IS_NEW_ARG) return _parseValueTailNewArg(assignable);
        return parseValueTailUpdateExpression(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, leftHandSideExpression, '--', astProp);
    }

    if (isNewArg === IS_NEW_ARG) return _parseValueTailNewArg(assignable);
    return assignable;
  }
  function parseOptionalValueTailOuter(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, astProp) {
    ASSERT(parseOptionalValueTailOuter.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_QMARK_DOT, 'should call this when we know next is a `?.`');

    // a?.b.c        optional(a, member(b, c))               member(optional(a, b), c)
    // a.b?.c        optional(member(a, b), c)               optional(member(a, b), c)
    // a?.b?.c       optional(a, optional(b, c))             optional(optional(a, b), c)
    // a.b.?.c.d     member(a, optional(b, member(a, b))     member(a, member(optional(b, c), d))
    //
    // a?.b.c;     vs   (a?.b).c;
    // a?.b.c.d;   vs   (a?.b).c.d;
    // a?.b?.c.d;   vs   (a?.b)?.c.d.e;   vs   (a?.b?.c).d.e;   vs   ((a?.b)?.c).d.e;

    do {

      let $tp_next_type = tok_getType();

      switch ($tp_next_type) {

        case $PUNC_QMARK_DOT:
          // <x> ?.

          ASSERT_skipAny($PUNC_QMARK_DOT, lexerFlags);

          let $tp_q_type = tok_getType();

          if (isIdentToken($tp_q_type)) {
            // [v]: `value?.foo.bar`
            //              ^

            let $tp_ident_type = tok_getType();
            let $tp_ident_line = tok_getLine();
            let $tp_ident_column = tok_getColumn();
            let $tp_ident_start = tok_getStart();
            let $tp_ident_stop = tok_getStop();
            let $tp_ident_canon = tok_getCanoN();

            if (!isIdentToken($tp_ident_type)) THROW_RANGE('Expected ident after dot', $tp_ident_start, $tp_ident_stop);

            ASSERT_skipDiv($G_IDENT, lexerFlags);

            AST_setNode(astProp, {
              type: 'OptionalMemberExpression',
              loc: AST_getClosedLoc($tp_valueFirst_start, $tp_valueFirst_line,  $tp_valueFirst_column),
              optional: true, // False for non-optional tails after an optional
              computed: false,
              object: AST_popNode(astProp),
              property: AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon),
            });
          }
          else if ($tp_q_type === $PUNC_BRACKET_OPEN) {
            // [v]: `value?.[x]`
            //              ^

            ASSERT_skipAny($PUNC_BRACKET_OPEN, lexerFlags);

            AST_wrapClosedCustom(astProp, {
              type: 'OptionalMemberExpression',
              loc: undefined,
              optional: true, // False for non-optional tails after an optional
              computed: true,
              object: undefined,
              property: undefined,
            }, 'object');

            parseExpression(lexerFlags, 'property');

            if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
              return THROW_RANGE('Expected the closing `]` char of a dynamic property, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
            }

            ASSERT_skipDiv($PUNC_BRACKET_CLOSE, lexerFlags);

            AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column,'OptionalMemberExpression');
          }
          else if ($tp_q_type === $PUNC_PAREN_OPEN) {
            // [v]: `value?.(x)`
            //              ^

            AST_wrapClosedCustom(astProp, {
              type: 'OptionalCallExpression',
              loc: undefined,
              optional: true, // False for non-optional tails after an optional
              callee: undefined,
              arguments: [],
            }, 'callee');

            let nowAssignable = parseCallArgs(lexerFlags, 'arguments');

            assignable = mergeAssignable(nowAssignable, assignable);

            AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, 'OptionalCallExpression');
          }
          else if (isTemplateStart($tp_q_type)) {
            // [v]: `` value?.`x` ``
            //                ^

            return THROW_RANGE('An value containing the optional chaining operator cannot be followed by a template', tok_getStart(), tok_getStop());
          }
          else if ($tp_q_type === $PUNC_QMARK_DOT) {
            // [x]: `a?.?.b`
            return THROW_RANGE('Cannot cannot `?.?.`, must have something in between', tok_getStart(), tok_getStop())
          }

          break;

        case $PUNC_DOT:
          // [v]: `value?.foo.bar`
          //                 ^
          // [v]: `value?.[foo].bar`
          //                   ^
          // [v]: `value?.(foo).bar`
          //                   ^

          ASSERT_skipAny($PUNC_DOT, lexerFlags);

          let $tp_ident_type = tok_getType();
          let $tp_ident_line = tok_getLine();
          let $tp_ident_column = tok_getColumn();
          let $tp_ident_start = tok_getStart();
          let $tp_ident_stop = tok_getStop();
          let $tp_ident_canon = tok_getCanoN();

          if (!isIdentToken($tp_ident_type)) THROW_RANGE('Expected ident after dot', $tp_ident_start, $tp_ident_stop);

          ASSERT_skipDiv($G_IDENT, lexerFlags);

          AST_setNode(astProp, {
            type: 'OptionalMemberExpression',
            loc: AST_getClosedLoc($tp_valueFirst_start, $tp_valueFirst_line,  $tp_valueFirst_column),
            optional: false, // !!
            computed: false,
            object: AST_popNode(astProp),
            property: AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon),
          });

          break;

        case $PUNC_PAREN_OPEN:
          // [v]: `value?.foo(bar)`
          //                 ^
          // [v]: `value?.[foo](bar)`
          //                   ^
          // [v]: `value?.(foo)(bar)`
          //                   ^

          AST_wrapClosedCustom(astProp, {
            type: 'OptionalCallExpression',
            loc: undefined,
            optional: false, // !!
            callee: undefined,
            arguments: undefined,
          }, 'callee');

          let nowAssignable = parseCallArgs(lexerFlags, 'arguments');

          assignable = mergeAssignable(nowAssignable, assignable);

          AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, 'CallExpression');

          break;

        case $PUNC_BRACKET_OPEN:
          // [v]: `value?.foo[bar]`
          //                 ^
          // [v]: `value?.[foo][bar]`
          //                   ^
          // [v]: `value?.(foo)[bar]`
          //                   ^

          ASSERT_skipAny($PUNC_BRACKET_OPEN, lexerFlags);

          AST_wrapClosedCustom(astProp, {
            type: 'OptionalMemberExpression',
            loc: undefined,
            optional: false, // !!
            computed: true,
            object: undefined,
            property: undefined,
          }, 'object');

          parseExpression(lexerFlags, 'property');

          if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
            return THROW_RANGE('Expected the closing `]` char of a dynamic property, found`' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
          }

          ASSERT_skipDiv($PUNC_BRACKET_CLOSE, lexerFlags);

          assignable = parseOptionalValueTailOuter(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, 'property');

          AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column,'OptionalMemberExpression');

          break;

        // case $PUNC_PLUS_PLUS:
        //   return THROW_RANGE('An value containing the optional chaining operator is not assignable so `++` is illegal here', tok_getStart(), tok_getStop());
        //
        // case $PUNC_MIN_MIN:
        //   return THROW_RANGE('An value containing the optional chaining operator is not assignable so `--` is illegal here', tok_getStart(), tok_getStop());

        default:
          if (isTemplateStart($tp_next_type)) {
            // [v]: `` value?.foo`bar` ``
            //                 ^
            // [v]: `` value?.[foo]`bar` ``
            //                   ^
            // [v]: `` value?.(foo)`bar` ``
            //                   ^

            return THROW_RANGE('An value containing the optional chaining operator cannot be followed by a template', tok_getStart(), tok_getStop());
          }

          return setNotAssignable(assignable);
      }

    } while(true);

    ASSERT(false, 'unreachable');
  }
  function _parseValueTailDotProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
    // parseMemberExpression dot

    ASSERT_skipToIdentOrDie('.', lexerFlags | LF_NOT_KEYWORD);

    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    ASSERT_skipDiv($G_IDENT, lexerFlags); // x.y / z is division
    AST_setNode(astProp, {
      type: 'MemberExpression',
      loc: AST_getClosedLoc($tp_valueFirst_start, $tp_valueFirst_line,  $tp_valueFirst_column),
      object: AST_popNode(astProp),
      property: AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon),
      computed: false,
    });
    return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setAssignable(assignable), isNewArg, NOT_LHSE, astProp);
  }
  function _parseValueTailDynamicProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
    // parseMemberExpression dynamic
    // parseDynamicProperty
    AST_wrapClosedCustom(astProp, {
      type: 'MemberExpression',
      loc: undefined,
      object: undefined,
      property: undefined,
      computed: true,
    }, 'object');
    ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);
    let nowAssignable = parseExpressions(sansFlag(lexerFlags | LF_NO_ASI, LF_IN_FOR_LHS | LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION), 'property');
    // - `foo[await bar]`
    assignable = mergeAssignable(nowAssignable, assignable); // pass on piggies (yield, await, etc)
    assignable = sansFlag(assignable, PIGGY_BACK_WAS_ARROW); // should not leak; `a[b=>c] in d` should pass

    if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
      return THROW_RANGE('Expected the closing bracket `]` for a dynamic property, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    ASSERT_skipDiv($PUNC_BRACKET_CLOSE, lexerFlags);
    AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, 'MemberExpression');
    return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setAssignable(assignable), isNewArg, NOT_LHSE, astProp); // member expressions are assignable
  }
  function _parseValueTailCall(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
    ASSERT(_parseValueTailCall.length === arguments.length, 'arg count');
    ASSERT_VALID(tok_getType() === $PUNC_PAREN_OPEN, 'at paren');

    if (isNewArg === IS_NEW_ARG) { // exception for `new`
      let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
      if (tok_getType() === $PUNC_EQ_GT) {
        return THROW_RANGE('The `new` keyword can not be applied to an arrow', tok_getStart(), tok_getStop());
      }
      // new stops parsing the rhs after the first call args
      assignable = mergeAssignable(nowAssignable, assignable);
      assignable = setNotAssignable(assignable);
      return assignable;
    }

    // Not `new`, parses tail, does not throw on `new async () =>`
    ASSERT(typeof astProp === 'string', 'should be string');
    AST_wrapClosedCustom(astProp, {
      type: 'CallExpression',
      loc: undefined,
      callee: undefined,
      arguments: [],
    }, 'callee');
    let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
    assignable = mergeAssignable(nowAssignable, assignable);
    AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, 'CallExpression');

    return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setNotAssignable(assignable), isNewArg, NOT_LHSE, astProp);
  }
  function _parseValueTailTemplate(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
    ASSERT(_parseValueTailTemplate.length === arguments.length, 'arg count');
    // parseTaggedTemplate
    // Note: in es9+ (only) it is legal for _tagged_ templates to contain illegal escapes (`isBadTickToken(tok_getType())`)

    // Tagged template is like a call but slightly special (and a very particular AST)
    AST_wrapClosedCustom(astProp, {
      type: 'TaggedTemplateExpression',
      loc: undefined,
      tag: undefined,
      quasi: undefined,
    }, 'tag');

    let $tp_Quasi_line = tok_getLine();
    let $tp_Quasi_column = tok_getColumn();
    let $tp_Quasi_start = tok_getStart();

    AST_open('quasi', {
      type: 'TemplateLiteral',
      loc: undefined,
      expressions: [],
      quasis: [],
    });

    _parseValueTailTemplateRest(lexerFlags);

    AST_close($tp_Quasi_start, $tp_Quasi_line, $tp_Quasi_column, 'TemplateLiteral');
    AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, 'TaggedTemplateExpression');

    return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setNotAssignable(assignable), isNewArg, NOT_LHSE, astProp);
  }
  function _parseValueTailTemplateRest(lexerFlags) {
    ASSERT(_parseValueTailTemplateRest.length === arguments.length, 'arg count');
    ASSERT([$TICK_PURE, $TICK_BAD_PURE, $TICK_HEAD, $TICK_BAD_HEAD].includes(tok_getType()), 'this func can only be called for the start of a (tagged) template, with or without bad escapes');

    let awaitYieldFlagsFromAssignable = ASSIGNABLE_UNDETERMINED;

    if (tok_getType() === $TICK_PURE || tok_getType() === $TICK_BAD_PURE) {
      parseQuasiPart(lexerFlags, IS_QUASI_TAIL, allowBadEscapesInTaggedTemplates);
      return
    }

    ASSERT(tok_getType() === $TICK_HEAD || tok_getType() === $TICK_BAD_HEAD, 'tick body or tail can only be lexed in proper context so we shouldnt see those here so this must be head (the only enum value left beyond those)');
    parseQuasiPart(lexerFlags, NOT_QUASI_TAIL, allowBadEscapesInTaggedTemplates);

    let tmpLexerFlags = sansFlag(lexerFlags | LF_IN_TEMPLATE | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION | LF_IN_FOR_LHS);
    // keep parsing expression+tick until tick-tail
    let wasTail = IS_QUASI_TAIL;
    do {
      awaitYieldFlagsFromAssignable |= parseExpressions(tmpLexerFlags, 'expressions');
      wasTail = (tok_getType() === $TICK_TAIL || tok_getType() === $TICK_BAD_TAIL) ? IS_QUASI_TAIL : NOT_QUASI_TAIL;
      parseQuasiPart(lexerFlags, wasTail, allowBadEscapesInTaggedTemplates);
    } while (wasTail === NOT_QUASI_TAIL);
  }
  function _parseValueTailNewArg(assignable) {
    // new rhs only parses a subset of tails
    return setNotAssignable(assignable); // maintain piggies
  }
  function parseValueTailUpdateExpression(lexerFlags, $tp_argStart_start, $tp_argStart_line, $tp_argStart_column, assignable, leftHandSideExpression, opName, astProp) {
    ASSERT(parseValueTailUpdateExpression.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_PLUS_PLUS || tok_getType() === $PUNC_MIN_MIN, 'have not consumed the update op yet');
    ASSERT(opName === '--' || opName === '++', 'enum');
    ASSERT(tok_sliceInput(tok_getStart(), tok_getStop()) === opName, 'should be in sync');

    // note: this is ++/-- SUFFIX. This version DOES have newline restrictions!

    let $tp_op_start = tok_getStart();
    let $tp_op_stop = tok_getStop();

    if (leftHandSideExpression === ONLY_LHSE) {
      // [x]: `class x extends ++y {}`
      //                       ^^
      return THROW_RANGE('A `' + opName + '` update expression is not allowed here', $tp_op_start, $tp_op_stop);
    }

    // if there is a newline between the previous value and UpdateExpression (++ or --) then it is not postfix
    // https://tc39.github.io/ecma262/#sec-rules-of-automatic-semicolon-insertion
    // https://tc39.github.io/ecma262/#prod-UpdateExpression
    // ASI should be attempted... this may be very invalid here, though. so we need to validate that somehow.
    // examples;
    // - `foo\n++bar` -> `foo;++bar;`
    // - `foo\n++\nbar` -> `foo;++bar;`
    // - `++\nfoo;` -> `++foo;`
    // - `foo\n++` -> `foo;++` -> error
    // - `if (foo\n++);` -> error

    // ok when inside a: expression statement, return statement, throw statement, var/let/const decl, export (?)

    if (tok_getNlwas() === true) {
      // note: this is ++/-- SUFFIX. This version DOES have newline restrictions!
      // a restricted production has no tail
      // do nothing. nothing further gets parsed. and since next token is ++ or -- there is no risk of "overaccepting" here
      // caller can return assignability though it won't matter as there's no scenario where the next token causes assignment
      if (hasAllFlags(lexerFlags, LF_NO_ASI)) {
        return THROW_RANGE('The postfix `' + opName + '` is a restricted production so ASI must apply but that is not valid in this context', $tp_op_start, $tp_op_stop);
      }
      return assignable;
    }

    // check for this _after_ the newline check, for cases like
    if (notAssignable(assignable)) {
      // - `"foo"\n++bar`
      return THROW_RANGE('Cannot postfix `' + opName + '` a non-assignable value', $tp_op_start, $tp_op_stop);
    }

    AST_throwIfIllegalUpdateArg(astProp);

    ASSERT_skipDiv(opName, lexerFlags);

    AST_setNodeDangerously(astProp, {
      type: 'UpdateExpression',
      loc: AST_getClosedLoc($tp_argStart_start, $tp_argStart_line,  $tp_argStart_column),
      argument: AST_popNode(astProp),
      operator: opName,
      prefix: false,
    });

    return NOT_ASSIGNABLE;
  }
  function parseCallArgs(lexerFlags, astProp) {
    ASSERT_skipToExpressionStartGrouped($PUNC_PAREN_OPEN, lexerFlags);
    // [v]: `for (x(y in z);;);`
    lexerFlags = sansFlag(lexerFlags | LF_NO_ASI, LF_IN_FOR_LHS);

    let assignable = ASSIGNABLE_UNDETERMINED;
    if (tok_getType() === $PUNC_PAREN_CLOSE) {
      ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);
    } else {
      do {
        if (tok_getType() === $PUNC_DOT_DOT_DOT) {

          let $tp_spread_line = tok_getLine();
          let $tp_spread_column = tok_getColumn();
          let $tp_spread_start = tok_getStart();

          ASSERT_skipToExpressionStart('...', lexerFlags);
          AST_open(astProp, {
            type: 'SpreadElement',
            loc: undefined,
            argument: undefined,
          });
          let nowAssignable = parseExpression(lexerFlags, 'argument');
          assignable = mergeAssignable(nowAssignable, assignable);
          AST_close($tp_spread_start, $tp_spread_line, $tp_spread_column, 'SpreadElement');
        } else {
          let nowAssignable = parseExpression(lexerFlags, astProp);
          assignable = mergeAssignable(nowAssignable, assignable);
        }
        if (tok_getType() !== $PUNC_COMMA) break;

        let $tp_comma_start = tok_getStart();
        let $tp_comma_stop = tok_getStop();

        ASSERT_skipToExpressionStartGrouped(',', lexerFlags);
        if (tok_getType() === $PUNC_PAREN_CLOSE) {
          // `x(a,b,)`
          if (allowTrailingFunctionComma) break;
          return THROW_RANGE('Targeted language version does not support trailing call arg comma', $tp_comma_start, $tp_comma_stop);
        }
      } while (true);

      if (tok_getType() !== $PUNC_PAREN_CLOSE) {
        return THROW_RANGE('Expecting closing paren `)` for the call, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
      }

      ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);
    }
    return sansFlag(assignable, PIGGY_BACK_WAS_ARROW);
  }
  function parseDynamicImportStatement(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, astProp) {
    ASSERT(parseDynamicImportStatement.length === arguments.length, 'arg count');

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: undefined,
      expression: undefined,
    });
    parseDynamicImport(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, 'expression');
    let assignable = parseValueTail(lexerFlags, $tp_import_start, $tp_import_line, $tp_import_column, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, 'expression');
    parseExpressionFromOp(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, assignable, 'expression');
    parseSemiOrAsi(lexerFlags);
    AST_close($tp_import_start, $tp_import_line, $tp_import_column, 'ExpressionStatement');
  }
  function parseDynamicImport(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, astProp) {
    ASSERT(parseDynamicImport.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_PAREN_OPEN, 'havent consumed the paren yet');

    // NOTE: dynamic import is NOT bound to the module goal (!) Only to the version (ES2020+)
    if (!allowDynamicImport) {
      return THROW_RANGE('Dynamic import syntax not supported. Requires version ES2020+ / ES11+.', $tp_import_start, $tp_import_stop);
    }

    // https://github.com/estree/estree/blob/master/experimental/import-expression.md

    if (acornCompat) {
      AST_open(astProp, {
        type: 'ImportExpression',
        loc: undefined,
        source: undefined,
      });
    } else {
      AST_open(astProp, {
        type: 'CallExpression',
        loc: undefined,
        callee: undefined,
        arguments: [],
      });
      AST_setNode('callee', {
        type: 'Import',
        loc: AST_getClosedLoc($tp_import_start, $tp_import_line,  $tp_import_column),
      });
    }

    ASSERT_skipToExpressionStart($PUNC_PAREN_OPEN, lexerFlags); // The arg to dynamic import is mandatory and an arbitrary expr

    let assignable = parseExpression(lexerFlags, acornCompat ? 'source' : 'arguments');

    if (tok_getType() !== $PUNC_PAREN_CLOSE) {
      // Error path

      if (tok_getType() === $PUNC_COMMA) {
        // [x]: `import(a, b)`
        return THROW_RANGE('Dynamic `import` only expected exactly one argument and does not allow for a trailing comma', $tp_import_start, tok_getStop());
      }

      if (tok_getType() === $ID_in) {
        return THROW_RANGE('The dynamic import syntax explicitly forbids the `in` operator', tok_getStart(), tok_getStop());
      }

      // [x]: `import(a b)`
      return THROW_RANGE('The dynamic `import` argument was followed by unknown content', tok_getStart(), tok_getStop());
    }

    ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);

    AST_close($tp_import_start, $tp_import_line, $tp_import_column, acornCompat ? 'ImportExpression' : 'CallExpression');

    // - `function f(x = import(yield)) {}`
    // - `function f(x = import(await)) {}`
    // - `function *a() { function f(x = import(yield)) {} }`
    // - `function *a() { function f(x = import(yield x)) {} }`
    // - `async function a() { function f(x = import(await x)) {} }`
    // - `import(() => {})`
    // - `import(() => {} + x)`

    return assignable;
  }

  function parseArrowFromPunc(lexerFlags, paramScoop, $tp_async_type, allowAssignment, paramsSimple) {
    ASSERT(arguments.length === parseArrowFromPunc.length, 'arg count');
    ASSERT_skipToExpressionStart('=>', lexerFlags); // the `{` for a block is subsumed in the expr-start lexer hint
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isasync enum');
    ASSERT($tp_async_type === $UNTYPED || allowAsyncFunctions, 'async = es8 and this should be confirmed elsewhere');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    ASSERT(_path[_path.length - 1] && _path[_path.length - 1].params, 'params should be wrapped in arrow node now');

    if (allowAssignment === ASSIGN_EXPR_IS_ERROR) {
      // - `delete foo => bar`
      // - `new foo => bar`
      // - `await foo => bar`
      // - `delete async (x) => y`
      // - `delete (foo) => x;`
      // - `delete (foo) => bar`
      // - `++(x) => b`
      // - `new (x) => {}`
      return THROW_RANGE('Was parsing a value that could not be AssignmentExpression but found an arrow', tok_getStart(), tok_getStop());
    }

    if (options_exposeScopes) AST_set('$scope', paramScoop);

    if (paramScoop.dupeParamErrorStart !== NO_DUPE_PARAMS) {
      // Dupe params are never allowed in arrows (only in some cases for functions)
      return THROW_RANGE('Arrow had duplicate params', paramScoop.dupeParamErrorStart - 1, paramScoop.dupeParamErrorStop);
    }

    let insideForLhs = hasAllFlags(lexerFlags, LF_IN_FOR_LHS);
    let arrowInheritedFlags = lexerFlags & (LF_CAN_NEW_DOT_TARGET | LF_IN_CONSTRUCTOR);

    lexerFlags = resetLexerFlagsForFuncAndArrow(lexerFlags, $UNTYPED, $tp_async_type, IS_ARROW);
    lexerFlags |= arrowInheritedFlags; // Some flags _are_ inherited by arrows (tests will show you the way)

    if (tok_getType() === $PUNC_CURLY_OPEN) {
      // This means: "is the body of the arrow not a block?"
      // Skip for Babel: https://github.com/babel/babel/pull/6836
      if (!babelCompat) AST_set('expression', false);

      let arrowScoop = SCOPE_addLayer(paramScoop, SCOPE_LAYER_FUNC_BODY, 'parseArrowFromPunc');
      ASSERT(arrowScoop._funcName = '(arrow has no name)');
      // For all intentions and purposes, the next token after this arrow cannot be a division.
      // If it's a regular expression it must be on the next line.
      parseFunctionBody(lexerFlags, arrowScoop, IS_EXPRESSION, paramsSimple, NO_DUPE_PARAMS, NO_DUPE_PARAMS, $UNTYPED, 0, 0, '', true);
      if (isRegexToken(tok_getType()) && !tok_getNlwas()) {
        THROW_RANGE('Found a regex or division after an arrow, that is illegal', tok_getStart(), tok_getStop())
      }
    } else {
      // Note: you cannot await in a regular arrow, so this is illegal:
      // - `async function f(fail = () => await x){}`
      // And for async the propagation of await/yield is irrelevant because the `await` won't count as being a default:
      // - `async function f(fail = async () => await x){}`
      // This is somewhat similar to a regular function, which may be more intuitive:
      // - `async function f(fail = async function(){await x}){}`
      // (Spec wise; the code in the function does not run immediately so there is no race condition to protect)

      // Note: in `for-in` headers, the LF_IN_FOR_LHS flag is NOT reset for expr-body arrows
      if (insideForLhs) lexerFlags |= LF_IN_FOR_LHS;

      if (!babelCompat) AST_set('expression', true); // "body of arrow is expr"
      parseExpression(lexerFlags, 'body');
    }

    {
      let $tp_error_type = tok_getType();
      let $tp_error_start = tok_getStart();
      let $tp_error_stop = tok_getStop();
      let $tp_error_nl = tok_getNlwas();

      // All checks in this block only serve to provide a nicer error message. Omitting them would still lead to an error.
      if (insideForLhs && $tp_error_type === $ID_in) {
        return THROW_RANGE('Arrows cannot be lhs to for-in', $tp_error_start, $tp_error_stop);
      }
      // Arrows cannot have tails. Most expressions will consume them, but not `x++` for example. So do after either path.
      if ($tp_error_type === $PUNC_DOT) {
        return THROW_RANGE('Block body arrows can not be immediately accessed without a group', $tp_error_start, $tp_error_stop);
      }
      if ($tp_error_nl) {
        if ($tp_error_type === $PUNC_DIV) {
          // - `()=>{} \n \ a`
          return THROW_RANGE('An arrow function can not be part of an operator to the right', $tp_error_start, $tp_error_stop);
        }
        // ASI will probably happen next
        return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW;
      }
      if ($tp_error_type === $PUNC_PAREN_OPEN) {
        return THROW_RANGE('Block body arrows can not be immediately invoked without a group', $tp_error_start, $tp_error_stop);
      }
      if ($tp_error_type === $PUNC_BRACKET_OPEN) {
        return THROW_RANGE('Block body arrows can not be immediately accessed without a group', $tp_error_start, $tp_error_stop);
      }
      if (isTemplateStart($tp_error_type)) {
        return THROW_RANGE('Block body arrows can not be immediately tagged without a group', $tp_error_start, $tp_error_stop);
      }
      if (isAnyAssignmentOp() || hasAllFlags($tp_error_type, $G_BINOP_NONASSIGN)) {
        // - `()=>{} + a'
        // - `()=>{} *= a'
        return THROW_RANGE('An arrow function can not be part of an operator to the right', $tp_error_start, $tp_error_stop);
      }
      if ($tp_error_type === $PUNC_PLUS_PLUS || $tp_error_type === $PUNC_MIN_MIN) {
        // - `()=>{}++'
        // - `()=>{}--'
        // - `()=>{}\n++x'
        // - `()=>{}\n--x'
        return THROW_RANGE('An arrow function can not have a postfix update operator', $tp_error_start, $tp_error_stop);
      }
    }

    return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW;
  }
  function parseGroupToplevels(lexerFlagsBeforeParen, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, $tp_async_type, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, newlineAfterAsync, leftHandSideExpression, astProp) {
    ASSERT(parseGroupToplevels.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'async token');
    ASSERT(tok_getType() === $PUNC_PAREN_OPEN, 'should have thrown if not currently at paren open');
    ASSERT_ASSIGN_EXPR(allowAssignmentForGroupToBeArrow);

    let $tp_paren_line = tok_getLine();
    let $tp_paren_column = tok_getColumn();
    let $tp_paren_start = tok_getStart();

    ASSERT_skipToExpressionStartGrouped($PUNC_PAREN_OPEN, lexerFlagsBeforeParen); // Patterns are subsumed by exprs when it comes to skip

    ASSERT(newlineAfterAsync === NOT_ASYNC_PREFIXED || newlineAfterAsync === IS_ASYNC_PREFIXED, 'enum');
    ASSERT(typeof astProp === 'string');
    ASSERT($tp_paren_start !== tok_getStart(), 'paren should be skipped');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignmentForGroupToBeArrow);
    // = parseGroup(), = parseArrow()
    // will parse `=>` tail if it exists (except in async edge cases)
    // must return IS_ASSIGNABLE or NOT_ASSIGNABLE
    // returns whether the parsed expression is assignable
    // If this was `async` prefixed then the callsite will deal with the tail, arrow or not. This is because
    // it needs to take care of the `async \n (x) => z` case and clean up the AST properly.

    let $tp_firstTokenAfterParen_line = tok_getLine();
    let $tp_firstTokenAfterParen_column = tok_getColumn();
    let $tp_firstTokenAfterParen_start = tok_getStart();

    // Notable remarks;
    // - empty group `()` is the only one that must be followed by an arrow (`=>`) unless async
    // - if a group has a top level assignable it is only ever assignable if the group does not have a comma
    // - the `(x)` case is the only case to be compoundable (so `(x.y)+=z` is not valid)
    // - if rest-pattern occurs anywhere as part of the group then the group _must_ be an arrow
    // - objects and arrows in a group are never assignable (you can only destructure by <arr/obj, `=`, init>, no group)

    // this function assumes you've just skipped the paren and are now in the first token of a group/arrow/async-call
    // this is either the arg of a delete, or any other group opener that may or may not have been prefixed with async
    let lexerFlags = sansFlag(lexerFlagsBeforeParen | LF_NO_ASI, LF_IN_FOR_LHS | LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION);
    // parse the group as if it were a group (also for the sake of AST)
    // while doing so keep track of the next three states. At the end
    // act accordingly.

    let arrowScoop = SCOPE_createGlobal('_parseGroupToplevels');
    let paramScoop = SCOPE_addLayer(arrowScoop, SCOPE_LAYER_ARROW_PARAMS, '_parseGroupToplevels(arg)');
    ASSERT(paramScoop._ = 'arrow scope');
    ASSERT(paramScoop._funcName = '(arrow has no name)');

    if (tok_getType() === $PUNC_PAREN_CLOSE) {
      // special case; the `()` here must be the arrow header or (possibly) an `async()` function call

      if ($tp_async_type === $ID_async) {
        // - `async ()`
        //           ^
        // - `async () => x`
        //           ^
        ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags); // can be `async() / x`

        // all async prefixed cases are handled by special async call site
        // - `async ();`
        //            ^
        // - `async () => x`
        //             ^
        // - `async \n ();`
        // - `async \n () => x`
        // - `async () \n => x`
        // - `(async ());`
        // - `(async () => x)`
        // - `(async \n ());`
        // - `(async \n () => x)`
        // - `(async () \n => x)`

        return parseAfterAsyncGroup(lexerFlagsBeforeParen, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, PARAMS_ALL_SIMPLE, false, newlineAfterAsync, true, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, ASSIGNABLE_UNDETERMINED, astProp);
      }

      ASSERT_skipToArrowOrDie($PUNC_PAREN_CLOSE, lexerFlags);

      let $tp_arrow_start = tok_getStart();
      let $tp_arrow_stop = tok_getStop();

      if (leftHandSideExpression === ONLY_LHSE) {
        return THROW_RANGE('Arrow not allowed in this position', $tp_paren_start, $tp_arrow_stop);
      }

      lexerFlags = lexerFlagsBeforeParen; // reset no_asi state to before the group

      if (tok_getNlwas() === true) {
        // arrows with newlines are always an error
        // - `() \n => x`
        return THROW_RANGE('The arrow token `=>` is a restricted production and cannot have a newline preceding it', $tp_arrow_start, $tp_arrow_stop);
      }

      // - `() => x`
      // - `( () => x )`
      // - `return () => x`

      if (babelCompat) {
        AST_open(astProp, {
          type: 'ArrowFunctionExpression',
          loc: undefined,
          params: [],
          id: null,
          generator: false,
          async: false,
          body: undefined,
        });
      } else if (acornCompat && !allowAsyncFunctions) {
        // Do not add `async` property
        AST_open(astProp, {
          type: 'ArrowFunctionExpression',
          loc: undefined,
          params: [],
          id: null,
          generator: false,
          expression: undefined, // TODO: init to bool
          body: undefined,
        });
      } else {
        AST_open(astProp, {
          type: 'ArrowFunctionExpression',
          loc: undefined,
          params: [],
          id: null,
          generator: false,
          async: false,
          expression: undefined, // TODO: init to bool
          body: undefined,
        });
      }
      let assignable = parseArrowFromPunc(lexerFlags, paramScoop, $UNTYPED, allowAssignmentForGroupToBeArrow, PARAMS_ALL_SIMPLE);

      AST_close($tp_paren_start, $tp_paren_line, $tp_paren_column, 'ArrowFunctionExpression');

      return assignable;
    }

    let foundSingleIdentWrap = false; // did we find `(foo)` ?
    let rootAstProp = astProp; // astprop changes after the first comma when the group becomes a SequenceExpression
    let destructible = MIGHT_DESTRUCT; // this function checks so many things :(
    let assignable = ASSIGNABLE_UNDETERMINED; // true iif first expr is assignable, always false if the group has a comma
    let toplevelComma = false;
    let wasSimple = PARAMS_ALL_SIMPLE; // true if only idents and without assignment (so es5 valid), provided destructable
    let mustBeArrow = false; // special case; a `...` must mean arrow, and a trailing comma must mean arrow as well

    while (tok_getType() !== $PUNC_PAREN_CLOSE) { // top-level group loop, list of ident, array, object, rest, and other expressions
      if (isIdentToken(tok_getType())) {
        // - (x)
        // - (x = y)
        // - (x, y)
        // - (x.foo)
        // - (x + foo)
        // - (x.foo = y)
        // - (true)
        // - (typeof x)
        // - (new x)

        // first scan next token to see what potential checks we need to apply

        let $tp_ident_type = tok_getType();
        let $tp_ident_line = tok_getLine();
        let $tp_ident_column = tok_getColumn();
        let $tp_ident_start = tok_getStart();
        let $tp_ident_stop = tok_getStop();
        let $tp_ident_canon = tok_getCanoN();

        skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // because `(x/y)` and `(typeof /x/)` need different next token states

        let wasAssignment = tok_getType() === $PUNC_EQ;
        let wasCommaOrEnd = tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_PAREN_CLOSE;

        ASSERT(toplevelComma || tok_getType() !== $PUNC_PAREN_CLOSE || assignable === ASSIGNABLE_UNDETERMINED, 'for group with one simple element, delete edge case');

        let exprAssignable = parseExpressionAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, BINDING_TYPE_ARG, astProp);
        assignable = mergeAssignable(exprAssignable, assignable);
        SCOPE_addLexBinding(paramScoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_ARG, FDS_ILLEGAL);

        if (wasAssignment) {
          // [v]: `(foo = x) => {}`
          //            ^
          // [x]: `(true = x) => {}`
          // [x]: `([dupe, a], dupe=x) => {}`
          // [v]: `delete (x=await)`
          wasSimple = PARAMS_SOME_COMPLEX;
        }
        else if (wasCommaOrEnd) {
          // [v]: `(foo) => {}`
          //           ^
          // [x]: `(true) => {}`
          // group has multiple exprs, this ident is just an ident
          // - (x, ...);
          // - (x, ...) => ...
          // or this is the end of a group
          // - (x)
          // - (..., x)
          // or this is the delete edge case
          // - delete (foo)
          // - delete ((foo) => foo)
          // - delete ((foo).bar)

          if (!toplevelComma && tok_getType() === $PUNC_PAREN_CLOSE) {
            ASSERT(destructible === MIGHT_DESTRUCT, 'should not have parsed anything yet so destructible is still default');
            ASSERT(wasSimple === PARAMS_ALL_SIMPLE, 'should still be the default');
            // this must be the case where the group consists entirely of one ident, `(foo)`
            // there may still be an arrow trailing, which this function should deal with too
            foundSingleIdentWrap = true; // move on to the arrow
          }

          // if curtok is a comma then the group is not assignable but that will fail through the toplevelComma flag
          // if the group is just an identifier then it can be assigned to: `(a) = b`. There's a test. Or two.
          // If the group is not assignable then it can't become an arrow and we can skip a few related cases
          // If the arg name is eval or arguments and sloppy mode, then its assignable but not "simple"
          if (notAssignable(assignable)) {
            // [x]: `(true) => {}`
            // [x]: `(eval) => {}`
            // [x]: `(arguments) => {}`
            destructible |= CANT_DESTRUCT;
            // wasSimple = PARAMS_SOME_COMPLEX; // if we can't assign to it then the name is a keyword of sorts // Only used for arrows but that would throw with cant_destruct
          } else if (
            // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
            isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon)
          ) {
            // If it was already in strict mode then all cases would throw or miss this branch
            // - eval, arguments: not assignable in strict mode
            // - reserved keywords (package etc) and static: throw immediately in strict mode
            // - let, yield: must be parsed as keywords so are not assignable idents in strict mode
            ASSERT(hasNoFlag(lexerFlags, LF_STRICT_MODE), 'no keyword would reach this branch in strict mode');

            // Mark the args as non-simple such that if the body contains a "use strict" directive, it will still throw
            // [v]: `(eval) => { }`
            // [v]: `(package) => { }`
            // [x]: `(eval) => { "use strict"; }`
            // [x]: `(package) => { "use strict"; }`
            wasSimple = PARAMS_SOME_COMPLEX; // Throw if use strict directive is found
          } else {
            // The arg was not special under strict mode
            // [x]: `f = (foo) => { "use strict"; }`
            //               ^
            // [x]: `f = (async) => { "use strict"; }`
            // [x]: `({a:(b) = 0} = 1)`
            //             ^
          }
        }
        else {
          // the token following this ident is not one valid in a destructuring assignment (unlike array/object)
          // parse a regular ident expression here
          // - `(typeof x)`
          destructible |= CANT_DESTRUCT;
          // wasSimple = PARAMS_SOME_COMPLEX; // Only used for arrows but that would throw with cant_destruct
        }
      }
      else if (tok_getType() === $PUNC_CURLY_OPEN) {
        // note: grouped object/array literals are _never_ assignable
        // - ({})
        // - ({..})
        // - ({..} = x)
        // - ({..}, x)
        // - ({..}.foo)
        // - ({..}.foo = x)
        // - ({..} + foo)

        let $tp_startOfPattern_line = tok_getLine();
        let $tp_startOfPattern_column = tok_getColumn();
        let $tp_startOfPattern_start = tok_getStart();
        let $tp_startOfPattern_stop = tok_getStop();

        destructible |= parseObjectOuter(lexerFlags, paramScoop, BINDING_TYPE_ARG, PARSE_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        // - `({web: true,  __proto__: x, __proto__: y});`
        if (tok_getType() !== $PUNC_COMMA && tok_getType() !== $PUNC_PAREN_CLOSE) {
          // Note: this is NOT destructible because we're in a group toplevel so an assignment would just be an
          // assignment, not a destructuring. And any tail would not lead to any kind of pattern. And destructuring
          // can not happen to groups, so `({x=y})=z` is not valid because of the parens. So cant destructure this.
          // Fixes `async ({} + 1) => x;`
          destructible |= CANT_DESTRUCT;
        }

        assignable = parseAfterPatternInGroup(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, destructible, astProp);
        wasSimple = PARAMS_SOME_COMPLEX;
      }
      else if (tok_getType() === $PUNC_BRACKET_OPEN) {
        // note: grouped object/array literals are _never_ assignable
        // - ([])
        // - ([..])
        // - ([..] = x)
        // - ([..], x)
        // - ([..].foo)
        // - ([..].foo = x)
        // - ([..] + foo)

        let $tp_startOfPattern_line = tok_getLine();
        let $tp_startOfPattern_column = tok_getColumn();
        let $tp_startOfPattern_start = tok_getStart();
        let $tp_startOfPattern_stop = tok_getStop();

        destructible |= parseArrayOuter(lexerFlags, paramScoop, BINDING_TYPE_ARG, PARSE_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        // - `([{web: true,  __proto__: x, __proto__: y}]);`
        if (tok_getType() !== $PUNC_COMMA && tok_getType() !== $PUNC_PAREN_CLOSE) {
          // Note: this is NOT destructible because we're in a group toplevel so an assignment would just be an
          // assignment, not a destructuring. And any tail would not lead to any kind of pattern. And destructuring
          // can not happen to groups, so `({x=y})=z` is not valid because of the parens. So cant destructure this.
          // Fixes `async ({} + 1) => x;`
          destructible |= CANT_DESTRUCT;
        }
        assignable = parseAfterPatternInGroup(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, destructible, astProp);
        wasSimple = PARAMS_SOME_COMPLEX;
      }
      else if (tok_getType() === $PUNC_DOT_DOT_DOT) {
        // top level group dots kinda have to be rest but there is an `async` edge case where it could be spread
        wasSimple = PARAMS_SOME_COMPLEX;

        // rest (can not be spread)
        // a `...` at the top-level of a group means this has to be an arrow header unless async'ed
        // a `...[x+y]` at the toplevel is an error

        // - (...x) => x
        // - (...[destruct]) => x
        // - (...{destruct}) => x
        // - async(...ident) => x
        // - async(...[destruct]) => x
        // - async(...{destruct}) => x
        // - async(...<expr>);            // :(

        let subDestruct = parseArrowableSpreadOrRest(lexerFlags, paramScoop, $PUNC_PAREN_CLOSE, BINDING_TYPE_ARG, $tp_async_type, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

        // Invalidate stuff like `(...x=y)=>x`
        destructible |= subDestruct;

        if ($tp_async_type === $ID_async) {
          // - `async(...x);`
          // - `async(...x,)`
          // - `async(...x,b)`
          // - `async(...x) => x`
          if (tok_getType() !== $PUNC_PAREN_CLOSE) {
            // These cases are not valid as arrows so the header cannot destruct.
            // - `async (...x,)`
            // - `async (...x,b)`
            destructible |= CANT_DESTRUCT; // Now the dots in async toplevel must mean spread/call
          } else {
            // These cases are valid both as a call to `async` as well as an async arrow, so do nothing
            // - `async(...x);`
            // - `async(...x) => x`
          }
        } else {
          if ((hasAllFlags(subDestruct, CANT_DESTRUCT) || tok_getType() === $PUNC_COMMA)) {
            return THROW_RANGE('The ... argument must be destructible in an arrow header, found something that was not destructible', tok_getStart(), tok_getStop());
          }

          // Legacy `async` call cases allow for many occurrences of `...` that regular arrows can not.
          ASSERT(tok_getType() !== $PUNC_EQ, 'if the arg had an assignment then the destruct would be CANT_DESTRUCT which would have thrown in the previous branch');
          ASSERT(tok_getType() !== $PUNC_COMMA, 'if the arg had a comma then the destruct would be CANT_DESTRUCT which would have thrown in the previous branch');
          ASSERT(tok_getType() === $PUNC_PAREN_CLOSE, 'if the next wasnt paren close then another part would throw by now');

          // Note: `...` in toplevel of group can only mean rest, meaning an arrow must follow the group
          // This must also be the last element of the arrow header (can not have trailing comma)
          // - `(...x);`
          // - `(...x) => x`
          // - `(...x,) => x`

          mustBeArrow = true;
          break;
        }
      }
      else {
        // arbitrary expression that is not destructible at the toplevel of a group
        destructible |= CANT_DESTRUCT;
        let exprAssignable = parseExpression(lexerFlags, astProp);
        // - `((a)) = b;`
        assignable = mergeAssignable(exprAssignable, assignable);
        if (tok_getType() === $PUNC_COMMA) {
          if (!toplevelComma) {
            toplevelComma = true;
            AST_wrapClosedIntoArrayCustom(rootAstProp, {
              type: 'SequenceExpression',
              loc: undefined,
              expressions: undefined,
            }, 'expressions');
            astProp = 'expressions';
          }
          assignable = __parseExpressions(lexerFlags, assignable, astProp);
        }
        if (toplevelComma) {
          if (babelCompat) AST_set('extra', {parenthesized: true, parenStart: $tp_paren_start});
          AST_close($tp_firstTokenAfterParen_start, $tp_firstTokenAfterParen_line, $tp_firstTokenAfterParen_column, 'SequenceExpression');
          assignable = setNotAssignable(assignable);
        }

        if (tok_getType() !== $PUNC_PAREN_CLOSE) {
          return THROW_RANGE('Expected the closing paren `)` for the group, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
        }

        ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);

        if ($tp_async_type === $ID_async) {
          // The next token can not start something that appears in an arrow head so must be an async call
          if (tok_getType() === $PUNC_EQ_GT) {
            // - `async("foo".bar) => x`
            //                     ^
            return THROW_RANGE('The header of this async arrow contained something that is not valid a param', tok_getStart(), tok_getStop());
          }
          // - `async("foo".bar);`
          //                    ^
          return parseAfterAsyncGroup(lexerFlagsBeforeParen, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, wasSimple, toplevelComma, newlineAfterAsync, false, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, assignable, rootAstProp);
        }

        if (babelCompat && !toplevelComma) {
          AST_babelParenthesizesClosed($tp_paren_start, astProp);
        }

        // - `((a)) = b;`
        return sansFlag(assignable, PIGGY_BACK_WAS_ARROW);
      }

      if (tok_getType() !== $PUNC_COMMA) break;

      // Note: since this can also be an arrow header, the next token may be a `)` as well as expr start
      ASSERT_skipToExpressionStartGrouped(',', lexerFlags);

      if (tok_getType() === $PUNC_PAREN_CLOSE) {
        // [x]: `(a,)`
        //          ^
        // [v]: `async (a,);`
        //                ^
        // [v]: `async (a,) => x`
        // [x]: `(a,b,)`
        // [x]: `(a = b,)`
        // [x]: `([x],)`
        // [x]: `({a},)`
        // [x]: `([x] = y,)`
        // [x]: `({a} = b,)`
        // [x]: `(a,) = x`
        // [x]: `(a,b,) = x`
        // [x]: `(a = b,) = x`
        // [x]: `([x],) = x`
        // [x]: `({a},) = x`
        // [x]: `([x] = y,) = x`
        // [x]: `({a} = b,) = x`
        // [v]: `(a,) => {}`
        // [v]: `(a,b,) => {}`
        // [v]: `(a = b,) => {}`
        // [v]: `([x],) => {}`
        // [v]: `({a},) => {}`
        // [v]: `([x] = y,) => {}`
        // [v]: `({a} = b,) => {}`
        // [v]: `async(x,)`
        // [v]: `async(x,) => x`

        if ($tp_async_type === $UNTYPED) {
          if (allowTrailingFunctionComma) {
            // [v]: `(a,) => a`
            // This may only be valid in ES8+ and as an arrow. Any other case fails here.
            mustBeArrow = true;
            // trailing function commas do not affect the AST (so don't wrap in sequence)
            break;
          }

          // [x]: `(a,);`
          // [x]: `(a,) = x;`
          return THROW_RANGE('Encountered trailing comma in the toplevel of a group, this could be valid in arrows but not with the currently targeted language version', tok_getStart(), tok_getStop());
        }

        // [v]: `async(x,)`
        // [v]: `async(x,) => x`
      }
      if (!toplevelComma) {
        toplevelComma = true;
        // only do this once
        AST_wrapClosedIntoArrayCustom(rootAstProp, {
          type: 'SequenceExpression',
          loc: undefined,
          expressions: undefined,
        }, 'expressions');
        astProp = 'expressions';
      }
    }

    if (toplevelComma) {
      assignable = setNotAssignable(assignable);
      if (babelCompat) AST_set('extra', {parenthesized: true, parenStart: $tp_paren_start});
      AST_close($tp_firstTokenAfterParen_start, $tp_firstTokenAfterParen_line, $tp_firstTokenAfterParen_column, 'SequenceExpression');
    }

    // pick up the flags from assignable and put them in destructible
    // - `function *f() { (yield x ** y) }`
    // - `async(await);`
    // - `async function f(){ async(await x); }`
    // - `{ (x = yield) = {}; }`

    destructible = copyPiggies(destructible, assignable);

    if (tok_getType() !== $PUNC_PAREN_CLOSE) {
      // (I think this check is redundant ...)
      return THROW_RANGE('Missing closing paren `)` for group, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);

    lexerFlags = lexerFlagsBeforeParen; // ASI can happen again
    verifyDestructible(destructible);

    let isArrow = tok_getType() === $PUNC_EQ_GT;

    // First deal with arrow-error cases. But don't parse as async just yet (this is to dedupe the error checks)
    if (isArrow) {
      // These are some errors for async and plain arrows

      destructible |= PIGGY_BACK_WAS_ARROW; // Probably redundant...?

      let $tp_arrow_start = tok_getStart();
      let $tp_arrow_stop = tok_getStop();

      if (leftHandSideExpression === ONLY_LHSE) {

        let $tp_errorOffset_start = $tp_async_type === $ID_async ? $tp_async_start : $tp_paren_start;

        return THROW_RANGE('Arrow not allowed in this position', $tp_errorOffset_start, $tp_arrow_stop);
      }

      if (tok_getNlwas() === true) {
        // we can safely throw here because there's no way that the `=>` token is valid without an arrow header
        return THROW_RANGE('Arrow is restricted production; cannot have newline before the arrow token', $tp_arrow_start, $tp_arrow_stop);
      }

      if (hasAllFlags(destructible, CANT_DESTRUCT)) {
        // - `([...{a = b} = c]) => d;`
        if ($tp_async_type === $ID_async) {
          return THROW_RANGE('The left hand side of the async arrow is not destructible so arrow is illegal', $tp_arrow_start, $tp_arrow_stop);
        }

        return THROW_RANGE('The left hand side of the arrow is not destructible so arrow is illegal', $tp_arrow_start, $tp_arrow_stop);
      }

      if (hasAllFlags(destructible, DESTRUCT_ASSIGN_ONLY)) {
        // - `([[].length]) => x;`
        return THROW_RANGE('The left hand side of the arrow can only be destructed through assignment so arrow is illegal', $tp_arrow_start, $tp_arrow_stop);
      }

      if (hasAnyFlag(destructible, PIGGY_BACK_SAW_AWAIT)) {
        // See tests/testcases/await/arrow_piggy/autogen.md

        // Without async modifier:
        // Await expressions are taken care of immediately by lexerFlags, all other cases are valid
        // [v]: `await => x`
        // [v]: `(await) => x`
        // [v]: `(...await) => x`
        // [v]: `(a = await) => x`
        // [x]: `(a = await b) => x`
        // [v]: `({await}) => x`
        // [v]: `({a = await}) => x`
        // [x]: `({a = await b}) => x`
        // [v]: `({a: b = await}) => x`
        // [x]: `({a: b = await c}) => x`
        // [v]: `([a = await]) => x`
        // [x]: `([a = await b]) => x`

        // No modifiers but living in async space (makes await expressions legal, exposes cases where we do need checks)
        // If async space, arrow, and await piggy --> error
        // [x]: `async () => await => x`
        // [x]: `async () => (await) => x`
        // [x]: `async () => (...await) => x`
        // [x]: `async () => (a = await) => x`
        // [x]: `async () => (a = await b) => x`
        // [x]: `async () => ({await}) => x`
        // [x]: `async () => ({a = await}) => x`
        // [x]: `async () => ({a = await b}) => x`
        // [x]: `async () => ({a: b = await}) => x`
        // [x]: `async () => ({a: b = await c}) => x`
        // [x]: `async () => ([a = await]) => x`
        // [x]: `async () => ([a = await b]) => x`

        // Same cases and now with `async` modifier
        // If arrow and keyword --> error
        // [x]: `async await => x`
        // [x]: `async (await) => x`
        // [x]: `async (...await) => x`
        // [x]: `async (a = await) => x`
        // [x]: `async (a = await b) => x`
        // [x]: `async ({await}) => x`
        // [x]: `async ({a = await}) => x`
        // [x]: `async ({a = await b}) => x`
        // [x]: `async ({a: b = await}) => x`
        // [x]: `async ({a: b = await c}) => x`
        // [x]: `async ([a = await]) => x`
        // [x]: `async ([a = await b]) => x`

        // The next two sets are the async-call variants. We don't have to check the piggy for them because
        // they don't trigger the param checks, of course. So we these cases get picked by regular checks. Yay.

        // The legacy async call variants
        // [v]: `async (await)`
        // [v]: `async (...await)`
        // [v]: `async (a = await)`
        // [x]: `async (a = await b)`
        // [v]: `async ({await})`
        // [v]: `async ({a = await})`
        // [x]: `async ({a = await b})`
        // [v]: `async ({a: b = await})`
        // [x]: `async ({a: b = await c})`
        // [v]: `async ([a = await])`
        // [x]: `async ([a = await b])`

        // Legacy calls wrapped in an async function
        // [x]: `async x => async (await)`
        // [x]: `async x => async (...await)`
        // [x]: `async x => async (a = await)`
        // [v]: `async x => async (a = await b)`
        // [x]: `async x => async ({await})`
        // [v]: `async x => async ({a = await})`
        // [v]: `async x => async ({a = await c})`
        // [x]: `async x => async ({a: b = await})`
        // [x]: `async x => async ({a: b = await c})`
        // [v]: `async x => async ([a = await])`
        // [v]: `async x => async ([a = await b])`

        if ($tp_async_type === $ID_async) {
          return THROW_RANGE('The parameter header of an async arrow cannot contain `await` as varname nor as a keyword', $tp_async_start, $tp_async_stop);
        }

        if (hasAnyFlag(lexerFlags, LF_IN_ASYNC)) {
          return THROW_RANGE('The parameter header of an arrow inside an async function cannot contain `await` as varname nor as a keyword', tok_getStart(), tok_getStop());
        }
      }

      if (hasAllFlags(destructible, PIGGY_BACK_SAW_YIELD)) {
        // See tests/testcases/yield/arrow_piggy/autogen.md

        // Note that, unlike `await`, arrows inherit the `yield` state in the grammar. So it's the parent function
        // that decides whether `yield` is okay or not.
        // Additionally, the `yield` argument is optional. So no args don't necessarily in/validate it.
        // And, `yield` is always a keyword in strict mode (where `await` is only always a keyword in module goal), but
        // that distinction does not help us much since it would still validate both with and without args.

        // Without any generator context (in sloppy):
        // Yield with arg cases are taken care of immediately by lexerFlags, all other cases are valid
        // [v]: `yield => x`
        // [v]: `(yield) => x`
        // [v]: `(...yield) => x`
        // [v]: `(a = yield) => x`
        // [x]: `(a = yield b) => x`
        // [v]: `({yield}) => x`
        // [v]: `({a = yield}) => x`
        // [x]: `({a = yield b}) => x`
        // [v]: `({a: b = yield}) => x`
        // [x]: `({a: b = yield c}) => x`
        // [v]: `([a = yield]) => x`
        // [x]: `([a = yield b]) => x`

        // In generator space (makes yield expressions legal, but all arrow cases are now illegal)
        // [x]: `function *g() {  yield => x  }`
        // [x]: `function *g() {  (yield) => x  }`
        // [x]: `function *g() {  (...yield) => x  }`
        // [x]: `function *g() {  (a = yield) => x  }`
        // [x]: `function *g() {  (a = yield b) => x  }`
        // [x]: `function *g() {  ({yield}) => x  }`
        // [x]: `function *g() {  ({a = yield}) => x  }`
        // [x]: `function *g() {  ({a = yield b}) => x  }`
        // [x]: `function *g() {  ({a: b = yield}) => x  }`
        // [x]: `function *g() {  ({a: b = yield c}) => x  }`
        // [x]: `function *g() {  ([a = yield]) => x  }`
        // [x]: `function *g() {  ([a = yield b]) => x  }`

        // The next two sets are the async-call variants. We don't have to check the piggy for them because
        // they don't trigger the param checks, of course. So we these cases get picked by regular checks. Yay.

        // The legacy async call variants (in sloppy), which should not trigger param destructuring checks
        // [v]: `async (yield)`
        // [v]: `async (...yield)`
        // [v]: `async (a = yield)`
        // [x]: `async (a = yield b)`
        // [v]: `async ({yield})`
        // [v]: `async ({a = yield})`
        // [x]: `async ({a = yield b})`
        // [v]: `async ({a: b = yield})`
        // [x]: `async ({a: b = yield c})`
        // [v]: `async ([a = yield])`
        // [x]: `async ([a = yield b])`

        // Legacy calls wrapped in an generator function.
        // [x]: `function *g() {  async (yield)  }`
        // [x]: `function *g() {  async (...yield)  }`
        // [x]: `function *g() {  async (a = yield)  }`
        // [v]: `function *g() {  async (a = yield b)  }`
        // [x]: `function *g() {  async ({yield})  }`
        // [v]: `function *g() {  async ({a = yield})  }`
        // [v]: `function *g() {  async ({a = yield b})  }`
        // [x]: `function *g() {  async ({a: b = yield})  }`
        // [x]: `function *g() {  async ({a: b = yield c})  }`
        // [v]: `function *g() {  async ([a = yield])  }`
        // [v]: `function *g() {  async ([a = yield b])  }`

        return THROW_RANGE('The arguments of an arrow cannot contain a yield expression in their defaults', $tp_arrow_start, $tp_arrow_stop);
      }

      // The param name/default containing await/yield checks are done elsewhere...
      ASSERT(!(hasAllFlags(destructible, PIGGY_BACK_SAW_AWAIT) && (hasAllFlags(lexerFlags, LF_IN_ASYNC) || goalMode === GOAL_MODULE)), 'async arrows dont reach this place and nested in an async arrow triggers somewhere else so I dont think this case can occur');
      ASSERT(!(hasAllFlags(destructible, PIGGY_BACK_SAW_YIELD) && hasAnyFlag(lexerFlags, LF_IN_GENERATOR | LF_STRICT_MODE)), 'these checks occur elsewhere and I cant come up with a covering test case');
    } else if (hasAllFlags(destructible, MUST_DESTRUCT) || mustBeArrow) {
      // [x]: `(...x);`
      // [x]: `(a,)`
      // [x]: `(a,b,)`
      // [x]: `(a = b,)`
      // [x]: `({a = b})`
      return THROW_RANGE('Group contained a value that must destruct but this was not an arrow so it is invalid', $tp_paren_start, tok_getStop());
    }

    if ($tp_async_type === $ID_async) {
      ASSERT(!isArrow || hasNoFlag(destructible, CANT_DESTRUCT | DESTRUCT_ASSIGN_ONLY | PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'Note: if arrow, the CANT_DESTRUCT and DESTRUCT_ASSIGN_ONLY will have thrown by now so destructible cannot contain those');
      // `async(a);`
      // `async(a = await x);`
      // `async(a) => x`
      // `async(a = await x) => x`
      // `async({x}) => x`
      destructible = copyPiggies(destructible, assignable);
      return parseAfterAsyncGroup(lexerFlags, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, wasSimple, toplevelComma, newlineAfterAsync, false, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, assignable, rootAstProp);
    }

    if (isArrow) {
      // arrow function
      // `(a) => {}`

      ASSERT($tp_async_type === $UNTYPED, 'checked above');
      parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, $UNTYPED, $tp_paren_start, $tp_paren_line, $tp_paren_column, allowAssignmentForGroupToBeArrow, rootAstProp);
      // we just parsed an arrow. Whatever the state of await/yield was we can ignore that here.
      // Assignability resets after the arrow but an outer `async` could affect the inner arrow:
      // [v]: `(await) => {}`
      // [v]: `(x = (await) => {}) => {}`
      // [x]: `async (await) => {}`
      // [x]: `async (x = (await) => {}) => {}`     // <-- this case requires propagation of await piggies to parent
      assignable = copyPiggies(assignable, destructible);
      // TODO: why not copy all piggies here?
      return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW | (assignable & PIGGY_BACK_SAW_AWAIT);
    }

    if (babelCompat && !toplevelComma) {
      AST_babelParenthesizesClosed($tp_paren_start, astProp);
    }

    // The remaining cases should be handled by caller
    // Note: the assignment is not parsed here.
    // - `(x) = (y) = z`
    // - `(x) = (1) = z`   // bad
    // - `(x) = (y) += z`
    // - `(x) = (1) += z`  // bad
    // - `(x) += (y) = z`  // bad
    // - `(x) += (1) = z`  // bad
    // - `(foo.x)`
    // - `(foo[x])`
    // - `(foo) += 3`
    // - `async (x = (x) = await f) => {}`
    // - `async (x = (x) += await f) => {}`
    // - `({a:(b) = c} = 1)`
    // - `(x = delete ((await) = f)) => {}`
    // - `(x = delete ((yield) = f)) => {}`
    // - `async (x = (await) = f) => {}`

    // a group. those still exist?
    // - `((a)) = b;`

    return sansFlag(assignable, PIGGY_BACK_WAS_ARROW);
  }
  function parseAfterPatternInGroup(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, destructible, astProp) {
    ASSERT(parseAfterPatternInGroup.length === arguments.length, 'arg count');
    ASSERT(tok_getType() !== $PUNC_EQ, 'destruct assignments should be parsed at this point');

    if (tok_getType() !== $PUNC_COMMA && tok_getType() !== $PUNC_PAREN_CLOSE) {
      // This is top level group so member expressions can not be destructured, however `(x.y)=z` should be valid
      // - ({}.x)
      //      ^
      // [v]: `[({a: 1}.c)] = [];`
      // [x]: `async ({x} = await bar);`
      // [x]: `async ({} + 1) => x;`
      // [v]: `({}.length);`
      // [x]: `({x: y}.length) => x;`
      // [x]: `({x = y}.z) => obj`
      // [x]: `({a: {x = y}}.z) => obj`
      // - `([x]++)`
      // - `([x].foo)`                    pass
      // - `([x].foo) = x`                pass
      // - `([x].foo) => x`               fail

      if (hasAllFlags(destructible, MUST_DESTRUCT)) {
        // if the object had to be a pattern then it can not have a tail because patterns aren't values.
        // - ({a=b}.x) => x
        //         ^
        // - ({a=b}[x]) => x
        // - ({a=b}(x)) => x
        // - ([{a=b}].x) => x
        //          ^
        // - ([{a=b}][x]) => x
        // - ([{a=b}](x)) => x

        // - Note: this cannot be `(PATTERN = x)` because there's an assertion above saying so. This must be an error.
        return THROW_RANGE('Pattern can not have a tail but did not find a comma or closing paren of the arrow header', tok_getStart(), tok_getStop());
      }

      // - ({}.x)
      //      ^
      // - ([].x)
      //      ^
      let exprAssignable = parseValueTail(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_line, $tp_startOfPattern_column, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, astProp);
      assignable = mergeAssignable(exprAssignable, assignable);

      // If still not end of element of the group then parse a binary expression of some sort
      if (tok_getType() !== $PUNC_COMMA && tok_getType() !== $PUNC_PAREN_CLOSE) {
        // [v]: `({} + 1);`
        //           ^
        // [x]: `({x} = await bar) => {}`
        //            ^
        // [x]: `async ({x} = await bar) => {}`
        //                  ^
        // [x]: `let z = async ({x} = await bar) => {}`
        // [x]: `async ({x} = await bar);`
        // [v]: `async ({} + 1);`
        // [x]: `async ({} + 1) => x;`
        // [v]: `([] + 1);`
        //           ^
        // [x]: `([x] = await bar) => {}`
        //            ^
        // [x]: `async ([x] = await bar) => {}`
        //                  ^
        // [x]: `let z = async ([x] = await bar) => {}`
        // [x]: `async ([x] = await bar);`
        // [v]: `async ([] + 1);`
        // [x]: `async ([] + 1) => x;`
        assignable = parseExpressionFromOp(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, astProp);
      }
    } else {
      // Never assignable since destructuring assignments have to assign directly to the object `{x}=y` / array `[x]=y`
      // and we asserted to have parsed an assignment if there was any. Note: might still be destructible.
      // - `({x})`
      // - `({x}) => x`
      // - `([x])`
      // - `([x]) => x`
      assignable = setNotAssignable(assignable);
    }

    return assignable;
  }

  function parseAfterAsyncGroup(lexerFlags, paramScoop, fromStmtOrExpr, allowAssignment, wasSimple, toplevelComma, newlineAfterAsync, zeroArgs, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, assignable, astProp) {
    ASSERT(parseAfterAsyncGroup.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // this is called after parsing a group that followed an `async` when it might be an async arrow
    if (tok_getType() === $PUNC_EQ_GT) {

      let $tp_arrow_start = tok_getStart();
      let $tp_arrow_stop = tok_getStop();

      if (tok_getNlwas() === true) {
        return THROW_RANGE('The arrow is a restricted production an there can not be a newline before `=>` token', $tp_arrow_start, $tp_arrow_stop);
      }

      if (newlineAfterAsync === IS_ASYNC_PREFIXED) {
        // - `async \n () => x`
        //                ^
        // - `async \n (x) => x`
        //                 ^
        ASSERT(allowAsyncFunctions, 'this check was applied elsewhere when the newline was found after `async`');
        // see parseAsync for details on this error
        return THROW_RANGE('A newline after async is always a syntax error if the rhs turns to be an arrow function', $tp_arrow_start, $tp_arrow_stop);
      }

      if (zeroArgs) {
        // - `async () => foo`
        //             ^
        parseArrowAfterAsyncNoArgGroup(lexerFlags, paramScoop, $tp_async_start, $tp_async_line, $tp_async_column, allowAssignment, astProp);
      }
      else {
        // If this had an await or yield violation then the call sites should have taken care of it already
        ASSERT(hasNoFlag(assignable, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'these are checked and will throw in the main group parser if it was an arrow, before calling here');
        ASSERT(!(hasAnyFlag(lexerFlags, LF_IN_GENERATOR | LF_STRICT_MODE) && hasAnyFlag(assignable, PIGGY_BACK_SAW_YIELD)), 'Call sites should have thrown for yield in arrow args in invalid context');
        ASSERT(!hasAnyFlag(assignable, PIGGY_BACK_SAW_YIELD), 'caller should have dealt with `yield` in arrow args');

        // - `async (foo) => foo`
        //                ^
        parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, $ID_async, $tp_async_start, $tp_async_line, $tp_async_column, allowAssignment, astProp);
      }
    }
    else { // curtok != arrow

      if (zeroArgs) {
        // - `async ();`
        //            ^
        // - `async \n ();`
        //               ^

        AST_setNode(astProp, {
          type: 'CallExpression',
          loc: AST_getClosedLoc($tp_async_start, $tp_async_line, $tp_async_column),
          callee: AST_getIdentNode($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon),
          arguments: [],
        });
      }
      else {
        // - `async (a, b, c);`
        //                   ^
        // - `async \n (a, b, c);`
        //                      ^

        AST_patchAsyncCall($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, astProp);
      }

      let assignable = parseValueTail(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, astProp);
      if (fromStmtOrExpr === IS_STATEMENT) {
        // in expressions operator precedence is handled elsewhere. in statements this is the start,
        assignable = parseExpressionFromOp(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, assignable, astProp);
        if (tok_getType() === $PUNC_COMMA) {
          assignable = _parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, assignable, astProp);
        }
        parseSemiOrAsi(lexerFlags);
      }

      return assignable;
    }

    // we just parsed an arrow, nothing else.

    if (fromStmtOrExpr === IS_STATEMENT) {
      // if this is an async arrow at the statement start then we should allow to parse a sequence here
      if (tok_getType() === $PUNC_COMMA) {
        // Note: since we're parsing expressions inside on the statement level we don't care about the assignable flags
        _parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, NOT_ASSIGNABLE, astProp);
      }
      parseSemiOrAsi(lexerFlags);
    }

    // an async prefixed group is never assignable:
    // - `async(x)`
    // - `async(x) = y`
    // - `async(x) => y`
    // - `async()`
    // - `async() = y`
    // - `async() => y`
    // - `async \n (x)`        -> `async(x)`
    // - `async \n (x) = y`    -> `async(x) = y`
    // - `async \n (x) => y`   -> `async; (x) => y`
    // - `async (a = (...await) => {}) => {};`      // <-- the await flags need to be propagated for this case
    // - `async (a = (...await) => {});`
    return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW | (assignable & PIGGY_BACK_SAW_AWAIT);
  }
  function parseArrowAfterAsyncNoArgGroup(lexerFlags, paramScoop, $tp_async_start, $tp_async_line, $tp_async_column, allowAssignment, astProp) {
    ASSERT(parseArrowAfterAsyncNoArgGroup.length === arguments.length, 'arg count');

    // The ast should look something like this now:
    // {
    //   type: 'ExpressionStatement',
    //     expression: {type: 'ArrayExpression', elements: []},
    // },
    // The `async` has not yet been consumed and we don't really need to do anything to fix it. Just parse an arrow
    // that has no arguments and move on.

    // - `async () => foo`
    //             ^

    if (babelCompat) {
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: [],
        id: null,
        generator: false,
        async: true,
        body: undefined,
      });
    } else if (acornCompat && !allowAsyncFunctions) {
      // Do not add `async` property
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: [],
        id: null,
        generator: false,
        expression: undefined, // TODO: init to bool
        body: undefined,
      });
    } else {
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: [],
        id: null,
        generator: false,
        async: true,
        expression: undefined, // TODO: init to bool
        body: undefined,
      });
    }

    let assignable = parseArrowFromPunc(lexerFlags, paramScoop, $ID_async, allowAssignment, PARAMS_ALL_SIMPLE);
    AST_close($tp_async_start, $tp_async_line, $tp_async_column, 'ArrowFunctionExpression');
    return assignable;
  }

  function parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, $tp_async_type, $tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column, allowAssignment, astProp) {
    ASSERT(parseArrowAfterGroup.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isasync enum');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    if (babelCompat) {
      AST_wrapClosedIntoArrayCustom(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: undefined,
        id: null,
        generator: false,
        async: $tp_async_type === $ID_async,
        body: undefined,
      }, 'params');
    } else if (acornCompat && !allowAsyncFunctions) {
      // Do not add `async` property
      AST_wrapClosedIntoArrayCustom(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: undefined,
        id: null,
        generator: false,
        expression: undefined, // TODO: init to bool
        body: undefined,
      }, 'params');
    } else {
      AST_wrapClosedIntoArrayCustom(astProp, {
        type: 'ArrowFunctionExpression',
        loc: undefined,
        params: undefined,
        id: null,
        generator: false,
        async: $tp_async_type === $ID_async,
        expression: undefined, // TODO: init to bool
        body: undefined,
      }, 'params');
    }
    // <SCRUB AST>
    let top = _path[_path.length - 1];
    if (toplevelComma) {
      ASSERT(top.params instanceof Array, 'these params should be an array');
      let params = top.params[top.params.length - 1];
      ASSERT(params.type === 'SequenceExpression', 'if toplevelComma then this is a sequence', astProp, params);
      ASSERT(params.expressions instanceof Array, 'if toplevelComma then node is a sequence and .expressions should be an array');
      top.params = params.expressions;
    }
    ASSERT(Array.isArray(top.params), 'params should now be an array in any case');
    let params = top.params;
    for (let i=0; i<params.length; ++i) {
      AST__destruct(params[i], params, i);
    }
    // </SCRUB AST>

    parseArrowFromPunc(lexerFlags, paramScoop, $tp_async_type, allowAssignment, wasSimple);

    AST_close($tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column, 'ArrowFunctionExpression');
  }

  function parseArrayOuter(lexerFlagsBeforeParen, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
    ASSERT(parseArrayOuter.length === arguments.length, 'arg count');
    ASSERT_BINDING_TYPE(bindingType);

    // This function serves to throw in case the array was found to must be a Pattern but used as a value anyways
    // For example: `[{a = b} = x]` vs `[{a = b}.c]`

    let destructible = parseArrayLiteralPattern(lexerFlagsBeforeParen, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp);
    return destructible;
  }
  function parseArrayLiteralPattern(lexerFlagsBeforeParen, scoop, bindingType, skipInit, exportedNames, exportedBindings, _astProp) {
    // token offsetS:
    // - ( [
    // - ( <x> , [
    ASSERT(parseArrayLiteralPattern.length === arguments.length, 'arg count');
    ASSERT(skipInit === SKIP_INIT || skipInit === PARSE_INIT, 'skipInit is enum', skipInit);
    ASSERT(tok_getType() === $PUNC_BRACKET_OPEN, 'not yet consumed');
    ASSERT_BINDING_TYPE(bindingType);

    // const [a] = b;
    // const ([a] = b) = c;
    // function ([a]){};
    // function ([a] = b){};
    // ([a]) => b;
    // ([a] = b) => c;
    // [a] = b;
    // For non-bindings a member expression is _also_ valid:
    // [a.b] = c;
    // ([a.b] = c) = d;
    // [a.b=[c.d]=e] = f;
    // ([a=[b.c]=d]) => e;
    // nested:
    // [{x: y.z}]
    // [{x: y.z}] = a
    // ([{x: y.z}]) => b
    // ([{x: y.z}] = a) => b
    // ([{x: y.z} = a]) => b

    // either the bracket starts an array destructuring or literal. they have a similar-but-not-the-same structure
    // - ([]
    // - ([ident,]
    // - ([ident = expr]
    // - ([<array destruct> = expr,]
    // - ([<object destruct> = expr,]
    // - ([...<ident, arr>]
    // - in all above cases destructible
    // - in all other cases this is a regular array and not destructible

    // we can parse `in` inside an array literal/destruct
    let lexerFlags = sansFlag(lexerFlagsBeforeParen, LF_IN_FOR_LHS);

    let $tp_arrayOpen_line = tok_getLine();
    let $tp_arrayOpen_column = tok_getColumn();
    let $tp_arrayOpen_start = tok_getStart();

    ASSERT_skipToExpressionStartSquareCloseComma($PUNC_BRACKET_OPEN, lexerFlags);
    AST_open(_astProp, {
      type: 'ArrayExpression',
      loc: undefined,
      elements: [],
    });

    let astProp = 'elements';

    let destructible = MIGHT_DESTRUCT;

    // skip leading commas
    while (tok_getType() === $PUNC_COMMA) {
      ASSERT_skipToExpressionStartSquareCloseComma(',', lexerFlags);
      AST_add(astProp, null);
    }

    let spreadStage = NO_SPREAD;
    let assignableYieldAwaitState = ASSIGNABLE_UNDETERMINED; // this is ONLY used to track await/yield state flags so we can propagate them back up

    while (tok_getType() !== $PUNC_BRACKET_CLOSE) {

      let $tp_elementStart_line = tok_getLine();
      let $tp_elementStart_column = tok_getColumn();
      let $tp_elementStart_start = tok_getStart();
      let $tp_elementStart_stop = tok_getStop();

      if (isIdentToken(tok_getType())) {
        // - `[x]`
        //     ^
        // - `[x, y]`
        // - `[x = y]`
        // - `[x.y]`
        // - `[x.y = z]`
        // - `[x + y]`
        // - `[this]`
        // - `[this=x]`
        // - `[this]=x`

        // binding check wise;
        // - if assignable/compoundable then the ident must do a binding check
        // - in all other cases the binding must be a valid value ident (including true, false, typeof, etc)
        //   - some valid idents can not be assigned (`true`, `typeof`, etc) and are not destructible, not assignable
        // first scan next token to see what potential checks we need to apply (wrt the above comments)

        let $tp_ident_type = tok_getType();
        let $tp_ident_line = tok_getLine();
        let $tp_ident_column = tok_getColumn();
        let $tp_ident_start = tok_getStart();
        let $tp_ident_stop = tok_getStop();
        let $tp_ident_canon = tok_getCanoN();

        skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // Always skips _one_ token. Properly deals with div/rex

        let nextIsAssignment = tok_getType() === $PUNC_EQ;
        let nextIsCommaOrEnd = tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_BRACKET_CLOSE;

        // ASSIGN_EXPR_IS_OK because this might just be an array element, where something like an arrow is legit
        // [v]: `[async ()=>x]`      // requires ASSIGN_EXPR_IS_OK
        let leftAssignable = parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, NOT_NEW_ARG, ASSIGN_EXPR_IS_OK, NOT_LHSE, astProp);
        assignableYieldAwaitState |= leftAssignable;

        if (nextIsAssignment) {
          // - `[x = y]`
          //       ^
          // - `[x = y, z]`
          // - `[true = x]`
          // - `[await = x]`
          // - `[x = true]`        // still destructible, the lhs should inherit the rhs CANT_DESTRUCT state

          if (notAssignable(leftAssignable)) {
            // [x]: `[true = x] = x`
            // [x]: `[true = x]`
            return THROW_RANGE('Cannot assign or destruct to keyword `' + tok_sliceInput($tp_ident_start, $tp_ident_stop) + '`', $tp_ident_start, $tp_ident_stop);
          }

          // [v]: `let [x = a, y = b] = o`
          // [x]: `let [x = y, x = z] = a`
          // [x]: `for (const [x = 1, x = 2] in {}) {}`

          // If this isn't a binding, this is a noop
          // If this is inside a group, this is a noop if it turns out not to be an arrow
          // TODO: add test case for catch shadow
          SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
          // If this is not an export declaration, the calls below will be noops
          addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
          addBindingToExports(exportedBindings, $tp_ident_canon);

          // We should have just added an Identifier to the AST, so wrap that as left now
          AST_wrapClosedCustom(astProp, {
            type: 'AssignmentExpression',
            loc: undefined,
            left: undefined,
            operator: '=',
            right: undefined,
          }, 'left');
          ASSERT_skipToExpressionStart('=', lexerFlags);
          // The rhs of the assignment is irrelevant beyond yield/await flags
          let rightAssignable = parseExpression(lexerFlags, 'right');
          AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column, 'AssignmentExpression');

          assignableYieldAwaitState |= rightAssignable;
        }
        else if (nextIsCommaOrEnd) {
          // - [x]
          //     ^
          // - [x, z]
          //     ^
          // - [this]      note: must have ThisExpression in ast

          if (notAssignable(leftAssignable)) {
            destructible |= CANT_DESTRUCT;
          }
          else {
            // [x]: `for (const [x, x] in {}) {}`
            // [v]: `[x] = obj`

            // If this isn't a binding, this is a noop
            // If this is inside a group, this is a noop if it turns out not to be an arrow
            // TODO: add test case for catch shadow
            SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
            // If this is not an export declaration, the calls below will be noops
            addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
            addBindingToExports(exportedBindings, $tp_ident_canon);
          }
        }
        else {
          // if this is any kind of binding then it is now not destructible
          // if this is not a binding then it depends on whether the tail ends with a member expression
          // `let [(x)] = x`         - yes (noop-group edge case) TODO: does this case reach here??
          //         ^      (TODO: If it reaches this branch then the pointer is probably here)
          // `let [x()] = x`         - no
          //        ^
          // `let [x().foo] = x`     - no
          // `let [(x().foo)] = x`   - no (noop-group edge case)
          // `[x()] = x`             - no
          //    ^
          // `[x().foo] = x`         - yes
          // `[x().foo = x] = x`     - yes
          // `([x()]) => x`          - no
          // `([x().foo]) => x`      - no

          if (bindingType === BINDING_TYPE_ARG) {
            // [v]: `([x[y]] = z)`
            // [x]: `([x[y]] = z) => {}`
            // [x]: `function f([x[y]] = z) {}`
            destructible |= DESTRUCT_ASSIGN_ONLY;
          } else if (bindingType !== BINDING_TYPE_NONE) {
            destructible |= CANT_DESTRUCT;
          }

          // This value is not destructible on its own as there is no ident+more value body that is destructible
          // The optional tail may change this if it is a member expression
          let nowDestruct = parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, leftAssignable, CANT_DESTRUCT, $PUNC_BRACKET_CLOSE, astProp);
          // We can ignore assignability here because the await/yield flags from the last call will be inside the destruct
          destructible |= nowDestruct;
        }
      }
      else if (tok_getType() === $PUNC_CURLY_OPEN) {
        // - [{}]
        //    ^
        // - [{..}]
        // - [{..}, x]
        // - [{..}.x]
        // - [{..}=x]
        // - [{}.foo] = x
        // - [{}[foo]] = x
        // - [{a}] = x
        // - [{a:b}] = x
        // - [{a:1}.foo] = x
        // - `[{}.foo] = x`

        let $tp_objOpen_line = tok_getLine();
        let $tp_objOpen_column = tok_getColumn();
        let $tp_objOpen_start = tok_getStart();
        let $tp_objOpen_stop = tok_getStop();

        let objDestructible = parseObjectAndAssign(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, astProp);
        destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_objOpen_start, $tp_objOpen_stop, $tp_objOpen_line, $tp_objOpen_column, hasAllFlags(objDestructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE, objDestructible, $PUNC_BRACKET_CLOSE, astProp);
      }
      else if (tok_getType() === $PUNC_BRACKET_OPEN) {
        // - [[]]
        //    ^
        // - [[..]]
        // - [[..], x]
        // - [[..].x]
        // - [[..]=x]
        // - [[..].foo] = x
        // - [[..][foo]] = x
        // - `[[foo].food()] = x`               -- error
        // - `[[foo].length] = x`               -- ok
        // - `[[foo].food() = x] = x`           -- error
        // - `[[foo].length = x] = x`           -- ok
        // note: grouped object/array literals are never assignable

        let $tp_arrOpen_line = tok_getLine();
        let $tp_arrOpen_column = tok_getColumn();
        let $tp_arrOpen_start = tok_getStart();
        let $tp_arrOpen_stop = tok_getStop();

        let arrDestructible = parseArrayLiteralPattern(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, astProp);
        destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_arrOpen_start, $tp_arrOpen_stop, $tp_arrOpen_line, $tp_arrOpen_column, hasAllFlags(arrDestructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE, arrDestructible, $PUNC_BRACKET_CLOSE, astProp);
      }
      else if (tok_getType() === $PUNC_DOT_DOT_DOT) {
        // TODO: > It is a Syntax Error if DestructuringAssignmentTarget is an ArrayLiteral or an ObjectLiteral.
        // TODO:   https://tc39.github.io/ecma262/#sec-destructuring-assignment-static-semantics-early-errors
        // TODO:   (I think this means `[...[x]] = x` is illegal)

        // rest/spread.
        // if it isn't the last in the array then the array is not destructible
        // if binding, if spread arg is not array/object/ident then it is not destructible
        // if not binding, it is also destructible if arg is member expression
        // - `([...x]);`                  (this is valid)
        //      ^
        // - `([...x=y]);`                (spread wraps the assignment (!))
        // - `([...x+=y]);`               (spread wraps the assignment (!))
        // - `([...x+y]);`                (spread wraps any expression)
        // - `([...x, y]);`               (spread does not need to be last)
        // - `([...x, ...y]);`            (spread can appear more than once)
        // - `([...x]) => x`
        // - `([x, ...y]) => x`
        // - `([...x.y] = z)`             (ok)
        // - `([...x.y]) => z`            (bad)
        // - `([...x.y] = z) => z`        (bad)
        // - `(z = [...x.y]) => z`        (ok)
        // - `(z = [...x.y] = z) => z`    (ok)
        // - `[...(x), y]`                (ok)
        // - `[...(x), y] = z`            (bad)

        let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_BRACKET_CLOSE, bindingType, $UNTYPED, exportedNames, exportedBindings, astProp);
        destructible |= subDestruct;

        ASSERT(tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_BRACKET_CLOSE, 'this is confirme din parseArrowableSpreadOrRest so we dont have to check it here');
        ASSERT(tok_getType() !== $PUNC_COMMA || hasAllFlags(subDestruct, CANT_DESTRUCT), 'if comma then cannot destruct, should be dealt with in spread-parsing function');

        // if there are any other elements after this then this cannot be a destructible since that demands rest as last
        if (spreadStage === NO_SPREAD) spreadStage = LAST_SPREAD;
      }
      else {
        // only destructible as assignment destructuring if "simple assignment"
        // - `[5[foo]] = x`
        //     ^
        // - `["x".foo] = x`
        // - `[`x`.foo] = x`
        // - `[(a)] = x`           // simple assignment wrapped in parens is still simple, good for assignment destructuring
        // - `[(a) = x] = x`       // still fine
        // - `[(a = x)] = x`       // an assignment is not a simple assignment so this is bad
        // - `[(x).foo = x] = x`   // yes
        // - `[(x().foo)] = x`     // yes (noop-group edge case)
        // - `([(x)]) => x`        // no (noop-group edge case)
        // - `([(x().foo)]) => x`  // no (noop-group edge case)

        // We have a problem;
        // Destructuring assignments allow any "simple assignment targets" as valid patterns
        // However, in this parser an assignable is anything that is a simple assignment OR an assignment operator
        // but: https://tc39.github.io/ecma262/#sec-assignment-operators-static-semantics-assignmenttargettype
        // This seems to be the only case where this distinction is relevant.

        // This is tricky. We need to know whether this is destructible assignable. The edge case is grouping.
        // However, in our system we only return whether or not the expression is assignable, not whether it is
        // a "simple assignment target", which is what we explicitly need here. So to get this information we
        // parse the first part of the expression, which tells us the simple assignment target (at least until new
        // syntax is introduced that violates this invariant). If that's assignment then it is a simple assignment. If
        // there is anything more to parse for the expression then the expression is not a simple assignment target.
        // Unfortunately this means a lot of manual parsing, but so be it. And we can probably abstract it.

        let $tp_exprStart_line = tok_getLine();
        let $tp_exprStart_column = tok_getColumn();
        let $tp_exprStart_start = tok_getStart();
        let $tp_exprStart_stop = tok_getStop();

        let wasParen = tok_getType() === $PUNC_PAREN_OPEN;
        let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);

        if (tok_getType() === $PUNC_EQ) {
          if (isAssignable(assignable)) {
            // [v]: `[x()[y] = a ] = z`
            //               ^
            // [v]: `[x().y = a] = z`
            //              ^
            // [v]: `[(x).foo = x] = x`
            //                ^
            // [v]: `([(x).foo = x] = x)`
            //                 ^
            AST_wrapClosedCustom(astProp, {
              type: 'AssignmentExpression',
              loc: undefined,
              left: undefined,
              operator: '=',
              right: undefined,
            }, 'left');
            ASSERT_skipToExpressionStart('=', lexerFlags);
            // pick up the flags from assignable and put them in destructible
            // - `= await bar`
            // - `= yield`
            destructible |= parseExpression(lexerFlags, 'right'); // save the piggies!
            AST_close($tp_elementStart_start, $tp_elementStart_line, $tp_elementStart_column, 'AssignmentExpression');
          } else {
            // - `[2=x]`
            //      ^
            return THROW_RANGE('Cannot assign to lhs (starting with `' + tok_sliceInput($tp_elementStart_start, $tp_elementStart_stop) + '`)', $tp_elementStart_start, $tp_elementStart_stop);
          }
        }

        // This will stop after the tail of the expression. If there was an operator, it will now be
        // the current token. And in that case the expression is NOT destructible in any way. Otherwise it could
        // be an destructuring assignment if it was assignable in the first place.
        if (tok_getType() !== $PUNC_COMMA && tok_getType() !== $PUNC_BRACKET_CLOSE) {
          assignable = parseExpressionFromOp(lexerFlags, $tp_exprStart_start, $tp_exprStart_stop, $tp_exprStart_line, $tp_exprStart_column, assignable, astProp);
          assignable = setNotAssignable(assignable);
          destructible |= CANT_DESTRUCT;
        }
        else if (wasParen && isAssignable(assignable) && (bindingType === BINDING_TYPE_NONE || bindingType === BINDING_TYPE_ARG)) {
          // - `[(x)] = obj`
          destructible |=  DESTRUCT_ASSIGN_ONLY;
        }
        else if (wasParen || notAssignable(assignable)) {
          // - `let [(x)] = obj`
          //            ^
          // - `[x()] = obj`
          //        ^
          // - `[(x())] = obj`
          //          ^
          destructible |= CANT_DESTRUCT;
        }
        else {
          // [v]: `[5..length] = x`
          // [v]: `["X".length] = x`
          // [v]: `[`x`.length] = x`
          // [v]: `[`a${5}b`.length] = x`
          // [v]: `[/foo/.length] = x`
          // [v]: `[/x/g.length] = x`
          // [v]: `[50..foo] = x`
          // [v]: `["foo".foo] = x`
        }
      }

      if (tok_getType() !== $PUNC_COMMA) break; // end of the array
      // skip one because a trailing comma does not add a `null` to the ast

      ASSERT_skipToExpressionStartSquareCloseComma(',', lexerFlags);
      while (tok_getType() === $PUNC_COMMA) {
        ASSERT_skipToExpressionStartSquareCloseComma(',', lexerFlags);
        AST_add(astProp, null);
      }

      if (spreadStage === LAST_SPREAD) {
        spreadStage = MID_SPREAD;
        // cannot destruct if spread appeared as non-last element
        destructible |= CANT_DESTRUCT;
      }
    }
    lexerFlags = lexerFlagsBeforeParen;

    if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
      // (I think this check is redundant)
      return THROW_RANGE('Expected the closing bracket `]` for the array, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    ASSERT_skipDiv($PUNC_BRACKET_CLOSE, lexerFlags); // a forward slash after ] has to be a division
    AST_close($tp_arrayOpen_start, $tp_arrayOpen_line, $tp_arrayOpen_column, 'ArrayExpression');
    if (skipInit === PARSE_INIT) {
      destructible = parsePatternAssignMaybe(lexerFlags, $tp_arrayOpen_start, $tp_arrayOpen_line, $tp_arrayOpen_column, destructible, _astProp);
    }

    // pick up the flags from assignable and put them in destructible
    // - `([x] = await bar) => {}`
    // - `async function a(){     ([v] = await bar) => {}     }`
    // - `function *g(){ (x = [yield]) }`
    // - `{ (x = [yield]) }`
    return sansFlag(copyPiggies(destructible, assignableYieldAwaitState), PIGGY_BACK_WAS_ARROW);
  }

  function parseObjectOuter(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectOuter.length === arguments.length, 'arg count');
    ASSERT_BINDING_TYPE(bindingType);

    // This function makes it easier to search for places that parse an object literal/pattern, without recursive bits

    return parseObjectAndAssign(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp);
  }
  function parseObjectAndAssign(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
    // returns whether this object is destructible
    ASSERT(parseObjectAndAssign.length === arguments.length, 'expecting all args');
    ASSERT(skipInit === SKIP_INIT || skipInit === PARSE_INIT, 'skipInit is enum', skipInit);
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'not yet consumed');

    // parse an object literal or pattern
    // - {}
    // - {x}
    // - {x, y}
    // - {x: y}
    // - {x: y, z}
    // - {x: [..]}
    // - {x: {..}}
    // - {x = y}
    // - {x: y = z}
    // - {x: [..] = y}
    // - {x: {..} = y}
    // - {...x}
    // - {...x, y}
    // - {...x = y, y}
    // - {...x.x, y}
    // - {...x.x = y, y}

    let $tp_curly_line = tok_getLine();
    let $tp_curly_column = tok_getColumn();
    let $tp_curly_start = tok_getStart();

    AST_open(astProp, {
      type: 'ObjectExpression',
      loc: undefined,
      properties: [],
    });

    let destructible = parseObjectSansAssign(lexerFlags | LF_NO_ASI, scoop, bindingType, exportedNames, exportedBindings, 'properties');

    AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column, 'ObjectExpression');

    // this is immediately after the top-level object literal closed that we started parsing
    if (skipInit === PARSE_INIT) {
      destructible = parsePatternAssignMaybe(lexerFlags, $tp_curly_start, $tp_curly_line, $tp_curly_column, destructible, astProp);
    }

    return destructible;
  }
  function parseObjectSansAssign(outerLexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectSansAssign.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'should have asserted to be at the curly open of an objlit or pattern here...');
    // parse the body of something that looks like an object literal (obj lit, class body)

    let lexerFlags = sansFlag(outerLexerFlags, LF_IN_FOR_LHS | LF_IN_TEMPLATE);

    ASSERT_skipAny($PUNC_CURLY_OPEN, lexerFlags);

    let destructible = MIGHT_DESTRUCT; // innocent until proven guilty? may or may not destruct

    // > 12.2.6.1: In ECMAScript 2015, it is no longer an early error to have duplicate property names in Object
    // Initializers. So we don't have to track all properties of object literals to check for dupes, however, we still
    // need to confirm this for annex B web-compat __proto__.

    let hasThunderProto = false; // Yes, "I know", that's the joke.

    do {
      if (tok_getType() === $PUNC_COMMA) {
        // - `{,}`
        //     ^
        // - `{a,,b}`
        //       ^
        return THROW_RANGE('Objects cant have comma without something preceding it', tok_getStart(), tok_getStop());
      }
      let currentDestruct = parseObjectPart(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp);
      if (hasAnyFlag(currentDestruct, PIGGY_BACK_WAS_PROTO)) {
        ASSERT(options_webCompat === WEB_COMPAT_ON, 'this piggy should not appear if the web compat flag wasnt set');
        currentDestruct ^= PIGGY_BACK_WAS_PROTO; // Since the bit was set, this should unset it without further checks

        // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
        // When ObjectLiteral appears in a context where ObjectAssignmentPattern is required the Early Error rule is not applied.
        // As per https://github.com/tc39/test262/issues/2344 this is only the case if it actually is a pattern.
        if (hasThunderProto) {
          // [x]: `x = {__proto__: 1, __proto__: 2}`
          // [x]: `x = {'__proto__': 1, "__proto__": 2}`
          // [x]: `x = [{__proto__: 1, __proto__: 2}]`
          // [x]: `x = [{'__proto__': 1, "__proto__": 2}]`
          // TODO: I don't like this because the final error is very obscure. However it's a bit too complex to have
          // that propagated through the system right now. So maybe later. For now it'll throw generic destruct errors.
          destructible |= MUST_DESTRUCT; // Double proto rule is ignored if it occurs in a pattern
        }
        hasThunderProto = true;
      }
      destructible |= currentDestruct;

      if (tok_getType() !== $PUNC_COMMA) break;
      ASSERT_skipAny(',', lexerFlags);
    } while (tok_getType() !== $PUNC_CURLY_CLOSE);

    // restore in/template flags (`x${+{}}` would fail if you didn't do this before parsing the closing curly)
    lexerFlags = outerLexerFlags;

    if (tok_getType() !== $PUNC_CURLY_CLOSE) {
      return THROW_RANGE('Expected the closing curly `}` for an object, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    ASSERT_skipDiv($PUNC_CURLY_CLOSE, lexerFlags); // ({...} / foo)

    return destructible;
  }
  function parseObjectPart(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    // parseProperty parseMethod
    ASSERT(parseObjectPart.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');


    let $tp_startOfKey_type = tok_getType();
    let $tp_startOfKey_line = tok_getLine();
    let $tp_startOfKey_column = tok_getColumn();
    let $tp_startOfKey_start = tok_getStart();

    // Either parse a colon-property, a shorthand-property, or a shorthand-method
    // Shorthand-property must be ident, the others keys is one of ident, string, number, or computed property

    // An objlit property has quite a few goals
    // - 4 types of key (ident, string, number, computed)
    // - regular property value ({a:b})
    // - shorthand property ({a}), only works on ident keys, ident can not be a keyword
    // - shorthand method, with four potential modifiers (a(){} with async, star, get, set, or async star)
    // - spread ({...a})

    // All goals that are not methods have special cases of object literal vs object pattern
    // - shorthands with init must be patterns {a=b}
    // - a shorthand cannot be eval, arguments, or yield in strict mode (({eval}=x) -> eval = x.eval)
    // - a only non-ident rest arg that are member expressions can be pattern ({...a.b}=c)

    // Valid syntaxes (all can have trailing comma except for rest)
    // - `{}`
    // - `{ident}`         (shorthand ident is susceptible to keyword restrictions)
    // - `{ident=expr}`    (valid pattern, invalid object literal)
    // - `{key:ident}`     (assign/bind pattern-able for all keys)
    // - `{key:expr}`      (assign pattern-able if member expression for all keys)
    // - `{key(){}}`       (method shorthand)
    // - `{get key(){}}`
    // - `{set key(x){}}`
    // - `{async key(){}}`
    // - `{*key(){}}`
    // - `{async *key(){}}`
    // - `{...value}`      (this seems to be able to allow any value token including regexes, literals, idents)

    if (isIdentToken($tp_startOfKey_type)) {
      // - `({key: expr})`
      //      ^^^
      // - `({ident})`
      //      ^^^^^
      // - `({key(){}})`
      //      ^^^
      // - `({async key(){}})`
      //      ^^^^^
      // - `({async * key(){}})`
      //      ^^^^^
      // - `({key: a.b} = c)`
      //      ^^^

      return parseObjectPartFromIdent(lexerFlags, $tp_startOfKey_type, scoop, bindingType, exportedNames, exportedBindings, astProp);
    }

    if ($tp_startOfKey_type === $PUNC_CURLY_CLOSE) {
      // ` `({})`
      //      ^
      return MIGHT_DESTRUCT;
    }

    if (isNumberStringToken($tp_startOfKey_type)) {
      // Property names can also be strings and numbers but these cannot be shorthanded
      // Number/string keys can still destructure just fine (`({"foo": x} = y)`)

      // - `({"key": expr})`
      //      ^^^^^
      // - `({"key"(){}})`
      //      ^^^^^
      // - `({"key": a.b} = c)`
      //      ^^^^^

      // - `({123: expr})`
      //      ^^^
      // - `({123(){}})`
      //      ^^^
      // - `({123: a.b} = c)`
      //      ^^^

      // Note: this path can not parse getters/setters/async/generator because the first token of the property head
      // was already the literal and these modifiers must precede the id.

      return parseObjectPartFromLiteral(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp);
    }

    if ($tp_startOfKey_type === $PUNC_BRACKET_OPEN) {
      // - `({[key]: expr})`
      //      ^^^^^
      // - `({[key](){}})`
      //      ^^^^^
      // - `({[key]: a.b} = c)`
      //      ^^^^^

      // Note: this path can not parse getters/setters/async/generator because the first token of the property head
      // was already the literal and these modifiers must precede the id.

      return parseObjectPartFromComputed(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp);
    }

    if ($tp_startOfKey_type === $PUNC_DOT_DOT_DOT) {
      // - `({...key})`
      //      ^^^
      // - `({...key}) => x`
      //      ^^^
      // - `({...key = x})`
      //      ^^^
      // - `({...key.prop} = x)`
      //      ^^^
      return parseObjectRestSpread(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp);
    }

    if ($tp_startOfKey_type === $PUNC_STAR) {
      // Generator shorthand method (invalid for bindings), the next token must be the id

      // - `{*ident(){}} = x`
      //     ^
      // - `{*"str"(){}} = x`
      // - `{*15(){}} = x`
      // - `{*[expr](){}} = x`

      ASSERT_skipAny('*', lexerFlags);

      return parseObjectMethodFromKey(lexerFlags, $tp_startOfKey_start, $tp_startOfKey_line, $tp_startOfKey_column, 'init', true, $UNTYPED, $PUNC_STAR, $UNTYPED, $UNTYPED, astProp);
    }

    // ({<?>
    return THROW_RANGE('Unexpected token, wanted to parse a start of a property in an object literal/pattern, got `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop());
  }
  function parseObjectMethodFromKey(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp) {
    ASSERT(parseObjectMethodFromKey.length === arguments.length, 'arg count');

    // Parse a key (ident, string, number, computed) and then the method from params
    // Note: this path is taken when we already know it _must_ be a method, so a modifier was parsed already

    // - `({get key(){})`
    //          ^^^
    // - `({set 577(x){})`
    //          ^^^
    // - `({* "key"(){})`
    //        ^^^^^
    // - `({async * [key](){})`
    //              ^

    // To be clear, keyStart !== startOfProp
    let $tp_keyStart_type = tok_getType();
    let $tp_keyStart_line = tok_getLine();
    let $tp_keyStart_column = tok_getColumn();
    let $tp_keyStart_start = tok_getStart();
    let $tp_keyStart_stop = tok_getStop();
    let $tp_keyStart_canon = tok_getCanoN();

    if (isIdentToken($tp_keyStart_type)) {
      // - `({get key(){})`
      //          ^^^

      ASSERT_skipAny($G_IDENT, lexerFlags); // regex irrelevant because div must lead to an error

      AST_setIdent(astProp, $tp_keyStart_start, $tp_keyStart_stop, $tp_keyStart_line, $tp_keyStart_column, $tp_keyStart_canon);

      if (tok_getType() !== $PUNC_PAREN_OPEN) {
        return THROW_RANGE('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop())
      }

      return parseObjectMethod(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, false, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp)
    }

    if (isNumberStringToken($tp_keyStart_type)) {
      // - `({set 577(x){})`
      //          ^^^
      // - `({* "key"(){})`
      //        ^^^^^

      ASSERT_skipAny(isNumberToken($tp_keyStart_type) ? $G_NUMBER : $G_STRING, lexerFlags); // regex irrelevant because div must lead to an error

      AST_setLiteral(astProp, $tp_keyStart_type, $tp_keyStart_start, $tp_keyStart_stop, $tp_keyStart_line, $tp_keyStart_column, $tp_keyStart_canon);

      if (tok_getType() !== $PUNC_PAREN_OPEN) {
        return THROW_RANGE('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop())
      }

      return parseObjectMethod(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, false, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp)
    }

    if ($tp_keyStart_type === $PUNC_BRACKET_OPEN) {
      // - `({async * [key](){})`
      //              ^

      ASSERT_skipRex('[', lexerFlags); // Regex _is_ relevant because `({get [/foo/](){})` is legit
      parseExpression(lexerFlags, astProp);
      if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
        return THROW_RANGE('Missing closing square bracket for computed property name, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop())
      }
      ASSERT_skipAny(']', lexerFlags); // Regex irrelevant because div must lead to an error

      if (tok_getType() !== $PUNC_PAREN_OPEN) {
        return THROW_RANGE('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '`', tok_getStart(), tok_getStop())
      }

      return parseObjectMethod(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, true, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp)
    }

    // [x]: `({set * bar(x){})`
    //             ^
    THROW_RANGE('Expected to parse an object method key, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
  }
  function parseObjectPartFromIdent(lexerFlags, $tp_propLeadingIdent_type, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectPartFromIdent.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(tok_getType()), 'should be at ident');
    ASSERT(typeof astProp === 'string', 'astprop string');

    // - `{ident,}`
    // - `{ident,}`
    // - `{key(){}`
    // - `{get key(){}`
    // - `{set key(){}`
    // - `{async key(){}`
    // - `{*key(){}`
    // - `{async *key(){}`
    // - `{async *ident(){}`
    // - `{static static(){}`   (static is not a legal modifier in objlits)
    // - `let {x:o.f=1}=a`      (member expressions are not legal in binding patterns, only assign patterns)
    // - `({await})=>x`         (PIGGY_BACK_SAW_AWAIT)
    // - `async({await})=>x`    (the error case which requires PIGGY_BACK_SAW_AWAIT)
    // - `({yield})=>x`

    ASSERT(tok_getType() === $tp_propLeadingIdent_type, 'should be curtok');
    let $tp_propLeadingIdent_line = tok_getLine();
    let $tp_propLeadingIdent_column = tok_getColumn();
    let $tp_propLeadingIdent_start = tok_getStart();
    let $tp_propLeadingIdent_stop = tok_getStop();
    let $tp_propLeadingIdent_canon = tok_getCanoN();

    ASSERT_skipAny($G_IDENT, lexerFlags);

    let $tp_afterIdent_type = tok_getType();

    if ($tp_afterIdent_type === $PUNC_COLON) {
      // Regular property key
      // - `({ ident: x })`
      //            ^

      AST_setIdent(astProp, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon);

      let destructible = MIGHT_DESTRUCT;
      if (options_webCompat === WEB_COMPAT_ON && $tp_propLeadingIdent_canon === '__proto__') {
        // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
        // > "at least two of those entries were obtained from productions of the form PropertyDefinition : PropertyName : AssignmentExpression"
        destructible = PIGGY_BACK_WAS_PROTO;
      }

      return destructible | parseObjectPropertyFromColon(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, scoop, exportedNames, exportedBindings, bindingType, false, astProp);
    }

    if ($tp_afterIdent_type === $PUNC_PAREN_OPEN) {
      // Regular object method without modifiers
      // - `({ ident() { } })`
      //            ^

      // Note: __proto__ rule:
      // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
      // > "at least two of those entries were obtained from productions of the form PropertyDefinition : PropertyName : AssignmentExpression"

      AST_setIdent(astProp, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon);

      return parseObjectMethod(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'init', false, true, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, astProp)
    }

    if ($tp_afterIdent_type === $PUNC_COMMA || $tp_afterIdent_type === $PUNC_CURLY_CLOSE) {
      // Property shorthand without init
      // - `({ a, b: x })`
      //        ^
      // - `({ ident })`
      //             ^
      // - `(x = {eval})`
      // - `({eval} = x)`

      // Note: __proto__ rule:
      // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
      // > "at least two of those entries were obtained from productions of the form PropertyDefinition : PropertyName : AssignmentExpression"

      return parseObjectShorthand(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp);
    }

    if ($tp_afterIdent_type === $PUNC_EQ) {
      // Property shorthand with initializer, must be pattern (because of the init)
      // - `({ident = x} = y)`
      //            ^

      // Note: __proto__ rule:
      // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
      // > "at least two of those entries were obtained from productions of the form PropertyDefinition : PropertyName : AssignmentExpression"

      return parseObjectShorthandWithInit(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp);
    }

    // Must be parsing some form of object method WITH modifier now

    if ($tp_propLeadingIdent_type === $ID_async) {
      // - `({ async x() {} })`
      // - `({ async *x() {} })`
      // - `({ async 500() {} })`
      // - `({ async "str"() {} })`
      // - `({ async [foo]() {} })`

      if (!allowAsyncFunctions) {
        return THROW_RANGE('Async functions are not supported in the currently targeted language version', $tp_propLeadingIdent_start, tok_getStop());
      }

      // Note: `{async\n(){}}` is legal in sloppy so we do have to check the paren
      if (tok_getNlwas() === true) {
        // - `({async \n key(){}})`
        //              ^
        // Always an error due to async being a restricted production
        return THROW_RANGE('Async methods are a restricted production and cannot have a newline following it', $tp_propLeadingIdent_start, tok_getStart());
      }

      if (tok_getType() === $PUNC_STAR) {
        if (!allowAsyncGenerators) {
          return THROW_RANGE('Async generator methods are not supported in the currently targeted language version', $tp_propLeadingIdent_start, tok_getStop());
        }

        ASSERT_skipAny('*', lexerFlags);

        return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'init', true, $ID_async, $PUNC_STAR, $UNTYPED, $UNTYPED, astProp);
      }

      return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'init', true, $ID_async, $UNTYPED, $UNTYPED, $UNTYPED, astProp);
    }

    if ($tp_propLeadingIdent_type === $ID_get) {
      // - `({ get x() {} })`
      // - `({ get 500() {} })`
      // - `({ get "str"() {} })`
      // - `({ get [foo]() {} })`

      return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'get', false, $UNTYPED, $UNTYPED, $ID_get, $UNTYPED, astProp);
    }

    if ($tp_propLeadingIdent_type === $ID_set) {
      // - `({ set x(a) {} })`
      // - `({ set 500(b) {} })`
      // - `({ set "str"(c) {} })`
      // - `({ set [foo](d) {} })`

      return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'set', false, $UNTYPED, $UNTYPED, $UNTYPED, $ID_set, astProp);
    }

    if ($tp_propLeadingIdent_type === $ID_static) {
      return THROW_RANGE('Object members can not be "static"', $tp_propLeadingIdent_start, tok_getStop());
    }

    // [x]: `({foo += bar})`
    return THROW_RANGE('Unexpected token `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` after start of property `' + $tp_propLeadingIdent_canon + '` while trying to parse an object property/method', $tp_propLeadingIdent_start, tok_getStop());
  }
  function parseObjectPropertyFromColon(lexerFlags, $tp_startOfKey_start, $tp_startOfKey_line, $tp_startOfKey_column, scoop, exportedNames, exportedBindings, bindingType, isComputed, astProp) {
    ASSERT(parseObjectPropertyFromColon.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_COLON);

    // - `o = {x: foo}`
    //          ^

    ASSERT_skipRex(':', lexerFlags); // `({x: /foo/})`

    if (babelCompat) {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: undefined,
        key: undefined,
        method: false,
        computed: isComputed,
        value: undefined,
        shorthand: false,
      }, 'key');
    } else {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: undefined,
        key: undefined,
        kind: 'init',
        method: false,
        computed: isComputed,
        value: undefined,
        shorthand: false,
      }, 'key');
    }

    let destructible = _parseObjectPropertyFromColon(lexerFlags, scoop, exportedNames, exportedBindings, bindingType);

    AST_close($tp_startOfKey_start, $tp_startOfKey_line, $tp_startOfKey_column, NODE_NAME_PROPERTY);

    return destructible;
  }
  function _parseObjectPropertyFromColon(lexerFlags, scoop, exportedNames, exportedBindings, bindingType) {
    ASSERT(_parseObjectPropertyFromColon.length === arguments.length, 'arg count');

    if (isIdentToken(tok_getType())) {
      // - `o = {x: foo}`
      //            ^^^
      return parseObjectPropertyValueFromIdent(lexerFlags, scoop, exportedNames, exportedBindings, bindingType);
    }

    let $tp_start_line = tok_getLine();
    let $tp_start_column = tok_getColumn();
    let $tp_start_start = tok_getStart();
    let $tp_start_stop = tok_getStop();

    if (tok_getType() === $PUNC_CURLY_OPEN) {
      // [v]: `({a: {b} = 0})`
      //            ^
      // [v]: `({a: {b: c} = 0})`
      // [v]: `({a: {a: b.x} = 0})`
      // [v]: `({a: {b} = 0}) => x`
      // [v]: `({a: {b: c} = 0}) => x`
      // [x]: `({a: {a: b.x} = 0}) => x`
      let destructible = parseObjectOuter(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, 'value');
      let objAssignable = (destructible & CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE;

      if (tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_CURLY_CLOSE) {
        // [v]: `({a: {b}})`
        //               ^
        // [v]: `({a: {b}, c})`
        //               ^
        return destructible;
      }

      if (MUST_DESTRUCT & destructible) {
        // [x]: `({a:{x = y}.z} = x);`
        //                   ^
        //           ^^^^^^^ because a shorthand with init must be a pattern
        return THROW_RANGE('Object pattern contained parts cause it not to be valid as a regular object literal so the next token `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` is illegal', tok_getStart(), tok_getStop());
      }

      // Value must have a tail and it is not (immediately) an assignment. At this point, only assign or cant destruct.
      let exprAssignable = parseValueTail(lexerFlags, $tp_start_start, $tp_start_line, $tp_start_column, objAssignable, NOT_NEW_ARG, NOT_LHSE, 'value');
      let wasAssignment = tok_getType() === $PUNC_EQ; // An assignment is destructible
      exprAssignable = parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, exprAssignable, 'value');

      if (wasAssignment || isAssignable(exprAssignable)) {
        return copyPiggies(DESTRUCT_ASSIGN_ONLY, exprAssignable);
      }

      return copyPiggies(CANT_DESTRUCT, exprAssignable);
    }

    if (tok_getType() === $PUNC_BRACKET_OPEN) {
      // [v]: `({a: [b] = 0})`
      //            ^
      // [v]: `({a: [b.x] = 0})`
      // [v]: `({a: [b] = 0}) => x`
      // [v]: `({a: [b.x] = 0}) => x`

      let destructible = parseArrayOuter(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, 'value');
      let objAssignable = (destructible & CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE;

      if (tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_CURLY_CLOSE) {
        // [v]: `({[b]}})`
        //            ^
        // [v]: `({[b], x})`
        //            ^
        return destructible;
      }

      if (MUST_DESTRUCT & destructible) {
        // [x]: `[{a = b}].x`
        //                ^
        //        ^^^^^^^ because the nested object must be a pattern
        return THROW_RANGE('Object pattern contained parts cause it not to be valid as a regular object literal so the next token `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` is illegal', tok_getStart(), tok_getStop());
      }

      // Value must have a tail and it is not (immediately) an assignment. At this point, only assign or cant destruct.
      let exprAssignable = parseValueTail(lexerFlags, $tp_start_start, $tp_start_line, $tp_start_column, objAssignable, NOT_NEW_ARG, NOT_LHSE, 'value');
      let wasAssignment = tok_getType() === $PUNC_EQ; // An assignment is destructible
      exprAssignable = parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, exprAssignable, 'value');

      if (wasAssignment || isAssignable(exprAssignable)) {
        return copyPiggies(DESTRUCT_ASSIGN_ONLY, exprAssignable);
      }

      return copyPiggies(CANT_DESTRUCT, exprAssignable);
    }

    // A value that starts with anything except an ident cannot be a binding pattern but could still be an assignment
    // pattern (like `o = {x: "foo".bar}`).

    // Parse value but not the assignment
    // Remember; this value did not start with an ident!

    // [v]: `({a: (b) = 0})`
    //            ^
    // [v]: `({a: (b.x) = 0})`
    // [v]: `({a: (b) = 0} = 1)`
    // [v]: `({a: (b.x) = 0} = 1)`
    // [x]: `({a: (b) = 0} = 1) => x`
    // [x]: `({a: (b.x) = 0} = 1) => x`

    let valueAssignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, 'value');

    // Whatever the value, it may have a tail (like a property or call) which we must validate first

    let wasAssignment = tok_getType() === $PUNC_EQ; // An assignment is destructible

    valueAssignable = parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, valueAssignable, 'value');

    // At this point, an assignment implies the whole thing can at best be a destruct assignment (but no longer
    // an arrow for example). If it wasn't an assignment and it wasn't assignable, then it's also not destructible.

    if (wasAssignment || isAssignable(valueAssignable)) {
      return copyPiggies(DESTRUCT_ASSIGN_ONLY, valueAssignable);
    }

    return copyPiggies(CANT_DESTRUCT, valueAssignable);
  }
  function parseObjectPropertyValueFromIdent(lexerFlags, scoop, exportedNames, exportedBindings, bindingType) {
    ASSERT(parseObjectPropertyValueFromIdent.length === arguments.length, 'arg count');

    // - `{ident: ident}`
    //            ^
    // - `{12: ident ...`
    // - `{"foo": ident ...`
    // - `{key: ident,...}`
    // - `{key: ident.ident} = x`
    // - `{key: ident = ...}`
    // - `{key: ident + rest`        // not destructible, so confirm token after ident
    // - `{key: yield}`
    // - `{key: yield foo}`
    // - `{key: new}`                // error
    // - `{key: new foo}`            // not destructible
    // - `{key: true}`
    // - `{key: yield / bar}
    // - `{key: await foo}

    // property value or label, some are destructible, trailing commas can be significant:
    //                                      literal, assign pattern, binding pattern
    // - `({ident: ident,})`                [v]      [v]             [v]
    // - `({ident: (ident)})`               [v]      [v]             [ ]
    // - `({ident: a.b}`                    [v]      [v]             [ ]
    // - `({ident: a[b]}`                   [v]      [v]             [ ]
    // - `({ident: a(b)}`                   [v]      [ ]             [ ]
    // - `({ident: a`b`}`                   [v]      [ ]             [ ]
    // - `({ident: [],}`                    [v]      [v]             [v]
    // - `({ident: {},}`                    [v]      [v]             [v]
    // - `({ident: ident = expr}`           [v]      [v]             [v]
    // - `({ident: (ident) = expr}`         [v]      [v]             [ ]
    // - `({ident: a.b = expr}`             [v]      [v]             [ ]
    // - `({ident: a[b] = expr}`            [v]      [v]             [ ]
    // - `({ident: a(b) = expr}`            [v]      [ ]             [ ]
    // - `({ident: a`b` = expr}`            [v]      [ ]             [ ]
    // - `({ident: [] = expr,}`             [v]      [v]             [v]
    // - `({ident: {} = expr,}`             [v]      [v]             [v]
    // anything else as value is non-destructible

    // use the rhs of the colon as $tt_identToken now

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    // - `{key: bar}`
    //          ^
    // - `{key: bar/x`
    // - `{key: delete a.b`
    // - `{key: await /foo}`
    // - `{key: await /foo/}`
    // - `{key: await /foo/g}`

    // Always skips _one_ token. Properly deals with div/rex
    // Even if this is followed by comma or curly we still need to verify stuff like `{x: true}` and `{x: typeof}`
    skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE);

    // - `o = {key: bar = x}`
    //                  ^
    // - `o = {key: bar + x}`            // literal only
    //                  ^
    // - `o = {key: bar + x = y}`        // error
    // - `o = {key: bar.foo = x}`        // literal or assignment pattern (but not binding)
    //                 ^
    // - `o = {key: bar.foo + x}`        // literal only
    // - `o = {key: bar.foo + x = y}`    // error
    // part delimiters; comma, curly close

    // Now first validate the `{key: ident}` cases, which can lead to simple patterns cases

    let $tp_afterExpr_type = tok_getType();

    if ($tp_afterExpr_type === $PUNC_COMMA || $tp_afterExpr_type === $PUNC_CURLY_CLOSE) {
      // Note: only one token was skipped and that token was an ident. I would guess this is the most common case.
      // - `o = {key: bar}`
      //                 ^
      // - `o = {key: bar, y}`
      //                 ^
      // - `o = {a: b} = d`
      //             ^

      let assignableOrErrorMsg = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
      ASSERT(typeof assignableOrErrorMsg === 'string', 'func should always return string');

      if (assignableOrErrorMsg.length !== 0) {
        // This was a keyword of sorts. It may still be valid (like `eval` or `true`) or it may be a syntax error like
        // `typeof` or `function`. We "lazily" call the value parser to let that decide. It's a little overhead.

        let valueAssignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, ASSIGN_EXPR_IS_OK, 'value');

        return copyPiggies(CANT_DESTRUCT, valueAssignable);
      }

      AST_setIdent('value', $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);

      // Since this was an assignable identifier, it should be fine to be a pattern and since we've already asserted
      // the next token to be a comma or curly, this should be legal and the end of the property.

      SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
      // If this is not an export declaration, the calls below will be noops
      addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
      addBindingToExports(exportedBindings, $tp_ident_canon);

      // As it stands we don't care about `yield` or `await` as a keyword, so don't care about those piggies.
      // Also the constructor, proto, and arrow piggies are not relevant here.
      // Always destructible
      return MIGHT_DESTRUCT;
    }

    if ($tp_afterExpr_type === $PUNC_EQ) {
      // `x = {x: a}`
      //           ^
      // Property with a value of a single ident followed by `=`
      // This case is valid if and only if the value was assignable.

      let assignableOrErrorMsg = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
      ASSERT(typeof assignableOrErrorMsg === 'string', 'func should always return string');

      if (assignableOrErrorMsg.length !== 0) {
        // - `o = {key: true = a}`
        //                   ^
        // - `o = {key: typeof = a}`
        //                     ^
        // - `o = {key: eval = a}`
        //                   ^
        return THROW_RANGE('The lhs was not assignable so this is an error', $tp_ident_start, tok_getStop());
      }

      // Since this was an assignable identifier, it should be fine to be a pattern and since we've already asserted
      // the next token to be the equal sign, this should be a legal end of an assignment expression, maybe pattern.

      SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
      // If this is not an export declaration, the calls below will be noops
      addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
      addBindingToExports(exportedBindings, $tp_ident_canon);

      AST_setIdent('value', $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);

      let rhsAssignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, IS_ASSIGNABLE, 'value');

      // As it stands we don't care about `yield` or `await` as a keyword, so don't care about those piggies.
      // Also the constructor, proto, and arrow piggies are not relevant here.
      // - `o = {key: bar = a}`
      //                  ^
      // Always destructible
      return copyPiggies(MIGHT_DESTRUCT, rhsAssignable);
    }

    // This ident is not the end of the property value so it's not a simple binding pattern.
    // It may still be an assignment expression, if the parsed value ends up being assignable.

    let valueAssignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, ASSIGN_EXPR_IS_OK, 'value');

    if (notAssignable(valueAssignable)) {
      // [v]: `({foo: true / false});`
      //                   ^

      let rhsAssignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, valueAssignable, 'value');

      return copyPiggies(CANT_DESTRUCT, rhsAssignable);
    }

    let wasAssign = tok_getType() === $PUNC_EQ;

    let rhsAssignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, valueAssignable, 'value');

    if (wasAssign || isAssignable(rhsAssignable)) {
      return copyPiggies(DESTRUCT_ASSIGN_ONLY, rhsAssignable);
    }

    return copyPiggies(CANT_DESTRUCT, rhsAssignable);
  }
  function parseObjectShorthand(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectShorthand.length === arguments.length, 'arg count');
    ASSERT(isIdentToken($tp_propLeadingIdent_type), 'only idents can be shorthand');
    ASSERT(tok_getType() === $PUNC_COMMA || tok_getType() === $PUNC_CURLY_CLOSE);

    // Property shorthand without init
    // - `({ a, b: x })`
    //        ^
    // - `({ ident })`
    //             ^
    // - `({true})`           illegal
    // - `({eval})`           ok as it is not a "reserved word"
    // - `({eval} = x)`       illegal in strict mode
    // - `({await})`          "depends"
    // - `({await} = x)`      "depends"

    // https://tc39.github.io/ecma262/#prod-ObjectLiteral
    // https://tc39.github.io/ecma262/#prod-PropertyDefinitionList
    // https://tc39.github.io/ecma262/#prod-PropertyDefinition
    // https://tc39.github.io/ecma262/#prod-IdentifierReference
    // https://tc39.github.io/ecma262/#prod-Identifier
    // Identifier : IdentifierName but not ReservedWord

    // ({eval});         // ok, even in strict
    // ({eval} = x);     // bad in strict mode
    // {{eval}) => x;    // bad in strict mode

    // must throw for reserved words but binding check also checks for `eval`
    // and `arguments` which are not reserved and which would be allowed here
    // Since this is an assignment the `yield` and `await` checks are implicitly done when doing binding name checks
    let report = nonFatalBindingIdentCheck($tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType, lexerFlags);
    // The `eval` and `arguments` idents are exceptions that we need to propagate back up before being able to determine
    // their validity. This makes the difference between `({x}=y)` and `y={x}` work.
    if (report.length > 0 && $tp_propLeadingIdent_type !== $ID_eval && $tp_propLeadingIdent_type !== $ID_arguments) {
      return THROW_RANGE(report, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop);
    }

    // If this isn't a binding, this is a noop
    // If this is inside a group, this is a noop if it turns out not to be an arrow
    // TODO: add test case for catch shadow
    SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType);
    // If this is not an export declaration, the calls below will be noops
    addNameToExports(exportedNames, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon);
    addBindingToExports(exportedBindings, $tp_propLeadingIdent_canon);

    // AST_setIdent(astProp, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon);

    if (babelCompat) {
      AST_open(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: undefined,
        key: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        method: false, // only the {x(){}} shorthand gets true here, this is {x}
        computed: false,
        value: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        shorthand: true,
        extra: {shorthand: true},
      });
    } else {
      AST_open(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: undefined,
        key: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        kind: 'init', // only getters/setters get special value here
        method: false, // only the {x(){}} shorthand gets true here, this is {x}
        computed: false,
        value: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        shorthand: true,
      });
    }

    AST_close($tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, NODE_NAME_PROPERTY);

    if ($tp_propLeadingIdent_type === $ID_await) {
      // Must be a var, but must also be valid as a var (that's already checked above), and
      // must also not be an async arrow parameter name (that's why we return the piggy)
      // - `x = {await}`
      // - `({await}) => x`
      // - `async ({await}) => x`
      // - `async ({await})`
      return MIGHT_DESTRUCT | PIGGY_BACK_SAW_AWAIT;
    }

    // In strict mode, this makes the difference between `(x = {eval})` and `({eval} = x)`
    return report.length > 0 ? CANT_DESTRUCT : MIGHT_DESTRUCT; // No piggy
  }
  function parseObjectShorthandWithInit(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectShorthandWithInit.length === arguments.length, 'arg count');

    // Property shorthand with initializer, must be pattern (because of the init)
    // - `({ident = x} = y)`
    //            ^
    // - `({true = x} = y)`           illegal
    // - `({eval = x} = y)`           ok as it is not a "reserved word"
    // - `({await = x} = y)`          "depends"

    // https://tc39.github.io/ecma262/#prod-ObjectLiteral
    // https://tc39.github.io/ecma262/#prod-PropertyDefinitionList
    // https://tc39.github.io/ecma262/#prod-PropertyDefinition
    // https://tc39.github.io/ecma262/#prod-IdentifierReference
    // https://tc39.github.io/ecma262/#prod-Identifier
    // Identifier : IdentifierName but not ReservedWord

    // ({eval = x});     // bad, missing assignment to pattern
    // ({eval} = x);     // bad in strict mode
    // {{eval}) => x;    // bad in strict mode

    // must throw for reserved words but binding check also checks for `eval`
    // and `arguments` which are not reserved and which would be allowed here
    // Since this is an assignment the `yield` and `await` checks are implicitly done when doing binding name checks
    fatalBindingIdentCheck($tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType, lexerFlags);

    // If this isn't a binding, this is a noop
    // If this is inside a group, this is a noop if it turns out not to be an arrow
    // TODO: add test case for catch shadow
    SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType);
    // If this is not an export declaration, the calls below will be noops
    addNameToExports(exportedNames, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon);
    addBindingToExports(exportedBindings, $tp_propLeadingIdent_canon);

    if (babelCompat) {
      AST_open(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: undefined,
        key: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        method: false, // only the {x(){}} shorthand gets true here, this is {x}
        computed: false,
        value: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        shorthand: true,
        extra: {shorthand: true},
      });
    } else {
      AST_open(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: undefined,
        key: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        kind: 'init', // only getters/setters get special value here
        method: false, // only the {x(){}} shorthand gets true here, this is {x}
        computed: false,
        value: AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon),
        shorthand: true,
      });
    }

    AST_wrapClosedCustom('value', {
      type: 'AssignmentExpression',
      loc: undefined,
      left: undefined,
      operator: '=',
      right: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart('=', lexerFlags); // a forward slash after = has to be a regex

    let nowAssignable = parseExpression(lexerFlags, 'right');

    AST_close($tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'AssignmentExpression');

    AST_close($tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, NODE_NAME_PROPERTY);

    // - `({foo = 10})`
    // the shorthand only forces MUST_DESTRUCT when an initializer follows it immediately
    // (consider `({foo = 10})` vs `({foo: bar = 10})`)

    if ($tp_propLeadingIdent_type === $ID_await) {
      // Must be a var, but must also be valid as a var (that's checked above), and
      // must also not be an async arrow parameter name (that's why we return the piggy)
      // - `x = {await}`
      // - `({await}) => x`
      // - `async ({await}) => x`
      // - `async ({await})`
      return copyPiggies(MUST_DESTRUCT | PIGGY_BACK_SAW_AWAIT, nowAssignable);
    }

    return copyPiggies(MUST_DESTRUCT, nowAssignable);
  }
  function parseObjectPartFromLiteral(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp) {
    ASSERT(parseObjectPartFromLiteral.length === arguments.length, 'arg count');

    let $tp_lit_type = tok_getType();
    let $tp_lit_line = tok_getLine();
    let $tp_lit_column = tok_getColumn();
    let $tp_lit_start = tok_getStart();
    let $tp_lit_stop = tok_getStop();
    let $tp_lit_canon = tok_getCanoN();

    ASSERT_skipToColonParenOpen(tok_sliceInput($tp_lit_start, $tp_lit_stop), lexerFlags);

    AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon);

    if (tok_getType() === $PUNC_COLON) {
      // Any key-colon combo is destructible, the "value" determines assign/binding/both destructibility:
      // - `{key: ident}`
      //        ^
      // - `{300: x}`
      // - `{"foo": x}`
      // - `{key: expr.ident}`
      // - `{key: member[expr]}`
      // - `{key: <array destruct>}`
      // - `{key: <object destruct>}`
      // - `{key: expr = init}`          // destructibility depends on expr

      let destructible_forPiggies = MIGHT_DESTRUCT;

      // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
      // > "at least two of those entries were obtained from productions of the form PropertyDefinition : PropertyName : AssignmentExpression"
      // `{"__proto__": 1, __proto__: 2}` is still an error, only for key:value (not shorthand or methods)
      if (options_webCompat === WEB_COMPAT_ON && $tp_lit_canon === '__proto__') {
        destructible_forPiggies |= PIGGY_BACK_WAS_PROTO;
      }

      return destructible_forPiggies | parseObjectPropertyFromColon(lexerFlags, $tp_lit_start, $tp_lit_line, $tp_lit_column, scoop, exportedNames, exportedBindings, bindingType, false, astProp);
    }

    if (tok_getType() !== $PUNC_PAREN_OPEN) {
      return THROW_RANGE('Object literal keys that are strings or numbers must be a method or have a colon', tok_getStart(), tok_getStop());
    }

    // Method shorthand
    // - `{5(){}}`
    // - `{'foo'(){}}`

    // TODO: does this need the __proto__ check? It might, actually :)

    return parseObjectMethod(lexerFlags, $tp_lit_start, $tp_lit_line, $tp_lit_column, 'init', false, true, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, astProp)
  }
  function parseObjectPartFromComputed(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp) {
    ASSERT(parseObjectPartFromComputed.length === arguments.length, 'arg count');
    ASSERT(tok_getType() === $PUNC_BRACKET_OPEN);

    // computed property (is valid in destructuring assignment!)
    // - `({[foo]: x} = y)`
    //      ^
    // - `({[foo]() {}} = y)`            fail
    // - `const {[x]: y} = z;`
    // - `({[x]: y}) => z;`
    // - `function f({[x]: {y = z}}) {}`

    let $tp_keyStart_line = tok_getLine();
    let $tp_keyStart_column = tok_getColumn();
    let $tp_keyStart_start = tok_getStart();

    ASSERT_skipToExpressionStart('[', lexerFlags);
    let assignable_forPiggies = parseExpression(lexerFlags, astProp);
    if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
      if (tok_getType() === $PUNC_COMMA) {
        return THROW_RANGE('The expression of a computed property key can not be a comma expression', tok_getStart(), tok_getStop())
      }
      return THROW_RANGE('Missing closing square bracket for computed property name, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop())
    }
    ASSERT_skipToColonParenOpen(']', lexerFlags);

    let $tp_afterKey_type = tok_getType();

    if ($tp_afterKey_type === $PUNC_COLON) {
      let assignable = parseObjectPropertyFromColon(lexerFlags, $tp_keyStart_start, $tp_keyStart_line, $tp_keyStart_column, scoop, exportedNames, exportedBindings, bindingType, true, astProp);
      // [x]: `async function f(){    async function f(){   (a= {[await foo]: x} ) => a    }    }`
      return copyPiggies(assignable, assignable_forPiggies);
    }

    if ($tp_afterKey_type === $PUNC_PAREN_OPEN) {
      let assignable = parseObjectMethod(lexerFlags, $tp_keyStart_start, $tp_keyStart_line, $tp_keyStart_column, 'init', true, true, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, astProp)
      // [x]: `async function f(){    async function f(){   (a= {[await foo](){}} ) => a    }    }`
      return copyPiggies(assignable, assignable_forPiggies);
    }

    THROW_RANGE('Object literal; computed property must be followed by a colon (property) paren (method), found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + `' instead'`, tok_getStart(), tok_getStop());
  }
  function parseObjectRestSpread(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectRestSpread.length === arguments.length, 'arg count');

    if (targetEsVersion < VERSION_OBJECTSPREAD && targetEsVersion !== VERSION_WHATEVER) {
      return THROW_RANGE('Object spread/rest requires the requested version to be ES9+', tok_getStart(), tok_getStop());
    }
    // rest/spread (supported in objects since es9)
    // unlike arrays it can appear in any property index in an object
    // note that an object spread, if the last element, CAN have a trailing comma
    // if binding, if spread arg is not array/object/ident then it is not destructible
    // if not binding, it is also destructible if arg is member expression
    // - ({...x});                  (this is valid)
    // - ({...x=y});                (spread wraps the assignment (!))
    // - ({...x+=y});               (spread wraps the assignment (!))
    // - ({...x+y});                (spread wraps any expression)
    // - ({...x, y});               (spread does not need to be last)
    // - ({...x, ...y});            (spread can appear more than once)
    // - ({...x}) => x
    // - ({x, ...y}) => x
    // - ({...x.y} = z)             (ok)
    // - ({...x.y}) => z            (bad)
    // - ({...x.y} = z) => z        (bad)
    // - (z = {...x.y}) => z        (ok)
    // - (z = {...x.y} = z) => z    (ok)
    return parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_CURLY_CLOSE, bindingType, $UNTYPED, exportedNames, exportedBindings, astProp);
  }
  function parseObjectMethod(lexerFlags, $tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column, kind, isComputed, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp) {
    ASSERT(parseObjectMethod.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'async token');
    ASSERT($tp_star_type === $UNTYPED || $tp_star_type === $PUNC_STAR, 'gen token');
    ASSERT_VALID(tok_getType() === $PUNC_PAREN_OPEN, 'Should be at the start of the method parameter definition');

    // - `{*[expr](){}} = x`
    //            ^

    if (babelCompat) {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_OBJECT,
        loc: undefined,
        key: undefined,
        // Method: getters and setters are not methods but properties
        method: isRealMethod, // $tf_getToken_type === $UNTYPED && $tf_setToken_type === $UNTYPED, // alternative would be `$tf_getToken_type === $tf_setToken_type` since they can't both legally be set and are both $UNTYPED if unset
        generator: undefined,
        async: undefined,
        id: undefined,
        params: [],
        // Kind: only getters/setters get special value here, "init" for the others. In the Babel AST the "other" kind is "method" instead.
        kind: kind === 'init' ? 'method' : kind, // $tf_getToken_start !== 0 ? 'get' : $tf_setToken_start !== 0 ? 'set' : 'method',
        computed: isComputed,
        body: undefined,
      }, 'key');
    } else {
      // Acorn uses the parenthesis open as start of method while tenko/babel uses the start of the first modifier and otherwise the id
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_OBJECT,
        loc: undefined,
        key: undefined,
        // Kind: only getters/setters get special value here, "init" for the others. In the Babel AST the "other" kind is "method" instead.
        kind: kind, // $tf_getToken_start !== 0 ? 'get' : $tf_setToken_start !== 0 ? 'set' : 'init',
        // Method: getters and setters are not methods but properties
        method: isRealMethod, // $tf_getToken_start === 0 && $tf_setToken_start === 0,
        computed: isComputed,
        value: undefined,
        shorthand: false, // not for babel
      }, 'key');
    }

    // - `foo = { get x(){  "use strict"; (break = "sentinal 79845134");   }}`
    // - `let o = {async await(){}}`
    // - `let o = {async *await(){}}`
    // - `({set break(x){}});`

    if (acornCompat) {
      let $tp_paren_line = tok_getLine();
      let $tp_paren_column = tok_getColumn();
      let $tp_paren_start = tok_getStart();

      parseFunctionAfterKeyword(lexerFlags, DO_NOT_BIND, NOT_FUNC_DECL, NOT_FUNC_EXPR, IDENT_OPTIONAL, NOT_CONSTRUCTOR, IS_METHOD, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, $tp_paren_start, $tp_paren_line, $tp_paren_column, FDS_ILLEGAL, 'value');
    } else {
      parseFunctionAfterKeyword(lexerFlags, DO_NOT_BIND, NOT_FUNC_DECL, NOT_FUNC_EXPR, IDENT_OPTIONAL, NOT_CONSTRUCTOR, IS_METHOD, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, $tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column, FDS_ILLEGAL, 'value');
    }

    AST_close($tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column, NODE_NAME_METHOD_OBJECT);
    ASSERT(tok_getType() !== $PUNC_EQ, 'this struct does not allow init/defaults');

    return CANT_DESTRUCT;
  }

  function parsePatternAssignMaybe(lexerFlags, $tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, destructible, astProp) {
    ASSERT(parsePatternAssignMaybe.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astProp string', astProp);
    verifyDestructible(destructible);

    if (!isAnyAssignmentOp()) {
      return destructible;
    }

    if (tok_getType() !== $PUNC_EQ) {
      // - `[x] += y`
      // - `{x} *= y`
      return THROW_RANGE('Cannot compound-assign to an array literal', tok_getStart(), tok_getStop());
    }

    // Note: this might be something like `([x]=await y)=>z` which is illegal so we must propagate await/yield flags
    // - `[x]=y`
    // - `[x=y]=z`
    // - `[x=await y]=z`
    // - `[x=y]=await z`
    // - `[...{a = b} = c] = x`
    // - `{x} = y`

    if (hasAllFlags(destructible, CANT_DESTRUCT)) {
      // - `({a:(b) = c} = 1)`
      return THROW_RANGE('Tried to destructure something that is not destructible', tok_getStart(), tok_getStop());
    }

    // for example; `({a = b})` must destruct because of the shorthand. `[...a=b]` can't destruct because rest is only
    // legal on a simple identifier. So combining them you get `[...{a = b} = c]` where the inside must destruct and
    // the outside cannot. (there's a test)

    // If the object or array had MUST_DESTRUCT set, we have to reset this to MIGHT_DESTRUCT
    // For example, `({a = b})` and `[{a = b}]` have to be destructured because of the init, which
    // is not allowed for objlits (`let x = {y=z}` and `let x = {y=z} => d` are errors while
    // `let x = {y=z} = d` and `let x = ({y=z}) => d` and `let x = ({y=z}=e) => d` are valid)
    // but make sure the assign flag is retained (`([x.y]=z) => z` is an error!)

    // This is an assignment, so if the lhs was a MUST_DESTRUCT pattern then we can drop that flag now
    // Also remove the piggy because the proto rule does not apply for destructuring assignments
    // [v]: `result = [...{ x = await }] = y;`
    // [v]: `async r => result = [...{ x = await x }] = y;`
    // [v]: `result = [...{ x = yield }] = y;`
    // [v]: `function* g() {   [...{ x = yield }] = y   }`
    // [v]: `([{x = y}] = z)`
    // [v]: `[{x = y}] = z`
    // [v]: `foo({c=3} = {})`
    // [v]: `async({c=3} = {})`
    // [v]: `yield({c=3} = {})`
    // [v]: `log({foo: [bar]} = obj);`
    // [v]: `({a:(b) = c} = 1)`
    // [v]: `for ({x} = z;;);`
    // [v]: `({...[].x} = x);`
    // [x]: `x = {__proto__: a, __proto__: b} = y`

    ASSERT(hasNoFlag(destructible, PIGGY_BACK_WAS_PROTO), 'by the time this is called the proto piggy is already checked and infiltrated');
    destructible = sansFlag(destructible, MUST_DESTRUCT);

    // the array MUST now be a pattern. Does not need to be an arrow.
    // the outer-most assignment is an expression, the inner assignments become patterns too.
    AST_destruct(astProp);
    AST_wrapClosedCustom(astProp, {
      type: 'AssignmentExpression',
      loc: undefined,
      left: undefined,
      operator: '=',
      right: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart('=', lexerFlags); // a forward slash after = has to be a division
    // pick up the flags from assignable and put them in destructible
    // - `({x} = await bar) => {}`
    // - `async function a(){     ({r} = await bar) => {}     }`
    // - `({x} = yield) => {}`
    // - `function *f(){ ({x} = yield) => {} }`
    destructible |= parseExpression(lexerFlags, 'right');
    AST_close($tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, 'AssignmentExpression');

    return destructible;
  }

  function parseClassDeclaration(lexerFlags, scoop, optionalIdent, isLabelled, fdState, astProp) {
    ASSERT(arguments.length === parseClassDeclaration.length, 'expecting all args');
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');

    // class x {}
    // ^
    // class x extends <lhs expr> {}
    // class x {;}
    // class x {[static] <method>[]}
    // export class x {}
    // export class {}

    let originalOuterLexerFlags = lexerFlags; // We'll need this for, for example: `class x{} 01`

    let $tp_class_line = tok_getLine();
    let $tp_class_column = tok_getColumn();
    let $tp_class_start = tok_getStart();
    let $tp_class_stop = tok_getStop();

    if (isLabelled === IS_LABELLED || fdState === FDS_ILLEGAL || fdState === FDS_IFELSE) {
      return THROW_RANGE('Cannot parse a class declaration here, only expecting statements here', $tp_class_start, $tp_class_stop);
    }

    // _all_ bits of a class decl/expr are strict
    lexerFlags = sansFlag(lexerFlags | LF_STRICT_MODE, LF_IN_FOR_LHS | LF_IN_TEMPLATE | LF_NO_ASI);

    ASSERT_skipToIdentCurlyOpen($ID_class, lexerFlags);
    AST_open(astProp, {
      type: 'ClassDeclaration',
      loc: undefined,
      id: undefined,
      superClass: undefined,
      body: undefined,
    });

    let $tp_name_canon = parseClassId(lexerFlags, optionalIdent, scoop);

    _parseClass(lexerFlags, originalOuterLexerFlags, IS_STATEMENT);

    AST_close($tp_class_start, $tp_class_line, $tp_class_column, 'ClassDeclaration');

    return $tp_name_canon; // used if export
  }
  function parseClassExpression(lexerFlags, $tp_class_start, $tp_class_line, $tp_class_column, astProp) {
    ASSERT(arguments.length === parseClassExpression.length, 'expecting all args');
    // x = class x {}
    //           ^
    // x = class {}
    //           ^
    // x = class x extends <lhs expr> {}
    // x = class x {;}
    // x = class x {[static] <method>[]}

    let originalOuterLexerFlags = lexerFlags; // We'll need this for, for example: `class x{} 01`

    // _all_ bits of a class decl/expr are strict
    lexerFlags = sansFlag(lexerFlags | LF_STRICT_MODE, LF_IN_FOR_LHS | LF_IN_TEMPLATE | LF_NO_ASI);

    AST_open(astProp, {
      type: 'ClassExpression',
      loc: undefined,
      id: undefined,
      superClass: undefined,
      body: undefined,
    });

    // While extends and computed method keys can reference the class expression lexical bound id, they can't
    // overwrite it, so there's no need to record/track it
    parseClassId(lexerFlags, IDENT_OPTIONAL, DO_NOT_BIND);

    let assignable = _parseClass(lexerFlags, originalOuterLexerFlags, IS_EXPRESSION);
    AST_close($tp_class_start, $tp_class_line, $tp_class_column, 'ClassExpression');

    // The `await/yield` flags only describe the `extends` part. Additionally the class as a whole is not assignable.
    return setNotAssignable(assignable);
  }
  function parseClassId(lexerFlags, optionalIdent, scoop) {
    ASSERT(parseClassId.length === arguments.length, 'arg count');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'should be set by caller');

    let $tp_bindingName_canon = '';

    // note: default exports has optional ident but should still not skip `extends` here
    // but it is not a valid class name anyways (which is superseded by a generic keyword check)
    if (isIdentToken(tok_getType()) && tok_getType() !== $ID_extends) {
      let $tp_className_type = tok_getType();
      let $tp_className_start = tok_getStart();
      let $tp_className_stop = tok_getStop();
      let $tp_className_canon = tok_getCanoN();

      // The class name is to be considered a `const` inside the class, but a `let` outside of the class
      // https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation
      // > If hasNameProperty is false, perform SetFunctionName(value, className).
      // https://tc39.github.io/ecma262/#sec-initializeboundname
      // > Perform ? InitializeBoundName(className, value, env).
      // > Perform env.InitializeBinding(name, value).
      // https://tc39.github.io/ecma262/#table-15
      // > InitializeBinding(N, V) : Set the value of an already existing but uninitialized binding in an Environment
      //   Record. The String value N is the text of the bound name. V is the value for the binding and is a value of
      //   any ECMAScript language type.
      // eg: it is a `let` binding in outer scope and a `const` binding in inner scope...
      fatalBindingIdentCheck($tp_className_type, $tp_className_start, $tp_className_stop, $tp_className_canon, BINDING_TYPE_CLASS, lexerFlags);
      $tp_bindingName_canon = $tp_className_canon;
      SCOPE_addLexBinding(scoop, $tp_className_start, $tp_className_stop, $tp_bindingName_canon, BINDING_TYPE_CLASS, FDS_ILLEGAL);

      let $tp_id_line = tok_getLine();
      let $tp_id_column = tok_getColumn();
      let $tp_id_start = tok_getStart();
      let $tp_id_stop = tok_getStop();
      let $tp_id_canon = tok_getCanoN();

      ASSERT_skipToIdentCurlyOpen($G_IDENT, lexerFlags); // TODO: this could explicitly check for `extends` but I think this is fine
      AST_setIdent('id', $tp_id_start, $tp_id_stop, $tp_id_line, $tp_id_column, $tp_id_canon);
    }
    else if (optionalIdent === IDENT_REQUIRED) {
      //  '`export class extends x {}` is the only valid class decl without name');
      return THROW_RANGE('Class decl missing required ident, `extends` is not a valid variable name', tok_getStart(), tok_getStop());
    }
    else {
      // - `x = class {}`                // expression
      // - `export default class {}`     // default exports
      AST_set('id', null);
    }

    return $tp_bindingName_canon;
  }
  function _parseClass(outerLexerFlags, originalOuterLexerFlags, isExpression) {
    ASSERT(arguments.length === _parseClass.length, 'expecting all args');
    ASSERT(hasAllFlags(outerLexerFlags, LF_STRICT_MODE), 'should be set by caller');
    ASSERT(typeof originalOuterLexerFlags === 'number', 'originalOuterLexerFlags number');

    // Note: all class code is always strict mode implicitly (explicitly mentioned by 10.2.1, this includes extends)
    // Note: methods inside classes can access super properties
    // Note: `super()` is only valid in the constructor a class that uses `extends` (resets when nesting but after `extends`)

    let assignable = ASSIGNABLE_UNDETERMINED; // only relevant to propagate the `extends` expression

    // Separate inner from outer because the error is different if encountering yield/await without an async/gen context
    // Computed method key names can also not access super, unless the outer context is a method, too
    // The constructor flag is kept for outer because it still applies to computed key expressions
    let innerLexerFlags = sansFlag(outerLexerFlags, LF_IN_CONSTRUCTOR);

    if (isIdentToken(tok_getType()) && tok_getType() === $ID_extends) {
      // parseExtends, parseClassExtends, parseHeritage, parseClassHeritage
      // The spec calls this the "ClassHeritage" production. It is a leftHandSide expression (!), which is a call or new
      // expression, so certain things are can't happen (like await).
      // Note: the extends arg uses the outer lexer flags (yield/await state is propagated in the grammar), still strict
      ASSERT_skipToExpressionStart($ID_extends, outerLexerFlags);
      // - `class x extends {} {}`             is valid so we can't just scan for `{` and throw a nice error
      // - `async function f(fail = class y extends (await f) {}){}`  (should be an error...?)
      // - `class x extends ()=>{} {}`         error because the extends cannot be an arrow
      // - `class x extends ()=>{} 1`          error because the extends cannot be an arrow

      // See testcases/classes/extending/lefthandside/autogen.md for details. Or follow the leftHandSideExpression trail
      ASSERT(hasAllFlags(outerLexerFlags, LF_STRICT_MODE), 'make sure extends expr is parsed in strict mode');
      assignable = parseValue(outerLexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, ONLY_LHSE,'superClass');
      // don't set LF_SUPER_CALL before parsing the extending value
      // Note that computed props will not get this state from the current class (but potentially from an outer class)
      innerLexerFlags |= LF_SUPER_CALL; // can do `super()` because this class extends another class
    }
    else {
      AST_set('superClass', null);
      innerLexerFlags = sansFlag(innerLexerFlags, LF_SUPER_CALL);
    }

    if (tok_getType() !== $PUNC_CURLY_OPEN) {
      return THROW_RANGE('Expected the opening curly `{` of a class body, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    // _now_ enable super props, super call is already set up correctly
    // Note that computed props will not get this state from the current class (but potentially from an outer class)
    innerLexerFlags |= LF_SUPER_PROP;

    // note: generator and async state is not reset because computed method names still use the outer state
    // Note: this `assignable` is relevant for passing back await/yield flags
    assignable |= parseClassBody(innerLexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, 'body');

    return assignable;
  }
  function parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, astProp) {
    ASSERT(parseClassBody.length === arguments.length, 'expecting all args');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'should be set by caller');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_CONSTRUCTOR), 'should be unset by caller');
    ASSERT(typeof originalOuterLexerFlags === 'number', 'originalOuterLexerFlags number');
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'must have asserted to be at the opening curly of the class body');

    let $tp_curly_line = tok_getLine();
    let $tp_curly_column = tok_getColumn();
    let $tp_curly_start = tok_getStart();

    AST_open(astProp, {
      type: 'ClassBody',
      loc: undefined,
      body: [],
    });
    let assignable = _parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, 'body');
    AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column, 'ClassBody');
    // Note: returning `assignable` is relevant for passing back await/yield flags that could occur in computed key exprs
    return assignable;
  }
  function _parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, astProp) {
    ASSERT(_parseClassBody.length === arguments.length, 'arg count');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'should be set by caller');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_CONSTRUCTOR), 'should be unset by caller');
    ASSERT(typeof originalOuterLexerFlags === 'number', 'originalOuterLexerFlags number');
    ASSERT(tok_getType() === $PUNC_CURLY_OPEN, 'must have asserted to be at the opening curly of the class body');
    // parse one method of a class body

    let destructibleForPiggies = CANT_DESTRUCT; // relevant for computed key exprs

    // - `(class {})`
    //           ^
    // - `(class = x)`
    //           ^
    ASSERT_skipAny($PUNC_CURLY_OPEN, lexerFlags);
    while (tok_getType() === $PUNC_SEMI) {
      ASSERT_skipAny(';', lexerFlags);
    }

    // We must throw an error if a constructor was declared more than once, canonical, string keys included
    // We must throw an error if any static method is called "prototype", canonical, string keys included
    // Other keys can occur more than once without error

    let hasConstructor = false; // must throw if more than one plain constructor was found
    while (tok_getType() !== $PUNC_CURLY_CLOSE) {
      // note: generator and async state is not reset because computed method names still use the outer class state

      let $tp_memberStart_start = tok_getStart();
      let $tp_memberStart_stop = tok_getStop();

      let destructNow = parseClassMethod(lexerFlags, outerLexerFlags, astProp);
      if (hasAnyFlag(destructNow, PIGGY_BACK_WAS_CONSTRUCTOR)) {
        if (hasConstructor) {
          // TODO: we can juggle this "has constructor" state into the class parsers and throw there with a better loc
          return THROW_RANGE('Classes may only have one constructor', $tp_memberStart_start, $tp_memberStart_stop); // Pretty sure this loc is always the "constructor" ident/string, here
        }
        hasConstructor = true;
        destructNow = sansFlag(destructNow, PIGGY_BACK_WAS_CONSTRUCTOR); // not sure if this is important at all
      }
      destructibleForPiggies |= destructNow;

      while (tok_getType() === $PUNC_SEMI) {
        ASSERT_skipAny(';', lexerFlags);
      }
    }

    // Note: this uses the lexerFlags as they were when parsing the `class` keyword. This keeps `no-in`, `strict-mode`,
    // and `template` flags in tact without further concern. We must parse them as such when parsing the closing `}`.
    if (isExpression === IS_EXPRESSION) {
      // - `(class x {} / foo)`
      // - `${class x{}}`
      ASSERT(tok_getType() === $PUNC_CURLY_CLOSE, 'at the time of writing, the loop above had no abnormal way of exiting so the currtok has to be a curly close here when it reached this point');
      ASSERT_skipDiv($PUNC_CURLY_CLOSE, originalOuterLexerFlags);
    } else {
      // - `class x {} /foo/`
      // - `class x {} 06`
      ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, originalOuterLexerFlags);
    }

    // note: generator and async state is not reset because computed method names still use the outer state
    // Note: this `destructible` is only relevant for passing back piggies

    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    // - `(fail = class A {[await](){}; "x"(){}}) => {}`
    // - `function *f(){  class x{[yield foo](a){}}  }`

    return destructibleForPiggies;
  }
  function parseClassMethod(lexerFlags, outerLexerFlags, astProp) {
    // parseProperty parseMethod
    ASSERT(parseClassMethod.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'right?');

    // - `class x {ident(){}}`
    // - `class x {'foo'(){}}`        (or double quotes)
    // - `class x {200(){}}`          (could also be .5)
    // - `class x {[expr](){}}`       (expr is parsed with lexer state from before class body (!))
    // In the following, "key" can be substituted with any of the four cases above
    // - `class x {get key(){}}`
    // - `class x {set key(y){}}`
    // - `class x {*key(){}}`
    // - `class x {async key(){}}`
    // - `class x {async *key(){}}`
    // - `class x {static get key(){}}`
    // - `class x {static set key(y){}}`
    // - `class x {static *key(){}}`
    // - `class x {static async key(){}}`
    // - `class x {static async *key(){}}`
    // Special cases
    // - `class x {constructor(){}}`        (proper constructor, can only occur once)
    // - `class x {static constructor(){}}` (NOT a constructor, but valid)
    // - `class x {[constructor](){}}`      (NOT a constructor, but valid)
    // - `class x {get constructor(){}}`    (illegal, constructors can not have any of the get/set/async/* modifiers)
    // - `class x {static(){}}`             (method names are not susceptible to keyword restrictions)
    // - `class x {static static(){}}`      (method names are not susceptible to keyword restrictions)
    // - `class x {static get constructor(){}}`    (ok because static members are not real constructors)

    let $tp_methodStart_line = tok_getLine();
    let $tp_methodStart_column = tok_getColumn();
    let $tp_methodStart_start = tok_getStart();

    let isStatic = false;

    if (tok_getType() === $ID_static) {
      // In the following cases, "key" can be substituted with any of the four keys (ident, string, number, computed)
      // - `class x {static get key(){}}`
      //             ^
      // - `class x {static set key(y){}}`
      // - `class x {static *key(){}}`
      // - `class x {static async key(){}}`
      // - `class x {static async *key(){}}`
      // - `class x {static constructor(){}}`
      // - `class x {static(){}}`
      // - `class x {static static(){}}`
      //             ^
      // - `class x {static get constructor(){}}`

      isStatic = true;

      let $tp_static_line = tok_getLine();
      let $tp_static_column = tok_getColumn();
      let $tp_static_start = tok_getStart();
      let $tp_static_stop = tok_getStop();
      let $tp_static_canon = tok_getCanoN();

      // = `class x { static / foo(){} }`
      ASSERT_skipAny($ID_static, lexerFlags);

      if (tok_getType() === $PUNC_PAREN_OPEN) {
        // The `static` ident here is the name of a method, not a modifier
        // - `class x {static(){}}`
        //                   ^
        return _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, false, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, $tp_static_start, $tp_static_stop, $tp_static_line, $tp_static_column, $tp_static_canon, astProp);
      }
    }

    // let destructible = MIGHT_DESTRUCT;
    // let assignable = ASSIGNABLE_UNDETERMINED; // propagate the await/yield state flags, if any (because `(x={a:await f})=>x` should be an error)

    let $tp_afterStaticMaybe_type = tok_getType();

    if (isIdentToken($tp_afterStaticMaybe_type)) {
      ASSERT(isStatic || $tp_afterStaticMaybe_type !== $ID_static, 'methods named "static" are caught elsewhere');
      return parseClassMethodFromIdent(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, astProp);
    }

    if (isNumberStringToken($tp_afterStaticMaybe_type)) {
      // property names can also be strings and numbers but these cannot be shorthanded
      // number/string keys can still destructure just fine (`({"foo": x} = y)`)
      // - `class x {"abc"(){}};`
      // - `class x {15(){}};`

      return parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, astProp);
    }

    if ($tp_afterStaticMaybe_type === $PUNC_BRACKET_OPEN) {
      // Computed method key
      // - `class x {[foo](){}}`

      return parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, astProp);
    }

    if ($tp_afterStaticMaybe_type === $PUNC_STAR) {
      // - `class x {*ident(){}}`
      //             ^
      // - `class x {*"str"(){}}`
      // - `class x {*15(){}}`
      // - `class x {*[expr](){}}`

      ASSERT_skipToIdentStringNumberSquareOpen('*', lexerFlags);

      if (isIdentToken(tok_getType())) {
        // - `class x {*ident(){}}`
        //              ^
        // - `class x {*ident(){}}`
        // - `class x {*get(){}}`       // ok (not a getter!)
        // - `class x {*set(){}}`       // ok (not a setter!)
        // - `class x {*async(){}}`     // NOT an async generator! it's a generatr

        return parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $UNTYPED, $PUNC_STAR, $UNTYPED, $UNTYPED, astProp);
      }

      if (isNumberStringToken(tok_getType())) {
        // - `({*"str"(){}})`
        // - `({*15(){}})`
        return parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $UNTYPED, $PUNC_STAR, $UNTYPED, $UNTYPED, astProp);
      }

      if (tok_getType() === $PUNC_BRACKET_OPEN) {
        // - `{*[expr](){}} = x`
        return parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $UNTYPED, $PUNC_STAR, $UNTYPED, $UNTYPED, astProp);
      }

      return THROW_RANGE('Invalid objlit key character after generator star', $tp_methodStart_line, tok_getStop());
    }

    ASSERT($tp_afterStaticMaybe_type !== $PUNC_SEMI, 'Leading semis are parsed before this function is called, trailing semis are parsed immediately, so we shouldnt see a semi here');
    // - `class x {<?>`
    return THROW_RANGE('Unexpected token, wanted to parse a start of a property in an class literal/pattern', $tp_methodStart_line, tok_getStop());
  }
  function parseClassMethodFromIdent(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, astProp) {
    ASSERT(parseClassMethodFromIdent.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');
    ASSERT(isIdentToken(tok_getType()));

    // - `class x {key(){}}`
    //             ^^^
    // - `class x {async key(){}}`
    //             ^^^^^
    // - `class x {get key(){}}`
    //             ^^^
    // - `class x {set key(x){}}`
    //             ^^^

    let $tp_ident_type = tok_getType();
    let $tp_ident_line = tok_getLine();
    let $tp_ident_column = tok_getColumn();
    let $tp_ident_start = tok_getStart();
    let $tp_ident_stop = tok_getStop();
    let $tp_ident_canon = tok_getCanoN();

    ASSERT_skipAny($G_IDENT, lexerFlags);

    if (tok_getType() === $PUNC_PAREN_OPEN) {
      // Simple method shorthand
      // - `class x {ident(){}}`
      //                  ^
      return _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $UNTYPED, $UNTYPED, $UNTYPED, $UNTYPED, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, astProp);
    }

    // The "key" in the next is one of ident, string, number, or computed property
    // - `class x {key(){}}`
    //                  ^
    // - `class x {get key(){}}`
    //                 ^
    // - `class x {set key(){}}`
    // - `class x {async key(){}}`
    // - `class x {async *key(){}}`
    //                   ^
    // - `class x {static ident(){}}`
    //                         ^
    // - `class x {static get key(){}}`
    //                        ^
    // - `class x {static set key(){}}`
    // - `class x {static async key(){}}`
    // - `class x {static async *key(){}}`

    // The syntactic order of modifiers is
    // [export [default]] class [ident] { [[async] [*]|get|set] key(){} }

    let $tp_async_type = $UNTYPED;
    let $tp_star_type = $UNTYPED;
    let $tp_get_type = $UNTYPED;
    let $tp_set_type = $UNTYPED;

    switch ($tp_ident_type) {
      case $ID_get:
        // The next token may now only be the key
        // - `class x {get key(){}}`
        //                 ^
        $tp_get_type = $ID_get;
        break;
      case $ID_set:
        // The next token may now only be the key
        // - `class x {get key(){}}`
        //                 ^
        $tp_set_type = $ID_set;
        break;
      case $ID_async:
        // - `class x {async key(){}})
        //                   ^
        // - `class x {async *key(){}})
        //                   ^

        if (!allowAsyncFunctions) {
          return THROW_RANGE('Async methods are not supported in the currently targeted language version', $tp_methodStart_start, tok_getStop());
        }

        if (tok_getNlwas() === true) {
          // - `class x {async \n key(){}}`
          //              ^
          // Always an error due to async being a restricted production
          // Note that `{async(){}}` is legal so we must check the current token
          return THROW_RANGE('Async methods are a restricted production and cannot have a newline following it', $tp_methodStart_line, tok_getStart());
        }

        $tp_async_type = $ID_async;

        // Might be followed by star
        if (tok_getType() === $PUNC_STAR) {
          // - `class x {async *key(){}}`
          //                   ^

          if (!allowAsyncGenerators) {
            return THROW_RANGE('Async generator methods are not supported in the currently targeted language version', $tp_methodStart_start, tok_getStop());
          }

          $tp_star_type = $PUNC_STAR;

          ASSERT_skipToIdentStringNumberSquareOpen('*', lexerFlags);
        }
        break;
      default:
        // There aren't any other ident modifiers so this must be an error
        return THROW_RANGE('Either the current modifier is unknown or the input that followed was unexpected', tok_getStart(), tok_getStop());
    }

    // The curtok must be key and is unknown. There are four types of key; ident, number, string, and computed
    // - `class x {get ident(){}}`
    //                 ^
    // - `class x {get "foo"(){}}`
    //                 ^
    // - `class x {get 300(){}}`
    //                 ^
    // - `class x {get [expr](){}}`
    //                 ^

    // - `class x {static get key(){}}`
    //                        ^
    // - `class x {set key(ident){}}`
    // - `class x {static set key(ident){}}`
    // - `class x {async key(){}}`
    // - `class x {static async key(){}}`

    if (tok_getType() === $PUNC_BRACKET_OPEN) {
      return parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
    }

    if (isNumberStringToken(tok_getType())) {
      // - `class x {get 300(){}}`
      //                 ^^^
      // - `class x {async * "foo"(){}}`
      //                     ^^^^^
      return parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
    }

    if (isIdentToken(tok_getType())) {
      return parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
    }

    // Stuff like incompatible modifiers, obj lit syntax, invalid tokens, etc
    return THROW_RANGE('Expected to parse the modified key of a class method but could not parse one', tok_getStart(), tok_getStop());
  }
  function parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
    ASSERT(parseClassMethodIdentKey.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(tok_getType()), 'current is ident');

    let $tp_key_line = tok_getLine();
    let $tp_key_column = tok_getColumn();
    let $tp_key_start = tok_getStart();
    let $tp_key_stop = tok_getStop();
    let $tp_key_canon = tok_getCanoN(); // Note: constructor is tested elsewhere

    ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);
    return _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, $tp_key_start, $tp_key_stop, $tp_key_line, $tp_key_column, $tp_key_canon, astProp);
  }
  function _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, $tp_key_start, $tp_key_stop, $tp_key_line, $tp_key_column, $tp_key_canon, astProp) {
    ASSERT(_parseClassMethodIdentKey.length === arguments.length, 'arg count');

    AST_setIdent(astProp, $tp_key_start, $tp_key_stop, $tp_key_line, $tp_key_column, $tp_key_canon);

    if (isStatic && $tp_key_canon === 'prototype') {
      return THROW_RANGE('Static class methods can not be called `prototype`', $tp_methodStart_line, tok_getStop());
    }

    let kind = 'method'; // a literal key can still be a proper constructor
    let isClassConstructor = NOT_CONSTRUCTOR;

    if (
      // A proper constructor is not static
      !isStatic &&
      // https://tc39.github.io/ecma262/#sec-identifier-names-static-semantics-stringvalue
      // Note: the "constructor" check is determined by the "StringValue" of ident, which is the canonical value
      $tp_key_canon === 'constructor'
    ) {
      // This is a proper class constructor
      isClassConstructor = IS_CONSTRUCTOR;
      kind = 'constructor';

      // Constructors can't have get/set/*/async but can be static
      if ($tp_async_type === $ID_async) {
        return THROW_RANGE('Class constructors can not be async', $tp_methodStart_line, tok_getStop());
      }
      if ($tp_star_type === $PUNC_STAR) {
        return THROW_RANGE('Class constructors can not be generators', $tp_methodStart_line, tok_getStop());
      }
      if ($tp_get_type === $ID_get) {
        return THROW_RANGE('Class constructors can not be getters', $tp_methodStart_line, tok_getStop());
      }
      if ($tp_set_type === $ID_set) {
        return THROW_RANGE('Class constructors can not be setters', $tp_methodStart_line, tok_getStop());
      }
    } else if ($tp_get_type === $ID_get) {
      // - `class A {get foo(){}}`
      kind = 'get';
    } else if ($tp_set_type === $ID_set) {
      // - `class A {set foo(x){}}`
      kind = 'set';
    } else {
      // [v]: `class x { foo(){ }}`
    }

    // - `class A {async get foo(){}}`
    return parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, isClassConstructor, false, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
  }
  function parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
    ASSERT(parseClassMethodLiteralKey.length === arguments.length, 'arg count');
    ASSERT(isNumberStringToken(tok_getType()));

    let $tp_lit_type = tok_getType();
    let $tp_lit_line = tok_getLine();
    let $tp_lit_column = tok_getColumn();
    let $tp_lit_start = tok_getStart();
    let $tp_lit_stop = tok_getStop();
    let $tp_lit_canon = tok_getCanoN();

    // This will check for numbers as well but those can never pass a "prototpype" check and are so uncommon I dun care
    if (isStatic && $tp_lit_canon === 'prototype') {
      return THROW_RANGE('Static class methods can not be called `prototype`', $tp_methodStart_line, tok_getStop());
    }

    let kind = 'method'; // a literal key can still be a proper constructor
    let isClassConstructor = NOT_CONSTRUCTOR;

    // This will check for numbers as well but those can never pass a "constructor" check and are so uncommon I dun care
    if (
      // A proper constructor is not static
      !isStatic &&
      // A proper constructor is not static
      // https://tc39.github.io/ecma262/#sec-identifier-names-static-semantics-stringvalue
      // Note: the "constructor" check is determined by the "StringValue" of ident, which is the canonical value
      // > LiteralPropertyName: StringLiteral
      // >   Return the String value whose code units are the SV of the StringLiteral.
      // In other words; `class x{"constructor"(){}}` is also a proper constructor
      // https://tc39.github.io/ecma262/#sec-string-literals-static-semantics-stringvalue
      // And for strings it is the unquoted canonical value of the string (so "constructor" and 'constructor' + escapes)
      $tp_lit_canon === 'constructor'
    ) {
      // This is a proper class constructor
      isClassConstructor = IS_CONSTRUCTOR;
      kind = 'constructor';

      // Constructors can't have get/set/*/async but can be static
      if ($tp_async_type === $ID_async) {
        return THROW_RANGE('Class constructors can not be async', $tp_methodStart_line, tok_getStop());
      }
      if ($tp_star_type === $PUNC_STAR) {
        return THROW_RANGE('Class constructors can not be generators', $tp_methodStart_line, tok_getStop());
      }
      if ($tp_get_type === $ID_get) {
        return THROW_RANGE('Class constructors can not be getters', $tp_methodStart_line, tok_getStop());
      }
      if ($tp_set_type === $ID_set) {
        return THROW_RANGE('Class constructors can not be setters', $tp_methodStart_line, tok_getStop());
      }
    } else if ($tp_get_type === $ID_get) {
      // - `class A {get "x"(){}}`
      kind = 'get';
    } else if ($tp_set_type === $ID_set) {
      // - `class A {set 43(x){}}`
      kind = 'set';
    } else {
      // [v]: `class x { "y"(){ }}`
    }

    ASSERT_skipToParenOpenOrDie(tok_sliceInput($tp_lit_start, $tp_lit_stop), lexerFlags);

    AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon);

    // [v]: `class A {"x"(){}}`
    // [v]: `class A {1(){}}`
    // [v]: `class A {static 2(){}}`
    // [v]: `class A {async 3(){}}`
    // [v]: `class A {*4(){}}`
    // [v]: `class A {async * 34(){}}`
    // [v]: `class A {get 5(){}}`
    // [v]: `class A {static get 6(){}}`
    // [v]: `class A {set 9(x){}}`
    // [v]: `class A {static set 10(x){}}`
    return  parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, isClassConstructor, false, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
  }
  function parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
    // skip computed key part first because we need to figure out whether we're parsing a method
    ASSERT(parseClassMethodComputedKey.length === arguments.length, 'arg count');

    // - `class {[foo](){}}`
    //           ^

    ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);

    // Note: the expression of computed keys of class methods are parsed with the context before the class
    // So the context is not guaranteed to be strict, async, or anything else.
    // We have to propagate the piggies in case the parent turns out to be a function param / default.
    let assignable_forPiggies = parseExpression(outerLexerFlags, astProp);

    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    // - `(fail = class A {[await](){}; "x"(){}}) => {}`
    // - `function *f(){  class x{[yield foo](a){}}  }`
    // - `(fail = class A {[await](){}; "x"(){}}) => {}`
    if (tok_getType() !== $PUNC_BRACKET_CLOSE) {
      return THROW_RANGE('Missing right square bracket for computed member, found `' + tok_sliceInput(tok_getStart(), tok_getStop()) + '` instead', tok_getStart(), tok_getStop());
    }

    ASSERT_skipToParenOpenOrDie($PUNC_BRACKET_CLOSE, lexerFlags);

    let kind = 'method';

    if ($tp_get_type === $ID_get) {
      // - `class A {get [y](){}}`
      kind = 'get';
    } else if ($tp_set_type === $ID_set) {
      // - `class A {set [y](x){}}`
      kind = 'set';
    } else {
      // [v]: `class x { [y](){ }}`
    }

    // The piggies for parsing the function after the key are not relevant (constructor / arrowness / await / yield)
    // - `{[foo](){}}`
    //          ^
    // - `class {[foo](){}}`
    // - `class x {[x]z){}}`
    // - `async function f(){  (fail = class A {[x](y=await z){}}) => {}  }`        (throws inside the next call)
    parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, NOT_CONSTRUCTOR, true, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);

    // Note: await/yield piggies of the params affect the method, not the parent, and don't need propagation
    // We do need to propagate the await/yield piggies for the computed expression:
    // - `async function f(){ class c { [await x](){} } }`                                 // This is fine
    // - `async function f(){ let arrow = (param = class { [await x](){} }) => param; }`   // This is error
    return assignable_forPiggies;
  }
  function parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, isClassConstructor, isComputedKey, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
    ASSERT(parseClassMethodAfterKey.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'get token');
    ASSERT($tp_star_type === $UNTYPED || $tp_star_type === $PUNC_STAR, 'get token');
    ASSERT($tp_get_type === $UNTYPED || $tp_get_type === $ID_get, 'get token');
    ASSERT($tp_set_type === $UNTYPED || $tp_set_type === $ID_set, 'set token');
    ASSERT_VALID(tok_getType() === $PUNC_PAREN_OPEN, 'Should be at the start of the method parameter definition');

    let $tp_paren_line = tok_getLine();
    let $tp_paren_column = tok_getColumn();
    let $tp_paren_start = tok_getStart();

    // [x]: `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`

    if (babelCompat) {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_CLASS,
        loc: undefined,
        key: undefined,
        static: isStatic, // `class x {static foo(){}}`
        computed: isComputedKey, // `class x {[foo](){}}`
        async: undefined,
        generator: undefined,
        id: undefined,
        params: [],
        kind: kind, // method constructor get set
      }, 'key');
    } else {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_CLASS,
        loc: undefined,
        key: undefined,
        static: isStatic, // `class x {static foo(){}}`
        computed: isComputedKey, // `class x {[foo](){}}`
        kind: kind, // method constructor get set
        value: undefined,
      }, 'key');
    }

    // [v]: `class A {a(){}}`
    ASSERT(tok_getType() === $PUNC_PAREN_OPEN, 'these (non-assert) checks have already been applied at this point');
    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      NOT_FUNC_EXPR,
      IDENT_OPTIONAL,
      isClassConstructor,
      IS_METHOD,
      $tp_async_type,
      $tp_star_type,
      $tp_get_type,
      $tp_set_type,
      acornCompat ? $tp_paren_start : $tp_methodStart_start,
      acornCompat ? $tp_paren_line : $tp_methodStart_line,
      acornCompat ? $tp_paren_column : $tp_methodStart_column,
      FDS_ILLEGAL,
      'value'
    );

    AST_close($tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column, NODE_NAME_METHOD_CLASS);

    if (isClassConstructor === IS_CONSTRUCTOR) {
      // - `class A { constructor() { super() } })`
      // - `class A {"constructor"(){ super() }}`
      return PIGGY_BACK_WAS_CONSTRUCTOR;
    }
    return CANT_DESTRUCT;
  }

  function verifyDestructible(destructible) {
    ASSERT(verifyDestructible.length === arguments.length, 'arg count');
    ASSERT(typeof destructible === 'number', 'destructible num', destructible);

    if (hasAllFlags(destructible, CANT_DESTRUCT) && hasAllFlags(destructible, MUST_DESTRUCT)) {
      return THROW_RANGE('Found a part that cant destruct and a part that must destruct so it is not destructible', tok_getStart(), tok_getStop());
    }
  }
  function verifyDestructibleForBinding(destructible, bindingType) {
    ASSERT(verifyDestructibleForBinding.length === arguments.length, 'arg count');
    ASSERT(typeof destructible === 'number', 'destructible num', destructible);
    ASSERT_BINDING_TYPE(bindingType);

    if (hasAnyFlag(destructible, CANT_DESTRUCT)) {
      return THROW_RANGE('The binding pattern is not destructible', tok_getStart(), tok_getStop());
    }

    if (bindingType !== BINDING_TYPE_NONE && hasAnyFlag(destructible, DESTRUCT_ASSIGN_ONLY)) {
      return THROW_RANGE('This binding can not be used in function parameters because it is not destructible', tok_getStart(), tok_getStop());
    }
  }
  function parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_valueStart_start, $tp_valueStart_stop, $tp_valueStart_line, $tp_valueStart_column, assignable, destructible, closingPuncType, astProp) {
    ASSERT(parseOptionalDestructibleRestOfExpression.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astProp str', astProp);
    ASSERT(typeof assignable === 'number', 'assignable num', assignable);
    ASSERT(typeof destructible === 'number', 'destructible num', destructible);
    ASSERT([$PUNC_PAREN_CLOSE, $PUNC_CURLY_CLOSE, $PUNC_BRACKET_CLOSE].includes(closingPuncType), 'closingPuncType enum', closingPuncType);

    if (tok_getType() === $PUNC_COMMA || tok_getType() === closingPuncType) {
      // this means that the value itself had no tail and is destructible as long as it is assignable
      if (notAssignable(assignable)) destructible |= CANT_DESTRUCT;
    } else if (hasAllFlags(destructible, MUST_DESTRUCT)) {
      // TODO: can assignment patterns reach this?
      // [x]: `([{a=b}.x]) => x`
      // [x]: `({a: {a=b}.x}) => x`
      return THROW_RANGE('Found something that had to be a Pattern but had to parse more, which is an error', $tp_valueStart_start, tok_getStart());
    } else {
      assignable = parseValueTail(lexerFlags, $tp_valueStart_start, $tp_valueStart_line, $tp_valueStart_column, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
      // (If there is no tail the input assignable is returned...)
      if (isAssignable(assignable)) {
        // The destructibility of the whole expression solely depends on the tail
        // For example, `foo`, `foo.bar`, `foo().bar`, `{...x}[y]`, are all assignable and therefor assign-destructible
        destructible = sansFlag(destructible, CANT_DESTRUCT | DESTRUCT_ASSIGN_ONLY | MUST_DESTRUCT);
      } else {
        // This couldn't cause a valid pattern like `[a]` to become invalid just because it had no tail because
        // if there is no tail the input assignable is returned. So `[a+b]` remains non-assignable.
        destructible |= CANT_DESTRUCT;
      }

      let firstOpNotAssign = tok_getType() !== $PUNC_EQ;
      if (tok_getType() !== $PUNC_COMMA && tok_getType() !== closingPuncType) {
        // From here on out `assignable` is only used to track yield/await state for fringe cases
        assignable |= parseExpressionFromOp(lexerFlags, $tp_valueStart_start, $tp_valueStart_stop, $tp_valueStart_line, $tp_valueStart_column, assignable, astProp);
        if (firstOpNotAssign) {
          // If there was an op it won't be a (regular) assignment and it can't be destructible in any of those cases
          // - `x, [foo + y, bar] = doo;`
          destructible |= CANT_DESTRUCT;
        } else {
          // - `[x.y = a] = z`
        }
      } else if (firstOpNotAssign) {
        if (notAssignable(assignable)) {

          // [v]: `[...[x].map(y, z)];`
          // [x]: `[...[x].map(y, z)] = a;`
          // [x]: `({ident: {x}.join("")}) => x`
          // [v]: `({"x": [y].slice(0)})`
          // [x]: `({"x": [y].slice(0)} = x)`
          // [x]: `({"x": [y].slice(0)}) => x`

          // this is a binding with binary operator that is not just `=`
          // - if destructuring a binding, current path is not destructible
          // - if not assignable, also not destructible
          // - if next token is not the end then also not destructible (but assign is okay)
          destructible |= CANT_DESTRUCT;
        } else {
          // [v]: `[...{a: b.b}.d] = c`
          // [v]: `[...{a: b}.c] = []`
          // [v]: `[...[{a: b}.c]] = [];`
          // [v]: `[...[{prop: 1}.prop]] = []`
          destructible |= DESTRUCT_ASSIGN_ONLY;
        }
      }
    }

    // - `{ (x = [await x]) }`
    // - `async g => (x = [await y])`
    // - `function *g(){ (x = [yield y]) }`
    // - `{ (x = [yield y]) }`
    return copyPiggies(destructible, assignable);
  }
  function parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, $tp_async_type, exportedNames, exportedBindings, astProp) {
    // parseArrowableRest
    ASSERT(parseArrowableSpreadOrRest.length === arguments.length, 'want all args');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isAsync enum');
    ASSERT(tok_getType() === $PUNC_DOT_DOT_DOT, 'current is `...`');

    let $tp_spread_line = tok_getLine();
    let $tp_spread_column = tok_getColumn();
    let $tp_spread_start = tok_getStart();

    ASSERT_skipToExpressionStart('...', lexerFlags);

    if (tok_getType() === $PUNC_DOT_DOT_DOT) {
      return THROW_RANGE('Can not rest twice', $tp_spread_start, tok_getStop());
    }
    AST_open(astProp, {
      type: 'SpreadElement',
      loc: undefined,
      argument: undefined,
    });
    let destructible = _parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, $tp_async_type, $tp_spread_start, exportedNames, exportedBindings, 'argument');
    AST_close($tp_spread_start, $tp_spread_line, $tp_spread_column, 'SpreadElement');

    if (tok_getType() !== closingPuncType && tok_getType() !== $PUNC_COMMA) {
      return THROW_RANGE('Encountered invalid input after spread/rest argument', tok_getStart(), tok_getStop());
    }

    return destructible;
  }
  function _parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, $tp_async_type, $tt_spreadToken_start, exportedNames, exportedBindings, astProp) {
    ASSERT(_parseArrowableSpreadOrRest.length === arguments.length, 'arg count');
    ASSERT($tp_async_type === $UNTYPED || $tp_async_type === $ID_async, 'isAsync enum');
    ASSERT_BINDING_TYPE(bindingType);

    // returns CANT_DESTRUCT if the arg is not only an ident

    // - `[x, y, ...z]`
    // - `async (a, ...b) => a;`

    // Arrays:
    // https://tc39.github.io/ecma262/#prod-SpreadElement
    // can be any pattern

    // Objects:
    // https://tc39.github.io/ecma262/#prod-BindingRestProperty
    // can only be idents if bindingType is not NONE (same as array in assignment)

    // Bindings, Args, Destructurings: in no production is rest allowing an init:
    // var
    // https://tc39.github.io/ecma262/#prod-VariableStatement
    // https://tc39.github.io/ecma262/#prod-VariableDeclaration
    // https://tc39.github.io/ecma262/#prod-BindingPattern ->
    // let/const
    // https://tc39.github.io/ecma262/#prod-LexicalDeclaration
    // https://tc39.github.io/ecma262/#prod-LexicalBinding
    // https://tc39.github.io/ecma262/#prod-BindingPattern ->
    // binding destructuring:
    // https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern ->
    // https://tc39.github.io/ecma262/#prod-BindingRestElement
    // https://tc39.github.io/ecma262/#prod-BindingPattern ->
    // this is okay in functions:
    // https://tc39.github.io/ecma262/#prod-FunctionDeclaration
    // https://tc39.github.io/ecma262/#prod-FunctionRestParameter
    // https://tc39.github.io/ecma262/#prod-BindingRestElement
    // https://tc39.github.io/ecma262/#prod-BindingPattern ->
    // -> binding pattern:
    // https://tc39.github.io/ecma262/#prod-BindingPattern
    // this is either [] array or {} object wrapped with no further outer assignments (or anything)

    let $tp_argStart_line = tok_getLine();
    let $tp_argStart_column = tok_getColumn();
    let $tp_argStart_start = tok_getStart();
    let $tp_argStart_stop = tok_getStop();

    let destructible = MIGHT_DESTRUCT;
    let assignable = IS_ASSIGNABLE; // required for parsing the tail of the arg
    if (isIdentToken(tok_getType())) {
      // - `[...x];`
      // - `[...x/y];`
      // - `[...x, y];`       // cant destruct (array rest must be last)
      // - `[...this, y];`    // cant destruct (array rest must be last)
      // - `{...x};`
      // - `{...x/y};`
      // - `{...x, y};`       // cant destruct (obj rest must be last)
      // - `{...this, y};`    // cant destruct (obj rest must be last)

      // - `async(...x/y);`   // async call

      // basically three ways this can be followed up (not, arrow, assign)
      // - `[...x];`          // ok
      // - `{...x};`          // ok
      // - `([...x]) => y;`   // ok
      // - `({...x}) => y;`   // ok
      // - `[...x] = y;`      // ok ("destructuring assignment")
      // - `{...x} = y;`      // ok ("destructuring assignment")
      // - `[...this];`       // ok
      // - `{...this};`       // ok
      // - `[...this] = x;`   // bad
      // - `{...this} = x;`   // bad
      // - `([...this]) => x;`  // bad
      // - `({...this}) => x;`  // bad

      // - `[...new x];`      // ok, cannot destruct
      // - `{...new x};`      // ok, cannot destruct
      // - `[...new];`        // bad
      // - `{...new};`        // bad
      // - `[...(x)];`        // ok, not arrowable
      // - `{...(x)};`        // ok, not arrowable
      // - `[...(x,y)];`      // ok (!)
      // - `{...(x,y)};`      // ok, cannot destruct
      // - `[...x = x];`      // (valid but never destructible)
      // - `{...x = x};`      // (valid but never destructible)

      // rest can be a property with assignment destructuring (invalid for arrows/bindings)
      // - `({...a.x} = x);`
      // - `([...a.x] = x);`
      // - `({...a[x]} = x);`
      // - `([...a[x]] = x);`

      // don't update destructible here. assignment is handled at the end of this function (!)

      let $tp_ident_type = tok_getType();
      let $tp_ident_line = tok_getLine();
      let $tp_ident_column = tok_getColumn();
      let $tp_ident_start = tok_getStart();
      let $tp_ident_stop = tok_getStop();
      let $tp_ident_canon = tok_getCanoN();

      skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // will properly deal with div/rex cases
      let assignBefore = tok_getType() === $PUNC_EQ;
      let willBeSimple = tok_getType() === closingPuncType || tok_getType() === $PUNC_COMMA || assignBefore;
      if (willBeSimple) {
        let assignableOrErrorMsg = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
        ASSERT(typeof assignableOrErrorMsg === 'string', 'func should always return string');
        if (assignableOrErrorMsg.length !== 0) {
          // - `[...await] = obj`
          // - `[...this];`
          destructible |= CANT_DESTRUCT;
        }
      } else { // !willBeSimple
        // [x]: `function f({...a.b}){}`
        // [v]: `x = {...a + b}`
        // [v]: `([...x.y] = z)`
        // [x]: `([...x.y]) => z`
        // TODO: restore nice error when assign/arrow is found
        destructible |= DESTRUCT_ASSIGN_ONLY;
        // Can't _just_ throw here because the arrow may not be an arrow
        // THROW('The rest argument of an arrow or function must always be a simple ident without suffix');
      }
      assignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, ASSIGN_EXPR_IS_OK, astProp);
      ASSERT(!assignBefore || tok_getType() === $PUNC_EQ, 'parseValueAfterIdent should not consume the assignment');

      // [v]: `export let [...x] = y`
      //                       ^

      if (tok_getType() !== $PUNC_COMMA && tok_getType() !== closingPuncType) {
        // - `(...x + y) => x`
        //          ^
        // - `async (a, ...b=fail) => a;`
        //                  ^
        if (tok_getType() === $PUNC_EQ) {
          // [v]: `[...[{a: b}.c]] = [];`
          //                  ^
          // [x]: `async (a, ...b=fail) => a;`
          //                     ^
          // [v]: `[x, y, ...z = arr]`
          //                   ^
          if (notAssignable(assignable)) {
            // - `async (a, ...true=fail) => a;`
            return THROW_RANGE('Tried to assign to a value that was not assignable in arr/obj lit/patt', tok_getStart(), tok_getStop());
          }
        }
        // this will parse the assignment too
        // note: rest cannot have an initializer so any suffix invalidates destructuring
        destructible |= CANT_DESTRUCT;
        assignable = parseExpressionFromOp(lexerFlags, $tp_argStart_start, $tp_argStart_stop, $tp_argStart_line, $tp_argStart_column, assignable, astProp);
      }

      if (notAssignable(assignable)) {
        // `[...a+b]`
        destructible |= CANT_DESTRUCT;
      } else if (willBeSimple) {
        // Skip dupe check because it may end up not a binding

        // `[...foo] = bar`                (scoop&exports will be empty)
        // `let [...foo] = bar`            (exports will be empty)
        // `export let [...foo] = bar`     (will have scoop & exports)
        // `[...(foo)] = bar`              (noop-group edge case)
        // (if this isn't part of an exports declaration then the exportNames/Bindings array is null)

        // If this isn't a binding, this is a noop
        // If this is inside a group, this is a noop if it turns out not to be an arrow
        // TODO: add test case for catch shadow
        SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
        // If this is not an export declaration, the calls below will be noops
        // TODO: add test case for the exports because that wasnt here before (or assert this cant be reached from an export)
        addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
        addBindingToExports(exportedBindings, $tp_ident_canon);
      } else {
        // `[...a.b]=c`
        // `let [...a.b]=c`
        // `for ([...a.b] in c) d`
        // `for (let [...a.b] in c) d`
        // `try {} catch ([...a.b]) {}`
        // `[...a.b] = c`
        // `([...a.b] = c)`
        // `([...a.b]) => c`
        destructible |= DESTRUCT_ASSIGN_ONLY;
      }
    }
    else if (tok_getType() === $PUNC_BRACKET_OPEN) {
      // - `(...[x]) => x`
      // - `[...[x]]`
      // - `[...[x]] = y`
      // - `([...[x]]) => x`
      // - `[...[x]/y]`
      // - `[...[x].foo] = x`
      // - `[...[x]=y]`             - yes (spread can be assignment, the assignment isn't default/init)
      // - `[...[x]=y] = z`         - no (rest cannot have default)
      // Note: rest param can be on arr/obj
      // - `(...[x,y]) => {}`
      // - `([...[x,y]]) => {}`
      // rest can be a property with assignment destructuring (invalid for arrows/bindings)
      // - `({...[]} = x);`        // bad (rest arg must be simple)
      // - `({...[].x} = x);`
      // - `([...[].x] = x);`
      // - `({...[][x]} = x);`
      // - `([...[][x]] = x);`
      let nowDestruct = parseArrayLiteralPattern(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      if (tok_getType() !== $PUNC_EQ && tok_getType() !== closingPuncType && tok_getType() !== $PUNC_COMMA) {
        // - `({...[].x} = x);`
        destructible = parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_argStart_start, $tp_argStart_stop, $tp_argStart_line, $tp_argStart_column, assignable, nowDestruct, closingPuncType, astProp);
      } else {
        // The rest arg of an _object_ pattern can only be a simple assignment target. The rest of an array pattern
        // has more freedom. If there is no tail for obj rest then this not destructible.
        // - `({ ...[x] }) => {}`
        // - `{...[] = c}`
        // - `[...[] = c]`
        if (closingPuncType === $PUNC_CURLY_CLOSE && tok_getType() !== $PUNC_EQ) {
          destructible |= nowDestruct | CANT_DESTRUCT;
        } else {
          destructible |= nowDestruct;
        }
      }
      assignable = hasAllFlags(destructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE; // this is valid: `[...[x]=y];`

      // A param object pattern can only have a rest with ident, this was not just an ident, so assignment pattern only
      // (The object rest in any binding pattern can only be a simple ident)
      if (closingPuncType === $PUNC_CURLY_CLOSE && notAssignable(assignable)) {
        // Note: $$CURLY_R_7D is intentional as we're checking whether this spread was at the end of an object pattern
        // - `function f({...[a, b]}){}`
        // - `[...[].x] = foo)`

        destructible |= CANT_DESTRUCT;

        // TODO: throw this error if it occurs (we just don't know yet until we find an arrow/assignment)
        //THROW('The rest argument of an object binding pattern must always be a simple ident and not an array pattern');
      }
    }
    else if (tok_getType() === $PUNC_CURLY_OPEN) {
      // - `(...{x}) => x`
      //        ^
      // - `[...{x}]`
      // - `[...{x}] = y`
      // - `([...{x}]) => x`
      // - `[...{x}/y]`
      // - `[...{x}.foo] = x`
      // Note: rest param can be on arr/obj
      // - `(...{x:y}) => {}`
      // - `([...{x:y}]) => {}`
      // (and object)
      // rest can be a property with assignment destructuring (invalid for arrows/bindings)
      // - `({...{}} = x);`       // bad (rest arg must be simple)
      // - `({...{}.x} = x);`
      // - `([...{}.x] = x);`
      // - `({...{}[x]} = x);`
      // - `([...{}[x]] = x);`

      let $tp_curly_line = tok_getLine();
      let $tp_curly_column = tok_getColumn();
      let $tp_curly_start = tok_getStart();
      let $tp_curly_stop = tok_getStop();

      let nowDestruct = parseObjectAndAssign(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      ASSERT(tok_getType() !== $PUNC_EQ || (nowDestruct|CANT_DESTRUCT), 'rest can never have default so if there was an assignment dont let it be destructible');
      if (tok_getType() !== $PUNC_EQ && tok_getType() !== closingPuncType && tok_getType() !== $PUNC_COMMA) {
        // - `({ ...{}.x } = x);`
        //          ^
        destructible = parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_curly_start, $tp_curly_stop, $tp_curly_line, $tp_curly_column, assignable, nowDestruct, closingPuncType, astProp);
      } else {
        // The rest arg of an _object_ pattern can only be a simple assignment target. The rest of an array pattern
        // has more freedom. If there is no tail for obj rest then this not destructible.
        // - `({ ...{x} }) => {}`
        // - `{...{} = c}`
        // - `[...{} = c]`
        // - `{...{}}`
        // - `[...{}]`                 // TODO: parse or runtime error? or potentially valid? What if the object is an iterable?
        destructible |= nowDestruct;
        if (closingPuncType === $PUNC_CURLY_CLOSE && tok_getType() !== $PUNC_EQ) {
          destructible |= CANT_DESTRUCT;
        }
      }
      assignable = hasAllFlags(destructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE; // this is valid: `[...{x}=y];`
      // A param object pattern can only have a rest with ident, this was not just an ident, so assignment pattern only
      // (The object rest in any binding pattern can only be a simple ident)
      if (closingPuncType === $PUNC_CURLY_CLOSE && notAssignable(assignable)) {
        // Note: the check above is checking whether this rest was inside an object pattern
        // - `let {...{a,b}} = foo`
        // - `({...[].x} = foo)`

        destructible |= CANT_DESTRUCT;

        // TODO: throw this error if it occurs (we just don't know yet until we find an arrow/assignment)
        // THROW('The rest argument of an object binding pattern must always be a simple ident and not an object pattern');
      }
    }
    else if (tok_getType() === closingPuncType) {
      // `[...]`
      // `(...)`
      return THROW_RANGE('The rest/spread operator is missing an argument', $tt_spreadToken_start, tok_getStop());
    }
    else {
      // - `(...<expr>) => x`
      // - `function f(... <expr>) {}`
      // - `const [x] = y`
      // - `const [...,] = x`
      // - `let [..."foo"] = x`
      // - `const {...[a]} = x`
      // - `const {...{a}} = x`
      // - `const {...a=b} = x`
      // - `const {...a+b} = x`
      // - `[.../x//y]`
      // - `[.../x/g/y]`
      // - `[...50]`
      // Note that for assignments a literal here could be destructible as long as it ends up being a member expression
      // - `[..."foo".bar]`
      // - `[...a=b]`
      // - `[...(x)]`
      // - `[...(x,y)]`
      // - `[.../x/+y]`

      // https://tc39.es/ecma262/#sec-destructuring-assignment-static-semantics-early-errors
      // > It is a Syntax Error if LeftHandSideExpression is either an ObjectLiteral or an ArrayLiteral and if LeftHandSideExpression is not covering an AssignmentPattern.
      // > It is a Syntax Error if LeftHandSideExpression is neither an ObjectLiteral nor an ArrayLiteral and AssignmentTargetType(LeftHandSideExpression) is not simple.
      // Since we checked for ident, object, and array above, this can only become "simple" by being a member expression (`"foo".bar`)
      // https://tc39.es/ecma262/#prod-BindingRestProperty
      // > BindingRestProperty: ... BindingIdentifier
      // https://tc39.es/ecma262/#prod-BindingRestElement
      // > ... BindingIdentifier
      // > ... BindingPattern
      // Binding patterns can only have rest applied to an identifier, so this cant become a binding pattern
      // Ergo, the surrounding structure cannot be a pattern so the dots are a spread
      // https://tc39.es/ecma262/#prod-CoverParenthesizedExpressionAndArrowParameterList
      // > ( ... BindingIdentifier )
      // > ( ... BindingPattern )
      // For completion sake; arg rest can also only apply to idents, arrays, and objects
      // For now, it might still be an assignment pattern. But it must end as a member expression for that to work...
      // Note that a group can also be simple as this property propagates through groups (like `((a.b))` and `((a).b)`)
      destructible |= DESTRUCT_ASSIGN_ONLY;

      // Note: already asserted that the head is not an ident, array, or object, so it's not assignable on its own.
      // However, if the value is assignable as a whole (like `"foo".bar`) then we can still assign-destruct it.

      let $tp_exprStart_line = tok_getLine();
      let $tp_exprStart_column = tok_getColumn();
      let $tp_exprStart_start = tok_getStart();
      let $tp_exprStart_stop = tok_getStop();

      let nowAssignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);
      if (notAssignable(nowAssignable)) {
        destructible = CANT_DESTRUCT;
      }
      assignable = mergeAssignable(nowAssignable, assignable);

      if (tok_getType() === $PUNC_EQ && tok_getType() !== closingPuncType && tok_getType() !== $PUNC_COMMA) {
        if (notAssignable(assignable)) {
          // - `[..."x"=b]`
          return THROW_RANGE('This `...` arg is invalid; rest only accepts idents, arrays, and objects and as spread the assignment is illegal because the lhs is not assignable', $tt_spreadToken_start, tok_getStop());
        }

        // - `[..."x".foo = b]`
        // - `[..."x".foo = b] = x`    (fail)
        assignable = parseExpressionFromOp(lexerFlags, $tp_exprStart_start, $tp_exprStart_stop, $tp_exprStart_line, $tp_exprStart_column, assignable, astProp);
        destructible |= CANT_DESTRUCT; // assignments are not assignment destructible
      }
      else {
        // - `[..."foo"]`
        // - `[..."foo".bar]`
        // - `[...50]`
        // - `[...50..bar]`
        // - `[.../x//y]`
        // - `[.../x/g/y]`
        // - `[...(x)]`
        // - `[...(x,y)]`
        // - `[.../x/+y]`

        if (tok_getType() === $PUNC_COMMA) {
          // Note: rest in array must be the last element and trailing comma is NOT allowed after array-rest
          // [v]: `[...a, b]`
          // [v]: `[...(x), y]`
          destructible |= CANT_DESTRUCT;
        }
        else if (tok_getType() !== closingPuncType) {
          // - `[.../x//y]`
          // - `[.../x/g/y]`
          // - `[..."foo".bar]`
          // - `[...(x)]`
          // - `[...(x,y)]`
          // - `[.../x/+y]`
          assignable = parseExpressionFromOp(lexerFlags, $tp_exprStart_start, $tp_exprStart_stop, $tp_exprStart_line, $tp_exprStart_column, assignable, astProp);
        }
        else {
          // rest arg was a value without op
          // - `[..."f".toString()]`
          // - `[.../x/]`
          // - `[.../x/g]`
          // - `[...50]`
          // - `[..."foo"]`
        }

        if (isAssignable(assignable)) {
          // - `[..."x".y]`
          destructible |= DESTRUCT_ASSIGN_ONLY;
        } else {
          // - `[..."x" + y]`
          destructible |= CANT_DESTRUCT;
        }
      }

      // A param object pattern can only have a rest with ident, this was not just an ident, cant destruct to a rest
      if (closingPuncType === $PUNC_CURLY_CLOSE && !isAssignable(assignable)) destructible |= CANT_DESTRUCT;
      // [v]: `[.../x/]`
      // [v]: `[.../x//yield]`
      // [v]: `function *f(){ return { ...(yield) }`
      return copyPiggies(destructible, assignable);
    }

    if (tok_getType() !== closingPuncType) {
      if (bindingType === BINDING_TYPE_ARG) {
        if ($tp_async_type === $ID_async) {
          destructible |= CANT_DESTRUCT;
        } else {
          // [v]: `f = ([...[ x ] = []]);`
          // [x]: `f = ([...[ x ] = []]) => x;`
          destructible |= DESTRUCT_ASSIGN_ONLY;
          // $log('rest crashed, closingPuncType='+String.fromCharCode(closingPuncType)+', token: ' + curtok);
          // if (tok_getType() === $PUNC_EQ) THROW('The rest argument can not have an initializer');
          // else if (tok_getType() === $PUNC_COMMA) THROW('The rest argument was not destructible as it must be last and can not have a trailing comma');
          // else THROW('The rest argument must the be last parameter');
        }
      }
      if (tok_getType() === $PUNC_EQ) {
        verifyDestructible(destructible | MUST_DESTRUCT); // this is to assert the above _can_ be destructed
        // - `[...a = b] = c`
        // - `{a = b} = c`
        // - `[...{a = b}] = c`
        // - `[...{a = b} = c]`
        // this assignment resets the destructible state
        // for example;
        //   `({a = b})` must destruct because of the shorthand.
        //   `[...a=b]` can't destruct because rest is only legal on a simple identifier.
        // So combining them you get `[...{a = b} = c]` where the inside must destruct and the outside cannot. (there's a test)
        destructible = CANT_DESTRUCT;

        // the array MUST now be a pattern. Does not need to be an arrow.
        // the outer-most assignment is an expression, the inner assignments become patterns too.
        AST_destruct(astProp);
        AST_wrapClosedCustom(astProp, {
          type: 'AssignmentExpression',
          loc: undefined,
          left: undefined,
          operator: '=',
          right: undefined,
        }, 'left');
        ASSERT_skipToExpressionStart('=', lexerFlags);
        let nowAssignable = parseExpression(lexerFlags, 'right');
        assignable = mergeAssignable(nowAssignable, assignable);
        AST_close($tp_argStart_start, $tp_argStart_line, $tp_argStart_column, 'AssignmentExpression');
        // at this point the end should be reached or another point in the code will throw an error on it
        // TODO: should we assert that here and (can we) throw a nicer contextual error?
      } else {
        // TODO: is there a case where destructible = MUST?
        assignable = parseValueTail(lexerFlags, $tp_argStart_start, $tp_argStart_line, $tp_argStart_column, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
        assignable = parseExpressionFromOp(lexerFlags, $tp_argStart_start, $tp_argStart_stop, $tp_argStart_line, $tp_argStart_column, assignable, astProp);
      }
      // - `[...{a = b} = c];`
      // - `[...{a: b.b} = c]`
      destructible |= CANT_DESTRUCT; // a spread with non-ident arg is not restable so not destructible
    }

    // - `async x => [...await x]`
    // - `function *g() { [...yield]; }`
    // - `[...await]`
    // - `[...yield]`
    // destructible because the `...` is at the end of the structure and its arg is an ident/array/object and has no tail
    return copyPiggies(destructible, assignable);
  }

  let initialLexerFlags = sansFlag(INITIAL_LEXER_FLAGS | ((options_strictMode || goalMode === GOAL_MODULE) ? LF_STRICT_MODE : 0), LF_FOR_REGEX);
  initLexer(initialLexerFlags);
  parseTopLevels(initialLexerFlags);

  if (tok_getType() !== $EOF) {
    return THROW_RANGE('Unexpected further input', tok_getStart(), tok_getStop());
  }

  // <SCRUB ASSERTS TO COMMENT>
  if (assertExpectedFail !== '') {
    // An invariant was broken that should hold in valid input, yet no syntax error was reported by the parser.
    return THROW_RANGE('Assertion fail (when valid): ' + assertExpectedFail, $tp_assertExpected_start, $tp_assertExpected_stop);
  }
  // </SCRUB ASSERTS TO COMMENT>

  // <SCRUB AST>
  _tree.loc = AST_getCloseLoc(0, 1, 0, tok_prevEndPointer(), tok_getLine(), tok_getColumn());
  // </SCRUB AST>

  return {
    // <SCRUB AST>
    ast: _tree,
    // </SCRUB AST>
    tokens: tok.tokens,
    tokenCountSolid: tok.getTokenCountSolid(),
    tokenCountAny: tok.getTokenCountAny(),
  }
}

function isTemplateStart(type) {
  return type === $TICK_PURE || type === $TICK_HEAD || type === $TICK_BAD_PURE || type === $TICK_BAD_HEAD;
}

function D(d) {
  if (d === 0) {
    return 'D=MIGHT_DESTRUCT';
  }

  let arr = [];
  if (d & CANT_DESTRUCT) {
    arr.push('CANT_DESTRUCT');
    d ^= CANT_DESTRUCT;
  }
  if (d & MUST_DESTRUCT) {
    arr.push('MUST_DESTRUCT');
    d ^= MUST_DESTRUCT;
  }
  if (d & DESTRUCT_ASSIGN_ONLY) {
    arr.push('DESTRUCT_ASSIGN_ONLY');
    d ^= DESTRUCT_ASSIGN_ONLY;
  }

  // perhaps we should throw for this kind of contamination...?
  if (d & ASSIGNABLE_UNDETERMINED) {
    arr.push('(ASSIGNABLE_UNDETERMINED)');
    d ^= ASSIGNABLE_UNDETERMINED;
  }
  if (d & NOT_ASSIGNABLE) {
    arr.push('(NOT_ASSIGNABLE)');
    d ^= NOT_ASSIGNABLE;
  }
  if (d & IS_ASSIGNABLE) {
    arr.push('(IS_ASSIGNABLE)');
    d ^= IS_ASSIGNABLE;
  }


  d = P(d, arr);

  if (d !== 0) {
    console.log('Gathered flags so far:', arr.join(', '))
    ASSERT(false, 'D(): unknown flags left:', d.toString(2));
  }

  return 'D='+arr.join(', ');
}
function A(a) {
  if (a === 0) {
    ASSERT(false, 'this changed, not sure whether its ever valid anymore?');
    return 'A=ASSIGNABLE_UNDETERMINED';
  }

  let arr = [];
  if (a & ASSIGNABLE_UNDETERMINED) {
    arr.push('ASSIGNABLE_UNDETERMINED');
    a ^= ASSIGNABLE_UNDETERMINED;
  }
  if (a & NOT_ASSIGNABLE) {
    arr.push('NOT_ASSIGNABLE');
    a ^= NOT_ASSIGNABLE;
  }
  if (a & IS_ASSIGNABLE) {
    arr.push('IS_ASSIGNABLE');
    a ^= IS_ASSIGNABLE;
  }

  // perhaps we should throw for this contamination...?
  if (a & CANT_DESTRUCT) {
    arr.push('(CANT_DESTRUCT)');
    a ^= CANT_DESTRUCT;
  }
  if (a & MUST_DESTRUCT) {
    arr.push('(MUST_DESTRUCT)');
    a ^= MUST_DESTRUCT;
  }
  if (a & DESTRUCT_ASSIGN_ONLY) {
    arr.push('(DESTRUCT_ASSIGN_ONLY)');
    a ^= DESTRUCT_ASSIGN_ONLY;
  }

  a = P(a, arr);

  if (a !== 0) {
    console.log('Gathered flags so far:', arr.join(', '))
    ASSERT(false, 'A(): unknown flags left:', a.toString(2));
  }

  return 'A='+arr.join(', ');
}
function B(b) {
  if (b === BINDING_TYPE_NONE) return 'B=BINDING_TYPE_NONE';
  if (b === BINDING_TYPE_ARG) return 'B=BINDING_TYPE_ARG';
  if (b === BINDING_TYPE_VAR) return 'B=BINDING_TYPE_VAR';
  if (b === BINDING_TYPE_LET) return 'B=BINDING_TYPE_LET';
  if (b === BINDING_TYPE_CONST) return 'B=BINDING_TYPE_CONST';
  if (b === BINDING_TYPE_CLASS) return 'B=BINDING_TYPE_CLASS';
  if (b === BINDING_TYPE_CATCH_IDENT) return 'B=BINDING_TYPE_CATCH_IDENT';
  if (b === BINDING_TYPE_CATCH_OTHER) return 'B=BINDING_TYPE_CATCH_OTHER';
  if (b === BINDING_TYPE_FUNC_VAR) return 'B=BINDING_TYPE_FUNC_VAR';
  if (b === BINDING_TYPE_FUNC_LEX) return 'B=BINDING_TYPE_FUNC_LEX';
  if (b === BINDING_TYPE_FUNC_STMT) return 'B=BINDING_TYPE_FUNC_STMT';

  ASSERT(false, 'B: unknown binding enum type: ' + b);
}
function S(s) {
  ASSERT([SCOPE_LAYER_GLOBAL, SCOPE_LAYER_FOR_HEADER, SCOPE_LAYER_BLOCK, SCOPE_LAYER_FUNC_PARAMS, SCOPE_LAYER_ARROW_PARAMS, SCOPE_LAYER_CATCH_HEAD, SCOPE_LAYER_CATCH_BODY, SCOPE_LAYER_FINALLY, SCOPE_LAYER_SWITCH, SCOPE_LAYER_FUNC_ROOT, SCOPE_LAYER_FUNC_BODY, SCOPE_LAYER_FAKE_BLOCK].includes(s), 'scopeType enum', s);
  if (s === SCOPE_LAYER_GLOBAL) return 'SCOPE_LAYER_GLOBAL';
  if (s === SCOPE_LAYER_FOR_HEADER) return 'SCOPE_LAYER_FOR_HEADER';
  if (s === SCOPE_LAYER_BLOCK) return 'SCOPE_LAYER_BLOCK';
  if (s === SCOPE_LAYER_FUNC_PARAMS) return 'SCOPE_LAYER_FUNC_PARAMS';
  if (s === SCOPE_LAYER_CATCH_HEAD) return 'SCOPE_LAYER_CATCH_HEAD';
  if (s === SCOPE_LAYER_CATCH_BODY) return 'SCOPE_LAYER_CATCH_BODY';
  if (s === SCOPE_LAYER_FINALLY) return 'SCOPE_LAYER_FINALLY';
  if (s === SCOPE_LAYER_SWITCH) return 'SCOPE_LAYER_SWITCH';
  if (s === SCOPE_LAYER_FUNC_ROOT) return 'SCOPE_LAYER_FUNC_ROOT';
  if (s === SCOPE_LAYER_FUNC_BODY) return 'SCOPE_LAYER_FUNC_BODY';
  if (s === SCOPE_LAYER_ARROW_PARAMS) return 'SCOPE_LAYER_ARROW_PARAMS';
  if (s === SCOPE_LAYER_FAKE_BLOCK) return 'SCOPE_LAYER_FAKE_BLOCK';

  ASSERT(false, 'S: unknown scope layer type: ' + s);
}

function F(fdState) {
  if (fdState === FDS_ILLEGAL) return ('F=FDS_ILLEGAL');
  else if (fdState === FDS_IFELSE) return ('F=FDS_IFELSE');
  else if (fdState === FDS_LEX) return ('F=FDS_LEX');
  else if (fdState === FDS_VAR) return ('F=FDS_VAR');
  else ASSERT(false, 'F(): fds is enum', fdState);
}

export default Parser; // QoL for somebody, perhaps.
export {
  Parser,

  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,
  COLLECT_TOKENS_TYPES,

  GOAL_MODULE,
  GOAL_SCRIPT,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,
};
