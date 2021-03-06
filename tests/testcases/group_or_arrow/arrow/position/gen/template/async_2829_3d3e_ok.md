# Tenko parser autogenerated test case

- From: tests/testcases/group_or_arrow/arrow/position/autogen.md
- Path: tests/testcases/group_or_arrow/arrow/position/gen/template/async_2829_3d3e_ok.md

> :: group or arrow : arrow : position : gen : template
>
> ::> async 2829 3d3e ok

## Input


`````js
`a ${async () => ok} b`
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
  loc:{start:{line:1,column:0},end:{line:1,column:23},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:23},source:''},
      expression: {
        type: 'TemplateLiteral',
        loc:{start:{line:1,column:0},end:{line:1,column:23},source:''},
        expressions: [
          {
            type: 'ArrowFunctionExpression',
            loc:{start:{line:1,column:5},end:{line:1,column:19},source:''},
            params: [],
            id: null,
            generator: false,
            async: true,
            expression: true,
            body: {
              type: 'Identifier',
              loc:{start:{line:1,column:17},end:{line:1,column:19},source:''},
              name: 'ok'
            }
          }
        ],
        quasis: [
          {
            type: 'TemplateElement',
            loc:{start:{line:1,column:1},end:{line:1,column:3},source:''},
            tail: false,
            value: { raw: 'a ', cooked: 'a ' }
          },
          {
            type: 'TemplateElement',
            loc:{start:{line:1,column:20},end:{line:1,column:22},source:''},
            tail: true,
            value: { raw: ' b', cooked: ' b' }
          }
        ]
      }
    }
  ]
}

tokens (9x):
       TICK_HEAD ID_async PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_EQ_GT
       IDENT TICK_TAIL ASI
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
`a ${async () => (ok)} b`;
````

Produces same AST
