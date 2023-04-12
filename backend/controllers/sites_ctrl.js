const Site = require("../models/sites");
const asyncHandler = require("express-async-handler");

const getSites = asyncHandler(async (req, res) => {
  try {
    const categories = await Site.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const createSite = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);
  if (!name) {
    res.status(400);
    throw new Error("Please provide a Site name");
  }

  try {
    const existingSite = await Site.findOne({ name });
    if (existingSite) {
      res.status(400);
      throw new Error("Site already exists");
    }
    console.log(existingSite)
    const newSite = new Site(req.body);
    await newSite.save();
    res.status(201).json(newSite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = {
  getSites,
  createSite,
};
