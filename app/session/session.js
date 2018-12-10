const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const config = require('config');

// Redis
const url = config.get('session.redis.url');
const connect_timeout = config.get('session.redis.timeout');
const store = new RedisStore({ url, connect_timeout });

// Session
const resave = false;
const saveUninitialized = false;
const secret = config.get('session.secret');
const secure = config.get('session.cookie.secure') === 'true';
const domain = config.get('session.cookie.domain');
const cookie = { secure, domain };

const options = {
  store,
  secret,
  cookie,
  resave,
  saveUninitialized,
};

module.exports = expressSession(options);
