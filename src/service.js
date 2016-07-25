export default class Service {
	/**
	 * @param {Object} params
	 */
	constructor({service, headers, prefix}) {
		this.service = service;
		this.headers = headers;
		this.prefix = prefix;
	}
}

