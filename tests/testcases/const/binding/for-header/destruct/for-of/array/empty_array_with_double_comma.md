# Tenko parser test case

- Path: tests/testcases/const/binding/for-header/destruct/for-of/array/empty_array_with_double_comma.md

> :: const : binding : for-header : destruct : for-of : array
>
> ::> empty array with double comma

## Input

`````js
for (const [,,] of x);
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
  loc:{start:{line:1,column:0},end:{line:1,column:22},source:''},
  body: [
    {
      type: 'ForOfStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:22},source:''},
      left: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:5},end:{line:1,column:15},source:''},
        kind: 'const',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:11},end:{line:1,column:15},source:''},
            id: {
              type: 'ArrayPattern',
              loc:{start:{line:1,column:11},end:{line:1,column:15},source:''},
              elements: [ null, null ]
            },
            init: null
          }
        ]
      },
      right: {
        type: 'Identifier',
        loc:{start:{line:1,column:19},end:{line:1,column:20},source:''},
        name: 'x'
      },
      await: false,
      body: {
        type: 'EmptyStatement',
        loc:{start:{line:1,column:21},end:{line:1,column:22},source:''}
      }
    }
  ]
}

tokens (12x):
       ID_for PUNC_PAREN_OPEN ID_const PUNC_BRACKET_OPEN PUNC_COMMA
       PUNC_COMMA PUNC_BRACKET_CLOSE ID_of IDENT PUNC_PAREN_CLOSE
       PUNC_SEMI
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
for (const [, ,] of x) ;
````

Produces same AST