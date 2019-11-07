# Tenko parser test cases

- Path: zeparser3/tests/testcases/objects/destructuring/identifier_properties/keyword_obj_key_check/autogen.md

> :: objects : destructuring : identifier properties
>
> ::> keyword obj key check

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
> let
> `````

> `````js
> eval
> `````

> `````js
> arguments
> `````

> `````js
> static
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

### Templates

#### shorthand

`````js
({#})
`````

#### arrow ident key

`````js
({key: #}) => null
`````

#### assign ident key

`````js
({key: #} = null)
`````

#### objlit ident key

`````js
({key: #})
`````

#### arrow string key

`````js
({"key": #}) => null
`````

#### assign string key

`````js
({"key": #} = null)
`````

#### objlit string key

`````js
({"key": #})
`````

#### arrow number key

`````js
({500: #}) => null
`````

#### assign number key

`````js
({500: #} = null)
`````

#### objlit number key

`````js
({500: #})
`````
