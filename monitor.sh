#!/usr/bin/env bash

# set -euo pipefail

echo "Monitoring files in src..."
echo "Running '${@}' on changes."

while true ; do (
    inotifywait -r -e modify ./src/ | \
        while read path _ file ; do
            echo "${path}${file}" modified!
            "${@}"
        done
)
done
