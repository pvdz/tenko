import acorn from 'acorn';

function runAcorn(code, mode, version) {
  if (mode === 'strict' || mode === 'sloppy') return false;
  // The Acorn parser seems to apply AnnexB by default with no opt-out so we can't test strict/sloppy directly
  return acorn.parse(code, {
    ecmaVersion: Number.isFinite(version) ? version : 11,
    sourceType: mode === 'module' ? 'module' : 'script',
    locations: true,
    // ranges: true,


    // Not used:
    allowReserved: true,
    allowReturnOutsideFunction: false,
    allowImportExportEverywhere: false,
    allowAwaitOutsideFunction: false,
    allowHashBang: false,
  });
}

export {
  runAcorn,
  runAcorn as parse,
};
