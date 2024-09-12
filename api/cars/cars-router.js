const router = require('express').Router();

const {
checkCarId,
checkCarPayload,
checkVinNumberUnique,
checkVinNumberValid
} = require('./cars-middleware');

const Car = require('../cars/cars-model');

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll();
        res.json(cars);
    }
    catch(err){
        next(err);
    }
});

router.get('/:id', checkCarId, async(req, res, next) => {
    res.json(req.car);
});

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
try{
    const newcar = await Car.create(req.body);
    res.status(201).json(newcar);
}
catch(err){
    next(err);
}
})

module.exports = router;
