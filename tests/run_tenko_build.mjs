import {Tenko} from '../build/tenko.prod.mjs';

function runTenkoBuild(code, testVariant, enableAnnexb) {
  return Tenko(
    code,
    {
      goalMode: testVariant === 'module',
      collectTokens: 0,
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
  runTenkoBuild,
  runTenkoBuild as parse,
};
