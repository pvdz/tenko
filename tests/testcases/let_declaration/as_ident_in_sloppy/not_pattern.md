# Tenko parser test case

- Path: tests/testcases/let_declaration/as_ident_in_sloppy/not_pattern.md

> :: let declaration : as ident in sloppy
>
> ::> not pattern
>
> Looks like a pattern but is not. Should pass in sloppy and fail in strict.

## Input

`````js
[...let [x] /= y]
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
        type: 'ArrayExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
        elements: [
          {
            type: 'SpreadElement',
            loc:{start:{line:1,column:1},end:{line:1,column:16},source:''},
            argument: {
              type: 'AssignmentExpression',
              loc:{start:{line:1,column:4},end:{line:1,column:16},source:''},
              left: {
                type: 'MemberExpression',
                loc:{start:{line:1,column:4},end:{line:1,column:11},source:''},
                computed: true,
                optional: false,
                object: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:4},end:{line:1,column:7},source:''},
                  name: 'let'
                },
                property: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
                  name: 'x'
                }
              },
              operator: '/=',
              right: {
                type: 'Identifier',
                loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
                name: 'y'
              }
            }
          }
        ]
      }
    }
  ]
}

tokens (11x):
       PUNC_BRACKET_OPEN PUNC_DOT_DOT_DOT ID_let PUNC_BRACKET_OPEN
       IDENT PUNC_BRACKET_CLOSE PUNC_DIV_EQ IDENT PUNC_BRACKET_CLOSE
       ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Can not use `let` as variable name in strict mode

start@1:0, error@1:4
╔══╦════════════════
 1 ║ [...let [x] /= y]
   ║     ^^^------- error
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
[...(let)[x] /= y];
````

Produces same AST
