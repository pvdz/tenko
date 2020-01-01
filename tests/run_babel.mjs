import babel from '@babel/parser';

function runBabel(code, mode) {
  if (mode === 'strict' || mode === 'sloppy') return false;
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
