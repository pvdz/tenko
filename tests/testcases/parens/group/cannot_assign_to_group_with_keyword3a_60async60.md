# Tenko parser test case

- Path: tests/testcases/parens/group/cannot_assign_to_group_with_keyword3a_60async60.md

> :: parens : group
>
> ::> cannot assign to group with keyword3a 60async60
>
> Cannot use this name (break) as a variable name because: Cannot never use this reserved word as a variable name
>
> Invalid assignment because group does not wrap just a var name or just a property access

## Input

`````js
(async)=2
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
        type: 'AssignmentExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
        left: {
          type: 'Identifier',
          loc:{start:{line:1,column:1},end:{line:1,column:6},source:''},
          name: 'async'
        },
        operator: '=',
        right: {
          type: 'Literal',
          loc:{start:{line:1,column:8},end:{line:1,column:9},source:''},
          value: 2,
          raw: '2'
        }
      }
    }
  ]
}

tokens (7x):
       PUNC_PAREN_OPEN ID_async PUNC_PAREN_CLOSE PUNC_EQ NUMBER_DEC
       ASI
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
async = 2;
````

Produces same AST
