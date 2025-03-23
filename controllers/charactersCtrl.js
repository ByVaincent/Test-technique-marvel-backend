require("dotenv").config();
const axios = require("axios");

const getAllCharacters = async (req, res) => {
  //prepare the query parameters for API request
  const page = req.query.page;
  const name = req.query.name || null;

  //pagination
  const limit = 100;
  const skip = (Number(page) - 1) * 100;

  try {
    //fetch characters' datas
    const fetchAllCharacters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.API_KEY
      }${skip ? "&skip=" + skip : ""}${limit ? "&limit=" + limit : ""}${
        name ? "&name=" + name : ""
      }`
    );

    if (Object.keys(fetchAllCharacters.data).includes("error")) {
      throw { status: 500, message: "Internal server error, please refresh" };
    }
    const charactersDatas = fetchAllCharacters.data;

    res.status(200).json(charactersDatas);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

const getOneCharacter = async (req, res) => {
  try {
    if (!req.params.id) {
      throw { status: 400, message: "characterId manquant" };
    }

    const characterId = req.params.id;

    const fetchOneCharacter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
    );

    const characterDatas = fetchOneCharacter.data;

    //Fetch character's comic's details and add it to the response
    const comicsDetailsPromises = [];

    characterDatas.comics.forEach((comicsId) => {
      const fetchComicsDetails = axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${comicsId}?apiKey=${process.env.API_KEY}`
      );

      comicsDetailsPromises.push(fetchComicsDetails);
    });

    const comicsDetails = await Promise.all(comicsDetailsPromises);

    const comicsDetailsDatas = comicsDetails.map((response) => response.data);

    characterDatas.comicsDetails = comicsDetailsDatas;

    res.status(200).json(characterDatas);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

module.exports = { getAllCharacters, getOneCharacter };
