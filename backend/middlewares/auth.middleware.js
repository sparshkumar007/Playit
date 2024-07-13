const verifyToken = async (req, res, next) => {
    console.log('passing through middleware');
    next();
}

module.exports = {
    verifyToken
}