const Product = require("../models/products");
const User = require("../models/users");
const Sale = require("../models/sale");
const asyncHandler =  require("express-async-handler");


const createSale = asyncHandler(async (req, res) => {
  const { productIdentifier, quantity } = req.body;

  const upperProductIdentifier = productIdentifier.toUpperCase(); // Convertit le SKU en majuscules

  // Cherche le produit par SKU ou par ID
  const product = await Product.findOne({
    sku: upperProductIdentifier
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
    return;
  }

  const user = await User.findById(req.user.id); // Récupère l'ID de l'utilisateur authentifié
  if (!user) {
    res.status(404);
    throw new Error("User not found");
    return;
  }

  // Vérifie si le site du produit correspond au site de l'utilisateur
  if (product.site.toString() !== user.site.toString()) {
    res.status(403);
    throw new Error("Product not available at the user's site");
    return;
  }

  // Récupère le prix du produit et effectue la multiplication avec la quantité
  const totalPrice = product.price * quantity;

  // Créez l'objet de vente ici (exemple)
  const sale = new Sale({
    product: product._id,
    user: user._id,
    quantity: quantity,
    totalPrice: totalPrice,
    site : user.site
  });

  // Sauvegardez l'objet de vente dans la base de données (exemple)
  const createdSale = await sale.save();
  //mettre à jour le stock
  product.quantity -= quantity;
    await product.save();
  // Retourne la réponse avec l'objet de vente créé (exemple)
  res.status(201).json(createdSale);
});

const getSales = asyncHandler(async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product")
      .populate("user")
      .populate("site");

    const formattedSales = sales.map((sale) => {
      return {
        _id: sale._id,
        product: sale.product.name,
        user: sale.user.name,
        quantity: sale.quantity,
        totalPrice: sale.totalPrice,
        site: sale.site.name,
        createdAt: sale.createdAt,
      };
    });

    res.status(200).json(formattedSales);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = {
    createSale, getSales
}
