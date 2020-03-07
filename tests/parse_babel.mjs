import {runBabel} from './run_babel.mjs';
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

function compareBabel(code, tenkoPassed, testVariant, enableAnnexb, file, timePerf) {
  let babelOk, babelFail, tasb;
  if (timePerf) console.time('Pure Babel parse time');
  try {
    babelOk = runBabel(code, testVariant, enableAnnexb);
  } catch (e) {
    babelFail = e;
  }
  if (timePerf) console.timeEnd('Pure Babel parse time');

  if (tenkoPassed && babelOk) {
    try {
      tasb = Tenko(
        code,
        {
          goalMode: testVariant === TEST_MODULE ? GOAL_MODULE : GOAL_SCRIPT,
          collectTokens: COLLECT_TOKENS_SOLID,
          strictMode: testVariant === TEST_STRICT,
          webCompat: enableAnnexb ? WEB_COMPAT_ON : WEB_COMPAT_OFF,
          babelCompat: true,
          // targetEsVersion: version || Infinity,

          $log: () => {},
          $warn: () => {},
          $error: () => {},
        },
      );
    } catch (e) {
      ASSERT(false, 'file: ' + file + '; the output pass/fail with and without babelCompat should be the same and the run without babelCompat passed, so this should pass too', e);
    }
  }

  return [babelOk, babelFail, tasb];
}

function normalizeAst(ast, parentProp, parentAst) {
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
    } else if (parentProp === 'extra' && prop === 'trailingComma') {
      // temp
      // the trailingComma prop is used in a bunch of places and its value should be the start pos of the comma: https://github.com/babel/babel/blob/87feda7c2a33b7bde6dc926ced4dd741a90cc860/packages/babel-parser/src/parser/expression.js#L831
      delete ast[prop];
    }
    // Work around a poisoned getter/setter on .canon in non-ident tokens in dev mode
    let opd = Object.getOwnPropertyDescriptor(ast, prop);
    if (opd && 'value' in opd) {
      if (ast[prop] && typeof ast[prop] === 'object') {
        normalizeAst(ast[prop], prop, ast);
        if (prop === 'extra') {
          // Drop empty extra nodes
          if (Object.getOwnPropertyNames(ast[prop]).length === 0) {
            delete ast[prop];
          }
        }
      }
      let v = ast[prop];
      // Have to delete the prop in some cases, or re-ordering won't work
      // Need to trap because deleting array.length will throw an error
      try { delete ast[prop]; } catch (e) {}
      ast[prop] = v;
    }
    if (prop === 'extra' && ast[prop] === undefined) delete ast[prop];
  });
  return ast;
}

function babelScrub(ast) {
  return (
    astToString(
      smash(ast)
    )
  );
}

function processBabelResult(babelOk, babelFail, tenkoFail, tasb, INPUT_OVERRIDE) {
  let outputBabel = '';
  if (babelOk && !tenkoFail) {
    let b = babelScrub(normalizeAst(babelOk.program, 'program'));
    let t = astToString(normalizeAst(tasb.ast, 'program'));
    if (b === t) {
      // outputBabel += '\nBabel: same';
    } else {
      let d = execSync(
        // Use sub-shell `<(...)` to prevent temporary file management.
        // Use base64 to prevent shell interpretation of input.
        // Final `true` is to suppress `diff`'s non-zero exit code when input differs.
        `diff -U 0 --text -d --suppress-blank-empty --ignore-blank-lines --ignore-all-space <(
            echo '${Buffer.from(t).toString('base64')}' | base64 -d -
          ) <(
            echo '${Buffer.from(b).toString('base64')}' | base64 -d -
          ) || true`
        , {shell: '/bin/bash', encoding: 'utf8'}
      ).replace(/^(?:\+\+\+ \/|--- \/|@@ ).*$/gm, '').replace(/\n+/g, '\n');

      outputBabel += '\nBabel AST is different:\n' + d;
      if (INPUT_OVERRIDE) console.log('=>', outputBabel);
    }
  } else if (!babelFail && tenkoFail) {
    // There are a million cases where Babel over-accepts and it's too much for me to start investigating all of them :(
    // outputBabel += '\nBabel did not throw an error\n' + [babelOk, babelFail];
  } else if (babelFail && !tenkoFail) {
    outputBabel += '\nBabel threw an error (and Tenko did not): ' + babelFail.message + '\n';
    if (INPUT_OVERRIDE) console.log('=>', babelFail.message);
  } else {
    // outputBabel = '\n(Babel did not run)\n';
  }

  return outputBabel;
}

