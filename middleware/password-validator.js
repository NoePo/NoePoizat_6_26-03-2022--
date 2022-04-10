const passwordSchema = require("../models/Password");

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)){
        res.status(400).json({ error : "le mot de passe n'est pas assez fort : il faut minimum 8 caractères, une majuscule, une minuscule, deux chiffres et il ne doit pas y avoir d'espaces" });
    }
    else{
        next();
    }
}