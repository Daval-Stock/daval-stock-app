const express = require("express");
const router = express.Router();
const {
  getSites,
  createSite,
} = require("../controllers/sites_ctrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getSites);
router.post("/", authMiddleware, createSite);

module.exports = router;