# Tenko parser test cases

- Path: zeparser3/tests/testcases/objects/literals/identifier_method/special_keys/autogen.md

> :: objects : literals : identifier method
>
> ::> special keys

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

> `````js
> break
> `````

> `````js
> case
> `````

> `````js
> catch
> `````

> `````js
> class
> `````

> `````js
> const
> `````

> `````js
> continue
> `````

> `````js
> debugger
> `````

> `````js
> default
> `````

> `````js
> delete
> `````

> `````js
> do
> `````

> `````js
> else
> `````

> `````js
> export
> `````

> `````js
> extends
> `````

> `````js
> finally
> `````

> `````js
> for
> `````

> `````js
> function
> `````

> `````js
> if
> `````

> `````js
> import
> `````

> `````js
> in
> `````

> `````js
> instanceof
> `````

> `````js
> new
> `````

> `````js
> return
> `````

> `````js
> super
> `````

> `````js
> switch
> `````

> `````js
> this
> `````

> `````js
> throw
> `````

> `````js
> try
> `````

> `````js
> typeof
> `````

> `````js
> var
> `````

> `````js
> void
> `````

> `````js
> while
> `````

> `````js
> with
> `````

> `````js
> null
> `````

> `````js
> true
> `````

> `````js
> false
> `````

> `````js
> enum
> `````

> `````js
> eval
> `````

> `````js
> arguments
> `````

> `````js
> implements
> `````

> `````js
> package
> `````

> `````js
> protected
> `````

> `````js
> interface
> `````

> `````js
> private
> `````

> `````js
> public
> `````

> `````js
> await
> `````

> `````js
> yield
> `````

> `````js
> let
> `````

> `````js
> static
> `````

> `````js
> async
> `````

> `````js
> get
> `````

> `````js
> set
> `````

### Templates

#### as regular property in object

`````js
({#: x});
`````

#### as regular property in arrow

`````js
({#: x}) => x;
`````

#### as regular property in destructuring assignment

`````js
({#: x} = y);
`````

#### as method in obj

`````js
({
  #(){}
});
`````

#### as method in arrow

`````js
({#(){}}) => x;
`````

#### as method in destructuring assignment

`````js
({#(){}} = y);
`````

#### as static method in obj

`````js
({
  static #(){}
});
`````

#### as generator in obj

`````js
({
  * #(){}
});
`````

#### as getter in obj

`````js
({
  get #(){}
});
`````

#### as setter in obj

`````js
({
  set #(x){}
});
`````

#### as async method in obj

`````js
({
  async #(){}
});
`````

#### as async generator in obj

`````js
({
  async * #(){}
});
`````

#### as static getter in obj

`````js
({
  static get #(){}
});
`````

#### as static generator in obj

not because static generator but because static in object

`````js
({
  static * #(){}
});
`````

#### as static setter in obj

`````js
({
  static set #(x){}
});
`````

#### as static async method in obj

`````js
({
  static async #(){}
});
`````

#### as static async generator in obj

note this is because of static, not async generator

`````js
({
  static async * #(){}
});
`````
