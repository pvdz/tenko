# Tenko parser test case

- Path: tests/testcases/numbers/numerical_separator/oct_after_leading_zero.md

> :: numbers : numerical separator
>
> ::> oct after leading zero
>
> Numerical separator cases in octal numbers

## FAIL

## Input

`````js
0_o0010001
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    Found `_`. It is not legal for an ident or number token to start after a number token without some form of separation

start@1:0, error@1:1
╔══╦════════════════
 1 ║ 0_o0010001
   ║  ^------- error
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