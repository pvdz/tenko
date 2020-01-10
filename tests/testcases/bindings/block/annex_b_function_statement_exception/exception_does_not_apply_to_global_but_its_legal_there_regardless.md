# Tenko parser test case

- Path: tests/testcases/bindings/block/annex_b_function_statement_exception/exception_does_not_apply_to_global_but_its_legal_there_regardless.md

> :: bindings : block : annex b function statement exception
>
> ::> exception does not apply to global but its legal there regardless

## Input

`````js
function f() {} ; function f() {}
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
  loc:{start:{line:1,column:0},end:{line:1,column:33},source:''},
  body: [
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:15},source:''},
      generator: false,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
        name: 'f'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:13},end:{line:1,column:15},source:''},
        body: []
      }
    },
    {
      type: 'EmptyStatement',
      loc:{start:{line:1,column:16},end:{line:1,column:17},source:''}
    },
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:18},end:{line:1,column:33},source:''},
      generator: false,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:27},end:{line:1,column:28},source:''},
        name: 'f'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:31},end:{line:1,column:33},source:''},
        body: []
      }
    }
  ]
}

tokens (14x):
       ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE PUNC_SEMI ID_function IDENT
       PUNC_PAREN_OPEN PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Attempted to create a lexical binding for `f` but another binding already existed on the same level

start@1:0, error@1:27
╔══╦═════════════════
 1 ║ function f() {} ; function f() {}
   ║                            ^------- error
╚══╩═════════════════

`````


### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output different from input [sloppy]:

````js
function f() {}
;
function f() {}
````

Produces same AST