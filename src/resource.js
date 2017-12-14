import Request from './request';
// import descriptor from './descriptor';

const debug = require('debug')('restinga:resource');

export default class Resource {
	/**
	 * @param {Object} attributes
	 */
	constructor(attributes) {
		this.setup();

		this.set(attributes);
	}

	/**
	 * @param {Object} params
	 */
	setup({service, name, identifierName, collectionRoot, itemRoot}) {
		debug(`Creating Resource ${name} for ${service}`);

		this.service = service;
		this.name = name;
		this.identifierName = identifierName;
		this.collectionRoot = collectionRoot;
		this.itemRoot = itemRoot;

		const obj = {service: 'json-placeholder', prefix: 'http://jsonplaceholder.typicode.com', agent: 'restinga-node/1.0.0 (https://github.com/jay-ess/restinga-node)'};
		this.descriptor = obj || null;

		this.attributes = {};

		this.parentResource = null;
	}

	/**
	 * @returns {bool}
	 */
	hasParentResource() {
		debug(`Asking for parent of ${this.name}`);

		return this.parentResource !== null;
	}

	/**
	 * @param {Resource} resource
	 * @return {Resource}
	 */
	childResource(resource) {
		debug(`Making a child Resouce of ${this ? this.name : undefined}`);

		resource.parentResource = this;

		return resource;
	}

	/**
	 * @returns {?string}
	 */
	getIdentifier() {
		debug(`Getting identifier of ${this.name}`);

		return this.get(this.identifierName) || null;
	}

	/**
	 * @param {string} key
	 * @returns {*}
	 */
	get(key) {
		debug(`Get ${key} of ${this.service}/${this.name}`);

		return this.attributes[key];
	}

	/**
	 * @param {string|Object} key
	 * @param {?*} value
	 * @returns {Resource}
	 */
	set(arg1, value = null) {
		debug(`Setting at ${this.service}/${this.name}`);

		if (typeof arg1 === 'object') {
			const values = arg1;

			for (const key of Object.keys(values)) {
				this.attributes[key] = values[key];
			}
		} else {
			const key = arg1;

			this.attributes[key] = value;
		}

		return this;
	}

	/**
	 * @param {string} key
	 * @returns {Resource}
	 */
	unset(key) {
		delete this.attributes[key];

		return this;
	}

	/**
	 * @returns {Promise}
	 */
	static all(customQuery) {
		const instance = new this();
		return instance.getAll(customQuery);
	}

	/**
	 * @returns {Resource[]}
	 */
	getAll(customQuery) {
		return this.makeRequest('get', {customQuery})
			.then(response => {
				const resources = this.factoryCollection(response);

				if (this.hasParentResource()) {
					return resources
						.map(this.parentResource.childResource);
				}

				return resources;
			});
	}

	/**
	 * @param {string} identifier
	 * @returns {Promise}
	 */
	static find(identifier = '') {
		const instance = new this();
		return instance.doFind(identifier);
	}

	/**
	 * @param {string} identifier
	 * @returns {Promise}
	 */
	doFind(identifier = '') {
		this.set(this.identifierName, identifier);

		return this.makeRequest('get', {identified: true})
			.then(response => this.factory(response));
	}

	/**
	 * @returns {Promise}
	 */
	save() {
		return this.makeRequest('post')
			.then(response => this.factory(response));
	}

	/**
	 * @returns {Promise}
	 */
	update() {
		return this.makeRequest('put', {identified: true})
			.then(response => this.factory(response));
	}

	/**
	 * @returns {Promise}
	 */
	destroy() {
		return this.makeRequest('delete', {identified: true});
	}

	/**
	 * @param {string} method
	 * @param {Object} opts
	 * @returns {Promise}
	 */
	makeRequest(method, opts = {}) {
		const request = new Request(this, opts);

		return request.send(method);
	}
}

