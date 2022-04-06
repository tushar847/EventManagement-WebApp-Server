require('dotenv').config();
const express = require('express');
const logger = require('./Logger/logger').serverMainLogger;
const app = express();
const eventServiceRoutes = require('./events-service/eventsRoutes');
const dbClient = require('./db/client');


logger.info("Intializing Server");
connectToDb();
app.use(express.json());

app.get("/healthCheck",(req,res) => {
    res.status(200).json("lub  dub");
})

app.use('/events', eventServiceRoutes);
app.listen(3000 , () => { 
    logger.info("Server Started");
    console.log("Server Started");
});

function connectToDb() {
    logger.info("Establishing DB connection");
    try {
        dbClient.connect();
    } catch (error) {
        logger.error("Failed to connect to Database");
        throw new Error("Failed to connect to Database");
    }
};
