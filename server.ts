import * as http from 'http';
import ServerConfig from './server-configs/server.config';
import ServerDefaults from './server-configs/server.defaults';
import ServerRoutes from './server-configs/server.routes';
import ServiceRunner from './server-configs/service.runner';
import * as logger from './server-configs/server.logger';
import {ServerConstants} from './server-configs/server.constants';
import AppConfiguration from './configs/AppConfiguration';
import sequelize from './src/orm/sequilize';
/*
* This is used for handling errors. The express doesn't provide solution for handling errors
* in asynchronous application
* */
import 'express-async-errors';
import {Swagger} from './swagger/swagger.config';

AppConfiguration.initConfiguration();
logger.initLogger();
ServerConfig.init();
ServerRoutes.configureRoutes(ServerConfig.app);
ServerDefaults.setGlobalErrorHandling(ServerConfig.app);
ServerDefaults.setHostAndPort(ServerConfig.app);

// Create HTTP server.
const server = http.createServer(ServerConfig.app);
logger.appLogger.info(`Starting server on '${AppConfiguration.env}' environment.`);
// Listen on provided port, on all network interfaces.
server.listen(ServerDefaults.port, () => {
  logger.appLogger.info(`API running on ${ServerDefaults.host}:${ServerDefaults.port}`);
  logger.appLogger.info(`REST API can be reached by ${ServerDefaults.host}:${ServerDefaults.port}${ServerConstants.API_PREFIX}`);
});

// connect to db
sequelize.sync({force: false})
  .then(logger.appLogger.info('DB Connection esteblished'));

Swagger.create(ServerConfig.app);
ServiceRunner.run();

export default server;
