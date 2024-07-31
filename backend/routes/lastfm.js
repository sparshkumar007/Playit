const express = require('express');
const { fetchSessionToken } = require('../controllers/lastfm.controller');

const router = express.Router();

router.get('/getSessionToken', fetchSessionToken);
module.exports = router;