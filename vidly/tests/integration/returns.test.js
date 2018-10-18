const { Rental} = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');
const {User} = require('../../models/user');
const moment = require('moment');
const { Movie } = require('../../models/movie')

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({customerId,movieId});
    }

    beforeEach(async () => {
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        token = new User().generateAuthToken();


        movie = new Movie({
            _id: movieId,
            title: '12345',
            daily_rental_rate: 2,
            genre: {name: '12345'},
            number_in_stock: 10
        });

        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345',
            },
            movie: {
                _id: movieId,
                title: '12345',
                daily_rental_rate: 2,
            }
        });

        await rental.save();
    });

    afterEach(async () => {
        await server.close();
        await Rental.remove({});
        await Movie.remove({});

    });

    it('should return 401 if the user is not authenticated', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    })


    it('should return 400 if customer id is not provided', async () => {
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 if movie id is not provided', async () => {
        movieId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if there is no rental with the given customer and movie id', async() => {
        await Rental.remove({});
        const res = await exec();
        expect(res.status).toBe(404);

    });

    it('should return 400 if the return is already processed', async() => {
        rental.date_returned = new Date();
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if the return is processed correctly', async() => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should set the return date if input is valid', async() => {
        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.date_returned;
        expect(diff).toBeLessThan(10*1000);
    });

    it('should calculate rental fee if input is valid', async() => {
        rental.date_out = moment().add(-7, 'days').toDate();
        await rental.save();       
        const res  =await exec();

        const rentalInDb = await Rental.findById(rental._id);
        expect(rentalInDb.rental_fee).toBe(14);
    });

    it('should increase number of movies in stock', async() => {
        await exec();
        const movieInDb = await Movie.findById(movieId);
        expect(movieInDb.number_in_stock).toBe(movie.number_in_stock + 1);
    });

    it('should return the rental in the body of the response', async() => {
        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id);

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['date_out', 'date_returned', 'customer', 
            'movie', 'rental_fee']))
    });
    
});