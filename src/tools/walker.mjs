// Walk the entire AST
// The walker is tested in the test runner to assert it visits every node, and that it visits each once and only once.

// You can call the walker with a `before` or `after` callback. The `before` callback can return `false` to prevent
// visiting this node. The `after` callback can return `true` to re-visit this node. A re-visit will trigger the before
// and after again. In case it matters; the last return value of the visit of the node is propagated back in the walker.
//
// Api (before and after are the same api):
// ```
// walker(ast, function callback(node, parent, prop, index, afterVisit, revisit) {}, callback, $);
// ```
// - node: the node about to or that has been visited
// - parent: parent node that contained this node (or contains the array containing this node)
// - prop: parent[prop]===node or parent[prop][index]===node (if an array contains this node)
// - index: if this node was found in an array, this will be the index of node in that array. Otherwise undefined
// - afterVisit: is this the call before or after visiting node?
// - revisit: how often has this node been re-visited? Starts at 0 (before and after), increments for each re-visit.
// - $: manually visit a sub-tree of the AST. You're on your own here. Certain nvariants may seize to hold.

import {
  $$A_61, $$A_UC_41,
  $$B_62, $$B_UC_42, $$C_UC_43,
  $$D_64, $$D_UC_44,
  $$E_65, $$E_UC_45, $$G_67, $$H_68,
  $$I_69,
  $$I_UC_49,
  $$L_6C, $$L_UC_4C,
  $$M_6D, $$N_UC_4E,
  $$O_6F, $$O_UC_4F,
  $$P_70,
  $$R_72,
  $$S_73, $$S_UC_53, $$T_74,
  $$U_75, $$W_77, $$X_78
} from "../charcodes.mjs";

function assert(a, b) {
  // This is an assert that can be dropped for a build... It confirms hashing assumptions
  // (Will also be an invaluable tool when adding a new node type ;)
  if (a !== b) throw new Error('Expected `' + b + '`, got `' + a + '`');
}

