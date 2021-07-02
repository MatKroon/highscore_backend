MOONGOSE;

class Games extends Model {}

const sequelize = new Sequelize(
  `postgres://${process.env.PSQL_USER}:${process.env.PSQL_PASS}@${process.env.PSQL_HOST}:${process.env.PSQL_PORT}/${process.env.PSQL_DB}`
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
