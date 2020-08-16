-- -- todos table schema
CREATE TABLE IF NOT EXISTS todos (
   todo_id SERIAL PRIMARY KEY,
   title VARCHAR(255),
   is_complete BOOLEAN,
   description TEXT
);

CREATE TABLE IF NOT EXISTS users (
   user_id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   email VARCHAR(255) UNIQUE,
   password VARCHAR(255)
);