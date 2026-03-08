# Tenko parser test cases

- Path: zeparser3/tests/testcases/strict_mode/tails_relevant_to_ASI_which_affects_directive_status/autogen.md

> :: strict mode
>
> ::> tails relevant to ASI which affects directive status

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> .foo
> `````

> `````js
> [foo]
> `````

> `````js
> ()
> `````

> `````js
> `x`
> `````

> `````js
>  + x
> `````

> `````js
> /f
> `````

> `````js
> /f/g
> `````

> `````js
> foo
> `````

> `````js
> ++x
> `````

> `````js
> --x
> `````

> `````js
> function f(){}
> `````

> `````js
> {x}
> `````

> `````js
> ;
> `````

> `````js
> 25
> `````

> `````js
> true
> `````

> `````js
> suffix = */ VALUE;
> `````

> `````js
> eval = 1;
> `````

### Templates

#### case


`````js
function f(){ 
  "use strict"
  #
}
`````
