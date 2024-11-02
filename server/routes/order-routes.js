const express = require('express');
const { auth } = require('../middlewares/auth');
const { getOrders, postOrders, changeStatusOfOrders } = require('../controllers/order-controller');

const router = express.Router();

router.get('/', auth, getOrders);

router.post('/post-order', auth, postOrders);

router.post('/change-status/', auth, changeStatusOfOrders);

module.exports = router;