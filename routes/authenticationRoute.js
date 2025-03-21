const express = require("express");
const app = express();
const router = express.Router();
const authenticationCtrl = require("../controllers/authenticationCtrl");

router.post("/user/signup", authenticationCtrl.signup);

router.post("/user/login", authenticationCtrl.login);

module.exports = router;
