import AppConfiguration from '../../configs/AppConfiguration';
import * as dbconfig from '../../configs/dbconfig.json';
import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize(dbconfig[AppConfiguration.env]);
sequelize.addModels([`${__dirname}/models`]);

export default sequelize;
