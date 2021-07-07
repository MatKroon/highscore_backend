const express = require("express");
const router = express.Router();

require("../../models/MongooseStart");
const Games = require("../../models/Games");

//TODO: GET id ?? SKIP
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
    const gamesDTO = games.map(mapGameToDTO);
    res.json(gamesDTO);
  });
});

// GET /api/games/searchTerm
router.get("/:searchTerm", function (req, res) {
  const searchTerm = req.params.searchTerm;
  Games.find({ name: { $regex: searchTerm, $options: "i" } }, (err, games) => {
    if (!games) {
      return res.sendStatus(404);
    }

    const gamesDTO = games.map(mapGameToDTO);
    res.json(gamesDTO);
  });
});

// POST /admin/games/
router.post("/", function (req, res) {
  const { name, description, genre, imageurl } = req.body;

  if (validateThatNameUnique()) {
    const urlSlug = name.replace("-", "").replace(" ", "-").toLowerCase();

    var game = new Games({
      name,
      description,
      genre,
      image_url: imageurl,
      url_slug: urlSlug,
    });

    if (!name) {
      return res
        .status(400) // 400 Bad Request
        .send("Invalid name");
    }

    if (!genre) {
      return res
        .status(400) // 400 Bad Request
        .send("Invalid genre");
    }

    if (!imageurl) {
      return res
        .status(400) // 400 Bad Request
        .send("Invalid image url");
    }

    game.save((err, game) => {
      if (err) {
        res.sendStatus(400);
      }
      res.location(`/api/games/${game.url_slug}`);
      game = [game];

      const gameDTO = game.map(mapGameToDTO);

      res.status(201).send(gameDTO);
    });
  } else {
    res
      .status(400) // 400 Bad Request
      .send("Game already exist");
  }
});

// POST /admin/games/edit
//TODO: Here there is a need to fix so that it's double checked that the user that is added is in fact an actual user in the system or remve the posibility to edit the highestscore...
router.put("/:urlSlug", async function (req, res) {
  const urlSlug = req.params.urlSlug;

  const { id, name, description, genre, imageurl, highscores, highestscore } =
    req.body;

  const game = await Games.findOne({ url_slug: urlSlug }).exec();

  if (!game) {
    return res
      .status(400) // 400 Bad Request
      .send("No game with such urlslug");
  }

  if (game.id != id) {
    return res
      .status(400) // 400 Bad Request
      .send("urlslug and id does not mactch");
  }

  const url_slug = name.replace("-", "").replace(" ", "-").toLowerCase();

  Games.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      genre,
      image_url: imageurl,
      url_slug,
      highscores,
      highestscore,
    },
    (err, results) => {
      if (err) {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(204);
    }
  );
});

// get /api/games/{urlslug}    delete
router.delete("/:urlSlug", async function (req, res) {
  const urlSlug = req.params.urlSlug;
  Games.findOneAndDelete({ url_slug: urlSlug }, (err, results) => {
    if (err) {
      return res
        .status(204) // 400 Bad Request
        .send("Game with that urlslug did not exist");
    }
    res.sendStatus(204);
  });
});

const mapGameToDTO = (game) => {
  if (typeof game.highestscore.player.firstname == "undefined") {
    return {
      highscores: game.highscores || [],
      _id: game._id,
      name: game.name,
      description: game.description,
      genre: game.genre,
      url_slug: game.url_slug,
      image_url: game.image_url,
    };
  }

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

const validateThatNameUnique = (name) => {
  Games.findOne({ name }, (err, res) => {
    if (err) {
      return true;
    }
    return false;
  });
};

// const generateUniqeSlug = (name) => {
//   let urlSlug = name.replace("-", "").replace(" ", "-").toLowerCase();
//   console.log(urlSlug);
//   if (checkIfSlugUniqe(urlSlug)) {
//     return urlSlug;
//   }

//   for (let n = 0; n < 100; n++) {
//     urlSlug = urlSlug + "-" + n;
//     console.log(urlSlug);
//     if (checkIfSlugUniqe(urlSlug)) {
//       return urlSlug;
//     }
//   }
// };

// const checkIfSlugUniqe = (slug) => {
//   Games.findOne({ url_slug: slug }, (err, results) => {
//     if (err) {
//       return true;
//     }
//     return false;
//   });
// };

module.exports = router;
