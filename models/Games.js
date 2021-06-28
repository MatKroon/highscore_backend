const { Model, Sequelize, DataTypes } = require('sequelize');

class Games extends Model { }

const HighScores = require('./HighScores.js');
 const Players = require('./Players.js');

const sequelize = new  Sequelize('postgres://postgres:secretpassword@localhost:5432/highscore');



    
Games.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageurl: {
        type: DataTypes.STRING,
        allowNull: false
    }
} ,
    {
        sequelize,
        tableName: 'games',
        timestamps: false
    }
);



Games.belongsToMany(Players, { through: HighScores });
module.exports = Games;

