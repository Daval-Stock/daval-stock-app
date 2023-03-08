const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

module.exports = mongoose.model('Site', siteSchema);
