const { Model, Sequelize, DataTypes } = require("sequelize");

class Players extends Model {}

const sequelize = new Sequelize(
  `postgres://${process.env.PSQL_USER}:${process.env.PSQL_PASS}@${process.env.PSQL_HOST}:${process.env.PSQL_PORT}/${process.env.PSQL_DB}`
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
