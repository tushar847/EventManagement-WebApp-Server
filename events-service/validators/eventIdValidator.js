const { validationResult, checkSchema } = require('express-validator');
const logger = require('../../Logger/logger').eventServiceLogger;
const errorResponse = require('../responses/errorResponse');

const validateRequest = async function (req, res, next) {
    logger.info("Running eventModelValidation");
    await checkSchema({
        eventId: {
            in: ['params','body'],
            errorMessage: 'eventId is wrong',
            isInt: true
        }
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error("eventModelValidation Failed message :- " + JSON.stringify(errors.array()))
        return res.status(400).json(errorResponse(1,errors.array()));
    }
    next();
}

module.exports = validateRequest;