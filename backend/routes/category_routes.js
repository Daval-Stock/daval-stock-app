const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getCategories);
router.post("/", authMiddleware, createCategory);

module.exports = router;
