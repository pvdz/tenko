# Tenko parser test cases

- Path: zeparser3/tests/testcases/assigns/keyword_with_escapes_check/autogen.md

> :: assigns
>
> ::> keyword with escapes check

These cases are automatically extrapolated and written to their own file.
Each case is applied to each test by simply replacing `#` with the actual case.

## Input

### Cases

#### Keywords with first char escaped

> `````js
> \u0062reak
> `````

> `````js
> \u0063ase
> `````

> `````js
> \u0063atch
> `````

> `````js
> \u0063lass
> `````

> `````js
> \u0063onst
> `````

> `````js
> \u0063ontinue
> `````

> `````js
> \u0064ebugger
> `````

> `````js
> \u0064efault
> `````

> `````js
> \u0064elete
> `````

> `````js
> \u0064o
> `````

> `````js
> \u0065lse
> `````

> `````js
> \u0065num
> `````

> `````js
> \u0065xport
> `````

> `````js
> \u0065xtends
> `````

> `````js
> \u0066alse
> `````

> `````js
> \u0066inally
> `````

> `````js
> \u0066or
> `````

> `````js
> \u0066unction
> `````

> `````js
> \u0069f
> `````

> `````js
> \u0069mport
> `````

> `````js
> \u0069n
> `````

> `````js
> \u0069nstanceof
> `````

> `````js
> \u006eew
> `````

> `````js
> \u006eull
> `````

> `````js
> \u0072eturn
> `````

> `````js
> \u0073uper
> `````

> `````js
> \u0073witch
> `````

> `````js
> \u0074his
> `````

> `````js
> \u0074rue
> `````

> `````js
> \u0074hrow
> `````

> `````js
> \u0074ry
> `````

> `````js
> \u0074ypeof
> `````

> `````js
> \u0076ar
> `````

> `````js
> \u0076oid
> `````

> `````js
> \u0077hile
> `````

> `````js
> \u0077ith
> `````

> `````js
> \u006cet
> `````

> `````js
> \u0069mplements
> `````

> `````js
> \u0070ackage
> `````

> `````js
> \u0070rotected
> `````

> `````js
> \u0069nterface
> `````

> `````js
> \u0070rivate
> `````

> `````js
> \u0070ublic
> `````

> `````js
> \u0073tatic
> `````

> `````js
> \u0062wait
> `````

> `````js
> \u0065val
> `````

> `````js
> \u0062rguments
> `````

#### Keywords with escapes that are not the first char

> `````js
> b\u0072eak
> `````

> `````js
> c\u0061se
> `````

> `````js
> c\u0061tch
> `````

> `````js
> cl\u0061ss
> `````

> `````js
> c\u006fnst
> `````

> `````js
> c\u006fntinue
> `````

> `````js
> debugge\u0072
> `````

> `````js
> def\u0061ult
> `````

> `````js
> d\u0065lete
> `````

> `````js
> d\u006f
> `````

> `````js
> els\u0065
> `````

> `````js
> en\u0075m
> `````

> `````js
> expo\u0072t
> `````

> `````js
> ext\u0065nds
> `````

> `````js
> f\u0061lse
> `````

> `````js
> fin\u0061lly
> `````

> `````js
> fo\u0072
> `````

> `````js
> functi\u006fn
> `````

> `````js
> i\u0066
> `````

> `````js
> impo\u0072t
> `````

> `````js
> i\u006e
> `````

> `````js
> inst\u0061nceof
> `````

> `````js
> n\u0065w
> `````

> `````js
> n\u0075ll
> `````

> `````js
> \u0072eturn
> `````

> `````js
> supe\u0072
> `````

> `````js
> sw\u0069tch
> `````

> `````js
> th\u0069s
> `````

> `````js
> t\u0072ue
> `````

> `````js
> th\u0072ow
> `````

> `````js
> t\u0072y
> `````

> `````js
> type\u006ff
> `````

> `````js
> va\u0072
> `````

> `````js
> v\u006fid
> `````

> `````js
> whil\u0065
> `````

> `````js
> w\u0069th
> `````

> `````js
> l\u0065t
> `````

> `````js
> implem\u0065nts
> `````

> `````js
> p\u0061ckage
> `````

> `````js
> p\u0072otected
> `````

> `````js
> inte\u0072face
> `````

> `````js
> p\u0072ivate
> `````

> `````js
> publ\u0069c
> `````

> `````js
> st\u0061tic
> `````

> `````js
> aw\u0061it
> `````

> `````js
> ev\u0061l
> `````

> `````js
> a\u0072guments
> `````

### Templates

#### assignment unwrapped

`````js
# = x;
`````

#### assignment paren wrapped

`````js
(# = x);
`````

#### inside an async func

`````js
async function f(){  
  # = x  
}
`````

#### inside an async func

`````js
async () => {  # = x  }
`````

#### inside a generator func

`````js
function *f(){
  # = x
}
`````
