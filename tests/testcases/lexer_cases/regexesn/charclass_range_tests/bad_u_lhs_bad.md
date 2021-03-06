# Tenko parser test case

- Path: tests/testcases/lexer_cases/regexesn/charclass_range_tests/bad_u_lhs_bad.md

> :: lexer cases : regexesn : charclass range tests
>
> ::> bad u lhs bad
>
> Imported lexer test
>
> ranges using various escapes and long unicode escapes
>
> The `\u-` is a bad escape and in sloppy mode adds the codepoint for `u` to the char class. So it's basically `u-t`, which is bad (u>t).

## Input

`````js
/[\u-t]/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Attempted to parse a unicode quad escape but at least one digit was not a hex; Encountered unescaped closing square bracket `]` while not parsing a character class, which is only valid without u-flag

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /[\u-t]/
   ║ ^^^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Attempted to parse a unicode quad escape but at least one digit was not a hex; A broken `\u` escape can never be valid with u-flag; Encountered incorrect range (left>right, 117 > 116, 0x75 > 0x74) when parsing as if without u-flag

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /[\u-t]/
   ║ ^^^^^^^^------- error
╚══╩════════════════

`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode with annexB._
