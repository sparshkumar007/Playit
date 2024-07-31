const dotenv = require('dotenv');
const { MD5 } = require('crypto-js');
const User = require('../models/User');

dotenv.config();
const API_KEY = process.env.LASTFM_API_KEY;
const MY_SECRET = process.env.LASTFM_SECRET;
const LASTFM_URL = process.env.LASTFM_URL;


const fetchSessionToken = async (req, res) => {
    console.log('Inside fetchSession after getting Authentication Token from lastfm user');
    try {
        const userId = req.userId;
        if (!userId) {
            throw new Error("UserId not found after middleware");
        }
        const { token } = req.headers;
        console.log('token: ', token);
        if (!token) {
            throw new Error("Token not found in headers")
        }
        let api_sig = MD5(`api_key${API_KEY}methodauth.getSessiontoken${token}${MY_SECRET}`).toString();
        console.log('api_sig: ', api_sig);
        const url = `${LASTFM_URL}/2.0/?method=auth.getSession&token=${token}&api_key=${API_KEY}&api_sig=${api_sig}&format=json`;
        console.log('url: ', url);
        let response = await fetch(url, {
            method: 'GET'
        })
        response = await response.json();

        console.log('response from lastfm session token request: ', response);
        if (!response.session) {
            return res.status(400).json({ message: "Authentication Failed" });
        }

        // Adding this session token to user data 
        console.log('response: ', response);
        const session_token = response?.session?.key;
        const user_name = response?.session?.name;
        console.log('session_token: ', session_token);

        await User.updateOne({ _id: userId }, {
            Lastfm: {
                session_token,
                user_name
            }
        })

        const user = await User.findOne({ _id: userId });
        console.log('Updates User: ', user);

        res.status(200).json({ message: "Authentication successful" })
    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



const fetchUser = async (req, res) => {
    try {
        const userId = req.userId;
        console.log('userId: ', userId);
        if (!userId) {
            throw new Error("UserId not found after middleware");
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error("User not found with provided id");
        }

        const session_token = user.Lastfm?.session_token;
        const user_name = user.Lastfm?.user_name;
        if (!session_token || !user_name) {
            throw new Error("Session token or user_name not found in database");
        }


        let response = await fetch(`${LASTFM_URL}/2.0/?method=user.getinfo&user=${user_name}&api_key=${API_KEY}&format=json`)
        response = await response.json();
        // console.log('response from fetch user api: ', response);
        if (!response.user) {
            throw new Error("User not fetched by lastfm api");
        }

        const name = response.user.realname;
        const age = response.user.age;
        const url = response.user.url;
        const data = { user_name, name, age, url };
        console.log('data to return: ', data);

        return res.status(200).json({ message: "User details fetched successfully", success: true, data });
    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



/////////////////////// current
const fetchPlaylists = async (req, res) => {
    try {
        const userId = req.userId;
        console.log('userId: ', userId);
        if (!userId) {
            throw new Error("UserId not found after middleware");
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error("User not found with provided id");
        }

        const session_token = user.Lastfm?.session_token;
        const user_name = user.Lastfm?.user_name;
        if (!session_token || !user_name) {
            throw new Error("Session token or user_name not found in database");
        }

        let response = await fetch(`${LASTFM_URL}/2.0/?method=user.getlovedtracks&user=${user_name}&api_key=${API_KEY}&format=json`)
        response = await response.json();
        console.log('response from fetch loved tracks api: ', response);

        return res.status(200).json({ message: "User details fetched successfully", success: true });

    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
/////////////////////////////




const fetchSongs = async (req, res) => {
    try {

    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
const addPlaylist = async (req, res) => {
    try {

    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
const addSongs = async (req, res) => {
    try {

    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}
module.exports = { fetchSessionToken, fetchUser, fetchPlaylists, fetchSongs, addPlaylist, addSongs }