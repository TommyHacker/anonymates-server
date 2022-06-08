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
		const { title, body, giphyUrl } = req.body.data;
		if (!title || !body || body.length > 1000)
			return res
				.status(300)
				.send(
					'title and article body required. article body must be 1,000 characters or less.'
				);
		const article = new Article(title, body, giphyUrl);
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

router.post('/:id/like', (req, res) => {
	try {
		//get ip
		const thisIp = req.ip;
		const id = req.params.id;
		let permission = true;
		const article = Article.findOne(id);

		article.blockIp.map((val) => {
			if (val == thisIp) return (permission = false);
		});

		if (permission) {
			article.likes++;
			article.blockIp.push(thisIp);
			article.save();
			res.json({
				status: 'success',
				message: 'article likes incremented successfully.',
				likes: article.likes,
			});
		} else {
			res.json({
				status: 'failed',
				message: 'you cannot like an article twice.',
				data: article.likes,
			});
		}
	} catch (err) {
		console.log(err.message);
		res.send('error');
	}
});

router.post('/:id/comment', (req, res) => {
	try {
		const id = req.params.id;
		const article = Article.findOne(id);
		const { text, giphyUrl } = req.body;
		console.log(req.body, 'recieved');
		if (!giphyUrl && !text) {
			return res.json({
				status: 'fail',
				message: 'something went wrong while posting comment.',
			});
		} else {
			article.comments.push({ text, giphyUrl });
			article.save();
			res.json({
				status: 'got message!',
				message: 'saved new comment',
				data: article.comments,
			});
		}
	} catch (err) {
		console.log(err.message);
		res.send('something went wrong while posting comment.');
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

// reaction route
router.post('/:id/reaction', (req, res) => {
	try {
		const ip = req.ip;
		const { reaction } = req.body.data;
		const { id } = req.params;
		let permission = true;
		const article = Article.findOne(id);
		article.reactions[reaction].blockIp.map((blockedIp) => {
			if (blockedIp == ip) return (permission = false);
		});
		if (permission) {
			article.reactions[reaction].count = article.reactions[reaction].count + 1;
			article.reactions[reaction].blockIp.push(ip);
			article.save();
			res.json({ status: 'success', message: 'reaction added', data: article });
		} else {
			res.json({
				status: 'fail',
				message: 'you cannot give the same reaction twice!',
			});
		}
	} catch (err) {
		console.log(err);
		res.json({
			status: 'fail',
			message: 'something went wrong',
			data: err.message,
		});
	}
});

module.exports = router;
