const dotenv = require('dotenv');
const querystring = require('querystring');
const User = require('../models/User');

dotenv.config();
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
var FRONTEND_URL = process.env.LOCAL_FRONTEND;
if (process.env.IS_DEPLOYED === 'true') {
    FRONTEND_URL = process.env.DEPLOYED_FRONTEND;
}

const addPlaylist = async (req, res) => {
    console.log('in adding playlist spotify controller...');

    try {
        const access_token = req.access_token
        if (!access_token) {
            console.log('access token for spotify is not found in add PLaylist in spotify controller')
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return;
        }

        console.log(access_token);
        const spotifyUrl = process.env.SPOTIFY_URL;
        const userId = "31vpuanulujxfl7mwr3tvcy7cvcu";

        const response = await fetch(`${spotifyUrl}/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify({
                "name": "New Playlist",
                "description": "New playlist description",
                "public": false
            })
        })
        const data = await response.json();
        console.log(response);

        res.status(200).json({ success: true, message: "response from add playlists in spotify", response: data });

    } catch (err) {
        console.log('Error catched in addPlaylist in spotify controller');
        res.status(500).json({ message: "Internal Server Error...." });
    }
}

const fetchAccessToken = async (req, res) => {
    console.log('Inside fetchAccessToken after getting Authentication Token from Spoify user');
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "Invalid Action" });
        }
        var code = req.query.code || null;
        var state = req.query.state || null;
        console.log('code: ', code);
        console.log('state: ', state);
        if (state == null) {
            throw new Error("State not found");
        } else {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                },
                body: new URLSearchParams(
                    {
                        code: code,
                        redirect_uri: 'http://localhost:5173/spotifyCallback',
                        grant_type: 'authorization_code',
                        client_id: CLIENT_ID,
                        client_secret: CLIENT_SECRET
                    }),
            })
            console.log('Request for access token sent');
            const data = await response.json();
            console.log('access token request response: ', data)
            if (!data.access_token) {
                return res.status(400).json({ success: false, message: "Internal Server Error!!! " });
            }
            const {
                access_token,
                token_type,
                scope,
                expires_in,
                refresh_token
            } = data;
            await User.updateOne({ _id: userId }, {
                Spotify: {
                    access_token,
                    token_type,
                    scope,
                    expires_in,
                    refresh_token
                }
            })
            const user = await User.findOne({ _id: userId });
            console.log("user's spotify details updated successfully: ", user);
            // res.redirect(`${FRONTEND_URL}/spotifySuccess`);
            res.status(200).json({ message: 'access_token is fetched successfully', success: true });
        }
    } catch (err) {
        console.log('Error catched in fetchAccessToken in spotify controller');
        res.status(500).json({ message: "Internal Server Error...." });
    }
}

module.exports = { addPlaylist, fetchAccessToken };