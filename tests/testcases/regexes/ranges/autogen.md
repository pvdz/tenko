# Tenko parser test cases

> :: regexes
>
> ::> ranges

## Input

One test file is generated for each combination of input case and input template. The `#` in the template is replaced with the input case.

### Cases

> `````js
> /[a-z]/
> `````

> `````js
> /[z-a]/
> `````

> `````js
> /[a-b--/]/
> `````

> `````js
> /[\b-\n]/
> `````

> `````js
> /[\x]/
> `````

> `````js
> /[\x1]/
> `````

### Templates

#### without u-flag

`````js
#
`````

#### with u-flag

`````js
#u
`````
