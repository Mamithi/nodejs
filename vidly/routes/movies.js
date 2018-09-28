const express = require('express');
const router = express.Router();

const { Movie, validate} = require('../models/movie');
const { Genre } = require('../models/genre');

router.post('/', async(req, res) => {
    const { error } = validate(req.body); 

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.body.genreId);

    if(!genre) {
        return res.status(400).send('Invalid genre.');
    }

    const movie = new Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name,
        },
        number_in_stock: req.body.number_in_stock,
        daily_rental_rate: req.body.daily_rental_rate,
    })
    await movie.save();

    return res.status(201).send(movie);
});

router.get('/', async(req, res) => {
    const movies = await Movie
    .find()
    .select('title')
    .sort('title');
    return res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if(!movie)  return res.status(404).send(`Movie with id ${req.params.id} not found`);

    return res.status(200).send(movie);
});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if(error){return res.status(400).send(error.details[0].message);}

   const movie = await Movie.findByIdAndUpdate(req.params.id, {title: req.body.title}, {
        new: true
    })

    if(!movie) return res.status(404).send(`Movie with id ${req.params.id} not found`);

    
    res.status(200).send(movie);

});

router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if(!movie)return res.status(404).send(`Movie with id ${req.params.id} not found`);

    return res.send(movie);
});


module.exports = router;