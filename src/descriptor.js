const debug = require('debug')('restinga:descriptor');
const {version} = require('../package.json');

module.exports = function ({service, prefix, agent}) {
	debug(`Creating Descriptor ${service}`);

	return {
		service,
		prefix,
		agent: agent || `restinga-node/${version} (https://github.com/jay-ess/restinga-node)`
	};
};
