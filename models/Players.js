const { Model, Sequelize, DataTypes } = require("sequelize");

class Players extends Model {}

const sequelize = new Sequelize(
  "postgres://postgres:secretpassword@localhost:5432/highscore"
);

Players.init(
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "players",
    timestamps: false,
  }
);

module.exports = Players;
