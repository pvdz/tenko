# Tenko parser test cases

> The first character after a numeric literal can not be ident start or a decimal digit
>
> There are a bunch of ways that lead to a numeric literal and it applies to any such number.
>
> Web compat has a bunch of exceptions;
>
> - `/a${1}/`,  this is:
>   - https://tc39.es/ecma262/#prod-annexB-Term
>     - Term:
>       - Assertion
>       - ExtendedAtom
>   - https://tc39.es/ecma262/#prod-annexB-ExtendedAtom
>     - ExtendedAtom: 
>       - InvalidBracedQuantifier
>   - https://tc39.es/ecma262/#prod-annexB-InvalidBracedQuantifier
>     - `{` DecimalDigits `}`
>  > ExtendedAtom :: InvalidBracedQuantifier
>  >  It is a Syntax Error if any source text matches this rule.
>
> - So this is an explicit syntax error, while (`{a}` or unclosed `{1` would have been acceptable).
> - `/a${1}/u` is just illegal because the u-flag is like strict mode
> - `/a$+/` is illegal because that path ends in https://tc39.es/ecma262/#prod-annexB-ExtendedPatternCharacter which excludes `+`

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> *
> `````

> `````js
> ?
> `````

> `````js
> +
> `````

> `````js
> {1}
> `````

> `````js
> {a}
> `````

> `````js
> {
> `````

> `````js
> *?
> `````

> `````js
> +?
> `````

> `````js
> {5,}?
> `````

> `````js
> {a}?
> `````

> `````js
> {?
> `````

### Templates

#### start of input, no u-flag

`````js
/^#foo/
`````
#### start of input, u-flag

`````js
/^#foo/u
`````

#### end of input, no u-flag

`````js
/foo$#/
`````

#### end of input, u-flag

`````js
/foo$#/u
`````

#### lookbehind

`````js
/(?<=was)#/u
`````

#### negative lookbehind

`````js
/(?<!was)#/u
`````

#### named capturing group is not an assert

`````js
/(?<name>x)#/u
`````
