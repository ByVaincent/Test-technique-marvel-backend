require('dotenv').config()
const axios = require ("axios")


const getAllCharacters = async (req, res) => {

const limit =100;
const skip = 0;
const name = "A-Bomb"
let test
    try {

        //fetch the characters datas
        const allCharacters = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}${limit ? "&limit=" + limit : ""}${skip ? "&skip=" + skip : ""}${name ? "&name=" + name : ""}`)

        console.log(allCharacters.data);

           res.status(200).json("C'est là")
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Internal server error")
    }
 
    
}



const getOneCharacter = async (req, res) => {
    console.log(req.params.id);
    res.status(200).json("Par ici")
    
}


module.exports = {getAllCharacters, getOneCharacter}