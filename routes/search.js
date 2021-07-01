var express = require('express');
var router = express.Router();

// const { Client } = require("pg");

 const Games = require('../models/Games.js');
 const HighScores = require('../models/HighScores.js');
 const Players = require('../models/Players.js');
 // const { QueryTypes } = require('sequelize');
 Games.belongsToMany(Players, { through: HighScores });
 Players.belongsToMany(Games, { through: HighScores });

 const { Sequelize } = require('sequelize');
 
//  Games.hasMany(HighScores);
//  HighScores.belongsTo(Games,{foreignKey:'game_id'});
 

/* GET home page. */
  router.get('/', async function (req, res) {
    const searchTerm = req.query.q;
  
//     SELECT games.name AS game, imageurl, points, firstname, surname, date
//     FROM games
//     LEFT JOIN highscores 
//       ON games.id = highscores.game_id
//     LEFT JOIN players
//       ON highscores.player_id = players.id
//  WHERE games.name ILIKE '%mario%' 
    try {
      let games = await Games.findAll({ include: Players,
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${searchTerm}%`
          }
        }
      });
      
      games = JSON.parse(JSON.stringify(games));

      games = games.map( game => { 
       game.Players = game.Players.sort( (a,b) => { 
            return b.HighScores.points - a.HighScores.points;
        })
        return game;
      });
 
      games = games.sort( (a,b) => {
        return new Date(b.Players[0].HighScores.date) - new Date(a.Players[0].HighScores.date);
      });

       res.render('index', {
        title: 'High Score',
        games
      });
      

      } catch(err) {
       console.log(err);
      }
    });



module.exports = router;



  