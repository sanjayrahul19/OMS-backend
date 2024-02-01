import http from 'http';
import https from 'https';
import chalk from 'chalk';
import fs from 'fs';

import { config } from './config/index';
import RouteServiceProvider from './providers/route-service-provider';
import SocketConfig from './config/socket';
import { consoleLoggerRedirector } from './config/console-logger';


consoleLoggerRedirector.redirectConsoleLogsToWinston();

const routeServiceProvider = new RouteServiceProvider();

const options = config.ENV.HTTPS === 'true'
    ? {
        key: fs.readFileSync(config.ENV.SSL_KEY),
        cert: fs.readFileSync(config.ENV.SSL_CERT),
        ca: fs.readFileSync(config.ENV.SSL_FULLCHAIN),
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
    }
    : undefined;

const server = config.ENV.HTTPS === 'true'
    ? https.createServer(options, routeServiceProvider.app)
    : http.createServer(routeServiceProvider.app);

const socketConnecton = new SocketConfig(server);
socketConnecton.socket.on('connection', socketConnecton.onConnection);

server.listen(config.ENV.PORT, () => {
    if (process.send) {
        process.send('ready');
    }
    console.log(chalk.green.bold.italic(`App running on port ${config.ENV.PORT}`));
});

module.exports = server;

