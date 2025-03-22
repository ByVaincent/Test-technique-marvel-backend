const passwordEncryption = require("../utils/passwordEncryption");
const checkPassword = require("../utils/checkPassword");
const User = require("../Models/User");
const Favorites = require("../Models/Favorites");
const uid2 = require("uid2");

const signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      throw {
        status: 400,
        message:
          "Veuillez renseigner votre pseudo, votre email et votre mot de passe",
      };
    }

    //check if the email is already used

    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      throw { status: 409, message: "Email déjà utilisé" };
    }

    //encrypt the password (return hash and salt)
    const encryptedData = passwordEncryption(req.body.password);

    //create token
    const token = uid2(64);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      hash: encryptedData.hash,
      salt: encryptedData.salt,
      token: token,
    });

    //create the favorites linked object in db
    const userFavorites = new Favorites({ favorites: [], owner: newUser._id });

    await userFavorites.save();
    await newUser.save();

    res.status(201).json({
      message: "Utilisateurs créé avec succès",
      data: { token: newUser.token, username: newUser.username },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw {
        status: 400,
        message: "Merci de renseigner votre mail et votre password",
      };
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw { statut: 400, message: "Email ou mot de passe incorrect" };
    }

    //check password
    const goodPassword = checkPassword(req.body.password, user.salt, user.hash);

    if (!goodPassword) {
      throw { statut: 400, message: "Email ou mot de passe incorrect" };
    }

    res.status(200).json({
      message: "Vous êtes connecté",
      data: { token: user.token, username: user.username },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

const getUserData = async (req, res) => {
  try {
    if (!req.body.token) {
      throw { status: 400, message: "Vous devez être connecté" };
    }

    const userData = await User.findOne({ token: req.body.token });

    res.status(200).json({
      data: { token: userData.token, username: userData.username },
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

module.exports = { signup, login, getUserData };
