# Tenko parser test case

- Path: tests/testcases/new/new_operator/callee_cases/sans_parens/dynamic_member.md

> :: new : new operator : callee cases : sans parens
>
> ::> dynamic member

## Input

`````js
new Foo["bar"]
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
        type: 'NewExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:14},source:''},
        arguments: [],
        callee: {
          type: 'MemberExpression',
          loc:{start:{line:1,column:4},end:{line:1,column:14},source:''},
          computed: true,
          optional: false,
          object: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:7},source:''},
            name: 'Foo'
          },
          property: {
            type: 'Literal',
            loc:{start:{line:1,column:8},end:{line:1,column:13},source:''},
            value: 'bar',
            raw: '"bar"'
          }
        }
      }
    }
  ]
}

tokens (7x):
       ID_new IDENT PUNC_BRACKET_OPEN STRING_DOUBLE PUNC_BRACKET_CLOSE
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
new (Foo["bar"])();
````

Produces same AST
