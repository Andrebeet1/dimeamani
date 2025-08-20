const express = require('express');
const router = express.Router();
const { addDime, getAllDimes, getDimesByMember } = require('../db/dimes');

// Ajouter une dîme
router.post('/add', async (req, res) => {
  try {
    const dime = await addDime(req.body);
    res.json({ success: true, dime });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Lister toutes les dîmes
router.get('/list', async (req, res) => {
  const dimes = await getAllDimes();
  res.json(dimes);
});

// Dîmes par membre
router.get('/member/:id', async (req, res) => {
  const dimes = await getDimesByMember(req.params.id);
  res.json(dimes);
});

module.exports = router;
