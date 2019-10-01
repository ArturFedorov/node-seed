import {ServerConstants} from './server.constants';
import {appLogger} from './server.logger';
import {Util} from '../shared/Util';

/**
 * Used to set up extra routes
 * and controllers
 * @export
 * @const
 */
const ServerRoutes = {
  configureRoutes: app => {
    const allControllers = Util.findControllerFiles('src/controllers/', []);
    if (allControllers.length === 0 ) {
      appLogger.error(`No files of controller found.`);
    }
    allControllers.forEach(controllerPath => {
      appLogger.info(`Register controller ${controllerPath}`);
      app.use(ServerConstants.API_PREFIX, require(controllerPath));
    });
  }
};

export default ServerRoutes;
