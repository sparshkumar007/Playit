var jwt = require('jsonwebtoken');
const verifyAuthToken = async (req, res, next) => {
    console.log('passing through auth.middleware');
    const { authorization } = req.headers;
    // console.log(authorization);
    if (!authorization) {
        throw new Error("Invalid Action");
    }
    const authToken = authorization.replace('Bearer ', '');

    jwt.verify(authToken, process.env.SIGNATURE, async (err, user) => {
        if (err) {
            console.log('Error while verifying auth Token: ', err);
            return res.status(403).json({ message: "Couldn't verify jwt token" });
        } else {
            console.log('user details fetched from auth token: ', user);
            req.userId = user.userId;
            next();
        }
    })
}

module.exports = {
    verifyAuthToken
}