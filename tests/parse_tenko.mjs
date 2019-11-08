import {COLLECT_TOKENS_SOLID, COLLECT_TOKENS_NONE , GOAL_MODULE, GOAL_SCRIPT} from "../src/enum_lexer.mjs";

function testTenko(tenko, code, testVariant, enableAnnexb) {
  return tenko(
    code,
    {
      goalMode: testVariant === 'module' ? GOAL_MODULE : GOAL_SCRIPT,
      collectTokens: COLLECT_TOKENS_NONE,
      strictMode: testVariant === 'strict',
      webCompat: enableAnnexb || testVariant === 'web',
      // targetEsVersion: tob.inputOptions.es,
      babelCompat: false,
      acornCompat: false,

      $log: () => {},
      $warn: () => {},
      $error: () => {},
    },
  );
}

export {
  testTenko,
};
