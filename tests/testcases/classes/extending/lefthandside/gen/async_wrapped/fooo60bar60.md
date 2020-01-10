# Tenko parser autogenerated test case

- From: tests/testcases/classes/extending/lefthandside/autogen.md
- Path: tests/testcases/classes/extending/lefthandside/gen/async_wrapped/fooo60bar60.md

> :: classes : extending : lefthandside : gen : async wrapped
>
> ::> fooo60bar60

## Input


`````js
async function p(){
  class C extends fooo`bar` {}
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:3,column:1},source:''},
  body: [
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:3,column:1},source:''},
      generator: false,
      async: true,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
        name: 'p'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:18},end:{line:3,column:1},source:''},
        body: [
          {
            type: 'ClassDeclaration',
            loc:{start:{line:2,column:2},end:{line:2,column:30},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:2,column:8},end:{line:2,column:9},source:''},
              name: 'C'
            },
            superClass: {
              type: 'TaggedTemplateExpression',
              loc:{start:{line:2,column:18},end:{line:2,column:27},source:''},
              tag: {
                type: 'Identifier',
                loc:{start:{line:2,column:18},end:{line:2,column:22},source:''},
                name: 'fooo'
              },
              quasi: {
                type: 'TemplateLiteral',
                loc:{start:{line:2,column:22},end:{line:2,column:27},source:''},
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    loc:{start:{line:2,column:23},end:{line:2,column:26},source:''},
                    tail: true,
                    value: { raw: 'bar', cooked: 'bar' }
                  }
                ]
              }
            },
            body: {
              type: 'ClassBody',
              loc:{start:{line:2,column:28},end:{line:2,column:30},source:''},
              body: []
            }
          }
        ]
      }
    }
  ]
}

tokens (15x):
       ID_async ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN ID_class IDENT ID_extends IDENT TICK_PURE
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output different from input [sloppy]:

````js
async function p() {class C extends ((fooo)`bar`) {}}
````

Produces same AST