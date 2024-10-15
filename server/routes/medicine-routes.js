const express = require('express');
const { createMedicine } = require('../controllers/medicine-controller');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-medicine', adminAuth, createMedicine);

module.exports = router;