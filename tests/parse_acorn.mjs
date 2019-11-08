import acorn from 'acorn';
import {
  ASSERT,
  astToString,
  encodeUnicode,
  smash,
  PROJECT_ROOT_DIR,
} from "./utils.mjs";
import {execSync} from 'child_process';
import {Tenko, COLLECT_TOKENS_SOLID, COLLECT_TOKENS_NONE , GOAL_MODULE, GOAL_SCRIPT, WEB_COMPAT_ON, WEB_COMPAT_OFF} from '../src/index.mjs';

const TEST_SLOPPY = 'sloppy';
const TEST_STRICT = 'strict';
const TEST_MODULE = 'module';
const TEST_WEB = 'web';

function testAcorn(code, mode, version) {
  if (mode === 'strict' || mode === 'sloppy') return false;
  // The Acorn parser seems to apply AnnexB by default with no opt-out so we can't test strict/sloppy directly
  return acorn.parse(code, {
    ecmaVersion: Number.isFinite(version) ? version : 11,
    sourceType: mode === 'module' ? 'module' : 'script',
    locations: true,
    // ranges: true,


    // Not used:
    allowReserved: true,
    allowReturnOutsideFunction: false,
    allowImportExportEverywhere: false,
    allowAwaitOutsideFunction: false,
    allowHashBang: false,
  });
}

function compareAcorn(code, tenkoPassed, testVariant, enableAnnexb, file, version, timePerf) {
  let acornOk, acornFail, tasa;
  if (timePerf) console.time('Pure Acorn parse time');
  try {
    acornOk = testAcorn(code, testVariant, version);
  } catch (e) {
    acornFail = e;
  }
  if (timePerf) console.timeEnd('Pure Acorn parse time');

  if (tenkoPassed && acornOk) {
    try {
      tasa = Tenko(
        code,
        {
          goalMode: testVariant === TEST_MODULE ? GOAL_MODULE : GOAL_SCRIPT,
          collectTokens: COLLECT_TOKENS_SOLID,
          strictMode: testVariant === TEST_STRICT,
          webCompat: (enableAnnexb || testVariant === TEST_WEB) ? WEB_COMPAT_ON : WEB_COMPAT_OFF,
          acornCompat: true,

          $log: () => {},
          $warn: () => {},
          $error: () => {},
        },
      );
    } catch (e) {
      ASSERT(false, 'file: ' + file + '; the output pass/fail with and without acornCompat should be the same and the run without acornCompat passed, so this should pass too', e);
    }
  }

  return [acornOk, acornFail, tasa];
}

function normalizeAst(ast, parentProp) {
  // Given an object model, re-assign properties in lexicographical order except put `type` first

  let names = Object.getOwnPropertyNames(ast);
  names = names.sort((a,b) => a === 'type' ? -1 : b === 'type' ? b : a > b ? -1 : a < b ? 1 : 0);
  names.forEach(prop => {
    // Drop meta data I'm not adding atm
    if (parentProp === 'program') {
      if ([
        'range',
        'typeAnnotation',
      ].includes(prop)) {
        delete ast[prop];
        return;
      }
    }
    if (parentProp === 'loc') {
      if (prop === 'source') { // this just needs some regex fu
        delete ast[prop];
        return;
      }
    } else if (prop === 'start' || prop === 'end') {
      delete ast[prop];
      return;
    }
    // Work around a poisoned getter/setter on .canon in non-ident tokens in dev mode
    let opd = Object.getOwnPropertyDescriptor(ast, prop);
    if (opd && 'value' in opd) {
      if (ast[prop] && typeof ast[prop] === 'object') {
        normalizeAst(ast[prop], prop);
      }
      let v = ast[prop];
      // Have to delete the prop in some cases, or re-ordering won't work
      // Need to trap because deleting array.length will throw an error
      try { delete ast[prop]; } catch (e) {}
      ast[prop] = v;
    }
  });
  return ast;
}

function acornScrub(ast) {
  return (
    astToString(
      // Acorn puts bigint literals in the structures and that trips up json.stringify :(
      smash(ast)
    )
  );
}

