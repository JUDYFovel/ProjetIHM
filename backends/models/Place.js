const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous que le chemin est correct
const Train = require('./Train'); // Assurez-vous que le chemin est correct

const Place = sequelize.define('Place', {
    id_place: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero_wagon: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numero_place: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_train: {
        type: DataTypes.INTEGER,
        references: {
            model: Train,
            key: 'id_train',
        },
        allowNull: false,
    },
}, {
    tableName: 'places',
    timestamps: false,
});

module.exports = Place;