const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 1
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.dev = require("./dev.model.js")(sequelize, Sequelize);

module.exports = db;
