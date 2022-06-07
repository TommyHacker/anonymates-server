const express = require('express');
const router = express.Router();
const Article = require('../models/ArticleSchema');

router.post('/test', (req, res) => {
	const article = new Article('random title', 'random body');
	article.save();
	res.send('saved new article');
});
// create a new article POST request
router.post('/', async (req, res) => {
	try {
		//
		const { title, body } = req.body.data;
		if (!title || !body || body.length > 1000)
			return res
				.status(300)
				.send(
					'title and article body required. article body must be 1,000 characters or less.'
				);
		const article = new Article(title, body);
		article.save();
		res.json({
			status: 'success',
			message: 'article saved successfully.',
			data: article,
		});
	} catch (err) {
		console.log(err.message);
		res.send('something went wrong while creating article.');
	}
});

// comment on or like an article PUT request

router.put('/:id/like', (req, res) => {
	try {
		const id = req.params.id;
		const article = Article.findOne(id);
		article.likes++;
		article.save();
		res.send(article);
	} catch (err) {
		console.log(err.message);
		res.send('error');
	}
});

router.put('/:id/comment', (req, res) => {
	try {
		const id = req.params.id;
		const article = Article.findOne(id);
		const { text, giphyUrl } = req.body;
		article.comments.push({ text, giphyUrl });
		article.save();
	} catch (err) {
		console.log(err.message);
		res.send('sos error wrong');
	}
});

//localhost:PORT/articles
router.get('/', (req, res) => {
	try {
		const articles = Article.findAll();
		res.send(articles);
	} catch (error) {
		console.error(error);
		res.send('something went wrong');
	}
});

//localhost:PORT/articles/:id
router.get('/:id', (req, res) => {
	try {
		const { id } = req.params;
		const article = Article.findOne(id);

		res.send(article);
	} catch (error) {
		console.error(error);
		res.send('something went wrong');
	}
});

module.exports = router;
