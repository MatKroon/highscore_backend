const express = require("express");
const router = express.Router();

require("../..models/MongooseStart");
const Games = require("../../models/Games");
const Players = require("../../models/Players");
const HighScores = require("../../models/HighScores");

//TODO: GET all
//TODO: POST
//TODO: DELETE

// GET /admin/highscore/new
router.get("/new", async function (req, res) {
  const games = await Games.find({}).exec();
  const players = await Players.find({}).exec();

  res.render("admin/highscores/new", {
    title: "Administration",
    games,
    players,
  });
});

// GET /admin/highscores/list
router.get("/list", async function (req, res) {
  HighScores.find({}, (err, gameScores) => {
    res.render("admin/highscores/list", {
      title: "Administration",
      gameScores,
    });
  });
});

// POST /admin/games/new
router.post("/new", async function (req, res) {
  const { game_id, player_id, points, date } = req.body;
  const game = await Games.findOne({ _id: game_id }).exec();
  const player = await Players.findOne({ _id: player_id }).exec();

  const highscore = new HighScores({
    game_id,
    player_id,
    game_name: game.name,
    player: {
      firstname: player.firstname,
      surname: player.surname,
    },
    points,
    date,
  });

  highscore.save((err, results) => {
    const id = results._id;
    if (typeof game.higestscore == "undefined") {
      game.higestscore = { points: 0 };
    }
    if (game.higestscore.points < points) {
      // Update only the hihestscore object

      Games.findOneAndUpdate(
        { _id: game_id },
        {
          $push: { highscores: id },
          highestscore: {
            player: {
              firstname: player.firstname,
              surname: player.surname,
            },
            points,
            date,
          },
        },
        (err, game) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } else {
      // Update only the highscores array for games
      Games.findOneAndUpdate(
        { _id: game_id },
        { $push: { highscores: id } },
        (err, game) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });

  res.redirect("/admin/highscores/list");
});

// get /admin/highscores/delete
// THIS IS AN ISSUE AS DELETEING ALSO NEED TO DELETE FROM THE GAMES TABLE AS OF DUBLICATE DATA
router.get("/delete/:id", async function (req, res) {
  const id = req.params.id;

  HighScores.findOneAndDelete({ _id: id }, (err, results) => {
    Games.findOne({}, () => {});
    Games.findOneAndUpdate({ _id: results.game_id }, {}());

    if (err) {
      console.log(err);
    }
  });

  res.redirect("/admin/highscores/list");
});

module.exports = router;
