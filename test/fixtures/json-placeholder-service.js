import {Service} from '../../src';

export default class JsonPlaceHolderService extends Service {
	constructor() {
		super({
			service: 'json-placeholder',
			prefix: 'http://jsonplaceholder.typicode.com'
		});
	}
}

