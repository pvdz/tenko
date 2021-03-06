# Tenko parser test case

- Path: tests/testcases/export_declaration/export_star_from/star_as_from_es10.md

> :: export declaration : export star from
>
> ::> star as from es10
>
> As per https://github.com/tc39/ecma262/pull/1174
>
> Introduced in ES2020 / ES11 so throw an error if targeting lower

## FAIL

## Input

- `es = 10`

`````js
export * as woo from 'bar';
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The `export` keyword can only be used with the module goal

start@1:0, error@1:0
╔══╦════════════════
 1 ║ export * as woo from 'bar';
   ║ ^^^^^^------- error
╚══╩════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  The `export * as x from src`, syntax was introduced in ES2020 but currently targeted version is lower

start@1:0, error@1:0
╔══╦════════════════
 1 ║ export * as woo from 'bar';
   ║ ^^^^^^^^^^^------- error
╚══╩════════════════

`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._
