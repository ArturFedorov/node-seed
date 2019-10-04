import {ServerConstants} from './server.constants';
import AppConfiguration from '../configs/AppConfiguration';
import AppError from '../shared/AppError';
import {appLogger} from './server.logger';

/**
 * Used to set up global server handlers
 * @export
 * @const
 */

const ServerDefaults = {
    setGlobalErrorHandling: app => {
       app.use((err, req, res, next) => {
         let errorCode = '500';
         if (err instanceof AppError) {
           errorCode = err.errorCode;
         }
         appLogger.error(`${err.errorCode} – ${err.message}`);
         res.status(errorCode).json({errors: [{msg: err.message ? err.message : err}]});
        });
    },

    port: null,
    host: '',

    setHostAndPort: app => {
      ServerDefaults.port = AppConfiguration.env === 'development' ? ServerConstants.DEVELOPMENT_PORT : ServerConstants.PRODUCTION_PORT;
      ServerDefaults.host = AppConfiguration.env === 'development' ? ServerConstants.DEVELOPMENT_HOST : ServerConstants.PRODUCTION_HOST;
       app.set('host', this.host);
       app.set('port', this.port);
    }
};

export default ServerDefaults;
