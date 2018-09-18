const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, category: 'Horror'},
    { id: 2, category: 'Comedy'},
    { id: 3, category: 'Romantic'},
    { id: 4, category: 'History'},
    { id: 5, category: 'Fiction'},
];

 router.get('/', (req, res) => {
    return res.send(genres);
});

 router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))

    if(!genre){
        return res.status(404).send(`Video genre with id ${req.params.id} not found`);
    }

    return res.send(genre);
});

 router.post('/', (req, res) => {
    const { error } = validateGenres(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id : genres.length + 1,
        category : req.body.category
    };

    genres.push(genre);

    return res.status(201).send(genre);
});

 router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))

    if(!genre){
        return res.status(404).send(`Video genre with id ${req.params.id} not found`);
    }

    const { error } = validateGenres(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    genre.category = req.body.category;

    res.status(200).send(genre);

});

 router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))

    if(!genre){
        return res.status(404).send(`Video genre with id ${req.params.id} not found`);
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
});

function validateGenres(genre) {
    const schema = {
        category : Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema)

}

module.exports = router;