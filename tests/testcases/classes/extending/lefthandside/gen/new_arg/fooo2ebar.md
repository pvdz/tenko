# Tenko parser autogenerated test case

- From: tests/testcases/classes/extending/lefthandside/autogen.md
- Path: tests/testcases/classes/extending/lefthandside/gen/new_arg/fooo2ebar.md

> :: classes : extending : lefthandside : gen : new arg
>
> ::> fooo2ebar

## Input


`````js
new fooo.bar
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
  loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
      expression: {
        type: 'NewExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
        arguments: [],
        callee: {
          type: 'MemberExpression',
          loc:{start:{line:1,column:4},end:{line:1,column:12},source:''},
          computed: false,
          optional: false,
          object: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:8},source:''},
            name: 'fooo'
          },
          property: {
            type: 'Identifier',
            loc:{start:{line:1,column:9},end:{line:1,column:12},source:''},
            name: 'bar'
          }
        }
      }
    }
  ]
}

tokens (6x):
       ID_new IDENT PUNC_DOT IDENT ASI
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
new (fooo.bar)();
````

Produces same AST
