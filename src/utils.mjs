// This basically contains dev time machinery. This stuff should be stripped from a proper build.

// async function inspect() {
//   (await import('util')).inspect(...arguments);
// }
function inspect(...args) {
  console.dir(args.length===1?args[0]:args, {depth: null});
}

function ASSERT(bool, desc = '<no desc>', ...rest) {
  if (!bool) THROW('Assertion fail: ' + desc, ':', ...rest);
}

function THROW(str, ...rest) {
  // console.log('error args:', rest.length ? rest : '<none>');
  throw new Error(`Parser error! ${str} ${rest.length ? rest : ''}`);
}

export {
  inspect,
  ASSERT,
  THROW,
};
