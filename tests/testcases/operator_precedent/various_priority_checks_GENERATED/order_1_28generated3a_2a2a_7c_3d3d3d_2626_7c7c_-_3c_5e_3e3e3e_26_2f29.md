# Tenko parser test case

- Path: tests/testcases/operator_precedent/various_priority_checks_GENERATED/order_1_28generated3a_2a2a_7c_3d3d3d_2626_7c7c_-_3c_5e_3e3e3e_26_2f29.md

> :: operator precedent : various priority checks GENERATED
>
> ::> order 1 28generated3a 2a2a 7c 3d3d3d 2626 7c7c - 3c 5e 3e3e3e 26 2f29

## Input

`````js
a / b & c >>> d ^ e < f - g || h && i === j | k
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
  loc:{start:{line:1,column:0},end:{line:1,column:47},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:47},source:''},
      expression: {
        type: 'LogicalExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:47},source:''},
        left: {
          type: 'BinaryExpression',
          loc:{start:{line:1,column:0},end:{line:1,column:27},source:''},
          left: {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:0},end:{line:1,column:15},source:''},
            left: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:0},end:{line:1,column:5},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
                name: 'a'
              },
              operator: '/',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:4},end:{line:1,column:5},source:''},
                name: 'b'
              }
            },
            operator: '&',
            right: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:8},end:{line:1,column:15},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:8},end:{line:1,column:9},source:''},
                name: 'c'
              },
              operator: '>>>',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:14},end:{line:1,column:15},source:''},
                name: 'd'
              }
            }
          },
          operator: '^',
          right: {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:18},end:{line:1,column:27},source:''},
            left: {
              type: 'Identifier',
              loc:{start:{line:1,column:18},end:{line:1,column:19},source:''},
              name: 'e'
            },
            operator: '<',
            right: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:22},end:{line:1,column:27},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:22},end:{line:1,column:23},source:''},
                name: 'f'
              },
              operator: '-',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:26},end:{line:1,column:27},source:''},
                name: 'g'
              }
            }
          }
        },
        operator: '||',
        right: {
          type: 'LogicalExpression',
          loc:{start:{line:1,column:31},end:{line:1,column:47},source:''},
          left: {
            type: 'Identifier',
            loc:{start:{line:1,column:31},end:{line:1,column:32},source:''},
            name: 'h'
          },
          operator: '&&',
          right: {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:36},end:{line:1,column:47},source:''},
            left: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:36},end:{line:1,column:43},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:36},end:{line:1,column:37},source:''},
                name: 'i'
              },
              operator: '===',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:42},end:{line:1,column:43},source:''},
                name: 'j'
              }
            },
            operator: '|',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:46},end:{line:1,column:47},source:''},
              name: 'k'
            }
          }
        }
      }
    }
  ]
}

tokens (23x):
       IDENT PUNC_DIV IDENT PUNC_AND IDENT PUNC_GT_GT_GT IDENT
       PUNC_CARET IDENT PUNC_LT IDENT PUNC_MIN IDENT PUNC_OR_OR IDENT
       PUNC_AND_AND IDENT PUNC_EQ_EQ_EQ IDENT PUNC_OR IDENT ASI
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
((((a / b) & (c >>> d)) ^ (e < (f - g))) || ((h && ((i === j) | k))));
````

Produces same AST