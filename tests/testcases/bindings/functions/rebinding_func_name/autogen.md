# Tenko parser test cases

- Path: zeparser3/tests/testcases/var_statement/binding_generic/reserved_words/autogen.md

> :: functions
>
> ::> rebinding func name

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

#### Plain func declaration

`````js
function f(){ # f = 1 }
`````

#### Plain func expression

`````js
x = function f(){ # f = 1 }
`````

#### Plain method

`````js
x = {f(){ # f = 1 }}
`````

#### Async func declaration

`````js
async function f(){ # f = 1 }
`````

#### Async func expression

`````js
x = async function f(){ # f = 1 }
`````

#### Async method

`````js
x = {async f(){ # f = 1 }}
`````

#### Generator func declaration

`````js
function *f(){ # f = 1 }
`````

#### Generator func expression

`````js
x = function *f(){ # f = 1 }
`````

#### Generator method

`````js
x = {*f(){ # f = 1 }}
`````

#### Async generator func declaration

`````js
async function *f(){ # f = 1 }
`````

#### Async generator func expression

`````js
x = async function *f(){ # f = 1 }
`````

#### Async generator method

`````js
x = {async *f(){ # f = 1 }}
`````
