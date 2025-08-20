const express = require('express');
const router = express.Router();
const { addMember, getAllMembers, getMemberById, updateMember, deleteMember } = require('../db/members');

// Ajouter un membre
router.post('/add', async (req, res) => {
  try {
    const member = await addMember(req.body);
    res.json({ success: true, member });
  } catch (err) {
    console.error("Erreur POST /add:", err);
    res.json({ success: false, error: err.message });
  }
});

// Lister tous les membres
router.get('/list', async (req, res) => {
  try {
    const members = await getAllMembers();
    res.json({ success: true, members });
  } catch (err) {
    console.error("Erreur GET /list:", err);
    res.json({ success: false, error: err.message });
  }
});

// Récupérer un membre par ID
router.get('/:id', async (req, res) => {
  try {
    const member = await getMemberById(req.params.id);
    if (!member) return res.json({ success: false, error: 'Membre introuvable' });
    res.json({ success: true, member });
  } catch (err) {
    console.error("Erreur GET /:id:", err);
    res.json({ success: false, error: err.message });
  }
});

// Mettre à jour un membre
router.put('/:id', async (req, res) => {
  try {
    const member = await updateMember(req.params.id, req.body);
    res.json({ success: true, member });
  } catch (err) {
    console.error("Erreur PUT /:id:", err);
    res.json({ success: false, error: err.message });
  }
});

// Supprimer un membre
router.delete('/:id', async (req, res) => {
  try {
    await deleteMember(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur DELETE /:id:", err);
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
