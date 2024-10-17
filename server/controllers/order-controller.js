const cartModel = require("../models/cart-model");
const orderModel = require("../models/orders-model");

const getOrders = async (req, res) => {

    const user = req.user;
    const orders = user.orders;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {
        let orderData = await orderModel.find().populate('orders').populate('name');

        console.log(orderData);

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
    const orders = user.orders;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {
        let cartData = await cartModel.find();

        if(cartData){

        }

        console.log(orderData);

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



module.exports = {
    getOrders,
    postOrders,
}