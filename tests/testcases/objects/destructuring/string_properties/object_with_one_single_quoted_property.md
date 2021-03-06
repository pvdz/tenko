# Tenko parser test case

- Path: tests/testcases/objects/destructuring/string_properties/object_with_one_single_quoted_property.md

> :: objects : destructuring : string properties
>
> ::> object with one single quoted property

## Input

`````js
wrap({'a':b}=obj);
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
  loc:{start:{line:1,column:0},end:{line:1,column:18},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:18},source:''},
      expression: {
        type: 'CallExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:17},source:''},
        optional: false,
        callee: {
          type: 'Identifier',
          loc:{start:{line:1,column:0},end:{line:1,column:4},source:''},
          name: 'wrap'
        },
        arguments: [
          {
            type: 'AssignmentExpression',
            loc:{start:{line:1,column:5},end:{line:1,column:16},source:''},
            left: {
              type: 'ObjectPattern',
              loc:{start:{line:1,column:5},end:{line:1,column:12},source:''},
              properties: [
                {
                  type: 'Property',
                  loc:{start:{line:1,column:6},end:{line:1,column:11},source:''},
                  key: {
                    type: 'Literal',
                    loc:{start:{line:1,column:6},end:{line:1,column:9},source:''},
                    value: 'a',
                    raw: "'a'"
                  },
                  kind: 'init',
                  method: false,
                  computed: false,
                  value: {
                    type: 'Identifier',
                    loc:{start:{line:1,column:10},end:{line:1,column:11},source:''},
                    name: 'b'
                  },
                  shorthand: false
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              loc:{start:{line:1,column:13},end:{line:1,column:16},source:''},
              name: 'obj'
            }
          }
        ]
      }
    }
  ]
}

tokens (12x):
       IDENT PUNC_PAREN_OPEN PUNC_CURLY_OPEN STRING_SINGLE PUNC_COLON
       IDENT PUNC_CURLY_CLOSE PUNC_EQ IDENT PUNC_PAREN_CLOSE PUNC_SEMI
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
wrap(({'a':b} = obj));
````

Produces same AST
