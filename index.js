const System = require('systemic');
const mongodb = require('systemic-mongodb');

const environment = require('./components/environment');
const awsCrendentials = require('./components/awsCrendentials');
const config = require('./components/config');
const logger = require('./components/logger');

new System()
  .configure(config())
  .add('logger', console)
  .add('env', environment())
  .add('aws', awsCrendentials())
  .add('mongodb', mongodb()).dependsOn('config', 'logger')
  .start((err, components) => {
    if (err) throw err;

    require('./src/SQStoMongo')(components);

    components.logger.info('Started');
    components.logger.info('control + c to quit');
  });
