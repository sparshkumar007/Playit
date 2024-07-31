const express = require('express');
const { fetchSessionToken, fetchPlaylists, fetchSongs, fetchUser, addSongs, addPlaylist } = require('../controllers/lastfm.controller');
const { verifyAuthToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/getSessionToken', fetchSessionToken);
router.get('/fetchPlaylists', fetchPlaylists);
router.get('/profile', fetchUser);
router.get('/fetchSongs', fetchSongs);
router.post('/addPlaylist', addPlaylist);
router.post('addSongs', addSongs)
module.exports = router;