function processAcornResult(acornOk, acornFail, tenkoFail, tasa, INPUT_OVERRIDE) {
  let outputAcorn = '';
  if (acornOk && !tenkoFail) {
    let b = acornScrub(normalizeAst(acornOk, 'program'));
    let t = astToString(normalizeAst(tasa.ast, 'program'));
    if (b === t) {
      // outputAcorn += '\nAcorn: same';
    } else {
      let d = execSync(
        // Use sub-shell `<(...)` to prevent temporary file management.
        // Use base64 to prevent shell interpretation of input.
        // Final `true` is to suppress `diff`'s non-zero exit code when input differs.
        `diff -U 0 --text -d --suppress-blank-empty --ignore-blank-lines --ignore-all-space <(
            echo '${Buffer.from(encodeUnicode(t)).toString('base64')}' | base64 -d -
          ) <(
            echo '${Buffer.from(encodeUnicode(b)).toString('base64')}' | base64 -d -
          ) || true`
        , {shell: '/bin/bash', encoding: 'utf8'}
      ).replace(/^(?:\+\+\+ \/|--- \/|@@ ).*$/gm, '').replace(/\n+/g, '\n');

      outputAcorn += '\nAcorn AST is different:\n' + d;
      if (INPUT_OVERRIDE) console.log('=>', outputAcorn);
    }
  } else if (!acornFail && tenkoFail) {
    // outputAcorn += '\nAcorn did not throw an error\n' + [acornOk, acornFail];
  } else if (acornFail && !tenkoFail) {
    outputAcorn += '\nAcorn threw an error (and Tenko did not): ' + acornFail.message + '\n';
    if (INPUT_OVERRIDE) console.log('=>', acornFail.message);
  } else {
    // outputAcorn = '\n(Acorn did not run)\n';
  }

  return outputAcorn;
}

function ignoreTenkoTestForAcorn(file) {
  // There are some files where I've asserted that the AST mismatch between Acorn and Tenko is caused by something
  // either I won't fix, Acorn does wrong, or a difference that is benign enough not to matter to me.

  return [
    // Bug: Parens in assignment pattern
    //    https://github.com/acornjs/acorn/issues/872
    'tests/testcases/assigns/destruct/good_destruct_assign_of_obj_case.md',
    'tests/testcases/assigns/obj_destruct_rest/gen/case/x0028x007bx002ex002ex002ex0028objx0029x007d_x003d_foox0029.md',

    // Bug: Same `extends` multi-line group loc bug as Babel
    //   https://github.com/acornjs/acorn/issues/873
    'tests/testcases/classes/extending/multi-line.md',
    // Related bug: end of multi-line group has incorrect loc
    'tests/testcases/group_or_arrow/group/multi_line_location.md',

    // Ignore: Double __proto__ is valid to extend in strict/module mode and Acorn applies web compat by default.
    // Arguably Tenko should run module/annexb tests as well but I'm not sure that's worth the time...
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_arr_in_web_compat.md',
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_arr_no_web_compat.md',
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_obj_in_web_compat.md',
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_obj_no_web_compat.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/arr_paren_wrapped_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/async_call_wrapped_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_ident_and_string.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_string_and_ident.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_strings.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_two_idents.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_wrapped_in_array.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_wrapped_in_array.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/arr_plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/obj_plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/with_async/plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/obj_paren_wrapped_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/paren_wrapped.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/ident_string.md',

    // Bug: typeof statement, newline, regex is actual division but acorn (like Babel) tries to parse a regex
    //    https://github.com/acornjs/acorn/issues/875
    //    (Babel issue: https://github.com/babel/babel/issues/10410 )
    'tests/testcases/functions/expression/regex_edge_case/with_async/expression/with_flag.md',

    // Bug: \p regex case that I think is valid
    //     https://github.com/acornjs/acorn/issues/879
    'tests/testcases/regexes/property_escapes/uflag/gen/Valid_binary/u.md',
    'tests/testcases/regexes/property_escapes/uflag/gen/Valid_binary_in_character_class/u.md',

    // Bug (?): Not incrementing line for 2028/2029
    //    https://github.com/acornjs/acorn/issues/877
    'tests/testcases/string/2028_is_ok.md',
    'tests/testcases/string/2029_is_ok.md',
    'tests/testcases/string/escapes/2028.md',
    'tests/testcases/string/escapes/2029.md',
    'tests/testcases/string/location_2028.md',
    'tests/testcases/string/location_2029.md',
    'tests/testcases/tagged_templates/escapes/2028.md',
    'tests/testcases/tagged_templates/escapes/2029.md',
    'tests/testcases/templates/escapes/2028.md',
    'tests/testcases/templates/escapes/2029.md',

    // Bug: value should be null for trying to escape \8 and \9
    //     https://github.com/acornjs/acorn/issues/880
    //     Babel issue: https://github.com/babel/babel/issues/10437
    'tests/testcases/tagged_templates/escapes/octal/escape_8.md',
    'tests/testcases/tagged_templates/escapes/octal/escape_9.md',
    'tests/testcases/directive_prologues/octals/strict_mode_directive_as_tag.md',

    // Ignore: templates where I don't normalize the newlines
    'tests/testcases/printer/template_with_cr.md',

    // Export star `as` (ES2020)
    'tests/testcases/export_declaration/export_star_from/star_as_from.md',
  ].includes(file.slice(PROJECT_ROOT_DIR.length + 1));
}

