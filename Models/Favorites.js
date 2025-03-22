const mongoose = require("mongoose");

const Favorites = mongoose.model("Favorties", {
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  favorites: [Object],
});

module.exports = Favorites;
