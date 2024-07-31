const express = require('express');
const { addPlaylist, fetchAccessToken, spotifyUserDetails, fetchPlaylists, fetchSongs, addSong, fetchSong } = require('../controllers/spotify.controller');
const { verifyAuthToken } = require('../middlewares/auth.middleware');
const { validateAccess } = require('../middlewares/spotify.middleware');

const router = express.Router();

router.get('/fetchAccessToken', fetchAccessToken);
router.get('/profile', validateAccess, spotifyUserDetails);
router.get('/fetchPlaylists', validateAccess, fetchPlaylists);
router.get('/fetchSongs/:playlist_id', validateAccess, fetchSongs);
router.post('/addPlaylist', validateAccess, addPlaylist);
router.post('/addSongs/:playlist_id', validateAccess, addSong);
router.get('/fetchSong/:song_id', validateAccess, fetchSong);
module.exports = router;