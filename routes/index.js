var express = require('express');
var router = express.Router();

// const { Client } = require("pg");

 const Games = require('../models/Games.js');

/* GET home page. */
  router.get('/', async function (req, res) {
  
    const games = await Games.findAll();

    // const client = new Client(req.app.locals.client);

  // client.connect();

    // client.query("SELECT id, name, description, imageUrl FROM games", (err, result) => {

     

      // const games = result.rows;
    
      res.render('index', {
        title: 'High Score',
        games
      });
       client.end();
    });
   
// });

module.exports = router;



  