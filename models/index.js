const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: { rejectUnauthorized: false } // nécessaire sur Render
  },
  logging: false
});

module.exports = sequelize;
