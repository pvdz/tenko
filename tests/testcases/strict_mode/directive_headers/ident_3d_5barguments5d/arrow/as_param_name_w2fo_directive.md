# Tenko parser test case

- Path: tests/testcases/strict_mode/directive_headers/ident_3d_5barguments5d/arrow/as_param_name_w2fo_directive.md

> :: strict mode : directive headers : ident 3d 5barguments5d : arrow
>
> ::> as param name w2fo directive

## Input

`````js
(arguments) => {}
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
  loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
      expression: {
        type: 'ArrowFunctionExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
        params: [
          {
            type: 'Identifier',
            loc:{start:{line:1,column:1},end:{line:1,column:10},source:''},
            name: 'arguments'
          }
        ],
        id: null,
        generator: false,
        async: false,
        expression: false,
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:15},end:{line:1,column:17},source:''},
          body: []
        }
      }
    }
  ]
}

tokens (8x):
       PUNC_PAREN_OPEN ID_arguments PUNC_PAREN_CLOSE PUNC_EQ_GT
       PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  The left hand side of the arrow is not destructible so arrow is illegal

start@1:0, error@1:12
╔══╦═════════════════
 1 ║ (arguments) => {}
   ║             ^^------- error
╚══╩═════════════════

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
arguments => {};
````

Produces same AST