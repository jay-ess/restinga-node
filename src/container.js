export default class Container {
	/*
	 * @param {Service} service
	 */
	static register(service) {
		const name = service.service;

		if (name) {
			Container._services[name] = service;
			return true;
		}

		return false;
	}

	/*
	 * @param {string} name
	 */
	static has(name) {
		return {}.hasOwnProperty.call(Container._services, name);
	}

	/*
	 * @param {string} name
	 */
	static get(name) {
		return Container._services[name] || null;
	}
}

Container._services = {};

