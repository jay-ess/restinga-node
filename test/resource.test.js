import test from 'ava';
import {Container} from '../src';
import {JsonPlaceholderService, PostPlaceholderResource} from './fixtures';

test('Resource', t => {
	const jsonPlaceholderService = new JsonPlaceholderService();

	Container.register(jsonPlaceholderService);

	const post = new PostPlaceholderResource();

	t.truthy(post.service);
	t.truthy(post.name);
	t.truthy(post.identifier);
	t.truthy(post.collectionRoot);
	t.truthy(post.itemRoot);
	t.truthy(post.descriptor);

	t.deepEqual(jsonPlaceholderService, post.descriptor);
});

