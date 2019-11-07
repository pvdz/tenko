# Tenko parser test cases

- Path: zeparser3/tests/testcases/parens/group/invalid_arrow_header_things_that_are_valid_in_a_group/autogen.md

> :: parens : group
>
> ::> invalid arrow header things that are valid in a group

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> arguments
> `````

> `````js
> async ()=>x
> `````

> `````js
> await foo
> `````

> `````js
> class{}
> `````

> `````js
> delete x.y
> `````

> `````js
> eval
> `````

> `````js
> false
> `````

> `````js
> function(){}
> `````

> `````js
> let
> `````

> `````js
> new x
> `````

> `````js
> null
> `````

> `````js
> super
> `````

> `````js
> true
> `````

> `````js
> this
> `````

> `````js
> super
> `````

> `````js
> typeof x
> `````

> `````js
> void x
> `````

> `````js
> yield x
> `````

> `````js
> x + y
> `````

> `````js
> [].length
> `````

> `````js
> [x].length
> `````

> `````js
> {}.length
> `````

> `````js
> {x: y}.length
> `````

> `````js
> await
> `````

> `````js
> let
> `````

> `````js
> yield
> `````

### Templates

#### in group

`````js
( # )
`````

#### in arrow

`````js
( # ) => {}
`````

#### assignment

`````js
( # ) = x
`````
