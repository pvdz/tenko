# Tenko parser test case

- Path: tests/testcases/regexes/named_capturing_groups/backslash/start_no_uflag/illegal_escape_octal.md

> :: regexes : named capturing groups : backslash : start no uflag
>
> ::> illegal escape octal
>
> Illegal escape as first char of ident of named capturing group

## Input

`````js
/(?<\0141>.)/;
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Regex: Found invalid escape character at the start of a group name identifier

start@1:0, error@1:0
╔══╦════════════════
 1 ║ /(?<\0141>.)/;
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
