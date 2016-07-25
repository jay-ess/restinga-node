import test from 'ava';
import {Container, Service} from '../src';

test('Container', t => {
	const fooService = new Service({service: 'foo-service'});

	t.falsy(Container.has('foo-service'));

	Container.register(fooService);

	t.truthy(Container.has('foo-service'));

	t.deepEqual(fooService, Container.get('foo-service'));
});

