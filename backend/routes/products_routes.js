const express = require('express');
const router = express.Router();
const productController = require('../controllers/products_ctrl');

// Créer un nouveau produit
router.post('/', productController.createProduct);

// Récupérer tous les produits
router.get('/', productController.getProducts);

// Récupérer un produit spécifique
router.get('/:id', productController.getProductById);

module.exports= router;