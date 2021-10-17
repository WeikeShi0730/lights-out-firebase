require("dotenv").config();
const { Sequelize } = require("sequelize");

const config = process.env;

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: config.DIALECT,
  operatorsAliases: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
