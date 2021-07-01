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
try {
  router.get("/list", async function (req, res) {
    const games = await Games.findAll();
    console.log(games);

    res.render("admin/games/list", {
      title: "Administration",
      games,
    });
  });
} catch (err) {
  console.log(err);
}

// POST /admin/games/new
router.post("/new", async function (req, res) {
  const { name, description, genre, imageurl } = req.body;

  const urlSlug = name.replace("-", "").replace(" ", "-").toLowerCase();

  await Games.create({
    name,
    description,
    genre,
    imageurl,
    url_slug: urlSlug,
  });

  res.redirect("/admin/games/list");
});

// GET /admin/games/edit
router.get("/edit/:id", async function (req, res) {
  const urlSlug = req.params.id;
  const game = await Games.findOne({ where: { url_slug: urlSlug } });
  console.log(game);
  res.render("admin/games/edit", {
    title: "Administration",
    game,
  });
});

// POST /admin/games/edit
router.post("/edit/:urlSlug", async function (req, res) {
  const { id, name, description, genre, imageurl } = req.body;

  const urlSlug = name.replace("-", "").replace(" ", "-").toLowerCase();

  await Games.update(
    {
      name,
      description,
      genre,
      imageurl,
      url_slug: urlSlug,
    },
    {
      where: { id },
    }
  );

  res.redirect("/admin/games/list");
});

// get /admin/games/delete
router.get("/delete/:id", async function (req, res) {
  const id = req.params.id;
  await Games.destroy({
    where: { id },
  });

  res.redirect("/admin/games/list");
});

module.exports = router;
