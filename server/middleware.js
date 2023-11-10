const jwt = require('jsonwebtoken');

// All the token activities are handled by the middleware.
module.exports = function (req, res, next) {
    try {
        const token = req.header('x-token');//tokens anni headers lo send chestam so we used header
        if (!token) {
            return res.status(400).send('Token not found');
        }

        // If the token is there, then we will verify
        const decoded = jwt.verify(token, 'thisisasecret');//ee step lo token ni verify chesi decode chesi decoded variable lo pettesthunnam

        // After decoding, we will get the same payload that we have sent while signing
        req.user = decoded.user; // Here we are decoding because we are passing that user particular id to the /myblog

        // In the req.user, whoever logged in, that user id will be there
        next(); // We use next() because we will be sending our request user to the /myblogs route GET http call
    } catch (err) {
        console.error(err);
        return res.status(500).send('Invalid token'+err); // This means there's some error in the try block
    }
};
