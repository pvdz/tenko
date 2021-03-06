# Tenko parser test case

- Path: tests/testcases/lexer_cases/numbers/legacy_octal/grouped_04.md

> :: lexer cases : numbers : legacy octal
>
> ::> grouped 04
>
> 

## Input

`````js
(04)
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
  loc:{start:{line:1,column:0},end:{line:1,column:4},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:4},source:''},
      expression: {
        type: 'Literal',
        loc:{start:{line:1,column:1},end:{line:1,column:3},source:''},
        value: 4,
        raw: '04'
      }
    }
  ]
}

tokens (5x):
       PUNC_PAREN_OPEN NUMBER_OLD PUNC_PAREN_CLOSE ASI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Lexer error!
    "Illegal" octal escape in strict mode

start@1:0, error@1:1
╔══╦════════════════
 1 ║ (04)
   ║  ^^------- error
╚══╩════════════════

`````

### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as strict mode._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
04;
````

Produces same AST
