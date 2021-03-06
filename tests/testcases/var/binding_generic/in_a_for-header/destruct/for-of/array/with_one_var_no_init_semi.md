# Tenko parser test case

- Path: tests/testcases/var/binding_generic/in_a_for-header/destruct/for-of/array/with_one_var_no_init_semi.md

> :: var : binding generic : in a for-header : destruct : for-of : array
>
> ::> with one var no init semi

## Input

`````js
for (var [foo] of arr);
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
      type: 'ForOfStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:23},source:''},
      left: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:5},end:{line:1,column:14},source:''},
        kind: 'var',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:9},end:{line:1,column:14},source:''},
            id: {
              type: 'ArrayPattern',
              loc:{start:{line:1,column:9},end:{line:1,column:14},source:''},
              elements: [
                {
                  type: 'Identifier',
                  loc:{start:{line:1,column:10},end:{line:1,column:13},source:''},
                  name: 'foo'
                }
              ]
            },
            init: null
          }
        ]
      },
      right: {
        type: 'Identifier',
        loc:{start:{line:1,column:18},end:{line:1,column:21},source:''},
        name: 'arr'
      },
      await: false,
      body: {
        type: 'EmptyStatement',
        loc:{start:{line:1,column:22},end:{line:1,column:23},source:''}
      }
    }
  ]
}

tokens (11x):
       ID_for PUNC_PAREN_OPEN ID_var PUNC_BRACKET_OPEN IDENT
       PUNC_BRACKET_CLOSE ID_of IDENT PUNC_PAREN_CLOSE PUNC_SEMI
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
for (var [foo] of arr) ;
````

Produces same AST
