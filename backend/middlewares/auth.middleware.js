var jwt = require('jsonwebtoken');
const verifyAuthToken = async (req, res, next) => {
    try {
        console.log('passing through auth.middleware');
        const { authorization } = req.headers;
        console.log('cookie: ', req.cookies);
        // console.log(authorization);
        // if (!authorization) {
        //     throw new Error("Invalid Action");
        // }
        const authToken = req.cookies?.authToken || authorization?.replace('Bearer ', '');
        if (!authToken) {
            throw new Error("User AuthToken not found in middleware");
        }
        jwt.verify(authToken, process.env.SIGNATURE, async (err, user) => {
            if (err) {
                console.log('Error while verifying auth Token: ', err);
                return res.status(403).json({ message: "Couldn't verify jwt token" });
            } else {
                console.log('user details fetched from auth token: ', user);
                req.userId = user.userId;
                console.log('Auth.middleware passed');
                next();
            }
        })
    } catch (error) {
        console.log('error occured in verify auth token middleware: ', error);
        return res.status(500).json({ message: "internal server error!!!", success: false })
    }
}

module.exports = {
    verifyAuthToken
}