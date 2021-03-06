# Tenko parser test case

- Path: tests/testcases/directive_prologues/octals/in_string_before_directive/octal_8_after_asi.md

> :: directive prologues : octals : in string before directive
>
> ::> octal 8 after asi
>
> Check whether the parser properly remembers seeing an octal, even when not yet in strict mode. It should reject the escape once a strict mode directive is validated.
>
> Note that the strict mode directive enables the rule that digit escapes are illegal, regardless of mode / annexb, so this should reject

## FAIL

## Input

`````js
function f(){
  "x\8"
  "use strict"
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Lexer error!
    The grammar does not allow to escape the 8 or the 9 character

start@1:0, error@2:2
╔══╦════════════════
 1 ║ function f(){
 2 ║   "x\8"
   ║   ^^^^^------- error
 3 ║   "use strict"
 4 ║ }
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
