CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name character varying(128) NOT NULL,
    "createdAt" TIMESTAMP
    WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP
    WITH TIME ZONE NOT NULL
);

CREATE UNIQUE INDEX users_pkey_index ON users(id);