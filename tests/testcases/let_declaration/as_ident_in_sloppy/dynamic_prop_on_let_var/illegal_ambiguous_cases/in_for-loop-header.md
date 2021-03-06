# Tenko parser test case

- Path: tests/testcases/let_declaration/as_ident_in_sloppy/dynamic_prop_on_let_var/illegal_ambiguous_cases/in_for-loop-header.md

> :: let declaration : as ident in sloppy : dynamic prop on let var : illegal ambiguous cases
>
> ::> in for-loop-header
>
> See section E: https://tc39.github.io/ecma262/#sec-additions-and-changes-that-introduce-incompatibilities-with-prior-editions
>
> > 13.2: In ECMAScript 2015, a StatementList beginning with the token let followed by the input elements LineTerminator then Identifier is the start of a LexicalDeclaration. In previous editions, automatic semicolon insertion would always insert a semicolon before the Identifier input element.
>
> > 13.5: In ECMAScript 2015, a StatementListItem beginning with the token let followed by the token [ is the start of a LexicalDeclaration. In previous editions such a sequence would be the start of an ExpressionStatement.
>
> > 13.7: In ECMAScript 2015, if the ( token of a for statement is immediately followed by the token sequence let [ then the let is treated as the start of a LexicalDeclaration. In previous editions such a token sequence would be the start of an Expression.
>
> > 13.7: In ECMAScript 2015, if the ( token of a for-in statement is immediately followed by the token sequence let [ then the let is treated as the start of a ForDeclaration. In previous editions such a token sequence would be the start of an LeftHandSideExpression.
>
> (note: the spec doesn't explicitly allow `let` as a var name but rather forbids it under certain situations. For example: in strict mode and as let/const names)
>
> A statement can not start with dynamic property access on `let` (`let[foo]=bar`) because it would be ambiguous with let destructuring. See note in
>
> https://tc39.github.io/ecma262/#prod-ExpressionStatement

## Input

`````js
for (let[foo];;);
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Declaration destructuring must have init

start@1:0, error@1:13
╔══╦═════════════════
 1 ║ for (let[foo];;);
   ║              ^------- error
╚══╩═════════════════

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
