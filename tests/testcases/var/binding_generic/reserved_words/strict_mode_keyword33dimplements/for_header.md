# Tenko parser test case

- Path: tests/testcases/var/binding_generic/reserved_words/strict_mode_keyword33dimplements/for_header.md

> :: var : binding generic : reserved words : strict mode keyword33dimplements
>
> ::> for header

## Input

`````js
for (var implements = x;;);
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
        kind: 'var',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:9},end:{line:1,column:23},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:1,column:9},end:{line:1,column:19},source:''},
              name: 'implements'
            },
            init: {
              type: 'Identifier',
              loc:{start:{line:1,column:22},end:{line:1,column:23},source:''},
              name: 'x'
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

tokens (11x):
       ID_for PUNC_PAREN_OPEN ID_var ID_implements PUNC_EQ IDENT
       PUNC_SEMI PUNC_SEMI PUNC_PAREN_CLOSE PUNC_SEMI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`implements`) as a variable name because: Cannot use this reserved word as a variable name in strict mode

start@1:0, error@1:9
╔══╦════════════════
 1 ║ for (var implements = x;;);
   ║          ^^^^^^^^^^------- error
╚══╩════════════════

`````


### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output different from input [sloppy]:

````js
for (var implements = x;;) ;
````

Produces same AST