function ignoreTenkoTestForBabel(shortFile) {
  // There are some files where I've asserted that the AST mismatch between Babel and Tenko is caused by something
  // either I won't fix, Babel does wrong, or a difference that is benign enough not to matter to me.
  return `
    // Double func statement should not trigger error in web compat mode (default for babel)
    // Arguably a bug but since there isn't really a web compat mode I'm not going to file a bug for it
    tests/testcases/bindings/block/annex_b_function_statement_exception/lexical_declarations_should_not_trigger_syntax_error_if_only_bound_to_function_decl_names.md
    tests/testcases/bindings/block/dupe_funcs_in_block_are_bad.md
    tests/testcases/bindings/functions/rebinding_func_name/double_decl_in_block_scope.md
    tests/testcases/bindings/switch/func_decls_are_considered_60let60_when_not_in_scope_root.md
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
  
    // Location bug in grouped sequence
    //    https://github.com/babel/babel/issues/10436
    tests/testcases/classes/extending/multi-line.md
    tests/testcases/group_or_arrow/group/multi_line_location.md
    tests/testcases/group_or_arrow/group/single_line_location.md
  
    // We do not support comments so ignore all tests with comment deltas
    tests/testcases/directive_prologues/default_expression_statement_behavior/global/multi_directive_with_multi_comment_causing_asi.md
    tests/testcases/directive_prologues/default_expression_statement_behavior/global/multi_directive_with_multi_comment_sans_asi.md
    tests/testcases/directive_prologues/default_expression_statement_behavior/global/multi_directive_with_single_comment.md
    tests/testcases/directive_prologues/default_expression_statement_behavior/regular_function/multi_directive_with_multi_comment_causing_asi.md
    tests/testcases/directive_prologues/default_expression_statement_behavior/regular_function/multi_directive_with_multi_comment_sans_asi.md
    tests/testcases/directive_prologues/default_expression_statement_behavior/regular_function/multi_directive_with_single_comment.md
    tests/testcases/directive_prologues/into_Directive_node/global/multi_directive_with_multi_comment_causing_asi.md
    tests/testcases/directive_prologues/into_Directive_node/global/multi_directive_with_multi_comment_sans_asi.md
    tests/testcases/directive_prologues/into_Directive_node/global/multi_directive_with_single_comment.md
    tests/testcases/directive_prologues/into_Directive_node/regular_function/multi_directive_with_multi_comment_causing_asi.md
    tests/testcases/directive_prologues/into_Directive_node/regular_function/multi_directive_with_multi_comment_sans_asi.md
    tests/testcases/directive_prologues/into_Directive_node/regular_function/multi_directive_with_single_comment.md
    tests/testcases/whitespace/between_comments/cr.md
    tests/testcases/whitespace/between_comments/cr_after_lf.md
    tests/testcases/whitespace/between_comments/cr_before_lf.md
    tests/testcases/whitespace/between_comments/cr_between_lf.md
    tests/testcases/whitespace/between_comments/lf.md
    tests/testcases/whitespace/between_comments/lf_between_cr.md
    tests/testcases/html_comments/close_comment/after_slc.md
    tests/testcases/html_comments/close_comment/after_slc_tail.md
    tests/testcases/html_comments/close_comment/html_close_comment_should_cause_asi.md
    tests/testcases/html_comments/close_comment/mc_with_nl.md
    tests/testcases/html_comments/close_comment/mmc_smc.md
    tests/testcases/html_comments/close_comment/semi_mc_with_nl.md
    tests/testcases/html_comments/close_comment/semi_nl.md
    tests/testcases/html_comments/close_comment/smc_mmc.md
    tests/testcases/html_comments/open_comment/html_open_actually_has_no_close.md
    tests/testcases/html_comments/open_comment/html_open_on_its_own_line.md
    tests/testcases/html_comments/open_comment/html_open_without_close_1.md
    tests/testcases/html_comments/open_comment/html_open_without_close_2.md
    tests/testcases/var/html_comment_close_marks_start_of_single_line_comment.md
    
    // Bug in babel; incorrect use strict assignments to arguments/eval
    //    https://github.com/babel/babel/issues/10411
    tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/shorthand/arguments.md
    tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/shorthand/eval.md
    tests/testcases/objects/literals/arguments_as_shorthand_keys.md
    tests/testcases/objects/literals/cannot_use_as_shorthand_objlit_5barguments5d.md
    tests/testcases/objects/literals/cannot_use_as_shorthand_objlit_5beval5d.md
    tests/testcases/objects/literals/eval_as_shorthand_keys.md
    tests/testcases/objects/literals/keywords_in_object_shorthand/gen/cannot_use_as_shorthand_objlit/arguments.md
    tests/testcases/objects/literals/keywords_in_object_shorthand/gen/cannot_use_as_shorthand_objlit/eval.md
    // same but because Babel doesnt pick up the assignment destructuring to a _property_ on the obj with shorthand
    tests/testcases/random_stuff/2318/a2f0.md
    tests/testcases/random_stuff/2318/gen/a2f_case/287brest7beval7d2ex7d_3d_7b7d29_.md

    // Ignore: template encoding where I don't normalize newlines.
    tests/testcases/printer/template_with_cr.md

    // Location of 2028/2029
    //    https://github.com/babel/babel/issues/10435
    tests/testcases/regexes/charclass_weird_escapes/2028.md
    tests/testcases/regexes/charclass_weird_escapes/2029.md
    tests/testcases/string/escapes/2028.md
    tests/testcases/string/escapes/2029.md
    tests/testcases/string/location_2028.md
    tests/testcases/string/location_2029.md
    tests/testcases/tagged_templates/escapes/2028.md
    tests/testcases/tagged_templates/escapes/2029.md
    tests/testcases/templates/escapes/2028.md
    tests/testcases/templates/escapes/2029.md

    // Babel normalizes \r to \n and that's fine.
    tests/testcases/templates/crlf.md
    tests/testcases/zeprinter/template_with_cr.md

    // I dunno some kind of await detection gone bad?
    tests/testcases/assigns/to_keyword/await/assign_to_paren-wrapped_await_var_in_param_default.md
    tests/testcases/assigns/to_keyword/await/assign_to_paren-wrapped_await_var_inside_delete_in_param_default.md
    tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_VALUE_keyword_inside_delete_in_param_default/await.md
    tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_VALUE_var_inside_delete_in_param_default/await.md
    tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_keyword_in_arrow_param_default/await.md
    tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_keyword_in_generator_param_default/await.md
    tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_keyword_var_in_param_default/await.md
    tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_keyword_var_inside_delete_in_param_default/await.md
    tests/testcases/async_keyword/await_as_param_name_of_an_arrow_that_is_a_param_default_of_an_async_call.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/async_class_method_computed_key_await_not_async.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_await_not_async.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_param_default_await_async.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_param_default_await_async_semi.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_param_default_await_not_async.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_param_name_await_async.md
    tests/testcases/await/arg_default/arg/in_async/arrow_complex/class_method_computed_key_param_name_await_not_async.md
    tests/testcases/await/arg_name/arrow/plain_arrow_in_generator.md
    tests/testcases/await/arg_name/arrow/plain_arrow_in_global.md
    tests/testcases/await/arrow_piggy/gen/test/285ba_3d_await5d29_3d3e_x.md
    tests/testcases/await/arrow_piggy/gen/test/287ba3a_b_3d_await7d29_3d3e_x.md
    tests/testcases/await/arrow_piggy/gen/test/287ba_3d_await7d29_3d3e_x.md
    tests/testcases/await/arrow_piggy/gen/test/287bawait7d29_3d3e_x.md
    tests/testcases/await/arrow_piggy/gen/test/28a_3d_await29_3d3e_x.md
    tests/testcases/await/arrow_piggy/gen/test/28await29_3d3e_x.md
    tests/testcases/await/arrow_piggy/gen/test/28restawait29_3d3e_x.md
    tests/testcases/await/async_call_subarrow_rest_await.md
    tests/testcases/await/in_group_in_param_default/group_await_piggy_test_in_arrow_param_default_1.md
    tests/testcases/await/in_group_in_param_default/group_await_piggy_test_in_func_param_default_1.md
    tests/testcases/await/in_group_in_param_default/group_bad_await_piggy_test_in_func_param_default.md
    tests/testcases/classes/piggies_in_classes/await/unwrapped/nested_no_arg.md
    tests/testcases/classes/piggies_in_classes/await/wrapped_in_async_func/nested_no_arg.md
    tests/testcases/classes/piggies_in_classes/await/wrapped_in_plain_func/nested_no_arg.md
    tests/testcases/objects/destructuring/arrow_shorthand_obj_await.md
    tests/testcases/objects/destructuring/arrow_shorthand_obj_init_await.md
    tests/testcases/objects/destructuring/identifier_properties/a3ab_identifier_check/strict-mode_only_arrow_keyword3dawait.md
    tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/arrow_ident_key/await.md
    tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/arrow_number_key/await.md
    tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/arrow_string_key/await.md
    tests/testcases/objects/destructuring/identifier_properties/shorthand_identifiers_check/strict-mode_only_keyword3dawait.md
    tests/testcases/objects/literals/cannot_use_as_arrow_header_5b60await605d.md
    tests/testcases/objects/literals/cannot_use_as_arrow_header_5bawait5d.md
    tests/testcases/objects/literals/keywords_in_object_shorthand/gen/cannot_use_as_arrow_header/await.md
    tests/testcases/optional_chaining/await_var.md
    tests/testcases/group_or_arrow/group/invalid_arrow_header_things_that_are_valid_in_a_group/gen/in_arrow/await.md

    // First token after class is forced to be strict mode
    //     https://github.com/babel/babel/issues/11183
    //     https://github.com/acornjs/acorn/issues/912
    tests/testcases/classes/class_octal.md
    tests/testcases/lexer_cases/numbers/legacy_octal/class_02.md

    // Faking a directive with tail
    // Fixed: https://github.com/babel/babel/issues/10412
    tests/testcases/directive_prologues/octals/strict_mode_directive_as_tag_directive_test.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28029.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28129.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28229.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28329.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28429.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28529.md
    tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_28629.md
  `.split(/\n/g).map(s => s.trim()).includes(shortFile);
}

