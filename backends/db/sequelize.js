const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetihm', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});

async function initDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');

        await sequelize.sync({ alter: true });
        console.log('Synchronisation des modèles terminée.');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données :', error);
    }
}

initDatabase();

module.exports = sequelize;
