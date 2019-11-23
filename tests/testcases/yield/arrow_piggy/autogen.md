# Tenko parser test cases

> This is a single file that should display all the arrow test cases where the `yield` piggy is used

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> yield => x
> `````

> `````js
> (yield) => x
> `````

> `````js
> (...yield) => x
> `````

> `````js
> (a = yield) => x
> `````

> `````js
> (a = yield b) => x
> `````

> `````js
> ({yield}) => x
> `````

> `````js
> ({a = yield}) => x
> `````

> `````js
> ({a = yield b}) => x
> `````

> `````js
> ({a: b = yield}) => x
> `````

> `````js
> ({a: b = yield c}) => x
> `````

> `````js
> ([a = yield]) => x
> `````

> `````js
> ([a = yield b]) => x
> `````

> `````js
> function * g() {
>   yield => x
> }
> `````

> `````js
> function * g() {
>   (yield) => x
> }
> `````

> `````js
> function * g() {
>   (...yield) => x
> }
> `````

> `````js
> function * g() {
>   (a = yield) => x
> }
> `````

> `````js
> function * g() {
>   (a = yield b) => x
> }
> `````

> `````js
> function * g() {
>   ({yield}) => x
> }
> `````

> `````js
> function * g() {
>   ({a = yield}) => x
> }
> `````

> `````js
> function * g() {
>   ({a = yield b}) => x
> }
> `````

> `````js
> function * g() {
>   ({a: b = yield}) => x
> }
> `````

> `````js
> function * g() {
>   ({a: b = yield c}) => x
> }
> `````

> `````js
> function * g() {
>   ([a = yield]) => x
> }
> `````

> `````js
> function * g() {
>   ([a = yield b]) => x
> }
> `````

> `````js
> async yield => x
> `````

> `````js
> async (yield) => x
> `````

> `````js
> async (...yield) => x
> `````

> `````js
> async (a = yield) => x
> `````

> `````js
> async (a = yield b) => x
> `````

> `````js
> async ({yield}) => x
> `````

> `````js
> async ({a = yield}) => x
> `````

> `````js
> async ({a = yield b}) => x
> `````

> `````js
> async ({a: b = yield}) => x
> `````

> `````js
> async ({a: b = yield c}) => x
> `````

> `````js
> async ([a = yield]) => x
> `````

> `````js
> async ([a = yield b]) => x
> `````

> `````js
> async (yield)
> `````

> `````js
> async (...yield)
> `````

> `````js
> async (a = yield)
> `````

> `````js
> async (a = yield b)
> `````

> `````js
> async ({yield})
> `````

> `````js
> async ({a = yield})
> `````

> `````js
> async ({a = yield b})
> `````

> `````js
> async ({a: b = yield})
> `````

> `````js
> async ({a: b = yield c})
> `````

> `````js
> async ([a = yield])
> `````

> `````js
> async ([a = yield b])
> `````

> `````js
> function * g() {
>   async (yield)
> }
> `````

> `````js
> function * g() {
>   async (...yield)
> }
> `````

> `````js
> function * g() {
>   async (a = yield)
> }
> `````

> `````js
> function * g() {
>   async (a = yield b)
> }
> `````

> `````js
> function * g() {
>   async ({yield})
> }
> `````

> `````js
> function * g() {
>   async ({a = yield})
> }
> `````

> `````js
> function * g() {
>   async ({a = yield b})
> }
> `````

> `````js
> function * g() {
>   async ({a: b = yield})
> }
> `````

> `````js
> function * g() {
>   async ({a: b = yield c})
> }
> `````

> `````js
> function * g() {
>   async ([a = yield])
> }
> `````

> `````js
> function * g() {
>   async ([a = yield b])
> }
> `````

### Templates

#### test

`````js
#
`````
