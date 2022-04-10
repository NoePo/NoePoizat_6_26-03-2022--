const express = require ('express');
const router = express.Router();
const userCtrl = require ("../controllers/user");

const passwordSchema = require("../middleware/password-validator");


// S'inscrire
router.post("/signup", passwordSchema, userCtrl.signup);

// Se connecter
router.post("/login", userCtrl.login);

module.exports = router;