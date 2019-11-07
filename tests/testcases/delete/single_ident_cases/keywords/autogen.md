# Tenko parser test cases

- Path: zeparser3/tests/testcases/objects/literals/identifier_method/special_keys/autogen.md

> :: delete : single ident cases
>
> ::> keywords
>
> In strict mode, `delete` can not apply to a single identifier
>
> However, keywords are excempted from this rule
>
> This exception holds with the (noop) paren wrapped cases

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
> eval
> `````

> `````js
> arguments
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
> await
> `````

> `````js
> yield
> `````

> `````js
> let
> `````

> `````js
> static
> `````

> `````js
> async
> `````

> `````js
> get
> `````

> `````js
> set
> `````

### Templates

#### ungrouped ident

`````js
delete #
`````

#### grouped ident

`````js
delete (#)
`````

#### multi-grouped ident

`````js
delete (((#)))
`````

#### ungrouped property

`````js
delete #.prop
`````

#### grouped property

`````js
delete (#.prop)
`````

#### grouped outside property

`````js
delete (#).prop
`````

#### multi-grouped property

`````js
delete (((#.prop)))
`````
