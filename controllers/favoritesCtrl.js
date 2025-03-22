const User = require("../Models/User");
const Favorites = require("../Models/Favorites");
const axios = require("axios");

const getAllFavorites = async (req, res) => {
  try {
    const user = await User.findOne({ token: req.body.token });

    if (!user) {
      throw { status: 400, message: "Aucun utilisateur trouvé" };
    }

    //fetch favorites characters
    const fetchFavorites = await Favorites.findOne({
      owner: user._id.toString(),
    });

    const favorites = fetchFavorites.favorites;

    res.status(200).json({ favorites });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

const updateFavorites = async (req, res) => {
  try {
    const owner = await User.findOne({ token: req.body.token });

    const fetchFavorites = await Favorites.findOne({ owner: owner._id });

    fetchFavorites.favorites = req.body.favorites;

    await fetchFavorites.save();

    res.status(200).json(fetchFavorites.favorites);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

module.exports = { getAllFavorites, updateFavorites };
