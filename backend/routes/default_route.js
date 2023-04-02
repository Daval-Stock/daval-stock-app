const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + '/frontend/src/Components/Home/Home.jsx');
});

module.exports = router;