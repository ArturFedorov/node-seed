import { QueryInterface } from 'sequelize';
import {Tables} from '../Tables';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize) =>
    queryInterface.bulkInsert(Tables.ITEMS, [
      {
        name: 'Item1',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Item2',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize) =>
      queryInterface.bulkDelete(Tables.ITEMS, {}),
};
