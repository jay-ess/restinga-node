import test from 'ava';
import Container from '../src/container.js';

test('I can instantiate a Container class', t => {
	t.truthy(new Container());
});

