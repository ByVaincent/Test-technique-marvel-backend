require("dotenv").config();
const axios = require("axios");

const getAllComics = async (req, res) => {
  //prepare the query parameters for API request
  const page = req.query.page;
  const title = req.query.name || null;

  //pagination
  const limit = 100;
  const skip = (page - 1) * 100;

  try {
    //fetch characters' datas
    const fetchAllComics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.API_KEY
      }${limit ? "&limit=" + limit : ""}${skip ? "&skip=" + skip : ""}${
        title ? "&title=" + title : ""
      }`
    );

    const comicsDatas = fetchAllComics.data;

    if (Object.keys(comicsDatas).includes("error")) {
      throw { status: 500, message: "Internal server error, please refresh" };
    }

    res.status(200).json(comicsDatas);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(error.message || "Internal server error");
  }
};

module.exports = { getAllComics };
