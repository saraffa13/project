const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orders:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    address:{
        type:String,
    },
    deliveryDate : {
        type:Number
    }
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;