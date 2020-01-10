# Tenko parser test case

- Path: tests/testcases/for_statement/for-in/web_compat/comma_expression_right_of_60in60.md

> :: for statement : for-in : web compat
>
> ::> comma expression right of 60in60
>
> (not legacy but sanity check in this set. the rhs of `for-in` is a regular Expression node which have a comma)
> 
> https://tc39.github.io/ecma262/#sec-iteration-statements
> 
> - for ( var ForBinding[?Yield, ?Await] in Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
> 
> https://tc39.github.io/ecma262/#sec-initializers-in-forin-statement-heads
> 
> The following augments the IterationStatement;
> 
> - IterationStatement[Yield, Await, Return]:
>   - for ( var BindingIdentifier[?Yield, ?Await] Initializer[~In, ?Yield, ?Await] in Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]
> 
> (note that Expression also has comma-expression, there is no "Expressions" production)

## Input

`````js
for (var a in stored = a, {a: 0, b: 1, c: 2});
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
  loc:{start:{line:1,column:0},end:{line:1,column:46},source:''},
  body: [
    {
      type: 'ForInStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:46},source:''},
      left: {
        type: 'VariableDeclaration',
        loc:{start:{line:1,column:5},end:{line:1,column:10},source:''},
        kind: 'var',
        declarations: [
          {
            type: 'VariableDeclarator',
            loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
            id: {
              type: 'Identifier',
              loc:{start:{line:1,column:9},end:{line:1,column:10},source:''},
              name: 'a'
            },
            init: null
          }
        ]
      },
      right: {
        type: 'SequenceExpression',
        loc:{start:{line:1,column:14},end:{line:1,column:44},source:''},
        expressions: [
          {
            type: 'AssignmentExpression',
            loc:{start:{line:1,column:14},end:{line:1,column:24},source:''},
            left: {
              type: 'Identifier',
              loc:{start:{line:1,column:14},end:{line:1,column:20},source:''},
              name: 'stored'
            },
            operator: '=',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:23},end:{line:1,column:24},source:''},
              name: 'a'
            }
          },
          {
            type: 'ObjectExpression',
            loc:{start:{line:1,column:26},end:{line:1,column:44},source:''},
            properties: [
              {
                type: 'Property',
                loc:{start:{line:1,column:27},end:{line:1,column:31},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:27},end:{line:1,column:28},source:''},
                  name: 'a'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Literal',
                  loc:{start:{line:1,column:30},end:{line:1,column:31},source:''},
                  value: 0,
                  raw: '0'
                },
                shorthand: false
              },
              {
                type: 'Property',
                loc:{start:{line:1,column:33},end:{line:1,column:37},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:33},end:{line:1,column:34},source:''},
                  name: 'b'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Literal',
                  loc:{start:{line:1,column:36},end:{line:1,column:37},source:''},
                  value: 1,
                  raw: '1'
                },
                shorthand: false
              },
              {
                type: 'Property',
                loc:{start:{line:1,column:39},end:{line:1,column:43},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:39},end:{line:1,column:40},source:''},
                  name: 'c'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Literal',
                  loc:{start:{line:1,column:42},end:{line:1,column:43},source:''},
                  value: 2,
                  raw: '2'
                },
                shorthand: false
              }
            ]
          }
        ]
      },
      body: {
        type: 'EmptyStatement',
        loc:{start:{line:1,column:45},end:{line:1,column:46},source:''}
      }
    }
  ]
}

tokens (25x):
       ID_for PUNC_PAREN_OPEN ID_var IDENT ID_in IDENT PUNC_EQ IDENT
       PUNC_COMMA PUNC_CURLY_OPEN IDENT PUNC_COLON NUMBER_DEC
       PUNC_COMMA IDENT PUNC_COLON NUMBER_DEC PUNC_COMMA IDENT
       PUNC_COLON NUMBER_DEC PUNC_CURLY_CLOSE PUNC_PAREN_CLOSE
       PUNC_SEMI
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
for (var a in (stored = a, {a:0, b:1, c:2})) ;
````

Produces same AST