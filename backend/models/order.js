const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  site: {
    type: String
  },
  supplier: {
    type:String
  },
  order_date: {
    type: Date,
    default:Date.now
  },
  delivery_date: Date,
  total_cost: {
    type: Number,
    required: true
  },
  order_status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
    default: 'Pending'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
