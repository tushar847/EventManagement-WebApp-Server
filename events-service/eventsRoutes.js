const express = require('express');
const eventServiceRoutes = express.Router();
const mapper = require('mybatis-mapper');
const logger = require('../Logger/logger').eventServiceLogger;
const eventIdValidator = require('./validators/eventIdValidator');
const eventModelValidator = require('./validators/eventModelValidator');
const db = require('../db/client');
const successResponse = require('./responses/successResponse');
const errorResponse = require('./responses/errorResponse');
mapper.createMapper(['./events-service/mapper/eventQueries.xml']);
const format = { language: 'sql' };

// Create
eventServiceRoutes.post('/add', eventModelValidator, async (req, res) => {
    logger.info("Request recieved at point 'events/add'");
    try {
        let param = {
            eventName: req.body.eventName,
            eventStartTime: req.body.eventStartTime,
            eventDuration: req.body.eventDuration,
            eventDescription: req.body.eventDescription
        };
        let query = mapper.getStatement('eventQueries', 'addEvent', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/add' message :- " + JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});

// Read as per requirement
eventServiceRoutes.get('/', async (req, res) => {
    logger.info("Request recieved at point 'events/'");
    try {
        let param = {
            currentTime: 200
        };
        let query = mapper.getStatement('eventQueries', 'fetchAllEvents', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/' message :- " + JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});


eventServiceRoutes.get('/:eventId', eventIdValidator, async (req, res) => {
    logger.info("Request recieved at point 'events/id'");
    try {
        let param = {
            eventId: req.params.eventId,
            currentTime: 200
        };
        let query = mapper.getStatement('eventQueries', 'fetchEventById', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/id' message :- " + JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});

// Read with isCompleted
eventServiceRoutes.get('/all', async (req, res) => {
    logger.info("Request recieved at point 'events/'");
    try {
        let param = {
            currentTime: 200
        };
        let query = mapper.getStatement('eventQueries', 'fetchAllEvents2', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/' message :- " + JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});

eventServiceRoutes.get('/all/:eventId', eventIdValidator, async (req, res) => {
    logger.info("Request recieved at point 'events/id'");
    try {
        let param = {
            eventId: req.params.eventId,
            currentTime: 200
        };
        let query = mapper.getStatement('eventQueries', 'fetchEventById2', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/id' message :- " + JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});

// Update 
eventServiceRoutes.put('/update', eventModelValidator, async (req, res) => {
    logger.info("Request recieved at point 'events/update'");
    try {
        let param = {
            eventId: req.body.eventId,
            eventName: req.body.eventName,
            eventStartTime: req.body.eventStartTime,
            eventDuration: req.body.eventDuration,
            eventDescription: req.body.eventDescription
        };
        let query = mapper.getStatement('eventQueries', 'updateEvent', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/update' message :- " + JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});

// Delete
eventServiceRoutes.delete('/delete', eventIdValidator, async (req, res) => {
    logger.info("Request recieved at point 'events/delete'");
    try {
        let param = {
            eventId: req.body.eventId
        };
        let query = mapper.getStatement('eventQueries', 'deleteEvent', param, format);
        const events = await db.query(query);
        res.status(200).json(successResponse(0, events.rows));
    } catch (err) {
        logger.error("Error at 'events/delete' message :- "+ JSON.stringify(err.message));
        res.status(400).json(errorResponse(1,err.message));
    }
});

module.exports = eventServiceRoutes;