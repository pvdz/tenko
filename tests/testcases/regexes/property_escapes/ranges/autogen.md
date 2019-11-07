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

#### Left of range

`````js
/[\p{Hex}-z]/#
`````

#### Right of range

`````js
/[a-\p{Hex}]/#
`````

#### Both sides

`````js
/[\p{Bidi_Mirrored}-\p{Hex}]/#
`````

#### Before non-range dash

`````js
/[\p{Hex}-]/#
`````

#### After non-range dash

`````js
/[-\p{Hex}]/#
`````
