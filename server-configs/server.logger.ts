import * as log4js from 'log4js';
import {LoggingEvent} from 'log4js';
import AppConfiguration from '../configs/AppConfiguration';

let expressLogger, dfpLogger, wsLogger;

const initDfpLogger = () => {
  const wsLoggerEnabled  = !!process.argv.find(arg => arg.startsWith('--enableWSLogger'));
  const maxLogSize = 500 * 1024; // 500 kb

  const logAppenders = {
    console: { type: 'console' },
    wsAppender: {type: 'file', filename: 'logs/ws-dfp.log', maxLogSize}
  };

  const wsAppender = wsLoggerEnabled ? 'console' : 'wsAppender';
  const logCategories = {
    default: { appenders: ['console'], level: 'info' },
    wsLogger: {appenders: [wsAppender], level: 'info' }
  };

  if (AppConfiguration.env !== 'development') {
    // add expresslogging and application logging to file in microservice environment
    logAppenders['expressLogfileAppender'] = { type: 'file', filename: 'logs/express-dfp.log' };
    logAppenders['appLogFile'] = { type: 'file', filename: 'logs/app-dfp.log'  };
    // for production in conole should be json format
    logAppenders['logProdConsole'] = { type: 'console', layout: {type: 'json', separator: ','} };

    logCategories['expressLogger'] =  { appenders: ['expressLogfileAppender'], level: 'info' };
    logCategories['default'] =  { appenders: ['logProdConsole', 'appLogFile'], level: 'info' };
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
  dfpLogger = log4js.getLogger();
  wsLogger = log4js.getLogger('wsLogger');

};

export {initDfpLogger, expressLogger, dfpLogger, wsLogger};
