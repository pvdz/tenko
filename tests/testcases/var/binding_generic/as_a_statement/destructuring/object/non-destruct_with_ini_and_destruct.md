# Tenko parser test case

- Path: tests/testcases/var/binding_generic/as_a_statement/destructuring/object/non-destruct_with_ini_and_destruct.md

> :: var : binding generic : as a statement : destructuring : object
>
> ::> non-destruct with ini and destruct

## Input

`````js
var x = a, {y} = obj;
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
  loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:9},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:5},source:''},
            name: 'x'
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:8},end:{line:1,column:9},source:''},
            name: 'a'
          }
        },
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:11},end:{line:1,column:20},source:''},
          id: {
            type: 'ObjectPattern',
            loc:{start:{line:1,column:11},end:{line:1,column:14},source:''},
            properties: [
              {
                type: 'Property',
                loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                  name: 'y'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                  name: 'y'
                },
                shorthand: true
              }
            ]
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:17},end:{line:1,column:20},source:''},
            name: 'obj'
          }
        }
      ]
    }
  ]
}

tokens (12x):
       ID_var IDENT PUNC_EQ IDENT PUNC_COMMA PUNC_CURLY_OPEN IDENT
       PUNC_CURLY_CLOSE PUNC_EQ IDENT PUNC_SEMI
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

## AST Printer

Printer output was same as input [sloppy]