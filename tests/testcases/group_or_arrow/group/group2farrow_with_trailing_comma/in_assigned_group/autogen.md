# Tenko parser test cases

- Path: zeparser3/tests/testcases/parens/group/groupx002farrow_with_trailing_comma/in_assigned_group/autogen.md

> :: parens : group : group/arrow with trailing comma
>
> ::> in assigned group

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

#### must have args to trail

`````js
(,) = x
`````

#### just commas is error

`````js
(,,) = x
`````

#### one arg

`````js
(a,) = x
`````

#### two args

`````js
(a,b,) = x
`````

#### cannot elide

`````js
(a,,) = x
`````

#### after default

`````js
(a = b,) = x
`````

#### not allowed after rest

`````js
(...a,) = x
`````

#### after array destruct

`````js
([x],) = x
`````

#### after object destruct

`````js
({a},) = x
`````

#### rest cant even have an default

`````js
(...a = x,) = x
`````

#### after array destruct with default

`````js
([x] = y,) = x
`````

#### after object destruct with default

`````js
({a} = b,) = x
`````
