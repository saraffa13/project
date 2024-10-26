const express = require('express');
const { addToCart, getCartItems, updateQuantity, deleteItemFromCart } = require('../controllers/cart-controller');
const { auth } = require('../middlewares/auth');
const { check } = require('express-validator')

const router = express.Router();

router.get('/', auth, getCartItems);

router.post('/add-to-cart', [
    auth,
    check('medicineId')
        .notEmpty().withMessage("Medicine Id is required!")
        .isMongoId().withMessage("Provide a valid Mongo Id"),
    check('name')
        .notEmpty().withMessage("Medicine name is required!"),
    check('price')
        .notEmpty().withMessage("Medicine price is required!")
        .isFloat({ min: 0.01 }).withMessage("Medicine price must be greater than 0!")
], addToCart);

router.post('/update-quantity', [
    auth,
    check('medicineId')
        .notEmpty().withMessage("Medicine Id is required!")
        .isMongoId().withMessage("Provide a valid Mongo Id"),
    check('type')
        .isIn(['increment', 'decrement']).withMessage("Type can only be increment or decrement!"),
    check('price')
        .notEmpty().withMessage("Medicine price is required!")
        .isFloat({ min: 0.01 }).withMessage("Medicine price must be greater than 0!")
], updateQuantity);

router.post('/delete', [
    auth,
    check('medicineId')
        .notEmpty().withMessage("Medicine Id is required!")
        .isMongoId().withMessage("Provide a valid Mongo Id"),
    check('quantity')
        .isNumeric({ min: 1 }).withMessage("Quantity can't be zero!"),
    check('price')
        .notEmpty().withMessage("Medicine price is required!")
        .isFloat({ min: 0.01 }).withMessage("Medicine price must be greater than 0!")
], deleteItemFromCart);

module.exports = router;