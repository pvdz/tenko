# Tenko parser test cases

- Path: zeparser3/tests/testcases/arrays/keywords_should_not_parse_as_regular_idents_in_awkward_places/autogen.md

> :: arrays
>
> ::> keywords should not parse as regular idents in awkward places

See counter-test in arrow where this stuff is disallowed

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> async ()=>x
> `````

> `````js
> class{}
> `````

> `````js
> delete x.y
> `````

> `````js
> false
> `````

> `````js
> function(){}
> `````

> `````js
> new x
> `````

> `````js
> null
> `````

> `````js
> true
> `````

> `````js
> this
> `````

> `````js
> typeof x
> `````

> `````js
> void x
> `````

> `````js
> x + y
> `````

> `````js
> [].length
> `````

> `````js
> [x].length
> `````

> `````js
> {}.length
> `````

> `````js
> {x: y}.length
> `````

### Templates

#### in array

`````js
[ # ]
`````

#### in destructuring assignment as shorthand

property is valid assignment target so should work

`````js
[ # ] = x
`````

#### in arrow head

`````js
([ # ]) => {}
`````
