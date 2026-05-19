const jwt = require("jsonwebtoken");

async function generateToken(user) {
    const payload = {
        id: user.id,
        role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
}

module.exports = generateToken;
