const passwordEncryption = require("../utils/passwordEncryption");
const User = require("../Models/User");
const uid2 = require("uid2");

const signup = async (req, res) => {
  try {
    console.log(req.body);

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
      favorites: [],
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Utilisateurs créé avec succès", data: newUser });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

const login = (req, res) => {
  try {
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

module.exports = { signup, login };
