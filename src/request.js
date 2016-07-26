import got from 'got';

export default class Request {
	/**
	 * @param {Resource} resource
	 * @param {bool} identified
	 * @param {?string} append
	 * @param {?Object} customBody
	 */
	constructor(resource, identified = false, append = null, customBody = null) {
		this.resource = resource;
		this.identified = identified;
		this.append = append;
		this.customBody = customBody;

		this.descriptor = this.resource.descriptor;

		const {headers = {}, opts = {}} = this.descriptor.authorization.setupRequest();
		this.headers = headers;
		this.opts = opts;

		this.headers['Content-Type'] = this.resource.getContentTypeHeader();
		this.headers.Accept = this.resource.getAcceptHeader();
	}

	/**
	 * @returns {string}
	 */
	url() {
		let url = this.resource.name;

		if (this.identified) {
			const identifier = this.resource.identifier;

			if (identifier) {
				url += `/${identifier}`;
			}
		}

		if (this.resource.hasParentResource()) {
			let current = this.resource.parentResource;

			while (current) {
				url = `${current.name}/${current.identifier}/${url}`;
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
		const hasBody = method === 'post' || method === 'put';

		const opts = this.opts;
		opts.headers = this.headers;

		if (this.customBody) {
			opts.body = this.customBody;
		} else if (hasBody) {
			opts.body = this.resource.encode ? this.resource.encode() : this.resource.attributes;
		}

		return got[method](this.url(), opts);
	}
}

