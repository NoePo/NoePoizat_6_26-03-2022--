const express = require('express');

// Créer un router
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauce');


// Importer depuis les controllers ; Rajoute le auth sur les routes qu'on veut protéger
router.post('/', auth, multer, sauceCtrl.createSauce); 
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);


module.exports = router;