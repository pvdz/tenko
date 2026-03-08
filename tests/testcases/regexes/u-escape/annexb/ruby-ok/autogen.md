# Tenko parser test cases

> :: regexes
>
> ::> u-escape
>
> This set of tests is to check what happens with ranges with unicode ruby escapes without u-flag in webcompat mode
>
> There is a whole set of cases to consider here and it's just easier to put them in one gen file, with and without u-flag
>
> This set checks valid unicode ruby escapes, in particular without u-flag, and ranges in webcompat mode

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

Passes with u-flag but fails otherwise (in webcompat the range becomes `} - a` and is an invalid range)

> `````js
> /[\u{1}-a]/
> `````

Fails in any case

> `````js
> /[\u{500}-a]/
> `````

Fails with u-flag and can pass without u-flag (in webcompat the range becomes `} - }` and is a valid range)

> `````js
> /[\u{1}-}]/
> `````

Passes with u-flag but fails otherwise (in webcompat the range becomes `z - u` and is an invalid range)

> `````js
> /[z-\u{500}]/
> `````

Fails in any case

> `````js
> /[z-\u{1}]/
> `````

Fails with u-flag and can pass without u-flag (in webcompat the range becomes `t - u` and is a valid range)

> `````js
> /[t~\u{1}]/
> `````

Passes with u-flag but fails otherwise (in webcompat the range becomes `} - u` and is an invalid range)

> `````js
> /[\u{1}-\u{10}]/
> `````

Fails in any case

> `````js
> /[\u{10}-\u{1}]/
> `````

With u-flag this is a valid range `ascii(a) - 0x500` and two individual characters `-` and `}`
Without u-flag in webcompat mode, these are two valid ranges (`a - u` and `} - }`), and extra chars in the middle (`{`, `5`, `0`, `0`)

> `````js
> /[a-\u{500}-}]/
> `````

With u-flag this is an invalid range `ascii(a) - 0x5` and two individual characters `-` and `}`
Without u-flag in webcompat mode, these are two valid ranges (`a - u` and `} - }`), and extra chars in the middle (`{`, `5`)

> `````js
> /[a-\u{5}-}]/
> `````

With u-flag this is a valid range `ascii(z) - 0x500` and two individual characters `-` and `}`
Without u-flag in webcompat mode, these are invalid range `z - u` and valid range `} - }`, and extra chars in the middle (`{`, `5`, `0`, `0`)

> `````js
> /[z-\u{500}-}]/
> `````

With u-flag this is an invalid range `ascii(z) - 0x5` and two individual characters `-` and `}`
Without u-flag in webcompat mode, these are invalid range `z - u` and valid range `} - }`, and extra chars in the middle (`{`, `5`)

> `````js
> /[z-\u{5}-}]/
> `````

With u-flag this is a valid range `ascii(a) - 0x500` and two individual characters `-` and `b`
Without u-flag in webcompat mode, these are valid range `a - u` and invalid range `} - b`, and extra chars in the middle (`{`, `5`, `0`, `0`)

> `````js
> /[a-\u{500}-b]/
> `````

With u-flag this is an invalid range `ascii(a) - 0x5` and two individual characters `-` and `}`
Without u-flag in webcompat mode, these are valid range `a - u` and invalid range `} - b`, and extra chars in the middle (`{`, `5`)

> `````js
> /[a-\u{5}-b]/
> `````

With u-flag this is a valid range `ascii(a) - 0x500` and two individual characters `-` and `b`
Without u-flag in webcompat mode, these are two invalid ranges `z - u` and `} - b`, and extra chars in the middle (`{`, `5`, `0`, `0`)

> `````js
> /[z-\u{500}-b]/
> `````

With u-flag this is an invalid range `ascii(a) - 0x5` and two individual characters `-` and `}`
Without u-flag in webcompat mode, these are two invalid ranges `z - u` and `} - b`, and extra chars in the middle (`{`, `5`)

> `````js
> /[z-\u{5}-b]/
> `````

### Templates

#### without u-flag

`````js
#
`````

#### with u-flag

`````js
#u
`````
