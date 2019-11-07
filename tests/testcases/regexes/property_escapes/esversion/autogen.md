# Tenko parser test cases

- Path: zeparser3/tests/testcases/regexes/property_escapes/not_web_compat/autogen.md

> :: regexes : property escapes : esversions

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> undefined
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

#### Property escape without u-flag

`````js
/\p{Hex}/
`````

#### Property escape with u-flag

`````js
/\p{Hex}/u
`````

#### Char class property escape without u-flag

`````js
/[\p{Hex}]/
`````

#### Char class property escape without u-flag

`````js
/[\p{Hex}]/u
`````

#### Invert property escape without u-flag

`````js
/\P{Hex}/
`````

#### Invert property escape with u-flag

`````js
/\P{Hex}/u
`````

#### Invert char class property escape without u-flag

`````js
/[\P{Hex}]/
`````

#### Invert char class property escape without u-flag

`````js
/[\p{Hex}]/u
`````
