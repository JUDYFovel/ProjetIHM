const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize'); // Assurez-vous que le chemin est correct

const Utilisateur = sequelize.define('Utilisateur', {
    id_utilisateur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'utilisateur',
    timestamps: false,
});

module.exports = Utilisateur;