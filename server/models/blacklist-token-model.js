const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });


const blackListTokenModel = mongoose.model('BlackListToken', blackListTokenSchema)

module.exports = blackListTokenModel;