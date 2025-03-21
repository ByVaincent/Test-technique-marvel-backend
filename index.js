const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(cors());

try {
  mongoose.connect(`${process.env.MONGO_DB_CONNECT}`);
  console.log("Connected to MongoDb");
} catch (error) {
  console.log(error);
}

//routes imports
const charactersRtes = require("./routes/charactersRoute");
const comicsRtes = require("./routes/comicsRoute");
const authenticationRtes = require("./routes/authenticationRoute");

app.get("/", (req, res) => {
  res.status(200).json("Bienvenue!");
});

app.use(authenticationRtes);

app.use(charactersRtes);

app.use(comicsRtes);

app.all("*", (req, res) => {
  res.status(404).json("Not found!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running!");
});
