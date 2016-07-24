export default class Descriptor {
	/*
	 * @param {object} params
	 */
	constructor({service, headers, prefix}) {
		this.service = service;
		this.headers = headers;
		this.prefix = prefix;
	}
}

