# Tenko parser autogenerated test case

- From: tests/testcases/functions/declaration/block_scoped/autogen.md
- Path: tests/testcases/functions/declaration/block_scoped/gen/switch_case_block/async_function_2af28297b7d.md

> :: functions : declaration : block scoped : gen : switch case block
>
> ::> async function 2af28297b7d

## Input


`````js
switch (x) { case c: async function *f(){} async function *f(){} }
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in four parsing modes: sloppy mode, strict mode script goal, module goal, web compat mode (always sloppy).

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Attempted to create a lexical binding for `f` but another binding already existed on the same level

start@1:0, error@1:59
╔══╦═════════════════
 1 ║ switch (x) { case c: async function *f(){} async function *f(){} }
   ║                                                            ^------- error
╚══╩═════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

`````
ast: {
  type: 'Program',
  loc:{start:{line:1,column:0},end:{line:1,column:66},source:''},
  body: [
    {
      type: 'SwitchStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:66},source:''},
      discriminant: {
        type: 'Identifier',
        loc:{start:{line:1,column:8},end:{line:1,column:9},source:''},
        name: 'x'
      },
      cases: [
        {
          type: 'SwitchCase',
          loc:{start:{line:1,column:13},end:{line:1,column:64},source:''},
          test: {
            type: 'Identifier',
            loc:{start:{line:1,column:18},end:{line:1,column:19},source:''},
            name: 'c'
          },
          consequent: [
            {
              type: 'FunctionDeclaration',
              loc:{start:{line:1,column:21},end:{line:1,column:42},source:''},
              generator: true,
              async: true,
              id: {
                type: 'Identifier',
                loc:{start:{line:1,column:37},end:{line:1,column:38},source:''},
                name: 'f'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                loc:{start:{line:1,column:40},end:{line:1,column:42},source:''},
                body: []
              }
            },
            {
              type: 'FunctionDeclaration',
              loc:{start:{line:1,column:43},end:{line:1,column:64},source:''},
              generator: true,
              async: true,
              id: {
                type: 'Identifier',
                loc:{start:{line:1,column:59},end:{line:1,column:60},source:''},
                name: 'f'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                loc:{start:{line:1,column:62},end:{line:1,column:64},source:''},
                body: []
              }
            }
          ]
        }
      ]
    }
  ]
}

tokens (26x):
       ID_switch PUNC_PAREN_OPEN IDENT PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN ID_case IDENT PUNC_COLON ID_async ID_function
       PUNC_STAR IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ID_async ID_function PUNC_STAR
       IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE
`````


## AST Printer

Printer output different from input [web]:

````js
switch (x) {case c:
async function* f() {}
async function* f() {}}
````

Produces same AST