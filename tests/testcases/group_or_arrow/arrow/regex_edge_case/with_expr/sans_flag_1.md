# Tenko parser test case

- Path: tests/testcases/group_or_arrow/arrow/regex_edge_case/with_expr/sans_flag_1.md

> :: group or arrow : arrow : regex edge case : with expr
>
> ::> sans flag 1
>
> the expression becomes a division which fails to parse properly in this case

## Input

`````js
_ => _
/foo/
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Expected to parse a value (at EOF)

start@1:0, error@2:5
╔══╦════════════════
 1 ║ _ => _
 2 ║ /foo/
   ║      ^------- error at EOF
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