function ArrayExpression(node, parent, prop, index) {
  assert(node.type, 'ArrayExpression');
  node.elements.forEach((n, i) => n !== null && $(n, node, 'elements', i));
}
function ArrayPattern(node, parent, prop, index) {
  assert(node.type, 'ArrayPattern');
  node.elements.forEach((n, i) => n !== null && $(n, node, 'elements', i));
}
function ArrowFunctionExpression(node, parent, prop, index) {
  assert(node.type, 'ArrowFunctionExpression');
  node.params.forEach((e, i) => $(e, node, 'params', i));
  $(node.body, node, 'body');
}
function AssignmentExpression(node, parent, prop, index) {
  assert(node.type, 'AssignmentExpression');
  $(node.left, node, 'left');
  $(node.right, node, 'right');
}
function AssignmentPattern(node, parent, prop, index) {
  assert(node.type, 'AssignmentPattern');
  $(node.left, node, 'left');
  $(node.right, node, 'right');
}
function AwaitExpression(node, parent, prop, index) {
  assert(node.type, 'AwaitExpression');
  $(node.argument, node, 'argument');
}
function BigIntLiteral(node, parent, prop, index) {
  assert(node.type, 'BigIntLiteral');
}
function BinaryExpression(node, parent, prop, index) {
  assert(node.type, 'BinaryExpression');
  $(node.left, node, 'left');
  $(node.right, node, 'right');
}
function BlockStatement(node, parent, prop, index) {
  assert(node.type, 'BlockStatement');
  node.body.forEach((e, i) => $(e, node, 'body', i));
}
function BooleanLiteral(node, parent, prop, index) {
  assert(node.type, 'BooleanLiteral');
}
function BreakStatement(node, parent, prop, index) {
  assert(node.type, 'BreakStatement');
  if (node.label) $(node.label, node, 'label');
}
function CallExpression(node, parent, prop, index) {
  assert(node.type, 'CallExpression');
  node.arguments.forEach((e, i) => $(e, node, 'arguments', i));
  $(node.callee, node, 'callee');
}
function CatchClause(node, parent, prop, index) {
  assert(node.type, 'CatchClause');
  if (node.param) $(node.param, node, 'param');
  $(node.body, node, 'body');
}
function ClassBody(node, parent, prop, index) {
  assert(node.type, 'ClassBody');
  node.body.forEach((e, i) => $(e, node, 'body', i));
}
function ClassDeclaration(node, parent, prop, index) {
  assert(node.type, 'ClassDeclaration');
  if (node.id) $(node.id, node, 'id'); // Optional for default exports
  if (node.superClass) $(node.superClass, node, 'superClass');
  $(node.body, node, 'body');
}
function ClassExpression(node, parent, prop, index) {
  assert(node.type, 'ClassExpression');
  if (node.id) $(node.id, node, 'id');
  if (node.superClass) $(node.superClass, node, 'superClass')
  $(node.body, node, 'body');
}
function ClassMethod(node, parent, prop, index) {
  assert(node.type, 'ClassMethod');

  if (node.value === undefined) {
    assert('value' in node, false);
    // Babel does not have .value and merges the method node with the function node, different from the estree spec

    $(node.key, node, 'key');
    node.params.forEach((e, i) => $(e, node, 'params', i));
    $(node.body, node, 'body');
  } else {
    $(node.value, node, 'value');
    $(node.body, node, 'body');
  }
}
function ChainExpression(node, parent, prop, index) {
  assert(node.type, 'ChainExpression');
  $(node.expression, node, 'expression');
}
function CommentBlock(node, parent, prop, index) {
  assert(node.type, 'CommentBlock');
}
function CommentLine(node, parent, prop, index) {
  assert(node.type, 'CommentLine');
}
function ConditionalExpression(node, parent, prop, index) {
  assert(node.type, 'ConditionalExpression');
  $(node.test, node, 'test');
  $(node.consequent, node, 'consequent');
  $(node.alternate, node, 'alternate');
}
function ContinueStatement(node, parent, prop, index) {
  assert(node.type, 'ContinueStatement');
  if (node.label) $(node.label, node, 'label');
}
function DebuggerStatement(node, parent, prop, index) {
  assert(node.type, 'DebuggerStatement');
}
function Directive(node, parent, prop, index) {
  assert(node.type, 'Directive');
  $(node.value, node, 'value');
}
function DirectiveLiteral(node, parent, prop, index) {
  assert(node.type, 'DirectiveLiteral');
}
function DoWhileStatement(node, parent, prop, index) {
  assert(node.type, 'DoWhileStatement');
  $(node.body, node, 'body');
  $(node.test, node, 'test');
}
function EmptyStatement(node, parent, prop, index) {
  assert(node.type, 'EmptyStatement');
}
function ExportAllDeclaration(node, parent, prop, index) {
  assert(node.type, 'ExportAllDeclaration');
  $(node.source, node, 'source');
}
function ExportDefaultDeclaration(node, parent, prop, index) {
  assert(node.type, 'ExportDefaultDeclaration');
  $(node.declaration, node, 'declaration');
}
function ExportNamespaceSpecifier(node, parent, prop, index) {
  assert(node.type, 'ExportNamespaceSpecifier');
  $(node.exported, node, 'exported');
}
function ExportNamedDeclaration(node, parent, prop, index) {
  assert(node.type, 'ExportNamedDeclaration');
  if (node.specifiers) node.specifiers.forEach((e, i) => $(e, node, 'specifiers', i));
  if (node.declaration) $(node.declaration, node, 'declaration');
  if (node.source) $(node.source, node, 'source');
}
function ExportSpecifier(node, parent, prop, index) {
  assert(node.type, 'ExportSpecifier');
  $(node.local, node, 'local');
  $(node.exported, node, 'exported');
}
function ExpressionStatement(node, parent, prop, index) {
  assert(node.type, 'ExpressionStatement');
  $(node.expression, node, 'expression');
}
function ForInStatement(node, parent, prop, index) {
  assert(node.type, 'ForInStatement');
  $(node.left, node, 'left', undefined, true);
  $(node.right, node, 'right');
  $(node.body, node, 'body');
}
function ForOfStatement(node, parent, prop, index) {
  assert(node.type, 'ForOfStatement');
  $(node.left, node, 'left', undefined, true);
  $(node.right, node, 'right');
  $(node.body, node, 'body');
}
function ForStatement(node, parent, prop, index) {
  assert(node.type, 'ForStatement');
  if (node.init) $(node.init, node, 'init', undefined, true)
  if (node.test) $(node.test, node, 'test')
  if (node.update) $(node.update, node, 'update')
  $(node.body, node, 'body');
}
function FunctionDeclaration(node, parent, prop, index) {
  assert(node.type, 'FunctionDeclaration');
  if (node.id) $(node.id, node, 'id'); // Note: export default may cause this id to be undefined
  node.params.forEach((e, i) => $(e, node, 'params', i));
  $(node.body, node, 'body'); // TODO: may have to clarify that this is the block of a func decl...
}
function FunctionExpression(node, parent, prop, index) {
  assert(node.type, 'FunctionExpression');
  if (node.id) $(node.id, node, 'id');
  node.params.forEach((e, i) => $(e, node, 'params', i));
  $(node.body, node, 'body'); // TODO: may have to clarify that this is the block of a func expr...
}
function Identifier(node, parent, prop, index) {
  assert(node.type, 'Identifier');
}
function IfStatement(node, parent, prop, index) {
  assert(node.type, 'IfStatement');
  $(node.test, node, 'test');
  $(node.consequent, node, 'consequent');
  if (node.alternate) $(node.alternate, node, 'alternate');
}
function Import(node, parent, prop, index) {
  assert(node.type, 'Import');
}
function ImportDeclaration(node, parent, prop, index) {
  assert(node.type, 'ImportDeclaration');
  node.specifiers.forEach((e, i) => $(e, node, 'specifiers', i));
  if (node.source) $(node.source, node, 'source');
}
function ImportDefaultSpecifier(node, parent, prop, index) {
  assert(node.type, 'ImportDefaultSpecifier');
  $(node.local, node, 'local');
}
function ImportExpression(node, parent, prop, index) {
  assert(node.type, 'ImportExpression');
  node.arguments.forEach((e, i) => $(e, node, 'arguments', i));
}
function ImportNamespaceSpecifier(node, parent, prop, index) {
  assert(node.type, 'ImportNamespaceSpecifier');
  $(node.local, node, 'local');
}
function ImportSpecifier(node, parent, prop, index) {
  assert(node.type, 'ImportSpecifier');
  $(node.imported, node, 'imported')
  if (node.local) $(node.local, node, 'local');
}
function LabeledStatement(node, parent, prop, index) {
  assert(node.type, 'LabeledStatement');
  $(node.label, node, 'label');
  $(node.body, node, 'body');
}
function Literal(node, parent, prop, index) {
  assert(node.type, 'Literal');
  switch (typeof node.value) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'object': // regex
      return
  }
  throw new Error('fixme; literal type');
}
function LogicalExpression(node, parent, prop, index) {
  assert(node.type, 'LogicalExpression');
  $(node.left, node, 'left');
  $(node.right, node, 'right');
}
function MemberExpression(node, parent, prop, index) {
  assert(node.type, 'MemberExpression');
  $(node.object, node, 'object');
  $(node.property, node, 'property');
}
function MetaProperty(node, parent, prop, index) {
  assert(node.type, 'MetaProperty');
  $(node.meta, node, 'meta');
  $(node.property, node, 'property');
}
function MethodDefinition(node, parent, prop, index) {
  assert(node.type, 'MethodDefinition');
  $(node.key, node, 'key');
  $(node.value, node, 'value');
}
function NewExpression(node, parent, prop, index) {
  assert(node.type, 'NewExpression');
  $(node.callee, node, 'callee')
  node.arguments.forEach((e, i) => $(e, node, 'arguments', i));
}
function NullLiteral(node, parent, prop, index) {
  assert(node.type, 'NullLiteral');
}
function NumericLiteral(node, parent, prop, index) {
  assert(node.type, 'NumericLiteral');
}
function ObjectExpression(node, parent, prop, index) {
  assert(node.type, 'ObjectExpression');
  node.properties.forEach((e, i) => $(e, node, 'properties', i));
}
function ObjectMethod(node, parent, prop, index) {
  assert(node.type, 'ObjectMethod');
  if (node.value === undefined) {
    assert('value' in node, false);
    // Babel does not have .value and merges the method node with the function node, different from the estree spec
    $(node.key, node, 'key');
    node.params.forEach((e, i) => $(e, node, 'params', i));
    $(node.body, node, 'body');
  } else {
    $(node.value, node, 'value'); // TODO: clarify that this is coming from 'ObjectMethod'
  }
}
function ObjectPattern(node, parent, prop, index) {
  assert(node.type, 'ObjectPattern');
  node.properties.forEach((e, i) => $(e, node, 'properties', i));
}
function ObjectProperty(node, parent, prop, index) {
  assert(node.type, 'ObjectProperty');
  if (node.body) {
    // Babel
    // TODO: aren't there any other properties to visit?
    node.body.forEach((e, i) => $(e, node, 'body', i));
  } else {
    Property(node, parent, prop, index);
  }
}
function Program(node, parent, prop, index) {
  assert(node.type, 'Program');
  node.body.forEach((e, i) => $(e, node, 'body', i));
}
function Property(node, parent, prop, index) {
  assert(node.type === 'Property' || node.type === 'ObjectProperty', true);
  $(node.key, node, 'key');
  $(node.value, node, 'value');
}
function RegExpLiteral(node, parent, prop, index) {
  assert(node.type, 'RegExpLiteral');
}
function RestElement(node, parent, prop, index) {
  assert(node.type, 'RestElement');
  $(node.argument, node, 'argument');
}
function ReturnStatement(node, parent, prop, index) {
  assert(node.type, 'ReturnStatement');
  if (node.argument) $(node.argument, node, 'argument');
}
function SequenceExpression(node, parent, prop, index) {
  assert(node.type, 'SequenceExpression');
  node.expressions.forEach((e, i) => $(e, node, 'expressions', i));
}
function SpreadElement(node, parent, prop, index) {
  assert(node.type, 'SpreadElement');
  $(node.argument, node, 'argument');
}
function StringLiteral(node, parent, prop, index) {
  assert(node.type, 'StringLiteral');
}
function Super(node, parent, prop, index) {
  assert(node.type, 'Super');
}
function SwitchCase(node, parent, prop, index) {
  assert(node.type, 'SwitchCase');
  if (node.test) $(node.test, node, 'test');
  node.consequent.forEach((e, i) => $(e, node, 'consequent', i));
}
function SwitchStatement(node, parent, prop, index) {
  assert(node.type, 'SwitchStatement');
  $(node.discriminant, node, 'discriminant');
  node.cases.forEach((e, i) => $(e, node, 'cases', i));
}
function TaggedTemplateExpression(node, parent, prop, index) {
  assert(node.type, 'TaggedTemplateExpression');
  $(node.tag, node, 'tag');
  $(node.quasi, node, 'quasi');
}
function TemplateElement(node, parent, prop, index) {
  assert(node.type, 'TemplateElement');
}
function TemplateLiteral(node, parent, prop, index) {
  assert(node.type, 'TemplateLiteral');
  $(node.quasis[0], node, 'quasis', 0);
  node.expressions.forEach((e, i) => {
    $(e, node, 'expressions', i);
    // The number of quasi's (text part of a template) is always one more than the number of expressions, even if empty
    // So start with the first quasi, then after every expression also visit the quasi that must follow it
    // This basically zips it: quasi [expression quasi [expression quasi [...]]]
    $(node.quasis[i + 1], node, 'quasis', i + 1);
  });
}
function ThisExpression(node, parent, prop, index) {
  assert(node.type, 'ThisExpression');
}
function ThrowStatement(node, parent, prop, index) {
  assert(node.type, 'ThrowStatement');
  $(node.argument, node, 'argument');
}
function TryStatement(node, parent, prop, index) {
  assert(node.type, 'TryStatement');
  $(node.block, node, 'block');
  if (node.handler) $(node.handler, node, 'handler');
  if (node.finalizer) $(node.finalizer, node, 'finalizer');
}
function UnaryExpression(node, parent, prop, index) {
  assert(node.type, 'UnaryExpression');
  $(node.argument, node, 'argument');
}
function UpdateExpression(node, parent, prop, index) {
  assert(node.type, 'UpdateExpression');
  $(node.argument, node, 'argument');
}
function VariableDeclaration(node, parent, prop, index) {
  assert(node.type, 'VariableDeclaration');
  node.declarations.forEach((e, i) => $(e, node, 'declarations', i));
}
function VariableDeclarator(node, parent, prop, index) {
  assert(node.type, 'VariableDeclarator');
  $(node.id, node, 'id');
  if (node.init) $(node.init, node, 'init');
}
function WhileStatement(node, parent, prop, index) {
  assert(node.type, 'WhileStatement');
  $(node.test, node, 'test');
  $(node.body, node, 'body');
}
function WithStatement(node, parent, prop, index) {
  assert(node.type, 'WithStatement');
  $(node.object, node, 'object');
  $(node.body, node, 'body');
}
function YieldExpression(node, parent, prop, index) {
  assert(node.type, 'YieldExpression');
  if (node.argument) $(node.argument, node, 'argument');
}

