const Joi = require('joi');
const regex = require('../config/regex.enum')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(20).required().default(''),
        email: Joi.string().regex(regex.EMAIL).required().trim().lowercase(),
        age: Joi.number().integer().min(0).max(125),
        password: Joi.string().regex(regex.PASSWORD).required()
    }),

    editUserValidator: Joi.object({
        name: Joi.string().min(2).max(20).optional().default(''),
        email: Joi.string().regex(regex.EMAIL).optional().trim().lowercase(),
        age: Joi.number().integer().min(0).max(125).optional(),
        password: Joi.string().regex(regex.PASSWORD).optional()
    }),

};