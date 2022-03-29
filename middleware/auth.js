// Authentification

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupérer le deuxième élément
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décoder avec la clef
        const userId = decodedToken.userId; // Récupère le userId
        req.auth = {userId}; 
        // Si token différent
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        } 
        // Si tout va bien
        else {
            next();
        }
    } catch {
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
}