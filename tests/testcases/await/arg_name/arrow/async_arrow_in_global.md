# Tenko parser test case

- Path: tests/testcases/await/arg_name/arrow/async_arrow_in_global.md

> :: await : arg name : arrow
>
> ::> async arrow in global
## FAIL

## Input

`````js
async (await) => x
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The parameter header of an async arrow cannot contain `await` as varname nor as a keyword

start@1:0, error@1:0
╔══╦════════════════
 1 ║ async (await) => x
   ║ ^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use `await` as var when goal=module but found `await` outside an async function

start@1:0, error@1:12
╔══╦═════════════════
 1 ║ async (await) => x
   ║             ^------- error
╚══╩═════════════════

`````


### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._