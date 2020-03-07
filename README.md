# Tenko

A "pixel perfect" 100% spec compliant JavaScript parser written in JavaScript, parsing ES6-ES11.

REPL: https://pvdz.github.io/tenko/repl

- Supports:
  - Anything stage 4 up to ES11 / ES2020
  - Regex syntax (deep)
  - Parsing modes:
    - Sloppy / non-strict
    - Web compat / AnnexB
    - Strict
    - Module
- AST
  - Is optional, enabled by default
  - Estree (default)
  - (Optional chaining AST works but AST spec seems still in flux)
  - Acorn
  - Babel (anything stage 4, except comments)
  - Supports location data (matching Acorn/Babel for reference)
- Tests
  - 33k input syntax tests
  - Passes test262 suite (at least as per March 2020), without exception

# Name

The name is short for "The Parser Formerly Known As ZeParser3".

It's also an anagram for "Token", perfectly fitting this project.

In Japanese it's a [divine beast](https://en.wikipedia.org/wiki/Tenko_(fox)) ("heavenly fox" or "celestial fox"), playing into my nicknames.

# REPL

You can find the REPL in [`repl/index.html`](./repl/index.html), github link: https://pvdz.github.io/tenko/repl

_The REPL runs on dev master branch and needs a very new browser due to es module syntax._

## Usage

```js
import {Tenko, GOAL_MODULE, COLLECT_TOKENS_ALL} from 'src/index.mjs';
const {
  ast,                 // estree compatible AST
  tokens,              // array of numbers (see Lexer)
  tokenCountSolid,     // number of non-whitespace tokens
  tokenCountAny,       // number of tokens of any kind
} = Tenko(
  inputCode,           // string
  {
    // Parse with script or module goal (module allows import/export)
    goalMode = GOAL_MODULE, // GOAL_MODULE | GOAL_SCRIPT | "module" | "script"
    // Do you want to collect generated tokens at all?
    collectTokens = COLLECT_TOKENS_ALL, // COLLECT_TOKENS_ALL | COLLECT_TOKENS_SOLID | COLLECT_TOKENS_NONE | COLLECT_TOKENS_TYPES | "all" | "solid" | "none" | "types"
    // Apply Annex B rules? (Only works in sloppy mode)
    webCompat = true,
    // Start parsing as if in strict mode? (Works with script goal)
    strictMode = false,
    // Output a Babel compatible AST? Note: comment nodes are not properly mirrored
    babelCompat = false,
    // Add a loc (with `{start: {line, column}, stop: {line, column}}`) to each token?
    babelTokenCompat = false,
    // Pass on a reference that will be used as the AST root
    astRoot = null,
    // Should it normalize \r and \r\n to \n in the .raw of template nodes?
    // Estree spec but makes it hard to serialize template nodes losslessly
    templateNewlineNormalization = true,
    // Pass on a reference to store the tokens
    tokenStorage = [],
    // Callback to receive the lexer instance once its created
    getLexer = null, // getLexer(lexer)
    // You use this to parse `eval` code
    allowGlobalReturn = false,
    // Target a very specific ecmascript version (like, reject async)
    targetEsVersion = lastVersion, // (currently es11)
    // Leave built up scope information in the ASTs (good luck)
    exposeScopes = false,
    // Assign each node a unique incremental id
    astUids = false,
    // Do you want to print a code frame with error messages? (Part of the input around the point of error)
    errorCodeFrame = true,
    // For the code frame, do you want to always show the entire input, regardless of size? Or just a small context
    truncCodeFrame = true,
    // You can override the logging functions to catch or squash all output
    $log = console.log,
    $warn = console.warn,
    $error = console.error,
    // Value ot use for the `source` field of each `loc` object
    sourceField = '',
  }
);
```

## Development

There is a single entry point in the root project called `t` which calls `tests/t.sh` which calls out to various development related scripts.

### ES modules

Note that the files use `import` and `export` declarations and `import()`, which requires node 10+ or a cutting edge browser.

At the time of writing node requires the experimental `--experimental-modules` flag.

It's a burden in some ways and nice in others. A prod build would not have any modules.

### Test cases

All test cases are in "special" plain-text .md files. See [`tests/testcases/README.md`](./tests/testcases/README.md) for details on formatting those.

### Entry point

Some interesting usages of `./t`:

```
# Show help
./t --help

# Run and update (inline) all tests. 
# Use git diff to see changes. Will bail fast on unexpected or assertion errors.
# This tests four modes (sloppy, strict, module, and sloppy-web-compat)
# This also tests the printer on the first successful parse
./t u
# Run all tests step-by-step (same as above) and ask what to do for any changes
./t m

# Same as `./t u` but compare it against Babel or Acorn. Recorded changes should be discarded afterwards.
# Use this to test against AST differences. If there are any they will be printed explicitly.
# Acorn:
./t a
# Babel:
./t b

# Test a particular input from cli
./t i "some.input()"
# Test a particular test file
./t f "tests/testcases/regexes/foo.md"
# Use entire contents of given file as input
./t F "test262/test/annexB/built-ins/foo.js"

# Generate prod builds
# Generate a build. Strips ASSERT*, inline many constants
./t z
# Same as above but explicitly set `acornCompat` and `babelCompat` to `false`.
./t z --no-compat
# Generate pretty builds for debugging without asserts:
./t --pretty
# Minified build with Terser (will lower performance due to inlining)
./t --min

# Run test262 tests (requires cloning https://github.com/tc39/test262 into tenko/ignore/test262)
./t t

# Fuzz the parser
./t fuzz

# Regenerate all autogen test files. Regenerates files still need to be updated (`./t u`).
# All files, regardless:
./t g
# Only create new files:
./t G

# Find out which tests execute a particular code branch in the parser
# Add `HIT()` to any part of the code in src
# Reports (only) all inputs that trigger a `HIT()` call in Tenko
./t s
```

