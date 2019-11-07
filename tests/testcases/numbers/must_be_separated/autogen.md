# Tenko parser test cases

> The first character after a numeric literal can not be ident start or a decimal digit
>
> There are a bunch of ways that lead to a numeric literal and it applies to any such number.

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> 1
> `````

> `````js
> 134
> `````

> `````js
> 2
> `````

> `````js
> 3
> `````

> `````js
> 4
> `````

> `````js
> 5
> `````

> `````js
> 6
> `````

> `````js
> 7
> `````

> `````js
> 8
> `````

> `````js
> 9
> `````

> `````js
> 3
> `````

> `````js
> .24
> `````

> `````js
> 23.
> `````

> `````js
> 3.42
> `````

> `````js
> .24e
> `````

> `````js
> 23.e
> `````

> `````js
> .24+e
> `````

> `````js
> .24-e
> `````

> `````js
> .24+e0
> `````

> `````js
> .24-e7
> `````

> `````js
> 3.42e
> `````

> `````js
> .24E
> `````

> `````js
> 23.E
> `````

> `````js
> 3.42E
> `````

> `````js
> .24e1
> `````

> `````js
> 23.e2
> `````

> `````js
> 3.42e3
> `````

> `````js
> .24E4
> `````

> `````js
> 23.E5
> `````

> `````js
> 3.42E6
> `````

> `````js
> .24e83
> `````

> `````js
> 23.E56
> `````

> `````js
> 0
> `````

> `````js
> 02
> `````

> `````js
> 08
> `````

> `````js
> 01234567
> `````

> `````js
> 0x
> `````

> `````js
> 0X
> `````

> `````js
> 0x123
> `````

> `````js
> 0X456
> `````

> `````js
> 0xe
> `````

> `````js
> 0Xf
> `````

> `````js
> 0xF
> `````

> `````js
> 0Xa
> `````

> `````js
> 0b
> `````

> `````js
> 0B
> `````

> `````js
> 0b0
> `````

> `````js
> 0B0
> `````

> `````js
> 0b1
> `````

> `````js
> 0B1
> `````

> `````js
> 0b1
> `````

> `````js
> 0B1
> `````

> `````js
> 0o
> `````

> `````js
> 0O
> `````

> `````js
> 0o0
> `````

> `````js
> 0O0
> `````

> `````js
> 0o7
> `````

> `````js
> 0O5
> `````

> `````js
> 0o465
> `````

> `````js
> 0O034
> `````

### Templates

#### Valid base

`````js
# in x
`````

#### Invalid with in

## FAIL

`````js
#in y
`````

#### Invalid with instanceof

## FAIL

`````js
#instanceof x
`````

#### Trailing zero

Probably not an error in most examples, just a trailing zero

## FAIL

`````js
#0
`````

#### Trailing 9

Not an error in most cases where 9 is a valid digit, but binary/octal should reject it.

## FAIL

`````js
#9
`````

#### Semi

`````js
#;
`````

#### Blocked

(ASI?)

`````js
{#}
`````

#### Plus

`````js
#+1
`````

