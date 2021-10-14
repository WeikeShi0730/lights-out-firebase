require("dotenv").config();
const { Sequelize } = require("sequelize");

const config = process.env;

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  operatorsAliases: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  pool: {
    max: parseInt(config.POOL_MAX),
    min: parseInt(config.POOL_MIN),
    acquire: parseInt(config.POOL_ACQUIRE),
    idle: parseInt(config.POOL_IDLE),
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
