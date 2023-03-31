# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (GET `/product` )
- Show (GET `/product/:id`)
- Create [token required] (POST `//product`)

#### Users

- Index [token required] (GET `/user`)
- Show [token required] (GET `/user/:id`)
- Create (POST `/user`)

#### Order

- Current Order by user (args: user id)[token required] (GET `/order/:userId`)

## Data Shapes

#### Product

The table includes the following fields:

- id
- name
- price
  The SQL schema for this table is as follows:

```sql
CREATE TABLE products(id SERIAL PRIMARY KEY,name TEXT,price INTEGER);
```

#### User

The table includes the following fields:

- id
- first_name
- last_name
- user_name
- user_password
  The SQL schema for this table is as follows:

```sql
CREATE TABLE users(id SERIAL PRIMARY KEY,
first_name VARCHAR(80),
last_name VARCHAR(80),
user_name VARCHAR(120) UNIQUE,
user_password TEXT);
```

#### Orders

The table includes the following fields:

- id
- user_id
- status of order (active or complete)
  The SQL schema for this table is as follows:

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status varchar NOT NULL,
    CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);
```

#### order_products

The table includes the following fields:

- id
- quantity
- order_id
- product_id
  The SQL schema for this table is as follows:

```sql
CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
 quantity   INTEGER NOT NULL,
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id)
 );
```
