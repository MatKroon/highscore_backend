var express = require('express');
var router = express.Router();

// const { Client } = require("pg");

 const Games = require('../models/Games.js');
 const HighScores = require('../models/HighScores.js');
 const Players = require('../models/Players.js');
 const { QueryTypes } = require('sequelize');
//  Games.belongsToMany(Players, { through: HighScores });
//  Players.belongsToMany(Games, { through: HighScores });
 Games.hasMany(HighScores);
 HighScores.belongsTo(Games,{foreignKey:'game_id'});
 

/* GET home page. */
  router.get('/', async function (req, res) {
  
    // const games = await Games.findAll({ include: Players,
    //                                    order: [[ Players, HighScores, "points", "DESC" ]]
                                        
                                      
    //                                   });
    try {
      let games = await Games.findAll({ include: HighScores});
      
      games = JSON.parse(JSON.stringify(games));



      games = games.map( game => { 
       game.HighScores = game.HighScores.sort( (a,b) => { 
            return b.points - a.points;
        })
        return game;
      });

      games = games.sort( (a,b) => {
        return b.HighScores[0].date - a.HighScores[0].date;
      });
    
console.log(games);


    
    // const games = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
   
    // We didn't need to destructure the result here - the results were returned directly
     console.log(games[0].HighScores);
    // const client = new Client(req.app.locals.client);

  // client.connect();

    // client.query("SELECT id, name, description, imageUrl FROM games", (err, result) => {

     

      // const games = result.rows;
    
      res.render('index', {
        title: 'High Score',
        games
      });
       client.end();

      } catch(err) {
        // catches errors both in fetch and response.json
       console.log(err);
      }
    });

   
   
// });

module.exports = router;



  