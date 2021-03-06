# Tenko parser test case

- Path: tests/testcases/for_statement/for-in/let_as_a_var/a_call_on_let_is_not_allowed_in_for-in.md

> :: for statement : for-in : let as a var
>
> ::> a call on let is not allowed in for-in
>
> for-in allows certain lhs that starts with `let`. In strict mode all bets are off.

## Input

`````js
for (let() in x);
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Left part of for-in must be assignable

start@1:0, error@1:0
╔══╦════════════════
 1 ║ for (let() in x);
   ║ ^^^^^^^^^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Let binding missing binding names in strict mode

start@1:0, error@1:5
╔══╦════════════════
 1 ║ for (let() in x);
   ║      ^^^------- error
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
