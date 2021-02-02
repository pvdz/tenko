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
// Utils are only used in dev
import {
  ASSERT,
} from './utils.mjs';
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
  LF_CHAINING,

  L,
} from './lexerflags.mjs';
// Token type stuff is put in their own file
import {
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
  $PUNC_AND_AND_EQ,
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
  $PUNC_QMARK_QMARK_EQ,
  $PUNC_BRACKET_OPEN,
  $PUNC_BRACKET_CLOSE,
  $PUNC_CARET,
  $PUNC_CARET_EQ,
  $PUNC_CURLY_OPEN,
  $PUNC_OR,
  $PUNC_OR_OR,
  $PUNC_OR_OR_EQ,
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
  REGATOM_ESC_NONU,
  REGATOM_ESC_OK,
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
} from './tokentype.mjs';

// https://tc39.es/ecma262/#table-nonbinary-unicode-properties
// (Manually copied from spec. Note that the numbers of the table is not "fixed" so don't refer to them like that)
const TABLE_NONBIN_UNI_PROPS = ',General_Category,gc,Script,sc,Script_Extensions,scx,';
const TABLE_BIN_UNI_PROPS = ',ASCII,ASCII_Hex_Digit,AHex,Alphabetic,Alpha,Any,Assigned,Bidi_Control,Bidi_C,Bidi_Mirrored,Bidi_M,Case_Ignorable,CI,Cased,Changes_When_Casefolded,CWCF,Changes_When_Casemapped,CWCM,Changes_When_Lowercased,CWL,Changes_When_NFKC_Casefolded,CWKCF,Changes_When_Titlecased,CWT,Changes_When_Uppercased,CWU,Dash,Default_Ignorable_Code_Point,DI,Deprecated,Dep,Diacritic,Dia,Emoji,Emoji_Component,Emoji_Modifier,Emoji_Modifier_Base,Emoji_Presentation,Extended_Pictographic,Extender,Ext,Grapheme_Base,Gr_Base,Grapheme_Extend,Gr_Ext,Hex_Digit,Hex,IDS_Binary_Operator,IDSB,IDS_Trinary_Operator,IDST,ID_Continue,IDC,ID_Start,IDS,Ideographic,Ideo,Join_Control,Join_C,Logical_Order_Exception,LOE,Lowercase,Lower,Math,Noncharacter_Code_Point,NChar,Pattern_Syntax,Pat_Syn,Pattern_White_Space,Pat_WS,Quotation_Mark,QMark,Radical,Regional_Indicator,RI,Sentence_Terminal,STerm,Soft_Dotted,SD,Terminal_Punctuation,Term,Unified_Ideograph,UIdeo,Uppercase,Upper,Variation_Selector,VS,White_Space,space,XID_Continue,XIDC,XID_Start,XIDS,';
const TABLE_GEN_CAT_VALUES = ',Cased_Letter,LC,Close_Punctuation,Pe,Connector_Punctuation,Pc,Control,Cc,cntrl,Currency_Symbol,Sc,Dash_Punctuation,Pd,Decimal_Number,Nd,digit,Enclosing_Mark,Me,Final_Punctuation,Pf,Format,Cf,Initial_Punctuation,Pi,Letter,L,Letter_Number,Nl,Line_Separator,Zl,Lowercase_Letter,Ll,Mark,M,Combining_Mark,Math_Symbol,Sm,Modifier_Letter,Lm,Modifier_Symbol,Sk,Nonspacing_Mark,Mn,Number,N,Open_Punctuation,Ps,Other,C,Other_Letter,Lo,Other_Number,No,Other_Punctuation,Po,Other_Symbol,So,Paragraph_Separator,Zp,Private_Use,Co,Punctuation,P,punct,Separator,Z,Space_Separator,Zs,Spacing_Mark,Mc,Surrogate,Cs,Symbol,S,Titlecase_Letter,Lt,Unassigned,Cn,Uppercase_Letter,Lu,';
const TABLE_SCRIPT_VALUES = ',Adlam,Adlm,Ahom,Anatolian_Hieroglyphs,Hluw,Arabic,Arab,Armenian,Armn,Avestan,Avst,Balinese,Bali,Bamum,Bamu,Bassa_Vah,Bass,Batak,Batk,Bengali,Beng,Bhaiksuki,Bhks,Bopomofo,Bopo,Brahmi,Brah,Braille,Brai,Buginese,Bugi,Buhid,Buhd,Canadian_Aboriginal,Cans,Carian,Cari,Caucasian_Albanian,Aghb,Chakma,Cakm,Cham,Cherokee,Cher,Common,Zyyy,Coptic,Copt,Qaac,Cuneiform,Xsux,Cypriot,Cprt,Cyrillic,Cyrl,Deseret,Dsrt,Devanagari,Deva,Dogra,Dogr,Duployan,Dupl,Egyptian_Hieroglyphs,Egyp,Elbasan,Elba,Elymaic,Elym,Ethiopic,Ethi,Georgian,Geor,Glagolitic,Glag,Gothic,Goth,Grantha,Gran,Greek,Grek,Gujarati,Gujr,Gunjala_Gondi,Gong,Gurmukhi,Guru,Han,Hani,Hangul,Hang,Hanifi_Rohingya,Rohg,Hanunoo,Hano,Hatran,Hatr,Hebrew,Hebr,Hiragana,Hira,Imperial_Aramaic,Armi,Inherited,Zinh,Qaai,Inscriptional_Pahlavi,Phli,Inscriptional_Parthian,Prti,Javanese,Java,Kaithi,Kthi,Kannada,Knda,Katakana,Kana,Kayah_Li,Kali,Kharoshthi,Khar,Khmer,Khmr,Khojki,Khoj,Khudawadi,Sind,Lao,Laoo,Latin,Latn,Lepcha,Lepc,Limbu,Limb,Linear_A,Lina,Linear_B,Linb,Lisu,Lycian,Lyci,Lydian,Lydi,Mahajani,Mahj,Makasar,Maka,Malayalam,Mlym,Mandaic,Mand,Manichaean,Mani,Marchen,Marc,Medefaidrin,Medf,Masaram_Gondi,Gonm,Meetei_Mayek,Mtei,Mende_Kikakui,Mend,Meroitic_Cursive,Merc,Meroitic_Hieroglyphs,Mero,Miao,Plrd,Modi,Mongolian,Mong,Mro,Mroo,Multani,Mult,Myanmar,Mymr,Nabataean,Nbat,Nandinagari,Nand,New_Tai_Lue,Talu,Newa,Nko,Nkoo,Nushu,Nshu,Nyiakeng_Puachue_Hmong,Hmnp,Ogham,Ogam,Ol_Chiki,Olck,Old_Hungarian,Hung,Old_Italic,Ital,Old_North_Arabian,Narb,Old_Permic,Perm,Old_Persian,Xpeo,Old_Sogdian,Sogo,Old_South_Arabian,Sarb,Old_Turkic,Orkh,Oriya,Orya,Osage,Osge,Osmanya,Osma,Pahawh_Hmong,Hmng,Palmyrene,Palm,Pau_Cin_Hau,Pauc,Phags_Pa,Phag,Phoenician,Phnx,Psalter_Pahlavi,Phlp,Rejang,Rjng,Runic,Runr,Samaritan,Samr,Saurashtra,Saur,Sharada,Shrd,Shavian,Shaw,Siddham,Sidd,SignWriting,Sgnw,Sinhala,Sinh,Sogdian,Sogd,Sora_Sompeng,Sora,Soyombo,Soyo,Sundanese,Sund,Syloti_Nagri,Sylo,Syriac,Syrc,Tagalog,Tglg,Tagbanwa,Tagb,Tai_Le,Tale,Tai_Tham,Lana,Tai_Viet,Tavt,Takri,Takr,Tamil,Taml,Tangut,Tang,Telugu,Telu,Thaana,Thaa,Thai,Tibetan,Tibt,Tifinagh,Tfng,Tirhuta,Tirh,Ugaritic,Ugar,Vai,Vaii,Wancho,Wcho,Warang_Citi,Wara,Yi,Yiii,Zanabazar_Square,Zanb,';

import {
  BAD_ESCAPE,
  GOOD_ESCAPE,
  FOR_NAMED_GROUP,
  FOR_K_ESCAPE,
  GOAL_MODULE,
  GOAL_SCRIPT,
  MAX_VALID_UNICODE_VALUE,
  REGEX_ALWAYS_GOOD,
  REGEX_GOOD_WITH_U_FLAG,
  REGEX_GOOD_SANS_U_FLAG,
  REGEX_ALWAYS_BAD,
  REGEX_GOOD_RUBY_EDGE_CASE,
  FIRST_CHAR,
  ILLEGAL_UNICODE_ESCAPE,
  NON_START,
  REGEX_CHARCLASS_BAD,
  REGEX_CHARCLASS_ESCAPED_UC_B,
  REGEX_CHARCLASS_ESCAPED_C,
  REGEX_CHARCLASS_BAD_SANS_U_FLAG,
  REGEX_CHARCLASS_BAD_WITH_U_FLAG,
  REGEX_CHARCLASS_CLASS_ESCAPE,
  REGEX_CHARCLASS_WAS_RUBY,
  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,
  COLLECT_TOKENS_TYPES,
  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,
  RETURN_ANY_TOKENS,
  RETURN_COMMENT_TOKENS,
  RETURN_SOLID_TOKENS,
  WHITESPACE_TOKEN,
  SOLID_TOKEN,
  PARSING_FROM_TICK,
  PARSING_SANS_TICK,
  FAIL_GRACEFULLY,
  FAIL_HARD,
  FOR_TEMPLATE,
  NOT_TEMPLATE,
  CODEPOINT_FROM_ESCAPE,
  INVALID_IDENT_CHAR,
  VALID_SINGLE_CHAR,
  VALID_DOUBLE_CHAR,
  REGEX_VALID_CURLY_QUANTIFIER,
  REGEX_INVALID_CURLY_QUANTIFIER,
  REGEX_PARTIAL_CURLY_QUANTIFIER,
} from './enum_lexer.mjs';

let ID_START_REGEX = undefined;
function getIdStartRegexSuperSlow() {
  if (ID_START_REGEX) return ID_START_REGEX;
  return ID_START_REGEX = createUnicodeRegex('^\\p{ID_Start}$');
}
let ID_CONTINUE_REGEX = undefined;
function getIdRestRegexSuperSlow() {
  if (ID_CONTINUE_REGEX) return ID_CONTINUE_REGEX;
  return ID_CONTINUE_REGEX = createUnicodeRegex('^\\p{ID_Continue}$');
}
function createUnicodeRegex(pattern) {
  try {
    return new RegExp(pattern,'u');
  } catch(e) {
    console.warn('Tenko: Current nodejs version does not suppport unicode regexes or regex property escapes; Input contains unicode that requires it so Tenko is unable to properly parse input (' + e.message + ')');
    return /|/;
  }
}

