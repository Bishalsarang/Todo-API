-- -- todos table schema
CREATE TABLE IF NOT EXISTS todos (
   todo_id SERIAL PRIMARY KEY,
   title VARCHAR(255),
   is_complete BOOLEAN,
   description TEXT
);