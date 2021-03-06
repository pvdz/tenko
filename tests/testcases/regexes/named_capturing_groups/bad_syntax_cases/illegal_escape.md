# Tenko parser test case

- Path: tests/testcases/regexes/named_capturing_groups/bad_syntax_cases/illegal_escape.md

> :: regexes : named capturing groups : bad syntax cases
>
> ::> illegal escape
>
> 

## Input

`````js
/(?<\ux>foo)/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Attempted to parse a unicode quad escape but at least one digit was not a hex; The name of a capturing group contained a double unicode quad escape which is valid as a surrogate pair which requires u-flag and which cannot be made valid without u-flag; Regex contained a group name with invalid unicode escape

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /(?<\ux>foo)/
   ║ ^^^^^^^^^^^^^------- error
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

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode._
