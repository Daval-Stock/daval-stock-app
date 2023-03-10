const Product = require('../models/products');
//pour ajouter un produit
const createProduct = async (req, res) => {
  try {
    const productname = req.body.name;
    const siteName = req.body.site;
   
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json(product);
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to create product.' });
  }
};

//pour obtenir la liste de tout les produits
const getProducts   =   async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
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
        res.status(200).json( product);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

//modifier un produit
const  updateProduct    =   async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
  };

//Supprimer un produit
const  deleteProduct = async (req, res) => {
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
  };

module.exports = {createProduct, getProductById, getProducts,updateProduct, deleteProduct}


