# Tenko parser autogenerated test case

- From: tests/testcases/delete/single_ident_cases/keywords/autogen.md
- Path: tests/testcases/delete/single_ident_cases/keywords/gen/ungrouped_property/await.md

> :: delete : single ident cases : keywords : gen : ungrouped property
>
> ::> await

## Input


`````js
delete await.prop
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
        type: 'UnaryExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
        operator: 'delete',
        prefix: true,
        argument: {
          type: 'MemberExpression',
          loc:{start:{line:1,column:7},end:{line:1,column:17},source:''},
          computed: false,
          optional: false,
          object: {
            type: 'Identifier',
            loc:{start:{line:1,column:7},end:{line:1,column:12},source:''},
            name: 'await'
          },
          property: {
            type: 'Identifier',
            loc:{start:{line:1,column:13},end:{line:1,column:17},source:''},
            name: 'prop'
          }
        }
      }
    }
  ]
}

tokens (6x):
       ID_delete ID_await PUNC_DOT IDENT ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use `await` as var when goal=module but found `await` outside an async function

start@1:0, error@1:12
╔══╦═════════════════
 1 ║ delete await.prop
   ║             ^------- error
╚══╩═════════════════

`````

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as module mode._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
delete await.prop;
````

Produces same AST
