const AWS = require('aws-sdk');

module.exports = options => {
  const start = ({ config }, cb) => {
    const prefix = config.envPrefix;
    const region = process.env[`${prefix}_REGION`] ? process.env[`${prefix}_REGION`] : config.region;

    AWS.CredentialProviderChain.defaultProviders = [
      () => new AWS.EnvironmentCredentials(prefix),
      () => new AWS.SharedIniFileCredentials({ profile: config.profile || 'default' }),
      () => new AWS.EC2MetadataCredentials()
    ];

    const chain = new AWS.CredentialProviderChain();

    chain.resolve((err, credentials) => {
      if (err) {
        return cb(err);
      } else {
        console.log(credentials);
        return cb(null, { credentials, region });
      }
    });
  };

  return {
    start: start
  };
}
