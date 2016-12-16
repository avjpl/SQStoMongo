module.exports = options => {
  const start = (dependencies, cb) => {
    return cb(null,
      {
        logger: {
          level: 'warn'
        },
        mongodb: {
          url: 'mongodb://127.0.0.1/dispatch'
        },
        aws: {
          profile: 'default',
          region: 'eu-west-1',
          envPrefix: 'AWS',
          sqs: {
            queueUrl: ''
          },
        }
      }
    )
  };

  return {
    start: start
  };
}
