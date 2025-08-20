const express = require('express');
const router = express.Router();
const { addMember, getAllMembers, updateMember, deleteMember } = require('../db/members');

// Ajouter un membre
router.post('/add', async (req, res) => {
  try {
    const member = await addMember(req.body);
    res.json({ success: true, member });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Lister tous les membres
router.get('/list', async (req, res) => {
  const members = await getAllMembers();
  res.json(members);
});

// Modifier un membre
router.put('/update/:id', async (req, res) => {
  try {
    const member = await updateMember(req.params.id, req.body);
    res.json({ success: true, member });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Supprimer un membre
router.delete('/delete/:id', async (req, res) => {
  try {
    await deleteMember(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;
