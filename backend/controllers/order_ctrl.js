const Product = require("../models/products");
const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Site = require("../models/sites");
// importer asyncHandler
const Category = require("../models/category"); // importer le modèle Category

// créer une commande

const createOrder = asyncHandler(async (req, res) => {
  const { products, totalCost, status, sourceSite, destinationSite } = req.body;

  user = await User.findById(req.user.id);
  const newOrder = await Order.create({
    user,
    products,
    totalCost,
    status,
    sourceSite,
    destinationSite,
  });
  res.status(201).json(newOrder);
});

//obtenir une commande avec son id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user")
    .populate("destinationSite");
  res.status(200).json(orders);
});

/* const updateOrder = asyncHandler(async (req, res) => {
  const { user, products, status, sourceSite, destinationSite, totalCost } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

 

  order.user = user;
  order.products = products;
  order.status = status;
  order.sourceSite = sourceSite;
  order.destinationSite = destinationSite;
  order.totalCost = totalCost;

  const prevStatus = order.status;
  order.status = status;

  if (prevStatus !== "approved" && status === "approved") {
    for (const item of order.products) {
      const product = await Product.findById(item.product);
    

      if (!order.sourceSite) {
        next();
      }
      else {
        const sourceSiteProduct = await Product.findOne({
          _id: item.product,
          site: order.sourceSite,
        });
        sourceSiteProduct.quantity -= item.quantity;
        await sourceSiteProduct.save();
      }

      const destinationSiteProduct = await Product.findOne({
        _id:item.product,
        site: order.destinationSite,
      });
       if (destinationSiteProduct) {
        destinationSiteProduct.quantity += item.quantity;
        await destinationSiteProduct.save();
      } else {
        // Create a new product with the destination site and updated quantity
        const newProduct = new Product({
          ...product._doc,
          _id: undefined,
          site: order.destinationSite,
          quantity: item.quantity,
        });
        await newProduct.save();
      }
    }
  }

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
}); */

const updateOrder = asyncHandler(async (req, res) => {
  const { user, products, status, sourceSite, destinationSite, totalCost } =
    req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.user = user;
  order.products = products;
  order.status = status;
  order.sourceSite = sourceSite;
  order.destinationSite = destinationSite;
  order.totalCost = totalCost;

  const prevStatus = order.status;
  order.status = status;

  if (prevStatus !== "approved" && status === "approved") {
    for (const item of order.products) {
      const product = await Product.findById(item._id);

      if (order.sourceSite) {
        const sourceSiteProduct = await Product.findOne({
          _id: item._id,
          site: order.sourceSite,
        });
        if (sourceSiteProduct) {
          sourceSiteProduct.quantity -= item.quantity;
          await sourceSiteProduct.save();
        }
      }

      const destinationSiteProduct = await Product.findOne({
        _id: item._id,
        site: order.destinationSite,
      });

      if (destinationSiteProduct) {
        destinationSiteProduct.quantity += item.quantity;
        await destinationSiteProduct.save();
      } else {
        // Si le produit n'existe pas pour le site de destination, créez une nouvelle instance de produit pour ce site.
        const newProduct = new Product({
          ...item.toObject(),
          _id: mongoose.Types.ObjectId(),
          site: order.destinationSite,
          quantity: item.quantity,
        });
        await newProduct.save();
      }
    }
  }

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  await order.remove();
  res.status(200).json({ message: "Order removed" });
});

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder,
};
