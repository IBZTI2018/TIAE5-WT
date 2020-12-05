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

## Application ports
- Backend -> 8001 -> http://localhost:8001
- Frontend -> 8080 -> http://localhost:8080

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