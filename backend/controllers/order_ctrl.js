const Product = require('../models/products');
const Order = require('../models/order');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products', 'name price');
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Update an existing order by ID

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("products");
    // Check if order is confirmed and update stock levels accordingly
    //la conditions ci-dessous ne fonctionne pas très bien
    if (order.order_status === 'Delivered') {
      const products = order.products;
      for (const product of products) {
        const quantity = product.stock_level;
        const productFromDB = await Product.findById(product._id);
        if (productFromDB) {
          productFromDB.stock_level += quantity;
          await productFromDB.save();
        } else {
          const newProduct = new Product();
          await newProduct.save();
        }
      }
    }

    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Delete an existing order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder};

/* 
// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  try {
    const { site, product, quantity } = req.body;

    // Vérifier si le produit existe dans la base de données
    const existingProduct = await Product.findOne({ name: product });
    let productToUse;

    if (!existingProduct) {
      // Si le produit n'existe pas, le créer
      const newProduct = await Product.create({ name: product});
      productToUse = newProduct;
    } else {
      productToUse = existingProduct;
    }

    // Créer la commande
    const order = await Order.create({
      site: site,
      product: productToUse._id,
      quantity: quantity
    });

    // Mettre à jour le stock du produit
    productToUse.stock.forEach(item => {
      if (item.site.equals(site)) {
        item.quantity += quantity;
      }
    });

    await productToUse.save();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mettre à jour une commande existante
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { quantity, status } = req.body;

    // Vérifier si la commande existe dans la base de données
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Commande non trouvée' });
    }

    // Mettre à jour la commande
    order.quantity = quantity || order.quantity;
    order.status = status || order.status;

    if (status === 'fulfilled' && !order.dateFulfilled) {
      order.dateFulfilled = Date.now();
    }

    await order.save();

    // Mettre à jour le stock du produit si la commande est remplie
    if (status === 'fulfilled') {
      const product = await Product.findById(order.product);

      product.stock.forEach(item => {
        if (item.site.equals(order.site)) {
          item.quantity -= order.quantity;
        }
      });

      await product.save();
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Supprimer une commande existante
exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Vérifier si la commande existe dans la base de données
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Commande non trouvée' });
    }

    // Supprimer la commande
    await order.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

 */
