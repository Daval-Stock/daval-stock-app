const express = require("express")
const {createSale, getSales} = require("../controllers/createSale");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware")

router.post("/create",authMiddleware,createSale);
router.get("/",getSales)

module.exports = router;