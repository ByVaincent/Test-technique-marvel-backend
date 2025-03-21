const express = require("express");
const router = express.Router();
const favoritesCtrl = require("../controllers/favoritesCtrl");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/favorites", isAuthenticated, favoritesCtrl);

module.exports = router;
