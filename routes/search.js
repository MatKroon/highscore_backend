var express = require("express");
var router = express.Router();

require("../models/MongooseStart");
const Games = require("../models/Games.js");

/* GET home page. */
router.get("/", async function (req, res) {
  const searchTerm = req.query.q;

  Games.find({ name: { $regex: searchTerm, $options: "i" } }, (err, games) => {
    //const amount = games.length();
    const amount = 1;
    res.render("search", {
      title: "Sökresultat",
      games,
      amount,
      searchTerm,
    });
  });
});

module.exports = router;
