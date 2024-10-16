const express = require('express');
const { createMedicine, getMedicine } = require('../controllers/medicine-controller');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-medicine', adminAuth, createMedicine);
router.get('/', getMedicine);

module.exports = router;