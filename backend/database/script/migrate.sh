#!/bin/bash
find /migration/ -name "*.sql" -exec bash -c 'mysql --password="MrBean!" < {} && echo "Migrated the file: {}"'  \;