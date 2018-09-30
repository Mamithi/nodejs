const mongoose = require('mongoose');
const Joi = require('joi');


const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            daily_rental_rate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true,
    },
    date_out: {
        type: Date,
        required: true,
        default: Date.now,
    },
    date_returned: {
        type: Date
    },
    rental_fee: {
        type: Number,
        min: 0
    }

}));

function validateRental(rental){ 
    const schema = {
        customerId: Joi.ObjectId().required(),
        movieId: Joi.ObjectId().required(),
    }

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;