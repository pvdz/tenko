// Transform the AST to optimize things away at build time
// Will change the given AST inline.

// Not that it matters much but the invariant is that each transform only has access to/can mutate the direct parent.
// So in theory transformations should be safe to apply in parallel as long as a node is not an active parent of a
// currently visited node in a parallel transform.

import {
  walker
} from '../src/tools/walker.mjs';

const SCRUB_OTHERS = process.argv.includes('--no-compat'); // force all occurrences of compatAcorn and compatBabel to false
const SCRUB_ERRORS = process.argv.includes('--strip-errors'); // strip error message contents (wip)
const NATIVE_SYMBOLS = process.argv.includes('--native-symbols'); // Replace `PERF_$` with `%`?
const NO_AST = process.argv.includes('--no-ast'); // drop ast related code from the parser (`AST_*`)

let strippedAssertNames = new Set;
let assertWhitelist = new Set([
  'ASSERT',
  'ASSERT_VALID',
  'ASSERT_FDS',
  'ASSERT_BINDING_TYPE',
  'ASSERT_LABELSET',
  'ASSERT_ASSIGN_EXPR',
  'ASSERT_BINDING_ORIGIN',
]);
let assertSkipWhitelist = new Set([
  'ASSERT_skip',
  'ASSERT_skipPeek',
  'ASSERT_skipRex',
  'ASSERT_skipDiv',
  'ASSERT_skipAny',
  'ASSERT_skipToParenOpenOrDie',
  'ASSERT_skipToParenOpenCurlyOpen',
  'ASSERT_skipToCurlyOpenOrDie',
  'ASSERT_skipToFromOrDie',
  'ASSERT_skipToStringOrDie',
  'ASSERT_skipToIdentOrDie',
  'ASSERT_skipToArrowOrDie',
  'ASSERT_skipToAsOrDie',
  'ASSERT_skipToAsCommaCurlyClose',
  'ASSERT_skipToAsCommaFrom',
  'ASSERT_skipToColonOrDie',
  'ASSERT_skipToTargetOrDie',
  'ASSERT_skipToStatementStart',
  'ASSERT_skipToExpressionStart',
  'ASSERT_skipToObjectMemberStart',
  'ASSERT_skipToObjectMemberRest',
  'ASSERT_skipToClassMemberStart',
  'ASSERT_skipToClassMemberRest',
  'ASSERT_skipToSwitchBody',
  'ASSERT_skipToBindingStart',
  'ASSERT_skipToBindingStartGrouped',
  'ASSERT_skipToColonParenOpen',
  'ASSERT_skipToIdentParenOpen',
  'ASSERT_skipToIdentStarParenOpen',
  'ASSERT_skipToIdentStarCurlyOpen',
  'ASSERT_skipToIdentCommaCurlyClose',
  'ASSERT_skipToCommaCurlyClose',
  'ASSERT_skipToIdentCurlyOpen',
  'ASSERT_skipToIdentCurlyClose',
  'ASSERT_skipToIdentStarCurlyOpenParenOpenString',
  'ASSERT_skipToAwaitParenOpen',
  'ASSERT_skipToIdentStringNumberSquareOpen',
  'ASSERT_skipToParamStart',
  'ASSERT_skipToExpressionStartSemi',
  'ASSERT_skipToExpressionStartGrouped',
  'ASSERT_skipToAfterNew',
  'ASSERT_skipToExpressionStartSquareCloseComma',
]);

let exportedSymbols = [
  'COLLECT_TOKENS_NONE',
  'COLLECT_TOKENS_SOLID',
  'COLLECT_TOKENS_ALL',
  'COLLECT_TOKENS_TYPES',

  'GOAL_MODULE',
  'GOAL_SCRIPT',

  'WEB_COMPAT_OFF',
  'WEB_COMPAT_ON',

  'VERSION_EXPONENTIATION',
  'VERSION_WHATEVER',
];

// Collect identifier names to inline
// This should contain all constants from specific files with the values they should replace
let constMap = new Map;
let recordingConstants = false;

let $flag_lf = 0;
let $flag_start = 0;
let $flag_leaf = 0;
let $flag_group = 7; // keep in sync with tokentype.js

