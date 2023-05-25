const mongoose = require('mongoose');

const UserInventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  inventory: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

const UserInventory = mongoose.model('UserInventory', UserInventorySchema);

module.exports = UserInventory;
