# Tenko parser test cases

- Path: zeparser3/tests/testcases/try_statement/catch_arg/optional_catch_binding_supported_from_ES9_upward/autogen.md

> :: try statement : catch arg
>
> ::> optional catch binding supported from ES9 upward

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

#### try/catch no finally

`````js
try {} catch {}
`````

#### try/catch/finally

`````js
try {} catch {} finally {}
`````

#### try/catch parenless ident

`````js
try {} catch foo {}
`````

#### try/catch parenless array

`````js
try {} catch [] {}
`````

#### try/catch asi

`````js
try {} catch \n {}
`````
