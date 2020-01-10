# Tenko parser test case

- Path: tests/testcases/const/binding/decl/destructuring/array/one_var_with_initializer.md

> :: const : binding : decl : destructuring : array
>
> ::> one var with initializer

## Input

`````js
const [foo=a] = arr;
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
  loc:{start:{line:1,column:0},end:{line:1,column:20},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:20},source:''},
      kind: 'const',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:6},end:{line:1,column:19},source:''},
          id: {
            type: 'ArrayPattern',
            loc:{start:{line:1,column:6},end:{line:1,column:13},source:''},
            elements: [
              {
                type: 'AssignmentPattern',
                loc:{start:{line:1,column:7},end:{line:1,column:12},source:''},
                left: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:7},end:{line:1,column:10},source:''},
                  name: 'foo'
                },
                right: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:11},end:{line:1,column:12},source:''},
                  name: 'a'
                }
              }
            ]
          },
          init: {
            type: 'Identifier',
            loc:{start:{line:1,column:16},end:{line:1,column:19},source:''},
            name: 'arr'
          }
        }
      ]
    }
  ]
}

tokens (10x):
       ID_const PUNC_BRACKET_OPEN IDENT PUNC_EQ IDENT
       PUNC_BRACKET_CLOSE PUNC_EQ IDENT PUNC_SEMI
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

Printer output different from input [sloppy]:

````js
const [foo = a] = arr;
````

Produces same AST