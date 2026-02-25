Error.stackTraceLimit = Infinity;
const clog = console.log;
const wlog = console.warn;
const elog = console.error;
let logs = [];
console.log = (...args) => {
  clog(...args);
  logs.push('LOG '+args.join(' '));
};
console.warn= (...args) => {
  wlog(...args);
  logs.push('WRN '+args.join(' '));
};
console.error= (...args) => {
  elog(...args);
  logs.push('ERR ' + args.join('ERR '));
};

import {
  Tenko,
  Lexer,
  GOAL_SCRIPT,
  GOAL_MODULE,
  COLLECT_TOKENS_ALL,
  COLLECT_TOKENS_TYPES,
  COLLECT_TOKENS_NONE,
  toktypeToString,
} from '../src/index.mjs';

console.log('loaded...');
window.Lexer = Lexer;
window.Tenko = Tenko;

window.onerror = (msg, url, lineNo, columnNo, error) => {
  stderr.value = error.stack+'\n\n-------------\n\n' + stderr.value + '\n\n' + msg;
};

ta_input.value = localStorage.getItem('Tenko.repl.input') || ta_input.value;

if (localStorage.getItem('Tenko.repl.options')) {
  try {
    localStorage.getItem('Tenko.repl.options')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.split(' '))
      .map(([q, checked]) => console.log(q, checked) || (checked === 'true') && (document.querySelector(q).checked = true));
  } catch (e) {
    localStorage.removeItem('Tenko.repl.options');
  }
}


/** Turn a scope object (with Map/Set etc.) into a plain object for JSON.stringify. */
function scopeToJSONSafe(scope, seen = new WeakSet()) {
  if (scope == null || typeof scope !== 'object') return scope;
  if (seen.has(scope)) return { type: scope.type, _desc: scope._desc, _circular: true };
  seen.add(scope);
  const names =
    scope.names instanceof Map
      ? Object.fromEntries(scope.names)
      : scope.names == null
        ? null
        : scope.names;
  const out = {
    type: scope.type,
    _desc: scope._desc,
    names,
    dupeParamErrorStart: scope.dupeParamErrorStart,
    dupeParamErrorStop: scope.dupeParamErrorStop,
  };
  if (scope.parent && scope.parent !== scope) {
    out.parent = scopeToJSONSafe(scope.parent, seen);
  }
  return out;
}

/** Walk AST and replace $scope (and any other Map/Set-bearing refs) so JSON.stringify shows useful output. */
function astToJSONSafe(value, scopeSeen = new WeakSet()) {
  if (value == null) return value;
  if (typeof value !== 'object') return value;
  if (value.isScope === true) return scopeToJSONSafe(value, scopeSeen);
  if (Array.isArray(value)) return value.map((v) => astToJSONSafe(v, scopeSeen));
  if (value instanceof Map) return Object.fromEntries(value);
  if (value instanceof Set) return [...value];
  const out = {};
  for (const key of Object.keys(value)) {
    const v = value[key];
    if (key === '$scope' && v != null && typeof v === 'object' && v.isScope === true) {
      out[key] = scopeToJSONSafe(v, scopeSeen);
    } else {
      out[key] = astToJSONSafe(v, scopeSeen);
    }
  }
  return out;
}

function pret(s, isjson) {
  // Note: this is prettier 0.4 or something... it's good enough for our purpose
  try {
    // Note: `prettier` is exposed as global in the repl.html as a script tag...
    let r = prettier.format(isjson ? '+' + s : s, {
      tabWidth: 2,
      printWidth: 100,
      singleQuote: true,
      trailingComma: true,
      bracketSpacing: false,
      quoteProps: 'as-needed',
    });
    if (isjson) r = r.slice(1, -1);
    return r;
  } catch (e) {
    return s;
  }
}

function reflectPass() {
  reflectResult('#e6ffe6', 'initial', 'initial', 'initial');
}
function reflectFail() {
  reflectResult('#EEC7C1', 'initial', '#eee', '#555');
}
function reflectResult(inpBgColor, inpColor, otherBgColor, otherColor) {
  ta_input.style.backgroundColor = inpBgColor;
  ta_ast.style.backgroundColor = otherBgColor;
  ta_ast.style.color = otherColor;
  ta_output.style.backgroundColor = otherBgColor;
  ta_output.style.color = otherColor;
}

