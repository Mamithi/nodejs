const express = require('express');
const router = express.Router();

const { Rental,validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findById(req.body.customerId);

    if (!customer) {
        return res.status(400).send('This customer does not exist');
    }

    const movie = await Movie.findById(req.body.movieId);

    if (!movie) {
        return res.status(400).send('Movie not in stock');
    }

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            daily_rental_rate: movie.daily_rental_rate,
        },
    });

    rental = await rental.save();

    movie.number_in_stock--;
    movie.save();

    return res.status(200).send(rental);
});

router.get('/:id', async(req, res) => {
    const rental = await Rental.findById(req.params.id);

    if(!rental) {
        return res.status(404).send('This rental is not found');
    }

    return res.status(200).send(rental);
});

module.exports = router;
