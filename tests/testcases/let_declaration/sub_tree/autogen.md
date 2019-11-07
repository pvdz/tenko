# Tenko parser test cases

> :: let declaration
>
> ::> sub tree

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> let x
> `````

> `````js
> let [x]
> `````

> `````js
> let {x}
> `````

> `````js
> let [x] = y
> `````

> `````js
> let {x} = y
> `````

> `````js
> let []
> `````

> `````js
> let {}
> `````

> `````js
> let [] = y
> `````

> `````js
> let {} = y
> `````

> `````js
> let
> []
> `````

> `````js
> let
> {}
> `````

> `````js
> let
> [] = y
> `````

> `````js
> let
> {} = y
> `````

### Templates

#### global

`````js
#
`````

#### block

`````js
{ # }
`````

#### obj

`````js
a = { # }
`````

#### if

`````js
if (a) #
`````

#### if else

`````js
if (a) b;
else #;
`````

#### while

`````js
while (a) #;
`````

#### do no smei/asi

`````js
do # while (a);
`````

#### do semi

`````js
do #; while (a);
`````

#### do asi

`````js
do #
while (a);
`````

#### for loop

`````js
for (;;) #
`````

#### for-in loop

`````js
for (a in b) #
`````

#### for-of loop

`````js
for (a of b) #
`````

#### for-await-of loop

`````js
for await (a of b) #
`````

#### with

`````js
with (a) #
`````

#### expr arrow

`````js
() => #
`````

#### block arrow

`````js
() => { # }
`````

#### spread

`````js
[...#]
`````

#### async

`````js
async #
`````

#### export

`````js
export #
`````

#### case

`````js
switch (a) { case b: # }
`````

#### default

`````js
switch (a) { default: # }
`````

