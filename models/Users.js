const mongoose = require('mongoose');

// on rajoute le validateur unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, // unique sert à pouvoir utiliser une seule fois une adresse mail
    password: {type: String, required: true}
})

// on l'applique au schéma avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 