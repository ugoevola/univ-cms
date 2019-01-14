const config = {
  MONGO_URL: process.env.MONGO_URL || '192.168.198.130',
  MONGO_PORT : process.env.MONGO_PORT || 27017,
  SERVER_PORT: process.env.SERVER_PORT || '4000',
  CLIENT_PORT: process.env.CLIENT_PORT || '4080',
  CLIENT_ACTIVATED: process.env.CLIENT_ACTIVATED || true,
  CLIENT_PROXY_ACTIVATED: process.env.CLIENT_PROXY_ACTIVATED || false,
  RENDERER_PORT: process.env.RENDERER_PORT || '4100',
  RENDERER_ACTIVATED: process.env.RENDERER_ACTIVATED || true,
  RENDERER_PROXY_ACTIVATED: process.env.RENDERER_PROXY_ACTIVATED || false,
  SERVER_PATH : process.env.SERVER_PATH || '/api',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  SWAGGER_ACTIVATED: process.env.SWAGGER_ACTIVATED || false,
  AUTH_JWT_KEY : process.env.AUTH_JWT_KEY || 'I015U2VjcmV0SldUNCFJbmV4eXM='
}
module.exports = { config: config }
