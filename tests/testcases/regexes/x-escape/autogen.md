# Tenko parser test cases

> :: regexes
>
> ::> x-escape

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

This should be fine in web compat mode because the \x rejects as a hex escape but no backtracking is required to parse it as a `SourceCharacterIdentityEscape` instead.

> `````js
> /[\x]/
> `````

In this case the tokenizer has consumed `\x1` before it failed. It's not allowed to backtrack to retroactively accept the `\x` as a `SourceCharacterIdentityEscape` so it must bail.

> `````js
> /[\x1]/
> `````

It should accept the `\x` as a `SourceCharacterIdentityEscape` because it can't parse a hex escape beyond the x

> `````js
> /[\xa]/
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
