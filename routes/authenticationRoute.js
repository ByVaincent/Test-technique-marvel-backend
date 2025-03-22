const express = require("express");
const app = express();
const router = express.Router();
const authenticationCtrl = require("../controllers/authenticationCtrl");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/user/signup", authenticationCtrl.signup);

router.post("/user/login", authenticationCtrl.login);

router.get("/user/data", isAuthenticated, authenticationCtrl.getUserData);

module.exports = router;
