# Tenko parser test cases

- Path: zeparser3/tests/testcases/const_statement/binding_generic/array_pattern_binding_declarations/autogen.md

> :: const statement : binding generic
>
> ::> array pattern binding declarations

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> [] = x;
> `````

> `````js
> [,] = x;
> `````

> `````js
> [,,] = x;
> `````

> `````js
> [foo] = x;
> `````

> `````js
> [foo,] = x;
> `````

> `````js
> [foo,,] = x;
> `````

> `````js
> [,foo] = x;
> `````

> `````js
> [,,foo] = x;
> `````

> `````js
> [foo,bar] = x;
> `````

> `````js
> [foo,,bar] = x;
> `````

> `````js
> [foo] = x, [foo] = y;
> `````

> `````js
> [foo] = x, b;
> `````

> `````js
> [foo] = x, b = y;
> `````

> `````js
> x, [foo] = y;
> `````

> `````js
> x = y, [foo] = z;
> `````

> `````js
> [foo=a] = c;
> `````

> `````js
> [foo=a,bar] = x;
> `````

> `````js
> [foo,bar=b] = x;
> `````

> `````js
> [foo=a,bar=b] = x;
> `````

> `````js
> [foo];
> `````

> `````js
> [foo=a];
> `````

> `````js
> [foo], bar;
> `````

> `````js
> foo, [bar];
> `````

> `````js
> [...bar] = obj;
> `````

> `````js
> [foo, ...bar] = obj;
> `````

> `````js
> [...foo, bar] = obj;
> `````

> `````js
> [...foo,] = obj;
> `````

> `````js
> [...foo,,] = obj;
> `````

> `````js
> [...[a, b]] = obj;
> `````

> `````js
> [...[a, b],] = obj;
> `````

> `````js
> [...[a, b],,] = obj;
> `````

> `````js
> [x, ...[a, b]] = obj;
> `````

> `````js
> [...bar = foo] = obj;
> `````

> `````js
> [... ...foo] = obj;
> `````

> `````js
> [...] = obj;
> `````

> `````js
> [...,] = obj;
> `````

> `````js
> [.x] = obj;
> `````

> `````js
> [..x] = obj;
> `````

> `````js
> [a=[...b], ...c] = obj;
> `````

### Templates

#### var

`````js
var #
`````

#### let

`````js
let #
`````

#### const

`````js
const #
`````
