import {printer} from "../src/tools/printer.mjs";
import {astToString, encodeUnicode} from "./utils.mjs";
import {Tenko, COLLECT_TOKENS_SOLID, COLLECT_TOKENS_NONE , GOAL_MODULE, GOAL_SCRIPT, WEB_COMPAT_ON, WEB_COMPAT_OFF} from "../src/index.mjs";
import {execSync} from 'child_process';
import {reduceErrorInput} from "./test_case_reducer.mjs";
import {ASSERT} from "../src/utils.mjs";
import fs from 'fs';

const BOLD = '\x1b[;1;1m';
const OVER = '\x1b[32;53m';
const DIM = '\x1b[30;1m';
const BLINK = '\x1b[;5;1m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const TEST_SLOPPY = 'sloppy';
const TEST_STRICT = 'strict';
const TEST_MODULE = 'module';

function sameFunc(testVariant, enableAnnexb, forTestFile, code) {
  ASSERT(sameFunc.length === arguments.length, 'arg count');

  // Get updated AST for new input (it might crash. In fact, is very likely to be illegal)
  let inputAst;
  try {
    inputAst = parseWithTenkoWithTemplateFix(code, testVariant, enableAnnexb, TEST_MODULE, COLLECT_TOKENS_SOLID);
  } catch (e) {
    return '(Tenko rejected input: ' + e + ')'
  }

  // Now confirm this with the printed output of this ast.
  let [printerStatus, msg] = _testPrinter(code, testVariant, enableAnnexb, inputAst.ast, forTestFile, false);
  if (printerStatus === 'fail-crash') {
    console.log('printer hard crashed, that should not happen, exit now');
    console.log(msg);
    process.exit(1);
  }

  return printerStatus;
}

function testPrinter(code, testVariant, enableAnnexb, ast, forTestFile, reducePrinterError, ignoreProblems, logTime) {
  ASSERT(testPrinter.length === arguments.length, 'arg count');

  let [printerStatus, msg] = _testPrinter(code, testVariant, enableAnnexb, ast, forTestFile, logTime);

  if (!ignoreProblems && printerStatus !== 'same' && printerStatus !== 'diff-same') {
    let reducedInput;
    let outFileBase = 'tests/testcases/todo/_fuzz-printer-fail';
    let outFile = outFileBase + '.md';
    let n = 0;
    while (fs.existsSync(outFile)) {
      outFile = outFileBase + '.' + (++n) + '.md';
    }
    if (reducePrinterError) {
      console.log('Printer caused a problem (status = ' + printerStatus + ')');
      console.log(msg);
      console.log('Original input:');
      console.log('`````');
      console.log(code);
      console.log('`````');
      reducedInput = reduceErrorInput(code, (code) => sameFunc(testVariant, enableAnnexb, forTestFile, code), `./t --${testVariant} ${enableAnnexb ? '--annexb' : ''}`);
      console.log('Reduced!');
      console.log('-->', [reducedInput]);

      if (code !== reducedInput) {
        msg += '\n\nAfter reducing the test case, it is the following:\n\n`````\n'+reducedInput+'\n`````\n\n';
        fs.writeFileSync(outFile, '@This input broke printer [' + printerStatus + ']\n\nOriginal input:\n\n```\n'+code+'\n```\n\n###\n'+reducedInput+'\n');
      } else {
        fs.writeFileSync(outFile, '@This input broke printer [' + printerStatus + ']\n\n###\n'+code+'\n');
      }
    } else {
      fs.writeFileSync(outFile, '@By fuzzer; input broke printer [' + printerStatus + ']\n\n###\n'+code+'\n');
    }

    console.log(msg);
    console.log('Written to', BOLD + outFile + RESET);

    console.log('Now force exiting (inside run_printer)')
    process.exit()
  }

  ASSERT(['fail-crash', 'same', 'diff-fail', 'diff-same', 'diff-ast'].includes(printerStatus), 'printer should return enum in codes');
  ASSERT(ignoreProblems || printerStatus !== 'fail-crash', 'printer should never throw', msg);
  ASSERT(ignoreProblems || printerStatus !== 'diff-ast', 'printer should not change the ast', msg);
  ASSERT(ignoreProblems || printerStatus !== 'diff-fail', 'printer output should not fail Tenko if it passed before', msg);

  ASSERT(ignoreProblems || printerStatus === 'same' || printerStatus === 'diff-same', '(redundant, but) ast should at least be same', msg);

  return [code, msg, printerStatus];
}

