# Tenko parser test cases

> :: let declaration : binding generic
>
> ::> let newline ident
>
> The idea is that normally, `let \n foo` will not trigger ASI while `let \n return x` does trigger ASI. This is because the keyword is part of the grammar and as such triggers ASI when the next token is invalid.
>
> Static semantics, however, apply after the parsing step. Certain pseudo-keywords like `await` and `yield` are only invalidated through static semantics, so that happens after parsing.
>
> These cases try to ensure that cases like `let \n await` are valid in sloppy, even inside an async function, while `let \n await 0` always throws, regardless, because the `0` cannot become valid.
>
> As per https://tc39.es/ecma262/#sec-identifiers-static-semantics-early-errors this applies to
> - await
> - yield
> - "implements", "interface", "let", "package",  "private", "protected", "public", "static"
> - "arguments" or "eval".

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> await
> `````

> `````js
> await 0
> `````

> `````js
> yield
> `````

> `````js
> yield 0
> `````

> `````js
> let
> `````

> `````js
> let x
> `````

> `````js
> eval
> `````

> `````js
> eval(foo)
> `````

> `````js
> arguments
> `````

> `````js
> arguments.length
> `````

> `````js
> static
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

### Templates

#### base without newline

`````js
let #
`````

#### base newline

`````js
let
#
`````

#### newline in async

`````js
async function f() {
  let
  #
}
`````

#### newline in generator

`````js
function *f() {
  let
  #
}
`````

#### newline in strict function

`````js
function f() {
  "use strict";
  let
  #
}
`````
