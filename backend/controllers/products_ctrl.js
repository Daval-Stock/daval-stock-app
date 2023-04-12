const Product = require("../models/products");
const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/fileUpload");
const User = require("../models/users");
const Category = require('../models/category'); // Importez le modèle Category
const fs = require('fs');
const path = require('path');
const Sites = require("../models/sites")
async function getDefaultCategoryId() {
  let defaultCategory = await Category.findOne({ name: "autres" });
  return defaultCategory;
}


//pour ajouter un produit
const createProduct = asyncHandler(async (req, res) => {
  const { name, quantity, price, description, categoryName, siteName } = req.body;

  if (!name || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }   

  //Check if category exist
  // Handle Image upload
  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  else {""
    // Use default image if no image is provided
    fileData = {
      fileName: 'default-product-image.jpg',
      filePath: "../uploads/default-product-image.jpg",
      fileType: 'image/jpeg',
      fileSize: 'unknown',
    };
  }
  console.log(req.body)
console.log(categoryName)
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const category = await Category.findOne({ name: categoryName });
  console.log(category)
  // Si la catégorie n'est pas trouvée, utilisez la catégorie par défaut
  const categoryId = category ? category._id : await getDefaultCategoryId();
  
  //pour voir si un site existe
  const site = await Sites.findOne({name:siteName});
 
  const siteId = site?._id;
 console.log(siteId)
 
  //create Product
 sku = name.substring(0, 3).toUpperCase() + category.name.substring(0, 3).toUpperCase();
  try {
    const findProduct = await Product.findOne({ name, category:categoryId });
    console.log(findProduct)
    if (!findProduct) {
      const product = await Product.create({
        user: user,
        name,
        sku,
        category:categoryId,
        quantity,
        price,
        description,
        image: fileData,
        site: siteId
      });
      console.log("Le produit n'existait pas!");
      res.status(201).json({
        _id: product?._id,
        userName: product?.user?.name,
        name: product?.name,
        sku: product?.sku,
        category: product?.category?.name,
        quantity: product?.quantity,
        price: product?.price,
        description: product?.description,
        createAt: product?.createdAt,
        siteName: product?.site.name,
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
    const products = await Product.find().populate('user').populate('category').populate('site');
    const formattedProducts = products.map(product => {
      const userName = product.user ? product.user?.name : 'Unknown';
      const categoryName = product.category ? product.category?.name : 'Unknown';
      const siteName = product.site ? product.site?.name : 'Unknown';
      return {
        _id: product._id,
        userName,
        name: product.name,
        sku: product.sku,
        category: categoryName,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        createdAt: product.createdAt,
        site: siteName
      };
    });
    res.status(200).json(formattedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server Error" });
  }
});

//trouver un produit avec son id
const getProductById = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findById(req.params.id).populate('user').populate('category').populate('site');
     if (!products) {
      res.status(404).json({ success: false, message: "product not found" });
    } else {
      res.status(200).json({
        _id: products?._id,
        userName: products?.user?.name,
        name: products?.name,
        sku: products?.sku,
        category: products?.category?.name,
        quantity: products?.quantity,
        price: products?.price,
        image: products?.image,
        description: products?.description,
        site: products?.site?.name,
        createAt: products?.createdAt,
        
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//trouver un produit ave son sku
const getProductBySku = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findOne({ sku: req.params.sku }).populate('user').populate('category');
     if (!products) {
      res.status(404).json({ success: false, message: "product not found" });
    } else {
      res.status(200).json({
        _id: products?._id,
        userName: products?.user?.name,
        name: products?.name,
        sku: products?.sku,
        category: products?.category?.name,
        quantity: products?.quantity,
        price: products?.price,
        image: products?.image,
        description: products?.description,
        site: products?.site?.name,
        createAt: products?.createdAt,
      });
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
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const imagePath = path.join(uploadsDir, req.file.originalname);
    fs.writeFileSync(imagePath, req.file.buffer);

    fileData = {
      fileName: req.file.originalname,
      filePath: `/uploads/${req.file.originalname}`,
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
  getProductBySku
};
