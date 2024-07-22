const express = require('express');
const { verifyAuthToken } = require('../middlewares/auth.middleware');
const { userSignup, userLogin } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;