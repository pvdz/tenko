# Tenko parser test cases

- Path: zeparser3/tests/testcases/const_statement/binding_generic/object_pattern_binding_declarations/autogen.md

> :: const statement : binding generic
>
> ::> object pattern binding declarations

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> {} = x;
> `````

> `````js
> {,} = x;
> `````

> `````js
> {,,} = x;
> `````

> `````js
> {foo} = x;
> `````

> `````js
> {foo,} = x;
> `````

> `````js
> {foo,,} = x;
> `````

> `````js
> {,foo} = x;
> `````

> `````js
> {,,foo} = x;
> `````

> `````js
> {foo,bar} = x;
> `````

> `````js
> {foo,,bar} = x;
> `````

> `````js
> {foo} = x, {foo} = y;
> `````

> `````js
> {foo} = x, b;
> `````

> `````js
> {foo} = x, b = y;
> `````

> `````js
> x, {foo} = y;
> `````

> `````js
> x = y, {foo} = z;
> `````

> `````js
> {foo=a} = x;
> `````

> `````js
> {foo=a,bar} = x;
> `````

> `````js
> {foo,bar=b} = x;
> `````

> `````js
> {foo=a,bar=b} = x;
> `````

> `````js
> {foo:a} = x;
> `````

> `````js
> {foo:a,bar} = x;
> `````

> `````js
> {foo,bar:b} = x;
> `````

> `````js
> {foo:a,bar:b} = x;
> `````

> `````js
> {foo:a,bar:b} = x;
> `````

> `````js
> {foo:a=b} = x;
> `````

> `````js
> {foo:a=b, bar:c=d} = x;
> `````

> `````js
> {foo};
> `````

> `````js
> {foo=a};
> `````

> `````js
> {foo:a};
> `````

> `````js
> {foo:a=b};
> `````

> `````js
> {foo}, bar;
> `````

> `````js
> foo, {bar};
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
