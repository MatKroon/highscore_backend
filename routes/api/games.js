const express = require("express");
const router = express.Router();

require("../../models/MongooseStart");
const Games = require("../../models/Games");

//TODO: GET id ??
//TODO: GET serach title
//TODO: POST
//TODO: PUT id
//TODO: DELETE

/**
 * @swagger
 * components:
 *  schemas:
 *    Games:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Product id
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Product price
 *         imageUrl:
 *           type: string
 *           description: Product price
 *       example:
 *         id: 1
 *         name: Black T-Shirt
 *         description: Lorem ipsum dolor
 *         price: 249
 *         imageUrl: https://via.placeholder.com/320x320.png?title=Black+T-Shirt
 * /



/**
 * @swagger
 * /api/games:
 *   get:
 *     description: Respons back with all the applications games lorem ipsum dolor
 *     summary:  gets all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of games
 *         content:
 *           application/json:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Games'
 
 */

//*                $ref: '#/components/schemas/Games'

// GET /api/games/
router.get("/", function (req, res) {
  Games.find({}, (err, games) => {
    const gamesDTO = games.map(mapGamesToDTO);
    res.json(gamesDTO);
  });
});

// GET /api/games/searchTerm
router.get("/:searchTerm", function (req, res) {
  const searchTerm = req.params.searchTerm;
  Games.find({ name: { $regex: searchTerm, $options: "i" } }, (err, games) => {
    console.log(games);
    if (!games) {
      return res.sendStatus(404);
    }
    const gamesDTO = games.map(mapGamesToDTO);
    res.json(gamesDTO);
  });
});

// GET /admin/games/list
router.get("/list", function (req, res) {
  Games.find({}, (err, games) => {
    res.render("admin/games/list", {
      title: "Administration",
      games,
    });
  });
});

// POST /admin/games/new
router.post("/", function (req, res) {
  const { name, description, genre, imageurl } = req.body;
  const urlSlug = name.replace("-", "").replace(" ", "-").toLowerCase();

  var game = new Games({
    name,
    description,
    genre,
    image_url: imageurl,
    url_slug: urlSlug,
  });

  game.save((err, results) => {
    console.log(results._id);
  });

  res.redirect("/admin/games/list");
});

// GET /admin/games/edit
router.get("/edit/:id", async function (req, res) {
  const urlSlug = req.params.id;
  const game = await Games.findOne({ url_slug: urlSlug }).exec();
  res.render("admin/games/edit", {
    title: "Administration",
    game,
  });
});

// POST /admin/games/edit
router.post("/edit/:urlSlug", async function (req, res) {
  const { id, name, description, genre, imageurl } = req.body;

  const url_slug = name.replace("-", "").replace(" ", "-").toLowerCase();

  Games.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      genre,
      image_url: imageurl,
      url_slug,
    },
    (err, results) => {
      if (err) {
        console.log(err);
      }
    }
  );

  res.redirect("/admin/games/list");
});

// get /admin/games/delete
router.get("/delete/:id", async function (req, res) {
  const id = req.params.id;
  Games.findOneAndDelete({ _id: id }, (err, results) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect("/admin/games/list");
});

const mapGamesToDTO = (game) => {
  return {
    highestscore: {
      player: {
        firstname: game.highestscore.player.firstname,
        surname: game.highestscore.player.surname,
      },
      points: game.highestscore.points,
      date: game.highestscore.date,
    },
    highscores: game.highscores,
    _id: game._id,
    name: game.name,
    description: game.description,
    genre: game.genre,
    url_slug: game.url_slug,
    image_url: game.image_url,
  };
};

module.exports = router;