function ignoreTest262Acorn(file) {
  // Comment nodes should be stripped from inputs
  return [
    // Bug: Escaped property name in objlit that is keyword is throwing an error
    //    https://github.com/acornjs/acorn/issues/881
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-break-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-case-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-catch-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-class-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-const-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-continue-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-debugger-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-default-escaped-ext.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-default-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-delete-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-do-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-else-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-export-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-extends-escaped-ext.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-extends-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-finally-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-for-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-function-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-if-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-import-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-in-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-instanceof-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-new-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-return-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-super-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-switch-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-this-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-throw-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-try-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-typeof-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-var-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-void-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-while-escaped.js',
    'test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-with-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-break-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-case-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-catch-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-class-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-const-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-continue-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-debugger-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-default-escaped-ext.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-default-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-delete-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-do-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-else-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-export-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-extends-escaped-ext.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-extends-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-finally-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-for-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-function-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-if-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-import-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-in-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-instanceof-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-new-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-return-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-super-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-switch-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-this-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-throw-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-try-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-typeof-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-var-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-void-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-while-escaped.js',
    'test262/test/language/expressions/assignment/member-expr-ident-name-with-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-break-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-case-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-catch-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-class-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-const-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-continue-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-debugger-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-default-escaped-ext.js',
    'test262/test/language/expressions/class/ident-name-method-def-default-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-delete-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-do-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-else-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-export-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-extends-escaped-ext.js',
    'test262/test/language/expressions/class/ident-name-method-def-extends-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-finally-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-for-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-function-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-if-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-import-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-in-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-instanceof-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-new-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-return-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-super-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-switch-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-this-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-throw-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-try-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-typeof-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-var-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-void-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-while-escaped.js',
    'test262/test/language/expressions/class/ident-name-method-def-with-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-break-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-case-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-catch-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-class-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-const-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-continue-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-debugger-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-default-escaped-ext.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-default-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-delete-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-do-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-else-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-export-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-extends-escaped-ext.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-extends-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-finally-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-for-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-function-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-if-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-import-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-in-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-instanceof-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-new-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-return-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-super-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-switch-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-this-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-throw-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-try-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-typeof-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-var-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-void-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-while-escaped.js',
    'test262/test/language/expressions/object/covered-ident-name-prop-name-literal-with-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-break-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-case-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-catch-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-class-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-const-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-continue-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-debugger-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-default-escaped-ext.js',
    'test262/test/language/expressions/object/ident-name-method-def-default-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-delete-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-do-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-else-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-export-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-extends-escaped-ext.js',
    'test262/test/language/expressions/object/ident-name-method-def-extends-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-finally-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-for-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-function-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-if-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-import-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-in-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-instanceof-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-new-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-return-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-super-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-switch-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-this-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-throw-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-try-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-typeof-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-var-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-void-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-while-escaped.js',
    'test262/test/language/expressions/object/ident-name-method-def-with-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-break-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-case-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-catch-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-class-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-const-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-continue-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-debugger-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-default-escaped-ext.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-default-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-delete-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-do-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-else-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-export-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-extends-escaped-ext.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-extends-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-finally-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-for-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-function-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-if-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-import-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-in-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-instanceof-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-new-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-return-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-super-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-switch-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-this-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-throw-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-try-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-typeof-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-var-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-void-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-while-escaped.js',
    'test262/test/language/expressions/object/ident-name-prop-name-literal-with-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-break-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-case-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-catch-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-class-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-const-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-continue-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-debugger-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-default-escaped-ext.js',
    'test262/test/language/statements/class/ident-name-method-def-default-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-delete-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-do-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-else-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-export-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-extends-escaped-ext.js',
    'test262/test/language/statements/class/ident-name-method-def-extends-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-finally-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-for-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-function-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-if-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-import-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-in-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-instanceof-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-new-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-return-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-super-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-switch-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-this-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-throw-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-try-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-typeof-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-var-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-void-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-while-escaped.js',
    'test262/test/language/statements/class/ident-name-method-def-with-escaped.js',

    // Bug: Multiline group causing invalid (?) location
    //   https://github.com/acornjs/acorn/issues/873
    'test262/test/language/expressions/class/scope-name-lex-open-heritage.js',
    'test262/test/language/expressions/function/scope-name-var-open-non-strict.js',
    'test262/test/language/expressions/generators/scope-name-var-open-non-strict.js',
    'test262/test/language/statements/class/scope-name-lex-open-heritage.js',

    // Bug: Should PS/LS increment the location line? Probably.
    //    https://github.com/acornjs/acorn/issues/877
    'test262/test/language/expressions/template-literal/tv-line-continuation.js',
    'test262/test/language/expressions/template-literal/tv-line-terminator-sequence.js',
    'test262/test/language/literals/string/line-continuation-double.js',
    'test262/test/language/literals/string/line-continuation-single.js',
    'test262/test/language/literals/string/line-separator.js',
    'test262/test/language/literals/string/paragraph-separator.js',

  ].includes(file.slice(file.indexOf('/test262/') + 1));
}

export {
  acornScrub,
  compareAcorn,
  ignoreTest262Acorn,
  ignoreTenkoTestForAcorn,
  processAcornResult,
  testAcorn,
};
