import babel from '@babel/parser';

function runBabel(code, mode, annexb, version) {
  if (mode === 'strict') return false; // Can't force it in "strict" mode so skip that one
  if (!annexb) return false; // AnnexB is always on (certain edge cases excepted) so skip the test without annexb

  // The Babel parser seems to apply AnnexB by default with no opt-out so we can't test strict/sloppy directly
  return babel.parse(code, {
    sourceType: mode === 'module' ? 'module' : 'script',
    // https://babeljs.io/docs/en/babel-parser
    // It explicitly mentions a strictMode option, but when running it this fails :(
    // strictMode: mode === 'strict',
    plugins: ['dynamicImport', 'bigInt', 'exportNamespaceFrom'],
  });
}

export {
  runBabel,
  runBabel as parse,
};
