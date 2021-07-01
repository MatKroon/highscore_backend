var express = require("express");
var router = express.Router();

// const { Client } = require("pg");

//  const Games = require('../models/Games.js');
//  const HighScores = require('../models/HighScores.js');
//  const Players = require('../models/Players.js');
const { QueryTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secretpassword@localhost:5432/highscore"
);
//  Games.belongsToMany(Players, { through: HighScores });
//  Players.belongsToMany(Games, { through: HighScores });
//  Games.hasMany(HighScores);
//  HighScores.belongsTo(Games,{foreignKey:'game_id'});

/* GET games page. */
try {
  router.get("/:urlSlug", async function (req, res) {
    const query =
      "SELECT games.name AS game, imageurl, description, points, firstname, surname, date " +
      "FROM games " +
      "JOIN highscores " +
      "  ON games.id = highscores.game_id " +
      "JOIN players " +
      "  ON highscores.player_id = players.id " +
      "WHERE games.url_slug LIKE :urlslug " +
      "ORDER BY points DESC " +
      "LIMIT 10";

    const gameScores = await sequelize.query(query, {
      replacements: { urlslug: req.params.urlSlug },
      type: QueryTypes.SELECT,
    });

    //
    // let game = await Games.findOne({ include: Players,
    //   order: [Games, Players, HighScores, 'points ', DESC],
    //   where: {
    //     url_slug : urlSlug
    //   }});

    // game = JSON.parse(JSON.stringify(game));

    res.render("games/view", {
      title: "High Score",
      gameScores,
    });
  });
} catch (err) {
  console.log(err);
}

module.exports = router;
