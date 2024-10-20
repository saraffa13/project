const express = require('express');
const { registerUser, loginUser, logoutUser, deleteUser, getUser, getAllUsers } = require('../controllers/user-controller');
const { adminAuth, auth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/get-user', auth, getUser);

userRouter.get('/get-all-users', auth, getAllUsers);

userRouter.post('/login', loginUser);

userRouter.get('/logout', logoutUser);

userRouter.post('/delete', adminAuth, deleteUser);

module.exports = userRouter;