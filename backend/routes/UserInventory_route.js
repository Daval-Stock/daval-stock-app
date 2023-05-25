const express = require("express");
const router = express.Router();

const { CreateInventory } = require("../controllers/UserInventoryController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create",authMiddleware, CreateInventory);

module.exports = router;