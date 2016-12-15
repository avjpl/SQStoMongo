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
        sqs: {
          queueUrl: 'https://sqs.eu-west-1.amazonaws.com/471240247400/CDPROD-ORDERDISPATCH-UPDATE-DLQ'
        }
      }
    )
  };

  return {
    start: start
  };
}
