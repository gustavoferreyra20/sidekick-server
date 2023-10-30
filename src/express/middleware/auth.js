const { expressjwt: jwt } = require("express-jwt");
const dotenv = require('dotenv').config();

// Secret key for JWT token verification (replace with your secret)
const secretKey = process.env.JWT_SECRET;

function auth(req, res, next) {
    // Use the express-jwt middleware to validate the token
    jwt({ secret: secretKey, algorithms: ["HS256"] })(req, res, (err) => {
        if (err) {
            // Token is not valid, send an unauthorized response
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Token is valid, continue to the next middleware
        next();
    });
}

module.exports = {
    auth: auth,
};