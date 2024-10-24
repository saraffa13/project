const cartModel = require("../models/cart-model");
const medicineModel = require("../models/medicine-model");
const orderModel = require("../models/orders-model");
const userModel = require("../models/user-model");

const getOrders = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' });
    }

    if(user.role === 'admin'){
        try {
            let orderData = await orderModel
                .find()
                .populate('orders')
    
            res.status(200).json({
                message: "Order data successfully retrieved",
                data: orderData
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Something went wrong!"
            });
        }
    }else{
        try {
            let orderData = await orderModel
                .find({ _id: { $in: user.orders } })
                .populate('orders')
    
            res.status(200).json({
                message: "Order data successfully retrieved",
                data: orderData
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Something went wrong!"
            });
        }
    }

    
};


const postOrders = async (req, res) => {

    const user = req.user;
    const { name, email, phone, address, paymentMethod, deliveryDate } = req.body;

    if (!user) {
        return res.status(401).json({ message: 'You must be logged in to view your cart' })
    }

    try {

        let cartData = await cartModel.findById(user.cart);

        if (!cartData) {
            res.status(501).json({
                message: "There are no items in the cart!",
            })
        }

       cartData.cartItems.map(async (item)=>{
        let medicine = await medicineModel.findById(item.item._id);
        medicine.inventory_quantity -=  item.quantity;
        medicine.quantity_sold += item.quantity;
        medicine.sales = [...medicine.sales,{date:Date.now(),quantity:item.quantity}];
        await medicine.save();
       })

        const newOrder = new orderModel({
            user:user._id,
            name,
            email,
            phone,
            address,
            paymentMethod,
            orders: user.cart,
            deliveryDate,
            status: "pending",
            totalPrice:user.cart.totalPrice
        })

        const order = await newOrder.save();

        const newCart = new cartModel({
            cartItems: [],
            totalPrice: 0
        });

        const cartCreated = await newCart.save();

        const retrivedUser = await userModel.findById(user._id);
        retrivedUser.cart = cartCreated._id;
        retrivedUser.orders = [...retrivedUser.orders, order._id];
        await retrivedUser.save();


        res.status(200).json({
            message: "Order Data successfully retrived",
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