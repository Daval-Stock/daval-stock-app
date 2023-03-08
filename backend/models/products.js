const mongoose = require('mongoose');
let Schema = mongoose.schema;


let productSchema = new mongoose.Schema({

    name: {
        type: String,
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
    }, */

    stock:[{
      /*   site:{
            type:Schema.Types.ObjectId,
            ref: 'Site'
        }, */
        quantity:{
            type: Number,
            default: 0
        }
    }]
});

module.exports =   mongoose.model('Product', productSchema)