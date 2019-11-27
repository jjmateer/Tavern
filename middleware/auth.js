const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    //Check for token
    if (!token) return res.status(401);
    try {
        //Verify token
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded;
        next();
    } catch (e) {
        res.json({msg: "Token invalid"})
    }
}

module.exports = auth; 