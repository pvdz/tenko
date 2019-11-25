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
  THROW as _THROW,
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

  KEYWORD_TRIE,

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

  tokenStrForError,
  ASSERT_pushCanonPoison,
  ASSERT_popCanonPoison,
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
    collectTokens: options_collectTokens = COLLECT_TOKENS_NONE, // COLLECT_TOKENS_NONE | COLLECT_TOKENS_SOLID | COLLECT_TOKENS_ALL | "none" | "solid" | "all"
    webCompat: options_webCompat = WEB_COMPAT_ON,
    strictMode: options_strictMode = false,
    astRoot: options_astRoot = null,
    tokenStorage: options_tokenStorage,
    getLexer = null,
    allowGlobalReturn = false, // you may need this to parse arbitrary code or eval code for example
    targetEsVersion = VERSION_WHATEVER, // 6, 7, 8, 9, 10, 11, Infinity
    exposeScopes: options_exposeScopes = false, // put scopes in the AST under `$scope` property?
    astUids = false, // add an incremental uid to all ast nodes for debugging
    fullErrorContext = false, // do not trunc the input when throwing an error?
    ranges: options_ranges = false, // Add `range` to each `loc` object for absolute start/stop index on input?

    templateNewlineNormalization = true, // normalize \r and \rn to \n in the `.raw` of template nodes? Estree spec says yes, but makes it hard to serialize lossless

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
    else THROW('Unknown goal symbol value: `' + options_goalMode + '`');
  } else {
    goalMode = options_goalMode;
  }
  let collectTokens = COLLECT_TOKENS_NONE;
  if (typeof options_collectTokens === 'string') {
    if (options_collectTokens === 'all') collectTokens = COLLECT_TOKENS_ALL;
    else if (options_collectTokens === 'solid') collectTokens = COLLECT_TOKENS_SOLID;
    else if (options_collectTokens === 'none') collectTokens = COLLECT_TOKENS_NONE;
    else THROW('Unknown collectTokens value: `' + options_collectTokens + '`');
  } else {
    collectTokens = options_collectTokens;
  }

  let failForRegexAssertIfPass = '';
  let regexAssertTrace = undefined;

  let curtok = null;

  let NODE_NAME_PROPERTY = babelCompat ? 'ObjectProperty' : 'Property';
  let NODE_NAME_METHOD_OBJECT = babelCompat ? 'ObjectMethod' : 'Property';
  let NODE_NAME_METHOD_CLASS = babelCompat ? 'ClassMethod' : 'MethodDefinition';

  let assertExpectedFail = '';
  let assertExpectedToken = null;
  function ASSERT_VALID(bool, msg) {
    // An assert that must at least hold when the parser would otherwise accept the input.
    // This assert Will only throw an assertion error if the parser tripped over this but did not throw any actual error
    // (This helps with asserting certain syntax errors that would be properly caught without the assert)
    if (!bool) {
      assertExpectedFail = msg + '\n' + (new Error().stack);
      assertExpectedToken = curtok;
    }
  }

  function ASSERT(bool, desc, ...rest) {
    if (!bool) {
      ASSERT_pushCanonPoison(true);
      THROW('Assertion fail: ' + (desc || '<no desc>') + '; ' + JSON.stringify(rest), ':', ...rest);
      ASSERT_popCanonPoison();
    }
  }

  let tok = Lexer(code, {
    targetEsVersion,
    parsingGoal: goalMode,
    collectTokens,
    returnTokens: babelCompat ? RETURN_COMMENT_TOKENS : RETURN_SOLID_TOKENS,
    webCompat: options_webCompat,
    gracefulErrors: FAIL_HARD,
    tokenStorage: options_tokenStorage,
    babelTokenCompat,

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
  let tok_getCanon = tok.getCanon;

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

  function THROW(desc, ...args) {
    THROW_TOKEN(desc, curtok, ...args)
  }
  function THROW_TOKEN(desc, token, ...args) {
    $log('\n');
    $log('Error in parser:', desc, 'remaining throw args;', args);
    $log('Error token: ' + token);
    // The "at eof" suffix also helps for reducing fuzz cases
    tok_throw('Parser error! ' + desc + (curtok.type === $EOF ? ' (at EOF)' : ''), token, undefined, fullErrorContext);
  }

  let uid_counter = 0;

  // https://github.com/estree/estree
  // https://github.com/estree/estree/blob/master/es5.md
  // https://github.com/estree/estree/blob/master/es2015.md
  // https://astexplorer.net/
  let _tree = {
    type: 'Program',
    loc: AST_getFirstLoc(),
    body: [],
  };
  if (babelCompat) {
    _tree = {
      type: 'Program',
      loc: AST_getFirstLoc(),
      body: [],
      sourceType: goalMode === GOAL_SCRIPT ? 'script' : 'module',
      interpreter: null, // https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#interpreterdirective
    };
  }
  if (acornCompat) {
    _tree = {
      type: 'Program',
      loc: AST_getFirstLoc(),
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

  function AST_getFirstLoc() {
    ASSERT(AST_getFirstLoc.length === arguments.length, 'arg count');

    // Create a loc for the start of the program

    return AST_getOpenLoc(1, 0, 0);
  }
  function AST_getBaseLoc(firstToken) {
    ASSERT(AST_getBaseLoc.length === arguments.length, 'arg count');

    // Create a loc that is unclosed, to be closed by AST_close*

    return AST_getOpenLoc(firstToken.line, firstToken.column, firstToken.start);
  }
  function AST_getBaseLocTemplate(firstToken) {
    ASSERT(AST_getBaseLocTemplate.length === arguments.length, 'arg count');

    // Create a loc that is unclosed, to be closed by AST_close*
    // This loc is for template elements where the backticks, `${`, and `}` characters are ignored in
    // the location ranges... so +1 it

    return AST_getOpenLoc(firstToken.line, firstToken.column + 1, firstToken.start);
  }
  function AST_getClosedLoc(firstToken) {
    ASSERT(AST_getClosedLoc.length === arguments.length, 'arg count');

    // Create a loc that is immediately closed

    return AST_getCloseLoc(firstToken.line, firstToken.column, firstToken.start, tok_prevEndLine(), tok_prevEndColumn(), tok_prevEndPointer());
  }
  function AST_getOpenLoc(startLine, startColumn, startIndex) {
    ASSERT(AST_getOpenLoc.length === arguments.length, 'arg count');

    if (options_ranges) {
      // Note: return two distinct object when using ranges to prevent deopt
      return {
        start: {
          line: startLine, // offset 1
          column: startColumn,
        },
        end: { // Updated in AST_close with the next token (which seems to be accurate)
          line: 1,
          column: 0,
        },
        range: {
          start: startIndex,
          end: 0,
        },
        source: sourceField, // File containing the code being parsed. Source maps may use this.
      };
    }

    return {
      start: {
        line: startLine, // offset 1
        column: startColumn,
      },
      end: { // Updated in AST_close with the next token (which seems to be accurate)
        line: 1,
        column: 0,
      },
      source: sourceField, // File containing the code being parsed. Source maps may use this.
    };
  }
  function AST_getCloseLoc(startLine, startColumn, startIndex, endLine, endColumn, endIndex) {
    ASSERT(AST_getCloseLoc.length === arguments.length, 'arg count');

    if (options_ranges) {
      // Note: return two distinct object when using ranges to prevent deopt
      return {
        start: {
          line: startLine, // offset 1
          column: startColumn,
        },
        end: {
          line: endLine,
          column: endColumn,
        },
        range: {
          start: startIndex,
          end: endIndex,
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
  function AST_close(names_ASSERT_ONLY) {
    ASSERT(AST_close.length === arguments.length, 'arg count');
    // Note: names_ASSERT_ONLY is stripped in the build...
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(!names_ASSERT_ONLY.includes('TemplateElement'), 'use AST_closeTemplateElement instead');
    ASSERT(!names_ASSERT_ONLY.includes('CommentBlock'), 'use AST_closeComment instead');
    ASSERT(!names_ASSERT_ONLY.includes('CommentLine'), 'use AST_closeComment instead');
    ASSERT(!names_ASSERT_ONLY.includes('Identifier'), 'use AST_closeIdent instead');

    let was = _path.pop();
    ASSERT(was.loc.end.column === 0, 'only set once, when closing the node');
    ASSERT(was.loc.end.line === 1, 'only set once, when closing the node');
    // In all cases where AST_close is called, `curtok` should be the first token of the next node(s)
    // However, it ought to be the first _whitespace_ token, not just non-whitespace
    // The column offsets at 0, the line at 1
    was.loc.end.column = tok_prevEndColumn();
    was.loc.end.line = tok_prevEndLine();
    if (options_ranges) was.loc.range.end = tok_prevEndPointer();

    ASSERT(was.loc.start.line <= was.loc.end.line, 'end line should be same or later than start (1)', was.loc);
    ASSERT(was.loc.start.line < was.loc.end.line || was.loc.start.column <= was.loc.end.column, 'if the node does not span multiple lines then the start column should come before the end column', was.loc);
    ASSERT(was.loc.start.line >= 1, 'start line should be >= 1', was.loc);
    ASSERT(was.loc.start.column >= 0, 'start column should be >= 0', was.loc);
    ASSERT(was.loc.end.line >= 1, 'end line should be >= 1', was.loc);
    ASSERT(was.loc.end.column >= 0, 'end column should be >= 0', was.loc);

    ASSERT(!void _pnames.pop(), '(dev-only verification and debugging tool)');
    ASSERT(!names_ASSERT_ONLY || (typeof names_ASSERT_ONLY === 'string' && names_ASSERT_ONLY === was.type) || (names_ASSERT_ONLY instanceof Array && names_ASSERT_ONLY.indexOf(was.type) >= 0), 'Expecting to close a node with given name(s), expected: ' + names_ASSERT_ONLY + ' but closed: ' + was.type)

    return was; // debug/assertions only...
  }
  function AST_closeTemplateElement(isTemplateDouble) {
    ASSERT(AST_closeTemplateElement.length === arguments.length, 'arg count');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');

    let was = _path.pop();
    ASSERT(was.loc.end.column === 0, 'only set once, when closing the node');
    ASSERT(was.loc.end.line === 1, 'only set once, when closing the node');

    // The column offsets at 0
    // For template elements the backticks, `${`, and `}` characters are ignored in the location ranges... so -1
    let colEnd = tok_prevEndColumn() - 1;
    let pointerEnd = tok_prevEndPointer();
    if (isTemplateDouble) {
      // This is for TICK_HEAD and TICK_BODY which start with `${`
      --colEnd;
      --pointerEnd;
    }

    was.loc.end.column = colEnd;
    was.loc.end.line = tok_prevEndLine();
    if (options_ranges) was.loc.range.end = pointerEnd;

    ASSERT(was.loc.start.line <= was.loc.end.line, 'end line should be same or later than start (2)', was.loc);
    ASSERT(was.loc.start.line < was.loc.end.line || was.loc.start.column <= was.loc.end.column, 'if the node does not span multiple lines then the start column should come before the end column', was.loc);
    ASSERT(was.loc.start.line >= 1, 'start line should be >= 1', was.loc);
    ASSERT(was.loc.start.column >= 0, 'start column should be >= 0', was.loc);
    ASSERT(was.loc.end.line >= 1, 'end line should be >= 1', was.loc);
    ASSERT(was.loc.end.column >= 0, 'end column should be >= 0', was.loc);

    ASSERT(!void _pnames.pop(), '(dev-only verification and debugging tool)');
    ASSERT(was.type === 'TemplateElement', 'Expecting to close a TemplateElement node but closed: ' + was.type)

    return was; // debug/assertions only...
  }
  function AST_set(prop, value) {
    ASSERT(AST_set.length === arguments.length, 'expecting two args');
    ASSERT(typeof prop === 'string', 'prop should be string');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(prop[0] === '$' || prop === 'directives' || prop === 'extra' || _path[_path.length - 1].hasOwnProperty(prop), 'all ast node members should be predefined', prop, '--->', _path[_path.length - 1]);

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
      ASSERT(p === undefined, `(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array`);
      parentNode[astProp] = node;
    }

    return node; // for ASSERTs only!
  }
  function AST_setNodeDangerously(astProp, node) {
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
      ASSERT(p === undefined, `(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array`);
      parentNode[astProp] = node;
    }

    return node; // for ASSERTs only!
  }
  function AST_setIdent(astProp, token, tokenCanon) {
    ASSERT(AST_setIdent.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', token, typeof token === 'object', token && typeof token.type === 'number');
    ASSERT(token !== curtok, 'token should be consumed to ensure location data is correct', token, curtok);
    ASSERT(isIdentToken(token.type), 'token must be ident');

    let identNode = AST_getIdentNode(token, tokenCanon);
    return AST_setNode(astProp, identNode); // only for ASSERTS
  }
  function AST_getIdentNode(token, tokenCanon) {
    ASSERT(AST_getIdentNode.length === arguments.length, 'arg count');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', token, typeof token === 'object', token && typeof token.type === 'number');
    ASSERT(isIdentToken(token.type), 'token must be ident');
    ASSERT(typeof tokenCanon === 'string');
    ASSERT(tokenCanon === tokenCanon);

    // TODO: is a destructuring more efficient pref-wise? `let {canon, col, line, ...} = token`. It may be :)
    let col = token.column;
    let line = token.line;
    let len = token.str.length; // .stop - token.stop;
    // Idents can't contain newlines so the end.column should be start.column+len
    let colEnd = col + len;

    let identNode = {
      type: 'Identifier',
      loc: AST_getCloseLoc(line, col, token.start, line, colEnd, token.stop),
      // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
      name: tokenCanon,
    };
    if (babelCompat) identNode.loc.identifierName = tokenCanon;
    ASSERT(identNode.loc.end.column - identNode.loc.start.column === token.str.length, 'for idents the location should only span exactly the length of the ident and cannot hold newlines');

    return identNode;
  }
  function AST_setLiteral(astProp, token, tokenCanon) {
    _AST_setLiteral(astProp, token, tokenCanon, false);
  }
  function _AST_setLiteral(astProp, token, tokenCanon, fromDirective) {
    ASSERT(_AST_setLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'prop is string');
    ASSERT(typeof token === 'object', 'token is obj');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(isNumberStringRegex(token.type), 'should be number or string');
    ASSERT(token !== curtok, 'token should be consumed to ensure location data is correct', token, curtok);

    let node; // for assert
    if (isStringToken(token.type)) {
      node = AST_setStringLiteral(astProp, token, tokenCanon, fromDirective);
    }
    else if (isNumberToken(token.type)) {
      if (isBigintToken(token.type)) {
        node = AST_setBigInt(astProp, token);
      } else {
        node = AST_setNumberLiteral(astProp, token);
      }
    }
    else if (isRegexToken(token.type)) {
      ASSERT(token.str.split('/').length > 2, 'a regular expression should have at least two forward slashes', token.str);
      node = AST_setRegexLiteral(astProp, token);
    }
    else {
      ASSERT(false, 'what kind of literal is this?', T(token.type), ''+token, isNumberToken(token.type));
    }
    // It's difficult to make this generic but for idents and literals it's doable
    ASSERT(node, 'should be set by one of the branches');
    ASSERT(token.str.includes('\n') || token.str.includes('\r') || token.str.includes('\u2028') || token.str.includes('\u2029') || node.loc.end.column - node.loc.start.column === (token.stop - token.start), 'for literals the location should only span exactly the length of the lit', node.loc, token);
  }
  function AST_getStringNode(token, tokenCanon, fromDirective) {
    ASSERT(AST_getStringNode.length === arguments.length, 'arg count');

    if (babelCompat) return AST_babelGetStringNode(token, tokenCanon, fromDirective);

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    let q = "'";
    if (token.type === $STRING_DOUBLE) q = '"';

    ASSERT_pushCanonPoison(true);
    let node = {
      type: 'Literal',
      loc: AST_getCloseLoc(token.line, token.column, token.start, tok_prevEndLine(), tok_prevEndColumn(), tok_prevEndPointer()),
      value: tokenCanon,
      raw: q + token.str + q,
    };
    ASSERT_popCanonPoison();
    return node;
  }
  function AST_setStringLiteral(astProp, token, tokenCanon, fromDirective) {
    ASSERT(AST_setStringLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', token, typeof token === 'object', token && typeof token.type === 'number');
    ASSERT(token !== curtok, 'token should be consumed to ensure location data is correct', token, curtok);

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let stringNode = AST_getStringNode(token, tokenCanon, fromDirective);
    return AST_setNode(astProp, stringNode); // for ASSERTs only!
  }
  function AST_getNumberNode(token) {
    ASSERT(AST_getNumberNode.length === arguments.length, 'arg count');

    let type = token.type;
    if (isBigintToken(type)) return AST_getBigIntNode(token);
    if (babelCompat) return AST_babelGetNumberNode(token);

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    let str = token.str;
    let value =
      type === $NUMBER_DEC ? parseFloat(str) : // parseFloat also deals with `e` cases
      type === $NUMBER_HEX ? parseInt(str.slice(2), 16) :
      type === $NUMBER_BIN ? parseInt(str.slice(2), 2) :
      type === $NUMBER_OCT ? parseInt(str.slice(2), 8) :
      (
        ASSERT(type === $NUMBER_OLD, 'number types are enum and bigint should not reach this', token),
        ASSERT(str !== '0', 'a zero should just be a decimal', token),
        str.includes('8') || str.includes('9')
        ? parseFloat(str.slice(1))
        : parseInt(str.slice(1), 8)
      );

    return {
      type: 'Literal',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      value: value,
      raw: str,
    };
  }
  function AST_setNumberLiteral(astProp, token) {
    ASSERT(AST_setNumberLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', token, typeof token === 'object', token && typeof token.type === 'number');
    ASSERT(token !== curtok, 'token should be consumed to ensure location data is correct', token, curtok);

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    let numberNode = AST_getNumberNode(token);
    return AST_setNode(astProp, numberNode); // for ASSERTs only!
  }
  function AST_getBigIntNode(token) {
    // [v] `45n`
    // [v] `0b100n`
    // [v] `0o533n`
    // [v] `0xabcn`
    // https://github.com/estree/estree/pull/198/files

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    if (acornCompat) return AST_acornGetBigIntNode(token);
    if (babelCompat) return AST_babelGetBigIntNode(token);

    return {
      type: 'BigIntLiteral',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      value: null,
      bigint: token.str.slice(0, -1), // TODO: Normalize... https://github.com/estree/estree/issues/200
    };
  }
  function AST_setBigInt(astProp, token) {
    ASSERT(AST_setBigInt.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', token, typeof token === 'object', token && typeof token.type === 'number');
    ASSERT(token !== curtok, 'token should be consumed to ensure location data is correct', token, curtok);

    let bigintNode = AST_getBigIntNode(token);
    return AST_setNode(astProp, bigintNode); // for ASSERTs only!
  }
  function AST_getRegexNode(token) {
    ASSERT(AST_getRegexNode.length === arguments.length, 'arg count');

    if (acornCompat) return AST_acornGetRegexNode(token);
    if (babelCompat) return AST_babelGetRegexNode(token);

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    let str = token.str;
    let pos = str.lastIndexOf('/');
    let body = str.slice(1, pos);
    let tail = str.slice(pos + 1);

    // https://github.com/estree/estree/blob/master/es5.md#regexpliteral

    return {
      type: 'Literal',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      value: null,
      regex: {
        pattern: body,
        flags: tail,
      },
      raw: str,
    };
  }
  function AST_setRegexLiteral(astProp, token) {
    ASSERT(AST_setRegexLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string' && astProp !== 'undefined', 'prop should be string');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', token, typeof token === 'object', token && typeof token.type === 'number');
    ASSERT(token !== curtok, 'token should be consumed to ensure location data is correct', token, curtok);

    let regexNode = AST_getRegexNode(token);
    return AST_setNode(astProp, regexNode); // for ASSERTs only!
  }
  function AST_add(prop, value) {
    ASSERT(typeof prop === 'string', 'prop should be string');
    ASSERT(arguments.length === 2, 'expecting two args');
    ASSERT(_path.length > 0, 'path shouldnt be empty');
    ASSERT(_pnames.length === _path.length, 'pnames should have as many names as paths');
    ASSERT(Array.isArray(_path[_path.length - 1][prop]), 'expecting to add to an existing array');

    const arr = _path[_path.length - 1][prop];
    arr[arr.length] = value;
  }
  function AST_popNode(prop) {
    ASSERT(AST_popNode.length === arguments.length, 'arg count');

    // Get the current "top" node and either remove it from the parent array, or mark it as `undefined` inside an ASSERT

    let parent = _path[_path.length-1];
    let p = parent[prop];
    ASSERT(p, 'the prop should exist... (and be a node)');
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
  function AST_wrapClosedIntoArrayCustom(prop, newNode, newProp, startToken) {
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

    let node = _path[_path.length-1][prop];
    ASSERT(node, 'top[' + prop + '] should be a node');
    if (Array.isArray(node)) {
      // The destruct applies to the node just closed, so last in list
      if (AST__destruct(node[node.length-1])) AST_destructReplaceAssignment(node, node.length - 1);
    }

    if (AST__destruct(node)) AST_destructReplaceAssignment(_path[_path.length-1], prop);
  }
  function AST__destruct(node) {
    ASSERT(arguments.length === 1, 'arg count');

    switch (node.type) {
      case 'ArrayExpression':
        node.type = 'ArrayPattern';
        let elements = node.elements;
        let e = elements.length;
        for (let i = 0; i < e; ++i) {
          let element = elements[i];
          // note: children can be null (elided array destruct) but not undefined
          if (element && AST__destruct(element)) AST_destructReplaceAssignment(elements, i);
        }
        return false;
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
          if (AST__destruct(properties[i])) AST_destructReplaceAssignment(properties, i);
        }
        return false;
      case 'AssignmentExpression':
        // walk the left of the assignment only
        if (AST__destruct(node.left)) AST_destructReplaceAssignment(node, 'left');
        return true;
      case NODE_NAME_PROPERTY:
        if (AST__destruct(node.value)) AST_destructReplaceAssignment(node, 'value');
        return false;
      case 'SpreadElement':
        // `([...x]);` vs `([...x]) => x`
        // `({...x});` vs `({...x}) => x`
        node.type = 'RestElement';
        if (AST__destruct(node.argument)) AST_destructReplaceAssignment(node, 'argument');
        return false;
    }
    return false;
  }
  function AST_destructReplaceAssignment(parentNode, prop) {
    let oldNode = parentNode[prop];
    if (oldNode.operator !== '=') THROW('The destruturing assignment should be a regular assignment');
    let newNode = {
      type: 'AssignmentPattern',
      loc: oldNode.loc,
      left: oldNode.left,
      right: oldNode.right,
    };

    parentNode[prop] = newNode;
  }
  function AST_destructArrowParams(toplevelComma, asyncToken, arrowStartToken, astProp) {
    ASSERT(AST_destructArrowParams.length === arguments.length, 'arg count');

    if (babelCompat) {
      AST_wrapClosedIntoArrayCustom(astProp, {
        type: 'ArrowFunctionExpression',
        loc: AST_getBaseLoc(arrowStartToken),
        params: undefined,
        id: null,
        generator: false,
        async: asyncToken !== UNDEF_ASYNC,
        body: undefined,
      }, 'params', arrowStartToken);
    } else {
      AST_wrapClosedIntoArrayCustom(astProp, {
        type: 'ArrowFunctionExpression',
        loc: AST_getBaseLoc(arrowStartToken),
        params: undefined,
        id: null,
        generator: false,
        async: asyncToken !== UNDEF_ASYNC,
        expression: undefined, // TODO: init to bool
        body: undefined,
      }, 'params', arrowStartToken);
    }
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
      if (AST__destruct(params[i])) AST_destructReplaceAssignment(params, i);
    }

  }
  function AST_convertArrayToPattern(token, astProp) {
    ASSERT(AST_convertArrayToPattern.length === arguments.length, 'arg count');

    if (token.type === $PUNC_EQ) {
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
      THROW('Can only increment or decrement an identifier or member expression');
    }
  }
  function AST_patchAsyncCall(asyncToken, asyncTokenCanon, astProp) {
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
      loc: AST_getClosedLoc(asyncToken),
      callee: AST_getIdentNode(asyncToken, asyncTokenCanon),
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
  function AST_babelParenthesizesClosed(token, astProp) {
    // Hack: get the node we just closed and add the extra meta data to it
    let parent = _path[_path.length-1];
    let child = parent[astProp];
    if (Array.isArray(child)) {
      ASSERT(child.length > 0, 'babel should not be able to wrap the closed child of an empty container');
      child = child[child.length - 1];
    }

    if (child.extra) {
      child.extra.parenthesized = true;
      child.extra.parenStart = token.start;
    } else {
      child.extra = {
        parenthesized: true,
        parenStart: token.start,
      };
    }
  }
  function AST_babelAddComment(commentToken) {
    // Create property if it doesn't already exist.
    // Add comment if it does.
    if (!_path[_path.length - 1].innerComments) _path[_path.length - 1].innerComments = [];

    let type = commentToken.type;
    let str = commentToken.str;

    let typeName = 'CommentLine';
    let value = '';
    if (type === $COMMENT_SINGLE) {
      // typeName = 'CommentBlock'
      value = str.slice(2);
    } else if (type === $COMMENT_MULTI) {
      typeName = 'CommentBlock'
      value = str.slice(2, -2);
    } else {
      ASSERT(type === $COMMENT_HTML, 'comment is enum so this must be html');
      ASSERT(str.slice(0,3) === '-->' || str.slice(0, 4) === '<!--', 'only two types of html comment');
      // Note: html comments are single line ast nodes
      // typeName = 'CommentLine'
      value = str.slice(0, 3) === '-->' ? commentToken.str.slice(3) : commentToken.str.slice(4);
    }

    let commentNode = {
      type: typeName,
      // Comment nodes are recorded immediately and should read the current position as their end...
      loc: AST_getCloseLoc(commentToken.line, commentToken.column, commentToken.start, tok_currLine(), tok_currColumn(), tok_currPointer()),
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
  function AST_babelGetStringNode(token, tokenCanon, fromDirective) {
    ASSERT(AST_babelGetStringNode.length === arguments.length, 'arg count');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', [token, typeof token === 'object', token && typeof token.type === 'number']);

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    let canon = tokenCanon;
    let str = token.str;
    let value = fromDirective ? str : canon;
    let q = "'";
    if (token.type === $STRING_DOUBLE) q = '"';

    return {
      type: 'StringLiteral',
      // Note: strings can contain 2028/2029 and line continuations, which increment the line counter. So we can't just use str.length
      loc: AST_getCloseLoc(token.line, token.column, token.start, tok_prevEndLine(), tok_prevEndColumn(), tok_prevEndPointer()),
      value: value,
      extra: {rawValue: value, raw: q + str + q},
    };
  }
  function AST_babelGetNumberNode(token) {
    ASSERT(AST_babelGetNumberNode.length === arguments.length, 'arg count');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', [token, typeof token === 'object', token && typeof token.type === 'number']);

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    let type = token.type;
    let str = token.str;
    let value =
      type === $NUMBER_DEC ? parseFloat(str) : // parseFloat also deals with `e` cases
      type === $NUMBER_HEX ? parseInt(str.slice(2), 16) :
      type === $NUMBER_BIN ? parseInt(str.slice(2), 2) :
      type === $NUMBER_OCT ? parseInt(str.slice(2), 8) :
      (
        ASSERT(type === $NUMBER_OLD, 'number types are enum and bigint should not reach this'),
        ASSERT(str !== '0', 'a zero should just be a decimal'),
        str.includes('8') || str.includes('9')
        ? parseFloat(str.slice(1))
        : parseInt(str.slice(1), 8)
      );

    return {
      type: 'NumericLiteral',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      value: value,
      extra: { rawValue: value, raw: str},
    };
  }
  function AST_babelGetBigIntNode(token) {
    return {
      type: 'BigIntLiteral',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      value: token.str.slice(0, -1),
      extra: {rawValue: token.str.slice(0, -1), raw: token.str}, // This will probably change ...
    };
  }
  function AST_babelGetRegexNode(token) {
    ASSERT(AST_babelGetRegexNode.length === arguments.length, 'arg count');
    ASSERT(typeof token === 'object' && token && typeof token.type === 'number', 'should receive token', [token, typeof token === 'object', token && typeof token.type === 'number']);

    // Open a node and immediately close it. Only works if the column offsets do not depend on something being consumed
    // between open and close (which is often the case). So this is used for literals (while idents have their own func)

    // TODO: is a destructuring more efficient pref-wise? `let {canon, str, ...} = token`. It may be :)

    let str = token.str;
    let pos = str.lastIndexOf('/');
    let body = str.slice(1, pos);
    let tail = str.slice(pos + 1);

    return {
      type: 'RegExpLiteral',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      pattern: body,
      flags: tail,
      extra: {rawValue: undefined, raw: str},
      value: undefined,
    };
  }
  function AST_acornGetBigIntNode(token) {
    return {
      type: 'Literal',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      raw: token.str,
      bigint: token.str.slice(0, -1),
      value: BigInt(token.str.slice(0, -1)), // Ironically it doesn't accept bigint notation
    };
  }
  function AST_acornGetRegexNode(token) {

    let str = token.str;
    let pos = str.lastIndexOf('/');
    let body = str.slice(1, pos);
    let tail = str.slice(pos + 1);

    // https://github.com/estree/estree/blob/master/es5.md#regexpliteral
    // This node for Acorn is almost identical to estree ...

    return {
      type: 'Literal',
      loc: AST_getCloseLoc(token.line, token.column, token.start, token.line, token.column + token.str.length, token.stop),
      value: new RegExp(body, tail), // Only difference
      regex: {
        pattern: body,
        flags: tail,
      },
      raw: str,
    };
  }

  function initLexer(lexerFlags) {
    do {
      skipToStatementStart(lexerFlags);
      if (curtok.type === $ERROR) {
        THROW_TOKEN('Lexer error: ' + tok_lexError(), curtok);
      }
    } while (curtok.type === $ERROR);
  }

  function skipRex(lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a regular expression literal
    ASSERT(arguments.length === 1, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set anywhere');

    _skip(lexerFlags | LF_FOR_REGEX);

    ASSERT(typeof curtok.type === 'number' && curtok.type >= 0);
  }
  function skipDiv(lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a division punctuator
    ASSERT(arguments.length === 1, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set anywhere');

    _skip(lexerFlags);

    ASSERT(typeof curtok.type === 'number' && curtok.type >= 0);
  }
  function skipAny(lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a division punctuator
    ASSERT(arguments.length === 1, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set anywhere');

    _skip(lexerFlags);

    ASSERT(typeof curtok.type === 'number' && curtok.type >= 0);
    ASSERT_VALID(curtok.type !== $PUNC_DIV && !isRegexToken(curtok.type), 'this function should not be called if the parsed token could possibly start with a forward slash (div/regex)');
  }
  function _skip(lexerFlags) {
    // This is regex agnostic and should be called from skipDiv or skipRex only ...

    updateToken(tok_nextToken(lexerFlags));

    if (babelCompat) {
      let maybeComment = curtok;
      while (isCommentToken(maybeComment.type)) {
        updateToken(tok_nextToken(lexerFlags));
        AST_babelAddComment(maybeComment);
        maybeComment = curtok;
      }
    }
  }
  function updateToken(token) {
    curtok = token;

    if (curtok.type === $ERROR) {
      tok_lexError();
    }
  }

  function ASSERT_skipRex(what, lexerFlags) {
    // skip a token and if the next token starts with a forward slash, search for a regular expression literal
    ASSERT(arguments.length === 2, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof what === 'number' || typeof what === 'string', 'what number/string');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set or propagated inside the parser');
    if (typeof what === 'string') {
      ASSERT(curtok.str === what, 'expecting to skip token with certain value', 'expect:', what, 'actual:', T(curtok.type), curtok.str);
    } else {
      if (ALL_TOKEN_GROUPS.includes(what)) {
        // Check for a group type of token
        ASSERT((curtok.type & what) === what, 'Expected to parse a particular group type of token', what);
      } else {
        ASSERT(ALL_TOKEN_TYPES.includes(what), 'token types are a fixed set');
        ASSERT(hasAllFlags(curtok.type, what), 'expecting to skip token with certain type', 'expect:', T(what), 'actual:', T(curtok.type));
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
      ASSERT(curtok.str === what, 'expecting to skip token with certain value', 'expect:', what, 'actual:', T(curtok.type), curtok.str);
    } else {
      if (ALL_TOKEN_GROUPS.includes(what)) {
        // Check for a group type of token
        ASSERT((curtok.type & what) === what, 'Expected to parse a particular group type of token', what);
      } else {
        ASSERT(ALL_TOKEN_TYPES.includes(what), 'token types are a fixed set');
        ASSERT(hasAllFlags(curtok.type, what), 'expecting to skip token with certain type', 'expect:'
          // <SCRUB DEV>
          , T(what, true), 'actual:', T(curtok.type, true)
          // </SCRUB DEV>
        );
      }
    }
    skipDiv(lexerFlags);
  }
  function ASSERT_skipAny(what, lexerFlags) {
    ASSERT(arguments.length === 2, 'should get all params', arguments);
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof what === 'number' || typeof what === 'string', 'what number/string');
    ASSERT(hasNoFlag(lexerFlags, LF_FOR_REGEX), 'regex flag should not be set or propagated inside the parser');
    if (typeof what === 'string') {
      ASSERT(curtok.str === what, 'expecting to skip token with certain value', 'expect:', what, 'actual:', T(curtok.type), curtok.str);
    } else {
      if (ALL_TOKEN_GROUPS.includes(what)) {
        // Check for a group type of token
        ASSERT((curtok.type & what) === what, 'Expected to parse a particular group type of token', what);
      } else {
        ASSERT(ALL_TOKEN_TYPES.includes(what), 'token types are a fixed set');
        ASSERT(hasAllFlags(curtok.type, what), 'expecting to skip token with certain type', 'expect:'
          // <SCRUB DEV>
          , T(what, true), 'actual:', T(curtok.type, true)
          // </SCRUB DEV>
        );
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
    if (curtok.type !== $PUNC_PAREN_OPEN) {
      THROW('Expected to parse an opening paren, found `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToCurlyOpenOrDie(what, lexerFlags) {
    skipToCurlyOpenOrDie(lexerFlags);
  }
  function skipToCurlyOpenOrDie(lexerFlags) {
    // The next token must be a curly, possibly preceded by some whitespace
    // If it's not a curly then it falls back to the regular lexer. This function will validate the string afterwards.
    skipAny(lexerFlags);
    if (curtok.type !== $PUNC_CURLY_OPEN) {
      THROW('Expected to parse an opening curly, found `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToFromOrDie(what, lexerFlags) {
    skipToFromOrDie(lexerFlags);
  }
  function skipToFromOrDie(lexerFlags) {
    // The next token must be the ident "from"
    skipAny(lexerFlags);

    if (curtok.type !== $ID_from) {
      THROW('Next token should be the ident `from` but was `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToStringOrDie(what, lexerFlags) {
    skipToStringOrDie(lexerFlags);
  }
  function skipToStringOrDie(lexerFlags) {
    // The next token must be a string
    skipAny(lexerFlags);
    if (!isStringToken(curtok.type)) {
      THROW('Next token should be a string but was `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToIdentOrDie(what, lexerFlags) {
    skipToIdentOrDie(lexerFlags);
  }
  function skipToIdentOrDie(lexerFlags) {
    // The next token must be a string
    skipAny(lexerFlags);
    if (!isIdentToken(curtok.type)) {
      THROW('Next token should be an ident but was `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToArrowOrDie(what, lexerFlags) {
    skipToArrowOrDie(lexerFlags);
  }
  function skipToArrowOrDie(lexerFlags) {
    // Next token must be an arrow
    skipAny(lexerFlags);
    if (curtok.type !== $PUNC_EQ_GT) {
      THROW('Next token should be `=>` but was `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToAsOrDie(what, lexerFlags) {
    skipToAsOrDie(lexerFlags);
  }
  function skipToAsOrDie(lexerFlags) {
    // Next token must be `as`
    skipAny(lexerFlags);
    if (curtok.type !== $ID_as) {
      THROW('Next token should be `as` but was `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToAsCommaCurlyClose(what, lexerFlags) {
    skipToAsCommaCurlyClose(lexerFlags);
  }
  function skipToAsCommaCurlyClose(lexerFlags) {
    // Next token must be `as`, comma, or `}`
    skipAny(lexerFlags);
    ASSERT_VALID(curtok.type === $ID_as || curtok.type === $PUNC_COMMA || curtok.type === $PUNC_CURLY_CLOSE, 'limited options, wanted `as` , }', curtok);
  }
  function ASSERT_skipToAsCommaFrom(what, lexerFlags) {
    skipToAsCommaFrom(lexerFlags);
  }
  function skipToAsCommaFrom(lexerFlags) {
    // Next token must be `as`, with some whitespace
    skipAny(lexerFlags);
    ASSERT_VALID(curtok.type === $ID_as || curtok.type === $ID_from || curtok.type === $PUNC_COMMA, 'limited options, expecting `as` `from` comma', curtok);
  }
  function ASSERT_skipToColonOrDie(what, lexerFlags) {
    skipToColonOrDie(lexerFlags);
  }
  function skipToColonOrDie(lexerFlags) {
    // Next token must be `:`, with possibly some whitespace
    skipAny(lexerFlags);
    if (curtok.type !== $PUNC_COLON) {
      THROW('Next token should be `:` but was `' + tokenStrForError(curtok) + '`');
    }
  }
  function ASSERT_skipToTargetOrDie(what, lexerFlags) {
    skipToTargetOrDie(lexerFlags);
  }
  function skipToTargetOrDie(lexerFlags) {
    // Next token must be `target`, with unlikely some whitespace
    skipAny(lexerFlags);
    if (curtok.type !== $ID_target) {
      THROW('Next token should be `target` but was `' + tokenStrForError(curtok) + '`');
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
      isIdentToken(curtok.type) ||
      isStringToken(curtok.type) ||
      isTemplateStart(curtok.type) ||
      isNumberToken(curtok.type) ||
      isRegexToken(curtok.type) ||
      curtok.type === $PUNC_EXCL ||
      curtok.type === $PUNC_BRACKET_OPEN ||
      curtok.type === $PUNC_CURLY_OPEN ||
      curtok.type === $PUNC_PAREN_OPEN ||
      curtok.type === $PUNC_PLUS ||
      curtok.type === $PUNC_MIN ||
      curtok.type === $PUNC_PLUS_PLUS ||
      curtok.type === $PUNC_MIN_MIN ||
      curtok.type === $PUNC_TILDE ||
      curtok.type === $PUNC_SEMI ||
      curtok.type === $PUNC_CURLY_CLOSE ||
      curtok.type === $EOF || // do-while at at eof. do while is not a problem otherwise... (I think)
      false, 'expecting the start of a statement, a wide but limited set of valid tokens ' + curtok);
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
      isIdentToken(curtok.type) ||
      isStringToken(curtok.type) ||
      isTemplateStart(curtok.type) ||
      isNumberToken(curtok.type) ||
      isRegexToken(curtok.type) ||
      curtok.type === $PUNC_EXCL ||
      curtok.type === $PUNC_BRACKET_OPEN ||
      curtok.type === $PUNC_CURLY_OPEN ||
      curtok.type === $PUNC_PAREN_OPEN ||
      curtok.type === $PUNC_PLUS ||
      curtok.type === $PUNC_MIN ||
      curtok.type === $PUNC_PLUS_PLUS ||
      curtok.type === $PUNC_MIN_MIN ||
      curtok.type === $PUNC_TILDE ||
      curtok.type === $PUNC_DOT_DOT_DOT ||
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
      isIdentToken(curtok.type) ||
      isStringToken(curtok.type) ||
      isTemplateStart(curtok.type) ||
      isNumberToken(curtok.type) ||
      isRegexToken(curtok.type) ||
      curtok.type === $PUNC_EXCL ||
      curtok.type === $PUNC_BRACKET_OPEN ||
      curtok.type === $PUNC_CURLY_OPEN ||
      curtok.type === $PUNC_PAREN_OPEN ||
      curtok.type === $PUNC_PLUS ||
      curtok.type === $PUNC_MIN ||
      curtok.type === $PUNC_PLUS_PLUS ||
      curtok.type === $PUNC_MIN_MIN ||
      curtok.type === $PUNC_TILDE ||
      curtok.type === $PUNC_DOT_DOT_DOT ||
      curtok.type === $PUNC_PAREN_CLOSE ||
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
      isIdentToken(curtok.type) ||
      isStringToken(curtok.type) ||
      isTemplateStart(curtok.type) ||
      isNumberToken(curtok.type) ||
      isRegexToken(curtok.type) ||
      curtok.type === $PUNC_EXCL ||
      curtok.type === $PUNC_BRACKET_OPEN ||
      curtok.type === $PUNC_CURLY_OPEN ||
      curtok.type === $PUNC_PAREN_OPEN ||
      curtok.type === $PUNC_PLUS ||
      curtok.type === $PUNC_MIN ||
      curtok.type === $PUNC_PLUS_PLUS ||
      curtok.type === $PUNC_MIN_MIN ||
      curtok.type === $PUNC_TILDE ||
      curtok.type === $PUNC_DOT_DOT_DOT ||
      curtok.type === $PUNC_SEMI ||
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
      isIdentToken(curtok.type) ||
      isStringToken(curtok.type) ||
      isTemplateStart(curtok.type) ||
      isNumberToken(curtok.type) ||
      isRegexToken(curtok.type) ||
      curtok.type === $PUNC_EXCL ||
      curtok.type === $PUNC_BRACKET_OPEN ||
      curtok.type === $PUNC_CURLY_OPEN ||
      curtok.type === $PUNC_PAREN_OPEN ||
      curtok.type === $PUNC_PLUS ||
      curtok.type === $PUNC_MIN ||
      curtok.type === $PUNC_PLUS_PLUS ||
      curtok.type === $PUNC_MIN_MIN ||
      curtok.type === $PUNC_TILDE ||
      curtok.type === $PUNC_DOT_DOT_DOT ||
      curtok.type === $PUNC_COMMA ||
      curtok.type === $PUNC_BRACKET_CLOSE ||
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
      isIdentToken(curtok.type) ||
      isStringToken(curtok.type) ||
      isTemplateStart(curtok.type) ||
      isNumberToken(curtok.type) ||
      isRegexToken(curtok.type) ||
      curtok.type === $PUNC_EXCL ||
      curtok.type === $PUNC_BRACKET_OPEN ||
      curtok.type === $PUNC_CURLY_OPEN ||
      curtok.type === $PUNC_PAREN_OPEN ||
      curtok.type === $PUNC_PLUS ||
      curtok.type === $PUNC_MIN ||
      curtok.type === $PUNC_PLUS_PLUS ||
      curtok.type === $PUNC_MIN_MIN ||
      curtok.type === $PUNC_TILDE ||
      curtok.type === $PUNC_DOT_DOT_DOT || // should lead to an error, but the lexer can certainly return it
      curtok.type === $PUNC_DOT ||
      false, 'expecting the start of an expression or `.`, a wide but limited set of valid tokens');
  }
  function ASSERT_skipToSwitchBody(what, lexerFlags) {
    skipToSwitchBody(lexerFlags);
  }
  function skipToSwitchBody(lexerFlags) {
    // Next token must be `case`, `default`, or `}`, with likely some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID(curtok.type === $ID_case || curtok.type === $ID_default || curtok.type === $PUNC_CURLY_CLOSE, 'not many options, wanted case default }', curtok);
  }
  function ASSERT_skipToBindingStart(what, lexerFlags) {
    skipToBindingStart(lexerFlags);
  }
  function skipToBindingStart(lexerFlags) {
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID(isIdentToken(curtok.type) || curtok.type === $PUNC_BRACKET_OPEN || curtok.type === $PUNC_CURLY_OPEN || curtok.type === $PUNC_DOT_DOT_DOT, 'not many options, wanted ident ... [ {', curtok);
  }
  function ASSERT_skipToBindingStartGrouped(what, lexerFlags) {
    skipToBindingStartGrouped(lexerFlags);
  }
  function skipToBindingStartGrouped(lexerFlags) {
    // Same as bindingStart but it may also encounter a closing parenthesis (params)
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID(isIdentToken(curtok.type) || curtok.type === $PUNC_BRACKET_OPEN || curtok.type === $PUNC_CURLY_OPEN || curtok.type === $PUNC_DOT_DOT_DOT || curtok.type === $PUNC_PAREN_CLOSE, 'not many options, wanted ident ... [ { )', curtok);
  }
  function ASSERT_skipToColonParenOpen(what, lexerFlags) {
    skipToColonParenOpen(lexerFlags);
  }
  function skipToColonParenOpen(lexerFlags) {
    // Next token must be `:`, or `(`, with unlikely some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( curtok.type === $PUNC_COLON || curtok.type === $PUNC_PAREN_OPEN, 'not many options, wanted : (', curtok);
  }
  function ASSERT_skipToIdentParenOpen(what, lexerFlags) {
    skipToIdentParenOpen(lexerFlags);
  }
  function skipToIdentParenOpen(lexerFlags) {
    // Next token must be ident, or `(`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_PAREN_OPEN, 'not many options, wanted ident (', curtok);
  }
  function ASSERT_skipToIdentStarParenOpen(what, lexerFlags) {
    skipToIdentStarParenOpen(lexerFlags);
  }
  function skipToIdentStarParenOpen(lexerFlags) {
    // Next token must be ident, `*`, or `(`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_STAR || curtok.type === $PUNC_PAREN_OPEN, 'not many options, wanted ident * (', curtok);
  }
  function ASSERT_skipToIdentStarCurlyOpen(what, lexerFlags) {
    skipToIdentStarCurlyOpen(lexerFlags);
  }
  function skipToIdentStarCurlyOpen(lexerFlags) {
    // Next token must be ident, `*`, or `{`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_STAR || curtok.type === $PUNC_CURLY_OPEN, 'not many options, wanted ident * {', curtok);
  }
  function ASSERT_skipToCommaCurlyClose(what, lexerFlags) {
    skipToCommaCurlyClose(lexerFlags);
  }
  function skipToCommaCurlyClose(lexerFlags) {
    // Next token must be comma or `}`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( curtok.type === $PUNC_COMMA || curtok.type === $PUNC_CURLY_CLOSE, 'not many options, wanted , }', curtok);
  }
  function ASSERT_skipToIdentCurlyOpen(what, lexerFlags) {
    skipToIdentCurlyOpen(lexerFlags);
  }
  function skipToIdentCurlyOpen(lexerFlags) {
    // Next token must be ident, or `{`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_CURLY_OPEN, 'not many options, wanted ident {', curtok);
  }
  function ASSERT_skipToIdentCurlyClose(what, lexerFlags) {
    skipToIdentCurlyClose(lexerFlags);
  }
  function skipToIdentCurlyClose(lexerFlags) {
    // Next token must be ident, or `}`, with maybe some whitespace
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_CURLY_CLOSE, 'not many options, wanted ident }', curtok);
  }
  function ASSERT_skipToIdentStarCurlyOpenParenOpenString(what, lexerFlags) {
    skipToIdentStarCurlyOpenParenOpenString(lexerFlags);
  }
  function skipToIdentStarCurlyOpenParenOpenString(lexerFlags) {
    // Next token is whatever is valid after the `import` keyword (ident, star, curly open, string, or paren open)
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_STAR || curtok.type === $PUNC_CURLY_OPEN || curtok.type === $PUNC_PAREN_OPEN || isStringToken(curtok.type), 'not many options, wanted ident string * { (', curtok);
  }
  function ASSERT_skipToAwaitParenOpen(what, lexerFlags) {
    skipToAwaitParenOpen(lexerFlags);
  }
  function skipToAwaitParenOpen(lexerFlags) {
    // Next token must be `await`, or `(`. For example, after the `for` keyword
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    ASSERT_VALID( isIdentToken(curtok.type) || curtok.type === $PUNC_PAREN_OPEN, 'not many options, wanted ident (', curtok);
  }
  function ASSERT_skipToIdentStringNumberSquareOpen(what, lexerFlags) {
    skipToIdentStringNumberSquareOpen(lexerFlags);
  }
  function skipToIdentStringNumberSquareOpen(lexerFlags) {
    // Token after the star of an object/class method shorthand
    skipAny(lexerFlags);
    // Since the rest has to check it anyways we don't need to validate it here
    // Note: big int is okay here...
    ASSERT_VALID( isIdentToken(curtok.type) || isStringToken(curtok.type) || isNumberToken(curtok.type) || curtok.type === $PUNC_BRACKET_OPEN, 'not many options, wanted ident number string [', curtok);
  }

  function skipIdentSafeSlowAndExpensive(lexerFlags, leftHandSideExpression) {
    ASSERT(skipIdentSafeSlowAndExpensive.length === arguments.length, 'arg count');
    // skip an IDENT that may be a keyword
    // this can be done efficiently but in destructuring there are too many signals and so this needs to be done before
    // processing the ident for special cases that normally determine whether the next token is a div, regex, or any
    // this check is relatively slow but there's a plan to make these enums, which would improve things

    switch (curtok.type) {
      case $ID_delete:
      case $ID_typeof:
      case $ID_void:
        if (leftHandSideExpression === ONLY_LHSE) THROW('A unary expression is not allowed here');
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
          if (leftHandSideExpression === ONLY_LHSE) THROW('An `await` expression is not allowed here');
          ASSERT_skipToExpressionStart($G_IDENT, lexerFlags);
          return
        }
        ASSERT_skipDiv($ID_await, lexerFlags); // TODO: bin-op or tail-op or asi-continuation or `)` `]` `}`
        return;
      case $ID_yield:
        if (hasAnyFlag(lexerFlags, LF_IN_GENERATOR | LF_STRICT_MODE)) {
          if (leftHandSideExpression === ONLY_LHSE) THROW('A `yield` expression is not allowed here');
          ASSERT_skipRex($G_IDENT, lexerFlags); // Next is expr start or `*` or asi-continuation
          return;
        }
        ASSERT_skipDiv($ID_yield, lexerFlags); // TODO: bin-op or tail-op or asi-continuation or `)` `]` `}`
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
    parseBodyPartsWithDirectives(lexerFlags, scoop, EMPTY_LABEL_SET, exportedNames, exportedBindings, PARAMS_ALL_SIMPLE, NO_DUPE_PARAMS, NO_ID_TO_VERIFY, '', IS_GLOBAL_TOPLEVEL, FDS_VAR, 'body');

    // <SCRUB AST>
    ASSERT(_path.length === len, 'should close all that was opened. Open before: ' + JSON.stringify(bak.map(o=>o.type).join(' > ')) + ', open after: ' + JSON.stringify(_path.map(o=>o.type).join(' > ')));
    // </SCRUB AST>
    if (goalMode === GOAL_MODULE) {
      let globalNames = scoop.names;
      // assert that all exported symbols were in fact recorded
      exportedBindings.forEach(name => {
        if (name !== 'default' && (globalNames === HAS_NO_BINDINGS || !globalNames.has(name))) {
          THROW('Exporting a name that was not bound in global: `' + name + '`');
        }
      });
      ASSERT((function(){for (let key in exportedBindings) ASSERT(key[0] !== '#' || exportedBindings[key] === 1, 'key should be 1', exportedBindings[key]); return true})(), 'all bindings should exist exactly one, or have thrown an error');
    }
  }

  function SCOPE_createGlobal(desc) {
    // A dictionary of pound-sign prefixed variable names and a value for the type of binding they were recorded
    // - var (can not shadow a lex binding)
    // - lex (--> let, const, class, import, export) (can not coexist with another lex/var binding of same name)
    // - function decl let (top-level module goal, deals with edge case)
    // - function decl var (top-level script goal, deals with edge case)
    // - catch clause (can not be shadowed in catch body)
    // - param name (can not be shadowed by lex in func toplevel body)

    // while this comment probably gets lost, the name is `scoop` for greppability since `scope` is too generic
    let scoop = {
      parent: null,
      type: SCOPE_LAYER_GLOBAL,
      names: HAS_NO_BINDINGS, // Map (when necessary)
      dupeParamErrorToken: NO_DUPE_PARAMS,
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
    ASSERT([SCOPE_LAYER_GLOBAL, SCOPE_LAYER_FOR_HEADER, SCOPE_LAYER_BLOCK, SCOPE_LAYER_FUNC_PARAMS, SCOPE_LAYER_ARROW_PARAMS, SCOPE_LAYER_TRY, SCOPE_LAYER_CATCH_HEAD, SCOPE_LAYER_CATCH_BODY, SCOPE_LAYER_FINALLY, SCOPE_LAYER_SWITCH, SCOPE_LAYER_FUNC_ROOT, SCOPE_LAYER_FUNC_BODY, SCOPE_LAYER_FAKE_BLOCK].includes(scopeType), 'scopeType enum', scopeType);
    ASSERT(scoop === DO_NOT_BIND || scoop.isScope, 'expecting scoop', scoop);

    let scoopNew = {
      parent: scoop,
      type: scopeType,
      names: HAS_NO_BINDINGS, // Map (when necessary)
      // For arrows, dupe params can only be checked when seeing the arrow. `([a,a]);` is fine.
      // For function declarations in sloppy, this can only be validated once the inner directives are parsed
      dupeParamErrorToken: NO_DUPE_PARAMS,
    };
    ASSERT(scoopNew._type = S(scopeType), '(debugging)');
    ASSERT(scoopNew.isScope = true, '(debugging)');
    ASSERT(scoopNew._desc = desc + '.scope', '(debugging)');
    return scoopNew;
  }
  function SCOPE_addFuncDeclName(lexerFlags, scoop, name, bindingType, fdState) {
    ASSERT(SCOPE_addFuncDeclName.length === arguments.length, 'arg count');
    ASSERT([BINDING_TYPE_FUNC_VAR, BINDING_TYPE_FUNC_LEX, BINDING_TYPE_FUNC_STMT].includes(bindingType), 'either a func lex or var', bindingType);
    ASSERT(scoop === DO_NOT_BIND || scoop.isScope, 'expecting scoop', JSON.stringify(scoop));
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
      SCOPE_addVarBinding(lexerFlags, scoop, name, bindingType);
    } else {
      SCOPE_addLexBinding(scoop, name, bindingType, fdState);
    }
  }
  function SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, name) {
    ASSERT(SCOPE_actuallyAddBinding.length === arguments.length, 'arg count');
    ASSERT(typeof name === 'string', 'name is a string');
    ASSERT(scoop === DO_NOT_BIND || scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names, it must be a Map', scoop.names);
    ASSERT_BINDING_TYPE(bindingType);

    if (bindingType === BINDING_TYPE_VAR) {
      SCOPE_addVarBinding(lexerFlags, scoop, name, bindingType);
    }
    else {
      // TODO: arg?
      // TODO: is fdState ever relevant when parsing a binding here?
      SCOPE_addLexBinding(scoop, name, bindingType, FDS_ILLEGAL);
    }
  }
  function SCOPE_addVarBinding(lexerFlags, scoop, name, bindingType) {
    ASSERT(SCOPE_addVarBinding.length === arguments.length, 'arg count');
    ASSERT(typeof name === 'string', 'name = string', name);
    ASSERT(scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names, it must be a Map');
    ASSERT_BINDING_TYPE(bindingType);

    if (scoop === DO_NOT_BIND) {
      // for example: toplevel array, function expression, class expression
      // [v]: `[x = true] = y`
      // [v]: `foo([a, b] = arr);`
      // [v]: `x = class A {};`
      return;
    }

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
    let isLexBinding = SCOPE_bindingTypeIsLex(bindingType);
    let s = scoop;
    do {
      let value = s.names === HAS_NO_BINDINGS || !s.names.has(name) ? BINDING_TYPE_NONE : s.names.get(name);
      if (value !== BINDING_TYPE_NONE && SCOPE_bindingTypeIsLex(value)) {
        // There already was a binding of any kind with the same name on this statement level, or a variable declaration
        // of the same name in a statement that is a descendent of the current statement parent. This is the error.
        if (
          options_webCompat === WEB_COMPAT_ON &&
          hasNoFlag(lexerFlags, LF_STRICT_MODE) &&
          (
            (bindingType === BINDING_TYPE_FUNC_STMT && (value === BINDING_TYPE_FUNC_VAR || value === BINDING_TYPE_FUNC_LEX))
            ||
            (value === BINDING_TYPE_FUNC_STMT && (bindingType === BINDING_TYPE_FUNC_VAR || bindingType === BINDING_TYPE_FUNC_LEX))
          )
        ) {
          // https://tc39.es/ecma262/#sec-block-duplicates-allowed-static-semantics
          // https://tc39.es/ecma262/#sec-switch-duplicates-allowed-static-semantics
          // In web compat mode we can ignore errors when function statements cause dupe bindings when the binding
          // is only used for function declarations otherwise (so not another func statement!).
        }
        else if (isLexBinding) {
          THROW('Found a lexical binding that is duplicate of a lexical binding on the same statement level');
        }
        else {
          THROW('Found a var binding that is duplicate of a lexical binding on the same or lower statement level');
        }
      }
      if (s === scoop) {
        // Things to only check in the statement/scope level where they appear
        if (value !== BINDING_TYPE_NONE && isLexBinding) {
          THROW('Can not create a lexical binding for `' + name + '` because there already exists a binding on the same statement level');
        }
        else if (value === BINDING_TYPE_ARG && bindingType === BINDING_TYPE_ARG) {
          s.dupeParamErrorToken = curtok; // TOFIX: point to proper token
        }
      }
      if (value === BINDING_TYPE_CATCH_IDENT || value === BINDING_TYPE_CATCH_OTHER) {
        if (value === BINDING_TYPE_CATCH_IDENT && options_webCompat === WEB_COMPAT_ON && hasNoFlag(lexerFlags, LF_STRICT_MODE)) {
          // https://tc39.es/ecma262/#sec-variablestatements-in-catch-blocks
          // > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the VarDeclaredNames
          // > of Block unless CatchParameter is `CatchParameter: BindingIdentifier`.

          // Shadowing catch clause vars with regular vars is okay in web compat mode...
        } else {
          THROW('Can not create a binding for `' + name + '` because was already bound as a catch clause binding');
        }
      }
      if (s.names === HAS_NO_BINDINGS) s.names = new Map;
      s.names.set(name, bindingType);
      s = s.parent;
    } while (s && s.type !== SCOPE_LAYER_FUNC_ROOT);
  }
  function SCOPE_bindingTypeIsLex(t) {
    ASSERT_BINDING_TYPE(t);
    return t === BINDING_TYPE_LET || t === BINDING_TYPE_CONST || t === BINDING_TYPE_FUNC_LEX || t === BINDING_TYPE_FUNC_STMT || t === BINDING_TYPE_CLASS
  }
  function SCOPE_addLexBinding(scoop, name, bindingType, fdState) {
    ASSERT(SCOPE_addLexBinding.length === arguments.length, 'arg count');
    ASSERT(scoop === DO_NOT_BIND || scoop.names === HAS_NO_BINDINGS || scoop.names instanceof Map, 'if scoop has names then it must be a Map');
    ASSERT_BINDING_TYPE(bindingType);

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
    let value = scoop.names === HAS_NO_BINDINGS || !scoop.names.has(name) ? BINDING_TYPE_NONE : scoop.names.get(name);
    if (value !== BINDING_TYPE_NONE) {
      if (bindingType === BINDING_TYPE_ARG) {
        // This is an error but we can't throw yet because we may be inside the not-yet-confirmed arrow header which
        // may still end up being a plain group.
        // [x]: `((x,x)) = 5`
        // [x]: `((x,x)) => 5`
        // [x]: `((x,x) => x)`
        // [v]: `((x,x))`
        scoop.dupeParamErrorToken = curtok; // TODO: use correct token
      } else if (options_webCompat === WEB_COMPAT_ON && value === BINDING_TYPE_FUNC_LEX && fdState === FDS_LEX) {
        // https://tc39.es/ecma262/#sec-block-duplicates-allowed-static-semantics
        // > It is a Syntax Error if the LexicallyDeclaredNames of StatementList contains any duplicate entries, unless the
        // > source code matching this production is not strict mode code and the duplicate entries are only bound by FunctionDeclarations.
        // (so only ignore sibling function decls in blocks or switches, in sloppy mode, not in script global nor function root)
        // [v]: `{ function f() {} ; function f() {} }`
      } else {
        THROW('Attempted to create a lexical binding for `' + name + '` but another binding already existed on the same level');
      }
    }

    if (scoop.type === SCOPE_LAYER_FUNC_BODY && scoop.parent.names !== HAS_NO_BINDINGS && scoop.parent.names.has(name)) {
      THROW('Cannot create lexical binding for `' + name + '` because it shadows a function parameter');
    }

    if (scoop.type === SCOPE_LAYER_ARROW_PARAMS && value !== BINDING_TYPE_NONE) {
      if (bindingType === BINDING_TYPE_ARG) {
        // [v]: ((x,x))
        // [x]: ((x,x) = x)
        // [x]: ((x,x) => x)
        scoop.dupeParamErrorToken = curtok; // TODO: use correct token
      } else if (bindingType === BINDING_TYPE_CATCH_IDENT || bindingType === BINDING_TYPE_CATCH_OTHER) {
        // I guess we ignore this case...
        // [v]: `e => { try {} catch (e) {} }`
        // [v]: `e => { try {} catch ([e]) {} }`
      } else {
        THROW('Can not create a lexical binding for `' + name +'` because an arrow param already has that name');
      }
    }

    // [x]: `try {} catch ([x, x]) {}`
    // [x]: `try {} catch (x) { let x; }`
    // [v]: `try {} catch (x) { try {} catch (x) {} }`
    // [v]: `try {} catch (x) { try {} catch (y) { let x } }`
    if (bindingType === BINDING_TYPE_CATCH_IDENT || bindingType === BINDING_TYPE_CATCH_OTHER) {
      // Detect duplicate catch binding of the same catch clause
      if (value === BINDING_TYPE_CATCH_IDENT || value === BINDING_TYPE_CATCH_OTHER) {
        THROW('Can not create a lexical binding for `' + name + '` because it shadows a catch clause binding');
      }
    }
    else if (scoop.type === SCOPE_LAYER_CATCH_BODY) {
      // A lexical binding (or any var) in the catch block cannot be shadowing a catch clause binding
      ASSERT(scoop.parent && scoop.parent.type === SCOPE_LAYER_CATCH_HEAD, 'scoop body must have head as parent', scoop);
      let parentValue = scoop.parent.names === HAS_NO_BINDINGS || !scoop.parent.names.has(name) ? BINDING_TYPE_NONE : scoop.parent.names.get(name);
      if (parentValue === BINDING_TYPE_CATCH_IDENT || parentValue === BINDING_TYPE_CATCH_OTHER) {
        THROW('Can not create a lexical binding for `' + name + '` because it shadows a catch clause binding');
      }
    }

    let s = scoop.parent;
    while (s && s.type !== SCOPE_LAYER_FUNC_ROOT) {
      let value = s.names === HAS_NO_BINDINGS || !s.names.has(name)  ? BINDING_TYPE_NONE : s.names.get(name);
      if (s.type === SCOPE_LAYER_ARROW_PARAMS) {
        if (bindingType === BINDING_TYPE_CATCH_IDENT || bindingType === BINDING_TYPE_CATCH_OTHER) {
          // I guess we ignore this case...
          // [v]: `e => { try {} catch (e) {} }`
          // [v]: `e => { try {} catch ([e]) {} }`
        }
        else if (value !== BINDING_TYPE_NONE && scoop.parent === s) {
          THROW('Can not create a lexical binding for `' + name +'` because an arrow param already has that name');
        }
        else {
          // TODO: this one does not need a loop. `(a) => {{let a}}` is not a problem.
          if (bindingType === BINDING_TYPE_ARG) {
            // [v]: ((x,x))
            // [x]: ((x,x) = x)
            // [x]: ((x,x) => x)
            scoop.dupeParamErrorToken = curtok; // TODO: use correct token
          }
        }
      }
      s = s.parent;
    }

    if (scoop.names === HAS_NO_BINDINGS) scoop.names = new Map;
    scoop.names.set(name, bindingType);
  }

  function parseDirectivePrologues(lexerFlags, astProp) {
    ASSERT(arguments.length === parseDirectivePrologues.length, 'arg count');

    let hadUseStrict = false;
    let isStrict = hasAllFlags(lexerFlags, LF_STRICT_MODE);
    let hadOctal = false; // Edge case to guard against: `"x\077";"use strict";` is an error
    // note: there may be multiple (bogus or valid) directives...
    while (isStringToken(curtok.type)) {
      // we must first parse as usual to confirm this is an isolated string and not
      // something like `''.foo` or `'' + x`. We can't easily scan forward in this
      // case since asi is only applied when the next token would cause a syntax
      // error. There many tokens to check. However this is a fairly cold path since
      // this will almost never happen outside of "use strict" so perhaps a pervasive
      // scan here is not so bad... And let's face it; trivial cases are quickly found.
      let stringToken = curtok;
      let stringTokenCanon = tok_getCanon();
      ASSERT_skipDiv($G_STRING, lexerFlags); // statement start means div
      _AST_setLiteral(astProp, stringToken, stringTokenCanon, true);

      // Remember the next token. Do a regular parse. If the next token is still the same token then there was no tail
      // and we can assume ASI will happen.
      let nextToken = curtok;
      // Since this must be the start of a block, we only have to care about a semi in this case
      if (curtok.type !== $PUNC_SEMI) {
        // [v]: `"use strict" + x`   (valid, but it's not strict mode)
        // [v]: `"use strict", x`  (valid, but it's not strict mode)
        // [v]: `"use strict" \n x`  (valid and strict mode)
        parseExpressionAfterLiteral(lexerFlags, stringToken, astProp);
        if (curtok.type !== $PUNC_SEMI) {
          // [v]: `"use strict" + x`   (valid, but it's not strict mode)
          parseExpressionFromOp(lexerFlags, stringToken, NOT_ASSIGNABLE, astProp);
          if (curtok.type === $PUNC_COMMA) {
            // [v]: `"use strict", x`  (valid, but it's not strict mode)
            _parseExpressions(lexerFlags, stringToken, NOT_ASSIGNABLE, astProp);
          }
        }
      }

      if (curtok === nextToken) {
        // There was no tail, no op, no comma, so this was ASI, I hope. Or an error.
        // This is a directive. It may be nonsense, but it's a string in the head so it's a directive.

        let dir = stringToken.str;

        // Check all directives for octals because strict mode may be enabled by a directive later in the same block
        // and that would still cause a previous sibling directive with octal escape to be an error.
        if (!isStrict && /(^|[^\\])\\(?:0\d|[1-9])/.test(dir)) {
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
          //    - this can be caught now by checking the curtok.type
          // - octal escapes in string literals
          //    - the string literal can be scanned ... this is kind of dirty. ideally we'd pass a new flag but that's a
          //      can of worms I'd rather not open here.
          // - octal escapes in templates
          //    - ok this is actually not strict mode sensitive because templates never allow them
          // Since we don't have other cases (at the time of writing...), we can catch every one of these and don't have
          // to backtrack for it.

          // Note: the next two checks are not needed if we already were strict because the lexer would have done that
          if (!isStrict) {
            if (curtok.type === $NUMBER_OLD) {
              // - `"use strict" \n 0123`
              THROW('Illegal legacy octal literal in strict mode');
            }
            if (!hadOctal && /(^|[^\\])\\(?:0\d|[1-9])/.test(dir)) {
              // We can't really validate this with a regex. And yet, here we are :'(
              // [v]: `"x\\0"`
              // [x]: `"x\\0"; "use strict";`
              // [v]: `"x\\\\0"; "use strict";`
              THROW_TOKEN('Octal in directive with strict mode directive or in strict mode is always illegal');
            }
          }

          isStrict = true;
        }

        if (AST_directiveNodes && !babelCompat) {
          AST_setNodeDangerously(astProp, { // we know we will overwrite the existing string node
            type: 'Directive',
            loc: AST_getClosedLoc(stringToken),
            directive: dir,
          });
          parseSemiOrAsi(lexerFlags);
        }
        else {
          parseSemiOrAsi(lexerFlags);
          AST_setNodeDangerously(astProp, { // we are going to clobber a value
            type: 'ExpressionStatement',
            loc: AST_getClosedLoc(stringToken),
            expression: AST_popNode(astProp),
            directive: dir,
          });
        }
      } else {
        parseSemiOrAsi(lexerFlags);
        AST_setNodeDangerously(astProp, { // we are going to clobber a value
          type: 'ExpressionStatement',
          loc: AST_getClosedLoc(stringToken),
          expression: AST_popNode(astProp),
        });
        break; // end of directives
      }
    }

    if (hadOctal && isStrict) {
      // This throws for any directive with an octal if use strict was enabled before or by any directive
      THROW_TOKEN('Octal in directive with strict mode directive or in strict mode is always illegal');
    }

    return hadUseStrict;
  }

  function parseBodyPartsWithDirectives(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, paramsSimple, dupeParamErrorToken, functionNameTokenToVerify, functionNameTokenToVerifyCanon, isGlobalToplevel, fdState, astProp) {
    ASSERT(parseBodyPartsWithDirectives.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT([PARAMS_SOME_COMPLEX, PARAMS_SOME_NONSTRICT, PARAMS_ALL_SIMPLE].includes(paramsSimple), 'paramsSimple enum', paramsSimple);
    ASSERT_LABELSET(labelSet);

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
        THROW('Can only declare use strict if func params are "simple"');
      }

      if (!wasStrict && functionNameTokenToVerify !== NO_ID_TO_VERIFY &&
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        // Check the idents that are only keywords in strict mode. We've already checked everything else.
        isStrictOnlyKeyword(functionNameTokenToVerify, functionNameTokenToVerifyCanon)
      ) {
        THROW('Can not use reserved keyword `' + functionNameTokenToVerifyCanon + '` in strict mode as id for function that has a use strict directive');
      }

      lexerFlags |= LF_STRICT_MODE;
    }

    if (dupeParamErrorToken !== NO_DUPE_PARAMS && (paramsSimple === PARAMS_SOME_COMPLEX || isStrict)) {
      THROW_TOKEN('Function had duplicate params', dupeParamErrorToken);
    }

    while (curtok.type !== $EOF && curtok.type !== $PUNC_CURLY_CLOSE) {
      parseBodyPart(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, NOT_LABELLED, fdState, PARENT_NOT_LABEL, astProp);
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

    let set = {parentLabels: labelSet, iterationLabels: null};
    ASSERT(set.IS_LABEL_SET = true);
    ASSERT(set.desc = desc);
    return set;
  }

  function parseStatementHeader(lexerFlags, headProp) {
    ASSERT(typeof lexerFlags === 'number', 'lexerflags number');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_TEMPLATE), 'I think template resets itself');
    ASSERT_VALID(curtok.type === $PUNC_PAREN_OPEN, 'all callers should have called `skipToParenOpenOrDie()` which should verify this invariant');

    ASSERT_skipToExpressionStart($PUNC_PAREN_OPEN, lexerFlags);
    parseExpressions(sansFlag(lexerFlags | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION), headProp);
    if (curtok.type !== $PUNC_PAREN_CLOSE) THROW('Missing closing paren of statement header, found `' + tokenStrForError(curtok) + '` instead');
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
    ASSERT_VALID((!isRegexToken(curtok.type) && curtok.type !== $PUNC_DIV && curtok.type !== $PUNC_DIV_EQ) || ASSERT_ASI_REGEX_NEXT || (ASSERT_ASI_REGEX_NEXT = false), 'The next token starts with a forward slash but neither a division nor a regular expression is legal here. This should be handled elsewhere.');

    if (curtok.type === $PUNC_SEMI) {
      ASSERT_skipToStatementStart(';', lexerFlags);
      return;
    }

    ASSERT(hasNoFlag(lexerFlags, LF_NO_ASI), 'this case should have been caught sooner');

    // note: must check eof/semi as well otherwise the value would be mandatory and parser would throw
    if (curtok.type === $PUNC_CURLY_CLOSE || tok_getNlwas() === true || curtok.type === $EOF) {
      tok_asi();
    } else {
      $log('parse error at curent token');
      $log('current token:', curtok);
      THROW('Unable to ASI, token: ' + curtok);
    }
  }

  function parseNestedBodyPart(lexerFlags, scoop, labelSet, isLabelled, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseNestedBodyPart.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    // nested statements like that of if, while, for, try, etc
    if (curtok.type === $EOF) THROW('Statement must have a sub-statement but found EOF instead');
    parseBodyPart(lexerFlags, scoop, labelSet, UNDEF_EXPORTS, UNDEF_EXPORTS, NOT_GLOBAL_TOPLEVEL, isLabelled, fdState, nestedLabels, astProp);
  }

  function parseBodyPart(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseBodyPart.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(curtok.type !== $ERROR && curtok.type !== $EOF, 'token type should not have $error or $eof at this point');
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');
    ASSERT_LABELSET(labelSet);

    ASSERT(!void(ASSERT_ASI_REGEX_NEXT = false));

    if (isIdentToken(curtok.type)) {
      parseIdentStatement(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp);
      return;
    }

    if (isPunctuatorToken(curtok.type)) {
      parsePunctuatorStatement(lexerFlags, scoop, labelSet, astProp);
      return;
    }

    if (isNumberToken(curtok.type)) {
      parseFromNumberStatement(lexerFlags, astProp);
      return;
    }

    if (isStringToken(curtok.type)) {
      parseFromStringStatement(lexerFlags, astProp);
      return;
    }

    if (isTickToken(curtok.type)) {
      parseTickStatement(lexerFlags, curtok, astProp);
      return;
    }

    if (isRegexToken(curtok.type)) {
      parseFromRegexStatement(lexerFlags, astProp);
      return;
    }

    if (curtok.type === $ERROR) {
      THROW_TOKEN('Lexer error: ' + tok_lexError(), curtok );
      return;
    }

    THROW_TOKEN('Unexpected token'
      // <SCRUB DEV>
      + ': ' + T(curtok.type)
      // </SCRUB DEV>
      , curtok
      , tok_lexError()
    );
  }

  // ### functions

  function parseFunctionDeclaration(lexerFlags, scoop, isFuncDecl, isRealFuncExpr, asyncToken, functionToken, optionalIdent, isLabelled, fdState, astProp) {
    ASSERT(parseFunctionDeclaration.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerflags number');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(curtok === functionToken, 'should not have skipped token yet');
    ASSERT_FDS(fdState);
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');

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
    let starToken = UNDEF_STAR;
    if (curtok.type === $PUNC_STAR) {
      starToken = curtok;
      if (isFuncDecl === IS_FUNC_DECL && fdState === FDS_IFELSE) {
        // [x]: `foo: function *f(){}`
        THROW_TOKEN('Labelled function statements must be plain functions, not generators', starToken);
      }
      ASSERT_skipToIdentParenOpen('*', lexerFlags);
      if (asyncToken !== UNDEF_ASYNC && !allowAsyncGenerators) {
        THROW_TOKEN('Async generators are not supported by the current targeted language version, they were introduced in ES9/ES2018', asyncToken);
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
      if (fdState === FDS_IFELSE) {
        // - `if (x) foo: function f(){}`
        // - `if (x); else foo: function f(){}`
        THROW_TOKEN('A "labelled function declaration" is never allowed inside an if-else', functionToken);
      }
      if (fdState === FDS_ILLEGAL) {
        // - `while (x) foo: function f(){}`
        // - `for (;;) foo: function f(){}`
        // - `with (x) foo: function f(){}`
        THROW_TOKEN('A "labelled function declaration" is not allowed in this situation', functionToken);
      }
      if (asyncToken !== UNDEF_ASYNC) {
        // - `foo: async function f(){}`
        THROW_TOKEN('A "labelled function declaration" can not be async', asyncToken);
      }
      if (starToken !== UNDEF_STAR) {
        // - `foo: function *f(){}`
        THROW_TOKEN('A "labelled function declaration" can not be a generator', starToken);
      }
      // Put the generic webcompat error last to make all modes as similar as possible
      if (options_webCompat === WEB_COMPAT_OFF || hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
        THROW('A "labelled function declaration" is only allowed in sloppy web compat mode');
      }
    }
    else if (fdState === FDS_IFELSE) {
      // NOT labelled!

      if (asyncToken !== UNDEF_ASYNC) {
        // - `if (x) async function f(){}`
        THROW_TOKEN('An async function declaration in web compat mode is still not allowed as `if-else` child, only plain func decls are allowed there', asyncToken);
      }
      if (starToken !== UNDEF_STAR) {
        // - `if (x) function *f(){}`
        THROW_TOKEN('A generator function declaration in web compat mode is still not allowed as `if-else` child, only plain func decls are allowed there', starToken);
      }
      // Put the generic webcompat error last to make all modes as similar as possible
      if (options_webCompat === WEB_COMPAT_OFF || hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
        // - `while (x) function f(){}`
        // - `with (x) function f(){}`
        THROW_TOKEN('A function declaration can only be the child of an `if`/`else` in sloppy web compat mode', functionToken);
      }

      // Labelled func decls do not leak their name into global space (but they do for a label in a block!)
      // IfStatements always consider a func decl as if wrapped in a block, so never leak its name outward
      scoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FAKE_BLOCK, 'special "fake-block" function statement for label');
      ASSERT(scoop.$funcName = curtok.str); // meh. just for debugggin.

      // TLDR: labelled functions are always statements and use same binding propagation rules as non-labelled functions
      // This rule ONLY applies to plain functions. Async / generators or other types of declarations are illegal here!
    }
    else if (isFuncDecl === IS_FUNC_DECL && fdState === FDS_ILLEGAL) {
      // https://tc39.es/ecma262/#prod-LabelledItem
      // A function declaration is allowed as child of a label, but that case does not allow async/star
      // This case is a "labelled function declaration"
      THROW_TOKEN('Cannot parse a function declaration here, only expecting statements here', functionToken);
    }
    else {
      // This is always fine in es6+
    }

    return parseFunctionAfterKeyword(
      lexerFlags,
      scoop,
      isFuncDecl,
      isRealFuncExpr,
      optionalIdent,
      NOT_CONSTRUCTOR,
      NOT_METHOD,
      asyncToken,
      starToken,
      UNDEF_GET,
      UNDEF_SET,
      asyncToken === UNDEF_ASYNC ? functionToken : asyncToken,
      fdState,
      astProp
    );
  }
  function parseFunctionExpression(lexerFlags, asyncToken, functionToken, astProp) {
    ASSERT(parseFunctionExpression.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token', asyncToken);

    let starToken = UNDEF_STAR;
    if (curtok.type === $PUNC_STAR) {
      starToken = curtok;
      ASSERT_skipToIdentParenOpen('*', lexerFlags);
      if (asyncToken !== UNDEF_ASYNC && !allowAsyncGenerators) {
        THROW('Async generators are not supported by the current targeted language version, they were introduced in ES9/ES2018');
      }
    }

    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      IS_FUNC_EXPR,
      IDENT_REQUIRED,
      NOT_CONSTRUCTOR,
      NOT_METHOD,
      asyncToken,
      starToken,
      UNDEF_GET,
      UNDEF_SET,
      asyncToken === UNDEF_ASYNC ? functionToken : asyncToken,
      FDS_ILLEGAL, // this flag is not relevant for func exprs
      astProp
    );
  }
  function parseAsyncFunctionDecl(lexerFlags, asyncToken, fromStmtOrExpr, scoop, isExport, exportedBindings, isLabelled, fdState, astProp) {
    ASSERT(parseAsyncFunctionDecl.length === arguments.length, 'arg count');
    ASSERT(curtok.type === $ID_function, 'already checked, not yet consumed');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');

    let name = parseFunctionDeclaration(
      lexerFlags,
      scoop,
      fromStmtOrExpr === IS_EXPRESSION ? NOT_FUNC_DECL : IS_FUNC_DECL,
      fromStmtOrExpr === IS_EXPRESSION ? IS_FUNC_EXPR : NOT_FUNC_EXPR,
      asyncToken,
      curtok, // `function`
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
      addBindingToExports(exportedBindings, name);
    }

    return NOT_ASSIGNABLE;
  }
  function parseFunctionAfterKeyword(
    lexerFlags,
    outerScoop,
    isFuncDecl,
    isRealFuncExpr,
    optionalIdent,
    isClassConstructor,
    isMethod,
    asyncToken,
    starToken,
    getToken,
    setToken,
    firstToken, // for range in AST, `function` or `async` or method name/modifiers
    fdState, // for errors and scoping
    astProp
  ) {
    ASSERT(arguments.length === parseFunctionAfterKeyword.length, 'arg count must match');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT((isFuncDecl === IS_FUNC_DECL) === (outerScoop !== DO_NOT_BIND), 'outerScoop is only used for func decl ids and required there', isFuncDecl === IS_FUNC_DECL, outerScoop !== DO_NOT_BIND);
    ASSERT(typeof firstToken === 'object' && firstToken && typeof firstToken.type === 'number', 'token', firstToken);
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
      AST_set('generator', starToken !== UNDEF_STAR);
      AST_set('async', asyncToken !== UNDEF_ASYNC);
    } else if (acornCompat) {
      AST_open(astProp, {
        type: isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression',
        loc: AST_getBaseLoc(firstToken),
        // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
        generator: starToken !== UNDEF_STAR,
        async: asyncToken !== UNDEF_ASYNC,
        expression: false,
        id: undefined,
        params: [],
        body: undefined,
      });
    } else {
      AST_open(astProp, {
        type: isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression',
        loc: AST_getBaseLoc(firstToken),
        // name value doesn't seem to be specced in estree but it makes sense to use the canonical name here
        generator: starToken !== UNDEF_STAR,
        async: asyncToken !== UNDEF_ASYNC,
        id: undefined,
        params: [],
        body: undefined,
      });
    }

    if (asyncToken !== UNDEF_ASYNC) {
      if (!allowAsyncFunctions) {
        THROW('Async functions are not supported in the currently targeted version, they are >= ES8 / ES2017');
      }
      if (starToken !== UNDEF_STAR && !allowAsyncGenerators) {
        THROW('Async generator functions are not supported in the currently targeted version, they are >= ES9 / ES2018');
      }
    }

    let innerScoop = SCOPE_createGlobal('parseFunctionAfterKeyword_main_func_scope');
    ASSERT(innerScoop._ = 'func scope');

    // need to track whether the name was eval/args because if the func body is strict mode then it should still throw
    // retroactively for having that name. a bit annoying.
    let functionNameTokenToVerify = NO_ID_TO_VERIFY;
    let functionNameTokenToVerifyCanon = '';

    let name = '';
    if (isIdentToken(curtok.type)) {
      functionNameTokenToVerify = curtok; // if not strict mode yet but this func has a directive, check it again
      functionNameTokenToVerifyCanon = tok_getCanon();

      // properly inherit the async/gen state from the outer scope (func decls) or current function (func expr)
      let bindingFlags = (
        sansFlag(lexerFlags, LF_IN_GENERATOR | LF_IN_ASYNC)
        |
        getFuncIdentAsyncGenState(isRealFuncExpr, lexerFlags, starToken, asyncToken)
      );

      // A function name is bound lexically, except when directly in script-goal global scope or any-goal function scope
      let nameBindingType = (
        isFuncDecl === IS_FUNC_DECL &&
        fdState === FDS_VAR &&
        (hasNoFlag(lexerFlags, LF_IN_GLOBAL) || goalMode === GOAL_SCRIPT)
      ) ? BINDING_TYPE_FUNC_VAR : BINDING_TYPE_FUNC_LEX;

      name = functionNameTokenToVerify.str;

      // Note: must verify id here and not after asserting the existence of the directive because by then the lexer flag
      // for async will have been merged and `async function await(){}` would be illegal.
      // The binding of a function could be considered lexical, but is probably the only lexical case that can be `let`
      // The id is passed forward and validated on a subset, if it turns out the func has a use strict directive.
      fatalBindingIdentCheck(functionNameTokenToVerify, functionNameTokenToVerifyCanon, curtok.type === $ID_let ? BINDING_TYPE_VAR : nameBindingType, bindingFlags);

      // declarations bind in outer scope, expressions bind in inner scope, methods bind ...  ehh?
      if (isFuncDecl === IS_FUNC_DECL) {
        // TODO: add test case for catch shadow
        SCOPE_addFuncDeclName(lexerFlags, outerScoop, name, nameBindingType, fdState);
      }

      // create new lexical binding to "hide" the function name.
      // this way it wont cause problems when doing `x=function f(){ let f; }`
      innerScoop = SCOPE_addLayer(innerScoop, SCOPE_LAYER_FUNC_ROOT, 'parseFunctionAfterKeyword_hide_func_name');
      ASSERT(innerScoop._ = 'func scope');

      ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);
      AST_setIdent('id', functionNameTokenToVerify, functionNameTokenToVerifyCanon);
    } else if (isFuncDecl === IS_FUNC_DECL && optionalIdent === IDENT_REQUIRED) {
      THROW('Function decl missing required ident');
    } else {
      AST_set('id', null);
    }

    // reset the async lexer flags. some don't cross function boundaries
    // make sure the LF_CAN_NEW_DOT_TARGET flag is set from here on out, this enables new.target (is allowed in arg default)
    // note: we dont reset the template lexer flag here. instead we do it at any place where we parse curly pairs
    //       this fixes the problem of parsing arrow functions where we can't tell whether the next token is part
    //       of the arrow expression until after parsing and processing that token. that needs curly pair checks.
    lexerFlags = resetLexerFlagsForFuncAndArrow(lexerFlags, starToken, asyncToken, NOT_ARROW);

    // super() is allowed in constructor param defaults so deal with the flag now...
    // these flags dont reset in arrows so only do it here
    if (isClassConstructor === IS_CONSTRUCTOR) {
      ASSERT(asyncToken === UNDEF_ASYNC, 'class constructors are not async');
      ASSERT(starToken === UNDEF_STAR, 'class constructors are not generators');
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
      asyncToken === UNDEF_ASYNC ? FROM_OTHER_FUNC_ARG : FROM_ASYNC_ARG,
      isFuncDecl === IS_FUNC_DECL ? IS_STATEMENT : IS_EXPRESSION,
      isClassConstructor,
      functionNameTokenToVerify,
      functionNameTokenToVerifyCanon,
      isMethod,
      asyncToken,
      starToken,
      getToken,
      setToken
    );

    if (!babelCompat || isMethod === NOT_METHOD) { // Babel extends the Function node to be a ClassMethod, rather than .value
      AST_close(isFuncDecl === IS_FUNC_DECL ? 'FunctionDeclaration' : 'FunctionExpression');
    }

    return name;
  }
  function getFuncIdentGeneratorState(isRealFuncExpr, enclosingScopeFlags, starToken) {
    ASSERT(getFuncIdentGeneratorState.length === arguments.length, 'arg count');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(isRealFuncExpr === IS_FUNC_EXPR || isRealFuncExpr === NOT_FUNC_EXPR, 'isRealFuncExpr enum');

    // function idents can never be `yield` with the module goal
    if (hasAllFlags(enclosingScopeFlags, LF_STRICT_MODE)) return LF_IN_GENERATOR;

    if (isRealFuncExpr === IS_FUNC_EXPR) return starToken !== UNDEF_STAR ? LF_IN_GENERATOR : 0;
    return hasAnyFlag(enclosingScopeFlags, LF_IN_GENERATOR) ? LF_IN_GENERATOR : 0;
  }
  function getFuncIdentAsyncState(isRealFuncExpr, enclosingScopeFlags, asyncToken) {
    ASSERT(getFuncIdentAsyncState.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(isRealFuncExpr === IS_FUNC_EXPR || isRealFuncExpr === NOT_FUNC_EXPR, 'isRealFuncExpr enum (2)');

    // function idents can never be `await` with the module goal
    if (goalMode === GOAL_MODULE) return LF_IN_ASYNC;

    if (isRealFuncExpr === IS_FUNC_EXPR) return asyncToken !== UNDEF_ASYNC ? LF_IN_ASYNC : 0;
    return hasAnyFlag(enclosingScopeFlags, LF_IN_ASYNC) ? LF_IN_ASYNC : 0;
  }
  function getFuncIdentAsyncGenState(isRealFuncExpr, enclosingScopeFlags, starToken, asyncToken) {
    ASSERT(getFuncIdentAsyncGenState.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');

    return getFuncIdentGeneratorState(isRealFuncExpr, enclosingScopeFlags, starToken) |
      getFuncIdentAsyncState(isRealFuncExpr, enclosingScopeFlags, asyncToken)
  }
  function resetLexerFlagsForFuncAndArrow(lexerFlags, starToken, asyncToken, funcType) {
    ASSERT(resetLexerFlagsForFuncAndArrow.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');

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
    if (asyncToken !== UNDEF_ASYNC) {
      lexerFlags |= LF_IN_ASYNC;
    }
    if (starToken !== UNDEF_STAR) {
      lexerFlags |= LF_IN_GENERATOR;
    }

    // dont remove the template flag here! let curly pair structures deal with this individually (fixes arrows)
    if (funcType === NOT_ARROW) lexerFlags = lexerFlags | LF_CAN_NEW_DOT_TARGET;

    return lexerFlags;
  }
  function parseFunctionFromParams(lexerFlags, scoop, bindingFrom, expressionState, isClassConstructor, functionNameTokenToVerify, functionNameTokenToVerifyCanon, isMethod, asyncToken, starToken, getToken, setToken) {
    ASSERT(parseFunctionFromParams.length === arguments.length, 'arg count should match');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT(typeof lexerFlags === 'number');

    // - `function f(a){}`
    //              ^
    // - `x = {f(a){}}`
    //          ^

    let paramScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FUNC_PARAMS, 'parseFunctionFromParams(arg)');
    ASSERT(!void(scoop._funcName = functionNameTokenToVerify && functionNameTokenToVerify.str));
    // `yield` can certainly NOT be a var name if either parent or current function was a generator, so track it
    let paramsSimple = parseFuncArguments(lexerFlags | LF_NO_ASI, paramScoop, bindingFrom, asyncToken, starToken, getToken, setToken);
    ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'the paretocurlyopen should already throw (not assert) if the next token is not a curly open');

    if (isMethod === IS_METHOD && paramScoop.dupeParamErrorToken !== NO_DUPE_PARAMS) {
      // Dupe params are never allowed in methods
      THROW_TOKEN('Method had duplicate params', paramScoop.dupeParamErrorToken);
    }

    let finalFuncScope = SCOPE_addLayer(paramScoop, SCOPE_LAYER_FUNC_BODY, 'parseFunctionFromParams(body)');
    ASSERT(!void(finalFuncScope._funcName = functionNameTokenToVerify && functionNameTokenToVerify.str));
    if (options_exposeScopes) AST_set('$scope', finalFuncScope);
    parseFunctionBody(lexerFlags, finalFuncScope, EMPTY_LABEL_SET, expressionState, paramsSimple, paramScoop.dupeParamErrorToken, functionNameTokenToVerify, functionNameTokenToVerifyCanon);
  }
  function parseFuncArguments(lexerFlags, scoop, bindingFrom, asyncToken, starToken, getToken, setToken) {
    // parseArguments
    ASSERT(arguments.length === parseFuncArguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');

    // - `function f(a){}`
    //              ^
    // - `x = {f(a){}}`
    //          ^

    lexerFlags = lexerFlags | LF_IN_FUNC_ARGS; // prevents await expression as default arg

    let paramsSimple = PARAMS_ALL_SIMPLE;

    if (curtok.type !== $PUNC_PAREN_OPEN) {
      THROW('Must have func arguments next but did not find `(`');
    }
    ASSERT_skipToBindingStartGrouped($PUNC_PAREN_OPEN, lexerFlags);

    // - `function f(a){}`
    //               ^
    // - `x = {f(a){}}`
    //           ^

    if (curtok.type === $PUNC_PAREN_CLOSE) {
      // - `function f(){}`
      //               ^
      if (setToken !== UNDEF_SET) {
        // - `x = {set f(){}}`
        //               ^
        THROW('Setters must have exactly one parameter');
      }
      ASSERT_skipToCurlyOpenOrDie($PUNC_PAREN_CLOSE, lexerFlags);
    }
    else if (getToken !== UNDEF_GET) {
      // - `x = {get f(x){}}`
      //               ^
      THROW('Getters can not have any parameters');
    }
    else {
      // - `function f([x]){}`
      //               ^
      // - `x = {f(a,b){}}`
      //           ^
      // Skip dupe checks because dupe param names are allowed in sloppy mode if the params are all "simple"
      paramsSimple = parseBindings(lexerFlags, scoop, BINDING_TYPE_ARG, bindingFrom, ASSIGNMENT_IS_DEFAULT, setToken, UNDEF_EXPORTS, UNDEF_EXPORTS, 'params');
      AST_destruct('params');
      ASSERT(curtok.type !== $PUNC_COMMA, 'the trailing func comma case should already be caught by now');
      if (curtok.type !== $PUNC_PAREN_CLOSE) THROW('Missing function param definition closing parenthesis, found `' + tokenStrForError(curtok) + '` instead');
      ASSERT_skipToCurlyOpenOrDie($PUNC_PAREN_CLOSE, lexerFlags);
    }

    return paramsSimple;
  }

  function parseFunctionBody(lexerFlags, scoop, labelSet, blockType, paramsSimple, dupeParamErrorToken, functionNameTokenToVerify, functionNameTokenToVerifyCanon) {
    ASSERT(parseFunctionBody.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof lexerFlags === 'number');
    ASSERT(typeof labelSet === 'object');
    ASSERT_VALID(curtok.type === $PUNC_CURLY_OPEN, 'block opening token should already have been confirmed, but not yet consumed');
    ASSERT([PARAMS_SOME_COMPLEX, PARAMS_SOME_NONSTRICT, PARAMS_ALL_SIMPLE].includes(paramsSimple), 'paramsSimple enum', paramsSimple);
    ASSERT_LABELSET(labelSet);

    let lexerFlagsNoTemplate = sansFlag(lexerFlags, LF_IN_TEMPLATE | LF_NO_ASI | LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION);

    let curlyToken = curtok;
    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlagsNoTemplate); // [v]: `(x)=>{/x/}`  TODO: next must be statement start or `}`
    AST_open('body', {
      type: 'BlockStatement',
      loc: AST_getBaseLoc(curlyToken),
      body: [],
    });
    if (options_exposeScopes) AST_set('$scope', scoop);

    parseBodyPartsWithDirectives(lexerFlagsNoTemplate, scoop, labelSet, UNDEF_EXPORTS, UNDEF_EXPORTS, paramsSimple, dupeParamErrorToken, functionNameTokenToVerify, functionNameTokenToVerifyCanon, NOT_GLOBAL_TOPLEVEL, FDS_VAR, 'body');

    if (curtok.type !== $PUNC_CURLY_CLOSE) THROW('Missing function body closing curly, found `' + tokenStrForError(curtok) + '` instead');
    if (blockType === IS_EXPRESSION) {
      // arrow with block, function expression
      ASSERT_skipDiv($PUNC_CURLY_CLOSE, lexerFlags);
    } else {
      ASSERT(blockType === IS_STATEMENT, 'either expression or not');
      // function declaration
      ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, lexerFlags);
    }
    AST_close('BlockStatement');

    if (curtok.type === $PUNC_EQ) {
      THROW('Object destructuring is not allowed at the start of statement or arrow body, must wrap the object in parenthesis for that to work');
    }
  }

  // ### statements

  function parseIdentStatement(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp) {
    ASSERT(parseIdentStatement.length === arguments.length, 'arg count');
    ASSERT(isLabelled === IS_LABELLED || isLabelled === NOT_LABELLED, 'isLabelled enum');
    ASSERT_LABELSET(labelSet);

    // all statement starting keywords;

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    switch (identToken.type) {
      case $ID_async:
        // we deal with async here because it can be a valid label in sloppy mode
        // TODO: test case to this change
        ASSERT_skipDiv($ID_async, lexerFlags); // TODO: async could be ident, so `async/b` is a division
        if (curtok.type === $PUNC_COLON) return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp);
        parseAsyncStatement(lexerFlags, scoop, identToken, identTokenCanon, NOT_EXPORT, UNDEF_EXPORTS, isLabelled, fdState, astProp);
        return;

      case $ID_break:
        parseBreakStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_class:
        parseClassDeclaration(lexerFlags, scoop, IDENT_REQUIRED, isLabelled, fdState, astProp);
        return;

      case $ID_const:
        parseConstStatement(lexerFlags, scoop, isLabelled, fdState, astProp);
        return;

      case $ID_continue:
        parseContinueStatement(lexerFlags, scoop, labelSet, astProp);
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
        parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, UNDEF_ASYNC, identToken, IDENT_REQUIRED, isLabelled, fdState, astProp);
        return;

      case $ID_if:
        parseIfStatement(lexerFlags, scoop, labelSet, astProp);
        return;

      case $ID_import:
        parseImportDeclaration(lexerFlags, scoop, isGlobalToplevel, fdState, astProp);
        return;

      case $ID_let:
        // When parsed as declaration (so directly inside a global, function, or block scope) the parsing goal is first a
        // let declaration and in particular can not be a let variable when the next token is an identifier, array, or object.
        // However, when parsed as a sub-statement it will always parse a `let` as variable and only in the case where it is
        // followed by an array literal an ASI is forced ("restricted production").
        // Additionally, in strict mode `let` can not be the name of a variable regardless parsing a declaration or statement.
        if (isLabelled === IS_LABELLED|| fdState === FDS_ILLEGAL || fdState === FDS_IFELSE) {
          // declarations not allowed
          parseLetExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp);
        } else {
          parseLetDeclaration(lexerFlags, identToken, scoop, labelSet, fdState, nestedLabels, astProp);
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

      default:
        parseIdentLabelOrExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp);
        return;
    }

    THROW('Unexpected identifier case');
  }

  function parseFromNumberStatement(lexerFlags, astProp) {
    ASSERT(parseFromNumberStatement.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);
    ASSERT(isNumberToken(curtok.type));

    let numberToken = curtok;
    ASSERT_skipDiv($G_NUMBER, lexerFlags); // note: this can be any tail, semi, asi, etc

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(numberToken),
      expression: AST_getNumberNode(numberToken),
    });
    parseExpressionAfterLiteral(lexerFlags, numberToken, 'expression');
    if (curtok.type === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, numberToken, initNotAssignable(), 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }
  function parseFromStringStatement(lexerFlags, astProp) {
    ASSERT(parseFromStringStatement.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);
    ASSERT(isStringToken(curtok.type));

    let stringToken = curtok;
    let stringTokenCanon = tok_getCanon();
    ASSERT_skipDiv($G_STRING, lexerFlags); // note: this can be any tail, semi, asi, etc

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(stringToken),
      expression: AST_getStringNode(stringToken, stringTokenCanon, false),
    });
    parseExpressionAfterLiteral(lexerFlags, stringToken, 'expression');
    if (curtok.type === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, stringToken, initNotAssignable(), 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }
  function parseFromRegexStatement(lexerFlags, astProp) {
    ASSERT(parseFromRegexStatement.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);
    ASSERT(isRegexToken(curtok.type));

    let regexToken = curtok;
    ASSERT_skipDiv($G_REGEX, lexerFlags); // note: this can be any tail, semi, asi, etc

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(regexToken),
      expression: AST_getRegexNode(regexToken),
    });
    parseExpressionAfterLiteral(lexerFlags, regexToken, 'expression');
    if (curtok.type === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, regexToken, initNotAssignable(), 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }

  function parseTickStatement(lexerFlags, tickToken, astProp) {
    ASSERT(parseTickStatement.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);

    if (isBadTickToken(curtok.type)) {
      THROW('Template contained an illegal escape, illegal in a statement', ''+curtok);
    }
    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(tickToken),
      expression: undefined,
    });
    parseTickExpression(lexerFlags, tickToken, 'expression');
    parseExpressionAfterLiteral(lexerFlags, tickToken, 'expression');
    if (curtok.type === $PUNC_COMMA) {
      _parseExpressions(lexerFlags, tickToken, initNotAssignable(), 'expression');
    }
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }

  function parseAsyncStatement(lexerFlags, scoop, asyncToken, asyncTokenCanon, isExport, exportedBindings, isLabelled, fdState, astProp) {
    ASSERT(parseAsyncStatement.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');

    // an async statement is almost the same as an expression but it needs to know whether it was in fact
    // an expression or not so it knows how to apply the statement semi/asi.
    // at this point already verified not to be a label.
    // only the `async function ...` form does NOT require a semi as a statement. all other forms do.
    // A statement needs to pass on the scoop because the async func decl needs to record its id in that outer scope
    _parseAsync(lexerFlags, scoop, IS_STATEMENT, asyncToken, asyncTokenCanon, NOT_NEW_ARG, isExport, ASSIGN_EXPR_IS_OK, exportedBindings, isLabelled, fdState, NOT_LHSE, astProp);
  }
  function parseAsyncExpression(lexerFlags, asyncToken, asyncTokenCanon, isNewArg, isExport, allowAssignment, leftHandSideExpression, astProp) {
    ASSERT(parseAsyncExpression.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // parsed the `async` keyword (-> asyncToken)
    return _parseAsync(lexerFlags, DO_NOT_BIND, IS_EXPRESSION, asyncToken, asyncTokenCanon, isNewArg, isExport, allowAssignment, UNDEF_EXPORTS, NOT_LABELLED, FDS_ILLEGAL, leftHandSideExpression, astProp);
  }
  function _parseAsync(lexerFlags, scoop, fromStmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, isExport, allowAssignment, exportedBindings, isLabelled, fdState, leftHandSideExpression, astProp) {
    ASSERT(_parseAsync.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop = string', astProp);
    ASSERT(asyncToken !== UNDEF_ASYNC && asyncToken.type === $ID_async, 'async token should be passed on');
    ASSERT(curtok !== asyncToken, 'should have consumed the async keyword');
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

    if (curtok.type === $EOF || !allowAsyncFunctions) {
      return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, allowAssignment, astProp);
    }

    let newlineAfterAsync = tok_getNlwas() === true;

    if (isIdentToken(curtok.type)) {
      // - `async foo ...`
      //          ^
      // - `async eval => {}`
      // - `async eval => { "use strict"; }`
      // - `async function f(){}`
      // - `async in x`
      // - `async in obj`
      // - `async \n function f(){}`
      //             ^

      if (newlineAfterAsync) {
        // This _MUST_ mean async is a regular var name so just parse an expression now.
        // - `async \n ident`
        //             ^
        // - `async \n foo;`
        // - `async \n in x`
        // - `async \n in obj`
        // - `async \n instanceof obj`
        // - `async \n function f(){}`
        return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, allowAssignment, astProp);
      }

      if (curtok.type === $ID_function) {
        // - `async function f(){}`
        if (leftHandSideExpression === ONLY_LHSE) THROW_TOKEN('An async function expression is not allowed here', asyncToken);
        return parseAsyncFunctionDecl(lexerFlags, asyncToken, fromStmtOrExpr, scoop, isExport, exportedBindings, isLabelled, fdState, astProp);
      }

      if (curtok.type === $ID_in || curtok.type === $ID_instanceof) {
        // - `async in x`
        // - `async instanceof x`

        return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, allowAssignment, astProp);
      }

      // - `async foo => ..`                        ok
      //          ^
      // - `async foo \n ..`                        error
      // - `async \n foo => ..`                     ok
      // - `async \n foo \n ..`                     error
      // - `export default async foo => ..`         ok (but only as default)

      if (isNewArg === IS_NEW_ARG) {
        // - `new async x => x`
        //              ^
        THROW('Cannot apply `new` to an (async) arrow');
      }
      if (leftHandSideExpression === ONLY_LHSE) THROW_TOKEN('An async function expression is not allowed here', asyncToken);
      parseParenlessArrowAfterAsync(lexerFlags, fromStmtOrExpr, allowAssignment, asyncToken, astProp);
      return NOT_ASSIGNABLE;
    }

    if (curtok.type === $PUNC_PAREN_OPEN) {
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
        AST_setIdent('callee', asyncToken, asyncTokenCanon);
        return IS_ASSIGNABLE; // I mean ...
      }

      if (fromStmtOrExpr === IS_STATEMENT) {
        AST_open(astProp, {
          type: 'ExpressionStatement',
          loc: AST_getBaseLoc(asyncToken),
          expression: undefined,
        });
        astProp = 'expression'
      }

      if (isNewArg === IS_NEW_ARG) {
        // - `new async();`
        // - `new async() => x`     (error because arrow is an AssignmentExpression and new does not accept that)
        // Note that if it turns out to be an arrow, the parser will throw when seeing `=>` unexpectedly
        return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, allowAssignment, astProp);
      }

      let r = parseGroupToplevels(lexerFlags, fromStmtOrExpr, allowAssignment, asyncToken, asyncTokenCanon, newlineAfterAsync ? IS_ASYNC_PREFIXED : NOT_ASYNC_PREFIXED, leftHandSideExpression, astProp);

      if (fromStmtOrExpr === IS_STATEMENT) {
        AST_close('ExpressionStatement');
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
    return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, allowAssignment, astProp);
  }

  function isAssignable(state) {
    return (state & IS_ASSIGNABLE) === IS_ASSIGNABLE;
  }
  function notAssignable(state) {
    return (state & NOT_ASSIGNABLE) === NOT_ASSIGNABLE;
  }
  function initAssignable(previous) {
    ASSERT(arguments.length === 0 || previous === ASSIGNABLE_UNDETERMINED, 'if the previous value was set it should still be 0');
    return IS_ASSIGNABLE;
  }
  function initNotAssignable(previous) {
    ASSERT(arguments.length === 0 || previous === ASSIGNABLE_UNDETERMINED, 'if the previous value was set it should still be 0');
    return NOT_ASSIGNABLE;
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

  function parseAwait(lexerFlags, awaitToken, awaitTokenCanon, isNewArg, allowAssignment, astProp) {
    ASSERT(parseAwait.length === arguments.length, 'arg count');
    ASSERT(awaitToken.type === $ID_await, 'await token');
    ASSERT(awaitToken !== curtok, 'await should have been skipped');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // in module: only if lexerFlags allow await (inside async code)
    // in script: must be considered an await-expression when inside async, must be considered a var name otherwise
    // (`await` when not a keyword _is_ assignable)

    if (hasAnyFlag(lexerFlags, LF_IN_ASYNC)) {
      return parseAwaitKeyword(lexerFlags, awaitToken, isNewArg, astProp);
    }
    else if (goalMode === GOAL_SCRIPT) {
      return parseAwaitVar(lexerFlags, awaitToken, awaitTokenCanon, isNewArg, allowAssignment, astProp)
    }
    else {
      THROW('Cannot use `await` as var when goal=module but found `await` outside an async function');
    }
  }
  function parseAwaitKeyword(lexerFlags, awaitToken, isNewArg, astProp) {
    if (isNewArg === IS_NEW_ARG) {
      // - `async function f(){ new await x; }`
      // - `async function f(){ [new await foo] }`
      // - `async function f(){ (new await foo) }`
      // - `function f(){ "use strict"; new await; }`
      // - `function *f(){ "use strict"; new await; }`
      // - `async function *f(){ new await; }`
      THROW('Cannot `await` as the arg of `new`');
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
      THROW('Await is illegal as default arg value');
    }

    // - `async function f(){ new await; }`
    // - `async function *f(){ new await; }`

    AST_open(astProp, {
      type: 'AwaitExpression',
      loc: AST_getBaseLoc(awaitToken),
      argument: undefined,
    });

    // - `await ()=>x` is an error (arrows are assignable)
    parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument'); // await expr arg is never optional

    if (curtok.type === $PUNC_STAR_STAR) {
      THROW('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)');
    }

    AST_close('AwaitExpression');

    // An await-expression is not assignable and cannot appear inside;
    // - arrow function parameters
    // - async generator function/method parameters
    // - async function/method parameters
    // - async arrow parameters

    // See tests/testcases/await/function_piggy/autogen.md
    // See tests/testcases/await/arrow_piggy/autogen.md
    return NOT_ASSIGNABLE | PIGGY_BACK_SAW_AWAIT;
  }
  function parseAwaitVar(lexerFlags, awaitToken, awaitTokenCanon, isNewArg, allowAssignment, astProp) {
    ASSERT(parseAwaitVar.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    // Consider `await` a regular var name, not a keyword
    // Should throw an error if used as an await anyways

    // - `await;`
    // - `await.x;`
    // - `new await;`
    // - `typeof await;`

    let assignable = parseIdentOrParenlessArrow(lexerFlags, awaitToken, awaitTokenCanon, IS_ASSIGNABLE, allowAssignment, astProp);
    assignable = parseValueTail(lexerFlags, awaitToken, assignable, isNewArg, NOT_LHSE, astProp);

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
    ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'should have thrown if curtok.c wasnt a curly when calling this function');
    ASSERT_LABELSET(labelSet);

    let lexerFlagsNoTemplate = sansFlag(lexerFlags, LF_IN_TEMPLATE | LF_NO_ASI); // TODO: validate these. Are they for arrow inside a template?

    let curlyToken = curtok;
    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlagsNoTemplate); // [v]: `(x)=>{/x/}` TODO: next must be statement start, or `}`
    if (babelCompat) {
      // (All BlockStatements receive the `directives` property in the Babel AST... even when it can't have any directives.)
      AST_open(astProp, {
        type: 'BlockStatement',
        loc: AST_getBaseLoc(curlyToken),
        directives: [],
        body: [],
      });skipToStatementStart
    } else {
      AST_open(astProp, {
        type: 'BlockStatement',
        loc: AST_getBaseLoc(curlyToken),
        body: [],
      });
    }
    if (options_exposeScopes) AST_set('$scope', scoop);
    while (curtok.type !== $EOF && curtok.type !== $PUNC_CURLY_CLOSE) {
      parseNestedBodyPart(lexerFlagsNoTemplate, scoop, labelSet, NOT_LABELLED, FDS_LEX, PARENT_NOT_LABEL,'body');
    }
    if (curtok.type === $EOF) THROW('Unexpected EOF while parsing a block');
    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlags);
    AST_close('BlockStatement');

    if (curtok.type === $PUNC_EQ) {
      THROW('A statement can not start with object destructuring assignment (because block)');
    }
  }

  function parseBreakStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseBreakStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let breakToken = curtok;
    ASSERT_skipToStatementStart($ID_break, lexerFlags); // Note: the statement start would also parse an ident

    // A `break` may be followed by another identifier which must then be a valid label.
    // Otherwise it's just a `break` to the nearest breakable (most likely).

    // `break` without label is only valid inside an iteration or switch statement, fenced by functions
    // `break` with label is only valid if the label exists in the current statement tree

    // Note: must check eof/semi as well otherwise the value would be mandatory and parser would throw
    if (isIdentToken(curtok.type) && tok_getNlwas() === false) {
      let labelToken = curtok;
      let labelTokenCanon = tok_getCanon();
      if (!findLabel(labelSet, labelToken.str, FROM_BREAK)) {
        THROW('The label (`' + tokenStrForError(labelToken) + '`) for this `break` was not defined in the current label set, which is illegal');
      }
      ASSERT_skipToStatementStart($G_IDENT, lexerFlags);

      if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
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
        loc: AST_getClosedLoc(breakToken),
        label: AST_getIdentNode(labelToken, labelTokenCanon),
      });
    } else if (hasNoFlag(lexerFlags, LF_IN_ITERATION | LF_IN_SWITCH)) {
      // This is a `break` that is not inside a loop or switch
      // [v]: `if (x) break`
      THROW('Can only `break` without label inside a `switch` or loop');
    } else {
      if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
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
        loc: AST_getClosedLoc(breakToken),
        label: null,
      });
    }
  }
  function findLabel(inputLabelSet, labelName, checkIteration) {
    if (inputLabelSet === null) {
      THROW(`The label (\`${labelName}\`) for this \`break\` was not defined in the current label set, which is illegal`);
    }

    let id = '#' + labelName;

    let labelSet = inputLabelSet;
    if (labelSet[id]) {
      if (checkIteration === FROM_CONTINUE) {
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
        THROW('Cannot `continue` to label `' + labelName + '` because it was defined inside the current inner-most loop');
      }
      return true;
    }

    // Check parents all the way up to the label root (global or any kind of function scope)
    while (labelSet = labelSet.parentLabels) {
      if (labelSet[id]) {
        return true;
      }
    }

    return false;
  }

  function parseConstStatement(lexerFlags, scoop, isLabelled, fdState, astProp) {
    ASSERT(parseConstStatement.length === arguments.length, 'arg count');

    let constToken = curtok;
    ASSERT_skipToBindingStart($ID_const, lexerFlags);

    if (isLabelled === IS_LABELLED || fdState === FDS_ILLEGAL || fdState === FDS_IFELSE) {
      THROW('Cannot parse a class declaration here, only expecting statements here');
    }

    parseAnyVarDeclaration(lexerFlags, constToken, scoop, BINDING_TYPE_CONST, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
  }

  function parseContinueStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseContinueStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    // continue is only valid inside a loop, fenced by functions
    if (hasNoFlag(lexerFlags, LF_IN_ITERATION)) THROW('Can only `continue` inside a loop');

    let continueToken = curtok;
    ASSERT_skipToStatementStart($ID_continue, lexerFlags); // Note: statement start also includes an ident

    // a continue may be followed by another identifier which must then be a valid label.
    // otherwise it's just a continue to the nearest loop (most likely).

    // note: must check eof/semi as well otherwise the value would be mandatory and parser would throw
    if (isIdentToken(curtok.type) && tok_getNlwas() === false) {
      let labelToken = curtok;
      let labelTokenCanon = tok_getCanon();
      let labelName = labelToken.str;
      let set = labelSet;
      let found = false;
      while (set) {
        if (set.iterationLabels) {
          if (set.iterationLabels.includes(labelName)) {
            found = true;
            break;
          }
        }
        set = set.parentLabels;
      }
      if (!found) {
        THROW('This `continue` had a label (`' + labelName + '`) that was not defined in the current label set as the direct parent of a loop, which would be required');
      }

      ASSERT_skipToStatementStart($G_IDENT, lexerFlags);
      if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
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
        loc: AST_getClosedLoc(continueToken),
        label: AST_getIdentNode(labelToken, labelTokenCanon),
      });
    } else {
      if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
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
        loc: AST_getClosedLoc(continueToken),
        label: null,
      });
    }
  }

  function parseDebuggerStatement(lexerFlags, astProp) {
    let debuggerToken = curtok;
    ASSERT_skipToStatementStart($ID_debugger, lexerFlags);
    if (isRegexToken(curtok.type)) {
      if (tok_getNlwas() === false) THROW('Missing semi-colon after debugger keyword');
      // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
      // - `debugger \n /foo/`
      // - `debugger \n /foo/x`
      tok_asi();
    } else {
      parseSemiOrAsi(lexerFlags);
    }
    AST_setNode(astProp, {
      type: 'DebuggerStatement',
      loc: AST_getClosedLoc(debuggerToken),
    });
  }

  function parseDoStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseDoStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let doToken = curtok;
    ASSERT_skipToStatementStart($ID_do, lexerFlags); // Note: most likely is a block...
    AST_open(astProp, {
      type: 'DoWhileStatement',
      loc: AST_getBaseLoc(doToken),
      body: undefined,
      test: undefined,
    });
    // if the next part does not start with `{` then it is not a block and ASI can not happen. otherwise dont care here
    // note that functions and classes DO get ASI
    parseNestedBodyPart((curtok.type !== $PUNC_CURLY_OPEN ? lexerFlags : lexerFlags) | LF_IN_ITERATION, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    if (curtok.type !== $ID_while) THROW('A `do` must be followed by a `while`, but found `' + tokenStrForError(curtok) + '` instead');
    ASSERT_skipToParenOpenOrDie($ID_while, lexerFlags);
    parseStatementHeader(lexerFlags, 'test');
    // > 11.9.1: In ECMAScript 2015, Automatic Semicolon Insertion adds a semicolon at the end of a do-while statement if the
    // > semicolon is missing. This change aligns the specification with the actual behaviour of most existing implementations.
    // Note: no line terminator is required for this to proc. So `do;while(x)y` is valid (!)
    if (curtok.type !== $PUNC_SEMI) {
      // Since ES6 the last semi (`;`) of a do-while is suseptible to ASI rules
      // These apply even without a newline, similar to blocks or function declarations
      // - `do ; while (x) y`
      // - `do ; while(x) \n /foo/`
      tok_asi();
    } else {
      parseSemiOrAsi(lexerFlags);
    }
    AST_close('DoWhileStatement');
  }

  function parseExportDefaultAsync(lexerFlags, scoop, exportedNames, exportedBindings) {
    ASSERT(parseExportDefaultAsync.length === arguments.length, 'arg count');

    // `export default async function f(){}`
    // `export default async function(){}`
    // `export default async () => y`
    // `export default async (x) => y`
    // `export default async x => y`
    // `export default async(x);`
    // `export default async.x;`

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    ASSERT_skipRex($ID_async, lexerFlags); // function, arrow, or value-tail (for it can be a legacy async)

    // note: default export doesnt care as much about function type
    if (curtok.type === $ID_function) {
      // `export default async function f(){}`
      // `export default async function(){}`
      return parseAsyncStatement(lexerFlags, scoop, identToken, identTokenCanon, IS_EXPORT, exportedBindings, NOT_LABELLED, FDS_VAR, 'declaration');
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
    parseAsyncExpression(lexerFlags, identToken, identTokenCanon, NOT_NEW_ARG, IS_EXPORT, ASSIGN_EXPR_IS_OK, NOT_LHSE, 'declaration');

    // (this won't have any other name than "default")
    // bound names: "*default*"
    // exported binding: "*default*"
    // exported names: "default"
    parseSemiOrAsi(lexerFlags);
  }
  function parseExportDefault(lexerFlags, scoop, exportToken, exportedNames, exportedBindings, astProp) {
    ASSERT(parseExportDefault.length === arguments.length, 'arg count');

    AST_open(astProp, {
      type: 'ExportDefaultDeclaration',
      loc: AST_getBaseLoc(exportToken),
      declaration: undefined,
    });

    ASSERT_skipToExpressionStart($ID_default, lexerFlags); // Note: or a declaration, but that would start with ident, so is subsumed here... (footgun in 3... 2... 1...)

    // https://tc39.github.io/ecma262/#sec-exports-static-semantics-exportednames
    // https://tc39.github.io/ecma262/#sec-exports-static-semantics-exportedbindings

    // First record the `default` export name, which happens for any tail. If the tail is a declaration with
    // one or more names, those will also be recorded by sub parsers by passing on the binding objects.
    SCOPE_addLexBinding(scoop, '*default*', BINDING_TYPE_LET, FDS_VAR); // TODO: confirm `let`
    addNameToExports(exportedNames, 'default');
    addBindingToExports(exportedBindings, '*default*');

    if (curtok.type === $ID_class) {
      // - `export default class {}`
      // - `export default class x{}`

      let exportedName = parseClassDeclaration(lexerFlags, scoop, IDENT_OPTIONAL, NOT_LABELLED, FDS_LEX, 'declaration');
      addBindingToExports(exportedBindings, exportedName);
      // no semi
    }
    else if (curtok.type === $ID_function) {
      // - `export default function f(){}`
      // - `export default function* f(){}`
      // - `export default function(){}`
      // - `export default function* (){}`

      let exportedName = parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, UNDEF_ASYNC, curtok, IDENT_OPTIONAL, NOT_LABELLED, FDS_VAR, 'declaration');
      addBindingToExports(exportedBindings, exportedName);
      // no semi
    }
    else if (curtok.type === $ID_async) {
      parseExportDefaultAsync(lexerFlags, scoop, exportedNames, exportedBindings);
    }
    else {
      // - `export default 15`

      // any expression is exported as is (but is not a live binding)
      parseExpression(lexerFlags, 'declaration');
      parseSemiOrAsi(lexerFlags);
    }

    AST_close('ExportDefaultDeclaration');
  }
  function parseExportStar(lexerFlags, exportToken, exportedNames, astProp) {
    ASSERT(parseExportStar.length === arguments.length, 'arg count');

    // - `export * from "x"`
    //           ^
    // - `export * as y from "x"`
    //           ^

    // Must skip `as` or `from`, but we'll check for those explicitly here, so just skipAny
    ASSERT_skipAny($PUNC_STAR, lexerFlags);

    if (curtok.type === $ID_as) {
      // - `export * as y from "x"`
      //           ^

      if (!allowExportStarAs) {
        return THROW('The `export * as x from src`, syntax was introduced in ES2020 but currently targeted version is lower');
      }

      ASSERT_skipToIdentOrDie($ID_as, lexerFlags);
      // note: the exported _name_ can be any identifier, keywords included
      let exportedNameToken = curtok;
      let exportedNameTokenCanon = tok_getCanon();

      addNameToExports(exportedNames, exportedNameToken.str);

      // Must skip `from` but we'll check for that explicitly next, so just skipAny
      ASSERT_skipAny(curtok.str, lexerFlags);

      if (curtok.type !== $ID_from) {
        return THROW('Expected to find `as` or `from`, found `' + curtok.str + '` instead');
      }

      ASSERT_skipToStringOrDie($ID_from, lexerFlags); // Will throw if next token is not a string

      let sourceToken = curtok;
      let sourceTokenCanon = tok_getCanon();
      ASSERT_skipToStatementStart($G_STRING, lexerFlags);

      parseSemiOrAsi(lexerFlags);

      AST_setNode(astProp, {
        type: 'ExportNamedDeclaration',
        loc: AST_getClosedLoc(exportToken),
        specifiers: [{
          type: 'ExportNamespaceSpecifier',
          loc: AST_getClosedLoc(exportToken),
          exported: AST_getIdentNode(exportedNameToken, exportedNameTokenCanon),
        }],
        declaration: null,
        source: AST_getStringNode(sourceToken, sourceTokenCanon, false),
      });

      return;
    }

    if (curtok.type !== $ID_from) {
      return THROW('Expected to find `as` or `from`, found `' + curtok.str + '` instead');
    }

    ASSERT_skipToStringOrDie($ID_from, lexerFlags); // Will throw if next token is not a string

    let sourceToken = curtok;
    let sourceTokenCanon = tok_getCanon();
    ASSERT_skipToStatementStart($G_STRING, lexerFlags);

    parseSemiOrAsi(lexerFlags);

    AST_setNode(astProp, {
      type: 'ExportAllDeclaration',
      loc: AST_getClosedLoc(exportToken),
      source: AST_getStringNode(sourceToken, sourceTokenCanon, false),
    });
  }
  function parseExportNamed(lexerFlags, scoop, exportToken, exportedNames, exportedBindings, astProp) {
    ASSERT(parseExportNamed.length === arguments.length, 'arg count');

    AST_open(astProp, {
      type: 'ExportNamedDeclaration',
      loc: AST_getBaseLoc(exportToken),
      specifiers: [],
      declaration: undefined,
      source: undefined,
    });

    let needsSemi = true;

    if (curtok.type === $PUNC_CURLY_OPEN) {
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

      if (curtok.type === $ID_from) {
        // drop the tmp lists
        ASSERT_skipToStringOrDie($ID_from, lexerFlags);
        // TODO: what happens to dupe exported bindings or exported names here?
        let fromToken = curtok;
        let fromTokenCanon = tok_getCanon();

        ASSERT_skipToStatementStart($G_STRING, lexerFlags);
        AST_setStringLiteral('source', fromToken, fromTokenCanon, false);
      } else {
        AST_set('source', null);
        // pump the names into the real sets now
        tmpExportedNames.forEach(name => addNameToExports(exportedNames, name));
        tmpExportedBindings.forEach(name => addBindingToExports(exportedBindings, name));
      }
    }
    else if (curtok.type === $ID_var) {
      // export var <bindings>
      let varToken = curtok;
      ASSERT_skipToBindingStart($ID_var , lexerFlags);
      parseAnyVarDeclaration(lexerFlags, varToken, scoop, BINDING_TYPE_VAR, FROM_EXPORT_DECL, exportedNames, exportedBindings, 'declaration');
      AST_set('source', null);
      needsSemi = false; // Note: If we parse the semi below then the loc will be incorrect
    }
    else if (curtok.type === $ID_let) {
      // export let <bindings>
      let letToken = curtok;
      ASSERT_skipToBindingStart($ID_let, lexerFlags);
      parseAnyVarDeclaration(lexerFlags, letToken, scoop, BINDING_TYPE_LET, FROM_EXPORT_DECL, exportedNames, exportedBindings, 'declaration');
      AST_set('source', null);
      needsSemi = false; // Note: If we parse the semi below then the loc will be incorrect
    }
    else if (curtok.type === $ID_const) {
      // export const <bindings>
      let constToken = curtok;
      ASSERT_skipToBindingStart($ID_const, lexerFlags);
      parseAnyVarDeclaration(lexerFlags, constToken, scoop, BINDING_TYPE_CONST, FROM_EXPORT_DECL, exportedNames, exportedBindings, 'declaration');
      AST_set('source', null);
      needsSemi = false; // Note: If we parse the semi below then the loc will be incorrect
    }
    else if (curtok.type === $ID_class) {
      // export class ...
      let exportedName = parseClassDeclaration(lexerFlags, scoop, IDENT_REQUIRED, NOT_LABELLED, FDS_LEX,'declaration');
      addNameToExports(exportedNames, exportedName);
      addBindingToExports(exportedBindings, exportedName);
      needsSemi = false;
      AST_set('source', null);
    }
    else if (curtok.type === $ID_function) {
      // - `export function f(){}`
      //           ^^^^^^^^
      // - `export function* f(){}`
      //           ^^^^^^^^
      // (anonymous should not be allowed but parsers seem to do it anyways)
      let exportedName = parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, UNDEF_ASYNC, curtok, IDENT_REQUIRED, NOT_LABELLED, FDS_LEX, 'declaration');
      addNameToExports(exportedNames, exportedName);
      addBindingToExports(exportedBindings, exportedName);
      AST_set('source', null);
      needsSemi = false;
    }
    else if (curtok.type === $ID_async) {
      // - `export async function f(){}`
      //           ^^^^^
      // - `export async function *f(){}`
      //           ^^^^^
      // (note: no arrows here because we require a name)
      let asyncToken = curtok;
      // TODO: test case to this change
      ASSERT_skipDiv($ID_async, lexerFlags); // TODO: async could be ident, so `async/b` is a division

      if (curtok.type !== $ID_function) {
        // - `export async \n a => b`
        THROW('Can only export async functions (not arrows), did not find a function');
      }
      if (tok_getNlwas() === true) {
        // - `export async \n function(){}`
        THROW('Async can not be followed by a newline as it results in `export async;`, which is not valid (and probably not what you wanted)');
      }

      let exportedName = parseFunctionDeclaration(lexerFlags, scoop, IS_FUNC_DECL, NOT_FUNC_EXPR, asyncToken, curtok, IDENT_REQUIRED, NOT_LABELLED, FDS_LEX, 'declaration');
      addNameToExports(exportedNames, exportedName);
      addBindingToExports(exportedBindings, exportedName);
      AST_set('source', null);
      needsSemi = false;
    }
    else {
      // `export foo;`
      THROW('Unknown export type `' + tokenStrForError(curtok) + '` (note: you can only export individual vars through `export {foo};`)');
    }

    if (needsSemi) {
      // The variable (let/const/var) decls will consume the semi for us
      if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
        ASSERT(hasNoFlag(lexerFlags, LF_NO_ASI), 'Export cases can only appear on the toplevel as a statement so ASI is always valid here');
        // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
        // `export {} \n /foo/`
        tok_asi();
      } else {
        parseSemiOrAsi(lexerFlags);
      }
    }
    AST_close('ExportNamedDeclaration');
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

    // export sans default can do; var, let, const, function, async function, function *, class
    // export with default can do: function, async function, function *, class, and any assignment expression
    // regarding asi; classes and function decls dont get asi, anything else does. `default` does not change this.
    // note: the regular function, async function, and class may have no name only with `default`
    if (goalMode !== GOAL_MODULE) THROW('The `export` keyword can only be used with the module goal');
    if (isGlobalToplevel === NOT_GLOBAL_TOPLEVEL) THROW('The `export` keyword is only supported at the top level');

    let exportToken = curtok;
    ASSERT_skipToIdentStarCurlyOpen($ID_export, lexerFlags);

    if (curtok.type === $ID_default) {
      return parseExportDefault(lexerFlags, scoop, exportToken, exportedNames, exportedBindings, astProp);
    }

    if (curtok.type === $PUNC_STAR) {
      return parseExportStar(lexerFlags, exportToken, exportedNames, astProp);
    }

    return parseExportNamed(lexerFlags, scoop, exportToken, exportedNames, exportedBindings, astProp);
  }
  function addNameToExports(exportedNames, exportedName) {
    ASSERT(exportedNames !== DO_NOT_BIND, 'use UNDEF_EXPORTS for exportedNames, not DO_NOT_BIND');
    ASSERT(exportedNames === UNDEF_EXPORTS || exportedNames._ === 'exported names', 'explicitly expecting to receive the `exportedNames` set');
    if (exportedNames !== UNDEF_EXPORTS && exportedName !== '') {
      if (exportedNames.has(exportedName)) THROW('Tried to export the name `' + exportedName + '` twice');
      exportedNames.add(exportedName);
    }
  }
  function addBindingToExports(exportedBindings, exportedName) {
    ASSERT(exportedBindings !== DO_NOT_BIND, 'use UNDEF_EXPORTS not DO_NOT_BIND');
    if (exportedBindings !== UNDEF_EXPORTS && exportedName !== '') {
      exportedBindings.add(exportedName);
    }
  }
  function parseExportObject(lexerFlags, tmpExportedNames, tmpExportedBindings) {
    ASSERT(parseExportObject.length === arguments.length, 'arg count');
    // - `export {...} from 'x'`
    ASSERT_skipToIdentCurlyClose($PUNC_CURLY_OPEN, lexerFlags);
    while (isIdentToken(curtok.type)) {
      let nameToken = curtok; // left of the `as`
      let nameTokenCanon = tok_getCanon(); // left of the `as`
      let exportedNameToken = curtok; // right of the `as`, if present at all, otherwise same as name
      let exportedNameTokenCanon = tok_getCanon(); // right of the `as`, if present at all, otherwise same as name
      ASSERT_skipToAsCommaCurlyClose($G_IDENT, lexerFlags);
      // while the `nameToken` should be a valid non-keyword identifier, it also has to be bound and as such we
      // don't have to check it here since we already apply bind checks anyways and binding would apply this check
      if (curtok.type === $ID_as) { // `export {x as y}` NOT `export {x:y}`
        ASSERT_skipToIdentOrDie($ID_as, lexerFlags);
        // note: the exported _name_ can be any identifier, keywords included
        exportedNameToken = curtok;
        exportedNameTokenCanon = tok_getCanon();
        ASSERT_skipToCommaCurlyClose($G_IDENT, lexerFlags);
      }

      addNameToExports(tmpExportedNames, exportedNameToken.str);
      addBindingToExports(tmpExportedBindings, nameToken.str);

      AST_setNode('specifiers', {
        type: 'ExportSpecifier',
        loc: AST_getClosedLoc(nameToken),
        local: AST_getIdentNode(nameToken, nameTokenCanon),
        exported: AST_getIdentNode(exportedNameToken, exportedNameTokenCanon),
      });

      if (curtok.type === $PUNC_COMMA) ASSERT_skipToIdentCurlyClose(',', lexerFlags);
      else if (curtok.type !== $PUNC_CURLY_CLOSE) THROW('Unexpected token while parsing export object');
    }
    if (curtok.type !== $PUNC_CURLY_CLOSE) {
      $log('Error: Invalid export token: ' + curtok);
      if (curtok.type === $PUNC_DOT_DOT_DOT) THROW('Export object cannot have spread');
      if (curtok.type === $PUNC_COLON) THROW('Export object uses `as` to alias (`{a as y}`), not colon (`{a: y}`)');
      THROW('Export object can only have "shorthand" `{x}` or "as" `{x as y}');
    }
    ASSERT_skipToStatementStart($PUNC_CURLY_OPEN, lexerFlags);
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

    // the for-header adds a special lex scope because there are special let/const/var rules in place we need to verify
    scoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FOR_HEADER, 'parseForStatement(header)');
    ASSERT(scoop._funcName = '(for has no name)');

    let forToken = curtok;
    ASSERT_skipToAwaitParenOpen($ID_for, lexerFlags);
    let awaitable = curtok.type === $ID_await;
    if (awaitable) {
      if (!allowAsyncGenerators) THROW('The `for await` syntax is not supported by the currently targeted language version');
      if (hasNoFlag(lexerFlags, LF_IN_ASYNC)) THROW('Can only use `for-await` inside an async function');
      ASSERT_skipToParenOpenOrDie($ID_await, lexerFlags);
    } else if (curtok.type !== $PUNC_PAREN_OPEN) {
      THROW('Missing opening paren of the `for` header, found `' + tokenStrForError(curtok) + '` instead');
    }
    ASSERT_skipToExpressionStartSemi($PUNC_PAREN_OPEN, lexerFlags);
    parseForHeader(sansFlag(lexerFlags | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION), forToken, scoop, awaitable, astProp);
    if (curtok.type !== $PUNC_PAREN_CLOSE) {
      THROW('Missing closing paren of the `for` header, found `' + tokenStrForError(curtok) + '` instead');
    }
    ASSERT_skipToStatementStart($PUNC_PAREN_CLOSE, lexerFlags);
    if (curtok.type === $EOF) THROW('Missing `for` child statement');
    parseNestedBodyPart(lexerFlags | LF_IN_ITERATION, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    AST_close(['ForStatement', 'ForInStatement', 'ForOfStatement']);
  }
  function parseForHeaderVar(lexerFlags, forToken, scoop, awaitable, astProp) {
    ASSERT(parseForHeaderVar.length === arguments.length, 'arg count');

    // - `for (var x of y);`
    //         ^
    // - `for (var x;;);`
    let varToken = curtok;
    ASSERT_skipToBindingStart($ID_var , lexerFlags);
    parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, varToken, scoop, BINDING_TYPE_VAR, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    // No need to dupe-check scope here

    // var decls are assignable
    return parseForHeaderRest(lexerFlags, forToken, varToken, awaitable, IS_ASSIGNABLE, false, astProp);
  }
  function parseForHeaderLet(lexerFlags, forToken, scoop, awaitable, astProp) {
    ASSERT(parseForHeaderLet.length === arguments.length, 'arg count');

    // - `for (let x of y);`
    //         ^
    // - `for (let x;;);`
    let letIdentToken = curtok;
    let letIdentTokenCanon = tok_getCanon();
    let assignable = ASSIGNABLE_UNDETERMINED;
    let wasNotDecl = false;
    ASSERT_skipDiv($ID_let, lexerFlags); // div; if let is varname then next token can be next line statement start and if that starts with forward slash it's a div

    // [v]: `for (let x of y);`
    //                ^
    if (isIdentToken(curtok.type) || curtok.type === $PUNC_BRACKET_OPEN || curtok.type === $PUNC_CURLY_OPEN) {
      // [v]: `for (let x of y);`
      //                ^
      // [v]: `for (let [x] in y);`
      //                ^
      // [v]: `for (let {x} of y);`
      //                ^
      // [x]: `for (let x of y);`
      // [x]: `for (let [x] in y);`
      // [x]: `for (let {x} of y);`
      // [v]: `for (let x;;);`
      // [v]: `for (let [x] = x;;);`
      // [v]: `for (let {x} = x;;);`
      if (curtok.type === $ID_in) {
        // Edge case makes `let` to be parsed as a var name in sloppy mode
        // TODO: actually, this is probably a syntax error because static semantics are applied after locking in parser choices...
        // [v]: `for (let in x)`
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
          // Except in strict mode...
          // [x]: `for (let in x)`
          THROW('Let binding missing binding names as `let` cannot be a var name in strict mode');
        }
        AST_setIdent(astProp, letIdentToken, letIdentTokenCanon);
        wasNotDecl = true;
      } else {
        // [v]: `for (let x of y);`
        //                ^
        parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, letIdentToken, scoop, BINDING_TYPE_LET, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
      }
      assignable = initAssignable(assignable); // decls are assignable (`let` as a var name should be as well)
    } else if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      // In strict mode, `let` must be a keyword, and since we did not see a valid binding token, this is an error
      // [x]: `for (let.x in y);`
      //               ^
      // [x]: `for (let() of y);`
      //               ^
      // [x]: `for (let + of y);`
      THROW('Let binding missing binding names');
    } else {
      // In sloppy mode, `let` must now be a regular var name.
      wasNotDecl = true;
      // - The next token cannot be `[`, as that case has been taken care of above
      // - If is an error if this is a `for-of` as that case completely forbids `let` as var name
      // [v]: `for (let.x in y);`
      //               ^
      // [x]: `for (let() of y);`
      //               ^
      // [x]: `for (let[x] in y);`
      // [x]: `for (let[x] of y);`
      // [x]: `for (let[x];;);`
      // [x]: `for (let of y);`
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

      ASSERT(curtok.type !== $PUNC_BRACKET_CLOSE, 'case handled above');
      ASSERT(curtok.type !== $ID_in, 'case handled above');

      if (curtok.type === $ID_of) {
        // [x]: `for (let of y);`
        THROW('A `for (let of ...)` is always illegal');
      } else if (curtok.type === $PUNC_COMMA) {
        // [x]: `for (let , x;;);`
        //                ^
        // Note: we are inside a for-header so we don't care about assignable or the await/yield flags here
        AST_setIdent(astProp, letIdentToken, letIdentTokenCanon);
        _parseExpressions(lexerFlags, letIdentToken, initNotAssignable(), astProp);
        assignable = NOT_ASSIGNABLE;

        AST_wrapClosedCustom(astProp, {
          type: 'ForStatement',
          loc: AST_getBaseLoc(forToken),
          init: undefined,
          test: undefined,
          update: undefined,
          body: undefined,
        }, 'init');

        return parseForFromSemi(lexerFlags, letIdentToken, astProp);
      } else if (curtok.type !== $PUNC_SEMI) {
        // [x]: `for(let.a of 0);`
        // [v]: `for (let.foo in x);`
        // [x]: `for (let() in x);`
        // [v]: `for (let().foo in x);`
        // [x]: `for (let.foo of x);`
        // [x]: `for (let() of x);`
        // [x]: `for (let().foo of x);`
        // [x]: `for (let=10;;);`
        // [v]: `for (let.foo;;);`
        // [v]: `for (let();;);`
        assignable = parseValueAfterIdent(lexerFlags, letIdentToken, letIdentTokenCanon, BINDING_TYPE_NONE, ASSIGN_EXPR_IS_OK, astProp);
        if (curtok.type === $ID_of) {
          // [x]: `for (let.a of x);`
          THROW('Cannot use `let` as a var name on the left side in a `for-of` header');
        }
        if (notAssignable(assignable)) {
          // [v]: `for (let();;);`

          AST_wrapClosedCustom(astProp, {
            type: 'ForStatement',
            loc: AST_getBaseLoc(forToken),
            init: undefined,
            test: undefined,
            update: undefined,
            body: undefined,
          }, 'init');

          return parseForFromSemi(lexerFlags, letIdentToken, astProp);
        }
      } else {
        // [v]: `for (let;;);`
        //               ^
        AST_setIdent(astProp, letIdentToken, letIdentTokenCanon);
        assignable = NOT_ASSIGNABLE;
      }
    }

    return parseForHeaderRest(lexerFlags, forToken, letIdentToken, awaitable, assignable, wasNotDecl, astProp);
  }
  function parseForHeaderConst(lexerFlags, forToken, scoop, awaitable, astProp) {
    ASSERT(parseForHeaderConst.length === arguments.length, 'arg count');

    // - `for (const x of y);`
    //         ^
    // - `for (const x;;);`
    let constToken = curtok;
    ASSERT_skipToBindingStart($ID_const, lexerFlags);
    parseAnyVarDeclaration(lexerFlags | LF_IN_FOR_LHS, constToken, scoop, BINDING_TYPE_CONST, FROM_FOR_HEADER, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);

    // const decl is assignable
    return parseForHeaderRest(lexerFlags, forToken, constToken, awaitable, IS_ASSIGNABLE, false, astProp);
  }
  function parseForHeaderEmpty(lexerFlags, forToken, awaitable, astProp) {
    ASSERT(parseForHeaderEmpty.length === arguments.length, 'arg count');

    // - `for (;;);`
    if (awaitable) {
      // - `for await (;;);`
      THROW('for await only accepts the `for-of` type');
    }

    AST_open(astProp, {
      type: 'ForStatement',
      loc: AST_getBaseLoc(forToken),
      init: null, // yes, null, not undefined
      test: undefined,
      update: undefined,
      body: undefined,
    });

    return _parseForFromSemi(lexerFlags, astProp);
  }
  function parseForHeaderCurly(lexerFlags, forToken, awaitable, astProp) {
    ASSERT(parseForHeaderCurly.length === arguments.length, 'arg count');

    // for-in, for-of, for-await
    // - `for ({}.x in y);`
    // - `for ({}.x);`                 // bad
    // - `for ({} in y);`
    // - `for ({} = y in y);`
    // - `for ({x} = y in z);`
    // - `for ({x} = y of z);`
    // - `for ({x} = y);`              // bad
    // - `for ({x} = y;;);`
    // - `for ({x};;);`
    // - `for ({x}.y in z);`

    let curlyToken = curtok;

    let destructible = parseObjectOuter(lexerFlags | LF_IN_FOR_LHS, DO_NOT_BIND, BINDING_TYPE_NONE, SKIP_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    if (hasAllFlags(destructible, MUST_DESTRUCT)) {
      if (curtok.type !== $PUNC_EQ && curtok.type !== $ID_of && curtok.type !== $ID_in) {
        // - `for ({a=b};;);`
        return THROW('Cannot use lhs as regular for-loop because it must destruct');
      }

      // [x]: `for ({x=y} = b in x) ;`
      // [x]: `async function f(){ for await ({x=y}=x of x) ; }`
      // [x]: `for ({x=y}=x in x) ;`
      // [v]: `for ({x=y}=x ;;) ;`
      // [x]: `for ({eval = 0} in x);`   // Must destruct (due to init to shorthand) and cant (due to assignment to eval in strict)
      // [v]: `for ({eval = 0} ;;);`     // No writing to eval going on here
      destructible = sansFlag(destructible, MUST_DESTRUCT);
    }
    let assignable = parsePatternTailInForHeader(lexerFlags, curlyToken, $PUNC_CURLY_CLOSE, ASSIGNABLE_UNDETERMINED, destructible, awaitable, astProp);
    return parseForHeaderRest(lexerFlags, forToken, curlyToken, awaitable, assignable, true, astProp);
  }
  function parseForHeaderBracket(lexerFlags, forToken, awaitable, astProp) {
    ASSERT(parseForHeaderBracket.length === arguments.length, 'arg count');

    // for-in, for-of, for-await
    // - `for ([].x in y);`
    // - `for ([].x);`                 // bad
    // - `for ([] in y);`
    // - `for ([] = y in y);`
    // - `for ([x] = y in z);`
    // - `for ([x] = y of z);`
    // - `for ([x] = y);`              // bad
    // - `for ([x] = y;;);`
    // - `for ([x];;);`
    // - `for ([x].y in z);`

    let squareToken = curtok;

    let destructible = parseArrayOuter(lexerFlags | LF_IN_FOR_LHS, DO_NOT_BIND, BINDING_TYPE_NONE, SKIP_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    ASSERT(!hasAllFlags(destructible, MUST_DESTRUCT | CANT_DESTRUCT), 'parseArrayOuter should throw for must/cant destruct state');

    if (hasAllFlags(destructible, MUST_DESTRUCT)) {
      if (curtok.type !== $PUNC_EQ && curtok.type !== $ID_of && curtok.type !== $ID_in) {
        // - `for ({a=b};;);`
        return THROW('Cannot use lhs as regular for-loop because it must destruct');
      }

      // - `for ([{x=y}]=x in x) ;`
      destructible = sansFlag(destructible, MUST_DESTRUCT);
    }
    let assignable = parsePatternTailInForHeader(lexerFlags, squareToken, $PUNC_BRACKET_CLOSE, ASSIGNABLE_UNDETERMINED, destructible, awaitable, astProp);
    return parseForHeaderRest(lexerFlags, forToken, squareToken, awaitable, assignable, true, astProp);
  }
  function parseForHeaderOther(lexerFlags, forToken, awaitable, astProp) {
    ASSERT(parseForHeaderOther.length === arguments.length, 'arg count');

    let startOfForHeaderToken = curtok;

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
    let assignable = parseValue(lexerFlags | LF_IN_FOR_LHS, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);
    return parseForHeaderRest(lexerFlags, forToken, startOfForHeaderToken, awaitable, assignable, true, astProp);
  }
  function parseForHeader(lexerFlags, forToken, scoop, awaitable, astProp) {
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

    switch (curtok.type) {
      case $ID_var:
        return parseForHeaderVar(lexerFlags, forToken, scoop, awaitable, astProp);

      case $ID_let:
        return parseForHeaderLet(lexerFlags, forToken, scoop, awaitable, astProp);

      case $ID_const:
        return parseForHeaderConst(lexerFlags, forToken, scoop, awaitable, astProp);

      case $PUNC_SEMI:
        return parseForHeaderEmpty(lexerFlags, forToken, awaitable, astProp);

      case $PUNC_CURLY_OPEN:
        return parseForHeaderCurly(lexerFlags, forToken, awaitable, astProp);

      case $PUNC_BRACKET_OPEN:
        return parseForHeaderBracket(lexerFlags, forToken, awaitable, astProp);
    }

    return parseForHeaderOther(lexerFlags, forToken, awaitable, astProp);
  }
  function parseForHeaderRest(lexerFlags, forToken, startOfForHeaderToken, awaitable, assignable, wasNotDecl, astProp) {
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

    if (curtok.type === $ID_of) {
      return parseForFromIn(lexerFlags, forToken, awaitable, assignable, astProp);
    }

    if (awaitable) return THROW('`for await` only accepts the `for-of` type');

    if (curtok.type === $ID_in) {
      return parseForFromOf(lexerFlags, forToken, assignable, astProp);
    }

    AST_wrapClosedCustom(astProp, {
      type: 'ForStatement',
      loc: AST_getBaseLoc(forToken),
      init: undefined,
      test: undefined,
      update: undefined,
      body: undefined,
    }, 'init');

    // we are still in the `init` part of a classic for. keep parsing _with_ LF_IN_FOR_LHS from the current expression value.
    if (wasNotDecl) {
      // [v]: `for (a+b;;) c;`
      //             ^
      // [x]: `for (a+b in c) d;`
      // [x]: `for (a+b of c) d;`
      parseExpressionFromOp(lexerFlags | LF_IN_FOR_LHS, startOfForHeaderToken, assignable, 'init');
    }

    return parseForFromSemi(lexerFlags, startOfForHeaderToken, astProp);
  }
  function parseForFromIn(lexerFlags, forToken, awaitable, assignable, astProp) {
    ASSERT(parseForFromIn.length === arguments.length, 'arg count');

    if (notAssignable(assignable)) return THROW('Left part of for-of must be assignable');

    AST_wrapClosedCustom(astProp, {
      type: 'ForOfStatement',
      loc: AST_getBaseLoc(forToken),
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
  function parseForFromOf(lexerFlags, forToken, assignable, astProp) {
    ASSERT(parseForFromOf.length === arguments.length, 'arg count');

    if (notAssignable(assignable)) {
      // certain cases were possible in legacy mode
      // if (options_webCompat === WEB_COMPAT_ON && hasNoFlag(lexerFlags, LF_STRICT_MODE)) {
      //   // TODO: do we need to verify these patterns first...? or is any assignment okay here
      // } else {
      THROW('Left part of for-in must be assignable');
      // }
    }
    AST_wrapClosedCustom(astProp, {
      type: 'ForInStatement',
      loc: AST_getBaseLoc(forToken),
      left: undefined,
      right: undefined,
      body: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart($ID_in, lexerFlags);
    // `for (a in b=c) ..`
    parseExpressions(lexerFlags, 'right');
  }
  function parseForFromSemi(lexerFlags, startOfForHeaderToken, astProp) {
    ASSERT(parseForFromSemi.length === arguments.length, 'arg count');

    let hadComma = curtok.type === $PUNC_COMMA;
    if (hadComma) {
      // - `for (a, b;;);`
      //          ^
      // - `for (a, b in c);`
      // - `for (a, b of c);`
      _parseExpressions(lexerFlags | LF_IN_FOR_LHS, startOfForHeaderToken, initNotAssignable(), 'init');
    }

    if (curtok.type !== $PUNC_SEMI) {
      if (hadComma && (curtok.type === $ID_of || curtok.type === $ID_in)) {
        // note: `x in y` is valid so `for(a,x in y)` will parse up to the `)`. since `of` is not an op it stops at `of`.
        // [x]: `for (a,b of c) d;`
        return THROW('Comma not allowed in left side of `for-in`/`for-of` header');
      }
      return THROW('Missing first semi in `for` header, found `' + tokenStrForError(curtok) + '` instead');
    }

    return _parseForFromSemi(lexerFlags, astProp);
  }
  function _parseForFromSemi(lexerFlags, astProp) {
    ASSERT(_parseForFromSemi.length === arguments.length, 'arg count');
    ASSERT(curtok.type === $PUNC_SEMI, 'should be explicitly checked by caller');

    ASSERT_skipToExpressionStartSemi(';', lexerFlags);

    if (curtok.type === $PUNC_SEMI) {
      AST_set('test', null);
    } else {
      parseExpressions(lexerFlags, 'test');
      if (curtok.type !== $PUNC_SEMI) {
        THROW('Missing second semi in `for` header, found `' + tokenStrForError(curtok) + '` instead');
      }
    }

    ASSERT_skipToExpressionStartGrouped(';', lexerFlags); // the second semi may immediately be followed by `)`

    if (curtok.type === $PUNC_PAREN_CLOSE) {
      AST_set('update', null);
    } else {
      parseExpressions(lexerFlags, 'update');
    }
  }
  function parsePatternTailInForHeader(lexerFlags, patternStartToken, closingPuncType, assignable, destructible, awaitable, astProp) {
    ASSERT(parsePatternTailInForHeader.length === arguments.length, 'arg count');

    assignable = hasAnyFlag(destructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE;

    // Have to make sure this is not a compound assignment to a pattern. And have to do it before the tail (`[].x+=y`)
    // - `for ([] = x;;);`
    // - `for ([] = x in y);`
    if (curtok.type !== $PUNC_EQ && isCompoundAssignment(curtok.type)) {
      // - `for ([] += x;;);`
      // - `for ([] /= x in y);`
      return THROW('Cannot compound assign to an object or array pattern');
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
    assignable = parseValueTail(lexerFlags | LF_IN_FOR_LHS, patternStartToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);

    // - `for ([].foo in x);`
    //                ^
    // - `for ([] in x);`
    //            ^
    // - `for ([] = x in x);`
    //            ^
    // - `for ([] of x);`
    // - `for ([] ;;);`

    if (curtok.type === $PUNC_SEMI) {
      // - `for ({a};;);`
      // - `for ([a];;);`
      if (awaitable) {
        // - `for await ({a};;);`
        // - `for await ([a];;);`
        THROW('Can not use `for-await` with a regular `for` loop, only `for-of`');
      }
    }
    else if (curtok.type === $ID_in) {
      // - `for ({} in y);`
      // - `for ({} = y in y);`
      // - `for ({x} = y in z);`
      // - `for ({x} = y of z);`
      // - `for ([] in y);`
      // - `for ([] = y in y);`
      // - `for ([x] = y in z);`
      // - `for ([x] = y of z);`

      if (awaitable) THROW('Can not use `for-await` with a `for-in`, only `for-of`');

      // TODO: are yield/await relevant here?
      if (notAssignable(assignable)) THROW('The for-header lhs binding pattern is not destructible');
      AST_destruct(astProp);
    }
    else if (curtok.type === $ID_of) {
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

      // TODO: are yield/await relevant here?
      if (notAssignable(assignable)) THROW('The for-header lhs binding pattern is not destructible');
      AST_destruct(astProp);
    }
    else if (curtok.type === $PUNC_EQ) {
      // This can be fine if inside a regular `for-loop`. Only if we see `in` or `of` before the `;` are we in trouble.
      parseExpressionFromOp(lexerFlags| LF_IN_FOR_LHS, patternStartToken, assignable, astProp);
      if (curtok.type === $PUNC_SEMI) {
        // This is fiiiine
        // - `for ([] = x ;;);`
        // - `for ({} = x ;;);`
        assignable = NOT_ASSIGNABLE;
      } else if (curtok.type === $ID_in || curtok.type === $ID_of) {
        // - `for ([] = x in y);`
        // - `for ({} = x of y);`
        // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements-static-semantics-early-errors
        // > It is a Syntax Error if LeftHandSideExpression is either an ObjectLiteral or an ArrayLiteral and if LeftHandSideExpression is not covering an AssignmentPattern.
        // This means, IF the lhs is an object, THEN it must also cover a Pattern. It does not say the lhs can be any
        // Pattern. The important distinction is that if it could be any Pattern, then it could have a "top level"
        // initialiser. But as the wording stands, it may be a Pattern if and only if it would match an object or array
        // literal as a whole. And `[] = x` would be an assignment, not an obj/arr literal. So it is an error.
        THROW('The left side of a `for-of` and `for-in` can not be an assignment, even if it is a BindingPattern');
      } else {
        // End of the expression before finding `in`, `of`, or a semi colon.
        // - `for ([] = x);`
        THROW('Unknown input followed the left side of a for loop header after assignment: ' + curtok);
      }
    }
    else {
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
      parseOptionalDestructibleRestOfExpression(lexerFlags, patternStartToken, BINDING_TYPE_NONE, assignable, destructible, closingPuncType, astProp);

      // [v]: `for ([] + x;;);`
      //                  ^
      if (curtok.type === $PUNC_COMMA) {
        // Don't care about assignable await/yield flags
        // [v]: `for ([], x;;);`
        //              ^
        _parseExpressions(lexerFlags, patternStartToken, initNotAssignable(), astProp);
      }

      if (curtok.type !== $PUNC_SEMI) {
        // [x]: `for ([]);`
        //              ^
        // [x]: `for ([]);`
        // [x]: `for ({});`
        //              ^
        THROW('Unknown input followed the left side of a for loop header: ' + curtok);
      }
    }

    return assignable;
  }

  function parseIfStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseIfStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let ifToken = curtok;
    ASSERT_skipToParenOpenOrDie($ID_if, lexerFlags);
    AST_open(astProp, {
      type: 'IfStatement',
      loc: AST_getBaseLoc(ifToken),
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
    if (curtok.type === $ID_else) {
      ASSERT_skipToStatementStart($ID_else, lexerFlags);
      parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_IFELSE, PARENT_NOT_LABEL, 'alternate');
    } else {
      AST_set('alternate', null);
    }
    AST_close('IfStatement');
  }

  function parseImportDeclaration(lexerFlags, scoop, isGlobalToplevel, fdState, astProp) {
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

    let importToken = curtok;

    ASSERT_skipToIdentStarCurlyOpenParenOpenString($ID_import, lexerFlags);
    if (curtok.type === $PUNC_PAREN_OPEN) {
      // This must be dynamic `import()` or an error
      return parseDynamicImportStatement(lexerFlags, importToken, astProp);
    }

    // Note: since `import()` is valid in non-global, and in non-module-goal, we have to check the token after `import` first

    if (goalMode !== GOAL_MODULE) THROW('The `import` keyword can only be used with the module goal');
    if (isGlobalToplevel === NOT_GLOBAL_TOPLEVEL) THROW('The `import` keyword is only supported at the top level'); // TODO: import() ?

    AST_open(astProp, {
      type: 'ImportDeclaration',
      loc: AST_getBaseLoc(importToken),
      specifiers: [],
      source: undefined,
    });

    if (isIdentToken(curtok.type)) {
      // import x from 'x'
      //        ^
      // import x, * as z from 'x'
      // import x, {...} from 'x'
      parseImportDefault(lexerFlags, scoop);
      if (curtok.type === $PUNC_COMMA) {
        // import x, * as z from 'x'
        //         ^
        // import x, {...} from 'x'
        //         ^
        ASSERT_skipToIdentStarCurlyOpen(',', lexerFlags);  // TODO: next must be `*` or `{` or ident
        if (curtok.type === $PUNC_STAR) {
          // import x, * as z from 'x'
          parseImportNamespace(lexerFlags, scoop);
        } else if (curtok.type === $PUNC_CURLY_OPEN) {
          // import x, {...} from 'x'
          parseImportObject(lexerFlags, scoop);
        } else {
          THROW('Can only import star or object after default');
        }
      } else if (curtok.type !== $ID_from) {
        THROW('Missing export source');
      } else {
        // `import x from 'x'`
        ASSERT_skipToStringOrDie($ID_from, lexerFlags);
      }
    } else if (curtok.type === $PUNC_STAR) {
      // import * as y from 'x'
      parseImportNamespace(lexerFlags, scoop);
    } else if (curtok.type === $PUNC_CURLY_OPEN) {
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

      if (!isStringToken(curtok.type)) {
        THROW('Expected a valid token after the `import` keyword, found `' + curtok.str + '` instead');
      }
    }

    // `import 'foo'` is valid but otherwise this is an error (validated by skipToStringOrDie)
    ASSERT(isStringToken(curtok.type), 'skipToStringOrDie should throw if the next token is not a string, all branches should have enforced it');

    let sourceToken = curtok;
    let sourceTokenCanon = tok_getCanon();
    ASSERT_skipToStatementStart($G_STRING, lexerFlags); // semi or asi
    AST_setStringLiteral('source', sourceToken, sourceTokenCanon, false);
    parseSemiOrAsi(lexerFlags);
    AST_close('ImportDeclaration');
  }
  function parseImportDefault(lexerFlags, scoop) {
    ASSERT(parseImportDefault.length === arguments.length, 'arg count');

    // import x from 'x'
    //        ^
    // import x, * as z from 'x'
    // import x, {...} from 'x'
    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    fatalBindingIdentCheck(identToken, identTokenCanon, BINDING_TYPE_CONST, lexerFlags);
    SCOPE_addLexBinding(scoop, identToken.str, BINDING_TYPE_LET, FDS_LEX); // TODO: confirm `let`
    ASSERT_skipToAsCommaFrom($G_IDENT, lexerFlags);

    AST_setNode('specifiers', {
      type: 'ImportDefaultSpecifier',
      loc: AST_getClosedLoc(identToken),
      local: AST_getIdentNode(identToken, identTokenCanon),
    });
  }
  function parseImportObject(lexerFlags, scoop) {
    ASSERT(parseImportObject.length === arguments.length, 'arg count');

    // - `import {...} from 'x'`
    //           ^
    ASSERT_skipToIdentCurlyClose($PUNC_CURLY_OPEN, lexerFlags);
    while (isIdentToken(curtok.type)) {
      let nameToken = curtok; // left of the `as` token
      let nameTokenCanon = tok_getCanon(); // left of the `as` token
      let localToken = curtok; // right of the `as` token, otherwise same as nameToken
      let localTokenCanon = tok_getCanon(); // right of the `as` token, otherwise same as nameToken
      ASSERT_skipToAsCommaCurlyClose($G_IDENT, lexerFlags);

      // https://tc39.github.io/ecma262/#sec-createimportbinding
      // The concrete Environment Record method CreateImportBinding for module Environment Records creates a new initialized
      // immutable indirect binding for the name N. A binding must not already exist in this Environment Record for N.

      if (curtok.type === $ID_as) {
        ASSERT_skipToIdentOrDie($ID_as, lexerFlags);
        localToken = curtok;
        localTokenCanon = tok_getCanon();
        ASSERT_skipToCommaCurlyClose($G_IDENT, lexerFlags);
      }
      fatalBindingIdentCheck(localToken, localTokenCanon, BINDING_TYPE_CONST, lexerFlags);
      SCOPE_addLexBinding(scoop, localToken.str, BINDING_TYPE_LET, FDS_ILLEGAL); // TODO: confirm `let`

      AST_setNode('specifiers', {
        type: 'ImportSpecifier',
        loc: AST_getClosedLoc(nameToken),
        imported: AST_getIdentNode(nameToken, nameTokenCanon),
        local: AST_getIdentNode(localToken, localTokenCanon),
      });

      if (curtok.type === $PUNC_COMMA) ASSERT_skipToIdentCurlyClose(',', lexerFlags);
      else if (curtok.type !== $PUNC_CURLY_CLOSE) THROW('Unexpected character while parsing export object');
    }
    if (curtok.type !== $PUNC_CURLY_CLOSE) THROW('Missing import definition closing curly, found `' + tokenStrForError(curtok) + '` instead');
    // - `import {...} from 'x'`
    //               ^
    ASSERT_skipToFromOrDie($PUNC_CURLY_CLOSE, lexerFlags);
    ASSERT_skipToStringOrDie($ID_from, lexerFlags);
  }
  function parseImportNamespace(lexerFlags, scoop) {
    ASSERT(parseImportNamespace.length === arguments.length, 'arg count');

    // import * as x from 'y'
    //        ^
    let starToken = curtok;
    ASSERT_skipToAsOrDie('*', lexerFlags);
    ASSERT_skipToIdentOrDie($ID_as, lexerFlags);
    let localToken = curtok;
    let localTokenCanon = tok_getCanon();
    // next must be `from` (default must come first, if present, and object can not be used together with star)
    ASSERT_skipToFromOrDie($G_IDENT, lexerFlags);
    fatalBindingIdentCheck(localToken, localTokenCanon, BINDING_TYPE_CONST, lexerFlags);
    SCOPE_addLexBinding(scoop, localToken.str, BINDING_TYPE_LET, FDS_ILLEGAL); // TODO: confirm `let`

    AST_setNode('specifiers', {
      type: 'ImportNamespaceSpecifier',
      loc: AST_getClosedLoc(starToken),
      local: AST_getIdentNode(localToken, localTokenCanon),
    });

    ASSERT(curtok.type === $ID_from, 'already validated by skipToFromOrDie, above');
    ASSERT_skipToStringOrDie($ID_from, lexerFlags);
  }

  function parseLetDeclaration(lexerFlags, letToken, scoop, labelSet, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseLetDeclaration.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    ASSERT(identToken.type === $ID_let, 'should pass on the let token');

    // next token is ident, {, or [ in most cases. In sloppy mode it can also be any valid value tail, operator, and ASI-able.
    ASSERT_skipDiv($ID_let, lexerFlags); // in `let/foo/g` the `/` is always a division, so parse div

    // parsing `let` as a declaration if the next token is an ident, `[`, or `{`
    if (isIdentToken(curtok.type)) {
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

      let bindingToken = curtok;
      let bindingTokenCanon = tok_getCanon();

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
      let identBindingErrorMsg = tok_getNlwas() === true ? nonFatalBindingIdentCheck(bindingToken, bindingTokenCanon, BINDING_TYPE_LET, lexerFlags) : '';
      if (identBindingErrorMsg !== '') {
        // This is now a slow error path

        if (
          // This is the case of pseudo keywords. Note that `let \n await` will never trigger ASI and
          // `let \n await 0` would ASI therefor throw a syntax error because it's parsed as a let declaration, anyways.
          // In contrast, `let \n await;` is only an error in the context where `await` must be a keyword.
          [$ID_await, $ID_yield, $ID_arguments, $ID_eval, $ID_implements, $ID_interface, $ID_let, $ID_package, $ID_private, $ID_protected, $ID_public, $ID_static].includes(curtok.type)
        ) {
          // This must be an error now. ASI was not applicable but the var was (still) not a valid binding ident, so *boom*
          return THROW('Attempted to create a `let` binding on special reserved keyword `' + tokenStrForError(bindingToken) + '` but: ' + identBindingErrorMsg);
        }

        if (hasAnyFlag(lexerFlags, LF_NO_ASI)) {
          return THROW('`let` must be a declaration in strict mode but the next ident is a reserved keyword (`' + tokenStrForError(bindingToken) + '`) and ASI does not apply here');
        }

        return THROW('`let` must be a declaration in strict mode but the next ident is a reserved keyword (`' + tokenStrForError(bindingToken) + '`)');
      }


      // This is any regular `let` declaration with an ident and no newline but the ident may cause a keyword error
      // - `let foo`
      // - `do let while(x)'               (totally invalid because do-while requires newline or semi)
      parseAnyVarDeclaration(lexerFlags, letToken, scoop, BINDING_TYPE_LET, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    } else if (curtok.type === $PUNC_BRACKET_OPEN || curtok.type === $PUNC_CURLY_OPEN) {
      // let declaration on (at least) a pattern
      // - `let [x]`
      // - `let [x], y`
      // - `let [x], [y]`
      // - `let \n [x]`
      // - `let {x}`
      // - `let {x}, y`
      // - `let {x}, {y}`
      // - `let \n {x}`
      parseAnyVarDeclaration(lexerFlags, letToken, scoop, BINDING_TYPE_LET, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    } else if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      THROW('Let declaration missing binding names and `let` cannot be a regular var or label name in strict mode');
    } else {
      // let expression statement
      // TODO: add test case `let: function f(){}`
      _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp);
    }
  }
  function parseLetExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseLetExpressionStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    ASSERT(identToken.type === $ID_let, 'should pass on the let token');

    // next token is ident, {, or [ in most cases. In sloppy mode it can also be any valid value tail, operator, and ASI-able.
    ASSERT_skipDiv($ID_let, lexerFlags); // in `let/foo/g` the `/` is always a division, so parse div

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      THROW('`let` declaration not allowed here and `let` cannot be a regular var or label name in strict mode');
    }

    if (curtok.type === $PUNC_BRACKET_OPEN) {
      // https://tc39.es/ecma262/#prod-ExpressionStatement
      // No ASI exception here. A `let [` can simply not start an expression statement, and there's no other way to
      // validly parse it, so it's an error here.
      THROW('It is never valid for an expression statement to begin with `let[`, and a `let` declaration would not be valid here');
    }

    // let expression statement
    _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp);
  }
  function _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp) {
    ASSERT(_parseLetAsPlainVarNameExpressionStatement.length === arguments.length, 'arg count');
    ASSERT(identToken.type === $ID_let, 'should pass on the let token');
    ASSERT(identToken !== curtok, 'the `let` token should have been skipped');
    ASSERT(hasNoFlag(lexerFlags, LF_STRICT_MODE), 'sloppy mode should be asserted at call site');
    ASSERT_LABELSET(labelSet);
    ASSERT(curtok.type !== $PUNC_BRACKET_OPEN, 'should invalidate expr stmt starting with `let [` before calling this func');

    if (curtok.type === $EOF) {
      parseSemiOrAsi(lexerFlags);
      AST_setNode(astProp, {
        type: 'ExpressionStatement',
        loc: AST_getClosedLoc(identToken),
        expression: AST_getIdentNode(identToken, identTokenCanon),
      });
    } else if (curtok.type === $PUNC_COLON) {
      return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp);
    } else {
      AST_open(astProp, {
        type: 'ExpressionStatement',
        loc: AST_getBaseLoc(identToken),
        expression: undefined,
      });
      let assignable = parseIdentOrParenlessArrow(lexerFlags, identToken, identTokenCanon, IS_ASSIGNABLE, ASSIGN_EXPR_IS_OK, 'expression');
      assignable = parseValueTail(lexerFlags, identToken, assignable, NOT_NEW_ARG, NOT_LHSE, 'expression');
      parseExpressionFromOp(lexerFlags, identToken, assignable, 'expression');
      if (curtok.type === $PUNC_COMMA) {
        // Don't care about assignable await/yield flags
        _parseExpressions(lexerFlags, identToken, initNotAssignable(), 'expression');
      }
      parseSemiOrAsi(lexerFlags);
      AST_close('ExpressionStatement');
    }
  }

  function parseReturnStatement(lexerFlags, astProp) {
    if (!allowGlobalReturn && hasAllFlags(lexerFlags, LF_IN_GLOBAL)) THROW('Not configured to parse `return` statement in global, bailing');

    let returnToken = curtok;
    ASSERT_skipToStatementStart($ID_return, lexerFlags); // Either an expression on the same line or a statement on the next (which includes exprs)
    AST_open(astProp, {
      type: 'ReturnStatement',
      loc: AST_getBaseLoc(returnToken),
      argument: undefined,
    });

    if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
      // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
      // - `return \n /foo/`
      // - `return \n /foo/x`
      tok_asi();
      AST_set('argument', null);
    } else {
      if (tok_getNlwas() === false && curtok.type !== $EOF && curtok.type !== $PUNC_SEMI && curtok.type !== $PUNC_CURLY_CLOSE) {
        parseExpressions(lexerFlags, 'argument');
      }
      else {
        AST_set('argument', null);
      }
      parseSemiOrAsi(lexerFlags);
    }

    AST_close('ReturnStatement');
  }

  function parseSwitchStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseSwitchStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let switchToken = curtok;
    ASSERT_skipToParenOpenOrDie($ID_switch, lexerFlags);
    AST_open(astProp, {
      type: 'SwitchStatement',
      loc: AST_getBaseLoc(switchToken),
      discriminant: undefined,
      cases: [],
    });

    // TODO: in what valid case is LF_IN_TEMPLATE relevant? switch cant appear directly in a template
    let lexerFlagsForSwitch = sansFlag(lexerFlags, LF_IN_TEMPLATE | LF_IN_GLOBAL | LF_NO_ASI);
    parseStatementHeader(lexerFlagsForSwitch, 'discriminant');
    if (curtok.type !== $PUNC_CURLY_OPEN) THROW('Missing opening curly of `switch` body, found `' + tokenStrForError(curtok) + '` instead');
    ASSERT_skipToSwitchBody($PUNC_CURLY_OPEN, lexerFlagsForSwitch);

    let casesScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_SWITCH, 'parseSwitchStatement');
    ASSERT(casesScoop._funcName = '(switch has no name)');
    parseSwitchCases(lexerFlagsForSwitch | LF_IN_SWITCH, casesScoop, labelSet, 'cases');

    if (curtok.type !== $PUNC_CURLY_CLOSE) THROW('Missing the closing curly of the switch body, found `' + tokenStrForError(curtok) + '` instead');
    ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, lexerFlags);
    AST_close('SwitchStatement');
  }
  function parseSwitchCases(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseSwitchCases.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let hadDefault = false;
    while (true) {
      if (curtok.type === $ID_case) {
        let caseToken = curtok;
        ASSERT_skipToExpressionStart($ID_case, lexerFlags);
        AST_open(astProp, {
          type: 'SwitchCase',
          loc: AST_getBaseLoc(caseToken),
          test: undefined,
          consequent: [],
        });
        parseExpressions(lexerFlags, 'test');
        if (curtok.type !== $PUNC_COLON) THROW('Missing colon after case expr');
      } else if (curtok.type === $ID_default) {
        if (hadDefault) THROW('Found second `default` in same switch');
        hadDefault = true;
        let defaultToken = curtok;
        ASSERT_skipToColonOrDie($ID_default, lexerFlags);
        AST_open(astProp, {
          type: 'SwitchCase',
          loc: AST_getBaseLoc(defaultToken),
          test: null, // yes, null
          consequent: [],
        });
      } else {
        break;
      }
      ASSERT_skipToStatementStart(':', lexerFlags);
      while (curtok.type !== $EOF && curtok.type !== $PUNC_CURLY_CLOSE && (curtok.type !== $ID_case && curtok.type !== $ID_default)) {
        parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_LEX, PARENT_NOT_LABEL, 'consequent');
      }
      AST_close('SwitchCase');
    }
  }

  function parseThrowStatement(lexerFlags, astProp) {
    let throwToken = curtok;
    ASSERT_skipToExpressionStart($ID_throw, lexerFlags); // The arg is mandatory so next token cannot start a statement
    AST_open(astProp, {
      type: 'ThrowStatement',
      loc: AST_getBaseLoc(throwToken),
      argument: undefined,
    });
    if (tok_getNlwas() === true) THROW('Found a newline between `throw` and its argument but that is not allowed');
    let tmpLexerFlags = sansFlag(lexerFlags, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION | LF_IN_FOR_LHS);
    parseExpressions(tmpLexerFlags, 'argument'); // mandatory1
    parseSemiOrAsi(lexerFlags);
    AST_close('ThrowStatement');
  }

  function parseTryStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseTryStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let tryToken = curtok;
    ASSERT_skipToCurlyOpenOrDie($ID_try, lexerFlags);
    AST_open(astProp, {
      type: 'TryStatement',
      loc: AST_getBaseLoc(tryToken),
      block: undefined,
      handler: undefined,
      finalizer: undefined,
    });

    let tryScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_TRY, 'parseTryStatement(try)');
    ASSERT(tryScoop._funcName = '(try has no name)');
    parseBlockStatement(lexerFlags, tryScoop, labelSet, 'block');

    let hasEither = false;
    if (curtok.type === $ID_catch) {
      // parseCatch
      hasEither = true;
      let catchToken = curtok;
      ASSERT_skipAny($ID_catch, lexerFlags);
      ASSERT_VALID(curtok.type === $PUNC_PAREN_OPEN || curtok.type === $PUNC_CURLY_OPEN, 'limited options, expecting { (, explicitly checked later', curtok);
      AST_open('handler', {
        type: 'CatchClause',
        loc: AST_getBaseLoc(catchToken),
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

      // Catch clause is optional since es10

      if (curtok.type === $PUNC_CURLY_OPEN) {
        if (!allowOptionalCatchBinding) {
          THROW('Missing the `catch` clause. Optional catch clause is only supported since ES10  ES2019');
        }

        // https://github.com/estree/estree/pull/167/files
        // [v]: `try {} catch {}`
        AST_set('param', null);
      } else if (curtok.type === $PUNC_PAREN_OPEN) {
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
        if (curtok.type === $PUNC_PAREN_CLOSE) THROW('The catch clause must have a binding');
        parseBinding(lexerFlags | LF_NO_ASI, curtok, catchHeadScoop, BINDING_TYPE_CATCH_OTHER, FROM_CATCH, ASSIGNMENT_IS_DEFAULT, UNDEF_EXPORTS, UNDEF_EXPORTS, 'param');

        if (curtok.type === $PUNC_COMMA) THROW('Catch clause requires exactly one parameter, not more (and no trailing comma)');
        if (curtok.type === $PUNC_EQ) THROW('Catch clause parameter does not support default values');
        if (curtok.type !== $PUNC_PAREN_CLOSE) THROW('Missing right paren for the catch clause, found `' + tokenStrForError(curtok) + '` instead');
        ASSERT_skipToCurlyOpenOrDie($PUNC_PAREN_CLOSE, lexerFlags);
      } else {
        THROW('Missing start of catch clause (`(`) or start of catch body (`{`), found `' + tokenStrForError(curtok) + '` instead')
      }

      ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'should have thrown if curtok.c is not curly at this point');

      parseBlockStatement(lexerFlags, catchBodyScoop, labelSet, 'body');
      AST_close('CatchClause');
    } else {
      AST_set('handler', null);
    }

    if (curtok.type === $ID_finally) {
      // parseFinally
      hasEither = true;
      ASSERT_skipToCurlyOpenOrDie($ID_finally, lexerFlags);
      let finallyScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FINALLY, 'parseTryStatement(finally)');
      ASSERT(finallyScoop._funcName = '(finally has no name)');
      parseBlockStatement(lexerFlags, finallyScoop, labelSet, 'finalizer');
    } else {
      AST_set('finalizer', null);
    }

    AST_close('TryStatement');

    if (!hasEither) THROW('Try must have catch or finally');
  }

  function parseVarStatement(lexerFlags, scoop, astProp) {
    let varToken = curtok;
    ASSERT_skipToBindingStart($ID_var, lexerFlags);
    parseAnyVarDeclaration(lexerFlags, varToken, scoop, BINDING_TYPE_VAR, FROM_STATEMENT_START, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
  }

  function parseWhileStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseWhileStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    let whileToken = curtok;
    ASSERT_skipToParenOpenOrDie($ID_while, lexerFlags);
    AST_open(astProp, {
      type: 'WhileStatement',
      loc: AST_getBaseLoc(whileToken),
      test: undefined,
      body: undefined,
    });
    parseStatementHeader(lexerFlags, 'test');
    parseNestedBodyPart(lexerFlags | LF_IN_ITERATION, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    AST_close('WhileStatement');
  }

  function parseIdentLabelOrExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp) {
    ASSERT(parseIdentLabelOrExpressionStatement.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(curtok.type), 'should not have consumed the ident yet', T(curtok.type));
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
    let identToken = curtok;
    let identTokenCanon = tok_getCanon();

    // TODO: in most of the cases below where it leads to a label an error "keyword label" should be thrown immediately

    ASSERT(curtok.type !== $ID_function, 'function ident is already checked before this func');

    // For the sake of simplicity, and because this function should not hit very frequently, we'll take the slow path
    skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE);

    if (curtok.type === $PUNC_COLON) {
      // Ident to be verified not to be reserved in the label parser
      return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp);
    }

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(identToken),
      expression: undefined,
    });
    parseExpressionsAfterIdent(lexerFlags, identToken, identTokenCanon, 'expression');
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }
  function parseDeleteExpression(lexerFlags, deleteToken, inputAssignable, astProp) {
    AST_open(astProp, {
      type: 'UnaryExpression',
      loc: AST_getBaseLoc(deleteToken),
      operator: 'delete',
      prefix: true,
      argument: undefined,
    });
    let assignable = ASSIGNABLE_UNDETERMINED;
    if (isIdentToken(curtok.type)) {
      assignable = parseDeleteIdent(lexerFlags, astProp);
    } else if (curtok.type === $PUNC_PAREN_OPEN) {
      // This case has to be confirmed not to just wrap an ident in parens
      // `delete (foo)`
      // `delete ((foo).x)`
      // `delete ((((foo))).x)`
      // `delete (a, b).c`
      assignable = parseDeleteParenSpecialCase(lexerFlags, 'argument');
    } else {
      // - `delete "x".y`
      // - `delete [].x`
      // - `delete yield x`     // error; arg must be "unaryexpression", which does not subset assignmentexpression
      // - `delete await x`     // ok? not sure if early error actually (TODO)
      assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument');
    }
    AST_close('UnaryExpression');
    if (curtok.type === $PUNC_STAR_STAR) {
      THROW('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)');
    }
    ASSERT(assignable !== ASSIGNABLE_UNDETERMINED, 'every branch should update this');
    // Make sure to propagate the input- and found await/yield flags
    return setNotAssignable(assignable | inputAssignable);
  }
  function parseDeleteParenSpecialCase(lexerFlags, astProp){
    // This parser has to confirm whether or not the `delete` is only on an ident wrapped with any number of parens.
    // While still properly parsing the whole thing, of course.

    // some cases to consider;
    // - `delete (foo)`
    // - `delete ((foo).x)`
    // - `delete ((((foo))).x)`
    // - `delete (a, b).c`
    // - `delete ((a)=>b)`
    // - `delete (((a)=>b).x)`
    // - `delete (((a)=b).x)`
    // - `delete ((true)=x)`               -- assignability of the ident is relevant
    // - `delete ((((true)))=x)`           -- consider that it may be a few recursive calls down
    // - `delete true.__proto__.foo`       -- and technically it could work so we can't just throw
    // - `delete (a[await x])`
    // - `delete ((((a)))[await x])`
    // - `delete (foo) => x`
    // - `delete ((foo) => x)`

    ASSERT(curtok.type === $PUNC_PAREN_OPEN, 'this is why we are here');

    let outerParenToken = curtok;
    let outerLexerflags = lexerFlags;

    let parens = 1;
    let pees = [curtok]; // rare use of arrays because we need to remember where it was opened for locs in ASTs (edge case path meh)
    // Cannot asi inside `delete (...)`, the `in` restriction stuff does not apply inside the arg
    lexerFlags = sansFlag(lexerFlags | LF_NO_ASI, LF_IN_FOR_LHS);
    let parenToken = curtok;
    ASSERT_skipToExpressionStartGrouped($PUNC_PAREN_OPEN, lexerFlags); // `delete (/x/.y)`, for bonus points
    while (curtok.type === $PUNC_PAREN_OPEN) {
      ++parens;
      parenToken = curtok;
      pees[pees.length] = curtok;

      // Note: next is expression start or `)` in case of `delete (()=>{})`
      ASSERT_skipToExpressionStartGrouped($PUNC_PAREN_OPEN, lexerFlags); // `delete (/x/.y)`, for bonus points
    }
    // Now parse a group and pass it a special flag that changes the semantics of the return value
    // It's an ugly hack :( all caused by `delete ((((a, b) => c).d))` being hard to custom parse

    let possibleIdentToken = curtok;

    let assignableOrJustIdent = _parseGroupToplevels(
      lexerFlags,
      parenToken,
      IS_EXPRESSION,
      parens === 1 ? ASSIGN_EXPR_IS_ERROR : ASSIGN_EXPR_IS_OK,
      IS_DELETE_ARG,
      UNDEF_ASYNC,
      '',
      NOT_ASYNC_PREFIXED,
      NOT_LHSE,
      astProp
    );

    // "decode" the return value back into an assignable
    let assignable = hasAnyFlag(assignableOrJustIdent, IS_SINGLE_IDENT_WRAP_A | NOT_SINGLE_IDENT_WRAP_A) ? initAssignable(): initNotAssignable();
    assignable = copyPiggies(assignable, assignableOrJustIdent);

    // the group parser parses one rhs paren so there may not be any parens left to consume here
    let canBeErrorCase = hasAnyFlag(assignableOrJustIdent, IS_SINGLE_IDENT_WRAP_A | IS_SINGLE_IDENT_WRAP_NA);
    while (--parens > 0) { // this only passes for inner parens
      let openParenToken = pees.pop();
      // `delete ((foo).bar)`, parse a tail then continue parsing parens
      if (curtok.type !== $PUNC_PAREN_CLOSE) {

        // After closing a paren, this is no longer an issue
        assignable = sansFlag(assignable, PIGGY_BACK_WAS_ARROW);

        // (this is never toplevel)
        // `delete ((foo).bar)`      -- parse a tail then continue parsing parens
        // `delete ((foo)++)`
        // `delete ((true)++)`       -- (note that this is not `assignable`)
        // `delete ((await x))`      -- runtime error, exception: syntax error in func arg default
        let nowAssignable = parseValueTail(lexerFlags, openParenToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
        assignable = mergeAssignable(nowAssignable, assignable);
        assignable = parseExpressionFromOp(lexerFlags, openParenToken, assignable, astProp);
        if (curtok.type === $PUNC_COMMA) assignable = _parseExpressions(lexerFlags, openParenToken, assignable, astProp);
        canBeErrorCase = false;
        if (curtok.type !== $PUNC_PAREN_CLOSE) {
          return THROW('Expecting at least one more closing paren, found `' + curtok.str + '` instead');
        }
      }
      // at least one rhs paren must appear now
      ASSERT_skipDiv($PUNC_PAREN_CLOSE, outerLexerflags);
      if (curtok.type === $PUNC_EQ_GT) {
        // This means the code is deleting an arrow that is wrapped in parentheses
        // The case for deleting an unwrapped arrow is handled elsewhere
        // `delete ((a)) => b)`
        // `delete (((x)) => x)`
        THROW('Arrow is illegal here');
      }
      if (babelCompat) AST_babelParenthesizesClosed(outerParenToken, astProp);
    }
    if (babelCompat) AST_babelParenthesizesClosed(outerParenToken, astProp);
    ASSERT(hasAllFlags(lexerFlags, LF_NO_ASI), 'should not be allowed to parse asi inside a group');
    lexerFlags = sansFlag(lexerFlags, LF_NO_ASI); // TODO: `(delete (((x))) \n x)` can still not ASI

    ASSERT(parens === 0 && pees.length === 1, 'should unwind all the parens', parens, pees.length, pees);
    if (curtok.type === $PUNC_EQ_GT) {
      // This means the code is deleting an arrow that is NOT wrapped in parentheses
      // `delete (x) => b)`
      // `delete (0) => x)`
      THROW('Arrow is illegal as arg of `delete`');
    }

    // this is after the outer most rhs paren. we still have to check whether we can parse a tail (but no op)
    // - `delete (foo).foo`
    // - `delete (foo)++`        -- wait is this even legal?
    let prevtok = curtok;
    parseValueTail(lexerFlags, outerParenToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
    if (curtok === prevtok && canBeErrorCase && hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      ASSERT(isIdentToken(possibleIdentToken.type), 'this state is verified through piggies and if it wasnt an ident then this should never be reached', possibleIdentToken);
      // https://tc39.github.io/ecma262/#sec-delete-operator-static-semantics-early-errors
      // strict mode only
      // This is the group-wrapped variant, which still holds the above rule
      // [x]: `delete (foo);`
      // [v]: `delete (null);`
      // [v]: `delete (true);`
      // [v]: `delete (false);`
      // [v]: `delete (this);`
      // [x]: `delete (yield);` // (yield expression is not allowed in this position and we're assuming strict mode so can't be a var)
      // [x]: `delete (await);` // (only auto-keyword in module goal, and if it were a keyword and valid then it would have an argument so curtok!==afterIdentToken)
      // [x]: `delete (super);` // super can't be referenced without a call or property so would be curtok!==afterIdentToken
      if (possibleIdentToken.type !== $ID_null && possibleIdentToken.type !== $ID_true && possibleIdentToken.type !== $ID_false && possibleIdentToken.type !== $ID_this && possibleIdentToken.type !== $ID_await) { // super edge case so dont care about the slowness
        THROW('Bad delete case, can not delete an ident wrapped in parens');
      }
    }

    return assignable;
  }
  function parseDeleteIdent(lexerFlags) {
    // `delete foo.bar`
    // `delete foo[bar]`
    // `delete x`
    // `delete foo[await x]`
    // `delete foo[yield x]`

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    // - `delete foo`
    //           ^
    // - `delete foo.bar`
    //           ^
    // - `delete /foo/.x`
    //           ^
    // - `delete new x`
    //           ^
    // This is the `delete` _arg_, which may be a keyword. If not, then the next token cannot be a regex.
    skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE);

    let afterIdentToken = curtok; // store to assert whether anything after the ident was parsed
    let afterIdentTokenNlwas = tok_getNlwas();

    // Note: assignable is relevant if it somehow contained an await or yield; TODO: citation needed
    let assignable = parseValueAfterIdent(lexerFlags, identToken, identTokenCanon, BINDING_TYPE_NONE, ASSIGN_EXPR_IS_ERROR, 'argument');

    if (curtok === afterIdentToken && hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      // https://tc39.github.io/ecma262/#sec-delete-operator-static-semantics-early-errors
      // - It is a Syntax Error if the UnaryExpression is contained in strict mode code and the derived UnaryExpression is PrimaryExpression:IdentifierReference .
      //   - Note that IdentifierReference does NOT includes keywords. In particular, that means `null`, `true`, and `false` do not trigger this error.
      // - It is a Syntax Error if the derived UnaryExpression is PrimaryExpression: CoverParenthesizedExpressionAndArrowParameterList and CoverParenthesizedExpressionAndArrowParameterList ultimately derives a phrase that, if used in place of UnaryExpression, would produce a Syntax Error according to these rules. This rule is recursively applied.
      // (So in strict mode you can't do `delete foo;` and `delete (foo);` and `delete (((foo)));` etc)

      // Due to ASI this is a tad difficult to do without AST or even token stream but we can just confirm whether
      // the object reference to curtok remains the same. In that case only identToken was parsed as the value.

      // [x]: `delete foo;`
      // [v]: `delete null;`
      // [v]: `delete true;`
      // [v]: `delete false;`
      // [v]: `delete this;`
      // [x]: `delete yield;` // (yield expression is not allowed in this position and we're assuming strict mode so can't be a var)
      // [x]: `delete await;` // (only auto-keyword in module goal, and if it were a keyword and valid then it would have an argument so curtok!==afterIdentToken)
      // [x]: `delete super;` // super can't be referenced without a call or property so would be curtok!==afterIdentToken
      if (identToken.type !== $ID_null && identToken.type !== $ID_true && identToken.type !== $ID_false && identToken.type !== $ID_this && identToken.type !== $ID_await) { // super edge case so dont care about the slowness
        THROW('Cannot delete an identifier without tail, in strict mode');
      }
    }
    else if (afterIdentTokenNlwas > 0 && afterIdentToken.type === $PUNC_PAREN_OPEN && identToken.type === $ID_async && curtok.type === $PUNC_EQ_GT && hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      // - `delete async \n (...) => x`
      // which is effectively `delete async; () => x;`, which is still an error
      THROW('Cannot delete an identifier without tail, in strict mode');
    }

    return assignable;
  }

  function parseLabeledStatementInstead(lexerFlags, scoop, labelSet, identToken, identTokenCanon, fdState, nestedLabels, astProp) {
    ASSERT(arguments.length === parseLabeledStatementInstead.length, 'arg count');
    ASSERT_LABELSET(labelSet);
    ASSERT(nestedLabels === PARENT_NOT_LABEL || nestedLabels instanceof Array, 'nestedLabels should be a list of names of uninterupted label parents');

    let labelName = identToken.str;

    // This is an exception to the general case where eval and arguments are okay to use as label name. Thanks, spec.
    if (identToken.type !== $ID_eval && identToken.type !== $ID_arguments) {
      fatalBindingIdentCheck(identToken, identTokenCanon, BINDING_TYPE_NONE, lexerFlags);
    }

    let set = labelSet;
    while (set) {
      if (set['#' + labelName]) THROW('Saw the same label twice which is not allowed');
      set = set.parentLabels;
    }
    labelSet = wrapLabelSet(labelSet, 'labelled statement');
    labelSet['#' + labelName] = true;
    ASSERT_skipToStatementStart(':', lexerFlags);

    if (fdState === FDS_IFELSE) {
      // a "labelled func decl" is never allowed as if/else child
      fdState = FDS_ILLEGAL;
    }

    if (nestedLabels === PARENT_NOT_LABEL) {
      nestedLabels = [labelName];
    } else {
      nestedLabels[nestedLabels.length] = labelName;
    }

    // We have already consumed the colon for the label so the next token must start the child-statement of this label
    // Scan forward to see whether we are about to parse a loop statement. If so we can mark nestedLabels for `continue`
    if (isIdentToken(curtok.type) && (
      curtok.type === $ID_for || curtok.type === $ID_while || curtok.type === $ID_do
    )) {
      // Either the next statement is invalid or it will be a valid iteration statement
      labelSet.iterationLabels = nestedLabels; // When scanning labels for `continue`, only visit these arrays
    }

    AST_open(astProp, {
      type: 'LabeledStatement',
      loc: AST_getBaseLoc(identToken),
      label: AST_getIdentNode(identToken, identTokenCanon),
      body: undefined,
    });
    parseNestedBodyPart(lexerFlags, scoop, labelSet, IS_LABELLED, fdState, nestedLabels, 'body');
    AST_close('LabeledStatement');
  }

  function parsePunctuatorStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parsePunctuatorStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    if (curtok.type === $PUNC_CURLY_OPEN) {
      let blockScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_BLOCK, 'parsePunctuatorStatement.block');
      ASSERT(blockScoop._funcName = '(block has no name)');
      // TODO: does block not have its own (fresh) label set?
      parseBlockStatement(lexerFlags, blockScoop, labelSet, astProp);
      return;
    }

    if (curtok.type === $PUNC_SEMI) {
      parseEmptyStatement(lexerFlags, astProp);
      return;
    }

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(curtok),
      expression: undefined,
    });
    // Note: an arrow would create a new scope and there is no other way to introduce a new binding from here on out
    parseExpressions(lexerFlags, 'expression');
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }

  function parseEmptyStatement(lexerFlags, astProp) {
    let semiToken = curtok;
    ASSERT_skipToStatementStart(';', lexerFlags);
    AST_setNode(astProp, {
      type: 'EmptyStatement',
      loc: AST_getClosedLoc(semiToken),
    });
  }

  function parseWithStatement(lexerFlags, scoop, labelSet, astProp) {
    ASSERT(arguments.length === parseWithStatement.length, 'arg count');
    ASSERT_LABELSET(labelSet);

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) THROW('The `with` statement is not allowed in strict mode');

    let withToken = curtok;
    ASSERT_skipToParenOpenOrDie($ID_with, lexerFlags);
    AST_open(astProp, {
      type: 'WithStatement',
      loc: AST_getBaseLoc(withToken),
      object: undefined,
      body: undefined,
    });
    parseStatementHeader(lexerFlags, 'object');
    parseNestedBodyPart(lexerFlags, scoop, labelSet, NOT_LABELLED, FDS_ILLEGAL, PARENT_NOT_LABEL, 'body');
    AST_close('WithStatement');
  }

  function parseAnyVarDeclaration(lexerFlags, bindingToken, scoop, bindingType, bindingOrigin, exportedNames, exportedBindings, astProp) {
    ASSERT(parseAnyVarDeclaration.length === arguments.length, 'arg count');
    ASSERT(bindingType === BINDING_TYPE_VAR || bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_CONST, 'only three kinds here');
    ASSERT_BINDING_ORIGIN(bindingOrigin);

    // - `var x = y`
    //        ^
    // - `const x = y`
    //          ^
    // - `for (let x of y);`
    //             ^

    if (!isIdentToken(curtok.type) && curtok.type !== $PUNC_BRACKET_OPEN && curtok.type !== $PUNC_CURLY_OPEN) THROW('Expected identifier, or array/object destructuring, next token is: ' + curtok);
    let keyword = bindingType === BINDING_TYPE_VAR ? 'var' : bindingType === BINDING_TYPE_LET ? 'let' : 'const';

    AST_open(astProp, {
      type: 'VariableDeclaration',
      loc: AST_getBaseLoc(bindingToken),
      kind: keyword,
      declarations: [],
    });

    parseBindings(lexerFlags, scoop, bindingType, bindingOrigin, ASSIGNMENT_IS_INIT, UNDEF_SET, exportedNames, exportedBindings, 'declarations');
    if (bindingOrigin === FROM_STATEMENT_START || bindingOrigin === FROM_EXPORT_DECL) {
      // We need to deal with the semi/asi here because of location tracking...
      parseSemiOrAsi(lexerFlags);
    }
    AST_close(['VariableDeclaration', 'ExpressionStatement']); //  expr in case of `let` in sloppy
  }

  function parseBindings(lexerFlags, scoop, bindingType, bindingOrigin, defaultOptions, setToken, exportedNames, exportedBindings, astProp) {
    ASSERT(parseBindings.length === arguments.length, 'expecting all args');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
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
    let startWasObjectOrArray = curtok.type === $PUNC_BRACKET_OPEN || curtok.type === $PUNC_CURLY_OPEN;
    let paramsSimple = PARAMS_ALL_SIMPLE;
    do {
      ++many;
      let bindingStartToken = curtok;
      let wasRest = bindingStartToken.type === $PUNC_DOT_DOT_DOT;
      // ident or destructuring of object/array or rest arg
      let paramSimple = parseBinding(lexerFlags, bindingStartToken, scoop, bindingType, bindingOrigin, defaultOptions, exportedNames, exportedBindings, astProp);
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
        ASSERT(curtok.type === $PUNC_PAREN_CLOSE, 'the "rest is last and no init" check should happen elsewhere and before this point');
        break;
      }
      if (curtok.type !== $PUNC_COMMA) break;
      ASSERT_skipToBindingStartGrouped(',', lexerFlags);
      if (curtok.type === $PUNC_PAREN_CLOSE) {
        // `function f(a,)`
        // (arrows do not go through here)
        if (bindingType === BINDING_TYPE_ARG) {
          if (allowTrailingFunctionComma) {
            // https://tc39.github.io/ecma262/#sec-function-definitions-static-semantics-issimpleparameterlist
            // The [empty] is the case of `FormalParameters : FormalParameterList ,` which is actually the prod
            // `FormalParameters : FormalParameterList , [empty]`. So a trailing comma does not change simple state.
            return paramsSimple;
          }
          THROW('Targeted language version does not support trailing function arg comma');
        } else {
          ASSERT_VALID(false, 'I dont think this is reachable in valid code?');
        }
      }
    } while (true);
    if (many !== 1 && setToken !== UNDEF_SET) {
      THROW('Setters require exactly one parameter');
    }
    if (bindingOrigin === FROM_FOR_HEADER && (curtok.type === $ID_in || curtok.type === $ID_of)) {
      if (many !== 1) {
        THROW('For-in and for-of can only have one binding, found ' + many);
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
        curtok.type === $ID_of ||
        hasAllFlags(lexerFlags, LF_STRICT_MODE))
      ) {
        THROW('For-in and for-of binding can not have an init');
      }
    }
    return paramsSimple;
  }
  function parseBinding(lexerFlags, bindingStartToken, scoop, bindingType, bindingOrigin, defaultsOption, exportedNames, exportedBindings, astProp) {
    // returns whether a binding had an init (necessary to validate for-header bindings)
    ASSERT(arguments.length === parseBinding.length, 'expecting args');
    ASSERT(defaultsOption === ASSIGNMENT_IS_INIT || defaultsOption === ASSIGNMENT_IS_DEFAULT, 'defaultsOption enum');
    ASSERT_BINDING_TYPE(bindingType);
    ASSERT_BINDING_ORIGIN(bindingOrigin);
    ASSERT(bindingStartToken === curtok);
    // note: a "binding pattern" means a var/let/const var declaration with name or destructuring pattern

    // [v]: `try {} catch (e) {}`
    //                     ^

    let mustHaveInit = false;
    let paramSimple = PARAM_UNDETERMINED; // simple if "valid in es5" (list of idents, no inits)

    if (isIdentToken(curtok.type)) {
      // - `var foo = bar;`
      //        ^^^
      let bindingTok = curtok;
      let bindingTokCanon = tok_getCanon();
      let bindingName = curtok.str;
      fatalBindingIdentCheck(bindingTok, bindingTokCanon, bindingType, lexerFlags);
      if (bindingType === BINDING_TYPE_CATCH_OTHER) {
        // See details of specific catch var exceptions in the catch parser
        bindingType = BINDING_TYPE_CATCH_IDENT;
      }
      SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, bindingName);
      addNameToExports(exportedNames, bindingName);
      addBindingToExports(exportedBindings, bindingName);
      let identToken = curtok;
      let identTokenCanon = tok_getCanon();
      // note: if this is the end of the var decl and there is no semi the next line can start with a regex
      ASSERT_skipRex(bindingName, lexerFlags); // next is `=` or `,` or `;` or asi-continuation
      AST_setIdent(astProp, identToken, identTokenCanon);

      if (
        hasNoFlag(lexerFlags, LF_STRICT_MODE) &&
        nonFatalBindingIdentCheck(bindingTok, bindingTokCanon, bindingType, lexerFlags | LF_STRICT_MODE) !== ''
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
    else if (curtok.type === $PUNC_CURLY_OPEN) {
      ASSERT(bindingType !== BINDING_TYPE_NONE, 'must bind as something'); // TODO: why only this branch?
      let destructible = parseObjectOuter(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      verifyDestructibleForBinding(destructible, bindingType);
      AST_destruct(astProp);
      paramSimple = PARAM_WAS_COMPLEX;
      // note: throw for `const {};` and `for (const {};;);` but not `for (const {} in obj);`
      if (
        (bindingOrigin !== FROM_CATCH) &&
        (bindingOrigin !== FROM_FOR_HEADER || (curtok.type !== $ID_in && curtok.type !== $ID_of)) &&
        (bindingType === BINDING_TYPE_CONST || bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_VAR)
      ) {
        mustHaveInit = true;
      }
    }
    else if (curtok.type === $PUNC_BRACKET_OPEN) {
      let destructible = parseArrayOuter(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      verifyDestructibleForBinding(destructible, bindingType);
      AST_destruct(astProp);
      paramSimple = PARAM_WAS_COMPLEX;
      // note: throw for `const {};` and `for (const {};;);` but not `for (const {} in obj);`
      if (
        (bindingOrigin !== FROM_CATCH) &&
        (bindingOrigin !== FROM_FOR_HEADER || (curtok.type !== $ID_in && curtok.type !== $ID_of)) &&
        (bindingType === BINDING_TYPE_CONST || bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_VAR)
      ) {
        mustHaveInit = true;
      }
    }
    else if (curtok.type === $PUNC_DOT_DOT_DOT) {
      if (bindingType !== BINDING_TYPE_ARG) THROW('Rest is not allowed as toplevel for var/let/const declaration binding');
      let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_PAREN_CLOSE, bindingType, UNDEF_ASYNC, exportedNames, exportedBindings, astProp);
      verifyDestructibleForBinding(subDestruct, bindingType);
      paramSimple = PARAM_WAS_COMPLEX;
    }
    else if (curtok.type !== $PUNC_PAREN_CLOSE) {
      THROW('Expected to parse a(nother) binding but none was found');
    }

    if (curtok.type === $PUNC_EQ) {
      if (bindingOrigin === FROM_CATCH) THROW('Catch clause can not have init / default');
      ASSERT_skipToExpressionStart('=', lexerFlags); // x(foo=/bar/){}
      paramSimple = PARAM_WAS_COMPLEX_HAD_INIT; // if this is an arg the arg is not "simple"
      if (defaultsOption === ASSIGNMENT_IS_DEFAULT) {
        if ((paramSimple === PARAM_WAS_SIMPLE || paramSimple === PARAM_WAS_NON_STRICT_SIMPLE) && bindingOrigin === FROM_CATCH) THROW('The catch clause cannot have a default');
        // - `try {} catch (a) {}`
        // - `try {} catch ([a]) {}`
        // - `try {} catch ([a] = b) {}`
        AST_wrapClosedCustom(astProp, {
          type: 'AssignmentPattern',
          loc: AST_getBaseLoc(bindingStartToken),
          left: undefined,
          right: undefined,
        }, 'left');
        parseExpression(lexerFlags, 'right');
        AST_close('AssignmentPattern');
      } else {
        ASSERT(bindingOrigin !== FROM_CATCH, 'catch is default');
        ASSERT(defaultsOption === ASSIGNMENT_IS_INIT, 'two options');
        AST_wrapClosedCustom('declarations', {
          type: 'VariableDeclarator',
          loc: AST_getBaseLoc(bindingStartToken),
          id: undefined,
          init: undefined,
        }, 'id');
        parseExpression(lexerFlags, 'init');
        AST_close('VariableDeclarator');
      }
    }
    else if (mustHaveInit) {
      THROW('Declaration destructuring must have init');
    }
    else if (bindingType === BINDING_TYPE_CONST && (bindingOrigin !== FROM_FOR_HEADER || (curtok.type === $PUNC_SEMI || curtok.type === $PUNC_COMMA))) {
      // only exception is a for-header where the next token is `in` or `of` instead of `=`
      THROW('Constants must be initialized');
    }
    else if (defaultsOption === ASSIGNMENT_IS_INIT) {
      if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
        if (bindingOrigin === FROM_FOR_HEADER) {
          // [x] `for (var x \n /foo/;;);`
          THROW('Illegal regex after binding declaration in `for` header');
        }
        // [v] `var x \n /foo/`
        ASSERT_ASI_REGEX_NEXT = true;
      }
      AST_setNodeDangerously('declarations', { // we will clobber the current value
        type: 'VariableDeclarator',
        loc: AST_getClosedLoc(bindingStartToken),
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

  function fatalBindingIdentCheck(identToken, identTokenCanon, bindingType, lexerFlags) {
    ASSERT(fatalBindingIdentCheck.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(identToken.type), 'ident check on ident tokens ok', identToken);
    ASSERT_BINDING_TYPE(bindingType);

    let str = nonFatalBindingIdentCheck(identToken, identTokenCanon, bindingType, lexerFlags);
    if (str !== '') THROW_TOKEN(`Cannot use this name (${identToken.str}) as a variable name because: ${str}`, identToken);
  }
  function nonFatalBindingIdentCheck(identToken, identTokenCanon, bindingType, lexerFlags) {
    ASSERT(nonFatalBindingIdentCheck.length === arguments.length, 'expecting all args');
    ASSERT(isIdentToken(identToken.type), 'ident check on ident tokens ok', identToken);
    ASSERT_BINDING_TYPE(bindingType);

    // TODO: this check can be drastically improved.

    // note that any match here is usually an error (but not always, like strict mode or context specific stuff), but usually anyways

    // If an ident has a unicode escape then its .canon must be shorter than its .str
    // If the lens are equal then the .type also applies to the .canon and we can skip slow checks for that edge case
    if (identToken.str === identTokenCanon) {
      if (identToken.type === $IDENT) return ''; // If the type is non-special (then so is the .canon) then no error
      return nonFatalBindingIdentCheckByEnum(lexerFlags, identToken, identTokenCanon, bindingType);
    }
    // This ident had an escape. This is a pretty exceptional situation so I'm okay with the slow path.
    return nonFatalBindingIdentCheckByString(lexerFlags, identToken, identTokenCanon, bindingType);
  }
  function nonFatalBindingIdentCheckByEnum(lexerFlags, identToken, identTokenCanon, bindingType) {
    ASSERT(nonFatalBindingIdentCheckByEnum.length === arguments.length, 'arg count');
    ASSERT(identToken.str === identTokenCanon, 'if the len is equal then the str must be equal because the canon can only differ through escapes and those are always longer, and that works one way');

    // This doesn't get hit very often as there's a simple ==$IDENT check that takes the brink
    // of these keyword checks. Since most cases that would fall through would lead to an error, it's only
    // idents like `from` or `of` which may lead to this point. Those don't appear very frequently :)
    // TODO: This switch could be reduced through another ident type flag. Not convinced that's worth anything.
    switch (identToken.type) {
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
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot create a binding named `'+ identTokenCanon +'` in strict mode';
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
  function nonFatalBindingIdentCheckByString(lexerFlags, identToken, identTokenCanon, bindingType) {
    ASSERT(nonFatalBindingIdentCheckByString.length === arguments.length, 'arg count');
    ASSERT(identToken.str !== identTokenCanon, 'this is the slow path and must mean the ident had a unicode escape sequence. check canon by string (since .type is based on .src) which is much slower');

    switch (identTokenCanon) {
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
        return 'Keywords may not have escapes in their name';

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
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Keywords may not have escapes in their name';
        return '';

      // `eval` and `arguments` edge case paths
      case 'eval':
      case 'arguments':
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Cannot create a binding named `'+ identTokenCanon +'` in strict mode';
        return '';

      // strict mode only future reserved keyword:
      case 'implements':
      case 'package':
      case 'protected':
      case 'interface':
      case 'private':
      case 'public':
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) return 'Keywords may not have escapes in their name';
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

    let startToken = curtok;
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);
    return parseExpressionFromOp(lexerFlags, startToken, assignable, astProp);
  }
  function parseExpressionAfterLiteral(lexerFlags, literalToken, astProp) {
    ASSERT(parseExpressionAfterLiteral.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop str', astProp);

    // assume we just parsed and skipped a literal (string/number/regex/array/object)
    let assignable = parseValueTail(lexerFlags, literalToken, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, astProp);
    parseExpressionFromOp(lexerFlags, literalToken, assignable, astProp);
  }
  function parseExpressionAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, astProp) {
    ASSERT(parseExpressionAfterIdent.length === arguments.length, 'arg count');
    ASSERT_BINDING_TYPE(bindingType);

    let assignable = parseValueAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, ASSIGN_EXPR_IS_OK, astProp);
    ASSERT(typeof assignable === 'number', 'assignanum', assignable);
    assignable = parseExpressionFromOp(lexerFlags, identToken, assignable, astProp);
    ASSERT(typeof assignable === 'number', 'assignanum', assignable);
    return assignable;
  }
  function parseExpressionAfterAsyncAsVarName(lexerFlags, stmtOrExpr, asyncToken, asyncTokenCanon, isNewArg, allowAssignment, astProp) {
    ASSERT(arguments.length === parseExpressionAfterAsyncAsVarName.length, 'arg count');
    ASSERT(asyncToken !== UNDEF_ASYNC && asyncToken.type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // This token named "async" has already been verified not to be a bunch of things.
    // Basically this now ends in one of two ways; Either it's a parenless arrow a plain binding.

    if (stmtOrExpr === IS_STATEMENT) {
      AST_open(astProp, {
        type: 'ExpressionStatement',
        loc: AST_getBaseLoc(asyncToken),
        expression: undefined,
      });
      astProp = 'expression'
    }

    let assignable = NOT_ASSIGNABLE;
    if (curtok.type === $PUNC_EQ_GT) {
      // Note: param name is `async` and there is nothing else so args guaranteed to be simple
      assignable |= parseArrowParenlessFromPunc(lexerFlags, asyncToken, asyncToken, asyncTokenCanon, allowAssignment, PARAMS_ALL_SIMPLE, UNDEF_ASYNC, astProp);
    } else {
      assignable = parseIdentOrParenlessArrow(lexerFlags, asyncToken, asyncTokenCanon, IS_ASSIGNABLE, allowAssignment, astProp);
      assignable = parseValueTail(lexerFlags, asyncToken, assignable, isNewArg, NOT_LHSE, astProp);
      if (stmtOrExpr === IS_STATEMENT) {
        // in expressions operator precedence is handled elsewhere. in statements this is the start,
        assignable = parseExpressionFromOp(lexerFlags, asyncToken, assignable, astProp);
        if (curtok.type === $PUNC_COMMA) {
          // - `async, b`
          _parseExpressions(lexerFlags, asyncToken, NOT_ASSIGNABLE, astProp);
        }
      }
    }

    ASSERT((isNewArg !== IS_NEW_ARG) || (stmtOrExpr !== IS_STATEMENT), 'this can not be a new arg if it is a statement');
    if (stmtOrExpr === IS_STATEMENT) {
      parseSemiOrAsi(lexerFlags);
      AST_close('ExpressionStatement');
    }
    return assignable;
  }
  function parseParenlessArrowAfterAsync(lexerFlags, fromStmtOrExpr, allowAssignment, asyncToken, astProp) {
    ASSERT(parseParenlessArrowAfterAsync.length === arguments.length, 'arg count');
    ASSERT(curtok.type !== $ID_function, '(Function and newline have already been asserted)');
    ASSERT(tok_getNlwas() === false, '(Function and newline have already been asserted)');
    ASSERT(isIdentToken(curtok.type), 'dont have to skip the ident to assert it having to be an arrow');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');

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
        loc: AST_getBaseLoc(asyncToken),
        expression: undefined,
      });
      astProp = 'expression'
    }

    if (curtok.type === $ID_await) {
      // - `async await => {}`
      THROW('Cannot use `await` as an arg name with async arrows');
    }

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    let isSimple = PARAMS_ALL_SIMPLE;
    // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
    if (isStrictOnlyKeyword(identToken, identTokenCanon)) {
      // - `async eval => {}`
      // - `async eval => {"use strict"}`
      // - `async package => {}`
      // - `async package => {"use strict"}`
      isSimple = PARAMS_SOME_NONSTRICT;
    }
    ASSERT_skipToArrowOrDie($G_IDENT, lexerFlags); // this was `async <curtok>` and curtok is not a keyword

    let assignable = parseArrowParenlessFromPunc(lexerFlags, asyncToken, identToken, identTokenCanon, allowAssignment, isSimple, asyncToken, astProp);

    if (fromStmtOrExpr === IS_STATEMENT) {
      parseSemiOrAsi(lexerFlags); // this is not a func decl!
      AST_close('ExpressionStatement');
    }

    return assignable;
  }
  function isStrictOnlyKeyword(identToken, identTokenCanon) {
    ASSERT(isStrictOnlyKeyword.length === arguments.length, 'arg count');

    if (identTokenCanon.length === identToken.str.length) {
      return isStrictOnlyKeywordByEnum(identToken);
    }
    return isStrictOnlyKeywordByString(identTokenCanon);
  }
  function isStrictOnlyKeywordByEnum(identToken) {
    switch (identToken.type) {
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
  function isStrictOnlyKeywordByString(identTokenCanon) {
    // Note: check canon because in strict these are keywords and they are not allowed to have escapes; so treat same
    switch (identTokenCanon) {
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
  function parseExpressionFromOp(lexerFlags, firstExprToken, assignable, astProp) {
    ASSERT(parseExpressionFromOp.length === arguments.length, 'arg count');
    ASSERT(typeof assignable === 'number', 'assignable num');

    if (isCompoundAssignment(curtok.type)) {
      if (notAssignable(assignable)) {
        THROW('Cannot assign to lhs (starting with `'+firstExprToken.str+'`) because it is not a valid assignment target');
      }
      assignable = parseExpressionFromAssignmentOp(lexerFlags, firstExprToken, assignable, astProp);
    } else {
      assignable = parseExpressionFromBinaryOp(lexerFlags, firstExprToken, assignable, astProp)
    }

    return assignable;
  }
  function parseExpressionFromAssignmentOp(lexerFlags, firstAssignmentToken, lhsAssignable, astProp) {
    ASSERT(parseExpressionFromAssignmentOp.length === arguments.length, 'arg count');

    AST_convertArrayToPattern(curtok, astProp)

    // Note: assignment to object/array is caught elsewhere
    AST_wrapClosedCustom(astProp, {
      type: 'AssignmentExpression',
      loc: AST_getBaseLoc(firstAssignmentToken),
      left: undefined,
      operator: curtok.str,
      right: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart(curtok.str, lexerFlags);

    let rhsAssignable = parseExpression(lexerFlags, 'right');
    AST_close('AssignmentExpression');

    // - `a.b = x`
    // - `a = x`
    // - `a = b = x`
    // Reset assignability because further assignments should be parsed immediately and since this will now never
    // become a "simple assignment target", for all further intentions and purposes this won't be assigned to.
    ASSERT(curtok.type !== $PUNC_EQ);
    return setNotAssignable(mergeAssignable(rhsAssignable, lhsAssignable));
  }
  function parseExpressionFromBinaryOp(lexerFlags, firstExprToken, assignable, astProp) {
    ASSERT(parseExpressionFromBinaryOp.length === arguments.length, 'arg count');

    if (hasAllFlags(assignable, PIGGY_BACK_WAS_ARROW)) return assignable;

    let first = true;
    while (isNonAssignBinOp(curtok.type, lexerFlags) || curtok.type === $PUNC_QMARK) {
      if (curtok.type === $PUNC_QMARK) {
        let nowAssignable = parseExpressionFromTernaryOp(lexerFlags, firstExprToken, astProp);
        assignable = setNotAssignable(nowAssignable | assignable);
      } else {
        let nowAssignable = parseExpressionFromBinaryOpOnlyStronger(lexerFlags, firstExprToken, astProp);
        assignable = setNotAssignable(nowAssignable | assignable);
      }

      // note: this is a nice error message for `5+5=10`
      if (curtok.type === $PUNC_EQ) {
        THROW('Cannot assign a value to non-assignable value');
      }

      first = false;
    }
    if (isCompoundAssignment(curtok.type)) {
      // [x]: `[]=n/f>>=v`
      THROW('Can not have an assignment after a non-assignment operator');
    }
    return assignable;
  }
  function parseExpressionFromBinaryOpOnlyStronger(lexerFlags, exprStartToken, astProp) {
    ASSERT(parseExpressionFromBinaryOpOnlyStronger.length === arguments.length, 'arg count');
    // parseBinary
    // Now parsing the rhs (b) after an operator
    // - `a + b`
    // - `a instanceof b`
    // - `a ** b`
    let opToken = curtok;
    let opType = opToken.type;
    let AST_nodeName = (opType === $PUNC_AND_AND || opType === $PUNC_OR_OR) ? 'LogicalExpression' : 'BinaryExpression';
    AST_wrapClosedCustom(astProp, {
      type: AST_nodeName,
      loc: AST_getBaseLoc(exprStartToken),
      left: undefined,
      operator: opToken.str,
      right: undefined,
    }, 'left');
    ASSERT_skipToExpressionStart(opToken, lexerFlags);
    let rightExprStartToken = curtok;
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'right');

    // If the next op is stronger than this one go deeper now. Only the `**` non-assign binary op also does this
    // for if the previous op was also `**` (and we don't need other checks because it is the strongest binary op).
    // TODO: dedupe the op check which now happens here and at the higher level again
    while ((isNonAssignBinOp(curtok.type, lexerFlags) && getStrength(curtok) > getStrength(opToken)) || curtok.type === $PUNC_STAR_STAR) {
      let nowAssignable = parseExpressionFromBinaryOpOnlyStronger(lexerFlags, rightExprStartToken,'right');
      assignable = mergeAssignable(nowAssignable, assignable);
    }

    AST_close(AST_nodeName);

    return assignable;
  }
  function parseExpressionFromTernaryOp(lexerFlags, firstExprToken, astProp) {
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
      loc: AST_getBaseLoc(firstExprToken),
      test: undefined,
      consequent: undefined,
      alternate: undefined,
    }, 'test');
    ASSERT_skipToExpressionStart('?', lexerFlags);
    // you can have an assignment between `?` and `:` but not after `:`
    // the `in` is allowed between as well because there can be no ambiguity
    // TODO: add testcase where NO_ASI is necessary. Not sure it is but can't determine that it is not. Go fuzzer?
    let midAssignable = parseExpression(sansFlag(lexerFlags, LF_IN_FOR_LHS) | LF_NO_ASI, 'consequent');
    if (curtok.type !== $PUNC_COLON) {
      if (curtok.type === $PUNC_COMMA) THROW('Can not use comma inside ternary expressions');
      THROW('Unexpected character inside ternary');
    }
    ASSERT_skipToExpressionStart(':', lexerFlags);
    let rhsAssignable = parseExpression(lexerFlags, 'alternate');
    AST_close('ConditionalExpression');

    return setNotAssignable(midAssignable | rhsAssignable);
  }

  function parseExpressionsAfterIdent(lexerFlags, identToken, identTokenCanon, astProp) {
    ASSERT(parseExpressionsAfterIdent.length === arguments.length, 'arg count');

    let assignableForPiggies = parseExpressionAfterIdent(lexerFlags, identToken, identTokenCanon, BINDING_TYPE_NONE, astProp)
    if (curtok.type === $PUNC_COMMA) {
      assignableForPiggies = _parseExpressions(lexerFlags, identToken, assignableForPiggies, astProp);
    }
    return assignableForPiggies;
  }
  function parseExpressions(lexerFlags, astProp) {
    ASSERT(arguments.length === parseExpressions.length, 'arg count');

    let startOfFirstExprToken = curtok;
    let assignableForPiggies = parseExpression(lexerFlags, astProp);
    if (curtok.type === $PUNC_COMMA) {
      assignableForPiggies = _parseExpressions(lexerFlags, startOfFirstExprToken, assignableForPiggies, astProp);
    }
    return assignableForPiggies;
  }
  function _parseExpressions(lexerFlags, startOfFirstExprToken, assignableForPiggies, astProp) {
    ASSERT(arguments.length === _parseExpressions.length, 'arg count');
    ASSERT(curtok.type === $PUNC_COMMA, 'confirm at callsite');
    AST_wrapClosedIntoArrayCustom(astProp, {
      type: 'SequenceExpression',
      loc: AST_getBaseLoc(startOfFirstExprToken),
      expressions: undefined,
    }, 'expressions', startOfFirstExprToken);
    assignableForPiggies = __parseExpressions(lexerFlags, assignableForPiggies, 'expressions');
    AST_close('SequenceExpression');
    return assignableForPiggies; // since we asserted a comma, we can be certain about this
  }
  function __parseExpressions(lexerFlags, assignableForPiggies, astProp) {
    ASSERT(__parseExpressions.length === arguments.length, 'arg count');
    // current node should already be a SequenceExpression here. it wont be closed here either
    do {
      ASSERT_skipToExpressionStart(',', lexerFlags);
      let nowAssignable = parseExpression(lexerFlags, astProp);
      assignableForPiggies |= nowAssignable; // make sure to propagate the await/yield flags
    } while (curtok.type === $PUNC_COMMA);
    return setNotAssignable(assignableForPiggies);
  }

  function isCompoundAssignment(type) {
    ASSERT(isCompoundAssignment.length === arguments.length, 'arg count');

    // Find compound ops but ignore comparison ops

    if (!hasAllFlags(type, $G_BINOP_ASSIGN)) return false;
    if (type !== $PUNC_STAR_STAR_EQ) return true;

    if (targetEsVersion < VERSION_EXPONENTIATION && targetEsVersion !== VERSION_WHATEVER) {
      // TODO: test case
      return THROW('`**` is not supported in ES' + targetEsVersion);
    }
    return true;
  }
  function isNonAssignBinOp(type, lexerFlags) {
    ASSERT(isNonAssignBinOp.length === arguments.length, 'arg count');

    if (!hasAllFlags(type, $G_BINOP_NONASSIGN)) return false;

    if (type === $PUNC_STAR_STAR) {
      if (targetEsVersion < VERSION_EXPONENTIATION && targetEsVersion !== VERSION_WHATEVER) {
        // TODO: test case
        return THROW('`**` is not supported in ES' + targetEsVersion);
      }
      return true;
    }

    if (curtok.type === $ID_in) {
      return hasNoFlag(lexerFlags, LF_IN_FOR_LHS);
    }

    return true;
  }

  function getStrength(token) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    // the spec is super implicit about operator precedent. you can only discover it by tracing the grammar.
    // note: this function doesnt contain all things that have precedent. most of them are also implicitly
    // determined by parsing mechanisms. stuff here is mostly about disambiguating binary ops.
    // (note that unary ops simply don't consume further binary ops AST-wise so they dont appear in this table)

    switch (token.type) {
      case $PUNC_STAR_STAR: return 15;
      case $PUNC_STAR: return 14;
      case $PUNC_DIV: return 14;
      case $PUNC_PERCENT: return 14;
      case $PUNC_PLUS: return 13;
      case $PUNC_MIN: return 13;
      case $PUNC_LT_LT: return 12;
      case $PUNC_GT_GT: return 12;
      case $PUNC_GT_GT_GT: return 12;
      case $PUNC_LT: return 11;
      case $PUNC_LT_EQ: return 11;
      case $PUNC_GT: return 11;
      case $PUNC_GT_EQ: return 11;
      case $ID_in: return 11;
      case $ID_instanceof: return 11;
      case $ID_of: return 11;
      case $PUNC_EQ_EQ: return 10;
      case $PUNC_EXCL_EQ: return 10;
      case $PUNC_EQ_EQ_EQ: return 10;
      case $PUNC_EXCL_EQ_EQ: return 10;
      case $PUNC_AND: return 9;
      case $PUNC_CARET: return 8;
      case $PUNC_OR: return 7;
      case $PUNC_AND_AND: return 6;
      case $PUNC_OR_OR: return 5;
      case $PUNC_QMARK: return 4;
    }

    THROW('Unknown operator ['+token.str+']'); // other ops should not be handled by this function. dont think this should be possible in prod (it means lexer allowed a new op)
  }

  function parseValue(lexerFlags, allowAssignment, isNewArg, leftHandSideExpression, astProp) {
    ASSERT(arguments.length === parseValue.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lf is bitfield');
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'enum');
    ASSERT(leftHandSideExpression === NOT_LHSE || leftHandSideExpression === ONLY_LHSE, 'enum');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT(typeof astProp === 'string', 'astProp string');

    let startToken = curtok;
    let assignable = parseValueHeadBody(lexerFlags, PARSE_VALUE_MUST, isNewArg, allowAssignment, leftHandSideExpression, astProp);
    // isNewArg is relevant for tail because call parens should be parsed by the new-parser, not call-parser
    // eg. `new foo()` should NOT be `new (foo())` / `(new foo)()` but we do allow `new foo.bar()`
    return parseValueTail(lexerFlags, startToken, assignable, isNewArg, leftHandSideExpression, astProp);
  }
  function parseValueAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, allowAssignment, astProp) {
    ASSERT(parseValueAfterIdent.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT_BINDING_TYPE(bindingType);

    // only parses head+body+tail but STOPS at ops
    let assignable = parseValueHeadBodyAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, NOT_NEW_ARG, allowAssignment, NOT_LHSE, astProp);
    return parseValueTail(lexerFlags, identToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
  }
  function parseYieldValueMaybe(lexerFlags, astProp) {
    ASSERT(parseYieldValueMaybe.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);

    let argStartToken = curtok;
    let assignable = parseValueHeadBody(lexerFlags, PARSE_VALUE_MAYBE, NOT_NEW_ARG, ASSIGN_EXPR_IS_OK, NOT_LHSE, astProp);
    // TODO: how to properly solve this when there are no tokens? can we even do that? (-> lexer head)
    if (curtok === argStartToken) return YIELD_WITHOUT_VALUE;
    assignable = parseValueTail(lexerFlags, argStartToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
    // I dont think we need to propagate the await/yield state of the arg of a yield expression, do we?
    if (isAssignable(assignable)) return WITH_ASSIGNABLE;
    return WITH_NON_ASSIGNABLE;
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
    let startToken = curtok;

    // return whether the value is assignable (only for regular var names)
    if (isIdentToken(curtok.type)) {
      return parseValueHeadBodyIdent(lexerFlags, isNewArg, BINDING_TYPE_NONE, allowAssignment, leftHandSideExpression, astProp);
    }

    if (isNumberStringRegex(curtok.type)) {
      let litToken = curtok;
      let litTokenCanon = tok_getCanon();
      skipDiv(lexerFlags); // Next can be any binary operator, anything that closes the current context (`}`, `)`, `]`)
      AST_setLiteral(astProp, litToken, litTokenCanon);
      return NOT_ASSIGNABLE;
    }

    if (isTemplateStart(curtok.type)) {
      parseTickExpression(lexerFlags, curtok, astProp);
      return NOT_ASSIGNABLE;
    }

    if (isPunctuatorToken(curtok.type)) {
      if (curtok.type === $PUNC_CURLY_OPEN) {
        let skipInit = allowAssignment === ASSIGN_EXPR_IS_OK && leftHandSideExpression === NOT_LHSE && isNewArg === NOT_NEW_ARG ? PARSE_INIT : SKIP_INIT;
        let wasDestruct = parseObjectOuter(lexerFlags, DO_NOT_BIND, BINDING_TYPE_NONE, skipInit, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        return _parseValueHeadBodyAfterObjArr(wasDestruct);
      }

      if (curtok.type === $PUNC_BRACKET_OPEN) {
        let skipInit = allowAssignment === ASSIGN_EXPR_IS_OK && leftHandSideExpression === NOT_LHSE && isNewArg === NOT_NEW_ARG ? PARSE_INIT : SKIP_INIT;
        let wasDestruct = parseArrayOuter(lexerFlags, DO_NOT_BIND, BINDING_TYPE_NONE, skipInit, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        return _parseValueHeadBodyAfterObjArr(wasDestruct);
      }

      if (curtok.type === $PUNC_PAREN_OPEN) {
        // do not parse arrow/group tail, regardless
        return parseGroupToplevels(lexerFlags, IS_STATEMENT, allowAssignment, UNDEF_ASYNC, '', NOT_ASYNC_PREFIXED, leftHandSideExpression, astProp);
      }

      if (curtok.type === $PUNC_PLUS_PLUS || curtok.type === $PUNC_MIN_MIN) {
        if (leftHandSideExpression === ONLY_LHSE) return THROW('An update expression (`--` / `++`) is not allowed here');
        return parseUpdatePrefix(lexerFlags, isNewArg, astProp);
      }

      if (curtok.type === $PUNC_PLUS || curtok.type === $PUNC_MIN || curtok.type === $PUNC_EXCL || curtok.type === $PUNC_TILDE) {
        if (leftHandSideExpression === ONLY_LHSE) return THROW('An unary expression (`+-~!`) is not allowed here');
        return parseUnary(lexerFlags, isNewArg, astProp);
      }
    }

    ASSERT(startToken === curtok, 'anything that consumed something should return in that branch ...');
    if (maybe === PARSE_VALUE_MUST) {
      // Slow always-error path

      // If the next token starts with a dot, certain cases should not reach this point:
      // TODO: (random but kind of relevant here): add tests that put `.5` and `...` in any place here a leading-dot-token is expected
      // - `(.2)`
      // - `new.target`
      // - `new.fail`
      // - `(.fail)`
      ASSERT(curtok.type !== $NUMBER_DEC, 'should be checked elsewhere');

      if (curtok.type === $PUNC_DOT_DOT_DOT) {
        // The `...` token should be confirmed at any and only points where it might be legal
        // [x]: `let x = ...y;`
        // [x]: `foo[...x];`
        // [x]: `for (...x in y){}`
        // [x]: `y, ...x => x`
        // [x]: `...x => x`
        // [x]: `import(...a);`
        THROW('Unexpected spread/rest dots');
      }

      if (curtok.type === $PUNC_DOT) {
        // - `foo[.bar]`    or something silly like that...?
        THROW('Unexpected dot');
      }

      THROW('Expected to parse a value');

      return NOT_ASSIGNABLE;
    }
    // currently all callsites that have maybe=PARSE_VALUE_MAYBE will ignore the return value if nothing was consumed

    // <SCRUB DEV>
    let returnValue = 0;
    // This return value should be ignored. I want to know when that is not the case.
    ASSERT(returnValue = new Proxy({}, {getPrototypeOf: () => ASSERT(false, 'poisoned getPrototypeOf'), setPrototypeOf: () => ASSERT(false, 'poisoned setPrototypeOf'), isExtensible: () => ASSERT(false, 'poisoned isExtensible'), preventExtensions: () => ASSERT(false, 'poisoned preventExtensions'), getOwnPropertyDescriptor: () => ASSERT(false, 'poisoned getOwnPropertyDescriptor'), defineProperty: () => ASSERT(false, 'poisoned defineProperty'), has: () => ASSERT(false, 'poisoned has'), get: () => ASSERT(false, 'poisoned get'), set: () => ASSERT(false, 'poisoned set'), deleteProperty: () => ASSERT(false, 'poisoned deleteProperty'), ownKeys: () => ASSERT(false, 'poisoned ownKeys'), apply: () => ASSERT(false, 'poisoned apply'), construct: () => ASSERT(false, 'poisoned construct')}));
    return returnValue;
    // </SCRUB DEV>
  }
  function _parseValueHeadBodyAfterObjArr(wasDestruct) {
    ASSERT(_parseValueHeadBodyAfterObjArr.length === arguments.length, 'argcount');

    if (hasAllFlags(wasDestruct, MUST_DESTRUCT)) {
      // [x]: `x = {x=y};`
      // [x]: `for ({x=y} ;;) b;`
      // [x]: `[{a = b}];`
      // [x]: `[{x = y}] in z`
      THROW('Found a struct that must be destructured but was not');
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
    ASSERT(isIdentToken(curtok.type), 'token should not yet have been consumed because the next token depends on its value and so you cant consume this ahead of time...');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    skipIdentSafeSlowAndExpensive(lexerFlags, leftHandSideExpression);

    return parseValueHeadBodyAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, isNewArg, allowAssignment, leftHandSideExpression, astProp);
  }
  function parseValueHeadBodyAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, isNewArg, allowAssignment, leftHandSideExpression, astProp) {
    ASSERT(parseValueHeadBodyAfterIdent.length === arguments.length, 'expecting args');
    ASSERT(isIdentToken(identToken.type), 'should have consumed token. make sure you checked whether the token after can be div or regex...');
    ASSERT(identToken !== curtok, 'should have consumed this');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT(isNewArg === NOT_NEW_ARG || allowAssignment === ASSIGN_EXPR_IS_ERROR, 'new arg does not allow assignments');
    ASSERT_BINDING_TYPE(bindingType);
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
    let assignable = ASSIGNABLE_UNDETERMINED;
    // note: curtok token has been skipped prior to this call.
    let identName = identToken.str;
    switch (identToken.type) {
      case $ID_arguments:
        assignable = verifyEvalArgumentsVar(lexerFlags);
        if (curtok.type === $PUNC_EQ_GT) {
          if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
            THROW('Can not use `arguments` as arg name in strict mode');
          }
          return parseArrowParenlessFromPunc(lexerFlags, identToken, identToken, identTokenCanon, ASSIGN_EXPR_IS_OK, PARAMS_SOME_COMPLEX, UNDEF_ASYNC, astProp);
        }
        AST_setIdent(astProp, identToken, identTokenCanon);
        return assignable;
      case $ID_async:
        return parseAsyncExpression(lexerFlags, identToken, identTokenCanon, isNewArg, NOT_EXPORT, allowAssignment, leftHandSideExpression, astProp);
      case $ID_await:
        return parseAwait(lexerFlags, identToken, identTokenCanon, isNewArg, allowAssignment, astProp);
      case $ID_class:
        // - `(class x {})`
        // - `(class x {}.foo)`
        // - `(class x {}.foo())`
        // - `(class x {}())`
        // - `async function f(){   (fail = class extends (await x) {}) => {}   }`
        return parseClassExpression(lexerFlags, identToken, astProp);
      case $ID_delete:
        if (isNewArg === IS_NEW_ARG) THROW('Cannot delete inside `new`');
        return parseDeleteExpression(lexerFlags, identToken, assignable, astProp);
      case $ID_eval:
        assignable = verifyEvalArgumentsVar(lexerFlags);
        if (curtok.type === $PUNC_EQ_GT) {
          if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
            THROW('Can not use `eval` as arg name in strict mode');
          }
          return parseArrowParenlessFromPunc(lexerFlags, identToken, identToken, identTokenCanon, ASSIGN_EXPR_IS_OK, PARAMS_SOME_COMPLEX, UNDEF_ASYNC, astProp);
        }
        AST_setIdent(astProp, identToken, identTokenCanon);
        return assignable;
      case $ID_false:
        return parseFalseKeyword(identToken, astProp);
      case $ID_function:
        parseFunctionExpression(lexerFlags, UNDEF_ASYNC, identToken, astProp);
        return NOT_ASSIGNABLE;
      case $ID_import:
        if (curtok.type === $PUNC_PAREN_OPEN) {
          return parseDynamicImport(lexerFlags, identToken, astProp);
        }
        return THROW('Import keyword only allowed on toplevel or in a dynamic import');
      case $ID_let:
        if (bindingType === BINDING_TYPE_CLASS) {
          THROW('Can not use `let` as a class name');
        }
        if (bindingType === BINDING_TYPE_LET || bindingType === BINDING_TYPE_CONST) {
          THROW('Can not use `let` when binding through `let` or `const`');
        }
        // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
        //   Identifier: IdentifierName but not ReservedWord
        //     It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName is: ... "let" ...
        if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
          THROW('Can not use `let` as variable name in strict mode');
        }

        assignable = initAssignable(assignable);

        return parseIdentOrParenlessArrow(lexerFlags, identToken, identTokenCanon, assignable, allowAssignment, astProp);
      case $ID_new:
        // - `new x`
        // - `new x()`
        // - `new.target`
        // - `async function f(){   (fail = new x(await x)) => {}   }`
        // - `async function f(){   (fail = new (await x)) => {}   }`
        // - `async function f(){   (fail = new f[await x]) => {}   }`
        let newAssignable = parseNewKeyword(lexerFlags, identToken, identTokenCanon, astProp);
        return setNotAssignable(newAssignable); // note: property in `new x().y` is not parsed yet. new expr is never assignable
      case $ID_null:
        return parseNullKeyword(identToken, astProp);
      case $ID_super:
        return parseSuperKeyword(lexerFlags, identToken, astProp);
      case $ID_true:
        return parseTrueKeyword(identToken, astProp);
      case $ID_this:
        return parseThisKeyword(identToken, astProp);
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
        if (isNewArg === IS_NEW_ARG) THROW('Cannot '+identName+' inside `new`');
        return _parseUnary(lexerFlags, identToken, identName, astProp);
      case $ID_void:
        // [x]: `[void x] = x;`
        // [v]: `[void x]`
        if (isNewArg === IS_NEW_ARG) THROW('Cannot '+identName+' inside `new`');
        return _parseUnary(lexerFlags, identToken, identName, astProp);
      case $ID_yield:
        // - `x + yield`
        // - `delete yield`
        // - `class x extends yield {}`
        // - `5 + yield => {}`
        // - `function *f{ (x = x + yield); }`
        // - `new yield`
        // - `function *f(){ new yield }`
        // - `x = x + yield`
        return parseYield(lexerFlags, identToken, identTokenCanon, allowAssignment, astProp);
    }

    // - `x` but not `true`
    // - `[x, y, ...z = arr]`
    // TODO: is this check redundant with the binding ident check below? I think that supersedes it?
    // if (!checkIdentReadable(lexerFlags, bindingType, identToken)) {
    //   THROW('Illegal keyword encountered; is not a value [' + identToken.str + ']');
    // }
    fatalBindingIdentCheck(identToken, identTokenCanon, bindingType, lexerFlags);
    assignable = initAssignable(assignable);

    return parseIdentOrParenlessArrow(lexerFlags, identToken, identTokenCanon, assignable, allowAssignment, astProp);
  }

  function verifyEvalArgumentsVar(lexerFlags) {
    if (hasNoFlag(lexerFlags, LF_STRICT_MODE)) return IS_ASSIGNABLE;

    if (isCompoundAssignment(curtok.type)) {
      THROW('Cannot assign to `eval` and `arguments` in strict mode');
    }

    switch (curtok.str) {
      case '++':
      case '--':
        THROW('Cannot assign to `eval` and `arguments` in strict mode');
    }

    return NOT_ASSIGNABLE;
  }

  function parseTrueKeyword(trueToken, astProp) {
    if (babelCompat) {
      AST_setNode(astProp, {
        type: 'BooleanLiteral',
        loc: AST_getClosedLoc(trueToken),
        value: true,
      });
    } else {
      AST_setNode(astProp, {
        type: 'Literal',
        loc: AST_getClosedLoc(trueToken),
        value: true,
        raw: 'true',
      });
    }
    return NOT_ASSIGNABLE;
  }
  function parseFalseKeyword(falseToken, astProp) {
    if (babelCompat) {
      AST_setNode(astProp, {
        type: 'BooleanLiteral',
        loc: AST_getClosedLoc(falseToken),
        value: false,
      });
    } else {
      AST_setNode(astProp, {
        type: 'Literal',
        loc: AST_getClosedLoc(falseToken),
        value: false,
        raw: 'false',
      });
    }
    return NOT_ASSIGNABLE;
  }
  function parseNullKeyword(nullToken, astProp) {
    if (babelCompat) {
      AST_setNode(astProp, {
        type: 'NullLiteral',
        loc: AST_getClosedLoc(nullToken),
      });
    } else {
      AST_setNode(astProp, {
        type: 'Literal',
        loc: AST_getClosedLoc(nullToken),
        value: null,
        raw: 'null',
      });
    }
    return NOT_ASSIGNABLE;
  }
  function parseSuperKeyword(lexerFlags, superToken, astProp) {
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
      loc: AST_getClosedLoc(superToken),
    });

    // now confirm the tail
    // TODO: should we just parse the tail now? I don't think so ... also don't think it's important to do now

    if (curtok.type === $PUNC_PAREN_OPEN) {
      // super()
      // super(..)
      if (hasNoFlag(lexerFlags, LF_SUPER_CALL)) THROW('Can only use `super()` in constructors of classes that extend another class');
      // the call expression isn't and we did not parse the tail anyways and `super` is not assignable...
      return NOT_ASSIGNABLE;
    }

    if (curtok.type === $PUNC_BRACKET_OPEN || curtok.type === $PUNC_DOT) {
      // super.foo
      // super[foo]
      if (hasNoFlag(lexerFlags, LF_SUPER_PROP)) {
        if (curtok.type === $PUNC_BRACKET_OPEN)  {
          THROW('Can only use `super[foo]` in class or object methods or in arrows nested in those methods/arrows');
        } else {
          THROW('Can only use `super.foo` in class or object methods or in arrows nested in those methods/arrows');
        }
      }
      // the member expression might be but we did not parse the tail and `super` is not assignable...
      return NOT_ASSIGNABLE;
    }

    THROW('The `super` keyword can only be used as call or member expression');
  }
  function parseNewKeyword(lexerFlags, newToken, newTokenCanon, astProp) {
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

    if (curtok.type === $PUNC_DOT) return parseNewDotTarget(lexerFlags, newToken, newTokenCanon, astProp);
    return parseNewExpression(lexerFlags, newToken, astProp);
  }
  function parseNewDotTarget(lexerFlags, newToken, newTokenCanon, astProp) {
    // - `new.target`
    // - `new.foo`

    if (hasNoFlag(lexerFlags, LF_CAN_NEW_DOT_TARGET)) {
      // only valid if there is at least one scope in the scope tree that is not an arrow scope
      // - `() => new.target`
      // - TODO: `function f(x=() => new.target) {}`
      THROW('Must be inside/nested a regular function to use `new.target`');
    }
    ASSERT_skipToTargetOrDie('.', lexerFlags); // already asserted the dot. For now, the valid followup is `target`
    let propertyToken = curtok;
    let propertyTokenCanon = tok_getCanon();
    ASSERT_skipDiv($ID_target, lexerFlags); // new.target / foo

    AST_setNode(astProp, {
      type: 'MetaProperty',
      loc: AST_getClosedLoc(newToken),
      meta: AST_getIdentNode(newToken, newTokenCanon),
      property: AST_getIdentNode(propertyToken, propertyTokenCanon),
    });

    return NOT_ASSIGNABLE;
  }
  function parseNewExpression(lexerFlags, newToken, astProp) {
    AST_open(astProp, {
      type: 'NewExpression',
      loc: AST_getBaseLoc(newToken),
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

    if (isIdentToken(curtok.type) && curtok.type === $ID_import) {
      // We'll have to revisit this one when `import.meta` becomes spec, but for now this is fine to prevent here.
      THROW('Cannot use dynamic import as an argument to `new`, the spec simply does not allow it');
    }

    // Note: the `isNewArg` state will make sure the `parseValueTail` function properly deals with the first call arg
    let assignableForPiggies = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, IS_NEW_ARG, NOT_LHSE, 'callee');
    AST_close('NewExpression');
    // [x]: `async function f(){ (x = new x(await x)) => {} }`
    return setNotAssignable(assignableForPiggies);
  }
  function parseThisKeyword(thisToken, astProp) {
    AST_setNode(astProp, {
      type: 'ThisExpression',
      loc: AST_getClosedLoc(thisToken),
    });
    return NOT_ASSIGNABLE;
  }
  function parseUnary(lexerFlags, isNewArg, astProp) {
    ASSERT(parseUnary.length === arguments.length, 'arg count');

    let unaryToken = curtok;
    let identName = curtok.str;
    ASSERT_skipToExpressionStart(unaryToken.str, lexerFlags); // next can be regex (`+/x/.y`), though it's very unlikely

    if (isNewArg === IS_NEW_ARG) THROW('Cannot '+identName+' inside `new`');

    return _parseUnary(lexerFlags, unaryToken, identName, astProp);
  }
  function _parseUnary(lexerFlags, unaryToken, identName, astProp) {
    ASSERT(_parseUnary.length === arguments.length, 'arg count');
    ASSERT(['+', '-', '~', '!', 'void', 'typeof'].includes(identName), '++, --, delete, new, yield, and await have special parsers', identName);

    // - `!x`
    // - `~yield`                        // ok outside strict & generator
    // - `function *f(){ ~yield }`       // error
    // - `+await x`                      // ok, await state needs to propagate back down for strict mode arg check case

    AST_open(astProp, {
      type: 'UnaryExpression',
      loc: AST_getBaseLoc(unaryToken),
      operator: identName,
      prefix: true,
      argument: undefined,
    });
    // dont parse just any standard expression. instead stop when you find any infix operator
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument');
    AST_close('UnaryExpression');

    if (curtok.type === $PUNC_STAR_STAR) {
      // [x]: `~3 ** 2;`
      // [x]: `typeof 3 ** 2;`
      THROW('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)');
    }
    return setNotAssignable(assignable);
  }
  function parseUpdatePrefix(lexerFlags, isNewArg, astProp) {
    ASSERT(parseUpdatePrefix.length === arguments.length, 'arg count');

    // note: this is ++/-- PREFIX. This version does NOT have newline restrictions!
    if (isNewArg === IS_NEW_ARG) {
      // [x]: `new ++x`
      // [x]: `new ++x.y`
      // [x]: `new ++x().y`
      THROW('Cannot `new` on an inc/dec expr');
    }

    let puncToken = curtok;
    ASSERT_skipToExpressionStart($G_PUNCTUATOR, lexerFlags); // next can be regex (++/x/.y), though it's very unlikely
    AST_open(astProp, {
      type: 'UpdateExpression',
      loc: AST_getBaseLoc(puncToken),
      argument: undefined,
      operator: puncToken.str,
      prefix: true,
    });
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_ERROR, NOT_NEW_ARG, NOT_LHSE, 'argument');

    AST_throwIfIllegalUpdateArg('argument');

    AST_close('UpdateExpression');

    if (notAssignable(assignable)) THROW('Cannot inc/dec a non-assignable value as prefix');
    return setNotAssignable(assignable);
  }

  function parseYield(lexerFlags, yieldIdentToken, yieldIdentTokenCanon, allowAssignment, astProp) {
    ASSERT(arguments.length === parseYield.length, 'arg count');
    ASSERT(yieldIdentToken !== curtok, 'should have consumed the ident already');
    ASSERT(yieldIdentToken.type === $ID_yield, 'should receive the yield keyword token that was already consumed');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // Parse an async arrow as a plain call to `async` first, inheriting the async/generator state. Then when you
    // see the arrow apply the cover grammar which disallows yield to be parsed as a yield-expression, triggering a
    // syntax error. So that means we can parse it as whatever the state while considering a YieldExpression to be
    // not arrowable. That way if it turns out to be an arrow we don't first have to run a check for YieldExpressions
    // and correct to account for [~Yield] if we see the arrow. It just fails.

    if (hasAnyFlag(lexerFlags, LF_IN_GENERATOR)) {
      return parseYieldKeyword(lexerFlags, yieldIdentToken, allowAssignment, astProp);
    }
    return parseYieldVarname(lexerFlags, yieldIdentToken, yieldIdentTokenCanon, allowAssignment, astProp);
  }
  function parseYieldKeyword(lexerFlags, yieldToken, allowAssignment, astProp) {
    ASSERT(parseYieldKeyword.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    if (hasAllFlags(lexerFlags, LF_IN_FUNC_ARGS)) {
      // Could still be arrow header, but we won't know that until much later. However, this causes destructible=false.
      // - `function *f(){ return function(x = yield y){}; }`
      THROW('The `yield` keyword in arg default must be a var name but that is not allowed inside a generator');
    }

    if (allowAssignment === ASSIGN_EXPR_IS_ERROR) {
      // note: yield is a recursive AssignmentExpression (its optional argument can be an assignment or another yield)
      // Since `yield` is an AssignmentExpression it cannot appear after a non-assignment operator. (`5+yield x` fails)

      // This basically prevents the `5 + yield x` kinds of cases
      // - `function *f(){ return 5 + yield x; }`

      THROW('Did not expect to parse an AssignmentExpression but found `yield`');
    }

    AST_open(astProp, {
      type: 'YieldExpression',
      loc: AST_getBaseLoc(yieldToken),
      delegate: undefined, // TODO: init to false
      argument: undefined,
    });
    if (tok_getNlwas() === true && isRegexToken(curtok.type)) {
      // This is an edge case where there is a newline and the next token is regex. In this case we inject ASI.
      // - `continue \n /foo/`
      // - `continue \n /foo/x`
      // tok.asi();
      AST_set('delegate', false);
      AST_set('argument', null);
      ASSERT(ASSERT_ASI_REGEX_NEXT = true); // This should be picked up at semi/asi parser and prevent an assertion error
    }
    else if (curtok.type === $PUNC_STAR) {
      AST_set('delegate', true);
      parseYieldStarArgument(lexerFlags, 'argument');
    }
    else if (curtok.type === $PUNC_STAR_STAR) {
      THROW('Cannot use `yield` to the left of the `**` operator');
    }
    else {
      AST_set('delegate', false);
      parseYieldArgument(lexerFlags, 'argument'); // optional, takes care of newline check
    }
    AST_close('YieldExpression');

    if (curtok.type === $PUNC_QMARK) {
      ASSERT(curtok.type === $PUNC_QMARK, 'just in case more tokens can start with `?`');
      THROW('Can not have a `yield` expression on the left side of a ternary');
    }

    return NOT_ASSIGNABLE | PIGGY_BACK_SAW_YIELD;
  }
  function parseYieldStarArgument(lexerFlags, astProp) {
    ASSERT(parseYieldStarArgument.length === arguments.length, 'arg count');

    // This is a "delegate". The argument is _required_ now. There is no further newline check, though.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*
    // [v] `yield * x`
    // [x] `yield \n * x`
    // [x] `yield *;`

    if (tok_getNlwas() === true) {
      // [x]: `function *f() { yield \n * x }`
      THROW('A newline after `yield` is illegal for `yield *`');
    }

    ASSERT_skipToExpressionStart('*', lexerFlags); // next is any value
    let valueStartToken = curtok;
    let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp); // arg required, no newline restrictions
    parseExpressionFromOp(lexerFlags, valueStartToken, assignable, astProp);
  }
  function parseYieldVarname(lexerFlags, identToken, identTokenCanon, allowAssignment, astProp) {
    ASSERT(parseYieldVarname.length === arguments.length, 'arg count');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // `yield` _must_ be a treated as a regular var binding now

    if (hasAllFlags(lexerFlags, LF_STRICT_MODE)) {
      THROW('Cannot use `yield` outside of generator functions when in strict mode');
    }

    // `yield` is a var name in sloppy mode:
    let assignableFlags = parseIdentOrParenlessArrow(lexerFlags, identToken, identTokenCanon, IS_ASSIGNABLE, allowAssignment, astProp);
    return copyPiggies(IS_ASSIGNABLE, assignableFlags);
  }
  function parseYieldArgument(lexerFlags, astProp) {
    ASSERT(parseYieldArgument.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);

    let yieldArgStartToken = curtok;
    // there can be no newline between keyword `yield` and its argument (restricted production)
    let hadValue = tok_getNlwas() === true ? YIELD_WITHOUT_VALUE : parseYieldValueMaybe(lexerFlags, astProp);
    if (hadValue === YIELD_WITHOUT_VALUE) {
      AST_set(astProp, null);
    } else {
      // Since this is parsing a yield expression it won't matter whether it also parsed an `await` or `yield`
      // inside the `yield` (like `yield (await foo)`) since it's invalid in args regardless.
      parseExpressionFromOp(lexerFlags, yieldArgStartToken, hadValue === WITH_ASSIGNABLE ? IS_ASSIGNABLE : NOT_ASSIGNABLE, astProp);
    }
  }

  function parseIdentOrParenlessArrow(lexerFlags, identToken, identTokenCanon, assignable, allowAssignment, astProp) {
    ASSERT(parseIdentOrParenlessArrow.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string', astProp);
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // assume an identifier has just been parsed and that it should be considered a regular var name
    // (in the case of `await`, consider it a regular var)
    if (curtok.type === $PUNC_EQ_GT) {
      ASSERT(isAssignable(assignable), 'not sure whether an arrow can be valid if the arg is marked as non-assignable');
      return parseArrowParenlessFromPunc(lexerFlags, identToken, identToken, identTokenCanon, allowAssignment, PARAMS_ALL_SIMPLE, UNDEF_ASYNC, astProp);
    } else {
      AST_setIdent(astProp, identToken, identTokenCanon);
      return assignable;
    }
  }

  function parseArrowParenlessFromPunc(lexerFlags, arrowStartToken, identToken, identTokenCanon, allowAssignment, wasSimple, asyncToken, astProp) {
    ASSERT(parseArrowParenlessFromPunc.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    ASSERT_VALID(allowAssignment === ASSIGN_EXPR_IS_OK, 'arrows are assignment expressions so it should lead to an error if those are not allowed');

    if (curtok.type !== $PUNC_EQ_GT) {
      // [x]: `function *g() { async yield = {}; }`
      THROW('An `async` followed by an identifier should lead to an arrow function, found something unexpected');
    }
    if (hasAllFlags(lexerFlags, LF_IN_GENERATOR) && identToken.type === $ID_yield) {
      // [x]: `function *g() { async yield => {}; }`
      THROW('Arrows cannot be generators and parenless `yield` param in a generator would be parsing a yield expression and fail at the arrow');
    }

    fatalBindingIdentCheck(identToken, identTokenCanon, BINDING_TYPE_ARG, lexerFlags); // TODO: confirm this isn't a duplicate check
    // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
    if (isStrictOnlyKeyword(identToken, identTokenCanon)) {
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
      THROW('The arrow is a restricted production an there can not be a newline before `=>` token');
    }
    ASSERT((identToken.type === $ID_eval || identToken.type === $ID_arguments) ? wasSimple === PARAMS_SOME_COMPLEX : true, 'eval and arguments must pass on complex so they throw if the body contains use strict');
    ASSERT(!((identToken.type === $ID_eval || identToken.type === $ID_arguments) && hasAllFlags(lexerFlags, LF_STRICT_MODE)), 'caller should throw for eval/argument already in strict mode');
    ASSERT(!(hasAnyFlag(lexerFlags, LF_STRICT_MODE) && identToken.type === $ID_yield), 'in strict mode this function will not be called by the parse yield function so we dont need to make an edge case for it');

    // arrow with single param
    if (babelCompat) {
      // Babel does not support `expression`: https://github.com/babel/babel/issues/6772#issuecomment-342935685
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: AST_getBaseLoc(arrowStartToken),
        params: [AST_getIdentNode(identToken, identTokenCanon)],
        id: null,
        generator: false,
        async: asyncToken !== UNDEF_ASYNC,
        body: undefined,
      });
    } else {
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: AST_getBaseLoc(arrowStartToken),
        params: [AST_getIdentNode(identToken, identTokenCanon)],
        id: null,
        generator: false,
        async: asyncToken !== UNDEF_ASYNC,
        expression: undefined, // TODO: init to bool
        body: undefined,
      });
    }

    let arrowScoop = SCOPE_createGlobal('parseArrowParenlessFromPunc');
    let paramScoop = SCOPE_addLayer(arrowScoop, SCOPE_LAYER_ARROW_PARAMS, 'parseArrowParenlessFromPunc(arg)');
    ASSERT(paramScoop._ = 'parenless arrow scope');
    ASSERT(paramScoop._funcName = '(arrow has no name)');
    SCOPE_addLexBinding(paramScoop, identToken.str, BINDING_TYPE_ARG, FDS_ILLEGAL);

    if (identToken.type === $ID_await && hasAnyFlag(lexerFlags, LF_IN_ASYNC)) {
      // - `async function f(){ return await => {}; }`
      THROW('Cannot use `await` as an arrow parameter name inside another async function');
    }

    parseArrowFromPunc(lexerFlags, paramScoop, asyncToken, allowAssignment, wasSimple);
    AST_close('ArrowFunctionExpression');

    return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW;
  }

  function parseTickExpression(lexerFlags, tickToken, astProp) {
    // parseTemplate
    ASSERT(parseTickExpression.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_TEMPLATE) || isTemplateStart(curtok.type), 'if in template this function can only be called by the head of a nested template', T(curtok.type));

    // basically; parse tick. if head, keep parsing body until parsing tail

    AST_open(astProp, {
      type: 'TemplateLiteral',
      loc: AST_getBaseLoc(tickToken),
      expressions: [],
      quasis: [],
    });

    let awaitYieldFlagsFromAssignable = ASSIGNABLE_UNDETERMINED;

    if (curtok.type === $TICK_PURE) {
      parseQuasiPart(lexerFlags, IS_QUASI_TAIL, false);
    }
    else if (curtok.type === $TICK_HEAD) {
      parseQuasiPart(lexerFlags, NOT_QUASI_TAIL, false);

      let tmpLexerFlags = sansFlag(lexerFlags | LF_IN_TEMPLATE | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION | LF_IN_FOR_LHS);
      // keep parsing expression+tick until tick-tail
      let wasTail = IS_QUASI_TAIL;
      do {
        awaitYieldFlagsFromAssignable |= parseExpressions(tmpLexerFlags, 'expressions');
        wasTail = curtok.type === $TICK_TAIL || curtok.type === $TICK_BAD_TAIL ? IS_QUASI_TAIL : NOT_QUASI_TAIL;
        parseQuasiPart(lexerFlags, wasTail, false);
      } while (wasTail === NOT_QUASI_TAIL);
    }
    else if (isBadTickToken(curtok.type)) {
      THROW('Template contained bad escape');
    }
    else {
      THROW('Template should start as head or pure');
    }

    AST_close('TemplateLiteral');

    // - `x${await x}y`
    return awaitYieldFlagsFromAssignable;
  }

  function parseQuasiPart(lexerFlags, wasTail, allowBadEscapes) {
    ASSERT(arguments.length === parseQuasiPart.length, 'arg count');
    ASSERT_VALID(isTickToken(curtok.type), 'expect current token to be a tick pure, head, body, or tail', curtok.type);

    let tickToken = curtok;
    let tickTokenCanon = tok_getCanon();
    let hasDoubleStart = false;
    let noCooked = false;

    if (isBadTickToken(curtok.type)) {
      if (!allowBadEscapes) THROW_TOKEN('Template contained an illegal escape, these are only allowed in _tagged_ templates in >=ES2018', tickToken);
      noCooked = true;
    }
    if (curtok.type === $TICK_PURE || curtok.type === $TICK_TAIL || curtok.type === $TICK_BAD_PURE || curtok.type === $TICK_BAD_TAIL) {
      skipDiv(lexerFlags); // First token after template is division
    } else if (curtok.type === $TICK_HEAD || curtok.type === $TICK_BODY || curtok.type === $TICK_BAD_HEAD || curtok.type === $TICK_BAD_BODY) {
      ASSERT_skipToExpressionStart($G_TICK, lexerFlags); // First token in template expression can be regex
      hasDoubleStart = true; // the raw string of the token starts with the two-char delimiter `${` instead of one
    } else {
      THROW_TOKEN('The first token after the template expression should be a continuation of the template', tickToken);
    }

    // https://github.com/estree/estree/issues/90#issuecomment-109140678
    // The raw value should normalize newlines (\r \r\n) to \n, but not \u000a
    // The cooked value should convert escapes to literals but skip further normalization
    let quasiValue = tickToken.str;
    if (acornCompat || babelCompat || templateNewlineNormalization) {
      // This normalization is almost lossy as you can't (trivially) reconstruct the original template now
      quasiValue = quasiValue.replace(/\r\n?/g, '\n');
    }
    let cookedValue = noCooked ? null : tickTokenCanon;

    AST_open('quasis', {
      type: 'TemplateElement',
      loc: AST_getBaseLocTemplate(tickToken),
      tail: wasTail === IS_QUASI_TAIL,
      value: {
        // raw: (tickToken === $TICK_HEAD || tickToken === $TICK_BAD_HEAD ? '`' : '}') + quasiValue + (tickToken === $TICK_BODY || tickToken === $TICK_BAD_BODY ? '${' : '`'),
        raw: quasiValue,
        cooked: cookedValue,
      },
    });
    AST_closeTemplateElement(hasDoubleStart);
  }

  function parseValueTail(lexerFlags, valueFirstToken, assignable, isNewArg, leftHandSideExpression, astProp) {
    ASSERT(parseValueTail.length === arguments.length, 'arg count');
    ASSERT(isNewArg === IS_NEW_ARG || isNewArg === NOT_NEW_ARG, 'isNewArg enum');
    ASSERT(typeof assignable === 'number', 'assignable num', assignable);
    ASSERT(typeof astProp === 'string', 'should be string', astProp);

    if (hasAllFlags(assignable, PIGGY_BACK_WAS_ARROW)) return assignable;

    switch (curtok.type) {
      case $PUNC_DOT:
        return _parseValueTailDotProperty(lexerFlags, valueFirstToken, assignable, isNewArg, astProp);
      case $PUNC_BRACKET_OPEN:
        return _parseValueTailDynamicProperty(lexerFlags, valueFirstToken, assignable, isNewArg, astProp);
      case $PUNC_PAREN_OPEN:
        return _parseValueTailCall(lexerFlags, valueFirstToken, assignable, isNewArg, astProp);
      case $TICK_PURE:
      case $TICK_HEAD:
      case $TICK_BAD_PURE:
      case $TICK_BAD_HEAD:
        // isTemplateStart
        return _parseValueTailTemplate(lexerFlags, valueFirstToken, assignable, isNewArg, astProp);
      case $PUNC_PLUS_PLUS:
        if (isNewArg === IS_NEW_ARG) return _parseValueTailNewArg(assignable);
        return _parseValueTailUpdate(lexerFlags, valueFirstToken, assignable, leftHandSideExpression, astProp);
      case $PUNC_MIN_MIN:
        if (isNewArg === IS_NEW_ARG) return _parseValueTailNewArg(assignable);
        return _parseValueTailUpdate(lexerFlags, valueFirstToken, assignable, leftHandSideExpression, astProp);
    }

    if (isNewArg === IS_NEW_ARG) return _parseValueTailNewArg(assignable);
    return assignable;
  }
  function _parseValueTailDotProperty(lexerFlags, valueFirstToken, assignable, isNewArg, astProp) {
    // parseMemberExpression dot

    ASSERT_skipToIdentOrDie('.', lexerFlags | LF_NOT_KEYWORD);
    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    ASSERT_skipDiv($G_IDENT, lexerFlags); // x.y / z is division
    AST_setNode(astProp, {
      type: 'MemberExpression',
      loc: AST_getClosedLoc(valueFirstToken),
      object: AST_popNode(astProp),
      property: AST_getIdentNode(identToken, identTokenCanon),
      computed: false,
    });
    return parseValueTail(lexerFlags, valueFirstToken, setAssignable(assignable), isNewArg, NOT_LHSE, astProp);
  }
  function _parseValueTailDynamicProperty(lexerFlags, valueFirstToken, assignable, isNewArg, astProp) {
    // parseMemberExpression dynamic
    // parseDynamicProperty
    AST_wrapClosedCustom(astProp, {
      type: 'MemberExpression',
      loc: AST_getBaseLoc(valueFirstToken),
      object: undefined,
      property: undefined,
      computed: true,
    }, 'object');
    ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);
    let nowAssignable = parseExpressions(sansFlag(lexerFlags | LF_NO_ASI, LF_IN_FOR_LHS | LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION), 'property');
    // - `foo[await bar]`
    assignable = mergeAssignable(nowAssignable, assignable); // pass on piggies (yield, await, etc)
    if (curtok.type !== $PUNC_BRACKET_CLOSE) THROW('Expected the closing bracket `]` for a dynamic property, found `' + tokenStrForError(curtok) + '` instead');
    ASSERT_skipDiv($PUNC_BRACKET_CLOSE, lexerFlags);
    AST_close('MemberExpression');
    return parseValueTail(lexerFlags, valueFirstToken, setAssignable(assignable), isNewArg, NOT_LHSE, astProp); // member expressions are assignable
  }
  function _parseValueTailCall(lexerFlags, valueFirstToken, assignable, isNewArg, astProp) {
    ASSERT_VALID(curtok.type === $PUNC_PAREN_OPEN);
    if (isNewArg === IS_NEW_ARG) { // exception for `new`
      let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
      if (curtok.type === $PUNC_EQ_GT) {
        THROW('The `new` keyword can not be applied to an arrow');
      }
      // new stops parsing the rhs after the first call args
      assignable = mergeAssignable(nowAssignable, assignable);
      assignable = setNotAssignable(assignable);
    } else {
      // Not `new`, parses tail, does not throw on `new async () =>`
      ASSERT(typeof astProp === 'string', 'should be string');
      AST_wrapClosedCustom(astProp, {
        type: 'CallExpression',
        loc: AST_getBaseLoc(valueFirstToken),
        callee: undefined,
        arguments: [],
      }, 'callee');
      let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
      assignable = mergeAssignable(nowAssignable, assignable);
      AST_close('CallExpression');
      assignable = parseValueTail(lexerFlags, valueFirstToken, setNotAssignable(assignable), isNewArg, NOT_LHSE, astProp);
    }

    return assignable;
  }
  function _parseValueTailTemplate(lexerFlags, valueFirstToken, assignable, isNewArg, astProp) {
    // parseTaggedTemplate
    // Note: in es9+ (only) it is legal for _tagged_ templates to contain illegal escapes (`isBadTickToken(curtok.type)`)

    // Tagged template is like a call but slightly special (and a very particular AST)
    AST_wrapClosedCustom(astProp, {
      type: 'TaggedTemplateExpression',
      loc: AST_getBaseLoc(valueFirstToken),
      tag: undefined,
      quasi: undefined,
    }, 'tag');

    AST_open('quasi', {
      type: 'TemplateLiteral',
      loc: AST_getBaseLoc(curtok),
      expressions: [],
      quasis: [],
    });

    let awaitYieldFlagsFromAssignable = ASSIGNABLE_UNDETERMINED;
    if (curtok.type === $TICK_PURE || curtok.type === $TICK_BAD_PURE) {
      parseQuasiPart(lexerFlags, IS_QUASI_TAIL, allowBadEscapesInTaggedTemplates);
    }
    else if (curtok.type === $TICK_HEAD || curtok.type === $TICK_BAD_HEAD) {
      parseQuasiPart(lexerFlags, NOT_QUASI_TAIL, allowBadEscapesInTaggedTemplates);

      let tmpLexerFlags = sansFlag(lexerFlags | LF_IN_TEMPLATE | LF_NO_ASI, LF_IN_GLOBAL | LF_IN_SWITCH | LF_IN_ITERATION | LF_IN_FOR_LHS);
      // keep parsing expression+tick until tick-tail
      let wasTail = IS_QUASI_TAIL;
      do {
        awaitYieldFlagsFromAssignable |= parseExpressions(tmpLexerFlags, 'expressions');
        wasTail = (curtok.type === $TICK_TAIL || curtok.type === $TICK_BAD_TAIL) ? IS_QUASI_TAIL : NOT_QUASI_TAIL;
        parseQuasiPart(lexerFlags, wasTail, allowBadEscapesInTaggedTemplates);
      } while (wasTail === NOT_QUASI_TAIL);
    }
    else {
      if (isBadTickToken(curtok.type)) THROW('Template containd bad escape');
      THROW('Template should start as head or pure');
    }

    AST_close('TemplateLiteral');
    AST_close('TaggedTemplateExpression');

    return parseValueTail(lexerFlags, valueFirstToken, setNotAssignable(assignable), isNewArg, NOT_LHSE, astProp);
  }
  function _parseValueTailNewArg(assignable) {
    // new rhs only parses a subset of tails
    return setNotAssignable(assignable); // maintain piggies
  }
  function _parseValueTailUpdate(lexerFlags, valueFirstToken, assignable, leftHandSideExpression, astProp) {
    ASSERT(_parseValueTailUpdate.length === arguments.length, 'arg count');
    ASSERT(curtok.type === $PUNC_PLUS_PLUS || curtok.type === $PUNC_MIN_MIN, 'have not consumed the update op yet');

    if (leftHandSideExpression === ONLY_LHSE) THROW_TOKEN('A `++` or `--` update expression is not allowed here', valueFirstToken);
    return parseUpdateExpressionSuffix(lexerFlags, valueFirstToken, assignable, astProp);
  }

  function parseUpdateExpressionSuffix(lexerFlags, argStartToken, assignable, astProp) {
    ASSERT(curtok.type === $PUNC_PLUS_PLUS || curtok.type === $PUNC_MIN_MIN, 'only for update unaries');
    // note: this is ++/-- SUFFIX. This version DOES have newline restrictions!

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
        THROW('The postfix ++/-- is a restricted production so ASI must apply but that is not valid in this context');
      }
      return assignable;
    }

    // check for this _after_ the newline check, for cases like
    if (notAssignable(assignable)) {
      // - `"foo"\n++bar`
      THROW('Cannot inc/dec a non-assignable value as postfix');
    }

    AST_throwIfIllegalUpdateArg(astProp);

    let operator = curtok.str;
    ASSERT_skipDiv($G_PUNCTUATOR, lexerFlags);
    AST_setNodeDangerously(astProp, {
      type: 'UpdateExpression',
      loc: AST_getClosedLoc(argStartToken),
      argument: AST_popNode(astProp),
      operator: operator,
      prefix: false,
    });
    return NOT_ASSIGNABLE;
  }
  function parseCallArgs(lexerFlags, astProp) {
    ASSERT_skipToExpressionStartGrouped($PUNC_PAREN_OPEN, lexerFlags);
    // [v]: `for (x(y in z);;);`
    lexerFlags = sansFlag(lexerFlags | LF_NO_ASI, LF_IN_FOR_LHS);

    let assignable = ASSIGNABLE_UNDETERMINED;
    if (curtok.type === $PUNC_PAREN_CLOSE) {
      ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);
    } else {
      do {
        if (curtok.type === $PUNC_DOT_DOT_DOT) {
          let spreadToken = curtok;
          ASSERT_skipToExpressionStart('...', lexerFlags);
          AST_open(astProp, {
            type: 'SpreadElement',
            loc: AST_getBaseLoc(spreadToken),
            argument: undefined,
          });
          let nowAssignable = parseExpression(lexerFlags, 'argument');
          assignable = mergeAssignable(nowAssignable, assignable);
          AST_close('SpreadElement');
        } else {
          let nowAssignable = parseExpression(lexerFlags, astProp);
          assignable = mergeAssignable(nowAssignable, assignable);
        }
        if (curtok.type !== $PUNC_COMMA) break;
        ASSERT_skipToExpressionStartGrouped(',', lexerFlags);
        if (curtok.type === $PUNC_PAREN_CLOSE) {
          // `x(a,b,)`
          if (allowTrailingFunctionComma) break;
          THROW('Targeted language version does not support trailing call arg comma');
        }
      } while (true);
      if (curtok.type !== $PUNC_PAREN_CLOSE) THROW('Expecting closing paren `)` for the call, found `' + tokenStrForError(curtok) + '` instead');
      ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);
    }
    return sansFlag(assignable, PIGGY_BACK_WAS_ARROW);
  }
  function parseDynamicImportStatement(lexerFlags, importToken, astProp) {
    ASSERT(parseDynamicImportStatement.length === arguments.length, 'arg count');

    AST_open(astProp, {
      type: 'ExpressionStatement',
      loc: AST_getBaseLoc(importToken),
      expression: undefined,
    });
    parseDynamicImport(lexerFlags, importToken, 'expression');
    let assignable = parseValueTail(lexerFlags, importToken, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, 'expression');
    parseExpressionFromOp(lexerFlags, importToken, assignable, 'expression');
    parseSemiOrAsi(lexerFlags);
    AST_close('ExpressionStatement');
  }
  function parseDynamicImport(lexerFlags, importToken, astProp) {
    ASSERT(parseDynamicImport.length === arguments.length, 'arg count');
    ASSERT(curtok.type === $PUNC_PAREN_OPEN, 'havent consumed the paren yet');

    // NOTE: dynamic import is NOT bound to the module goal (!) Only to the version (ES2020+)
    if (!allowDynamicImport) {
      THROW('Dynamic import syntax not supported. Requires version ES2020+ / ES11+.');
    }

    // https://github.com/estree/estree/blob/master/experimental/import-expression.md

    if (acornCompat) {
      AST_open(astProp, {
        type: 'ImportExpression',
        loc: AST_getBaseLoc(importToken),
        source: undefined,
      });
    } else {
      AST_open(astProp, {
        type: 'CallExpression',
        loc: AST_getBaseLoc(importToken),
        callee: undefined,
        arguments: [],
      });
      AST_setNode('callee', {
        type: 'Import',
        loc: AST_getClosedLoc(importToken),
      });
    }

    ASSERT_skipToExpressionStart($PUNC_PAREN_OPEN, lexerFlags); // The arg to dynamic import is mandatory and an arbitrary expr
    // Note: the import call arg sets the +IN flag in the grammar (can't use `in` operator). So that's why we set it too
    let assignable = parseExpression(lexerFlags | LF_IN_FOR_LHS, acornCompat ? 'source' : 'arguments');
    if (curtok.type !== $PUNC_PAREN_CLOSE) {
      if (curtok.type === $PUNC_COMMA) {
        // [x]: `import(a, b)`
        THROW('Dynamic `import` only expected exactly one argument and does not allow for a trailing comma');
      }
      if (curtok.type === $ID_in) {
        THROW('The dynamic import syntax explicitly forbids the `in` operator');
      }
      // [x]: `import(a b)`
      THROW('The dynamic `import` argument was followed by unknown content');
    }
    ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);
    if (acornCompat) {
      AST_close('ImportExpression');
    } else {
      AST_close('CallExpression');
    }

    // - `function f(x = import(yield)) {}`
    // - `function f(x = import(await)) {}`
    // - `function *a() { function f(x = import(yield)) {} }`
    // - `function *a() { function f(x = import(yield x)) {} }`
    // - `async function a() { function f(x = import(await x)) {} }`
    // - `import(() => {})`
    // - `import(() => {} + x)`

    return assignable;
  }

  function parseArrowFromPunc(lexerFlags, paramScoop, asyncToken, allowAssignment, paramsSimple) {
    ASSERT(arguments.length === parseArrowFromPunc.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT_skipToExpressionStart('=>', lexerFlags); // the `{` for a block is subsumed in the expr-start lexer hint
    ASSERT_ASSIGN_EXPR(allowAssignment);

    ASSERT(_path[_path.length - 1] && _path[_path.length - 1].params, 'params should be wrapped in arrow node now');
    ASSERT(asyncToken === UNDEF_ASYNC || allowAsyncFunctions, 'async = es8 and this should be confirmed elsewhere');

    if (allowAssignment === ASSIGN_EXPR_IS_ERROR) {
      // - `delete foo => bar`
      // - `new foo => bar`
      // - `await foo => bar`
      // - `delete async (x) => y`
      // - `delete (foo) => x;`
      // - `delete (foo) => bar`
      // - `++(x) => b`
      // - `new (x) => {}`
      THROW('Was parsing a value that could not be AssignmentExpression but found an arrow');
    }

    if (options_exposeScopes) AST_set('$scope', paramScoop);

    if (paramScoop.dupeParamErrorToken !== NO_DUPE_PARAMS) {
      // Dupe params are never allowed in arrows (only in some cases for functions)
      THROW_TOKEN('Arrow had duplicate params', paramScoop.dupeParamErrorToken);
    }

    let insideForLhs = hasAllFlags(lexerFlags, LF_IN_FOR_LHS);
    let arrowInheritedFlags = lexerFlags & (LF_CAN_NEW_DOT_TARGET | LF_IN_CONSTRUCTOR);

    lexerFlags = resetLexerFlagsForFuncAndArrow(lexerFlags, UNDEF_STAR, asyncToken, IS_ARROW);
    lexerFlags |= arrowInheritedFlags; // Some flags _are_ inherited by arrows (tests will show you the way)

    if (curtok.type === $PUNC_CURLY_OPEN) {
      // This means: "is the body of the arrow not a block?"
      // Skip for Babel: https://github.com/babel/babel/pull/6836
      if (!babelCompat) AST_set('expression', false);

      let arrowScoop = SCOPE_addLayer(paramScoop, SCOPE_LAYER_FUNC_BODY, 'parseArrowFromPunc');
      ASSERT(arrowScoop._funcName = '(arrow has no name)');
      parseFunctionBody(lexerFlags, arrowScoop, EMPTY_LABEL_SET, IS_EXPRESSION, paramsSimple, NO_DUPE_PARAMS, NO_ID_TO_VERIFY, '');
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
      // All checks in this block only serve to provide a nicer error message. Omitting them would still lead to an error.
      if (insideForLhs && curtok.type === $ID_in) {
        THROW('Arrows cannot be lhs to for-in');
      }
      // Arrows cannot have tails. Most expressions will consume them, but not `x++` for example. So do after either path.
      if (curtok.type === $PUNC_DOT) {
        THROW('Block body arrows can not be immediately accessed without a group');
      }
      if (curtok.type === $PUNC_PAREN_OPEN) {
        THROW('Block body arrows can not be immediately invoked without a group');
      }
      if (curtok.type === $PUNC_BRACKET_OPEN) {
        THROW('Block body arrows can not be immediately accessed without a group');
      }
      if (isTemplateStart(curtok.type)) {
        THROW('Block body arrows can not be immediately tagged without a group');
      }
      if ((isCompoundAssignment(curtok.type) || isNonAssignBinOp(curtok.type, lexerFlags)) && (tok_getNlwas() === false || curtok.type === $PUNC_DIV)) {
        // - `()=>{}+a'
        THROW('An arrow function can not be part of an operator to the right');
      }
      if ((curtok.type === $PUNC_PLUS_PLUS || curtok.type === $PUNC_MIN_MIN) && tok_getNlwas() === false) {
        // - `()=>{}++'
        // - `()=>{}--'
        // - `()=>{}\n++x'
        // - `()=>{}\n--x'
        THROW('An arrow function can not have a postfix update operator');
      }
    }

    return NOT_ASSIGNABLE | PIGGY_BACK_WAS_ARROW;
  }
  function parseGroupToplevels(lexerFlags, asyncStmtOrExpr, allowAssignment, asyncToken, asyncTokenCanon, newlineAfterAsync, leftHandSideExpression, astProp) {
    ASSERT(parseGroupToplevels.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(curtok.type === $PUNC_PAREN_OPEN, 'should have thrown if not currently at paren open');
    ASSERT_ASSIGN_EXPR(allowAssignment);
    let parenToken = curtok;

    ASSERT_skipToExpressionStartGrouped($PUNC_PAREN_OPEN, lexerFlags); // Patterns are subsumed by exprs when it comes to skip
    return _parseGroupToplevels(lexerFlags, parenToken, asyncStmtOrExpr, allowAssignment, NOT_DELETE_ARG, asyncToken, asyncTokenCanon, newlineAfterAsync, leftHandSideExpression, astProp);
  }
  function _parseGroupToplevels(lexerFlagsBeforeParen, parenToken, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, isDeleteArg, asyncToken, asyncTokenCanon, newlineAfterAsync, leftHandSideExpression, astProp) {
    ASSERT(_parseGroupToplevels.length === arguments.length, 'arg count');
    ASSERT(newlineAfterAsync === NOT_ASYNC_PREFIXED || newlineAfterAsync === IS_ASYNC_PREFIXED, 'enum');
    ASSERT(typeof astProp === 'string');
    ASSERT(parenToken !== curtok, 'paren should be skipped');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignmentForGroupToBeArrow);
    // = parseGroup(), = parseArrow()
    // will parse `=>` tail if it exists (except in async edge cases)
    // must return IS_ASSIGNABLE or NOT_ASSIGNABLE
    // returns whether the parsed expression is assignable
    // If this was `async` prefixed then the callsite will deal with the tail, arrow or not. This is because
    // it needs to take care of the `async \n (x) => z` case and clean up the AST properly.

    let firstTokenAfterParen = curtok;

    // notable remarks;
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

    if (curtok.type === $PUNC_PAREN_CLOSE) {
      // special case; the `()` here must be the arrow header or (possibly) an `async()` function call

      if (asyncToken !== UNDEF_ASYNC) {
        ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags); // can be `async() / x`     TODO: next must be `=>` or non-binop expr tail or asi continuation
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

        return parseAfterAsyncGroup(
          lexerFlagsBeforeParen,
          paramScoop,
          asyncStmtOrExpr,
          allowAssignmentForGroupToBeArrow,
          PARAMS_ALL_SIMPLE,
          false,
          newlineAfterAsync,
          MIGHT_DESTRUCT,
          true,
          asyncToken,
          asyncTokenCanon,
          ASSIGNABLE_UNDETERMINED,
          astProp
        );
      }

      ASSERT_skipToArrowOrDie($PUNC_PAREN_CLOSE, lexerFlags);

      if (leftHandSideExpression === ONLY_LHSE) THROW_TOKEN('Arrow not allowed in this position', asyncToken === UNDEF_ASYNC ? parenToken : asyncToken);

      lexerFlags = lexerFlagsBeforeParen; // reset no_asi state to before the group

      if (tok_getNlwas() === true) {
        // arrows with newlines are always an error
        // - `() \n => x`
        THROW('The arrow token `=>` is a restricted production and cannot have a newline preceding it');
      }

      // - `() => x`
      // - `( () => x )`
      // - `return () => x`

      if (babelCompat) {
        AST_open(astProp, {
          type: 'ArrowFunctionExpression',
          loc: AST_getBaseLoc(parenToken),
          params: [],
          id: null,
          generator: false,
          async: asyncToken !== UNDEF_ASYNC,
          body: undefined,
        });
      } else {
        AST_open(astProp, {
          type: 'ArrowFunctionExpression',
          loc: AST_getBaseLoc(parenToken),
          params: [],
          id: null,
          generator: false,
          async: asyncToken !== UNDEF_ASYNC,
          expression: undefined, // TODO: init to bool
          body: undefined,
        });
      }
      let assignable = parseArrowFromPunc(lexerFlags, paramScoop, UNDEF_ASYNC, allowAssignmentForGroupToBeArrow, PARAMS_ALL_SIMPLE);
      AST_close('ArrowFunctionExpression');

      if (isDeleteArg === IS_DELETE_ARG) return NOT_SINGLE_IDENT_WRAP_NA | PIGGY_BACK_WAS_ARROW;
      return assignable;
    }

    let foundSingleIdentWrap = false; // did we find `(foo)` ?
    let rootAstProp = astProp; // astprop changes after the first comma when the group becomes a SequenceExpression
    let destructible = MIGHT_DESTRUCT; // this function checks so many things :(
    let assignable = ASSIGNABLE_UNDETERMINED; // true iif first expr is assignable, always false if the group has a comma
    let toplevelComma = false;
    let wasSimple = PARAMS_ALL_SIMPLE; // true if only idents and without assignment (so es5 valid)
    let mustBeArrow = false; // special case; a `...` must mean arrow, and a trailing comma must mean arrow as well

    while (curtok.type !== $PUNC_PAREN_CLOSE) { // top-level group loop, list of ident, array, object, rest, and other expressions
      if (isIdentToken(curtok.type)) {
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
        const identToken = curtok;
        const identTokenCanon = tok_getCanon();
        skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // because `(x/y)` and `(typeof /x/)` need different next token states

        let wasAssignment = curtok.type === $PUNC_EQ;
        let wasCommaOrEnd = curtok.type === $PUNC_COMMA || curtok.type === $PUNC_PAREN_CLOSE;

        ASSERT(toplevelComma || curtok.type !== $PUNC_PAREN_CLOSE || assignable === ASSIGNABLE_UNDETERMINED, 'for group with one simple element, delete edge case');

        let exprAssignable = parseExpressionAfterIdent(lexerFlags, identToken, identTokenCanon, BINDING_TYPE_ARG, astProp);
        assignable = mergeAssignable(exprAssignable, assignable);
        SCOPE_addLexBinding(paramScoop, identToken.str, BINDING_TYPE_ARG, FDS_ILLEGAL);

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

          if (!toplevelComma && curtok.type === $PUNC_PAREN_CLOSE) {
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
            wasSimple = PARAMS_SOME_COMPLEX; // if we can't assign to it then the name is a keyword of sorts
          } else if (
            // https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
            isStrictOnlyKeyword(identToken, identTokenCanon)
          ) {
            // Mark the args as non-simple such that if the body contains a "use strict" directive, it will still throw
            // If already in strict mode then make an arrow illegal immediately.
            wasSimple = PARAMS_SOME_COMPLEX;
            if (hasAllFlags(lexerFlags, LF_STRICT_MODE) ) {
              // [x]: `"use strict"; (eval) => { }`
              // [x]: `"use strict"; (arguments) => { }`
              destructible |= CANT_DESTRUCT;
            } else {
              // [x]: `(eval) => { }`
              // [x]: `(arguments) => { }`
              // [x]: `(eval) => { "use strict"; }`
              // [x]: `(arguments) => { "use strict"; }`
              wasSimple = PARAMS_SOME_COMPLEX; // Throw if use strict directve is found
            }
          } else {
            // The arg was not special under strict mode
            // [x]: `f = (foo) => { "use strict"; }`
            // [x]: `f = (async) => { "use strict"; }`
          }
        }
        else {
          // the token following this ident is not one valid in a destructuring assignment (unlike array/object)
          // parse a regular ident expression here
          // - `(typeof x)`
          destructible |= CANT_DESTRUCT;
          wasSimple = PARAMS_SOME_COMPLEX;
        }
      }
      else if (curtok.type === $PUNC_CURLY_OPEN) {
        // note: grouped object/array literals are _never_ assignable
        // - ({})
        // - ({..})
        // - ({..} = x)
        // - ({..}, x)
        // - ({..}.foo)
        // - ({..}.foo = x)
        // - ({..} + foo)
        let startOfPattern = curtok;
        destructible |= parseObjectOuter(lexerFlags, paramScoop, BINDING_TYPE_ARG, PARSE_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        // - `({web: true,  __proto__: x, __proto__: y});`
        if (curtok.type !== $PUNC_COMMA && curtok.type !== $PUNC_PAREN_CLOSE) {
          // Note: this is NOT destructible because we're in a group toplevel so an assignment would just be an
          // assignment, not a destructuring. And any tail would not lead to any kind of pattern. And destructuring
          // can not happen to groups, so `({x=y})=z` is not valid because of the parens. So cant destructure this.
          // Fixes `async ({} + 1) => x;`
          destructible |= CANT_DESTRUCT;
        }
        assignable = parseAfterPatternInGroup(lexerFlags, startOfPattern, assignable, destructible, astProp);
        wasSimple = PARAMS_SOME_COMPLEX;
      }
      else if (curtok.type === $PUNC_BRACKET_OPEN) {
        // note: grouped object/array literals are _never_ assignable
        // - ([])
        // - ([..])
        // - ([..] = x)
        // - ([..], x)
        // - ([..].foo)
        // - ([..].foo = x)
        // - ([..] + foo)
        let startOfPattern = curtok;
        destructible |= parseArrayOuter(lexerFlags, paramScoop, BINDING_TYPE_ARG, PARSE_INIT, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        // - `([{web: true,  __proto__: x, __proto__: y}]);`
        if (curtok.type !== $PUNC_COMMA && curtok.type !== $PUNC_PAREN_CLOSE) {
          // Note: this is NOT destructible because we're in a group toplevel so an assignment would just be an
          // assignment, not a destructuring. And any tail would not lead to any kind of pattern. And destructuring
          // can not happen to groups, so `({x=y})=z` is not valid because of the parens. So cant destructure this.
          // Fixes `async ({} + 1) => x;`
          destructible |= CANT_DESTRUCT;
        }
        assignable = parseAfterPatternInGroup(lexerFlags, startOfPattern, assignable, destructible, astProp);
        wasSimple = PARAMS_SOME_COMPLEX;
      }
      else if (curtok.type === $PUNC_DOT_DOT_DOT) {
        // top level group dots kinda have to be rest but there is an `async` edge case where it could be spread
        wasSimple = PARAMS_SOME_COMPLEX;
        destructible |= parseArrowableTopRest(lexerFlags, paramScoop, asyncToken, astProp);
        if (asyncToken !== UNDEF_ASYNC) {
          // - `async(...x);`
          // - `async(...x,)`
          // - `async(...x,b)`
          // - `async(...x) => x`
          if (curtok.type !== $PUNC_PAREN_CLOSE) {
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
        if (curtok.type === $PUNC_COMMA) {
          if (!toplevelComma) {
            toplevelComma = true;
            AST_wrapClosedIntoArrayCustom(rootAstProp, {
              type: 'SequenceExpression',
              loc: AST_getBaseLoc(firstTokenAfterParen),
              expressions: undefined,
            }, 'expressions', firstTokenAfterParen);
            astProp = 'expressions';
          }
          assignable = __parseExpressions(lexerFlags, assignable, astProp);
        }
        if (toplevelComma) {
          if (babelCompat) AST_set('extra', {parenthesized: true, parenStart: parenToken.start});
          AST_close('SequenceExpression');
          assignable = setNotAssignable(assignable);
        }
        if (curtok.type !== $PUNC_PAREN_CLOSE) THROW('Expected the closing paren `)` for the group, found `' + tokenStrForError(curtok) + '` instead');
        ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);

        if (asyncToken !== UNDEF_ASYNC) {
          // the next token can not start something that appears in an arrow head so must be an async call
          // - `async("foo".bar);`
          //                    ^
          // - `async("foo".bar) => x`
          //                     ^
          // TODO: move this out because worst case you'll still have to do this down below so we shouldnt add repetitive complexity for this edge case
          return parseAfterAsyncGroup(lexerFlagsBeforeParen, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, wasSimple, toplevelComma, newlineAfterAsync, CANT_DESTRUCT, false, asyncToken, asyncTokenCanon, assignable, rootAstProp);
        }

        if (babelCompat && !toplevelComma) {
          AST_babelParenthesizesClosed(parenToken, astProp);
        }

        if (isDeleteArg === IS_DELETE_ARG) {
          // We need to propagate the await/yield state as well so prepare that first
          // - `delete ("x"[(yield)])`
          // - `delete ("x"[(await)])`
          // - `async x => delete ("x"[(await x)])`
          // - `function *f(){ delete ("x"[(yield)]) }`
          return copyPiggies(isAssignable(sansFlag(assignable, PIGGY_BACK_WAS_ARROW)) ? NOT_SINGLE_IDENT_WRAP_A : NOT_SINGLE_IDENT_WRAP_NA, assignable);
        }
        // - `((a)) = b;`
        return sansFlag(assignable, PIGGY_BACK_WAS_ARROW);
      }

      if (curtok.type !== $PUNC_COMMA) break;

      // Note: since this can also be an arrow header, the next token may be a `)` as well as expr start
      ASSERT_skipToExpressionStartGrouped(',', lexerFlags);

      if (curtok.type === $PUNC_PAREN_CLOSE) {
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

        if (asyncToken === UNDEF_ASYNC) {
          if (allowTrailingFunctionComma) {
            // [v]: `(a,) => a`
            // This may only be valid in ES8+ and as an arrow. Any other case fails here.
            mustBeArrow = true;
            // trailing function commas do not affect the AST (so don't wrap in sequence)
            break;
          } else {
            // [x]: `(a,);`
            // [x]: `(a,) = x;`
            THROW('Encountered trailing comma in the toplevel of a group, this could be valid in arrows but not with the currently targeted language version');
          }
        } else {
          // [v]: `async(x,)`
          // [v]: `async(x,) => x`
        }
      }
      if (!toplevelComma) {
        toplevelComma = true;
        // only do this once
        AST_wrapClosedIntoArrayCustom(rootAstProp, {
          type: 'SequenceExpression',
          loc: AST_getBaseLoc(firstTokenAfterParen),
          expressions: undefined,
        }, 'expressions', firstTokenAfterParen);
        astProp = 'expressions';
      }
    }

    if (toplevelComma) {
      assignable = setNotAssignable(assignable);
      if (babelCompat) AST_set('extra', {parenthesized: true, parenStart: parenToken.start});
      AST_close('SequenceExpression');
    }

    // pick up the flags from assignable and put them in destructible
    // - `function *f() { (yield x ** y) }`
    // - `async(await);`
    // - `async function f(){ async(await x); }`
    // - `{ (x = yield) = {}; }`

    destructible = copyPiggies(destructible, assignable);

    if (curtok.type !== $PUNC_PAREN_CLOSE) {
      // (I think this check is redundant ...)
      THROW('Missing closing paren `)` for group, found `' + tokenStrForError(curtok) + '` instead');
    }
    ASSERT_skipDiv($PUNC_PAREN_CLOSE, lexerFlags);

    lexerFlags = lexerFlagsBeforeParen; // ASI can happen again
    verifyDestructible(destructible);

    let isArrow = curtok.type === $PUNC_EQ_GT;

    // First deal with arrow-error cases. But don't parse as async just yet (this is to dedupe the error checks)
    if (isArrow) {
      // These are some errors for async and plain arrows

      destructible |= PIGGY_BACK_WAS_ARROW; // Probably redundant...?

      if (leftHandSideExpression === ONLY_LHSE) THROW_TOKEN('Arrow not allowed in this position', asyncToken === UNDEF_ASYNC ? parenToken : asyncToken);

      if (tok_getNlwas() === true) {
        // we can safely throw here because there's no way that the `=>` token is valid without an arrow header
        THROW('Arrow is restricted production; cannot have newline before the arrow token');
      }
      if (hasAllFlags(destructible, CANT_DESTRUCT)) {
        // - `([...{a = b} = c]) => d;`
        if (asyncToken !== UNDEF_ASYNC) THROW('The left hand side of the async arrow is not destructible so arrow is illegal');
        else THROW('The left hand side of the arrow is not destructible so arrow is illegal');
      }
      if (hasAllFlags(destructible, DESTRUCT_ASSIGN_ONLY)) {
        // - `([[].length]) => x;`
        THROW('The left hand side of the arrow can only be destructed through assignment so arrow is illegal');
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

        if (asyncToken !== UNDEF_ASYNC) {
          return THROW('The parameter header of an async arrow cannot contain `await` as varname nor as a keyword');
        }
        if (hasAnyFlag(lexerFlags, LF_IN_ASYNC)) {
          return THROW('The parameter header of an arrow inside an async function cannot contain `await` as varname nor as a keyword');
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

        THROW('The arguments of an arrow cannot contain a yield expression in their defaults');
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
      THROW('Group contained a value that must destruct but this was not an arrow so it is invalid');
    }

    if (asyncToken !== UNDEF_ASYNC) {
      // `async(a);`
      // `async(a = await x);`
      // `async(a) => x`
      // `async(a = await x) => x`
      destructible = copyPiggies(destructible, assignable);
      return parseAfterAsyncGroup(lexerFlags, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, wasSimple, toplevelComma, newlineAfterAsync, destructible, false, asyncToken, asyncTokenCanon, assignable, rootAstProp);
    }

    if (isArrow) {
      // arrow function
      // `(a) => {}`

      ASSERT(asyncToken === UNDEF_ASYNC, 'checked above');
      parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, UNDEF_ASYNC, parenToken, allowAssignmentForGroupToBeArrow, rootAstProp);
      // we just parsed an arrow. Whatever the state of await/yield was we can ignore that here.
      if (isDeleteArg === IS_DELETE_ARG) return NOT_SINGLE_IDENT_WRAP_NA;
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
      AST_babelParenthesizesClosed(parenToken, astProp);
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

    if (isDeleteArg === IS_DELETE_ARG) {
      // TODO: this is a non-bool value making the func poly :'( this case will never hit for the real
      //       world where perf matters, though. So it's mostly compiler inference that crap out

      // We need to propagate the await/yield state as well so prepare that first
      // - `async function a(){     async ([y] = delete ((foo[await x]))) => {};     }`
      // - `delete (((((foo(await)))))).bar`
      // - `delete (((((foo(yield)))))).bar`
      // - `function *f(){ delete (((((foo(yield)))))).bar }`
      let extraFlags = copyPiggies(0, assignable);

      if (foundSingleIdentWrap) {
        ASSERT(!toplevelComma, 'sanity check; the main loop should break after this state was found');
        if (isAssignable(assignable)) return IS_SINGLE_IDENT_WRAP_A | extraFlags;
        return IS_SINGLE_IDENT_WRAP_NA | extraFlags;
      }
      else {
        if (isAssignable(assignable)) return NOT_SINGLE_IDENT_WRAP_A | extraFlags;
        return NOT_SINGLE_IDENT_WRAP_NA | extraFlags;
      }
    }
    // a group. those still exist?
    // - `((a)) = b;`

    return sansFlag(assignable, PIGGY_BACK_WAS_ARROW);
  }
  function parseAfterPatternInGroup(lexerFlags, startOfPattern, assignable, destructible, astProp) {
    ASSERT(curtok.type !== $PUNC_EQ, 'destruct assignments should be parsed at this point');
    if (curtok.type !== $PUNC_COMMA && curtok.type !== $PUNC_PAREN_CLOSE) {
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
        THROW('Pattern can not have a tail but did not find a comma or closing paren of the arrow header');
      }

      // - ({}.x)
      //      ^
      // - ([].x)
      //      ^
      let exprAssignable = parseValueTail(lexerFlags, startOfPattern, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, astProp);
      assignable = mergeAssignable(exprAssignable, assignable);

      // If still not end of element of the group then parse a binary expression of some sort
      if (curtok.type !== $PUNC_COMMA && curtok.type !== $PUNC_PAREN_CLOSE) {
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
        assignable = parseExpressionFromOp(lexerFlags, startOfPattern, assignable, astProp);
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
  function parseAfterAsyncGroup(lexerFlags, paramScoop, fromStmtOrExpr, allowAssignment, wasSimple, toplevelComma, newlineAfterAsync, groupDestructible, zeroArgs, asyncToken, asyncTokenCanon, assignable, astProp) {
    ASSERT(parseAfterAsyncGroup.length === arguments.length, 'arg count');
    ASSERT(typeof groupDestructible === 'number', 'destructible num');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    // this is called after parsing a group that followed an `async` when it might be an async arrow
    if (curtok.type === $PUNC_EQ_GT) {
      if (tok_getNlwas() === true) {
        THROW('The arrow is a restricted production an there can not be a newline before `=>` token');
      }
      else if (newlineAfterAsync === IS_ASYNC_PREFIXED) {
        // - `async \n () => x`
        //                ^
        // - `async \n (x) => x`
        //                 ^
        if (allowAsyncFunctions) {
          // see parseAsync for details on this error
          THROW('A newline after async is always a syntax error if the rhs turns to be an arrow function');
        } else {
          // In <=ES7 the parser would force to parse a call, not knowing that a newline after `async` might trigger
          // ASI. As such this case is still an error but for different reasons; It's parsed as `async(); => x`.
          THROW('Encountered unexpected arrow; <=ES7 the `async \\n (x) => x` case was always parsed as `async(x); => x`');
        }
      }
      else if (hasAnyFlag(groupDestructible, CANT_DESTRUCT | DESTRUCT_ASSIGN_ONLY)) {
        // - `async (...x, y) => x`            (rest must be last element and spread cannot be in arrow head)
        //                    ^
        // - `async ({x=z}, y) => x;`          (shorthand default only valid as assign, never valid here)
        //                     ^
        if (curtok.type === $PUNC_EQ_GT) {
          // - `async (a, ...b=fail) => a;`
          THROW('The group was not destructible and yet the next token is an arrow');
        }
        ASSERT(false, 'unreachable..?');
        THROW('Unknown error. Did not think input could reach this place :(');
      }
      else if (zeroArgs) {
        // - `async () => foo`
        //             ^
        parseArrowAfterAsyncNoArgGroup(lexerFlags, paramScoop, toplevelComma, asyncToken, allowAssignment, astProp);
      }
      else if (hasAnyFlag(assignable | groupDestructible, PIGGY_BACK_SAW_AWAIT)) {
        // - `async (foo = await x) => foo`            (fail)
        //                          ^
        // - `async await => foo`                      (fail)
        //                ^
        // have to check both assignable and destructible for the state flags

        if (hasAnyFlag(assignable | groupDestructible, PIGGY_BACK_SAW_AWAIT)) {
          THROW('Async arrow arg defaults can not contain `await` expressions');
        }
        TODO // not sure anything reaches here
        THROW('Async arrows can not have arg bindings named `await` because it is considered a keyword');
      }
      else {
        // If this had a yield violation then the call sites should have taken care of it already
        ASSERT(!(hasAnyFlag(lexerFlags, LF_IN_GENERATOR | LF_STRICT_MODE) && hasAnyFlag(assignable | groupDestructible, PIGGY_BACK_SAW_YIELD)), 'Call sites should have thrown for yield in arrow args in invalid context');
        ASSERT(!hasAnyFlag(assignable | groupDestructible, PIGGY_BACK_SAW_YIELD), 'caller should have dealt with `yield` in arrow args');
        // - `async (foo) => foo`
        //                ^
        parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, asyncToken, asyncToken, allowAssignment, astProp);
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
          loc: AST_getClosedLoc(asyncToken),
          callee: AST_getIdentNode(asyncToken, asyncTokenCanon),
          arguments: [],
        });
      }
      else {
        // - `async (a, b, c);`
        //                   ^
        // - `async \n (a, b, c);`
        //                      ^

        AST_patchAsyncCall(asyncToken, asyncTokenCanon, astProp);
      }

      let assignable = parseValueTail(lexerFlags, asyncToken, NOT_ASSIGNABLE, NOT_NEW_ARG, NOT_LHSE, astProp);
      if (fromStmtOrExpr === IS_STATEMENT) {
        // in expressions operator precedence is handled elsewhere. in statements this is the start,
        assignable = parseExpressionFromOp(lexerFlags, asyncToken, assignable, astProp);
        if (curtok.type === $PUNC_COMMA) {
          assignable = _parseExpressions(lexerFlags, asyncToken, assignable, astProp);
        }
        parseSemiOrAsi(lexerFlags);
      }

      return assignable;
    }

    // we just parsed an arrow, nothing else.

    if (fromStmtOrExpr === IS_STATEMENT) {
      // if this is an async arrow at the statement start then we should allow to parse a sequence here
      if (curtok.type === $PUNC_COMMA) {
        // Note: since we're parsing expressions inside on the statement level we don't care about the assignable flags
        _parseExpressions(lexerFlags, asyncToken, initNotAssignable(), astProp);
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
  function parseArrowAfterAsyncNoArgGroup(lexerFlags, paramScoop, toplevelComma, asyncToken, allowAssignment, astProp) {
    ASSERT(parseArrowAfterAsyncNoArgGroup.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');

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
        loc: AST_getBaseLoc(asyncToken),
        params: [],
        id: null,
        generator: false,
        async: asyncToken !== UNDEF_ASYNC,
        body: undefined,
      });
    } else {
      AST_open(astProp, {
        type: 'ArrowFunctionExpression',
        loc: AST_getBaseLoc(asyncToken),
        params: [],
        id: null,
        generator: false,
        async: asyncToken !== UNDEF_ASYNC,
        expression: undefined, // TODO: init to bool
        body: undefined,
      });
    }

    let assignable = parseArrowFromPunc(lexerFlags, paramScoop, asyncToken, allowAssignment, PARAMS_ALL_SIMPLE);
    AST_close('ArrowFunctionExpression');
    return assignable;
  }

  function parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, asyncToken, arrowStartToken, allowAssignment, astProp) {
    ASSERT(parseArrowAfterGroup.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT_ASSIGN_EXPR(allowAssignment);

    AST_destructArrowParams(toplevelComma, asyncToken, arrowStartToken, astProp);

    parseArrowFromPunc(lexerFlags, paramScoop, asyncToken, allowAssignment, wasSimple);

    AST_close('ArrowFunctionExpression');
  }
  function parseArrowableTopRest(lexerFlags, scoop, asyncToken, astProp) {
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

    let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_PAREN_CLOSE, BINDING_TYPE_ARG, asyncToken, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
    if (asyncToken === UNDEF_ASYNC) {
      if (hasAllFlags(subDestruct, CANT_DESTRUCT) || curtok.type === $PUNC_COMMA) {
        THROW('The ... argument must be destructible in an arrow header, found something that was not destructible');
      }
      if (curtok.type === $PUNC_EQ) THROW('Cannot set a default on a rest value');
      if (curtok.type === $PUNC_COMMA) THROW('Rest arg cannot have a trailing comma');
      if (curtok.type !== $PUNC_PAREN_CLOSE) THROW('Rest arg must be last but did not find closing paren');
    }
    // have to return it to invalidate stuff like `(...x=y)=>x`
    return subDestruct;
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
    ASSERT(curtok.type === $PUNC_BRACKET_OPEN, 'not yet consumed');
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

    let arrayOpenToken = curtok;
    ASSERT_skipToExpressionStartSquareCloseComma($PUNC_BRACKET_OPEN, lexerFlags);
    AST_open(_astProp, {
      type: 'ArrayExpression',
      loc: AST_getBaseLoc(arrayOpenToken),
      elements: [],
    });

    let astProp = 'elements';

    let destructible = MIGHT_DESTRUCT;

    // skip leading commas
    while (curtok.type === $PUNC_COMMA) {
      ASSERT_skipToExpressionStartSquareCloseComma(',', lexerFlags);
      AST_add(astProp, null);
    }

    let spreadStage = NO_SPREAD;
    let assignableYieldAwaitState = ASSIGNABLE_UNDETERMINED; // this is ONLY used to track await/yield state flags so we can propagate them back up

    while (curtok.type !== $PUNC_BRACKET_CLOSE) {
      let elementStartToken = curtok;
      if (isIdentToken(curtok.type)) {
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
        const identToken = curtok;
        const identTokenCanon = tok_getCanon();
        skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // will properly deal with div/rex cases

        let nextIsAssignment = curtok.type === $PUNC_EQ;
        let nextIsCommaOrEnd = curtok.type === $PUNC_COMMA || curtok.type === $PUNC_BRACKET_CLOSE;

        // ASSIGN_EXPR_IS_OK because this might just be an array element, where something like an arrow is legit
        // [v]: `[async ()=>x]`      // requires ASSIGN_EXPR_IS_OK
        let leftAssignable = parseValueHeadBodyAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, NOT_NEW_ARG, ASSIGN_EXPR_IS_OK, NOT_LHSE, astProp);
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
            THROW('Cannot assign or destruct to keyword `' + tokenStrForError(identToken) + '`');
          }

          // [v]: `let [x = a, y = b] = o`
          // [x]: `let [x = y, x = z] = a`
          // [x]: `for (const [x = 1, x = 2] in {}) {}`

          // If this isn't a binding, this is a noop
          // If this is inside a group, this is a noop if it turns out not to be an arrow
          // TODO: add test case for catch shadow
          SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, identToken.str);
          // If this is not an export declaration, the calls below will be noops
          addNameToExports(exportedNames, identToken.str);
          addBindingToExports(exportedBindings, identToken.str);

          // We should have just added an Identifier to the AST, so wrap that as left now
          AST_wrapClosedCustom(astProp, {
            type: 'AssignmentExpression',
            loc: AST_getBaseLoc(identToken),
            left: undefined,
            operator: '=',
            right: undefined,
          }, 'left');
          ASSERT_skipToExpressionStart('=', lexerFlags);
          // The rhs of the assignment is irrelevant beyond yield/await flags
          let rightAssignable = parseExpression(lexerFlags, 'right');
          AST_close('AssignmentExpression');

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

            // If this isn't a binding, this is a noop
            // If this is inside a group, this is a noop if it turns out not to be an arrow
            // TODO: add test case for catch shadow
            SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, identToken.str);
            // If this is not an export declaration, the calls below will be noops
            addNameToExports(exportedNames, identToken.str);
            addBindingToExports(exportedBindings, identToken.str);
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
          let nowDestruct = parseOptionalDestructibleRestOfExpression(lexerFlags, identToken, bindingType, leftAssignable, CANT_DESTRUCT, $PUNC_BRACKET_CLOSE, astProp);
          // We can ignore assignability here because the await/yield flags from the last call will be inside the destruct
          destructible |= nowDestruct;
        }
      }
      else if (curtok.type === $PUNC_CURLY_OPEN) {
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
        let objOpenToken = curtok;
        let objDestructible = parseObjectLiteralPatternAndAssign(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, astProp);
        destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, objOpenToken, bindingType, hasAllFlags(objDestructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE, objDestructible, $PUNC_BRACKET_CLOSE, astProp);
      }
      else if (curtok.type === $PUNC_BRACKET_OPEN) {
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
        let arrOpenToken = curtok;
        let arrDestructible = parseArrayLiteralPattern(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, astProp);
        destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, arrOpenToken, bindingType, hasAllFlags(arrDestructible, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE, arrDestructible, $PUNC_BRACKET_CLOSE, astProp);
      }
      else if (curtok.type === $PUNC_DOT_DOT_DOT) {
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

        let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_BRACKET_CLOSE, bindingType, UNDEF_ASYNC, exportedNames, exportedBindings, astProp);
        destructible |= subDestruct;
        if (curtok.type !== $PUNC_COMMA && curtok.type !== $PUNC_BRACKET_CLOSE) {
          THROW('Encountered unexpected token after parsing spread/rest argument ');
        }

        ASSERT(curtok.type !== $PUNC_COMMA || hasAllFlags(subDestruct, CANT_DESTRUCT), 'if comma then cannot destruct, should be dealt with in spread-parsing function');
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
        let exprStartToken = curtok;
        let wasParen = curtok.type === $PUNC_PAREN_OPEN;
        let assignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);

        if (curtok.type === $PUNC_EQ) {
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
              loc: AST_getBaseLoc(elementStartToken),
              left: undefined,
              operator: '=',
              right: undefined,
            }, 'left');
            ASSERT_skipToExpressionStart('=', lexerFlags);
            // pick up the flags from assignable and put them in destructible
            // - `= await bar`
            // - `= yield`
            destructible |= parseExpression(lexerFlags, 'right'); // save the piggies!
            AST_close('AssignmentExpression');
          } else {
            // - `[2=x]`
            //      ^
            THROW('Cannot assign to lhs (starting with `'+elementStartToken.str+'`)');
          }
        }

        // This will stop after the tail of the expression. If there was an operator, it will now be
        // the current token. And in that case the expression is NOT destructible in any way. Otherwise it could
        // be an destructuring assignment if it was assignable in the first place.
        if (curtok.type !== $PUNC_COMMA && curtok.type !== $PUNC_BRACKET_CLOSE) {
          assignable = parseExpressionFromOp(lexerFlags, exprStartToken, assignable, astProp);
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

      if (curtok.type !== $PUNC_COMMA) break; // end of the array
      // skip one because a trailing comma does not add a `null` to the ast

      ASSERT_skipToExpressionStartSquareCloseComma(',', lexerFlags);
      while (curtok.type === $PUNC_COMMA) {
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

    if (curtok.type !== $PUNC_BRACKET_CLOSE) {
      // (I think this check is redundant)
      THROW('Expected the closing bracket `]` for the array, found `' + tokenStrForError(curtok) + '` instead');
    }
    ASSERT_skipDiv($PUNC_BRACKET_CLOSE, lexerFlags); // a forward slash after ] has to be a division
    AST_close('ArrayExpression');
    if (skipInit === PARSE_INIT) {
      destructible = parsePatternAssign(lexerFlags, arrayOpenToken, destructible, _astProp);
    }

    // pick up the flags from assignable and put them in destructible
    // - `([x] = await bar) => {}`
    // - `async function a(){     ([v] = await bar) => {}     }`
    // - `function *g(){ (x = [yield]) }`
    // - `{ (x = [yield]) }`
    return copyPiggies(destructible, assignableYieldAwaitState);
  }

  function parseObjectOuter(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectOuter.length === arguments.length, 'arg count');
    ASSERT_BINDING_TYPE(bindingType);

    // This function makes it easier to search for places that parse an object literal/pattern, without recursive bits

    let destructible = parseObjectLiteralPatternAndAssign(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp);
    return destructible;
  }
  function parseObjectLiteralPatternAndAssign(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
    // returns whether this object is destructible
    ASSERT(parseObjectLiteralPatternAndAssign.length === arguments.length, 'expecting all args');
    ASSERT(skipInit === SKIP_INIT || skipInit === PARSE_INIT, 'skipInit is enum', skipInit);
    ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'not yet consumed');

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

    let curlyToken = curtok;
    AST_open(astProp, {
      type: 'ObjectExpression',
      loc: AST_getBaseLoc(curlyToken),
      properties: [],
    });
    let destructible = parseObjectLikePatternSansAssign(lexerFlags | LF_NO_ASI, scoop, bindingType, IS_EXPRESSION, exportedNames, exportedBindings, 'properties');
    AST_close('ObjectExpression');
    // this is immediately after the top-level object literal closed that we started parsing
    if (skipInit === PARSE_INIT) {
      destructible = parsePatternAssign(lexerFlags, curlyToken, destructible, astProp);
    }

    return destructible;
  }
  function parseObjectLikePatternSansAssign(outerLexerFlags, scoop, bindingType, isExpression, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectLikePatternSansAssign.length === arguments.length, 'arg count');
    ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'should have asserted to be at the curly open of an objlit or pattern here...', curtok);
    // parse the body of something that looks like an object literal (obj lit, class body)

    let lexerFlags = sansFlag(outerLexerFlags, LF_IN_FOR_LHS | LF_IN_TEMPLATE);

    ASSERT_skipAny($PUNC_CURLY_OPEN, lexerFlags);

    let destructible = MIGHT_DESTRUCT; // innocent until proven guilty? may or may not destruct

    // > 12.2.6.1: In ECMAScript 2015, it is no longer an early error to have duplicate property names in Object
    // Initializers. So we don't have to track all properties of object literals to check for dupes, however, we still
    // need to confirm this for annex B web-compat __proto__.

    let hasThunderProto = false;
    while (curtok.type !== $PUNC_CURLY_CLOSE) {
      if (curtok.type === $PUNC_COMMA) {
        // - `{,}`
        //     ^
        THROW('Objects cant have comma without something preceding it');
      }

      let currentDestruct = parseObjectLikePart(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp);
      if (options_webCompat === WEB_COMPAT_ON) {
        if (hasAnyFlag(currentDestruct, PIGGY_BACK_WAS_PROTO)) {
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
      }
      destructible |= currentDestruct;

      if (curtok.type !== $PUNC_COMMA) break;
      ASSERT_skipAny(',', lexerFlags);
    }

    // restore in/template flags (`x${+{}}` would fail if you didn't do this before parsing the closing curly)
    lexerFlags = outerLexerFlags;

    if (isExpression === IS_EXPRESSION) {
      if (curtok.type !== $PUNC_CURLY_CLOSE) {
        THROW('Expected the closing curly `}` for an object, found `' + tokenStrForError(curtok) + '` instead');
      }
      ASSERT_skipDiv($PUNC_CURLY_CLOSE, lexerFlags); // ({...} / foo)
    } else {
      if (curtok.type === $EOF) THROW('Unexpected EOF while parsing an object literal or pattern');
      ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, lexerFlags);
    }

    return sansFlag(destructible, PIGGY_BACK_WAS_PROTO);
  }
  function parseObjectLikePart(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    // parseProperty parseMethod
    // This function is recursively called for static members
    ASSERT(parseObjectLikePart.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');

    let startOfKeyToken = curtok;

    let destructible = bindingType === BINDING_TYPE_ARG || bindingType === BINDING_TYPE_NONE ? MIGHT_DESTRUCT : MUST_DESTRUCT;
    let assignableForPiggies = ASSIGNABLE_UNDETERMINED; // propagate the await/yield state flags, if any (because `(x={a:await f})=>x` should be an error)

    // An objlit property has quite a few (though limited) valid goals

    // Note that "key" is one of ident, string, number, or computed property;
    // - `{key: x}`
    // - `{ident: x}`
    // - `{"foo": x}`
    // - `{300: x}`
    // - `{[expr]: x}`

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

    if (isIdentToken(curtok.type)) {
      // (This branch is the only case that can lead to objlit prop shorthand iif the next char is `}` or `,` or `=`)
      // All forms can have trailing comma but it will lead to an error in a rest pattern

      // - `{key:expr}`
      //     ^
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

      destructible = parseObjectLikePartFromIdent(lexerFlags, startOfKeyToken, scoop, bindingType, exportedNames, exportedBindings, astProp);
    }
    else if (isNumberStringToken(curtok.type)) {
      // Property names can also be strings and numbers but these cannot be shorthanded
      // Number/string keys can still destructure just fine (`({"foo": x} = y)`)
      // - `{"foo": bar}`
      //     ^
      // - `{"foo"(){}}`
      // - `({"foo": bar}) => x`
      // - `{15: bar}`
      // - `{15(){}}`
      //     ^
      // - `({15: bar}) => x`
      let litToken = curtok;
      let litTokenCanon = tok_getCanon();
      ASSERT_skipToColonParenOpen(litToken.str, lexerFlags);

      if (curtok.type === $PUNC_COLON) {
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

        // https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
        // `{"__proto__": 1, __proto__: 2}` is still an error, only for key:value (not shorthand or methods)
        if (options_webCompat === WEB_COMPAT_ON) {
          if (litToken.str === '__proto__') destructible |= PIGGY_BACK_WAS_PROTO;
        }

        destructible |= parseObjectPropertyValueAfterColon(lexerFlags, startOfKeyToken, litToken, litTokenCanon, bindingType, assignableForPiggies, destructible, scoop, exportedNames, exportedBindings, astProp);
        ASSERT(curtok.type !== $PUNC_EQ, 'assignments should be parsed as part of the rhs expression');
      }
      else if (curtok.type === $PUNC_PAREN_OPEN) {
        // Method shorthand
        // - `{5(){}}`
        // - `{'foo'(){}}`
        AST_setLiteral(astProp, litToken, litTokenCanon);

        let destructPiggies = parseObjectLikeMethodAfterKey(lexerFlags, UNDEF_ASYNC, UNDEF_STAR, UNDEF_GET, UNDEF_SET, litToken, undefined, astProp);
        ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
        ASSERT(destructPiggies === CANT_DESTRUCT, 'no piggies');
        destructible |= CANT_DESTRUCT;
      }
      else {
        THROW('Object literal keys that are strings or numbers must be a method or have a colon: ' + curtok);
      }

      ASSERT(curtok.type !== $PUNC_EQ, 'assignments should be parsed as part of the expression');
    }
    else if (curtok.type === $PUNC_DOT_DOT_DOT) {
      if (targetEsVersion < VERSION_OBJECTSPREAD && targetEsVersion !== VERSION_WHATEVER) {
        THROW('Object spread/rest requires the requested version to be ES9+');
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
      let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, $PUNC_CURLY_CLOSE, bindingType, UNDEF_ASYNC, exportedNames, exportedBindings, astProp);
      ASSERT(typeof subDestruct === 'number', 'should be number');
      destructible |= subDestruct;
      ASSERT(curtok.type === $EOF || (curtok.type !== $PUNC_COMMA || hasAllFlags(subDestruct, CANT_DESTRUCT)), 'if comma then cannot destruct, should be dealt with in function');
      ASSERT(curtok.type === $EOF || (curtok.type === $PUNC_COMMA || curtok.type === $PUNC_CURLY_CLOSE), 'abstraction should parse whole rest/spread goal; ' + curtok);
    }
    else if (curtok.type === $PUNC_BRACKET_OPEN) {
      // computed property (is valid in destructuring assignment!)
      // - `({[foo]: x} = y)`
      // - `({[foo]() {}} = y)`            fail
      // - `const {[x]: y} = z;`
      // - `({[x]: y}) => z;`
      // - `function f({[x]: {y = z}}) {}`

      let curlyToken = curtok;
      // skip computed key part first because we need to figure out whether we're parsing a method
      ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);
      let nowAssignable = parseExpression(lexerFlags, astProp);
      // pass yield/await flags here (note that the assignability itself is irrelevant for this expr)
      // TODO: find a testcase where the setNotAssignable state fails...
      assignableForPiggies = setNotAssignable(nowAssignable | assignableForPiggies);
      if (curtok.type !== $PUNC_BRACKET_CLOSE) {
        THROW('Missing closing square bracket for computed property name, found `' + tokenStrForError(curtok) + '` instead');
      }
      ASSERT_skipToColonParenOpen($PUNC_BRACKET_CLOSE, lexerFlags);

      if (curtok.type === $PUNC_COLON) {
        // Computed keys do not affect destructibility
        // - `({[foo]: bar} = baz)`
        // - `({[foo]: bar()} = baz)`
        // - `({[foo]: a + b} = baz)`
        // - `({[foo]: bar}) => baz`
        // - `({[foo]: bar()}) => baz`
        // - `({[foo]: a + b}) => baz`
        // - `let {[foo]: bar} = baz`
        // - `let {[foo]: bar()} = baz`
        // - `let {[foo]: a + b} = baz`
        // - `let {[foo]: [bar]} = baz`
        // - `[a, {[b]:d}, c] = obj`
        // - `function f({[x]: {y = z}}) {}`

        if (babelCompat) {
          AST_wrapClosedCustom(astProp, {
            type: NODE_NAME_PROPERTY,
            loc: AST_getBaseLoc(startOfKeyToken),
            key: undefined,
            method: false,
            computed: true,
            value: undefined,
            shorthand: false,
          }, 'key');
        } else {
          AST_wrapClosedCustom(astProp, {
            type: NODE_NAME_PROPERTY,
            loc: AST_getBaseLoc(startOfKeyToken),
            key: undefined,
            kind: 'init',
            method: false,
            computed: true,
            value: undefined,
            shorthand: false,
          }, 'key');
        }

        ASSERT_skipToExpressionStart(':', lexerFlags); // skip after so the end-column is correct
        destructible = _parseObjectPropertyValueAfterColon(lexerFlags, undefined, bindingType, IS_ASSIGNABLE, destructible, scoop, UNDEF_EXPORTS, UNDEF_EXPORTS, astProp);
        AST_close(NODE_NAME_PROPERTY);
      }
      else if (curtok.type === $PUNC_PAREN_OPEN) {
        // [x]: `async function f(){    async function f(){   (a= {[await foo](){}, "x"(){}} ) => a    }    }`
        // [v]: `({[x](){}});`
        // [x]: `({[x](){}} = z);`
        // [v]: `wrap({get [foo](){}, [bar](){}});`
        // [v]: `wrap({[foo](){}, get [bar](){}});`
        // [v]: `wrap({set [foo](c){}, [bar](){}});`
        // [v]: `wrap({[foo](){}, set [bar](e){}});`
        // [x]: `({[foo]() {}} = y)`
        let destructPiggies = parseObjectLikeMethodAfterKey(lexerFlags, UNDEF_ASYNC, UNDEF_STAR, UNDEF_GET, UNDEF_SET, undefined, curlyToken, astProp);
        ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
        ASSERT(destructPiggies === CANT_DESTRUCT, 'no piggies');
        destructible |= CANT_DESTRUCT;
      }
      else {
        // - `{[foo] * 5}`
        THROW('A computed property name must be followed by a colon or paren');
      }
    }
    else if (curtok.type === $PUNC_STAR) {
      // Generator shorthand method (invalid for bindings), the next token must be the id

      // - `{*ident(){}} = x`
      //     ^
      // - `{*"str"(){}} = x`
      // - `{*15(){}} = x`
      // - `{*[expr](){}} = x`

      destructible |= CANT_DESTRUCT;

      let starToken = curtok;
      ASSERT_skipToIdentStringNumberSquareOpen('*', lexerFlags);

      if (isIdentToken(curtok.type)) {
        // - `({*ident(){}})`
        let identToken = curtok;
        let identTokenCanon = tok_getCanon();
        ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);

        // - `({*ident(){}})`
        // - `({*get(){}})`       // ok (not a getter!)
        // - `({*set(){}})`       // ok (not a setter!)
        // - `({*async(){}})`     // NOT an async generator! it's a generator
        AST_setIdent(astProp, identToken, identTokenCanon);
        let destructPiggies = parseObjectLikeMethodAfterKey(lexerFlags, UNDEF_ASYNC, starToken, UNDEF_GET, UNDEF_SET, identToken, undefined, astProp);
        ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
        ASSERT(destructPiggies === CANT_DESTRUCT, 'no piggies');
      }
      else if (isNumberStringToken(curtok.type)) {
        // - `({*"str"(){}})`
        // - `({*15(){}})`
        let litToken = curtok;
        let litTokenCanon = tok_getCanon();

        ASSERT_skipToParenOpenOrDie(litToken.str, lexerFlags);
        AST_setLiteral(astProp, litToken, litTokenCanon);

        let destructPiggies = parseObjectLikeMethodAfterKey(lexerFlags, UNDEF_ASYNC, starToken, UNDEF_GET, UNDEF_SET, litToken, undefined, astProp);
        ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
        ASSERT(destructPiggies === CANT_DESTRUCT, 'no piggies');
      }
      else if (curtok.type === $PUNC_BRACKET_OPEN) {
        // - `{*[expr](){}} = x`

        let bracketOpenToken = curtok;
        // skip dynamic part first because we need to assert that we're parsing a method
        ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);
        let assignablePiggies1 = parseExpression(lexerFlags, astProp);
        if (curtok.type !== $PUNC_BRACKET_CLOSE) {
          THROW('Missing closing square bracket for computed property member name, found `' + tokenStrForError(curtok) + '` instead');
        }
        ASSERT_skipToColonParenOpen($PUNC_BRACKET_CLOSE, lexerFlags);

        let assignablePiggies2 = parseObjectMethod(lexerFlags, UNDEF_ASYNC, starToken, UNDEF_GET, UNDEF_SET, undefined, bracketOpenToken, astProp);

        assignableForPiggies = mergeAssignable(assignablePiggies1, assignableForPiggies);
        assignableForPiggies = mergeAssignable(assignablePiggies2, assignableForPiggies);
      }
      else {
        THROW('Invalid objlit key character after generator star');
      }
      ASSERT(curtok.type !== $PUNC_EQ, 'this struct can not have an init');
    }
    else {
      // ({<?>
      THROW('Unexpected token, wanted to parse a start of a property in an object literal/pattern, got `' + curtok.str + '`');
    }

    // pick up the flags from assignable and put them in destructible
    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    // - `function *g(){ (x = {[yield]: 1}) }`
    // - `{ (x = {[yield]: 1}) }`
    // - `s = {"foo": await = x} = x`
    return copyPiggies(destructible, assignableForPiggies);
  }
  function parsePatternAssign(lexerFlags, patternStartToken, destructible, astProp) {
    ASSERT(parsePatternAssign.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astProp string', astProp);
    // TODO: this is used for arrays only
    verifyDestructible(destructible);

    if (curtok.type === $PUNC_EQ) {
      // Note: this might be something like `([x]=await y)=>z` which is illegal so we must propagate await/yield flags
      // - `[x]=y`
      // - `[x=y]=z`
      // - `[x=await y]=z`
      // - `[x=y]=await z`
      // - `[...{a = b} = c] = x`
      // - `{x} = y`

      if (hasAllFlags(destructible, CANT_DESTRUCT)) {
        // - `({a:(b) = c} = 1)`
        THROW('Tried to destructure something that is not destructible');
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
      // TODO: not sure about PIGGY_BACK_WAS_PROTO (but "free" so not wasting time for a test case right now)
      destructible = sansFlag(destructible, MUST_DESTRUCT | PIGGY_BACK_WAS_PROTO);

      // the array MUST now be a pattern. Does not need to be an arrow.
      // the outer-most assignment is an expression, the inner assignments become patterns too.
      AST_destruct(astProp);
      AST_wrapClosedCustom(astProp, {
        type: 'AssignmentExpression',
        loc: AST_getBaseLoc(patternStartToken),
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
      AST_close('AssignmentExpression');
    } else if (isCompoundAssignment(curtok.type)) {
      // - `[x] += y`
      // - `{x} += y`
      THROW('Cannot compound-assign to an array literal');
    }
    return destructible;
  }
  function parseObjectPropertyValueAfterColon(lexerFlags, startOfKeyToken, keyToken, keyTokenCanon, bindingType, assignableOnlyForYieldAwaitFlags, destructible, scoop,exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectPropertyValueAfterColon.length === arguments.length, 'arg count');
    // property value or label, some are destructible:
    // - ({ident: ident,}
    //          ^
    // - ({35: ident,}
    // - ({"aye": ident,}
    // - ({key: <array destruct>,}
    // - ({key: <object destruct>,}
    // - ({key: ident = expr}
    // - ({key: <array destruct> = expr,}
    // - ({key: <object destruct> = expr,}
    // anything else as value is non-destructible
    // - `(x={y: await z}) => t`                    (propagate await/yield to invalidate this case)
    // - `({x: b = await c}) => d`                  (propagate await/yield to invalidate this case)
    ASSERT(startOfKeyToken && startOfKeyToken.type, 'duck type token check');
    ASSERT(startOfKeyToken.type === $PUNC_BRACKET_OPEN || isIdentToken(startOfKeyToken.type) || isNumberStringToken(startOfKeyToken.type));
    ASSERT(curtok.type === $PUNC_COLON, 'should not skip colon yet because that breaks end column');

    if (babelCompat) {
      AST_open(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: AST_getBaseLoc(startOfKeyToken),
        key: undefined,
        method: false, // only the {x(){}} shorthand gets true here, this is {x}
        computed: false,
        value: undefined,
        shorthand: false,
      });
    } else {
      AST_open(astProp, {
        type: NODE_NAME_PROPERTY,
        loc: AST_getBaseLoc(startOfKeyToken),
        key: undefined,
        kind: 'init', // only getters/setters get special value here
        method: false, // only the {x(){}} shorthand gets true here, this is {x}
        computed: false,
        value: undefined,
        shorthand: false,
      });
    }
    if (isIdentToken(keyToken.type)) {
      AST_setIdent('key', keyToken, keyTokenCanon);
    } else {
      AST_setLiteral('key', keyToken, keyTokenCanon);
    }
    ASSERT_skipToExpressionStart(':', lexerFlags);

    destructible = _parseObjectPropertyValueAfterColon(lexerFlags, keyToken, bindingType, assignableOnlyForYieldAwaitFlags, destructible, scoop,exportedNames, exportedBindings, astProp);

    AST_close(NODE_NAME_PROPERTY);

    return destructible;
  }
  function _parseObjectPropertyValueAfterColon(lexerFlags, keyToken, bindingType, assignableOnlyForYieldAwaitFlags, destructible, scoop, exportedNames, exportedBindings, astProp) {
    ASSERT(_parseObjectPropertyValueAfterColon.length === arguments.length, 'arg count');
    let valueFirstToken = curtok;
    if (isIdentToken(curtok.type)) {
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

      // use the rhs of the colon as identToken now
      let identToken = curtok;
      let identTokenCanon = tok_getCanon();

      // `[...{a: function=x} = c]`
      // let identAssignableOrErrMsg = nonFatalBindingIdentCheck(identToken, bindingType, lexerFlags);
      // if (typeof identAssignableOrErrMsg === 'string') TODO

      // - `{key: bar}`
      //          ^
      // - `{key: bar/x`
      // - `{key: delete a.b`
      // - `{key: await /foo}`
      // - `{key: await /foo/}`
      // - `{key: await /foo/g}`
      skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // will properly deal with div/rex cases

      // - `{key: bar = x}`
      // - `{key: bar + x}`
      // - `{key: bar.foo = x}`
      // - `{key: bar.foo + x}`
      let wasAssign = curtok.type === $PUNC_EQ;
      // - `{key: bar}`
      // - `{key: bar, koo: baa}`
      // - `{[key]: bar}`
      let commaOrEnd = curtok.type === $PUNC_COMMA || curtok.type === $PUNC_CURLY_CLOSE;
      let valueAssignable = parseValueAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, ASSIGN_EXPR_IS_OK, 'value');
      assignableOnlyForYieldAwaitFlags |= valueAssignable;

      if (curtok.type === $PUNC_COMMA || curtok.type === $PUNC_CURLY_CLOSE) {
        // - `({a: b} = d)`
        //          ^
        // - `({a: b = x} = d)`
        //           ^
        if (wasAssign || commaOrEnd) { // "did this have no tail?"
          // - `({a: b} = d)`
          //          ^
          // - `({[a]: b} = d)`
          //            ^
          // - `({a: b = d})`
          // - `({a: b, c: d})`
          if (notAssignable(valueAssignable)) {
            // - `({[a]: true} = d)`
            //               ^
            // - `[...{a: true} = c]`
            // - `({ *g1() {   return {x: yield}  }})`
            // - `({x:function(){"use strict";}})`
            destructible |= CANT_DESTRUCT;
          } else if (keyToken && isIdentToken(keyToken.type)) {
            // "valid exports"
            // - `[a, {b:d}, c] = obj`
            // If this isn't an export of some kind then the exportedNames and bindings are null so don't worry :)
            // Skip binding check because this may end up being not a binding

            // If this isn't a binding, this is a noop
            // If this is inside a group, this is a noop if it turns out not to be an arrow
            // TODO: add test case for catch shadow
            SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, identToken.str);
            // If this is not an export declaration, the calls below will be noops
            addNameToExports(exportedNames, identToken.str);
            addBindingToExports(exportedBindings, identToken.str);
          } else {
            // non-ident prop with a single ident as value, assignable, destructible. but cant be part of an export decl
            // - `({"a": b})`
            //            ^
            // - `({[a]: b})`
            //            ^
            // - `({15: b})`
            // Skip dupe check because this may not be about a binding

            // If this isn't a binding, this is a noop
            // If this is inside a group, this is a noop if it turns out not to be an arrow
            // TODO: add test case for catch shadow
            SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, identToken.str);
            // If this is not an export declaration, the calls below will be noops
            // TODO: add test case for the exports because that wasnt here before (or assert this cant be reached from an export)
            addNameToExports(exportedNames, identToken.str);
            addBindingToExports(exportedBindings, identToken.str);
          }
        }
        else {
          // - `({a: b.c} = d)`
          //            ^
          // - `({[a]: b()} = d)`
          //              ^
          // So something that had a tail but no ops. Assign destructible if it is assignable.
          if (isAssignable(valueAssignable)) {
            // - `({[a]: a.b} = d)`
            //              ^
            // - `[a, {15: d[x]}, c] = obj`
            //              ^
            // - `[...{a: b.b} = c]`
            //               ^
            destructible |= DESTRUCT_ASSIGN_ONLY;
          } else {
            // - `({[a]: a()} = d)`
            //              ^
            destructible |= CANT_DESTRUCT;
          }
        }
      }
      else if (curtok.type === $PUNC_EQ) {
        // - `({a: b = x} = d)`
        //           ^
        if (notAssignable(valueAssignable)) {
          // A value that is not assignable cannot be destructed
          // - `let {x: true = 1} = z`
          //                 ^
          // - `let {x: f() = 1} = z`
          //                ^
          destructible |= CANT_DESTRUCT;
        } else if (!wasAssign) {
          // There was a tail between the ident and the assign, this is not bindable destructible, but assignable
          // - `let {x: a.b = 1} = z`
          //                ^
          destructible |= DESTRUCT_ASSIGN_ONLY;
        } else {
          // This is fine. There was no tail between ident and `=`. This is still perhaps binding destructible
          // - `let {x: o = 1} = z`
          //              ^
          // - `({[a]: b = c} = d)`
          //             ^

          // If this isn't a binding, this is a noop
          // If this is inside a group, this is a noop if it turns out not to be an arrow
          // TODO: add test case for catch shadow
          SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, identToken.str);
          // If this is not an export declaration, the calls below will be noops
          // TODO: add test case for the exports because that wasnt here before (or assert this cant be reached from an export)
          addNameToExports(exportedNames, identToken.str);
          addBindingToExports(exportedBindings, identToken.str);
        }

        // The assignment itself cannot affect destructibility so just parse the rest
        let rhsAssignable = parseExpressionFromOp(lexerFlags, valueFirstToken, valueAssignable, 'value');
        assignableOnlyForYieldAwaitFlags |= rhsAssignable;
      }
      else {
        // - `({[a]: b + c} = d)`
        //             ^
        // - `({a: b * c} = d)`
        //           ^
        // - `({a: x.y / c} = d)`
        //             ^
        // - `({x: y; a: b})`
        //          ^
        destructible |= CANT_DESTRUCT;
        let rhsAssignable = parseExpressionFromOp(lexerFlags, valueFirstToken, valueAssignable, 'value');
        assignableOnlyForYieldAwaitFlags |= rhsAssignable;
      }
    }
    else if (curtok.type === $PUNC_BRACKET_OPEN) {
      // - `({ident: []}`
      //             ^
      // - `({ident: <array destruct>`
      // - `({500: <array destruct>`
      // - `({"str": <array destruct>`
      // - `({key: [foo, bar].join('')} = x)`        -- error
      // - `({key: [foo].length} = x)`               -- ok
      // - `({key: [foo, bar].join('') = x} = x)`    -- error
      // - `({key: [foo].length = x} = x)`           -- ok
      // - `({key: [x].foo})`
      // - `({key: [x].foo})`
      let arrStartToken = curtok;
      let nowDestruct = parseArrayLiteralPattern(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, 'value');
      destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, arrStartToken, bindingType, hasAllFlags(nowDestruct, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE, nowDestruct, $PUNC_CURLY_CLOSE, 'value');
    }
    else if (curtok.type === $PUNC_CURLY_OPEN) {
      // - `({ident: {})`
      //             ^
      // - `({ident: <object destruct>`
      // - `({500: <object destruct>`
      // - `({"str": <object destruct>`
      // - `({key: {} += x})`                 -- error
      // - `({key: {}.food()} = x)`           -- error
      // - `({key: {}.length} = x)`           -- ok
      // - `({key: {}.food() + x} = x)`       -- error
      // - `({key: {}.length = x} = x)`       -- ok
      // - `({key: {x}.foo})`
      // - `({key: {x}.foo})`
      let objStartToken = curtok;
      let nowDestruct = parseObjectLiteralPatternAndAssign(lexerFlags, scoop, bindingType, PARSE_INIT, exportedNames, exportedBindings, 'value');
      destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, objStartToken, bindingType, hasAllFlags(nowDestruct, CANT_DESTRUCT) ? NOT_ASSIGNABLE : IS_ASSIGNABLE, nowDestruct, $PUNC_CURLY_CLOSE, 'value');
    }
    else {
      // - `{x: 15}`
      //        ^
      // - `{"str": 15}`
      // - `{key: "foo"}`
      // - `{key: /foo/ }`
      // - `{key: 15..foo}=x`
      // - `{key: 15..foo()}=x`
      // - `((x={15: (await foo)}) => x`
      // - `{x: 15.foo}=x`
      // - `{x: 15.foo()}=x`

      let valueFirstToken = curtok;
      let nowAssignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, 'value');

      let nowDestruct = isAssignable(nowAssignable) ? MIGHT_DESTRUCT : CANT_DESTRUCT; // fixes `[(a)] = x`
      assignableOnlyForYieldAwaitFlags |= nowAssignable;
      if (isAssignable(nowAssignable)) {
        destructible |= DESTRUCT_ASSIGN_ONLY;
      } else {
        destructible |= CANT_DESTRUCT;
      }
      destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, valueFirstToken, bindingType, nowAssignable, nowDestruct, $PUNC_CURLY_CLOSE, 'value');
    }

    ASSERT(curtok.type !== $PUNC_EQ, 'assignments should be parsed as part of the rhs expression');

    // There are tests that will catch these
    // - `async function a(){     (foo = [{m: 5 + t(await bar)}]) => {}     }`
    // - `function *f({x: x}) { function f({x: yield}) {} }`
    // - `({ *g1() {   return {x: yield}  }})`
    // - `({xxxx:await}) => null`
    return copyPiggies(destructible, assignableOnlyForYieldAwaitFlags);
  }
  function parseObjectLikePartFromIdent(lexerFlags, startOfPropToken, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    ASSERT(parseObjectLikePartFromIdent.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(curtok.type), 'should be at ident');
    ASSERT(typeof astProp === 'string', 'astprop string');

    let propLeadingIdentToken = curtok;
    let propLeadingIdentTokenCanon = tok_getCanon();
    ASSERT_skipAny($G_IDENT, lexerFlags);

    if (allowAsyncFunctions) {
      // Note: `{async\n(){}}` is legal in sloppy so we do have to check the paren
      if (curtok.type !== $PUNC_PAREN_OPEN && tok_getNlwas() === true && propLeadingIdentToken.type === $ID_async) {
        // - `{async \n key(){}}`
        //              ^
        // Always an error due to async being a restricted production
        // Note that `{async(){}}` is legal so we must check the curtok.c
        THROW('Async methods are a restricted production and cannot have a newline following it');
      }
    }

    let asyncToken = UNDEF_ASYNC;
    let starToken = UNDEF_STAR;
    let getToken = UNDEF_GET;
    let setToken = UNDEF_SET;

    // note: if this part started with `static` then identToken will always be the NEXT token and isstatic=true
    // - `{ident,`
    // - `{ident:ident`
    // - `{ident:expr`
    // - `{ident(){}`         as follows;
    //   - `{x(){}`
    //   - `{async x(){}`
    //   - `{get x(){}`
    //   - `{set x(y){}`
    //   - `{async [x](){}`
    //   - `{get [x](){}`
    //   - `{set [x](y){}`
    //   - `{async 8(){}`
    //   - `{get 8(){}`
    //   - `{set 8(y){}`
    //   - `{async "x"(){}`
    //   - `{get "x"(){}`
    //   - `{set "x"(y){}`
    //   - `{static x(){}`
    //   - `{static async x(){}`
    //   - `{static get x(){}`
    //   - `{static set x(y){}`
    //   - `{static async [x](){}`
    //   - `{static get [x](){}`
    //   - `{static set [x](y){}`
    //   - `{static async 8(){}`
    //   - `{static get 8(){}`
    //   - `{static set 8(y){}`
    //   - `{static async "x"(){}`
    //   - `{static get "x"(){}`
    //   - `{static set "x"(y){}`

    let destructible = MIGHT_DESTRUCT;
    let assignable = ASSIGNABLE_UNDETERMINED; // Propagate await/yield state flags to caller

    if (curtok.type === $PUNC_COMMA || curtok.type === $PUNC_CURLY_CLOSE || curtok.type === $PUNC_EQ) {
      // property shorthand; `{ident}=x` is valid, x={y} is also valid
      // - `{ident}`
      // - `{ident = expr}`
      // - `{true}`           illegal
      // - `{eval}`           ok as it is not a "reserved word"
      // - `{await}`          "depends"

      // https://tc39.github.io/ecma262/#prod-ObjectLiteral
      // https://tc39.github.io/ecma262/#prod-PropertyDefinitionList
      // https://tc39.github.io/ecma262/#prod-PropertyDefinition
      // https://tc39.github.io/ecma262/#prod-IdentifierReference
      // https://tc39.github.io/ecma262/#prod-Identifier
      // Identifier : IdentifierName but not ReservedWord
      if (propLeadingIdentToken.type === $ID_eval || propLeadingIdentToken.type === $ID_arguments) {
        // ({eval});         // ok
        // ({eval} = x);     // bad in strict mode
        // {{eval}) => x;    // bad in strict mode
        if (hasAnyFlag(lexerFlags, LF_STRICT_MODE)) {
          destructible |= CANT_DESTRUCT;
        }
      } else {
        // must throw for reserved words but binding check also checks for `eval`
        // and `arguments` which are not reserved and which would be allowed here
        // Since this is an assignment the `yield` and `await` checks are implicitly done when doing binding name checks
        fatalBindingIdentCheck(propLeadingIdentToken, propLeadingIdentTokenCanon, bindingType, lexerFlags);
      }

      if (propLeadingIdentToken.type === $ID_await) {
        // TODO: yield as well
        // Must be a var, but must also be valid as a var (that's checked above), and
        // must also not be an async arrow parameter name (that's why we return the piggy)
        // - `x = {await}`
        // - `({await}) => x`
        // - `async ({await}) => x`
        // - `async ({await})`
        destructible |= PIGGY_BACK_SAW_AWAIT;
      }

      // If this isn't a binding, this is a noop
      // If this is inside a group, this is a noop if it turns out not to be an arrow
      // TODO: add test case for catch shadow
      SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, propLeadingIdentToken.str);
      // If this is not an export declaration, the calls below will be noops
      addNameToExports(exportedNames, propLeadingIdentToken.str);
      addBindingToExports(exportedBindings, propLeadingIdentToken.str);

      if (babelCompat) {
        AST_open(astProp, {
          type: NODE_NAME_PROPERTY,
          loc: AST_getBaseLoc(startOfPropToken),
          key: AST_getIdentNode(propLeadingIdentToken, propLeadingIdentTokenCanon),
          method: false, // only the {x(){}} shorthand gets true here, this is {x}
          computed: false,
          value: AST_getIdentNode(propLeadingIdentToken, propLeadingIdentTokenCanon),
          shorthand: true,
          extra: {shorthand: true},
        });
      } else {
        AST_open(astProp, {
          type: NODE_NAME_PROPERTY,
          loc: AST_getBaseLoc(startOfPropToken),
          key: AST_getIdentNode(propLeadingIdentToken, propLeadingIdentTokenCanon),
          kind: 'init', // only getters/setters get special value here
          method: false, // only the {x(){}} shorthand gets true here, this is {x}
          computed: false,
          value: AST_getIdentNode(propLeadingIdentToken, propLeadingIdentTokenCanon),
          shorthand: true,
        });
      }
      if (curtok.type === $PUNC_EQ) {
        // - `({foo = 10})`
        // the shorthand only forces MUST_DESTRUCT when an initializer follows it immediately
        // (consider `({foo = 10})` vs `({foo: bar = 10})`)
        destructible |= MUST_DESTRUCT; // shorthand + _init_ is only allowed in Pattern

        ASSERT(propLeadingIdentToken === startOfPropToken, 'can not have modifiers');
        AST_wrapClosedCustom('value', {
          type: 'AssignmentExpression',
          loc: AST_getBaseLoc(propLeadingIdentToken),
          left: undefined,
          operator: '=',
          right: undefined,
        }, 'left');
        ASSERT_skipToExpressionStart('=', lexerFlags); // a forward slash after = has to be a regex
        let nowAssignable = parseExpression(lexerFlags, 'right');
        assignable = mergeAssignable(nowAssignable, assignable);
        AST_close('AssignmentExpression');
      }
      AST_close(NODE_NAME_PROPERTY);

      ASSERT(curtok.type !== $PUNC_EQ, 'further assignments should be parsed as part of the rhs expression');
    }
    else if (curtok.type === $PUNC_COLON) {
      // property value or label, some are destructible:
      // - ({ident: ident,}
      // - ({ident: (ident)}
      // - ({ident: a.b}
      // - ({ident: a[b]}
      // - ({ident: a(b)}
      // - ({ident: a`b`}
      // - ({ident: <array destruct>,}
      // - ({ident: <object destruct>,}
      // - ({ident: ident = expr}
      // - ({ident: (ident) = expr}
      // - ({ident: a.b = expr}
      // - ({ident: a[b] = expr}
      // - ({ident: a(b) = expr}
      // - ({ident: a`b` = expr}
      // - ({ident: <array destruct> = expr,}
      // - ({ident: <object destruct> = expr,}
      // anything else as value is non-destructible
      if (options_webCompat === WEB_COMPAT_ON) {
        if (propLeadingIdentToken.str === '__proto__') destructible |= PIGGY_BACK_WAS_PROTO;
      }

      destructible |= parseObjectPropertyValueAfterColon(lexerFlags, propLeadingIdentToken, propLeadingIdentToken, propLeadingIdentTokenCanon, bindingType, assignable, destructible, scoop,exportedNames, exportedBindings, astProp);
      ASSERT(curtok.type !== $PUNC_EQ, 'assignments should be parsed as part of the rhs expression');
    }
    else if (curtok.type === $PUNC_PAREN_OPEN) {
      // Method shorthand, no modifier
      // - ({ident(){}})

      destructible |= CANT_DESTRUCT;

      AST_setIdent(astProp, propLeadingIdentToken, propLeadingIdentTokenCanon);

      parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, propLeadingIdentToken, undefined, astProp);

      ASSERT(curtok.type !== $PUNC_EQ, 'this struct does not allow init/defaults');
    }
    else if (isIdentToken(curtok.type)) {
      // getter/setter/async shorthand method
      // - ({async ident(){}})
      // - ({get ident(){}})
      // - ({set ident(ident){}})
      destructible |= CANT_DESTRUCT;

      switch (propLeadingIdentToken.type) {
        case $ID_get:
          getToken = propLeadingIdentToken;
          break;
        case $ID_set:
          setToken = propLeadingIdentToken;
          break;
        case $ID_async:
          asyncToken = propLeadingIdentToken;
          break;
        default:
          THROW('Expected to parse the start of a property but found an unknown modifier', propLeadingIdentToken);
      }

      let identToken2 = curtok;
      let identToken2Canon = tok_getCanon();
      ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);
      AST_setIdent(astProp, identToken2, identToken2Canon);
      parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, identToken2, undefined, astProp);

      ASSERT(curtok.type !== $PUNC_EQ, 'this struct does not allow init/defaults');
    }
    else if (curtok.type === $PUNC_STAR) {
      // async with generator
      // note that only async can actually be a generator, getters/setters cannot
      // - `({async *ident(){}})`
      // - `({async *5(){}})`
      // - `({async *'x'(){}})`
      // - `({async *[x](){}})`

      destructible |= CANT_DESTRUCT;

      asyncToken = propLeadingIdentToken;
      if (asyncToken.type !== $ID_async) { // TODO: should it read from canon?
        // - `{get *foo(){}}`
        THROW('Expected to parse the start of a generator method but found an ident that was not `async`', propLeadingIdentToken);
      }

      if (!allowAsyncFunctions) THROW('Async functions are not supported by the current targeted language version');
      if (!allowAsyncGenerators) THROW('Async generators are not supported by the current targeted language version');

      // Skip the star
      starToken = curtok;
      ASSERT_skipToIdentStringNumberSquareOpen('*', lexerFlags);

      if (isIdentToken(curtok.type)) {
        // `{   async *foo(){}   }`
        //             ^^^
        // `{   async *prototype(){}   }`
        let identToken2 = curtok;
        let identToken2Canon = tok_getCanon();
        ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);
        AST_setIdent(astProp, identToken2, identToken2Canon);
        parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, identToken2, undefined, astProp);
      } else if (isNumberStringToken(curtok.type)) {
        // `{   async *300(){}   }`
        // `{   async *"foo"(){}   }`
        let litToken = curtok;
        let litTokenCanon = tok_getCanon();
        ASSERT_skipToParenOpenOrDie(litToken.str, lexerFlags);
        AST_setLiteral(astProp, litToken, litTokenCanon);
        parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, litToken, undefined, astProp);
      } else if (curtok.type === $PUNC_BRACKET_OPEN) {
        // `{   async *[foo](){}   }`
        let bracketOpenToken = curtok;
        ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);
        let assignablePiggies = parseExpression(lexerFlags, astProp);
        assignable = mergeAssignable(assignablePiggies, assignable);
        if (curtok.type !== $PUNC_BRACKET_CLOSE) THROW('Missing right square bracket for computed property, found `' + tokenStrForError(curtok) + '` instead');
        ASSERT_skipToParenOpenOrDie($PUNC_BRACKET_CLOSE, lexerFlags);
        parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, undefined, bracketOpenToken, astProp);
      } else {
        THROW('Expected to parse the key of a generator method but found something unexpected', curtok);
      }

      ASSERT(curtok.type !== $PUNC_EQ, 'this struct does not allow init/defaults');
    }
    else if (isNumberStringToken(curtok.type)) {
      // property names can also be strings and numbers but these cannot be shorthanded
      // number/string keys can still destructure just fine (`({"foo": x} = y)`)
      // - `({async "a b c"(){}});`
      // - `({async 15(){}});`
      // - `({get "a b c"(){}});`
      // - `({get 15(){}});`
      // - `({set "a b c"(x){}});`
      // - `({set 15(x){}});`

      destructible |= CANT_DESTRUCT;

      switch (propLeadingIdentToken.type) {
        case $ID_get:
          getToken = propLeadingIdentToken;
          break;
        case $ID_set:
          setToken = propLeadingIdentToken;
          break;
        case $ID_async:
          asyncToken = propLeadingIdentToken;
          break;
        default:
          THROW('Expected to parse the start of a property but found an unknown modifier', propLeadingIdentToken);
      }

      let litToken = curtok;
      let litTokenCanon = tok_getCanon();
      ASSERT_skipToParenOpenOrDie(litToken.str, lexerFlags);
      AST_setLiteral(astProp, litToken, litTokenCanon);

      parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, litToken, undefined, astProp);
      ASSERT(curtok.type !== $PUNC_EQ, 'this struct does not allow init/defaults');
    }
    else if (curtok.type === $PUNC_BRACKET_OPEN) {
      // (this is the part after the first ident of the part (or two if there is a "static" prefix)
      // - ({static [expr](){}
      //            ^
      // - ({get [expr](){}
      // - ({set [expr](ident){}
      // - ({async [expr](){}
      // - ({static get [expr](){}
      //                ^
      // - ({static set [expr](ident){}
      // - ({static async [expr](){}

      destructible |= CANT_DESTRUCT;

      switch (propLeadingIdentToken.type) {
        case $ID_get:
          getToken = propLeadingIdentToken;
          break;
        case $ID_set:
          setToken = propLeadingIdentToken;
          break;
        case $ID_async:
          asyncToken = propLeadingIdentToken;
          break;
        default:
          THROW('Expected to parse the start of a property but found an unknown modifier', propLeadingIdentToken);
      }

      // skip dynamic part first because we need to assert that we're parsing a method
      let bracketOpenToken = curtok;
      ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);
      let assignablePiggies = parseExpression(lexerFlags, astProp);
      assignable = mergeAssignable(assignablePiggies, assignable);
      if (curtok.type !== $PUNC_BRACKET_CLOSE) {
        THROW('Missing closing square bracket for computed property name, found `' + tokenStrForError(curtok) + '` instead');
      }
      ASSERT_skipToColonParenOpen($PUNC_BRACKET_CLOSE, lexerFlags);

      parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, undefined, bracketOpenToken, astProp);
    }
    else {
      // this is most likely an error
      // - `({x+=y})`
      THROW('Unexpected character after object literal property name ' + curtok);
    }

    // pick up the flags from assignable and put them in destructible
    // - `result = [...{ x = yield }] = y;`
    // - `function* g() {   [...{ x = yield }] = y   }`
    // - `result = [...{ x = await }] = y;`
    // - `async r => result = [...{ x = await x }] = y;`
    return copyPiggies(destructible, assignable);
  }
  function parseObjectMethod(lexerFlags, asyncToken, starToken, getToken, setToken, keyToken, bracketOpenToken, astProp) {
    ASSERT(parseObjectMethod.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT_VALID(curtok.type === $PUNC_PAREN_OPEN, 'Should be at the start of the method parameter definition', curtok);

    // - `{*[expr](){}} = x`
    //            ^

    let methodStartToken =
      asyncToken !== UNDEF_ASYNC ?
        asyncToken :
        starToken !== UNDEF_STAR ?
          starToken :
          getToken !== UNDEF_GET ?
            getToken :
            setToken !== UNDEF_SET ?
              setToken :
              bracketOpenToken === undefined ?
                keyToken :
                bracketOpenToken;

    let parenToken = curtok;

    ASSERT(methodStartToken, 'the start of this method should be either the async, star, get, set, key, or bracket token. at least one should have been passed on');

    if (babelCompat) {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_OBJECT,
        loc: AST_getBaseLoc(methodStartToken),
        key: undefined,
        // Method: getters and setters are not methods but properties
        method: getToken === UNDEF_GET && setToken === UNDEF_SET,
        generator: undefined,
        async: undefined,
        id: undefined,
        params: [],
        // Kind: only getters/setters get special value here, "init" for the others. In the Babel AST the "other" kind is "method" instead.
        kind: getToken !== UNDEF_GET ? 'get' : setToken !== UNDEF_SET ? 'set' : 'method',
        computed: keyToken === undefined,
        body: undefined,
      }, 'key');
    } else {
      // Acorn uses the parenthesis open as start of method while tenko/babel uses the start of the first modifier and otherwise the id
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_OBJECT,
        loc: AST_getBaseLoc(methodStartToken),
        key: undefined,
        // Kind: only getters/setters get special value here, "init" for the others. In the Babel AST the "other" kind is "method" instead.
        kind: getToken !== UNDEF_GET ? 'get' : setToken !== UNDEF_SET ? 'set' : 'init',
        // Method: getters and setters are not methods but properties
        method: getToken === UNDEF_GET && setToken === UNDEF_SET,
        computed: keyToken === undefined,
        value: undefined,
        shorthand: false, // not for babel
      }, 'key');
    }

    verifyGeneralMethodState(asyncToken, starToken, getToken, setToken, keyToken, false);

    // - `foo = { get x(){  "use strict"; (break = "sentinal 79845134");   }}`
    // - `let o = {async await(){}}`
    // - `let o = {async *await(){}}`
    // - `({set break(x){}});`
    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      NOT_FUNC_EXPR,
      IDENT_OPTIONAL,
      NOT_CONSTRUCTOR,
      IS_METHOD,
      asyncToken,
      starToken,
      getToken,
      setToken,
      acornCompat ? parenToken : methodStartToken,
      FDS_ILLEGAL,
      'value',
    );
    AST_close(NODE_NAME_METHOD_OBJECT);
    ASSERT(curtok.type !== $PUNC_EQ, 'this struct does not allow init/defaults');
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

    if (isLabelled === IS_LABELLED || fdState === FDS_ILLEGAL || fdState === FDS_IFELSE) {
      THROW('Cannot parse a class declaration here, only expecting statements here');
    }

    // _all_ bits of a class decl/expr are strict
    lexerFlags = sansFlag(lexerFlags | LF_STRICT_MODE, LF_IN_FOR_LHS | LF_IN_TEMPLATE | LF_NO_ASI);

    let classToken = curtok;
    ASSERT_skipToIdentCurlyOpen($ID_class, lexerFlags);
    AST_open(astProp, {
      type: 'ClassDeclaration',
      loc: AST_getBaseLoc(classToken),
      id: undefined,
      superClass: undefined,
      body: undefined,
    });

    let name = parseClassId(lexerFlags, optionalIdent, scoop);

    // TODO: I'm prety sure scoop should be DO_NOT_BIND here (and can be folded inward)
    _parseClass(lexerFlags, originalOuterLexerFlags, scoop, IS_STATEMENT);

    AST_close('ClassDeclaration');

    return name; // used if export
  }
  function parseClassExpression(lexerFlags, classToken, astProp) {
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
      loc: AST_getBaseLoc(classToken),
      id: undefined,
      superClass: undefined,
      body: undefined,
    });

    // TODO: can extends and computed prop keys access the class id? is there any way that is relevant for parsers?
    parseClassId(lexerFlags, IDENT_OPTIONAL, DO_NOT_BIND);

    let assignable = _parseClass(lexerFlags, originalOuterLexerFlags, DO_NOT_BIND, IS_EXPRESSION);
    AST_close('ClassExpression');

    // The `await/yield` flags only describe the `extends` part. Additionally the class as a whole is not assignable.
    return setNotAssignable(assignable);
  }
  function parseClassId(lexerFlags, optionalIdent, scoop) {
    ASSERT(parseClassId.length === arguments.length, 'arg count');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'should be set by caller');

    let bindingName = '';

    // note: default exports has optional ident but should still not skip `extends` here
    // but it is not a valid class name anyways (which is superseded by a generic keyword check)
    if (isIdentToken(curtok.type) && curtok.type !== $ID_extends) {
      let classNameToken = curtok;
      let classNameTokenCanon = tok_getCanon();
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
      fatalBindingIdentCheck(classNameToken, classNameTokenCanon, BINDING_TYPE_CLASS, lexerFlags);
      bindingName = classNameToken.str;
      SCOPE_addLexBinding(scoop, bindingName, BINDING_TYPE_CLASS, FDS_ILLEGAL);
      let idToken = curtok;
      let idTokenCanon = tok_getCanon();
      ASSERT_skipToIdentCurlyOpen($G_IDENT, lexerFlags); // TODO: this could explicitly check for `extends` but I think this is fine
      AST_setIdent('id', idToken, idTokenCanon);
    }
    else if (optionalIdent === IDENT_REQUIRED) {
      //  '`export class extends x {}` is the only valid class decl without name');
      THROW('Class decl missing required ident, `extends` is not a valid variable name');
    }
    else {
      // - `x = class {}`                // expression
      // - `export default class {}`     // default exports
      AST_set('id', null);
    }

    return bindingName;
  }
  function _parseClass(outerLexerFlags, originalOuterLexerFlags, scoop, isExpression) {
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

    if (isIdentToken(curtok.type) && curtok.type === $ID_extends) {
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

    if (curtok.type !== $PUNC_CURLY_OPEN) THROW('Expected the opening curly `{` of a class body, found `' + tokenStrForError(curtok) + '` instead');

    // _now_ enable super props, super call is already set up correctly
    // Note that computed props will not get this state from the current class (but potentially from an outer class)
    innerLexerFlags |= LF_SUPER_PROP;

    // note: generator and async state is not reset because computed method names still use the outer state
    // Note: this `assignable` is relevant for passing back await/yield flags
    assignable |= parseClassBody(innerLexerFlags, outerLexerFlags, originalOuterLexerFlags, scoop, BINDING_TYPE_NONE, isExpression, 'body');

    return assignable;
  }
  function parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, scoop, bindingType, isExpression, astProp) {
    ASSERT(parseClassBody.length === arguments.length, 'expecting all args');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'should be set by caller');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_CONSTRUCTOR), 'should be unset by caller');
    ASSERT(typeof originalOuterLexerFlags === 'number', 'originalOuterLexerFlags number');
    ASSERT_BINDING_TYPE(bindingType);
    ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'must have asserted to be at the opening curly of the class body');

    let curlyToken = curtok;
    AST_open(astProp, {
      type: 'ClassBody',
      loc: AST_getBaseLoc(curlyToken),
      body: [],
    });
    let assignable = _parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, scoop, bindingType, isExpression, UNDEF_EXPORTS, UNDEF_EXPORTS, 'body');
    AST_close('ClassBody');
    // Note: returning `assignable` is relevant for passing back await/yield flags that could occur in computed key exprs
    return assignable;
  }
  function _parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, scoop, bindingType, isExpression, exportedNames, exportedBindings, astProp) {
    ASSERT(_parseClassBody.length === arguments.length, 'arg count');
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'should be set by caller');
    ASSERT(hasNoFlag(lexerFlags, LF_IN_CONSTRUCTOR), 'should be unset by caller');
    ASSERT(typeof originalOuterLexerFlags === 'number', 'originalOuterLexerFlags number');
    ASSERT(curtok.type === $PUNC_CURLY_OPEN, 'must have asserted to be at the opening curly of the class body');
    // parse one method of a class body

    let destructibleForPiggies = CANT_DESTRUCT; // relevant for computed key exprs

    // - `(class {})`
    //           ^
    // - `(class = x)`
    //           ^
    ASSERT_skipAny($PUNC_CURLY_OPEN, lexerFlags);
    while (curtok.type === $PUNC_SEMI) {
      ASSERT_skipAny(';', lexerFlags);
    }

    // We must throw an error if a constructor was declared more than once, canonical, string keys included
    // We must throw an error if any static method is called "prototype", canonical, string keys included
    // Other keys can occur more than once without error

    let hasConstructor = false; // must throw if more than one plain constructor was found
    while (curtok.type !== $PUNC_CURLY_CLOSE) {
      // note: generator and async state is not reset because computed method names still use the outer class state
      let destructNow = parseClassMethod(lexerFlags, outerLexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp);
      if (hasAnyFlag(destructNow, PIGGY_BACK_WAS_CONSTRUCTOR)) {
        if (hasConstructor) THROW('Classes may only have one constructor');
        hasConstructor = true;
        destructNow = sansFlag(destructNow, PIGGY_BACK_WAS_CONSTRUCTOR); // not sure if this is important at all
      }
      destructibleForPiggies |= destructNow;

      while (curtok.type === $PUNC_SEMI) {
        ASSERT_skipAny(';', lexerFlags);
      }
    }

    // Note: this uses the lexerFlags as they were when parsing the `class` keyword. This keeps `no-in`, `strict-mode`,
    // and `template` flags in tact without further concern. We must parse them as such when parsing the closing `}`.
    if (isExpression === IS_EXPRESSION) {
      // - `(class x {} / foo)`
      // - `${class x{}}`
      ASSERT(curtok.type === $PUNC_CURLY_CLOSE, 'at the time of writing, the loop above had no abnormal way of exiting so the curtok has to be a curly close here when it reached this point');
      ASSERT_skipDiv($PUNC_CURLY_CLOSE, originalOuterLexerFlags);
    } else {
      // - `class x {} /foo/`
      // - `class x {} 06`
      if (curtok.type === $EOF) THROW('Unexpected EOF while parsing a class body');
      ASSERT_skipToStatementStart($PUNC_CURLY_CLOSE, originalOuterLexerFlags);
    }

    // note: generator and async state is not reset because computed method names still use the outer state
    // Note: this `destructible` is only relevant for passing back piggies

    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    // - `(fail = class A {[await](){}; "x"(){}}) => {}`
    // - `function *f(){  class x{[yield foo](a){}}  }`

    return destructibleForPiggies;
  }
  function parseClassMethod(lexerFlags, outerLexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
    // parseProperty parseMethod
    ASSERT(parseClassMethod.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');
    ASSERT_BINDING_TYPE(bindingType);
    ASSERT(hasAllFlags(lexerFlags, LF_STRICT_MODE), 'right?');

    let destructible = bindingType === BINDING_TYPE_NONE ? MIGHT_DESTRUCT : MUST_DESTRUCT;
    let assignable = ASSIGNABLE_UNDETERMINED; // propagate the await/yield state flags, if any (because `(x={a:await f})=>x` should be an error)

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

    let staticToken = UNDEF_STATIC;
    let staticTokenCanon = '';
    let getToken = UNDEF_GET;
    let setToken = UNDEF_SET;
    let asyncToken = UNDEF_ASYNC;
    let starToken = UNDEF_STAR;

    if (isIdentToken(curtok.type) && curtok.type === $ID_static) {
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

      staticToken = curtok;
      staticTokenCanon = tok_getCanon();
      // = `class x { static / foo(){} }`
      ASSERT_skipAny($ID_static, lexerFlags);

      if (curtok.type === $PUNC_PAREN_OPEN) {
        // The `static` ident here is the name of a method, not a modifier
        // - `class x {static(){}}`
        //                   ^
        destructible |= _parseClassMethodIdentKey(lexerFlags, UNDEF_STATIC, asyncToken, starToken, getToken, setToken, staticToken, staticTokenCanon, astProp);
        return destructible;
      }
    }

    if (isIdentToken(curtok.type)) {
      ASSERT(curtok.type !== $ID_static || staticToken.type === $ID_static);
      destructible = parseClassMethodFromIdent(lexerFlags, outerLexerFlags, scoop, bindingType, staticToken, exportedNames, exportedBindings, astProp);
    }
    else if (isNumberStringToken(curtok.type)) {
      // property names can also be strings and numbers but these cannot be shorthanded
      // number/string keys can still destructure just fine (`({"foo": x} = y)`)
      // - `class x {"abc"(){}};`
      // - `class x {15(){}};`

      destructible |= parseClassMethodLiteralKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
    }
    else if (curtok.type === $PUNC_BRACKET_OPEN) {
      // Computed method key
      // - `class x {[foo](){}}`
      destructible |= parseClassMethodComputedKey(lexerFlags, outerLexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
    }
    else if (curtok.type === $PUNC_STAR) {
      // - `class x {*ident(){}}`
      //             ^
      // - `class x {*"str"(){}}`
      // - `class x {*15(){}}`
      // - `class x {*[expr](){}}`

      starToken = curtok;
      ASSERT_skipToIdentStringNumberSquareOpen('*', lexerFlags);

      if (isIdentToken(curtok.type)) {
        // - `class x {*ident(){}}`
        //              ^
        // - `class x {*ident(){}}`
        // - `class x {*get(){}}`       // ok (not a getter!)
        // - `class x {*set(){}}`       // ok (not a setter!)
        // - `class x {*async(){}}`     // NOT an async generator! it's a generatr
        destructible |= parseClassMethodIdentKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
      }
      else if (isNumberStringToken(curtok.type)) {
        // - `({*"str"(){}})`
        // - `({*15(){}})`
        destructible |= parseClassMethodLiteralKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
      }
      else if (curtok.type === $PUNC_BRACKET_OPEN) {
        // - `{*[expr](){}} = x`
        destructible |= parseClassMethodComputedKey(lexerFlags, outerLexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
      }
      else {
        THROW('Invalid objlit key character after generator star');
      }
      ASSERT(curtok.type !== $PUNC_EQ, 'this struct can not have an init');
    }
    else if (curtok.type === $PUNC_SEMI) {
      // - `class x {;}`
      // these semi's dont contribute anything to the AST (lossy)
      ASSERT_skipAny(';', lexerFlags);
    }
    else {
      // - `class x {<?>`
      THROW('Unexpected token, wanted to parse a start of a property in an class literal/pattern');
    }

    // pick up the flags from assignable and put them in destructible
    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    // - `function *g(){ (x = {[yield]: 1}) }`
    // - `{ (x = {[yield]: 1}) }`
    // - `s = {"foo": await = x} = x`
    return copyPiggies(destructible, assignable);
  }
  function parseClassMethodFromIdent(lexerFlags, outerLexerFlags, scoop, bindingType, staticToken, exportedNames, exportedBindings, astProp) {
    ASSERT(parseClassMethodFromIdent.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astprop string');
    ASSERT(staticToken === UNDEF_STATIC || staticToken.type === $ID_static, 'static token');

    let identToken = curtok;
    let identTokenCanon = tok_getCanon();
    ASSERT_skipAny($G_IDENT, lexerFlags);

    if (allowAsyncFunctions) {
      if (curtok.type !== $PUNC_PAREN_OPEN && tok_getNlwas() === true && identToken.type === $ID_async) {
        // - `{async \n key(){}}`
        //              ^
        // Always an error due to async being a restricted production
        // Note that `{async(){}}` is legal so we must check the curtok.c
        THROW('Async methods are a restricted production and cannot have a newline following it');
      }
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

    let destructible = MIGHT_DESTRUCT;
    let assignable = ASSIGNABLE_UNDETERMINED; // Propagate await/yield state flags to caller

    // The syntactic order of modifiers is
    // { [[async [*]]|get|set] key(){} }
    let getToken = UNDEF_GET;
    let setToken = UNDEF_SET;
    let asyncToken = UNDEF_ASYNC;
    let starToken = UNDEF_STAR;

    if (curtok.type === $PUNC_PAREN_OPEN) {
      // Simple method shorthand
      // - `class x {ident(){}}`
      //                  ^
      destructible |= _parseClassMethodIdentKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, identToken, identTokenCanon, astProp);
    }
    else {
      switch (identToken.type) {
        case $ID_get:
          // The next token may now only be the key
          // - `class x {get key(){}}`
          //                 ^
          getToken = identToken;
          break;
        case $ID_set:
          // The next token may now only be the key
          // - `class x {get key(){}}`
          //                 ^
          setToken = identToken;
          break;
        case $ID_async:
          // - `class x {async key(){}})
          //                   ^
          // - `class x {async *key(){}})
          //                   ^

          // the next token may now only be the key
          asyncToken = identToken;
          // Might be followed by star
          if (curtok.type === $PUNC_STAR) {
            // - `class x {async *key(){}})
            //                   ^
            starToken = curtok;
            ASSERT_skipToIdentStringNumberSquareOpen('*', lexerFlags);
          }
          break;
        default:
          // There aren't any other ident modifiers so this must be an error
          THROW('Either the current modifier is unknown or the input that followed was unexpected', identToken, curtok);
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

      if (curtok.type === $PUNC_BRACKET_OPEN) {
        destructible |= parseClassMethodComputedKey(lexerFlags, outerLexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
      } else if (isNumberStringToken(curtok.type)) {
        destructible |= parseClassMethodLiteralKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
      } else if (isIdentToken(curtok.type)) {
        destructible |= parseClassMethodIdentKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp);
      } else {
        // Stuff like incompatible modifiers, obj lit syntax, invalid tokens, etc
        THROW('Expected to parse the modified key of a class method but could not parse one');
      }
    }

    // Pick up the flags from assignable and put them in destructible
    // - `result = [...{ x = yield }] = y;`
    // - `function* g() {   [...{ x = yield }] = y   }`
    // - `result = [...{ x = await }] = y;`
    // - `async r => result = [...{ x = await x }] = y;`
    return copyPiggies(destructible, assignable);
  }
  function parseClassMethodIdentKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp) {
    ASSERT(parseClassMethodIdentKey.length === arguments.length, 'arg count');
    ASSERT(isIdentToken(curtok.type), 'curtok.type is ident', curtok);
    ASSERT(staticToken === UNDEF_STATIC || staticToken.type === $ID_static, 'static token');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');

    let keyToken = curtok; // Note: constructor is tested elsewhere
    let keyTokenCanon = tok_getCanon(); // Note: constructor is tested elsewhere
    ASSERT_skipToParenOpenOrDie($G_IDENT, lexerFlags);
    return _parseClassMethodIdentKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, keyToken, keyTokenCanon, astProp);
  }
  function _parseClassMethodIdentKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, keyToken, keyTokenCanon, astProp) {
    ASSERT(_parseClassMethodIdentKey.length === arguments.length, 'arg count');
    ASSERT(staticToken === UNDEF_STATIC || staticToken.type === $ID_static, 'static token');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT(keyToken !== undefined, 'key is token');
    ASSERT(isIdentToken(keyToken.type), 'key is ident');

    AST_setIdent(astProp, keyToken, keyTokenCanon);

    // - `class A {async get foo(){}}`
    let destructPiggies = parseClassMethodAfterKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, keyToken, keyTokenCanon, undefined, astProp);
    ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
    // - `(class A extends B { constructor() { super() } })`
    return destructPiggies; // Can have constructor piggy
  }
  function parseClassMethodLiteralKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp) {
    ASSERT(parseClassMethodLiteralKey.length === arguments.length, 'arg count');
    ASSERT(isNumberStringToken(curtok.type));
    ASSERT(staticToken === UNDEF_STATIC || staticToken.type === $ID_static, 'static token');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');

    let litToken = curtok;
    let litTokenCanon = tok_getCanon();
    ASSERT_skipToParenOpenOrDie(litToken.str, lexerFlags);
    AST_setLiteral(astProp, litToken, litTokenCanon);

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
    let destructPiggies = parseClassMethodAfterKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, litToken, litTokenCanon, undefined, astProp);
    ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
    // - `class A {"constructor"(){}}`
    return destructPiggies; // Can have constructor piggy
  }
  function parseClassMethodComputedKey(lexerFlags, outerLexerFlags, staticToken, asyncToken, starToken, getToken, setToken, astProp) {
    // skip computed key part first because we need to figure out whether we're parsing a method
    ASSERT(parseClassMethodComputedKey.length === arguments.length, 'arg count');
    ASSERT(staticToken === UNDEF_STATIC || staticToken.type === $ID_static, 'static token');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');

    let bracketOpenToken = curtok;
    ASSERT_skipToExpressionStart($PUNC_BRACKET_OPEN, lexerFlags);

    // Note: the expression of computed keys of class methods are parsed with the context before the class
    // So the context is not guaranteed to be strict.
    let nowAssignable = parseExpression(outerLexerFlags, astProp);
    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    // - `(fail = class A {[await](){}; "x"(){}}) => {}`
    // - `function *f(){  class x{[yield foo](a){}}  }`
    // - `(fail = class A {[await](){}; "x"(){}}) => {}`
    if (curtok.type !== $PUNC_BRACKET_CLOSE) THROW('Missing right square bracket for computed member, found `' + tokenStrForError(curtok) + '` instead');
    ASSERT_skipToParenOpenOrDie($PUNC_BRACKET_CLOSE, lexerFlags);

    // - `{[foo](){}}`
    // - `class {[foo](){}}`
    // - `class x {[x]z){}}`
    let destructPiggies = parseClassMethodAfterKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, undefined, '', bracketOpenToken, astProp);
    ASSERT(!hasAnyFlag(destructPiggies, PIGGY_BACK_SAW_AWAIT | PIGGY_BACK_SAW_YIELD), 'yield/await cases are caught before this point (yield/await keyword always illegal in func arg, yield/await as param considered "non-simple"');
    ASSERT(destructPiggies === CANT_DESTRUCT, 'no piggies');

    // Note: example case where copying the piggies matters
    // - `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`
    return copyPiggies(CANT_DESTRUCT, nowAssignable);
  }
  function parseClassMethodAfterKey(lexerFlags, staticToken, asyncToken, starToken, getToken, setToken, keyToken, keyTokenCanon, bracketOpenToken, astProp) {
    ASSERT(parseClassMethodAfterKey.length === arguments.length, 'want args');
    ASSERT(staticToken === UNDEF_STATIC || staticToken.type === $ID_static, 'static token');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT(keyToken === undefined || keyToken.type !== undefined, 'keyToken is a token', keyToken);
    ASSERT(!bracketOpenToken || bracketOpenToken.type === $PUNC_BRACKET_OPEN, 'bracketOpenToken should be [', bracketOpenToken);
    ASSERT(keyToken === undefined || (isIdentToken(keyToken.type) || isNumberStringToken(keyToken.type)), 'keyToken is a number, string or ident', ''+keyToken);
    ASSERT_VALID(curtok.type === $PUNC_PAREN_OPEN, 'Should be at the start of the method parameter definition');

    verifyGeneralMethodState(asyncToken, starToken, getToken, setToken, keyToken, true);

    let parenToken = curtok;

    // [x]: `async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }`

    let methodStartToken =
      staticToken !== UNDEF_STATIC ?
        staticToken :
        asyncToken !== UNDEF_ASYNC ?
          asyncToken :
          starToken !== UNDEF_STAR ?
            starToken :
            getToken !== UNDEF_GET ?
              getToken :
              setToken !== UNDEF_SET ?
                setToken :
                bracketOpenToken !== undefined ?
                  bracketOpenToken :
                  keyToken;

    if (keyToken !== undefined && staticToken !== UNDEF_STATIC) {
      if (isIdentToken(keyToken.type) && keyTokenCanon === 'prototype') {
        THROW('Static class methods can not be called `prototype`');
      }
      else if (
        isStringToken(keyToken.type) &&
        keyTokenCanon === 'prototype'
      ) {
        THROW('Static class methods can not be called `prototype`');
      }
    }

    let destructible = CANT_DESTRUCT; // this is mostly for piggy flags like detecting duplicate constructors

    let isClassConstructor = NOT_CONSTRUCTOR;
    let kind = 'method';
    if (
      keyToken !== undefined &&          // Not computed
      staticToken === UNDEF_STATIC &&    // Not static
      (
        // https://tc39.github.io/ecma262/#sec-identifier-names-static-semantics-stringvalue
        // Note: the "constructor" check is determined by the "StringValue" of ident, which is the canonical value
        (
          isIdentToken(keyToken.type) ||
        // > LiteralPropertyName: StringLiteral
        // >   Return the String value whose code units are the SV of the StringLiteral.
        // In other words; `class x{"constructor"(){}}` is also a proper constructor
        // https://tc39.github.io/ecma262/#sec-string-literals-static-semantics-stringvalue
        // And for strings it is the unquoted canonical value of the string (so "constructor" and 'constructor' + escapes)
          isStringToken(keyToken.type)
        ) &&
        keyTokenCanon === 'constructor' // .canon will have any escapes properly unescaped
      )
    ) {
      // This is a proper class constructor
      isClassConstructor = IS_CONSTRUCTOR;
      kind = 'constructor';

      // Constructors can't have get/set/*/async but can be static
      if (asyncToken !== UNDEF_ASYNC) THROW('Class constructors can not be async');
      if (starToken !== UNDEF_STAR) THROW('Class constructors can not be generators');
      if (getToken !== UNDEF_GET) THROW('Class constructors can not be getters');
      if (setToken !== UNDEF_SET) THROW('Class constructors can not be setters');

      // This is a constructor method. We need to signal the caller that we parsed one to dedupe them
      // In order to signal the caller we piggy back on the destructible mechanism which is already a bit-field
      destructible |= PIGGY_BACK_WAS_CONSTRUCTOR;
    } else {
      if (getToken !== UNDEF_GET) {
        // - `class A {get foo(){}}`
        kind = 'get';
      } else if (setToken !== UNDEF_SET) {
        // - `class A {set foo(x){}}`
        kind = 'set';
      } else {
        // [v]: `class x { foo(){ }}`
      }
    }

    if (babelCompat) {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_CLASS,
        loc: AST_getBaseLoc(methodStartToken),
        key: undefined,
        static: staticToken !== UNDEF_STATIC,
        computed: keyToken === undefined,
        async: undefined,
        generator: undefined,
        id: undefined,
        params: [],
        kind: kind,
      }, 'key');
    } else {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_CLASS,
        loc: AST_getBaseLoc(methodStartToken),
        key: undefined,
        static: staticToken !== UNDEF_STATIC,
        computed: keyToken === undefined,
        kind: kind,
        value: undefined,
      }, 'key');
    }

    // [v]: `class A {a(){}}`
    ASSERT(curtok.type === $PUNC_PAREN_OPEN, 'these (non-assert) checks have already been applied at this point');
    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      NOT_FUNC_EXPR,
      IDENT_OPTIONAL,
      isClassConstructor,
      IS_METHOD,
      asyncToken,
      starToken,
      getToken,
      setToken,
      acornCompat ? parenToken : methodStartToken,
      FDS_ILLEGAL,
      'value'
    );

    AST_close(NODE_NAME_METHOD_CLASS);

    return destructible;
  }

  function verifyGeneralMethodState(asyncToken, starToken, getToken, setToken, keyToken, isClass) {
    ASSERT(verifyGeneralMethodState.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT(typeof isClass === 'boolean', 'isclass bool', isClass);

    if (curtok.type !== $PUNC_PAREN_OPEN) {
      // - `{[foo] * 5}`
      //           ^
      // - `class x {async f * 5}`
      //                     ^
      // - `({async get foo(){}});`
      //                ^

      // This is an error branch. Try to give a more sensible error for `async get foo(){}` :
      switch (keyToken && keyToken.type) {
        case $ID_get:
          getToken = keyToken;
          break;
        case $ID_set:
          setToken = keyToken;
          break;
        case $ID_async:
          asyncToken = keyToken;
          break;
        case '*':
          starToken = keyToken;
          break;
      }

      if ((asyncToken !== UNDEF_ASYNC || starToken !== UNDEF_STAR) && (getToken !== UNDEF_GET || setToken !== UNDEF_SET)) {
        THROW('A getter or setter can not be async or a generator as well');
      }

      if (isClass) {
        THROW('Class members must be methods so was expect an opening parenthesis after number/string literal key');
      } else {
        THROW('Objects with certain modifiers must be methods');
      }
    }

    ASSERT(!((asyncToken !== UNDEF_ASYNC || starToken !== UNDEF_STAR) && (getToken !== UNDEF_GET || setToken !== UNDEF_SET)), 'code paths should not allow this state');

    if (asyncToken !== UNDEF_ASYNC) {
      if (!allowAsyncFunctions) {
        THROW('Async functions are not supported in the currently targeted language version');
      }
      else if (starToken !== UNDEF_STAR && !allowAsyncGenerators) {
        THROW('Async generators are not supported in the currently targeted language version');
      }
    }

    if ((asyncToken !== UNDEF_ASYNC || starToken !== UNDEF_STAR) && (getToken !== UNDEF_GET || setToken !== UNDEF_SET)) {
      // - `{async set foo(x){}}`
      // - `{get *foo(){}}`
      THROW('A getter or setter can not be async or a generator');
    }
    if (getToken !== UNDEF_GET && setToken !== UNDEF_SET) {
      // (This would throw an error for the param arity check, anyways)
      // - `{get set foo(x){}}`
      THROW('A getter can not also be a setter');
    }
  }

  function verifyDestructible(destructible) {
    ASSERT(verifyDestructible.length === arguments.length, 'arg count');
    ASSERT(typeof destructible === 'number', 'destructible num', destructible);

    if (hasAllFlags(destructible, CANT_DESTRUCT) && hasAllFlags(destructible, MUST_DESTRUCT)) {
      THROW('Found a part that cant destruct and a part that must destruct so it is not destructible');
    }
  }
  function verifyDestructibleForBinding(destructible, bindingType) {
    ASSERT(verifyDestructibleForBinding.length === arguments.length, 'arg count');
    ASSERT(typeof destructible === 'number', 'destructible num', destructible);
    ASSERT_BINDING_TYPE(bindingType);

    if (hasAnyFlag(destructible, CANT_DESTRUCT)) {
      THROW('The binding pattern is not destructible');
    }
    if (bindingType !== BINDING_TYPE_NONE && hasAnyFlag(destructible, DESTRUCT_ASSIGN_ONLY)) {
      THROW('This binding can not be used in function parameters because it is not destructible');
    }
  }
  function parseOptionalDestructibleRestOfExpression(lexerFlags, valueStartToken, bindingType, assignable, destructible, closingPuncType, astProp) {
    ASSERT(parseOptionalDestructibleRestOfExpression.length === arguments.length, 'arg count');
    ASSERT(typeof astProp === 'string', 'astProp str', astProp);
    ASSERT(typeof assignable === 'number', 'assignable num', assignable);
    ASSERT(typeof destructible === 'number', 'destructible num', destructible);
    ASSERT([$PUNC_PAREN_CLOSE, $PUNC_CURLY_CLOSE, $PUNC_BRACKET_CLOSE].includes(closingPuncType), 'closingPuncType enum', closingPuncType);
    ASSERT_BINDING_TYPE(bindingType);

    if (curtok.type === $PUNC_COMMA || curtok.type === closingPuncType) {
      // this means that the value itself had no tail and is destructible as long as it is assignable
      if (notAssignable(assignable)) destructible |= CANT_DESTRUCT;
    } else if (hasAllFlags(destructible, MUST_DESTRUCT)) {
      // TODO: can assignment patterns reach this?
      // [x]: `([{a=b}.x]) => x`
      // [x]: `({a: {a=b}.x}) => x`
      THROW('Found something that had to be a Pattern but had to parse more, which is an error');
    } else {
      assignable = parseValueTail(lexerFlags, valueStartToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
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

      let firstOpNotAssign = curtok.type !== $PUNC_EQ;
      if (curtok.type !== $PUNC_COMMA && curtok.type !== closingPuncType) {
        // From here on out `assignable` is only used to track yield/await state for fringe cases
        assignable |= parseExpressionFromOp(lexerFlags, valueStartToken, assignable, astProp);
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
  function parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, asyncToken, exportedNames, exportedBindings, astProp) {
    // parseArrowableRest
    ASSERT(parseArrowableSpreadOrRest.length === arguments.length, 'want all args');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');

    let spreadToken = curtok;
    ASSERT_skipToExpressionStart('...', lexerFlags);

    if (curtok.type === $PUNC_DOT_DOT_DOT) THROW('Can not rest twice');
    AST_open(astProp, {
      type: 'SpreadElement',
      loc: AST_getBaseLoc(spreadToken),
      argument: undefined,
    });
    let destructible = _parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, asyncToken, exportedNames, exportedBindings, 'argument');
    AST_close('SpreadElement');

    if (curtok.type !== closingPuncType && curtok.type !== $PUNC_COMMA) THROW('Encountered invalid input after spread/rest argument');

    return destructible;
  }
  function _parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, asyncToken, exportedNames, exportedBindings, astProp) {
    ASSERT(_parseArrowableSpreadOrRest.length === arguments.length, 'arg count');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
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

    let argStartToken = curtok;

    let destructible = MIGHT_DESTRUCT;
    let assignable = initAssignable(); // required for parsing the tail of the arg
    if (isIdentToken(curtok.type)) {
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

      let identToken = curtok;
      let identTokenCanon = tok_getCanon();
      skipIdentSafeSlowAndExpensive(lexerFlags, NOT_LHSE); // will properly deal with div/rex cases
      let assignBefore = curtok.type === $PUNC_EQ;
      let willBeSimple = curtok.type === closingPuncType || curtok.type === $PUNC_COMMA || assignBefore;
      if (willBeSimple) {
        let assignableOrErrorMsg = nonFatalBindingIdentCheck(identToken, identTokenCanon, bindingType, lexerFlags);
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
      assignable = parseValueAfterIdent(lexerFlags, identToken, identTokenCanon, bindingType, ASSIGN_EXPR_IS_OK, astProp);
      ASSERT(!assignBefore || curtok.type === $PUNC_EQ, 'parseValueAfterIdent should not consume the assignment');
      let assignAfter = curtok.type === $PUNC_EQ;
      if (curtok.type !== $PUNC_COMMA && curtok.type !== closingPuncType) {
        if (assignAfter) {
          // - `async (a, ...b=fail) => a;`
          // - `[x, y, ...z = arr]`
          if (notAssignable(assignable)) {
            // - `async (a, ...true=fail) => a;`
            THROW('Tried to assign to a value that was not assignable in arr/obj lit/patt');
          }
        }
        // this will parse the assignment too
        // note: rest cannot have an initializer so any suffix invalidates destructuring
        destructible |= CANT_DESTRUCT;
        assignable = parseExpressionFromOp(lexerFlags, argStartToken, assignable, astProp);
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
        SCOPE_actuallyAddBinding(lexerFlags, scoop, bindingType, identToken.str);
        // If this is not an export declaration, the calls below will be noops
        // TODO: add test case for the exports because that wasnt here before (or assert this cant be reached from an export)
        addNameToExports(exportedNames, identToken.str);
        addBindingToExports(exportedBindings, identToken.str);
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
    else if (curtok.type === $PUNC_BRACKET_OPEN) {
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
      ASSERT(curtok.type !== $PUNC_EQ || (nowDestruct|CANT_DESTRUCT), 'rest can never have default so if there was an assignment dont let it be destructible');
      if (curtok.type !== $PUNC_EQ && curtok.type !== closingPuncType && curtok.type !== $PUNC_COMMA) {
        // - `({...[].x} = x);`
        destructible = parseOptionalDestructibleRestOfExpression(lexerFlags, argStartToken, bindingType, assignable, nowDestruct, closingPuncType, astProp);
      } else {
        // The rest arg of an _object_ pattern can only be a simple assignment target. The rest of an array pattern
        // has more freedom. If there is no tail for obj rest then this not destructible.
        // - `({ ...[x] }) => {}`
        // - `{...[] = c}`
        // - `[...[] = c]`
        if (closingPuncType === $PUNC_CURLY_CLOSE && curtok.type !== $PUNC_EQ) {
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
    else if (curtok.type === $PUNC_CURLY_OPEN) {
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
      let curlyToken = curtok;
      let nowDestruct = parseObjectLiteralPatternAndAssign(lexerFlags, scoop, bindingType, SKIP_INIT, exportedNames, exportedBindings, astProp);
      ASSERT(curtok.type !== $PUNC_EQ || (nowDestruct|CANT_DESTRUCT), 'rest can never have default so if there was an assignment dont let it be destructible');
      if (curtok.type !== $PUNC_EQ && curtok.type !== closingPuncType && curtok.type !== $PUNC_COMMA) {
        // - `({ ...{}.x } = x);`
        //          ^
        destructible = parseOptionalDestructibleRestOfExpression(lexerFlags, curlyToken, bindingType, assignable, nowDestruct, closingPuncType, astProp);
      } else {
        // The rest arg of an _object_ pattern can only be a simple assignment target. The rest of an array pattern
        // has more freedom. If there is no tail for obj rest then this not destructible.
        // - `({ ...{x} }) => {}`
        // - `{...{} = c}`
        // - `[...{} = c]`
        // - `{...{}}`
        // - `[...{}]`                 // TODO: parse or runtime error? or potentially valid? What if the object is an iterable?
        destructible |= nowDestruct;
        if (closingPuncType === $PUNC_CURLY_CLOSE && curtok.type !== $PUNC_EQ) {
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
    else if (curtok.type === closingPuncType) {
      // `[...]`
      // `(...)`
      THROW('The rest/spread operator is missing an argument');
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

      let exprStartToken = curtok;
      let nowAssignable = parseValue(lexerFlags, ASSIGN_EXPR_IS_OK, NOT_NEW_ARG, NOT_LHSE, astProp);
      if (notAssignable(nowAssignable)) {
        destructible = CANT_DESTRUCT;
      }
      assignable = mergeAssignable(nowAssignable, assignable);

      if (curtok.type === $PUNC_EQ && curtok.type !== closingPuncType && curtok.type !== $PUNC_COMMA) {
        if (notAssignable(assignable)) {
          // - `[..."x"=b]`
          THROW('This `...` arg is invalid; rest only accepts idents, arrays, and objects and as spread the assignment is illegal because the lhs is not assignable');
          // THROW('Cannot assign to lhs, not destructible with this initializer');
        }

        // - `[..."x".foo = b]`
        // - `[..."x".foo = b] = x`    (fail)
        assignable = parseExpressionFromOp(lexerFlags, exprStartToken, assignable, astProp);
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

        if (curtok.type === $PUNC_COMMA) {
          // Note: rest in array must be the last element and trailing comma is NOT allowed after array-rest
          // [v]: `[...a, b]`
          // [v]: `[...(x), y]`
          destructible |= CANT_DESTRUCT;
        }
        else if (curtok.type !== closingPuncType) {
          // - `[.../x//y]`
          // - `[.../x/g/y]`
          // - `[..."foo".bar]`
          // - `[...(x)]`
          // - `[...(x,y)]`
          // - `[.../x/+y]`
          assignable = parseExpressionFromOp(lexerFlags, exprStartToken, assignable, astProp);
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

    if (curtok.type !== closingPuncType) {
      if (bindingType === BINDING_TYPE_ARG) {
        if (asyncToken !== UNDEF_ASYNC) {
          destructible |= CANT_DESTRUCT;
        } else {
          // [v]: `f = ([...[ x ] = []]);`
          // [x]: `f = ([...[ x ] = []]) => x;`
          destructible |= DESTRUCT_ASSIGN_ONLY;
          // $log('rest crashed, closingPuncType='+String.fromCharCode(closingPuncType)+', token: ' + curtok);
          // if (curtok.type === $PUNC_EQ) THROW('The rest argument can not have an initializer');
          // else if (curtok.type === $PUNC_COMMA) THROW('The rest argument was not destructible as it must be last and can not have a trailing comma');
          // else THROW('The rest argument must the be last parameter');
        }
      }
      if (curtok.type === $PUNC_EQ) {
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
          loc: AST_getBaseLoc(argStartToken),
          left: undefined,
          operator: '=',
          right: undefined,
        }, 'left');
        ASSERT_skipToExpressionStart('=', lexerFlags);
        let nowAssignable = parseExpression(lexerFlags, 'right');
        assignable = mergeAssignable(nowAssignable, assignable);
        AST_close('AssignmentExpression');
        // at this point the end should be reached or another point in the code will throw an error on it
        // TODO: should we assert that here and (can we) throw a nicer contextual error?
      } else {
        // TODO: is there a case where destructible = MUST?
        assignable = parseValueTail(lexerFlags, argStartToken, assignable, NOT_NEW_ARG, NOT_LHSE, astProp);
        assignable = parseExpressionFromOp(lexerFlags, argStartToken, assignable, astProp);
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
  function parseObjectLikeMethodAfterKey(lexerFlags, asyncToken, starToken, getToken, setToken, keyToken, bracketOpenToken, astProp) {
    ASSERT(arguments.length === parseObjectLikeMethodAfterKey.length, 'want args');
    ASSERT(asyncToken === UNDEF_ASYNC || asyncToken.type === $ID_async, 'async token');
    ASSERT(starToken === UNDEF_STAR || starToken.type === $PUNC_STAR, 'gen token');
    ASSERT(getToken === UNDEF_GET || getToken.type === $ID_get, 'get token');
    ASSERT(setToken === UNDEF_SET || setToken.type === $ID_set, 'set token');
    ASSERT(keyToken === undefined || keyToken.str !== undefined, 'keyToken is a token');
    ASSERT(keyToken === undefined || (isIdentToken(keyToken.type) || isNumberStringToken(keyToken.type)), 'keyToken is a number, string or ident', ''+keyToken);
    ASSERT_VALID(curtok.type === $PUNC_PAREN_OPEN);

    let parenToken = curtok;

    let destructible = CANT_DESTRUCT; // this is mostly for piggy flags like detecting duplicate constructors

    // The object method can start with `async`, `*`, `get`, `set`, `[`, or the key (ident/string/number). In that order
    let methodStartToken = keyToken; // If nothing else, this
    let kind = 'init'; // only getters and setters have special values for object methods
    let method = true; // only false for actual getters and setters (since you won't call those members)

    // TODO: this if-else chain is very basic/dumb but still I'm worried it will DEOPT... :( To confirm.
    if (asyncToken !== UNDEF_ASYNC) {
      // - `let o = {async foo(){}}`
      //                      ^
      // - `let o = {async await(){}}`
      if (!allowAsyncFunctions) {
        THROW('Async functions are not supported in the currently targeted language version');
      }

      if (getToken !== UNDEF_GET || setToken !== UNDEF_SET) {
        // - `{async get foo(){}}`
        // - `{async set foo(x){}}`
        THROW('A getter or setter can not be async');
      }

      if (starToken !== UNDEF_STAR) {
        if (!allowAsyncGenerators) {
          THROW('Async generators are not supported in the currently targeted language version');
        }
      }

      methodStartToken = asyncToken;
      if (babelCompat) kind = 'method';
    }
    else if (starToken !== UNDEF_STAR) {
      if (getToken !== UNDEF_GET || setToken !== UNDEF_SET) {
        // - `{get *foo(){}}`
        // - `{set *foo(x){}}`
        THROW('A getter or setter can not be async');
      }

      methodStartToken = starToken;
      if (babelCompat) kind = 'method';
    }
    else if (getToken !== UNDEF_GET) {
      // - `{get foo(){}}`
      //            ^

      if (setToken !== UNDEF_SET) {
        // (This would throw an error for the param arity check, anyways)
        // - `{get set foo(x){}}`
        THROW('A getter can not also be a setter');
      }

      methodStartToken = getToken;
      kind = 'get';
      method = false;
    }
    else if (setToken !== UNDEF_SET) {
      // - `{set foo(x){}}`
      //            ^
      // - `{set [foo](x){}}`
      //              ^
      methodStartToken = setToken;
      kind = 'set';
      method = false;
    }
    else if (bracketOpenToken !== undefined) {
      // [v]: `x = { [foo](){ }}`
      //                  ^
      methodStartToken = bracketOpenToken;
      if (babelCompat) kind = 'method';
    } else {
      // [v]: `x = { foo(){ }}`
      //                ^
      ASSERT(methodStartToken === keyToken);
      ASSERT(kind === 'init');
      if (babelCompat) kind = 'method';
    }

    ASSERT(methodStartToken, 'the start of this method should be either the async, star, get, set, key, or bracket token. at least one should have been passed on');

    if (babelCompat) {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_OBJECT,
        loc: AST_getBaseLoc(methodStartToken),
        key: undefined,
        method: method,
        generator: undefined,
        async: undefined,
        id: undefined,
        params: [],
        kind: kind,
        computed: keyToken === undefined,
        body: undefined,
      }, 'key');
    } else {
      AST_wrapClosedCustom(astProp, {
        type: NODE_NAME_METHOD_OBJECT,
        loc: AST_getBaseLoc(methodStartToken),
        key: undefined,
        kind: kind,
        method: method,
        computed: keyToken === undefined,
        value: undefined,
        shorthand: false,
      }, 'key');
    }

    if (curtok.type !== $PUNC_PAREN_OPEN) {
      // TODO: move this to outside of this branch?
      // [x]: `{get 123: x}`
      // [x]: `{async foo: x}`
      THROW('Expected to parse a paren of the method now but found `' + tokenStrForError(curtok) + '`');

      // // This is an error path because generators must be methods
      // if (allowAsyncFunctions) {
      //   if (curtok.type === $ID_async) {
      //     // - `({*async x(){}})`     // NOT an async generator! just an error
      //     THROW('Found `* async x(){}` but this should be `async * x(){}`'); // provided it's supported at all...
      //   }
      // }
      // if (curtok.type === $ID_get || curtok.type === $ID_set) {
      //   // - `({*get x(){}})`
      //   // - `({*set x(){}})`
      //   THROW('Getters and setters can not be generators'); // (and you would put the get/set before the *, anyways)
      // }
      // if (curtok.type === $PUNC_COLON) {
      //   // - `({*ident: x})`
      //   THROW('Generators must be method shorthands');
      // }
      // // - `({*ident x(){}})`
      // THROW('Unexpected token can not be generator method');

    }

    parseFunctionAfterKeyword(
      lexerFlags,
      DO_NOT_BIND,
      NOT_FUNC_DECL,
      NOT_FUNC_EXPR,
      IDENT_OPTIONAL,
      NOT_CONSTRUCTOR,
      IS_METHOD,
      asyncToken,
      starToken,
      getToken,
      setToken,
      acornCompat ? parenToken : methodStartToken,
      FDS_ILLEGAL,
      'value'
    );

    AST_close(NODE_NAME_METHOD_OBJECT);

    return destructible;
  }

  let initialLexerFlags = sansFlag(INITIAL_LEXER_FLAGS | ((options_strictMode || goalMode === GOAL_MODULE) ? LF_STRICT_MODE : 0), LF_FOR_REGEX);
  initLexer(initialLexerFlags);
  parseTopLevels(initialLexerFlags);

  if (curtok.type !== $EOF) THROW('Unexpected further input');

  if (failForRegexAssertIfPass !== '') {
    // We assume that when we call skipAny that we don't expect the next token to be legally start with a forward slash
    // But there may still be explicit test cases that assert illegal forward slashes are throwing gracefully
    ASSERT(false,'Calling skipAny should not legally return a token starting with `/`, but it did; token = ' + failForRegexAssertIfPass + '; stack trace is: ' + regexAssertTrace);
  }
  if (assertExpectedFail !== '') {
    // An invariant was broken that should hold in valid input, yet no syntax error was reported by the parser.
    THROW_TOKEN('Assertion fail (when valid): ' + assertExpectedFail, assertExpectedToken);
  }

  // <SCRUB AST>
  _tree.loc.end.line = curtok.line;
  _tree.loc.end.column = curtok.column;
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
  ASSERT([SCOPE_LAYER_GLOBAL, SCOPE_LAYER_FOR_HEADER, SCOPE_LAYER_BLOCK, SCOPE_LAYER_FUNC_PARAMS, SCOPE_LAYER_ARROW_PARAMS, SCOPE_LAYER_TRY, SCOPE_LAYER_CATCH_HEAD, SCOPE_LAYER_CATCH_BODY, SCOPE_LAYER_FINALLY, SCOPE_LAYER_SWITCH, SCOPE_LAYER_FUNC_ROOT, SCOPE_LAYER_FUNC_BODY, SCOPE_LAYER_FAKE_BLOCK].includes(s), 'scopeType enum', s);
  if (s === SCOPE_LAYER_GLOBAL) return 'SCOPE_LAYER_GLOBAL';
  if (s === SCOPE_LAYER_FOR_HEADER) return 'SCOPE_LAYER_FOR_HEADER';
  if (s === SCOPE_LAYER_BLOCK) return 'SCOPE_LAYER_BLOCK';
  if (s === SCOPE_LAYER_FUNC_PARAMS) return 'SCOPE_LAYER_FUNC_PARAMS';
  if (s === SCOPE_LAYER_TRY) return 'SCOPE_LAYER_TRY';
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

  GOAL_MODULE,
  GOAL_SCRIPT,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,
};
