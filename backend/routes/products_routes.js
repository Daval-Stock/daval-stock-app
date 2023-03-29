const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products_ctrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// Créer un nouveau produit
router.post("/createProduct", authMiddleware, createProduct);

// Récupérer tous les produits
router.get("/", getProducts);

// Récupérer un produit spécifique
router.get("/:id", getProductById);

//Modifier un produit
router.put("/update/:id", updateProduct);

//route pour supprimer un produit
router.delete("/delete/:id", deleteProduct);
module.exports = router;
