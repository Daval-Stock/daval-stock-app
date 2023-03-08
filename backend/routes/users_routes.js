const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getAllUsers, createUser } = require("../controllers/users_ctrl");

router.get("/", getAllUsers);

router.post("/register", createUser);

module.exports = router;
