const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous que le chemin est correct pour votre configuration Sequelize
const Utilisateur = require('./Utilisateur'); // Assurez-vous que le chemin est correct
const Train = require('./Train'); // Assurez-vous que le chemin est correct
const Place = require('./Place'); // Assurez-vous que le chemin est correct

const Reservation = sequelize.define('Reservation', {
    id_reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date_reservation: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_utilisateur: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'id_utilisateur',
        },
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
    id_place: {
        type: DataTypes.INTEGER,
        references: {
            model: Place,
            key: 'id_place',
        },
        allowNull: false,
    },
}, {
    tableName: 'reservations',
    timestamps: false,
});

module.exports = Reservation;