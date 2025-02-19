const { Sequelize } = require("sequelize"); // Pas besoin de déclarer 'sequelizeClient' à nouveau ici

// Utilise la même instance pour te connecter
const sequelizeClient = new Sequelize(
  "hamdullah",
  process.env.PG_USER,
  process.env.PG_PWD,
  {
    host: "db_service", // Nom du service dans docker-compose
    port: 5432, // Port par défaut pour PostgreSQL
    dialect: "postgres", // Dialecte pour PostgreSQL
  },
);

module.exports = sequelizeClient;
