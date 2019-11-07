# Tenko parser test cases

> :: operator precedent
>
> ::> some basic order tests
>
> The LeftHandSideExpression production is a bit of an exception, actually, and is only really used as a whole
>
> in this particular production. Meaning other cases are about bindings that resolve to a Reference, in this
>
> parser solved by "assignable". However, the extends arg can also be a call or function expression. We have no
>
> mechanism to make the distinction of parsing a LeftHandSideExpression without other expression things... :/
>
> LeftHandSideExpression :
>
> - CallExpression
>   - Async call (not arrow!)
>   - Super call
>   - Dynamic import
>   - Recursive with a tail (call args, dynamic property access, dot property access, tagged template)
> - NewExpression
>   - Recursive; new NewExpression
>   - Recursive with a tail (dynamic property access, dot property access, tagged template)
>   - Super property
>   - new.target
>   - PrimaryExpression
>     - Identifier (including `this`)
>     - Literal (strings, numbers, true, false, null, regex, template)
>     - Array
>     - Object
>     - Any kind of function expression
>     - Class expression
>     - ParenthesizedExpression
>
> Notable exceptions:
>
> - `await` and `yield`
> - arrows
> - operators (assignment / binary / update)
> - most unary operators (only `new` is allowed)
> - sequence expression (comma) without group
>
> In other words, it mainly outlaws almost any unary expression and any arrow expression. The other things can be prevented by simply parsing a value without further ops and by not calling parseExpressions (plural). Until the spec changes, of course.


## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> () => x
> `````

> `````js
> () => {}
> `````

> `````js
> (a) => x
> `````

> `````js
> (a) => {}
> `````

> `````js
> (a, b) => x
> `````

> `````js
> (a, b) => {}
> `````

> `````js
> a => b
> `````

> `````js
> a => {}
> `````

> `````js
> async () => x
> `````

> `````js
> async () => {}
> `````

> `````js
> async a => b
> `````

> `````js
> async a => {}
> `````

> `````js
> async()
> `````

> `````js
> async(x)
> `````

> `````js
> async
> ()
> `````

> `````js
> async
> `````

> `````js
> async
> x
> `````

> `````js
> async
> x => y
> `````

> `````js
> function(){}
> `````

> `````js
> function f(){}
> `````

> `````js
> async function(){}
> `````

> `````js
> async function f(){}
> `````

> `````js
> function *(){}
> `````

> `````js
> function *f(){}
> `````

> `````js
> async function *(){}
> `````

> `````js
> async function *f(){}
> `````

> `````js
> delete x
> `````

> `````js
> ~x
> `````

> `````js
> !x
> `````

> `````js
> -x
> `````

> `````js
> +x
> `````

> `````js
> --x
> `````

> `````js
> ++x
> `````

> `````js
> void x
> `````

> `````js
> typeof x
> `````

> `````js
> new x
> `````

> `````js
> yield
> `````

> `````js
> yield x
> `````

> `````js
> yield
> x
> `````

> `````js
> await
> `````

> `````js
> await x
> `````

> `````js
> await
> x;
> `````

> `````js
> super()
> `````

> `````js
> super.foo
> `````

> `````js
> import('x')
> `````

> `````js
> new.target
> `````

> `````js
> this
> `````

> `````js
> true
> `````

> `````js
> false
> `````

> `````js
> null
> `````

> `````js
> fooo
> `````

> `````js
> fooo()
> `````

> `````js
> fooo.bar
> `````

> `````js
> fooo[bar]
> `````

> `````js
> fooo`bar`
> `````

> `````js
> 1.2
> `````

> `````js
> "crap"
> `````

> `````js
> "oct \03 al"
> `````

> `````js
> /crap/
> `````

> `````js
> /more crap/g
> `````

> `````js
> [foo]
> `````

> `````js
> {bar}
> `````

> `````js
> eval
> `````

> `````js
> arguments
> `````

> `````js
> `temp`
> `````

> `````js
> `temp {waitforit} late`
> `````

> `````js
> `t${e}m${p}l`
> `````

> `````js
> oh,no
> `````

> `````js
> (oh,yes)
> `````

> `````js
> (x)
> `````

> `````js
> a + b
> `````

> `````js
> a = b
> `````

> `````js
> a *= b
> `````

> `````js
> a !== b
> `````

> `````js
> [x]
> `````

> `````js
> [x] = b
> `````

> `````js
> [x=y]
> `````

> `````js
> [x=y] = b
> `````

> `````js
> {x}
> `````

> `````js
> {x} = b
> `````

> `````js
> {x=y}
> `````

> `````js
> {x=y} = b
> `````

> `````js
> {x: y}
> `````

> `````js
> {x: y} = b
> `````

> `````js
> {x: y=y}
> `````

> `````js
> {x: y=y} = b
> `````

> `````js
> [...x]
> `````

> `````js
> [...x] = b
> `````

> `````js
> [...x=y]
> `````

> `````js
> [...x=y] = b
> `````

> `````js
> {...x}
> `````

> `````js
> {...x} = b
> `````

> `````js
> {...x=y}
> `````

> `````js
> {...x=y} = b
> `````

> `````js
> {...x: y}
> `````

> `````js
> {...x: y} = b
> `````

> `````js
> {...x: y = y}
> `````

> `````js
> {...x: y = y} = b
> `````

> `````js
> x in y
> `````

> `````js
> s ** y
> `````

### Templates

#### declaration

`````js
class A extends # {}
`````

#### expression

`````js
(class B extends # {})
`````

#### async wrapped

`````js
async function p(){
  class C extends # {}
}
`````

#### generator wrapped

`````js
function *P(){
  class D extends # {}
}
`````

#### new arg

`````js
new #
`````

#### for-in lhs

`````js
for (# in x) ;
`````
