const { validationResult, checkSchema } = require('express-validator');
const logger = require('../../Logger/logger').eventServiceLogger;
const errorResponse = require('../responses/errorResponse');

const validateRequest = async function (req, res, next) {
    logger.info("Running eventModelValidation");
    await checkSchema({
        eventId: {
            in: ['params','body'],
            errorMessage: 'eventId is wrong',
            isInt: true,
            optional: { options: { nullable: true } },
        },
        eventName: {
            in: ['params','body'],
            errorMessage: 'eventName is wrong',
            isString: true,
        },
        eventStartTime: {
            in: ['params','body'],
            errorMessage: 'eventStartTime is wrong',
            isInt: true
        },
        eventDuration: {
            in: ['params','body'],
            errorMessage: 'eventDuration is wrong',
            isInt: true
        },
        eventDescription: {
            in: ['params','body'],
            errorMessage: 'eventDescription is wrong',
            isString: true,
            optional: { options: { nullable: true } },
        }
    }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error("eventModelValidation Failed message :- " + JSON.stringify(errors.array()));
        return res.status(400).json(errorResponse(1,errors.array()));
    }
    next();
}

module.exports = validateRequest;