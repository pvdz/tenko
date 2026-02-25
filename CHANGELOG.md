# Tenko Changelog

## v2.0.2 (wip)

- ES version support through ES2025:
  - ** Parser and lexer accept `targetEsVersion` 6–16 (or 2015–2025). CLI and test runner support `--es15`, `--es16` and years `2024`, `2025`.
- Fixed version gates for `?.`, `??`, `&&=`, `||=`, `??=`, and bigint:
  - These operators and bigint were already gated in the lexer but explicitly to exactly the spec version that introduced them. That was unintentional and was fixed.
  - `?.` and `??` allowed when `targetEsVersion` ≥ 11 (ES2020).
  - bigint allowed when `targetEsVersion` ≥ 11 (ES2020).
  - `&&=`, `||=`, `??=` allowed when `targetEsVersion` ≥ 12 (ES2021).
- Bugfix: Lexer now emits the correct token for `||=` (it previously returned the `&&=` token by mistake).
- Support ES2022 (version 13): top-level await in Module is now allowed when `targetEsVersion` is 13 (or 2022) or higher.
  - When `toplevelAwait` is left undefined (default), top-level await is allowed in Module goal for ES2022+.
  - Explicit override: `toplevelAwait: true` forces it on (e.g. for older targets); `toplevelAwait: false` forces it off.
- Support ES2022 class static blocks: `static { ... }` in class bodies.
  - Parser emits ESTree node type `StaticBlock` with `body` (array of statements). Gated by `targetEsVersion` 13 (or 2022); use `--es13` or `es = 13` in tests for static block.
  - Printer and walker support `StaticBlock`. Scope of a static block correctly chains to the enclosing scope (for class declarations), so `var` in a static block is attributed to the enclosing function/script and duplicate var/lex checks apply as for a normal block.
- Support ES2023 (version 14): Hashbang (`#!` at start of script/module) is allowed when `targetEsVersion` is 14 or higher.
- Support ES2024 (version 15): RegExp `v` flag (unicode sets mode) is allowed when `targetEsVersion` is 15 or higher.
- Support ES2025 (version 16): Explicit Resource Management — `using` and `await using` declarations in blocks, `for`-in/`for`-of, catch, class static blocks; export; gated by `targetEsVersion` 16 (or 2025). ESTree: `VariableDeclaration` with `kind: 'using'` or `'await using'`.
- Support ES2025 (version 16): Duplicate named capture groups in regexes when they cannot both participate (MightBothParticipate).
  - Gated by dedicated `VERSION_REGEX_DUPLICATE_NAMED_GROUPS` (16); duplicate names allowed when one capture is inside a lookahead/lookbehind (assertion) or when the disjunction is under `?`; rejected when a repeating quantifier (`*`, `+`, `{}`) allows both to participate (e.g. nested `(?:...|...)*`).
- Support ES2025 (version 16): RegExp inline flag modifiers `(?ims:pattern)` and `(?ims-ms:pattern)`. Gated by `targetEsVersion` 16 (or 2025).
  - Scoped modifiers `i`, `m`, `s` only (add and/or remove with `-`); duplicate flags or overlap between add/remove is a syntax error.
- Support ES2025 (version 16): Import Attributes. Gated by `targetEsVersion` 16 (or 2025). 
  - `import x from 'y' with { type: 'json' }`
  - `export {} from 'y' with { type: 'json' }`
  - `import('y', { with: { type: 'json' } })`
  - Dynamic import: `import()` now accepts an optional second argument (the options object) and a trailing comma after either argument.
- Test runner version support:
  - `./t --help` documents version range 6..16 and 2015..2025.
  - Test files can set a per-test ES version with ``- `es = N` `` (N 6..16) under `## Input`; `--esX` overrides when given.
  - Fixed parsing of numeric input options (use `parseFloat(value)` instead of `parseFloat(v)`).
- Printer: `new super()` now round-trips correctly (call parentheses are always printed when the `new` callee is `Super`).
- Fixed a bug in the printer for `new` with MemberExpression argument
  - It would not wrap the argument in parenthesis if it was a member expression, leading to ambiguous case bugs like `new f().g()` vs `new (f().g)()`.
- Added the option `alwaysAllowOctalEscapes` to always allow to parse octal escapes, even in strict mode etc.
- Fixed `new.target`: is now rejected when it has an escape, e.g. `new.t\u0061rget`.
- String/template literals: `\8` and `\9` are no longer treated as octal escapes, regardless. They are now properly only rejected in strings in strict mode and in (untagged) templates.
- Fixed the root node not getting a range property when the nodeRange option was set.
- Fixed a bug where `async` was not accepted as an ident in a for-of statement header.
- Fixed a bug in `async(0,...a)` which was rejected due to the spread.
- Fixed a bug in `export default async=null` which was rejected because location management would trip an assertion.
- Fixed a bug in `class extends async function ...` which was rejected because of an incorrect state in that particular logic branch.
- Fixed a bug in `let[{}=class{}]=null` which was rejected because incorrect state flag handling.
- Fixed a bug in `a[{...()=>{}}.m()]` which was rejected because it would not parse a tail after the bracket in this particular case.
- Fixed a bug in `--{_:()=>null}._` which was rejected because tail parsing was receiving the wrong set of parameters for the update.

## v2.0.1

- Fixed scope tracking for `try` block. It was duplicating the parent scope.
- Enabled the parser option `scopeTracking` to be used in tests (imagine that)

## v2.0.0:

- Breaking change: Optional chaining now uses the Estree spec that was merged back in June.
  - This means the `OptionalMemberExpression` and `OptionalCallExpression` nodes are no longer used in favor of `ChainExpression` and `optional` properties on all `MemberExpression` and `CallExpression` nodes. Walker and printer have been updated accordingly.
  - If you consume this parser for code that may contain optional chaining, this will affect you as you will need to write a slightly different visitor to support optional chaining.
  - Silver lining: in certain cases it was broken before, anyways. This version should fix all of those situations.
- Support ES2021 feature: Compound logical assignments `&&=`, `||=`, and `??=`
- Support ES2021 feature: numerical separators
- Support parser option `locationTracking`, to disable generating location objects in the AST
  - This only prevents actually creating the object in the AST
  - The property still exists. It will be `undefined` everywhere
- Support parser option `nodeRange`, to add a `range` property to all nodes containing an array of `[start, stop]`
  - You should be able to get the input that the node covers by `input.slice(start, stop)`
  - Does not need `locationTracking` enabled (the data exists regardless and this option not use the `loc` property)
- Fixed a bug where compound assignments to patterns were allowed in a specific set of cases (#10)

## v1.1.1

This release is mainly fixing a bunch of scope tracking problems that I uncovered while working on another project that made heavy use of it :) If you did not use it (you probably didn't) then this is not going to make a huge difference for you

- Fixes a bunch of scope tracking issues
- Exports symbols necessary to use the exported scopes, constants to signify types etc
- Drops a completely useless scope from the `TryStatement` node
  - I don't think this is a breaking change since the scope was incorrectly there in the first place; it could have not caught anything
- Fixed a few issues with error paths that would ironically lead to TDZ errors
- Fixed a problem in the code frame where the offset was incorrectly reported
- Fixed a potential problem with checking backreferences in regular expressions

## v1.1.0

First real release?

## v1.0.0

Initial release. I think the package was kind of broken up to the v1.1.0 release :)
