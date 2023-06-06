const validateMongoDbId = require("../utils/validateMongodbId");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const User = require("../models/users");
const Sites = require("../models/sites");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const getDefaultSiteId = async () => {
  let defaultSiteId = await Sites.findOne({ name: "Metz" });
  return defaultSiteId;
};

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().populate("site");
    res.status(200).json(users);
  } catch (error) {
    throw new Error(error);
  }
});

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const site = await Sites.findOne({ name: req.body.siteName });
    if (!site) {
      res.status(404);
      throw new Error("Site not found");
      return;
    }
    const siteId = site ? site._id : await getDefaultSiteId();
    req.body.site = siteId;

    if (req.file) {
      // console.log(req.file.path);
      req.body.profileImage = req.file.path;
    }
    const newUser = await User.create(req.body);

    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      site: findUser?.site,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error("No Refresh Token is present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//logout functionnality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findByIdAndUpdate(user._id, {
    refreshToken: "",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const userProfile = asyncHandler(async (req, res) => {
  try {
    // Récupérez l'utilisateur depuis la requête (ajouté par le middleware d'authentification)
    const user = req.user;
    // console.log(user);
    // Renvoyez les informations de l'utilisateur
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.file) {
      req.body.profileImage = req.file.path;
    }

    const site = await Sites.findOne({ name: req.body.siteName });
    if (!site) {
      res.status(404);
      throw new Error("Site not found");
    }
    const siteId = site ? site._id : await getDefaultSiteId();
    req.body.site = siteId;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        role: req?.body?.role,
        site: req?.body?.site,
        profileImage: req.body.profileImage,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePwdUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send("User not found.");
  const validPassword = await bcrypt.compare(
    req.body.current_password,
    user.password
  );
  // console.log(validPassword);
  if (!validPassword) {
    console.log("Invalid current password.");
    return res.status(400).send("Invalid current password.");
  } else {
    console.log("valid current password.");
  }

  // Hasher le nouveau mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(req.body.new_password, salt);

  // Mettre à jour le mot de passe de l'utilisateur
  user.password = hashedNewPassword;
  await user.save();

  res.send("Password changed successfully.");
});

const userImage = asyncHandler(async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "uploads", imageName + ".png");
  // console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
  loginUserCtrl,
  blockUser,
  unblockUser,
  handleRefreshToken,
  userProfile,
  updatePwdUser,
  userImage,
  logout,
};
