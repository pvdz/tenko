# Tenko parser test cases

- Path: zeparser3/tests/testcases/call_expression/trailing_comma/autogen.md

> :: call expression
>
> ::> trailing comma

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> undefined
> `````

> `````js
> 6
> `````

> `````js
> 7
> `````

> `````js
> 8
> `````

> `````js
> 9
> `````

> `````js
> Infinity
> `````

### Templates

- `es = #`

#### not on no args

`````js
foo(,);
`````

#### not just commas

`````js
foo(,,);
`````

#### one arg

`````js
foo(x,);
`````

#### two args

`````js
foo(x,y,);
`````

#### cannot elide

`````js
foo(a,,);
`````

#### can after spread

`````js
foo(...a,);
`````
