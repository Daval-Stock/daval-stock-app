const {getProducts} = require('../controllers/products_ctrl.js');
const {UserInventory} = require('../models/UserInventory')
const asyncHandler = require('express-async-handler');
const user = require('../models/users');
const CreateInventory = asyncHandler(async (req, res) => {
  const { inventory } = req.body; // Assume user only sends their inventory

  // Automatically get the user's id from the req.user object
  const userId = req.user._id;

  // Create and save the user's inventory
  const userInventory = new UserInventory({ user: userId, inventory });
  await userInventory.save();

  // Get the automatic inventory
  const automaticInventory = await getProducts();

  // Compare the user's inventory with the automatic inventory
  const comparisonResult = compareInventories(userInventory.inventory, automaticInventory);

  // send a response with the differences
  res.json(comparisonResult);
});

const compareInventories = (userInventory, automaticInventory) => {
    const differences = [];

    for (const item of userInventory) {
        const automaticItem = automaticInventory.find(ai => ai.sku === item.sku);

        if (!automaticItem || automaticItem.quantity !== item.quantity) {
            differences.push({
                sku: item.sku,
                userQuantity: item.quantity,
                automaticQuantity: automaticItem ? automaticItem.quantity : 0
            });
        }
    }

    return differences;
};

module.exports = { CreateInventory };