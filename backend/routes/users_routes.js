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
  handleRefreshToken,
  logout,
} = require("../controllers/users_ctrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/all-user", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);
router.put("/edit-user", authMiddleware, isAdmin, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
