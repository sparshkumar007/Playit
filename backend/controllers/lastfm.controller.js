const dotenv = require('dotenv');
const { MD5 } = require('crypto-js')

dotenv.config();
const API_KEY = process.env.LASTFM_API_KEY;
const MY_SECRET = process.env.LASTFM_SECRET;
const fetchSessionToken = async (req, res) => {
    console.log('Inside fetchSession after getting Authentication Token from lastfm user');
    try {
        const { token } = req.headers;
        console.log('token: ', token);
        if (!token) {
            throw new Error("Token not found in headers")
        }
        let api_sig = MD5(`api_key${API_KEY}methodauth.getSessiontoken${token}${MY_SECRET}`).toString();
        console.log('api_sig: ', api_sig);
        const url = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${API_KEY}&api_sig=${api_sig}&format=json`;
        console.log('url: ', url);
        let response = await fetch(url, {
            method: 'GET'
        })
        response = await response.json();

        res.status(200).json({ message: "Successful" })
    } catch (error) {
        console.log('error caught in fetchSessionToken in lastfm controller: ', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { fetchSessionToken }