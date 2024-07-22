const express = require('express');
const { addPlaylist, fetchAccessToken } = require('../controllers/spotify.controller');
const { getToken } = require('../middlewares/spotify.middleware');
const { verifyAuthToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/addPlaylist', getToken, addPlaylist);
router.get('/fetchAccessToken', verifyAuthToken, fetchAccessToken);

module.exports = router;