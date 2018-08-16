const config = {
  MONGO_URL: process.env.MONGO_URL || '192.168.198.130',
  MONGO_PORT : process.env.MONGO_PORT || 27017,
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
  SWAGGER_ACTIVATED: process.env.SWAGGER_ACTIVATED || true,
  CLIENT_ACTIVATED : process.env.CLIENT_ACTIVATED || false,
};
module.exports = { config: config }