function assert(a, b, d) {
  // This is an assert that can be dropped for a build... It confirms hashing assumptions
  // (Will also be an invaluable tool when adding a new node type ;)
  if (a !== b) throw new Error('Expected `' + b + '`, got `' + a + '`' + (d ? ': ' + d : ''));
}

function replace(parent, prop, index, node) {
  if (index === undefined) {
    parent[prop] = node;
  } else {
    parent[prop][index] = node;
  }
}
let n = 0
export function transform(ast, localConstMap, recordConstants) {
  constMap = localConstMap;
  recordingConstants = recordConstants;
  walker(ast, (node, parent, prop, index, _, revisits, $) => {
    switch (node.type) {
      case 'CallExpression':
        if (node.callee.type === 'Identifier') {
          let name = node.callee.name;
          if (name.startsWith('ASSERT')) {
            if (assertSkipWhitelist.has(name)) {
              // Remove the ASSERT prefix in the name, this function should already be defined as well
              // The first argument (some aspect of the token to skip we want to assert) must be dropped, too
              node.callee.name = name.slice('ASSERT_'.length);
              node.arguments.shift();
            } else {
              if (!strippedAssertNames.has(name)) {
                if (!assertWhitelist.has(name)) {
                  throw new Error('assert calls that can be dropped must be whitelisted to prevent accidentally dropping calls to new prefix-only asserts, `' + name + '` was not white listed');
                }
                console.log('Stripping', name);
                strippedAssertNames.add(name);
              }
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: 0,
                raw: '0',
              });
              return false;
            }
          }
        }
        break;

      case 'ExportAllDeclaration':
      case 'ExportDefaultDeclaration':
      case 'ExportNamedDeclaration':
        // Drop all import declarations
        replace(parent, prop, index, {
          type: 'EmptyStatement',
          loc: node.loc,
        });
        return false; // Prevent further traversal of the node

      case 'Identifier':
        if (
          // This check also just validates whether the ident is interesting to us at all, and we can ditch most node
        // type.prop validations because of it. Most but not all.
          constMap.has(node.name) &&
          // Exported symbols still have a const declaration
          (parent.type !== 'VariableDeclarator' || prop === 'init') &&
          // The `const x = dev() ? {X:1} : true` pattern causes this check to be necessary
          (parent.type !== 'Property' || prop !== 'key')
        ) {
          assert(
            ['FunctionDeclaration', 'VariableDeclarator', 'Property', 'ExportSpecifier', 'AssignmentExpression', 'ImportSpecifier'].includes(parent.type) &&
            !['Property.value', 'AssignmentExpression.right', 'VariableDeclarator.init'].includes(parent.type + '.' + prop),
            false,
            'constant names should be unique and not reused in awkward places: ' + parent.type + '.' + prop + ' -> ' + node.name
          );
          let constNode = constMap.get(node.name);
          replace(parent, prop, index, {
            type: 'Literal',
            loc: node.loc,
            value: 'das toch gek? ' + n++,
            raw: '0',
          });
          // $(constNode, {}, 'init');
          replace(parent, prop, index, constNode); // Note: this will share the locs. But who cares :D *cough*
          // return false;
        }
        break;

      case 'Import':
      case 'ImportDeclaration':
      case 'ImportNamespaceSpecifier':
        // Drop all import declarations
        replace(parent, prop, index, {
          type: 'EmptyStatement',
          loc: node.loc,
        });
        return false; // Prevent further traversal of the node

      case 'UpdateExpression':
        if (node.argument.type === 'Identifier') {
          switch (node.argument.name) {
            case '__$flag_lf':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: ++$flag_lf,
                raw: String($flag_lf),
              });
              break;
            case '__$flag_start':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: ++$flag_start,
                raw: String($flag_start),
              });
              break;
            case '__$flag_leaf':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: ++$flag_leaf,
                raw: String($flag_leaf),
              });
              break;
              case '__$flag_group':
                replace(parent, prop, index, {
                  type: 'Literal',
                  loc: node.loc,
                  value: ++$flag_group,
                  raw: String($flag_group),
                });
                break;
          }
        }
        break;
    }
  }, (node, parent, prop, index, _, revisits) => {
    switch (node.type) {
      case 'BinaryExpression':
        if (node.left.type === 'Literal' && node.right.type === 'Literal') {
          assert(typeof node.left.value, typeof node.right.value);
          switch (node.operator) {
            case '<<': {
              // console.log('Replacing', node.left.value, '<<', node.right.value)
              let v = node.left.value << node.right.value;
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: v,
                raw: String(v),
              });
              break;
            }
            case '|': {
              // console.log('Replacing', node.left.value, '|', node.right.value)
              let v = node.left.value | node.right.value;
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: v,
                raw: String(v),
              });
              break;
            }
            case '-': {
              // console.log('Replacing', node.left.value, '-', node.right.value)
              let v = node.left.value - node.right.value;
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: v,
                raw: String(v),
              });
              break;
            }
            case '+': {
              // console.log('Replacing', node.left.value, '+', node.right.value)
              let v = node.left.value + node.right.value;
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: v,
                raw: String(v),
              });
              break;
            }
            default:
              assert(0, 1, 'can optimize static binary expression on ' + node.operator);
              console.log('Skipping:', node.left.value, node.operator, node.right.value)
          }
        }
        break;

      case 'BlockStatement': {
        let body = node.body;

        // Don't visit the last element. We don't care if the return/* is the last statement.
        for (let i=0, len = body.length - 1; i<len; ++i) {
          if (body[i] && ['ReturnStatement', 'BreakStatement', 'ContinueStatement', 'ThrowStatement'].includes(body[i].type)) {
            // Prune dead code in a block that has statements following a `return` statement. This can happen due to
            // build artifacts or just development state.
            // We don't rely on stuff in the dead code (like eval or padding to prevent jit stuff) so get rid of it.
            body.length = i + 1; // Discard the rest
            break;
          }
        }

        // Drop all empty statements (useless semi colons) from blocks
        for (let i = body.length - 1; i >= 0; --i) {
          if (body[i] && body[i].type === 'EmptyStatement') {
            body.splice(i, 1);
          }
        }

        break;
      }

      // case 'BreakStatement':
      //   if (Array.isArray(parent[prop]) && parent[prop].length > index + 1) {
      //     // Prune dead code in a block that has statements following a `return` statement. This can happen due to
      //     // build artifacts or just development state.
      //     parent[prop].length = index + 1;
      //   }
      //   break;

      case 'CallExpression':
        if (node.callee.type === 'Identifier') {
          let name = node.callee.name;
          if (NO_AST) {
            if (name.startsWith('AST_') || name.startsWith('_AST_')) {
              let newNode = {
                type: 'Literal',
                loc: node.loc,
                value: 0,
                raw: '0',
              };
              if (index === undefined) {
                parent[prop] = newNode;
              } else {
                parent[prop][index] = newNode;
              }
            }
          } else { // not no_ast
            if (name === 'AST_close') {
              // AST_close(start, line, col, 'BlockStatement') -> AST_close(start, line, col), because the names are only used for assertions
              assert(node.arguments.length, 4); // [offset, line, col, node name(s) to close]
              node.arguments.pop(); // Drop the name(s); it's for debugging only
            }
          }

          switch (name) {
            case 'DEVONLY':
              // Scrub `dev()` branching
              // console.log(revisits, 'Drop DEVONLY')
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: 0,
                raw: '0',
              });
              break;
            case 'sansFlag':
              // Clear bits in a that are set in b: a & ~b (Note: that is same as `(a | b) ^ b)`)
              replace(parent, prop, index, {
                type: 'BinaryExpression',
                left: node.arguments[0],
                operator: '&',
                right: {
                  type: 'UnaryExpression',
                  operator: '~',
                  prefix: true,
                  argument: node.arguments[1],
                },
              });
              // Revisit this node because if both arguments are literals then we can fold them up now
              return true;
            case 'hasAllFlags':
              // Basically an alias for `(flags1 & flags2) === flags2`, to check whether at least all bits in b are set in a
              // return '((' + $w(node.arguments[0]) + ' & ' + $w(node.arguments[1]) + ') === ' + $w(node.arguments[1]) + ')';
              // console.log(revisits, 'Inline hasAllFlags', node.arguments[0].type, node.arguments[1].type);
              replace(parent, prop, index, {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: node.arguments[0],
                  operator: '&',
                  right: node.arguments[1],
                },
                operator: '===',
                right: node.arguments[1],
              });
              // Revisit this node because if both arguments are literals then we can fold them up now
              return true;
            case 'hasAnyFlag':
              // Basically an alias for `(flags1 & flags2) === flags2`, to check whether at least one bit in b is set in a
              // return '((' + $w(node.arguments[0]) + ' & ' + $w(node.arguments[1]) + ') !== 0)';
              // console.log(revisits, 'Inline hasAnyFlag', node.arguments[0].type, node.arguments[1].type);
              replace(parent, prop, index, {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: node.arguments[0],
                  operator: '&',
                  right: node.arguments[1],
                },
                operator: '!==',
                right: {
                  type: 'Literal',
                  loc: node.loc,
                  value: 0,
                  raw: '0',
                },
              });
              // Revisit this node because if both arguments are literals then we can fold them up now
              return true;
            case 'hasNoFlag':
              // Basically an alias for `(flags1 & flags2) === 0`, to check whether none of the bits in b is set in a
              // return '((' + $w(node.arguments[0]) + ' & ' + $w(node.arguments[1]) + ') === 0)';
              // console.log(revisits, 'Inline hasNoFlag', node.arguments[0].type, node.arguments[1].type);
              replace(parent, prop, index, {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: node.arguments[0],
                  operator: '&',
                  right: node.arguments[1],
                },
                operator: '===',
                right: {
                  type: 'Literal',
                  loc: node.loc,
                  value: 0,
                  raw: '0',
                },
              });
              // Revisit this node because if both arguments are literals then we can fold them up now
              return true;
          }
        }
        break;

      case 'ConditionalExpression':
        if (node.test.type === 'Literal') {
          // console.log(revisits, 'Dropping ternary with condition on', node.test.value);
          replace(parent, prop, index, node.test.value ? node.consequent : node.alternate);
        }
        break;

      case 'ExpressionStatement':
        if (node.expression.type === 'Literal' && node.expression.value !== 'use strict') { // Could probably drop the strict check, but I guess it can't hurt
          replace(parent, prop, index, {
            type: 'EmptyStatement',
            loc: node.loc,
          });
        }
        break;

      case 'FunctionDeclaration':
        if (node.id && node.id.type === 'Identifier') {
          if (node.id.name.startsWith('ASSERT') || (!NATIVE_SYMBOLS && node.id.name.startsWith('PERF_')) || (NO_AST && (node.id.name.startsWith('AST_') || node.id.name.startsWith('_AST_')))) {
            replace(parent, prop, index, {
              type: 'EmptyStatement',
              loc: node.loc,
            });
          } else if (node.id.name === 'AST_close') {
            assert(node.params.length, 4, 'ast_close has 4 params');
            node.params.pop(); // drop the name; it is only used in ASSERTs
          }

          // Note: the next func->arrow transform slows down load time and probably a micro slower runtime. Not worth it
          // // Replace function decls with arrows.
          // // Going the extra mile for arrows that can get expression bodies
          // // Going the extra extra mile (potentially slightly unsafe) by giving expressionstatements the same treatment
          // replace(parent, prop, index, {
          //   type: 'VariableDeclaration',
          //   loc: node.loc,
          //   kind: 'let',
          //   declarations: [{
          //     type: 'VariableDeclarator',
          //     id: node.id,
          //     loc: node.loc,
          //     init: {
          //       type: 'ArrowFunctionExpression',
          //       loc: node.loc,
          //       params: node.params,
          //       id: null,
          //       generator: node.generator,
          //       async: node.async,
          //       expression: node.body.body.length === 1 && (node.body.body[0].type === 'ReturnStatement' || node.body.body[0].type === 'ExpressionStatement'), // single return? change to expression body
          //       body: (node.body.body.length === 1 && node.body.body[0].type === 'ReturnStatement') ? node.body.body[0].argument : (node.body.body.length === 1 && node.body.body[0].type === 'ExpressionStatement') ? node.body.body[0].expression : node.body, // inline the arg of a single return
          //     }
          //   }],
          // });
        }
        break;

      case 'Identifier':
        if (SCRUB_OTHERS) {
          // Skip property names otherwise you'll get `{false: false}` which is an error in destructuring assignments
          if (parent.type !== 'Property' && (node.name === 'babelCompat' || node.name === 'acornCompat')) {
            replace(parent, prop, index, {
              type: 'Literal',
              loc: node.loc,
              value: false,
              raw: 'false',
            });
          }

          // Replace all `undefined` with `void 0`
          // if (node.name == 'undefined') {
          //   replace(parent, prop, index, {
          //     type: 'UnaryExpression',
          //     operator: 'void',
          //     argument: {
          //       type: 'Literal',
          //       loc: node.loc,
          //       value: 0,
          //       raw: '0',
          //     }
          //   })
          // }
        }

        break;

      case 'IfStatement':
        if (node.test.type === 'Literal') {
          if (node.test.value) {
            replace(parent, prop, index, node.consequent);
          } else {
            if (node.alternate) {
              replace(parent, prop, index, node.alternate);
            } else {
              replace(parent, prop, index, {
                type: 'EmptyStatement',
                loc: node.loc,
              });
            }
          }
        }

        break;

      case 'Program': {
        let body = node.body;

        // Drop all empty statements (useless semi colons) from blocks
        for (let i = body.length - 1; i >= 0; --i) {
          if (body[i] && body[i].type === 'EmptyStatement') {
            body.splice(i, 1);
          }
        }

        break;
      }

      case 'SequenceExpression': {
        // Note: everything except the last element is fair game. Side-effect free expressions should be dropped.
        // (And we assume old invariants still hold; no getters/setters, no proxies, etc. No underwater footguns.)
        for (let i = node.expressions.length - 2; i >= 0; --i) {
          if (node.expressions[i].type === 'Literal') { // Could probably drop the strict check, but I guess it can't hurt
            node.expressions.splice(i, 1);
          }
        }
        // Note: there's no real need to drop the node. There's always at least one element (the last one, the actual value
        // that wouldn't be safe to touch), and the serialization of one element is the same as if without the node.
        // However, we do anyways because heuristics may not take a single-element sequence into account (after all,
        // that _is_ an artifact that one wouldn't find in real ASTs)
        if (node.expressions.length === 1) {
          replace(parent, prop, index, node.expressions[0]);
        }
        break;
      }

      case 'UnaryExpression':
        if (node.argument.type === 'Literal') {
          switch (node.operator) {
            case '!':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: !node.argument.value,
                raw: String(!node.argument.value),
              });
              break;
            case '~':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: ~node.argument.value,
                raw: String(~node.argument.value),
              });
              break;
            case 'typeof':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: typeof node.argument.value,
                raw: String(typeof node.argument.value),
              });
              break;
            case '-':
              // Note: `-5` is in theory the unary operator `-` with the number `5`. Don't bother with that case.
              if (typeof node.argument.value !== 'number') {
                replace(parent, prop, index, {
                  type: 'Literal',
                  loc: node.loc,
                  value: - node.argument.value,
                  raw: String(- node.argument.value),
                });
              }
              break;
            case '+':
              replace(parent, prop, index, {
                type: 'Literal',
                loc: node.loc,
                value: + node.argument.value,
                raw: String(+ node.argument.value),
              });
              break;
            default:
              assert(0, 1, 'can optimize static unary expression on ' + node.operator);
          }
        }
        break;

      case 'VariableDeclaration':
        assert(node.declarations.length, 1, 'coding style uses only one binding per declaration (counting a whole destructuring as one) `' + (node.declarations.length !== 1 && (node.kind + ' ' + node.declarations.map(d => d.id.type === 'Identifier' ? d.id.name : d.id.type).join(', '))) + '`');
        let decl = node.declarations[0];
        if (decl.id.type === 'Identifier') assert(constMap.has(decl.id.name), false, 'constants should not be redefined for: ' + decl.id.name);
        if (recordingConstants && node.kind === 'const' && decl.id.type === 'Identifier') {
          assert(parent.nodeType !== 'ForInStatement' && parent.nodeType !== 'ForOfStatement' && parent.nodeType !== 'ForStatement', true, 'files from which constants are recorded would not use const inside a for-header');
          let name = decl.id.name;
          constMap.set(name, decl.init); // All constants must have an init as per spec
          // console.log('Sub-walk on constant init:', name, decl.init)
          // $(decl.init, node, 'init');
          // console.log('End of sub-walk on constant init:')
          if (!exportedSymbols.includes(name)) {
            console.log('Scrubbing the constant for', name);
            // Only remove declarations that are not exported. We still inline the exported symbols, but also need
            // their name to exist for the export template, so leave them.
            replace(parent, prop, index, {
              type: 'EmptyStatement',
              loc: node.loc,
            });
            // return false;
          }
        }
        break;
    }
  });
}
