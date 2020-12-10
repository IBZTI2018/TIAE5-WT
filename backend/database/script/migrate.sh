#!/bin/bash
#
# Run all database migration file in alphabetical order

WORKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$WORKDIR/../migration"

find . -name "*.sql" -type f | sort -t '\0' -n | while read file; do
  mysql --password="MrBean!" < "$file" && \
  echo "Migrated the file: $file"
done
