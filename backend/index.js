const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 8081;

// Connexion MySQL
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reservation"
});

connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        process.exit(1);
    }
    console.log("✅ Connexion réussie à la base de données");
});

// Middleware
app.use(cors());
app.use(express.json());

/** 📌 Utilisateur - Inscription **/
app.post('/api/users/register', (req, res) => {
    const { nom, prenom, email, mot_de_passe } = req.body;
    const sql = 'INSERT INTO utilisateur (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nom, prenom, email, mot_de_passe], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    });
});

/** 📌 Utilisateur - Connexion **/
app.post('/api/users/login', (req, res) => {
    const { email, mot_de_passe } = req.body;
    const sql = 'SELECT * FROM utilisateur WHERE email = ? AND mot_de_passe = ?';
    connection.query(sql, [email, mot_de_passe], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.length > 0) {
            res.json({ message: 'Connexion réussie', user: result[0] });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }
    });
});

/** 📌 Obtenir tous les trains **/
app.get('/api/trains', (req, res) => {
    const sql = 'SELECT * FROM train';
    connection.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

/** 📌 Ajouter un train **/
app.post('/api/trains', (req, res) => {
    const { nom_train, ville_départ, ville_arrivée, date_départ, heure_départ } = req.body;
    const sql = 'INSERT INTO train (nom_train, ville_départ, ville_arrivée, date_départ, heure_départ) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nom_train, ville_départ, ville_arrivée, date_départ, heure_départ], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Train ajouté avec succès' });
    });
});

/** 📌 Obtenir les places disponibles pour un train **/
app.get('/api/trains/:id/places', (req, res) => {
    const idTrain = req.params.id;
    const sql = `
        SELECT p.id_place, p.numéro_place, p.état, w.numéro_wagon
        FROM place p
        JOIN wagon w ON p.id_wagon = w.id_wagon
        WHERE w.id_train = ? AND p.état = 'libre'
    `;
    connection.query(sql, [idTrain], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

/** 📌 Réserver une place **/
app.post('/api/reservations', (req, res) => {
    const { id_utilisateur, id_train, id_place } = req.body;

    const sql = 'INSERT INTO reservation (id_utilisateur, id_train, id_place, date_reservation) VALUES (?, ?, ?, NOW())';
    connection.query(sql, [id_utilisateur, id_train, id_place], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        // Mettre à jour l'état de la place
        const updatePlaceSql = 'UPDATE place SET état = "réservée" WHERE id_place = ?';
        connection.query(updatePlaceSql, [id_place], (errUpdate) => {
            if (errUpdate) return res.status(500).json({ error: errUpdate });
            res.status(201).json({ message: 'Réservation effectuée avec succès' });
        });
    });
});

/** 📌 Voir les réservations d’un utilisateur **/
app.get('/api/users/:id/reservations', (req, res) => {
    const userId = req.params.id;
    const sql = `
        SELECT r.id_reservation, t.nom_train, p.numéro_place, r.date_reservation 
        FROM reservation r
        JOIN train t ON r.id_train = t.id_train
        JOIN place p ON r.id_place = p.id_place
        WHERE r.id_utilisateur = ?
    `;
    connection.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
