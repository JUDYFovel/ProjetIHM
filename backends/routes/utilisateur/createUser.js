const Utilisateur = require('../../models/Utilisateur');

module.exports = (app) => {
    app.post('/api/utilisateurs', (req, res) => {
        Utilisateur.create(req.body)
            .then(utilisateur => {
                const message = `L'utilisateur ${req.body.name} a bien été créé.`
                res.json({ message, data: utilisateur })
            })
            .catch((err) => {
                const message = "L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants."
                res.status(500).json({ message, data: err })
            })
    })
}