function Lexer(
  input,
  options
) {
  const {
    targetEsVersion = Infinity,
    parsingGoal = GOAL_MODULE,
    collectTokens = COLLECT_TOKENS_NONE, // Collect token objects in an array? (Enabling this may slow down parsing!)
    returnTokens = RETURN_SOLID_TOKENS,  // What to emit and not to emit while lexing
    webCompat = WEB_COMPAT_ON,
    gracefulErrors = FAIL_HARD,
    tokenStorageExternal,
    babelTokenCompat = false,

    errorCodeFrame = true, // Print a code frame of input with context with errors?
    truncCodeFrame = false, // Trunc large input codes to just a few lines around the point of error?

    // You can override the logging functions
    $log = console.log,
    $warn = console.warn,
    $error = console.error,
  } = options;

  const tokenStorage = tokenStorageExternal || (collectTokens !== COLLECT_TOKENS_NONE ? [] : undefined);

  ASSERT(typeof input === 'string', 'input string should be string; ' + typeof input);
  ASSERT(targetEsVersion !== undefined, 'undefined should become default', targetEsVersion);
  ASSERT(typeof targetEsVersion === 'number', 'targetEsVersion should be a number', typeof targetEsVersion);
  ASSERT((targetEsVersion >= 6 && targetEsVersion <= 12) || targetEsVersion === Infinity, 'only support v6~12 (ES2015-ES2021) right now [' + targetEsVersion + ','+(typeof targetEsVersion)+']');

  const supportRegexPropertyEscapes = targetEsVersion >= 9 || targetEsVersion === Infinity;
  const supportRegexLookbehinds = targetEsVersion >= 9 || targetEsVersion === Infinity;
  const supportRegexDotallFlag = targetEsVersion >= 9 || targetEsVersion === Infinity;
  const supportRegexNamedGroups = targetEsVersion >= 9 || targetEsVersion === Infinity;
  const supportBigInt = targetEsVersion === 11 || targetEsVersion === Infinity;
  const supportNullishCoalescing = targetEsVersion === 11 || targetEsVersion === Infinity;
  const supportOptionalChaining = targetEsVersion === 11 || targetEsVersion === Infinity;
  const supportLogicCompound = targetEsVersion === 12 || targetEsVersion === Infinity;

  let pointer = 0;
  let len = input.length;

  let consumedNewlinesBeforeSolid = false; // whitespace newline token or string token that contained newline or multiline comment
  let nlwas = false; // basically the state of consumedNewlinesBeforeSolid before starting the current token
  let finished = false; // generated an $EOF?
  let lastOffset = pointer; // Value of `pointer` before starting to parse one token
  let startForError = 0;
  let lastType = 0;
  let lastStart = 0;
  let lastStop = 0;
  let lastLine = 0;
  let lastColumn = 0;
  let lastCanonizedInput = ''; // updated when parsing ident or string. Contains _unescaped_ input. Used for keyword checks and .value in ast for strings
  let lastCanonizedInputLen = 0; // work around an inline cache bug (lastCanonizedInput.length would cause megamorphic deopt for some reason)
  let lastPotentialRegexError = ''; // If regex scanner is an error then this is the message. Many errors require flag validation at the end.
  let lastReportableLexerError = ''; // Set whenever an $error is or will be returned

  let currentLine = 1; // the number of newlines, crlf sensitive (the pair is considered 1 line)
  let currentColOffset = 0; // position in the input code of the first character after the last newline

  let prevTokenEndColumn = 0;
  let prevTokenEndLine = 0;
  let prevTokenEndPointer = 0;
  let prevTokenSolid = true;

  let stale = false; // do NOT read from `cache` when `stale` is true. This is a dev-only assertion based safeguard...
  let cache = input.charCodeAt(0);

  let anyTokenCount = 0;
  let solidTokenCount = 0;

  function peek() {
    ASSERT(neof(), 'pointer not oob');
    ASSERT(!arguments.length, 'peek is not expecting args');
    ASSERT(cache === input.charCodeAt(pointer), 'cache should be up to date');

    return _readCache();
  }
  function ASSERT_peekUncached() {
    // You can use this even if stale=true
    ASSERT(pointer < len, 'never read oob');
    return input.charCodeAt(pointer);
  }
  function _readCache() {
    // _ALL_ reads for `cache` must go through this function. This way we can assert that it is not read when stale.
    ASSERT(stale === false, 'do NOT read from cache while it is stale ... (meaning the pointer got changed without updating the cache)');
    return cache;
  }
  function peekd(delta) {
    ASSERT(delta, 'jump should be at least something otehrwise use peek()');
    ASSERT(pointer + delta >= 0 && pointer + delta < len, 'pointer not oob');
    ASSERT(arguments.length === 1, 'one args');

    return input.charCodeAt(pointer + delta);
  }
  function peeky(ord) {
    ASSERT(neof(), 'pointer not oob');
    ASSERT(arguments.length === 1, 'one args');

    return peek() === ord;
  }

  function slice(from, to) {
    ASSERT(slice.length === arguments.length, 'arg count');
    ASSERT(typeof from === 'number', '`from` should be valid number', from, to);
    ASSERT(typeof to === 'number', '`to` should be valid number', from, to);
    ASSERT(from >= 0 && from <= len, '`from` should be valid index', from, to);
    ASSERT( to >= 0 && to <= len, '`to` should be valid index', from, to);

    return input.slice(from, to);
  }

  function ASSERT_skipPeek(c) {
    ASSERT(ASSERT_skipPeek.length === arguments.length, 'arg count');
    ASSERT(stale ? ASSERT_peekUncached() === c : peek() === c, 'expecting to skip a particular char', c, stale ? ASSERT_peekUncached() : peek());
    return skipPeek();
  }
  function skipPeek() {
    ASSERT(!arguments.length, 'no args');
    ASSERT(neofd(1), 'pointer should not read oob');

    ASSERT(!(stale = false), '(marking cache fresh so in devmode it wont throw when read)');
    return cache = input.charCodeAt(++pointer); // TODO: not unicode aware... should confirm this with unicode strings. and what about unicode identifiers?
  }

  function skip() {
    ASSERT(!arguments.length, 'no args');
    ASSERT(pointer < len, 'the pointer should not be oob yet, thats a bad smell');

    let p = ++pointer;
    if (pointer >= len) {
      ASSERT(stale = true, '(the cache is stale because we reached the end of the input. any code should check eof before reading the input)');
      cache = 0;
      return;
    }
    ASSERT(!(stale = false), '(marking cache fresh so in devmode it wont throw when read)');
    cache = input.charCodeAt(p);
  }
  function skipFastWithoutUpdatingCache() {
    // Use ASSERT_peekUncached() for peeking in dev assertions
    ASSERT(stale = true, '(marking the cache unsafe, any reads should throw in dev mode while stale)');
    ++pointer;
  }

  function eof() {
    return pointer >= len;
  }
  function eofd(d) {
    return pointer >= len - d;
  }
  function neof() {
    return pointer < len;
  }
  function neofd(d) {
    return pointer <= len - d;
  }

  // <SCRUB ASSERTS TO COMMENT>
  function ASSERT_skip(chr) { // these calls are replaced with skip() in a build step
    // note: consider this `skip()` in prod
    ASSERT(neof(), 'should not be oob before the skip');
    ASSERT(arguments.length === 1, 'require explicit char');
    ASSERT(peeky(chr), 'skip expecting different char', chr, peek());

    skip();
  }
  // </SCRUB ASSERTS TO COMMENT>

  function nextToken(lexerFlags) {
    ASSERT(nextToken.length === arguments.length, 'arg count');
    ASSERT(!finished, 'should not next() after eof token');

    if (prevTokenSolid) {
      // Do this at the start because otherwise something like `a \n b` would reset this when forward parsing `b` and
      // would cause `a` to be set to the wrong column data.
      prevTokenEndColumn = pointer - currentColOffset;
      prevTokenEndLine = currentLine;
      prevTokenEndPointer = pointer;
      prevTokenSolid = false;
    }

    lastPotentialRegexError = ''; // reset at start of a new token
    lastReportableLexerError = ''; // reset at start of a new token

    // These vars are relevant for between anything that gets location data in the AST
    do {
      ++anyTokenCount;
      let startCol = pointer - currentColOffset;
      let startRow = currentLine;
      lastCanonizedInput = '';
      lastCanonizedInputLen = 0;

      nlwas = consumedNewlinesBeforeSolid; // Do not include the newlines for the token itself unless whitespace (ex: `` throw `\n` ``)

      if (eof()) {
        createToken($EOF, pointer, pointer, startCol, startRow);
        finished = true;
        return returnSolidToken($EOF, pointer, pointer, startCol, startRow);
      }

      let start = startForError = pointer; // TODO: see if startForError makes a dent at all

      let consumedTokenType = jumpTableLexer(lexerFlags);
      ASSERT(consumedTokenType !== undefined, 'should not return undefined');
      ASSERT((consumedTokenType>>>0) > 0, 'enum does not have zero', consumedTokenType);

      // Non-whitespace tokens always get returned
      if (!isWhiteToken(consumedTokenType)) {
        createToken(consumedTokenType, start, pointer, startCol, startRow);
        return returnSolidToken(consumedTokenType, start, pointer, startCol, startRow);
      }

      // Babel parity demands comments to be returned... Not sure whether the complexity (over checking $white) is worth
      if (isCommentToken(consumedTokenType)) {
        if (returnTokens === RETURN_COMMENT_TOKENS) {
          createToken(consumedTokenType, start, pointer, startCol, startRow);
          return returnCommentToken(consumedTokenType, start, pointer, startCol, startRow);
        }
      }

      // This is a whitespace token (which may be a comment) that is not yet collected.
      if (collectTokens === COLLECT_TOKENS_ALL || collectTokens === COLLECT_TOKENS_TYPES) {
        createToken(consumedTokenType, start, pointer, startCol, startRow);
        tokenStorage.push(collectTokens === COLLECT_TOKENS_TYPES ? consumedTokenType : createBaseToken(consumedTokenType, start, pointer, startCol, startRow, false));
      }

      if (returnTokens === RETURN_ANY_TOKENS) {
        return createToken(consumedTokenType, start, pointer, startCol, startRow);
      }

      // At this point it has to be some form of whitespace and we're clearly not returning it so we can
      // safely skip any number of whitespaces, which are very likely to appear in sequence

      if (consumedTokenType === $COMMENT_SINGLE) {
        // Either this is EOF or the next token must be a newline
        if (collectTokens !== COLLECT_TOKENS_ALL && collectTokens !== COLLECT_TOKENS_TYPES) skipNewlinesWithoutTokens();
      } // do not `else`
      if (nlwas === true) {
        if (collectTokens !== COLLECT_TOKENS_ALL && collectTokens !== COLLECT_TOKENS_TYPES) skipSpacesWithoutTokens();
      }
    } while (true);

    ASSERT(false, 'unreachable');
  }
  function returnCommentToken(consumedTokenType, start, pointer, startCol, startRow) {
    ASSERT(returnCommentToken.length === arguments.length, 'arg count');
    ASSERT(typeof consumedTokenType === 'number', 'our types are nums');
    ASSERT(typeof start === 'number', 'our locs are nums');
    ASSERT(typeof pointer === 'number', 'our locs are nums');
    ASSERT(typeof startCol === 'number', 'our locs are nums');
    ASSERT(typeof startRow === 'number', 'our locs are nums');

    if (collectTokens === COLLECT_TOKENS_ALL || collectTokens === COLLECT_TOKENS_TYPES) {
      tokenStorage.push(collectTokens === COLLECT_TOKENS_TYPES ? consumedTokenType : createBaseToken(consumedTokenType, start, pointer, startCol, startRow, false));
    }
  }
  function returnSolidToken(consumedTokenType, start, pointer, startCol, startRow) {
    ASSERT(returnSolidToken.length === arguments.length, 'arg count');
    ASSERT(typeof consumedTokenType === 'number', 'our types are nums');
    ASSERT(typeof start === 'number', 'our locs are nums');
    ASSERT(typeof pointer === 'number', 'our locs are nums');
    ASSERT(typeof startCol === 'number', 'our locs are nums');
    ASSERT(typeof startRow === 'number', 'our locs are nums');

    ++solidTokenCount;
    if (collectTokens !== COLLECT_TOKENS_NONE) {
      tokenStorage.push(collectTokens === COLLECT_TOKENS_TYPES ? consumedTokenType : createBaseToken(consumedTokenType, start, pointer, startCol, startRow, consumedNewlinesBeforeSolid));
    }
    consumedNewlinesBeforeSolid = false;
    prevTokenSolid = true;
  }

  function skipSpacesWithoutTokens() {
    while (neof()) {
      let c = peek();
      if (c !== $$SPACE_20 && c !== $$TAB_09) return;
      skip();
    }
  }
  function skipNewlinesWithoutTokens() {
    while (neof()) {
      let c = peek();
      if (c === $$LF_0A) {
        skip();
        incrementLine();
      } else if (c === $$CR_0D) {
        skip();
        parseCR(); // crlf is relevant so skip carefully
      } else {
        return;
      }
    }
  }

  function jumpTableLexer(lexerFlags) {
    ASSERT(jumpTableLexer.length === arguments.length, 'arg count');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags bit flags', lexerFlags);
    ASSERT(pointer < len, 'pointer should not be oob here');

    // This creates one token of any kind that is valid in JS.
    // Take the first char, look it up in an array of 126 entries (aka jump table) and it tells you either the type
    // of the token that it must be, or a hint for the type of token that it may become.
    // Then either return the token type, or use the hint in a switch (the hint will be zero to n) and properly slice it

    let c = peek();
    skip();

    if (c > 0x7e) {
      return parseOtherUnicode(c);
    }

    let s = getTokenStart(c);
    if (s > MAX_START_VALUE) {
      // This means c must be a single char token, like `(` or `:`
      return s;
    }

    // It is important to note that each case is incremental from zero to n. This should lead to the switch being
    // optimized to a jump table with O(1) lookup. (TODO: verify this is the case. Add a test to prevent regressions.)
    switch (s) {
      case START_SPACE:
        return parseSpace();
      case START_ID:
        return parseIdentifierRest(String.fromCharCode(c), 1);
      case START_KEY:
        if ((lexerFlags & LF_NOT_KEYWORD) === LF_NOT_KEYWORD) return parseIdentifierRest(String.fromCharCode(c), 1);
        return parsePotentialKeywordTrieMap(c);
      case START_NL_SOLO:
        return parseNewlineSolo();
      case START_CR:
        return parseCR(); // cr crlf
      case START_STRING:
        return parseAnyString(c, lexerFlags);
      case START_DECIMAL:
        return parseDecimal();
      case START_DOT:
        return parseLeadingDot();
      case START_CURLY_CLOSE:
        if ((lexerFlags & LF_IN_TEMPLATE) === LF_IN_TEMPLATE) return parseTemplateString(lexerFlags, PARSING_SANS_TICK);
        return $PUNC_CURLY_CLOSE;
      case START_EQ:
        return parseEqual(); // = == === =>
      case START_DIV:
        return parseFwdSlash(lexerFlags); // / /= //.. /*..*/
      case START_PLUS:
        return parseSameOrCompound($$PLUS_2B); // + ++ +=
      case START_MIN:
        return parseDash(); // - -- -= -->
      case START_ZERO:
        return parseLeadingZero(lexerFlags);
      case START_TEMPLATE:
        return parseTemplateString(lexerFlags, PARSING_FROM_TICK);
      case START_EXCL:
        return parseExcl(); // != !==
      case START_PERCENT:
        return parseCompoundAssignment($$PERCENT_25); // % %=
      case START_AND:
        return parseSameOrCompound($$AND_26); // & && &=
      case START_STAR:
        return parseStar(); // * *= ** **=
      case START_CARET:
        return parseCompoundAssignment($$XOR_5E); // ^ ^=
      case START_LT:
        return parseLt(); // < << <= <<= <!--
      case START_GT:
        return parseGtPunctuator(); // > >> >>> >= >>= >>>=
      case START_OR:
        return parseSameOrCompound($$OR_7C); // | || |=
      case START_BSLASH:
        return parseBackslash(); // An ident that starts with a unicode escape can be valid
      case START_QMARK:
        return parseQmark();
    }

    THROW('Unknown input', pointer - 1, pointer);
  }

  function incrementLine() {
    ASSERT(incrementLine.length === arguments.length, 'arg count');

    // Call this function AFTER consuming the newline(s) that triggered it
    ASSERT(pointer > 0 && input.charCodeAt(pointer-1) === $$CR_0D || isLfPsLs(input.charCodeAt(pointer-1)), 'should have just consumed a newline');

    consumedNewlinesBeforeSolid = true;
    ++currentLine;
    currentColOffset = pointer;
  }

  function addAsi() {
    // are asi's whitespace? i dunno. they're kinda special so maybe.
    // put it _before_ the current token (that should be the "offending" token)
    if (collectTokens !== COLLECT_TOKENS_NONE) {
      // createToken($ASI, pointer, pointer, pointer - currentColOffset, currentLine);
      tokenStorage.push(collectTokens === COLLECT_TOKENS_TYPES ? $ASI : createBaseToken($ASI, pointer, pointer, pointer - currentColOffset, currentLine, false), tokenStorage.pop());
    }
    ++anyTokenCount;
    ++solidTokenCount; // eh... i guess.
    prevTokenSolid = true;
  }

  function createToken(type, start, stop, column, line) {
    ASSERT(createToken.length === arguments.length, 'arg count');
    ASSERT(ALL_TOKEN_TYPES.includes(type) || console.log('####\n' + getErrorContext(start, stop, 'bad type')), 'the set of generated token types is fixed. New ones combinations should be part of this set');
    ASSERT(Number.isFinite(start), 'start finite');
    ASSERT(Number.isFinite(stop), 'stop finite');
    ASSERT(Number.isFinite(column), 'col finite');
    ASSERT(Number.isFinite(line), 'line finite');
    ASSERT(typeof type === 'number', 'type is enum');

    ASSERT(typeof lastCanonizedInput !== 'string' || lastCanonizedInput.length === lastCanonizedInputLen, 'the len cache should be equal to the canonized string len itself (thats the point)');

    lastType = type;
    lastStart = start;
    lastStop = stop;
    lastLine = line;
    lastColumn = column;
  }
  function createBaseToken(type, start, stop, column, line, nl) {
    ASSERT(createBaseToken.length === arguments.length, 'arg count');
    ASSERT(typeof type === 'number', 'our types are nums');
    ASSERT(typeof start === 'number', 'our locs are nums');
    ASSERT(typeof stop === 'number', 'our locs are nums');
    ASSERT(typeof column === 'number', 'our locs are nums');
    ASSERT(typeof line === 'number', 'our locs are nums');
    ASSERT(typeof nl === 'boolean', 'nl is or is not');

    if (babelTokenCompat) {
      return {
        type,
        start,
        stop, // start of next token
        loc: { // Tenko does not use this
          start: {
            line: line,
            column: column,
          },
          end: {
            line: currentLine,
            column: currentColOffset,
          },
        },
        column, // of first char of token (we still have to set this as Tenko uses this)
        line, // of first char of token (we still have to set this as Tenko uses this)
      };
    }

    return {
      type,
      start,
      stop, // start of next token
      column, // of first char of token
      line, // of first char of token
      nl, // If true, this was a non-whitespace token, and there was a newline between this and the previous one
    };
  }

  function parseLeadingDot() {
    if (eof()) return $PUNC_DOT; // will lead to an error in the parser

    let c = peek();

    if (c === $$DOT_2E) {
      return parseTripleDot();
    }

    if (isAsciiNumber(c)) {
      return parseNumberFromDot(c);
    }

    return $PUNC_DOT;
  }
  function parseTripleDot() {
    // we just parsed a dot
    if (peekd(1) === $$DOT_2E) {
      ASSERT_skip($$DOT_2E);
      ASSERT_skip($$DOT_2E);
      return $PUNC_DOT_DOT_DOT;
    } // the else will ultimately lead to an error in the parser
    return $PUNC_DOT_DOT_DOT;
  }
  function parseNumberFromDot(c) {
    ASSERT_skip(c);
    if (neof()) {
      let d = skipDigitsWithSeparators(true);
      parseExponentMaybe(d);
    }
    verifyCharAfterNumber();
    return $NUMBER_DEC;
  }

  function parseSpace() {
    // For non-minified code it is very likely that a space is followed by another space
    return $SPACE;
  }
  function parseCR() {
    if (neof() && peeky($$LF_0A)) {
      ASSERT_skip($$LF_0A);
      incrementLine();
      return $NL_CRLF;
    }
    incrementLine();
    return $NL_SOLO;
  }

  function parseAnyString(marker, lexerFlags) {
    ASSERT(parseAnyString.length === arguments.length, 'need 3 args');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');

    let pointerOffset = pointer;
    let badEscape = false;
    let hadNewline = false;

    while (neof()) {

      // Peek: while we will want to consume at least one more byte for proper strings,
      // there could be a malformed string and we wouldnt want to consume the newline
      let c = peek();

      let s = getStringPart(c);
      if (s <= MAX_START_VALUE) {
        // This means c must be a single char token, like `(` or `:`

        // Note: these cases should be ordered 0, 1, 2 ...
        // TODO: we can skip() before the loop if we update the backslash consumer
        switch (s) {
          case STRING_PART:
            ASSERT_skip(c);
            break;

          case STRING_QUOTE:
            ASSERT_skip(c);
            if (c === marker) {
              if (badEscape) {
                if (!lastReportableLexerError) lastReportableLexerError = 'String had an illegal escape';
                return $ERROR;
              }

              // Note: LF and PS are newlines that are _explicitly_ allowed in a string, so only check for LF and CR here
              if (hadNewline) {
                if (!lastReportableLexerError) lastReportableLexerError = 'Encountered newline in string which is not allowed';
                return $ERROR;
              }

              lastCanonizedInput += slice(pointerOffset, pointer - 1);
              lastCanonizedInputLen += (pointer - 1) - pointerOffset;

              return marker === $$DQUOTE_22 ? $STRING_DOUBLE : $STRING_SINGLE;
            }
            break;

          case STRING_BS:
            lastCanonizedInput += slice(pointerOffset, pointer);
            lastCanonizedInputLen += pointer - pointerOffset;
            // The canonized value will be updated too
            badEscape = parseStringOrTemplateEscape(lexerFlags, NOT_TEMPLATE) === BAD_ESCAPE || badEscape;
            pointerOffset = pointer;

            break;

          case STRING_UNICODE:
            ASSERT_skip(c);
            if (c <= $$LS_2029 && c >= $$PS_2028) {
              // (Increment after consumption as that's what incrementLine expects and asserts)
              // Note: this is not an error but it does increase the line counter
              incrementLine();
            }
            break;

          case STRING_NL:
            ASSERT_skip(c);
            hadNewline = true;
            break;

          // <SCRUB ASSERTS>
          default:
            ASSERT(false, 'unreachable', c);
          // </SCRUB ASSERTS>
        }
      }
    }

    ASSERT(eof(), 'this is only reachable in the early EOF case');
    if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed string at EOF';
    return $ERROR;
  }
  function parseStringOrTemplateEscape(lexerFlags, forTemplate) {
    ASSERT(arguments.length === parseStringOrTemplateEscape.length, 'need args');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');

    ASSERT_skip($$BACKSLASH_5C);
    if (eof()) {
      // You cant escape eof ;)
      if (!lastReportableLexerError) lastReportableLexerError = 'Backslash at end of input';
      return BAD_ESCAPE;
    }

    // we need to consume at least one char here
    let c = peek();
    skip();

    let s = c > 0x7e ? STRING_ESC_UNICODE : stringEscapeStartJumpTable[c];

    // note: the parser only really cares about \u and \x. it needs no extra work for \t \n etc
    // note: it _does_ need to take care of escaped digits
    switch(s) {
      case STRING_ESC_OK:
        // we can ignore this escape. treat it as a single char escape.
        lastCanonizedInput += String.fromCharCode(c);
        ++lastCanonizedInputLen; // Always 1 char
        return GOOD_ESCAPE;

      case STRING_ESC_N:
        lastCanonizedInput += '\n';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_SQ:
        lastCanonizedInput += '\'';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_DQ:
        lastCanonizedInput += '"';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_U: {
        if (eof()) return BAD_ESCAPE;
        let r = parseUnicodeEscapeForNonRegex();
        if (r === ILLEGAL_UNICODE_ESCAPE) return BAD_ESCAPE;
        lastCanonizedInput += r > 0xffff ? String.fromCodePoint(r) : String.fromCharCode(r);
        lastCanonizedInputLen += r > 0xffff ? 2 : 1;
        return GOOD_ESCAPE;
      }

      case STRING_ESC_X:
        return parseStringEscapeHex();

      case STRING_ESC_UNICODE:
        if (c === $$PS_2028 || c === $$LS_2029) {
          incrementLine();
          return GOOD_ESCAPE;
        }
        lastCanonizedInput += String.fromCharCode(c);
        ++lastCanonizedInputLen; // Always 1 char
        return GOOD_ESCAPE;

      case STRING_ESC_T:
        lastCanonizedInput += '\t';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_R:
        lastCanonizedInput += '\r';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_CR:
        // Line continuation. Does not add anything to `lastCanonizedInput`
        // Edge case: `\crlf` is a valid line continuation
        if (neof() && peeky($$LF_0A)) ASSERT_skip($$LF_0A);
        incrementLine();
        return GOOD_ESCAPE;

      case STRING_ESC_LF:
        // Line continuation. Does not add anything to `lastCanonizedInput`
        incrementLine();
        return GOOD_ESCAPE;

      case STRING_ESC_0:
      case STRING_ESC_123456789:
        return parseStringEscapeOctalOrDigit(c, forTemplate, lexerFlags);

      case STRING_ESC_B:
        lastCanonizedInput += '\b';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_F:
        lastCanonizedInput += '\f';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      case STRING_ESC_V:
        lastCanonizedInput += '\v';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;

      // <SCRUB ASSERTS>
      default:
        return ASSERT(false, 'unreachable', c);
      // </SCRUB ASSERTS>
    }
  }

  function skipZeroes() {
    ASSERT(neof(), 'should already been checked');

    let c = peek();
    while (c === $$0_30) {
      ASSERT_skip($$0_30);
      if (eof()) return 0;
      c = peek();
    }
    return c;
  }
  function parseStringEscapeHex() {
    if (eofd(1)) {
      if (eof()) return GOOD_ESCAPE; // Let it error somewhere else
      if (!lastReportableLexerError) lastReportableLexerError = 'Not enough of input left to create valid hex escape';
      return BAD_ESCAPE;
    }
    let a = peek();
    let b = peekd(1);

    let va = getHexValue(a);
    let vb = getHexValue(b);

    // confirm they are both hex digits
    if ((va | vb) >= HEX_OOB) {
      // '\xz' should have 'xz' as canonized value
      lastCanonizedInput += 'x';
      ++lastCanonizedInputLen;
      if (!lastReportableLexerError) lastReportableLexerError = 'At least one of the two hex characters were not hex character (0-9a-f)';
      return BAD_ESCAPE;
    }

    // okay, _now_ consume them
    ASSERT_skip(a);
    ASSERT_skip(b);
    lastCanonizedInput += String.fromCharCode((va << 4) | vb);
    ++lastCanonizedInputLen; // Always 1 char
    return GOOD_ESCAPE;
  }
  function parseStringEscapeOctalOrDigit(a, forTemplate, lexerFlags) {
    ASSERT(arguments.length === parseStringEscapeOctalOrDigit.length, 'need args');
    ASSERT(typeof a === 'number', 'first digit ord');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');

    // \8 and \9 are never allowed in strings. Tagged templates the exception of course.
    // > SingleStringCharacter -> `\` EscapeSequence -> CharacterEscapeSequence -> NonEscapeCharacter ->
    // >   SourceCharacter but not one of EscapeCharacter or LineTerminator -> (EscapeCharacter:) DecimalDigit -> 0123456789

    if (a === $$8_38 || a === $$9_39) {
      if (!lastReportableLexerError) lastReportableLexerError = 'The grammar does not allow to escape the 8 or the 9 character';
      return BAD_ESCAPE;
    }

    if (eof()) return GOOD_ESCAPE; // Will error somewhere else
    let b = peek();

    // If this is valid, this leads to a LegacyOctalEscapeSequence

    // Octals are only supported in web compat, sloppy mode, and only in strings
    // In web compat, \1 ~ \7 are considered start of an octal escape. \8 and \9 are illegal regardless.
    // Otherwise, \1~\9 are illegal through CharacterEscapeSequence -> NonEscapeCharacter -> "SourceCharacter but not
    // one of EscapeCharacter or LineTerminator" -> EscapeCharacter -> DecimalDigit

    // There is a nasty edge case regarding nul (zero byte); In sloppy webcompat mode the nul escape may be followed by
    // an 8 or 9 and still be a valid nul. In other modes and templates, `\08` and `\09` are considered syntax errors.

    // Strings: octal escapes are only supported in sloppy mode with web compat enabled
    // Template literals: explicitly do never support octal escapes so trigger a syntax error in the parser
    // Tagged templates: are allowed to have bad escapes although they will cause `.value` to be `null` in the AST
    // (Note that we do not know here whether the template will be tagged or just a literal, so just return BAD_ESCAPE)

    if (webCompat === WEB_COMPAT_OFF || forTemplate || (lexerFlags & LF_STRICT_MODE) === LF_STRICT_MODE) {
      // If octals are invalid, then the nul escape can not be followed by 8 or 9 either
      // Note: in templates, octals are never valid escapes so `\08` is always a bad escape regardless of mode
      if (a === $$0_30 && (b < $$0_30 || b > $$9_39)) {
        // [v]: `"\0"`
        // [v]: `"\0x"`
        // \0 is not an octal escape, it's a nul, but whatever
        lastCanonizedInput += '\0';
        ++lastCanonizedInputLen;
        return GOOD_ESCAPE;
      }

      // [v]: `"\07"`
      // [v]: `"\08"`
      // [v]: `"\09"`

      if (forTemplate) {
        if (!lastReportableLexerError) lastReportableLexerError = 'Illegal legacy octal escape in template, where octal escapes are never allowed';
      } else if ((lexerFlags & LF_STRICT_MODE) === LF_STRICT_MODE) {
        if (!lastReportableLexerError) lastReportableLexerError = 'Illegal legacy octal escape in strict mode';
      } else {
        ASSERT(webCompat === WEB_COMPAT_OFF);
        if (!lastReportableLexerError) lastReportableLexerError = 'Octal escapes are only allowed in sloppy mode with web compat enabled';
      }
      return BAD_ESCAPE;
    }

    // If octals are allowed then the nul escape may be followed by 8 or 9
    if (a === $$0_30 && (b < $$0_30 || b > $$7_37)) {
      // [v]: `"\0"`
      // [v]: `"\0x"`
      // [v]: `"\07"`
      // [v]: `"\08"`
      // [v]: `"\09"`
      // \0 is not an octal escape, it's a nul, but whatever
      // In web compat mode the following char can be 8 and 9 according to the extended syntax
      lastCanonizedInput += '\0';
      ++lastCanonizedInputLen;
      return GOOD_ESCAPE;
    }

    if (b < $$0_30 || b > $$7_37) {
      // Max valid octal escape is 0377 so if a >= 4 then it's max 2 digits so we can return now
      lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a), 8));
      ++lastCanonizedInputLen; // Always 1 char
      return GOOD_ESCAPE;
    }

    ASSERT_skip(b);
    if (eof()) return GOOD_ESCAPE; // Will error somewhere else
    if (a > $$3_33) {
      // Max valid octal escape is 0377 so if a >= 4 then it's max 2 digits so we can return now
      lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a, b), 8));
      ++lastCanonizedInputLen; // Always 1 char
      return GOOD_ESCAPE;
    }

    let c = peek();
    if (c < $$0_30 || c > $$7_37) {
      lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a, b), 8));
      ++lastCanonizedInputLen; // Always 1 char
      return GOOD_ESCAPE;
    }

    ASSERT_skip(c);
    lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a, b, c), 8));
    ++lastCanonizedInputLen; // Always 1 char
    return GOOD_ESCAPE;
  }

  function parseDash() {
    // The first dash is already consumed
    // This parses into
    // - minus (either op or unary)
    // - update (`--`)
    // - compound assignment (`-=`)
    // - html comment (`-->`)

    if (parsingGoal === GOAL_SCRIPT && webCompat === WEB_COMPAT_ON && !eofd(1) && peeky($$DASH_2D) && peekd(1) === $$GT_3E) {
      // https://tc39.github.io/ecma262/#sec-html-like-comments
      // This extension is not allowed when parsing source code using the goal symbol Module
      // There are two valid ways of closing html comment;
      // - <a multi-line comment that contains at least one newline> <space>* <html close>
      // - <newline> <space>* <html close>
      // TODO: and properly parse this, not like the duplicate hack it is now
      if (consumedNewlinesBeforeSolid === true) {
        return parseCommentHtmlClose();
      } else {
        // Note that the `-->` is not picked up as a comment since that requires a newline to precede it.
        // TODO: do we report this anywhere? This isn't an error but most likely end up being one
      }
    }
    return parseSameOrCompound($$DASH_2D); // - -- -=
  }

  function parseSameOrCompound(c) {
    ASSERT(parseSameOrCompound.length === arguments.length, 'arg count');
    ASSERT(c === $$PLUS_2B || c === $$DASH_2D || c === $$AND_26 || c === $$OR_7C, 'parseSameOrCompound c is enum');

    // `c` is an op, one of: `+`, `&`, `|`, `-`. The dash case already confirmed this is not `-->`.
    // c cc c=

    if (neof()) {
      let d = peek();
      if (d === c) {
        ASSERT_skip(c); // @@
        switch (c) {
          case $$PLUS_2B:
            return $PUNC_PLUS_PLUS;
          case $$DASH_2D:
            return $PUNC_MIN_MIN;
          case $$AND_26:
            if (neof() && peeky($$IS_3D)) {
              ASSERT_skip($$IS_3D);
              if (supportLogicCompound) return $PUNC_AND_AND_EQ;
              return THROW('The logical compound operator (`&&=`) is only supported since ES2021, currently targeting a lower version', pointer - 3, pointer);
            }
            return $PUNC_AND_AND;
          case $$OR_7C:
            if (neof() && peeky($$IS_3D)) {
              ASSERT_skip($$IS_3D);
              if (supportLogicCompound) return $PUNC_AND_AND_EQ;
              return THROW('The logical compound operator (`||=`) is only supported since ES2021, currently targeting a lower version', pointer - 3, pointer);
            }
            return $PUNC_OR_OR;
          // <SCRUB ASSERTS>
          default:
            return ASSERT(false, 'unreachable, c is one of four enum', c);
          // </SCRUB ASSERTS>
        }
      }
      if (d === $$IS_3D) {
        ASSERT_skip($$IS_3D); // @=
        switch (c) {
          case $$PLUS_2B:
            return $PUNC_PLUS_EQ;
          case $$DASH_2D:
            return $PUNC_MIN_EQ;
          case $$AND_26:
            return $PUNC_AND_EQ;
          case $$OR_7C:
            return $PUNC_OR_EQ;
          // <SCRUB ASSERTS>
          default:
            return ASSERT(false, 'unreachable, c is one of four enum', c);
          // </SCRUB ASSERTS>
        }
      }
    }
    switch (c) {
      case $$PLUS_2B:
        return $PUNC_PLUS;
      case $$DASH_2D:
        return $PUNC_MIN;
      case $$AND_26:
        return $PUNC_AND;
      case $$OR_7C:
        return $PUNC_OR;
      // <SCRUB ASSERTS>
      default:
        return ASSERT(false, 'unreachable, c is one of four enum', c);
      // </SCRUB ASSERTS>
    }
  }

  function parseTemplateString(lexerFlags, fromTick) {
    // parseTick
    ASSERT(arguments.length === 2, 'need 2 args');
    ASSERT(typeof lexerFlags === 'number', 'lexerFlags number');

    // https://tc39.github.io/ecma262/#prod-CodePoint
    // "A conforming implementation must not use the extended definition of EscapeSequence described in B.1.2 when parsing a TemplateCharacter."

    // Since ES9 a _tagged_ tick literal can contain illegal escapes. Regular template strings must still conform.
    // The $G_TICK_BAD_ESCAPE type bit is set for template tokens that have such a bad escape (`isBadTickToken(type)`)

    // - `...`                         // "pure", no expression components
    // - `...${expr}...`               // tick_head and tick_tail, no body
    // - `...${expr}...${expr}...`     // tick_head, tick_body (the middle part), and tick_tail

    lastOffset = pointer;
    let badEscapes = false;
    while (neof()) {
      // while we will want to consume at least one more byte for proper strings,
      // there could be a malformed string and we wouldnt want to consume the newline
      let c = peek();
      // do ${ first, that way we can just use the peeked char in case it's a dud, without revisiting
      while (c === $$$_24) {
        ASSERT_skip($$$_24);
        if (eof()) {
          if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed template string';
          lastCanonizedInput += slice(lastOffset, pointer);
          lastCanonizedInputLen += pointer - lastOffset;
          return $ERROR;
        }
        c = peek();

        if (c === $$CURLY_L_7B) {
          lastCanonizedInput += slice(lastOffset, pointer - 1);
          lastCanonizedInputLen += (pointer - 1) - lastOffset;
          ASSERT_skip($$CURLY_L_7B);
          return badEscapes ? (fromTick ? $TICK_BAD_HEAD : $TICK_BAD_BODY) : (fromTick ? $TICK_HEAD : $TICK_BODY);
        }
      }

      if (c === $$TICK_60) {
        lastCanonizedInput += slice(lastOffset, pointer);
        lastCanonizedInputLen += pointer - lastOffset;
        ASSERT_skip($$TICK_60);
        return badEscapes ? (fromTick ? $TICK_BAD_PURE : $TICK_BAD_TAIL) : (fromTick ? $TICK_PURE : $TICK_TAIL);
      }

      if (c === $$CR_0D) {
        ASSERT_skip($$CR_0D);
        // crlf is considered one line for the sake of reporting line-numbers
        if (neof() && peeky($$LF_0A)) {
          ASSERT_skip($$LF_0A);
        }
        incrementLine();
      } else if (isLfPsLs(c)) {
        ASSERT_skip(c);
        incrementLine();
      } else if (c === $$BACKSLASH_5C) {
        lastCanonizedInput += slice(lastOffset, pointer);
        lastCanonizedInputLen += pointer - lastOffset;
        badEscapes = parseStringOrTemplateEscape(lexerFlags, FOR_TEMPLATE) === BAD_ESCAPE || badEscapes;
        lastOffset = pointer;
      } else {
        ASSERT_skip(c);
      }
    }

    lastCanonizedInput += slice(lastOffset, pointer);
    lastCanonizedInputLen += pointer - lastOffset;
    if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed template literal';
    return $ERROR;
  }

  function verifyCharAfterNumber() {
    // Must verify that the character immediately following this number
    // https://tc39.es/ecma262/#sec-literals-numeric-literals
    // (See foot note)
    // > The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
    // So `3in x` is an explicit example that should be considered a syntax error.
    if (eof()) return;
    let c = peek();
    if (
      // I think some heuristics could make this check easier to grok?
      // c !== $$SPACE_20 && c!== $$SEMI_3B &&
      (
        isIdentStart(c, 0) !== INVALID_IDENT_CHAR || // IdentifierStart, `3in`, `5instanceof` `0x33in`
        (c >= $$0_30 && c <= $$9_39)                        // DecimalDigit, not even sure about an example
      )
    ) {
      // TODO: improve semantic errors (change the error output and see what tests change). For example, using digits >1 for binary notation, or `n` when bigint is not supported, or E without an actual exponent value
      return THROW('Found `' + String.fromCharCode(c) + '`. It is not legal for an ident or number token to start after a number token without some form of separation', pointer, pointer);
    }
  }

  function parseLeadingZero(lexerFlags) {
    let r = _parseLeadingZero(lexerFlags);
    if (r !== $ERROR) verifyCharAfterNumber();
    return r;
  }
  function _parseLeadingZero(lexerFlags) {
    // - `0`
    // - `0.`       Dot can trail
    // - `0.0`
    // - `0e1`      Exponent
    // - `0E1`      Capital is ok too
    // - `0x1`      Hex
    // - `0X1`
    // - `0b1`      Binary
    // - `0B1`
    // - `0o1`      Octal
    // - `0O1`
    // - `0n`       Bigint

    if (eof()) return $NUMBER_DEC;

    // peek here. the next character can easily not be part of this token
    let c = peek();

    if (isAsciiNumber(c)) {
      skip();
      if (neof()) skipDigits(); // Do not allow underscores here

      if ((lexerFlags & LF_STRICT_MODE) === LF_STRICT_MODE) {
        if (!lastReportableLexerError) lastReportableLexerError = '"Illegal" octal escape in strict mode';
        return $ERROR;
      }

      if (neof()) {
        let e = peek();
        if (e === $$E_UC_45 || e === $$E_65) {
          if (!lastReportableLexerError) lastReportableLexerError = 'An exponent is not allowed after a legacy octal number and an ident after number must be separated by some whitespace so this is an error';
          return $ERROR;
        }

        if (e === $$N_6E) {
          if (!supportBigInt) {
            return THROW('BigInt suffix is not supported on legacy octals; use the `0o` prefix notation for that', startForError, pointer + 1);
          }
        }

        // The dot may still lead to valid (though obscure) code: `01.foo` is the same as `1..foo`
        // if (e === $$DOT_2E) {
        //   if (!lastReportableLexerError) lastReportableLexerError = 'A dot fraction is not allowed after a legacy number octal';
        //   return $ERROR;
        // }
      }

      return $NUMBER_OLD;
    }

    if (c === $$DOT_2E) {
      parseFromFractionDot();
      return $NUMBER_DEC;
    }

    if (c === $$X_78 || c === $$X_UC_58) {
      ASSERT_skip(c);
      return parseHex();
    }

    if (c === $$O_6F || c === $$O_UC_4F) {
      ASSERT_skip(c);
      return parseOctal();
    }

    if (c === $$B_62 || c === $$B_UC_42) {
      ASSERT_skip(c);
      return parseBinary();
    }

    if (c === $$E_65|| c === $$E_UC_45) {
      parseExponentMaybe(c);
      return $NUMBER_DEC;
    }

    if (c === $$N_6E) {
      // [v] `0n`
      if (!supportBigInt) {
        return THROW('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion + ')', startForError, pointer + 1);
      }
      ASSERT_skip($$N_6E);
      return $NUMBER_BIG_DEC;
    }

    // Just a zero
    return $NUMBER_DEC;
  }
  function parseDecimal() {
    // Start parsing from 1-9 (so cannot have started with a dot or zero)
    if (eof()) {
      // verifyCharAfterNumber(); // No need ;)
      return $NUMBER_DEC;
    }

    // https://github.com/tc39/proposal-numeric-separator/blob/main/spec.md
    // Every two digits can have at most one underscore between them. They are not allowed in other positions.
    // Numeric separators are not allowed in legacy octals (but are in any other type of number).

    // optionally skip digits now. we dont care if that actually happens (we already know there was at least one)
    let c = skipDigitsWithSeparators(true);
    if (eof()) {
      // verifyCharAfterNumber(); // No need ;)
      return $NUMBER_DEC;
    }

    // optional fraction
    if (c === $$DOT_2E) {
      parseFromFractionDot();

      verifyCharAfterNumber();
      return $NUMBER_DEC;
    }

    if (c === $$N_6E) {
      // BigInt (ES2020 / ES11)
      // [v] `5464354354353n`
      if (!supportBigInt) {
        return THROW('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion + ')', startForError, pointer);
      }

      ASSERT_skip($$N_6E);

      verifyCharAfterNumber();
      return $NUMBER_BIG_DEC;
    }

    parseExponentMaybe(c);

    verifyCharAfterNumber();
    return $NUMBER_DEC;
  }
  function skipDigitsWithSeparators(canStartWithSeparator) {
    // This function skips digits and allows at most one underscore between two digits.
    // If an underscore is encountered then another digit MUST follow.
    // canStartWithSeparator indicates whether the caller already validated at least one digit
    // The numeric separator is not allowed next to `0b`, `0x`, or `0o`, nor next to the dot, `e`, `E`, or `n`.
    // So: just between two digits :)

    let c = peek();

    if (canStartWithSeparator) {
      while (c === $$LODASH_5F) {
        ASSERT_skip($$LODASH_5F);
        if (eof()) return THROW('A numeric separator must be preceded and followed by a digit, EOF is not valid', startForError, pointer);
        c = peek();

        if (!isAsciiNumber(c)) {
          return THROW('A numeric separator must be preceded and followed by a digit, found a different character', startForError, pointer);
        }

        ASSERT_skip(c);
        if (eof()) {
          return 0;
        }
        c = peek();
      }
    }

    while (isAsciiNumber(c)) {
      ASSERT_skip(c);
      if (eof()) {
        // monomorphism but meh. caller should check EOF state before using return value
        return 0;
      }
      c = peek();

      // Every digit may be followed by one underscore, which must then be followed by at least one more digit.
      if (c === $$LODASH_5F) {
        ASSERT_skip($$LODASH_5F);
        if (eof()) return THROW('A numeric separator must be preceded and followed by a digit, EOF is not valid', startForError, pointer);
        c = peek();

        if (!isAsciiNumber(c)) {
          return THROW('A numeric separator must be preceded and followed by a digit, found a different character', startForError, pointer);
        }

        ASSERT_skip(c);
        if (eof()) {
          return 0;
        }
        c = peek();
      }
    }

    return c;
  }
  function skipDigits() {
    // Does not parse underscores (!). Used for legacy octal, for example.
    let c = peek();
    while (isAsciiNumber(c)) {
      ASSERT_skip(c);
      if (eof()) return 0; // monomorphism but meh. caller should check EOF state before using return value
      c = peek();
    }
    return c;
  }
  function parseExponentMaybe(c) {
    // this part is a little tricky. if an `e` follows, an optional +- may follow but at least one digit must follow regardless
    // note that if we parse anything at all, it will be at least two bytes (hence the len-1 part)

    if (c !== $$E_65 && c !== $$E_UC_45) return;

    if (eofd(1)) return; // Need at least two more chars, a number cannot end with an `e`

    // A number can not end with `e`
    let d = peekd(1);

    if (d === $$DASH_2D || d === $$PLUS_2B) {
      // A number can not end with `e+`
      if (eofd(2)) return; // we cant parse an exponent. the parser will deal with the inevitable error

      let e = peekd(2);

      if (!isAsciiNumber(e)) return; // We just wasted two peeks. But it'll lead to a syntax error, so who cares :)

      // ok, we've confirmed the exponent part is legit. consume the peeks.
      ASSERT(peek() === $$E_65 || peek() === $$E_UC_45, 'should skip an e');
      skipFastWithoutUpdatingCache();

      // Skip the sign
      ASSERT(ASSERT_peekUncached() === $$DASH_2D || ASSERT_peekUncached() === $$PLUS_2B, 'should skip + or -', ASSERT_peekUncached());
      skipFastWithoutUpdatingCache();

      skip();

      if (eof()) return;

      // Apparently the exponent can also have numerical separators (because why not)
      skipDigitsWithSeparators(true);

      return;
    }

    if (!isAsciiNumber(d)) return; // We just wasted a peek. But it'll lead to a syntax error, so who cares :)

    // ok, we've confirmed the exponent part is legit. consume the peeks.
    ASSERT(peek() === $$E_65 || peek() === $$E_UC_45, 'should skip an e');
    skipFastWithoutUpdatingCache();

    skip();

    if (eof()) return;

    skipDigitsWithSeparators(true);
  }
  function parseFromFractionDot() {
    ASSERT_skip($$DOT_2E);
    // optionally skip digits now. we dont care if that actually happens. trailing dot is allowed on decimals
    if (eof()) return;

    let c = skipDigitsWithSeparators(false); // No need to check EOF. If `c` is not `e` or `E` then it stops anyways.
    parseExponentMaybe(c);
  }
  function parseHex() {
    if (eof()) {
      if (!lastReportableLexerError) lastReportableLexerError = '`0x` is illegal without a digit';
      return $ERROR;
    }

    // at least one digit is required
    let c = peek();

    const cv = getHexValue(c);
    if (cv === HEX_OOB) {
      if (!lastReportableLexerError) lastReportableLexerError = '`0x` is illegal without a digit';
      return $ERROR;
    }

    ASSERT_skip(c);

    do {
      if (eof()) return $NUMBER_HEX;

      c = peek();

      if (c === $$LODASH_5F) {
        ASSERT_skip($$LODASH_5F);
        if (eof()) {
          return THROW('A numeric separator must be preceded and followed by a digit, EOF is not valid', startForError, pointer);
        }
        c = peek();

        const cv = getHexValue(c);
        if (cv === HEX_OOB) {
          return THROW('A numeric separator must be preceded and followed by a digit, found a different character', startForError, pointer);
        }
      } else {
        const cv = getHexValue(c);
        if (cv === HEX_OOB) {
          break;
        }
      }

      ASSERT_skip(c);
    } while (true);

    if (c === $$N_6E) {
      // BigInt (ES2020 / ES11)
      // [v] `0x54a643D54354353n`
      if (!supportBigInt) {
        return THROW('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion + ')', startForError, pointer + 1);
      }
      ASSERT_skip($$N_6E);
      return $NUMBER_BIG_HEX;
    }

    // TODO: we could fairly easily/cheaply get the value here...
    return $NUMBER_HEX;
  }
  function parseOctal() {
    if (eof()) {
      if (!lastReportableLexerError) lastReportableLexerError = '`0o` is illegal without a digit';
      return $ERROR;
    }

    // at least one digit is required
    let c = peek();
    if (!isOctal(c)) {
      if (!lastReportableLexerError) lastReportableLexerError = '`0o` is illegal without a digit';
      return $ERROR;
    }
    ASSERT_skip(c);

    do {
      if (eof()) return $NUMBER_OCT;
      c = peek();

      if (c === $$LODASH_5F) {
        ASSERT_skip($$LODASH_5F);
        if (eof()) {
          return THROW('A numeric separator must be preceded and followed by a digit, EOF is not valid', startForError, pointer);
        }
        c = peek();

        if (!isOctal(c)) {
          return THROW('A numeric separator must be preceded and followed by a digit, found a different character', startForError, pointer);
        }
      } else {
        if (!isOctal(c)) break;
      }
      ASSERT_skip(c);
    } while (true);

    if (c === $$N_6E) {
      // BigInt (ES2020 / ES11)
      // [v] `0o0043175346024n`
      if (!supportBigInt) {
        return THROW('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion + ')', startForError, pointer + 1);
      }
      ASSERT_skip($$N_6E);
      return $NUMBER_BIG_OCT;
    }

    return $NUMBER_OCT;
  }
  function parseBinary() {
    if (eof()) {
      if (!lastReportableLexerError) lastReportableLexerError = '`0b` is illegal without a digit';
      return $ERROR;
    }

    // at least one digit is required
    let c = peek();
    if (!isBinary(c)) {
      if (!lastReportableLexerError) lastReportableLexerError = '`0b` is illegal without a digit';
      return $ERROR;
    }
    ASSERT_skip(c);

    do {
      if (eof()) return $NUMBER_BIN;
      c = peek();

      if (c === $$LODASH_5F) {
        ASSERT_skip($$LODASH_5F);
        if (eof()) {
          return THROW('A numeric separator must be preceded and followed by a digit, EOF is not valid', startForError, pointer);
        }
        c = peek();

        if (!isBinary(c)) {
          return THROW('A numeric separator must be preceded and followed by a digit, found a different character', startForError, pointer);
        }
      } else {
        if (!isBinary(c)) break;
      }

      ASSERT_skip(c);
    } while (true);

    if (c === $$N_6E) {
      // BigInt (ES2020 / ES11)
      // [v] `0b10100110101011010101001010110100001101n`
      if (!supportBigInt) {
        return THROW('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion + ')', startForError, pointer + 1);
      }
      ASSERT_skip($$N_6E);
      return $NUMBER_BIG_DEC;
    }

    return $NUMBER_BIN;
  }
  function isBinary(ord) {
    return ord === $$0_30 || ord === $$1_31;
  }

  function parseExcl() {
    // != !==

    if (eof()) return $PUNC_EXCL;

    if (peeky($$IS_3D)) {
      ASSERT_skip($$IS_3D); // !=
      if (neof() && peeky($$IS_3D)) {
        ASSERT_skip($$IS_3D); // !==
        return $PUNC_EXCL_EQ_EQ;
      }
      return $PUNC_EXCL_EQ;
    }

    return $PUNC_EXCL;
  }

  function parseStar() {
    // * *= ** **=

    if (neof()) {
      let c = peek();
      if (c === $$STAR_2A) {
        ASSERT_skip($$STAR_2A); // **
        if (neof() && peeky($$IS_3D)) {
          ASSERT_skip($$IS_3D); // **=
          return $PUNC_STAR_STAR_EQ;
        }
        return $PUNC_STAR_STAR;
      } else if (c === $$IS_3D) {
        ASSERT_skip($$IS_3D); // *=
        return $PUNC_STAR_EQ;
      }
    }
    return $PUNC_STAR;
  }

  function parseIdentRestNotKeywordObjTrie(d, n, start) {
    pointer = n - 1;
    cache = d;
    return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
  }
  function parsePotentialKeywordTrieMap(c) {
    ASSERT(parsePotentialKeywordTrieMap.length === arguments.length, 'arg count');
    ASSERT(pointer > 0 && c === input.charCodeAt(pointer - 1), 'c should have been peekSkipped');

    // c = input[pointer-1]
    // Keep reading chars until;
    // - eof
    // - next char is not a start_key
    // - next char is not found in the trie

    let trieObjlit = KEYWORD_TRIE_OBJLIT[c - $$A_61];
    ASSERT(trieObjlit !== undefined, 'the switch to determine `c` should not return KEY for letters that do not start a keyword, so in this step the first lookup MUST be a hit');

    let start = pointer - 1; // c was peekSkipped
    let n = start + 1;
    do {
      if (n >= len) return eofAfterPotentialKeywordTrieMap(trieObjlit, n, start);
      let d = input.charCodeAt(n++);
      ASSERT(typeof d === 'number' && d >= 0 && Number.isFinite(d), 'dont oob please');
      if (d < $$A_61 || d > $$Z_7A) {
        return endOfPotentialKeywordTrieMap(trieObjlit, d, n, start);
      }
      // Next step in trie
      trieObjlit = trieObjlit[d - $$A_61];
      if (trieObjlit === undefined) return parseIdentRestNotKeywordObjTrie(d, n, start);
    } while (true);

    ASSERT(false, 'unreachable');
  }
  function endOfPotentialKeywordTrieMap(trieObjlit, d, n, start) {
    ASSERT(endOfPotentialKeywordTrieMap.length === arguments.length, 'arg count');

    let hit = trieObjlit.hit;
    if (d > 0x7e) {
      // maybe rest id
      pointer = n - 1;
      cache = d;
      // This is potentially double the work but I already consider this very much a cold path
      let wide = isIdentRestChr(d, n - 1);
      if (wide === INVALID_IDENT_CHAR) {
        // This ends the ident and it is a keyword
        lastCanonizedInputLen = (n - 1) - start;
        if (hit === undefined) {
          lastCanonizedInput = slice(start, n - 1);
          return $IDENT;
        }
        let canon = trieObjlit.canon;
        ASSERT(typeof canon === 'string');
        ASSERT(canon.length === lastCanonizedInputLen, 'should be equal now', canon);
        lastCanonizedInput = canon;
        return hit;
      }
      return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
    }


    let s = getTokenStart(d);

    // Only valid "starts" for ident are id, key, numbers, and certain unicodes
    if (s === START_ID || s === START_DECIMAL || s === START_ZERO) {
      pointer = n - 1;
      cache = d;
      return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
    }

    if (s === START_BSLASH) {
      pointer = n - 1;
      cache = d;
      // A keyword followed by a backslash escape is either the end of a keyword (leading into an error) or not a keyword ident. Let's not worry about that here.
      return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
    }

    // So this must be the end of the identifier. Either we found a keyword, or we didn't :)

    if (hit !== undefined) {
      // End of id, this was a keyword
      pointer = n - 1;
      cache = d;
      lastCanonizedInputLen = (n - 1) - start;
      let canon = trieObjlit.canon;
      ASSERT(typeof canon === 'string');
      ASSERT(canon.length === lastCanonizedInputLen, 'should be equal now', canon);
      lastCanonizedInput = canon;
      ASSERT(ALL_TOKEN_TYPES.includes(hit), 'trie leafs should be valid types');
      ASSERT(isIdentToken(hit), 'trie leafs should contain ident types');
      return hit;
    }

    lastCanonizedInput = slice(start, n - 1);
    lastCanonizedInputLen = (n - 1) - start;
    pointer = n - 1;
    cache = d;
    return $IDENT;
  }
  function eofAfterPotentialKeywordTrieMap(trieObjlit, n, start) {
    // EOF
    ASSERT(trieObjlit !== undefined, 'checked before and at end of loop');

    pointer = n - 1;
    skip();
    lastCanonizedInputLen = n - start;

    let hit = trieObjlit.hit;
    if (hit !== undefined) {
      ASSERT(ALL_TOKEN_TYPES.includes(hit), 'trie leafs should be valid types');
      ASSERT(isIdentToken(hit), 'trie leafs should contain ident types');
      let canon = trieObjlit.canon;
      ASSERT(typeof canon === 'string');
      ASSERT(canon.length === lastCanonizedInputLen, 'should be equal now', canon);

      lastCanonizedInput = canon;
      return hit;
    }

    lastCanonizedInput = slice(start, n);
    return $IDENT;
  }
  function parseIdentifierRest(prevStr, prevLen) {
    // Returns a token type (!). See parseRegexIdentifierRest for regexes...
    ASSERT(parseIdentifierRest.length === arguments.length, 'arg count');
    ASSERT(typeof prevStr === 'string', 'prev should be string so far or empty');
    ASSERT(typeof prevLen === 'number' && prevStr.length === prevLen, 'should be in sync');

    let start = pointer;

    while (neof()) {
      let c = peek();
      let s = getIdentPart(c);
      switch (s) {
        case IDENT_PART:
          ASSERT_skip(c);
          break;

        case IDENT_END:
          lastCanonizedInput = prevStr + slice(start, pointer);
          lastCanonizedInputLen = prevLen + (pointer - start);
          return $IDENT;

        case IDENT_BS:
          // `foo\u0030bar`  (is canonical ident `foo0bar`)
          let x = prevStr + slice(start, pointer);
          let xlen = prevLen + (pointer - start);
          ASSERT_skip($$BACKSLASH_5C);
          return parseIdentFromUnicodeEscape(NON_START, x, xlen);

        case IDENT_UNICODE:
          let wide = isIdentRestChrUnicode(c, pointer);

          if (wide === INVALID_IDENT_CHAR) {
            lastCanonizedInput = prevStr + slice(start, pointer);
            lastCanonizedInputLen = prevLen + (pointer - start);
            return $IDENT;
          }

          if (wide === VALID_DOUBLE_CHAR) {
            skipFastWithoutUpdatingCache();
          }
          skip();
          break;

        // <SCRUB ASSERTS>
        default:
          ASSERT(false, 'unreachable', c);
        // </SCRUB ASSERTS>
      }
    }

    lastCanonizedInput = prevStr + slice(start, pointer);
    lastCanonizedInputLen = prevLen + (pointer - start);
    return $IDENT;
  }
  function parseIdentFromUnicodeEscape(fromStart, prevStr, prevLen) {
    ASSERT(typeof prevStr === 'string', 'prev should be string so far or empty');
    ASSERT(typeof prevLen === 'number' && prevStr.length === prevLen, 'should be in sync');
    ASSERT(input.charCodeAt(pointer-1) === $$BACKSLASH_5C, 'should have consumed the backslash');

    if (eof()) {
      lastCanonizedInput = prevStr;
      lastCanonizedInputLen = prevLen;
      if (!lastReportableLexerError) lastReportableLexerError = 'Encountered a backslash at end of input';
      return $ERROR;
    }

    if (!peeky($$U_75)) {
      // any other escape is not supported in identifiers
      return THROW('Only unicode escapes are supported in identifier escapes', startForError, pointer + 1);
    }

    // \u0065xx
    ASSERT_skip($$U_75);

    if (eof()) {
      if (!lastReportableLexerError) lastReportableLexerError = 'Reached end of input before closing the current ident escape';
      return $ERROR;
    }

    // Note: this is a slow path. and a super edge case.
    let r = parseUnicodeEscapeForNonRegex();

    if (r === ILLEGAL_UNICODE_ESCAPE) {
      parseIdentifierRest(prevStr, prevLen); // keep on parsing the identifier but we will make it an error token
      lastCanonizedInput = prevStr;
      lastCanonizedInputLen = prevLen;
      if (!lastReportableLexerError) lastReportableLexerError = 'Only _unicode_ escapes are supported in identifiers';
      return $ERROR;
    }

    if (r > 0xffff) {
      // there's a test... but if ord is >0xffff then fromCharCode can't properly deal with it
      prevStr += String.fromCodePoint(r);
      prevLen += 2;
    }
    else {
      prevStr += String.fromCharCode(r);
      ++prevLen;
    }

    // the escaped char must still be a valid identifier character. then and only
    // then can we proceed to parse an identifier. otherwise we'll still parse
    // into an error token.
    if (fromStart === FIRST_CHAR && isIdentStart(r, CODEPOINT_FROM_ESCAPE) !== INVALID_IDENT_CHAR) {
      return parseIdentifierRest(prevStr, prevLen);
    }

    if (fromStart === NON_START && isIdentRestChr(r, CODEPOINT_FROM_ESCAPE) !== INVALID_IDENT_CHAR) {
      return parseIdentifierRest(prevStr, prevLen);
    }

    lastCanonizedInput = prevStr;
    lastCanonizedInputLen = prevLen;
    if (!lastReportableLexerError) lastReportableLexerError = 'Identifier escape did not yield a valid identifier character';
    return $ERROR;
  }

  function toStringExpensive(c) {
    return String.fromCodePoint(c);
  }

  function isIdentStart(c, offsetOfC) {
    ASSERT(isIdentStart.length === arguments.length, 'all args');
    if (c > 0x7e) {
      // now we have to do an expensive... but proper unicode check
      return veryExpensiveUnicodeCheck(c, offsetOfC, getIdStartRegexSuperSlow());
    }
    let s = getTokenStart(c);
    if (s === START_ID || s === START_KEY) return VALID_SINGLE_CHAR;
    return INVALID_IDENT_CHAR;
  }
  function isIdentRestChr(c, offsetOfC) {
    ASSERT(isIdentRestChr.length === arguments.length, 'all args');
    if (c > 0x7e) {
      return isIdentRestChrUnicode(c, offsetOfC);
    }
    let s = getTokenStart(c);
    if (s === START_ID || s === START_KEY) return VALID_SINGLE_CHAR;
    if (s === START_DECIMAL) return VALID_SINGLE_CHAR;
    if (s === START_ZERO) return VALID_SINGLE_CHAR;
    return INVALID_IDENT_CHAR;
  }
  function isIdentRestChrUnicode(c, offsetOfC) {
    ASSERT(isIdentRestChrUnicode.length === arguments.length, 'arg count');

    // https://tc39.github.io/ecma262/#sec-unicode-format-control-characters
    // U+200C (ZERO WIDTH NON-JOINER) and U+200D (ZERO WIDTH JOINER) are format-control characters that are used to
    // make necessary distinctions when forming words or phrases in certain languages. In ECMAScript source text
    // these code points may also be used in an IdentifierName after the first character.
    if (c === $$ZWNJ_200C || c === $$ZWJ_200D) return VALID_SINGLE_CHAR;

    // now we have to do an expensive... but proper unicode check
    return veryExpensiveUnicodeCheck(c, offsetOfC, getIdRestRegexSuperSlow());
  }
  function veryExpensiveUnicodeCheck(c, offset, regexScanner) {
    ASSERT(veryExpensiveUnicodeCheck.length === arguments.length, 'arg count');
    // offset is skipped for escapes. we can assert `c` is correct in those cases.
    if (offset !== CODEPOINT_FROM_ESCAPE) {
      // this is a slow path that only validates if unicode chars are used in an identifier
      // since that is pretty uncommon I don't mind doing an extra codepoint lookup here
      c = input.codePointAt(offset);
    }
    let s = String.fromCodePoint(c);
    ASSERT(s.length === 1 || s.length === 2, 'up to four bytes...'); // js strings are 16bit
    if (regexScanner.test(s)) {
      return s.length === 1 ? VALID_SINGLE_CHAR : VALID_DOUBLE_CHAR;
    }
    return INVALID_IDENT_CHAR;
  }
  function isAsciiLetter(c) {
    // make upper and lower case the same value (for the sake of the isletter check).
    // only difference between a lower and upper case ascii letter is the 6th bit (=1<<5=32)
    let d = c | 32;
    return d >= $$A_61 && d <= $$Z_7A;
  }
  function isAsciiNumber(c) {
    // isDigit isNumber
    return c >= $$0_30 && c <= $$9_39;
  }

  function parseCompoundAssignment(c) {
    ASSERT(parseCompoundAssignment.length === arguments.length, 'arg count');
    ASSERT(c === $$PERCENT_25 || c === $$XOR_5E, 'parseCompoundAssignment c is enum');

    // `c` is one of: `%`, `^`
    // c c=

    if (neof() && peeky($$IS_3D)) {
      ASSERT_skip($$IS_3D); // @=
      if (c === $$XOR_5E) return $PUNC_CARET_EQ;
      return $PUNC_PERCENT_EQ;
    }
    if (c === $$XOR_5E) return $PUNC_CARET;
    return $PUNC_PERCENT;
  }

  function parseFwdSlash(lexerFlags) {
    ASSERT(parseFwdSlash.length === arguments.length, 'arg count');

    if (eof()) return $PUNC_DIV;

    let c = peek();

    if (c === $$FWDSLASH_2F) {
      // must be single comment
      ASSERT_skip($$FWDSLASH_2F); // `//`
      return parseCommentSingle();
    }

    if (c === $$STAR_2A) {
      // must be multi comment
      return parseCommentMulti();
    }

    if ((lexerFlags & LF_FOR_REGEX) === LF_FOR_REGEX) {
      // parse a regex. use the c
      return parseRegex(c);
    }

    if (c === $$IS_3D) {
      ASSERT_skip($$IS_3D); // /=
      return $PUNC_DIV_EQ;
    }

    return $PUNC_DIV;
  }
  function parseCommentSingle() {
    ASSERT(parseCommentSingle.length === arguments.length, 'arg count');

    while (neof()) {
      let c = peek();

      // $$LF_0A              1010
      // $$CR_0D              1101
      // $$PS_2028  10000000101000
      // $$LS_2029  10000000101001
      // c & 8

      if (c === $$CR_0D || isLfPsLs(c)) {
        // TODO: should check whether we can optimize the next token parse since we already know it to be a newline. may not be very relevant in the grand scheme of things tho. (the overhead to confirm may more expensive)
        return $COMMENT_SINGLE;
      }
      ASSERT_skip(c); // anything except those four newline chars
    }

    return $COMMENT_SINGLE;
  }
  function parseCommentMulti() {
    ASSERT(parseCommentMulti.length === arguments.length, 'arg count');
    ASSERT(input.charCodeAt(pointer) === $$STAR_2A, 'not yet skipped');
    ASSERT_skip($$STAR_2A);
    let c = 0;
    while (neof()) {
      c = peek();
      skip();
      while (c === $$STAR_2A) {
        if (eof()) break;
        c = peek();
        skip();
        if (c === $$FWDSLASH_2F) {
          return $COMMENT_MULTI;
        }
      }

      if (c === $$CR_0D) {
        // crlf is considered one line for the sake of reporting line-numbers
        if (neof() && peeky($$LF_0A)) skip();
        incrementLine();
      } else if (isLfPsLs(c)) {
        incrementLine();
      }
    }
    if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed multi line comment, early eof';
    return $ERROR;
  }
  function parseCommentHtmlOpen() {
    // parseHtmlComment
    // This is the starting html comment `<!--`
    // the spec defines it as the start of a single line JS comment
    parseCommentSingle();
    return $COMMENT_HTML;
  }
  function parseCommentHtmlClose() {
    // parseHtmlComment
    // This is the closing html comment, `-->`
    // Note: parseCommentSingle will just skip the - - > because they are not newlines.
    parseCommentSingle();
    return $COMMENT_HTML;
  }

  function parseEqual() {
    // = == === =>
    if (neof()) {
      let c = peek();
      if (c === $$IS_3D) {
        ASSERT_skip($$IS_3D); // ==
        if (neof() && peeky($$IS_3D)) {
          ASSERT_skip($$IS_3D); // ===
          return $PUNC_EQ_EQ_EQ;
        }
        return $PUNC_EQ_EQ;
      } else if (c === $$GT_3E) {
        ASSERT_skip($$GT_3E); // =>
        return $PUNC_EQ_GT;
      }
    }
    return $PUNC_EQ;
  }

  function parseLt() {
    if (parsingGoal === GOAL_SCRIPT && webCompat === WEB_COMPAT_ON && !eofd(3) && peek() === $$EXCL_21 && peekd(1) === $$DASH_2D && peekd(2) === $$DASH_2D) {
      return parseCommentHtmlOpen();
    }
    return parseLtPunctuator(); // < << <= <<=
  }
  function parseLtPunctuator() {
    // < << <= <<=
    if (neof()) {
      let c = peek();
      if (c === $$IS_3D) {
        ASSERT_skip($$IS_3D); // <=
        return $PUNC_LT_EQ;
      }
      if (c === $$LT_3C) {
        ASSERT_skip($$LT_3C); // <<
        if (neof() && peeky($$IS_3D)) {
          ASSERT_skip($$IS_3D); // <<=
          return $PUNC_LT_LT_EQ;
        }
        return $PUNC_LT_LT;
      }
    }
    return $PUNC_LT;
  }

  function parseGtPunctuator() {
    // > >> >>> >= >>= >>>=
    if (neof()) {
      let c = peek();
      if (c === $$IS_3D) {
        ASSERT_skip($$IS_3D); // >=
        return $PUNC_GT_EQ;
      }
      if (c === $$GT_3E) {
        ASSERT_skip($$GT_3E); // >>
        if (neof()) {
          c = peek();
          if (c === $$IS_3D) {
            ASSERT_skip($$IS_3D); // >>=
            return $PUNC_GT_GT_EQ;
          }
          if (c === $$GT_3E) {
            ASSERT_skip($$GT_3E); // >>>
            if (neof() && peeky($$IS_3D)) {
              ASSERT_skip($$IS_3D); // >>>=
              return $PUNC_GT_GT_GT_EQ;
            }
            return $PUNC_GT_GT_GT;
          }
        }
        return $PUNC_GT_GT;
      }
    }
    return $PUNC_GT;
  }

  function parseNewlineSolo() {
    // One character, not crlf
    incrementLine();
    return $NL_SOLO;
  }

  function parseBackslash() {
    return parseIdentFromUnicodeEscape(FIRST_CHAR, '', 0);
  }

  function parseQmark() {
    // ? ?? ??= ?.
    if (eof()) return $PUNC_QMARK;

    if (peeky($$QMARK_3F)) {
      ASSERT_skip($$QMARK_3F);

      if (neof()) {
        if (peeky($$IS_3D)) {
          ASSERT_skip($$IS_3D);

          if (supportLogicCompound) {
            return $PUNC_QMARK_QMARK_EQ;
          }

          return THROW('The logical compound operator (`??=`) is only supported since ES2021, currently targeting a lower version', pointer - 3, pointer);
        }
      }

      if (supportNullishCoalescing) {
        return $PUNC_QMARK_QMARK;
      }

      return THROW('The nullish coalescing operator (`??`) is only supported since ES2020, currently targeting a lower version', pointer - 2, pointer);
    }

    if (peeky($$DOT_2E)) {
      // Must prevent parsing `a?.2` as a `?.` token as it will lead to an incorrect error, if the `.2` case is valid
      // (Spec explicitly disallows a digit after `?.`)
      if (neofd(1)) {
        let c = peekd(1);
        if (c >= $$0_30 && c <= $$9_39) {
          // [v]: `a ?.2 : b`
          // [x]: `a ?.2`
          return $PUNC_QMARK;
        }
      }

      ASSERT_skip($$DOT_2E);

      if (supportOptionalChaining) {
        return $PUNC_QMARK_DOT;
      }

      return THROW('The optional chaining operator (`?.`) is only supported since ES2020, currently targeting a lower version', pointer, pointer + 2);
    }

    return $PUNC_QMARK;
  }

  function regexSyntaxError(desc, ...rest) {
    ASSERT(typeof desc === 'string', 'desc should be a string');
    ASSERT(desc, 'desc should be non-empty');

    if (lastReportableLexerError) {
      // Don't clobber. Report first error (Only? We could concat...).
      return REGEX_ALWAYS_BAD;
    }

    updateRegexPotentialError(desc + (rest.length ? ': [' + rest.join(', ') + ']' : ''));
    lastReportableLexerError = 'Regex: ' + lastPotentialRegexError;

    return REGEX_ALWAYS_BAD;
  }

  function updateRegexPotentialError(msg) {
    if (!lastPotentialRegexError.includes(msg)) {
      if (lastPotentialRegexError) lastPotentialRegexError += '; ';
      lastPotentialRegexError += msg;
    }
  }

  function updateRegexUflagIsIllegal(state, reason) {
    ASSERT(updateRegexUflagIsIllegal.length === arguments.length, 'arg count');

    // Found something that is potentially only valid in a regular expression without u-flag (like `\k<4>` in webcompat)
    return updateRegexUflagState(state, REGEX_GOOD_SANS_U_FLAG, reason);
  }
  function updateRegexUflagIsMandatory(state, reason) {
    ASSERT(updateRegexUflagIsMandatory.length === arguments.length, 'arg count');

    // Found something that is only valid in a regular expression with u-flag (like `\u${...}`)
    return updateRegexUflagState(state, REGEX_GOOD_WITH_U_FLAG, reason);
  }

  function updateRegexUflagState(currentState, newState, error) {
    ASSERT(newState === REGEX_GOOD_WITH_U_FLAG || newState === REGEX_GOOD_SANS_U_FLAG, 'should not be used for all good or bad');

    if (lastReportableLexerError) return REGEX_ALWAYS_BAD;

    if (currentState === (newState === REGEX_GOOD_WITH_U_FLAG ? REGEX_GOOD_SANS_U_FLAG : REGEX_GOOD_WITH_U_FLAG)) {
      return regexSyntaxError(error);
    }
    if (currentState === REGEX_ALWAYS_GOOD) {
      updateRegexPotentialError(error);
      currentState = newState;
    }
    else {
      ASSERT(currentState === REGEX_ALWAYS_BAD || currentState === newState, 'currentState enum');
      ASSERT(currentState === REGEX_ALWAYS_BAD || lastPotentialRegexError, 'should not clobber a potential error message which should already have been set here');
    }
    return currentState;
  }

  let nCapturingParens = 0;
  let largestBackReference = 0;
  let declaredGroupNames = ','; // List of comma concatenated declared group names (plain idents). If it occurs then consider +N in the grammar, meaning they must all have it
  let reffedGroupNames = ','; // List of comma concatenated referenced group names (plain idents). If it occurs then consider +N in the grammar, meaning they must all have it
  let kCharClassEscaped = false; // If one was missing but there was at least one group name then it's always an error
  let foundInvalidGroupName = false; // used for +N post-regex check
  function parseRegex(c) {
    nCapturingParens = 0;
    largestBackReference = 0;
    lastPotentialRegexError = '';
    declaredGroupNames = ',';
    reffedGroupNames = ',';
    kCharClassEscaped = false;
    foundInvalidGroupName = false;

    let ustatusBody = parseRegexBody(c);
    if (ustatusBody === REGEX_ALWAYS_BAD) {
      ASSERT(lastReportableLexerError, 'last error should be set', lastReportableLexerError, lastPotentialRegexError);
      return $ERROR;
    }

    ASSERT(ustatusBody === REGEX_ALWAYS_GOOD || lastPotentialRegexError, 'last potential error should be set if there was a potential problem', lastReportableLexerError, lastPotentialRegexError);

    // Don't parse the flag if a hard error was found because it's probably before the second `/`
    let ustatusFlags = parseRegexFlags();

    if (nCapturingParens < largestBackReference) {
      let errmsg = 'Largest back reference index exceeded the number of capturing groups (only valid without u-flag in webcompat mode)';
      if (webCompat === WEB_COMPAT_OFF) {
        regexSyntaxError(errmsg);
        return $ERROR;
      }

      // skip this check
      ustatusBody = updateRegexUflagIsIllegal(ustatusBody, errmsg);
    }

    if (ustatusFlags === REGEX_ALWAYS_BAD) {
      ASSERT(lastReportableLexerError, 'any regex flag syntax error should set this var');
      return $ERROR;
    }

    if (kCharClassEscaped) {
      if (declaredGroupNames !== ',') { // "non-empty"
        // - `/(?<foo>.)[\k]\k<foo>/`
        regexSyntaxError('Found `\\k` in a char class but the regex also had a group name so this is illegal');
        return $ERROR;
      }

      if (webCompat === WEB_COMPAT_OFF || ustatusFlags === REGEX_GOOD_WITH_U_FLAG) {
        regexSyntaxError('Found `\\k` in a char class but this is only allowed in webcompat mode and without u-flag');
        return $ERROR;
      }
    }

    if (reffedGroupNames !== ',' && (webCompat === WEB_COMPAT_OFF || declaredGroupNames !== ',')) {
      // We need to validate the referenced group names with `\k` atom escapes.
      // In web compat mode, we can ignore that if no names were declared at all
      // This is a fairly unused functionality so I'm going to do this in a slow path for now.
      let bad = false;
      reffedGroupNames.split(',').filter(Boolean).forEach(name => {
        if (!declaredGroupNames.includes(',' + name + ',')) {
          // This would only be valid if there were no names but by definition this is a name.
          regexSyntaxError('Found a `\\k` that referenced `' + name + '` but no capturing group had this name');
          bad = true;
        }
      });
      if (bad) {
        return $ERROR;
      }
    }

    if (ustatusBody === REGEX_GOOD_WITH_U_FLAG) {
      // body had an escape that is only valid with an u flag
      if (ustatusFlags === REGEX_GOOD_WITH_U_FLAG) return $REGEXU;
      regexSyntaxError('Regex contained syntax that is only valid with the u-flag but the u-flag was not present');
      return $ERROR;
    }

    if (ustatusBody === REGEX_GOOD_SANS_U_FLAG) {
      // body had an escape or char class range that is invalid with a u flag
      if (ustatusFlags !== REGEX_GOOD_WITH_U_FLAG) return $REGEXN;
      regexSyntaxError('Regex contained syntax that is invalid with the u-flag but the u-flag was present');
      return $ERROR;
    }

    ASSERT(ustatusBody === REGEX_ALWAYS_GOOD, 'u-flag-status is enum and we checked all options here', ustatusBody);
    if (ustatusFlags === REGEX_GOOD_WITH_U_FLAG) return $REGEXU;
    return $REGEXN;
  }
  function parseRegexBody(c) {
    ASSERT(c !== $$STAR_2A && c !== $$FWDSLASH_2F, 'earlier checks should already have peeked for a comment token');
    return _parseRegexBody(c, 0, REGEX_ALWAYS_GOOD);
  }
  function cannotBeQuantifier(c, uflagStatus, webcompatException, msg) {
    let badStart = c === $$STAR_2A || c === $$PLUS_2B || c === $$QMARK_3F || c === $$CURLY_L_7B;
    if (badStart) {
      msg += ' (by a `' + String.fromCharCode(c) + '`)';
      if (webcompatException && webCompat === WEB_COMPAT_ON) {
        uflagStatus = updateRegexUflagIsIllegal(uflagStatus, msg);
      } else {
        uflagStatus = regexSyntaxError(msg);
      }
    }
    return uflagStatus;
  }
  function _parseRegexBody(c, groupLevel, uflagStatus) {
    //ASSERT(typeof c === 'number', 'c is an ord');
    ASSERT(typeof groupLevel === 'number' && groupLevel >= 0, 'valid group level');
    ASSERT(typeof uflagStatus === 'number' && uflagStatus >= 0, 'valid flag');
    // - there are two grammars; a simple (RegularExpressionLiteral) and a more granular grammar (Pattern). Pattern governs. The first cannot be extended/changed, the second may be.
    //   - the spec describes such an extension in (B.1.4) we may need to use that as our end goal
    // - there are two parsing modes; unicode and without unicode. the unicode is slightly more strict
    //   - reflects on surrogate pairs, unicode ruby escapes, and valid char class ranges

    let afterAtom = false;

    // dont start with a quantifier
    uflagStatus = cannotBeQuantifier(c, uflagStatus, c === $$CURLY_L_7B, 'Started with a quantifier but that is not allowed');

    let groupNames = {}; // TODO: lazy instantiation

    do {
      let s = c > 0x7e ? REGEX_ATOM_UNICODE : regexAtomJumpTable[c];

      switch (s) {
        case REGEX_ATOM_OTHER:
          ASSERT_skip(c); // this ought to be a valid regex source character
          afterAtom = true;
          break;

        case REGEX_ATOM_DOT:
          // atom; match one character
          ASSERT_skip($$DOT_2E);
          afterAtom = true;
          break;

        case REGEX_ATOM_QUANT:
          // doesnt matter to us which quantifier we find here
          ASSERT_skip(c);
          if (afterAtom) {
            afterAtom = false;
            if (neof()) {
              if (peeky($$QMARK_3F)) {
                ASSERT_skip($$QMARK_3F);
              }
            }
          } else {
            uflagStatus = regexSyntaxError('Encountered unescaped quantifier (ord=' + c + ') without a value to quantify');
          }
          break;

        case REGEX_ATOM_PARENL:
          // Assertions `(?=` and `(?!` can not have quantifiers (`?`,`*`,etc) except without u-flag and in web-compat mode
          // Since this can also be a non-capturing group `(?:` we need to track that bit.
          let wasFixableAssertion = false;
          // lookbehind `(?<=` and `(?<!` can not get quantified even under webcompat flag (too new)
          let wasUnfixableAssertion = false;

          // parse group (?: (!: (
          ASSERT_skip($$PAREN_L_28);
          afterAtom = false; // useless. just in case
          if (eof()) {
            return regexSyntaxError('Encountered early EOF');
          }
          c = peek();
          if (c === $$QMARK_3F) {
            // (?
            ASSERT_skip($$QMARK_3F);
            if (eof()) {
              return regexSyntaxError('Encountered early EOF');
            }
            c = peek();
            if (c === $$COLON_3A || c === $$IS_3D || c === $$EXCL_21 || c === $$LT_3C) {
              // non capturing group or named capturing group
              // (?: (?= (?! (?<= (?<! (?<abc>
              if (c === $$LT_3C) {
                // (?<
                ASSERT_skip($$LT_3C);

                if (eof()) {
                  return regexSyntaxError('Encountered early EOF');
                }

                c = peek();
                if (c === $$IS_3D || c === $$EXCL_21) {
                  if (!supportRegexLookbehinds) {
                    return THROW('Lookbehinds in regular expressions are not supported in the currently targeted language version', startForError, pointer + 1);
                  }
                  // (?<= (?<!
                  ASSERT_skip(c);
                  wasUnfixableAssertion = true;
                }
                else if (!supportRegexNamedGroups) {
                  ASSERT_skip(c);
                  return regexSyntaxError('The lookbehind group `(?<` must be `(?<=` or `(?<!` because named groups are not supported in the currently targeted ES version, next char after `<` is `' + String.fromCharCode(c) + '`');
                }
                else {
                  // parseRegexNamedGroup, parseNamedCapturingGroup
                  // [v]: `/(?<name>content)/`
                  // [v]: `/(?<\u0065bc>content)/`
                  // [v]: `/(?<n5>x)*/u`

                  uflagStatus = parseRegexGroupName(c, uflagStatus, FOR_NAMED_GROUP);

                  ASSERT(!lastCanonizedInput || !groupNames['#' + lastCanonizedInput], 'duplicate group name check should have happened elsewhere', lastCanonizedInput);

                  // named capturing group
                  ++nCapturingParens;
                }
              } else if (c === $$IS_3D || c === $$EXCL_21) {
                // (?= (?!
                ASSERT_skip(c);
                wasFixableAssertion = true; // lookahead assertion might only be quantified without u-flag and in webcompat mode
              }

              if (eof()) {
                return regexSyntaxError('Encountered early EOF');
              }
              c = peek();
            } else {
              return regexSyntaxError('Illegal character after pseudo group marker `(?` [ord=' + c + ']');
            }
          } else {
            // anonymous capturing group
            ++nCapturingParens;
          }

          let subbad = _parseRegexBody(c, groupLevel + 1, REGEX_ALWAYS_GOOD);

          if (eof()) {
            return regexSyntaxError('Encountered early EOF');
          }

          c = peek();

          if (wasFixableAssertion || wasUnfixableAssertion) {
            // Only `(?=` and `(?!` can be legal in web compat mode and without the u-flag. Anything else is always bad.
            uflagStatus = cannotBeQuantifier(c, uflagStatus, !wasUnfixableAssertion, 'Regex A-ssertion "atoms" can not be quantified (so things like `^`, `$`, and `(?=` can not have `*`, `+`, `?`, or `{` following it)');
          }

          afterAtom = true;
          if (subbad === REGEX_ALWAYS_BAD) {
            uflagStatus = REGEX_ALWAYS_BAD; // should already have THROWn for this
          } else if (subbad === REGEX_GOOD_SANS_U_FLAG) {
            uflagStatus = updateRegexUflagIsIllegal(uflagStatus, lastPotentialRegexError);
          } else if (subbad === REGEX_GOOD_WITH_U_FLAG) {
            uflagStatus = updateRegexUflagIsMandatory(uflagStatus, lastPotentialRegexError);
          }

          break;

        case REGEX_ATOM_PARENR:
          // a paren might be found in a sub-parse. the outer parse may be recursively parsing a group
          ASSERT_skip($$PAREN_R_29);
          if (groupLevel > 0) return uflagStatus;
          return regexSyntaxError('Found unescaped closing paren `)` without a group being open');

        case REGEX_ATOM_SQUAREL:
          // CharacterClass
          let charClassEscapeStatus = parseRegexCharClass();
          if (charClassEscapeStatus === REGEX_ALWAYS_BAD) {
            uflagStatus = REGEX_ALWAYS_BAD; // should already have THROWn for this
          } else if (charClassEscapeStatus === REGEX_GOOD_SANS_U_FLAG) {
            uflagStatus = updateRegexUflagIsIllegal(uflagStatus, lastPotentialRegexError);
          } else if (charClassEscapeStatus === REGEX_GOOD_WITH_U_FLAG) {
            uflagStatus = updateRegexUflagIsMandatory(uflagStatus, lastPotentialRegexError);
          }
          afterAtom = true;
          break;

        case REGEX_ATOM_SQUARER: {
          ASSERT_skip($$SQUARE_R_5D);
          let reason = 'Encountered unescaped closing square bracket `]` while not parsing a character class, which is only valid without u-flag';
          if (webCompat === WEB_COMPAT_OFF) {
            return regexSyntaxError(reason);
          }
          uflagStatus = updateRegexUflagIsIllegal(uflagStatus, reason);
          afterAtom = true;
          break;
        }

        case REGEX_ATOM_BSLASH: {
          // atom escape is different from charclass escape
          ASSERT_skip($$BACKSLASH_5C);
          afterAtom = true; // except in certain cases...

          if (eof()) {
            return regexSyntaxError('Early EOF');
          }
          let d = peek();
          // \b \B cannot have quantifiers
          if (d === $$B_62 || d === $$B_UC_42) {
            ASSERT_skip(d);
            afterAtom = false; // this Assertion can never have a Quantifier
          }
          else {
            let escapeStatus = parseEscapeForRegexAtom(d);
            ASSERT(escapeStatus === REGEX_GOOD_RUBY_EDGE_CASE || escapeStatus === REGEX_ALWAYS_GOOD || lastPotentialRegexError || lastReportableLexerError, 'if not good then error should be set');
            if (escapeStatus === REGEX_ALWAYS_BAD) {
              uflagStatus = REGEX_ALWAYS_BAD;
            }
            else if (escapeStatus === REGEX_GOOD_SANS_U_FLAG) {
              uflagStatus = updateRegexUflagIsIllegal(uflagStatus, lastPotentialRegexError);
            }
            else if (escapeStatus === REGEX_GOOD_WITH_U_FLAG) {
              uflagStatus = updateRegexUflagIsMandatory(uflagStatus, lastPotentialRegexError);
            }
            else if (escapeStatus === REGEX_GOOD_RUBY_EDGE_CASE) {
              // Edge case for `/\u{1}/`, to detect double quantifiers after a proper ruby without u-flag in webcompat
              // If it reached this point, the escape is still valid with and without u-flag. Do not propagate the edge case flag.
              afterAtom = false;
            }
          }
        }
        break;

        case REGEX_ATOM_FSLASH:
          // end of regex body

          if (groupLevel !== 0) {
            // all groups must be closed before the floor is closed
            // dont consume the forward slash. let only the root caller do this
            return regexSyntaxError('Unclosed group');
          }

          ASSERT_skip($$FWDSLASH_2F);
          return uflagStatus;

        case REGEX_ATOM_XOR:
          // atom; match start of a line/file
          ASSERT_skip($$XOR_5E);
          afterAtom = false; // this Assertion can never have a Quantifier
          break;

        case REGEX_ATOM_DOLLAR:
          // atom; match the end of a file/line
          ASSERT_skip($$$_24);
          if (neof()) {
            c = peek();
            uflagStatus = cannotBeQuantifier(c, uflagStatus, c === $$CURLY_L_7B, 'Regex `A-ssertion` "atoms" can not be quantified but this `$` was quantified anyways');
          }
          afterAtom = false; // this Assertion can never have a Quantifier
          break;

        case REGEX_ATOM_UNICODE:
          if (c === $$PS_2028 || c === $$LS_2029) {
            return regexSyntaxError('Encountered early EOF'); // same as end of input
          }
          // atom; match one character. Beyond 2028 2029, atoms with non-ascii chars are not special
          ASSERT_skip(c); // this ought to be a valid regex source character, even if just half a surrogate pair
          afterAtom = true;
          break;

        case REGEX_ATOM_CURLYL: {
          // explicit quantifier
          // This is valid if we just parsed an atom, or in webcompat mode without the u-flag
          ASSERT_skip($$CURLY_L_7B);

          if (eof()) {
            return regexSyntaxError('Early EOF at the start of a regex quantifier');
          }

          // Check whether this is a valid quantifier at all (`{ digits [, digits] }`)
          // Then if it is, throw if not afterAtom, even in web compat (static semantic covers that)
          // Otherwise it is an invalid brace. Can only be legal in web compat without u-flag.

          let c = peek();
          let validBrace = isAsciiNumber(c) ? parseRegexCurlyQuantifier(c) : REGEX_PARTIAL_CURLY_QUANTIFIER;

          ASSERT([REGEX_VALID_CURLY_QUANTIFIER, REGEX_INVALID_CURLY_QUANTIFIER, REGEX_PARTIAL_CURLY_QUANTIFIER].includes(validBrace), 'func returns an enum');
          if (validBrace === REGEX_VALID_CURLY_QUANTIFIER) {
            if (afterAtom) {
              // This is the most likely case
              // `/a{12}/`
              //    ^^^^
              // `/a{12,}/`
              //    ^^^^^
              // `/a{12,13}/`
              //    ^^^^^^^
              afterAtom = false;

              if (neof() && peeky($$QMARK_3F)) {
                // `/a{12}?/`
                //        ^
                // `/a{12,}?/`
                //         ^
                // `/a{12,13}?/`
                //           ^

                // This is a non-greedy modifier. Basically, `/\u{10}?/` matches the smallest series of `u`, but at
                // least 10. Since we are parsing an atom, we can just skip the qmark here.
                ASSERT_skip($$QMARK_3F);
              }

              break;
            }

            // `/a*{1}/`
            // `/a?{1}/`
            // `/a+{1}/`
            // `/a{1}{1}/`
            // `/{1}/`
            // `/a|{1}/`
            return regexSyntaxError('A valid bracket quantifier requires an unqualified atom, but that was not the case');
          }

          if (validBrace === REGEX_INVALID_CURLY_QUANTIFIER) {
            // `/a{02}/`
            // `/a{2,1}/`
            return regexSyntaxError('Parsed a braced quantifier that contained an illegal range (left>right)');
          }

          if (eof()) return regexSyntaxError('Encountered EOF while parsing curly quantifier');

          // This is the path for the start of an _invalid_ bracket quantifier.
          // This can only be valid in web compat mode without u-flag, where `{` becomes an ExtendedPatternCharacter

          if (webCompat === WEB_COMPAT_OFF) {
            if (peeky($$COMMA_2C)) {
              return regexSyntaxError('The first digit of a regex curly quantifier is mandatory');
            }

            if (peeky($$CURLY_R_7D)) {
              return regexSyntaxError('A regex curly quantifier had no content');
            }

            return regexSyntaxError('Found an unescaped `{` that was not the start of a valid quantifier');
          }

          // web compat only, ExtendedPatternCharacter:
          // [v]: `/{/`
          // [x]: `/{1}/`
          // [x]: `/{1}?/`
          // [v]: `/{?/`
          // [v]: `/{/`
          // [v]: `/{?/`
          // [v]: `/{/`u
          // [v]: `/{?/u`
          // [v]: `/{/u`
          // [v]: `/{?/u`

          afterAtom = true;
          uflagStatus = updateRegexUflagIsIllegal(uflagStatus, 'Found an unescaped `{` that was not the start of a valid quantifier');
          break;
        }
        case REGEX_ATOM_CURLYR: {
          ASSERT_skip($$CURLY_R_7D);
          let reason = 'Encountered unescaped closing curly `}` while not parsing a quantifier';
          if (webCompat === WEB_COMPAT_OFF) {
            // this is always bad since we have a quantifier parser that consumes valid curly pairs
            return regexSyntaxError(reason);
          }
          // in web compat mode you're allowed to have an unescaped curly as atom
          uflagStatus = updateRegexUflagIsIllegal(uflagStatus, reason);
          // in web compat mode this case is treated as an extended atom
          afterAtom = true;
          break;
        }

        case REGEX_ATOM_OR:
          // left and/or right side of the pipe can be empty. weird but syntactically valid
          ASSERT_skip($$OR_7C);
          afterAtom = false;
          break;

        case REGEX_ATOM_NL:
          return regexSyntaxError('Encountered early EOF'); // same as end of input

        // <SCRUB ASSERTS>
        default:
          ASSERT(false, 'unreachable', c);
        // </SCRUB ASSERTS>
      }

      if (eof()) break;
      c = peek();
    } while (true);

    // this is a fail because we didnt got to the end of input before the closing /
    return regexSyntaxError('Found EOF before regex was closed');
  }
  function parseRegexGroupName(c, uflagStatus, forCapturing/*: FOR_NAMED_GROUP | FOR_K_ESCAPE */) {
    ASSERT(parseRegexGroupName.length === arguments.length, 'arg count');
    // The initial `<` should be consumed here, but it's considering `/\k<</` is valid, we can't assert that here

    let r = _parseRegexGroupName(c, uflagStatus, forCapturing);

    ASSERT(lastCanonizedInput.length === lastCanonizedInputLen, 'should always be in sync');
    ASSERT(foundInvalidGroupName || lastCanonizedInputLen !== 0, 'a valid parse should always yield an ident', r);

    if (!foundInvalidGroupName) return r;

    if (forCapturing === FOR_NAMED_GROUP) {
      // [x]: `/(?<>a)/`
      return regexSyntaxError('An invalid name for a capturing group can never lead to a valid regex');
    }

    ASSERT(forCapturing === FOR_K_ESCAPE, 'enum');
    // This makes sure that `\k` is not allowed in webcompat mode IF the regex DOES contain a valid group name
    // [x]: `/(?<a>.)\k<a/`
    kCharClassEscaped = true;

    return r;
  }
  function _parseRegexGroupName(c, uflagStatus, forCapturing/*: FOR_NAMED_GROUP | FOR_K_ESCAPE */) {
    ASSERT(_parseRegexGroupName.length === arguments.length, 'arg count');

    // Note: you are first supposed to parse the generic regex payload with either ~U,~N or +U,+N, depending on
    // the u-flag. Without the flag, and in web compat mode, you would parse `\k<abc>` first as just an
    // IdentityEscape --> SourceCharacterIdentityEscape --> `[~N] SourceCharacter but not c`
    // The GroupName is just parsed as non-special pattern characters. However, this is what the spec calls
    // https://tc39.es/ecma262/#sec-regexpinitialize
    // >  If the result of parsing contains a GroupName
    // This is rather implicit, since according to the grammar you are not parsing a GroupName (TODO: report this)
    // but since all signs point towards that being the intent;
    // After the first pass, if the `\k` is found with a proper `GroupName` then parse it with `+N` and act
    // normal. Otherwise, for any partial or full absence of the `GroupName`, just don't treat the `<` and `>`
    // as special.
    // We use a global (for now) for this. Set `foundValidGroupName` or `foundInvalidGroupName` and confirm afterwards
    // whether invalid names were found and, if so, no valid names were found. Throw accordingly. (TODO: juggle this)

    // [v]: `/(?<\u0065ame>xyz)/``
    //          ^
    // [x]: `/(?<x>foo)met\k<\u0065>/`
    //                       ^

    if (c === $$GT_3E) {
      foundInvalidGroupName = true;
      lastCanonizedInput = '';
      lastCanonizedInputLen = 0;
      if (webCompat === WEB_COMPAT_ON) {
        // Signify that a `\k` escape was attempted so it will throw if any group name was parsed in this regex (`+N`)
        reffedGroupNames += '<>,';
        return updateRegexUflagIsIllegal(uflagStatus, 'Group name is not optional without webcompat, found empty `<>`');
      }
      return regexSyntaxError('Group name is not optional, found empty `<>`');
    }

    let pointerStart = pointer;
    lastCanonizedInput = '';
    lastCanonizedInputLen = 0;

    let first = true;
    let lastPointer = 0; // It is possible that the parsing stops without consumption. Exit to prevent infiloop
    while (c !== $$GT_3E && uflagStatus !== REGEX_ALWAYS_BAD && lastPointer !== pointer) {
      lastPointer = pointer;
      if (c === $$BACKSLASH_5C) {
        uflagStatus = _parseRegexGroupNameEscape(first, uflagStatus, forCapturing);
      } else {
        uflagStatus = _parseRegexGroupNameChar(first, c, uflagStatus, forCapturing);
      }

      if (eof()) {
        foundInvalidGroupName = true;
        lastCanonizedInput = '';
        lastCanonizedInputLen = 0;
        return regexSyntaxError('Missing closing angle bracket of name of capturing group');
      }

      c = peek();
      first = false;
    }

    if (uflagStatus === REGEX_ALWAYS_BAD) {
      foundInvalidGroupName = true;
      lastCanonizedInput = '';
      lastCanonizedInputLen = 0;
      return REGEX_ALWAYS_BAD;
    }

    if (lastPointer === pointer) {
      // This is an implicit case where a unicode escape was illegal but the regex could still be valid without u-flag
      ASSERT(uflagStatus === REGEX_GOOD_SANS_U_FLAG, 'this case should only happen for this state');
      foundInvalidGroupName = true;
      lastCanonizedInput = '';
      lastCanonizedInputLen = 0;
      return REGEX_GOOD_SANS_U_FLAG;
    }

    lastCanonizedInputLen = lastCanonizedInput.length;

    ASSERT_skip($$GT_3E);

    if (lastCanonizedInputLen > 0) {
      // This enables +N mode, meaning `\k` is now disallowed in char classes in webcompat mode too
      let next = lastCanonizedInput + ',';
      if (forCapturing === FOR_NAMED_GROUP) {
        if (declaredGroupNames.includes(',' + next)) {
          // [x]: `/(?<a>a)(?<b>b)(?<a>a)/`
          THROW('This group name (`' + lastCanonizedInput + '`) was already used before', pointerStart, pointer - 1);
        }
        declaredGroupNames += next;
      } else {
        // We can only verify existence after completing the body
        reffedGroupNames += next;
      }
    }

    // If this was the name of a group then if the uflag is invalid, so is the whole group (invalid with u-flag, and
    // without u-flag, the `(?<` turns into `? trying to quantify `(`, which can not be an atom, so it fails)
    // If this was `\k` and the flag signals an error, then it's fine without u-flag since that just treats it as atoms.

    return uflagStatus;
  }

  function _parseRegexGroupNameChar(start, c, uflagStatus, forCapturing) {
    ASSERT(_parseRegexGroupNameChar.length === arguments.length, 'arg count');
    ASSERT(c !== $$BACKSLASH_5C, 'should be asserted by caller');

    // [v]: `/(?<name>x)/`
    //           ^
    // [v]: `/(?<name>x)/u`
    // [x]: `/(?<輸rest>x)/`
    //           ^
    // [v]: `/(?<輸rest>x)/u`
    // [v]: `/(?<name>x)\k<name>*/`
    //           ^         ^
    // [v]: `/(?<name>x)\k<name>/u`
    // [x]: `/(?<輸rest>x)\k<輸rest>/`
    //           ^           ^
    // [v]: `/(?<輸rest>x)\k<輸rest>/u`

    let wide = start ? isIdentStart(c, pointer) : isIdentRestChr(c, pointer);

    if (wide === VALID_SINGLE_CHAR) {
      // [v]: `/(?<name>x)*/`
      //           ^
      // [v]: `/(?<name>x)*/u`
      // Fine with and without u-flag
      ASSERT_skip(c);
      lastCanonizedInput += String.fromCharCode(c);

      return uflagStatus;
    }

    if (wide === INVALID_IDENT_CHAR) {
      // This case is invalid for u-flag. One case can be made valid without u-flag in web compat mode: the `\k` escape

      // [x]: `/(?<>a)/`
      //           ^
      // [x]: `/(?<>a)/u`
      // [x]: `/(?<4>a)/`
      //           ^
      // [x]: `/(?<4>a)/u`
      // [v]: `/(?<𝟐rest>fxoo)/`
      //           ^
      // [x]: `/(?<輸>foo)met\k<�>/u`
      //                        ^
      // [x]: `/(?<x>foo)met\k<5/`
      //                       ^

      foundInvalidGroupName = true;

      if (webCompat === WEB_COMPAT_OFF || forCapturing === FOR_NAMED_GROUP) {
        // if (webCompat === WEB_COMPAT_OFF) {
        // [x]: `/(?<#x>foo)met\k<#/u`
        // [w]: `/(?<x>foo)met\k<#x/`
        //                       ^
        // [x]: `/(?<x>foo)met\k<5/u`
        // [x]: `/(?<5x>foo)met\k<x/`
        //           ^
        return regexSyntaxError('Tried to parse the name for a capturing group but it contained at least one invalid ident char (`' + String.fromCharCode(c) + '`)');
      }

      // This must be `\k<` and some non-ident-start char after it in webcompat. This means `\k` and `<` are atoms
      // Don't parse a group, immediately return. Let outer parser consume the next char (it may be a quantifier)
      return updateRegexUflagIsIllegal(uflagStatus, 'Tried to parse the name for a capturing group but it contained at least one invalid ident char (`' + String.fromCharCode(c) + '`)');
    }

    ASSERT(wide === VALID_DOUBLE_CHAR, 'enum');

    // [v]: `/(?<輸rest>foo)/u`
    //           ^
    // The first character is a valid ident start, however, it only is as a code point which is only the case
    // when u-flag is present. Without u-flag the pair is treated as two individual characters and the surrogate
    // head is not a valid ident char. As such the group name fails to parse. There are two outcomes now; if the
    // name was for a capturing group then this is an unrecoverable error because the regex would need to interpret
    // the start of the group as `(?`, which wants to quantify an atom, except `(` is never allowed to be an atom.
    // However, if this was the name for a `\k` escape, then in web compat mode it can end up as atoms for the
    // `\k` escape and the `<`. So we need to check the forCapturing state.

    skipFastWithoutUpdatingCache();
    skip();
    lastCanonizedInput += String.fromCodePoint(c);

    if (forCapturing === FOR_NAMED_GROUP) {
      // Error without u-flag because even in webcompat it leads to `(?` which is an illegal quantifier
      return updateRegexUflagIsMandatory(uflagStatus, 'The start of the name of a capturing group had a surrogate pair and is therefor only valid with u-flag');
    }

    if (webCompat === WEB_COMPAT_OFF) {
      // This case can only made to work in web compat mode because that allows `\k` to be an atom
      return updateRegexUflagIsMandatory(uflagStatus, 'The start of a `\\k` group name had a surrogate pair and is therefor only valid with u-flag'); // Let's not promote web compat
    }

    return uflagStatus;
  }
  function _parseRegexGroupNameEscape(start, uflagStatus, forCapturing) {
    ASSERT(_parseRegexGroupNameEscape.length === arguments.length, 'arg count');

    // [v]: `/(?<\u0065>x)/`
    //           ^
    // [v]: `/(?<\u0065>x)/u`
    // [v]: `/(?<e>x)\k<\u0065>/`
    //                  ^
    // [v]: `/(?<e>x)\k<\u0065>/u`
    // [x]: `/(?<\u{65}>x)/`
    // [v]: `/(?<\u{65}>x)/u`
    // [w]: `/\k<\u{65}>/`
    // [x]: `/\k<\u{65}>/u`
    // [w]: `/(?<e>x)\k<\u{65}>/`
    // [v]: `/(?<e>x)\k<\u{65}>/u`
    // [x]: `/(?<\ud87e\udddf>x)/`
    // [v]: `/(?<\ud87e\udddf>x)/u`
    // [w]: `/\k<\ud87e\udddf>/`
    // [x]: `/\k<\ud87e\udddf>/u`
    // [x]: `/(?<輸>x)\k<\ud87e\udddf>/`
    // [v]: `/(?<輸>x)\k<\ud87e\udddf>/u`
    // [x]: `/(?<輸>x)\k<\u{2F9DF}>/`
    // [v]: `/(?<輸>x)\k<\u{2F9DF}>/u`

    ASSERT_skip($$BACKSLASH_5C);
    if (eof()) {
      foundInvalidGroupName = true;
      return regexSyntaxError('Found EOF at start of a group name identifier');
    }
    if (!peeky($$U_75)) {
      foundInvalidGroupName = true;
      return regexSyntaxError('Found invalid escape character at the start of a group name identifier');
    }
    ASSERT_skip($$U_75);

    if (eof()) {
      return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Unexpected EOF while parsing unicode escape');
    }

    // We need to parse a unicode escape here that can be a quad, a double quad, or a ruby escape
    // However, we also need to know the size of the code point (one or two characters or invalid)
    // Without u-flag, the ruby and non-bmp code points are not considered and will cause an error here.

    // `/(?<a\u{0065}b>c)/u`
    //       ^
    // `/(?<a\u0065b>c)/u`
    //       ^
    // `/(?<a\u0065\u0065b>c)/u`     (the quads can be a surrogate pair, but do not have to be; valid ident either way)
    //       ^
    // `/(?<a\u{}b>c)/u`             (error because ruby must contain at least one hexdigit)
    // `/(?<{0065}>x)\k<\u{0065}>/u` (ok)
    // `/(?<\u0065>x)\k<\u0065>/u`   (ok)
    // `/\k<\u{0065}>/u`             (error because there is no group with this name)
    // `/\k<\u{}>/u`                 (error because ruby must contain at least one hexdigit)
    // `/\k<\u{0x65}>/u`             (error because u-flag forbids alternative readings of brace quantifier)
    // `/\k<\u{0,65}>/u`             (error because `\k` can not be an atom so it cannot be quantified)
    // `/\k<a\u0065b>/u`             (fine if escape is ok and a group with that name exists)
    // `/\k<a\u0065\u0065b>/u`       (same as above, quads may also form a surrogate pair)

    // Under certain circumstances the lack u-flag can still yield a valid, albeit different, interpretation
    // `/(?<a\u{0065}b>c)/`          (illegal because ruby is not considered without u-flag> name invalid> `(?` invalid)
    // `/(?<a\u{}b>c)/`              (error because name is invalid and `(?` is invalid quantifier without it)
    // `/(?<a\u0065b>c)/`            (fine if escape is ok)
    // `/(?<a\u0065\u0065b>c)/`      (fine if escape is okay and not a surrogate pair, since that requires u-flag)
    // `/(?<\u0065>x)\k<\u0065>/`    (ok, named groups and \k are not hidden under u-flag, matches /xx/)
    // `/\k<\u{0065}>/`              (illegal because if group name is valid, a group with that name must exist)
    // `/\k<\u{0x65}>/`              (ok in web, atoms `\k`, `<`, `\u`, `{`, `0x65`, `}`, `>`. Error without web)
    // `/\k<\u{0,65}>/`              (ok in web, the group name fails but `\u` is quantified. Error without web)
    // `/\k<\u{}>/`                  (ok in web, atoms `\k`, `<`, `\u`, `{`, `}`)
    // `/\k<a\u0065b>/`              (fine if escape is ok and a group with that name exists)
    // `/\k<a\u0065\u0065b>/`        (same as above, but also the quads are illegal if they are a surrogate pair)

    // We dont know whether u-flag is present until after we've parsed the flags so we track both
    // Parse as loose as possible and keep track of parsing specific u-flag or non-u-flag stuff
    // then after flag parsing confirm that the flag presence conforms to expectations

    // Note that `(?<name>` without u-flag is illegal if the name is illegal. That's because the alternative reading
    // requires the `(` to be an atom that is quantified by `?`. However, `(` can not be an atom, so it still fails.

    let c = peek(); // dont read. we dont want to consume a bad \n here
    if (c === $$CURLY_L_7B) {
      c = parseUnicodeRubyEscape();

      // If this is part of a `\k` escape then this might be ok without u-flag in web compat, otherwise it must be error
      uflagStatus = updateRegexUflagIsMandatory(REGEX_ALWAYS_GOOD, 'Found a unicode ruby escape which is only valid with u-flag'); // don't mention the webcompat exception
    } else {
      c = parseUnicodeQuadEscape(c, false);

      if (c > 0xffff && forCapturing === FOR_NAMED_GROUP) {
        // The double quad can be made to work without u-flag but not inside a capturing group because `(?` is invalid
        uflagStatus = updateRegexUflagIsMandatory(uflagStatus, 'The name of a capturing group contained a double unicode quad escape which is valid as a surrogate pair which requires u-flag and which cannot be made valid without u-flag');
      }
    }

    if (eof()) {
      // We are inside a regex so whether or not we parsed a ruby is irrelevant at this point
      // The eof happens before the end of the regex, so this must be a syntax error
      foundInvalidGroupName = true;
      return regexSyntaxError('Early EOF while parsing a group name');
    }

    if (c === REGEX_CHARCLASS_BAD) {
      foundInvalidGroupName = true;
      if (webCompat === WEB_COMPAT_OFF || forCapturing === FOR_NAMED_GROUP) {
        return regexSyntaxError('Regex contained a group name with invalid unicode escape');
      }

      // [w]: `/\k<xyz\ua`
      return updateRegexUflagIsIllegal(uflagStatus, 'The name of a `\\k` escape contained a broken unicode ruby escape and this can not lead to a valid regex with u-flag');
    }

    ASSERT(c >= 0 && c <= MAX_VALID_UNICODE_VALUE, 'c should be valid unicode now', c);

    let firstCharStr = toStringExpensive(c);
    ASSERT(typeof firstCharStr === 'string', 'readNextCodepointAsStringExpensive should return a string', firstCharStr, c);
    lastCanonizedInput += firstCharStr;

    let wide = start ? isIdentStart(c, CODEPOINT_FROM_ESCAPE) : isIdentRestChr(c, CODEPOINT_FROM_ESCAPE);

    if (wide === VALID_SINGLE_CHAR) {
      // (Named groups are not hidden behind u-flag but ruby escapes are not treated as such without it)
      // [v]: `/(?<\u0041>.)/`
      // [v]: `/(?<\u0041>.)/u`
      // [x]: `/(?<\u{41}>.)/`                 Fails because `(?` is always an illegal quantifier
      // [v]: `/(?<\u{41}>.)/u`
      // [v]: `/(?<A>x)\k<\u0041>/`
      // [v]: `/(?<A>x)\k<\u0041>/u`
      // [v]: `/(?<A>x)\k<\u{41}>/`            Webcompat only (where `\k` is a valid atom)
      // [v]: `/(?<A>x)\k<\u{41}>/u`

      return uflagStatus;
    }

    if (wide === VALID_DOUBLE_CHAR) {
      // A codepoint beyond 0xffff can only be recognized with u-flag
      // Without u-flag, a double quad that is surrogate pair would be treated as two individual chars, neither
      // can be a valid ident char so without u-flag the group name would not be valid, falling back to legacy atoms.
      // [x]: `/(?<\ud87e\udddf>foo)/`         Without u-flag the quads are not combined so invalid group name
      // [v]: `/(?<\ud87e\udddf>foo)/u`
      // [x]: `/(?<\u{2F9DF}>foo)/u`           Fails because `(?` is always an illegal quantifier
      // [v]: `/(?<\u{2F9DF}>foo)/u`
      // [x]: `/(?<輸>x)\k<\ud87e\udddf>)/`    Webcompat only (the quads are not valid ident chars on their own)
      // [v]: `/(?<輸>x)\k<\ud87e\udddf>)/u`
      // [x]: `/(?<輸>x)\k<\u{2F9DF}>)/`       Webcompat only (where `\k` is a valid atom)
      // [v]: `/(?<輸>x)\k<\u{2F9DF}>)/u`
      if (forCapturing === FOR_NAMED_GROUP) {
        // Only for named groups is this a problem because either way (double quad or ruby) the escape cannot
        // contribute a valid ident char to the group name, meaning the group name fails to parse, meaning the
        // interpretation of this part falls back to legacy atoms in web compat mode, and just fails otherwise
        return updateRegexUflagIsMandatory(uflagStatus, 'Found a codepoint in a capturing group name that requires the u-flag to be considered valid');
      }

      if (webCompat === WEB_COMPAT_OFF) {
        // This is a `\k` escape, which can recover from a high codepoint, but only in webcompat mode. In that case
        // the `\k` and `\u` become individual atoms. A quad becomes a trivial atom while a ruby becomes a quantifier
        // like `\u{50000}` in webcompat mode is the letter `u` repeated 50000 times. Otherwise it's still an error.
        return updateRegexUflagIsMandatory(uflagStatus, 'Found a codepoint in a `\\k` escape group name that requires the u-flag to be considered valid');
      }

      return uflagStatus;
    }

    ASSERT(wide === INVALID_IDENT_CHAR, 'wide is enum (2)');

    // Two main cases; either inside a capturing group or a k-escape.
    // The capturing group is non-recoverable because the `(?` which is impossible since `(` cannot be an atom.
    // The k-escape can recover in web compat mode, at least up to the point of invalidation, since all parts that
    // were potentially valid can "decompose" to valid fallback atoms (including `\k`, `\u`, and a ruby escape)
    if (forCapturing === FOR_NAMED_GROUP) {
      foundInvalidGroupName = true;
      return regexSyntaxError('Encountered invalid unicode escape inside the group name of a capturing group, this cannot be valid');
    }

    if (webCompat === WEB_COMPAT_OFF) {
      foundInvalidGroupName = true;
      return regexSyntaxError('Encountered invalid unicode escape inside the group name of a `\\k` escape, this can not become valid without web compat mode');
    }

    return updateRegexUflagIsIllegal(uflagStatus, 'Encountered invalid unicode escape inside the group name of a `\\k` escape, this is invalid with u-flag');
  }
  function parseEscapeForRegexAtom(c) {
    // backslash already parsed, c is peeked
    // return REGEX_*** enum

    // -- u flag is important
    // -- u flag can affect range (surrogate pairs in es5 vs es6)
    // -- char class range _must_ be low-hi unless dash is the first or last char
    // -- \u{...} only allowed with u flag
    // -- unicode, digit, char, hex escapes

    let s = c > 0x7e ? REGATOM_ESC_UNICODE : regexAtomEscapeStartJumpTable[c];

    switch (s) { // Keep cases in same order as enum value
      case REGATOM_ESC_OK:
        // control escapes (f, n, r, t, v)
        // char class escapes (d, D, s, S, w, W)
        // forward slash (/)
        // syntax chars (^, $, \, ., *, +, ?, (, ), [, ], {, }, |)
        // and any ascii char that doesn't fit other cases
        ASSERT_skip(c);
        return REGEX_ALWAYS_GOOD;

      case REGATOM_ESC_u:
        ASSERT_skip($$U_75);
        return parseUnicodeEscapeForRegexAtom();

      case REGATOM_ESC_x:
        // hex
        ASSERT_skip(c);
        if (eof()) { // Can't scan for `eofd(1)` here because `/\x/` can be valid in webcompat mode
          return regexSyntaxError('Encountered early EOF while parsing hex escape');
        }

        let a = peek();
        let va = getHexValue(a);
        if (va === HEX_OOB) {
          let reason = 'First char of hex escape not a valid digit';
          if (webCompat === WEB_COMPAT_ON) {
            return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
          }
          return regexSyntaxError(reason);
        }
        ASSERT_skip(a);
        if (eof()) {
          return regexSyntaxError('Encountered early EOF while parsing hex escape');
        }

        let b = peek();
        let vb = getHexValue(b);
        if (vb === HEX_OOB) {
          let reason = 'Second char of hex escape not a valid digit';
          if (webCompat === WEB_COMPAT_ON) {
            return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
          }
          return regexSyntaxError(reason);
        }
        ASSERT_skip(b);
        return REGEX_ALWAYS_GOOD;

      case REGATOM_ESC_NONU:
        // Non-special non-id chars can only be escaped if there is no u-flag
        ASSERT_skip(c);
        // Atom escape was acceptable but only without u-flag
        return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Atoms can only escape certain non-special chars without u-flag');

      case REGATOM_ESC_UNICODE:
        // this is, probably;
        //
        // IdentityEscape [U] ::
        //   [+U] SyntaxCharacter
        //   [+U] /
        //   [~U] SourceCharacter but not UnicodeIDContinue
        //
        // Note: SyntaxCharacter and `/` is already checked in the switch above, so we focus on the ~U step

        // There are three cases to consider;
        // - u-flag: only a handful of syntax characters can be escaped validly
        // - without u-flag, strict: a subset of `id_continue` chars and anything not in `id_continue`
        // - web compat: only disallows `c`, and if a named capturing group is used anywhere then `k` as well

        let wide = isIdentRestChr(c, pointer);

        if (wide === VALID_DOUBLE_CHAR) {
          // The regex is already invalid with u-flag but (still?) valid without u-flag because the code _point_ is a
          // id_continue while the code _unit_ is just a surrogate head, which by itself is not an id_continue. So it
          // does not violate the syntax.

          c = input.codePointAt(pointer);
          skipFastWithoutUpdatingCache();
          skip();

          if (webCompat === WEB_COMPAT_OFF) {
            return regexSyntaxError('Cannot use a surrogate pair as atom escape (' + c + ', `' + String.fromCodePoint(c) + '`)');
          }

          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Atom escape can only escape certain syntax chars with u-flag');
        }

        if (wide === VALID_SINGLE_CHAR) {
          ASSERT(c >= 0x7f && c <= 0xffff, 'regular ascii chars should not hit the unicode branch');
          // This means the code unit is a valid unicode continue character, which is not legal with or without u-flag
          // In webcompat mode it is still legal as long as it isn't a `c` or, with +N, a `k`.

          ASSERT_skip(c);

          if (webCompat === WEB_COMPAT_OFF) {
            // Note that this case branch means it's a code unit in range of 0x007f ~ 0xffff, all illegal here
            return regexSyntaxError('Cannot escape this regular identifier character [ord=' + c + '][' + String.fromCharCode(c) + ']');
          }

          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Atom escape can only escape certain syntax chars with u-flag');
        }

        ASSERT(wide === INVALID_IDENT_CHAR, 'wide enum (4)');
        // Illegal ident chars are (only) fine to escape in web compat, apparently.
        ASSERT_skip(c);

        if (c === $$PS_2028 || c === $$LS_2029) {
          // https://tc39.es/ecma262/#sec-line-terminators
          // > A line terminator cannot occur within any token except a StringLiteral, Template, or TemplateSubstitutionTail.

          // Line continuation is not supported in regex and the escape is explicitly disallowed
          // https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator
          return regexSyntaxError('Regular expressions do not support line continuations (escaped newline)');
        }

        if (webCompat === WEB_COMPAT_OFF) {
          // Note that this case branch means it's a code unit in range of 0x007f ~ 0xffff, all illegal here
          return regexSyntaxError('Cannot escape this non-identifier character [ord=' + c + '][' + String.fromCharCode(c) + ']');
        }

        // Ok, atom escape was acceptable but only without u-flag
        return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Atom escape can only escape certain syntax chars with u-flag');

      case REGATOM_ESC_c:
        // char escapes
        ASSERT_skip($$C_63);

        if (eof()) {
          return regexSyntaxError('Encountered early EOF while parsing char escape');
        }

        let d = peek();
        if (isAsciiLetter(d)) {
          ASSERT_skip(d);
          return REGEX_ALWAYS_GOOD;
        }

        let reason = 'Illegal char escape char (ord=' + d + ')';
        if (webCompat === WEB_COMPAT_ON) {
          // this is now an `IdentityEscape` and just parses the `c` itself
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
        }
        return regexSyntaxError(reason);

      case REGATOM_ESC_pP:
        // Unicode property escapes
        // - `/\p{name}`
        // - `/\P{name}`
        // - `/\p{name=value}`
        // - `/\P{name=value}`
        const FROM_ATOM = false;
        return parseRegexPropertyEscape(c, FROM_ATOM);

      case REGATOM_ESC_0:
        ASSERT_skip($$0_30);
        // cannot be followed by another digit unless webcompat
        if (eof()) return REGEX_ALWAYS_GOOD; // let error happen elsewhere
        if (isAsciiNumber(peek())) {
          let reason = 'Back references can not have more two or more consecutive numbers';
          if (webCompat === WEB_COMPAT_ON) {
            return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
          } else {
            return regexSyntaxError(reason);
          }
        }
        return REGEX_ALWAYS_GOOD;

      case REGATOM_ESC_123456789:
        return parseRegexDecimalEscape(c);

      case REGATOM_ESC_k: {
        // named backreference

        let uflagStatus = REGEX_ALWAYS_GOOD;

        ASSERT_skip($$K_6B);
        if (eof()) return regexSyntaxError('Early EOF while parsing `\\k` escape in regex character class');
        c = peek();
        if (c !== $$LT_3C) {
          kCharClassEscaped = true;
          let reason = 'Named back reference \\k; missing group name';
          if (webCompat === WEB_COMPAT_OFF) {
            return regexSyntaxError(reason, c);
          }
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
        }
        ASSERT_skip($$LT_3C);
        if (eof()) return regexSyntaxError('Early EOF while parsing `\\k` escape in regex character class');
        c = peek();

        uflagStatus = parseRegexGroupName(c, uflagStatus, FOR_K_ESCAPE);
        ASSERT(lastCanonizedInputLen === lastCanonizedInput.length, 'should always be in sync');

        // If the group name contained a `\u{..}` escape then the u-flag must be valid for this regex to be valid
        return uflagStatus;
      }

      case REGATOM_ESC_NL:
        // Line continuation is not supported in regex and the escape is explicitly disallowed
        // https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator

        // https://tc39.es/ecma262/#sec-line-terminators
        // > A line terminator cannot occur within any token except a StringLiteral, Template, or TemplateSubstitutionTail.

        ASSERT_skip(c);
        return regexSyntaxError('Regular expressions do not support line continuations (escaped newline)');

      case REGATOM_ESC_WC:
        // Non-special letters can only be escaped in webcompat mode and without u-flag
        ASSERT_skip(c);
        if (webCompat === WEB_COMPAT_ON) {
          // Atom escape was acceptable but only without u-flag
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Atom escape can only escape certain letters without u-flag');
        }
        return regexSyntaxError('Cannot escape this letter [' + String.fromCharCode(c) + ']');

      // <SCRUB ASSERTS>
      default:
        ASSERT(false, 'unreachable', c);
      // </SCRUB ASSERTS>
    }
    ASSERT(false, 'unreachable', c);
  }
  function parseRegexDecimalEscape(c) {
    // parseBackReference

    // https://tc39.github.io/ecma262/#prod-DecimalEscape
    //   DecimalEscape :: NonZeroDigit DecimalDigits opt [lookahead ∉ DecimalDigit

    // https://tc39.github.io/ecma262/#sec-decimalescape
    //   If \ is followed by a decimal number n whose first digit is not 0, then the escape sequence is considered to
    //   be a backreference. It is an error if n is greater than the total number of left-capturing parentheses in
    //   the entire regular expression.
    // In web compat mode this extra condition is dropped

    ASSERT(c >= $$1_31 && c <= $$9_39, 'should be digit 1~9');
    ASSERT_skip(c);

    if (eof()) return regexSyntaxError('Early EOF while parsing decimal escape in regex');
    let d = peek();
    if (d >= $$0_30 && d <= $$9_39) {
      ASSERT_skip(d);
      let e = peek();
      if (e >= $$0_30 && e <= $$9_39) {
        let reason = 'Parsed too many digits';
        if (webCompat === WEB_COMPAT_ON) {
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
        } else {
          return regexSyntaxError(reason);
        }
      } else {
        largestBackReference = Math.max(largestBackReference, ((c - $$0_30) * 10) + (d - $$0_30)); // TODO: test the case where largestBackReference was not properly maxed
      }
    } else {
      largestBackReference = Math.max(largestBackReference, c - $$0_30)
    }

    return REGEX_ALWAYS_GOOD;
  }

  function parseRegexCharClass() {
    // Parse a character class (a set of chars by which to match one character)
    // The problem is a combination of;
    // - ranges
    // - u-flag enabling surrogate pairs
    // - surrogate heads and tails can appear without the other without error
    // - flags only known after the body is parsed
    // This leads to situations where the same dash may mean a range with the u-flag and it may mean an actual dash
    // without the u-flag and vice versa. You can even run into situations where the range is different with and without
    // u-flag. In some cases these ranges are both valid, in some cases both invalid, and in some cases only one of the
    // two ranges is valid. Bonkers. And you wont know until you parsed the flags whether which case to enforce!

    // Since we want to parse the regex before knowing the flag and do not want to backtrack, we have to track these
    // ranges and its progress in two separate ways while progressing the pointer of the same lexer. Fun!

    // Note that surrogate pairs (only supported with u-flag) can only appear as a pair as literal characters, or as
    // the unicode ruby escape (`\u{...}`), or as a double quad escape (`\uxxxx\uxxxx`). Other escapes or a mix of
    // these methods will not lead to a pair, which can be important for validating ranges with and without u-flag.

    ASSERT_skip($$SQUARE_L_5B);

    let prev = 0;
    let surrogate = 0; // current surrogate if prev is a head and c is a tail
    let isSurrogate = false;
    let isSurrogateHead = false;
    let wasSurrogate = true; // start at surrogate boundary
    let wasSurrogateHead = false; // there was no prev char
    let urangeOpen = false; // we have not yet seen a range dash in umode
    let urangeLeft = -1; // track codepoint of left of range
    let nrangeOpen = false; // we have not yet seen a range dash in no-umode
    let nrangeLeft = -1; // track codeunit of left of range

    let flagState = REGEX_ALWAYS_GOOD;

    if (eof()) return regexSyntaxError('Encountered early EOF while parsing char class (1)');
    let c = peek();
    if (c === $$XOR_5E) { // the separate inverting caret check is important for surrogate range checks in super edge cases (there's a test)
      ASSERT_skip($$XOR_5E);
      if (eof()) return regexSyntaxError('Encountered early EOF while parsing char class (2)');
      c = peek();
    }

    // With u-flag, a surrogate pair encoded as double unicode quad escapes must be consumed as one char. Without
    // u-flag, each quad must be consumed individually but we must still forward the scanner when finding it (for
    // u-flag support). So we'll cache the second quad, which must be a valid surrogate tail in such case (so no
    // worries about that stuff) so that we can process it separately
    // Keep in mind; no mixing of surrogate pair encoding. Either both literal, one unicode ruby, or double quads.

    while (c !== $$SQUARE_R_5D) {
      // There is no single escape that can be combined with an existing character here as a surrogate pair.
      // Ruby escapes can yield codepoints > 0xffff, and double unicode quad escapes can. Only other way is literal.
      let wasEscape = false;
      let wasDoubleQuad = false;
      let wasBadUniEscape = false;
      let wasPropEscape = false;
      let wasPropOnly = false;
      let wasBadPropEscape = false;
      let wasRubyWebEscape = false;

      let escapeCharUP = 0; // Used for u, p, and P. Meaningless otherwise
      if (c === $$BACKSLASH_5C) {
        ASSERT_skip($$BACKSLASH_5C);
        wasEscape = true;

        if (eof()) {
          regexSyntaxError('Early EOF after backslash in char class');
          return REGEX_CHARCLASS_BAD;
        }

        c = peek();
        escapeCharUP = c;
        let escapePointer = pointer;

        // `c` may be >0xffff by unicode ruby escape or double unicode quad escapes (only...)
        c = parseRegexCharClassEscape(c);

        // TODO: /[\u{01}-a]/ if there is a u-flag, this is ok. no u-flag, `}-a` should fail unless webcompat mode
        // in both cases, at this point, it should not yet fail. strict mode is not relevant.
        // TODO: /[\u01-a]/ similar, if u-flag then \u cannot be atom, but otherwise in webcompat, this can be `1-a`
        // For the ruby case it's easy; if we see a ruby case without u-flag then we know it should be tested against }
        // For the quad case that is harder because it can be any hex value or even `u` and we'd have to propagate that
        // Easiest for quad is to scan back one position, either it's a valid hex digit or `u`. There are no other cases

        if (escapeCharUP === $$U_75) {
          // Webcompat exception; if a \u escape was invalid + there is no u-flag + this is webcompat, then we need to
          // know what the last parsed character was to validate certain range cases (`/[\u{1}-a]/` but also `/[\uab-a]/`)
          if (c === REGEX_CHARCLASS_BAD) {
            // That's one case
            if (eof()) return REGEX_CHARCLASS_BAD;
            if (webCompat === WEB_COMPAT_OFF) return REGEX_CHARCLASS_BAD;

            // [w]: `/[\u]/`
            // [x]: `/[\u]/u`
            // [w]: `/[\uabx]/`
            // [x]: `/[\uabx]/u`
            // [w]: `/[\u{abx}]/`
            // [x]: `/[\u{abx}]/u`
            // Now for the non-u-flag cases it's important to know what the last char value was to validate ranges
            // [x]: `/[\u-a]/`
            // [w]: `/[\u-v]/`
            // [x]: `/[\u{b-a]/`
            // [w]: `/[\u{b-c]/`
            // [x]: `/[\ub-a]/`
            // [w]: `/[\ub-c]/`
            // (If the next char isn't `-` it's not important, but swah)

            // This is a unicode escape (either quad or ruby) that contained illegal chars
            // It will have been parsed until the first invalid character
            // For the sake of ranges, we consider `u` the end of any range that might be open right now and
            // the last parsed character as the start of a next range, if any.
            wasBadUniEscape = true;
            flagState = updateRegexUflagIsIllegal(flagState, 'A broken `\\u` escape can never be valid with u-flag');
            // This one makes `/[a-\u-a]/` work
            wasPropOnly = (pointer - escapePointer) === 1;
          }
          else if ((c & REGEX_CHARCLASS_WAS_RUBY) > 0) {
            // This allows properly checking ranges for the non-uflag state (which must use `}` as the final c here
            // for the non-uflag case, which is relevant for ranges)
            c ^= REGEX_CHARCLASS_WAS_RUBY;
            wasRubyWebEscape = webCompat === WEB_COMPAT_ON;
          }
          else if (c > 0xffff) {
            ASSERT(c <= MAX_VALID_UNICODE_VALUE, 'no other flags');
            wasDoubleQuad = true;
          }
        }
        else if (escapeCharUP === $$P_70 || escapeCharUP === $$P_UC_50) {
          // Webcompat exception; if a \p escape was valid but had no u-flag + there is no u-flag + this is webcompat
          // We need to know what the last parsed character was to validate certain range cases (`/[q-\p{a}-a]/`
          // [x]: `/[\p-a]/`
          // [w]: `/[\p-z]/`
          // [x]: `/[\p{b-a]/`
          // [w]: `/[\p{b-z]/`
          // [x]: `/[\p{b=-<]/`
          // [w]: `/[\p{b=->]/`
          // [x]: `/[\p{b=b-a]/`
          // [w]: `/[\p{b=b-z]/`
          // (If the next char isn't `-` it's not important, but swah)

          // Only care about valid \p escapes, meaning u-flag must still be valid (at least). It kind of doesn't matter
          // if the escape is illegal without u-flag but I don't think that case even exists for `\p`. Maybe eof?

          if (webCompat === WEB_COMPAT_ON) {
            if (c === REGEX_CHARCLASS_BAD || c === (REGEX_CHARCLASS_CLASS_ESCAPE | REGEX_CHARCLASS_BAD) || (c & REGEX_CHARCLASS_BAD_WITH_U_FLAG) === REGEX_CHARCLASS_BAD_WITH_U_FLAG) {
              wasBadPropEscape = true;
            } else {
              // \p is a property escape, only supported with u-flag
              wasPropEscape = true;
              // This one makes `/[a-\p-a]/` and `/[z-\p-a]/` and `/[z-\p-a]/` and `/[\p{Hex_Digit}-z]/` work.
              wasPropOnly = (pointer - escapePointer) === 1;
            }
          }
        }

        if (c === REGEX_CHARCLASS_BAD) {
          if (!wasBadUniEscape) {
            // `/[\N]/`
            ASSERT(lastPotentialRegexError, 'error should be set');
            flagState = regexSyntaxError(lastPotentialRegexError);
          }
        }
        else if (c === (REGEX_CHARCLASS_BAD | REGEX_CHARCLASS_CLASS_ESCAPE)) {
          // (Currently) only happens for property escapes that are illegal
          // `/[\p{x}]/`
          ASSERT(lastPotentialRegexError, 'error should be set');
          flagState = regexSyntaxError(lastPotentialRegexError);
          c = REGEX_CHARCLASS_CLASS_ESCAPE;
        }
        else if (c === REGEX_CHARCLASS_CLASS_ESCAPE) {
          // For example: escaped dash

        }
        else if (c === REGEX_CHARCLASS_ESCAPED_UC_B) {
          // [x]: `/[\B-]/u`
          // [w]: `/[\B-]/`
          // [x]: `/[\B-A]/`
          // [w]: `/[\B-Z]/`

          if (webCompat === WEB_COMPAT_ON) {
            flagState = updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Char class can not contain `\\B`');
          } else {
            flagState = regexSyntaxError('Char class can not contain `\\B`');
          }

          c = $$B_UC_42; // For range checks in web compat mode
        }
        else if (c === REGEX_CHARCLASS_ESCAPED_C) {
          ASSERT(webCompat === WEB_COMPAT_ON, 'only appears with web compat');
          ASSERT(lastPotentialRegexError, 'error should be set');
          flagState = updateRegexUflagIsIllegal(flagState, lastPotentialRegexError);
          c = $$BACKSLASH_5C; // yes... NOT `c`
        }
        else {
          ASSERT(c !== INVALID_IDENT_CHAR, 'I dont think this status flag can reach this point');

          if (c & REGEX_CHARCLASS_BAD_WITH_U_FLAG) {
            c = c ^ REGEX_CHARCLASS_BAD_WITH_U_FLAG; // remove the CHARCLASS_BAD_WITH_U_FLAG flag (dont use ^= because that deopts... atm; https://stackoverflow.com/questions/34595356/what-does-compound-let-const-assignment-mean )
            ASSERT(lastPotentialRegexError, 'error should be set');
            flagState = updateRegexUflagIsIllegal(flagState, lastPotentialRegexError);
            ASSERT(flagState === REGEX_GOOD_SANS_U_FLAG || flagState === REGEX_ALWAYS_BAD, 'either way, the flag state should now reflect "bad with u-flag", or worse');
          }
          if (c & REGEX_CHARCLASS_BAD_SANS_U_FLAG) {
            c = c ^ REGEX_CHARCLASS_BAD_SANS_U_FLAG; // remove the REGEX_CHARCLASS_BAD_SANS_U_FLAG flag (dont use ^= because that deopts... atm; https://stackoverflow.com/questions/34595356/what-does-compound-let-const-assignment-mean )
            ASSERT(lastPotentialRegexError, 'error should be set');
            flagState = updateRegexUflagIsMandatory(flagState, lastPotentialRegexError);
            ASSERT(flagState === REGEX_GOOD_WITH_U_FLAG || flagState === REGEX_ALWAYS_BAD, 'either way, the flag state should now reflect "bad with u-flag", or worse');
          }
        }
        ASSERT(c === REGEX_CHARCLASS_CLASS_ESCAPE || c <= 0x110000, 'c should now be valid unicode range or 0x110000 for error', c);
        // else char class is good :)
      }
      else if (c === $$CR_0D || c === $$LF_0A || c === $$PS_2028 || c === $$LS_2029) {
        return regexSyntaxError('Encountered newline'); // same as end of input
      }
      else {
        ASSERT_skip(c);
      }

      if (wasBadUniEscape) {
        // Do nothing
      }
      else if (wasEscape) {
        // Even if `c` is a surrogate tail, this won't lead to a pair with a previous code unit
        // But if the current codepoint is >0xffff then we still mark it as such
        // Also stops escaped dashes from being interpreted as ranges
        isSurrogate = c > 0xffff;
        ASSERT(!isSurrogate || c === REGEX_CHARCLASS_CLASS_ESCAPE || (c & 0x1fffff) === c, 'non-bmp ranges should be explicitly bounded when they come from escapes', c, isSurrogate, (c & 0x1fffff) === c, c.toString(16), (c & 0x1fffff));
        if (isSurrogate) surrogate = c;
        isSurrogateHead = false;
      }
      else if (wasSurrogateHead && isSurrogateTail(c)) {
        isSurrogate = true;
        isSurrogateHead = false;
        surrogate = getSurrogate(prev, c);
      }
      else {
        isSurrogate = false;
        isSurrogateHead = isSurrogateLead(c);
      }

      // For the case where there IS a u-flag:
      if (urangeOpen) {
        // if c is a head we must check the next char for being a tail before we can determine the code _point_
        // otoh, if c is a tail or a non-surrogate then we can now safely do range checks since the codepoint wont change
        // if this is a head and the previous was too then the previous was the rhs on its own and we check `prev`
        // instead (prev is used for literal surrogate pair chars, unescaped)
        let urangeRight = isSurrogate ? surrogate : wasSurrogateHead ? prev : c;
        if (urangeLeft === REGEX_CHARCLASS_CLASS_ESCAPE || urangeRight === REGEX_CHARCLASS_CLASS_ESCAPE) {
          // Class escapes with u-flag are always illegal for ranges
          flagState = updateRegexUflagIsIllegal(flagState, 'Character class escapes `\\d \\D \\s \\S \\w \\W \\p \\P` not allowed in ranges with u');
        }
        else if (!isSurrogateHead || wasSurrogateHead) {
          urangeOpen = false;
          if (urangeLeft > urangeRight) {
            flagState = updateRegexUflagIsIllegal(flagState, 'Encountered incorrect range (left>right, ' + urangeLeft + ' > ' + urangeRight + ', 0x' + urangeLeft.toString(16) + ' > 0x' + urangeRight.toString(16) + ') which is illegal with u-flag');
          }
          urangeLeft = -1;
        }
        else {
          // range remains open because this was a surrogate head and the next character may still be part of the range
        }
      }
      else if (c === $$DASH_2D && !wasEscape && urangeLeft !== -1) {
        // If the dash was escaped, it should not cause a range
        // [v]: `/[a-]/`
        //          ^
        // [v]: `/[a-b]/`
        //          ^
        urangeOpen = true;
      }
      else {
        ASSERT(urangeOpen === false, 'U: we should only be updating left codepoint if we are not inside a range');
        urangeLeft = isSurrogate ? surrogate : c;
      }

      // https://tc39.es/ecma262/#sec-patterns-static-semantics-early-errors
      // > NonemptyClassRanges :: ClassAtom `-` ClassAtomClassRanges
      // > It is a Syntax Error if IsCharacterClass of the first ClassAtom is true or IsCharacterClass of the second ClassAtom is true.
      // > It is a Syntax Error if IsCharacterClass of the first ClassAtom is false and IsCharacterClass of the second ClassAtom is false and the CharacterValue of the first ClassAtom is larger than the CharacterValue of the second ClassAtom.
      // > NonemptyClassRangesNoDash :: ClassAtomNoDash `-` ClassAtomClassRanges
      // > It is a Syntax Error if IsCharacterClass of ClassAtomNoDash is true or IsCharacterClass of ClassAtom is true.
      // > It is a Syntax Error if IsCharacterClass of ClassAtomNoDash is false and IsCharacterClass of ClassAtom is false and the CharacterValue of ClassAtomNoDash is larger than the CharacterValue of ClassAtom.
      // So a>b is bad regardles of uflag
      // Webcompat does not change this, it only affects isCharacterClass checks
      // https://tc39.es/ecma262/#sec-patterns-static-semantics-early-errors-annexb

      // For the case where there is NO u-flag the rubyHackRhsCurly check will use `}` as the last char of the atom
      let cTmp = wasRubyWebEscape || wasPropEscape ? escapeCharUP : c;
      // If multiple characters were considered one code point with u-flag, we need to process the first and last value
      // here separately for range checks. So for unicode double quad, this will hold the second quad ("low surrogate")
      // while the first is processed. For ruby escapes, `cTmp` holds the `}`, while `u/p/P` is processed first.
      let cTail = c;
      let stillDataLeft = true;
      let rubyHackLhs = wasRubyWebEscape || wasBadUniEscape || wasPropEscape; // "consider rhs of old range to be u/p/P"
      let rubyHackRhsPeek = wasBadUniEscape || (wasBadPropEscape && !wasPropOnly); // "consider lhs of new range to be peek(-1)"
      let rubyHackRhsCurly = wasRubyWebEscape || (wasPropEscape && !wasPropOnly); // "consider lhs of new range to be `}`"
      while (stillDataLeft) {
        // Deal with the "surrogate pair encoded as double quads are ignored without u-flag" case first
        if (wasDoubleQuad) {
          // - `/[\uD800\uDC00-\uFFFF]/`
          //                  ^
          // - `/[\uFFFF-\uD800\uDC00]/`
          //             ^^^^^^^^^^^^
          // `c` contains the ord for the surrogate pair encoded by a quad. The quad _must_ be surrogate head + tail here.
          ASSERT(cTmp > 0xffff, 'a double quad is only consumed if it is a valid surrogate pair, which in turn must be >0xffff');
          // Without u-flag we can only consume the head part here so buffer the tail for next loop iteration
          wasDoubleQuad = false;

          cTail = codePointToSurrogateTail(cTmp);
          cTmp = codePointToSurrogateHead(cTmp);
          ASSERT(cTail >= 0xDC00 && cTail <= 0xDFFF, 'must be surrogate tail');
          ASSERT(cTmp >= 0xD800 && cTmp <= 0xDBFF, 'must be surrogate head');
        } else if (rubyHackLhs) {
          // Start of this escape. Use the escaped char (u p P) to start/end ranges.
          // `\u{xxx}`
          // `\p{xxx}`
          // `\P{xxx}`
          rubyHackLhs = false;
          cTmp = escapeCharUP;
          if (wasPropOnly) stillDataLeft = false;
        } else if (rubyHackRhsCurly) {
          // End of this escape. Use the `}` to start new ranges
          // `\u{xxx}`
          // `\p{xxx}`
          // `\P{xxx}`
          // Valid \u or \p or \P ruby escape
          rubyHackRhsCurly = false;
          cTmp = $$CURLY_R_7D; // This is true for \u ruby escapes and correct \p \P escapes
          stillDataLeft = false;
        } else if (rubyHackRhsPeek) {
          // End of this escape. Use the last char that would still have been valid to start new ranges
          // `\u{xxx`
          // `\p{xxx`
          // `\p{xxx=`
          // `\p{xxx=xxx`
          // `\P{xxx`
          ASSERT(pointer > 0, 'pointer cannot be a the start because regex and class starts with `/[`');
          // If there was an error, the parser would have stopped right before the offending char
          // Note that we want a single code unit here, not code point
          cTmp = peekd(-1);
          rubyHackRhsPeek = false;
          stillDataLeft = false;
        } else {
          // Processing the surrogate tail of a double unicode encoded quad now
          stillDataLeft = false;
          cTmp = cTail; // Note: cTail can still be >0xffff if it's the first iteration
        }

        if (nrangeOpen) {
          const nrangeRight = cTmp; // without u-flag it's always just one char
          if (nrangeLeft === REGEX_CHARCLASS_CLASS_ESCAPE || nrangeRight === REGEX_CHARCLASS_CLASS_ESCAPE) {
            // Class escapes are illegal for ranges, however, they are allowed and ignored in webcompat mode
            if (webCompat === WEB_COMPAT_OFF) {
              // Class escapes without u-flag are illegal for ranges if not in web compat mode
              flagState = updateRegexUflagIsMandatory(flagState, 'Character class escapes `\\d \\D \\s \\S \\w \\W \\p \\P` not allowed in ranges');
            }
          }
          else {
            if (nrangeLeft > nrangeRight) {
              flagState = updateRegexUflagIsMandatory(flagState, 'Encountered incorrect range (left>right, ' + nrangeLeft + ' > ' + nrangeRight + ', 0x' + nrangeLeft.toString(16) + ' > 0x' + nrangeRight.toString(16) + ') when parsing as if without u-flag');
            }
          }
          nrangeLeft = -1;
          nrangeOpen = false;
        }
        else if (cTmp === $$DASH_2D && !wasEscape && nrangeLeft !== -1) {
          ASSERT(nrangeLeft !== -1, 'N if we are opening a range here then we should have parsed and set the left codepoint value by now');
          // If the dash was escaped, it should not cause a range
          nrangeOpen = true;
        }
        else {
          ASSERT(nrangeOpen === false, 'N we should only be updating left codepoint if we are not inside a range');
          nrangeLeft = cTmp;
        }
      }

      wasSurrogate = isSurrogate;
      wasSurrogateHead = isSurrogateHead;
      prev = c;

      if (eof()) {
        return regexSyntaxError('Unexpected early EOF while parsing character class'); // no end
      }
      c = peek();
    }

    ASSERT_skip($$SQUARE_R_5D);

    // Code point range may be open if the rhs was surrogate head. That's the only range case to be checked here.
    // [x]: `/[\B-@{xD800}@]/u`
    // (Note: this is explicitly a case where the rhs of the range is a surrogate head character, not escape, and such
    // a character has the danger of being encoded weirdly / normalized, so I use my test encoding here: `@{x...}@`

    if (urangeOpen && wasSurrogateHead) {
      if (urangeLeft === REGEX_CHARCLASS_CLASS_ESCAPE || prev === REGEX_CHARCLASS_CLASS_ESCAPE) {
        // This might be dead
        return updateRegexUflagIsIllegal(flagState, 'Character class escapes `\\d \\D \\s \\S \\w \\W \\p \\P` are only ok as a range with webcompat, without uflag');
      }

      if (urangeLeft > prev) {
        // [x]: `/[\xffff-@{xD800}@]/`
        // [x]: `/[\xffff-@{xD800}@]/u`
        return updateRegexUflagIsIllegal(flagState, 'Encountered incorrect range end (left>right, ' + urangeLeft + ' > ' + prev + ', 0x' + urangeLeft.toString(16) + ' > 0x' + prev.toString(16) + ') which is illegal with u-flag');
      }

      // [v]: `/[\B-@{xD800}@]/`
      // [v]: `/[\x000f-@{xD800}@]/`
      // [v]: `/[\x000f-@{xD800}@]/u`
      return flagState;
    }

    return flagState;
  }

  ASSERT(surrogateToCodepoint(0xD801, 0xDC37) === 0x10437);
  ASSERT(codePointToSurrogateHead(0x10437) === 0xD801);
  ASSERT(codePointToSurrogateTail(0x10437) === 0xDC37);
  ASSERT(surrogateToCodepoint(codePointToSurrogateHead(0x10437), codePointToSurrogateTail(0x10437)) === 0x10437);

  function surrogateToCodepoint(head, tail) {
    /*
      https://en.wikipedia.org/wiki/UTF-16
      To decode U+10437 (𐐷) from UTF-16:
      Take the high surrogate (0xD801) and subtract 0xD800, then multiply by 0x400, resulting in 0x0001 * 0x400 = 0x0400.
      Take the low surrogate (0xDC37) and subtract 0xDC00, resulting in 0x37.
      Add these two results together (0x0437), and finally add 0x10000 to get the final decoded UTF-32 code point, 0x10437.

      We have to reverse this process... :/ Above, we applied the following:
      codepoint = ((((firstPart & 0x3ff) << 10) | (secondPart & 0x3ff)) + 0x10000);

      The reverse:
      Tail: ((result-0x10000) >> 10) + 0xD800
      Head: ((result-0x10000) & 0b1111111111) + 0xDC00
    */
    return ((((head & 0x3ff) << 10) | (tail & 0x3ff)) + 0x10000);
  }
  function codePointToSurrogateTail(codepoint) {
    /*
      https://en.wikipedia.org/wiki/UTF-16
      To decode U+10437 (𐐷) from UTF-16:
      Take the high surrogate (0xD801) and subtract 0xD800, then multiply by 0x400, resulting in 0x0001 * 0x400 = 0x0400.
      Take the low surrogate (0xDC37) and subtract 0xDC00, resulting in 0x37.
      Add these two results together (0x0437), and finally add 0x10000 to get the final decoded UTF-32 code point, 0x10437.

      We have to reverse this process... :/ Above, we applied the following:
      codepoint = ((((firstPart & 0x3ff) << 10) | (secondPart & 0x3ff)) + 0x10000);

      The reverse:
      Tail: ((result-0x10000) >> 10) + 0xD800
      Head: ((result-0x10000) & 0b1111111111) + 0xDC00
     */
    return ((codepoint - 0x10000) & 0b1111111111) + 0xDC00
  }
  function codePointToSurrogateHead(codepoint) {
    /*
      https://en.wikipedia.org/wiki/UTF-16
      To decode U+10437 (𐐷) from UTF-16:
      Take the high surrogate (0xD801) and subtract 0xD800, then multiply by 0x400, resulting in 0x0001 * 0x400 = 0x0400.
      Take the low surrogate (0xDC37) and subtract 0xDC00, resulting in 0x37.
      Add these two results together (0x0437), and finally add 0x10000 to get the final decoded UTF-32 code point, 0x10437.

      We have to reverse this process... :/ Above, we applied the following:
      codepoint = ((((firstPart & 0x3ff) << 10) | (secondPart & 0x3ff)) + 0x10000);

      The reverse:
      Tail: ((result-0x10000) >> 10) + 0xD800
      Head: ((result-0x10000) & 0b1111111111) + 0xDC00
     */
    return ((codepoint - 0x10000) >> 10) + 0xD800
  }

  function parseRegexCharClassEscape(c) {
    ASSERT(parseRegexCharClassEscape.length === arguments.length, 'arg count');

    // atom escape is slightly different from charclass escape

    // https://www.ecma-international.org/ecma-262/7.0/#sec-classescape

    let s = c >= 0x7f ? REGCLS_ESC_UNICODE : regexClassEscapeStartJumpTable[c];

    switch (s) {
      case REGCLS_ESC_NSC:
        // Non special character
        // IdentityEscape
        // with u-flag: forward slash or syntax character (`^$\.*+?()[]{}|`) and these cases are already caught above
        // without-u-flag: SourceCharacter but not UnicodeIDContinue
        // without-u-flag in webcompat: SourceCharacter but not `c`, and not `k` iif there is a regex groupname

        ASSERT_skip(c);

        ASSERT(![$$BACKSLASH_5C, $$K_6B, $$C_63, $$XOR_5E, $$$_24, $$DOT_2E, $$STAR_2A, $$PLUS_2B, $$QMARK_3F, $$PAREN_L_28, $$PAREN_R_29, $$SQUARE_L_5B, $$SQUARE_R_5D, $$CURLY_L_7B, $$CURLY_R_7D, $$OR_7C].includes(c), 'all these u-flag chars should be checked above');
        if (webCompat === WEB_COMPAT_ON) {
          // https://tc39.es/ecma262/#prod-annexB-IdentityEscape
          updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Cannot escape `' + String.fromCharCode(c) + '` in a regex char class with the u-flag');
          return c | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
        }

        // so we can already not be valid for u flag, we just need to check here whether we can be valid without u-flag
        // (any unicode continue char would be a problem)
        if (isIdentRestChr(c, pointer) === INVALID_IDENT_CHAR) {
          // c is not unicode continue char
          updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Cannot escape `' + String.fromCharCode(c) + '` in a regex char class with the u-flag');
          return c | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
        }

        ASSERT(isIdentRestChr(c, pointer) === VALID_SINGLE_CHAR, 'c is not unicode since that is caught elsewhere');

        // Return bad char class because the escape is bad
        regexSyntaxError('Cannot escape `' + String.fromCharCode(c) + '` in a regex char class');
        return REGEX_CHARCLASS_BAD;

      case REGCLS_ESC_UNICODE: {
        // This is an escape in a regex charclass (!)
        // c is >0xfe and <0xffff (because it was peek()ed)

        // https://tc39.es/ecma262/#prod-ClassEscape (not IdentityEscape !!)
        // https://tc39.es/ecma262/#prod-IdentityEscape
        //   [+U] SyntaxCharacter
        //   [+U] /
        //   [~U] SourceCharacter but not UnicodeIDContinue
        // In web compat:
        // https://tc39.es/ecma262/#prod-annexB-IdentityEscape
        // https://tc39.es/ecma262/#prod-annexB-SourceCharacterIdentityEscape
        // SourceCharacterIdentityEscape[N]::
        //   [~N] SourceCharacter but not c
        //   [+N] SourceCharacter but not one of c or k
        // (Note: this branch has c>0xffff so we don't care about `c` or `k` in web compat)

        // The \u1000 is "CJK Unified Ideograph-5000", a "other letter" category https://codepoints.net/U+1000
        // The \u3000 is "Ideographic Space-3000", a "space separator" category https://codepoints.net/U+3000
        // the \u10000 is "Linear B Syllable B008 A", a "other letter" category https://codepoints.net/U+10000
        // the \u11049 is "Brahmi Punctuation Dot", a "other punctuation" category https://codepoints.net/U+11049
        // [w]: `/[\@{x1000}@]/`
        // [x]: `/[\@{x1000}@]/u`
        // [v]: `/[\@{x3000}@]/`
        // [x]: `/[\@{x3000}@]/u`
        // [v]: `/[\@{x10000}@]/`        Without u it's escaping the surrogate head
        // [x]: `/[\@{x10000}@]/u`       u-flag always only allows strict set
        // [v]: `/[\@{x11049}@]/`        Without u it's escaping the surrogate head
        // [x]: `/[\@{x11049}@]/u`       u-flag always only allows strict set

        // This is illegal with u-flag regardless because then you can only escape a handful of characters.
        updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Cannot escape `' + String.fromCharCode(c) + '` in a char class with the u-flag');

        if (webCompat === WEB_COMPAT_ON) {
          ASSERT_skip(c);

          ASSERT(c >= 0x7f && c <= 0xffff, 'String.fromCodePoint can throw for OOB but c was peeked so is 0x7e~0xffff', c);

          // The "ascii" value of an illegal escape is the value of the character escaped. So we just return `c` for it.
          // (If this was a surrogate pair, `c` will only be the head!)
          return c | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
        }

        // No web compat so this is: `[~U] SourceCharacter but not UnicodeIDContinue`

        let wide = isIdentRestChr(c, CODEPOINT_FROM_ESCAPE); // c is peeked, do not allow to parse a whole codepoint

        if (wide === VALID_SINGLE_CHAR) {
          // Note: u-flag does not allow this for any code point, so no exception here.
          // String.fromCodePoint can throw for OOB but c should be within unicode bounds ...
          regexSyntaxError('Cannot escape `' + String.fromCodePoint(c) + '` in a char class');
          return REGEX_CHARCLASS_BAD;
        }

        ASSERT(wide === INVALID_IDENT_CHAR, 'c cannot be a wide ident so it must be invalid here');

        if (c === $$PS_2028 || c === $$LS_2029) {
          // Line continuation is not supported in regex char class and the escape is explicitly disallowed
          // https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator

          // [v]: `/[\@{x2028}@]/`
          // [x]: `/[\@{x2029}@]/u`
          // [x]: `/[\@{x2029}@]/`

          ASSERT_skip(c);
          regexSyntaxError('Regular expressions do not support line continuations (escaped x2028 x2029)');
          return REGEX_CHARCLASS_BAD;
        }

        // c is not unicode continue char and this is not web compat mode so it is ok (without u-flag)

        ASSERT_skip(c);

        return c | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
      }

      case REGCLS_ESC_u:
        // \u<????> and \u{<?..?>}
        ASSERT_skip($$U_75);
        return parseUnicodeEscapeForRegexCharClass();

      case REGCLS_ESC_x:
        // \x<??>
        ASSERT_skip($$X_78);
        if (eofd(1)) {
          // Since we are in a class, the regex must have at least two more characters at all, not to crash
          // so something like `/[\x]/` would not be prevented by this check
          regexSyntaxError('Found EOF before completely parsing a hex escape (in a char class of a regex)');
          return REGEX_CHARCLASS_BAD;
        }

        let a = peek();
        let va = getHexValue(a);
        if (va === HEX_OOB) {
          if (webCompat === WEB_COMPAT_ON) {
            // I think the \x should be accepted as SourceCharacterIdentityEscape now
            updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'First character of hex escape was invalid');
            return $$X_78 | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
          }

          regexSyntaxError('First character of hex escape was invalid');
          return REGEX_CHARCLASS_BAD;
        }
        ASSERT_skip(a);

        let b = peek();
        let vb = getHexValue(b);
        if (vb === HEX_OOB) {
          if (webCompat === WEB_COMPAT_ON) {
            // I think the \x should be accepted as SourceCharacterIdentityEscape now
            updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Second character of hex escape was invalid');
            return $$X_78 | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
          }

          regexSyntaxError('Second character of hex escape was invalid');
          return REGEX_CHARCLASS_BAD;
        }
        ASSERT_skip(b);

        return (va << 4) | vb;

      case REGCLS_ESC_c: {
        // char escapes \c<?>
        ASSERT_skip($$C_63);

        if (eof()) {
          regexSyntaxError('Early EOF while parsing `\\c` in a character class');
          return REGEX_CHARCLASS_BAD;
        }

        let d = peek();
        if (isAsciiLetter(d)) {
          ASSERT_skip(d);

          // https://tc39.es/ecma262/#sec-patterns-static-semantics-character-value
          // > CharacterEscape :: `c` ControlLetter
          //   > Let ch be the code point matched by ControlLetter.
          //   > Let i be ch's code point value.
          //   > Return the remainder of dividing i by 32.
          // Basically \c is a way to encode the first 26 ascii characters safely, A=1, Z=26, a=1, z=26
          return d % 32;
        }
        let reason = 'The `\\c` escape is only legal in a char class without u-flag and in webcompat mode';
        if (webCompat === WEB_COMPAT_ON) {
          updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
          // This is now an `IdentityEscape` and just parses the `c` itself
          // The "character value" will be the backslash (!), NOT the value of `c`
          // This is relevant for tests like `/[a-\c]/` (bad) vs `/[A-\c]/` (good)
          return REGEX_CHARCLASS_ESCAPED_C; // This is the only way to update the uflagState at call site :/
        }
        regexSyntaxError(reason);
        return REGEX_CHARCLASS_BAD;
      }

      case REGCLS_ESC_k:
        ASSERT_skip($$K_6B);
        if (webCompat === WEB_COMPAT_ON) {
          // A character class is not allowed to have `\k` back references.
          // In webcompat mode without uflag, you can have `\k` appear as long as it has no `<name>` following it and
          // as long as there is not an actual usage of named capturing groups in the same regex.
          // We use globals to track that state because it applies retroactively for the whole regex.
          kCharClassEscaped = true;
          updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Can only have `\\k` in a char class without u-flag and in webcompat mode');
          // Note: identity escapes have the escaped char as their "character value", so return `k`
          return $$K_6B | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
        }
        regexSyntaxError('A character class is not allowed to have `\\k` back-reference');
        return REGEX_CHARCLASS_BAD;

      case REGCLS_ESC_b:
        // \b
        ASSERT_skip($$B_62);
        // https://tc39.github.io/ecma262/#sec-patterns-static-semantics-character-value
        // ClassEscape :: b
        //   Return the code point value of U+0008 (BACKSPACE).
        return $$BACKSPACE_08;

      case REGCLS_ESC_B: {
        // \B
        // "A ClassAtom can use any of the escape sequences that are allowed in the rest of the regular expression
        // except for \b, \B, and backreferences. Inside a CharacterClass, \b means the backspace character, while
        // \B and backreferences raise errors. Using a backreference inside a ClassAtom causes an error."
        // Note: without u-flag in web compat mode this is actually just a B.
        // Caller should take care of error, this is why we're feeding back a special code
        ASSERT_skip($$B_UC_42);
        return REGEX_CHARCLASS_ESCAPED_UC_B;
      }

      case REGCLS_ESC_f:
        // control escape \f
        ASSERT_skip($$F_66);
        return 0x000C;

      case REGCLS_ESC_n:
        // control escape \n
        ASSERT_skip($$N_6E);
        return 0x000A;

      case REGCLS_ESC_r:
        // control escape \r
        ASSERT_skip($$R_72);
        return 0x000D;

      case REGCLS_ESC_t:
        // control escape \t
        ASSERT_skip($$T_74);
        return 0x0009;

      case REGCLS_ESC_v:
        // control escape \v
        ASSERT_skip($$V_76);
        return 0x000B;

      case REGCLS_ESC_ERR:
        // char class escapes \d \D \s \S \w \W
        // "an error occurs if either ClassAtom does not represent a single character (for example, if one is \w)
        // but this only applies to ranges... so we need to create a special token for this to make the distinction
        // because we dont know right now whether c is part of a range or not. in fact it may only be part of a
        // range with or without u flag but not the other. so difficult.
        ASSERT_skip(c);

        // https://tc39.es/ecma262/#sec-patterns-static-semantics-early-errors
        // > NonemptyClassRangesNoDash :: ClassAtomNoDash `-` ClassAtomClassRanges
        // > It is a Syntax Error if IsCharacterClass of ClassAtomNoDash is true or IsCharacterClass of ClassAtom is true.
        //
        // https://tc39.es/ecma262/#sec-patterns-static-semantics-early-errors-annexb
        // This says that under webcompat mode, this rule only applies with u-flag

        return REGEX_CHARCLASS_CLASS_ESCAPE;

      case REGCLS_ESC_pP:
        // Unicode property escapes \p{<?...?>} \P{<?...?>}
        // With uflag, the \p is a unicode property escape and must look like \p{x} or \p{x=y} with x and y whitelisted
        // Without uflag, the \p it leads to IdentityEscape where it fails for any value that is in ID_CONTINUE, inc p
        // In webcompat mode, without uflag, it leads to SourceCharacterIdentityEscape and passes without "body"
        const FROM_CHARCLASS = true;
        let regexPropState = parseRegexPropertyEscape(c, FROM_CHARCLASS);

        if (regexPropState === REGEX_ALWAYS_BAD) {
          ASSERT(lastPotentialRegexError, 'should be set');
          ASSERT(lastReportableLexerError, 'should be set');
          return REGEX_CHARCLASS_CLASS_ESCAPE | REGEX_CHARCLASS_BAD;
        }

        if (regexPropState === REGEX_GOOD_SANS_U_FLAG) {
          ASSERT(lastPotentialRegexError, 'should be set');
          // semantically ignored without u-flag, syntactically only okay in web-compat / Annex B mode
          return REGEX_CHARCLASS_CLASS_ESCAPE | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
        }

        if (regexPropState === REGEX_GOOD_WITH_U_FLAG) {
          ASSERT(lastPotentialRegexError, 'should be set');
          ASSERT(webCompat === WEB_COMPAT_OFF, 'there is no valid uflag case that is invalid in webcompat');
          // webcompat mode has no effect to the u-flag...
          return REGEX_CHARCLASS_CLASS_ESCAPE | REGEX_CHARCLASS_BAD_SANS_U_FLAG;
        }

        ASSERT(regexPropState === REGEX_ALWAYS_GOOD, 'parseRegexPropertyEscape should return enum');
        ASSERT(webCompat === WEB_COMPAT_ON, 'can only be always good in webcompat?');
        // https://tc39.es/ecma262/#sec-patterns-static-semantics-character-value
        return REGEX_CHARCLASS_CLASS_ESCAPE;

      // digits
      // https://tc39.github.io/ecma262/#prod-CharacterClass
      // https://tc39.github.io/ecma262/#prod-ClassRanges
      // https://tc39.github.io/ecma262/#prod-NonemptyClassRanges
      // https://tc39.github.io/ecma262/#prod-ClassAtom
      // https://tc39.github.io/ecma262/#prod-ClassAtomNoDash
      // https://tc39.github.io/ecma262/#prod-ClassEscape
      // https://tc39.github.io/ecma262/#prod-CharacterEscape
      //   the last two are LegacyOctalEscapeSequence (but only ~U) and then IdentityEscape (any other)
      // - https://tc39.github.io/ecma262/#prod-annexB-LegacyOctalEscapeSequence
      // - https://tc39.github.io/ecma262/#prod-IdentityEscape
      //     SourceCharacter but not UnicodeIDContinue
      //     but;
      //     https://tc39.github.io/ecma262/#prod-annexB-IdentityEscape
      //     https://tc39.github.io/ecma262/#prod-annexB-SourceCharacterIdentityEscape
      //     SourceCharacter but not one of c or k
      // so; try to parse an octal first. this should work unless it starts with 8 or 8, in that case parse IdentityEscape
      case REGCLS_ESC_0: {
        ASSERT_skip(c);
        // cannot be followed by another digit
        if (neof() && isAsciiNumber(peek())) {
          let reason = 'An escaped zero cannot be followed by another number because that would be an octal escape';
          if (webCompat === WEB_COMPAT_ON) {
            updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
            return parseOctalFromSecondDigit(c) | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
          }
          regexSyntaxError(reason);
          return REGEX_CHARCLASS_BAD;
        }
        return $$NULL_00;
      }

      case REGCLS_ESC_1234567: {
        ASSERT_skip(c);
        let reason = 'A character class is not allowed to have numeric back-reference';

        // Without web compat this is a back reference which is illegal in character classes
        if (webCompat === WEB_COMPAT_ON) {
          updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
          return parseOctalFromSecondDigit(c) | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
        }

        regexSyntaxError(reason);
        return REGEX_CHARCLASS_BAD;
      }

      case REGCLS_ESC_89:
        ASSERT_skip(c);
        return parseDecimalEscape(c);

      case REGCLS_ESC_SYNTAX:
        // \$ \^ etc
        ASSERT_skip(c);
        return c;

      case REGCLS_ESC_DASH: {
        // \-
        ASSERT_skip($$DASH_2D);
        if (webCompat === WEB_COMPAT_ON) {
          return $$DASH_2D;
        }
        // only valid with u-flag!
        updateRegexUflagIsMandatory(REGEX_ALWAYS_GOOD, 'Escaping a dash in a char class is not allowed');
        return $$DASH_2D | REGEX_CHARCLASS_BAD_SANS_U_FLAG;
      }

      case REGCLS_ESC_NL:
        // Line continuation is not supported in regex char class and the escape is explicitly disallowed
        // https://tc39.es/ecma262/#prod-RegularExpressionNonTerminator
        ASSERT_skip(c);
        regexSyntaxError('Regular expressions do not support line continuations (escaped newline)');
        return REGEX_CHARCLASS_BAD;

      // <SCRUB ASSERTS>
      default:
        ASSERT(false, 'unreachable', c);
      // </SCRUB ASSERTS>
    }

    ASSERT(false, 'unreachable');
  }
  function parseRegexPropertyEscape(c, fromCharClass) {
    ASSERT(parseRegexPropertyEscape.length === arguments.length, 'arg count');
    ASSERT(c === $$P_70 || c === $$P_UC_50, 'this should be \\p or \\P', c);
    ASSERT(peek() === c, 'not yet consumed');

    // introduced in ES9 / ES2018; https://github.com/tc39/proposal-regexp-unicode-property-escapes
    if (!supportRegexPropertyEscapes) {
      let uflagState = updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escapes are not supported by the currently targeted language version');
      if (webCompat === WEB_COMPAT_ON) return uflagState;
      return updateRegexUflagIsMandatory(uflagState, 'Cannot escape `\\p` without u-flag');
    }

    // https://tc39.github.io/ecma262/#prod-CharacterClassEscape
    // Note: the `\p` is illegal in non-u-flag regexes because `p` and `P` are not part of CharacterClassEscape
    // Additionally, the parser would trip over the curlies that ought to follow it since it'd be an invalid range.
    // It would be fine in web-compat because neither is a problem in the escape bit (see the IdentityEscape in
    // https://tc39.github.io/ecma262/#prod-annexB-CharacterEscape) nor for the braces (see ExtendedPatternCharacter in
    // https://tc39.github.io/ecma262/#prod-annexB-ExtendedAtom). And since the syntax of `\p` is tightly controlled
    // through the whitelist, a valid \p without u-flag should only change semantics without causing potential syntax
    // errors (not even quantifiers, since a valid `\p` can not lead to a quantified `\p`, so another quantifier is ok).

    // With uflag, the \p is a unicode property escape and must look like \p{x} or \p{x=y} with x and y whitelisted
    // Without uflag, the \p it leads to IdentityEscape where it fails for any value that is in ID_CONTINUE, inc p
    // In webcompat mode, without uflag, it leads to SourceCharacterIdentityEscape and passes without "body"

    // So beyond validating the `\p`, the only edge case for an invalid `\p` is non-uflag in web compat where we must
    // take care not to allow a quantifier after a quantified `\p`, like `\p{1}{1}` or `\p{1}*` or `\p{1}??`. Parsing
    // should stop in webcompat as soon as a char is non-ident. In that case it _cant_ have parsed a quantifier.

    // skip the `p` and assert it is immediately followed by a curly
    ASSERT_skip(c);

    if (eof()) return regexSyntaxError('Early EOF after a regex `\\p`'); // This can never be valid so *shrug*

    if (peek() !== $$CURLY_L_7B) {
      if (webCompat === WEB_COMPAT_ON) return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escape `\\p` must start with a curly bracket');
      return regexSyntaxError('Property escape `\\p` must start with a curly bracket');
    }

    c = ASSERT_skipPeek($$CURLY_L_7B);

    // While there is particular syntax for parsing the name, the name must ultimately pass a hardcoded whitelist
    // and so we don't have to parse with much care. Just consume alphanumeric chars into the name and value until
    // the next is not alnum, then act accordingly. The whitelist will fix everything. Let the error path be slow.

    let pointerOffset = pointer;
    let name = '';
    let sawCommas = 0;
    let hasEq = false;
    let value = '';

    do {
      if ((c >= $$A_61 && c <= $$Z_7A) || (c >= $$A_UC_41 && c<= $$Z_UC_5A) || c === $$LODASH_5F) {
        // The whitelist only contains a-zA-Z and _
      }
      else if (c === $$CURLY_R_7D) {
        break;
      }
      else if (c === $$IS_3D) {
        if (pointerOffset === pointer) {
          // [w]: `/\p{=Connector_Punctuation}/g;`
          //           ^
          if (webCompat === WEB_COMPAT_ON) {
            return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escape `\\p` had no value after the `=` which is illegal');
          }

          return regexSyntaxError('Property escape `\\p` had no value after the `=` which is illegal');
        }

        if (hasEq) {
          // Property escape "args" can not contain double `=`
          // This can be `\p` in web compat without u-flag and is an error otherwise
          if (webCompat === WEB_COMPAT_ON) {
            return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escape `\\p` contained double equal sign, which is not valid');
          }

          return regexSyntaxError('Property escape `\\p` contained double equal sign, which is not valid');
        }

        hasEq = true;
        name = slice(pointerOffset, pointer);
        pointerOffset = pointer + 1;
      }
      else {
        // Any other character means end of this property escape. It might still be valid in webcompat without uflag...
        // This can be `\p` in web compat without u-flag and is an error otherwise
        if (webCompat === WEB_COMPAT_ON) {
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1) + '`');
        }

        return regexSyntaxError('Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1) + '`');
      }

      c = ASSERT_skipPeek(c);

      if (eof()) {
        // [w]: `/\p{abc=abc/`        // This could still be valid in web compat mode...
        //                  ^
        // [x]: `/\p{abc=abcx`        // Can only be valid if `c` is now a forward slash ... otherwise regex is unclosed
        //                  ^
        // [x]: `/[\p{abc=abc]`      // And a char class can't be saved here
        //                    ^

        if (webCompat === WEB_COMPAT_ON) {
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Encountered early EOF while parsing `\\p` property escape');
        }

        return regexSyntaxError('Encountered early EOF while parsing `\\p` property escape');
      }
    } while (true);

    if (pointerOffset === pointer) {
      if (webCompat === WEB_COMPAT_ON) {
        if (hasEq) {
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escape `\\p` had no value after the `=` which is illegal');
        }
        return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1) + '`');
      }

      if (hasEq) {
        return regexSyntaxError('Property escape `\\p` had no value after the `=` which is illegal');
      }
      return regexSyntaxError('Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1) + '`');
    }

    if (hasEq) value = slice(pointerOffset, pointer);
    else name = slice(pointerOffset, pointer);

    ASSERT(c === $$CURLY_R_7D, 'For any error the loop returns early so this should be closing curly');
    ASSERT(name, 'there should be a name now');
    ASSERT(!hasEq || value, 'if there was an eq there should now be a value');

    // The name and value must end up composing a name that is part of an explicitly, albeit large, defined set
    // It should be a syntax error if the names do not appear on their list.

    // Two cases now; Either this property is a single ident or it's a name=value pair
    // https://tc39.es/ecma262/#sec-patterns-static-semantics-early-errors
    // UnicodePropertyValueExpression :: UnicodePropertyName = UnicodePropertyValue
    // > It is a Syntax Error if the List of Unicode code points that is SourceText of UnicodePropertyName is not identical to a List of Unicode code points that is a Unicode property name or property alias listed in the “Property name and aliases” column of Table 54.
    // > It is a Syntax Error if the List of Unicode code points that is SourceText of UnicodePropertyValue is not identical to a List of Unicode code points that is a value or value alias for the Unicode property or property alias given by SourceText of UnicodePropertyName listed in the “Property value and aliases” column of the corresponding tables Table 56 or Table 57.
    // UnicodePropertyValueExpression :: LoneUnicodePropertyNameOrValue
    // > It is a Syntax Error if the List of Unicode code points that is SourceText of LoneUnicodePropertyNameOrValue is not identical to a List of Unicode code points that is a Unicode general category or general category alias listed in the “Property value and aliases” column of Table 56, nor a binary property or binary property alias listed in the “Property name and aliases” column of Table 55.

    // https://tc39.es/ecma262/#table-nonbinary-unicode-properties
    let nc = ',' + name + ',';
    if (hasEq) {
      // > UnicodePropertyValueExpression :: UnicodePropertyName `=` UnicodePropertyValue
      // > It is a Syntax Error if the List of Unicode code points that is SourceText of UnicodePropertyName is not
      //   identical to a List of Unicode code points that is a Unicode property name or property alias listed in the
      //   “Property name and aliases” column of Table 57.
      // > It is a Syntax Error if the List of Unicode code points that is SourceText of UnicodePropertyValue is not
      //   identical to a List of Unicode code points that is a value or value alias for the Unicode property or
      //   property alias given by SourceText of UnicodePropertyName listed in the “Property value and aliases” column
      //   of the corresponding tables Table 59 or Table 60.
      // "Table 57": https://tc39.es/ecma262/#table-nonbinary-unicode-properties
      // "Table 59": https://tc39.es/ecma262/#table-unicode-general-category-values
      // "Table 60": https://tc39.es/ecma262/#table-unicode-script-values

      // No need to post-validate webcompat without u-flag (due to the `=`)
      // Validate name against non binary unicode props
      if (!TABLE_NONBIN_UNI_PROPS.includes(nc)) {
        if (webCompat === WEB_COMPAT_ON) {
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'The `\\p` escaped binary property name `' + name + '` is not valid (does not appear in "table-nonbinary-unicode-properties")');
        }

        return regexSyntaxError('The `\\p` escaped binary property name `' + name + '` is not valid (does not appear in "table-nonbinary-unicode-properties")');
      }

      // Validate value against general category values and script values
      let vc = ',' + value + ',';
      if (!TABLE_GEN_CAT_VALUES.includes(vc) && !TABLE_SCRIPT_VALUES.includes(vc)) {
        if (webCompat === WEB_COMPAT_ON) {
          return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'The escaped property value `' + value + '` is not valid (does not appear in "table-unicode-general-category-values" nor "table-unicode-script-values")')
        }

        return regexSyntaxError('The escaped property value `' + value + '` is not valid (does not appear in "table-unicode-general-category-values" nor "table-unicode-script-values")')
      }

      // The actual `\p` is only valid with u-flag. However, with web-compat, a correct `\p` escape is also valid
      // without u-flag. It's just considered a set of atoms, ending with `}` as atom / character.

      ASSERT_skip($$CURLY_R_7D);

      if (webCompat === WEB_COMPAT_ON) {
        return REGEX_ALWAYS_GOOD;
      }

      return updateRegexUflagIsMandatory(REGEX_ALWAYS_GOOD, 'The `\\p` property escape is only legal with a u-flag, or as a webcompat edge case');
    }

    // This is LoneUnicodePropertyNameOrValue
    // > It is a Syntax Error if the List of Unicode code points that is SourceText of LoneUnicodePropertyNameOrValue
    // > is not identical to a List of Unicode code points that is a Unicode general category or general category alias
    // > listed in the “Property value and aliases” column of Table 59, nor a binary property or binary property alias
    // > listed in the “Property name and aliases” column of Table 58.
    // "Table 58": https://tc39.es/ecma262/#table-binary-unicode-properties
    // "Table 59": https://tc39.es/ecma262/#table-unicode-general-category-values

    // Validate value against non-binary unicode properties or general category values
    if (!TABLE_BIN_UNI_PROPS.includes(nc) && !TABLE_GEN_CAT_VALUES.includes(nc)) {
      if (webCompat === WEB_COMPAT_ON) {
        return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'The escaped lone property name `' + name + '` is not valid (does not appear in "table-binary-unicode-properties" nor "table-unicode-general-category-values")');
      }

      return regexSyntaxError('The escaped lone property name `' + name + '` is not valid (does not appear in "table-binary-unicode-properties" nor "table-unicode-general-category-values") with u-flag, and `\\p` is not valid without u-flag and without webcompat');
    }

    // The actual `\p` is only valid with u-flag. However, with web-compat, a correct `\p` escape is also valid
    // without u-flag. It's just considered a set of atoms, ending with `}` as atom / character.

    ASSERT_skip($$CURLY_R_7D);

    if (webCompat === WEB_COMPAT_ON) {
      return REGEX_ALWAYS_GOOD;
    }

    return updateRegexUflagIsMandatory(REGEX_ALWAYS_GOOD, 'The `\\p` property escape is only legal with a u-flag, or as a webcompat edge case');
  }
  function parseRegexFlags() {
    // there are 5 valid flags and in unicode mode each flag may only occur once
    // 12.2.8.1: "It is a Syntax Error if FlagText of RegularExpressionLiteral contains any code points other than "g", "i", "m", "u", or"y", or if it contains the same code point more than once."

    let g = 0;
    let i = 0;
    let m = 0;
    let u = 0;
    let y = 0;
    let s = 0;
    while (neof()) {
      let c = peek();
      switch (c) {
        case $$G_67:
          ++g;
          break;
        case $$I_69:
          ++i;
          break;
        case $$M_6D:
          ++m;
          break;
        case $$U_75:
          ++u; // `\u{...}`, `\p{..}`, and `\P{..}` are only supported with this flag
          break;
        case $$Y_79:
          ++y;
          break;
        case $$S_73:
          if (!supportRegexDotallFlag) {
            return THROW('The dotall flag `s` is not supported in the currently targeted language version', pointer, pointer);
          }
          ++s; // dotall flag was added in es9 / es2018
          break;
        default:
          if (isAsciiLetter(c) || c === $$BACKSLASH_5C) {
            // Unknown flags are considered syntax errors by the semantics and flags cannot be escaped
            return regexSyntaxError('Unknown regex flag [ord=' + c + ', `' + String.fromCharCode(c) + '`)]');
          }

          // If any flags occurred more than once, the or below will result in >1
          if ((g|i|m|u|y|s) > 1) {
            return regexSyntaxError('Encountered at least one regex flag twice');
          }

          return u > 0 ? REGEX_GOOD_WITH_U_FLAG : REGEX_GOOD_SANS_U_FLAG;
      }

      ASSERT_skip(c);
    }

    // If any flags occurred more than once, the or below will result in >1
    if ((g|i|m|u|y|s) > 1) {
      return regexSyntaxError('Encountered at least one regex flag twice');
    }

    return u > 0 ? REGEX_GOOD_WITH_U_FLAG : REGEX_GOOD_SANS_U_FLAG;
  }
  function parseRegexCurlyQuantifier(c) {
    ASSERT(parseRegexCurlyQuantifier.length === arguments.length, 'arg count');
    ASSERT(isAsciiNumber(c), 'call site will have asserted that the first next char is a digit');

    // Parsed the curly, verified first next char is a digit
    // Verify the range is not {hi,lo}
    // "Octal" numbers (starting with 0) seem to be fine

    // next should be a digit
    let min = 0;
    while (isAsciiNumber(c)) {
      min = (min * 10) + (c - $$0_30);
      ASSERT_skip(c);
      if (eof()) return REGEX_PARTIAL_CURLY_QUANTIFIER;
      c = peek();
    }

    if (c !== $$COMMA_2C) {
      if (c !== $$CURLY_R_7D) return REGEX_PARTIAL_CURLY_QUANTIFIER;

      ASSERT_skip($$CURLY_R_7D);

      return REGEX_VALID_CURLY_QUANTIFIER;
    }

    ASSERT_skip($$COMMA_2C);

    if (eof()) return REGEX_PARTIAL_CURLY_QUANTIFIER;

    c = peek();

    if (!isAsciiNumber(c)) {
      if (c !== $$CURLY_R_7D) return REGEX_PARTIAL_CURLY_QUANTIFIER;

      ASSERT_skip($$CURLY_R_7D);

      return REGEX_VALID_CURLY_QUANTIFIER;
    }

    let max = 0; // ascii for 0x30 is digit `0`
    do {
      max = (max * 10) + (c - $$0_30);
      ASSERT_skip(c);
      if (eof()) return REGEX_PARTIAL_CURLY_QUANTIFIER;
      c = peek();
    } while (isAsciiNumber(c));

    if (c !== $$CURLY_R_7D) return REGEX_PARTIAL_CURLY_QUANTIFIER;

    ASSERT_skip($$CURLY_R_7D);

    if (min <= max) return REGEX_VALID_CURLY_QUANTIFIER;
    return REGEX_INVALID_CURLY_QUANTIFIER;
  }
  function isSurrogateLead(c) {
    // "A sequence of two code units, where the first code unit c1 is in the range 0xD800 to 0xDBFF and the second code unit c2 is in the range 0xDC00 to 0xDFFF, is a surrogate pair and is interpreted as a code point with the value (c1 - 0xD800) × 0x400 + (c2 - 0xDC00) + 0x10000. (See 10.1.2)
    return c >= 0xD800 && c <= 0xDBFF;
  }
  function isSurrogateTail(c) {
    // "A sequence of two code units, where the first code unit c1 is in the range 0xD800 to 0xDBFF and the second code unit c2 is in the range 0xDC00 to 0xDFFF, is a surrogate pair and is interpreted as a code point with the value (c1 - 0xD800) × 0x400 + (c2 - 0xDC00) + 0x10000. (See 10.1.2)
    return c >= 0xDC00 && c <= 0xDFFF;
  }
  function getSurrogate(c1, c2) {
    // "A sequence of two code units, where the first code unit c1 is in the range 0xD800 to 0xDBFF and the second code unit c2 is in the range 0xDC00 to 0xDFFF, is a surrogate pair and is interpreted as a code point with the value (c1 - 0xD800) × 0x400 + (c2 - 0xDC00) + 0x10000. (See 10.1.2)
    return (c1 - 0xD800) * 0x400 + (c2 - 0xDC00) + 0x10000;
  }
  function parseDecimalEscape(c) {
    let reason = 'Cannot escape \\8 or \\9 in a regex char class with u-flag';
    if (webCompat === WEB_COMPAT_ON) {
      // https://tc39.es/ecma262/#prod-annexB-IdentityEscape
      updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, reason);
      return c | REGEX_CHARCLASS_BAD_WITH_U_FLAG;
    }

    // https://tc39.es/ecma262/#prod-IdentityEscape
    regexSyntaxError(reason);
    return REGEX_CHARCLASS_BAD;
  }
  function parseOctalFromSecondDigit(firstChar) {

    // https://tc39.github.io/ecma262/#prod-annexB-LegacyOctalEscapeSequence
    //   OctalDigit [lookahead ∉ OctalDigit]
    //   ZeroToThree OctalDigit [lookahead ∉ OctalDigit]
    //   FourToSeven OctalDigit
    //   ZeroToThree OctalDigit OctalDigit
    // 0  ~ 377 (octal -> 0 ~ 255 dec)

    // I'm pretty sure this should be disallowed in
    // if ((lexerFlags & LF_STRICT_MODE) === LF_STRICT_MODE) {
    //   return CHARCLASS_BAD
    // }

    if (eof()) return firstChar - $$0_30;
    let secondChar = peek();
    if (isLowerOctal(firstChar)) {
      // third char may be any octal
      // [w]: `/[\1]/`
      // [w]: `/[\12]/`
      // [w]: `/[\123]/`
      if (isOctal(secondChar)) {
        // [w]: `/[\12]/`
        // [w]: `/[\123]/`
        ASSERT_skip(secondChar);

        if (eof()) return ((firstChar - $$0_30) * 8) + (secondChar - $$0_30);

        let thirdChar = peek();

        if (isOctal(thirdChar)) {
          // [w]: `/[\123]/`
          ASSERT_skip(thirdChar);
          return ((firstChar - $$0_30) * 8 * 8) + ((secondChar - $$0_30) * 8) + (thirdChar - $$0_30);
        }

        return ((firstChar - $$0_30) * 8) + (secondChar - $$0_30);
      }

      return firstChar - $$0_30;
    }

    // [w]: `/[\7]/`
    // [w]: `/[\72]/`
    // [w]: `/[\723]/`

    ASSERT(isUpperOctal(firstChar));
    // third char may only be the lower octals
    if (isOctal(secondChar)) {
      // [w]: `/[\72]/`
      // [w]: `/[\723]/`
      // [w]: `/[\726]/`
      ASSERT_skip(secondChar);

      if (eof()) return ((firstChar - $$0_30) * 8) + (secondChar - $$0_30);

      let thirdChar = peek();

      if (isLowerOctal(thirdChar)) {
        // [w]: `/[\723]/`
        ASSERT_skip(thirdChar);
        return ((firstChar - $$0_30) * 8 * 8) + ((secondChar - $$0_30) * 8) + (thirdChar - $$0_30);
      }

      // [w]: `/[\72]/`
      // [w]: `/[\726]/`

      return ((firstChar - $$0_30) * 8) + (secondChar - $$0_30);
    }

    return firstChar - $$0_30;
  }
  function isOctal(c) {
    return c >= $$0_30 && c <= $$7_37;
  }
  function isLowerOctal(c) {
    return c >= $$0_30 && c <= $$3_33;
  }
  function isUpperOctal(c) {
    return c >= $$4_34 && c <= $$7_37;
  }

  function parseUnicodeEscapeForNonRegex() {
    ASSERT(parseUnicodeEscapeForNonRegex.length === arguments.length, 'arg count');
    ASSERT(neof(), 'should be checked by caller');

    // Parse a unicode escape, quad or ruby, and return either the codepoint or a generic error code
    // This is _after_ `\u` have been consumed already!

    // We could read() here because we want to consume two more chars (at least)
    // However, if the escape is bad we would also consume the closing quote so we peek()

    let c = peek();

    if (c !== $$CURLY_L_7B) {
      return parseUnicodeQuadEscape(c, true); // ILLEGAL_UNICODE_ESCAPE or codepoint, must check eof()
    }

    return parseUnicodeRubyEscape();
  }
  function parseUnicodeEscapeForRegexAtom() {
    // Return REGEX_*** uflagState enum

    // if unicode flag
    // - surrogate pairs may matter
    // - class char status matters
    // - unicode ruby escape is allowed

    // we dont know whether u-mode is enabled until after we've parsed the flags
    // so we must parse as loose as possible and keep track of parsing specific u-flag or non-u-flag stuff
    // then after flag parsing confirm that the flag presence conforms to expectations

    if (eof()) { // In webcompat `\u` would be valid on its own so don't scan eof forward (we used to do eofd(3))
      return regexSyntaxError('Early EOF while trying to parse unicode escape');
    }

    let c = peek(); // dont read. we dont want to consume a bad \n here

    let wasRuby = false;
    if (c === $$CURLY_L_7B) {
      c = parseUnicodeRubyEscape();
      wasRuby = true;
    } else {
      c = parseUnicodeQuadEscape(c, false);
    }

    if (eof()) {
      return regexSyntaxError('EOF while trying to parse regex atom unicode escape');
    }

    if (c === ILLEGAL_UNICODE_ESCAPE) {
      if (webCompat === WEB_COMPAT_ON) {
        return updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Error while trying to parse regex atom unicode escape');
      }

      return regexSyntaxError('Error while trying to parse regex atom unicode escape');
    }

    if (wasRuby && webCompat === WEB_COMPAT_OFF) {
      return updateRegexUflagIsMandatory(REGEX_ALWAYS_GOOD, 'A regex atom that is an unicode ruby escape is only legal with u-flag');
    }

    // This was a proper ruby escape. This means that for the case without u-flag in webcompat it must be
    // determined whether or not the curlies could be a valid quantifier (this means no a-f hex digits)
    // We check this the slow way because this is an edge case and not worth to optimize. The trick is simple; the
    // code point in `c` represents the hex value that was escaped, like `\u{2300}` or `\u{3a9c}`. So if we convert
    // the code point to hex, we can check whether or not a letter was used and act accordingly :)
    if (wasRuby && webCompat === WEB_COMPAT_ON && !c.toString(16).match(/[a-z]/i)) {
      // This must be a unicode ruby escape that only contained numbers, no letters.
      // This means in non-uflag webcompat mode, we just parsed a quantified atom. Oh joy.
      // Relevant edge cases (almost all would pass with u-flag and fail without u-flag without web)):
      // For the next cases the star is interchangeable for `+`, `?`, and `{1}`
      // [w]: `/\u{100}/`
      // [x]: `/\u{100}*/`    The {100} is already a quantifier, so can't be followed by *
      // [w]: `/\u{100}?/`    This is the only exception, since ? becomes a non-greedy modifier here
      // [w]: `/\u{100}*/u`
      // [x]: `/\u{100}*?/`
      // [x]: `/\u{100}??/`   Unlike before, you can't non-greedy modify a non-greedy modifier
      // [x]: `/\u{100}*?/u`

      if (neof() && peeky($$QMARK_3F)) {
        // This is a non-greedy modifier. Basically, `/\u{10}?/` matches the smallest series of `u`, but at least 10.
        // Since we are parsing an atom, we can just skip the qmark here. We don't need to report the escaped value.
        ASSERT_skip($$QMARK_3F);
      }

      return REGEX_GOOD_RUBY_EDGE_CASE;
    }

    // [w]: `/\u{1a0}/`
    // [w]: `/\u{1a0}*/`    Unlike the 100, {1a0} cant be a quantifier so * is fine
    // [w]: `/\u{1a0}*/u`
    // [w]: `/\u{1a0}*?/`
    // [w]: `/\u{1a0}*?/u`
    return REGEX_ALWAYS_GOOD;
  }
  function parseUnicodeEscapeForRegexCharClass() {
    ASSERT(parseUnicodeEscapeForRegexCharClass.length === arguments.length, 'arg count');
    // Does NOT return a uflagStatus, but a char code with REGEX_CHARCLASS_BAD bitwise flags

    // Should return a char value, even for botched bad escapes that are valid in webcompat
    // [w]: `/[\u{5}-~]/`        Valid but only because `}-~` is a valid range
    // [v]: `/[\u{5}-~]/u`       Valid
    // [x]: `/[\u{5}-1]/`        Bad because `}-1` is an illegal range because the ruby is ignored without u-flag
    // [v]: `/[\u{5}-1]/u`       Good because the ruby escape is 0x05, which makes the range valid
    // [v]: `/[\u{500}-}]/`      Valid because `}-}` is a valid range
    // [x]: `/[\u{500}-}]/u`     Bad because `0x500` > `ord(~)=0x7e`

    // `\u{...}`
    //    ^
    // `\uxxxx`
    //    ^
    // `\uxxxx\uxxxx`         (only if the first quad is a surrogate head and second quad a surrogate tail!)
    //    ^

    // if unicode flag
    // - surrogate pairs may matter
    // - class char status matters
    // - unicode ruby escape is allowed

    // we dont know whether u-mode is enabled until after we've parsed the flags
    // so we must parse as loose as possible and keep track of parsing specific u-flag or non-u-flag stuff
    // then after flag parsing confirm that the flag presence conforms to expectations

    if (eof()) {
      // This'll be a syntax error regardless.
      regexSyntaxError('Early EOF while parsing a unicode escape in a regex char class');
      return REGEX_CHARCLASS_BAD;
    }

    let c = peek(); // dont read. we dont want to consume a bad \n here
    let wasQuad = true;
    if (c === $$CURLY_L_7B) {
      c = parseUnicodeRubyEscape();
      wasQuad = false;
    }
    else {
      c = parseUnicodeQuadEscape(c, false);
    }

    if (eof()) {
      regexSyntaxError('Early EOF while parsing a unicode escape in a regex char class');
      return REGEX_CHARCLASS_BAD
    }

    if (c === REGEX_CHARCLASS_BAD) {
      return REGEX_CHARCLASS_BAD;
    }

    // Need to know whether it was a ruby because if this was part of a group name this will be illegal without u=flag
    // Otoh, if this is part of a `\k` escape then this is fine with and without u-flag (web compat)
    let rubyWebException = false;
    if (!wasQuad) {
      if (webCompat === WEB_COMPAT_OFF) {
        updateRegexUflagIsMandatory(REGEX_ALWAYS_GOOD, 'Found a unicode ruby escape which is only valid with u-flag'); // don't mention the webcompat exception
        rubyWebException = true; // Can't parse `\u` as an atom, only allowed in webcompat, so this must be u-flag to be valid
      }

      c |= REGEX_CHARCLASS_WAS_RUBY; // only for valid
    }

    ASSERT(((c|REGEX_CHARCLASS_WAS_RUBY)^REGEX_CHARCLASS_WAS_RUBY) >= 0 && ((c|REGEX_CHARCLASS_WAS_RUBY)^REGEX_CHARCLASS_WAS_RUBY) <= MAX_VALID_UNICODE_VALUE, 'c should be valid unicode (+ some optional explicit flags) now');
    // `\u{..}` in regexes is restricted to +u flag, but if there is no u-flag then in web it can be a `u` etc

    if (rubyWebException) return c | REGEX_CHARCLASS_BAD_SANS_U_FLAG;

    return c;
  }
  function parseUnicodeQuadEscape(a, noDouble) {
    ASSERT(parseUnicodeQuadEscape.length === arguments.length, 'arg count');
    ASSERT(neof(), 'checked at callsite')

    // This returns the code point, if valid, possibly together with REGEX_CHARCLASS_BAD_SANS_U_FLAG
    // We've already consumed a char in `a`. we must consume 3 more chars for this unicode quad escape

    // `\uxxxx`
    //    ^
    // `\uxxxx\uxxxx`         (only if the first quad is a surrogate head and second quad a surrogate tail!)
    //    ^

    if (eofd(3)) {
      // Return the last char that was parsed before the eof. This helps validating webcompat cases like `/\ub-a/`
      updateRegexUflagIsIllegal(REGEX_ALWAYS_GOOD, 'Unexpected EOF while parsing unicode quad escape');
      return REGEX_CHARCLASS_BAD;
    }

    let b = peekd(1);
    let c = peekd(2);
    let d = peekd(3);

    let va = getHexValue(a);
    let vb = getHexValue(b);
    let vc = getHexValue(c);
    let vd = getHexValue(d);

    if ((va | vb | vc | vd) > 15) {
      // if this is a bad escape then dont consume the chars. one of them could be a closing quote
      updateRegexPotentialError('Attempted to parse a unicode quad escape but at least one digit was not a hex');
      return REGEX_CHARCLASS_BAD;
    }

    // Okay, _now_ consume them
    ASSERT_skip(a);
    ASSERT_skip(b);
    ASSERT_skip(c);
    ASSERT_skip(d);

    let firstPart = (va << 12) | (vb << 8) | (vc << 4) | vd;

    ASSERT(parseInt(String.fromCharCode(a, b, c, d), 16) === firstPart, 'confirm manual conversion works 1');

    // Pretty slow path but we're constructing a low+hi surrogate pair together here
    if (
      noDouble ||
      firstPart < 0xD800 || firstPart > 0xDBFF || // "Is this a surrogate high byte?"
      eofd(5) || // we need at least a couple more bytes for this to work at all

      // `\uxxxx\uxxxx`         (we've verified the first quad is a valid surrogate head)
      //        ^
      peek() !== $$BACKSLASH_5C ||
      peekd(1) !== $$U_75
    ) {
      return firstPart;
    }

    // `\uxxxx\uxxxx`         (we've verified the first quad is a valid surrogate head and the `\u` of the second)
    //        ^
    let e = peekd(2);
    let f = peekd(3);
    let g = peekd(4);
    let h = peekd(5);

    let ve = getHexValue(e);
    let vf = getHexValue(f);
    let vg = getHexValue(g);
    let vh = getHexValue(h);

    if ((ve | vf | vg | vh) > 15) {
      // The invalid escape will be parsed next so no need to create an error here
      return firstPart;
    }

    let secondPart = (ve << 12) | (vf << 8) | (vg << 4) | vh;
    ASSERT(parseInt(String.fromCharCode(e, f, g, h), 16) === secondPart, 'confirm manual conversion works 2');

    if (secondPart < 0xDC00 || secondPart > 0xDFFF) {
      return firstPart;
    }

    /*
      https://en.wikipedia.org/wiki/UTF-16
      To decode U+10437 (𐐷) from UTF-16:
      Take the high surrogate (0xD801) and subtract 0xD800, then multiply by 0x400, resulting in 0x0001 * 0x400 = 0x0400.
      Take the low surrogate (0xDC37) and subtract 0xDC00, resulting in 0x37.
      Add these two results together (0x0437), and finally add 0x10000 to get the final decoded UTF-32 code point, 0x10437.
     */
    // firstPart = 0xD801;
    // secondPart = 0xDC37;
    // let expected = 0x10437;

    // now skip `\uxxxx` (6)
    ASSERT_skip($$BACKSLASH_5C);
    ASSERT_skip($$U_75);
    ASSERT_skip(e);
    ASSERT_skip(f);
    ASSERT_skip(g);
    ASSERT_skip(h);

    let codepoint = surrogateToCodepoint(firstPart, secondPart);

    updateRegexPotentialError('A double unicode quad escape that represents a surrogate pair in char class or group name is only valid with u-flag');

    // We have a matching low+hi, combine them
    // Without u-flag the surrogate tail is just a separate character
    return codepoint;
  }
  function parseUnicodeRubyEscape() {
    ASSERT(parseUnicodeRubyEscape.length === arguments.length, 'arg count');

    ASSERT_skip($$CURLY_L_7B);

    let c = parseUnicodeRubyEscapeBody(); // either ILLEGAL_UNICODE_ESCAPE, REGEX_CHARCLASS_BAD_WITH_U_FLAG, or the ord

    ASSERT(c >= 0 && c <= ILLEGAL_UNICODE_ESCAPE);

    // Note: if the max number of chars were parsed, eof is not checked for the curly, so do that now
    if (c === ILLEGAL_UNICODE_ESCAPE || eof() || !peeky($$CURLY_R_7D)) {
      return ILLEGAL_UNICODE_ESCAPE;
    }

    ASSERT_skip($$CURLY_R_7D);

    return c;
  }
  function parseUnicodeRubyEscapeBody() {
    // Returns;
    // - ILLEGAL_UNICODE_ESCAPE if the value was empty, too high, or contained a non-hex char
    // - codepoint otherwise
    // - must check eof() because that is not signaled. This way we can tell a hard error from soft for templates

    // https://tc39.es/ecma262/#prod-RegExpUnicodeEscapeSequence
    //   +U u { CodePoint }
    // https://tc39.es/ecma262/#prod-CodePoint
    // > CodePoint::
    // >   HexDigitsbut only if MV of HexDigits ≤ 0x10FFFF
    // This means the actual hex value cannot exceed 6 chars (0x10ffff). It can have any number of leading zeroes

    if (eof()) return ILLEGAL_UNICODE_ESCAPE; // Error either way

    let a = peek();
    let v = getHexValue(a);
    if (v === HEX_OOB) return ILLEGAL_UNICODE_ESCAPE; // first one is mandatory
    ASSERT_skip(a);

    return parseUnicodeRubyEscapeBody2(v);
  }
  function parseUnicodeRubyEscapeBody2(v) {
    // skip leading zeroes if there are any
    if (v === 0) {
      if (eof()) return ILLEGAL_UNICODE_ESCAPE;
      let c = skipZeroes();
      v = getHexValue(c);
      if (v === HEX_OOB) {
        // note: we already asserted a zero
        return 0;
      }
      ASSERT_skip(c);
    }
    return parseUnicodeRubyEscapeBody3(v);
  }
  function parseUnicodeRubyEscapeBody3(v) {
    if (eof()) return ILLEGAL_UNICODE_ESCAPE;
    let b = peek();
    let vb = getHexValue(b);
    if (vb === HEX_OOB) return v;
    ASSERT_skip(b);
    return parseUnicodeRubyEscapeBody4((v << 4) + vb);
  }
  function parseUnicodeRubyEscapeBody4(v) {
    if (eof()) return ILLEGAL_UNICODE_ESCAPE;
    let c = peek();
    let vc = getHexValue(c);
    if (vc === HEX_OOB) return v;
    ASSERT_skip(c);
    return parseUnicodeRubyEscapeBody5((v << 4) + vc);
  }
  function parseUnicodeRubyEscapeBody5(v) {
    if (eof()) return ILLEGAL_UNICODE_ESCAPE;
    let d = peek();
    let vd = getHexValue(d);
    if (vd === HEX_OOB) return v;
    ASSERT_skip(d);
    return parseUnicodeRubyEscapeBody6((v << 4) + vd);
  }
  function parseUnicodeRubyEscapeBody6(v) {
    if (eof()) return ILLEGAL_UNICODE_ESCAPE;
    let e = peek();
    let ve = getHexValue(e);
    if (ve === HEX_OOB) return v;
    ASSERT_skip(e);
    return parseUnicodeRubyEscapeBody7((v << 4) + ve);
  }
  function parseUnicodeRubyEscapeBody7(v) {
    if (eof()) return ILLEGAL_UNICODE_ESCAPE;
    let f = peek();
    let vf = getHexValue(f);
    if (vf === HEX_OOB) return v;
    ASSERT_skip(f);
    let r = (v << 4) + vf;
    if (r >= 0x110000) return ILLEGAL_UNICODE_ESCAPE;
    return r;
  }

  function parseOtherUnicode(c) {
    switch (c) {
      case $$NBSP_A0:
        return parseSpace();
      case $$BOM_FEFF:
        // https://tc39.github.io/ecma262/#sec-unicode-format-control-characters
        // >  In ECMAScript source text <ZWNBSP> code points are treated as white space characters (see 11.2).
        return parseSpace();
      case $$PS_2028:
        return parseNewlineSolo();
      case $$LS_2029:
        return parseNewlineSolo();

      default:
        let t = parseIdentUnicodeOrError(c);
        if (t !== $ERROR) return t;

        return parseWhitespaceUnicodeOrError(c);
    }
  }

  function parseIdentUnicodeOrError(c) {
    // assert identifiers starting with >ascii unicode chars
    // > any Unicode code point with the Unicode property “ID_Start”
    // since we have to take multi-byte characters into account here (and consider this the slow path, anyways), we
    // apply a regex on the input string with a sticky flag and the ES9-released \p flag. This requires cutting
    // edge JS engines, but it beats the alternative of having to manually compile and ship these unicode ranges.

    let cu = input.codePointAt(pointer - 1);
    let wide = isIdentStart(cu, pointer - 1);
    if (wide !== INVALID_IDENT_CHAR) {
      if (wide === VALID_DOUBLE_CHAR) skip(); // c was skipped but cu was two (16bit) positions
      return parseIdentifierRest(String.fromCodePoint(cu), wide === VALID_DOUBLE_CHAR ? 2 : 1);
    }

    if (!lastReportableLexerError) lastReportableLexerError = 'Unexpected unicode character: ' + c + ' (' + String.fromCharCode(c) + ')';
    return $ERROR;
  }
  function parseWhitespaceUnicodeOrError(c) {
    // https://tc39.es/ecma262/#sec-white-space
    // Scan for Space_Separator
    // But only for c<=0xffff because:
    // https://tc39.es/ecma262/#sec-tonumber-applied-to-the-string-type
    // > The terminal symbols of this grammar are all composed of characters in the Unicode Basic Multilingual Plane (BMP).

    // Last ditch effort. Let it be slow.
    // It seems there are only 10 characters in the set of Space_Separators under 0xffff, so we can check explicitly.
    // They are all Space_Separators except 2028, which is a line separator. And we can skip space and tab :)

    // https://unicode.org/cldr/utility/list-unicodeset.jsp?a=[:Bidi_Class=White_Space:]
    // \u000C \u0020 \u1680 \u2000-\u200A \u205F \u2028 \u3000

    return [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x202F, 0x205F, 0x3000].includes(c) ? $SPACE : $ERROR;
  }

  function THROW(str, tokenStart, tokenStop) {
    $error('Throwing this error:', str);
    _THROW('Lexer error! ' + str, tokenStart, tokenStop); // TODO: add str as second param?
  }
  function _THROW(str, tokenStart, tokenStop, msg = '', withCodeFrame = errorCodeFrame, fullCodeFrameLocal = truncCodeFrame) {
    let ectxt = withCodeFrame ? getErrorContext(tokenStart, tokenStop, msg, fullCodeFrameLocal) : '';
    let context = '\n`````\n' + (ectxt[ectxt.length-1] !== '\n' ? '\n' : '') + ectxt + '`````\n';
    $log('Error at:' + context);
    if (gracefulErrors === FAIL_HARD) throw new Error(str + '\n' + (withCodeFrame ? '\n' : '') + ectxt);
    else $error(str);
  }
  function getErrorContext(tokenStart, tokenStop, msg, truncCodeFrame = false) {
    ASSERT(getErrorContext.length >= 2 && getErrorContext.length <= 4, 'arg count');
    ASSERT(tokenStart <= tokenStop, 'should have a positive length range', tokenStart, tokenStop);

    // Getting the line/col of the context is tricky since we'd have to juggle those values individually. However...
    // It's fairly safe to say that the point of error won't be that far off from the current offset of the lexer.
    // (And we can just omit this hack in case we deem it too far away, anyways)
    // So in the reported context we can also force-include the current token point. Based on that we can split
    // on newlines and determine the line numbers of other lines in the reported context that way.

    let inputOffset = 0;
    if (truncCodeFrame && tokenStart > 100) inputOffset = tokenStart - 100;
    let inputLen = input.length - inputOffset;
    if (truncCodeFrame && tokenStop + 100 < input.length) inputLen = (tokenStop + 100) - inputOffset;

    // Try to force-include the current offset if it's not too far away from the point of error (in some edge cases
    // it may still be megabytes away from each other and in that case we'll just omit the line/col reporting).
    let isPointerIncluded = true;
    if (inputOffset + inputLen < pointer) {
      // Let's say 1k?
      let len = pointer - inputOffset;
      if (len < 1024) {
        inputLen = len;
      } else {
        isPointerIncluded = false;
      }
    }

    let usedInput = input.slice(inputOffset, inputOffset + inputLen);
    // .log('\n\nused input: [' + usedInput +' ]')
    let tokenOffset = tokenStart - inputOffset; // Where is tokenStart relative to usedInput?
    // .log('\n\nstart of token: [' + usedInput.slice(0, tokenOffset) + '#' + usedInput.slice(tokenOffset) +' ]')

    // nl1 is the last newline before the point of error, or SOF, relative to usedInput
    // nl2 is the first newline to the right of nl1, or EOF, relative to usedInput
    // We need nl1 to determine the offset and indentation of the error pointer
    // We need nl2 because that's where we'll make the cut to inject the error pointer
    let nl1 = usedInput.lastIndexOf('\n', tokenOffset);
    // .log('\n\nnl1 ('+nl1+'): [' + usedInput.slice(0, nl1) + '#' + usedInput.slice(nl1) +' ]')
    let nl2 = usedInput.indexOf('\n', nl1 + 1);
    if (nl2 < 0) nl2 = usedInput.length;
    // .log('\n\nnl2 ('+nl2+'): [' + usedInput.slice(0, nl2) + '#' + usedInput.slice(nl2) +' ]')
    let arrowCount = (tokenStop - tokenStart) || 1;
    let indentCount = tokenOffset - (nl1 + 1);

    let pointerLine = currentLine;
    let errorLine = currentLine; // Update it until it passes nl1, which is the last nl before the error
    let errorColumn = (inputOffset > 0 && nl1 < 0) ? -1 : ((tokenStart - inputOffset) - (nl1 >= 0 ? nl1 + 1 : 0));
    if (isPointerIncluded) {
      // Where is the pointer relative in the usedInput?
      let relativePointer = pointer - inputOffset;
      // Skip newlines until we're passing the point of error
      let searchPointer = relativePointer;
      // We could do `pointerLine-=usedInput.slice(0, searchPointer).split('\n').length`.
      // Not sure it matters, but it might at large contexts.
      while (searchPointer > 0) {
        searchPointer = usedInput.lastIndexOf('\n', searchPointer - 1);
        --pointerLine;
        if (searchPointer > nl1) --errorLine;
      }
      if (searchPointer !== 0) pointerLine += 1;
      // Now pointerLine should be the line of the start of the input
    }

    let maxPointerlineLen = (''+currentLine).length;
    let gutterWidth = maxPointerlineLen + 4; // padded line number + ' | '

    let pre = usedInput.slice(0, nl2).split('\n');
    let post = usedInput.slice(nl2 + 1, inputLen).split('\n');

    while (pre.length > 1 && pre[0].length === 0) {
      // Drop leading empty lines
      pre.shift();
      ++pointerLine;
    }
    while (post.length > 0 && post[post.length - 1].length === 0) {
      post.pop();
      // Drop trailing empty lines
    }

    let lc = pointerLine;
    let pre2 = pre.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
    let post2 = post.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
    if ((''+lc).length > maxPointerlineLen) {
      maxPointerlineLen = (''+lc).length;
      gutterWidth = maxPointerlineLen + 4; // padded line number + ' | '
      lc = pointerLine;
      // Paint the gutter again because the line numbers got wider _after_ the error / current pointer and we want to
      // prevent an indentation change
      pre2 = pre.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
      post2 = post.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
    }

    // The `usedInput` is a substring of input and starts mid-way a line. We want to know which column of that line.
    // Note: if the pointerLine is not 1 then the lastIndexOf must return a non-zero number that is the column on that line
    let col = pointerLine === 1 ? inputOffset : ((inputOffset - input.lastIndexOf('\n', inputOffset))-1); // -1 to offset zero

    let top = 'start@' + pointerLine + ':' + (col<0?'?':col) + ', error@' + errorLine + ':' + (errorColumn<0?'?':errorColumn) + '\n';
    let bar = '═'.repeat(top.length - gutterWidth) + '\n';
    let header = '╔' + '═'.repeat(maxPointerlineLen) + '═╦';
    let footer = '╚' + '═'.repeat(maxPointerlineLen) + '═╩';
    let returnValue = (
      top +
      header + bar +
      pre2 + '\n' +
      ' '.repeat(Math.max(0, maxPointerlineLen + 1)) +
      ' ║ ' +
      ' '.repeat(Math.max(0, indentCount)) +
      '^'.repeat(Math.max(0, arrowCount)) +
      '------- error' + (msg ? ': ' + msg : '') + (tokenOffset >= usedInput.length ? ' at EOF' : '') + (post2 ? '\n' : '') +
      post2 + '\n' +
      footer + bar +
      ''
    );

    // Drop trailing whitespace per line. Not likely to make a difference and annoying in git diffs.
    return returnValue.split('\n').map(s => s.trimRight()).join('\n')
  }

  return {
    tokens: tokenStorage,

    nextToken: nextToken,
    asi: addAsi,
    throw: _THROW,
    lexError: function() {
      ASSERT(lastReportableLexerError, 'lexError should only be called if a lexer error was actually detected');
      THROW(lastReportableLexerError, startForError,  pointer);
    },
    getTokenCountAny: function(){ return anyTokenCount; },
    getTokenCountSolid: function(){ return solidTokenCount; },
    prevEndColumn: function(){ return prevTokenEndColumn; },
    prevEndLine: function(){ return prevTokenEndLine; },
    prevEndPointer: function(){ return prevTokenEndPointer; },
    currColumn: function(){ return pointer - currentColOffset; },
    currLine: function(){ return currentLine; },
    currPointer: function(){ return pointer; },

    getNlwas: function(){ return nlwas; },
    getCanoN: function(){ return lastCanonizedInput; }, // This is only relevant for idents and strings, but might be captured for other reasons. TODO: Should use a proxy in devmode which verifies that actual reads on this value are for ident/string tokens only...
    getType: function(){ return lastType; },
    getStart: function(){ return lastStart; },
    getStop: function(){ return lastStop; },
    getLine: function(){ return lastLine; },
    getColumn: function(){ return lastColumn; },
    sliceInput: slice,
  };
}

function isLfPsLs(c) {
  return c === $$LF_0A || isPsLs(c);
}
function isPsLs(c) {
  return c === $$PS_2028 || c === $$LS_2029;
}

ASSERT(START(START_ERROR), 'increase code coverage');
function START(type) {
  switch (type) {
    case START_SPACE: return 'START_SPACE';
    case START_ID: return 'START_ID';
    case START_KEY: return 'START_KEY';
    case START_NL_SOLO: return 'START_NL_SOLO';
    case START_CR: return 'START_CR';
    case START_STRING: return 'START_STRING';
    case START_DECIMAL: return 'START_DECIMAL';
    case START_DOT: return 'START_DOT';
    case START_CURLY_CLOSE: return 'START_CURLY_CLOSE';
    case START_EQ: return 'START_EQ';
    case START_DIV: return 'START_DIV';
    case START_PLUS: return 'START_PLUS';
    case START_MIN: return 'START_MIN';
    case START_ZERO: return 'START_ZERO';
    case START_TEMPLATE: return 'START_TEMPLATE';
    case START_EXCL: return 'START_EXCL';
    case START_PERCENT: return 'START_PERCENT';
    case START_AND: return 'START_AND';
    case START_STAR: return 'START_STAR';
    case START_CARET: return 'START_CARET';
    case START_LT: return 'START_LT';
    case START_GT: return 'START_GT';
    case START_OR: return 'START_OR';
    case START_BSLASH: return 'START_BSLASH';
    case START_ERROR: return 'START_ERROR';
  }
  return 'S<' + T(type) + '>';
}

export default Lexer; // QoL for somebody, perhaps.
export {
  Lexer,

  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,

  FAIL_GRACEFULLY,
  FAIL_HARD,

  GOAL_MODULE,
  GOAL_SCRIPT,

  RETURN_ANY_TOKENS,
  RETURN_COMMENT_TOKENS,
  RETURN_SOLID_TOKENS,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,
};
