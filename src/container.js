const debug = require('debug')('restinga:container');

export default class Container {
	/**
	 * @param {Descriptor} service
	 * @returns {bool}
	 */
	static register(service) {
		const name = service.service;

		if (name) {
			debug(`Registering ${name}`);

			Container._services[name] = service;
			return true;
		}

		debug('Could not register to Container. Not a Descriptor:', service);

		return false;
	}

	/**
	 * @param {string} name
	 * @returns {bool}
	 */
	static has(name) {
		debug(`Asking for ${name}`);

		return {}.hasOwnProperty.call(Container._services, name);
	}

	/**
	 * @param {string} name
	 * @returns {?Descriptor}
	 */
	static get(name) {
		debug(`Getting ${name}`);

		return Container._services[name] || null;
	}
}

Container._services = {};

