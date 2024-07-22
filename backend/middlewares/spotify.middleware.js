const getToken = async (req, res, next) => {
    try {

        const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
        const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        });
        const token = await response.json();
        req.access_token = token.access_token;
        console.log("token in spotify middleware: ", token);
        next();

    } catch (err) {
        console.log('Error catched in spotify middleware getToken');
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error....', err });
    }
}

module.exports = { getToken };