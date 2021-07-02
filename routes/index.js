var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Games = require("../models/Games");
const mongo = "mongodb://127.0.0.1/highscore";

/* GET home page. */
try {
  router.get("/", async function (req, res) {
    mongoose.connect(mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Games.find({}, (err, games) => {
      // let games = await Games.findAll({ include: Players });

      // games = JSON.parse(JSON.stringify(games));

      // games = games.map((game) => {
      //   game.Players = game.Players.sort((a, b) => {
      //     return b.HighScores.points - a.HighScores.points;
      //   });
      //   return game;
      // });
      // console.log(games);

      // games = games.sort((a, b) => {
      //   if (typeof b.Players === "undefined") {
      //     return 0;
      //   }
      //   if (typeof a.Players === "undefined") {
      //     return 1;
      //   }
      //   return (
      //     new Date(b.Players[0].HighScores.date) -
      //     new Date(a.Players[0].HighScores.date)
      //   );
      // });

      res.render("index", {
        title: "Senaste highscores",
        games,
      });
    });
  });
} catch (err) {
  console.log(err);
}

module.exports = router;
