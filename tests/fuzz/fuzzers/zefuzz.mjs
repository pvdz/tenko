import arrows from './zefuzz_arrows.mjs';
import bindingPatterns from './zefuzz_binding-patterns.mjs';
import classMethodHeaders from './zefuzz_class-method-header.mjs';

let generateZefuzzCode_classMethods = () => {
  return classMethodHeaders();
};
let generateZefuzzCode_arrows = () => {
  return arrows();
};
let generateZefuzzCode_bindingPatterns = () => {
  return bindingPatterns();
};

export {
  generateZefuzzCode_classMethods,
  generateZefuzzCode_arrows,
  generateZefuzzCode_bindingPatterns,
};
