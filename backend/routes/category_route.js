const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const auth = require("../middlewares/auth");

router.get("/", auth, getCategories);
router.post("/", auth, createCategory);

module.exports = router;
