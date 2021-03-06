# Tenko parser test case

- Path: tests/testcases/super_keyword/property/dynamic/weird_places/in_method_as_delete.md

> :: super keyword : property : dynamic : weird places
>
> ::> in method as delete
## PASS

## Input

`````js
x = { foo(){ delete super[foo]; }}
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
  loc:{start:{line:1,column:0},end:{line:1,column:34},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:34},source:''},
      expression: {
        type: 'AssignmentExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:34},source:''},
        left: {
          type: 'Identifier',
          loc:{start:{line:1,column:0},end:{line:1,column:1},source:''},
          name: 'x'
        },
        operator: '=',
        right: {
          type: 'ObjectExpression',
          loc:{start:{line:1,column:4},end:{line:1,column:34},source:''},
          properties: [
            {
              type: 'Property',
              loc:{start:{line:1,column:6},end:{line:1,column:33},source:''},
              key: {
                type: 'Identifier',
                loc:{start:{line:1,column:6},end:{line:1,column:9},source:''},
                name: 'foo'
              },
              kind: 'init',
              method: true,
              computed: false,
              value: {
                type: 'FunctionExpression',
                loc:{start:{line:1,column:6},end:{line:1,column:33},source:''},
                generator: false,
                async: false,
                id: null,
                params: [],
                body: {
                  type: 'BlockStatement',
                  loc:{start:{line:1,column:11},end:{line:1,column:33},source:''},
                  body: [
                    {
                      type: 'ExpressionStatement',
                      loc:{start:{line:1,column:13},end:{line:1,column:31},source:''},
                      expression: {
                        type: 'UnaryExpression',
                        loc:{start:{line:1,column:13},end:{line:1,column:30},source:''},
                        operator: 'delete',
                        prefix: true,
                        argument: {
                          type: 'MemberExpression',
                          loc:{start:{line:1,column:20},end:{line:1,column:30},source:''},
                          computed: true,
                          optional: false,
                          object: {
                            type: 'Super',
                            loc:{start:{line:1,column:20},end:{line:1,column:25},source:''}
                          },
                          property: {
                            type: 'Identifier',
                            loc:{start:{line:1,column:26},end:{line:1,column:29},source:''},
                            name: 'foo'
                          }
                        }
                      }
                    }
                  ]
                }
              },
              shorthand: false
            }
          ]
        }
      }
    }
  ]
}

tokens (17x):
       IDENT PUNC_EQ PUNC_CURLY_OPEN IDENT PUNC_PAREN_OPEN
       PUNC_PAREN_CLOSE PUNC_CURLY_OPEN ID_delete ID_super
       PUNC_BRACKET_OPEN IDENT PUNC_BRACKET_CLOSE PUNC_SEMI
       PUNC_CURLY_CLOSE PUNC_CURLY_CLOSE ASI
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
x = {foo(){delete super[foo];}};
````

Produces same AST
