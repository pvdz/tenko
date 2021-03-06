# Tenko parser test case

- Path: tests/testcases/optional_chaining/await_piggy.md

> :: optional chaining
>
> ::> await piggy
>
> Stupid edge case
>
> Fails because the `await` expression cannot appear in the default value of an arrow

## FAIL

## Input

`````js
async function f() {
  (x = a?.(await z)) => y
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The parameter header of an arrow inside an async function cannot contain `await` as varname nor as a keyword

start@1:0, error@2:21
╔══╦═════════════════
 1 ║ async function f() {
 2 ║   (x = a?.(await z)) => y
   ║                      ^^------- error
 3 ║ }
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
