# Tenko parser test case

- Path: tests/testcases/error/pointer_too_far_away_from_error.md

> :: error
>
> ::> pointer too far away from error
>
> Code frame that doesn't start at the beginning of input
>
> The error will happen in the `await` and the pointer will be past it, but the error will point to the `async` token and this example has a fabricated super long distance between the pointed error and the pointer to trigger an edge case (this edge case ...) in the code frame generator.
>
> In this case, the pointer is too far away and the code frame is trimmed not to include it

## FAIL

## Input

`````js
async(a = (a0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789abcdefghijklmnopqrstuvwzi = await) => {
DO_NOT_INCLUDE_ME}) => {};
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  The parameter header of an async arrow cannot contain `await` as varname nor as a keyword

start@2:102, error@2:0
╔══╦══════════════════
 2 ║ async(a = (a012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012
   ║ ^^^^^------- error
╚══╩══════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use `await` as var when goal=module but found `await` outside an async function

start@1:915, error@1:?
╔══╦══════════════════
 1 ║ 3456789012345678901234567890123456789012345678901234567890123456789abcdefghijklmnopqrstuvwzi = await) => {
   ║                                                                                                     ^------- error
 2 ║ DO_NOT_INCLUDE_ME}) => {};
╚══╩══════════════════

`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._