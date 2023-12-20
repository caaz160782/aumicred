const remote = require('./remote');
const configApi = require('../config/config');

module.exports = new remote(configApi.mysqlService.host, configApi.mysqlService.port);