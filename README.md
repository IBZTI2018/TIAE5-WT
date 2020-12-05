# IBZ Case Study 5. Semester

## Group members
- [Jennifer Mentner](https://github.com/JenniferSusann)
- [Dardan Ahmeti](https://github.com/dardii)
- [Sven Gehring](https://github.com/cybrox)
- [André Glatzl](https://github.com/glaand)

## Requirements
- Motivation
- Docker
- WSL 2.0
- MySQL Workbench

## Application ports
- Backend -> 8001 -> http://localhost:8001
- Frontend -> 8080 -> http://localhost:8080
- Database -> 3310

## Installation

1. Clone this repository to your computer (Recommended: Bash environment)
```
git clone git@github.com:cybrox/TIAE5-WT.git
```

2. Enter the project
```
cd TIAE5-WT
```

3. Put the keys and start the engines
```
make start
```

4. Have fun :)

## Commands

Watch the logs of the docker containers
```
make logs
```

Run all migrations on database (Sorted ascending)
```
make migrate
```

## SQL Migration

To create a new migration, just put your .sql file on the folder `backend/database/migration`.      

In order to ensure the order of execution, please do not forget to include the prefix number on the file.  

If you want to add your migration file as the last one, take the last number e.g 15_insert_members.sql and add **16_** as prefix.

## SQL Adminer

Adminer is accessible at `localhost:8888` and can connect to the database using the host `database`.
