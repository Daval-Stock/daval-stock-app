const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please provide a category name");
  }

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400);
      throw new Error("Category already exists");
    }

    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//update category
const updateCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    category.name = name;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await category.remove();

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
