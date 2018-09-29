const express = require('express');
const { User, validateAuth } = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {
    const { error } = validateAuth(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(400).send('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword){
        return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ _id: user._id}, 'jwtPrivateKey');

    res.status(200).send(token);   
})

module.exports = router;
