import mongoose from 'mongoose';

const setup = () => {
  const log = global.log.addChild('db');
  log.debug('Setting up Mongo connection');
  const { MONGO_HOST, MONGO_PORT, MONGO_DBNAME } = process.env;
  return mongoose.createConnection(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`);
};

export default {
  setup
};
