const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous que le chemin vers votre configuration Sequelize est correct

const Train = sequelize.define('Train', {
    id_train: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_train: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville_depart: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ville_arriver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'trains', // Nom de la table dans la base de données
    timestamps: false, // Désactiver les colonnes createdAt et updatedAt si non nécessaires
});

module.exports = Train;