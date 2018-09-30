const express = require('express');

const users = require('../routes/users');
const movies = require('../routes/movies');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const home = require('../routes/home');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json(),  (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error('Bad JSON');
          }
    });
    app.use('/api/users', users);
    app.use('/api/movies', movies);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/', home);
    app.use('/api/auth', auth);
    app.use(error);
}