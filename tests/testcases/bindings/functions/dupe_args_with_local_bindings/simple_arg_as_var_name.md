# Tenko parser test case

- Path: tests/testcases/bindings/functions/dupe_args_with_local_bindings/simple_arg_as_var_name.md

> :: bindings : functions : dupe args with local bindings
>
> ::> simple arg as var name

## Input

`````js
function f(x) { var x; }
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
  loc:{start:{line:1,column:0},end:{line:1,column:24},source:''},
  body: [
    {
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:24},source:''},
      generator: false,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
        name: 'f'
      },
      params: [
        {
          type: 'Identifier',
          loc:{start:{line:1,column:11},end:{line:1,column:12},source:''},
          name: 'x'
        }
      ],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:14},end:{line:1,column:24},source:''},
        body: [
          {
            type: 'VariableDeclaration',
            loc:{start:{line:1,column:16},end:{line:1,column:22},source:''},
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                loc:{start:{line:1,column:20},end:{line:1,column:21},source:''},
                id: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:20},end:{line:1,column:21},source:''},
                  name: 'x'
                },
                init: null
              }
            ]
          }
        ]
      }
    }
  ]
}

tokens (11x):
       ID_function IDENT PUNC_PAREN_OPEN IDENT PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN ID_var IDENT PUNC_SEMI PUNC_CURLY_CLOSE
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
function f(x) {var x;}
````

Produces same AST