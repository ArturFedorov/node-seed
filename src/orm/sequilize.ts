
import * as dbconfig from '../../configs/dbconfig.json';
import {Sequelize} from 'sequelize-typescript';

const env = process.env.NODE_ENV || 'development';
const config = dbconfig[env];


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

sequelize.addModels([`${__dirname}/models/`]);

export default sequelize;
