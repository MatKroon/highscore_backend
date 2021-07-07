const express = require("express");
const router = express.Router();

require("../../models/MongooseStart");
const Games = require("../../models/Games");
const Players = require("../../models/Players");
const HighScores = require("../../models/HighScores");

// GET /api/highscores
router.get("/", async function (req, res) {
  HighScores.find({}, (err, gameScores) => {
    if (err) {
    }
    const gameScoresDTO = gameScores.map(scoresToDTO);
    res.json(gameScoresDTO);
  });
});

// POST /admin/games/new
router.post("/", async function (req, res) {
  const { game_id, player_id, points, date } = req.body;
  const game = await Games.findOne({ _id: game_id }).exec();
  const player = await Players.findOne({ _id: player_id }).exec();

  if (!game) {
    return res
      .status(400) // 400 Bad Request
      .send("Game with that Id does not exist");
  }

  if (!player) {
    return res
      .status(400) // 400 Bad Request
      .send("Player with that Id does not exist");
  }

  if (!points) {
    return res
      .status(400) // 400 Bad Request
      .send("Not a valid value for point");
  }

  if (!date) {
    return res
      .status(400) // 400 Bad Request
      .send("Not a valid value for date");
  }

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

  res.sendStatus(201);
});

// get /admin/highscores/delete
// THIS IS AN ISSUE AS DELETEING ALSO NEED TO DELETE FROM THE GAMES TABLE AS OF DUBLICATE DATA
router.delete("/:id", async function (req, res) {
  const id = req.params.id;

  HighScores.findOne({ _id: id }, (err, results) => {
    Games.findOne({ _id: results.game_id }, async (err, game) => {
      if (game.highestscore.points == results.points) {
        // update highscores and highestscore

        const all_highscores = await HighScores.find({
          _id: game.highscores,
        }).exec();

        const higestScore = all_highscores.sort((a, b) => {
          return b.points - a.points;
        })[0];

        Games.findOneAndUpdate(
          { _id: results.game_id },
          {
            highestscore: {
              player: {
                firstname: higestScore.player.firstname,
                surname: higestScore.player.surname,
              },
              points: higestScore.points,
              date: higestScore.date,
            },
          },
          (err, res) => {}
        );
      } else {
        //update only highscores
        const newHighscores = game.highscores.filter((scoreId) => {
          if (scoreId != id) {
            return scoreId;
          }
        });

        Games.findOneAndUpdate(
          { _id: results.game_id },
          { higgscores: newHighscores },
          (err, res) => {}
        );
      }
    });
    if (err) {
      return res.sendStatus(204);
    }
  });

  HighScores.findOneAndDelete({ _id: id }, (err, res) => {});

  res.sendStatus(204);
});

const scoresToDTO = (score) => {
  return {
    _id: score._id,
    game_id: score.game_id,
    player_id: score.player_id,
    game_name: score.game_name,
    player: {
      firstname: score.player.firstname,
      surname: score.player.surname,
    },
    points: score.points,
    date: score.date,
  };
};

module.exports = router;
