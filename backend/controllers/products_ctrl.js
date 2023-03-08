const Product = require('../models/products');
//pour ajouter un produit
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to create product.' });
  }
};

//pour obtenir la liste de tout les produits
const getProducts   =   async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'server Error' });
    }
  };

//trouver un produit avec son id 
const getProductById    = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).json({ success: false, message: 'product not found' });
      } else {
        res.status(200).json({ success: true, product });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

module.exports = {createProduct, getProductById, getProducts}