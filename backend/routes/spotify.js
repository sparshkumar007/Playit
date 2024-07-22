const express = require('express');
const { addPlaylist, fetchAccessToken, spotifyUserDetails, fetchPlaylists, fetchSongs } = require('../controllers/spotify.controller');
const { verifyAuthToken } = require('../middlewares/auth.middleware');
const { validateAccess } = require('../middlewares/spotify.middleware');

const router = express.Router();

router.post('/addPlaylist', validateAccess, addPlaylist);
router.get('/fetchAccessToken', verifyAuthToken, fetchAccessToken);
router.get('/profile', verifyAuthToken, validateAccess, spotifyUserDetails);
router.get('/fetchPlaylists', verifyAuthToken, validateAccess, fetchPlaylists);
router.get('/fetchSongs/:playlist_id', verifyAuthToken, validateAccess, fetchSongs);
module.exports = router;