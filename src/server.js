import express from 'express';
import dotenv from 'dotenv';
import { setup } from 'middleware';
import Logger from 'services/bunyan';

// Set up dotenv to load all environment variables
dotenv.config({
  encoding: 'utf-8'
});

export const run = () => {
  global.log = new Logger();
  const log = global.log.addChild('app');
  const app = express();
  app.set('dev', app.get('env') === 'development');

  log.debug('Setting up the app');
  setup(app);
  log.debug('App setup done');

  app.listen(process.env.PORT, () => {
    log.info(`Server started at ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });
};
