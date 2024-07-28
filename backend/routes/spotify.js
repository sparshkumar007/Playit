const express = require('express');
const { addPlaylist, fetchAccessToken, spotifyUserDetails, fetchPlaylists, fetchSongs, addSong, fetchSong } = require('../controllers/spotify.controller');
const { verifyAuthToken } = require('../middlewares/auth.middleware');
const { validateAccess } = require('../middlewares/spotify.middleware');

const router = express.Router();

router.get('/fetchAccessToken', verifyAuthToken, fetchAccessToken);
router.get('/profile', verifyAuthToken, validateAccess, spotifyUserDetails);
router.get('/fetchPlaylists', verifyAuthToken, validateAccess, fetchPlaylists);
router.get('/fetchSongs/:playlist_id', verifyAuthToken, validateAccess, fetchSongs);
router.post('/addPlaylist', verifyAuthToken, validateAccess, addPlaylist);
router.post('/addSongs/:playlist_id', verifyAuthToken, validateAccess, addSong);
router.get('/fetchSong/:song_id', verifyAuthToken, validateAccess, fetchSong);
module.exports = router;