let jumpTable = [
  (node, parent, prop, index, type, c) => {
    if (c === $$I_69) return Directive(node, parent, prop, index);
    if (c === $$X_78) {
      c = type.charCodeAt(6);
      if (c === $$D_UC_44) return ExportDefaultDeclaration(node, parent, prop, index);
      return ExportNamespaceSpecifier(node, parent, prop, index);
    }
    return UpdateExpression(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(3);
    if (c === $$L_6C) return BooleanLiteral(node, parent, prop, index);
    if (c === $$I_UC_49) return ForInStatement(node, parent, prop, index);
    if (c === $$O_UC_4F) return ForOfStatement(node, parent, prop, index);
    return UnaryExpression(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return AssignmentPattern(node, parent, prop, index);
    if (c === $$B_UC_42) return BlockStatement(node, parent, prop, index);
    return ImportSpecifier(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$A_61) return ClassExpression(node, parent, prop, index);
    if (c === $$M_6D) return CommentBlock(node, parent, prop, index);
    if (c === $$P_70) return EmptyStatement(node, parent, prop, index);
    return ForStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$G_67) return BigIntLiteral(node, parent, prop, index);
    if (c === $$M_6D) return CommentLine(node, parent, prop, index);
    return WithStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$R_72) return ArrowFunctionExpression(node, parent, prop, index);
    return ClassBody(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(4);
    if (c === $$T_74) return FunctionDeclaration(node, parent, prop, index);
    if (c === $$E_UC_45) return ThisExpression(node, parent, prop, index);
    if (c === $$W_77) return ThrowStatement(node, parent, prop, index);
    if (c === $$E_65) return WhileStatement(node, parent, prop, index);
    return YieldExpression(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$S_73) return AssignmentExpression(node, parent, prop, index);
    if (c === $$L_6C) return ClassMethod(node, parent, prop, index);
    if (c === $$H_68) return ChainExpression(node, parent, prop, index);
    return FunctionExpression(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$N_UC_4E) return NewExpression(node, parent, prop, index);
    return RegExpLiteral(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return MetaProperty(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(8);
    if (c === $$U_75) return CatchClause(node, parent, prop, index);
    if (c === $$A_61) return ReturnStatement(node, parent, prop, index);
    if (c === $$E_UC_45) return TemplateElement(node, parent, prop, index);
    return TemplateLiteral(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$X_78) return ExpressionStatement(node, parent, prop, index);
    return Import(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$X_78) return ExportAllDeclaration(node, parent, prop, index);
    return ObjectProperty(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return IfStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$X_78) return ExportNamedDeclaration(node, parent, prop, index);
    if (c === $$D_64) return Identifier(node, parent, prop, index);
    if (c === $$I_69) return Literal(node, parent, prop, index);
    if (c === $$B_62) return ObjectMethod(node, parent, prop, index);
    return RestElement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$A_61) return CallExpression(node, parent, prop, index);
    return ObjectPattern(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return Super(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return LabeledStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$B_62) return ObjectExpression(node, parent, prop, index);
    return VariableDeclaration(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return VariableDeclarator(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return DebuggerStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$P_70) return ImportNamespaceSpecifier(node, parent, prop, index);
    if (c === $$M_6D) return MemberExpression(node, parent, prop, index);
    if (c === $$T_74) return MethodDefinition(node, parent, prop, index);
    return Program(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    // (nothing)
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$X_78) return ExportSpecifier(node, parent, prop, index);
    return SequenceExpression(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return AwaitExpression(node, parent, prop, index);
    return SwitchStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$B_UC_42) return BinaryExpression(node, parent, prop, index);
    if (c === $$D_UC_44) return DirectiveLiteral(node, parent, prop, index);
    if (c === $$S_UC_53) return StringLiteral(node, parent, prop, index);
    return TaggedTemplateExpression(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$O_6F) return ConditionalExpression(node, parent, prop, index);
    return Property(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$M_6D) return ImportDefaultSpecifier(node, parent, prop, index);
    return NumericLiteral(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$R_72) return BreakStatement(node, parent, prop, index);
    if (c === $$L_6C) return ClassDeclaration(node, parent, prop, index);
    return ImportDeclaration(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    if (c === $$R_72) return ArrayExpression(node, parent, prop, index);
    if (c === $$M_6D) return ImportExpression(node, parent, prop, index);
    if (c === $$P_70) return SpreadElement(node, parent, prop, index);
    return SwitchCase(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return ArrayPattern(node, parent, prop, index);
    if (c === $$C_UC_43) return ContinueStatement(node, parent, prop, index);
    if (c === $$L_UC_4C) return LogicalExpression(node, parent, prop, index);
    if (c === $$N_UC_4E) return NullLiteral(node, parent, prop, index);
    return TryStatement(node, parent, prop, index);
  },
  (node, parent, prop, index, type, c) => {
    return DoWhileStatement(node, parent, prop, index);
  },
];
function _$(callbackBefore, callbackAfter, node, parentNode, parentProp, parentIndex, revisit = 0) {
  // This is a walker that was (manually) built using a simple hash, as follows:

  // Input file is a text file with every node name, one per line

  // Get distribution
  // var x=1; require('fs').readFileSync('nodes.txt', 'utf8').split('\n').filter(Boolean).reduce((map, s) => { let p = s.length^s.charCodeAt(x)-96; if (!map[p]) map[p] = 0; ++map[p]; return map   }, {})

  // Get node names per bucket
  // var x=6; var obj=require('fs').readFileSync('nodes.txt', 'utf8').split('\n').filter(Boolean).reduce((map, s) => { let p = s.length^s.charCodeAt(s.length-x)-96; if (!map[p]) map[p] = []; map[p].push(s); return map }, {});

  if (callbackBefore) {
    let f = callbackBefore(node, parentNode, parentProp, parentIndex, false, revisit, $)
    if (f === false) {
      return;
    }
  }

  // This breaks down the 83 node names into an almost perfect 31 case hash, within 5bit, where each bucket has at most 5 elements
  let type = node.type;
  let c = type.charCodeAt(1); // We can use the second character as a second hash in some of these :)
  let hash = type.length ^ c - 96;
  let r = jumpTable[hash](node, parentNode, parentProp, parentIndex, type, c);

  if (callbackAfter) {
    let a = callbackAfter(node, parentNode, parentProp, parentIndex, true, revisit, $)
    if (a === true) {
      // Resolve node again because it may have changed
      let p = parentNode[parentProp];
      let newNode = (Array.isArray(p)) ? p[parentIndex] : p;
      return _$(callbackBefore, callbackAfter, newNode, parentNode, parentProp, parentIndex, ++revisit);
    }
  }

  return r;
}

let $;

function walker(ast, callbackBefore, callbackAfter) {
  $ = _$.bind(undefined, callbackBefore, callbackAfter);
  return $(ast);
}

export {
  walker,
};

