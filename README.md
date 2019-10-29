# Base Node + GraphQL project

## 👋 Intro

This is basic nodejs + graphQl project starter that will be used for any NodeJS application.

## Running the project

This base project is intended to be used with db ownership from the developer so there are multiple scripts created to manage the database.

### Plug & Play

- clone this project on <project_name>
- cd <project_name>
- `npm run config` creates an `env` file with the example config
- `npm i -g typescript` to install on your local environment typescript
- `npm run docker:start` starts the docker environment
- visit `http://localhost:9090`

### Running from you local env with docker database

You can run the project from your local environemnt, using a dockerized postgres database configured for that!

- `npm run db` starts the docker db environment
- `npm run db:create` setups & migrates the app's database
- `npm start` starts the server

### Running with optimized watch options on VSCode

If you are running this project using VSCode it supports running background tasks that were preconfigured
and are present under the `.vscode` folder.

- On Mac `CMD+Shift+B` or Windows `Ctrl+Shift+B` setups a separete shell named `build-watch`
  that watchs for changes on any TS file and builds it automatically.
- `npm start:watch` starts the server, watching to the result of the build process.

The reasoning of doing this is that the watch build process only compiles the modified TS file everytime.
This way the build process never takes more than a second and we can avoid building the full application on every change.

## NPM Scripts

The project comes with multiple `Package.json` scripts created to run usefull commands.
The following are the current command list:

- `build`: runs all the builds necessary for the project
- `build:tsc`: runs the typescript build of the project
- `config`: creates a basic env file to run your server, no sensible keys are available
- `docker:build`: builds the docker-compose containers
- `docker:db`: starts the database container
- `docker:start:dev`: runs docker-compose containers, and starts bash. (Database will be not populated you will need to run extra commands)
- `docker:start`: same as `start:dev` but it will run the server
- `docker:stop`: stops the docker service (docker-compose down)
- `db:setup / db:setup:test`: creates the database if it not exists for dev / test environment
- `db:create / db:create:test`: creates & execute migrations of the database if it not exists for dev / test environment
- `db:migrate / db:migrate:test`: runs the database migration client for dev / test environment
- `db:seed`: runs the seeds of the project for dev environment
- `start`: compiles and starts the application
- `start-dev`: watch the TS files, on a change it builds the hole application and starts.
- `start:watch`: watch the JS files, on a change it starts the application. (It depends on the VSCode task `build-watch`)
- `test:unit`: runs the unit tests
- `test:integration`: runs the integration tests on the test environment
- `test:all`: runs all test types

Execute a command via:

```shell
npm run <command>
```

## Migrations

A `Migration` is a managed incremental, that can be reversed and that we will track as a change request over the project under the version control.  
Each migration will get a name to describe what has been changed and a date of the modification.  
Migrations will patch the database and are available to reverse (down) the changes done.

### Schema Migrations

A schema migration is performed on a database whenever it is necessary to update or revert that database's schema to some newer or older version.

Migrations are configured as SQL files stored under the `db/migrations` folder, that describe the **Schema** modification (Tables, SP, Views, etc) basically db structure.
This files are required to be stored as `DATE.NAME.up.sql`. Where `DATE` is the current `yyyymmdd` date, and `NAME` is a meaningfull name for the migration we are creating.

To speed things up you can create a new migration doing:

```
name=properties npm run db:migrate create
```

This will generate two files, `yyyyymmdd.properties.up.sql` and `yyyyymmdd.properties.down.sql`.  
The **UP** file should have the logic to create and insert all the elements needed to execute that migration.  
The **DOWN** file should have the logic to decrease the migration, delete exactly what was created and inserted.

The project comes with a helper created to run migrations using `umzug` api and `sequelize` database connection. It supports the following commands:

- `status`: print current migration status
- `create`: creates migration sql files under `db/migrations`
- `up/migrate`: executed all unexecuted migrations
- `down/reset`: revert all executed migrations
- `next/migrate-next`: execute the next pending migration
- `prev/reset-prev`: revert the previous executed migration
- `reset-hard`: reset the database using a `dropdb`/`createdb` postgres command

Execute a command via:

```shell
npm run db:migrate <command>
```

## Tests

The project contains unit & integrations tests to cover the full solution. All tests must be updated and never skipped over every change request.

To run all tests:

```
npm test
```

For more information about test:

- [General](tests/README.md) - Test general guidelines
- [Unit](tests/unit/README.md) - Unit testing guidelines
- [Integration](tests/integration/README.md) - Integration testing guidelines

## Project Structure

The full folder structure of this app is explained below:

| Name                | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **.vscode**         | Contains VS Code specific settings                                                             |
| **dist**            | Contains the distributable (or output) from your TypeScript build. This is the code we ship    |
| **node_modules**    | Contains all your npm dependencies                                                             |
| **src**             | Contains your source code that will be compiled to the dist dir                                |
| **src/config**      | Configuration and initializer are provided here for DB, DotEnv, etc                            |
| **src/controllers** | Controllers define functions that respond to various http requests                             |
| **src/models**      | Models define Sequelize schemas that will be used in storing and retrieving data from Postgres |
| **src/server**      | Server methods to run the express server                                                       |
| **src/services**    | Services that group logic to access information                                                |
| **src/types**       | Holds .d.ts files not found on DefinitelyTyped.                                                |
| **src**/index.ts    | Entry point to your express app                                                                |
| **test**            | Contains our tests. Separate from source because there is a different build process.           |
| .env.example        | API keys, tokens, passwords, database URI. For sensible information please use 1Password.      |
| jest.\*.config.js   | Used to configure Jest running unit & integrations tests written in TypeScript                 |
| package.json        | File that contains npm dependencies                                                            |
| tsconfig.json       | Config settings for compiling server code written in TypeScript                                |
| tslint.json         | Config settings for formatting server code written in TypeScript                               |

## Contributing guidelines

- Create a branch from the latest master template
- Wrap all your changes in a single commit, rebase if needed to `fixup` the changes.
- Rebase from master before submitting PR
- When PR is approved, avoid commiting the `Merge Commit`

## Built With

- [Express](https://expressjs.com) - Nodejs framework
- [Sequelize](https://sequelize.org/) - DB ORM used with PG driver
- [Umzug](https://github.com/sequelize/umzug) - Library to programmatically handle execution and logging of migration tasks
