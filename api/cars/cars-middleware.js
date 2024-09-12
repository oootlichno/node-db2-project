const Car = require('../cars/cars-model');
const vinValidator = require('vin-validator');


async function checkCarId (req, res, next) {
  try{
const car = await Car.getById(req.params.id);
if(!car){
  return res.status(404).json({
    message: "car with id ${req.params.id} is not found"
  });
}
req.car = car;
next();
  }
  catch(err){
    next(err)
  }
}

async function checkCarPayload(req, res, next) {
  try {
    const { vin, make, model, mileage } = req.body;

    if (vin === undefined || make === undefined || model === undefined || mileage === undefined) {
      const missingFields = [
        vin === undefined ? 'vin' : null,
        make === undefined ? 'make' : null,
        model === undefined ? 'model' : null,
        mileage === undefined ? 'mileage' : null
      ].filter(field => field).join(', ');

      return res.status(400).json({
        message: `${missingFields} is missing` 
      });
    }

    next(); 
  } catch (err) {
    next(err); 
  }
}


async function checkVinNumberValid(req, res, next) {
  try {
    const { vin } = req.body;
    
    const isValidVin = vinValidator.validate(vin);

    if (!isValidVin) {
      return res.status(400).json({
        message: `vin ${vin.trim()} is invalid` 
      });
    }
    next();
  } catch (err) {
    next(err);
  }
}


async function checkVinNumberUnique(req, res, next){
try{
  const existVin = await Car.getAll().where('vin', req.body.vin.trim()).first();
  if(existVin){
return res.status(400).json({
  message: `vin ${req.body.vin} already exists`
});
  }
  next();
}
catch(err){
  next(err);
}
}

 

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
};
