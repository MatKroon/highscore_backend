const express = require("express");
const router = express.Router();

const Players = require("../../models/Players");

// GET /admin/players/new
router.get("/new", function (req, res) {
  res.render("admin/players/new", {
    title: "Administration",
  });
});

// GET /admin/players/list
try {
  router.get("/list", async function (req, res) {
    const players = await Players.findAll();

    res.render("admin/players/list", {
      title: "Administration",
      players,
    });
  });
} catch (err) {
  console.log(err);
}

// POST /admin/players/new
router.post("/new", async function (req, res) {
  const { firstname, surname, email } = req.body;

  await Players.create({
    firstname,
    surname,
    email,
  });

  res.redirect("/admin/players/list");
});

module.exports = router;
