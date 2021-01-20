# IBZ Case Study 5. Semester

## Group members
* [Jennifer Mentner](https://github.com/JenniferSusann)
* [Dardan Ahmeti](https://github.com/dardii)
* [Sven Gehring](https://github.com/cybrox)
* [André Glatzl](https://github.com/glaand)

## Requirements
* Motivation
* Docker
* WSL 2.0
* MySQL Workbench

## Application ports
* Webserver -> 8080
  * Frontend http://localhost:8080
  * Backend http://localhost:8080/api/
* Database -> 3310

## Installation

1. Clone this repository to your computer (Recommended: Bash environment)
```
git clone git@github.com:cybrox/TIAE5-WT.git
```

2. Enter the project
```
cd TIAE5-WT
```

3. Create and migrate the database
```
make migrate
```

4. Put the keys and start the engines
```
make start
```

5. Have fun :)

## Commands

Watch the logs of the docker containers
```
make logs
```

Run all migrations on database (this will currently recreate the database)
```
make migrate
```

List all available REST ressource routes on the API
```
make routes
```

(Re-) fetch and compile backend dependencies
```
make deps
```

## Data manipulation SQL Adminer
* The MariaDB container exposes MySQL on port `3310` for use with MySQL workbench or similar
* The Web Adminer is accessible at `localhost:8888` and can connect to the database using the host `mysql`, username `root`, password `supersecret`.
* The backend devleopment dasboard (kaffy) is accessible at `http://localhost:8080/admin/
