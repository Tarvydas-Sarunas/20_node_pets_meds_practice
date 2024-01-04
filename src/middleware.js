const Joi = require('joi');

function errorDetails(error) {}

async function checkPetBody(req, res, next) {
  // aprasom koks bus musu objektas
  const petSchema = Joi.object({
    pets_name: Joi.string().min(3).max(10).required(),
    pets_dob: Joi.date().required(),
    client_email: Joi.string().email({ minDomainSegments: 2 }).required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await petSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check pet body ===', error);
    // parasyti funkcija errorDetails(error)
    // grazina masyva kuriame yra objektas {field: name, err: required field}
    // mes norime is objekto sukti cikla per details
    // paimti is jo lauka message
    // ir paiimti is path kurioje vietoje ivyklo klaida
    res.status(400).json('Check your inputs');
  }
}

async function checkMedsBody(req, res, next) {
  // kuri tikrina meds laukus ar geri atsiusti
}

async function checkLogsBody(req, res, next) {
  // kuri tikrina ar geri logs laukui atsiusti
}

module.exports = {
  checkPetBody,
  checkMedsBody,
  checkLogsBody,
};
