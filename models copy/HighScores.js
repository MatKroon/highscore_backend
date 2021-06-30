const { Model, Sequelize, DataTypes } = require('sequelize');

class HighScores extends Model { }
const Games = require('../models/Games.js');

const Players = require('../models/Players.js');
const sequelize = new  Sequelize('postgres://postgres:secretpassword@localhost:5432/highscore');



    
HighScores.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    gameid: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Games,
            key: 'id'
        }
    },
    playerid: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Players,
            key: 'id'
        }
    },
    points: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
} ,
    {
        sequelize,
        tableName: 'highscores',
        timestamps: false
    }
);

module.exports = HighScores;
