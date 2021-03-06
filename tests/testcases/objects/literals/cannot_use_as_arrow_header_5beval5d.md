# Tenko parser test case

- Path: tests/testcases/objects/literals/cannot_use_as_arrow_header_5beval5d.md

> :: objects : literals
>
> ::> cannot use as arrow header 5beval5d

## Input

`````js
({eval}) => x;
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
  loc:{start:{line:1,column:0},end:{line:1,column:14},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:14},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:13},source:''},
        params: [
          {
            type: 'ObjectPattern',
            loc:{start:{line:1,column:1},end:{line:1,column:7},source:''},
            properties: [
              {
                type: 'Property',
                loc:{start:{line:1,column:2},end:{line:1,column:6},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:2},end:{line:1,column:6},source:''},
                  name: 'eval'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:2},end:{line:1,column:6},source:''},
                  name: 'eval'
                },
                shorthand: true
              }
            ]
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: true,
        body: {
          type: 'Identifier',
          loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
          name: 'x'
        }
      }
    }
  ]
}

tokens (9x):
       PUNC_PAREN_OPEN PUNC_CURLY_OPEN ID_eval PUNC_CURLY_CLOSE
       PUNC_PAREN_CLOSE PUNC_EQ_GT IDENT PUNC_SEMI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  The left hand side of the arrow is not destructible so arrow is illegal

start@1:0, error@1:9
╔══╦════════════════
 1 ║ ({eval}) => x;
   ║          ^^------- error
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
({eval}) => (x);
````

Produces same AST
