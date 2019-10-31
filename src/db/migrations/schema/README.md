# Schema Migrations

A schema migration is performed on a database whenever it is necessary to update or revert that database's schema to some newer or older version.

Migrations are configured as SQL / TS files stored under the `db/migrations/schema` folder, that describe the **Schema** modification (Tables, SP, Views, etc) basically db structure.

The **UP** file should have the logic to create and insert all the elements needed to execute that migration.  
The **DOWN** file should have the logic to decrease the migration, delete exactly what was created and inserted.

Every schema migration executed is stored under the `_MigrationsSchema` table.
