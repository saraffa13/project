const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser, getUser, getAllUsers } = require('../controllers/user-controller');
const { adminAuth, auth } = require('../middlewares/auth');
const { check } = require('express-validator');

const userRouter = express.Router();

userRouter.post('/register', [
    check('name').notEmpty().withMessage("Name is Required!"),

    check('email').isEmail().withMessage("Please enter a valid email!"),

    check('password')
        .notEmpty().withMessage("Password is required!")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    check('phoneNumber')
        .notEmpty().withMessage("Phone number is required!")
        .isNumeric().withMessage("Phone number should contain only numbers!")
        .isLength({ min: 10, max: 15 }).withMessage("Phone number should be between 10 to 15 digits!"),

    check('role')
        .notEmpty().withMessage("Role is required!")
        .isIn(['admin', 'user']).withMessage("Role must be one of the following: admin, user"),

    check('gender')
        .notEmpty().withMessage("Gender is required!")
        .isIn(['male', 'female']).withMessage("Gender must be one of: male, female"),

], registerUser);

userRouter.get('/get-user', auth, getUser);

userRouter.get('/get-all-users', auth, getAllUsers);

userRouter.post(
    '/login',
    [
        check('email')
            .isEmail().withMessage('Please enter a valid email!'),
            
        check('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    loginUser
);

userRouter.get('/logout', logoutUser);

userRouter.post('/delete', [
    adminAuth,
    check('userId').notEmpty().withMessage("User Id can't be empty")
        .isMongoId().withMessage('Invalid User ID format')
], deleteUser);

module.exports = userRouter;