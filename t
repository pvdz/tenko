#!/bin/bash

# Syntax highlighting vs devx

# https://stackoverflow.com/questions/59895/how-to-get-the-source-directory-of-a-bash-script-from-within-the-script-itself
# https://stackoverflow.com/questions/7665/how-to-resolve-symbolic-links-in-a-shell-script
# Put this script in the folder where it lives (relevant for when this is not called from project root)
cd "$( dirname $(realpath "${BASH_SOURCE[0]}") )" >/dev/null 2>&1

if [[ $# = 0 ]]; then
  "./tests/t.sh" --help
else
  "./tests/t.sh" "$@"
fi
