const express = require('express');
const { addToCart, getCartItems, updateQuantity, deleteItemFromCart } = require('../controllers/cart-controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getCartItems);

router.post('/add-to-cart', auth, addToCart);

router.post('/update-quantity', auth, updateQuantity);

router.post('/delete', auth, deleteItemFromCart);

module.exports = router;