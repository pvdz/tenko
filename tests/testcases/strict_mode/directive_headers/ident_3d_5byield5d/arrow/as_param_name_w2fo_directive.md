# Tenko parser test case

- Path: tests/testcases/strict_mode/directive_headers/ident_3d_5byield5d/arrow/as_param_name_w2fo_directive.md

> :: strict mode : directive headers : ident 3d 5byield5d : arrow
>
> ::> as param name w2fo directive

## Input

`````js
(yield) => {}
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
  loc:{start:{line:1,column:0},end:{line:1,column:13},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:13},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:13},source:''},
        params: [
          {
            type: 'Identifier',
            loc:{start:{line:1,column:1},end:{line:1,column:6},source:''},
            name: 'yield'
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:11},end:{line:1,column:13},source:''},
          body: []
        }
      }
    }
  ]
}

tokens (8x):
       PUNC_PAREN_OPEN ID_yield PUNC_PAREN_CLOSE PUNC_EQ_GT
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use `yield` outside of generator functions when in strict mode

start@1:0, error@1:1
╔══╦════════════════
 1 ║ (yield) => {}
   ║  ^^^^^------- error
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
yield => {};
````

Produces same AST