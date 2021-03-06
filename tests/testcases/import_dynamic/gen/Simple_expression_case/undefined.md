# Tenko parser autogenerated test case

- From: tests/testcases/import_dynamic/autogen.md
- Path: tests/testcases/import_dynamic/gen/Simple_expression_case/undefined.md

> :: import dynamic : gen : Simple expression case
>
> ::> undefined

## Input

- `es = undefined`

`````js
let x = import('foo');
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
  loc:{start:{line:1,column:0},end:{line:1,column:22},source:''},
  body: [
    {
      type: 'VariableDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:22},source:''},
      kind: 'let',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:1,column:4},end:{line:1,column:21},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:5},source:''},
            name: 'x'
          },
          init: {
            type: 'CallExpression',
            loc:{start:{line:1,column:8},end:{line:1,column:21},source:''},
            optional: false,
            callee: {
              type: 'Import',
              loc:{start:{line:1,column:8},end:{line:1,column:14},source:''}
            },
            arguments: [
              {
                type: 'Literal',
                loc:{start:{line:1,column:15},end:{line:1,column:20},source:''},
                value: 'foo',
                raw: "'foo'"
              }
            ]
          }
        }
      ]
    }
  ]
}

tokens (9x):
       ID_let IDENT PUNC_EQ ID_import PUNC_PAREN_OPEN STRING_SINGLE
       PUNC_PAREN_CLOSE PUNC_SEMI
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

Printer output was same as input [sloppy][annexb:no]
