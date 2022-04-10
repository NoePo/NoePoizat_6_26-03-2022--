// Pour hasher les mots de passe
const bcrypt = require('bcrypt')

const User = require('../models/Users');
const jwt = require('jsonwebtoken')


// Enregistrer des nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // 10 pour que ce soit sécurisé mais sans prendre non plus trop de temps
    // Sécuriser le mot de passe
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error})); // 500 pour erreur serveur
};

// Connecter les utilisateurs
exports.login = (req, res, next) => {
    // Trouver l'utilisateur qui correspond à l'adresse mail
    User.findOne({email: req.body.email})
    .then(user => {
        // Si on a pas trouvé d'utilisateur
        if (!user) { 
            return res.status(401).json({error: "Utilisateur non trouvé !"});
        }
        // Si utilisateur comparer le hash du mot de passe
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            // Si la comparaison est pas bonne
            if (!valid) {
                return res.status(401).json({error: 'Mot de passe incorrect !'});
            }
            // Si c'est bon
            res.status(200).json({
                // On encode de user id pour qu'on puisse pas modifier les objets des autres utilisateurs
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id}, // Sur que la requête correspond bien à l'ID
                    'RANDOM_TOKEN_SECRET', // Normalement chaîne de cractère plus longue et aléatoire
                    {expiresIn: '24h'} // Chaque token dure 24h
                )     
            });
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};