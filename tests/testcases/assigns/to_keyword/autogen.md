# Tenko parser test cases

- Path: zeparser3/tests/testcases/assigns/assigning_to_keyword/autogen.md

> :: assigns
>
> ::> assigning to keyword

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> foo
> `````

> `````js
> break
> `````

> `````js
> case
> `````

> `````js
> catch
> `````

> `````js
> class
> `````

> `````js
> const
> `````

> `````js
> continue
> `````

> `````js
> debugger
> `````

> `````js
> default
> `````

> `````js
> delete
> `````

> `````js
> do
> `````

> `````js
> else
> `````

> `````js
> export
> `````

> `````js
> extends
> `````

> `````js
> finally
> `````

> `````js
> for
> `````

> `````js
> function
> `````

> `````js
> if
> `````

> `````js
> import
> `````

> `````js
> in
> `````

> `````js
> instanceof
> `````

> `````js
> new
> `````

> `````js
> return
> `````

> `````js
> super
> `````

> `````js
> switch
> `````

> `````js
> this
> `````

> `````js
> throw
> `````

> `````js
> try
> `````

> `````js
> typeof
> `````

> `````js
> var
> `````

> `````js
> void
> `````

> `````js
> while
> `````

> `````js
> with
> `````

> `````js
> null
> `````

> `````js
> true
> `````

> `````js
> false
> `````

> `````js
> enum
> `````

> `````js
> let
> `````

> `````js
> implements
> `````

> `````js
> package
> `````

> `````js
> protected
> `````

> `````js
> interface
> `````

> `````js
> private
> `````

> `````js
> public
> `````

> `````js
> yield
> `````

> `````js
> static
> `````

> `````js
> await
> `````

> `````js
> eval
> `````

> `````js
> arguments
> `````

### Templates

#### assign to keyword as a var name

`````js
# = x
`````

#### assigning to keyword paren wrapped

`````js
(# = x)
`````

#### should listen to use strict directive in global bare

`````js
"use strict"; # = x;
`````

#### should listen to use strict directive in global wrapped

`````js
"use strict"; (# = x);
`````

#### should listen to use strict directive in function bare

`````js
function f() {
  "use strict";
  # = x
}
`````

#### should listen to use strict directive in function wrapped

`````js
function f() {
  "use strict";
  (# = x);
}
`````

#### should listen to use strict directive in getter bare

`````js
foo = {
  get x(){
    "use strict";
    # = x
  }
}
`````

#### should listen to use strict directive in getter wrapped

`````js
foo = {
  get x(){
    "use strict";
    (# = x);
  }
}
`````

#### array with assign to unwrapped

`````js
async x => # = 1
`````

#### array with assign to paren-wrapped

`````js
async x => (#) = 1
`````

#### assign to paren-wrapped keyword var in param default

`````js
(x = (#) = f) => {}
`````

#### assign to paren-wrapped keyword in param default

`````js
async (x = (#) = f) => {}
`````

#### assign to paren-wrapped keyword var inside delete in param default

`````js
(x = delete ((#) = f)) => {}
`````

#### assign to paren-wrapped keyword inside delete in param default

`````js
async (x = delete ((#) = f)) => {}
`````

#### assign to keyword in generator

`````js
function *f(){
  # = 1;
}
`````

#### assign to paren wrapped keyword in a generator

`````js
function *f(){
  (#) = 1;
}
`````

#### assign to paren-wrapped keyword in arrow param default

`````js
(x = (#) = f) => {}
`````

#### assign to paren-wrapped keyword in generator param default

`````js
function *f(x = (#) = f) {}
`````

#### assign to paren-wrapped VALUE var inside delete in param default

`````js
(x = delete ((#) = f)) => {}
`````

#### assign to paren-wrapped VALUE keyword inside delete in param default

`````js
function *f(x = delete ((#) = f)) {}
`````
