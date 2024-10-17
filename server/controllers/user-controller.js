const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userModel = require("../models/user-model");
const blackListTokenModel = require('../models/blacklist-token-model');
const cartModel = require('../models/cart-model');


module.exports.registerUser = async (req, res) => {

    const { name, email, password, phoneNumber, role, gender } = req.body;

    try {

        const existingUser = await userModel.find({ email })[0];
        if (existingUser) {
            return res.status(401).json({ message: 'User already registered' })
        }

        const hashedPassword = await bcrypt.hash(password, 5)

        const newCart = new cartModel({
            cartItems:[],
            totalPrice:0
        });

        await newCart.save();

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            gender,
            cart:newCart
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully!'
        })

    } catch (error) {
        console.error('Couldn\'t register the user :', error);
        res.status(500).json({
            message: 'Couldn\'t register the user',
            error: error.message
        });
    }

}

module.exports.loginUser = async (req, res) => {

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
                user:existingUser,
            }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

            res.cookie('token', token, {httpOnly:true, maxAge:24*60*60*1000})

            return res.status(200).json({
                message:"Login in Successful!",
                data:existingUser
            })

        }else {
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

    const token =  req.cookies.token;
    const blacklistedToken = new blackListTokenModel({ token });
    await blacklistedToken.save();
    res.clearCookie('token')
    res.send('Logout Successful');

} 


module.exports.deleteUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await userModel.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({
                message:"User Not Found",
            })
        }
        
        await cartModel.findByIdAndDelete(user.cart)

        res.status(200).json({
            message:"User Deleted",
            data:user
        })
    }catch(error){
        res.status(500).json({
            message:"User Couldn\'t be deleted. Something went wrong!",
        })
    }
} 

