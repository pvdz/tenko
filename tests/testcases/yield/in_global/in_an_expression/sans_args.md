# Tenko parser test case

- Path: tests/testcases/yield/in_global/in_an_expression/sans_args.md

> :: yield : in global : in an expression
>
> ::> sans args

## Input

`````js
5 + yield
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
  loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
      expression: {
        type: 'BinaryExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
        left: {
          type: 'Literal',
          loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
          value: 5,
          raw: '5'
        },
        operator: '+',
        right: {
          type: 'Identifier',
          loc:{start:{line:1,column:4},end:{line:1,column:9},source:''},
          name: 'yield'
        }
      }
    }
  ]
}

tokens (5x):
       NUMBER_DEC PUNC_PLUS ID_yield ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use `yield` outside of generator functions when in strict mode (at EOF)

start@1:0, error@1:4
╔══╦════════════════
 1 ║ 5 + yield
   ║     ^^^^^------- error
╚══╩════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
5 + yield;
````

Produces same AST
