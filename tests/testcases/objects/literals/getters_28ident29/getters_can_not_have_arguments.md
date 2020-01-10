# Tenko parser test case

- Path: tests/testcases/objects/literals/getters_28ident29/getters_can_not_have_arguments.md

> :: objects : literals : getters 28ident29
>
> ::> getters can not have arguments

## Input


`````js
wrap({get foo(a){}});
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Getters can not have any parameters

start@1:0, error@1:14
╔══╦═════════════════
 1 ║ wrap({get foo(a){}});
   ║               ^------- error
╚══╩═════════════════

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