# Tenko parser autogenerated test case

- From: tests/testcases/yield/function_piggy/autogen.md
- Path: tests/testcases/yield/function_piggy/gen/test/function_2a_g2829_7b_function_f287ba3a_b_3d_yield_c7d29_7b7d_7d.md

> :: yield : function piggy : gen : test
>
> ::> function 2a g2829 7b function f287ba3a b 3d yield c7d29 7b7d 7d
>            function f({a: b = yield c}) {}
>          }

## Input


`````js
function * g() {
  function f({a: b = yield c}) {}
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Expected the closing curly `}` for an object, found `c` instead

start@1:0, error@2:27
╔══╦═════════════════
 1 ║ function * g() {
 2 ║   function f({a: b = yield c}) {}
   ║                            ^------- error
 3 ║ }
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use `yield` outside of generator functions when in strict mode

start@1:0, error@2:21
╔══╦═════════════════
 1 ║ function * g() {
 2 ║   function f({a: b = yield c}) {}
   ║                      ^^^^^------- error
 3 ║ }
╚══╩═════════════════

`````


### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._