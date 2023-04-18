const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getCategories);
router.post("/create", authMiddleware,isAdmin, createCategory);
router.put("/update/:id", authMiddleware,isAdmin, updateCategory);
router.delete("/delete/:id", authMiddleware,isAdmin, deleteCategory);

module.exports = router;