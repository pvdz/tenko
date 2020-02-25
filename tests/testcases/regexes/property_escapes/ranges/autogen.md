# Tenko parser test cases

> :: regexes : property escapes : uflag

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> u
> `````

> `````js
> g
> `````

### Templates

#### Left of range a

It's supposed to fail because without u-flag the range becomes `}-a` which is invalid. (With u-flag it would fail because a \p escape cannot be part of a range)

## FAIL

`````js
/[\p{Hex_Digit}-a]/#
`````

#### Left of range z

It's supposed to fail because without u-flag the range becomes `}-z` which is invalid. (With u-flag it would fail because a \p escape cannot be part of a range)

## FAIL

`````js
/[\p{Hex_Digit}-z]/#
`````

#### Left of range tilde

Because `}-~` is a valid range

`````js
/[\p{Hex_Digit}-~]/
`````

#### Right of range

`````js
/[a-\p{Hex_Digit}]/#
`````

#### Both sides

Fails because `}-p` is not a valid range

## FAIL

`````js
/[\p{Bidi_Mirrored}-\p{Hex_Digit}]/#
`````

#### Before non-range dash

`````js
/[\p{Hex_Digit}-]/#
`````

#### After non-range dash

`````js
/[-\p{Hex_Digit}]/#
`````
