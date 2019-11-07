# Tenko parser test cases

> :: regexes
>
> ::> u-escape

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> /\u{/
> `````

> `````js
> /\u{a}/
> `````

> `````js
> /\u{20}/
> `````

> `````js
> /\u{20/
> `````

> `````js
> /[\u{20]/
> `````

> `````js
> /\u{z/
> `````

> `````js
> /[\u123]/
> `````

> `````js
> /[\u{00000001}]/
> `````

> `````js
> /\u{a}/
> `````

> `````js
> /x\ubcde\udabcy/
> `````

> `````js
> /[x\ubcde\udabcy]/
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
