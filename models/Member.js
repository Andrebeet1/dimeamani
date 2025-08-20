const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Member = require('./Member');

const Dime = sequelize.define('Dime', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  montantFC: {
    type: DataTypes.DECIMAL
  },
  montantUSD: {
    type: DataTypes.DECIMAL
  },
  reçuNum: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'dimes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Relation : une dîme appartient à un membre
Dime.belongsTo(Member, { foreignKey: 'member_id' });
Member.hasMany(Dime, { foreignKey: 'member_id' });

module.exports = Dime;
