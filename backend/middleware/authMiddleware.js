const User = require("../models/users");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please Login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});
const isSupplier = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const supplierUser = await User.findOne({ email });
  if (supplierUser.role !== "supplier") {
    throw new Error("You are not an supplier");
  } else {
    next();
  }
});
const isNotSupplier = (req, res, next) => {
  isSupplier(
    req,
    res,
    () => {
      // Si isSupplier n'appelle pas next(), cela signifie que la condition est remplie, donc nous ne voulons pas appeler next() ici
    },
    next
  );
  console.log("ça fonctionne");
};

module.exports = { authMiddleware, isAdmin, isSupplier, isNotSupplier };
