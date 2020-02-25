// All constants of the lexer itself (lexer.mjs) that can be inlined should go in here
// This file is used as a way to decide which constants to inline. As such be careful to only make primitives `const`
// because the inlining is unconditional beyond being a const in this file.

const BAD_ESCAPE = true;
const GOOD_ESCAPE = false;

const GOAL_MODULE = true;
const GOAL_SCRIPT = false;

const REGEX_ALWAYS_GOOD = 0;
const REGEX_GOOD_WITH_U_FLAG = 1;
const REGEX_GOOD_SANS_U_FLAG = 2;
const REGEX_ALWAYS_BAD = 4;
const REGEX_GOOD_RUBY_EDGE_CASE = 8;

const FIRST_CHAR = true;
const NON_START = false;

const MAX_VALID_UNICODE_VALUE = 0x10ffff;
const ILLEGAL_UNICODE_ESCAPE = 0x110000;

const REGEX_CHARCLASS_BAD = 0x110000; // Note: max valid unicode value is <0x110000 so we can use high flags as side channels!
const REGEX_CHARCLASS_ESCAPED_UC_B = 0x110001;
const REGEX_CHARCLASS_ESCAPED_C = 0x110002;
const REGEX_CHARCLASS_BAD_SANS_U_FLAG = 1<<23; // Note: first value is 8388608 (0x800000) so keep error codes below ;)
const REGEX_CHARCLASS_BAD_WITH_U_FLAG = 1<<24;
const REGEX_CHARCLASS_CLASS_ESCAPE = 1<<25; // \d \w \s etc, for webcompat checks in ranges
const REGEX_CHARCLASS_WAS_RUBY = 1<<26; // For invalid u-escapes in ranges in char classes with u-flag in webcompat

const COLLECT_TOKENS_NONE = 0;
const COLLECT_TOKENS_SOLID = 1; // non-whitespace
const COLLECT_TOKENS_ALL = 2;

const WEB_COMPAT_OFF = false;
const WEB_COMPAT_ON = true;

const RETURN_ANY_TOKENS = 1;
const RETURN_COMMENT_TOKENS = 2;
const RETURN_SOLID_TOKENS = 3;

const WHITESPACE_TOKEN = true;
const SOLID_TOKEN = false;

const PARSING_FROM_TICK = true;
const PARSING_SANS_TICK = false;

const FAIL_GRACEFULLY = true;
const FAIL_HARD = false;

const FOR_TEMPLATE = true; // templates are never not allowed to have octal escapes except when tagged
const NOT_TEMPLATE = false;

const CODEPOINT_FROM_ESCAPE = -1;

// These error codes must be negative as not to be ambiguous with decoded escape values
const INVALID_IDENT_CHAR = -1;
const VALID_SINGLE_CHAR = -2;
const VALID_DOUBLE_CHAR = -3;

// When parsing a regex groupName, this enum determines whether or not an invalid group name triggers an
// unconditional syntax error (a named capturing group cannot recover from an invalid group name)
const FOR_NAMED_GROUP = true;
const FOR_K_ESCAPE = false;

export {
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
};
