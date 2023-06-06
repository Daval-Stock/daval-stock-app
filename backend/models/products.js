const mongoose = require("mongoose");
// Assurez-vous d'importer le modèle Category

let productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    //cette ligne commenter ci-dessous fait référence à l'unité de gestion de stock qui contient toutes les références les aux produits
    /*     sku: 'SKU-' + Math.random().toString(36).substring(7)
    , */
    sku: {
      type: String,
      unique: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
      required: [true, "Please quantity"],
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
    },
    supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Rendre facultatif si certains produits n'ont pas de fournisseur spécifique
  },
    ExpirationDate:{
      type:Date,
      required:false,
    }
  },
  {
    //jfdj
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
