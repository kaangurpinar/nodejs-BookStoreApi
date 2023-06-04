require("../mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 8),
        email: req.body.email,
        tokens:[{accessToken: "test"}]
    });
    
    try{
        await user.save();
        res.status(201).send(user);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try{
        if(req.session.user){
            return res.status(400).send({ message: "you have already logged in." });
        }
        
        const user = await User.findOne({ username: req.body.username });
        
        if(!user){
            return res.status(404).send({ error: "invalid username or password." });
        }
        
        const password = await bcrypt.compare(req.body.password, user.password);
        
        if(!password){
            return res.status(404).send({ error: "invalid username or password." });
        }
        
        await user.generateAccessToken();
        await user.generateRefreshToken();
        req.session.user = user;
        res.status(200).send(user);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.logout = async (req, res) => {
    try{
        if(req.session){
            req.session.destroy();
            return res.status(200).send({ message: "you have been logged out." });
        }
        
        res.status(400).send({ error: "an error occured." });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.getProfile = async (req, res) => {
    try{
        const user = req.session.user;
        res.status(200).send(user);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.jwtAccessPage = async (req, res) => {
    try{
        res.status(200).send({ message: "you have jwt access token." });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.jwtRefresh = async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        const refreshToken = user.tokens[0].refreshToken;
        
        if(!refreshToken){
            return res.send(401).send({ error: "you don't have authorization." });
        }
        
        const verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        if(verify){
            await user.generateAccessToken();
        }
        
        req.session.user = user;
        res.status(200).send({ message: "your access token has been refreshed." });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}