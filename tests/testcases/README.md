# Parser test cases

This folder contains all the parser test cases that get executed when you run the test runner

```
./t u
./t m
```

(This requires a node version that supports modules, I think 10+? I would suggest to upgrade or use nvm to hot-swap the node versions.)

Each test case has its own file, printed as an `.md` file. 

The idea is that every test file has the complete output, either AST or error, when parsing the input with various (common) modes. We can then use source control (git) to verify and confirm the changes.

Many cases were auto-ported from an old system where they were part of a large array. As such their naming can be a bit awkward at times.

## Adding a new test case

Instead of copy pasta, a new test case can be added with a fairly simple syntax. Create a new file like this:

`````
@ information here
is put under the description at the top
## PASS
###
rest is test case
`````

If a file inside `tests/testcases/**` starts with `@` then the test runner assumes it to be a new test file that it needs to generate.

The file will be split on `###`.
- The first part (sans the leading `@`) is used as extra information, which will appear at the top of the generated test file.
- It may contain `## PASS` or `## FAIL` if all modes should pass/fail the input. Currently no support if only some modes pass/fail.
- The remaining part after the first `###` is entirely the test case.

Both parts will be trimmed from trailing whitespace on every line.

When running test cases, these wip files are processed as if they are regular test cases. If you use the `-u` flag the file is automatically updated with a regular test case and its output.

Once generated it can't really be undone, so use source control or your editor if this is relevant for you.

TODO: include a way to specify parser options (you could always manually update the file afterwards and run `-u` again)

## Parsing a test case

The test files can be programmatically consumed. In fact, the test runner does just that.

All code or explicit content is wrapped in five (5) backticks (`` ` ``). Five should be more than enough to prevent markdown ambiguity with input tests.

### Header

The header of a file is not super structured right now. Just ignore it and scan passed it.

The header may contain some description on the test.

Currently one hint the header may contain is whether to expect to pass or fail on all the test variants, and whether to skip the file entirely;

```
## PASS
## FAIL
## SKIP
```

Files that are marked to be skipped will not run at all. Files that are marked to pass/fail, will throw an assertion error if that's not the case.

### Input

To get the input, first scan for `## Input`, from there scan for ```` `````js ````. The test case should be considered the entire code block, as is, except for the newline after the block header and before the footer.

````````````
`````js
test case here
`````
````````````

So in the above, the test case has no newlines. But if the block contains whitespace, you should consider them significant.

By the time I migrated to this new system, I solved all the whitespace-specific tokenizer problems so these test cases don't contain weird whitespace-specific tokenizer cases. Newlines can be significant (for ASI and html comments) so that's why I'm being explicit about what is and isn't part of a test input.

#### Unicode characters

In certain test cases raw non-printable ascii codepoints and any unicode codepoints above the ascii range are required unescaped. However, it turned out that when writing some of these cases the file ended up corrupt (from the point of view of the test case).

To prevent any risk of future corruption, all tests will automatically encode unicode non-printable ascii characters and any non-ascii characters with a special escape sequence, chosen such that it would otherwise never end up in a test case;

```
@{xHHHHH}@
```

The number of digits can be anything, like the ruby escape (`\u{HHHH}`) and the value is replaced with the actual character before executing the test. Any output will be re-encoded.

While `\n` is not encoded, `\r` is because otherwise there's a risk of newline normalization and for some tests `\r` is a relevant distinction from `\n`. Similarly cases for surrogate characters without their surrogate sibling.

Example:

```
/(?<@{x2F9DF}@>foo)/
```

The above test will ultimately run on the string:

```
/(?<輸>foo)/
```

This is only necessary for safe transport and because markdown does not have an escape sequence to support this. The irony is not lost on me.

### Options

A test case can have options. These will follow the `## Input` header as a dashed list and, if there's more content, this is the only content that is a dashed list.

TNote that the list of supported options is hardcoded in the test runner (it will warn you for unhandled options).

The format of each option is as follows:

`````
- `key = value`
- `es = 7`
- `astUid = true`
`````

The options are specific to the testing framework, although I could see myself adding a more free form way of passing options down to the parser, later. The current style is still a little legacy from the old infra.

### Example

So an input block looks something like this:

````````````
## Input

Random comment you can ignore.

- `es = 6`

`````js
(...a = x,) => {}
`````
````````````

## Output

Currently, initially, the output block contains five other blocks and is optional. These blocks should be considered auto-generated and any content you manually change there is automatically overwritten the next time the test runner runs.

The sub blocks are:

- `### Sloppy mode`
  - This is the output when the input is parsed without starting in strict mode, with the script goal, and without web compat mode.
- `### Strict mode`
  - This is almost the same as sloppy mode, except the parser is explicitly told to consider it starting in strict mode. So this is almost the same as adding a `"use strict"` directive at the top of the test case.
- `### Module goal`
  - This is the output when parsing the input with the "module goal". That means it is in strict mode by default and it allows parsing `import` and `export` syntax.
- `### Sloppy mode + annex B rules`
  - This is the same as regular sloppy mode while additionally enabling the web compat rules. This may affect "Annex B" cases like regular expressions, `for in`, and octal escapes.
- `### Module goal + annex B rules`
  - This is the same as regular module goal while additionally enabling the web compat rules. This may affect certain "Annex B" cases.
- `### AST Printer`
  - The printer in `./src/tools/printer.mjs` will attempt to print the first AST that passes. This serialization is then parsed again to validate that it results in the same AST. The result of this process is printed, including any deltas.

Each block has the same layout: The header, a short description about that block, and a code block with the expected output.

The output will be either the AST and list of token types in case of a successful parse, or the error and the error indicator in case of an error, verbatim.

If the output of one sub block is subsumed by another block, it is omitted. So if strict mode output is the same as sloppy mode, there's no point in printing it twice. Same for when module goal output is same as strict or sloppy mode, or when web compat output is same as sloppy output. DRY!

### Examples

Example of an ast:

````````
## Output

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  body: [
    {
...
    },
  ],
}

tokens (10x):
       IDENT IDENT PUNCTUATOR IDENT PUNCTUATOR PUNCTUATOR IDENT
       PUNCTUATOR ASI
`````
````````

Example of an error:

````````
## Output

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The rest argument was not destructible as it must be last and can not have a trailing comma

(...a = x,) => {}
         ^------- error
`````
````````

## Auto generated cases

Sometimes a test needs to be tested with a variety of inputs. Two common cases are confirming some test works with all keywords and whether some test passes or fails properly with all ECMAScript version settings. 

To this point there are generators, which you can find in `autogen.md`. They basically take a set of cases and set of tests and will mix them, replacing all `#` occurrences in the test with each case and writing out a test file for each combination.

More on this later because I need to work on this a little more :)
