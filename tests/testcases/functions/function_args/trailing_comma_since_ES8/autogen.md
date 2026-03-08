# Tenko parser test cases

- Path: zeparser3/tests/testcases/functions/function_args/trailing_comma_since_ES8/autogen.md

> :: functions : function args
>
> ::> trailing comma since ES8

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
function f(,){}
`````

#### just commas is error

`````js
function f(,,){}
`````

#### one arg

`````js
function f(a,){}
`````

#### two args

`````js
function f(a,b,){}
`````

#### cannot elide

`````js
function f(a,,){}
`````

#### after default

`````js
function f(a = b,){}
`````

#### not allowed after rest

`````js
function f(...a,){}
`````

#### after array destruct

`````js
function f([x],){}
`````

#### after object destruct

`````js
function f({a},){}
`````

#### rest cant even have an default

`````js
function f(...a = x,){}
`````

#### after array destruct with default

`````js
function f([x] = y,){}
`````

#### after object destruct with default

`````js
function f({a} = b,){}
`````
