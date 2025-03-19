const express = require ("express")
const router = express.Router()
const  charactersCtrl = require ("../controllers/charactersCtrl")


router.get("/characters", charactersCtrl.getAllCharacters)

router.get("/characters/:id", charactersCtrl.getOneCharacter)


module.exports = router