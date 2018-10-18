const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental} = require('../models/rental');
const { Movie} = require('../models/movie');
const Joi = require('joi');

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
   const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) {
        return res.status(404).send('Rental not found');
    }

    if (rental.date_returned) {
        return res.status(400).send('Return already processed');
    }

    rental.return();
    await rental.save();

    await Movie.update({ id: rental.movie._id}, {
        $inc: {number_in_stock: 1}
    });

    return res.send(rental);

});

function validateReturn(req) {
    const schema = {
        customerId: Joi.ObjectId().required(),
        movieId: Joi.ObjectId().required()
    };

    return Joi.validate(req, schema)
}

module.exports = router;