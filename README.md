# Green-API

> A NestJS API for the Nebrija Green project

## Project setup

### Install required dependencies
```bash
$ npm install
```

### Set up the environment files based on the .example files
```dosini
# App Config
PORT=3000 (Leave as 3000 as the docker image exports this port)
TOKEN=(Admin token used to register new users for the first time)
JWT_SECRET=(Secret used to generate JWT)
# DB
DB_TYPE=postgres (Leave as postgres)
DB_HOST=(IP/Host name of the database, 'db' in prod specified on the docker compose)
DB_PORT=5432 (Leave as 5432)
DB_USER=(DB user)
DB_PASSWORD=(User password)
DB_DBNAME=(Database name)
DB_LOGGING=(Boolean to enable login for the DB)
# Docker
POSTGRES_DB=(Must be the same as DB_DBNAME)
POSTGRES_USER=(Must be the same as DB_USER)
POSTGRES_PASSWORD=(Must be the same as DB_PASSWORD)
PGADMIN_DEFAULT_EMAIL=(Must be a valid email address)
PGADMIN_DEFAULT_PASSWORD=(Access password to the pgAdmin portal)
```

### Extensions and code style guides

```bash
# Required:
ESLint:          "dbaeumer.vscode-eslint"
# Recommended:
Better Comments: "aaron-bond.better-comments"
Container Tools: "ms-azuretools.vscode-docker"
Error Lens:      "usernamehw.errorlens"
```

The project uses eslint to enforce clean and consistent code style, and this its required for any person looking to contribute code.

## Compile and run the project

```bash
# Run in development mode
$ ./dev.cmd
$ ./dev.sh

# Build and run production mode
$ ./build.cmd
$ ./build.sh
```

## Project structure

```bash
┌> ./
│ dev.cmd/.sh        # Script to start the app and docker in dev mode
│ build.cmd/.sh      # Script to start the app and docker in prod mode
│ .env               # Environment used for dev.cmd/.sh
│ .env.prod          # Environment used for build.cmd/.sh
│ dockerfile         # Defines the docker image for the nest app
│ docker-compose.yml # Defines the docker stack for production
├┬> docker
│└ docker-compose.yml # Defines the docker stack for development
└┬> src
 │ # Modules     > Define what imports, exports. provider, etc the controller/service needs
 │ # Controllers > They are responsible of receiving and responding to requests
 │ # Services    > They contain the logic
 │ # Provider    > They are shared logic that can be injected to multiple services
 ├─> constants  # Contains definitions for constants, types, enums, etc
 ├─> database   # Provider for the logic related to connecting to a database
 ├─> hashing    # Provider for the hashing functionality for passwords
 ├─> middleware # Runs before processing requests
 ├┬> auth       # Runs after the middleware used to ensure logging and permission
 ├┬> modules    # Contains all endpoints (except auth related ones)
 ││ # this is the example structure of a sensor module
 │├─> entities # Holds the definitions of objects as they will be stored in the database
 │├─> dto      # Holds the definitions of what types and structure the API is expecting on requests
 ││ Sensor.module.ts
 ││ Sensor.controller.ts
 │└ Sensor.service.ts
 └ main.ts # App entrypoint
```