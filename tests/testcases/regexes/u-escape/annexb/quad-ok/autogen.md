# Tenko parser test cases

> :: regexes
>
> ::> u-escape
>
> This set of tests is to check what happens with ranges with double quad unicode escapes without u-flag in webcompat mode
>
> There is a whole set of cases to consider here and it's just easier to put them in one gen file, with and without u-flag
>
> This set checks valid unicode double quad escapes (\uD83D\uDCA9 or "PILE OF POO" (U+1F4A9), in particular without u-flag, and ranges in webcompat mode
>
> (I don't think a valid test exists where the double quad is valid with u-flag as lhs, and the range is invalid in webcompat without u-flag, because the valid quad always ends with 0-9 a-b, while a valid u-flag rhs for the range would have to start with either `\u` (which is always higher than hex digits) or a codepoint that starts with a surrogate head, which is always higher than a hex digit). So either way, all cases valid with u-flag, are also valid without u-flag)
>
> (Likewise I don't think there's a case where the double quad range is illegal with u-flag while legal without u-flag in webcompat)

## Input4

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

Fails in any case

> `````js
> /[\uD83D\uDCAB-\uDCAA]/
> `````

Fails with u-flag and can pass without u-flag (in webcompat the range becomes `\uDCAB - \uDCAC` and is a valid range)

> `````js
> /[\uD83D\uDCAB-\uDCAC]/
> `````

Passes with u-flag but fails otherwise (in webcompat the range becomes `} - u` and is an invalid range)

> `````js
> /[\u{1F4A9}-\uD83D\uDCA9]/
> `````

Fails in any case

> `````js
> /[\u{1F4AA}-\uD83D\uDCA9]/
> `````

> `````js
> /[a-\uD83D\uDCA9-0]/
> `````

> `````js
> /[a-\uD83D\uDCA9-9]/
> `````

> `````js
> /[\u{1F4A9}-\uD83D\uDCA9-0]/
> `````

> `````js
> /[\u{1F4A9}-\uD83D\uDCA9-9]/
> `````

> `````js
> /[\u{1F4AA}-\uD83D\uDCA9-\uDCA8]/
> `````

> `````js
> /[\u{1F4AA}-\uD83D\uDCA9-\uDCAA]/
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
