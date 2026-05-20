const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelizeDB = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false,
});

async function connectToDatabase() {
  try {
    await sequelizeDB.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelizeDB;
}

module.exports = { sequelizeDB, connectToDatabase };