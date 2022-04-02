const multer = require('multer');

// Différents types d'image
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Enregistrer sur le disque
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    // Null pour pas d'erreurs puis enregistre dans le dossier images
    callback(null, 'images')
    },
    // Nom de dossier utilisé
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // _ à la place des espaces
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        // on aura le nom + date + . + extension comme ça le nom sera plutôt unique
    }
});

module.exports = multer({storage}).single('image');