const express = require("express");
const cors = require("cors"); // je veux autoriser à communiquer avec moi
const dotenv = require("dotenv"); // pour les variables d'environnement
const sequelizeClient = require("./app/database/connect"); // pour la connexion à la base de données
const userRoutes = require("./app/routes/user"); // pour les routes d'user
dotenv.config(); // pour les variables d'environnement

const app = express(); // init de l'app express

app.use(express.urlencoded({ extended: true })); // pour les requêtes POST
app.use(express.json({ limit: "10mb" })); // pour les requêtes POST

app.set("port", process.env.PORT);

app.set("host", process.env.HOST);

async function dbConnect() {
  try {
    await sequelizeClient.authenticate();
    console.log("connexted to the db");
  } catch (error) {
    console.log("failled to connect to the db", error);
  }
}

dbConnect();

app.use("/api/v1/user", userRoutes);

module.exports = app;
