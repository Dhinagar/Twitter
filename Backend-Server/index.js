const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const io = require("socket.io")

const Connection = require('./Connection');
const ServerConfig = require('./ServerConfig');
const logger = require('./logger');
const User = require('./systemModules/user');
const Twitter = require('./systemModules/Twitter');
const Log = require('./log')


const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));


const startApp = async (serverConfig) => {
	const connection = new Connection(serverConfig, logger);
	try {
		await connection.connectDb();
	} catch (error) {
		process.exit();
	}

	const systemModules = [
		new User(logger, serverConfig, connection, app),
		new Twitter(logger, serverConfig, connection, app)
	];

	systemModules.forEach(async systemModule => await systemModule.init());

	const log = new Log(logger, serverConfig, app);
	await log.init();

	process.on('exit', () => logger.info(`Exiting...`));
	process.on('SIGINT', () => {
		logger.info(`Server is going for shutdown...`);
		process.exit();
	});
	process.on('uncaughtException', (error) => {
		try {
			logger.error('UncaughtException: ', error.message);
			logger.error(error.stack);
		}
		catch (e) {
			console.log("Uncaught Exception: ", error.message);
			console.log(error.stack);
		}
	});

	console.log('Server is listening on port', serverConfig.serverPort);
	logger.info('Server is listening on port ' + serverConfig.serverPort);

}

const setup = async () => {
	try {

		let httpsServer = null;
		let httpServer = null;


		const serverConfig = new ServerConfig();
		await serverConfig.loadConfig(path.join(__dirname, "config.txt"));
		if (serverConfig.isHttps) {
			httpsServer = https.createServer(app);
			httpsServer.listen(serverConfig.serverPort, () => startApp(serverConfig))
		} else {

			httpServer = http.createServer(app);
			httpServer = app.listen(serverConfig.serverPort, () => startApp(serverConfig))
		}
	} catch (error) {
		logger.error(`Error while setting up server...${error}`);
	}
}


setup();