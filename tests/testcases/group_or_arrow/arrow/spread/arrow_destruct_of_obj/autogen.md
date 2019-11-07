# Tenko parser test cases

- Path: zeparser3/tests/testcases/parens/arrow/spread/arrow_destruct_of_obj/autogen.md

> :: parens : arrow : spread
>
> ::> arrow destruct of obj

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> ({a:b,...obj}) => {}
> `````

> `````js
> ({...obj} = {}) => {}
> `````

> `````js
> ({...(a,b),c})
> `````

> `````js
> ({...a,b,c})
> `````

> `````js
> ({...(obj)}) => {}
> `````

> `````js
> ({...(a,b)}) => {}
> `````

> `````js
> ({...{a,b}}) => {}
> `````

> `````js
> ({...[a,b]}) => {}
> `````

### Templates

#### case

`````js
#
`````
