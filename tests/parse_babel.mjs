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
const TEST_WEB = 'web';

function compareBabel(code, tenkoPassed, testVariant, enableAnnexb, file, timePerf) {
  let babelOk, babelFail, tasb;
  if (timePerf) console.time('Pure Babel parse time');
  try {
    babelOk = runBabel(code, testVariant);
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
          webCompat: (enableAnnexb || testVariant === TEST_WEB) ? WEB_COMPAT_ON : WEB_COMPAT_OFF,
          babelCompat: true,

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
            echo '${Buffer.from(encodeUnicode(t)).toString('base64')}' | base64 -d -
          ) <(
            echo '${Buffer.from(encodeUnicode(b)).toString('base64')}' | base64 -d -
          ) || true`
        , {shell: '/bin/bash', encoding: 'utf8'}
      ).replace(/^(?:\+\+\+ \/|--- \/|@@ ).*$/gm, '').replace(/\n+/g, '\n');

      outputBabel += '\nBabel AST is different:\n' + d;
      if (INPUT_OVERRIDE) console.log('=>', outputBabel);
    }
  } else if (!babelFail && tenkoFail) {
    // outputBabel += '\nBabel did not throw an error\n' + [babelOk, babelFail];
  } else if (babelFail && !tenkoFail) {
    outputBabel += '\nBabel threw an error (and Tenko did not): ' + babelFail.message + '\n';
    if (INPUT_OVERRIDE) console.log('=>', babelFail.message);
  } else {
    // outputBabel = '\n(Babel did not run)\n';
  }

  return outputBabel;
}

function ignoreTenkoTestForBabel(file) {
  // There are some files where I've asserted that the AST mismatch between Babel and Tenko is caused by something
  // either I won't fix, Babel does wrong, or a difference that is benign enough not to matter to me.

  return [
    // Double paren wrapped delete arg; babel uses outer-most paren for location, Tenko uses inner-most
    // (Neither is wrong, inner is just easier for us)
    'tests/testcases/delete/single_ident_cases/multi_wrap_property.md',
    'tests/testcases/delete/single_ident_cases/wrapped_arrow_wrapped_prop.md',
    'tests/testcases/delete/single_ident_cases/wrapped_assign_outer_prop.md',

    // Bug in babel; incorrect use strict assignments to arguments/eval
    //    https://github.com/babel/babel/issues/10411
    'tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/shorthand/arguments.md',
    'tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/shorthand/eval.md',
    'tests/testcases/objects/literals/arguments_as_shorthand_keys.md',
    'tests/testcases/objects/literals/cannot_use_as_shorthand_objlit_x005bargumentsx005d.md',
    'tests/testcases/objects/literals/cannot_use_as_shorthand_objlit_x005bevalx005d.md',
    'tests/testcases/objects/literals/eval_as_shorthand_keys.md',
    'tests/testcases/objects/literals/keywords_in_object_shorthand/gen/cannot_use_as_shorthand_objlit/arguments.md',
    'tests/testcases/objects/literals/keywords_in_object_shorthand/gen/cannot_use_as_shorthand_objlit/eval.md',
    // same but because Babel doesn't pick up the assignment destructuring to a _property_ on the obj with shorthand
    'tests/testcases/random_stuff/x002318/ax002f0.md',
    'tests/testcases/random_stuff/x002318/gen/ax002f_case/x0028x007bx002ex002ex002ex007bevalx007dx002exx007d_x003d_x007bx007dx0029_.md',
    // same but because Babel doesn't notice the property access on the next line
    //    https://github.com/babel/babel/issues/10412
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00280x0029.md',
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00281x0029.md',
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00282x0029.md',
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00283x0029.md',
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00284x0029.md',
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00285x0029.md',
    'tests/testcases/strict_mode/asi/tails_that_prevent_ASI_so_it_is_not_a_directive_x00286x0029.md',

    // Comments, ugh
    'tests/testcases/directive_prologues/default_expression_statement_behavior/global/multi_directive_with_multi_comment_causing_asi.md',
    'tests/testcases/directive_prologues/default_expression_statement_behavior/global/multi_directive_with_multi_comment_sans_asi.md',
    'tests/testcases/directive_prologues/default_expression_statement_behavior/global/multi_directive_with_single_comment.md',
    'tests/testcases/directive_prologues/default_expression_statement_behavior/regular_function/multi_directive_with_multi_comment_causing_asi.md',
    'tests/testcases/directive_prologues/default_expression_statement_behavior/regular_function/multi_directive_with_multi_comment_sans_asi.md',
    'tests/testcases/directive_prologues/default_expression_statement_behavior/regular_function/multi_directive_with_single_comment.md',
    "tests/testcases/directive_prologues/into_Directive_node/global/multi_directive_with_multi_comment_causing_asi.md",
    "tests/testcases/directive_prologues/into_Directive_node/global/multi_directive_with_multi_comment_sans_asi.md",
    "tests/testcases/directive_prologues/into_Directive_node/global/multi_directive_with_single_comment.md",
    "tests/testcases/directive_prologues/into_Directive_node/regular_function/multi_directive_with_multi_comment_causing_asi.md",
    "tests/testcases/directive_prologues/into_Directive_node/regular_function/multi_directive_with_multi_comment_sans_asi.md",
    "tests/testcases/directive_prologues/into_Directive_node/regular_function/multi_directive_with_single_comment.md",
    "tests/testcases/var_statement/html_comment_close_marks_start_of_single_line_comment.md",

    // Bug: Babel getting tricked by "use strict" as a tagged template
    'tests/testcases/directive_prologues/octals/strict_mode_directive_as_tag_directive_test.md',

    // This is just a weird sloppy/strict thing in Babel. Meh
    //    https://github.com/babel/babel/issues/10413
    'tests/testcases/var_statement/binding_generic/reserved_words/gen/catch_clause/let.md',

    // Babel applies annexB by default. The __proto__ is annexB but allowed in strict. so module output crashes.
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_arr_in_web_compat.md',
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_arr_no_web_compat.md',
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_obj_in_web_compat.md',
    'tests/testcases/for_statement/for-loop/double_proto/double_proto_of_lhs_obj_no_web_compat.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/arr_paren_wrapped_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/arrow_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/async_arrow_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/async_call_wrapped_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_ident_and_string.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_string_and_ident.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_strings.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_two_idents.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_with_wrapped_in_array.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/bad_case_wrapped_in_array.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/arr_plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/as_an_arrow.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/destructuring_assignment.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/grouped_destructuring_assignment.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/inside_a_complex_destruct_in_an_arrow_1.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/obj_plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/not_async/plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/with_async/as_an_arrow.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/with_async/grouped_destructuring_assignment.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/exceptions/with_async/plain_group.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/obj_paren_wrapped_is_explicitly_exempted.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/paren_wrapped.md',
    'tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/ident_string.md',

    // To investigate: These only occur in the async version of the test. Babel applying non-annexb rules to lexical bindings
    'tests/testcases/functions/declaration/block_scoped/gen/catch_block/async_function_fx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/catch_block/async_function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/catch_block/function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/finally_block/async_function_fx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/finally_block/async_function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/finally_block/function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/func_func/async_function_fx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/func_func/async_function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/func_func/function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/async_function_fx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/async_function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/async_function_fx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/async_function_x002afx0028x0029x007bx007d.md',
    'tests/testcases/functions/declaration/block_scoped/gen/switch_default_block/function_x002afx0028x0029x007bx007d.md',

    // Location bug in grouped sequence
    //    https://github.com/babel/babel/issues/10436
    'tests/testcases/classes/extending/multi-line.md',
    'tests/testcases/group_or_arrow/group/multi_line_location.md',

    // Location of 2028/2029
    //    https://github.com/babel/babel/issues/10435
    'tests/testcases/string/2028_is_ok.md',
    'tests/testcases/string/2029_is_ok.md',
    'tests/testcases/tagged_templates/escapes/2028.md',
    'tests/testcases/tagged_templates/escapes/2029.md',
    'tests/testcases/templates/escapes/2028.md',
    'tests/testcases/templates/escapes/2029.md',
    'tests/testcases/string/escapes/2028.md',
    'tests/testcases/string/escapes/2029.md',
    'tests/testcases/string/location_2028.md',
    'tests/testcases/string/location_2029.md',

    // Bug: the .value for the tagged template is not null even though the \8 and \9 are always bad escapes for templates
    //    https://github.com/babel/babel/issues/10437
    'tests/testcases/tagged_templates/escapes/octal/escape_8.md',
    'tests/testcases/tagged_templates/escapes/octal/escape_9.md',

    // Ignore: Babel applies strict mode octal exception (is it incorrectly?)
    'tests/testcases/classes/class_octal.md',
    'tests/testcases/lexer_cases/numbers/legacy_octal/class_02.md',
    //
    // // Ignore: template encoding where I don't normalize newlines.
    'tests/testcases/directive_prologues/octals/strict_mode_directive_as_tag.md',
    'tests/testcases/printer/template_with_cr.md',

    // bigint as objkey
    'tests/testcases/objects/number_key/bin_bigint_method.md',
    'tests/testcases/objects/number_key/bin_bigint_prop.md',
    'tests/testcases/objects/number_key/dec_bigint_method.md',
    'tests/testcases/objects/number_key/dec_bigint_prop.md',
    'tests/testcases/objects/number_key/hex_bigint_method.md',
    'tests/testcases/objects/number_key/hex_bigint_prop.md',
    'tests/testcases/objects/number_key/oct_bigint_method.md',
    'tests/testcases/objects/number_key/oct_bigint_prop.md',

    // await inside generator
    'tests/testcases/assigns/assigning_to_keyword/gen/assign_to_paren-wrapped_VALUE_keyword_inside_delete_in_param_default/await.md',
    'tests/testcases/assigns/assigning_to_keyword/gen/assign_to_paren-wrapped_VALUE_var_inside_delete_in_param_default/await.md',
    'tests/testcases/assigns/assigning_to_keyword/gen/assign_to_paren-wrapped_keyword_in_arrow_param_default/await.md',
    'tests/testcases/assigns/assigning_to_keyword/gen/assign_to_paren-wrapped_keyword_in_generator_param_default/await.md',
    'tests/testcases/assigns/assigning_to_keyword/gen/assign_to_paren-wrapped_keyword_var_in_param_default/await.md',
    'tests/testcases/assigns/assigning_to_keyword/gen/assign_to_paren-wrapped_keyword_var_inside_delete_in_param_default/await.md',
    'tests/testcases/assigns/assigning_to_keyword/x0060awaitx0060_is_only_but_always_an_illegal_var_name_with_the__module__goal/assign_to_paren-wrapped_await_var_in_param_default.md',
    'tests/testcases/assigns/assigning_to_keyword/x0060awaitx0060_is_only_but_always_an_illegal_var_name_with_the__module__goal/assign_to_paren-wrapped_await_var_inside_delete_in_param_default.md',
    'tests/testcases/async_keyword/await_as_param_name_of_an_arrow_that_is_a_param_default_of_an_async_call.md',
    'tests/testcases/await/async_call_subarrow_rest_await.md',
    'tests/testcases/await/await_as_arg_default/await_with_arg/in_async/arrow_complex_await/class_with_computed_method_containing_await_expr_followed_by_a_simple_ident_method_that_should_not_clobber_the_state.md',
    'tests/testcases/await/await_as_arg_name/arrow/plain_arrow_in_generator.md',
    'tests/testcases/await/await_as_arg_name/arrow/plain_arrow_in_global.md',
    'tests/testcases/await/await_in_group_in_param_default/group_await_piggy_test_in_arrow_param_default_1.md',
    'tests/testcases/await/await_in_group_in_param_default/group_await_piggy_test_in_func_param_default_1.md',
    'tests/testcases/await/await_in_group_in_param_default/group_bad_await_piggy_test_in_func_param_default.md',
    'tests/testcases/classes/piggies_in_classes/await/unwrapped/nested_no_arg.md',
    'tests/testcases/classes/piggies_in_classes/await/wrapped_in_async_func/nested_no_arg.md',
    'tests/testcases/classes/piggies_in_classes/await/wrapped_in_plain_func/nested_no_arg.md',
    'tests/testcases/group_or_arrow/group/invalid_arrow_header_things_that_are_valid_in_a_group/gen/in_arrow/await.md',
    'tests/testcases/objects/destructuring/identifier_properties/ax003ab_identifier_check/strict-mode_only_arrow_keywordx003dawait.md',
    'tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/arrow_ident_key/await.md',
    'tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/arrow_number_key/await.md',
    'tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/gen/arrow_string_key/await.md',
    'tests/testcases/objects/destructuring/identifier_properties/shorthand_identifiers_check/strict-mode_only_keywordx003dawait.md',
    'tests/testcases/objects/literals/cannot_use_as_arrow_header_x005bawaitx005d.md',
    'tests/testcases/objects/literals/cannot_use_as_arrow_header_x005bx0060awaitx0060x005d.md',
    'tests/testcases/objects/literals/keywords_in_object_shorthand/gen/cannot_use_as_arrow_header/await.md',

    // (html) comments
    'tests/testcases/html_comments/close_comment/after_slc.md',
    'tests/testcases/html_comments/close_comment/after_slc_tail.md',
    'tests/testcases/html_comments/close_comment/html_close_comment_should_cause_asi.md',
    'tests/testcases/html_comments/close_comment/mc_with_nl.md',
    'tests/testcases/html_comments/close_comment/mmc_smc.md',
    'tests/testcases/html_comments/close_comment/semi_mc_with_nl.md',
    'tests/testcases/html_comments/close_comment/semi_nl.md',
    'tests/testcases/html_comments/close_comment/smc_mmc.md',
    'tests/testcases/html_comments/open_comment/html_open_actually_has_no_close.md',
    'tests/testcases/html_comments/open_comment/html_open_on_its_own_line.md',
    'tests/testcases/html_comments/open_comment/html_open_without_close_1.md',
    'tests/testcases/html_comments/open_comment/html_open_without_close_2.md',
  ].includes(file.slice(PROJECT_ROOT_DIR.length + 1));
}

function ignoreTest262Babel(file) {
  // Comment nodes should be stripped from inputs
  return [
    // These tests multiline comment with newline. Stripping comments for Babel causes a syntax error. So just skip it.
    'test262/test/language/comments/multi-line-asi-carriage-return.js',
    'test262/test/language/comments/multi-line-asi-line-separator.js',
    'test262/test/language/comments/multi-line-asi-paragraph-separator.js',

    // Bug in Babel (I guess? Or wrong config ..?)
    'test262/test/language/expressions/assignment/destructuring/obj-prop-__proto__dup.js',

    // I'm not sure why Babel throws here (why would it ever consider that part to be a block? Why else throw?)
    //     https://github.com/babel/babel/issues/10438
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

    // Grouped sequence expression has incorrect range end
    //    https://github.com/babel/babel/issues/10436
    'test262/test/language/expressions/class/scope-name-lex-open-heritage.js',
    'test262/test/language/expressions/function/scope-name-var-open-non-strict.js',
    'test262/test/language/expressions/generators/scope-name-var-open-non-strict.js',
    'test262/test/language/statements/class/scope-name-lex-open-heritage.js',

    // Should PS/LS increment the location line? Pending https://github.com/estree/estree/issues/199
    //    https://github.com/babel/babel/issues/10435
    'test262/test/language/expressions/template-literal/tv-line-continuation.js',
    'test262/test/language/expressions/template-literal/tv-line-terminator-sequence.js',
    'test262/test/language/literals/string/line-continuation-double.js',
    'test262/test/language/literals/string/line-continuation-single.js',
    'test262/test/language/literals/string/line-separator.js',
    'test262/test/language/literals/string/paragraph-separator.js',
  ].includes(file.slice(file.indexOf('/test262/') + 1));
}

export {
  babelScrub,
  compareBabel,
  ignoreTest262Babel,
  ignoreTenkoTestForBabel,
  processBabelResult,
  runBabel,
};
