# Tenko parser test case

- Path: tests/testcases/operator_precedent/various_priority_checks_GENERATED/order_4_28generated_3e3e_26_3e_2626_7c7c_5e_2a_2a2a_7c_213d3d_-29.md

> :: operator precedent : various priority checks GENERATED
>
> ::> order 4 28generated 3e3e 26 3e 2626 7c7c 5e 2a 2a2a 7c 213d3d -29

## Input

`````js
a - b !== c | d ** e * f ^ g || h && i > j & k
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:46},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:46},source:''},
      expression: {
        type: 'LogicalExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:46},source:''},
        left: {
          type: 'BinaryExpression',
          loc:{start:{line:1,column:0},end:{line:1,column:28},source:''},
          left: {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:0},end:{line:1,column:11},source:''},
            left: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:0},end:{line:1,column:5},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
                name: 'a'
              },
              operator: '-',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:4},end:{line:1,column:5},source:''},
                name: 'b'
              }
            },
            operator: '!==',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:10},end:{line:1,column:11},source:''},
              name: 'c'
            }
          },
          operator: '|',
          right: {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:14},end:{line:1,column:28},source:''},
            left: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:14},end:{line:1,column:24},source:''},
              left: {
                type: 'BinaryExpression',
                loc:{start:{line:1,column:14},end:{line:1,column:20},source:''},
                left: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:14},end:{line:1,column:15},source:''},
                  name: 'd'
                },
                operator: '**',
                right: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:19},end:{line:1,column:20},source:''},
                  name: 'e'
                }
              },
              operator: '*',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:23},end:{line:1,column:24},source:''},
                name: 'f'
              }
            },
            operator: '^',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:27},end:{line:1,column:28},source:''},
              name: 'g'
            }
          }
        },
        operator: '||',
        right: {
          type: 'LogicalExpression',
          loc:{start:{line:1,column:32},end:{line:1,column:46},source:''},
          left: {
            type: 'Identifier',
            loc:{start:{line:1,column:32},end:{line:1,column:33},source:''},
            name: 'h'
          },
          operator: '&&',
          right: {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:37},end:{line:1,column:46},source:''},
            left: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:37},end:{line:1,column:42},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:37},end:{line:1,column:38},source:''},
                name: 'i'
              },
              operator: '>',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:41},end:{line:1,column:42},source:''},
                name: 'j'
              }
            },
            operator: '&',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:45},end:{line:1,column:46},source:''},
              name: 'k'
            }
          }
        }
      }
    }
  ]
}

tokens (23x):
       IDENT PUNC_MIN IDENT PUNC_EXCL_EQ_EQ IDENT PUNC_OR IDENT
       PUNC_STAR_STAR IDENT PUNC_STAR IDENT PUNC_CARET IDENT
       PUNC_OR_OR IDENT PUNC_AND_AND IDENT PUNC_GT IDENT PUNC_AND
       IDENT ASI
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

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
((((a - b) !== c) | (((d ** e) * f) ^ g)) || ((h && ((i > j) & k))));
````

Produces same AST
