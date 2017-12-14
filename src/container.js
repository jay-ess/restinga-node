const debug = require('debug')('restinga:container');

module.exports = {
	_services: {},

	/**
	 * @param {Descriptor} service
	* @returns {bool}
	*/
	register(service) {
		const name = service.service;

		if (name) {
			debug(`Registering ${name}`);

			this._services[name] = service;
			return true;
		}

		debug('Could not register to Container. Not a Descriptor:', service);

		return false;
	},

	/**
	 * @param {string} name
	 * @returns {bool}
	 */
	has(name) {
		debug(`Asking for ${name}`);

		return {}.hasOwnProperty.call(this._services, name);
	},

	/**
	 * @param {string} name
	 * @returns {?Descriptor}
	 */
	get(name) {
		debug(`Getting ${name}`);

		return this._services[name] || null;
	}
};
