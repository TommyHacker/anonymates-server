// for communicating with filesystem
const fs = require('fs');
// for generating unique ID's
const { v4: uuidv4 } = require('uuid');

// this will allow us to grab the text from our storage file gobally
const data = fs.readFileSync('../data/storage.json', 'utf-8');
// this will turn that storage text into javascript
const parsedData = JSON.parse(data);

// after getting the text from storage and parsing it to javascript, it becomes an object.
// we need it to be a Class, this function will take the object and turn it back into a class
// the reason for this is because only the Article Class will allow you to use the methods below
// e.g. article.save()
const convertObject = (object) => {
	const newClass = new Article();
	// create a new Article and fill it with the data from Object with has been passed into the function.
	return Object.assign(newClass, object);
};

class Article {
	// only title and body needed to create an article. ID likes and comments are already taken care of.
	constructor(title, body) {
		// uuidv4 will generate a unique id on article creation.
		this.id = uuidv4();
		this.title = title;
		this.body = body;
		this.likes = 0;
		this.comments = [{ text: '', giphyUrl: '' }];
	}
	save() {
		// clone the data so we can manipulate it
		const template = parsedData;
		// default to false to check if this is creating new post, or updating an old one
		let foundArticle = false;
		template.articles.map((article) => {
			if (article.id == this.id) {
				// set true to determine that this is updating an existing post
				foundArticle = true;
				article.title = this.title;
				article.body = this.body;
				article.likes = this.likes;
				article.comments = this.comments;
			}
		});
		if (!foundArticle) {
			// post exists = false; so add this to the template as a new entry.
			template.articles.push(this);
		}
		// replace data file with new template data
		fs.writeFileSync('../data/storage.json', JSON.stringify(template, null, 2));
	}

	static findAll = () => {
		// i dont think this temp = parsedData is needed, will remove and use parsedData instead if it works.
		const temp = parsedData;
		// create an empty array
		const tempArr = [];
		// map through each object, convert it back to Article before pushing into temp array.
		temp.articles.map((article) => {
			const converted = convertObject(article);
			tempArr.push(converted);
		});
		// return the array of articles
		return tempArr;
	};
	static findOne = (id) => {
		let result;
		// find article which id matches given id and return it as an Article.
		parsedData.articles.map((article) => {
			if (id == article.id) {
				return (result = convertObject(article));
			}
		});
		return result;
	};
}

// const Article = require("./models/ArticleSchema")

// const article = new Article()
// const { body, title } = req.body;

// const article = new Article(title, body);
// article.save()

// const { id } = req.params;
// const article = Article.findOne(id);
// article.likes++;
// article.save();



// module.exports = article;
