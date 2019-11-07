// From: https://gist.github.com/billti/a2ee40e60611ec9b37b89c7c00cd39ab
// This script is benign and scrubs the v8 log file from oddities that deoptigate currently can't deal with (because
// it hasn't been updated in a while and is not capable of dealing with unknown content in the log)
// Basically run this on a v8.log and feed the output to deoptigate to have it all work

const fs = require('fs');

let log_text = fs.readFileSync("ignore/v8.log", "utf8");
let log_lines = log_text.split('\n');

const badLines = /(extensions::SafeBuiltins:)|(v8\/LoadTimes:)/;
const webPrefix = /((https?:\/\/[^\/]*\/)|(file:\/\/\/[a-zA-Z]:)|(file:\/\/))/;

let new_lines = "";
log_lines.forEach( line => {
  // Removes lines containing "extensions::SafeBuiltins:" or "v8/LoadTimes:"
  if (badLines.test(line)) return;
  // Remove the http://localhost:8000/-like prefix.
  const scrubbed_line = line.replace(webPrefix, "");
  new_lines += scrubbed_line + "\n";
});

fs.writeFileSync("ignore/v8.log", new_lines);
