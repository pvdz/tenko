# Tenko parser test cases

- Path: zeparser3/tests/testcases/var_statement/binding_generic/reserved_words/autogen.md

> :: var statement : binding generic
>
> ::> reserved words
>
> https://tc39.github.io/ecma262/#sec-variablestatements-in-catch-blocks
> 
> > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the VarDeclaredNames of Block
> 
> https://tc39.github.io/ecma262/#sec-try-statement-static-semantics-early-errors
> 
> > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the LexicallyDeclaredNames of Block.
> > 
> > It is a Syntax Error if any element of the BoundNames of CatchParameter also occurs in the VarDeclaredNames of Block.
> 
> The web compat / AnnexB case allows an exception for catch bindings that are idents.
> 
> In ES10+ this rule no longer only applies to certain var declarations. In <=ES9 there was an addiitonal restriction to var statements and to for-of.
>
> https://twitter.com/Ghost1240145716/status/1139486701754077186
>
> https://github.com/tc39/ecma262/pull/1393

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

- `es = 10`

### Cases

> `````js
> var
> `````

> `````js
> let
> `````

> `````js
> const
> `````

### Templates

#### Binding declaration shadowing catch var

`````js
try {} catch (e) { # e = x; }
`````

#### Block scoped binding declaration shadowing catch var

`````js
try {} catch (e) { { # e = x; } }
`````

#### Binding in for-header shadowing catch var

`````js
try {} catch (e) { for (# e = 1;;) {} }
`````

#### Binding in for-in-header shadowing catch var

`````js
try {} catch (e) { for (# e in y) {} }
`````

#### Binding in for-of-header shadowing catch var

`````js
try {} catch (e) { for (# e of y) {} }
`````
