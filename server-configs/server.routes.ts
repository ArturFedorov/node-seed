import {ServerConstants} from './server.constants';
import {dfpLogger} from './server.logger';
import {Util} from '../shared/Util';

/**
 * Used to set up extra routes
 * and controllers
 * @export
 * @const
 */
const ServerRoutes = {
  configureRoutes: app => {
    const allControllers = Util.findControllerFiles('controllers/', []);
    if (allControllers.length === 0 ) {
      dfpLogger.error(`No files of controller found.`);
    }
    allControllers.forEach(controllerPath => {
      dfpLogger.info(`Register controller ${controllerPath}`);
      app.use(ServerConstants.API_PREFIX, require(controllerPath));
    });
  }
};

export default ServerRoutes;
