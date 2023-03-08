const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const { getAllUsers } = require("../controllers/users_ctrl");

router.get("/", (req, res) => {
  res.send("Utilisateurs");
});

module.exports = router;
