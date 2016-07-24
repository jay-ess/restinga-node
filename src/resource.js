import {Container} from './';

export default class Resource {
	/**
	 * @param {Object} params
	 */
	constructor({service, name, identifier, collectionRoot, itemRoot}) {
		this.service = service;
		this.name = name;
		this.identifier = identifier;
		this.collectionRoot = collectionRoot;
		this.itemRoot = itemRoot;

		this.descriptor = Container.get(this.service);
	}
}

