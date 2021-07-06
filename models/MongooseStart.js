const mongoose = require("mongoose");
const mongo = "mongodb://localhost/highscore";

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
