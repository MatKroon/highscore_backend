const express = require('express');
const router = express.Router();

const Games = require('../../models/Games');
const Players = require('../../models/Players');
const HighScores = require('../../models/HighScores');

// GET /admin/games/new
try{


router.get('/new', async  function (req, res) {

  const games = await Games.findAll();
  const players = await Players.findAll();

    res.render('admin/highscores/new', {
        title: "Administration",
        games,
        players
    });
});
}catch(err){
    console.log(err);
}
// GET /admin/games/list
try {
router.get('/list',  async function (req, res) {

   

        const games = await Games.findAll();
        console.log(games);
    
  
    res.render('admin/games/list', {
        title: "Administration",
        games
    });
});

} catch (err) {
    console.log(err);
}

// POST /admin/games/new
router.post('/new', async function(req, res) {

    const {
        name,
        description,
        genre,
        imageurl,
    } = req.body;

    const urlSlug = name.replace("-", "").replace(" ", "-");


    await Games.create({
        name,
        description,
        genre,
        imageurl,
        url_slug: urlSlug
    });
 
    res.redirect("/admin/games/list");
});

module.exports = router;