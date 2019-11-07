// This is the main entry point for the parser. It basically exports a bunch of symbols from other files.
// Anything that's supposed be used externally should be exported in this file.

// DEV ONLY
// WARNING: this file is completely ignored when creating a build...

import {
  Parser,

  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,

  GOAL_MODULE,
  GOAL_SCRIPT,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,
} from './parser.mjs';
import {
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

  toktypeToString,
} from './tokentype.mjs';
import {
  Lexer,
} from './lexer.mjs';
import {
  PERF_OptimizeFunctionOnNextCall,
  PERF_getStatus,
  PERF_HasFastProperties,
  PERF_HaveSameMap,
  PERF_hasFastSmiElements,
  PERF_hasFastObjectElements,
  PERF_hasFastDoubleElements,
  PERF_hasDictionaryElements,
  PERF_hasFastHoleyElements,
  PERF_haveSameMap,
  PERF_isValidSmi,
  PERF_isSmi,
  PERF_hasFastSmiOrObjectElements,
  PERF_hasSloppyArgumentsElements,
  PERF_CollectGarbage,
  PERF_DebugPrint,
} from './tools/perf.mjs';

let Tenko = Parser;

export default Tenko; // Does dual export make sense? Default and as member. To each their own, eh
export {
  Tenko,
  Lexer,

  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,

  GOAL_MODULE,
  GOAL_SCRIPT,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,

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

  toktypeToString,

  PERF_OptimizeFunctionOnNextCall,
  PERF_getStatus,
  PERF_HasFastProperties,
  PERF_HaveSameMap,
  PERF_hasFastSmiElements,
  PERF_hasFastObjectElements,
  PERF_hasFastDoubleElements,
  PERF_hasDictionaryElements,
  PERF_hasFastHoleyElements,
  PERF_haveSameMap,
  PERF_isValidSmi,
  PERF_isSmi,
  PERF_hasFastSmiOrObjectElements,
  PERF_hasSloppyArgumentsElements,
  PERF_CollectGarbage,
  PERF_DebugPrint,
};
