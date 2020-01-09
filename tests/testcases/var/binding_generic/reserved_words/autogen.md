# Tenko parser test cases

- Path: zeparser3/tests/testcases/var_statement/binding_generic/reserved_words/autogen.md

> :: var statement : binding generic
>
> ::> reserved words

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> break
> `````

> `````js
> case
> `````

> `````js
> catch
> `````

> `````js
> class
> `````

> `````js
> const
> `````

> `````js
> continue
> `````

> `````js
> debugger
> `````

> `````js
> default
> `````

> `````js
> delete
> `````

> `````js
> do
> `````

> `````js
> else
> `````

> `````js
> export
> `````

> `````js
> extends
> `````

> `````js
> finally
> `````

> `````js
> for
> `````

> `````js
> function
> `````

> `````js
> if
> `````

> `````js
> import
> `````

> `````js
> in
> `````

> `````js
> instanceof
> `````

> `````js
> new
> `````

> `````js
> return
> `````

> `````js
> super
> `````

> `````js
> switch
> `````

> `````js
> this
> `````

> `````js
> throw
> `````

> `````js
> try
> `````

> `````js
> typeof
> `````

> `````js
> var
> `````

> `````js
> void
> `````

> `````js
> while
> `````

> `````js
> with
> `````

> `````js
> null
> `````

> `````js
> true
> `````

> `````js
> false
> `````

> `````js
> enum
> `````

> `````js
> implements
> `````

> `````js
> package
> `````

> `````js
> protected
> `````

> `````js
> interface
> `````

> `````js
> private
> `````

> `````js
> public
> `````

> `````js
> let
> `````

> `````js
> static
> `````

> `````js
> await
> `````

> `````js
> yield
> `````

### Templates

#### var statement

`````js
var # = x;
`````

#### for header

`````js
for (var # = x;;);
`````

#### for-in header

`````js
for (var # in y);
`````

#### for-of header

`````js
for (var # of y);
`````

#### function name

`````js
function #() {}
`````

#### function arg

`````js
function f(#) {}
`````

#### function object destructured arg

`````js
function f({#}) {}
`````

#### function object alias destructured arg

certain tokens fail because they are part of a multi-token expression

`````js
function fh({x: #}) {}
`````

#### function array destructured arg

`````js
function f([#]) {}
`````

#### catch clause

`````js
try {} catch (#) {}
`````

#### export

`````js
export var # = 10;
`````

#### can be property

`````js
obj.#
`````
