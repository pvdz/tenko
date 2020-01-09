# Tenko parser test cases

- Path: zeparser3/tests/testcases/var_statement/binding_generic/reserved_words/autogen.md

> :: functions
>
> ::> dupe local vars

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> var
> `````

> `````js
> let
> `````

> `````js
> const
> `````

### Templates

#### Binding - function decl

`````js
function g(){ # f = 1; function f() {} }
`````

#### Function decl - binding 

`````js
function g(){ function f() {} # f = 1; }
`````

#### Global: binding - function decl

`````js
# f = 1; function f() {}
`````

#### Global: function decl - binding 

`````js
function f() {} # f = 1;
`````

#### Global block nested: binding - function decl

`````js
{ # f = 1; function f() {} }
`````

#### Global block nested: function decl - binding 

`````js
{ function f() {} # f = 1; }
`````

#### Function block nested: binding - function decl

`````js
function g(){ { # f = 1; function f() {} } }
`````

#### Function block nested: function decl - binding 

`````js
function g(){ { function f() {} # f = 1; } }
`````
