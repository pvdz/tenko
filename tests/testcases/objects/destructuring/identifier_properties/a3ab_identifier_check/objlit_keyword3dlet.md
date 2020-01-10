# Tenko parser test case

- Path: tests/testcases/objects/destructuring/identifier_properties/a3ab_identifier_check/objlit_keyword3dlet.md

> :: objects : destructuring : identifier properties : a3ab identifier check
>
> ::> objlit keyword3dlet

## Input

`````js
({x:let})
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
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
      expression: {
        type: 'ObjectExpression',
        loc:{start:{line:1,column:1},end:{line:1,column:8},source:''},
        properties: [
          {
            type: 'Property',
            loc:{start:{line:1,column:2},end:{line:1,column:7},source:''},
            key: {
              type: 'Identifier',
              loc:{start:{line:1,column:2},end:{line:1,column:3},source:''},
              name: 'x'
            },
            kind: 'init',
            method: false,
            computed: false,
            value: {
              type: 'Identifier',
              loc:{start:{line:1,column:4},end:{line:1,column:7},source:''},
              name: 'let'
            },
            shorthand: false
          }
        ]
      }
    }
  ]
}

tokens (9x):
       PUNC_PAREN_OPEN PUNC_CURLY_OPEN IDENT PUNC_COLON ID_let
       PUNC_CURLY_CLOSE PUNC_PAREN_CLOSE ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Can not use `let` as variable name in strict mode

start@1:0, error@1:4
╔══╦════════════════
 1 ║ ({x:let})
   ║     ^^^------- error
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
({x:let});
````

Produces same AST