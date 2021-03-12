# Tenko Changelog

## v2.0.2 (wip)

- Fixed a bug in the printer for `new` with MemberExpression argument
  - It would not wrap the argument in parenthesis if it was a member expression, leading to ambiguous case bugs like `new f().g()` vs `new (f().g)()`.
  - Not publishing a new version as I think people fetch the printer straight from repo, not from npm. Prove me wrong.

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
