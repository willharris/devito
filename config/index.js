var os = require('os');

exports = module.exports = {
    env: process.env.NODE_ENV || 'dev',
    host: process.env.HOST || '127.0.0.1',
    hostname: process.env.HOSTNAME || os.hostname(),
    port: process.env.PORT || 8080,
    redisHost: process.env.REDIS_HOST || '127.0.0.1',
    redisPort: process.env.REDIS_PORT || 6379
};
