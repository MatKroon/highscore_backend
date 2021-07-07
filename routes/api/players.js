const express = require("express");
const router = express.Router();

require("../../models/MongooseStart");
const Players = require("../../models/Players");

//TODO: GET all
//TODO: POST
//TODO: PUT id edit
//TODO: DELETE

// GET /api(players)

router.get("/", function (req, res) {
  Players.find({}, (err, players) => {
    const playersDTO = players.map(mapPlayerToDTO);
    res.json(playersDTO);
  });
});

// POST /admin/players/new
router.post("/", async function (req, res) {
  const { firstname, surname, email } = req.body;

  if (!firstname) {
    return res
      .status(400) // 400 Bad Request
      .send("Invalid firstname");
  }

  if (!surname) {
    return res
      .status(400) // 400 Bad Request
      .send("Invalid surname");
  }

  if (!email) {
    return res
      .status(400) // 400 Bad Request
      .send("Invalid email");
  }

  const player = new Players({
    firstname,
    surname,
    email,
  });

  player.save((err, results) => {
    if (err) {
      return res.status(400).send("Could not add Player");
    }
    res.location(`/api/players/${results._id}`);
    res.sendStatus(201);
  });
});

//TODO: for some reson this findOneAndUpdate does not give an error if a non existing id is entere.
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  Players.findOneAndUpdate({ _id: id }, req.body, (err, results) => {
    if (err) {
      return res.status(404);
    }
    res.sendStatus(204);
  });
});

// get /api/players/{id}    delete
router.delete("/:id", function (req, res) {
  const id = req.params.id;
  Players.findOneAndDelete({ _id: id }, (err, results) => {
    if (err) {
      return res
        .status(204) // 400 Bad Request
        .send("Player with that id did not exist");
    }
    res.sendStatus(204);
  });
});

const mapPlayerToDTO = (player) => {
  return {
    _id: player._id,
    firstname: player.firstname,
    surname: player.surname,
    email: player.email,
  };
};

module.exports = router;
