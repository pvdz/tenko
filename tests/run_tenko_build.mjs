import {Tenko} from '../build/tenko.prod.mjs';

function runTenkoBuild(code, testVariant, annexb, version) {
  return Tenko(
    code,
    {
      goalMode: testVariant === 'module',
      collectTokens: 0,
      strictMode: testVariant === 'strict',
      webCompat: annexb || testVariant === 'web',
      targetEsVersion: Number.isFinite(version) ? version : 11,

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
