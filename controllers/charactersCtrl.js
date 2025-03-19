const getAllCharacters = async (req, res) => {
    console.log("touch");
    res.status(200).json("C'est là")
    
}



const getOneCharacter = async (req, res) => {
    console.log(req.params.id);
    res.status(200).json("Par ici")
    
}


module.exports = {getAllCharacters, getOneCharacter}