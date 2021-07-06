const express = require("express");
const router = express.Router();

require("../../models/MongooseStart");
const Players = require("../../../models/Players");

//TODO: GET all
//TODO: POST
//TODO: PUT id edit
//TODO: DELETE

// GET /admin/players/new
router.get("/new", function (req, res) {
  res.render("admin/players/new", {
    title: "Administration",
  });
});

// GET /admin/players/list

router.get("/list", function (req, res) {
  Players.find({}, (err, players) => {
    res.render("admin/players/list", {
      title: "Administration",
      players,
    });
  });
});

// POST /admin/players/new
router.post("/new", async function (req, res) {
  const { firstname, surname, email } = req.body;
  const player = new Players({
    firstname,
    surname,
    email,
  });

  player.save((err, results) => {
    console.log(results._id);
  });

  res.redirect("/admin/players/list");
});

module.exports = router;
