const { Model, Sequelize, DataTypes } = require("sequelize");

class Games extends Model {}

const sequelize = new Sequelize(
  "postgres://postgres:secretpassword@localhost:5432/highscore"
);

Games.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    url_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "games",
    timestamps: false,
  }
);

module.exports = Games;
