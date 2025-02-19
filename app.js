const express = require("express"); //je récupère la bibliothèque express
const cors = require("cors"); //je veux autoriser des applications à communiquer avec moi
const sequelizeClient = require("./app/database/connect");
const dotvenv = require("dotenv"); //cette bibliothèque vas me permettre d'ajouter des VE au process en cours
dotvenv.config(); //ajoute mes VE du fichier .env
const userRoutes = require("./app/routes/user");
const app = express(); // mon application express est initialisée

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

app.set("port", process.env.PORT);
// tu vas chercher la valeur dans le .env
app.set("host", process.env.HOST);

async function dbConnect() {
  let retries = 5;
  while (retries) {
    try {
      await sequelizeClient.authenticate();
      console.log("Connection has been established successfully.");
      break;
    } catch (err) {
      console.log("Error connecting to the database. Retrying...");
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000)); // Attente de 5 secondes
    }
  }
}
dbConnect();

app.use("/api/users", userRoutes);
module.exports = app;
