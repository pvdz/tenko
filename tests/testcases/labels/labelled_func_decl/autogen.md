# Tenko parser test cases

> :: labels
>
> ::> labelled func decl
>
> In webcompat mode, a function decl can be the child of a label, but still only in global, a function root, or a block. Not an `if`, `else`, `with`, or any iteration statemet.
>
> Search for `IsLabelledFunction'

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> foo: function f(){}
> `````

> `````js
> foo: bar: function f(){}
> `````

> `````js
> foo: bar: third: function f(){}
> `````

### Templates

#### toplevel

`````js
#
`````

#### function root

`````js
function f(){ # }
`````

#### arrow root

`````js
() => { # }
`````

#### block

`````js
{ # }
`````

#### if

`````js
if (x) #
`````

#### else

`````js
if (x); else #
`````

#### with

`````js
with (x) #
`````

#### while

`````js
while (x) #
`````

#### do

`````js
do # 
while (x);
`````

#### for-loop

`````js
for (;;) #
`````

#### for-in

`````js
for (x in y) #
`````

#### for-of

`````js
for (x of y) #
`````

#### for-await-of

`````js
async function f() {
  for await (x of y) #
}
`````

#### try

`````js
try { # } finally {}
`````

#### catch

`````js
try { } catch (e) { # }
`````

#### finally

`````js
try { } finally { # }
`````

#### case

`````js
switch (X) {
  case k:
    #
}
`````

#### default

`````js
switch (x) {
  default:
    #
}
`````
