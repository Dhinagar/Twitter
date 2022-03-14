const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { getLocalFormattedDate } = require('./utils');

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${getLocalFormattedDate()}  ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.DailyRotateFile({
            filename: 'logs/log-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            json: false,
            level: 'debug',
            maxSize: '5m',
            maxFiles: '30d',
        }),
    ],

});

module.exports = logger;