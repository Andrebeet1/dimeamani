const pool = require('./db');

async function createTables() {
  try {
    // Table membres
    await pool.query(`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        postnom VARCHAR(50) NOT NULL,
        date_naissance DATE NOT NULL,
        adresse VARCHAR(100),
        telephone VARCHAR(20),
        section VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Table dîmes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dimes (
        id SERIAL PRIMARY KEY,
        member_id INT REFERENCES members(id),
        date DATE NOT NULL,
        montant_fc NUMERIC,
        montant_usd NUMERIC,
        reçu_num VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('Tables créées avec succès !');
    process.exit();
  } catch (err) {
    console.error('Erreur création tables:', err);
    process.exit(1);
  }
}

createTables();
