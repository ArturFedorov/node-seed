import { QueryInterface } from 'sequelize';
import {Tables} from '../Tables';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize) =>
    queryInterface.createTable(Tables.ITEMS, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      active: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize) =>
    queryInterface.dropTable(Tables.ITEMS),
};
