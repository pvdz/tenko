# Tenko parser autogenerated test case

- From: tests/testcases/let_declaration/binding_id/let_nl_ident/autogen.md
- Path: tests/testcases/let_declaration/binding_id/let_nl_ident/gen/base_without_newline/yield.md

> :: let declaration : binding id : let nl ident : gen : base without newline
>
> ::> yield

## Input


`````js
let yield
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
      kind: 'let',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:9},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:9},source:''},
            name: 'yield'
          },
          init: null
        }
      ]
    }
  ]
}

tokens (4x):
       ID_let ID_yield ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`yield`) as a variable name because: Cannot use this reserved word as a variable name in strict mode

start@1:0, error@1:4
╔══╦════════════════
 1 ║ let yield
   ║     ^^^^^------- error
╚══╩════════════════

`````


### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output different from input [sloppy]:

````js
let yield;
````

Produces same AST