#!/usr/bin/env bash

# Syntax highlighting vs devx

if [[ $# = 0 ]]; then
  ./tests/t.sh --help
else
  ./tests/t.sh "$@"
fi

