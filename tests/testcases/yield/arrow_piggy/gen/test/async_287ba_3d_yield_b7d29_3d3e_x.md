# Tenko parser autogenerated test case

- From: tests/testcases/yield/arrow_piggy/autogen.md
- Path: tests/testcases/yield/arrow_piggy/gen/test/async_287ba_3d_yield_b7d29_3d3e_x.md

> :: yield : arrow piggy : gen : test
>
> ::> async 287ba 3d yield b7d29 3d3e x

## Input


`````js
async ({a = yield b}) => x
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Expected the closing curly `}` for an object, found `b` instead

start@1:0, error@1:18
╔══╦═════════════════
 1 ║ async ({a = yield b}) => x
   ║                   ^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use `yield` outside of generator functions when in strict mode

start@1:0, error@1:12
╔══╦═════════════════
 1 ║ async ({a = yield b}) => x
   ║             ^^^^^------- error
╚══╩═════════════════

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
