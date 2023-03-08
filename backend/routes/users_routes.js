const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  loginUserCtrl,
  blockUser,
  unblockUser,
} = require("../controllers/users_ctrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/all-user", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.delete("/delete/:id", deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
