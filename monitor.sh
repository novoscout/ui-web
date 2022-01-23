#!/usr/bin/env bash

# set -euo pipefail

echo "Monitoring files..."
echo "Running '${@}' on changes."

while true ; do (
    inotifywait -r -e modify . | \
        while read path _ file ; do
            echo "${path}${file}" modified!
            "${@}"
        done
)
done
