# Tenko parser test cases

- Path: zeparser3/tests/testcases/random_stuff/x002318/autogen.md

> :: random stuff
>
> ::> #18

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> ({...{eval}.x} = {});
> `````

> `````js
> ({...{b: 0}.x} = {});
> `````

> `````js
> a[foo].c = () => { throw Error(); };
> `````

> `````js
> ({...[0].x} = {});
> `````

> `````js
> async function foo(a = () => { "use strict"; return eval("x"); }) {}
> `````

> `````js
> async function foo(a = () => { "use strict"; return eval("x") }) { var x; return a(); }
> `````

> `````js
> async (a = b => await (0)) => {}
> `````

> `````js
> while(true) let[a] = 0
> `````

> `````js
> async function foo(a = () => { "use strict"; return eval =>("x"); }) {}
> `````

> `````js
> async function foo(a = (eval) => { "use strict"; funeval("x"); }) {}
> `````

> `````js
> let [o.x=1]=[]
> `````

> `````js
> let {x:o.f=1}={x:1}
> `````

> `````js
> var [((((a)))), b] = [];
> `````

> `````js
> var [(a)] = 0
> `````

> `````js
> const [(x)] = []
> `````

> `````js
> let [(x().foo)] = x
> `````

> `````js
> let [(x) = y] = [];
> `````

> `````js
> let [(x)] = [];
> `````

> `````js
> [++([])
> `````

> `````js
> [(++[])
> `````

> `````js
> this.foo[foo].bar(this)(bar)[foo]()--
> `````

> `````js
> ((x,x)) = 5
> `````

> `````js
> (((x,x))) = 5
> `````

> `````js
> async ({a = b})
> `````

> `````js
> new Date++;
> `````

> `````js
> for(let.a of 0);
> `````

> `````js
> for (let x in {}) { var x; }
> `````

> `````js
> [...{a = 0}.x] = [];
> `````

> `````js
> ({...{b = 0}.x} = {});
> `````

> `````js
> ({a: {b = 0}.x} = {});
> `````

> `````js
> [[(x, y)]] = x;
> `````

> `````js
> [...[(x, y)]] = x;
> `````

> `````js
> (async function*() { } = 1);
> `````

> `````js
> ([(x().foo)]) => x
> `````

> `````js
> let [(x) = y] = [];
> `````

> `````js
> ({a: {b = 0}.x} = {});
> `````

> `````js
> [...{a = 0}.x] = [];
> `````

> `````js
> [[(x, y)]] = x;
> `````

> `````js
> [...[(x, y)]] = x;
> `````

> `````js
> [...(a,b)] = [],
> `````

> `````js
> [...{ a }] = b,
> `````

> `````js
> for (+i in {});
> `````

> `````js
> /x
> y/
> `````

> `````js
> true:oops;
> `````

> `````js
> for(let.a of 0);
> `````

> `````js
> var x;
> `````

> `````js
> for([] = 0 of {});
> `````

> `````js
> for([,] = 0 of {});
> `````

> `````js
> for([a] = 0 of {});
> `````

> `````js
> for([a = 0] = 0 of {});
> `````

> `````js
> for([...a] = 0 of {});
> `````

> `````js
> for([...[]] = 0 of {});
> `````

> `````js
> for([...[a]] = 0 of {});
> `````

> `````js
> for({} = 0 of {});
> `````

> `````js
> for({p: x} = 0 of {});
> `````

> `````js
> for({p: x = 0} = 0 of {});
> `````

> `````js
> for({x} = 0 of {});
> `````

> `````js
> for({x = 0} = 0 of {});
> `````

> `````js
> async function f() { for await ({0: a = 1} = 1 of []) ; }
> `````

> `````js
> async function * f() { for await({a: a = 1} = 1 of []){ } }
> `````

> `````js
> async function * f() { for await({a} = 1 of []){ } }
> `````

> `````js
> async function f() { for await ([a] = 1 of []) ; }
> `````

> `````js
> async function f() { for await ({[Symbol.iterator]: a = 1} = 1 of []) ; }
> `````

> `````js
> for ((a?b:c) in y)z;
> `````

> `````js
> for ((a,b) in c);
> `````

> `````js
> for (((a,b)) in c);
> `````

> `````js
> for ({}.x);
> `````

> `````js
> for ([...[a]] = 0 in {});
> `````

### Templates

#### a/ case

`````js
#
`````
