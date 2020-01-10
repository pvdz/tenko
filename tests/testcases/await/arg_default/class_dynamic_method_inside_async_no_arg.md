# Tenko parser test case

- Path: tests/testcases/await/arg_default/class_dynamic_method_inside_async_no_arg.md

> :: await : arg default
>
> ::> class dynamic method inside async no arg
>
> Await is not valid inside method args with dynamic method name

## Input

`````js
async function f() {
  class x{[x](a=await){}}
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
        name: 'f'
      },
      params: [],
      body: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:19},end:{line:3,column:1},source:''},
        body: [
          {
            type: 'ClassDeclaration',
            loc:{start:{line:2,column:2},end:{line:2,column:25},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:2,column:8},end:{line:2,column:9},source:''},
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              loc:{start:{line:2,column:9},end:{line:2,column:25},source:''},
              body: [
                {
                  type: 'MethodDefinition',
                  loc:{start:{line:2,column:10},end:{line:2,column:24},source:''},
                  key: {
                    type: 'Identifier',
                    loc:{start:{line:2,column:11},end:{line:2,column:12},source:''},
                    name: 'x'
                  },
                  static: false,
                  computed: true,
                  kind: 'method',
                  value: {
                    type: 'FunctionExpression',
                    loc:{start:{line:2,column:10},end:{line:2,column:24},source:''},
                    generator: false,
                    async: false,
                    id: null,
                    params: [
                      {
                        type: 'AssignmentPattern',
                        loc:{start:{line:2,column:14},end:{line:2,column:21},source:''},
                        left: {
                          type: 'Identifier',
                          loc:{start:{line:2,column:14},end:{line:2,column:15},source:''},
                          name: 'a'
                        },
                        right: {
                          type: 'Identifier',
                          loc:{start:{line:2,column:16},end:{line:2,column:21},source:''},
                          name: 'await'
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      loc:{start:{line:2,column:22},end:{line:2,column:24},source:''},
                      body: []
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
}

tokens (22x):
       ID_async ID_function IDENT PUNC_PAREN_OPEN PUNC_PAREN_CLOSE
       PUNC_CURLY_OPEN ID_class IDENT PUNC_CURLY_OPEN
       PUNC_BRACKET_OPEN IDENT PUNC_BRACKET_CLOSE PUNC_PAREN_OPEN
       IDENT PUNC_EQ ID_await PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

`````
throws: Parser error!
  Cannot use `await` as var when goal=module but found `await` outside an async function

start@1:0, error@2:21
╔══╦═════════════════
 1 ║ async function f() {
 2 ║   class x{[x](a=await){}}
   ║                      ^------- error
 3 ║ }
╚══╩═════════════════

`````


### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output different from input [sloppy]:

````js
async function f() {class x{[x](a = await){};}}
````

Produces same AST