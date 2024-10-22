const mongoose = require('mongoose')

const translationValueSchema = new mongoose.Schema({
    hindi: {
        type: String,
        required: true
    },
    english: {
        type: String,
        required: true
    }
}, { _id: false }); 

const translationSchema = new mongoose.Schema({
    translations: {
        
    }
}, { timestamps:false, versionKey:false });


const translationModel = mongoose.model('Translation', translationSchema);

module.exports = translationModel;