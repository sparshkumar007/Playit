const User = require("../models/User");
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const validateAccess = async (req, res, next) => {
    console.log('entered in validateAccess middleware')
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "Invalid Action", success: false });
        }
        const user = await User.findOne({ _id: userId });
        const userSpotify = user.Spotify;
        if (!userSpotify || !userSpotify.access_token || !userSpotify.refresh_token) {
            return res.status(400).json({ message: "User's spotify account is not validated", success: false });
        }
        console.log(userSpotify)
        const access_token = userSpotify['access_token'];
        const refresh_token = userSpotify.refresh_token;
        const expires_in = userSpotify.expires_in;
        const created_at = userSpotify.created_at;
        console.log('access_token: ', access_token);
        console.log('resfresh_token: ', refresh_token);
        console.log('expires_in: ', expires_in)
        console.log('created_at: ', created_at)

        if (expires_in && created_at && expires_in > (Date.now() - created_at) / 1000) {
            req.access_token = access_token;
            console.log('spotify validateAccessToken is passed')
            next();
        } else {
            const url = "https://accounts.spotify.com/api/token";

            const payload = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token,
                    client_id: CLIENT_ID
                }),
            }
            const body = await fetch(url, payload);
            const response = await body.json();
            console.log('response from refresh token: ', response);
            if (!response || !response.access_token) {
                return res.status(400).json({ message: "User's spotify account is not validated", success: false })
            }
            await User.updateOne({ _id: user.id }, {
                $set: {
                    "Spotify.access_token": response.access_token,
                    "Spotify.refresh_token": response.refresh_token,
                    "Spotify.expires_in": response.expires_in,
                    "Spotify.created_at": response.Date.now(),
                    "Spotify.scope": response.scope,
                }
            });
            user.access_token = response.access_token;
            console.log('spotify validateAccessToken is passed')
            next();
        }
    } catch (err) {
        console.log("Error while fetching access token in validateAccess: ", err);
        return res.status(500).json({ message: "Invalid server error!!!", success: false });
    }
}

module.exports = { validateAccess }