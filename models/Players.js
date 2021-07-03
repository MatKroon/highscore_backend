const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const Players = new Schema({
  firstname: String,
  surname: String,
  email: String,
  // {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  //   validate: (value) => validator.isEmail(value),
  // },
});

module.exports = mongoose.model("players", Players);

const mongo = "mongodb://localhost/highscore";

mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
