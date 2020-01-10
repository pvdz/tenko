# Tenko parser autogenerated test case

- From: tests/testcases/var/binding_generic/reserved_words/autogen.md
- Path: tests/testcases/var/binding_generic/reserved_words/gen/catch_clause/let.md

> :: var : binding generic : reserved words : gen : catch clause
>
> ::> let

## Input


`````js
try {} catch (let) {}
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
  loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
  body: [
    {
      type: 'TryStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:21},source:''},
      block: {
        type: 'BlockStatement',
        loc:{start:{line:1,column:4},end:{line:1,column:6},source:''},
        body: []
      },
      handler: {
        type: 'CatchClause',
        loc:{start:{line:1,column:7},end:{line:1,column:21},source:''},
        param: {
          type: 'Identifier',
          loc:{start:{line:1,column:14},end:{line:1,column:17},source:''},
          name: 'let'
        },
        body: {
          type: 'BlockStatement',
          loc:{start:{line:1,column:19},end:{line:1,column:21},source:''},
          body: []
        }
      },
      finalizer: null
    }
  ]
}

tokens (10x):
       ID_try PUNC_CURLY_OPEN PUNC_CURLY_CLOSE ID_catch
       PUNC_PAREN_OPEN ID_let PUNC_PAREN_CLOSE PUNC_CURLY_OPEN
       PUNC_CURLY_CLOSE
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

`````
throws: Parser error!
  Cannot use this name (`let`) as a variable name because: Can not use `let` as variable name in strict mode

start@1:0, error@1:14
╔══╦═════════════════
 1 ║ try {} catch (let) {}
   ║               ^^^------- error
╚══╩═════════════════

`````


### Module goal

Parsed with the module goal.

_Output same as strict mode._

### Web compat mode

Parsed in sloppy script mode but with the web compat flag enabled.

_Output same as sloppy mode._

## AST Printer

Printer output was same as input [sloppy]