DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS crystals CASCADE;
DROP TABLE IF EXISTS journals CASCADE;
DROP TABLE IF EXISTS crystals_journals CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  join_date DATE DEFAULT current_date,
  favorite_crystal VARCHAR(255) NOT NULL
);

CREATE TABLE crystals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL
);

CREATE TABLE journals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  journal_date timestamp DEFAULT current_date
);

CREATE TABLE crystals_journals (
  crystal_id INTEGER REFERENCES crystals,
  journal_id INTEGER REFERENCES journals
);
