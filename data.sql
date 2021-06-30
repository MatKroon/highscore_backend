
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
  game_id INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  points INTEGER NOT NULL,
  date DATE NOT NULL,
  FOREIGN KEY (player_id) REFERENCES players(id),
  FOREIGN KEY (game_id) REFERENCES games(id)
  ON DELETE CASCADE
);

INSERT INTO games 
(name, description, genre, imageurl) 
VALUES 
('Tetris','Lorum ipsum dolor ','mobilspel', 'https://scienceline.org/wp-content/uploads/2020/01/tetris.jpg'),
('Mariocart','Lorum ipsum dolor ','tv-spel', 'https://images-na.ssl-images-amazon.com/images/I/71eq0cyHRUS._AC_SL1500_.jpg');




INSERT INTO players 
(firstname, surname, email) 
VALUES 
('Kalle','Anka','kalle.anka@gmail.com'), 
('Test','Testsson','test.test@gmail.com');


INSERT INTO highscores 
(game_id, player_id, points, date) 
VALUES 
(1, 2, 1000, '2019-02-02'), 
(2, 1, 4000, '2019-02-02'),
(2, 2, 1500, '2019-02-02'),
(1, 2, 1500, '2020-02-02');