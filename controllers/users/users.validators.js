const Joi = require('joi');

const validateSymbol = Joi.object({
    symbol: Joi.string().required().alphanum().min(3).max(5).uppercase(),
});

module.exports = validateSymbol;