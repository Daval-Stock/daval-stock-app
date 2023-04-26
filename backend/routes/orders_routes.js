const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {createOrder,getOrders,getOrderById, updateOrder, deleteOrder, } = require('../controllers/order_ctrl');

// Créer un nouveau produit
router.post('/create',authMiddleware, createOrder);

// Récupérer tous les produits
router.get('/all-order', getOrders);

// Récupérer un produit spécifique
router.get('/:id', getOrderById);

//Modifier un produit
router.put('/update/:id',updateOrder);

//route pour supprimer un produit
router.delete('/delete/:id',deleteOrder);
module.exports= router;