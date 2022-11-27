const Joi = require('joi');
const {MONGO_ID} = require('../config/regex.enum')

module.exports = {
    idValidator: Joi.string().regex(MONGO_ID)
};
