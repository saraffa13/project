const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now, 
  },
  quantity: {
    type: Number,
    required: true, 
  },
});



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
    },
    priceOff:{
        type:Number,
        min:0,
    },
    quantity_sold:{
        type:Number
    },
    sales:[salesSchema]
}, { timestamps: true, versionKey: false });


const medicineModel = mongoose.model('Medicine', medicineSchema)

module.exports = medicineModel;