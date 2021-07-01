const express = require('express');
const router = express.Router();

const Games = require('../../models/Games');

// GET /admin/
router.get('/', function (req, res) {

    res.redirect("/admin/games/list");

});


module.exports = router;