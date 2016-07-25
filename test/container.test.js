import test from 'ava';
import {Container, Descriptor} from '../src';

test('Container', t => {
	const fooService = new Descriptor({service: 'foo-service'});

	t.falsy(Container.has('foo-service'));

	Container.register(fooService);

	t.truthy(Container.has('foo-service'));

	t.deepEqual(fooService, Container.get('foo-service'));
});

