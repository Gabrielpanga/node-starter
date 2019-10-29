# Database

## Library (ORM) used

Sequelize is an Object-Relation Mapping (ORM) library that allows us to treat the relational database as objects in our application.

For more information about [Sequelize](https://sequelize.org/)

### Creating a Model

As we mention Sequelize allow us to map **TS Classes** to a **Databse Table**, for that we have to create a **Model**.
To create a model add a ts file inside the `src/models` folder, as `NAME.model.ts`, where NAME could be `purchase` or `paymentType`.

Models must extend from the **sequelize** Model class, to get the full db access functionallity such as `create`, `find` or `delete`.
Apart from extending the Sequelize class and adding the model's properties we must define the corresponding `DataTypes` to let Sequelize understand the relation between our class and the corresponding table.

Table name should always be in plural.

```ts
Purchase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'purchases',
    sequelize: database
  }
);
```

#### Adding it to the Database

Apart from creating the model, since we use migrations, we have to create the corresponding **Database Table**.
Create a migration for that:

```shell
name=purchase npm run db:migrate create
```

Inside the `yyyyymmdd.purchase.up.sql` add the Table creation SQL statement. Keys and Indexes should also be addded.

To update your database just run:

```shell
npm run db:migrate up
```

## Configuration

The current configuration example is this:

```conf
# Database
DB_HOST=localhost
DB_DATABASE=node_graphql
DB_USER=postgres
DB_PASSWORD=postgres
DB_SQLLOG=false
```

Where:

- `DB_HOST` : Is the DB server. If you are running inside docker it will be `db` or if you have a database of your own it would be `localhost`.
- `DB_DATABASE` : Is the main database name
- `DB_USER` : Application user access, should have write permissions to create schemas.
- `DB_PASSWORD` : Application user password.
- `DB_SQLLOG` : By default false. This sets the SQL logging for **Sequelize**.

## Migrations

Migrations are explained on the root [readme](../../README.md)

## Seeding

Seeding a database is a process in which an initial set of data is provided to a database when it is being installed for a Developer.
It's very important for developers to have seeds to start faster their environment since they won't be depending on data creation.

### What is a Seed?

A seed is a specific collection of models / entities that will populate the DB, like a small data package that will run, on the development environment.

### How can I create a Seed?

Seeds can be created easily as TS files under the `db/seeds` folder. When creating a seed we just export a default function with the business logic to fullfil that seed.
As an example checkout the `user.seed.ts`, this will populate the `Users` table with some users.

### Do I want to create a seed?

Seeds are for intial and testing porpouses, so creating seeds will only be related to Development porpouses.
If you have created a entity that needs data by default required by the application, you don't need a **seed** you need a **Data Migration**.

Examples:

_Seed:_
I have created a `Purchase History` view and it would be intresting to have prepopulated that view by default. This way all developers could see this view's functionallity without having to go through the full purchase flow.

_Data Migration:_
I have created the `PaymentType` entity that can be `Cash` or `Credit Card` and this should be added to all environments, most importantly **production**.
