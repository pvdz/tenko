# Tenko parser test case

- Path: tests/testcases/async_keyword/async_60in60_check_as_expression_for_operator_precedence.md

> :: async keyword
>
> ::> async 60in60 check as expression for operator precedence

## Input

`````js
f(a + async in b)
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
  loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
      expression: {
        type: 'CallExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
        optional: false,
        callee: {
          type: 'Identifier',
          loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
          name: 'f'
        },
        arguments: [
          {
            type: 'BinaryExpression',
            loc:{start:{line:1,column:2},end:{line:1,column:16},source:''},
            left: {
              type: 'BinaryExpression',
              loc:{start:{line:1,column:2},end:{line:1,column:11},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:2},end:{line:1,column:3},source:''},
                name: 'a'
              },
              operator: '+',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:6},end:{line:1,column:11},source:''},
                name: 'async'
              }
            },
            operator: 'in',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
              name: 'b'
            }
          }
        ]
      }
    }
  ]
}

tokens (10x):
       IDENT PUNC_PAREN_OPEN IDENT PUNC_PLUS ID_async ID_in IDENT
       PUNC_PAREN_CLOSE ASI
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
f((a + async) in b);
````

Produces same AST
