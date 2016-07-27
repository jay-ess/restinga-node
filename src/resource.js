import Request from './request';
import {Container} from './';

export default class Resource {
	/**
	 * @param {Object} params
	 */
	constructor({service, name, identifierName, collectionRoot, itemRoot}) {
		this.service = service;
		this.name = name;
		this.identifierName = identifierName;
		this.collectionRoot = collectionRoot;
		this.itemRoot = itemRoot;

		this.descriptor = Container.get(this.service);

		this.attributes = {};

		this.parentResource = null;
	}

	/**
	 * @returns {bool}
	 */
	hasParentResource() {
		return this.parentResource !== null;
	}

	/**
	 * @param {Resource} resource
	 * @return {Resource}
	 */
	childResource(resource) {
		resource.parentResource = this;

		return resource;
	}

	/**
	 * @returns {?string}
	 */
	getIdentifier() {
		return this.get(this.identifierName) || null;
	}

	/**
	 * @param {string} key
	 * @returns {*}
	 */
	get(key) {
		return this.attributes[key];
	}

	/**
	 * @param {string|Object} key
	 * @param {?*} value
	 */
	set(arg1, value = null) {
		if (typeof arg1 === 'object') {
			const values = arg1;

			for (const key of Object.keys(values)) {
				this.attributes[key] = values[key];
			}
		} else {
			const key = arg1;

			this.attributes[key] = value;
		}
	}

	/**
	 * @returns {Promise}
	 */
	static all() {
		const instance = new this();
		return instance.getAll();
	}

	/**
	 * @returns {Resource[]}
	 */
	getAll() {
		return this.makeRequest('get')
			.then(response => {
				const resources = this.factoryCollection(response);

				if (this.hasParentResource()) {
					return resources
						.map(resource => {
							resource.parentResource = this.parentResource;

							return resource;
						});
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

		return this.makeRequest('get', true)
			.then(response => {
				this.factory(response);

				return this;
			});
	}

	/**
	 * @returns {Promise}
	 */
	save() {
		return this.makeRequest('post')
			.then(response => {
				this.factory(response);

				return this;
			});
	}

	/**
	 * @returns {Promise}
	 */
	update() {
		return this.makeRequest('put', true)
			.then(response => {
				this.factory(response);

				return this;
			});
	}

	/**
	 * @returns {Promise}
	 */
	destroy() {
		return this.makeRequest('delete', true);
	}

	/**
	 * @param {string} method
	 * @param {bool} identified
	 * @param {?string} append
	 * @param {?Object} customBody
	 * @returns {Promise}
	 */
	makeRequest(method, identified = false, append = null, customBody = null) {
		const request = new Request(this, identified, append, customBody);

		return request.send(method);
	}
}

