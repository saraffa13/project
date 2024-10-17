const express = require('express');
const { auth } = require('../middlewares/auth');
const { getOrders, postOrders } = require('../controllers/order-controller');

const router = express.Router();

router.get('/', auth, getOrders);

router.post('/post-order', auth, postOrders);

// router.post('/delete-order', auth, deleteOrder);

module.exports = router;