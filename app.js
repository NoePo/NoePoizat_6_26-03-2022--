// Importation d'express
const express = require('express'); 
const cors = require('cors')

//
const bodyParser=require('body-parser')

// Se connecter à la base de donnée Mongo DB
const mongoose = require('mongoose');

// Donne accès au chemin de notre système de fichier
const path = require ('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

mongoose.connect('mongodb+srv://NoeP:monmdp@cluster0.wlnfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Créer l'application express
const app = express();

app.use(express.json());

// Eviter les erreurs de type CORS
app.use(cors());

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Pour cette route on utilise sauceRoutes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;




