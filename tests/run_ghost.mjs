import ghost from './ghost.js';

const { parseScript, parseModule } = ghost;

export function runGhost(code, mode, version) {
  if (mode === 'strict' || mode === 'sloppy') return false;

  return (mode === 'module' ? parseModule : parseScript)(code, {
    loc: true,
  });
}
