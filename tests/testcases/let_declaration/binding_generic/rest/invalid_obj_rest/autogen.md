# Tenko parser test cases

- Path: zeparser3/tests/testcases/let_declaration/binding_generic/rest/invalid_obj_rest/autogen.md

> :: let declaration : binding generic : rest
>
> ::> invalid obj rest
>
> Note: object rest can only be on an ident (this can be any pattern in assignment destructuring)

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> let {...obj1,} = foo
> `````

> `````js
> let {...obj1,a} = foo
> `````

> `````js
> let {...obj1,...obj2} = foo
> `````

> `````js
> let {...(obj)} = foo
> `````

> `````js
> let {...(a,b)} = foo
> `````

> `````js
> let {...{a,b}} = foo
> `````

> `````js
> let {...[a,b]} = foo
> `````

### Templates

#### case

`````js
#
`````
