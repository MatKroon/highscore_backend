
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(250) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  imageurl VARCHAR(250) NOT NULL
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL
);

CREATE TABLE highscores (
  id SERIAL PRIMARY KEY,
  gameid VARCHAR(50) NOT NULL,
  playerid VARCHAR(50) NOT NULL,
  points VARCHAR(250) NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (id) REFERENCES players(id),
  FOREIGN KEY (id) REFERENCES games(id)
  ON DELETE CASCADE
);

INSERT INTO games (name, description, genre, imageUrl) VALUES ('test','test','test','http://hifrihjf.com');
