import {Descriptor} from '../../src';

export default class JsonPlaceHolderService extends Descriptor {
	constructor() {
		super({
			service: 'json-placeholder',
			prefix: 'http://jsonplaceholder.typicode.com'
		});
	}
}

