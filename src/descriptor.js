const debug = require('debug')('restinga:descriptor');
const {version} = require('../package.json');

export default class Descriptor {
	/**
	 * @param {Object} params
	 */
	constructor({service, prefix, agent}) {
		debug(`Creating Descriptor ${service}`);

		this.service = service;
		this.prefix = prefix;
		this.agent = agent || `restinga-node/${version} (https://github.com/jay-ess/restinga-node)`;
	}
}

