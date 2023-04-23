const Product = require("../models/products");
const asyncHandler = require("express-async-handler");
const { fileSizeFormatter } = require("../utils/fileUpload");
const User = require("../models/users");
const Category = require("../models/category"); // Importez le modèle Category
const fs = require("fs");
const path = require("path");
const Sites = require("../models/sites");

const getDefaultCategoryId = async () => {
  let defaultCategory = await Category.findOne({ name: "autres" });
  return defaultCategory;
};

const getDefaultSiteId = async () => {
  let defaultSiteId = await Site.findOne({ name: "Metz" });
  return defaultSiteId;
};

//pour ajouter un produit
const createProduct = asyncHandler(async (req, res) => {
  const sku = req.body.sku;
  const findSku = await Product.findOne({ sku });
  if (!findSku) {
    if (req.file) {
      req.body.productImage = req.file.path;
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const userId = user ? user._id : await getDefaultCategoryId();
    req.body.user = userId;

    const category = await Category.findOne({ name: req.body.categoryName });
    console.log(category);
    if (!category) {
      res.status(404);
      throw new Error("Category not found in the DB");
    }
    const categoryId = category ? category._id : await getDefaultCategoryId();
    req.body.category = categoryId;

    // Si la catégorie n'est pas trouvée, utilisez la catégorie par défaut
    const site = await Sites.findOne({ name: req.body.siteName });
    if (!site) {
      res.status(404);
      throw new Error("Site not found");
    }
    const siteId = site ? site._id : await getDefaultSiteId();
    req.body.site = siteId;

    try {
      const findProduct = await Product.findOne({
        name: req.body.name,
        category: categoryId,
      });
      console.log(findProduct);
      if (!findProduct) {
        const product = await Product.create(req.body);

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
    } catch (error) {
      console.error(error);
      throw new Error("Product Already Exists");
    }
  } else {
    throw new Error("SKU Already Exists");
  }
});

//pour obtenir la liste de tout les produits

const getProducts = asyncHandler(async (req, res) => {
  try {
    const userRole = req.user.role;

    let products;
    if (userRole === "supplier") {
      products = await Product.find({ supplier: req.user._id })
        .populate("user")
        .populate("category")
        .populate("site");
    } else {
      products = await Product.find()
        .populate("user")
        .populate("category")
        .populate("site");
    }
    const formattedProducts = products.map((product) => {
      const userName = product.user ? product.user?.name : "Unknown";
      const categoryName = product.category
        ? product.category?.name
        : "Unknown";
      const siteName = product.site ? product.site?.name : "Unknown";
      return {
        _id: product._id,
        userName,
        name: product.name,
        sku: product.sku,
        category: categoryName,
        quantity: product.quantity,
        price: product.price,
        productImage: product.productImage,
        description: product.description,
        createdAt: product.createdAt,
        site: siteName,
      };
    });
    console.log(formattedProducts);
    res.status(200).json(formattedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server Error" });
  }
});

//trouver un produit avec son id
const getProductById = asyncHandler(async (req, res) => {
  try {
    const products = await Product.findById(req.params.id)
      .populate("user")
      .populate("category")
      .populate("site");
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
    const products = await Product.findOne({ sku: req.params.sku })
      .populate("user")
      .populate("category");
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
        image: products?.productImage,
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

  const { id } = req.params;
  const product = await Product.findById(id);
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
    return;
  }

  // Handle Image upload
  if (req.file) {
    req.body.productImage = req.file.path;
  }
  const category = await Category.findOne({ name: req.body.categoryName });

  if (!category) {
    res.status(404);
    throw new Error("Category not found in the DB");
  }
  const categoryId = category ? category._id : await getDefaultCategoryId();
  req.body.category = categoryId;

  const site = await Sites.findOne({ name: req.body.siteName });
  if (!site) {
    res.status(404);
    throw new Error("Site not found");
  }
  const siteId = site ? site._id : await getDefaultSiteId();
  req.body.site = siteId;

  try {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

const productImage = asyncHandler(async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "uploads", imageName + ".jpg");
  console.log(imagePath);
  // console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});
module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductBySku,
  productImage,
};
