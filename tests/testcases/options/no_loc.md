# Tenko parser test case

- Path: tests/testcases/options/no_loc.md

> :: options
>
> ::> no loc
>
> Simple test to confirm the nodeRange option works at all

Input is an arbitrary snippet.

## Input

- `locationTracking = false`

`````js
foo.bar.baz;

let parentNode = _path[_path.length - 1];

let p = parentNode[astProp];
if (Array.isArray(p)) {
  p[p.length] = node;
}
else {
  ASSERT(p === undefined, `(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array`, astProp, p && p.type);
  parentNode[astProp] = node;
}
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
  loc:{start:{line:1,column:0},end:{line:12,column:1},source:''},
  body: [
    {
      type: 'ExpressionStatement',
      loc:{start:{line:1,column:0},end:{line:1,column:12},source:''},
      expression: {
        type: 'MemberExpression',
        loc:{start:{line:1,column:0},end:{line:1,column:11},source:''},
        computed: false,
        optional: false,
        object: {
          type: 'MemberExpression',
          loc:{start:{line:1,column:0},end:{line:1,column:7},source:''},
          computed: false,
          optional: false,
          object: {
            type: 'Identifier',
            loc:{start:{line:1,column:0},end:{line:1,column:3},source:''},
            name: 'foo'
          },
          property: {
            type: 'Identifier',
            loc:{start:{line:1,column:4},end:{line:1,column:7},source:''},
            name: 'bar'
          }
        },
        property: {
          type: 'Identifier',
          loc:{start:{line:1,column:8},end:{line:1,column:11},source:''},
          name: 'baz'
        }
      }
    },
    {
      type: 'VariableDeclaration',
      loc:{start:{line:3,column:0},end:{line:3,column:41},source:''},
      kind: 'let',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:3,column:4},end:{line:3,column:40},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:3,column:4},end:{line:3,column:14},source:''},
            name: 'parentNode'
          },
          init: {
            type: 'MemberExpression',
            loc:{start:{line:3,column:17},end:{line:3,column:40},source:''},
            computed: true,
            optional: false,
            object: {
              type: 'Identifier',
              loc:{start:{line:3,column:17},end:{line:3,column:22},source:''},
              name: '_path'
            },
            property: {
              type: 'BinaryExpression',
              loc:{start:{line:3,column:23},end:{line:3,column:39},source:''},
              left: {
                type: 'MemberExpression',
                loc:{start:{line:3,column:23},end:{line:3,column:35},source:''},
                computed: false,
                optional: false,
                object: {
                  type: 'Identifier',
                  loc:{start:{line:3,column:23},end:{line:3,column:28},source:''},
                  name: '_path'
                },
                property: {
                  type: 'Identifier',
                  loc:{start:{line:3,column:29},end:{line:3,column:35},source:''},
                  name: 'length'
                }
              },
              operator: '-',
              right: {
                type: 'Literal',
                loc:{start:{line:3,column:38},end:{line:3,column:39},source:''},
                value: 1,
                raw: '1'
              }
            }
          }
        }
      ]
    },
    {
      type: 'VariableDeclaration',
      loc:{start:{line:5,column:0},end:{line:5,column:28},source:''},
      kind: 'let',
      declarations: [
        {
          type: 'VariableDeclarator',
          loc:{start:{line:5,column:4},end:{line:5,column:27},source:''},
          id: {
            type: 'Identifier',
            loc:{start:{line:5,column:4},end:{line:5,column:5},source:''},
            name: 'p'
          },
          init: {
            type: 'MemberExpression',
            loc:{start:{line:5,column:8},end:{line:5,column:27},source:''},
            computed: true,
            optional: false,
            object: {
              type: 'Identifier',
              loc:{start:{line:5,column:8},end:{line:5,column:18},source:''},
              name: 'parentNode'
            },
            property: {
              type: 'Identifier',
              loc:{start:{line:5,column:19},end:{line:5,column:26},source:''},
              name: 'astProp'
            }
          }
        }
      ]
    },
    {
      type: 'IfStatement',
      loc:{start:{line:6,column:0},end:{line:12,column:1},source:''},
      test: {
        type: 'CallExpression',
        loc:{start:{line:6,column:4},end:{line:6,column:20},source:''},
        optional: false,
        callee: {
          type: 'MemberExpression',
          loc:{start:{line:6,column:4},end:{line:6,column:17},source:''},
          computed: false,
          optional: false,
          object: {
            type: 'Identifier',
            loc:{start:{line:6,column:4},end:{line:6,column:9},source:''},
            name: 'Array'
          },
          property: {
            type: 'Identifier',
            loc:{start:{line:6,column:10},end:{line:6,column:17},source:''},
            name: 'isArray'
          }
        },
        arguments: [
          {
            type: 'Identifier',
            loc:{start:{line:6,column:18},end:{line:6,column:19},source:''},
            name: 'p'
          }
        ]
      },
      consequent: {
        type: 'BlockStatement',
        loc:{start:{line:6,column:22},end:{line:8,column:1},source:''},
        body: [
          {
            type: 'ExpressionStatement',
            loc:{start:{line:7,column:2},end:{line:7,column:21},source:''},
            expression: {
              type: 'AssignmentExpression',
              loc:{start:{line:7,column:2},end:{line:7,column:20},source:''},
              left: {
                type: 'MemberExpression',
                loc:{start:{line:7,column:2},end:{line:7,column:13},source:''},
                computed: true,
                optional: false,
                object: {
                  type: 'Identifier',
                  loc:{start:{line:7,column:2},end:{line:7,column:3},source:''},
                  name: 'p'
                },
                property: {
                  type: 'MemberExpression',
                  loc:{start:{line:7,column:4},end:{line:7,column:12},source:''},
                  computed: false,
                  optional: false,
                  object: {
                    type: 'Identifier',
                    loc:{start:{line:7,column:4},end:{line:7,column:5},source:''},
                    name: 'p'
                  },
                  property: {
                    type: 'Identifier',
                    loc:{start:{line:7,column:6},end:{line:7,column:12},source:''},
                    name: 'length'
                  }
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                loc:{start:{line:7,column:16},end:{line:7,column:20},source:''},
                name: 'node'
              }
            }
          }
        ]
      },
      alternate: {
        type: 'BlockStatement',
        loc:{start:{line:9,column:5},end:{line:12,column:1},source:''},
        body: [
          {
            type: 'ExpressionStatement',
            loc:{start:{line:10,column:2},end:{line:10,column:147},source:''},
            expression: {
              type: 'CallExpression',
              loc:{start:{line:10,column:2},end:{line:10,column:146},source:''},
              optional: false,
              callee: {
                type: 'Identifier',
                loc:{start:{line:10,column:2},end:{line:10,column:8},source:''},
                name: 'ASSERT'
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  loc:{start:{line:10,column:9},end:{line:10,column:24},source:''},
                  left: {
                    type: 'Identifier',
                    loc:{start:{line:10,column:9},end:{line:10,column:10},source:''},
                    name: 'p'
                  },
                  operator: '===',
                  right: {
                    type: 'Identifier',
                    loc:{start:{line:10,column:15},end:{line:10,column:24},source:''},
                    name: 'undefined'
                  }
                },
                {
                  type: 'TemplateLiteral',
                  loc:{start:{line:10,column:26},end:{line:10,column:123},source:''},
                  expressions: [],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      loc:{start:{line:10,column:27},end:{line:10,column:122},source:''},
                      tail: true,
                      value: {
                        raw: '(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array',
                        cooked: '(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array'
                      }
                    }
                  ]
                },
                {
                  type: 'Identifier',
                  loc:{start:{line:10,column:125},end:{line:10,column:132},source:''},
                  name: 'astProp'
                },
                {
                  type: 'LogicalExpression',
                  loc:{start:{line:10,column:134},end:{line:10,column:145},source:''},
                  left: {
                    type: 'Identifier',
                    loc:{start:{line:10,column:134},end:{line:10,column:135},source:''},
                    name: 'p'
                  },
                  operator: '&&',
                  right: {
                    type: 'MemberExpression',
                    loc:{start:{line:10,column:139},end:{line:10,column:145},source:''},
                    computed: false,
                    optional: false,
                    object: {
                      type: 'Identifier',
                      loc:{start:{line:10,column:139},end:{line:10,column:140},source:''},
                      name: 'p'
                    },
                    property: {
                      type: 'Identifier',
                      loc:{start:{line:10,column:141},end:{line:10,column:145},source:''},
                      name: 'type'
                    }
                  }
                }
              ]
            }
          },
          {
            type: 'ExpressionStatement',
            loc:{start:{line:11,column:2},end:{line:11,column:29},source:''},
            expression: {
              type: 'AssignmentExpression',
              loc:{start:{line:11,column:2},end:{line:11,column:28},source:''},
              left: {
                type: 'MemberExpression',
                loc:{start:{line:11,column:2},end:{line:11,column:21},source:''},
                computed: true,
                optional: false,
                object: {
                  type: 'Identifier',
                  loc:{start:{line:11,column:2},end:{line:11,column:12},source:''},
                  name: 'parentNode'
                },
                property: {
                  type: 'Identifier',
                  loc:{start:{line:11,column:13},end:{line:11,column:20},source:''},
                  name: 'astProp'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                loc:{start:{line:11,column:24},end:{line:11,column:28},source:''},
                name: 'node'
              }
            }
          }
        ]
      }
    }
  ]
}

tokens (74x):
       IDENT PUNC_DOT IDENT PUNC_DOT IDENT PUNC_SEMI ID_let IDENT
       PUNC_EQ IDENT PUNC_BRACKET_OPEN IDENT PUNC_DOT IDENT PUNC_MIN
       NUMBER_DEC PUNC_BRACKET_CLOSE PUNC_SEMI ID_let IDENT PUNC_EQ
       IDENT PUNC_BRACKET_OPEN IDENT PUNC_BRACKET_CLOSE PUNC_SEMI
       ID_if PUNC_PAREN_OPEN IDENT PUNC_DOT IDENT PUNC_PAREN_OPEN
       IDENT PUNC_PAREN_CLOSE PUNC_PAREN_CLOSE PUNC_CURLY_OPEN IDENT
       PUNC_BRACKET_OPEN IDENT PUNC_DOT IDENT PUNC_BRACKET_CLOSE
       PUNC_EQ IDENT PUNC_SEMI PUNC_CURLY_CLOSE ID_else
       PUNC_CURLY_OPEN IDENT PUNC_PAREN_OPEN IDENT PUNC_EQ_EQ_EQ IDENT
       PUNC_COMMA TICK_PURE PUNC_COMMA IDENT PUNC_COMMA IDENT
       PUNC_AND_AND IDENT PUNC_DOT IDENT PUNC_PAREN_CLOSE PUNC_SEMI
       IDENT PUNC_BRACKET_OPEN IDENT PUNC_BRACKET_CLOSE PUNC_EQ IDENT
       PUNC_SEMI PUNC_CURLY_CLOSE
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
foo.bar.baz;
let parentNode = _path[_path.length - 1];
let p = parentNode[astProp];
if (Array.isArray(p)) {p[p.length] = node;} else {ASSERT(p === undefined, `(this invariant does not hold without ASSERTs!) parentNode[astProp] should be empty or an array`, astProp, (p && p.type));
parentNode[astProp] = node;}
````

Produces same AST
