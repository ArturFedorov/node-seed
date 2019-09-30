import * as express from 'express';
import * as bodyParser from 'body-parser';
import {ServerConstants} from './server.constants';
import * as log4js from 'log4js';
import {expressLogger} from './server.logger';
import AppConfiguration from '../configs/AppConfiguration';

const ServerConfigs = {
  app: null,
  init: () => {
    ServerConfigs.app = express();

    // set up max request size (extended for big requests with images)
    ServerConfigs.app.use(bodyParser.json({limit: ServerConstants.MAX_REQUEST_SIZE}));
    ServerConfigs.app.use(bodyParser.urlencoded({limit: ServerConstants.MAX_REQUEST_SIZE, extended: true}));

    if (AppConfiguration.env !== 'development') {
      ServerConfigs.app.use(log4js.connectLogger(expressLogger, { level:  'auto' }));
    }
  }
};

export default ServerConfigs;
