# Tenko parser test cases

- Path: zeparser3/tests/testcases/classes/special_keys/autogen.md

> :: classes
>
> ::> special keys

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

Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName

> `````js
> static
> `````

Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName

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

#### as class name

`````js
class # {}
`````

#### as super class name

`````js
class x extends # {}
`````

#### as regular property in class

we will have to revisit this with class properties later

`````js
class x {#: x}
`````

#### as method in class

`````js
class x {#(){}}
`````

#### as static method in class

`````js
class x {static #(){}}
`````

#### as generator in class

`````js
class x {* #(){}}
`````

#### as getter in class

`````js
class x {get #(){}}
`````

#### as setter in class

`````js
class x {set #(x){}}
`````

#### as async method in class

`````js
class x {async #(){}}
`````

#### as async generator in class

`````js
class x {async * #(){}}
`````

#### as static getter in class

`````js
class x {static get #(){}}
`````

#### as static generator in class

`````js
class x {static * #(){}}
`````

#### as static setter in class

`````js
class x {static set #(x){}}
`````

#### as static async method in class

`````js
class x {static async #(){}}
`````

#### as static async generator in class

`````js
class x {static async * #(){}}
`````
