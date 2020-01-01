// https://github.com/meriyah/meriyah

import meriyah from 'meriyah';

const {parseScript} = meriyah;

function runMeriyah(code, mode, version) {
  if (mode === 'strict' || mode === 'sloppy') return false;

  return parseScript(code, {
    // The flag to allow module code
    module: mode === 'module',

    // // The flag to enable stage 3 support (ESNext)
    // next: false,

    // // The flag to enable start and end offsets to each node
    // ranges: false,

    // Enable web compability
    webcompat: true, // Since other parsers don't support this we assume this enabled by default

    // The flag to enable line/column location information to each node
    loc: true,

    // // The flag to attach raw property to each literal and identifier node
    // raw: false,

    // Enabled directives
    directives: true,

    // // The flag to allow return in the global scope
    // globalReturn: false,

    // The flag to enable implied strict mode
    impliedStrict: mode === 'strict', // <3

    // // Allows comment extraction. Accepts either a function or array
    // onComment: [],

    // // Allows token extraction. Accepts either a function or array
    // onToken: [],

    // // Enable non-standard parenthesized expression node
    // preserveParens: false,

    // Enable lexical binding and scope tracking
    lexical: true, // I _think_ this has to be enabled?

    // // Adds a source attribute in every node’s loc object when the locations option is `true`
    // source: false,

    // // Distinguish Identifier from IdentifierPattern
    // identifierPattern: false,

    // // Enable React JSX parsing
    // jsx: false,

    // // Allow edge cases that deviate from the spec
    // specDeviation: false,
  });
}

export {
  runMeriyah,
  runMeriyah as parse,
};
