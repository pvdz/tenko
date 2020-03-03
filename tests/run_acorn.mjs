import acorn from 'acorn';

function runAcorn(code, mode, annexb, version) {
  // Acorn does not support explicit "strict mode" setting
  // Acorn enables annexb by default
  // So we can only test sloppy-annexb and module-annexb
  if ((mode !== 'sloppy' && mode !== 'module') || !annexb) return false;

  // Acorn _does_ support a version option so we can run version specific tests (bit artificial though, less important)
  // It doesn't support all 2020 features yet (work in progress, I'm sure), but we have a whitelist anyways.

  let x = acorn.parse(code, {
    ecmaVersion: Number.isFinite(version) ? version : 11,
    sourceType: mode === 'module' ? 'module' : 'script',
    locations: true,
    // ranges: true,


    // Not used:
    // allowReserved: true,
    // allowReturnOutsideFunction: false,
    // allowImportExportEverywhere: false,
    // allowAwaitOutsideFunction: false,
    // allowHashBang: false,
  });

  return x;
}

export {
  runAcorn,
  runAcorn as parse,
};
