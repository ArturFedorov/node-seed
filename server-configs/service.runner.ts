import {appLogger} from './server.logger';
import AppConfiguration from '../configs/AppConfiguration';

const ServiceRunner = {
  run: () => {
    appLogger.info('No runners registered');
    if (AppConfiguration.env !== 'development') {

    }
  },

};

export default ServiceRunner;
