// Serialize an AST into source code
// The resulting string may be different than the original input but should parse into an equivalent AST
// The output of this printer is in particular overly saturated with parentheses.

import {
  $$A_61, $$A_UC_41,
  $$B_62, $$B_UC_42, $$C_UC_43,
  $$D_64, $$D_UC_44,
  $$E_65, $$E_UC_45, $$G_67,
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

function ArrayExpression(node) {
  assert(node.type, 'ArrayExpression');
  return '[' + node.elements.map(n => n === null ? ',' : ($(n) + (n.type === 'RestElement' ? '' : ','))).join(' ') + ']';
}
function ArrayPattern(node) {
  assert(node.type, 'ArrayPattern');
  return '[' + node.elements.map(n => n === null ? ',' : ($(n) + (n.type === 'RestElement' ? '' : ','))).join(' ') + ']';
}
function ArrowFunctionExpression(node) {
  assert(node.type, 'ArrowFunctionExpression');
  // Babel has no .expressions: https://github.com/babel/babel/issues/6772#issuecomment-342935685
  let body = node.expression === undefined ? (node.body.type === 'BlockStatement' ? $(node.body) : $w(node.body)) : (node.expression ? $w(node.body) : $(node.body));
  if (
    node.params.length === 1 &&
    node.params[0].type !== 'AssignmentPattern' &&
    node.params[0].type !== 'ArrayPattern' &&
    node.params[0].type !== 'ObjectPattern' &&
    node.params[0].type !== 'RestElement'
  ) {
    return (node.async ? 'async ' : '') + $(node.params[0]) + ' => ' + body;
  }
  return (node.async ? 'async ' : '') + '(' + node.params.map($).join(', ') + ') => ' + body;
}
function AssignmentExpression(node) {
  assert(node.type, 'AssignmentExpression');
  return '(' + $(node.left) + ' ' + node.operator + ' ' + $(node.right) + ')';
}
function AssignmentPattern(node) {
  assert(node.type, 'AssignmentPattern');
  return $(node.left) + ' = ' + $(node.right);
}
function AwaitExpression(node) {
  assert(node.type, 'AwaitExpression');
  return 'await (' + $(node.argument) + ')';
}
function BigIntLiteral(node) {
  assert(node.type, 'BigIntLiteral');
  return node.bigint + 'n';
}
function BinaryExpression(node) {
  assert(node.type, 'BinaryExpression');
  return '((' + $(node.left) + ') ' + node.operator + ' (' + $(node.right) + '))';
}
function BlockStatement(node) {
  assert(node.type, 'BlockStatement');
  return '{' + node.body.map($).join('\n') + '}';
}
function BooleanLiteral(node) {
  assert(node.type, 'BooleanLiteral');
  return node.value;
}
function BreakStatement(node) {
  assert(node.type, 'BreakStatement');
  return 'break' + (node.label ? ' ' + $(node.label) : '') + ';';
}
function CallExpression(node) {
  assert(node.type, 'CallExpression');
  return (
    node.callee.type === 'Import' ||
    node.callee.type === 'Super' ||
    node.callee.name === 'async' // `async({__proto__: 1, __proto__: 2})`
      ? $(node.callee)
      : $w(node.callee)
  ) + '(' + node.arguments.map($).join(', ') + ')';
}
function CatchClause(node) {
  assert(node.type, 'CatchClause');
  return 'catch ' + (node.param ? $w(node.param) + ' ' : '') + $(node.body);
}
function ClassBody(node) {
  assert(node.type, 'ClassBody');
  return '{' + node.body.map($).join('\n') + '}';
}
function ClassDeclaration(node) {
  assert(node.type, 'ClassDeclaration');
  return 'class' + (node.id ? ' ' + $(node.id) : '') + (node.superClass ? ' extends (' + $(node.superClass) + ') ' : '') + $(node.body);
}
function ClassExpression(node) {
  assert(node.type, 'ClassExpression');
  return 'class' + (node.id ? ' ' + $(node.id) : '') + (node.superClass ? ' extends (' + $(node.superClass) + ') ' : '') + $(node.body);
}
function ClassMethod(node) {
  assert(node.type, 'ClassMethod');
  if (node.value === undefined) {
    assert('value' in node, false);
    // Babel does not have .value and merges the method node with the function node, different from the estree spec
    return (
      (node.static ? 'static ' : '') +
      (node.kind === 'get' ? 'get ' : '') +
      (node.kind === 'set' ? 'set ' : '') +
      (node.async ? 'async ' : '') +
      (node.generator ? '* ' : '') +
      (node.computed ? '[' + $(node.key) + ']' : $(node.key)) +
      '(' + node.params.map($).join(', ') + ')' +
      $(node.body) +
      ';'
    );
  }
  return (
    (node.static ? 'static ' : '') +
    (node.kind === 'get' ? 'get ' : '') +
    (node.kind === 'set' ? 'set ' : '') +
    (node.value.async ? 'async ' : '') +
    (node.value.generator ? '* ' : '') +
    (node.computed ? '[' + $(node.value.id) + ']' : $(node.value.id)) +
    '(' + $(node.value.params).join(', ') + ')' +
    $(node.value.body) +
    ';'
  );
}
function CommentBlock(node) {
  assert(node.type, 'CommentBlock');
  return '/*' + node.value + '*/';
}
function CommentLine(node) {
  assert(node.type, 'CommentLine');
  return '//' + node.value + '\n';
}
function ConditionalExpression(node) {
  assert(node.type, 'ConditionalExpression');
  return '(' + $w(node.test) + '? ' + $w(node.consequent) + ' : ' + $w(node.alternate) + ')';
}
function ContinueStatement(node) {
  assert(node.type, 'ContinueStatement');
  return 'continue' + (node.label ? ' ' + $(node.label) : '') + ';';
}
function DebuggerStatement(node) {
  assert(node.type, 'DebuggerStatement');
  return 'debugger;';
}
function Directive(node) {
  assert(node.type, 'Directive');
  return $(node.value);
}
function DirectiveLiteral(node) {
  assert(node.type, 'DirectiveLiteral');
  return "'" + node.value + "';";
}
function DoWhileStatement(node) {
  assert(node.type, 'DoWhileStatement');
  return 'do ' + $(node.body) + ' while ' + $w(node.test) + ';';
}
function EmptyStatement(node) {
  assert(node.type, 'EmptyStatement');
  return ';';
}
function ExportAllDeclaration(node) {
  assert(node.type, 'ExportAllDeclaration');
  return 'export * from ' + $(node.source) + ';';
}
function ExportDefaultDeclaration(node) {
  assert(node.type, 'ExportDefaultDeclaration');
  return 'export default ' + $(node.declaration) + (node.declaration.type === 'ClassDeclaration' || node.declaration.type === 'FunctionDeclaration' ? '' : ';');
}
function ExportNamespaceSpecifier(node) {
  assert(node.type, 'ExportNamespaceSpecifier');
  return '* as ' + $(node.exported)
}
function ExportNamedDeclaration(node) {
  assert(node.type, 'ExportNamedDeclaration');
  if (node.specifiers.length === 1 && node.specifiers[0].type === 'ExportNamespaceSpecifier') {
    // This is specifically `export * as foo from 'bar'` syntax
    assert(!!node.source, true, 'spec dictates this syntax requires the source');
    return 'export ' + $(node.specifiers[0]) + ' from ' + $(node.source) + ';';
  }
  assert(node.specifiers.length !== 1 || (node.specifiers.length > 0 && node.specifiers[0].type !== 'ExportNamespaceSpecifier'), true, 'the ExportNamespaceSpecifier node has restrictions');
  return 'export ' + (node.declaration ? $(node.declaration) : ('{' + node.specifiers.map($).join(', ') + '}')) + (node.source ? ' from ' + $(node.source) : '');
}
function ExportSpecifier(node) {
  assert(node.type, 'ExportSpecifier');
  return (node.local.name !== node.exported.name ? $(node.local) + ' as ' : '') + $(node.exported);
}
function ExpressionStatement(node) {
  assert(node.type, 'ExpressionStatement');
  if (node.directive === undefined && ( // Protect directives from demotion
    node.expression.type === 'ObjectExpression' ||
    node.expression.type === 'ArrayExpression' || // [{__proto__: 1, __proto__: 2}]
    node.expression.type === 'SequenceExpression' ||
    node.expression.type === 'FunctionExpression' ||
    node.expression.type === 'ClassExpression' ||
    node.expression.type === 'BinaryExpression' ||
    node.expression.type === 'MemberExpression' ||
    node.expression.type === 'Identifier' ||
    node.expression.type === 'UnaryExpression' ||
    node.expression.type === 'CallExpression' ||
    (!node.directive && (node.expression.type === 'Literal' || node.expression.type === 'StringLiteral') && typeof node.expression.value === 'string') || // Prevent grouped strings of being promoted to directives
    node.expression.type === 'AssignmentExpression'
  )) {
    // :'(
    return $w(node.expression) + ';';
  }
  return $(node.expression) + ';';
}
function ForInStatement(node) {
  assert(node.type, 'ForInStatement');
  return 'for (' + (node.left.type === 'VariableDeclaration' || node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern' ? $(node.left, undefined, undefined, true) : $w(node.left)) + ' in ' + $(node.right) + ') ' + $(node.body);
}
function ForOfStatement(node) {
  assert(node.type, 'ForOfStatement');
  return 'for ' + (node.await ? 'await ' : '') + '(' + (node.left.type === 'VariableDeclaration' || node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern' ? $(node.left, undefined, undefined, true) : $w(node.left)) + ' of ' + $(node.right) + ') ' + $(node.body);
}
function ForStatement(node) {
  assert(node.type, 'ForStatement');
  return 'for (' + (node.init ? (node.init.type === 'VariableDeclaration' ? $(node.init, undefined, undefined, true) : $w(node.init)) : '') + ';' + (node.test ? $(node.test) : '') + ';' + (node.update ? $(node.update) : '') + ') ' + $(node.body);
}
function FunctionDeclaration(node) {
  assert(node.type, 'FunctionDeclaration');
  return (node.async ? 'async ' : '') + 'function' + (node.generator ? '*' : '') + (node.id ? ' ' + $(node.id) : '') + '(' + node.params.map($).join(', ') + ') {' + node.body.body.map($).join('\n') + '}';
}
function FunctionExpression(node) {
  assert(node.type, 'FunctionExpression');
  return (node.async ? 'async ' : '') + 'function' + (node.generator ? '*' : '') + (node.id ? ' ' + $(node.id) : '') + '(' + node.params.map($).join(', ') + ') {' + node.body.body.map($).join('\n') + '}';
}
function Identifier(node) {
  assert(node.type, 'Identifier');
  return node.name;
}
function IfStatement(node) {
  assert(node.type, 'IfStatement');
  return 'if ' + $w(node.test) + ' ' + $(node.consequent) + (node.alternate ? ' else ' + $(node.alternate) : '');
}
function Import(node) {
  assert(node.type, 'Import');
  return 'import';
}
function ImportDeclaration(node) {
  assert(node.type, 'ImportDeclaration');
  let importSpecifiers = node.specifiers.filter(s => s.type === 'ImportSpecifier');
  let otherSpecifiers = node.specifiers.filter(s => s.type !== 'ImportSpecifier');
  if (!importSpecifiers.length && !otherSpecifiers.length) {
    return 'import {}' + (node.source ? ' from ' + $(node.source) : '') + ';';
  }
  return 'import ' + (otherSpecifiers.length ? otherSpecifiers.map($).join(', ') : '') + (importSpecifiers.length && otherSpecifiers.length ? ', ' : '') + (importSpecifiers.length ? '{' + importSpecifiers.map($).join(', ') + '}' : '') + (node.source ? ' from ' + $(node.source) : '') + ';';
}
function ImportDefaultSpecifier(node) {
  assert(node.type, 'ImportDefaultSpecifier');
  return $(node.local);
}
function ImportExpression(node) {
  assert(node.type, 'ImportExpression');
  return 'import(' + node.arguments.map($).join(', ') + ')';
}
function ImportNamespaceSpecifier(node) {
  assert(node.type, 'ImportNamespaceSpecifier');
  return '* as ' + $(node.local);
}
function ImportSpecifier(node) {
  assert(node.type, 'ImportSpecifier');
  return $(node.imported) + (node.local ? ' as ' + $(node.local) : '');
}
function LabeledStatement(node) {
  assert(node.type, 'LabeledStatement');
  return $(node.label) + ': ' + $(node.body);
}
function Literal(node) {
  assert(node.type, 'Literal');
  switch (typeof node.value) {
    case 'boolean':
      return node.raw;
    case 'number':
      return node.raw;
    case 'string':
      return node.raw;
    case 'object': // regex
      return node.raw;
  }
  throw new Error('fixme; literal type');
}
function LogicalExpression(node) {
  assert(node.type, 'LogicalExpression');
  return '(' + $w(node.left) + ' ' + node.operator + ' ' + $w(node.right) + ')';
}
function MemberExpression(node) {
  assert(node.type, 'MemberExpression');
  if (
    node.object.type === 'ObjectExpression' ||
    node.object.type === 'SequenceExpression' ||
    node.object.type === 'FunctionExpression' ||
    node.object.type === 'ClassExpression' ||
    node.object.type === 'Identifier' ||
    node.object.type === 'BinaryExpression' ||
    node.object.type === 'MemberExpression' ||
    node.object.type === 'Identifier' ||
    node.object.type === 'CallExpression' ||
    node.object.type === 'UnaryExpression' || // `(!t).y`
    node.object.type === 'ArrowFunctionExpression' ||
    node.object.type === 'UpdateExpression' || // `(++x)[x]`
    ((node.object.type === 'Literal' || node.object.type === 'NumericLiteral') && typeof node.object.value === 'number') || // `4 .p`
    node.object.type === 'AssignmentExpression'
  ) {
    return $w(node.object) + (node.computed ? '[' + $(node.property) + ']' : ('.' + $(node.property)));
  } else {
    return $(node.object) + (node.computed ? '[' + $(node.property) + ']' : ('.' + $(node.property)));
  }
}
function MetaProperty(node) {
  assert(node.type, 'MetaProperty');
  return $(node.meta) + '.' + $(node.property);
}
function MethodDefinition(node) {
  assert(node.type, 'MethodDefinition');
  return (
    (node.static ? 'static ' : '') +
    (node.kind === 'get' ? 'get ' : '') +
    (node.kind === 'set' ? 'set ' : '') +
    (node.value.async ? 'async ' : '') +
    (node.value.generator ? '* ' : '') +
    (node.computed ? '[' + $(node.key) + ']' : $(node.key)) +
    '(' + node.value.params.map($).join(', ') + ')' +
    $(node.value.body) +
    ';'
  );
}
function NewExpression(node) {
  assert(node.type, 'NewExpression');
  return 'new ' + (node.callee.type !== 'Super' && node.callee.type !== 'Import' ? $w(node.callee) : $(node.callee)) + '(' + node.arguments.map($).join(', ') + ')';
}
function NullLiteral(node) {
  assert(node.type, 'NullLiteral');
  return 'null';
}
function NumericLiteral(node) {
  assert(node.type, 'NumericLiteral');
  return node.raw;
}
function ObjectExpression(node) {
  assert(node.type, 'ObjectExpression');
  return '{' + node.properties.map($).join(', ') + '}';
}
function ObjectMethod(node) {
  assert(node.type, 'ObjectMethod');
  if (node.value === undefined) {
    assert('value' in node, false);
    // Babel does not have .value and merges the method node with the function node, different from the estree spec
    return (
      (node.static ? 'static ' : '') +
      (node.kind === 'get' ? 'get ' : '') +
      (node.kind === 'set' ? 'set ' : '') +
      (node.async ? 'async ' : '') +
      (node.generator ? '* ' : '') +
      (node.computed ? '[' + $(node.key) + ']' : $(node.key)) +
      '(' + node.params.map($).join(', ') + ')' +
      $(node.body)
    );
  }

  return (
    (node.static ? 'static ' : '') +
    (node.kind === 'get' ? 'get ' : '') +
    (node.kind === 'set' ? 'set ' : '') +
    (node.value.async ? 'async ' : '') +
    (node.value.generator ? '* ' : '') +
    (node.computed ? '[' + $(node.value.id) + ']' : $(node.value.id)) +
    '(' + node.value.params($).join(', ') + ')' +
    $(node.value.body)
  );
}
function ObjectPattern(node) {
  assert(node.type, 'ObjectPattern');
  return '{' + node.properties.map($).join(', ') + '}';
}
function ObjectProperty(node) {
  assert(node.type, 'ObjectProperty');
  if (node.body) return node.body.map($).join('\n');
  // Babel
  return Property(node);
}
function Program(node) {
  assert(node.type, 'Program');
  return node.body.map($).join('\n');
}
function Property(node) {
  assert(node.type === 'Property' || node.type === 'ObjectProperty', true);
  return (
    (node.kind === 'get' || node.kind === 'set' || node.method) ?
      (
        (node.static ? 'static ' : '') +
        (node.kind === 'get' ? 'get ' : '') +
        (node.kind === 'set' ? 'set ' : '') +
        (node.value.async ? 'async ' : '') +
        (node.value.generator ? '* ' : '') +
        (node.computed ? '[' : '') + $(node.key) + (node.computed ? ']' : '') +
        '(' + node.value.params.map($).join(', ') + ')' +
        $(node.value.body) +
        ''
      ) : (
        (node.shorthand ? '' : ((node.computed ? '[' : '') + $(node.key) + (node.computed ? ']' : '') + ':')) + $(node.value)
      )
  );
}
function RegExpLiteral(node) {
  assert(node.type, 'RegExpLiteral');
  return node.extra.raw;
}
function RestElement(node) {
  assert(node.type, 'RestElement');
  return '...' + $(node.argument);
}
function ReturnStatement(node) {
  assert(node.type, 'ReturnStatement');
  return 'return' + (node.argument ? ' ' + $(node.argument) : '') + ';';
}
function SequenceExpression(node) {
  assert(node.type, 'SequenceExpression');
  return '(' + node.expressions.map($).join(', ') + ')';
}
function SpreadElement(node) {
  assert(node.type, 'SpreadElement');
  return '...' + $(node.argument);
}
function StringLiteral(node) {
  assert(node.type, 'StringLiteral');
  return node.extra.raw;
}
function Super(node) {
  assert(node.type, 'Super');
  return 'super';
}
function SwitchCase(node) {
  assert(node.type, 'SwitchCase');
  return (node.test ? 'case ' + $(node.test) : 'default') + ':\n' + node.consequent.map($).join('\n');
}
function SwitchStatement(node) {
  assert(node.type, 'SwitchStatement');
  return 'switch ' + $w(node.discriminant) + ' {' + node.cases.map($).join('\n') + '}';
}
function TaggedTemplateExpression(node) {
  assert(node.type, 'TaggedTemplateExpression');
  return $w(node.tag) + $(node.quasi);
}
function TemplateElement(node) {
  assert(node.type, 'TemplateElement');
  return node.value.raw;
}
function TemplateLiteral(node) {
  assert(node.type, 'TemplateLiteral');
  return '`' + $(node.quasis[0]) + (node.expressions.length ? '${' : '') + node.expressions.map((e, i) => $(e) + '}' + $(node.quasis[i+1])).join('${') + '`';
}
function ThisExpression(node) {
  assert(node.type, 'ThisExpression');
  return 'this';
}
function ThrowStatement(node) {
  assert(node.type, 'ThrowStatement');
  return 'throw ' + $(node.argument) + ';';
}
function TryStatement(node) {
  assert(node.type, 'TryStatement');
  return 'try ' + $(node.block) + (node.handler ? ' ' + $(node.handler) : '') + (node.finalizer ? ' finally ' + $(node.finalizer) : '');
}
function UnaryExpression(node) {
  assert(node.type, 'UnaryExpression');
  return node.operator + ' ' + $w(node.argument);
}
function UpdateExpression(node) {
  assert(node.type, 'UpdateExpression');
  return (node.prefix ? node.operator : '') + $(node.argument) + (node.prefix ? '' : node.operator);
}
function VariableDeclaration(node, fromFor) {
  assert(node.type, 'VariableDeclaration');
  return node.kind + ' ' + node.declarations.map($).join(', ') + (fromFor ? '' : ';'); // no semi inside `for`
}
function VariableDeclarator(node) {
  assert(node.type, 'VariableDeclarator');
  return $(node.id) + (node.init ? ' = ' + $(node.init) : '');
}
function WhileStatement(node) {
  assert(node.type, 'WhileStatement');
  return 'while ' + $w(node.test) + ' ' + $(node.body);
}
function WithStatement(node) {
  assert(node.type, 'WithStatement');
  return 'with ' + $w(node.object) + ' ' + $(node.body);
}
function YieldExpression(node) {
  assert(node.type, 'YieldExpression');
  return '(yield' + (node.delegate ? ' *' : '') + (node.argument ? ' ' + $w(node.argument) : '') + ')';
}

function $w(node) {
  return '(' + $(node) + ')';
}
let jumpTable = [
  (node, fromFor, type, c) => {
    if (c === $$I_69) return Directive(node);
    if (c === $$X_78) {
      c = type.charCodeAt(6);
      if (c === $$D_UC_44) return ExportDefaultDeclaration(node);
      return ExportNamespaceSpecifier(node);
    }
    return UpdateExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(3);
    if (c === $$L_6C) return BooleanLiteral(node);
    if (c === $$I_UC_49) return ForInStatement(node);
    if (c === $$O_UC_4F) return ForOfStatement(node);
    return UnaryExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return AssignmentPattern(node);
    if (c === $$B_UC_42) return BlockStatement(node);
    return ImportSpecifier(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$A_61) return ClassExpression(node);
    if (c === $$M_6D) return CommentBlock(node);
    if (c === $$P_70) return EmptyStatement(node);
    return ForStatement(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$G_67) return BigIntLiteral(node);
    if (c === $$M_6D) return CommentLine(node);
    return WithStatement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$R_72) return ArrowFunctionExpression(node);
    return ClassBody(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(4);
    if (c === $$T_74) return FunctionDeclaration(node);
    if (c === $$E_UC_45) return ThisExpression(node);
    if (c === $$W_77) return ThrowStatement(node);
    if (c === $$E_65) return WhileStatement(node);
    return YieldExpression(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$S_73) return AssignmentExpression(node);
    if (c === $$L_6C) return ClassMethod(node);
    return FunctionExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$N_UC_4E) return NewExpression(node);
    return RegExpLiteral(node);
  },
  (node, fromFor, type, c) => {
    return MetaProperty(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(8);
    if (c === $$U_75) return CatchClause(node);
    if (c === $$A_61) return ReturnStatement(node);
    if (c === $$E_UC_45) return TemplateElement(node);
    return TemplateLiteral(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExpressionStatement(node);
    return Import(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExportAllDeclaration(node);
    return ObjectProperty(node);
  },
  (node, fromFor, type, c) => {
    return IfStatement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExportNamedDeclaration(node);
    if (c === $$D_64) return Identifier(node);
    if (c === $$I_69) return Literal(node);
    if (c === $$B_62) return ObjectMethod(node);
    return RestElement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$A_61) return CallExpression(node);
    return ObjectPattern(node);
  },
  (node, fromFor, type, c) => {
    return Super(node);
  },
  (node, fromFor, type, c) => {
    return LabeledStatement(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$B_62) return ObjectExpression(node);
    return VariableDeclaration(node, fromFor);
  },
  (node, fromFor, type, c) => {
    return VariableDeclarator(node);
  },
  (node, fromFor, type, c) => {
    return DebuggerStatement(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(2);
    if (c === $$P_70) return ImportNamespaceSpecifier(node);
    if (c === $$M_6D) return MemberExpression(node);
    if (c === $$T_74) return MethodDefinition(node);
    return Program(node);
  },
  (node, fromFor, type, c) => {
    // (nothing)
  },
  (node, fromFor, type, c) => {
    if (c === $$X_78) return ExportSpecifier(node);
    return SequenceExpression(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return AwaitExpression(node);
    return SwitchStatement(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$B_UC_42) return BinaryExpression(node);
    if (c === $$D_UC_44) return DirectiveLiteral(node);
    if (c === $$S_UC_53) return StringLiteral(node);
    return TaggedTemplateExpression(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$O_6F) return ConditionalExpression(node);
    return Property(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$M_6D) return ImportDefaultSpecifier(node);
    return NumericLiteral(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$R_72) return BreakStatement(node);
    if (c === $$L_6C) return ClassDeclaration(node);
    return ImportDeclaration(node);
  },
  (node, fromFor, type, c) => {
    if (c === $$R_72) return ArrayExpression(node);
    if (c === $$M_6D) return ImportExpression(node);
    if (c === $$P_70) return SpreadElement(node);
    return SwitchCase(node);
  },
  (node, fromFor, type, c) => {
    c = type.charCodeAt(0);
    if (c === $$A_UC_41) return ArrayPattern(node);
    if (c === $$C_UC_43) return ContinueStatement(node);
    if (c === $$L_UC_4C) return LogicalExpression(node);
    if (c === $$N_UC_4E) return NullLiteral(node);
    return TryStatement(node);
  },
  (node, fromFor, type, c) => {
    return DoWhileStatement(node);
  },
];
function $(node, _, __, fromFor) {
  // This is a walker that was (manually) built using a simple hash, as follows:

  // Input file is a text file with every node name, one per line

  // Get distribution
  // var x=1; require('fs').readFileSync('nodes.txt', 'utf8').split('\n').filter(Boolean).reduce((map, s) => { let p = s.length^s.charCodeAt(x)-96; if (!map[p]) map[p] = 0; ++map[p]; return map   }, {})

  // Get node names per bucket
  // var x=6; var obj=require('fs').readFileSync('nodes.txt', 'utf8').split('\n').filter(Boolean).reduce((map, s) => { let p = s.length^s.charCodeAt(s.length-x)-96; if (!map[p]) map[p] = []; map[p].push(s); return map }, {});

  // This breaks down the 83 node names into an almost perfect 31 case hash, within 5bit, where each bucket has at most 5 elements
  let type = node.type;
  let c = type.charCodeAt(1); // We can use the second character as a second hash in some of these :)
  let hash = type.length ^ c - 96;
  return jumpTable[hash](node, fromFor, type, c);
}

export {
  $ as printer,
};

