const cartModel = require("../models/cart-model");
const orderModel = require("../models/orders-model");
const userModel = require("../models/user-model");

const getOrders = async (req, res) => {

    const user = req.user;
    const orders = user.orders;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {
        let orderData = await orderModel.find().populate('orders').populate('name');

        res.status(200).json({
            message: "Order Data successfully retrived",
            data: orderData
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

const postOrders = async (req, res) => {

    const user = req.user;
    const { name, address, deliveryDate } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {
        let cartData = await cartModel.find();

        if(!cartData){
            res.status(501).json({
                message: "There are no items in the cart!",
                data: orderData
            })
        }

        const newOrder = new orderModel({
            name,
            address,
            orders:user.cart,
            deliveryDate:Date.now()
        })

        const order = await newOrder.save();

        const newCart = new cartModel({
            cartItems:[],
            totalPrice:0
        });

        const cartCreated = await newCart.save();

        const retrivedUser = await userModel.findById(user._id);
        console.log(user, retrivedUser);
        retrivedUser.cart = cartCreated._id;
        retrivedUser.orders = [...retrivedUser.orders, order._id];
        await retrivedUser.save();


        res.status(200).json({
            message: "Order Data successfully retrived",
            // data: orderData
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}




module.exports = {
    getOrders,
    postOrders,
}