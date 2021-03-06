# Tenko parser test case

- Path: tests/testcases/let_declaration/binding_id/statement/rest_first.md

> :: let declaration : binding id : statement
>
> ::> rest first
>
> First binding is a rest (not allowed)
>
> 

## FAIL

## Input

`````js
let ...a = 1;
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Unable to ASI

start@1:0, error@1:4
╔══╦════════════════
 1 ║ let ...a = 1;
   ║     ^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Let declaration missing binding names and `let` cannot be a regular var or label name in strict mode

start@1:0, error@1:0
╔══╦════════════════
 1 ║ let ...a = 1;
   ║ ^^^------- error
╚══╩════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._
