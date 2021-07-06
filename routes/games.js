var express = require("express");
var router = express.Router();

require("../models/MongooseStart");
const Games = require("../models/Games");
const HighScores = require("../models/HighScores");

/* GET games page. */
router.get("/:urlSlug", function (req, res) {
  // const query =
  //   "SELECT games.name AS game, imageurl, description, points, firstname, surname, date " +
  //   "FROM games " +
  //   "JOIN highscores " +
  //   "  ON games.id = highscores.game_id " +
  //   "JOIN players " +
  //   "  ON highscores.player_id = players.id " +
  //   "WHERE games.url_slug LIKE :urlslug " +
  //   "ORDER BY points DESC " +
  //   "LIMIT 10";

  //       Games.aggregate([{
  //         $lockup: {
  //           from: 'highscores',
  //           as: 'highscores',
  //           let: { highscores: '_id' },
  //           pipeline: [{ $match: { $expr: { $eq [ ]} } }]
  //         }
  //       }, {
  //         $project{
  //         name: 1,
  //         highscores: 1
  //       }
  // }], (err, gameScores) => {

  //   });

  const urlSlug = req.params.urlSlug;

  Games.findOne({ url_slug: urlSlug }, (err, game) => {
    const score_ids = game.highscores; //array with ObjeId
    console.log(game);
    HighScores.find({ _id: score_ids }, (err, highscores) => {
      res.render("games/view", {
        title: "High Score",
        game,
        highscores,
      });
    });
  });
});

module.exports = router;
