const AWS = require('aws-sdk');

module.exports = options => {
  const start = (dependencies, cb) => {
    const region = process.env['AWS_REGION'] ? process.env['AWS_REGION'] : 'eu-west-1';

    AWS.CredentialProviderChain.defaultProviders = [
      () => new AWS.EnvironmentCredentials('AWS'),
      () => new AWS.SharedIniFileCredentials({ profile: 'default' }),
      () => new AWS.EC2MetadataCredentials()
    ];

    const chain = new AWS.CredentialProviderChain();

    chain.resolve((err, credentials) => {
      if (err) {
        return cb(err);
      } else {
        return cb(null, { credentials, region });
      }
    });
  };

  return {
    start: start
  };
}
