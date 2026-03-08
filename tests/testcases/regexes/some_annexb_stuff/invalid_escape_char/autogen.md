# Tenko parser test cases

- Path: zeparser3/tests/testcases/regexes/some_annexb_stuff/syntax_chars_without_context/autogen.md

> :: regexes : some annexb stuff
>
> ::> syntax chars without context

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases


> `````js
> a
> `````

Note: the character value of \b in char classes is 8 (the backspace). so a-\b is error.

> `````js
> b
> `````

Note: \B (etc) is legal in ranges in webcompat as long as there is no u-flag

> `````js
> B
> `````

The character value of an unqualified \c (with no param) is the backslash! Not the `c`
So a-\c is bad where A-\c is good (backslash sits between lower and upper case)

> `````js
> c
> `````

### Templates

#### Atom without uflag

`````js
/\#/
`````

#### Atom with uflag

`````js
/\#/u
`````

#### Character class without uflag

`````js
/[\#]/
`````

#### Character class with uflag

`````js
/[\#]/u
`````

#### Character class range left without uflag

`````js
/[\#-z]/
`````

#### Character class range left with uflag

`````js
/[\#-z]/u
`````

#### Character class range right without uflag

The `a-\B` case fails without web compat or with u-flag because it doesn't allow `\B` at all
The `a-\B` case fails in web compat because `a-B` is an illegal range (`97 - 66`)

`````js
/[a-\#]/
`````

#### Character class range right with uflag

`````js
/[a-\#]/u
`````

#### Character class range left trailing without uflag

`````js
/[\#-]/
`````

#### Character class range left trailing with uflag

`````js
/[\#-]/u
`````

#### Character class range right leading without uflag

`````js
/[-\#]/
`````

#### Character class range right leading with uflag

`````js
/[-\#]/u
`````
