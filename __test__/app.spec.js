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
			request(app).get('/articles/1').expect(200, done);
		});
	});
});
