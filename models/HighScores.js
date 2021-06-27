const { Model, Sequelize, DataTypes } = require('sequelize');

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
        allowNull: false
    },
    playerid: {
        type: DataTypes.NUMBER,
        allowNull: false
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

