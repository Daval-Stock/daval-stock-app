// Importer Mongoose pour définir un schéma de modèle
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma du modèle d'une commande
const orderSchema = new Schema({

    // Site où la commande est passée (une référence au modèle Site)
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site'
  },
  // Produit commandé (une référence au modèle Product)
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
   // Quantité de produit commandée
  quantity: {
    type: Number,
    required: true
  },
  // Statut de la commande : 'placed' (passée) ou 'fulfilled' (remplie)
  status: {
    type: String,
    enum: ['placed', 'fulfilled'],
    default: 'placed'
  },
  datePlaced: {
    type: Date,
    default: Date.now
  },
  dateFulfilled: {
    type: Date
  }
});

module.exports = mongoose.model('Order', orderSchema);
