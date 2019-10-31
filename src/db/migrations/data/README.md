# Data Migrations

Data migrations work same as **Schema Migrations** since they both use the same migration client. The main diference is that for Data Migrations we are only updating the data of the model and we got the scripts to add them, alter them and also to rollback those changes.

Every data migration executed is stored under the `_MigrationsData` table.

To create a data migration the command is slightly different:

```
name=properties npm run db:migrate:data create
```