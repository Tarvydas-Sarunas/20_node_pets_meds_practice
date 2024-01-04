const Joi = require('joi');

function errorDetails(error) {
  const errorArray = [];

  if (error.details && Array.isArray(error.details)) {
    error.details.forEach((detail) => {
      const field = detail.path[0];
      const errMessage = detail.message;
      const errorObj = {
        field,
        error: errMessage,
      };
      errorArray.push(errorObj);
    });
  }
  return errorArray;
}

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
    res.errors = errorDetails(error);
    next();
  }
}

async function checkMedsBody(req, res, next) {
  // kuri tikrina meds laukus ar geri atsiusti
  // aprasom koks bus musu objektas
  const medsSchema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    description: Joi.string().min(3).required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await medsSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check pet body ===', error);
    res.errors = errorDetails(error);
    next();
  }
}

async function checkLogsBody(req, res, next) {
  // kuri tikrina ar geri logs laukui atsiusti
  // aprasom koks bus musu objektas

  const logsSchema = Joi.object({
    pet_id: Joi.number().required(),
    description: Joi.string().min(3).required(),
    status: Joi.string().min(3).required(),
  });
  // testuojam ar atitinka objektas musu schema
  try {
    const validationResult = await logsSchema.validateAsync(req.body, {
      // abortEarly reikia kad rodytu visas klaidas ne tik pirma klaida
      abortEarly: false,
    });
    console.log('validationResult ===', validationResult);
    next();
  } catch (error) {
    console.log('error check pet body ===', error);
    res.errors = errorDetails(error);
    next();
  }
}

module.exports = {
  checkPetBody,
  checkMedsBody,
  checkLogsBody,
};
