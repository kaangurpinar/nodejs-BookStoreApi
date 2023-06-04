require("../mongoose");
const User = require("../models/user");

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.params.id });
        
        if(!user){
            return res.status(404).send({ error: "user doesn't exist." });
        }
        
        res.send(user);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.deleteUserById = async (req, res) => {
    try{
        const user = await User.findOneAndDelete({ _id: req.params.id });
        
        if(!user){
            return res.status(404).send({ error: "user doesn't exist." });
        }
        
        res.status(200).send({ user: user, message: "user has been deleted." });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        const user = await User.findOne({ _id: req.params.id });
        
        if(!user){
            return res.status(404).send({ error: "user doesn't exist." });
        }
        
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.status(200).send({ user: user, message: "user has been updated."});
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}
