# Tenko parser test cases

> This is a single file that should display all the function test cases where the `yield` piggy is used

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> function f(yield) {}
> `````

> `````js
> function f(yield) {}
> `````

> `````js
> function f(...yield) {}
> `````

> `````js
> function f(a = yield) {}
> `````

> `````js
> function f(a = yield b) {}
> `````

> `````js
> function f({yield}) {}
> `````

> `````js
> function f({a = yield}) {}
> `````

> `````js
> function f({a = yield b}) {}
> `````

> `````js
> function f({a: b = yield}) {}
> `````

> `````js
> function f({a: b = yield c}) {}
> `````

> `````js
> function f([a = yield]) {}
> `````

> `````js
> function f([a = yield b]) {}
> `````

> `````js
> function * f(yield) {}
> `````

> `````js
> function * f(yield) {}
> `````

> `````js
> function * f(...yield) {}
> `````

> `````js
> function * f(a = yield) {}
> `````

> `````js
> function * f(a = yield b) {}
> `````

> `````js
> function * f({yield}) {}
> `````

> `````js
> function * f({a = yield}) {}
> `````

> `````js
> function * f({a = yield b}) {}
> `````

> `````js
> function * f({a: b = yield}) {}
> `````

> `````js
> function * f({a: b = yield c}) {}
> `````

> `````js
> function * f([a = yield]) {}
> `````

> `````js
> function * f([a = yield b]) {}
> `````

> `````js
> function * g() {
>   function f(yield) {}
> }
> `````

> `````js
> function * g() {
>   function f(yield) {}
> }
> `````

> `````js
> function * g() {
>   function f(...yield) {}
> }
> `````

> `````js
> function * g() {
>   function f(a = yield) {}
> }
> `````

> `````js
> function * g() {
>   function f(a = yield b) {}
> }
> `````

> `````js
> function * g() {
>   function f({yield}) {}
> }
> `````

> `````js
> function * g() {
>   function f({a = yield}) {}
> }
> `````

> `````js
> function * g() {
>   function f({a = yield b}) {}
> }
> `````

> `````js
> function * g() {
>   function f({a: b = yield}) {}
> }
> `````

> `````js
> function * g() {
>   function f({a: b = yield c}) {}
> }
> `````

> `````js
> function * g() {
>   function f([a = yield]) {}
> }
> `````

> `````js
> function * g() {
>   function f([a = yield b]) {}
> }
> `````

### Templates

#### test

`````js
#
`````
