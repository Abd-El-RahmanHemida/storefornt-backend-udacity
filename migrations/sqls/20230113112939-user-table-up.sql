CREATE TABLE users(id SERIAL PRIMARY KEY,
first_name VARCHAR(80),
last_name VARCHAR(80),
user_name VARCHAR(120) UNIQUE,
user_password TEXT);