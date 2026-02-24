import fs from 'fs';
import path from 'path';

import {
  ASSERT,
  INPUT_HEADER,
  OUTPUT_QUINTICK,
  OUTPUT_QUINTICKJS,
} from "./utils.mjs";

export function generateTestFile(tob) {
  // This should be a new test that still has to be generated
  // Its format basically starts with an @ for easy parsing here
  //
  // ```
  // @ some more information here, optional because the file name / path forms the description
  // ###
  // the rest is the test case, as is. only trailing whitespace (if any) is trimmed from each line and the start/end
  // ```
  ASSERT(tob);
  let data = tob.oldData;
  let file = tob.file;
  ASSERT(data.includes('\n###\n'), 'expected format', file);

  console.log('Generating test case from', file);

  let [comment, ...code] = data.slice(1).split('###\n');
  const rawLines = comment.trim().split(/\n/g);
  const inputOptionLines = rawLines.filter(s => /^-\s*`[^`]+`\s*$/.test(s.trim()));
  comment = rawLines.map(s => {
    const t = s.trim();
    if (/^-\s*`[^`]+`\s*$/.test(t)) return null; // pass through to input section
    const low = t.toLowerCase();
    if (low === '## fail') return '\n## FAIL';
    if (low === '## pass') return '\n## PASS';
    if (low === '## pass module') return '\n## PASS MODULE';
    if (low === '## pass sloppy') return '\n## PASS SLOPPY';
    return ('>\n> ' + s);
  }).filter(x => x !== null).join('\n');
  code = code.join('###'); // unlikely
  code = code.trim().split(/\n+/g).map(s => s.trimRight()).join('\n');
  const inputOptionsBlock = inputOptionLines.length ? '\n\n' + inputOptionLines.join('\n') + '\n' : '';

  let relfile = file.slice(file.indexOf('tenko'));

  let descPath = path
    .dirname(relfile.slice(relfile.indexOf('tests/testcases/') + 'tests/testcases/'.length))
    .split('/')
    .map(s =>
      s
      .replace(/_/g, ' ')
      .replace(/x([a-z\d]{4})/g, (_, s) => String.fromCharCode(parseInt(s, 16)))
    )
    .join(' : ');
  let descFile = path.basename(relfile)
    .slice(0, -3)
    .replace(/_/g, ' ')
    .replace(/x([a-z\d]{4})/g, (_, s) => String.fromCharCode(parseInt(s, 16)));

  let newData = tob.oldData = `# Tenko parser test case

- Path: ${relfile}

> :: ${descPath}
>
> ::> ${descFile}${comment ? '\n' + comment : ''}
${INPUT_HEADER}${inputOptionsBlock}${OUTPUT_QUINTICKJS}${code}${OUTPUT_QUINTICK}
`;
  fs.writeFileSync(file, newData);

  return newData;
}
