const {
    Rental
} = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');
const {
    User
} = require('../../models/user');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

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
});