const Article = require('../models/ArticleSchema');

exports.all = (req, res) => {
	try {
		const articles = Article.findAll();
		res.json(articles);
	} catch (err) {
		console.log(err.message);
		res.send('err');
	}
};
exports.one = (req, res) => {
	try {
		const { id } = req.params;
		const article = Article.findOne(id);
		res.json(article);
	} catch (err) {
		console.log(err.message);
		res.send('err');
	}
};
exports.create = async (req, res) => {
	console.log('hello');
	console.log(req.body);
	try {
		const { title, body } = req.body.data;
		const article = new Article(title, body);
		await article.save();
		res.json({
			status: 'success',
			message: 'article saved successfully.',
			data: article,
		});
	} catch (err) {
		console.log(err.message);
		res.send('error');
	}
};
exports.update = (req, res) => {
	try {
		const { id } = req.params;
		const { likes, comment } = req.body;
		const article = Article.findOne(id);
		if (comment) {
			article.comments.push(comment);
		}
		if (likes) {
			article.likes++;
		}
		article.save();
		res.send(article);
	} catch (err) {
		console.log(err.message);
		res.send('err');
	}
};
