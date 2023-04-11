const Product = require("../models/products");
const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/fileUpload");
const User = require("../models/users");
const Category = require("../models/category");     

//pour ajouter un produit
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;

  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }   

  //Check if category exist
  const categoryObj = await Category.findById(category);
  if (!categoryObj) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  //create Product
 sku = name.substring(0, 3).toUpperCase() + category.substring(0, 3).toUpperCase();
  try {
    const findProduct = await Product.findOne({ name, category });
    console.log(findProduct)
    if (!findProduct) {
      const product = await Product.create({
        user: user,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
      });
      console.log("Le produit n'existait pas!");
      res.status(201).json({
        _id: product?._id,
        userName: product?.user?.name,
        name: product?.name,
        sku: product?.sku,
        category: product?.category,
        quantity: product?.quantity,
        price: product?.price,
        description: product?.description,
        createAt: product?.createdAt,
      });
    } else {
      throw new Error("Product Already Exists");
    }


    return;
  } catch (error) {
    console.error(error);
    throw new Error("Product Already Exists");
  }
});

//pour obtenir la liste de tout les produits

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).sort(
      "-createdAt"
    );
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server Error" });
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
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//modifier un produit
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "daval",
        resource_type: "image",
      });
    } catch (error) {
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        quantity,
        price,
        description,
        image: Object.keys(fileData).length === 0 ? product?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error server" });
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
    res.status(500).json({ success: false, message: "Error server" });
  }
});

module.exports = {
  createProduct,
  getProductById, 
  getProducts,
  updateProduct,
  deleteProduct,
};
