const express = require("express");
const router = express.Router();

const Games = require("../../models/Games");
const Players = require("../../models/Players");
const HighScores = require("../../models/HighScores");
const { QueryTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secretpassword@localhost:5432/highscore"
);

// GET /admin/highscore/new
try {
  router.get("/new", async function (req, res) {
    const games = await Games.findAll();
    const players = await Players.findAll();

    res.render("admin/highscores/new", {
      title: "Administration",
      games,
      players,
    });
  });
} catch (err) {
  console.log(err);
}

// GET /admin/highscores/list
try {
  router.get("/list", async function (req, res) {
    const query =
      "SELECT highscores.id AS id, games.name AS game, imageurl, description, points, firstname, surname, date " +
      "FROM games " +
      "JOIN highscores " +
      "  ON games.id = highscores.game_id " +
      "JOIN players " +
      "  ON highscores.player_id = players.id";

    const gameScores = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    res.render("admin/highscores/list", {
      title: "Administration",
      gameScores,
    });
  });
} catch (err) {
  console.log(err);
}

// POST /admin/games/new
router.post("/new", async function (req, res) {
  const { game_id, player_id, points, date } = req.body;

  await HighScores.create({
    game_id,
    player_id,
    points,
    date,
  });

  res.redirect("/admin/highscores/list");
});

module.exports = router;
