const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductBySku,
  productImage,
} = require("../controllers/products_ctrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Créer un nouveau produit
router.post(
  "/createProduct",
  authMiddleware,
  upload.single("image"),
  createProduct
);

// Récupérer tous les produits
router.get("/all-product", authMiddleware, getProducts);

// Récupérer un produit spécifique
router.get("/:id", getProductById);

//récupérer un produit en entrant son sku
router.get("/sku/:sku", getProductBySku);

//Modifier un produit
router.put("/update/:id", updateProduct);

//route pour supprimer un produit
router.delete("/delete/:id", deleteProduct);

router.get("/product-image/:imageName", productImage);

module.exports = router;
