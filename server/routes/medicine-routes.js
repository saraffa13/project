const express = require('express');
const { createMedicine, getMedicine, editMedicine } = require('../controllers/medicine-controller');
const { adminAuth } = require('../middlewares/auth');

const multer = require('multer');
const { check } = require('express-validator');

const upload = multer({ dest: "uploads/" })

const router = express.Router();

router.post(
    '/create-medicine',
    [
        adminAuth,
        upload.single("image_url"),
        check('image_url')
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Image is required');
                }

                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!allowedTypes.includes(req.file.mimetype)) {
                    throw new Error('Invalid file type. Only JPEG and PNG are allowed.');
                }

                const maxSize = 2 * 1024 * 1024;
                if (req.file.size > maxSize) {
                    throw new Error('File size exceeds 2MB');
                }

                return true;
            }),
    ],
    createMedicine
);

router.post('/edit-medicine', adminAuth, editMedicine);
router.get('/', getMedicine);

module.exports = router;