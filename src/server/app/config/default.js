const config = {
  MONGO_URL: process.env.MONGO_URL || '192.168.198.128',
  MONGO_PORT : process.env.MONGO_PORT || 27017,
  SERVER_PORT: process.env.SERVER_PORT || '4000',
  SERVER_PATH : process.env.SERVER_PATH || '/api',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  SWAGGER_ACTIVATED: process.env.SWAGGER_ACTIVATED || false,
  AUTH_JWT_KEY : process.env.AUTH_JWT_KEY || 'I015U2VjcmV0SldUNCFJbmV4eXM='
}
module.exports = { config: config }
