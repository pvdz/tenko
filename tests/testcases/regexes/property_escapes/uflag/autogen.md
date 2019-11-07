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

#### Property escapes base case

Illegal without u-flag and without webcompat

`````js
/\P{Hex}/#
`````

#### Class property escapes base case

Illegal without u-flag and without webcompat

`````js
/[\p{Hex}]/#
`````

#### Double property escapes 

`````js
/\P{Hex}\P{Hex}/#
`````

#### Double class property escapes 

`````js
/[\p{Hex}\P{Hex}]/#
`````

#### Valid binary

`````js
/\P{Script_Extensions=Connector_Punctuation}/#;
`````

#### Invalid binary name that appears in other table

`````js
/\P{ASCII=Connector_Punctuation}/#;
`````

#### Invalid binary value that appears in other table

`````js
/\P{Script_Extensions=Variation_Selector}/#;
`````

#### Valid binary in character class

`````js
/[\p{Script_Extensions=Connector_Punctuation}]/#;
`````

#### Binary with unknown name

`````js
/\P{ASCNOPE=Connector_Punctuation}/#;
`````

#### Binary with unknown value

`````js
/\p{Script_Extensions=NONONO}/#;
`````

#### Binary double =

`````js
/\P{Script_Extensions=Connector_Punctuation=Connector_Punctuation}/#;
`````

#### Binary with empty name

`````js
/\p{=Connector_Punctuation}/#;
`````

#### Binary with empty value

`````js
/\P{Script_Extensions=}/#;
`````

#### Empty arg

`````js
/\p{}/#;
`````

#### Unknown loe name

`````js
/\P{JavaScript}/#;
`````

#### Digits should fail everywhere

This fails because in webcompat the fallback is not allowed to have a quantifier. Since an invalid name that only consists of digits would match the quantifier, it fails anyways.

### FAIL

`````js
/\p{1234}/#;
`````

#### Digits in char class

Should this be fine without u-flag in webcompat? Here the tail is not a quantifier, just chars in the class, which is fine.

`````js
/[\p{1234}]/#;
`````

#### Digits with comma

This fails because in webcompat the fallback is not allowed to have a quantifier. Since an invalid name that only consists of digits would match the quantifier, it fails anyways.

### FAIL

`````js
/\p{1,1234}/#;
`````

#### Digits with value

Should pass webcompat

`````js
/\p{1=1234}/#;
`````

#### Digits with value unclosed

Should pass webcompat

`````js
/\p{1=1234/#;
`````
