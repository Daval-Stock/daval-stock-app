const mongoose = require("mongoose");
let Schema = mongoose.schema;

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
 //cette ligne commenter ci-dessous fait référence à l'unité de gestion de stock qui contient toutes les références les aux produits   
/*     sku: 'SKU-' + Math.random().toString(36).substring(7)
    , */

    description: {
        type: String,
        required:true
    },
    /* 
    supplier: {
        type:Schema.Types.ObjectId,
        ref: 'Supplier'
    }, 

    stock:[{
        site:{
            type:Schema.Types.ObjectId,
            ref: 'Site'
        },
        quantity:{
            type: Number,
            default: 0
        }
    }],*/
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required:true
    },
    supplier: {
        type: String
      },
    site: {
        type: String
      },
    stock_level: {
        type: Number,
        default:0
      },
    min_stock_level: {
        type: Number,
        default:0
      }
});

module.exports = mongoose.model("Product", productSchema);
