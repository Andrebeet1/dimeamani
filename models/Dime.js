const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Member = sequelize.define('Member', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postnom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateNaissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  adresse: {
    type: DataTypes.STRING
  },
  telephone: {
    type: DataTypes.STRING
  },
  section: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'members',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Member;
