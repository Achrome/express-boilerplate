import bunyan from 'bunyan';

export default class Logger {
  constructor() {
    this.log = bunyan.createLogger({
      name: 'Boilerplate',
      streams: [
        {
          level: process.env.LOG_LEVEL,
          stream: process.stdout
        }
      ]
    });
  }

  addChild(name: string, type: string) {
    const log = this.log.child({ service: name });
    if (bunyan.stdSerializers.hasOwnProperty(type)) {
      log.addSerializers({
        [type]: bunyan.stdSerializers[type]
      });
    }
    return log;
  }

}
