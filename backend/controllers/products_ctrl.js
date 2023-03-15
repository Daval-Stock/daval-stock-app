const Product = require('../models/products');
const asyncHandler = require("express-async-handler")
const {fileSizeFormatter} = require("../utils/fileUpload")
const cloudinary = require("cloudinary").v2;

//pour ajouter un produit
const createProduct = asyncHandler( async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinarryj
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "daval",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  //create Product
  try {
  const product = await Product.create({
    user:req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  })
     return res.status(201).json(product);
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to create product.' });
  }
});

//pour obtenir la liste de tout les produits
const getProducts   =   asyncHandler( async (req, res) => {
    try {
      const products = await Product.find({ user: req.user.id }).sort("-createdAt");
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'server Error' });
    }
  });

//trouver un produit avec son id 
const getProductById    = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ success: false, message: 'product not found' });
      } else {
        res.status(200).json( product);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

//modifier un produit
const  updateProduct    = asyncHandler (async (req, res) => {

  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
      res.status(500);
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
      const product = await Product.findByIdAndUpdate(req.params.id, {
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
      });
      if (!product) {
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Error server' });
    }
  });

//Supprimer un produit
const  deleteProduct = asyncHandler (async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        res.status(404).json({ success: false, message: 'product not found' });
      } else {
        res.status(200).json({ success: true, message: 'Product deleted' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Error server' });
    }
  });

module.exports = {createProduct, getProductById, getProducts,updateProduct, deleteProduct}


