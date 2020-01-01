import { parseScript, parseModule } from '../ignore/ghost.mjs';

function runGhost(code, mode, version) {
  if (mode === 'strict' || mode === 'sloppy') return false;

  return (mode === 'module' ? parseModule : parseScript)(code, {
    loc: true,
  });
}

export {
  runGhost,
  runGhost as parse,
};
