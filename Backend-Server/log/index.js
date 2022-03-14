const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { check, validationResult } = require('express-validator');

const { getFiles, fileExistsAsync } = require('../utils');

class Log {
    /**
     * @param {object} logger - A Logger instance 
     * @param {object} config - A ServerConfig instance
     * @param {object} app - A Express app object 
     */
    constructor(logger, config, app) {
        this.logger = logger;
        this.config = config;
        this.app = app;
    }

    /**
    * @description Class init method
    */
    init() {
        this.initAPIs();
    }

    /**
   * @description Initialize all the APIs in the common inbox
   */
    initAPIs() {
        this.app.get(
            "/log/listOfLogs",
            this.listOfLogs.bind(this)
        )

        this.app.get(
            "/log/getLog",
            this.getLog.bind(this)
        );

        this.app.get(
            "/log/downloadLogZipForDate",
            this.downloadLogsZip.bind(this)
        );
    }


    /**
    * @description Get list of logs file for a date.
    * @param {object} req - Express Request object
    * @param {object} res - Express Response object
    */
    async listOfLogs(req, res) {
        try {
            const logDirPath = path.join(__dirname, "..", "logs");
            const logs = (await getFiles(logDirPath))
                .filter(file => path.basename(file).includes(".log"))
                .map(file => {
                    file = file.replace("log-", "");
                    file = file.replace(".log", "");
                    return file;
                });


            res.send({
                status: true,
                logs
            })
        } catch (error) {
            this.logger.error(`Failed to get list of logs...${error}`);
            res.send({ status: false, message: "Something went wrong in the server. Please try again" });
        }
    }

    /**
    * @description Get log file by file name.
    * @param {object} req - Express Request object
    * @param {object} res - Express Response object
    */
    async getLog(req, res) {
        try {
            await check("logName", "Please provide logName")
                .notEmpty()
                .run(req);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const [error] = errors.array();
                return res.send({
                    status: false,
                    message: error.msg
                })
            }

            const logName = req.query.logName || req.body.logName;

            const [date, part] = logName.split('.');

            const filename = `log-${date}.log${part ? `.${part}` : ''}`;
            const logFilePath = path.join(__dirname, "..", "logs", filename);

            const logExists = await fileExistsAsync(logFilePath);

            if (!logExists) {
                return res.send({
                    status: false,
                    message: "There is no logs for this logName"
                });
            }

            res.setHeader('Content-type', "application/octet-stream");
            res.setHeader('Content-disposition', 'attachment; filename=log-' + filename);
            fs.createReadStream(logFilePath).pipe(res);
        } catch (error) {
            this.logger.error(`Failed get logs file...${error}`);
            res.send({
                status: false,
                message: "Something went wrong. Please try again"
            })
        }
    }

    /**
    * @description Get log file by file name.
    * @param {object} req - Express Request object
    * @param {object} res - Express Response object
    */
    async downloadLogsZip(req, res) {
        try {
            await check("date", "Please provide a valid date")
                .isDate()
                .run(req);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const [error] = errors.array();
                return res.send({
                    status: false,
                    message: error.msg
                })
            }

            const date = req.query.date || req.body.date;

            const logDirPath = path.join(__dirname, "..", "logs");
            const logs = (await getFiles(logDirPath))
                .filter(file => file.includes(date))

            if (logs.length === 0) {
                return res.send({
                    status: false,
                    message: "There is are no logs for this date"
                });
            }

            const archive = archiver('zip');

            archive.on('error', function (err) {
                throw new Error(error);
            });

            //on stream closed we can end the request
            archive.on('end', () => {
                this.logger.info('Archive wrote %d bytes ' + archive.pointer());
            });

            //set the archive name
            res.attachment(`${date}-log.zip`);

            //this is the streaming magic
            archive.pipe(res);

            for (const log of logs) {
                archive.file(path.join(logDirPath, log), { name: path.basename(log) });
            }

            archive.finalize();

        } catch (error) {
            this.logger.error(`Failed to create zip file for logs...${error}`);
            res.send({ status: false, message: "Something went wrong. Please try again." })
        }
    }
}


module.exports = Log;