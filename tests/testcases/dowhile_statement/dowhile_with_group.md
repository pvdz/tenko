# Tenko parser test case

- Path: tests/testcases/dowhile_statement/dowhile_with_group.md

> :: dowhile statement
>
> ::> dowhile with group
>
> Function wrapped in parenthesis case


## Input

`````js
do
  (function(){})
while(y)
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
  loc:{start:{line:1,column:0},end:{line:3,column:8},source:''},
  body: [
    {
      type: 'DoWhileStatement',
      loc:{start:{line:1,column:0},end:{line:3,column:8},source:''},
      body: {
        type: 'ExpressionStatement',
        loc:{start:{line:2,column:2},end:{line:2,column:16},source:''},
        expression: {
          type: 'FunctionExpression',
          loc:{start:{line:2,column:3},end:{line:2,column:15},source:''},
          generator: false,
          async: false,
          id: null,
          params: [],
          body: {
            type: 'BlockStatement',
            loc:{start:{line:2,column:13},end:{line:2,column:15},source:''},
            body: []
          }
        }
      },
      test: {
        type: 'Identifier',
        loc:{start:{line:3,column:6},end:{line:3,column:7},source:''},
        name: 'y'
      }
    }
  ]
}

tokens (15x):
       ID_do PUNC_PAREN_OPEN ID_function PUNC_PAREN_OPEN
       PUNC_PAREN_CLOSE PUNC_CURLY_OPEN PUNC_CURLY_CLOSE
       PUNC_PAREN_CLOSE ASI ID_while PUNC_PAREN_OPEN IDENT
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
do (function() {}); while (y);
````

Produces same AST
