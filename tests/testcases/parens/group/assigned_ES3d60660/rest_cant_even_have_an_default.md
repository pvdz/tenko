# Tenko parser test case

- Path: tests/testcases/parens/group/assigned_ES3d60660/rest_cant_even_have_an_default.md

> :: parens : group : assigned ES3d60660
>
> ::> rest cant even have an default

## Input

- `es = 6`

`````js
(...a = x,) = x
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The ... argument must be destructible in an arrow header, found something that was not destructible

start@1:0, error@1:9
╔══╦════════════════
 1 ║ (...a = x,) = x
   ║          ^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._