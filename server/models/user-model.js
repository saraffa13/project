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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }
}, { versionKey: false, timeStamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;