import * as log4js from 'log4js';
import {LoggingEvent} from 'log4js';
import AppConfiguration from '../configs/AppConfiguration';

let expressLogger, appLogger;

const EXPRESS_LOG_FILE_APPENDER = 'expressLogfileAppender';
const APP_LOG_FILE = 'appLogFile';
const LOG_PROD_CONSOLE = 'logProdConsole';

const initLogger = () => {
  const maxLogSize = 500 * 1024; // 500 kb

  const logAppenders = {
    console: { type: 'console' }
  };

  const logCategories = {
    default: { appenders: ['console'], level: 'info' }
  };

  if (AppConfiguration.env !== 'development') {
    // add express logging and application logging to file in microservice environment
    logAppenders[EXPRESS_LOG_FILE_APPENDER] = { type: 'file', filename: 'logs/express-app.log', maxLogSize };
    logAppenders[APP_LOG_FILE] = { type: 'file', filename: 'logs/app.log', maxLogSize };
    // for production in console should be json format
    logAppenders[LOG_PROD_CONSOLE] = { type: 'console', layout: {type: 'json', separator: ','} };

    logCategories['expressLogger'] =  { appenders: [EXPRESS_LOG_FILE_APPENDER], level: 'info' };
    logCategories['default'] =  { appenders: [LOG_PROD_CONSOLE, APP_LOG_FILE], level: 'info' };
  }

  // add json format
  log4js.addLayout('json', (config: object) =>
    // @ts-ignore
    (logEvent: LoggingEvent) => JSON.stringify(logEvent) + config.separator
  );

  log4js.configure({
    appenders: logAppenders,
    categories: logCategories
  });

  expressLogger = log4js.getLogger('expressLogger');
  appLogger = log4js.getLogger();

};

export {initLogger, expressLogger, appLogger};
