const fs = require('fs');

const migrationTemplate = `
import { QueryInterface } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface, Sequelize) => {
  // Write migration code here.
  },
  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface, Sequelize) => {
  // If migration fails, this will be called. Rollback your migration changes.
  },
};`.trim();


/**
 * check if generator is for seeders or migrations
 * @type {string | undefined}
 */
const isForSeeders = process.argv.find(arg => arg.startsWith('--seeders'));
const migrationDir = `./src/orm/${isForSeeders ? 'seeders' : 'migrations'}`;
const alphaNumericDashUnderscore = /^[a-zA-Z0-9-_]+$/;


/*
* Read flags check if provided
* */
const flags = process.argv.slice(1).join(' ');
if(flags.indexOf('--fileName=') < 0) {
  console.error('Please provide migration name --fileName=');
  return;
}

/**
 * Take migration name
 * Should only contain letters numbers dash underscore
 */
const migrationName = flags.split('--fileName=')[1];
if(!migrationName && !alphaNumericDashUnderscore.test(migrationName)) {
  console.error('Migration or seeder name should contain only numbers letters underscore or dash and cannot be empty');
  return;
}


if(!fs.existsSync(migrationDir)) {
  fs.mkdirSync(migrationDir);
}

const now = new Date();
const migrationFileTimestamp = `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;


const migratinFullname = `${migrationFileTimestamp}-${migrationName}.ts`;

if(fs.existsSync(`${migrationDir}/${migratinFullname}`)) {
  console.error('Migration with that name already exists');
  return;
};

fs.writeFileSync(`${migrationDir}/${migratinFullname}`, migrationTemplate);
console.log(`Migration ${migratinFullname} was created`);
