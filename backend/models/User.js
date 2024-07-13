const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
    },
    Address: {
        type: String,
    },
    Admin: {
        type: Boolean,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);