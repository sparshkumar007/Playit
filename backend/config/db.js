const mongoose = require("mongoose");
require('dotenv').config();
const connectToMongo = () => {
    const mongoURI = process.env.MONGO_URI;
    // const mongoURI=process.env['COMPASS_URI'];
    // console.log("Listening");
    mongoose.connect(mongoURI).then(() => {
        console.log("connected to Mongo successfully")
    }).catch((err) => {
        console.log(err);
    })
};

module.exports = connectToMongo;