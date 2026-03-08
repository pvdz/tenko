# Tenko parser test cases

- Path: zeparser3/tests/testcases/strict_mode/header_requirements_for_directive_in_body/func_decl/autogen.md

> :: strict mode : header requirements for directive in body
>
> ::> func decl
> 
> these tests should cover cases where the header is fine in sloppy mode and throw when finding a use strict in the body
> 
> https://tc39.github.io/ecma262/#sec-identifiers-static-semantics-early-errors
> 
> > It is a Syntax Error if this phrase is contained in strict mode code and the StringValue of IdentifierName
> > is: "implements", "interface", "let", "package",  "private", "protected", "public", "static", or "yield".
> 
> Eval and arguments are explicitly forbidden binding names in strict mode
> 
> https://tc39.github.io/ecma262/#sec-function-definitions-static-semantics-early-errors
> 
> - 'eval'
> - 'arguments'
> 
> // Yield is always the YieldExpression in strict mode or in a generator context
> - 'yield'
> 
> // Let is disallowed through a static semantic rather than cfg
> - 'let'
> 
> // Other idents that are only keywords in strict mode
> - 'implements'
> - 'interface'
> - 'package'
> - 'private'
> - 'protected'
> - 'public'
> - 'static'

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> ok
> `````

> `````js
> eval
> `````

> `````js
> arguments
> `````

> `````js
> yield
> `````

> `````js
> let
> `````

> `````js
> implements
> `````

> `````js
> interface
> `````

> `````js
> package
> `````

> `````js
> private
> `````

> `````js
> protected
> `````

> `````js
> public
> `````

> `````js
> static
> `````

### Templates

#### function decl; as func name w/o directive

`````js
function #(a){ }
`````

#### function decl; as func name w directive

`````js
function #(b){ 
  "use strict"; 
}
`````

#### function decl; as param name w/o directive

`````js
function c(#){ }
`````

#### function decl; as param name w directive

`````js
function d(#){ 
  "use strict"; 
}
`````

#### function decl; assigned to in param default w/o directive

the default causes the error, not the usage, but whatever

`````js
function e(x=#=10){ }
`````

#### function decl; assigned to in param default w directive

the default causes the error, not the usage, but whatever

`````js
function f(x=#=10){
  "use strict"; 
}
`````

#### function expr; as func name w/o directive

`````js
f = function #(a){ }
`````

#### function expr; as func name w directive

`````js
f = function #(b){ 
  "use strict"; 
}
`````

#### function expr; as param name w/o directive

`````js
f = function c(#){ }
`````

#### function expr; as param name w directive

`````js
f = function d(#){ 
  "use strict";
}
`````

#### function expr; assigned to in param default w/o directive

the default causes the error, not the usage, but whatever

`````js
f = function e(x=#=10){ }
`````

#### function expr; assigned to in param default w directive

the default causes the error, not the usage, but whatever

`````js
f = function f(x=#=10){ 
  "use strict"; 
}
`````

#### arrow; as param name w/o directive

`````js
(#) => { }
`````

#### arrow; as param name w directive

`````js
(#) => {
  "use strict";
}
`````

#### arrow; assigned to in param default w/o directive

the default causes the error, not the usage, but whatever

`````js
(x=#=10) => { }
`````

#### arrow; assigned to in param default w directive

the default causes the error, not the usage, but whatever

`````js
(x=#=10) => {
  "use strict";
}
`````

#### obj method; as func name w/o directive

`````js
f = {#(a){ }}
`````

#### obj method; as func name w directive

`````js
f = {
  #(b){
    "use strict"; 
  }
}
`````

#### obj method; as param name w/o directive

`````js
f = {
  c(#){ }
}
`````

#### obj method; as param name w directive

`````js
f = {
  d(#){ 
    "use strict"; 
  }
}
`````

#### obj method; assigned to in param default w/o directive

the default causes the error, not the usage, but whatever

`````js
f = {
  e(x=#=10){ }
}
`````

#### obj method; assigned to in param default w directive

the default causes the error, not the usage, but whatever

`````js
f = {
  f(x=#=10){ 
    "use strict"; 
  }
}
`````

#### class method; as func name w/o directive

`````js
class A {
  #(a){ }
}
`````

#### class method; as func name w directive

`````js
class A {
  #(b){ 
    "use strict";
  }
}
`````

#### class method; as param name w/o directive

`````js
class A {
  c(#){ }
}
`````

#### class method; as param name w directive

`````js
class A {
  d(#){ 
    "use strict";
  }
}
`````

#### class method; assigned to in param default w/o directive

the default causes the error, not the usage, but whatever

`````js
class A {
  e(x=#=10){ }
}
`````

#### class method; assigned to in param default w directive

the default causes the error, not the usage, but whatever

`````js
class A {
  f(x=#=10){ 
    "use strict"; 
  }
}
`````

#### class constructor; as param name w/o directive

`````js
class A {
  constructor(#){ }
}
`````

#### class constructor; as param name w directive

`````js
class A {
  constructor(#){ 
    "use strict"; 
  }
}
`````

#### class constructor; assigned to in param default w/o directive

the default causes the error, not the usage, but whatever

`````js
class A {
  constructor(x=#=10){ }
}
`````

#### class constructor; assigned to in param default w directive

the default causes the error, not the usage, but whatever

`````js
class A {
  constructor(x=#=10){ 
    "use strict"; 
  }
}
`````
