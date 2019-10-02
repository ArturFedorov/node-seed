const fs = require('fs');
const path = require('path');



//cleaning for seeders or migrations
const isForSeeders = process.argv.find(arg => arg.startsWith('--seeders'));
const directory = `./src/orm/${isForSeeders ? 'seeders' : 'migrations'}/js`;

/**
 * Recurcive file deleting from js folder
 * @param path directory to be cleaned
 */
let deleteFolderRecursive = function(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      let currentPath = path + '/' + file;
      if (fs.lstatSync(currentPath).isDirectory()) { // recurse
        deleteFolderRecursive(currentPath);
      } else { // delete file
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(directory);
