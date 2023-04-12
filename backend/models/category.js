const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});
// Créez et vérifiez la catégorie "Autres"

module.exports = mongoose.model("Category", CategorySchema);
