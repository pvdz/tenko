# Tenko parser test case

- Path: tests/testcases/classes/star/async_star_star_start.md

> :: classes : star
>
> ::> async star star start
>
> Found by fuzzer
>
> Regression would accept the star, without confirming that it wasn't a different token like `*=` or `**`

## FAIL

## Input

`````js
class A {async **f(){}}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Expected to parse the modified key of a class method but could not parse one

start@1:0, error@1:15
╔══╦═════════════════
 1 ║ class A {async **f(){}}
   ║                ^^------- error
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
