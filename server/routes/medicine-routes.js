const express = require('express');
const { createMedicine, getMedicine, editMedicine, getSpecialOffersMedicines, deleteMedicine, getFeaturedMedicines } = require('../controllers/medicine-controller');
const { adminAuth } = require('../middlewares/auth');

const multer = require('multer');
const { check } = require('express-validator');

const router = express.Router();
const upload = multer({ dest: "uploads/" })


router.get('/', getMedicine);
router.get('/special-offers', getSpecialOffersMedicines);
router.get('/featured-medicines', getFeaturedMedicines);


router.post(
    '/create-medicine',
    [
        adminAuth,
        upload.single("image_url"), // req.file me information daalega
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

        check('name')
            .notEmpty().withMessage("Medicine name is required.")
            .isString().withMessage("Medicine name should be a string.")
            .isLength({ min: 3 }).withMessage("Medicine name should be at least 3 characters long.")
            .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Medicine name should not contain special characters."),

        check('composition')
            .optional()
            .isString().withMessage("Composition should be a string.")
            .isLength({ min: 3 }).withMessage("Composition should be at least 3 characters long.")
            .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Composition should not contain special characters."),

        check('price')
            .notEmpty().withMessage("Price is required.")
            .isFloat({ gt: 0 }).withMessage("Price should be a positive number."),

        check('priceOff')
            .optional()
            .isInt({ min: 0, max: 100 }).withMessage("PriceOff should be an integer between 0 and 100."),

        check('category')
            .notEmpty().withMessage("Category is required.")
            .isString().withMessage("Category should be a string.")
            .isLength({ min: 3 }).withMessage("Category should be at least 3 characters long.")
            .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Category should not contain special characters."),

        check('exp_date')
            .notEmpty().withMessage("Expiration date is required.")
            .isISO8601().withMessage("Expiration date should be in YYYY-MM-DD format.")
            .toDate(),

        check('inventory_quantity')
            .notEmpty().withMessage("Inventory quantity is required.")
            .isInt({ min: 0 }).withMessage("Inventory quantity should be a non-negative integer.")
    ],
    createMedicine
);

router.post('/edit-medicine', [adminAuth,

    check('medicine._id')
        .notEmpty().withMessage("Medicine ID is required.")
        .isMongoId().withMessage("Medicine ID should be a valid MongoDB ID."),

    check('medicine.name')
        .notEmpty().withMessage("Medicine name is required.")
        .isString().withMessage("Medicine name should be a string.")
        .isLength({ min: 3 }).withMessage("Medicine name should be at least 3 characters long.")
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Medicine name should not contain special characters."),

    check('medicine.composition')
        .optional()
        .isString().withMessage("Composition should be a string.")
        .isLength({ min: 3 }).withMessage("Composition should be at least 3 characters long.")
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Composition should not contain special characters."),

    check('medicine.price')
        .notEmpty().withMessage("Price is required.")
        .isFloat({ gt: 0 }).withMessage("Price should be a positive number."),

    check('medicine.priceOff')
        .optional()
        .isInt({ min: 0, max: 100 }).withMessage("PriceOff should be an integer between 0 and 100."),

    check('medicine.category')
        .notEmpty().withMessage("Category is required.")
        .isString().withMessage("Category should be a string.")
        .isLength({ min: 3 }).withMessage("Category should be at least 3 characters long.")
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Category should not contain special characters."),

    check('medicine.inventory_quantity')
        .notEmpty().withMessage("Inventory quantity is required.")
        .isInt({ min: 0 }).withMessage("Inventory quantity should be a non-negative integer.")
], editMedicine);

router.post('/delete-medicine', [
    adminAuth,
    check('medicineId').notEmpty().withMessage("Medicine Id is required.")
        .isMongoId().withMessage("MedicineId should be a valid MongoId.")
], deleteMedicine);

module.exports = router;