const { Sequelize } = require("sequelize");
require("dotenv").config();
console.log("DB_PASSWORD =", process.env.DB_PASSWORD);
console.log("Type of DB_PASSWORD =", typeof process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, 
  }
);
console.log(sequelize);

module.exports = sequelize;
