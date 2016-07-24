import test from 'ava';
import {Descriptor} from '../src';

test('Descriptor', t => {
	const service = new Descriptor({
		service: 'json-placeholder',
		prefix: 'http://jsonplaceholder.typicode.com'
	});

	t.is(service.service, 'json-placeholder');
	t.is(service.prefix, 'http://jsonplaceholder.typicode.com');
	t.falsy(service.headers);
});

