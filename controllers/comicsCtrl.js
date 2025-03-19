require("dotenv").config()
const axios = require ("axios")


const getAllComics = async (req, res) => {

    //prepare the query parameters for API request
    const limit =req.body.limit || 100;
    const skip = req.body.skip || 0;
    const title = req.body.title || null
    
        try {
    
            //fetch characters' datas
            const fetchAllComics = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}${limit ? "&limit=" + limit : ""}${skip ? "&skip=" + skip : ""}${title ? "&title=" + title : ""}`)
    
            const comicsDatas = fetchAllComics.data
    
               res.status(200).json(comicsDatas)
        } catch (error) {
            res.status(error.status || 500).json(error.message || "Internal server error")
        }
    
}



module.exports = {getAllComics}