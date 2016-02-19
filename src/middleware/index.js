import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import db from 'services/mongo';
import cache from 'services/redis';
import bunyanMiddleware from 'bunyan-middleware';
import connectRedis from 'connect-redis';
import session from 'express-session';
import api from 'middleware/api-router';

export const setup = app => {

  const log = global.log.addChild('middleware');

  app.set('srv.db', db.setup());
  app.set('srv.cache', cache.setup());

  log.debug('Setting up pre-routing middleware');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const RedisStore = connectRedis(session);
  app.use(session({
    store: new RedisStore({
      client: app.get('srv.cache')
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(compression());
  app.use(helmet());
  app.use(bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'reqId',
    obscureHeaders: [],
    logger: global.log.addChild('http:req', 'req'),
    verbose: app.get('dev')
  }));

  log.debug('Setting up views');
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.set('view options', { pretty: app.get('dev') });

  log.debug('Setting up routers');
  app.use('/api/v1/', api);
};
