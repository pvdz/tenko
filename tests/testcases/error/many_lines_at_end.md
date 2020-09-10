# Tenko parser test case

- Path: tests/testcases/error/many_lines_at_end.md

> :: error
>
> ::> many lines at end
>
> Code frame that doesn't start at the beginning of input
>
> There's not enough data at EOF but too much at the start

## FAIL

## Input

`````js
function getErrorContext(tokenStart, tokenStop, msg = '', fullErrorContext = false) {
  ASSERT(getErrorContext.length >= 2 && getErrorContext.length <= 4, 'arg count');
  ASSERT(tokenStart <= tokenStop, 'should have a positive length range', tokenStart, tokenStop);
  // Getting the line/col of the context is tricky since we'd have to juggle those values individually. However...
  // It's fairly safe to say that the point of error won't be that far off from the current offset of the lexer.
  // (And we can just omit this hack in case we deem it too far away, anyways)
  // So in the reported context we can also force-include the current token point. Based on that we can split
  // on newlines and determine the line numbers of other lines in the reported context that way.
  let inputOffset = 0;
  if (!fullErrorContext && tokenStart > 100) inputOffset = tokenStart - 100;
  let inputLen = input.length - inputOffset;
  if (!fullErrorContext && tokenStop + 100 < input.length) inputLen = (tokenStop + 100) - inputOffset;
  // Try to force-include the current offset if it's not too far away from the point of error (in some edge cases
  // it may still be megabytes away from each other and in that case we'll just omit the line/col reporting).
  let isPointerIncluded = true;
  if (inputOffset + inputLen < pointer) {
    // Let's say 1k?
    let len = pointer - inputOffset;
    if (len < 1024) {
      inputLen = len;
    } else {
      isPointerIncluded = false;
    }
  }
  let usedInput = input.slice(inputOffset, inputOffset + inputLen);
  // .log('\n\nused input: [' + usedInput +' ]')
  let tokenOffset = tokenStart - inputOffset; // Where is tokenStart relative to usedInput?
  // .log('\n\nstart of token: [' + usedInput.slice(0, tokenOffset) + '#' + usedInput.slice(tokenOffset) +' ]')
  // nl1 is the last newline before the point of error, or SOF, relative to usedInput
  // nl2 is the first newline to the right of nl1, or EOF, relative to usedInput
  // We need nl1 to determine the offset and indentation of the error pointer
  // We need nl2 because that's where we'll make the cut to inject the error pointer
  let nl1 = usedInput.lastIndexOf('\n', tokenOffset);
  // .log('\n\nnl1 ('+nl1+'): [' + usedInput.slice(0, nl1) + '#' + usedInput.slice(nl1) +' ]')
  let nl2 = usedInput.indexOf('\n', nl1 + 1);
  if (nl2 < 0) nl2 = usedInput.length;
  // .log('\n\nnl2 ('+nl2+'): [' + usedInput.slice(0, nl2) + '#' + usedInput.slice(nl2) +' ]')
  let arrowCount = (tokenStop - tokenStart) || 1;
  let indentCount = tokenOffset - (nl1 + 1);
  let pointerLine = currentLine;
  let errorLine = currentLine; // Update it until it passes nl1, which is the last nl before the error
  let errorColumn = (inputOffset > 0 && nl1 < 0) ? -1 : ((tokenStart - inputOffset) - (nl1 >= 0 ? nl1 + 1 : 0));
  if (isPointerIncluded) {
    // Where is the pointer relative in the usedInput?
    let relativePointer = pointer - inputOffset;
    // Skip newlines until we're passing the point of error
    let searchPointer = relativePointer;
    // We could do `pointerLine-=usedInput.slice(0, searchPointer).split('\n').length`.
    // Not sure it matters, but it might at large contexts.
    while (searchPointer > 0) {
      searchPointer = usedInput.lastIndexOf('\n', searchPointer - 1);
      --pointerLine;
      if (searchPointer > nl1) --errorLine;
    }
    if (searchPointer !== 0) pointerLine += 1;
    // Now pointerLine should be the line of the start of the input
  }
  let maxPointerlineLen = (''+currentLine).length;
  let gutterWidth = maxPointerlineLen + 4; // padded line number + ' | '
  let pre = usedInput.slice(0, nl2).split('\n');
  let post = usedInput.slice(nl2 + 1, inputLen).split('\n');
  while (pre.length > 1 && pre[0].length === 0) {
    // Drop leading empty lines
    pre.shift();
    ++pointerLine;
  }
  while (post.length > 0 && post[post.length - 1].length === 0) {
    post.pop();
    // Drop trailing empty lines
  }
  let lc = pointerLine;
  let pre2 = pre.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
  // .log('\n\nPre: [' + pre + ']')
  let post2 = post.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
  if ((''+lc).length > maxPointerlineLen) {
    maxPointerlineLen = (''+lc).length;
    gutterWidth = maxPointerlineLen + 4; // padded line number + ' | '
    lc = pointerLine;
    // Paint the gutter again because the line numbers got wider _after_ the error / current pointer and we want to
    // prevent an indentation change
    pre2 = pre.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
    post2 = post.map(s => ' ' + ('' + lc++).padStart(maxPointerlineLen, ' ') + ' ║ ' + s.trimRight()).join('\n');
  }
  // .log('\n\nPost: [' + pre + ']')
  // Note: if the pointerLine is not 1 then the lastIndexOf must return a non-zero number that is the column on that line
  let col = pointerLine === 1 ? inputOffset : usedInput.lastIndexOf(inputOffset);
  let top = 'start@' + pointerLine + ':' + (col<0?'?':col) + ', error@' + errorLine + ':' + (errorColumn<0?'?':errorColumn) + '\n';
  let bar = '═'.repeat(top.length - gutterWidth) + '\n';
  let header = '╔' + '═'.repeat(maxPointerlineLen) + '═╦';
  let footer = '╚' + '═'.repeat(maxPointerlineLen) + '═╩';
  let returnValue = (
    top +
    header + bar +
    pre2 + '\n' +
    ' '.repeat(Math.max(0, maxPointerlineLen + 1)) +
    ' ║ ' +
    ' '.repeat(Math.max(0, indentCount)) +
    '^'.repeat(Math.max(0, arrowCount)) +
    '------- error' + (msg ? ': ' : '') + msg + (tokenOffset >= usedInput.length ? ' at EOF' : '') + (post2 ? '\n' : '') +
    post2 + '\n' +
    footer + bar +
    ''
  );
  // Drop trailing whitespace per line. Not likely to make a difference and annoying in git diffs.
  return returnValue.split('\n').map(s => s.trimRight()).join('\n')
  problem here
}
`````

## Output

_Note: the whole output block is auto-generated. Manual changes will be overwritten!_

Below follow outputs in five parsing modes: sloppy, sloppy+annexb, strict script, module, module+annexb.

Note that the output parts are auto-generated by the test runner to reflect actual result.

### Sloppy mode

Parsed with script goal and as if the code did not start with strict mode header.

`````
throws: Parser error!
  Unable to ASI

start@104:77, error@106:10
╔════╦════════════════════
 104 ║ nnoying in git diffs.
 105 ║   return returnValue.split('\n').map(s => s.trimRight()).join('\n')
 106 ║   problem here
     ║           ^^^^------- error
 107 ║ }
╚════╩════════════════════

`````

### Strict mode

Parsed with script goal but as if it was starting with `"use strict"` at the top.

_Output same as sloppy mode._

### Module goal

Parsed with the module goal.

_Output same as sloppy mode._

### Sloppy mode with AnnexB

Parsed with script goal with AnnexB rules enabled and as if the code did not start with strict mode header.

_Output same as sloppy mode._

### Module goal with AnnexB

Parsed with the module goal with AnnexB rules enabled.

_Output same as sloppy mode._
