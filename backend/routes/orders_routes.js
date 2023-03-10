const express = require('express');
const router = express.Router();
const {createOrder,getAllOrders,getOrderById, updateOrder, deleteOrder, } = require('../controllers/order_ctrl');

// Créer un nouveau produit
router.post('/create', createOrder);

// Récupérer tous les produits
router.get('/', getAllOrders);

// Récupérer un produit spécifique
router.get('/:id', getOrderById);

//Modifier un produit
router.put('/update/:id',updateOrder);

//route pour supprimer un produit
router.delete('/delete/:id',deleteOrder);
module.exports= router;