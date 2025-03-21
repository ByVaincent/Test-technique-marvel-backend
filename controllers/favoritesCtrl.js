const User = require("../Models/User");
const axios = require("axios");

const getAllFavorites = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.body.token });

    if (!user) {
      throw { status: 400, message: "Aucun utilisateur trouvé" };
    }

    //fetch all the favorites data

    const arrayOfPromises = user.favorites.map((favoriteId) => {
      console.log(favoriteId);

      return axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/character/${favoriteId}?apiKey=${process.env.API_KEY}`
      );
    });

    const results = await Promise.all(arrayOfPromises);

    const favoritesCharacters = results.map((response) => {
      return response.data;
    });

    res.status(200).json({ favoritesCharacters: favoritesCharacters });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

module.exports = getAllFavorites;
