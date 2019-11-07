# Tenko parser test cases

- Path: zeparser3/tests/testcases/assigns/destruct_assign_of_obj/autogen.md

> :: assigns
>
> ::> destruct assign of obj
>
> https://tc39.github.io/ecma262/#sec-destructuring-assignment-static-semantics-early-errors
>
> It is a Syntax Error if LeftHandSideExpression is neither an ObjectLiteral nor an ArrayLiteral and AssignmentTargetType(LeftHandSideExpression) is not simple.

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

#### Bad cases

> `````js
> ({...obj1,} = foo)
> `````

> `````js
> ({...obj1,a} = foo)
> `````

> `````js
> ({...obj1,...obj2} = foo)
> `````

> `````js
> ({...(a,b)} = foo)
> `````

> `````js
> ({...{}} = {})
> `````

#### Good cases

> `````js
> ({...(obj)} = foo)
> `````

> `````js
> ({...obj} = foo)
> `````

> `````js
> ({...obj.x} = foo)
> `````

> `````js
> ({...{}.x} = foo)
> `````

> `````js
> ({...[].x} = foo)
> `````

### Templates

#### case

`````js
#
`````
