const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser, getUser, getAllUsers, confirmEmail, handleActivation, removeFromBlackList, blacklistUser, forgotPassword, changePassword, getNotification, markNotificationAsRead } = require('../controllers/user-controller');
const { adminAuth, auth, isActive } = require('../middlewares/auth');
const { check } = require('express-validator');

const userRouter = express.Router();

userRouter.get('/logout', logoutUser);
userRouter.get('/confirm-email/:token', confirmEmail);
userRouter.get('/get-user', auth, getUser);
userRouter.get('/get-all-users', auth, getAllUsers);
userRouter.get('/notification', auth, getNotification);


userRouter.post('/register', [
    check('name')
        .notEmpty().withMessage("Name is required!")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name should contain only alphabetic characters and spaces!"),

    check('email')
        .isEmail().withMessage("Please enter a valid email!"),

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


userRouter.post('/forgot-password/', [
    check('email')
        .isEmail().withMessage('Please enter a valid email!')
], forgotPassword);


userRouter.post('/change-password/', [
    check('newPassword')
        .notEmpty().withMessage("Password is required!")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check('confirmationToken')
        .notEmpty().withMessage("Token is required!")
        .isLength({ min: 40, max: 40 }).withMessage("Token must be 40 characters long")
        .matches(/^[a-f0-9]+$/i).withMessage("Token must be a hexadecimal string generated from crypto.randomBytes"),
], changePassword);


userRouter.post('/notification/markAsRead', auth, markNotificationAsRead);


userRouter.post(
    '/login',
    [
        isActive,
        check('email')
            .isEmail().withMessage('Please enter a valid email!'),
        check('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    loginUser
);


userRouter.post(
    '/handleActivation',
    [
        adminAuth,
        check('userId').notEmpty().withMessage("User Id can't be empty")
            .isMongoId().withMessage('Invalid User ID format'),
        check('activate').notEmpty().withMessage("User Id can't be empty")
            .isIn([true, false]).withMessage('Value can either be true or false!')
    ],
    handleActivation
);


userRouter.post(
    '/remove-from-blacklist',
    [
        check('userId').notEmpty().withMessage("User Id can't be empty")
            .isMongoId().withMessage('Invalid User ID format')
    ],
    removeFromBlackList
);


userRouter.post(
    '/blacklistUser',
    [
        check('userId').notEmpty().withMessage("User Id can't be empty")
            .isMongoId().withMessage('Invalid User ID format')
    ],
    blacklistUser
);


userRouter.post('/delete', [
    adminAuth,
    check('userId').notEmpty().withMessage("User Id can't be empty")
        .isMongoId().withMessage('Invalid User ID format')
], deleteUser);

module.exports = userRouter;