function _testPrinter(code, testVariant, enableAnnexb, ast, forTestFile, logTime) {
  ASSERT(_testPrinter.length === arguments.length, 'arg count');

  // Test the ast printer
  // We only really need to test it once for whatever run passes
  let printedCode;
  let printedFail;
  if (logTime) {
    console.time('Pure print time');
  }
  try {
    printedCode = printer(ast);
  } catch (e) {
    printedFail = e.stack;
  }
  if (logTime) {
    console.timeEnd('Pure print time');
  }
  if (printedFail) {
    return ['fail-crash', `\n## AST Printer\n\nPrinter failed [${testVariant}][annexb:${enableAnnexb?'yes':'no'}][fail-crash]:\n\n${printedFail}\n\n Input:\n\n${code}`];
  } else if (printedCode === code) {
    return ['same', `\n## AST Printer\n\nPrinter output was same as input [${testVariant}][annexb:${enableAnnexb?'yes':'no'}]\n`];
  } else {
    // Parse the input again, check whether the AST equal to before (it ought to be)

    let printedAst;
    try {
      printedAst = parseWithTenkoWithTemplateFix(printedCode, testVariant, enableAnnexb, TEST_MODULE, COLLECT_TOKENS_SOLID)
    } catch (e) {}

    if (!printedAst) {
      return ['diff-fail', `
## AST Printer

Printer output different from input [${testVariant}][annexb:${enableAnnexb?'yes':'no'}][diff-fail]:

Original input:
\`\`\`\`js
${code}
\`\`\`\`
Printed code with different AST:
\`\`\`\`js
${printedCode}
\`\`\`\`

Tenko failed to parse printed code (with same parameters as original)
`];
    } else {
      let templateFriendlyInputAst = parseWithTenkoWithTemplateFix(code, testVariant, enableAnnexb, TEST_MODULE, COLLECT_TOKENS_SOLID);

      let Acrfckld = astToString(templateFriendlyInputAst.ast).replace(/^\s*loc:.*$\n/gm, '');
      let Bcrfckld = astToString(printedAst.ast).replace(/^\s*loc:.*$\n/gm, '');

      // There's a \n \r mismatch that I couldn't squash and I'm just removing it here because it's too noisy.
      const A = Acrfckld.replace(/\\r(\\n)?/g, '\\n');
      const B = Bcrfckld.replace(/\\r(\\n)?/g, '\\n');

      if (A === B) {
        return ['diff-same', `
## AST Printer

Printer output different from input [${testVariant}][annexb:${enableAnnexb?'yes':'no'}]:

\`\`\`\`js
${printedCode}
\`\`\`\`

Produces same AST
`];
      } else {
        let d = execSync(
          // Use sub-shell `<(...)` to prevent temporary file management.
          // Use base64 to prevent shell interpretation of input.
          // Final `true` is to suppress `diff`'s non-zero exit code when input differs.
          // `colordiff -a -y -w -W200 <(
          `diff -U 0 --text -d --suppress-blank-empty --ignore-blank-lines --ignore-all-space <(
              echo '${Buffer.from(encodeUnicode(A)).toString('base64')}' | base64 -d -
            ) <(
              echo '${Buffer.from(encodeUnicode(B)).toString('base64')}' | base64 -d -
            ) || true`
          , {
            shell: '/bin/bash',
            encoding: 'utf8',
          }
        )
        // .replace(/^(?:\+\+\+ \/|--- \/|@@ ).*$/gm, '')
        .replace(/\n+/g, '\n');

        return ['diff-ast', `
## AST Printer

Printer output different from input [${testVariant}][annexb:${enableAnnexb?'yes':'no'}][diff-diff]:

Original input:
\`\`\`\`js
${code}
\`\`\`\`
Printed code with different AST:
\`\`\`\`js
${printedCode}
\`\`\`\`

${forTestFile ? '' : RED}Produces different AST:${RESET}

${d}
`];
      }
    }
  }
  throw new Error('unreachable');
}

function parseWithTenkoWithTemplateFix(code, testVariant, enableAnnexb, TEST_MODULE, COLLECT_TOKENS_SOLID) {
  ASSERT(parseWithTenkoWithTemplateFix.length === arguments.length, 'arg count');

  return Tenko(
    code,
    {
      goalMode: testVariant === TEST_MODULE ? GOAL_MODULE : GOAL_SCRIPT,
      collectTokens: COLLECT_TOKENS_SOLID,
      strictMode: testVariant === TEST_STRICT,
      webCompat: enableAnnexb,

      errorCodeFrame: false,

      templateNewlineNormalization: false, // (!!)

      $log: () => {},
      $warn: () => {},
      $error: () => {},
    },
  );
}

export {
  testPrinter,
};
