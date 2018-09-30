const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
const auth  = require('../middleware/auth');
const admin = require('../middleware/admin');

 router.get('/', async(req, res) => {
     const genres = await Genre.find().sort('name');
    return res.send(genres);
});

 router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let genre = new Genre({name: req.body.name});

    genre = await genre.save()

    return res.status(201).send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre)  return res.status(404).send(`Video genre with id ${req.params.id} not found`);

    return res.status(200).send(genre);
});

 router.put('/:id', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error){return res.status(400).send(error.details[0].message);}

   const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })

    if(!genre) return res.status(404).send(`Video genre with id ${req.params.id} not found`);

    res.status(200).send(genre);
});

 router.delete('/:id', [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre)return res.status(404).send(`Video genre with id ${req.params.id} not found`);

    return res.send(genre);
});

module.exports = router;