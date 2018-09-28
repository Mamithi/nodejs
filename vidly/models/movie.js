const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5, 
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    number_in_stock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    daily_rental_rate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    }
}))

function validateMovies(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        number_in_stock: Joi.number().min(0).required(),
        daily_rental_rate: Joi.number().min(0).required(),
    }

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovies;