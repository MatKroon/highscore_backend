const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("../../models/MongooseStart");
const User = require("../../models/User");

/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Generate authentication token lorem ipsum dolor
 *     summary:  Generate authentication token
 *     tags: [Login]
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Token generated
 *       401:
 *         description: Unauthorized
 */

// GET /api/login  / create token
router.post("/", function (req, res) {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    console.log(user);
    if (user && user.password == password) {
      const token = generateJwtToken(user);
      res.json({ token });
    } else {
      res.sendStatus(401); //Unauthorized
    }
  });
});

function generateJwtToken(user) {
  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    "TOP_SECRET_HIGHSCORE"
  );
  return token;
}

module.exports = router;
