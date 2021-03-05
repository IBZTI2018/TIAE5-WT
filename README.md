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
It is recommended that you use a Linux system with bash or a similar shell. As a prerequisit for running this repository, [docker](https://docs.docker.com/get-docker/) and [docker compose](https://docs.docker.com/compose/install/) must be installed on your system!

The project can be set up by going through the following procedure:

Nr | Step | Commands
--- | --- | ---
1 | Clone this repository to your computer | `git clone git@github.com:cybrox/TIAE5-WT.git`
2 | Enter the project | `cd TIAE5-WT`
3 | Clean-build and start all containers | `make stop && make nuke && make deps && make start`
4 | Create and migrate database | `make migrate`
5 | Have fun :) | (`make logs`)

## Additional Commands
* `make logs` View the logs of all service
* `make migrate` Re-setup and migrate database
* `make routes` Show all API routes
* `make deps` Re-fetch all backend depenencies
* `make status` Check status of all docker containers
* `make restart` Restart project


## Data manipulation SQL Adminer
* The MariaDB container exposes MySQL on port `3310` for use with MySQL workbench or similar
* The Web Adminer is accessible at `localhost:8888` and can connect to the database using the host `mysql`, username `root`, password `supersecret`.
* The backend devleopment dasboard (kaffy) is accessible at `http://localhost:8080/kaffydash
