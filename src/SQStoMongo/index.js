const easy = require('easy-sqs');
const tryParseJson = require('../utils');

module.exports = ({ mongodb, config, logger, aws }) => {
  const { credentials, region } = aws;
  const { accessKeyId, secretAccessKey } = credentials;
  const client = easy.createClient({ accessKeyId, secretAccessKey, region, });
  const queueReader = client.createQueueReader(config.sqs.queueUrl);
  const collection = mongodb.collection('messages');
  const stop = () => {
    queueReader.stop();
    dbConn.close();
    process.exit();
  };

  queueReader.on('started', () => logger.info('polling started pulling from: ' + config.sqs.queueUrl));

  queueReader.on('message', message => {
    logger.info('Received message from queue');

    collection.insert(
      tryParseJson(message.Body),
      { w: 1 },
      (err, result) => {
        if (err) {
          logger.info(err);
          return false;
        }
      }
    );

    logger.info('Message written');
  });

  queueReader.on('error', err => {
    if (err) {
      logger.info('Could not read message: ', err);
    }
  });

  queueReader.on('stopped', () => {
    logger.info('polling stopped')
  });

  queueReader.start();

  process.on('SIGTERM', () => stop());
  process.on('SIGINT', () => stop());
}
