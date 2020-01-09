# Tenko parser test cases

- Path: zeparser3/tests/testcases/parens/group/groupx002farrow_with_trailing_comma/in_non-assigned_group/autogen.md

> :: parens : group : group/arrow with trailing comma
>
> ::> in non-assigned group
>
> The kicker with all these cases is that the trailing comma might not be an error but the parser won't know until the group actually is or is not followed by an arrow.

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

Test for all ES versions

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
(,)
`````

#### just commas is error

`````js
(,,)
`````

#### one arg

`````js
(a,)
`````

#### two args

`````js
(a,b,)
`````

#### cannot elide

`````js
(a,,)
`````

#### after default

`````js
(a = b,)
`````

#### not allowed after rest

`````js
(...a,)
`````

#### after array destruct

`````js
([x],)
`````

#### after object destruct

`````js
({a},)
`````

#### rest cant even have an default

`````js
(...a = x,)
`````

#### after array destruct with default

`````js
([x] = y,)
`````

#### after object destruct with default

`````js
({a} = b,)
`````
