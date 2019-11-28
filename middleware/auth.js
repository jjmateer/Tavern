const jwt = require("jsonwebtoken");
const keys = require("../config/keys")
function auth(req, res, next) {
    console.log(req.body)
    const token = req.header('x-auth-token');
    //Check for token
    if (!token) return res.status(401);
    try {
        //Verify token
        const decoded = jwt.verify(token, keys.secretOrKey);
        req.user = decoded;
        next();
    } catch (e) {
        res.json({msg: "Token invalid"})
    }
}

module.exports = auth; 