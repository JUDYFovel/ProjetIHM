const express = require('express');
const sequelize = require('./db/sequelize');
const Utilisateur = require('./models/Utilisateur');
const Train = require('./models/Train')
const Place = require('./models/Place')
const Reservation = require('./models/Reservation')

const app = express();
const PORT = 8081;

app.use(express.json());

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err); 
    });


require('./routes/utilisateur/createUser')(app)

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});