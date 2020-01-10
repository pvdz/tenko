# Tenko parser test case

- Path: tests/testcases/debugger_statement/can_not_use_certain_reserved_keywords_as_label_name_in_strict_mode3a_keyword3d60protected60.md

> :: debugger statement
>
> ::> can not use certain reserved keywords as label name in strict mode3a keyword3d60protected60

## Input

`````js
protected: x;
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
      type: 'LabeledStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:13},source:''},
      label: {
        type: 'Identifier',
        loc:{start:{line:1,column:0},end:{line:1,column:9},source:''},
        name: 'protected'
      },
      body: {
        type: 'ExpressionStatement',
        loc:{start:{line:1,column:11},end:{line:1,column:13},source:''},
        expression: {
          type: 'Identifier',
          loc:{start:{line:1,column:11},end:{line:1,column:12},source:''},
          name: 'x'
        }
      }
    }
  ]
}

tokens (5x):
       ID_protected PUNC_COLON IDENT PUNC_SEMI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`protected`) as a variable name because: Cannot use this reserved word as a variable name in strict mode

start@1:0, error@1:0
╔══╦════════════════
 1 ║ protected: x;
   ║ ^^^^^^^^^------- error
╚══╩════════════════

`````


### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output was same as input [sloppy]