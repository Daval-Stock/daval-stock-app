const Product = require("../models/products");
const asyncHandler = require("express-async-handler");
//pour ajouter un produit
const createProduct = asyncHandler(async (req, res) => {
  try {
    const productname = req.body.name;
    const siteName = req.body.site;

    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create product.");
  }
});

//pour obtenir la liste de tout les produits
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//trouver un produit avec son id
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//modifier un produit
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

//Supprimer un produit
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "product not found" });
    } else {
      res.status(200).json({ success: true, message: "Product deleted" });
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
