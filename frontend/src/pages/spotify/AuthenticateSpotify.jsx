import React from 'react'
import querystring from 'querystring';

const AuthenticateSpotify = () => {
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    const handleClick = async () => {
        const authToken = localStorage.getItem('authToken');
        const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const targetUrl = 'https://accounts.spotify.com/authorize';
        const state = generateRandomString(16);
        const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';
        // const redirectUri = `http://localhost:4000/api/spotify/fetchAccessToken`;
        const redirectUri = `http://localhost:5173/spotifyCallback`;

        const queryParams = querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: redirectUri,
            state: state
        });

        // Construct the full URL
        const AuthUrl = `${targetUrl}?${queryParams}`;

        window.location.href = AuthUrl;
    }
    return (
        <div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Autenticate</button>
        </div>
    )
}

export default AuthenticateSpotify