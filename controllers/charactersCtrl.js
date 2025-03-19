require('dotenv').config()
const axios = require ("axios")


const getAllCharacters = async (req, res) => {
    
//prepare the query parameters for API request
const limit =req.body.limit || 100;
const skip = req.body.skip || 0;
const name = req.body.name || null

    try {

        //fetch characters' datas
        const fetchAllCharacters = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}${limit ? "&limit=" + limit : ""}${skip ? "&skip=" + skip : ""}${name ? "&name=" + name : ""}`)

        const charactersDatas = fetchAllCharacters.data

           res.status(200).json(charactersDatas)
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Internal server error")
    }
    
}



const getOneCharacter = async (req, res) => {

    

    try {

        if(!req.params.id){
            throw({status: 400, message: "characterId manquant"})
        }

    const characterId = req.params.id;

    const fetchOneCharacter = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`)
    
    const characterDatas = fetchOneCharacter.data

    res.status(200).json(characterDatas)


    } catch (error) {
        res.status(error.status || 500).json(error.message || "Internal server error")
    }
    console.log(req.params.id);

    
}


module.exports = {getAllCharacters, getOneCharacter}