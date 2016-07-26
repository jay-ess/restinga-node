import {Resource} from '../../src';

export default class PostPlaceholderResource extends Resource {
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

