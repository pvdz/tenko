# Tenko parser test case

- Path: tests/testcases/dowhile_statement/do_label_while_no_semi_with_newline.md

> :: dowhile statement
>
> ::> do label while no semi with newline
>
> By fuzzer reduced
>
> There's no ASI after the do-while sub statement unless there's a newline.
>
> The sub-statement of `do` does not get an `ASI` unless there's a newline preceeding the `while`. However, in this case the sub-statement ends in a function declaration which does not require a semi AND there is a newline so it's fine either way.
>
> This should be legal in web compat mode (only). In other modes the func decl cannot be a child of a label.


## Input

`````js
do x: function s(){}
while(y)
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  A "labelled function declaration" is not allowed in this situation

start@1:0, error@1:6
╔══╦════════════════
 1 ║ do x: function s(){}
   ║       ^^^^^^^^------- error
 2 ║ while(y)
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
