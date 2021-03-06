# Tenko parser autogenerated test case

- From: tests/testcases/assigns/to_keyword/autogen.md
- Path: tests/testcases/assigns/to_keyword/gen/assign_to_paren-wrapped_keyword_in_arrow_param_default/let.md

> :: assigns : to keyword : gen : assign to paren-wrapped keyword in arrow param default
>
> ::> let

## Input


`````js
(x = (let) = f) => {}
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
  loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
        params: [
          {
            type: 'AssignmentPattern',
            loc:{start:{line:1,column:1},end:{line:1,column:14},source:''},
            left: {
              type: 'Identifier',
              loc:{start:{line:1,column:1},end:{line:1,column:2},source:''},
              name: 'x'
            },
            right: {
              type: 'AssignmentExpression',
              loc:{start:{line:1,column:5},end:{line:1,column:14},source:''},
              left: {
                type: 'Identifier',
                loc:{start:{line:1,column:6},end:{line:1,column:9},source:''},
                name: 'let'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:13},end:{line:1,column:14},source:''},
                name: 'f'
              }
            }
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:19},end:{line:1,column:21},source:''},
          body: []
        }
      }
    }
  ]
}

tokens (14x):
       PUNC_PAREN_OPEN IDENT PUNC_EQ PUNC_PAREN_OPEN ID_let
       PUNC_PAREN_CLOSE PUNC_EQ IDENT PUNC_PAREN_CLOSE PUNC_EQ_GT
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Can not use `let` as variable name in strict mode

start@1:0, error@1:6
╔══╦════════════════
 1 ║ (x = (let) = f) => {}
   ║       ^^^------- error
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
(x = let = f) => {};
````

Produces same AST
