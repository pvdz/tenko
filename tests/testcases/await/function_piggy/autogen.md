# Tenko parser test cases

> This is a single file that should display all the function test cases where the `await` piggy is used

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> function f(await) {}
> `````

> `````js
> function f(await) {}
> `````

> `````js
> function f(...await) {}
> `````

> `````js
> function f(a = await) {}
> `````

> `````js
> function f(a = await b) {}
> `````

> `````js
> function f({await}) {}
> `````

> `````js
> function f({a = await}) {}
> `````

> `````js
> function f({a = await b}) {}
> `````

> `````js
> function f({a: b = await}) {}
> `````

> `````js
> function f({a: b = await c}) {}
> `````

> `````js
> function f([a = await]) {}
> `````

> `````js
> function f([a = await b]) {}
> `````

> `````js
> async function f(await) {}
> `````

> `````js
> async function f(await) {}
> `````

> `````js
> async function f(...await) {}
> `````

> `````js
> async function f(a = await) {}
> `````

> `````js
> async function f(a = await b) {}
> `````

> `````js
> async function f({await}) {}
> `````

> `````js
> async function f({a = await}) {}
> `````

> `````js
> async function f({a = await b}) {}
> `````

> `````js
> async function f({a: b = await}) {}
> `````

> `````js
> async function f({a: b = await c}) {}
> `````

> `````js
> async function f([a = await]) {}
> `````

> `````js
> async function f([a = await b]) {}
> `````

> `````js
> async function g() {
>   function f(await) {}
> }
> `````

> `````js
> async function g() {
>   function f(await) {}
> }
> `````

> `````js
> async function g() {
>   function f(...await) {}
> }
> `````

> `````js
> async function g() {
>   function f(a = await) {}
> }
> `````

> `````js
> async function g() {
>   function f(a = await b) {}
> }
> `````

> `````js
> async function g() {
>   function f({await}) {}
> }
> `````

> `````js
> async function g() {
>   function f({a = await}) {}
> }
> `````

> `````js
> async function g() {
>   function f({a = await b}) {}
> }
> `````

> `````js
> async function g() {
>   function f({a: b = await}) {}
> }
> `````

> `````js
> async function g() {
>   function f({a: b = await c}) {}
> }
> `````

> `````js
> async function g() {
>   function f([a = await]) {}
> }
> `````

> `````js
> async function g() {
>   function f([a = await b]) {}
> }
> `````

### Templates

#### test

`````js
#
`````
