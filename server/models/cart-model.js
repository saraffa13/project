const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true, 
        unique:true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 
    }
});

const cartSchema = new mongoose.Schema({
    cartItems: [cartItemSchema],
    totalPrice : {
        type: Number,
        required:true
    },
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;