function ignoreTest262Babel(shortFile) {
  // Comment nodes should be stripped from inputs
  return `
    // Should PS/LS increment the location line? Pending https://github.com/estree/estree/issues/199
    //    https://github.com/babel/babel/issues/10435
    test262/test/language/expressions/template-literal/tv-line-continuation.js
    test262/test/language/expressions/template-literal/tv-line-terminator-sequence.js
    test262/test/language/literals/string/line-continuation-double.js
    test262/test/language/literals/string/line-continuation-single.js

    // Grouped sequence expression has incorrect range end
    //    https://github.com/babel/babel/issues/10436
    test262/test/language/expressions/class/scope-name-lex-open-heritage.js
    test262/test/language/expressions/function/scope-name-var-open-non-strict.js
    test262/test/language/statements/class/scope-name-lex-open-heritage.js
    test262/test/language/expressions/generators/scope-name-var-open-non-strict.js

    // Location bug in grouped sequence
    //    https://github.com/babel/babel/issues/10436
    test262/test/language/expressions/function/scope-name-var-open-strict.js
    test262/test/language/expressions/generators/scope-name-var-open-strict.js
  `.split(/\n/g).map(s => s.trim()).includes(shortFile);
}

export {
  babelScrub,
  compareBabel,
  ignoreTest262Babel,
  ignoreTenkoTestForBabel,
  processBabelResult,
  runBabel,
};
