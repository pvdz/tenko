# Tenko parser autogenerated test case

- From: tests/testcases/await/arrow_piggy/autogen.md
- Path: tests/testcases/await/arrow_piggy/gen/test/async_x_3d3e_async_287bawait7d29.md

> :: await : arrow piggy : gen : test
>
> ::> async x 3d3e async 287bawait7d29

## Input


`````js
async x => async ({await})
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Cannot use this name (`await`) as a variable name because: Await not allowed here

start@1:0, error@1:19
╔══╦═════════════════
 1 ║ async x => async ({await})
   ║                    ^^^^^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use this name (`await`) as a variable name because: Await is illegal as var name with module goal

start@1:0, error@1:19
╔══╦═════════════════
 1 ║ async x => async ({await})
   ║                    ^^^^^------- error
╚══╩═════════════════

`````


### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._