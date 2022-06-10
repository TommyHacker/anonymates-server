const request = require('supertest');
const app = require('../app');
const port = 6000;

describe('api endpoints', () => {
	let api;
	beforeAll(() => {
		api = app.listen(port, () => `Test server running on port ${port}`);
	});
	afterAll((done) => {
		console.log(`stopping test server gracefully`);
		api.close(done);
	});
	describe('endpoint route tests', () => {
		it('Returns statusCode 200 from /', (done) => {
			request(app).get('/').expect(200, done);
		});
		it('Returns statusCode 200 from /articles', (done) => {
			request(app).get('/articles').expect(200, done);
		});
		it('Returns statusCode 200 from /articles/:id', (done) => {
			request(app)
				.get('/articles/54dacbf8-4be2-4fc7-88b0-e6f268832c5f')
				.expect(200, done);
		});
		// POST
		it('Returns statusCode 200 from /articles/:id', (done) => {
			request(app)
				.post('/articles')
				.send({ title: 'title', body: 'body' })
				.expect(200, done);
		});
		it('Returns statusCode 200 from /articles/:id', (done) => {
			request(app)
				.post('/articles/54dacbf8-4be2-4fc7-88b0-e6f268832c5f/like')
				.send({ like: 1 })
				.expect(200, done);
		});
		it('Returns statusCode 200 post comment', (done) => {
			request(app)
				.post('/articles/54dacbf8-4be2-4fc7-88b0-e6f268832c5f/comment')
				.send({ text: 'comment text', giphyUrl: 'gif url' })
				.expect(200, done);
		});
		it('Returns statusCode 200 from /articles/:id', (done) => {
			request(app)
				.post('/articles/54dacbf8-4be2-4fc7-88b0-e6f268832c5f/reaction')
				.send({ data: { reaction: 0 } })
				.expect(200, done);
		});
		it('returns error string if no title included.', (done) => {
			request(app)
				.post('/articles')
				.send({ data: { title: '', body: 'there is a body', giphyUrl: '' } })
				.expect(
					'title and article body required. article body must be 1,000 characters or less.',
					done
				);
		});
	});
});
