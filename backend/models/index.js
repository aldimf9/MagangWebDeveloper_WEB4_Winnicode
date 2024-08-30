const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Test = require('./Test')(sequelize, Sequelize);

db.User.hasMany(db.Test, { foreignKey: 'userId' });
db.Test.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
