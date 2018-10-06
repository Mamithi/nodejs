const mongoose = require('mongoose');
const Joi = require('joi');

const returnSchema = new mongoose.Schema({
    customerId: {
        type: true
    }
})