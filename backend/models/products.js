const mongoose = require("mongoose");
let Schema = mongoose.schema;

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  /* 
    supplier: {
        type:Schema.Types.ObjectId,
        ref: 'Supplier'
    }, */
  images: {
    type: Array,
  },
  stock: [
    {
      /*   site:{
            type:Schema.Types.ObjectId,
            ref: 'Site'
        }, */
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
