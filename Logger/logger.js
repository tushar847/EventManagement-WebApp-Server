const { createLogger, format, transports } = require('winston');

const serverMainLogger = createLogger({
    transports: new transports.File({
        filename: 'logs/server_main.log',
        format: format.combine(
            format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            format.align(),
            format.printf(info => `${[info.level]}: ${[info.timestamp]}: ${info.message}`),
        )
    }),
});

const eventServiceLogger = createLogger({
    transports: new transports.File({
        filename: 'logs/event_service.log',
        format: format.combine(
            format.timestamp({
                format: 'MMM-DD-YYYY HH:mm:ss'
            }),
            format.align(),
            format.printf(info => `${[info.level]}: ${[info.timestamp]}: ${info.message}`),
        )
    }),
});

module.exports = { eventServiceLogger, serverMainLogger };