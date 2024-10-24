const express = require('express');
const { createMedicine, getMedicine, editMedicine } = require('../controllers/medicine-controller');
const { adminAuth } = require('../middlewares/auth');

const multer = require('multer')

const upload = multer({ dest: "uploads/" })

const router = express.Router();

router.post('/create-medicine', adminAuth, upload.single("image_url"), createMedicine);
router.post('/edit-medicine', adminAuth, editMedicine);
router.get('/', getMedicine);

module.exports = router;