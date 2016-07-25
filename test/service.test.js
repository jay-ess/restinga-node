import test from 'ava';
import {JsonPlaceholderService} from './fixtures';

test('Service', t => {
	const service = new JsonPlaceholderService();

	t.is(service.service, 'json-placeholder');
	t.is(service.prefix, 'http://jsonplaceholder.typicode.com');
	t.falsy(service.headers);
});

