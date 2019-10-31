# NodeJS project starter

## 👋 Intro

This is basic Nodejs project starter. Its goal is to offer a simple way to start new api applications. It offers:

- Models
- Controllers
- Services
- Migrations
- Environment specific configurations
- Docker development environment
- Tests

## Running the project

### Dependencies

- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Commands

1. clone this project
2. run `cd <project_name>`
3. run `npm run config`
4. run `npm run docker:start:dev`
5. run `npm install`
6. run `npm run db:create:all`
7. run `npm start`

visit `http://localhost:9090/users`

## Tests

The project contains unit & integrations tests to cover the full solution.

### Running:

All: `npm test`

Unit: `npm test:unit`

Integration: `npm test:integration`

For more information about our tests:

- [General](tests/README.md) - Test general guidelines
- [Unit](tests/unit/README.md) - Unit testing guidelines
- [Integration](tests/integration/README.md) - Integration testing guidelines

## Project Structure

The full folder structure of this app is explained below:

| Name                                             | Description                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **.vscode**                                      | Contains VS Code specific settings                                                         |
| **dist**                                         | Contains the distributable (or output) from the TypeScript build. This is the code we ship |
| **src**                                          | Contains the source code                                                                   |
| **src/config**                                   | Contains the project general configuration                                                 |
| [**src/controllers**](src/controllers/README.md) | Controllers define functions that respond to various http requests                         |
| [**src/models**](src/models/README.md)           | Models define Sequelize schemas that will be used in storing and retrieving data           |
| **src/server**                                   | Server methods to run the server                                                           |
| **src/services**                                 | Services that group logic to process information                                           |
| **src/types**                                    | Holds .d.ts files not found on DefinitelyTyped.                                            |
| **src**/index.ts                                 | Entry point to the express app                                                             |
| [**tests**](tests/README.md)                     | Contains the tests                                                                         |

## Contributing guidelines

### Branches

The name of the branch should follow:

- fix/fix-name
- feature/feature-name

### Commits

We are using [Codelitt's commit styleguide](https://github.com/codelittinc/incubator-resources/blob/master/engineering/dev_best_practices/project-structure/commits.md)

### Steps

- Create a branch from the default branch
- Create one commit per fix/feature
- Create a pull request
- Request someone to review it
- Once approved, rebase and merge

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
- `db:migrate:schema / db:migrate:schema:test`: runs the database migration client of the schema for dev / test environment
- `db:migrate:data`: runs the database migration client of the data for dev environment
- `db:seed`: runs the seeds of the project for dev environment
- `start`: compiles and starts the application
- `start:dev`: watch the TS files, on a change it builds the hole application and starts.
- `start:prod`: starts the application using node for built js.
- `test:unit`: runs the unit tests
- `test:integration`: runs the integration tests on the test environment
- `test:all`: runs all test types

Execute a command via:

```shell
npm run <command>
```

## Built With

- [Express](https://expressjs.com) - Nodejs framework
- [Sequelize](https://sequelize.org/) - DB ORM used with PG driver
- [Umzug](https://github.com/sequelize/umzug) - Library to programmatically handle execution and logging of migration tasks
