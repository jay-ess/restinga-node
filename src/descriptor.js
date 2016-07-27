const {version} = require('../package.json');

export default class Descriptor {
	/**
	 * @param {Object} params
	 */
	constructor({service, headers, prefix, agent}) {
		this.service = service;
		this.headers = headers;
		this.prefix = prefix;
		this.agent = agent || `restinga-node/${version} (https://github.com/jay-ess/restinga-node)`;
	}
}

