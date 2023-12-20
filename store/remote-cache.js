const remote = require('./remote');
const configApi = require('../config/config');

module.exports = new remote(configApi.cacheService.host, configApi.cacheService.port);