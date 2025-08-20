const express = require('express');
const router = express.Router();
const { getAllMembers } = require('../db/members');
const { getAllDimes } = require('../db/dimes');

router.get('/monthly', async (req, res) => {
  const members = await getAllMembers();
  const dimes = await getAllDimes();

  const totalFC = dimes.reduce((sum, d) => sum + (d.montant_fc || 0), 0);
  const totalUSD = dimes.reduce((sum, d) => sum + (d.montant_usd || 0), 0);
  const membersPaying = [...new Set(dimes.map(d => d.member_id))].length;

  res.json({
    totalMembers: members.length,
    membersPaying,
    totalFC,
    totalUSD,
    exchangeRate: 2000, // exemple, peut venir d'une variable
    totalGeneralUSD: totalUSD + totalFC / 2000
  });
});

module.exports = router;
