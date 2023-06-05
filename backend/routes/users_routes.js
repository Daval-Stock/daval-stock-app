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
  updatePwdUser,
  verifyIfTokenIsValid,
  userImage,
  userProfile,
} = require("../controllers/users_ctrl");

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

router.post("/register", upload.single("image"), createUser);
router.post("/login", loginUserCtrl);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/profile-image/:imageName", userImage);
router.get("/profile", authMiddleware, userProfile);
router.put("/change-password", authMiddleware, updatePwdUser);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser);
router.post("/tokenIsValid", authMiddleware, verifyIfTokenIsValid);
router.get("/all-user", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.put("/edit-user/:id", authMiddleware, isAdmin, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
