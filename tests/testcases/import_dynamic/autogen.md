# Tenko parser test cases

> Dynamic import will be introduced in ES2020 / ES11 and is a fairly simple extension syntactically because `import` was already very restricted.

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> undefined
> `````

> `````js
> 10
> `````

> `````js
> 11
> `````

> `````js
> Infinity
> `````

### Templates

- `es = #`

#### Simple statement case

`````js
import('foo');
`````

#### Simple expression case

`````js
let x = import('foo');
`````

#### Argument is dynamic

`````js
import(a + b);
`````

#### Argument is NOT multiple args

## FAIL

`````js
import(a, b);
`````

#### Cannot use spread

## FAIL

`````js
import(...a);
`````

#### Can have arbitrary tail in statement

`````js
import('foo').den();
`````

#### Can have arbitrary tail in expression

`````js
foo(import('foo').den());
`````

#### Arg regex case

`````js
import(/foo/)
`````

#### Statement div case

`````js
import(/foo/) / bar
`````

#### Statement regex no flag

## FAIL

`````js
import(/foo/) /bar/
`````

#### Statement regex no flag no asi

## FAIL

`````js
import(/foo/)
/bar/
`````

#### Statement regex flag is division

`````js
import(/foo/) /bar/g
`````

#### Statement newline regex flag is division no asi

## FAIL

`````js
import(/foo/)
/bar/g
`````

#### Expression div

`````js
x  = import(/foo/) / bar
`````

#### Expression regex

`````js
x  = import(/foo/) /bar/
`````

#### Expression regex flag

`````js
x  = import(/foo/) /bar/g
`````

#### As arg of `new`

`import` + `(` is always considered a `CallExpression` type and `new` is not allowed to have that node type as its arg.

`````js
new import(x);
`````

#### As grouped arg of `new`

Syntactically valid, but you'd be doing `new (new Promise)`... *shrug*

`````js
new (import(x));
`````

#### NoIn

Syntactically valid, but you'd be doing `new (new Promise)`... *shrug*

https://tc39.es/ecma262/#prod-ImportCall

> ImportCall [Yield, Await]:
>
>   `import` `(` AssignmentExpression [+In, ?Yield, ?Await] `)`

`````js
import(x in y);
`````

#### No trailing comma

The grammar does not allow for a trailing argument comma

## FAIL

`````js
import(x,);
`````
