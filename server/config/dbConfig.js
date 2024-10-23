const mongoose = require("mongoose")

const connectToDb = (url) => {
    mongoose.connect(url);
}

module.exports = connectToDb;