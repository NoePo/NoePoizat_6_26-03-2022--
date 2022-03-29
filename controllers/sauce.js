const Sauce = require('../models/Sauce');
// Avoir accès aux opérations liés au système de fichier
const fs = require('fs');

// Tableau des sauces reçues
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        // Génère l'Url de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistré !" }))
        .catch(error => res.status(400).json({ error }));
}

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        // Si existe
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            // Si existe pas
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
        .catch(error => res.status(400).json({ error }))
}

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]; // Retourne deuxième
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce suprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));

    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => {
            // Vérifier que l'utilisateur qui fait la suppresion est bien propriétaire de la sauce
            if (!sauce) {
                return res.status(404).json({
                    error: new Error('Objet non trouvé !')
                })
            }
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({
                    error: new Error('Requête non autorisée!')
                });
            }
        }
    );
}

// Trouver un objet par son identifiant
exports.getOneSauce = (req, res, next) => {  // : = partie de la route dynamique
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}

// Récupérer toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}