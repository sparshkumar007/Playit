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
                    refresh_token,
                    created_at: Date.now()
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

const spotifyUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const access_token = req.access_token;
        if (!userId || !access_token) {
            console.log("userid or accesstoken not found in spotifyUserDetails");
            return res.status(400).json({ message: "Invalid Action", success: false });
        }

        const result = await fetch(`${process.env.SPOTIFY_URL}/me`, {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        });
        const profile = await result.json();
        console.log(profile);
        const res1 = await User.updateOne({ _id: userId }, {
            $set: {
                'Spotify.profile': profile
            }
        })
        console.log(res1)
        res.status(200).json({ message: "Profile is fetched successfully", success: true, profile })
    } catch (error) {
        console.log('Error catched in spotifyUserDetails in spotify controller: ', error);
        res.status(500).json({ message: "Internal Server Error...." });
    }
}

const fetchPlaylists = async (req, res) => {
    try {
        const userId = req.userId;
        const access_token = req.access_token;
        if (!userId || !access_token) {
            console.log("userid or accesstoken not found in spotifyUserDetails");
            return res.status(400).json({ message: "Invalid Action", success: false });
        }
        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new Error("couldn't find user in database")
        }
        const user_id = user.Spotify.profile.id;
        let response = await fetch(`${process.env.SPOTIFY_URL}/users/${user_id}/playlists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        response = await response.json();
        const playlists = response.items;
        // console.log('user playlists: ', playlists);

        // return only id and names of playlisst to frontend
        const data = [];
        playlists.forEach((item) => {
            data.push({ id: item.id, name: item.name, tracks: item.tracks.total })
        })
        res.status(200).json({ message: "Playlists fetched successfully", success: true, data })
    } catch (error) {
        console.log('Error catched in fetchPlaylists in spotify controller: ', error);
        return res.status(500).json({ message: "Internal Server Error...." });
    }
}

const fetchSongs = async (req, res) => {
    try {
        const userId = req.userId;
        const access_token = req.access_token;
        const { playlist_id } = req.params;
        if (!userId || !access_token) {
            console.log("userid or accesstoken not found in spotifyUserDetails");
            return res.status(400).json({ message: "Invalid Action", success: false });
        }
        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new Error("couldn't find user in database")
        }
        let response = await fetch(`${process.env.SPOTIFY_URL}/playlists/${playlist_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        response = await response.json();
        const songs = response.tracks.items;
        // console.log('songs: ',songs);

        // return only id, name, artists and duration of songs to frontend
        const data = [];
        songs.forEach((item) => {
            const artists = [];
            item.track.artists.forEach((artist) => {
                artists.push({ id: artist.id, name: artist.name })
            })
            data.push({ id: item.track.id, name: item.track.name, artists: artists, duration: item.track.duration_ms / 1000, uri: item.track.uri })
        })
        res.status(200).json({ message: "Songs successfully fetched!!", success: true, data });
    } catch (error) {
        console.log('Error catched in fetchSongs in spotify controller: ', error);
        return res.status(500).json({ message: "Internal Server Error...." });
    }
}


const addPlaylist = async (req, res) => {
    console.log('in adding playlist spotify controller...');

    try {
        const userId = req.userId;
        const access_token = req.access_token;
        const { playlist_name, playlist_description } = req.body;
        if (!userId || !access_token) {
            console.log("userid or accesstoken not found in spotifyUserDetails");
            return res.status(400).json({ message: "Invalid Action", success: false });
        }
        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new Error("couldn't find user in database")
        }
        if (!playlist_name || !playlist_description) {
            console.log("playlist name or description not found in spotifyUserDetails");
            return res.status(400).json({ message: "name and description is needed", success: false });
        }
        const user_id = user.Spotify.profile.id;
        let response = await fetch(`${process.env.SPOTIFY_URL}/users/${user_id}/playlists`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                "name": playlist_name,
                "description": playlist_description,
                "public": false
            })
        })
        response = await response.json();
        console.log(response);
        res.status(200).send({ message: "An empty playlist is created succesfully", success: true })
    } catch (err) {
        console.log('Error catched in addPlaylist in spotify controller');
        res.status(500).json({ message: "Internal Server Error...." });
    }
}

const addSong = async (req, res) => {
    try {
        const userId = req.userId;
        const access_token = req.access_token;
        const { playlist_id } = req.params;
        const { song_uris } = req.body;


        if (!userId || !access_token) {
            console.log("userid or accesstoken not found in spotifyUserDetails");
            return res.status(400).json({ message: "Invalid Action", success: false });
        }

        const user = await User.findOne({ _id: userId })
        if (!user) {
            throw new Error("couldn't find user in database")
        }


        if (!playlist_id || !song_uris) {
            console.log("song uri or playlists id not found in spotifyUserDetails");
            return res.status(400).json({ message: "name and description is needed", success: false });
        }


        let response = await fetch(`${process.env.SPOTIFY_URL}/playlists/${playlist_id}/tracks`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                "uris": song_uris,
                "position": 0
            })
        })
        response = await response.json();
        console.log(response);
        res.status(200).send({ message: "Provided songs added succesfully", success: true })
    } catch (error) {
        console.log('Error catched in addSong in spotify controller: ', error);
        res.status(500).json({ message: "Internal Server Error...." });
    }
}
module.exports = { addPlaylist, fetchAccessToken, spotifyUserDetails, fetchPlaylists, fetchSongs, addSong };