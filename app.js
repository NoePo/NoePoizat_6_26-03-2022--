// Importation d'express
const express = require('express'); 


// Se connecter à la base de donnée Mongo DB
const mongoose = require('mongoose');

// Donne accès au chemin de notre système de fichier
const path = require ('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require ('./routes/user');

// Helmet sécurise les requêtes HTTP, les en-têtes...
const helmet = require('helmet');    

// Se connecter à la base de donnée
mongoose.connect('mongodb+srv://NoeP:monmdp@cluster0.wlnfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Créer l'application express
const app = express();

// Eviter les erreurs de type CORS
app.use((req, res, next) => {
  // Accéder à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Ajout de ces différents headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Envoyer des requêtes avec get post...
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());




app.use('/images', express.static(path.join(__dirname, 'images')));


// Utiliser Helmet 
app.use(helmet());     

// Pour cette route on utilise sauceRoutes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;




