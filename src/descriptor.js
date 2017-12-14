const debug = require('debug')('restinga:descriptor');
const {version} = require('../package.json');

module.exports = function ({service, prefix, agent}) {
	this.service = service;
	this.prefix = prefix;
	this.agent = agent || `restinga-node/${version} (https://github.com/jay-ess/restinga-node)`;

	debug(`Creating Descriptor ${service}`);
};
