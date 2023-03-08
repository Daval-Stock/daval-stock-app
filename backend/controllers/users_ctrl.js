const User = require("../models/users");

const getAllUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
};

const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne(email);

  if (!findUser) {
    const newUser = User.create(req.body);
    res.json(newUser);
  } else {
    res.json({
      msg: "User Already Exists",
      success: false,
    });
  }
};

module.exports = { createUser, getAllUsers };
