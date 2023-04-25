const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
    required: true,
  },
  
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Sale", saleSchema);
