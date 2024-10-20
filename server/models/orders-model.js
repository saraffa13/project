const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:String,
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    address:{
        type:String,
    },
    deliveryDate : {
        type:String
    },
    paymentMethod:{
        type:String
    },
    status:{
        type:String
    }
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;