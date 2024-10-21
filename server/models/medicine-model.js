const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    composition: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },    
    exp_date: {
        type: Number,
        required: true
    },
    inventory_quantity:{
        type:Number,
        required:true
    }
}, { timestamps: true, versionKey: false });


const medicineModel = mongoose.model('Medicine', medicineSchema)

module.exports = medicineModel;