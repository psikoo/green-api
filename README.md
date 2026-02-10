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
PORT=3000 (leave as 3000 as the docker image exports this port)
TOKEN=(Admin token used to register new users for the first time)
JWT_SECRET=(Secret used to generate JWT)
# DB
DB_TYPE=postgres (leave as postgres)
DB_HOST=(IP/Host name of the database, 'db' in prod specified on the docker compose)
DB_PORT=5432 (leave as 5432)
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

## Compile and run the project

```bash
# Run in development mode
$ ./dev.cmd
$ ./dev.sh

# Build and run production mode
$ ./build.cmd
$ ./build.sh
```