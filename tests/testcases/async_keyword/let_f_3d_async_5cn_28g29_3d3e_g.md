# Tenko parser test case

- Path: tests/testcases/async_keyword/let_f_3d_async_5cn_28g29_3d3e_g.md

> :: async keyword
>
> ::> let f 3d async 5cn 28g29 3d3e g

## Input

`````js
let f = async 
 (g) => g
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  A newline after async is always a syntax error if the rhs turns to be an arrow function

start@1:0, error@2:5
╔══╦════════════════
 1 ║ let f = async
 2 ║  (g) => g
   ║      ^^------- error
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