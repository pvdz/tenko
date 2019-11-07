import ESFuzz from 'esfuzz/lib/index.js';

let generateEsFuzzCode = () => {
  // ESFuzz quality tends to generate some poor inputs, while others are rich
  // This test will scrub out some scrappy inputs like semi's only, or `xxx;`
  let input = '';
  do {
    input = ESFuzz.render(ESFuzz.generate());
  } while (input.replace(/[;:\w{}]+/g, '').trim() === '');
  return input;
};

export {
  generateEsFuzzCode,
};
