const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

const rentalSchema =  new mongoose.Schema({
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

});

rentalSchema.statics.lookup = function(customerId, movieId){
    return this.findOne({
        'customer._id': customerId,
        'movie._id': movieId,
    });
}

rentalSchema.methods.return  = function(){
    this.date_returned = new Date();

    const rentalDays = moment().diff(this.date_out, 'days');
    this.rental_fee = rentalDays * this.movie.daily_rental_rate;
}

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){ 
    const schema = {
        customerId: Joi.ObjectId().required(),
        movieId: Joi.ObjectId().required(),
    }

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;