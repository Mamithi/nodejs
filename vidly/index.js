const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);

const users = require('./routes/users');
const movies = require('./routes/movies');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const home = require('./routes/home');
const auth = require('./routes/auth')

const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
