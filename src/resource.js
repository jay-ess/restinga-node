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
	}
}

