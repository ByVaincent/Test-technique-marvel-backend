const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const checkPassword = (password, salt, hash) => {
  if (SHA256(password + salt).toString(encBase64) === hash) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkPassword;
