var RateLimit = require('ratelimit.js').RateLimit;
var ExpressMiddleware = require('ratelimit.js').ExpressMiddleware;
var redis = require('redis');
var constants = require('../constants');

var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
var rateLimiter = new RateLimit(redisClient, [{interval: 60, limit: 10}]);

var options = {
  ignoreRedisErrors: true
};

var limitMiddleware = new ExpressMiddleware(rateLimiter, options);

var limitEndpoint = limitMiddleware.middleware(function(req, res, next) {
  res.status(429).send("BAD^^^\033[1A\r\033[K\n"+constants.limitmessage+"\n");
});

module.exports = limitEndpoint;
