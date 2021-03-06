# Tenko parser autogenerated test case

- From: tests/testcases/await/arrow_piggy/autogen.md
- Path: tests/testcases/await/arrow_piggy/gen/test/async_28a_3d_await_b29_3d3e_x.md

> :: await : arrow piggy : gen : test
>
> ::> async 28a 3d await b29 3d3e x

## Input


`````js
async (a = await b) => x
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Missing closing paren `)` for group, found `b` instead

start@1:0, error@1:17
╔══╦═════════════════
 1 ║ async (a = await b) => x
   ║                  ^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use `await` as var when goal=module but found `await` outside an async function

start@1:0, error@1:17
╔══╦═════════════════
 1 ║ async (a = await b) => x
   ║                  ^------- error
╚══╩═════════════════

`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._
