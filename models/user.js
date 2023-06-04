const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username must provided."],
        unique: [true, "username already exist."],
        minLength: 3,
        maxLength: 12
    },
    password: {
        type: String,
        required: [true, "password must provided."],
        minLength: 4
    },
    email: {
        type: String,
        required: [true, "email must provided."],
        unique: [true, "email already exist."],
        validate(value){
            if(!validator.isEmail(value)) throw new Error("email is invalid.");
        }
    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        default: "normal"
    },
    tokens: [{
        accessToken: {
            type: String
        },
        refreshToken: {
            type: String
        }
    }]
}, {timestamps: true});

userSchema.methods.generateAccessToken = async function(){
    const user = this;
    const accessToken = jwt.sign({ email: user.email, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
    user.tokens[0].accessToken = accessToken;

    await user.save();
}

userSchema.methods.generateRefreshToken = async function(){
    const user = this;
    const refreshToken = jwt.sign({ email: user.email, username: user.username }, process.env.REFRESH_TOKEN_SECRET);
    user.tokens[0].refreshToken = refreshToken;

    await user.save();
}

module.exports = mongoose.model("user", userSchema);