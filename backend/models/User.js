const mongoose = require('mongoose');
const { Schema } = mongoose;

const spotify = new Schema({
    access_token: {
        type: String,
        required: true
    },
    token_type: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    expires_in: {
        type: Number,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    profile: {
        type: Object,
        default: {}
    }
})

const lastfm = new Schema({
    session_token: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    profile: {
        type: Object,
        default: {}
    }
})

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
    },
    Spotify: {
        type: spotify,
    },
    Lastfm: {
        type: lastfm
    }
});

module.exports = mongoose.model('User', UserSchema);