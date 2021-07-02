mongo use highscore;
 
db.highscore.games.insert({
        name: 'Tetris',
        description: 'Ett spel där block placeras tillsammans för att bilda en full rad som då försvinner',
        genre: 'Datorspel',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Emacs_Tetris_vector_based_detail.svg/480px-Emacs_Tetris_vector_based_detail.svg.png',
        url_slug: 'tetris',
        highscores: [], //  [ObjectId(""), ObjectId("")],
        highestscore: {
            player:{

            },
            points: ,
            date: ''
        }
    });

db.highscore.players.insert({
    firstname: '',
    surname: '',
    email: '',
});

db.highscore.highscores.insert({
    game_id: ObjectId(''),
    player_id: ObjectId(''),
    points: ,
    date: ''
});

// what do i need to do?

// show games with there higest scores
// show highscores connected to a games

// show users admin
// show games admin
// show highscores admin




// -- CREATE TABLE games (
// --   id SERIAL PRIMARY KEY,
// --   name VARCHAR(50) NOT NULL,
// --   description VARCHAR(250) NOT NULL,
// --   genre VARCHAR(50) NOT NULL,
// --   imageurl VARCHAR(250) NOT NULL,
// --   url_slug VARCHAR(50) NOT NULL,
// --   CONSTRAINT url_unique UNIQUE (url_slug)
// -- );

// -- -- ALTER TABLE games add column url_slug VARCHAR(50);

// -- CREATE TABLE players (
// --   id SERIAL PRIMARY KEY,
// --   firstname VARCHAR(50) NOT NULL,
// --   surname VARCHAR(50) NOT NULL,
// --   email VARCHAR(250) NOT NULL
// -- );

// -- CREATE TABLE highscores2 (
// --   id SERIAL PRIMARY KEY,
// --   game_id INTEGER NOT NULL,
// --   player_id INTEGER NOT NULL,
// --   points INTEGER NOT NULL,
// --   date DATE NOT NULL,
// --   FOREIGN KEY (player_id) REFERENCES players(id),
// --   FOREIGN KEY (game_id) REFERENCES games(id)
// --   ON DELETE CASCADE
// -- );

// -- INSERT INTO games 
// -- (name, description, genre, imageurl, url_slug) 
// -- VALUES 
// -- ('Tetris','Lorum ipsum dolor ','mobilspel', 'https://scienceline.org/wp-content/uploads/2020/01/tetris.jpg','tetris'),
// -- ('Mariocart','Lorum ipsum dolor ','tv-spel', 'https://images-na.ssl-images-amazon.com/images/I/71eq0cyHRUS._AC_SL1500_.jpg','mariocart');




// -- INSERT INTO players 
// -- (firstname, surname, email) 
// -- VALUES 
// -- ('Kalle','Anka','kalle.anka@gmail.com'), 
// -- ('Test','Testsson','test.test@gmail.com');


// -- INSERT INTO highscores 
// -- (game_id, player_id, points, date) 
// -- VALUES 
// -- (1, 2, 1000, '2019-02-02'), 
// -- (2, 1, 4000, '2019-02-02'),
// -- (2, 2, 1500, '2019-02-02'),
// -- (1, 2, 1500, '2020-02-02');