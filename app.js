require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

var indexRouter = require("./routes/index");
var searchRouter = require("./routes/search");
var gamesRouter = require("./routes/games");

//admin
var adminRouter = require("./routes/admin");
var adminGamesRouter = require("./routes/admin/games");
var adminPlayersRouter = require("./routes/admin/players");
var adminHighscoresRouter = require("./routes/admin/highscores");

//api
var apiLoginRouter = require("./routes/api/login");
var apiGamesRouter = require("./routes/api/games");

// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/search", searchRouter);
app.use("/games", gamesRouter);

//admin
app.use("/admin", adminRouter);
app.use("/admin/games", adminGamesRouter);
app.use("/admin/players", adminPlayersRouter);
app.use("/admin/highscores", adminHighscoresRouter);

//api
//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "High Score",
      version: "1.0.0",
    },
  },
  apis: ["./routes/api/*.js"],
};

const openApiSpecification = swaggerJSDoc(options);

//routs
app.use("/api/login", apiLoginRouter);
app.use("/api/games", apiGamesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpecification));

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
