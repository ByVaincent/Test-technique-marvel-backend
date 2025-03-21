const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const passwordEncryption = (password) => {
  const salt = uid2(16);
  const hash = SHA256(password + salt).toString(encBase64);

  return { salt, hash };
};

module.exports = passwordEncryption;