Some tooling that requires additional setup;

```
# Benchmarks (requires benchmark files in projroot/ignore/perf);
# Simply spawn new node process and run test:
./t p
# Run benchmarks repeatedly and report results
./t p6
# Configure machine to be as stable as possible (DANGEROUS, read the script before using it, requires root). All 
# changes should be reset after reboot. Then run the benchmarks in the shielded cpus at RT prio (also requires root).
./t stable
./t p6 --stabled
# Same as above but without running `./t stable` previously, and tries to undo certain (but not all) things afterwards
./t p6 --stable

# Investigate v8 perf regressions with deoptigate:
./t deoptigate

# Profile the parser in Chrome devtools (open the tab through `about://inspect`)
./t devtools

# Run a visual heatmap profiler for counts based investigation (private)
./t hf
```

There are many flags. Some are specific to an action, others are generic. Some examples:

```
--sloppy             Run in non-strict mode (but non-web compat!)
--strict             Run with script goal but consider the code strict
--module             Run with module goal (enabling strict mode by default)
--web                Run with script goal, non-strict, and enable web compat (AnnexB rules)
--annexb             Force enable AnnexB rules, regardless of mode

6                    Run as close to the rules as of ES6  / ES2015 as possible
7                    Run as close to the rules as of ES7  / ES2016 as possible
8                    Run as close to the rules as of ES8  / ES2017 as possible
9                    Run as close to the rules as of ES9  / ES2018 as possible
10                   Run as close to the rules as of ES10 / ES2019 as possible
11                   Run as close to the rules as of ES11 / ES2020 as possible

--min                Given a broken input, brute force minify the input while maintaining the same error message
--acorn              Output a Acorn compatible AST
--babel              Output a Babel compatible AST
--test-acorn         Compare the `--acorn` output to the actual output of Acorn on same input (./t a)
--test-babel         Compare the `--babel` output to the actual output of Babel on same input (./t b)
--test-node          Compile input in a `Function()` and report whether that throws when Tenko throws, for fuzzer
--build              Use a prod build (from standard output location), instead of dev sources, for all actions that support it
--nb                 Do not build (many actions will kick of a build before doing their thing, this prevents that)
```

And many more. For details, `./t --help` should give you an up to date list of all actions and options.

# Building

While the parser runs perfectly fine in dev mode it will be a bit slow. A build:

- will remove non-assert dev artifacts
- can remove inline asserts (lines that start with `ASSERT`)
- can remove all the AST generation from the build (lines that start with `AST`)
- inlines many constants used by the parser as enums or bitwise fields

To generate a build run this in the project root, flags can be combined:

```
./t z                      # Regular build with everything
./t z --no-ast             # Strip most AST related code from the build (~50% faster, but obviously no AST)
./t z --no-compat          # Strip acorn/babel compatibility
./t z --min                # Run Terser on result (will decrease performance due to inlining)
./t z --pretty             # Run Prettier on build result
```

Note that this (initially) uses my own printer to print the AST.

The build script writes and ESM and CJS file to `./build`

## Validation without AST

The no-AST build can validate JS almost as perfect as the regular build except for certain validation cases where it requires the AST:

- Binary op after arrow with block body (`()=>{}*x` is illegal)
- Regular expression on new line after arrow with block body (`()=>{} \n /foo/g`, prohibited by ASI rules and can't be a division)
- Update operator anything that's writable but not a valid var or member expression (`++[]`)
- Delete with an ident that is wrapped in parenthesis (`delete (foo)` is illegal), trivial cases (`delete foo;`) should be fine

# Testing

Each test is individually encapsulated in an `.md` file in `tests/testcases/**`. This file will contain the input code and the output as expected for sloppy mode, strict mode (script goal), module goal, and web compat mode (only works in sloppy mode, script goal).

If a run passes then the AST and types of tokens are printed in the output. This AST is also printed with `src/tools/printer` and its output is checked to produce the same AST.
 
If a run does not pass the error message and a pointer to where the error occurred are stored in the file.

The files can be auto-updated with `./t u` or `./t m`. This makes it easy to update something in the parser and use git to confirm whether anything changed, and if so what.

There are also `autogen.md` files, which generate a bunch of combinatorial tests (`./t g` or `./t G`), similar to the other tests.

To create a new test simply add a new file, start it with `@`, a description, a line with only `###` and the rest will be considered the test case verbatim. When you run the test runner this file will automatically be converted to a proper test case.
