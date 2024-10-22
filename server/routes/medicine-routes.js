const express = require('express');
const { createMedicine, getMedicine, editMedicine } = require('../controllers/medicine-controller');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-medicine', adminAuth, createMedicine);
router.post('/edit-medicine', adminAuth, editMedicine);
router.get('/', getMedicine);

module.exports = router;