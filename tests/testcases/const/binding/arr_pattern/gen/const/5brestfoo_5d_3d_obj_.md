# Tenko parser autogenerated test case

- From: tests/testcases/const/binding/arr_pattern/autogen.md
- Path: tests/testcases/const/binding/arr_pattern/gen/const/5brestfoo_5d_3d_obj_.md

> :: const : binding : arr pattern : gen : const
>
> ::> 5brestfoo 5d 3d obj

## Input


`````js
const [...foo,,] = obj;
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The binding pattern is not destructible

start@1:0, error@1:17
╔══╦═════════════════
 1 ║ const [...foo,,] = obj;
   ║                  ^------- error
╚══╩═════════════════

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
