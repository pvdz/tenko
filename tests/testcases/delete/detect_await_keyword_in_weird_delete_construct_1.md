# Tenko parser test case

- Path: tests/testcases/delete/detect_await_keyword_in_weird_delete_construct_1.md

> :: delete
>
> ::> detect await keyword in weird delete construct 1

## Input

`````js
async x => delete ("x"[(await x)])
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
  loc:{start:{line:1,column:0},end:{line:1,column:34},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:34},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:34},source:''},
        params: [
          {
            type: 'Identifier',
            loc:{start:{line:1,column:6},end:{line:1,column:7},source:''},
            name: 'x'
          }
        ],
        id: null,
        generator: false,
        async: true,
        expression: true,
        body: {
          type: 'UnaryExpression',
          loc:{start:{line:1,column:11},end:{line:1,column:34},source:''},
          operator: 'delete',
          prefix: true,
          argument: {
            type: 'MemberExpression',
            loc:{start:{line:1,column:19},end:{line:1,column:33},source:''},
            computed: true,
            optional: false,
            object: {
              type: 'Literal',
              loc:{start:{line:1,column:19},end:{line:1,column:22},source:''},
              value: 'x',
              raw: '"x"'
            },
            property: {
              type: 'AwaitExpression',
              loc:{start:{line:1,column:24},end:{line:1,column:31},source:''},
              argument: {
                type: 'Identifier',
                loc:{start:{line:1,column:30},end:{line:1,column:31},source:''},
                name: 'x'
              }
            }
          }
        }
      }
    }
  ]
}

tokens (15x):
       ID_async IDENT PUNC_EQ_GT ID_delete PUNC_PAREN_OPEN
       STRING_DOUBLE PUNC_BRACKET_OPEN PUNC_PAREN_OPEN ID_await IDENT
       PUNC_PAREN_CLOSE PUNC_BRACKET_CLOSE PUNC_PAREN_CLOSE ASI
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
async x => (delete "x"[await (x)]);
````

Produces same AST
