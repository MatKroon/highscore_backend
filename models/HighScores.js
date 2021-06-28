const { Model, Sequelize, DataTypes } = require('sequelize');

 const Players = require('./Players.js');

const Games = require('./Games');

class HighScores extends Model { }

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
