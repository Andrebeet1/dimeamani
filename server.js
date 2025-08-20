require('dotenv').config();           // Charger les variables d'environnement
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// Routes
app.use('/members', require('./routes/members'));
app.use('/dimes', require('./routes/dimes'));
app.use('/auth', require('./routes/auth'));
app.use('/report', require('./routes/report'));

// Page d'accueil par défaut
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/home.html'));
});

// Démarrer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
