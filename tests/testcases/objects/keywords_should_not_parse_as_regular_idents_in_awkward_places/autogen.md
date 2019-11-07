# Tenko parser test cases

- Path: zeparser3/tests/testcases/objects/keywords_should_not_parse_as_regular_idents_in_awkward_places/autogen.md

> :: objects
>
> ::> keywords should not parse as regular idents in awkward places

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

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
> ({function(){}})
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

#### destructuring assignment as shorthand

`````js
({#} = x);
`````

#### destructuring assignment as property value

property is valid assignment target so should work

`````js
({x: #} = x);
`````

#### in object as shorthand

`````js
({#});
`````

#### in object as value

`````js
({x: #});
`````

#### in arrow head as shorthand

`````js
({#}) => x;
`````

#### in arrow head as alias

`````js
({x: #}) => x;
`````
