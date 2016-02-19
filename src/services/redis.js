import Redis from 'ioredis';

const setup = () => {
  const log = global.log.addChild('cache');
  log.debug('Setting up Redis connection');
  const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DBNUM
  });

  redis.on('connect', () => log.debug('Connected to redis'));
  redis.on('error', log.error);

  return redis;
};

export default {
  setup
};
