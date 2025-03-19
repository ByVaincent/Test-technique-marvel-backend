const express = require ("express")
const router = express.Router()
const comicsCtrl = require ("../controllers/comicsCtrl")

router.get("/comics", comicsCtrl.getAllComics)


module.exports = router