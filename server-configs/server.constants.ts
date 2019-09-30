/**
 * Enum for string parameters in server.ts config
 * For usage in server-addons
 * @export
 * @enum {number}
 */
export enum ServerConstants {
  API_PREFIX = '/api',
  DEVELOPMENT_PORT = 3000,
  PRODUCTION_PORT = 80,
  DEVELOPMENT_HOST = 'localhost',
  PRODUCTION_HOST = '0.0.0.0',
  MAX_REQUEST_SIZE = '10mb'
}
