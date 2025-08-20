const express = require('express');
const router = express.Router();

// Page login (si tu utilises EJS ou HTML côté serveur)
router.get('/login', (req, res) => {
  res.sendFile('public/pages/login.html', { root: '.' });
});

// Connexion (POST)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Exemple simple : remplacer par un vrai système utilisateur
  if (username === 'admin' && password === '1234') {
    req.session.user = username;
    return res.json({ success: true });
  }
  res.json({ success: false, error: 'Identifiants invalides' });
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;
