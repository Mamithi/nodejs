const express = require('express');
const router = express.Router();

const {Customer, validate} = require('../models/customer');

 router.get('/', async(req, res) => {
     const customers = await Customer.find().sort('name');
    return res.send(customers);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    });

    customer = await customer.save()

    return res.status(201).send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer)  return res.status(404).send(`Customer with id ${req.params.id} not found`);

    return res.status(200).send(customer);
});

 router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if(error){return res.status(400).send(error.details[0].message);}

   const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })

    if(!customer) return res.status(404).send(`Customer with id ${req.params.id} not found`);

    
    res.status(200).send(customer);

});

 router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if(!customer)return res.status(404).send(`Customer with id ${req.params.id} not found`);

    return res.send(customer);
});

module.exports = router;