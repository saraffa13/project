const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser } = require('../controllers/user-controller');
const { adminAuth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);

userRouter.post('/delete', adminAuth, deleteUser);

module.exports = userRouter;