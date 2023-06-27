const createHttpError = require('http-errors');

module.exports = (validator) => async (req,res,next) => {
    try {
        const validated = await validator.validateAsync(req.body);
        req.body = validated;
        return next();
    } catch (error) {
        if(error.isJoi) {
            return next(createHttpError(422,{message: error.message}))
        } else {
            return next(createHttpErrorerror(500));
        }
    }
}