import * as configs from './configs.json';

const AppConfiguration = {

  initConfiguration : () => {
    const env = process.env.NODE_ENV || 'development';

    // We are using 'development_compiled' environment to start compiled JS locally for checking the build
    const configKey = env === 'development_compiled' ? 'development' : env;
    AppConfiguration.baseUrl = (<any>configs).baseUrl;
    AppConfiguration.env = env;
  },

  env: '',
  baseUrl: '',
  frontendAppName:''
};

export default AppConfiguration;
