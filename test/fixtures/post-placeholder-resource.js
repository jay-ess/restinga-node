import {Resource} from '../../src';
import {ReceiveJson, SendJson} from '../../src/format';

export default class PostPlaceholderResource extends ReceiveJson(SendJson(Resource)) {
	constructor() {
		super({
			service: 'json-placeholder',
			name: 'post-placeholders',
			identifierName: 'id',
			collectionRoot: 'posts',
			itemRoot: 'post'
		});
	}
}

