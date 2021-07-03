const express = require("express");
const router = express.Router();

const Games = require("../../models/Games");

// GET /admin/games/new
router.get("/new", function (req, res) {
  res.render("admin/games/new", {
    title: "Administration",
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
router.post("/new", function (req, res) {
  const { name, description, genre, imageurl } = req.body;
  const urlSlug = name.replace("-", "").replace(" ", "-").toLowerCase();

  var game = new Games({
    name,
    description,
    genre,
    imageurl,
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
      imageurl,
      url_slug,
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

module.exports = router;
