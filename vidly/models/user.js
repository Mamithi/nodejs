const mongoose = require('mongoose');
const Joi = require('joi');

const User =  mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        minlength: 6,
        maxlength: 255,

    }, 
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    }
}));

function validateUser(user){
    const schema = {
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(user, schema);
}

function validateAuth(auth){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(auth, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateAuth = validateAuth;