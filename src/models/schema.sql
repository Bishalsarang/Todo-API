-- -- todos table schema
CREATE TABLE IF NOT EXISTS todos (
   id VARCHAR(255) PRIMARY KEY,
   title VARCHAR(255),
   isComplete BOOLEAN,
   priority VARCHAR(20) DEFAULT 'low',
   description TEXT
);

CREATE TABLE IF NOT EXISTS users (
   user_id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   email VARCHAR(255) UNIQUE,
   password VARCHAR(255),
   refreshToken VARCHAR(255)
);