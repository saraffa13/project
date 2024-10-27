const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmationToken: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    blacklisted:{
        type:Boolean,
        default:false,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['superAdmin','admin', 'user'],
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
    
}, { versionKey: false, timeStamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;