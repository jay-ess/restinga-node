import test from 'ava';
import {Container, Resource} from '../src';
import {JsonPlaceholderService, PostPlaceholderResource} from './fixtures';

test('Resource', t => {
	const jsonPlaceholderService = new JsonPlaceholderService();

	Container.register(jsonPlaceholderService);

	const post = new PostPlaceholderResource();

	t.truthy(post.service);
	t.truthy(post.name);
	t.truthy(post.identifierName);
	t.falsy(post.collectionRoot);
	t.falsy(post.itemRoot);
	t.truthy(post.descriptor);

	t.deepEqual(jsonPlaceholderService, post.descriptor);
});

test('Resource.all()', async t => {
	const posts = await PostPlaceholderResource.all();

	t.truthy(Array.isArray(posts));

	posts
		.forEach(post => t.is(post.constructor, PostPlaceholderResource));
});

test('Resource.find()', async t => {
	const post = await PostPlaceholderResource.find(1);

	t.is(post.get('id'), 1);
});



test('Resource.save()', async t => {
	const post = new PostPlaceholderResource();
	post.set({
		userId: 1,
		title: 'Foo',
		body: 'Lorem ipsum',
	});

	await post.save();

	t.is(typeof post.get('id'), 'number');
})

test('Resource.update()', async t => {
	const post = await PostPlaceholderResource.find(1);

	post.set('title', 'WatchJoJoBizarreAdventure');

	await post.update();

	t.is(post.get('title'), 'WatchJoJoBizarreAdventure');
});

test('Resource.destroy()', async t => {
	const post = await PostPlaceholderResource.find(1);

	await post.destroy();
});

