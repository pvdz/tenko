# Tenko parser test cases

- Path: zeparser3/tests/testcases/functions/declaration/block_scoped/autogen.md

> :: functions 
>
> ::> function statements
>
> Function declarations in block statements ("function statements") are considered
> lexical declarations so any redeclaration that follows, even `var`, is illegal.
>
> Function modifiers (`async` etc) do not change this.

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> function f(){}
> `````

> `````js
> function *f(){}
> `````

> `````js
> async function f(){}
> `````

> `````js
> async function *f(){}
> `````

> `````js
> function(){}
> `````

### Templates

#### func func

It is explicitly allowed for function statements to be shadowed by function declarations.

https://tc39.es/ecma262/#sec-block-duplicates-allowed-static-semantics

This exception does not apply to two function statements.

`````js
{ # # }
`````

#### before and in block

Only okay for function decl vs function statement

`````js
# { # }
`````

#### in and after block

Only okay for function decl vs function statement

`````js
{ # } #
`````

#### try block

Try block is same as regular block in this context

`````js
try { # var f } catch (e) {}
`````

#### catch block

Catch block is same as regular block in this context

`````js
try { } catch (e) { # # }
`````
#### finally block

Finally block is same as regular block in this context

`````js
try { } finally { # # }
`````

#### switch case block

Switch block is same as regular block in this context

`````js
switch (x) { case c: # # }
`````

#### switch default block

Switch block is same as regular block in this context

`````js
switch (x) { default: # # }
`````

#### var func

Not okay

`````js
{ # var f }
`````

#### func var

This is okay because the var preceded the func and the check is applied left to right

`````js
{ var f; # }
`````

#### let func

Not okay

`````js
{ # let f }
`````

#### func let

Not okay

`````js
{ let f; # }
`````

#### const func

Not okay

`````js
{ # const f = x }
`````

#### func const

Not okay

`````js
{ const f = x; # }
`````

#### class func

Not okay

`````js
{ # class f {} }
`````

#### func class

Not okay

`````js
{ class f {} # }
`````
