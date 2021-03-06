# Tenko parser test case

- Path: tests/testcases/objects/duplicate_keys/obj_expr/dunderproto___proto__/async_call_wrapped_is_explicitly_exempted.md

> :: objects : duplicate keys : obj expr : dunderproto proto
>
> ::> async call wrapped is explicitly exempted
>
> rule does not applying when parsing potential async arrow
> 
> https://tc39.github.io/ecma262/#sec-__proto__-property-names-in-object-initializers
> 
> > It is a Syntax Error if PropertyNameList of PropertyDefinitionList contains any duplicate entries for "__proto__" and at least two of those entries were obtained from productions of the form PropertyDefinition:PropertyName:AssignmentExpression .
> 
> This restriction only applies to webcompat mode (annex B)

## Input

`````js
async({ __proto__: x, __proto__: y});
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
  loc:{start:{line:1,column:0},end:{line:1,column:37},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:37},source:''},
      expression: {
        type: 'CallExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:36},source:''},
        optional: false,
        callee: {
          type: 'Identifier',
          loc:{start:{line:1,column:0},end:{line:1,column:5},source:''},
          name: 'async'
        },
        arguments: [
          {
            type: 'ObjectExpression',
            loc:{start:{line:1,column:6},end:{line:1,column:35},source:''},
            properties: [
              {
                type: 'Property',
                loc:{start:{line:1,column:8},end:{line:1,column:20},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:8},end:{line:1,column:17},source:''},
                  name: '__proto__'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:19},end:{line:1,column:20},source:''},
                  name: 'x'
                },
                shorthand: false
              },
              {
                type: 'Property',
                loc:{start:{line:1,column:22},end:{line:1,column:34},source:''},
                key: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:22},end:{line:1,column:31},source:''},
                  name: '__proto__'
                },
                kind: 'init',
                method: false,
                computed: false,
                value: {
                  type: 'Identifier',
                  loc:{start:{line:1,column:33},end:{line:1,column:34},source:''},
                  name: 'y'
                },
                shorthand: false
              }
            ]
          }
        ]
      }
    }
  ]
}

tokens (14x):
       ID_async PUNC_PAREN_OPEN PUNC_CURLY_OPEN IDENT PUNC_COLON IDENT
       PUNC_COMMA IDENT PUNC_COLON IDENT PUNC_CURLY_CLOSE
       PUNC_PAREN_CLOSE PUNC_SEMI
`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Group contained a value that must destruct but this was not an arrow so it is invalid

start@1:0, error@1:5
╔══╦════════════════
 1 ║ async({ __proto__: x, __proto__: y});
   ║      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^------- error
╚══╩════════════════

`````

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode with annexB._

## AST Printer

Printer output different from input [sloppy][annexb:no]:

````js
async({__proto__:x, __proto__:y});
````

Produces same AST
