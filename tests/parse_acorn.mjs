import {runAcorn} from './run_acorn.mjs';
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

function compareAcorn(code, tenkoPassed, testVariant, enableAnnexb, file, version, timePerf) {
  // Acorn supports version option, enables annexb by default, has no strict mode option.
  // So we can only run sloppy-annexb and module-annexb rules (governed by runAcorn, not here)

  let acornOk, acornFail, tasa;
  if (timePerf) console.time('Pure Acorn parse time');
  try {
    acornOk = runAcorn(code, testVariant, enableAnnexb, version);
  } catch (e) {
    acornFail = e;
  }
  if (timePerf) console.timeEnd('Pure Acorn parse time');

  // Only reparse if we actually need to validate an AST (if either failed, there's no AST to compare)
  if (tenkoPassed && acornOk) {
    try {
      tasa = Tenko(
        code,
        {
          goalMode: testVariant === TEST_MODULE ? GOAL_MODULE : GOAL_SCRIPT,
          collectTokens: COLLECT_TOKENS_SOLID,
          strictMode: testVariant === TEST_STRICT,
          webCompat: enableAnnexb ? WEB_COMPAT_ON : WEB_COMPAT_OFF,
          acornCompat: true,
          targetEsVersion: version || Infinity,

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

  if (!acornFail && !tenkoFail) {
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
    let x = [acornOk, acornFail, acornFail];
    try {
      x = JSON.stringify([acornOk, acornFail, acornFail]);
    } catch (e) {
      // For example: bigint will trigger an error
      try {
        // nodejs hack
        x = require('v8').serialize(x).toString('utf8');
      } catch (e) {
        // meh, nevermind
      }
    }
    outputAcorn += '\nAcorn did not throw an error\n' + x;
  } else if (acornFail && !tenkoFail) {
    outputAcorn += '\nAcorn threw an error (and Tenko did not): ' + acornFail.message + '\n';
    if (INPUT_OVERRIDE) console.log('=>', acornFail.message);
  } else {
    // outputAcorn = '\n(Acorn did not run)\n';
  }

  return outputAcorn;
}

function ignoreTenkoTestForAcorn(shortFile) {
  // Mismatches between Tenko and Acorn on my own test files
  // Note: since Acorn only cares about v8/spidermonkey parity, there's no telling which cases it would care about.
  // As such I'm not longer putting in more effort than verifying on my end whether I agree with a mismatch.

  return `
    // Bug: Parens in assignment pattern
    //    https://github.com/acornjs/acorn/issues/872
    tests/testcases/assigns/destruct/good_destruct_assign_of_obj_case.md
    tests/testcases/assigns/obj_destruct_rest/gen/case/287brest28obj297d_3d_foo29.md

    // Bug: Same extends multi-line group loc bug as Babel
    //   https://github.com/acornjs/acorn/issues/873
    tests/testcases/classes/extending/multi-line.md
    // Related bug: end of multi-line group has incorrect loc
    tests/testcases/group_or_arrow/group/multi_line_location.md

    // Bug: typeof statement, newline, regex is actual division but acorn (like Babel) tries to parse a regex
    //    https://github.com/acornjs/acorn/issues/875
    //    (Babel issue: https://github.com/babel/babel/issues/10410 )
    tests/testcases/functions/expression/regex_edge_case/with_async/expression/with_flag.md
    tests/testcases/functions/expression/regex_edge_case/with_async/expression/sans_flag.md
    tests/testcases/parens/arrow/arrows_is_not_a_normal_expression_value/arrow_regex_with_newline.md
    tests/testcases/parens/arrow/regex_edge_case/with_block/cannot_divide_an_arrow_and_cannot_asi_with_forward_slash_at_start_of_next_line_28regex_2b_flag29.md
    tests/testcases/parens/arrow/regex_edge_case/with_block/cannot_divide_an_arrow_and_cannot_asi_with_forward_slash_at_start_of_next_line_28regex_no_flag29.md

    // Bug: \\p regex case that I think is valid
    //     https://github.com/acornjs/acorn/issues/879
    tests/testcases/regexes/property_escapes/uflag/gen/Valid_binary/u.md
    tests/testcases/regexes/property_escapes/uflag/gen/Valid_binary_in_character_class/u.md

    // Bug (?): Not incrementing line for 2028/2029
    //    https://github.com/acornjs/acorn/issues/877
    tests/testcases/string/2028_is_ok.md
    tests/testcases/string/2029_is_ok.md
    tests/testcases/string/escapes/2028.md
    tests/testcases/string/escapes/2029.md
    tests/testcases/string/location_2028.md
    tests/testcases/string/location_2029.md
    tests/testcases/tagged_templates/escapes/2028.md
    tests/testcases/tagged_templates/escapes/2029.md
    tests/testcases/templates/escapes/2028.md
    tests/testcases/templates/escapes/2029.md
    // Somewhat related: this should be an error. But as long as the above case isn't fixed, neither will this case be.
    tests/testcases/regexes/charclass_weird_escapes/2028.md
    tests/testcases/regexes/charclass_weird_escapes/2029.md

    // Ignore: templates where I don't normalize the newlines (\r vs \n)
    tests/testcases/printer/template_with_cr.md
    tests/testcases/templates/crlf.md
    tests/testcases/zeprinter/template_with_cr.md

    // Export star \`as\` (ES2020)
    tests/testcases/export_declaration/export_star_from/star_as_from.md
    tests/testcases/export_declaration/export_star_from/star_as_from_es11.md

    // Fixed: First token after class should use parent strict mode status (same as babel)
    // Fixed: https://github.com/acornjs/acorn/issues/912
    //    https://github.com/babel/babel/issues/11183
    tests/testcases/classes/class_octal.md
    tests/testcases/lexer_cases/numbers/legacy_octal/class_02.md

    // Ignore (w/e): cannot await an arrow
    tests/testcases/group_or_arrow/arrow/position/gen/await_arg/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/await_arg/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/await_arg/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/await_arg/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/await_arg/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/await_arg/async_28x_y29_3d3e_ok.md

    // Bug: async arrow to rhs of addition
    //    https://github.com/acornjs/acorn/issues/914
    tests/testcases/async_keyword/async_arrow_to_test_ast.md

    // Ignore: function statement name lexical binding clash
    // Wontfix: https://github.com/acornjs/acorn/issues/916
    tests/testcases/bindings/block/annex_b_function_statement_exception/label_func_and_var_in_block.md
    tests/testcases/functions/declaration/block_scoped/gen/catch_block/async_function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/catch_block/async_function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/catch_block/function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/catch_block/function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/finally_block/async_function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/finally_block/async_function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/finally_block/function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/finally_block/function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/func_func/async_function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/func_func/async_function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/func_func/function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/func_func/function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/async_function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/async_function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/async_function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/async_function_f28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/function_2af28297b7d.md
    tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/function_f28297b7d.md
    tests/testcases/functions/func_statements/switch_with_double_decl_same_name.md
    tests/testcases/bindings/block/annex_b_function_statement_exception/lexical_declarations_should_not_trigger_syntax_error_if_only_bound_to_function_decl_names.md
    tests/testcases/bindings/block/dupe_funcs_in_block_are_bad.md
    tests/testcases/bindings/functions/rebinding_func_name/double_decl_in_block_scope.md
    tests/testcases/bindings/switch/func_decls_are_considered_60let60_when_not_in_scope_root.md

    // Bug: class extends on async arrow/function
    //    https://github.com/acornjs/acorn/issues/917
    tests/testcases/classes/extending/lefthandside/gen/async_wrapped/async_2829_3d3e_7b7d.md
    tests/testcases/classes/extending/lefthandside/gen/async_wrapped/async_2829_3d3e_x.md
    tests/testcases/classes/extending/lefthandside/gen/async_wrapped/async_function28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/async_wrapped/async_function_2a28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/async_wrapped/async_function_2af28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/async_wrapped/async_function_f28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/declaration/async_2829_3d3e_7b7d.md
    tests/testcases/classes/extending/lefthandside/gen/declaration/async_2829_3d3e_x.md
    tests/testcases/classes/extending/lefthandside/gen/declaration/async_function28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/declaration/async_function_2a28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/declaration/async_function_2af28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/declaration/async_function_f28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/expression/async_2829_3d3e_7b7d.md
    tests/testcases/classes/extending/lefthandside/gen/expression/async_2829_3d3e_x.md
    tests/testcases/classes/extending/lefthandside/gen/expression/async_function28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/expression/async_function_2a28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/expression/async_function_2af28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/expression/async_function_f28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/generator_wrapped/async_2829_3d3e_7b7d.md
    tests/testcases/classes/extending/lefthandside/gen/generator_wrapped/async_2829_3d3e_x.md
    tests/testcases/classes/extending/lefthandside/gen/generator_wrapped/async_function28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/generator_wrapped/async_function_2a28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/generator_wrapped/async_function_2af28297b7d.md
    tests/testcases/classes/extending/lefthandside/gen/generator_wrapped/async_function_f28297b7d.md

    // Bug: static prototype string
    //    https://github.com/acornjs/acorn/issues/918
    tests/testcases/classes/static_method_names_can_NOT_be_60prototype60/string_key.md
    tests/testcases/classes/static_method_names_can_NOT_be_60prototype60/string_unicode_escape_key.md

    // Bug: "use strict" directive octal edge case
    //    https://github.com/acornjs/acorn/issues/921 (fixed)
    //    https://github.com/babel/babel/issues/10412
    tests/testcases/directive_prologues/octals/in_string_after_asi/octal_8_after_asi.md
    tests/testcases/directive_prologues/octals/in_string_after_asi/octal_9_after_asi.md
    tests/testcases/directive_prologues/octals/in_string_before_directive/octal_8_after_asi.md
    tests/testcases/directive_prologues/octals/in_string_before_directive/octal_9_after_asi.md
    tests/testcases/directive_prologues/octals/octal_escape_semi_template_after_use_strict.md
    tests/testcases/directive_prologues/octals/strict_mode_directive_as_tag.md
    tests/testcases/directive_prologues/octals/strict_mode_directive_as_tag_directive_test.md

    // Bug: arrow expression that uses in-operator as lhs of for-header
    //     https://github.com/acornjs/acorn/issues/922
    tests/testcases/for_statement/for-loop/lhs_assign_expr_edge_cases/arrow_expr_with_in_should_fail.md

    // Ignore: let as var name in for-header
    // Wontfix: https://github.com/acornjs/acorn/issues/923
    tests/testcases/for_statement/for-of/let_as_a_var/a_property_on_a_call_on_let_is_not_allowed_in_for-of.md
    tests/testcases/for_statement/for-of/let_as_a_var/a_property_on_let_is_not_allowed_in_for-of.md
    tests/testcases/random_stuff/2318/c2f17.md
    tests/testcases/random_stuff/2318/c2f36.md
    tests/testcases/random_stuff/2318/gen/a2f_case/for28let2ea_of_029_.md

    // Bug: Assignment to paren/group wrapped assignment
    //     https://github.com/acornjs/acorn/issues/886
    tests/testcases/group_or_arrow/arrow/cannot_assign_to_group_with_assignment.md
    tests/testcases/group_or_arrow/group/grouped_assignment_is__not__a_valid_assignment_target.md
    tests/testcases/parens/arrow/cannot_assign_to_group_with_assignment.md
    tests/testcases/parens/group/grouped_assignment_is__not__a_valid_assignment_target.md
    tests/testcases/yield/arguments_checks/arrow_func_args_in_block_scope/babel_case.md

    // Bug: async arrows in weird places
    //     https://github.com/acornjs/acorn/issues/919
    tests/testcases/delete/delete_an_async_arrow.md
    tests/testcases/group_or_arrow/arrow/position/gen/delete_arg/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/delete_arg/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/delete_arg/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/delete_arg/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/delete_arg/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/delete_arg/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/extends_arg/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/extends_arg/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/extends_arg/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/extends_arg/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/extends_arg/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/extends_arg/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/async_async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/async_x_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow/x_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/async_async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/async_x_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/lhs_pow_asi/x_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/async_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/x_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/obj_tail/x_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add_asi/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add_asi/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add_asi/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add_asi/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add_asi/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_add_asi/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div_asi/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div_asi/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div_asi/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div_asi/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div_asi/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_div_asi/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul_asi/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul_asi/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul_asi/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul_asi/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul_asi/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_mul_asi/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow_asi/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow_asi/async_2829_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow_asi/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow_asi/async_28x29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow_asi/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/rhs_pow_asi/async_28x_y29_3d3e_ok.md
    tests/testcases/group_or_arrow/arrow/regex_edge_case/with_block/cannot_divide_an_arrow_and_cannot_asi_with_forward_slash_at_start_of_next_line_28regex_2b_flag29.md
    tests/testcases/group_or_arrow/arrow/regex_edge_case/with_block/cannot_divide_an_arrow_and_cannot_asi_with_forward_slash_at_start_of_next_line_28regex_no_flag29.md
    tests/testcases/new/new_operator/argument_special_cases/delete_async/async_arrow.md
    tests/testcases/new/new_operator/can_not_do_async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60-60/async_args/asi_check_async_arrow_no_newline.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60-60/async_args/async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60-60/reported_in_2314/2.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60-60/reported_in_2314/3.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602160/async_args/asi_check_async_arrow_no_newline.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602160/async_args/async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602160/reported_in_2314/2.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602160/reported_in_2314/3.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602b60/async_args/asi_check_async_arrow_no_newline.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602b60/async_args/async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602b60/reported_in_2314/2.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_602b60/reported_in_2314/3.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60delete60/async_args/asi_check_async_arrow_no_newline.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60delete60/async_args/async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60delete60/reported_in_2314/2.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60delete60/reported_in_2314/3.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60typeof60/async_args/asi_check_async_arrow_no_newline.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60typeof60/async_args/async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60typeof60/reported_in_2314/2.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60typeof60/reported_in_2314/3.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60void60/async_args/asi_check_async_arrow_no_newline.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60void60/async_args/async_arrow.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60void60/reported_in_2314/2.md
    tests/testcases/unary_ops/generic_unary_tests_28GENERATED29/batch_for_60void60/reported_in_2314/3.md

    // Bug: regex after asi after arrow cannot be division
    //    https://github.com/acornjs/acorn/issues/920
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/async_2829_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/async_28x29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/async_28x_y29_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/async_async_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/async_x_3d3e_7b7d.md
    tests/testcases/group_or_arrow/arrow/position/gen/arrow_asi_regex/x_3d3e_7b7d.md

    // Ignore: SequenceExpression loc range
    tests/testcases/group_or_arrow/group/single_line_location.md

    // Ignore, comments
    tests/testcases/html_comments/close_comment/after_empty_mlc.md
    tests/testcases/html_comments/close_comment/html_close_comment_can_have_multiple_multiline_comment_on_a_single_line_before_it.md
    tests/testcases/html_comments/close_comment/sol.md
    tests/testcases/html_comments/close_comment/sol_smc_nl.md
    tests/testcases/html_comments/close_comment/sol_with_tail.md
    tests/testcases/lexer_cases/comments/html/2.pass.md
    tests/testcases/lexer_cases/comments/html/4.pass.md
    tests/testcases/lexer_cases/comments/html/5.pass.md
    tests/testcases/lexer_cases/comments/html/6.pass.md

    // Bug: the in keyword is not allowed inside import
    //     https://github.com/acornjs/acorn/issues/924
    tests/testcases/import_dynamic/gen/NoIn/11.md
    tests/testcases/import_dynamic/gen/NoIn/Infinity.md
    tests/testcases/import_dynamic/gen/NoIn/undefined.md

    // Ignore: module annexb should not allow \\8 \\9 as a string escape
    // Wontfix: https://github.com/acornjs/acorn/issues/925
    tests/testcases/lexer_cases/strings_double/octal_escapes/26.md
    tests/testcases/lexer_cases/strings_double/octal_escapes/27.md
    tests/testcases/lexer_cases/strings_single/octal_escapes/26.md
    tests/testcases/lexer_cases/strings_single/octal_escapes/27.md
    tests/testcases/string/escapes/directives/octal/escape_8.md
    tests/testcases/string/escapes/directives/octal/escape_9.md
    tests/testcases/string/escapes/nondirectives/rest/octal/escape_8.md
    tests/testcases/string/escapes/nondirectives/rest/octal/escape_9.md
    tests/testcases/string/escapes/nondirectives/start/octal/escape_8.md
    tests/testcases/string/escapes/nondirectives/start/octal/escape_9.md
    tests/testcases/tagged_templates/escapes/octal/escape_8.md
    tests/testcases/tagged_templates/escapes/octal/escape_9.md
    tests/testcases/templates/escapes/octal/escape_8.md
    tests/testcases/templates/escapes/octal/escape_9.md
    tests/testcases/lexer_cases/strings_template_head/octal_escapes/26.md
    tests/testcases/lexer_cases/strings_template_body/octal_escapes/26.md
    tests/testcases/lexer_cases/strings_template_body/octal_escapes/27.md
    tests/testcases/lexer_cases/strings_template_head/octal_escapes/27.md
    tests/testcases/lexer_cases/strings_template_static/octal_escapes/26.md
    tests/testcases/lexer_cases/strings_template_static/octal_escapes/27.md
    tests/testcases/lexer_cases/strings_template_tail/octal_escapes/26.md
    tests/testcases/lexer_cases/strings_template_tail/octal_escapes/27.md

    // Acorn does not support ?? yet
    tests/testcases/nullish_coalescing/and_coal.md
    tests/testcases/nullish_coalescing/base.md
    tests/testcases/nullish_coalescing/coal_and.md
    tests/testcases/nullish_coalescing/coal_or.md
    tests/testcases/nullish_coalescing/coal_xor.md
    tests/testcases/nullish_coalescing/double.md
    tests/testcases/nullish_coalescing/in_ternary1.md
    tests/testcases/nullish_coalescing/in_ternary2.md
    tests/testcases/nullish_coalescing/in_ternary3.md
    tests/testcases/nullish_coalescing/or_coal.md
    tests/testcases/nullish_coalescing/xor_coal.md

    // Ignore. This is a test artifact (bigint serialization)
    tests/testcases/numbers/bigint/legacy/87n.md
    tests/testcases/numbers/bigint/legacy/8n.md
    tests/testcases/numbers/bigint/legacy/98n.md
    tests/testcases/numbers/bigint/legacy/9n.md

    // Acorn does not support ?. yet
    tests/testcases/optional_chaining/async_call.md
    tests/testcases/optional_chaining/await_var.md
    tests/testcases/optional_chaining/base.md
    tests/testcases/optional_chaining/call.md
    tests/testcases/optional_chaining/call_chain_prop.md
    tests/testcases/optional_chaining/chain.md
    tests/testcases/optional_chaining/computed_after_call.md
    tests/testcases/optional_chaining/div.md
    tests/testcases/optional_chaining/double_dot_chain.md
    tests/testcases/optional_chaining/dynamic.md
    tests/testcases/optional_chaining/first_prop.md
    tests/testcases/optional_chaining/id_after_call.md
    tests/testcases/optional_chaining/left_op.md
    tests/testcases/optional_chaining/newline_div.md
    tests/testcases/optional_chaining/newline_regex_g.md
    tests/testcases/optional_chaining/newlined.md
    tests/testcases/optional_chaining/optional_computed_dot.md
    tests/testcases/optional_chaining/postfix_ident_minus_asi.md
    tests/testcases/optional_chaining/postfix_ident_nl_minus_asi.md
    tests/testcases/optional_chaining/postfix_ident_nl_plus_asi.md
    tests/testcases/optional_chaining/postfix_ident_plus_asi.md
    tests/testcases/optional_chaining/prefix_minus_asi.md
    tests/testcases/optional_chaining/prefix_plus_asi.md
    tests/testcases/optional_chaining/right_op.md
    tests/testcases/optional_chaining/second_prop.md
    tests/testcases/optional_chaining/some_chains.md
    tests/testcases/optional_chaining/spaced.md
    tests/testcases/optional_chaining/super_as_prop.md
    tests/testcases/optional_chaining/yield_var.md

    // Bug: grammar case involving the N grammar flag for \\k
    //     https://github.com/acornjs/acorn/issues/927
    tests/testcases/regexes/named_capturing_groups/also_charclass_escape.md
    tests/testcases/regexes/named_capturing_groups/regression.md

    // Ignore (w/e): the \\B escape is acceptable in regex class ranges in annexb mode
    tests/testcases/regexes/range_surrogate_head_end/range_end_B_surrogate_head.md

    // Ignore (w/e): surrogate stuff
    tests/testcases/regexes/range_surrogate_head_end/range_end_surrogate_head.md
    tests/testcases/regexes/range_surrogate_head_end/range_end_surrogate_head_u.md

    // Ignore (w/e): directive tail trickery (same as babel)
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28029.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28129.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28229.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28329.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28429.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28529.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28629.md

    // Ignore (w/e): yield in arrow arg
    tests/testcases/yield/arguments_checks/arrow_func_args_in_block_scope/blocked_in_assigned_group.md
    tests/testcases/yield/arguments_checks/arrow_func_args_inside_generator/in_assigned_group.md
  `.split(/\n/g).map(s => s.trim()).includes(shortFile);
}

function ignoreTest262Acorn(shortFile) {
  // Mismatches between Tenko and Acorn on my own test files
  // Note: since Acorn only cares about v8/spidermonkey parity, there's no telling which cases it would care about.
  // As such I'm not longer putting in more effort than verifying on my end whether I agree with a mismatch.

  return `
    // Bug: Escaped property name in objlit that is keyword is throwing an error
    //    https://github.com/acornjs/acorn/issues/881
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-break-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-case-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-catch-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-class-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-const-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-continue-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-debugger-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-default-escaped-ext.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-default-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-delete-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-do-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-else-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-export-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-extends-escaped-ext.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-extends-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-finally-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-for-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-function-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-if-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-import-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-in-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-instanceof-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-new-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-return-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-super-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-switch-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-this-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-throw-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-try-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-typeof-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-var-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-void-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-while-escaped.js
    test262/test/language/expressions/assignment/dstr/ident-name-prop-name-literal-with-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-break-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-case-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-catch-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-class-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-const-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-continue-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-debugger-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-default-escaped-ext.js
    test262/test/language/expressions/assignment/member-expr-ident-name-default-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-delete-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-do-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-else-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-export-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-extends-escaped-ext.js
    test262/test/language/expressions/assignment/member-expr-ident-name-extends-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-finally-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-for-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-function-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-if-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-import-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-in-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-instanceof-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-new-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-return-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-super-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-switch-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-this-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-throw-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-try-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-typeof-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-var-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-void-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-while-escaped.js
    test262/test/language/expressions/assignment/member-expr-ident-name-with-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-break-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-case-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-catch-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-class-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-const-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-continue-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-debugger-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-default-escaped-ext.js
    test262/test/language/expressions/class/ident-name-method-def-default-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-delete-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-do-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-else-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-export-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-extends-escaped-ext.js
    test262/test/language/expressions/class/ident-name-method-def-extends-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-finally-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-for-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-function-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-if-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-import-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-in-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-instanceof-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-new-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-return-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-super-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-switch-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-this-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-throw-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-try-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-typeof-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-var-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-void-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-while-escaped.js
    test262/test/language/expressions/class/ident-name-method-def-with-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-break-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-case-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-catch-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-class-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-const-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-continue-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-debugger-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-default-escaped-ext.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-default-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-delete-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-do-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-else-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-export-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-extends-escaped-ext.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-extends-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-finally-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-for-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-function-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-if-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-import-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-in-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-instanceof-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-new-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-return-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-super-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-switch-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-this-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-throw-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-try-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-typeof-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-var-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-void-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-while-escaped.js
    test262/test/language/expressions/object/covered-ident-name-prop-name-literal-with-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-break-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-case-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-catch-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-class-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-const-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-continue-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-debugger-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-default-escaped-ext.js
    test262/test/language/expressions/object/ident-name-method-def-default-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-delete-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-do-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-else-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-export-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-extends-escaped-ext.js
    test262/test/language/expressions/object/ident-name-method-def-extends-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-finally-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-for-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-function-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-if-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-import-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-in-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-instanceof-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-new-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-return-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-super-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-switch-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-this-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-throw-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-try-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-typeof-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-var-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-void-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-while-escaped.js
    test262/test/language/expressions/object/ident-name-method-def-with-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-break-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-case-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-catch-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-class-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-const-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-continue-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-debugger-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-default-escaped-ext.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-default-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-delete-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-do-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-else-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-export-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-extends-escaped-ext.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-extends-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-finally-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-for-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-function-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-if-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-import-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-in-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-instanceof-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-new-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-return-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-super-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-switch-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-this-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-throw-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-try-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-typeof-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-var-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-void-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-while-escaped.js
    test262/test/language/expressions/object/ident-name-prop-name-literal-with-escaped.js
    test262/test/language/statements/class/ident-name-method-def-break-escaped.js
    test262/test/language/statements/class/ident-name-method-def-case-escaped.js
    test262/test/language/statements/class/ident-name-method-def-catch-escaped.js
    test262/test/language/statements/class/ident-name-method-def-class-escaped.js
    test262/test/language/statements/class/ident-name-method-def-const-escaped.js
    test262/test/language/statements/class/ident-name-method-def-continue-escaped.js
    test262/test/language/statements/class/ident-name-method-def-debugger-escaped.js
    test262/test/language/statements/class/ident-name-method-def-default-escaped-ext.js
    test262/test/language/statements/class/ident-name-method-def-default-escaped.js
    test262/test/language/statements/class/ident-name-method-def-delete-escaped.js
    test262/test/language/statements/class/ident-name-method-def-do-escaped.js
    test262/test/language/statements/class/ident-name-method-def-else-escaped.js
    test262/test/language/statements/class/ident-name-method-def-export-escaped.js
    test262/test/language/statements/class/ident-name-method-def-extends-escaped-ext.js
    test262/test/language/statements/class/ident-name-method-def-extends-escaped.js
    test262/test/language/statements/class/ident-name-method-def-finally-escaped.js
    test262/test/language/statements/class/ident-name-method-def-for-escaped.js
    test262/test/language/statements/class/ident-name-method-def-function-escaped.js
    test262/test/language/statements/class/ident-name-method-def-if-escaped.js
    test262/test/language/statements/class/ident-name-method-def-import-escaped.js
    test262/test/language/statements/class/ident-name-method-def-in-escaped.js
    test262/test/language/statements/class/ident-name-method-def-instanceof-escaped.js
    test262/test/language/statements/class/ident-name-method-def-new-escaped.js
    test262/test/language/statements/class/ident-name-method-def-return-escaped.js
    test262/test/language/statements/class/ident-name-method-def-super-escaped.js
    test262/test/language/statements/class/ident-name-method-def-switch-escaped.js
    test262/test/language/statements/class/ident-name-method-def-this-escaped.js
    test262/test/language/statements/class/ident-name-method-def-throw-escaped.js
    test262/test/language/statements/class/ident-name-method-def-try-escaped.js
    test262/test/language/statements/class/ident-name-method-def-typeof-escaped.js
    test262/test/language/statements/class/ident-name-method-def-var-escaped.js
    test262/test/language/statements/class/ident-name-method-def-void-escaped.js
    test262/test/language/statements/class/ident-name-method-def-while-escaped.js
    test262/test/language/statements/class/ident-name-method-def-with-escaped.js

    // Bug: Multiline group causing invalid (?) location
    //   https://github.com/acornjs/acorn/issues/873
    test262/test/language/expressions/class/scope-name-lex-open-heritage.js
    test262/test/language/expressions/function/scope-name-var-open-non-strict.js
    test262/test/language/expressions/generators/scope-name-var-open-non-strict.js
    test262/test/language/statements/class/scope-name-lex-open-heritage.js

    // Acorn doesn't support ?? yet
    test262/test/language/expressions/coalesce/abrupt-is-a-short-circuit.js
    test262/test/language/expressions/coalesce/chainable-if-parenthesis-covered-logical-and.js
    test262/test/language/expressions/coalesce/chainable-if-parenthesis-covered-logical-or.js
    test262/test/language/expressions/coalesce/chainable-with-bitwise-and.js
    test262/test/language/expressions/coalesce/chainable-with-bitwise-or.js
    test262/test/language/expressions/coalesce/chainable-with-bitwise-xor.js
    test262/test/language/expressions/coalesce/chainable.js
    test262/test/language/expressions/coalesce/follows-null.js
    test262/test/language/expressions/coalesce/follows-undefined.js
    test262/test/language/expressions/coalesce/short-circuit-number-0.js
    test262/test/language/expressions/coalesce/short-circuit-number-42.js
    test262/test/language/expressions/coalesce/short-circuit-number-empty-string.js
    test262/test/language/expressions/coalesce/short-circuit-number-false.js
    test262/test/language/expressions/coalesce/short-circuit-number-object.js
    test262/test/language/expressions/coalesce/short-circuit-number-string.js
    test262/test/language/expressions/coalesce/short-circuit-number-symbol.js
    test262/test/language/expressions/coalesce/short-circuit-number-true.js
    test262/test/language/expressions/coalesce/short-circuit-prevents-evaluation.js
    test262/test/language/expressions/conditional/coalesce-expr-ternary.js

    // Bug: Should PS/LS increment the location line? Probably.
    //    https://github.com/acornjs/acorn/issues/877
    test262/test/language/expressions/template-literal/tv-line-continuation.js
    test262/test/language/expressions/template-literal/tv-line-terminator-sequence.js
    test262/test/language/literals/string/line-continuation-double.js
    test262/test/language/literals/string/line-continuation-single.js
    test262/test/language/literals/string/line-separator.js
    test262/test/language/literals/string/paragraph-separator.js

    // Ignore (w/e): legacy octal bigint is illegal
    test262/test/language/literals/bigint/non-octal-like-invalid-0008n.js
    test262/test/language/literals/bigint/non-octal-like-invalid-012348n.js
    test262/test/language/literals/bigint/non-octal-like-invalid-08n.js
    test262/test/language/literals/bigint/non-octal-like-invalid-09n.js

    // Acorn doesn't support export from yet
    test262/test/language/module-code/eval-rqstd-once.js
    test262/test/language/module-code/eval-rqstd-order.js
    test262/test/language/module-code/eval-self-once.js
    test262/test/language/module-code/instn-once.js
  `.split(/\n/g).map(s => s.trim()).includes(shortFile);
}

export {
  acornScrub,
  compareAcorn,
  ignoreTest262Acorn,
  ignoreTenkoTestForAcorn,
  processAcornResult,
  runAcorn,
};
