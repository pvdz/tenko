# Tenko parser test case

- Path: tests/testcases/const/binding/for-header/destruct/for/object/double_var_simple_1.md

> :: const : binding : for-header : destruct : for : object
>
> ::> double var simple 1

## Input

`````js
for (const {x, y} = obj;;);
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
  loc:{start:{line:1,column:0},end:{line:1,column:27},source:''},
  body: [
    {
      type: 'ForStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:27},source:''},
      init: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:5},end:{line:1,column:23},source:''},
        kind: 'const',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:11},end:{line:1,column:23},source:''},
            id: {
              type: 'ObjectPattern',
              loc:{start:{line:1,column:11},end:{line:1,column:17},source:''},
              properties: [
                {
                  type: 'Property',
                  loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                  key: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                    name: 'x'
                  },
                  kind: 'init',
                  method: false,
                  computed: false,
                  value: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:12},end:{line:1,column:13},source:''},
                    name: 'x'
                  },
                  shorthand: true
                },
                {
                  type: 'Property',
                  loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
                  key: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
                    name: 'y'
                  },
                  kind: 'init',
                  method: false,
                  computed: false,
                  value: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:15},end:{line:1,column:16},source:''},
                    name: 'y'
                  },
                  shorthand: true
                }
              ]
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:20},end:{line:1,column:23},source:''},
              name: 'obj'
            }
          }
        ]
      },
      test: null,
      update: null,
      body: {
        type: 'EmptyStatement',
        loc:{start:{line:1,column:26},end:{line:1,column:27},source:''}
      }
    }
  ]
}

tokens (15x):
       ID_for PUNC_PAREN_OPEN ID_const PUNC_CURLY_OPEN IDENT
       PUNC_COMMA IDENT PUNC_CURLY_CLOSE PUNC_EQ IDENT PUNC_SEMI
       PUNC_SEMI PUNC_PAREN_CLOSE PUNC_SEMI
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
for (const {x, y} = obj;;) ;
````

Produces same AST