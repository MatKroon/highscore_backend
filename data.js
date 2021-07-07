db.games.insertMany(
  {
    name: "Tetris",
    description:
      "Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.r",
    genre: "Datorspel",
    image_url: "https://via.placeholder.com/300?text=Tetris",
    url_slug: "tetris",
  },
  {
    name: "Schack",
    description:
      "Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.r",
    genre: "Datorspel",
    image_url: "https://via.placeholder.com/300?text=Schack",
    url_slug: "schack",
  }
);

db.players.insertMany(
  {
    firstname: "Kalle",
    surname: "Anka",
    email: "mail@123.se",
  },
  {
    firstname: "Kajsa",
    surname: "Anka",
    email: "mail@123.se",
  }
);

// db.highscore.highscores.insert({
//     game_id: ObjectId(''),
//     player_id: ObjectId(''),
//     points: 0,
//     date: ''
// });

db.users.insert({
  username: "mattias",
  password: "123",
  email: "mer.andersson@gmail.com",
});
