import test from 'ava';
import {Container} from '../src';
import {JsonPlaceholderService, PostResource, CommentResource} from './fixtures';

const jsonPlaceholderService = new JsonPlaceholderService();

Container.register(jsonPlaceholderService);

test('Resource', t => {
	const post = new PostResource();

	t.truthy(post.service);
	t.truthy(post.name);
	t.truthy(post.identifierName);
	t.falsy(post.collectionRoot);
	t.falsy(post.itemRoot);
	t.truthy(post.descriptor);

	t.deepEqual(jsonPlaceholderService, post.descriptor);
});

test('Resource.unset()', t => {
	const post = new PostResource({
		foo: 'bar'
	});

	t.is(post.get('foo'), 'bar');

	post.unset('foo');

	t.falsy(post.get('foo'));
});

test('Resource.all()', async t => {
	const posts = await PostResource.all();

	t.true(Array.isArray(posts));

	posts
		.forEach(post => t.is(post.constructor, PostResource));
});

test('Resource.find()', async t => {
	const post = await PostResource.find(1);

	t.is(post.get('id'), 1);
});

test('Resource.save()', async t => {
	const post = new PostResource({
		userId: 1,
		title: 'Foo',
		body: 'Lorem ipsum'
	});

	await post.save();

	t.is(typeof post.get('id'), 'number');
});

test('Resource.update()', async t => {
	const post = await PostResource.find(1);

	post.set('title', 'WatchJoJoBizarreAdventure');

	await post.update();

	t.is(post.get('title'), 'WatchJoJoBizarreAdventure');
});

test('Resource.destroy()', async () => {
	const post = await PostResource.find(1);

	await post.destroy();
});

test('Resource parents and childs', async t => {
	const comments = await new PostResource()
		.set('id', 1)
		.childResource(new CommentResource())
		.getAll();

	t.true(Array.isArray(comments));

	comments
		.forEach(comment => t.is(comment.constructor, CommentResource));
});

test('Resource request custom body', async t => {
	const comments = await CommentResource.all({
		postId: 1
	});

	t.true(Array.isArray(comments));
	t.true(
		comments
			.every(comment => comment.get('postId') === 1)
	);
});

