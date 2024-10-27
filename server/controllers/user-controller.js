const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const userModel = require("../models/user-model");
const blackListTokenModel = require('../models/blacklist-token-model');
const cartModel = require('../models/cart-model');
const orderModel = require('../models/orders-model');

const crypto = require("crypto");

const { sendConfirmationMail, sendFinalMail, sendForgotPasswordMail, sendChangePasswordMail, sendGeneralMail } = require('../utils/nodemailer');
const notificationModel = require('../models/notification-model');

module.exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phoneNumber, role, gender } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser && existingUser.isActive === true) {
            return res.status(409).json({ message: "This email has already been used! Use another email." });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const confirmationToken = crypto.randomBytes(20).toString("hex");

        let newUser;

        if (existingUser) {
            newUser = existingUser;
            existingUser.password = hashedPassword;
            existingUser.confirmationToken = confirmationToken;
        } else {
            const newCart = new cartModel({
                cartItems: [],
                totalPrice: 0
            });
            await newCart.save();

            newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                role,
                gender,
                cart: newCart,
                orders: [],
                isActive: false,
                confirmationToken,
            });

        }


        await newUser.save();

        await sendConfirmationMail(confirmationToken, email);

        res.status(201).json({
            message: "User registered successfully! Please check your email to confirm your account.",
        });

    } catch (error) {
        console.error("Couldn't register the user:", error);
        res.status(500).json({
            message: "Couldn't register the user",
            error: error.message,
        });
    }
};

module.exports.confirmEmail = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { token } = req.params;

    try {

        const user = await userModel.findOne({ confirmationToken: token });
        if (!user) {
            return res.status(400).send({ message: "Invalid or expired confirmation token." });
        }
        
        const notification = new notificationModel({
            message: user.role === 'admin'? `A new ${user.role} user ${user.name} Signed Up. Click <a href="http://localhost:5173/admin">here</a> to cofirm his account.`:`A new user ${user.name} Signed Up`,
            role:user.role,
            createdAt:Date.now(),
            read:false
        })

        
        user.confirmationToken = undefined;
        if (user.role === 'user') {
            user.isActive = true;
            await user.save();
            await notification.save();
            await sendGeneralMail(notification.message, 'ssaraffa786@gmail.com', "User Account Creation")
            res.status(200).send({ message: "Account confirmed successfully. You can now log in." });
        }else {
            user.confirmationToken = undefined;
            await user.save();
            await notification.save();
            await sendGeneralMail(notification.message, 'ssaraffa786@gmail.com', "User Account Creation")
            res.status(200).send({ message: "Account confirmed successfully. Wait for the Admin Approval" });
        }


    } catch (error) {
        console.error("Couldn't register the user:", error);
        res.status(500).json({
            message: "Couldn't register the user",
            error: error.message,
        });
    }

};



module.exports.loginUser = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found! Need to register" })
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (matchPassword) {
            const token = await jwt.sign({
                _id: existingUser._id,
                role: existingUser.role,
                user: existingUser,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

            return res.status(200).json({
                message: "Login in Successful!",
                data: existingUser
            })

        } else {
            throw new Error("Wrong credentials!")
        }

    } catch (error) {
        console.error('Couldn\'t login the user :', error);
        res.status(500).json({
            message: 'Couldn\'t login! Something went wrong!',
            error: error.message
        });
    }

}


module.exports.logoutUser = async (req, res) => {

    const token = req.cookies.token;
    const blacklistedToken = new blackListTokenModel({ token });
    await blacklistedToken.save();
    res.clearCookie('token')
    res.send('Logout Successful');

}

module.exports.handleActivation = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, activate } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        } else {
            if (activate) {
                user.isActive = true;
                await sendFinalMail(user.email);
            } else {
                user.blacklisted = true;
            }
            await user.save();
        }

        return res.status(200).json({
            message: "Operation Successful!",
            data: user
        })

    } catch (error) {
        console.log('Something went wrong', error);
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });

    }


}

module.exports.forgotPassword = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        } else {
            const confirmationToken = crypto.randomBytes(20).toString("hex");
            user.confirmationToken = confirmationToken
            await user.save();
            await sendForgotPasswordMail(confirmationToken, email);
        }

        return res.status(200).json({
            message: "Operation Successful!",
            data: user
        })

    } catch (error) {
        console.log('Something went wrong', error);
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });

    }


}

