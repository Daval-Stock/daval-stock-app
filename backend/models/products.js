const mongoose = require("mongoose");
let Schema = mongoose.schema;

let productSchema = new mongoose.Schema({
    user:  {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",
    },
    name: {
        type: String,
        required: true
    },
 //cette ligne commenter ci-dessous fait référence à l'unité de gestion de stock qui contient toutes les références les aux produits   
/*     sku: 'SKU-' + Math.random().toString(36).substring(7)
    , */
    sku: {
        type:String,
        required :[true, "ce champ est obligatoire"],
        trim: true,
    },

    category: {
        type: String,
        required:true
    },
    quantity : {
        type: Number,
        required:[true, "Please quantity"]
      },

    price: {
        type: Number,
        required: true
    },
    

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
    image: {
        type:Object,
        default:{},
    },
   /*  supplier: {
        type: String
      },
    site: {
        type: String
      } */
},{
    //jfdj
timestamps:true,
}
);

module.exports = mongoose.model("Product", productSchema);
