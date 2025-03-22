const express = require("express");
const router = express.Router();
const favoritesCtrl = require("../controllers/favoritesCtrl");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/favorites", isAuthenticated, favoritesCtrl.getAllFavorites);

router.post(
  "/favorites/update",
  isAuthenticated,
  favoritesCtrl.updateFavorites
);

module.exports = router;
