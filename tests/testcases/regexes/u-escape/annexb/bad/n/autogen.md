# Tenko parser test cases

> :: regexes
>
> ::> u-escape
>
> This set of tests is to check what happens with ranges with incomplete unicode escapes without u-flag in webcompat mode
>
> There is a whole set of cases to consider here and it's just easier to put them in one gen file, with and without u-flag
>
> This set tests invalid unicode ruby escapes in ranges without u-flag in webcompat. They are all invalid with u-flag or without annexb.
>
> `\u-`, `\u{-`, `\u{}-`, `\u{a-`, `\u{ab-`, `\ua-`, `\uab-`, `\uabc-`

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> \u
> `````

> `````js
> \u{
> `````

Note that the ruby escape requires at least one hex digit in order to be considered valid

> `````js
> \u{}
> `````

> `````js
> \u{b
> `````

> `````js
> \u{ab
> `````

Too long: max valid value is 0x10ffff

> `````js
> \u{11abcd
> `````

> `````js
> \ub
> `````

> `````js
> \uab
> `````

> `````js
> \uabc
> `````

### Templates

Single range, left and right and both. Double range. All variations of good and bad ranges.

#### a-u

`````js
/[a-#]/
`````

#### z-u

`````js
/[z-#]/
`````

#### u-~

`````js
/[#-~]/
`````

#### u-a

(All cases end with a char higher than `ascii(a)` so these should all fail)

`````js
/[#-a]/
`````

#### a-u b-~

Both ranges should be valid in webcompat without u-flag

`````js
/[a-#-~]/
`````

#### z-u b-~

The left range should always be invalid

`````js
/[z-#-~]/
`````

#### a-u b-a

The right range should always be invalid

`````js
/[a-#-a]/
`````

#### z-u b-a

Both ranges are always invalid

`````js
/[z-#-a]/
`````
