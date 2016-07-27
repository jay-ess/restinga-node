import {Resource} from '../../src';
import {ReceiveJson, SendJson} from '../../src/format';

export default class CommentResource extends ReceiveJson(SendJson(Resource)) {
	constructor() {
		super({
			service: 'json-placeholder',
			name: 'comments',
			identifierName: 'id',
		});
	}
}

