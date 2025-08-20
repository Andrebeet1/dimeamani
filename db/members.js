const pool = require('./db');

// Ajouter un membre
async function addMember(data) {
  const { nom, postnom, dateNaissance, adresse, telephone, section } = data;
  const result = await pool.query(
    `INSERT INTO members (nom, postnom, date_naissance, adresse, telephone, section)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nom, postnom, dateNaissance, adresse, telephone, section]
  );
  return result.rows[0];
}

// Lister tous les membres
async function getAllMembers() {
  const result = await pool.query(`SELECT * FROM members ORDER BY id`);
  return result.rows;
}

// Récupérer un membre par ID
async function getMemberById(id) {
  const result = await pool.query(`SELECT * FROM members WHERE id=$1`, [id]);
  return result.rows[0];
}

// Mettre à jour un membre
async function updateMember(id, data) {
  const { nom, postnom, dateNaissance, adresse, telephone, section } = data;
  const result = await pool.query(`
    UPDATE members 
    SET nom=$1, postnom=$2, date_naissance=$3, adresse=$4, telephone=$5, section=$6
    WHERE id=$7 RETURNING *
  `, [nom, postnom, dateNaissance, adresse, telephone, section, id]);
  return result.rows[0];
}

// Supprimer un membre
async function deleteMember(id) {
  await pool.query(`DELETE FROM members WHERE id=$1`, [id]);
}

module.exports = { addMember, getAllMembers, getMemberById, updateMember, deleteMember };
