import {reduceErrorInput} from "../test_case_reducer.mjs";
import {
  dumpFuzzOutput,
  warnOsd,
} from './fuzzutils.mjs'

const VERBOSE = false;
const buffer = [];

function ignoreKnownCases(input) {
  // This is checked after every reduction step and in the end.
  // Return true if the input will be ignored (the reducer will reject the attempt and try something else)
  return (
    false
    // Catch `for(y()of y)` cases
    || /\(\)of/.test(input)
    // Silly case that often gets reduced to
    || /\nlet in\n/.test(input)
    // for(y()in y)y
    || /for\s*\(y\(\)\s*in/.test(input)
    // y()=x (but not arrow)
    || /\(\)=[^>=]/.test(input)

    // Class methods:
    // Node is allowing `class x {y}` which leads to a bunch of false positives in the fuzzer. Same for `{set;` and `{x=`
    // || /class(\s+[\d\w$_]+)?\s*\{[\d\w$_]+[\n:;}]/.test(input)

    // || /class\s*[\w\d$_]*(?:\s*extends\s*[\w\d$_]*)?\s*\{\s*\[?[\w\d$_]*\]?\s*([;}=]|$)/.test(input)
    // Ignore some `class x {async;` cases, or with newline
    // || /class\s*[\w\d$_]*(?:\s*extends\s*[\w\d$_]*)?\s*\{async(\n|;)/.test(input)

    // // This may be legacy but node/v8 will accept `y()=x` even though that's a parse error now (wasn't in es5...)
    // || /\(\)(?:=[^>]|\s*of|\s*in)/.test(input)
    // // Same for ++y() and other updates
    // || /[-+]{2}\w+\(\)/.test(input)
    // || /\w+\(\)[-+]{2}/.test(input)
  );
}

function fuzzAgainstNode(input, tfailed, counts, injectionMode, parseTenko, cliCommandPrefix) {
  let parsedInput = input;

  let nodefailed = false;
  let errorMessage = tfailed;
  try {
    Function(input);
    if (!injectionMode) ++counts.nodePassedFuzz;
  } catch (e) {
    if (!tfailed) errorMessage = e.message;
    nodefailed = e.message;
  }

  if (!nodefailed !== !tfailed) {
    if (nodefailed && (undefined
      || nodefailed.includes('has already been declared') // `switch(y){case y:function*d(){}function*d(){}}`
      || nodefailed.includes('Unexpected eval or arguments in strict mode') // (eval = a => { "use strict"})
      || nodefailed.includes('Unexpected strict mode reserved word') // (interface = a => { "use strict"})
    )) {
      if (VERBOSE) buffer.push('Skipping case that is likely a false positive (error in node that was not an error in Tenko)');
    }
    else if (tfailed && (undefined
      // Regexes
      // v8 is lazy parsing regexes
      || tfailed.includes('Lexer error! Regex:')

      // This case often leads to false positives for classes
      || tfailed.includes('Either the current modifier is unknown')
      || tfailed.includes('Async methods are a restricted production')
      || tfailed.includes('Expected to parse the modified key of a class method')

      // let \n keyword cases
      || tfailed.includes('`let` must be a declaration in strict mode ')

      // // Delete
      // // v8 doesn't seem to statically detect the delete-on-ident case
      // || tfailed.includes('Bad delete case')
      //
      // // Break Continue
      // // No lexical validation for occurrence of `break` or `continue`
      // || tfailed.includes('only `continue` inside a loop')
      // || tfailed.includes('inside a `switch` or loop')
      // Labels are not verified (?)
      || tfailed.includes('not defined in the current label set')
      //
      // Assignments to crap
      // Getting too many false positives for something like `y()=x` so going to disable the whole range :(
      || tfailed.includes('Cannot assign to lhs (starting with `async`)')
      // || tfailed.includes('because it is not a valid assignment target')
    )) {
      // ignore (based on original input)
      if (VERBOSE) buffer.push('Skipping case that is likely a false positive (error in Tenko that was not an error in node)');
    }
    else {
      // Node error wasn't black listed. Now test Tenko
      let beforeLen = input.length;
      // Checker must confirm that the crash state of both parsers remains the same,
      // and that the error message of the one parser stays the same as well
      let checker = modifiedInput => {
        // Prevent certain known errors from hiding real problems
        if (ignoreKnownCases(input)) return false;

        // Parse with Tenko, see what happens
        let {t, e} = parseTenko(modifiedInput, counts, false);
        if (!e !== !tfailed) return false;

        // Parse with node, see what happens
        let n
        try {
          n = {e: undefined, n: Function(modifiedInput)};
        } catch (e) {
          n = {e, n: undefined};
        }
        if (!n.e !== !nodefailed) return false;
        if (errorMessage !== (e || n.e)) return false;
        return e || n.e;
      };

      if (VERBOSE) buffer.push(['Trimming input (len was ' + input.length +')']);
      input = reduceErrorInput(input, checker, cliCommandPrefix, undefined, undefined, true);
      ++counts.reduced;
      if (VERBOSE) buffer.push(['Finished trimming (len now ' + input.length +', down from ' + beforeLen + ')']);

      if (ignoreKnownCases(input)) {
        // ignore (based on trimmed input)
        console.log('Ignoring post scrubbed result');
        if (VERBOSE) buffer.push('Ignoring outcome after trimming because it probably is a false positive');
      } else {
        // We will exit in this branch

        console.log('');
        console.log('Repro prefix:', cliCommandPrefix);
        if (nodefailed) {
          console.log('Thrown by v8');
        } else {
          console.log('Not thrown by v8');
        }

        if (tfailed) {
          console.log('Thrown by Tenko');
        } else {
          console.log('Not thrown by Tenko');
        }

        if (tfailed) {
          dumpFuzzOutput(input, parsedInput, errorMessage, 'Tenko failed but node did not');
          warnOsd('Tenko fuzzing found problem');
        } else if (nodefailed) {
          dumpFuzzOutput(input, parsedInput, errorMessage, 'node failed but Tenko did not');
          warnOsd('Tenko fuzzing found problem');
        }

        process.exit();
      }
    }
  }
}

export {
  fuzzAgainstNode,
};
