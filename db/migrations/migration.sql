\c lyrics_db

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS songs (
  id SERIAL PRIMARY KEY,
  genius_id BIGINT,
  title VARCHAR(255),
  artist VARCHAR(255),
  album_image VARCHAR(255),
  user_id INTEGER REFERENCES users(id)
);
