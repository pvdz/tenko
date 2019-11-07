import ESLump from 'eslump/src/index.js'; // can only import cjs as default

const { generateRandomJS: eslumpGen } = ESLump;
let generateEslumpCode = () => eslumpGen({
  sourceType: "script", // module or script
  maxDepth: 4, // ast size
  comments: false, // generate comments?
  whitespace: false, // generate whitespace?
});

export {
  generateEslumpCode,
};
