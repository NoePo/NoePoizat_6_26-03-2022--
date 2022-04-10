const mongoose = require('mongoose');

// On rajoute le validateur unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, // unique sert à pouvoir utiliser une seule fois une adresse mail
    password: {type: String, required: true}
})

// On l'applique au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 