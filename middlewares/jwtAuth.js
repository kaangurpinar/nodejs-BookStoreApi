const jwt = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    
    if(!token){
        return res.status(401).send({ error: "you don't have authorization." });
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if(error){
            return res.status(400).send({ error: error.message });
        }
        req.tokenPayload = payload;
        next();
    });
}

module.exports = jwtAuth;