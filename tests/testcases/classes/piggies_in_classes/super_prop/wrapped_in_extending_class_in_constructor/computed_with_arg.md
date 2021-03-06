# Tenko parser test case

- Path: tests/testcases/classes/piggies_in_classes/super_prop/wrapped_in_extending_class_in_constructor/computed_with_arg.md

> :: classes : piggies in classes : super prop : wrapped in extending class in constructor
>
> ::> computed with arg

## Input

`````js
class outer extends S { constructor(){  class x { [super.foo y](){} }  }}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Missing right square bracket for computed member, found `y` instead

start@1:0, error@1:61
╔══╦═════════════════
 1 ║ class outer extends S { constructor(){  class x { [super.foo y](){} }  }}
   ║                                                              ^------- error
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
