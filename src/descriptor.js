export default class Descriptor {
	/**
	 * @param {Object} params
	 */
	constructor({service, headers, prefix}) {
		this.service = service;
		this.headers = headers;
		this.prefix = prefix;
	}
}

