const pool = require('./db');

// Ajouter une dîme
async function addDime(data) {
  const { member_id, date, montant_fc, montant_usd, reçu_num } = data;
  const result = await pool.query(`
    INSERT INTO dimes (member_id, date, montant_fc, montant_usd, reçu_num)
    VALUES ($1,$2,$3,$4,$5) RETURNING *
  `, [member_id, date, montant_fc, montant_usd, reçu_num]);
  return result.rows[0];
}

// Lister toutes les dîmes
async function getAllDimes() {
  const result = await pool.query(`
    SELECT d.id, m.nom, m.postnom, m.section, d.date, d.montant_fc, d.montant_usd, d.reçu_num
    FROM dimes d
    JOIN members m ON d.member_id = m.id
    ORDER BY d.date DESC
  `);
  return result.rows;
}

// Récupérer dîmes par membre
async function getDimesByMember(member_id) {
  const result = await pool.query(`SELECT * FROM dimes WHERE member_id=$1`, [member_id]);
  return result.rows;
}

module.exports = { addDime, getAllDimes, getDimesByMember };
