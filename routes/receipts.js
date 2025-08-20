const express = require('express');
const router = express.Router();
const { getAllDimes } = require('../db/dimes');

// Générer un reçu simple
router.get('/:recuNum', async (req, res) => {
  const dimes = await getAllDimes();
  const receipt = dimes.find(d => d.reçu_num === req.params.recuNum);
  if (!receipt) return res.status(404).send('Reçu introuvable');
  
  res.json({
    eglise: 'ECC 8e CEPAC AMANI NGUBA',
    reçuNum: receipt.reçu_num,
    nom: receipt.nom + ' ' + receipt.postnom,
    montantFC: receipt.montant_fc,
    montantUSD: receipt.montant_usd,
    signatureComptable: '________________',
    signatureRev: '________________'
  });
});

module.exports = router;
