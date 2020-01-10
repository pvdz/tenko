# Tenko parser autogenerated test case

- From: tests/testcases/var/binding_generic/reserved_words/autogen.md
- Path: tests/testcases/var/binding_generic/reserved_words/gen/function_object_destructured_arg/await.md

> :: var : binding generic : reserved words : gen : function object destructured arg
>
> ::> await

## Input


`````js
function f({await}) {}
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
      type: 'FunctionDeclaration',
      loc:{start:{line:1,column:0},end:{line:1,column:22},source:''},
      generator: false,
      async: false,
      id: {
        type: 'Identifier',
        loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
        name: 'f'
      },
      params: [
        {
          type: 'ObjectPattern',
          loc:{start:{line:1,column:11},end:{line:1,column:18},source:''},
          properties: [
            {
              type: 'Property',
              loc:{start:{line:1,column:12},end:{line:1,column:17},source:''},
              key: {
                type: 'Identifier',
                loc:{start:{line:1,column:12},end:{line:1,column:17},source:''},
                name: 'await'
              },
              kind: 'init',
              method: false,
              computed: false,
              value: {
                type: 'Identifier',
                loc:{start:{line:1,column:12},end:{line:1,column:17},source:''},
                name: 'await'
              },
              shorthand: true
            }
          ]
        }
      ],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:20},end:{line:1,column:22},source:''},
        body: []
      }
    }
  ]
}

tokens (10x):
       ID_function IDENT PUNC_PAREN_OPEN PUNC_CURLY_OPEN ID_await
       PUNC_CURLY_CLOSE PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use this name (`await`) as a variable name because: Await is illegal as var name with module goal

start@1:0, error@1:12
╔══╦═════════════════
 1 ║ function f({await}) {}
   ║             ^^^^^------- error
╚══╩═════════════════

`````


### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output was same as input [sloppy]