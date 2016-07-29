import test from 'ava';
import {Basic, Bearer} from '../src/auth';

test('Basic', t => {
	const basic = new Basic('Johnny', 'Joestar');

	t.deepEqual(basic.setupRequest(), {
		opts: {auth: 'Johnny:Joestar'}
	});
});

test('Bearer', t => {
	const bearer = new Bearer('SomeToken');

	t.deepEqual(bearer.setupRequest(), {
		headers: {Authorization: 'Bearer SomeToken'}
	});
});

