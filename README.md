# Storefront backend

This repo contains the backend application for an eCommerce store front. It is a RESTful API.

The database schema and and API route information can be found in the [requirements doc](REQUIREMENTS.md).

## Libraries used

The application uses the following libraries:

- Runtime: Node.js (JavaScript)
- Web application framework: Express
- Language: TypeScript
- Database: Postgres
- Testing: Jasmine and Supertest

## Installation Instructions

To install the app's dependencies and use the app run the following:

`npm run create-db`

`npm run create-db` runs a script that uses db-migrate to create the database. This script assumes you have installed `postgres` on your local system .

`npm run create-db-test`

`npm run create-db-test` runs a script that uses db-migrate to create the database for tests. This script assumes you have installed `postgres` on your local system .

`db-migrate up`

`db-migrate up` runs a script that uses db-migrate to create the tables. This script assumes you have installed `postgres` on your local system .

Or you can use `npm run i-app-databaes` runs all scripts above

To run the app execute `npm run start`.

### Run Test

To run the tests execute `npm run test`.

NOTE: you must to create databse named storefront_test on your local system

### Ports

The application runs on port `3000` with database on `5432`.

### Environment variables

NODE_ENV=dev

# DB VARIABLES

POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123

# BCRYPT VARIABLES

BCRYPT_PASSWORD=meow_meow
SALT_ROUNDS=10

# JWT

TOKEN_SECRET = blablatoken
