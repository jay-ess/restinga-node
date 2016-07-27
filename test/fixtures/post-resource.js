import {Resource} from '../../src';
import {ReceiveJson, SendJson} from '../../src/format';

export default class PostResource extends ReceiveJson(SendJson(Resource)) {
	constructor() {
		super({
			service: 'json-placeholder',
			name: 'posts',
			identifierName: 'id',
		});
	}
}

