# Tenko parser test cases

> This is a single file that should display all the arrow test cases where the `await` piggy is used

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> await => x
> `````

> `````js
> (await) => x
> `````

> `````js
> (...await) => x
> `````

> `````js
> (a = await) => x
> `````

> `````js
> (a = await b) => x
> `````

> `````js
> ({await}) => x
> `````

> `````js
> ({a = await}) => x
> `````

> `````js
> ({a = await b}) => x
> `````

> `````js
> ({a: b = await}) => x
> `````

> `````js
> ({a: b = await c}) => x
> `````

> `````js
> ([a = await]) => x
> `````

> `````js
> ([a = await b]) => x
> `````

> `````js
> async () => await => x
> `````

> `````js
> async () => (await) => x
> `````

> `````js
> async () => (...await) => x
> `````

> `````js
> async () => (a = await) => x
> `````

> `````js
> async () => (a = await b) => x
> `````

> `````js
> async () => ({await}) => x
> `````

> `````js
> async () => ({a = await}) => x
> `````

> `````js
> async () => ({a = await b}) => x
> `````

> `````js
> async () => ({a: b = await}) => x
> `````

> `````js
> async () => ({a: b = await c}) => x
> `````

> `````js
> async () => ([a = await]) => x
> `````

> `````js
> async () => ([a = await b]) => x
> `````

> `````js
> async await => x
> `````

> `````js
> async (await) => x
> `````

> `````js
> async (...await) => x
> `````

> `````js
> async (a = await) => x
> `````

> `````js
> async (a = await b) => x
> `````

> `````js
> async ({await}) => x
> `````

> `````js
> async ({a = await}) => x
> `````

> `````js
> async ({a = await b}) => x
> `````

> `````js
> async ({a: b = await}) => x
> `````

> `````js
> async ({a: b = await c}) => x
> `````

> `````js
> async ([a = await]) => x
> `````

> `````js
> async ([a = await b]) => x
> `````

> `````js
> async (await)
> `````

> `````js
> async (...await)
> `````

> `````js
> async (a = await)
> `````

> `````js
> async (a = await b)
> `````

> `````js
> async ({await})
> `````

> `````js
> async ({a = await})
> `````

> `````js
> async ({a = await b})
> `````

> `````js
> async ({a: b = await})
> `````

> `````js
> async ({a: b = await c})
> `````

> `````js
> async ([a = await])
> `````

> `````js
> async ([a = await b])
> `````

> `````js
> async x => async (await)
> `````

> `````js
> async x => async (...await)
> `````

> `````js
> async x => async (a = await)
> `````

> `````js
> async x => async (a = await b)
> `````

> `````js
> async x => async ({await})
> `````

> `````js
> async x => async ({a = await})
> `````

> `````js
> async x => async ({a: b = await})
> `````

> `````js
> async x => async ([a = await])
> `````

### Templates

#### test

`````js
#
`````
