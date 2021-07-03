var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Games = require("../models/Games");
const mongo = "mongodb://localhost/highscore";
mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/* GET home page. */

router.get("/", function (req, res) {
  Games.find({}, (err, games) => {
    //, { sort: { date: -1 } }

    games = games.filter((game) => {
      if (typeof game.highestscore != "undefined") {
        return game;
      }
    });

    res.render("index", {
      title: "Senaste highscores",
      games,
    });
  });
});

module.exports = router;
