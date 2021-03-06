# Tenko parser test case

- Path: tests/testcases/classes/piggies_in_classes/await/wrapped_in_plain_func/in_extends_with_args.md

> :: classes : piggies in classes : await : wrapped in plain func
>
> ::> in extends with args

## Input

`````js
function f() {   class x extends await y { }   }
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Expected the opening curly `{` of a class body, found `y` instead

start@1:0, error@1:39
╔══╦═════════════════
 1 ║ function f() {   class x extends await y { }   }
   ║                                        ^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  An `await` expression is not allowed here

start@1:0, error@1:33
╔══╦═════════════════
 1 ║ function f() {   class x extends await y { }   }
   ║                                  ^^^^^------- error
╚══╩═════════════════

`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._