module.exports.changePassword = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword, confirmationToken } = req.body;

    try {
        const user = await userModel.findOne({confirmationToken});
        if (!user ) {
            console.log('shiva');
            return res.status(404).json({ message: "User not found!" })
        } else if(user.confirmationToken !== confirmationToken) {
            console.log('shivam');
            return res.status(404).json({ message: "Invalid Token!" })
            
        }else{
            console.log('shivamm');
            user.confirmationToken = undefined;
            const hashedPassword = await bcrypt.hash(newPassword, 5);
            user.password = hashedPassword;
            await user.save();
            await sendChangePasswordMail(user.email);
        }

        return res.status(200).json({
            message: "Operation Successful!",
            data: user
        })

    } catch (error) {
        console.log('Something went wrong', error);
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });

    }


}

module.exports.removeFromBlackList = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        } else {
            user.blacklisted = false;
            await user.save();
        }

        return res.status(200).json({
            message: "Operation Successful!",
            data: user
        })

    } catch (error) {
        console.log('Something went wrong', error);
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });

    }
}

module.exports.blacklistUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        } else {
            user.blacklisted = true;
            await user.save();
        }

        return res.status(200).json({
            message: "Operation Successful!",
            data: user
        })

    } catch (error) {
        console.log('Something went wrong', error);
        res.status(500).json({
            message: 'Something went wrong!',
            error: error.message
        });

    }
}

module.exports.getUser = async (req, res) => {

    const user = req.user;
    try {

        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        return res.status(200).json({
            message: "User!",
            data: user
        })

    }
    catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).json({
            message: 'Couldn\'t login! Something went wrong!',
            error: error.message
        });
    }

}

module.exports.getAllUsers = async (req, res) => {

    const user = req.user;
    const role = user.role;

    try {

        if (!user) {
            return res.status(404).json({ message: "Unauthorised Access!" })
        }

        if (user.role === 'user') {
            return res.status(200).json({
                message: "Here are the list of Users!",
                data: []
            })
        } else if (role === 'admin') {
            const user = await userModel.find({ role: 'user' });
            return res.status(200).json({
                message: "Here are the list of Users!",
                data: user
            })
        } else if (role === 'superAdmin') {
            const user = await userModel.find({ role: { $in: ['admin', 'user'] } });

            return res.status(200).json({
                message: "Here are the list of Users!",
                data: user
            })
        }


    }

    catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).json({
            message: 'Couldn\'t login! Something went wrong!',
            error: error.message
        });
    }

}

module.exports.getNotification = async (req, res) => {

    const user = req.user;
    const role = user.role;

    try {

        if (!user) {
            return res.status(404).json({ message: "Unauthorised Access!" })
        }

        if (user.role === 'user') {
            return res.status(200).json({
                message: "Here are the list of Users!",
                data: []
            })
        } else if (role === 'admin') {
            const notifications = await notificationModel.find({ role: 'user' });
            return res.status(200).json({
                message: "Here are the list of Users!",
                data: notifications
            })
        } else if (role === 'superAdmin') {
            const notifications = await notificationModel.find({ role: { $in: ['admin', 'user'] } });

            return res.status(200).json({
                message: "Here are the list of Users!",
                data: notifications
            })
        }


    }
    catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).json({
            message: 'Couldn\'t login! Something went wrong!',
            error: error.message
        });
    }

}

module.exports.markNotificationAsRead = async (req, res) => {

    const user = req.user;
    const role = user.role;
    const {notificationId} = req.body

    try {

        if (!user) {
            return res.status(404).json({ message: "Unauthorised Access!" })
        }

        if (role === 'superAdmin') {
            const notification = await notificationModel.findById(notificationId);
            notification.read=true;
            await notification.save();

            return res.status(200).json({
                message: "Operation Successful!",
                data: notification
            })
            
        }else{
            return res.status(401).json({
                message: "Operation Not Allowed!",
            })
        }


    }
    catch (error) {
        console.error('Something went wrong:', error);
        res.status(500).json({
            message: 'Couldn\'t login! Something went wrong!',
            error: error.message
        });
    }

}


module.exports.deleteUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.body;

    try {

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            })
        }

        res.status(200).json({
            message: "User Deleted",
            data: user
        })

    } catch (error) {
        console.log("Something went wrong!", error);
        res.status(500).json({
            message: "User Couldn\'t be deleted. Something went wrong!",
        })
    }

}
