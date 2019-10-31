# Migrations

A `Migration` is a managed incremental, that can be reversed and that we will track as a change request over the project under the version control.  
Each migration will get a name to describe what has been changed and a date of the modification.  
Migrations will patch the database and are available to reverse (down) the changes done.

To speed things up you can create a new migration doing:

```
name=properties npm run db:migrate:schema create
```

This will generate two files, `yyyyymmdd.properties.up.sql` and `yyyyymmdd.properties.down.sql`.

Or for TS migrations:

```
name=properties type=ts npm run db:migrate:schema create
```

This will generate `yyyyymmdd.properties.ts`

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
npm run db:migrate:(schema/data) <command>
```
