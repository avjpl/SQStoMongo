module.exports = options => {
  const start = (dependencies, cb) => {
    return cb(null,
      {
        logger: {
          level: 'warn'
        },
        mongodb: {
          url: ''
        },
        sqs: {
          queueUrl: ''
        },
        aws: {
          accessKeyId: '',
          secretAccessKey: '',
          region: ''
        }
      }
    )
  };

  return {
    start: start
  };
}