const update = e => {
  console.clear();
  stderr.value = '';
  reflectFail(); // should not be visible (?)

  let input = ta_input.value;

  logs = [];
  let ast = {};
  let tokens = [];

  if (input) localStorage.setItem('Tenko.repl.input', input);
  else localStorage.removeItem('Tenko.repl.input');

  // Store the settings in an easy to thaw way
  localStorage.setItem(
    'Tenko.repl.options',
    [
      ...document.querySelectorAll('.box.top-left input')
    ]
      .map(e => `[name="${e.name}"][value="${e.value}" ${!!e.checked}`)
      .join(',')
  );

  let out;
  let threw = 'unknown';
  let selectedMode = document.querySelector('input[name=mode]:checked').value;
  let selectedAst = document.querySelector('input[name=ast]:checked').value;
  let version = +document.querySelector('input[name=version]:checked').value;
  try {
    console.log('crunching (mode=', selectedMode, ', version=', version, '):', '\n```\n' + pret(input) + '\n```');

    out = Tenko(input, {
      goalMode: selectedMode === 'module' ? GOAL_MODULE : GOAL_SCRIPT,
      strictMode: selectedMode === 'strict',
      webCompat: selectedMode === 'webcompat',
      babelCompat: selectedAst === 'babel',
      astRoot: ast,
      tokenStorage: tokens,
      collectTokens: COLLECT_TOKENS_ALL,
      targetEsVersion: version,
      exposeScopes: !!$ast_scopes.checked,
    });
    threw = false;
  } finally {
    // not try/catching here means you can properly debug it...
    if (threw) console.error('An error was thrown. Expecting window.onerror to catch it and amend the trace');
    stderr.value = logs.map(s => s + '\n').join('');

    scheduleOverall(input, selectedMode, version);
  }
  reflectPass();

  // Note: shipping a very old version of Prettier. Not very important for the purpose of printing an AST.
  // Serialize AST with scope objects made JSON-safe (Map/Set → plain object/array) so $scope is readable.
  window.ta_ast.value = pret(JSON.stringify(astToJSONSafe(out.ast)), true);
  window.ta_output.value = out.tokens.map(t => {
    const name = toktypeToString(t);
    if (typeof t === 'object' && typeof t.start === 'number' && typeof t.stop === 'number') {
      const slice = input.slice(t.start, t.stop);
      const loc = (t.line != null && t.column != null) ? ` (${t.line + 1}:${t.column})` : '';
      return name + loc + ' ' + JSON.stringify(slice);
    }
    return name;
  }).join('\n');
  console.log(['out:', out, 'ast:', out.ast]);
};

let overallBouncer = 0;
function scheduleOverall(input, currentMode, currentVersion) {
  clearTimeout(overallBouncer);
  overallBouncer = setTimeout(() => {
    // Update mini-menu indicators, set their class name to `mode_selector true` or `mode_selector false`
    $sloppy_mode.parentNode.className = 'mode_selector ' + silentPassFail(input, 'sloppy', currentVersion);
    $compat_mode.parentNode.className = 'mode_selector ' + silentPassFail(input, 'webcompat', currentVersion);
    $strict_mode.parentNode.className = 'mode_selector ' + silentPassFail(input, 'strict', currentVersion);
    $module_mode.parentNode.className = 'mode_selector ' + silentPassFail(input, 'module', currentVersion);

    $ver_es6.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 6);
    $ver_es7.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 7);
    $ver_es8.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 8);
    $ver_es9.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 9);
    $ver_es10.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 10);
    $ver_es11.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 11);
    $ver_es12.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 12);
    $ver_es13.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 13);
    $ver_es14.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 14);
    $ver_es15.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 15);
    $ver_es16.parentNode.className = 'mode_selector ' + silentPassFail(input, currentMode, 16);
  }, 100);
}

function silentPassFail(code, mode/*:sloppy | webcompat | strict | module*/, version) {
  let threw = false;
  try {
    Tenko(code, {
      goalMode: mode === 'module' ? GOAL_MODULE : GOAL_SCRIPT,
      collectTokens: COLLECT_TOKENS_NONE,
      strictMode: mode === 'strict',
      webCompat: mode === 'webcompat',
      targetEsVersion: version,
      exposeScopes: !!$ast_scopes.checked,
      // Silence all output
      $log: () => {},
      $warn: () => {},
      $error: () => {},
    });
    threw = true;
  } catch (e) {
    // console.warn('the error was', e)
  }
  return threw;
}

[
  window.ta_input,
  ...document.querySelectorAll('.box.top-left input')
].forEach(e => e.onchange = e.onkeyup = update);


update();
