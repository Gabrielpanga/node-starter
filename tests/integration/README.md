# Integration testing

## General Guidelines

- When creating a new test, we want to be easy to understand where its issue. For that matter we have created the following definition to set as `describes`.

`Class` > `#method` > `expected result` > `conditions for that result`

For example:

```js
describe('User', () => {
  describe('#create', () => {
    describe('with valid data', () => {
      it('creates a user', async () => {});
    });
    describe('with invalid data', () => {
      it('throws an error with invalid name', async () => {});
    });
  });
});
```

- In the case of controllers the `#method` is replaced with `VERB /endpoint` as `GET /users/:id`.
- Avoid wrapping too many definitions under the same describe.

## How to run it

To run integrations tests, from command line execute:

```shell
npm run test:integration
```

## Configuration

Currently the initial configuration wipes the information from the database before each test, creating a data isolation for each test to avoid taking into account any other data.
Each test will have to create their own data to test specific the porpouse of that definition.

### Environment

- Keep in mind that the test are run under the `NODE_ENV=test`, which could affect the way the classes are initialized. All changes will be reflected on the `env.test` database.
- When running integrations test outside docker, you will need to update the `DB_HOST` to `localhost` since it won't be running under the `db` name, which is the specific database name under the docker network.

## What are factories?

Factories work as `Fixtures` for tests, it centralize the `Model` build process and creation, generating fake random data for the necessary properties.

All factories should extend from the `BaseFactory` to get the basic functionallity and implement their own `build` method with the default props for that model.
As an example checkout `UserFactory`.

## Folder structure

    .
    ├── controllers             # Tests for controllers
    ├── factories               # Model's Factories
    ├── models                  # Tests for Models
    ├── setup                   # Configurations for tests
    ├── setup/index             # Entrypoint for jest confguration.
    └── README.md

## More information

- [Test Specs](http://www.betterspecs.org) - Testing specs definitions.
- [Faker](https://github.com/marak/Faker.js/) - Data faker.
