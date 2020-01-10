# Tenko parser test case

- Path: tests/testcases/assigns/keyword_with_escapes_check/leading_escape_5beval_3d3e_5cu0065val5d.md

> :: assigns : keyword with escapes check
>
> ::> leading escape 5beval 3d3e 5cu0065val5d

## Input

`````js
(\u0065val = "sentinal 432432")
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
  loc:{start:{line:1,column:0},end:{line:1,column:31},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:31},source:''},
      expression: {
        type: 'AssignmentExpression',
        loc:{start:{line:1,column:1},end:{line:1,column:30},source:''},
        left: {
          type: 'Identifier',
          loc:{start:{line:1,column:1},end:{line:1,column:10},source:''},
          name: 'eval'
        },
        operator: '=',
        right: {
          type: 'Literal',
          loc:{start:{line:1,column:13},end:{line:1,column:30},source:''},
          value: 'sentinal 432432',
          raw: '"sentinal 432432"'
        }
      }
    }
  ]
}

tokens (7x):
       PUNC_PAREN_OPEN IDENT PUNC_EQ STRING_DOUBLE PUNC_PAREN_CLOSE
       ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`\u0065val`) as a variable name because: Cannot create a binding named `eval` in strict mode

start@1:0, error@1:1
╔══╦════════════════
 1 ║ (\u0065val = "sentinal 432432")
   ║  ^^^^^^^^^------- error
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
eval = "sentinal 432432";
````

Produces same AST