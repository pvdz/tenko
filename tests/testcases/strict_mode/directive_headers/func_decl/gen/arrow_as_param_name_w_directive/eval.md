# Tenko parser autogenerated test case

- From: tests/testcases/strict_mode/directive_headers/func_decl/autogen.md
- Path: tests/testcases/strict_mode/directive_headers/func_decl/gen/arrow_as_param_name_w_directive/eval.md

> :: strict mode : directive headers : func decl : gen : arrow as param name w directive
>
> ::> eval

## Input


`````js
(eval) => {
  "use strict";
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Can only declare use strict if func params are "simple"

start@1:0, error@3:0
╔══╦════════════════
 1 ║ (eval) => {
 2 ║   "use strict";
 3 ║ }
   ║ ^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  The left hand side of the arrow is not destructible so arrow is illegal

start@1:0, error@1:7
╔══╦════════════════
 1 ║ (eval) => {
   ║        ^^------- error
 2 ║   "use strict";
 3 ║ }
╚══╩════════════════

`````


### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._