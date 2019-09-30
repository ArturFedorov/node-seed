import * as fs from 'fs';
import AppConfiguration from '../configs/AppConfiguration';

export class Util {
  /**
   *
   * For dynamic import of all controllers system should firsltly read filesystem and get all
   * files with name template *.controllers.ts
   *
   **/
  public static findControllerFiles = (dir, filelist) => {
    const controllerMask = AppConfiguration.env === 'development' ? 'controller.ts' : 'controller.js';
    const files = fs.readdirSync(`${dir}`);
    filelist = filelist || [];
    files.forEach(file => {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = Util.findControllerFiles(`${dir}${file}/`, filelist);
      } else {
        if (file.indexOf(controllerMask) > 0) {
          filelist.push(`../${dir}${file}`);
        }
      }
    });
    return filelist;
  }
}
