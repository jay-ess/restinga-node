import got from 'got';

const debug = require('debug')('restinga-node:request');

export default class Request {
	/**
	 * @param {Resource} resource
	 * @param {bool} identified
	 * @param {?string} append
	 * @param {?Object} customBody
	 */
	constructor(resource, {identified = false, append = null, customBody = null}) {
		this.resource = resource;
		this.identified = identified;
		this.append = append;
		this.customBody = customBody;

		this.descriptor = this.resource.descriptor;

		const {headers = {}, opts = {}} = this.descriptor.authorization ? this.descriptor.authorization.setupRequest() : {};
		this.headers = headers;
		this.opts = opts;

		this.headers['Content-Type'] = this.resource.getContentTypeHeader();
		this.headers.Accept = this.resource.getAcceptHeader();
		this.headers['User-Agent'] = this.descriptor.agent;
	}

	/**
	 * @returns {string}
	 */
	url() {
		let url = this.resource.name;

		if (this.identified) {
			const identifier = this.resource.getIdentifier();

			if (identifier) {
				url += `/${identifier}`;
			}
		}

		if (this.resource.hasParentResource()) {
			let current = this.resource.parentResource;

			while (current) {
				url = `${current.name}/${current.getIdentifier()}/${url}`;
				current = current.parentResource;
			}
		}

		if (this.append) {
			url += this.append;
		}

		return `${this.descriptor.prefix}/${url}`;
	}

	/**
	 * @param {string} method
	 * @returns {Promise}
	 */
	send(method = 'get') {
		const url = this.url();
		const hasBody = method === 'post' || method === 'put';

		const opts = this.opts;
		opts.headers = this.headers;

		if (this.customBody) {
			opts.query = this.customBody;
		} else if (hasBody) {
			// The trick here is that some APIs throw when receive
			// `Content-Type` header on POST and PUT
			delete opts.headers['Content-Type'];
			opts.body = this.resource.encode ? this.resource.encode() : this.resource.attributes;
		}

		debug(`${method.toUpperCase()} ${url}`, opts);

		return got[method](url, opts);
	}
}

