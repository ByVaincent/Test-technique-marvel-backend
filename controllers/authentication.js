const passwordEncryption = require("../utils/passwordEncryption");

const signup = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw {
        status: 400,
        message: "Veuillez renseigner votre email et votre mot de passe",
      };
    }

    const encryptedData = passwordEncryption(req.body.password);

    console.log(encryptedData);
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
