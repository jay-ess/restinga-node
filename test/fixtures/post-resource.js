import {Resource} from '../../src';
import {receiveJson, sendJson} from '../../src/format';

export default class PostResource extends receiveJson(sendJson(Resource)) {
	setup() {
		super.setup({
			service: 'json-placeholder',
			name: 'posts',
			identifierName: 'id'
		});
	}
}

