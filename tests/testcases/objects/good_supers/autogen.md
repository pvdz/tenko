# Tenko parser test cases

- Path: zeparser3/tests/testcases/objects/good_supers/autogen.md

> :: objects
>
> ::> good supers
> 
> I can't find any rule that restricts the lexical position of `super()` beyond "in a proper constructor"
> 
> https://tc39.github.io/ecma262/#sec-super-keyword-runtime-semantics-evaluation
> 
> So it should syntactically be ok to use inside a property as long as it's inside a proper constructor
> 
> The rules for a `super` property are even more relaxed
> 
> Note: `super` properties are "simple" (heh) and should be valid in destructuring assignments
> 
> -> https://tc39.github.io/ecma262/#sec-static-semantics-static-semantics-assignmenttargettype

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> super
> `````

> `````js
> super()
> `````

> `````js
> super.cool
> `````

> `````js
> super[cool]
> `````

### Templates

#### object with string key

`````js
class x extends y {
  constructor() {
    ({"foo": #})
  }
}
`````

#### destructuring with string key

Note: super property is valid here, like any other property

`````js
class x extends y {
  constructor() {
    ({"foo": #} = x)
  }
}
`````

#### arrow with string key

`````js
class x extends y {
  constructor() {
    ({"foo": #}) => x
  }
}
`````

#### object with number key

`````js
class x extends y {
  constructor() {
    ({123: #})
  }
}
`````

#### destructuring with number key

Note: super property is valid here, like any other property

`````js
class x extends y {
  constructor() {
    ({123: #} = x)
  }
}
`````

#### arrow with number key

`````js
class x extends y {
  constructor() {
    ({123: #}) => x
  }
}
`````
