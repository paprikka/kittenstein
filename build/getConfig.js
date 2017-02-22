const config = {
  development: {
    name: 'development',
    socketEndpointURI: null
  },
  production: {
    name: 'production',
    socketEndpointURI: 'http://hub.facade.photo:80'
  }
};

module.exports = function(env) {
  return JSON.stringify(config[env] || config.development);
}
