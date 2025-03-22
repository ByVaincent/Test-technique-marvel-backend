const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .json({ message: "Vous devez être connecté pour voir vos favoris" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  req.body.token = token;

  next();
};

module.exports = isAuthenticated;
