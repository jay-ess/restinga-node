import {Resource} from '../../src';
import {receiveJson, sendJson} from '../../src/format';

export default class PostResource extends receiveJson(sendJson(Resource)) {
	constructor() {
		super({
			service: 'json-placeholder',
			name: 'posts',
			identifierName: 'id'
		});
	}
}

