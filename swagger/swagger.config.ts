import * as swaggerUi from 'swagger-ui-express';
import {Application} from 'express';
import {Util} from '../shared/Util';
import * as fs from 'fs';
import {IRoute} from 'express-serve-static-core';
import {ServerConstants} from '../server-configs/server.constants';

const swaggerPath = `${__dirname}/swagger.json`;

export const Swagger = {
  create: (app: Application) => {
    Swagger.buildSwaggerJson();
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(require(swaggerPath)));
  },
  buildSwaggerJson: () => {
    if (fs.existsSync(swaggerPath)) {
       fs.unlinkSync(swaggerPath);
    }

    const swaggerContent = {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Node microservice API',
        description: 'Node REST API description implemented in Node JS and Typescript'
      }
    };

    const paths = {};
    Util.findControllerFiles('src/controllers/', []).forEach((pathToController: string) => {
      const controllerRoutes = (require(pathToController) as IRoute).stack;
      const controllerName = pathToController.split('/').length >= 3
        ? pathToController.split('/')[2]
        : 'default';

      controllerRoutes.forEach(handler => {
        paths[`${ServerConstants.API_PREFIX}${handler.route.path}`] = {
          [Object.keys(handler.route.methods)[0]]: {
            'tags': [controllerName],
            'summary': controllerName,
            'parameters': [{
                'in': 'body',
                'name': 'body',
                'required': true,
                'schema': {

                }
              }
            ]
          }
        };
      });
    });
    swaggerContent['paths'] = paths;
    fs.writeFileSync(swaggerPath, JSON.stringify(swaggerContent, null, 2));
  }
};
